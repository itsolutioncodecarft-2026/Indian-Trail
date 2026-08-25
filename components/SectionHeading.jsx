export default function SectionHeading({ eyebrow, title, subtitle, centered = false, light = false, className = '' }) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="eyebrow mb-4" style={{ color: light ? '#C8A96E' : '#C49A3C' }}>
          {eyebrow}
        </p>
      )}
      <h2 className="section-title mb-0" style={{ color: light ? '#FEFCF7' : '#1a2332' }}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl font-sans font-light text-lg leading-relaxed ${centered ? 'mx-auto' : ''}`}
          style={{ color: light ? 'rgba(254,252,247,0.6)' : '#4A5568' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
