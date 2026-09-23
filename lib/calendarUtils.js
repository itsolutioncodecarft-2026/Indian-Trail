/**
 * calendarUtils.js
 * ─────────────────────────────────────────────────────────────────
 * Pure client-side helpers for Google Calendar event data.
 * No external dependencies. All date math uses half-open intervals [start, end).
 *
 * Expected event shape (from /api/booked-dates):
 *   {
 *     id:                string,
 *     calendarSource:    "booking" | "holiday",
 *     type:              "booking" | "festival",
 *     title:             string,
 *     start:             string,  // "YYYY-MM-DD" all-day | ISO dateTime timed
 *     end:               string,  // "YYYY-MM-DD" EXCLUSIVE all-day | ISO dateTime
 *     allDay:            boolean,
 *     blocksAvailability: boolean,
 *   }
 *
 * Backward-compatible: also accepts old shape { type:"booked"|"holiday", label }
 * so existing deployed data keeps working.
 */

/* ── internal helpers ────────────────────────────────────────────── */

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

/** Format "HH:MM" (24h) → "h:mm AM/PM" */
function formatLabel(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour   = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

/** Extract "HH:MM" from an ISO datetime string */
function isoToTime(isoStr) {
  return isoStr.slice(11, 16);
}

/**
 * Normalize an event to the canonical shape used internally.
 * Handles both new shape (title, type:"booking"|"festival", blocksAvailability)
 * and old shape (label, type:"booked"|"holiday").
 */
function normalize(ev) {
  // New shape already correct
  if (ev.blocksAvailability !== undefined) return ev;

  // Old shape compatibility
  const isBooked = ev.type === 'booked';
  return {
    ...ev,
    type:               isBooked ? 'booking'  : 'festival',
    title:              ev.title || ev.label  || (isBooked ? 'Booked' : 'Event'),
    blocksAvailability: isBooked,
    calendarSource:     isBooked ? 'booking'  : 'holiday',
  };
}

/* ── public API ──────────────────────────────────────────────────── */

/**
 * Return all events whose date range covers dateStr.
 * Half-open interval for all-day: start <= date < end
 * @param {Array}  events
 * @param {string} dateStr "YYYY-MM-DD"
 */
export function getEventsForDate(events, dateStr) {
  if (!events?.length || !dateStr) return [];
  return events.map(normalize).filter(ev => {
    if (ev.allDay) {
      return ev.start <= dateStr && dateStr < ev.end;
    }
    // Timed: compare date portions
    const startDate = ev.start.slice(0, 10);
    const endDate   = ev.end.slice(0, 10);
    return startDate <= dateStr && dateStr <= endDate;
  });
}

/**
 * Return only BLOCKING events (blocksAvailability:true) for a date.
 * Use this to decide if a date is unavailable for selection.
 */
export function getBlockingEventsForDate(events, dateStr) {
  return getEventsForDate(events, dateStr).filter(ev => ev.blocksAvailability);
}

/**
 * Return only FESTIVAL/HOLIDAY events (type:"festival") for a date.
 * These are informational — they do NOT block selection by default.
 */
export function getFestivalsForDate(events, dateStr) {
  return getEventsForDate(events, dateStr).filter(ev => ev.type === 'festival');
}

/**
 * Backward-compat alias — returns blocking events same as getBlockingEventsForDate.
 */
export function getBookingsForDate(events, dateStr) {
  return getBlockingEventsForDate(events, dateStr);
}

/**
 * Returns true if a date has any blocking events.
 * Festival-only dates are NOT blocked (still selectable).
 */
export function isDateBooked(events, dateStr) {
  return getBlockingEventsForDate(events, dateStr).length > 0;
}

/** Alias for isDateBooked — preferred name in new code. */
export function isDateBlocked(events, dateStr) {
  return isDateBooked(events, dateStr);
}

/* ── time slot utilities (for timed-booking admin views) ─────────── */

/**
 * Check whether a proposed [startTime, endTime) slot conflicts with any events.
 * @param {string} dateStr
 * @param {string} startTime "HH:MM"
 * @param {string} endTime   "HH:MM"
 * @param {Array}  events
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

  const dayEvents = getBlockingEventsForDate(events, dateStr);

  if (dayEvents.some(ev => ev.allDay)) {
    return { valid: false, reason: 'This date is fully booked.' };
  }

  for (const ev of dayEvents) {
    const evStart = timeToMins(isoToTime(ev.start));
    const evEnd   = timeToMins(isoToTime(ev.end));
    if (newStart < evEnd && newEnd > evStart) {
      return { valid: false, reason: 'This time slot conflicts with an existing booking.' };
    }
  }

  return { valid: true, reason: '' };
}

/**
 * Generate all time slots for a day at fixed intervals.
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

/**
 * Check if a single slot starting at slotValue is blocked.
 */
export function isSlotBlocked(dateStr, slotValue, dayEvents, intervalMins = 30) {
  if (dayEvents.some(ev => ev.allDay && ev.blocksAvailability)) return true;
  const slotStart = timeToMins(slotValue);
  const slotEnd   = slotStart + intervalMins;
  return dayEvents.some(ev => {
    if (!ev.blocksAvailability) return false;
    const evStart = timeToMins(isoToTime(ev.start));
    const evEnd   = timeToMins(isoToTime(ev.end));
    return slotStart < evEnd && slotEnd > evStart;
  });
}

/**
 * Return all unblocked start times for a given date.
 */
export function getAvailableStartSlots(
  dateStr, dayEvents, intervalMins = 30, dayStartHour = 8, dayEndHour = 20
) {
  if (!dateStr) return [];
  const allSlots = generateTimeSlots(intervalMins, dayStartHour, dayEndHour);
  return allSlots.filter(slot => !isSlotBlocked(dateStr, slot.value, dayEvents, intervalMins));
}

/**
 * Return valid end times after a chosen start time that don't overlap bookings.
 */
export function getAvailableEndSlots(
  dateStr, selectedStart, dayEvents, intervalMins = 30, dayEndHour = 20
) {
  if (!dateStr || !selectedStart) return [];
  if (dayEvents.some(ev => ev.allDay && ev.blocksAvailability)) return [];

  const startMins = timeToMins(selectedStart);
  const maxMins   = dayEndHour * 60;
  const slots     = [];
  let cur = startMins + intervalMins;

  while (cur <= maxMins) {
    const endValue = minsToTime(cur);
    const conflict = dayEvents.some(ev => {
      if (!ev.blocksAvailability) return false;
      const evStart = timeToMins(isoToTime(ev.start));
      const evEnd   = timeToMins(isoToTime(ev.end));
      return startMins < evEnd && cur > evStart;
    });
    if (conflict) break;
    slots.push({ value: endValue, label: formatLabel(endValue) });
    cur += intervalMins;
  }

  return slots;
}
