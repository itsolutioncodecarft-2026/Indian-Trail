'use client';
import Image from 'next/image';
import Link from 'next/link';
import { omStory } from '@/data/siteContent';
import { ArrowRight } from 'lucide-react';

export default function HomeAboutTeaser() {
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch">

          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[500px] lg:h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1000&q=85"
                alt="India heritage — Indian Routes & Trails"
                fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            {/* Stat card */}
            <div
              className="absolute bottom-8 -right-0 lg:-right-8 p-6 hidden md:block z-10"
              style={{ backgroundColor: '#2B6CB0', maxWidth: '180px' }}
            >
              <p className="font-serif text-3xl font-light leading-none mb-1" style={{ color: '#ffffff' }}>10+</p>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Years guiding India
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 lg:pl-16 xl:pl-24 flex flex-col justify-center">
            <p className="eyebrow mb-5">Our Story</p>
            <h2 className="section-title mb-6">
              The Man<br />
              <span className="italic font-light" style={{ color: '#2B6CB0' }}>Behind Every Journey</span>
            </h2>
            <div className="divider-gold mb-8" />

            <div className="space-y-4 mb-10">
              <p className="font-serif text-lg italic font-light leading-relaxed" style={{ color: '#1a2332' }}>
                &ldquo;{omStory.intro}&rdquo;
              </p>
              <p className="body-large">{omStory.story[1]}</p>
              <p className="body-text">{omStory.story[4]}</p>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {omStory.credentials.slice(0, 4).map((c, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3" style={{ backgroundColor: '#F4F6FA', border: '1px solid #E2E8F0' }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#C49A3C' }} />
                  <span className="font-sans text-xs leading-relaxed" style={{ color: '#4A5568' }}>{c}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase self-start"
              style={{ color: '#2B6CB0' }}
            >
              Read Om&rsquo;s Story
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
