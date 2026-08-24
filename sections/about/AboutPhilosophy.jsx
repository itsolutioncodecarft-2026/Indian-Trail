'use client';
import Image from 'next/image';

const pts = [
  { title: 'Not a Tour Group — A Personal Guest', body: 'Om steps away from the traditional role of a guide to become your personal architectural designer of travel. You are an honoured guest, not a number on a roster.' },
  { title: 'Ultra-Luxury Meets Authentic India', body: 'Every itinerary balances the finest comforts with raw, unfiltered authenticity. From palace hotels to hidden village experiences — nothing is generic.' },
  { title: 'A Cultural Bridge', body: 'Equipped with academic mastery of Spanish and deep cultural fluency, Om translates not just words but nuances, philosophies, and shared human emotions between India and the Spanish-speaking world.' },
  { title: 'Beyond the Brochure', body: 'The smell of morning chai in a hidden alleyway. A private blessing by a generational priest. The quiet sunset over ancient ruins known only to locals. These are the moments Om lives to create.' },
];

const imgs = [
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
  'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
];

export default function AboutPhilosophy() {
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#2C1810' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow mb-5" style={{ color: '#B8892A' }}>Philosophy</p>
            <h2 className="section-title mb-6" style={{ color: '#FAF6EC' }}>
              A Philosophy of<br />
              <span className="italic font-light" style={{ color: '#D4A853' }}>Transformative Travel</span>
            </h2>
            <div className="divider-gold mb-10" />
            <div className="space-y-8">
              {pts.map((p, i) => (
                <div key={i} className="flex gap-5">
                  <div
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center mt-0.5"
                    style={{ border: '1px solid rgba(184,137,42,0.4)' }}
                  >
                    <span className="font-serif text-sm" style={{ color: '#B8892A' }}>{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2" style={{ color: '#FAF6EC' }}>{p.title}</h3>
                    <p className="font-sans text-sm font-light leading-relaxed" style={{ color: 'rgba(250,246,236,0.5)' }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {imgs.map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ aspectRatio: i === 0 ? '3/4' : i === 1 ? '1/1' : i === 2 ? '1/1' : '3/4' }}
              >
                <Image
                  src={src} alt="India travel — Om's journeys"
                  fill className="object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
