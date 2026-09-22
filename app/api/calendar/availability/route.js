/**
 * GET /api/calendar/availability?month=YYYY-MM
 *
 * Returns the busy dates for the requested calendar month (+ a small buffer)
 * from the admin's Google Calendar.
 *
 * Privacy: only normalized ISO date strings are returned — NO event titles,
 * descriptions, attendees or locations are ever sent to the browser.
 *
 * Authentication: Google Calendar API via service-account JWT
 * (no OAuth user flow, no client secrets in the browser bundle).
 *
 * Environment variables required (.env.local — never commit real values):
 *   GOOGLE_CALENDAR_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 */

import { NextResponse } from 'next/server';

/* ── JWT helpers (no external library needed) ──────────────────── */

/**
 * Sign a minimal Google service-account JWT and exchange it for
 * a short-lived OAuth2 access token.
 */
async function getAccessToken() {
  const email  = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
  }

  // Handle both literal \n (env file) and actual newlines
  const pemKey = rawKey.replace(/\\n/g, '\n');

  const now  = Math.floor(Date.now() / 1000);
  const exp  = now + 3600;
  const scope = 'https://www.googleapis.com/auth/calendar.readonly';

  // Build JWT header + payload
  const header  = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    iss:   email,
    scope,
    aud:   'https://oauth2.googleapis.com/token',
    iat:   now,
    exp,
  }));

  const signingInput = `${header}.${payload}`;

  // Import the RSA private key into Web Crypto
  const keyData = pemToDer(pemKey);
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${base64url(signature)}`;

  // Exchange JWT for access token
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion:  jwt,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google token exchange failed: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

/** base64url encode — works for string, ArrayBuffer, or Buffer */
function base64url(input) {
  let str;
  if (typeof input === 'string') {
    str = btoa(input);
  } else {
    // ArrayBuffer → Uint8Array → binary string
    const bytes = new Uint8Array(input instanceof ArrayBuffer ? input : input.buffer ?? input);
    str = btoa(String.fromCharCode(...bytes));
  }
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Strip PEM header/footer and decode base64 to ArrayBuffer */
function pemToDer(pem) {
  const b64 = pem
    .replace(/-----BEGIN [^-]+-----/g, '')
    .replace(/-----END [^-]+-----/g, '')
    .replace(/\s/g, '');
  const binary = atob(b64);
  const bytes  = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/* ── Date helpers ───────────────────────────────────────────────── */

/** Convert UTC ISO string to local YYYY-MM-DD using the server's timezone.
    Since we want the ADMIN's calendar dates we keep things in UTC-aware form.
    Google Calendar all-day events use date-only strings; timed events use
    dateTime. We normalize both to a set of covered YYYY-MM-DD strings. */
function isoDateStr(dateOrDateTime, isAllDayEnd = false) {
  // All-day event end in Google Calendar is EXCLUSIVE (next day)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOrDateTime)) {
    if (isAllDayEnd) {
      // subtract one day
      const d = new Date(dateOrDateTime + 'T00:00:00Z');
      d.setUTCDate(d.getUTCDate() - 1);
      return d.toISOString().slice(0, 10);
    }
    return dateOrDateTime;
  }
  // Timed event: take the date part in UTC
  return new Date(dateOrDateTime).toISOString().slice(0, 10);
}

/** Return every YYYY-MM-DD between startDate and endDate (inclusive). */
function datesBetween(startStr, endStr) {
  const dates = [];
  const cur = new Date(startStr + 'T00:00:00Z');
  const end = new Date(endStr   + 'T00:00:00Z');
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

/* ── Route handler ──────────────────────────────────────────────── */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const monthParam = searchParams.get('month'); // expected: YYYY-MM

  // Validate month param
  if (!monthParam || !/^\d{4}-\d{2}$/.test(monthParam)) {
    return NextResponse.json(
      { error: 'month param required, format YYYY-MM' },
      { status: 400 }
    );
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    return NextResponse.json(
      { error: 'GOOGLE_CALENDAR_ID not configured' },
      { status: 500 }
    );
  }

  // Build timeMin / timeMax for the requested month
  const [year, month] = monthParam.split('-').map(Number);
  const timeMin = new Date(Date.UTC(year, month - 1, 1)).toISOString();
  // First day of NEXT month = exclusive end
  const timeMax = new Date(Date.UTC(year, month, 1)).toISOString();

  try {
    const token = await getAccessToken();

    // Use events.list with singleEvents:true to expand recurring events
    const url = new URL('https://www.googleapis.com/calendar/v3/calendars/' +
      encodeURIComponent(calendarId) + '/events');
    url.searchParams.set('timeMin',      timeMin);
    url.searchParams.set('timeMax',      timeMax);
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy',      'startTime');
    // Only request the fields we actually need — never return titles/descriptions
    url.searchParams.set('fields',
      'items(start/date,start/dateTime,end/date,end/dateTime)');

    const gcalRes = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      // Revalidate every 15 minutes
      next: { revalidate: 900 },
    });

    if (!gcalRes.ok) {
      const err = await gcalRes.text();
      console.error('[calendar/availability] Google Calendar error:', err);
      return NextResponse.json({ error: 'Google Calendar API error' }, { status: 502 });
    }

    const gcalData = await gcalRes.json();
    const items = gcalData.items ?? [];

    // Normalize to a Set of YYYY-MM-DD busy date strings
    const busySet = new Set();

    for (const item of items) {
      const start = item.start?.date || item.start?.dateTime;
      const end   = item.end?.date   || item.end?.dateTime;
      if (!start) continue;

      const isAllDay = Boolean(item.start?.date);
      const startStr = isoDateStr(start, false);
      const endStr   = end ? isoDateStr(end, isAllDay) : startStr;

      for (const d of datesBetween(startStr, endStr)) {
        busySet.add(d);
      }
    }

    // Return only the normalized busy dates — nothing else
    return NextResponse.json(
      { busyDates: Array.from(busySet).sort() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
        },
      }
    );
  } catch (err) {
    console.error('[calendar/availability]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
