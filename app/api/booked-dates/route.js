/**
 * GET /api/booked-dates
 * ─────────────────────────────────────────────────────────────────
 * Fetches next 12 months of events from one or two PUBLIC Google Calendars
 * using a server-only API Key (never exposed to client).
 *
 * Calendars:
 *   GOOGLE_CALENDAR_ID           — admin/booking calendar (required)
 *   GOOGLE_HOLIDAY_CALENDAR_ID   — Holidays in India calendar (optional)
 *     Recommended value: en-gb.indian#holiday@group.v.calendar.google.com
 *     The # in the ID is handled by encodeURIComponent in fetchAllEvents().
 *
 * Response shape:
 *   {
 *     events:   Event[],
 *     timeZone: string,       // "Asia/Kolkata"
 *     warnings: string[],     // non-fatal issues (e.g. holiday fetch failed)
 *   }
 *
 * Event shape:
 *   {
 *     id:                string,   // "booking:<gid>" | "holiday:<gid>"
 *     source:            "booking" | "holiday",
 *     type:              "booking" | "festival",
 *     title:             string,   // real title (festivals) | "Booked" (bookings)
 *     start:             string,   // "YYYY-MM-DD" all-day | ISO dateTime timed
 *     end:               string,   // "YYYY-MM-DD" EXCLUSIVE all-day | ISO dateTime
 *     allDay:            boolean,
 *     blocksAvailability: boolean,
 *   }
 *
 * Booking calendar all-day title conventions:
 *   [FESTIVAL] Title  → festival, blocksAvailability:false, prefix stripped
 *   [HOLIDAY]  Title  → festival, blocksAvailability:false, prefix stripped
 *   [BOOKED]   …      → booking,  blocksAvailability:true
 *   [BLOCKED]  …      → booking,  blocksAvailability:true
 *   _Title            → booking,  blocksAvailability:true (private)
 *   Timed event       → booking,  blocksAvailability:true (title hidden)
 *   Unprefixed all-day → festival, blocksAvailability:false (title preserved)
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/* ── config ──────────────────────────────────────────────────────── */
function getConfig() {
  const apiKey     = (process.env.GOOGLE_API_KEY              || '').trim();
  const calendarId = (process.env.GOOGLE_CALENDAR_ID          || '').trim();
  const holidayId  = (process.env.GOOGLE_HOLIDAY_CALENDAR_ID  || '').trim();
  const timeZone   = (process.env.GOOGLE_CALENDAR_TIME_ZONE   || 'Asia/Kolkata').trim();
  if (!apiKey || !calendarId) return null;
  return { apiKey, calendarId, holidayId: holidayId || null, timeZone };
}

/* ── paginated Google Calendar fetch ────────────────────────────── */
async function fetchAllEvents(calendarId, apiKey, timeMin, timeMax) {
  const allItems = [];
  let pageToken  = null;

  do {
    const params = new URLSearchParams({
      key:          apiKey,
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy:      'startTime',
      maxResults:   '2500',
      showDeleted:  'false',
      // summary = event title; transparency included for future use
      fields:       'nextPageToken,items(id,summary,status,start,end,transparency)',
    });
    if (pageToken) params.set('pageToken', pageToken);

    // encodeURIComponent handles # in holiday calendar ID correctly
    const url = `https://www.googleapis.com/calendar/v3/calendars/${
      encodeURIComponent(calendarId)
    }/events?${params}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      const err = new Error(`Google Calendar API responded with ${res.status}`);
      err.status = res.status;
      throw err;
    }

    const data  = await res.json();
    const items = (data.items || []).filter(ev => ev.status !== 'cancelled');
    allItems.push(...items);
    pageToken = data.nextPageToken || null;
  } while (pageToken);

  return allItems;
}

/* ── normalize booking calendar event ───────────────────────────── */
function normalizeBooking(event) {
  const s        = event.start;
  const e        = event.end;
  const rawTitle = (event.summary || '').trim();

  // Timed event — private booking, never reveal title
  if (s.dateTime) {
    return {
      id:                `booking:${event.id}`,
      source:            'booking',
      type:              'booking',
      title:             'Booked',
      start:             s.dateTime,
      end:               e.dateTime,
      allDay:            false,
      blocksAvailability: true,
    };
  }

  // All-day — check prefix conventions
  const upper = rawTitle.toUpperCase();

  // Private block prefixes
  if (
    rawTitle.startsWith('_') ||
    upper.startsWith('[BOOKED]') ||
    upper.startsWith('[BLOCKED]')
  ) {
    return {
      id:                `booking:${event.id}`,
      source:            'booking',
      type:              'booking',
      title:             'Booked',
      start:             s.date,
      end:               e.date,
      allDay:            true,
      blocksAvailability: true,
    };
  }

  // Festival/holiday prefix — strip prefix, keep real title
  let title = rawTitle;
  const prefixMatch = rawTitle.match(/^\[(FESTIVAL|HOLIDAY)\]\s*/i);
  if (prefixMatch) {
    title = rawTitle.slice(prefixMatch[0].length).trim() || rawTitle;
  }

  return {
    id:                `booking:${event.id}`,
    source:            'booking',
    type:              'festival',
    title:             title || 'Event',
    start:             s.date,
    end:               e.date,
    allDay:            true,
    blocksAvailability: false,
  };
}

/* ── normalize holiday calendar event ───────────────────────────── */
function normalizeHoliday(event) {
  const s     = event.start;
  const e     = event.end;
  const title = (event.summary || '').trim();

  return {
    id:                `holiday:${event.id}`,
    source:            'holiday',
    type:              'festival',
    // Preserve exact Google summary — "Diwali/Deepavali", "Holi", etc.
    title:             title || 'Festival / Holiday',
    start:             s.date || s.dateTime.slice(0, 10),
    end:               e.date || e.dateTime.slice(0, 10),
    allDay:            true,
    blocksAvailability: false,
  };
}

/* ── deduplicate ─────────────────────────────────────────────────── */
function dedup(events) {
  // Keep distinct events; same source+start+title = true duplicate
  // Different festivals on same date (Diwali AND Naraka Chaturdasi) are KEPT
  const seen = new Set();
  return events.filter(ev => {
    const key = `${ev.source}|${ev.start}|${ev.title.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ── route handler ───────────────────────────────────────────────── */
export async function GET() {
  const config = getConfig();

  if (!config) {
    console.warn('[booked-dates] GOOGLE_API_KEY or GOOGLE_CALENDAR_ID not configured');
    return NextResponse.json(
      {
        events:   [],
        timeZone: 'Asia/Kolkata',
        warnings: [],
        error:    'Calendar not configured.',
        code:     'CALENDAR_NOT_CONFIGURED',
      },
      { status: 503 }
    );
  }

  const now    = new Date();
  const future = new Date(now);
  future.setMonth(future.getMonth() + 12);
  const timeMin = now.toISOString();
  const timeMax = future.toISOString();

  const warnings = [];

  try {
    // ── Primary calendar (required) ────────────────────────────
    const bookingItems  = await fetchAllEvents(config.calendarId, config.apiKey, timeMin, timeMax);
    const bookingEvents = bookingItems.map(normalizeBooking);

    // ── Holiday calendar (optional) ────────────────────────────
    let holidayEvents = [];
    if (config.holidayId) {
      try {
        const holidayItems = await fetchAllEvents(config.holidayId, config.apiKey, timeMin, timeMax);
        holidayEvents = holidayItems.map(normalizeHoliday);
      } catch (hErr) {
        // Non-fatal — booking safety unaffected
        const code = hErr.status || 'NETWORK_ERROR';
        console.warn('[booked-dates] Holiday calendar fetch failed (non-fatal):', code);
        warnings.push(`Holiday calendar unavailable (${code}) — festival names may be incomplete`);
      }
    }

    const events = dedup([...bookingEvents, ...holidayEvents]);

    return NextResponse.json(
      { events, timeZone: config.timeZone, warnings },
      {
        status:  200,
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
      }
    );

  } catch (err) {
    const status = err.status;
    console.error('[booked-dates] Primary calendar error:', status || err.message);

    if (status === 401 || status === 403) {
      return NextResponse.json(
        {
          events:   [],
          timeZone: config.timeZone,
          warnings: [],
          error:    'Calendar not accessible — check API key permissions.',
          code:     'CALENDAR_ACCESS_DENIED',
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        events:   [],
        timeZone: config.timeZone,
        warnings: [],
        error:    'Failed to fetch calendar.',
        code:     'UPSTREAM_ERROR',
      },
      { status: 502 }
    );
  }
}
