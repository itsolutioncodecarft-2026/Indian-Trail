'use client';
import Image from 'next/image';
import Link from 'next/link';
import { omStory } from '@/data/siteContent';
import { ArrowRight } from 'lucide-react';

/* ── 4 stats ─────────────────────────────────────────────────────── */
const STATS = [
  { value: '38+', label: 'Years', sub: 'Guiding excellence across India, since 1988' },
  { value: 'GOI', label: 'Authorised', sub: 'PAN-India guide, Ministry of Tourism' },
  { value: 'ES', label: 'Spanish-Speaking Specialist', sub: 'For travellers from Spain & Latin America' },
  { value: '✦', label: 'Master Storyteller', sub: 'History, art, culture & heritage' },
];

export default function HomeAboutTeaser() {
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch">

          {/* ── Image column ── */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[500px] lg:h-full overflow-hidden"
              style={{ borderRadius: 'var(--radius-card)' }}>
              <Image
                src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&q=85"
                alt="Om Prakash Saini — Indian Routes & Trails"
                fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            {/* Stat badge */}
            <div
              className="absolute bottom-8 -right-0 lg:-right-8 p-5 hidden md:block z-10"
              style={{
                backgroundColor: 'var(--color-primary)',
                maxWidth: '190px',
                borderRadius: 'var(--radius-card)',
              }}
            >
              <p className="font-serif text-3xl font-light leading-none mb-1"
                style={{ color: 'var(--color-text-invert)' }}>38+</p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-text-invert-muted)' }}>
                Years guiding India
              </p>
            </div>
          </div>

          {/* ── Text column ── */}
          <div className="lg:col-span-7 lg:pl-16 xl:pl-24 flex flex-col justify-center">
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="section-title mb-5">
              The Man Behind<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Every Journey
              </em>
            </h2>
            <div className="divider-gold mb-7" />

            {/* Quote */}
            <blockquote className="pl-4 mb-6"
              style={{ borderLeft: '3px solid var(--color-secondary)', margin: 0 }}>
              <p className="font-serif text-base italic font-light leading-relaxed"
                style={{ color: 'var(--color-text)' }}>
                &ldquo;{omStory.quote}&rdquo;
              </p>
              <footer className="font-sans text-[10px] tracking-[0.22em] uppercase mt-2"
                style={{ color: 'var(--color-secondary)' }}>
                — Om Prakash Saini
              </footer>
            </blockquote>

            {/* Paragraphs */}
            <div className="space-y-4 mb-8">
              <p className="body-large">{omStory.story[0]}</p>
              <p className="body-text">{omStory.story[3]}</p>
            </div>

            {/* 4 stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {STATS.map((s, i) => (
                <div key={i} className="p-3 text-center"
                  style={{
                    backgroundColor: 'var(--color-surface-alt)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-control)',
                  }}>
                  <p className="font-serif font-light leading-none mb-0.5"
                    style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--color-primary)' }}>
                    {s.value}
                  </p>
                  <p className="font-sans font-semibold leading-tight"
                    style={{ fontSize: '9px', letterSpacing: '0.06em', color: 'var(--color-text)', textTransform: 'uppercase' }}>
                    {s.label}
                  </p>
                  <p className="font-sans leading-snug mt-1"
                    style={{ fontSize: '8px', color: 'var(--color-text-muted)' }}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="btn-link-secondary group inline-flex items-center gap-3 self-start"
            >
              Read My Story
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
