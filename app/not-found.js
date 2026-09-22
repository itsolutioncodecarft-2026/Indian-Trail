import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center py-20"
      style={{ backgroundColor: 'var(--color-primary-dark)' }}
    >
      <div className="text-center px-6">
        <p className="font-serif text-8xl font-light mb-4"
          style={{ color: 'rgba(232,163,23,0.18)' }}>
          404
        </p>
        <p className="eyebrow mb-5" style={{ color: 'var(--color-secondary)' }}>Page Not Found</p>
        <h1 className="font-serif text-4xl font-light mb-5"
          style={{ color: 'var(--color-text-invert)' }}>
          This Path Leads Nowhere
        </h1>
        <p className="font-sans text-base font-light mb-10 max-w-md mx-auto"
          style={{ color: 'rgba(255,255,255,0.5)' }}>
          The page you&apos;re looking for doesn&apos;t exist. Let Om guide you back.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-hero-primary">Return Home</Link>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-all duration-300"
            style={{
              border: '1.5px solid rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.65)',
              borderRadius: 'var(--radius-control)',
            }}
          >
            Explore Journeys
          </Link>
        </div>
      </div>
    </section>
  );
}
