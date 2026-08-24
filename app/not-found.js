import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-charcoal flex items-center justify-center py-20">
      <div className="text-center px-6">
        <p className="font-serif text-8xl font-light text-gold/20 mb-4">404</p>
        <p className="eyebrow text-gold mb-5">Page Not Found</p>
        <h1 className="font-serif text-4xl font-light text-ivory-100 mb-5">
          This Path Leads Nowhere
        </h1>
        <p className="font-sans text-base font-light text-ivory-100/50 mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let Om guide you back to the right path.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-gold">Return Home</Link>
          <Link href="/tours" className="btn-outline border-ivory-100/30 text-ivory-100/70 hover:bg-ivory-100/10">
            Explore Journeys
          </Link>
        </div>
      </div>
    </section>
  );
}
