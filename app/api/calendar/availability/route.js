/**
 * GET /api/calendar/availability?month=YYYY-MM
 *
 * ─────────────────────────────────────────────────────────────────
 * TEMPORARILY DISABLED: Website-to-Google-Calendar event creation.
 * Keep read-only festival sync active.
 *
 * This legacy route used a service-account JWT (GOOGLE_SERVICE_ACCOUNT_EMAIL +
 * GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) to read busy dates via calendar.readonly
 * scope. It is disabled while the write-credential path is under review.
 *
 * The active read-only festival/availability data is served by:
 *   GET /api/booked-dates   ← uses public API Key, no service account
 *
 * All current UI components (AvailabilityDrawer, FormDatePicker) use
 * /api/booked-dates exclusively. This route is no longer called by any UI.
 *
 * Re-enable by removing the early-return below and restoring the handler.
 * ─────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server';

// Force dynamic — prevents static pre-render / build-time execution.
export const dynamic = 'force-dynamic';

// TEMPORARILY DISABLED: Website-to-Google-Calendar event creation.
// Keep read-only festival sync active.
// The entire service-account JWT auth + calendar fetch handler below is
// disabled. Returning a sanitized 501 so no false success is signalled.
export async function GET() {
  return NextResponse.json(
    {
      error: 'Calendar availability is temporarily unavailable',
      code:  'CALENDAR_WRITE_DISABLED',
    },
    { status: 503 }
  );
}

/*
 * ─────────────────────────────────────────────────────────────────
 * TEMPORARILY DISABLED HANDLER — Do not remove; restore to re-enable.
 * ─────────────────────────────────────────────────────────────────
 *
 * Original route:
 *   GET /api/calendar/availability?month=YYYY-MM
 *   Auth: service-account JWT, scope: calendar.readonly (READ-ONLY — no write ops)
 *   Returns: { busyDates: string[], timeZone: string }
 *
 * NOTE: This route only ever performed READ operations (calendar.readonly scope).
 * It is disabled here as a precautionary measure while service-account
 * credentials are under review. No calendar write (events.insert / events.update /
 * events.patch / events.delete) was present in this route or anywhere else
 * in this codebase.
 *
 * Dead imports removed to prevent build warnings:
 *   - GOOGLE_SERVICE_ACCOUNT_EMAIL env ref
 *   - GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY env ref
 *   - base64url / pemToDer / getAccessToken helpers
 *   - isoDateStr / datesBetween helpers
 *
 * All of these are preserved in git history if needed for restoration.
 * ─────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'; // already imported above

function getConfig() {
  const calendarId  = (process.env.GOOGLE_CALENDAR_ID        || '').trim();
  const email       = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL   || '').trim();
  const rawKey      = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').trim();
  const timeZone    = (process.env.GOOGLE_CALENDAR_TIME_ZONE  || 'Asia/Kolkata').trim();
  if (!calendarId || !email || !rawKey) return null;
  return { calendarId, email, rawKey, timeZone };
}

// ... (full original handler in git history @ commit before this change)
// To restore: git show HEAD~1:app/api/calendar/availability/route.js

 */
