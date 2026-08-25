'use client';
import Image from 'next/image';
import { omStory } from '@/data/siteContent';
import { CheckCircle } from 'lucide-react';

export default function AboutStory() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">His Story</p>
            <h2 className="section-title mb-6">The Story of Om</h2>
            <div className="divider-gold mb-10" />
            <div className="space-y-6">
              {omStory.story.map((para, i) => (
                <p key={i} className="font-light leading-relaxed"
                  style={{ fontFamily: i === 0 ? 'var(--font-serif), Georgia, serif' : undefined, fontSize: i === 0 ? '1.15rem' : '1rem',
                    fontStyle: i === 0 ? 'italic' : 'normal', color: i === 0 ? '#1a2332' : '#4A5568' }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              {/* Quote */}
              <div className="p-8" style={{ backgroundColor: '#1a2332' }}>
                <p className="font-serif text-xl italic font-light leading-snug mb-4" style={{ color: '#FEFCF7' }}>
                  &ldquo;Every itinerary is a hand-woven masterpiece — balancing ultra-luxury with raw, unfiltered authenticity.&rdquo;
                </p>
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase" style={{ color: '#C49A3C' }}>— Om, Founder</p>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=85"
                  alt="India" fill className="object-cover" sizes="35vw" />
              </div>

              {/* Credentials */}
              <div className="p-7" style={{ backgroundColor: '#ffffff', border: '1px solid #E2E8F0' }}>
                <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: '#A0AEC0' }}>
                  Experience &amp; Expertise
                </h3>
                <ul className="space-y-3">
                  {omStory.credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: '#2B6CB0' }} />
                      <span className="font-sans text-sm font-light leading-relaxed" style={{ color: '#4A5568' }}>{cred}</span>
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
