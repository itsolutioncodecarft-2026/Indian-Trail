'use client';
import Image from 'next/image';
import { omStory } from '@/data/siteContent';
import { CheckCircle } from 'lucide-react';

export default function AboutStory() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg)',
        paddingTop:    'clamp(32px, 5vw, 72px)',
        paddingBottom: 'clamp(32px, 5vw, 72px)',
      }}
    >
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* ── story text ── */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="eyebrow mb-2">My Story</p>
            <h2 className="section-title mb-3">My Story</h2>
            <div className="divider-gold mb-6" />

            <div className="space-y-5">
              {/* ¶1 Introduction */}
              <p style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize:   '1.05rem',
                fontStyle:  'italic',
                color:      'var(--color-text)',
                fontWeight: 300,
                lineHeight: 1.7,
                margin: 0,
              }}>
                {omStory.story[0]}
              </p>

              {/* ¶2 – ¶5 */}
              {omStory.story.slice(1).map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body, system-ui)',
                  fontSize:   '0.92rem',
                  color:      'var(--color-text-muted)',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote
              className="mt-8 p-5"
              style={{
                backgroundColor: 'rgba(27,42,94,0.05)',
                borderLeft: '4px solid var(--color-secondary)',
                borderRadius: '0 var(--radius-control) var(--radius-control) 0',
              }}
            >
              <p className="font-serif italic font-light leading-relaxed"
                style={{ color: 'var(--color-text)', fontSize: '1rem', margin: 0 }}>
                &ldquo;{omStory.pullQuote}&rdquo;
              </p>
              <footer className="font-sans text-[10px] tracking-[0.25em] uppercase mt-3"
                style={{ color: 'var(--color-secondary)' }}>
                — Om, Founder
              </footer>
            </blockquote>
          </div>

          {/* ── sidebar ── */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-24 space-y-4">

              {/* main quote card */}
              <div className="p-6"
                style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)' }}>
                <p className="font-serif italic font-light leading-snug mb-3"
                  style={{ color: 'var(--color-text-invert)', fontSize: '1rem' }}>
                  &ldquo;{omStory.quote}&rdquo;
                </p>
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: 'var(--color-secondary)' }}>
                  — Om Prakash Saini
                </p>
              </div>

              {/* image */}
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div
                  style={{
                    position:    'relative',
                    width:       '100%',
                    aspectRatio: '16/9',
                    maxHeight:   '160px',
                  }}
                  className="lg-story-img"
                >
                  <style>{`
                    @media (min-width: 1024px) {
                      .lg-story-img { max-height: none !important; }
                    }
                  `}</style>
                  <Image
                    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=85"
                    alt="Amber Fort, Jaipur — Indian Routes & Trails"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 32vw"
                  />
                </div>
              </div>

              {/* credentials */}
              <div className="p-4"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border:          '1px solid var(--color-border)',
                  borderRadius:    'var(--radius-card)',
                }}>
                <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-3"
                  style={{ color: 'var(--color-text-muted)' }}>
                  Experience &amp; Expertise
                </h3>
                <ul className="space-y-2">
                  {omStory.credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="mt-0.5 shrink-0"
                        style={{ color: 'var(--color-primary)' }} />
                      <span className="font-sans text-xs font-light leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {cred}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
