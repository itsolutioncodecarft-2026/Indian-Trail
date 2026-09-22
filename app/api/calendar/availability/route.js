/**
 * GET /api/calendar/availability?month=YYYY-MM
 *
 * Returns busy dates from the admin's Google Calendar.
 * Privacy: only normalized ISO date strings returned.
 * Authentication: service-account JWT — no OAuth user flow.
 *
 * Environment variables (set in Vercel Dashboard → Settings → Env Vars):
 *   GOOGLE_CALENDAR_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *   GOOGLE_CALENDAR_TIME_ZONE   (optional, default: Asia/Kolkata)
 *
 * Missing config → 503 { error, code: "CALENDAR_NOT_CONFIGURED" }
 * Never expose secret values, variable names, or stack traces in responses.
 */

import { NextResponse } from 'next/server';

// Force dynamic — this route must never be statically cached or pre-rendered.
// Prevents Next.js from executing it at build time when env vars are absent.
export const dynamic = 'force-dynamic';

/* ─────────────────────────────────────────────────────────────────
   Server-only config helper — validated lazily inside request handler.
   Module-level code never throws; no eager initialization.
───────────────────────────────────────────────────────────────── */
function getConfig() {
  const calendarId  = (process.env.GOOGLE_CALENDAR_ID        || '').trim();
  const email       = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL   || '').trim();
  const rawKey      = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').trim();
  const timeZone    = (process.env.GOOGLE_CALENDAR_TIME_ZONE  || 'Asia/Kolkata').trim();

  if (!calendarId || !email || !rawKey) {
    return null; // caller returns 503
  }

  return { calendarId, email, rawKey, timeZone };
}

/* ─────────────────────────────────────────────────────────────────
   JWT helpers — pure Web Crypto, no external dependencies
───────────────────────────────────────────────────────────────── */
function base64url(input) {
  let str;
  if (typeof input === 'string') {
    str = btoa(unescape(encodeURIComponent(input)));
  } else {
    const bytes = new Uint8Array(
      input instanceof ArrayBuffer ? input : input.buffer ?? input
    );
    str = btoa(String.fromCharCode(...bytes));
  }
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

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

async function getAccessToken(email, rawKey) {
  // Handle both literal \n and real newlines
  const pemKey = rawKey.replace(/\\n/g, '\n');
  const now    = Math.floor(Date.now() / 1000);

  const header  = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    iss:   email,
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    aud:   'https://oauth2.googleapis.com/token',
    iat:   now,
    exp:   now + 3600,
  }));

  const signingInput = `${header}.${payload}`;

  let cryptoKey;
  try {
    cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      pemToDer(pemKey),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );
  } catch {
    // Invalid key format — treat as credentials error
    throw Object.assign(new Error('Invalid private key format'), { code: 'CREDENTIALS_ERROR' });
  }

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${base64url(signature)}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion:  jwt,
    }),
  });

  if (!tokenRes.ok) {
    const status = tokenRes.status;
    if (status === 401 || status === 403) {
      throw Object.assign(new Error('Google auth rejected'), { code: 'CREDENTIALS_ERROR' });
    }
    throw Object.assign(new Error(`Google token exchange: ${status}`), { code: 'UPSTREAM_ERROR' });
  }

  const data = await tokenRes.json();
  return data.access_token;
}

/* ─────────────────────────────────────────────────────────────────
   Date helpers
───────────────────────────────────────────────────────────────── */
function isoDateStr(dateOrDateTime, isAllDayEnd = false) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOrDateTime)) {
    if (isAllDayEnd) {
      const d = new Date(dateOrDateTime + 'T00:00:00Z');
      d.setUTCDate(d.getUTCDate() - 1);
      return d.toISOString().slice(0, 10);
    }
    return dateOrDateTime;
  }
  return new Date(dateOrDateTime).toISOString().slice(0, 10);
}

function datesBetween(startStr, endStr) {
  const dates = [];
  const cur   = new Date(startStr + 'T00:00:00Z');
  const end   = new Date(endStr   + 'T00:00:00Z');
  while (cur <= end) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

/* ─────────────────────────────────────────────────────────────────
   Route handler
───────────────────────────────────────────────────────────────── */
export async function GET(request) {
  // ── 1. Validate input ──────────────────────────────────────────
  const { searchParams } = new URL(request.url);
  const monthParam = searchParams.get('month');

  if (!monthParam || !/^\d{4}-\d{2}$/.test(monthParam)) {
    return NextResponse.json(
      { error: 'month param required, format YYYY-MM' },
      { status: 400 }
    );
  }

  // ── 2. Validate server config (lazy — only at request time) ───
  const config = getConfig();
  if (!config) {
    // Log safe code only — never variable names or values
    console.warn('[calendar/availability] Configuration incomplete');
    return NextResponse.json(
      {
        error: 'Calendar availability is not configured',
        code:  'CALENDAR_NOT_CONFIGURED',
      },
      { status: 503 }
    );
  }

  // ── 3. Build time range ────────────────────────────────────────
  const [year, month] = monthParam.split('-').map(Number);
  const timeMin = new Date(Date.UTC(year, month - 1, 1)).toISOString();
  const timeMax = new Date(Date.UTC(year, month,     1)).toISOString();

  // ── 4. Fetch from Google Calendar ─────────────────────────────
  try {
    const token = await getAccessToken(config.email, config.rawKey);

    const url = new URL(
      'https://www.googleapis.com/calendar/v3/calendars/' +
      encodeURIComponent(config.calendarId) + '/events'
    );
    url.searchParams.set('timeMin',      timeMin);
    url.searchParams.set('timeMax',      timeMax);
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy',      'startTime');
    // Only fetch start/end — no titles, descriptions, attendees, locations
    url.searchParams.set('fields',
      'items(start/date,start/dateTime,end/date,end/dateTime)');

    const gcalRes = await fetch(url.toString(), {
      headers:   { Authorization: `Bearer ${token}` },
      // No caching on sensitive auth responses
      cache:     'no-store',
    });

    if (!gcalRes.ok) {
      const status = gcalRes.status;
      console.warn('[calendar/availability] Google Calendar HTTP', status);

      if (status === 401 || status === 403) {
        return NextResponse.json(
          { error: 'Calendar availability is temporarily unavailable', code: 'CREDENTIALS_ERROR' },
          { status: 503 }
        );
      }
      if (status === 429) {
        return NextResponse.json(
          { error: 'Calendar availability is temporarily unavailable', code: 'RATE_LIMITED' },
          { status: 503 }
        );
      }
      // Google 5xx / network
      return NextResponse.json(
        { error: 'Calendar availability is temporarily unavailable', code: 'UPSTREAM_ERROR' },
        { status: 502 }
      );
    }

    const gcalData = await gcalRes.json();
    const items    = gcalData.items ?? [];

    // Normalize to sorted array of YYYY-MM-DD strings
    const busySet = new Set();
    for (const item of items) {
      const start    = item.start?.date || item.start?.dateTime;
      const end      = item.end?.date   || item.end?.dateTime;
      if (!start) continue;
      const isAllDay = Boolean(item.start?.date);
      const startStr = isoDateStr(start, false);
      const endStr   = end ? isoDateStr(end, isAllDay) : startStr;
      for (const d of datesBetween(startStr, endStr)) busySet.add(d);
    }

    // Return minimal response — only busy dates and timezone
    return NextResponse.json(
      {
        busyDates: Array.from(busySet).sort(),
        timeZone:  config.timeZone,
      },
      {
        headers: {
          // Cache 15 min on CDN, serve stale up to 30 min while revalidating
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
        },
      }
    );

  } catch (err) {
    // Classify caught errors — never expose err.message or stack
    const code = err?.code || 'INTERNAL_ERROR';

    if (code === 'CREDENTIALS_ERROR') {
      console.warn('[calendar/availability] Credentials error');
      return NextResponse.json(
        { error: 'Calendar availability is temporarily unavailable', code },
        { status: 503 }
      );
    }

    // All other errors (network, crypto, unexpected)
    console.error('[calendar/availability] Unexpected error code:', code);
    return NextResponse.json(
      { error: 'Calendar availability is temporarily unavailable', code: 'INTERNAL_ERROR' },
      { status: 503 }
    );
  }
}
