export default function SectionHeading({ eyebrow, title, subtitle, centered = false, light = false, className = '' }) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="eyebrow mb-4" style={{ color: light ? '#D4A853' : '#B8892A' }}>
          {eyebrow}
        </p>
      )}
      <h2
        className="section-title mb-0"
        style={{ color: light ? '#FAF6EC' : '#2C1810' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl leading-relaxed font-sans font-light text-lg ${centered ? 'mx-auto' : ''}`}
          style={{ color: light ? 'rgba(250,246,236,0.6)' : 'rgba(44,24,16,0.6)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
