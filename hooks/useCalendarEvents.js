'use client';
/**
 * useCalendarEvents
 * ─────────────────────────────────────────────────────────────────
 * Shared fetch hook for /api/booked-dates.
 * Used by both AvailabilityDrawer and FormDatePicker so there is
 * exactly one fetch implementation, one loading state, one error
 * state, and one normalization path.
 *
 * Usage:
 *   const { events, loading, error, notConfigured, retry } = useCalendarEvents(enabled);
 *
 * Parameters:
 *   enabled — boolean. Fetch fires (or re-fires) when this becomes true.
 *             Pass `open` from the drawer, or `true` for always-mount.
 *
 * Returns:
 *   events        — Event[] (empty until loaded; never null after load)
 *   loading       — true while fetching
 *   error         — true on network / server error
 *   notConfigured — true when server returns CALENDAR_NOT_CONFIGURED
 *   warnings      — string[] from server (e.g. holiday source failed)
 *   retry         — () => void — re-fetch with a fresh no-store request
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export function useCalendarEvents(enabled = true) {
  const [events,        setEvents]        = useState(null);   // null = never loaded
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState(false);
  const [notConfigured, setNotConfigured] = useState(false);
  const [warnings,      setWarnings]      = useState([]);

  // fetchCount increments on each retry so useEffect re-runs
  const [fetchCount, setFetchCount] = useState(0);
  const abortRef = useRef(null);

  const fetch_ = useCallback(async () => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(false);
    setNotConfigured(false);

    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res  = await fetch('/api/booked-dates', {
        signal: controller.signal,
        cache:  'no-store',
      });
      const data = await res.json().catch(() => ({}));

      if (controller.signal.aborted) return;

      if (!res.ok) {
        if (data?.code === 'CALENDAR_NOT_CONFIGURED') {
          setNotConfigured(true);
          setEvents([]);
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }

      setEvents(Array.isArray(data.events) ? data.events : []);
      setWarnings(Array.isArray(data.warnings) ? data.warnings : []);
      setError(false);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(true);
      setEvents(prev => prev ?? []);   // keep existing data if any
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    fetch_();
    return () => { abortRef.current?.abort(); };
  // fetchCount is the only external trigger — fetch_ is stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, fetchCount, fetch_]);

  const retry = useCallback(() => {
    setFetchCount(c => c + 1);
  }, []);

  return {
    events:        events ?? [],
    loading:       loading || events === null,
    error,
    notConfigured,
    warnings,
    retry,
  };
}
