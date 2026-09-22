'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Shared carousel hook — powers Journeys, mobile Festival, mobile Destinations,
 * and mobile WhyUs sliders.
 *
 * @param {number} total   – total number of items
 * @param {number} perView – items visible at once (1 = mobile, 3 = desktop)
 */
export function useCarousel(total, perView = 1) {
  const maxIndex = Math.max(0, total - perView);
  const [index, setIndex] = useState(0);

  // Keep index in bounds whenever perView or total changes
  const clamp = useCallback(
    (n) => Math.min(Math.max(n, 0), Math.max(0, total - perView)),
    [total, perView]
  );

  useEffect(() => {
    setIndex((i) => clamp(i));
  }, [clamp]);

  const prev = useCallback(() => setIndex((i) => clamp(i - 1)), [clamp]);
  const next = useCallback(() => setIndex((i) => clamp(i + 1)), [clamp]);
  const goTo = useCallback((n) => setIndex(clamp(n)), [clamp]);

  // ── Touch / swipe ─────────────────────────────────────────────
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const didSwipe    = useRef(false);

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    didSwipe.current    = false;
  }, []);

  const onTouchMove = useCallback((e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      didSwipe.current = true;
      e.preventDefault(); // block page scroll during horizontal swipe
    }
  }, []);

  const onTouchEnd = useCallback((e) => {
    if (!didSwipe.current || touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -36) next();
    else if (dx > 36) prev();
    touchStartX.current = null;
    didSwipe.current    = false;
  }, [next, prev]);

  return {
    index,
    maxIndex: Math.max(0, total - perView),
    prev,
    next,
    goTo,
    canPrev: index > 0,
    canNext: index < Math.max(0, total - perView),
    touchHandlers: { onTouchStart, onTouchMove, onTouchEnd },
  };
}
