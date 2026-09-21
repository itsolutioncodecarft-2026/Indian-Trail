/**
 * Indian Routes & Trails — Text Logo
 * Two-line wordmark: brand name + tagline
 * Colours use Haveli Indigo tokens via CSS variables where possible.
 */
export default function Logo({ scrolled = false, variant = 'auto', size = 'md' }) {
  let useDark;
  if (variant === 'dark')       useDark = true;
  else if (variant === 'light') useDark = false;
  else                          useDark = scrolled;

  // On dark (transparent nav / footer): white name
  // On light (scrolled nav): deep text
  const nameColor = useDark ? '#14142B' : '#FEFCF7';
  // Marigold for the diamond and tagline — consistent in both states
  const goldColor = '#E8A317';

  const sizes = {
    sm: { name: '13px', tag: '7px',  gap: '2px', iconSize: 14 },
    md: { name: '15px', tag: '8px',  gap: '3px', iconSize: 17 },
    lg: { name: '18px', tag: '9px',  gap: '3px', iconSize: 20 },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5" style={{ userSelect: 'none' }}>
      {/* Diamond mark */}
      <div className="shrink-0 flex items-center justify-center"
        style={{ width: s.iconSize, height: s.iconSize }}>
        <svg
          width={s.iconSize} height={s.iconSize}
          viewBox="0 0 20 20" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer diamond */}
          <polygon points="10,1 19,10 10,19 1,10" stroke={goldColor} strokeWidth="1" fill="none" />
          {/* Inner diamond fill — subtle */}
          <polygon points="10,5 15,10 10,15 5,10" fill={goldColor} opacity="0.18" />
          {/* Centre dot */}
          <circle cx="10" cy="10" r="1.8" fill={goldColor} />
        </svg>
      </div>

      {/* Text stack */}
      <div className="flex flex-col leading-none" style={{ gap: s.gap }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: s.name,
          fontWeight: 500,
          letterSpacing: '0.06em',
          color: nameColor,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          Indian Routes &amp; Trails
        </span>
        <span style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: s.tag,
          fontWeight: 400,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: goldColor,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          A Signature of Excellence
        </span>
      </div>
    </div>
  );
}
