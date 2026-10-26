'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * useSnapCarousel — single-item-step scroll-snap carousel
 * ─────────────────────────────────────────────────────────────────
 * Each prev/next arrow advances exactly ONE item.
 * Active index = index of the left-most visible item.
 * Total "dot positions" = total - perView + 1  (no blank windows).
 *
 * @param {number} total     – total number of items
 * @param {number} perView   – items visible at once (1/2/3)
 * @param {number} gap       – px gap between items (must match CSS)
 */
export function useSnapCarousel(total, perView = 1, gap = 28) {
  const trackRef   = useRef(null);
  const activeIdxRef = useRef(0);          // ref mirror for ResizeObserver
  const [activeIndex, setActiveIndex] = useState(0);

  // Number of valid left-most positions (no blank windows)
  const positions = Math.max(1, total - perView + 1);
  const maxIndex  = positions - 1;

  // Keep ref in sync with state
  useEffect(() => { activeIdxRef.current = activeIndex; }, [activeIndex]);

  // ── Measure a single item's width from the DOM ───────────────
  const getItemWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstChild = track.firstElementChild;
    if (firstChild) return firstChild.clientWidth;
    const totalGaps = gap * (perView - 1);
    return (track.clientWidth - totalGaps) / perView;
  }, [gap, perView]);

  // ── Scroll to a given item index ────────────────────────────
  const scrollToIndex = useCallback(
    (n) => {
      const clamped = Math.min(Math.max(n, 0), maxIndex);
      const track   = trackRef.current;
      if (!track) return;

      const item = track.children[clamped];
      if (item) {
        const prefersReducedMotion =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        track.scrollTo({
          left:     item.offsetLeft,
          behavior: prefersReducedMotion ? 'instant' : 'smooth',
        });
      }
    },
    [maxIndex],
  );

  // ── Navigation helpers ───────────────────────────────────────
  const prev  = useCallback(() => scrollToIndex(activeIdxRef.current - 1), [scrollToIndex]);
  const next  = useCallback(() => scrollToIndex(activeIdxRef.current + 1), [scrollToIndex]);
  const goTo  = useCallback((n) => scrollToIndex(n),                         [scrollToIndex]);

  // ── Derive active index from scroll position ─────────────────
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft  = track.scrollLeft;
    const items       = Array.from(track.children);
    if (!items.length) return;

    let best  = 0;
    let bestD = Infinity;
    items.forEach((child, i) => {
      const d = Math.abs(child.offsetLeft - scrollLeft);
      if (d < bestD) { bestD = d; best = i; }
    });

    const clamped = Math.min(best, maxIndex);
    setActiveIndex((prev) => (prev === clamped ? prev : clamped));
  }, [maxIndex]);

  // ── Clamp active index on perView/total change ───────────────
  useEffect(() => {
    setActiveIndex((i) => {
      const clamped = Math.min(i, maxIndex);
      return clamped;
    });
  }, [maxIndex]);

  // ── Attach ResizeObserver + scroll listener ──────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(handleScroll);
    };

    track.addEventListener('scroll', onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      // Re-align to current item without jump
      const cur = activeIdxRef.current;
      const item = track.children[cur];
      if (item) {
        track.scrollTo({ left: item.offsetLeft, behavior: 'instant' });
      }
      onScroll();
    });
    ro.observe(track);

    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScroll]);

  return {
    trackRef,
    activeIndex,
    positions,
    goTo,
    prev,
    next,
    canPrev: activeIndex > 0,
    canNext: activeIndex < maxIndex,
    getItemWidth,
  };
}
