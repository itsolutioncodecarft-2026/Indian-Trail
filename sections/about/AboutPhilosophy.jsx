'use client';
import Image from 'next/image';

const pts = [
  {
    title: 'Not a Tour Group — A Personal Guest',
    body: 'You are an honoured guest, not a number on a roster. Every journey I design is built around you — your pace, your curiosity and your desire to connect with the real India.',
  },
  {
    title: 'Ultra-Luxury Meets Authentic India',
    body: 'From palace hotels to hidden village experiences, I balance the finest comforts with genuine, unfiltered Indian life. Nothing is generic — everything is personal.',
  },
  {
    title: 'A Cultural Bridge',
    body: 'I take special dedication in guiding Spanish-speaking travellers, so that you feel entirely at ease while discovering India — translating not just words, but nuances, philosophies and shared human emotions.',
  },
  {
    title: 'Built on Trust',
    body: 'I believe the finest journeys are built on trust, knowledge, professionalism and genuine hospitality. These are the values that have guided every journey I have led since 1988.',
  },
];

/*
  All four images use the same aspect-ratio (4/3) and border-radius
  so they sit in a uniform 2×2 grid with even gaps.
  4/3 (landscape) suits travel photography better than the previous
  mixed 3/4 + 1/1 combination that caused uneven heights.
*/
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80',  alt: 'Taj Mahal, Agra — Indian Routes & Trails'        },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80', alt: 'Landscape, Rajasthan — Indian Routes & Trails'    },
  { src: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=700&q=80', alt: 'Lake Pichola, Udaipur — Indian Routes & Trails'   },
  { src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80', alt: 'Amber Fort, Jaipur — Indian Routes & Trails'       },
];

export default function AboutPhilosophy() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Philosophy points */}
          <div>
            <p className="eyebrow mb-5">Philosophy</p>
            <h2 className="section-title mb-6">
              My Philosophy of<br />
              <em className="font-light" style={{ color: 'var(--color-primary-light)' }}>
                Transformative Travel
              </em>
            </h2>
            <div className="divider-gold mb-10" />
            <div className="space-y-8">
              {pts.map((p, i) => (
                <div key={i} className="flex gap-5">
                  <div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(27,42,94,0.08)',
                      borderRadius:    'var(--radius-control)',
                    }}
                  >
                    <span className="font-serif text-sm" style={{ color: 'var(--color-primary)' }}>
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light mb-1.5"
                      style={{ color: 'var(--color-text)' }}>
                      {p.title}
                    </h3>
                    <p className="font-sans text-sm font-light leading-relaxed"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image grid — 2×2, all tiles identical aspect-ratio 4/3 */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '10px',
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{
                  aspectRatio:  '4/3',
                  borderRadius: 'var(--radius-card)',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width:1024px) 50vw, 22vw"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
