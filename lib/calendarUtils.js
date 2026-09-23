/**
 * calendarUtils.js
 * ─────────────────────────────────────────────────────────────────
 * Pure client-side utility functions for Google Calendar time-slot logic.
 * No external dependencies. All date math uses half-open intervals [start, end).
 *
 * Boundary touches are NOT overlaps:
 *   A booking that ends at 11:00 and a new booking starting at 11:00
 *   do NOT conflict.
 *
 * All time strings are "HH:MM" (24-hour). All date strings are "YYYY-MM-DD".
 * Event objects: { id, title, start, end, allDay }
 *   start/end are ISO strings (e.g. "2026-03-22T09:00:00+05:30" or "2026-03-22T00:00:00Z")
 */

/* ── helpers ─────────────────────────────────────────────────────── */

/** Parse "HH:MM" into total minutes since midnight */
function timeToMins(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** Convert total minutes to "HH:MM" */
function minsToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Format "HH:MM" (24h) → "h:mm AM/PM" for display */
function formatLabel(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour   = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

/** Extract the date part "YYYY-MM-DD" from an ISO datetime string.
    Works for both UTC Z strings and offset strings. */
function isoToDate(isoStr) {
  // "2026-03-22T09:00:00+05:30" → "2026-03-22"
  return isoStr.slice(0, 10);
}

/** Extract "HH:MM" from an ISO datetime string (local time from the string) */
function isoToTime(isoStr) {
  // e.g. "2026-03-22T09:30:00+05:30" → "09:30"
  const timePart = isoStr.slice(11, 16);
  return timePart;
}

/* ── 1. getEventsForDate ─────────────────────────────────────────── */
/**
 * Filter events array to only those that cover a specific date.
 * @param {Array} events  - normalized event objects from /api/booked-dates
 * @param {string} dateStr - "YYYY-MM-DD"
 * @returns {Array} events that touch that date
 */
export function getEventsForDate(events, dateStr) {
  if (!events?.length || !dateStr) return [];
  return events.filter(ev => {
    if (ev.allDay) {
      // All-day: start = "YYYY-MM-DD" (inclusive), end = "YYYY-MM-DD" (EXCLUSIVE)
      // So last booked day = end minus 1 day.
      // e.g. event on July 10: start="2026-07-10", end="2026-07-11"
      //   → dateStr "2026-07-10": start(10) <= date(10) < end(11) ✓
      return ev.start <= dateStr && dateStr < ev.end;
    }
    // Timed event: start/end are ISO dateTime strings like "2026-07-10T09:00:00+05:30"
    // Extract date part (first 10 chars) — works for any offset
    const startDate = ev.start.slice(0, 10);
    const endDate   = ev.end.slice(0, 10);
    // A timed event covers a date if it starts on or before AND ends on or after
    // (even if it ends at midnight of that date)
    return startDate <= dateStr && dateStr <= endDate;
  });
}

/* ── 2. validateTimeSlot ─────────────────────────────────────────── */
/**
 * Check whether a proposed [startTime, endTime) slot conflicts with any events.
 * Uses half-open interval: boundary touches are NOT overlaps.
 * @param {string} dateStr   - "YYYY-MM-DD"
 * @param {string} startTime - "HH:MM"
 * @param {string} endTime   - "HH:MM"
 * @param {Array}  events    - all events (will be filtered to dateStr internally)
 * @returns {{ valid: boolean, reason: string }}
 */
export function validateTimeSlot(dateStr, startTime, endTime, events) {
  if (!dateStr || !startTime || !endTime) {
    return { valid: false, reason: 'Date and time are required.' };
  }

  const newStart = timeToMins(startTime);
  const newEnd   = timeToMins(endTime);

  if (newEnd <= newStart) {
    return { valid: false, reason: 'End time must be after start time.' };
  }

  const dayEvents = getEventsForDate(events, dateStr);

  // All-day event on this date = whole day blocked
  if (dayEvents.some(ev => ev.allDay)) {
    return { valid: false, reason: 'This date is fully booked.' };
  }

  // Check timed overlaps using half-open intervals [start, end)
  for (const ev of dayEvents) {
    const evStart = timeToMins(isoToTime(ev.start));
    const evEnd   = timeToMins(isoToTime(ev.end));

    // Overlap condition: newStart < evEnd && newEnd > evStart
    if (newStart < evEnd && newEnd > evStart) {
      return { valid: false, reason: 'This time slot conflicts with an existing booking.' };
    }
  }

  return { valid: true, reason: '' };
}

/* ── 3. generateTimeSlots ────────────────────────────────────────── */
/**
 * Generate all time slots for a day at fixed intervals.
 * @param {number} intervalMins  - e.g. 30
 * @param {number} dayStartHour  - e.g. 8  (8:00 AM)
 * @param {number} dayEndHour    - e.g. 20 (8:00 PM)
 * @returns {Array<{ value: string, label: string }>}
 */
export function generateTimeSlots(intervalMins = 30, dayStartHour = 8, dayEndHour = 20) {
  const slots = [];
  let cur = dayStartHour * 60;
  const end = dayEndHour * 60;

  while (cur < end) {
    const value = minsToTime(cur);
    slots.push({ value, label: formatLabel(value) });
    cur += intervalMins;
  }

  return slots;
}

/* ── 4. isSlotBlocked ────────────────────────────────────────────── */
/**
 * Check if a single time slot starting at slotValue is blocked by any event.
 * A slot of `intervalMins` is blocked if [slotStart, slotStart+interval) overlaps
 * any existing booking using half-open interval logic.
 * @param {string} dateStr       - "YYYY-MM-DD"
 * @param {string} slotValue     - "HH:MM" slot start
 * @param {Array}  dayEvents     - events already filtered to this date
 * @param {number} intervalMins
 * @returns {boolean}
 */
export function isSlotBlocked(dateStr, slotValue, dayEvents, intervalMins = 30) {
  if (dayEvents.some(ev => ev.allDay)) return true;

  const slotStart = timeToMins(slotValue);
  const slotEnd   = slotStart + intervalMins;

  return dayEvents.some(ev => {
    const evStart = timeToMins(isoToTime(ev.start));
    const evEnd   = timeToMins(isoToTime(ev.end));
    // Half-open overlap: slotStart < evEnd && slotEnd > evStart
    return slotStart < evEnd && slotEnd > evStart;
  });
}

/* ── 5. getAvailableStartSlots ───────────────────────────────────── */
/**
 * Return all unblocked start times for a given date.
 * @param {string} dateStr
 * @param {Array}  dayEvents   - events filtered to this date
 * @param {number} intervalMins
 * @param {number} dayStartHour
 * @param {number} dayEndHour
 * @returns {Array<{ value: string, label: string }>}
 */
export function getAvailableStartSlots(
  dateStr, dayEvents, intervalMins = 30, dayStartHour = 8, dayEndHour = 20
) {
  if (!dateStr) return [];
  const allSlots = generateTimeSlots(intervalMins, dayStartHour, dayEndHour);
  return allSlots.filter(slot => !isSlotBlocked(dateStr, slot.value, dayEvents, intervalMins));
}

/* ── 6. getAvailableEndSlots ─────────────────────────────────────── */
/**
 * Return valid end times after a chosen start time that don't overlap bookings.
 * End time must be > selectedStart. We walk forward in intervalMins steps
 * and stop as soon as we hit a blocked interval.
 * @param {string} dateStr
 * @param {string} selectedStart  - "HH:MM"
 * @param {Array}  dayEvents
 * @param {number} intervalMins
 * @param {number} dayEndHour
 * @returns {Array<{ value: string, label: string }>}
 */
export function getAvailableEndSlots(
  dateStr, selectedStart, dayEvents, intervalMins = 30, dayEndHour = 20
) {
  if (!dateStr || !selectedStart) return [];
  if (dayEvents.some(ev => ev.allDay)) return [];

  const startMins = timeToMins(selectedStart);
  const maxMins   = dayEndHour * 60;
  const slots     = [];

  let cur = startMins + intervalMins;

  while (cur <= maxMins) {
    const endValue = minsToTime(cur);

    // Check if the segment [selectedStart, endValue) is clean so far
    const conflict = dayEvents.some(ev => {
      const evStart = timeToMins(isoToTime(ev.start));
      const evEnd   = timeToMins(isoToTime(ev.end));
      return startMins < evEnd && cur > evStart;
    });

    if (conflict) break; // stop at first blocked slot

    slots.push({ value: endValue, label: formatLabel(endValue) });
    cur += intervalMins;
  }

  return slots;
}
