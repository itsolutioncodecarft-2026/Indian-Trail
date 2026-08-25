'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const experiences = [
  { category: 'Wildlife', title: 'Jeep Safari in Tiger Country', description: 'A dawn Jeep safari through the rolling hills, crags and meadows of Ranthambore — one of India\'s finest opportunities to sight the Bengal tiger in the wild.', note: 'Wear warm, full-body clothing. Carry water and refreshments.', image: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers', 'six-cities-endless-stories'] },
  { category: 'Spiritual', title: 'Ganga Aarti at Dashashwamedh Ghat', description: 'The most elaborate fire ceremony in Varanasi — an ancient ritual at dusk every day. Conch shells, ringing bells and sacred mantras as priests venerate the Ganga.', note: '', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=80', tours: ['golden-triangle-varanasi', 'splendors-of-india'] },
  { category: 'Desert', title: 'Camel Safari in the Golden Dunes', description: 'Ride into the honey-hued dunes of Jaisalmer as the sun dips below the horizon — a landscape unlike anywhere else on earth.', note: '', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&q=80', tours: ['golden-triangle-colourful-rajasthan'] },
  { category: 'Village', title: 'Authentic Village Life at Ramathra', description: 'Leave the highways and enter rural Rajasthan. Village boat ride at sunset. Local cuisine cooked in a traditional way at a host family\'s home.', note: 'One of the most unique experiences of any journey with Om.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers'] },
  { category: 'Spiritual', title: 'Sunrise Boat Ride on the Ganges', description: 'Rise at 5:00 AM for the most magical hour. Pilgrims at morning prayers, priests offering incense, the Ghats bathed in soft golden light.', note: '', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80', tours: ['splendors-of-india'] },
  { category: 'Heritage', title: 'Heritage Food Walk in Jaipur', description: 'Explore the walled city\'s hidden culinary treasures — pyaz kachori, samosa, pani puri and Indian chai. Climb Wind View Café for the perfect Hawa Mahal photograph.', note: '', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers', 'six-cities-endless-stories'] },
  { category: 'Cultural', title: 'Wagah Border Beating Retreat', description: 'The spectacular daily ceremony at the India–Pakistan border. Infantrymen exchange fierce looks, shake hands, then simultaneously lower both flags.', note: '', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=900&q=80', tours: ['splendors-of-india'] },
  { category: 'Cultural', title: 'Bishnoi Village Craft Safari', description: 'Guda Bishnoi Village — skilled weavers of dhurries in traditional geometric patterns. Passionate environmentalists and wildlife protectionists.', note: '', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers', 'six-cities-endless-stories'] },
  { category: 'Wellness', title: 'Ayurveda Healing Massage & Spa', description: 'Rejuvenate mind, body and soul with a traditional Ayurveda healing session — available on arrival day or during any rest day throughout your journey.', note: 'Available on request during any journey.', image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=900&q=80', tours: ['golden-triangle-varanasi', 'golden-triangle-colourful-rajasthan'] },
];

const catStyle = {
  Wildlife: { bg: '#276749', text: '#fff' }, Spiritual: { bg: '#553C9A', text: '#fff' },
  Desert: { bg: '#744210', text: '#fff' }, Village: { bg: '#7B341E', text: '#fff' },
  Heritage: { bg: '#702459', text: '#fff' }, Cultural: { bg: '#2C5282', text: '#fff' },
  Wellness: { bg: '#285E61', text: '#fff' },
};

export default function ExperiencesList() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((exp, i) => {
            const cat = catStyle[exp.category] || { bg: '#1a2332', text: '#fff' };
            return (
              <article key={i} className="group flex flex-col transition-all duration-400"
                style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,35,50,0.09)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: i === 0 || i === 4 ? '250px' : '190px' }}>
                  <Image src={exp.image} alt={exp.title} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="33vw" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.5) 0%, transparent 60%)' }} />
                  <span className="absolute top-4 left-4 font-sans text-[9px] tracking-[0.2em] uppercase px-2.5 py-1"
                    style={{ backgroundColor: cat.bg, color: cat.text, borderRadius: '2px' }}>
                    {exp.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-serif text-lg font-light mb-2.5" style={{ color: '#1a2332' }}>{exp.title}</h3>
                  <p className="font-sans text-sm font-light leading-relaxed flex-1 mb-4" style={{ color: '#4A5568' }}>{exp.description}</p>

                  {exp.note && (
                    <p className="font-sans text-xs italic mb-4 pl-3" style={{ color: '#C49A3C', borderLeft: '2px solid rgba(196,154,60,0.4)' }}>
                      {exp.note}
                    </p>
                  )}

                  {exp.tours?.length > 0 && (
                    <div className="pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: '#A0AEC0' }}>Available in</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tours.map(slug => (
                          <Link key={slug} href={`/tours/${slug}`}
                            className="font-sans text-[9px] tracking-wider uppercase px-2.5 py-1 transition-all duration-200"
                            style={{ border: '1px solid #BEE3F8', color: '#2B6CB0', borderRadius: '2px', backgroundColor: '#EBF4FF' }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2B6CB0'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#2B6CB0'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#EBF4FF'; e.currentTarget.style.color = '#2B6CB0'; e.currentTarget.style.borderColor = '#BEE3F8'; }}>
                            View Tour <ArrowRight size={8} className="inline ml-0.5" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="font-serif text-lg italic mb-5" style={{ color: '#718096' }}>
            &ldquo;The experiences you choose are as important as the destinations you visit.&rdquo;
          </p>
          <Link href="/contact" className="btn-primary inline-flex">Plan My Experience</Link>
        </div>
      </div>
    </section>
  );
}
