export default function SectionHeading({ eyebrow, title, subtitle, centered = false, light = false, className = '' }) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="eyebrow mb-4" style={{ color: light ? 'var(--color-secondary)' : 'var(--color-text-muted)' }}>
          {eyebrow}
        </p>
      )}
      <h2 className="section-title mb-0" style={{ color: light ? 'var(--color-text-invert)' : 'var(--color-text)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl font-sans font-light text-lg leading-relaxed ${centered ? 'mx-auto' : ''}`}
          style={{ color: light ? 'var(--color-text-invert-muted)' : 'var(--color-text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
