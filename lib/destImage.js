/**
 * Deterministic destination image resolver.
 *
 * Accepts a featuredImage value from destinations data and returns a
 * guaranteed-valid src string for next/image:
 *   - local paths must start with /
 *   - remote URLs must start with http:// or https://
 *
 * If the value is invalid (bare slug, empty, undefined, etc.) a verified
 * local fallback is returned. In development an invalid value is logged once.
 *
 * FALLBACK: /destination/delhi.jpg — confirmed to exist in public/destination/.
 */

const FALLBACK = '/destination/delhi.jpg';

const VALID_RE = /^(\/|https?:\/\/)/;

const _warned = new Set();

export function resolveDestImage(src, slug = '') {
  if (typeof src === 'string' && VALID_RE.test(src)) return src;

  if (process.env.NODE_ENV !== 'production' && !_warned.has(slug)) {
    console.warn(
      `[destImage] Invalid featuredImage "${src}" for slug "${slug}". Using fallback.`
    );
    _warned.add(slug);
  }

  return FALLBACK;
}
