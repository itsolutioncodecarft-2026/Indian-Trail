'use client';
import { omStory } from '@/data/siteContent';
import { CheckCircle } from 'lucide-react';

export default function AboutStory() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Story */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5" style={{ color: '#B8892A' }}>His Story</p>
            <h2 className="section-title mb-6" style={{ color: '#2C1810' }}>The Story of Om</h2>
            <div className="divider-gold mb-10" />
            <div className="space-y-6">
              {omStory.story.map((para, i) => (
                <p
                  key={i}
                  className={i === 0
                    ? 'font-serif text-xl font-light leading-relaxed italic'
                    : 'font-sans text-base font-light leading-relaxed'
                  }
                  style={{ color: i === 0 ? '#2C1810' : 'rgba(44,24,16,0.7)' }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              {/* Quote card */}
              <div className="p-8" style={{ backgroundColor: '#2C1810' }}>
                <p className="font-serif text-2xl italic font-light leading-snug mb-4" style={{ color: '#FAF6EC' }}>
                  &ldquo;Every itinerary is a hand-woven masterpiece.&rdquo;
                </p>
                <p className="font-sans text-xs tracking-widest uppercase" style={{ color: '#B8892A' }}>
                  — Om, Founder
                </p>
              </div>

              {/* Credentials */}
              <div className="p-8 border" style={{ backgroundColor: 'rgba(232,213,176,0.2)', borderColor: '#E8D5B0' }}>
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(44,24,16,0.6)' }}>
                  Experience &amp; Expertise
                </h3>
                <ul className="space-y-4">
                  {omStory.credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: '#B8892A' }} />
                      <span className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(44,24,16,0.7)' }}>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <blockquote className="pl-6 border-l-4" style={{ borderColor: '#B8892A' }}>
                <p className="font-serif text-base italic leading-relaxed" style={{ color: 'rgba(44,24,16,0.7)' }}>
                  &ldquo;When you journey with Om, you are not a tourist holding a map. You are an honoured guest stepping through doors that money alone cannot open.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
