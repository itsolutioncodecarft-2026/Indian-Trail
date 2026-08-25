'use client';
import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-narrow text-center">
        <p className="eyebrow mb-5">Begin Your Journey</p>
        <h2 className="section-title mb-6">
          Ready to Experience<br />
          <span className="italic font-light" style={{ color: '#2B6CB0' }}>India With Om?</span>
        </h2>
        <p className="body-large mb-10 max-w-xl mx-auto">
          Browse five curated journeys or reach out directly to begin designing your personalised expedition.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tours" className="btn-primary">Explore Journeys</Link>
          <Link href="/contact" className="btn-outline">Enquire Now</Link>
        </div>
      </div>
    </section>
  );
}
