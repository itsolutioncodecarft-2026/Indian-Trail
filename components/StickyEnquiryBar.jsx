'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';

export default function StickyEnquiryBar({ tourSlug, tourTitle }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waText = encodeURIComponent(
    `Hi Om, I'm interested in the journey: ${tourTitle}. Could you please share more details?`
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-primary)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-hidden={!visible}
    >
      <div className="container-luxury py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-serif text-sm font-light" style={{ color: 'rgba(255,255,255,0.75)' }}>
          <span className="hidden sm:inline">Interested in </span>
          <em style={{ color: 'var(--color-secondary)' }}>{tourTitle.split(':')[0]}</em>
          <span className="hidden sm:inline">? Om will personally design it for you.</span>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-[11px] tracking-[0.14em] uppercase px-4 py-2.5 transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-whatsapp)',
              color: '#fff',
              borderRadius: 'var(--radius-control)',
            }}
          >
            <MessageCircle size={13} /> WhatsApp
          </a>
          <Link
            href={`/contact?tour=${tourSlug}`}
            className="btn-primary text-[11px] py-2.5 px-5"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
