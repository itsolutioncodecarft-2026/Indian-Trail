'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';

const experiences = [
  { category: 'Wildlife', title: 'Jeep Safari in Tiger Country', description: 'Embark on a dawn Jeep safari through the rolling hills, crags, meadows and rivulets of Ranthambore National Park — one of India\'s finest opportunities to sight the Bengal tiger in the wild. Also home to panther, hyena, jackal, deer and a rich variety of birds.', note: 'Wear warm, full-body covering clothes. Carry water and refreshments.', image: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers', 'six-cities-endless-stories'] },
  { category: 'Cultural', title: 'Ganga Aarti at Dashashwamedh Ghat', description: 'Witness the most elaborate and lively prayer ceremony in Varanasi — an ancient fire ritual at dusk every day. Amid conch shells, ringing bells, clanging cymbals and sacred mantras, priests venerate the Ganga.', note: '', image: 'https://images.unsplash.com/photo-1561361058-c24e3a3b2bf0?w=900&q=80', tours: ['golden-triangle-varanasi', 'splendors-of-india'] },
  { category: 'Desert', title: 'Camel Safari in the Golden Dunes', description: 'As the sun dips below the horizon, ride a camel into the honey-hued dunes of Jaisalmer — the Golden City. The rolling hills of sand and vast barren expanses create a landscape unlike anywhere else on earth.', note: '', image: 'https://images.unsplash.com/photo-1477587458883-47145ed31736?w=900&q=80', tours: ['golden-triangle-colourful-rajasthan'] },
  { category: 'Village', title: 'Authentic Village Life at Ramathra', description: 'Leave the highways behind and enter rural Rajasthan. Stroll through the village like a local. Village boat ride at sunset. Enjoy local cuisine cooked in a traditional way at a host family\'s home.', note: 'One of the most unique experiences of any journey with Om.', image: 'https://images.unsplash.com/photo-1609766857032-9b01ccb26bef?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers'] },
  { category: 'Spiritual', title: 'Sunrise Boat Ride on the Ganges', description: 'Rise at 5:00 AM for the most magical time on the river. Witness morning rituals at the Ghats — pilgrims performing prayers, priests offering incense, the stone steps bathed in soft golden light.', note: '', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80', tours: ['splendors-of-india'] },
  { category: 'Heritage', title: 'Heritage Food Walk in Jaipur', description: 'Walk through the walled city and explore hidden culinary treasures — pyaz kachori, samosa, pani puri, sev puri and Indian chai. Climb to Wind View Café for the perfect Hawa Mahal photograph.', note: '', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers', 'six-cities-endless-stories'] },
  { category: 'Spiritual', title: 'Wagah Border Beating Retreat Ceremony', description: 'Witness the spectacular daily ceremony at the Wagah Border between India and Pakistan — infantrymen mimic anger, exchange fierce looks, shake hands, then simultaneously lower the flags of both nations.', note: '', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=900&q=80', tours: ['splendors-of-india'] },
  { category: 'Cultural', title: 'Bishnoi Village Craft Safari', description: 'Drive to Guda Bishnoi Village — the Marwar Craft Village — where villagers are skilled weavers of dhurries (rugs) in traditional geometric patterns. The Bishnoi community are passionate environmentalists and wildlife protectionists.', note: '', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=900&q=80', tours: ['majestic-rajasthan-taj-tigers', 'six-cities-endless-stories', 'splendors-of-india'] },
  { category: 'Wellness', title: 'Ayurveda Healing Massage & Spa', description: 'Rejuvenate your mind, body and soul with a traditional Ayurveda healing massage and spa session — available on arrival day or during a rest day, helping you acclimatise and prepare for the journey ahead.', note: 'Available on request at multiple points during any journey.', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80', tours: ['golden-triangle-varanasi', 'golden-triangle-colourful-rajasthan'] },
];

export default function ExperiencesList() {
  const { t } = useLang();

  return (
    <section className="section-padding" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <article key={i} className="group bg-white border border-[#E8D5B0]/40 flex flex-col hover:shadow-xl transition-all duration-500">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={exp.image} alt={exp.title} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/50 to-transparent" />
                <span
                  className="absolute top-4 left-4 font-sans text-[10px] tracking-[0.2em] uppercase px-2.5 py-1"
                  style={{ backgroundColor: 'rgba(44,24,16,0.75)', color: 'rgba(250,246,236,0.9)' }}
                >
                  {exp.category}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-lg font-light mb-3" style={{ color: '#2C1810' }}>
                  {exp.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed flex-1 mb-4" style={{ color: 'rgba(44,24,16,0.6)' }}>
                  {exp.description}
                </p>
                {exp.note && (
                  <p className="font-sans text-xs italic border-l-2 pl-3 mb-4" style={{ color: 'rgba(184,137,42,0.8)', borderColor: 'rgba(184,137,42,0.3)' }}>
                    {exp.note}
                  </p>
                )}
                {exp.tours?.length > 0 && (
                  <div className="pt-4 border-t border-[#E8D5B0]/40">
                    <p className="font-sans text-[10px] tracking-wider uppercase mb-2" style={{ color: 'rgba(44,24,16,0.4)' }}>
                      Available in:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tours.map((slug) => (
                        <Link
                          key={slug} href={`/tours/${slug}`}
                          className="font-sans text-[10px] tracking-wide border px-2 py-0.5 transition-colors"
                          style={{ color: '#B8892A', borderColor: 'rgba(184,137,42,0.3)' }}
                        >
                          View Tour
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-serif text-lg italic mb-5" style={{ color: 'rgba(44,24,16,0.6)' }}>
            &ldquo;The experiences you choose are as important as the destinations you visit.&rdquo;
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            {t('common.plan_journey')}
          </Link>
        </div>
      </div>
    </section>
  );
}
