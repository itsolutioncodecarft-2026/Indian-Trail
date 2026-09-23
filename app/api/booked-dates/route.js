/**
 * GET /api/booked-dates
 *
 * Fetches the next 12 months of events from a PUBLIC Google Calendar
 * using a simple API Key (no OAuth, no service account required).
 *
 * The calendar must be set to "Make available to public" in Google Calendar
 * Settings → [Your calendar] → Access permissions.
 *
 * Environment variables (never commit real values — use .env.local locally
 * and Vercel Dashboard → Settings → Environment Variables in production):
 *   GOOGLE_API_KEY       — restricted API key from Google Cloud Console
 *   GOOGLE_CALENDAR_ID   — from Google Calendar → Settings → Integrate Calendar
 *
 * Missing config  → 503  { error, events: [], code: "CALENDAR_NOT_CONFIGURED" }
 * Google API fail → 502  { error, events: [] }
 * Network error   → 500  { error, events: [] }
 * Success         → 200  { events: [...] }
 *
 * Events shape: { id, title: "Booked", start, end, allDay }
 * NOTE: title is always "Booked" — real event titles are never exposed.
 */

import { NextResponse } from 'next/server';

// Never statically pre-render — env vars must be read at request time.
export const dynamic = 'force-dynamic';

const CACHE_SECONDS = 300; // 5 minutes

/* ── Config validation (lazy, inside handler) ──────────────────── */
function getConfig() {
  const apiKey     = (process.env.GOOGLE_API_KEY     || '').trim();
  const calendarId = (process.env.GOOGLE_CALENDAR_ID || '').trim();
  if (!apiKey || !calendarId) return null;
  return { apiKey, calendarId };
}

/* ── Route handler ──────────────────────────────────────────────── */
export async function GET() {
  // 1. Validate config at request time — never at module load
  const config = getConfig();
  if (!config) {
    console.warn('[booked-dates] GOOGLE_API_KEY or GOOGLE_CALENDAR_ID not set');
    return NextResponse.json(
      { error: 'Calendar not configured.', events: [], code: 'CALENDAR_NOT_CONFIGURED' },
      { status: 503 }
    );
  }

  // 2. Build 12-month window
  const now    = new Date();
  const future = new Date(now);
  future.setMonth(future.getMonth() + 12);

  const params = new URLSearchParams({
    key:          config.apiKey,
    timeMin:      now.toISOString(),
    timeMax:      future.toISOString(),
    singleEvents: 'true',
    orderBy:      'startTime',
    maxResults:   '2500',
    // Only fetch the fields we need — never titles/descriptions/attendees
    fields:       'items(id,start,end)',
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${
    encodeURIComponent(config.calendarId)
  }/events?${params}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: CACHE_SECONDS },
    });

    if (!res.ok) {
      const status = res.status;
      console.warn('[booked-dates] Google Calendar API responded with', status);

      if (status === 403 || status === 401) {
        return NextResponse.json(
          { error: 'Failed to fetch calendar.', events: [] },
          { status: 502 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch calendar.', events: [] },
        { status: 502 }
      );
    }

    const data  = await res.json();
    const items = data.items || [];

    // Normalize — title is always "Booked" (never expose real event names)
    const events = items.map(event => {
      const s = event.start;
      const e = event.end;

      if (s.dateTime) {
        return {
          id:     event.id,
          title:  'Booked',
          start:  s.dateTime,
          end:    e.dateTime,
          allDay: false,
        };
      }

      // All-day event — normalize to UTC midnight
      return {
        id:     event.id,
        title:  'Booked',
        start:  s.date + 'T00:00:00Z',
        end:    e.date + 'T00:00:00Z',
        allDay: true,
      };
    });

    return NextResponse.json(
      { events },
      {
        status:  200,
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60`,
        },
      }
    );

  } catch (err) {
    // Never log err.message — may contain sensitive URL/key fragments
    console.error('[booked-dates] Network or parse error');
    return NextResponse.json(
      { error: 'Network error.', events: [] },
      { status: 500 }
    );
  }
}
