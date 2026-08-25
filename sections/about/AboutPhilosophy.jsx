'use client';
import Image from 'next/image';

const pts = [
  { title: 'Not a Tour Group — A Personal Guest', body: 'Om steps away from the traditional role of a guide to become your personal architectural designer of travel. You are an honoured guest, not a number on a roster.' },
  { title: 'Ultra-Luxury Meets Authentic India', body: 'Every itinerary balances the finest comforts with raw, unfiltered authenticity. From palace hotels to hidden village experiences — nothing is generic.' },
  { title: 'A Cultural Bridge', body: 'Equipped with academic mastery of Spanish, Om translates not just words but nuances, philosophies, and shared human emotions between India and the Spanish-speaking world.' },
  { title: 'Beyond the Brochure', body: 'The smell of morning chai in a hidden alleyway. A private blessing by a generational priest. The quiet sunset over ancient ruins known only to locals.' },
];

export default function AboutPhilosophy() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#F4F6FA' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow mb-5">Philosophy</p>
            <h2 className="section-title mb-6">
              A Philosophy of<br />
              <span className="italic font-light" style={{ color: '#2B6CB0' }}>Transformative Travel</span>
            </h2>
            <div className="divider-gold mb-10" />
            <div className="space-y-8">
              {pts.map((p, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center" style={{ backgroundColor: '#EBF4FF', borderRadius: '4px' }}>
                    <span className="font-serif text-sm" style={{ color: '#2B6CB0' }}>{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light mb-1.5" style={{ color: '#1a2332' }}>{p.title}</h3>
                    <p className="font-sans text-sm font-light leading-relaxed" style={{ color: '#718096' }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { src: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80', ratio: '3/4' },
              { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80', ratio: '1/1' },
              { src: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=700&q=80', ratio: '1/1' },
              { src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80', ratio: '3/4' },
            ].map((img, i) => (
              <div key={i} className="relative overflow-hidden" style={{ aspectRatio: img.ratio }}>
                <Image src={img.src} alt="India" fill className="object-cover hover:scale-105 transition-transform duration-600" sizes="20vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
