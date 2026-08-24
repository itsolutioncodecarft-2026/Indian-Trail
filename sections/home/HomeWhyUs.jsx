'use client';
import { whyChooseUs } from '@/data/siteContent';
import SectionHeading from '@/components/SectionHeading';
import { Globe, Star, Heart, Shield, Users, Map } from 'lucide-react';

const iconMap = { globe: Globe, star: Star, heart: Heart, shield: Shield, users: Users, map: Map };

export default function HomeWhyUs() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="container-luxury">
        <SectionHeading
          eyebrow="Why Indian Routes & Trails"
          title="Travel as It Was Always Meant to Be"
          subtitle="Om offers what no generic tour can — exclusive access, cultural depth, and the rare gift of being truly understood as a traveller."
          centered
          className="mb-16"
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1px', backgroundColor: '#E8D5B0' }}
        >
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <div
                key={i}
                className="group p-8 lg:p-10 transition-colors duration-300"
                style={{ backgroundColor: '#FEFCF7' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEFCF7'}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6 transition-colors"
                  style={{ border: '1px solid rgba(184,137,42,0.4)' }}
                >
                  <Icon size={18} style={{ color: '#B8892A' }} />
                </div>
                <h3 className="font-serif text-lg font-light text-[#2C1810] mb-3">{item.title}</h3>
                <p className="font-sans text-sm font-light text-[#2C1810]/60 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
