'use client';
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Om on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-whatsapp)',
        color: '#fff',
        borderRadius: 'var(--radius-pill)',
        boxShadow: '0 4px 16px rgba(37,193,104,0.4)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <MessageCircle size={18} strokeWidth={2} />
      <span className="font-sans text-[11px] tracking-[0.12em] uppercase font-medium hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
