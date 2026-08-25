'use client';
import Link from 'next/link';
import { CheckCircle, MessageCircle, Mail } from 'lucide-react';
import { siteConfig } from '@/data/siteContent';

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: '#FAFBFD' }}>
      <div className="container-narrow text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-7"
          style={{ backgroundColor: '#EBF4FF' }}>
          <CheckCircle size={32} style={{ color: '#2B6CB0' }} strokeWidth={1.5} />
        </div>
        <p className="eyebrow mb-4">Thank You</p>
        <h1 className="section-title mb-5" style={{ color: '#1a2332' }}>
          Your Enquiry Has Been Received
        </h1>
        <div className="divider-gold mx-auto mb-7" />
        <p className="body-large mb-4 max-w-lg mx-auto">
          Om personally reads every enquiry and will respond to you directly, very soon.
        </p>
        <p className="font-serif text-base italic mb-10" style={{ color: '#718096' }}>
          &ldquo;We don&rsquo;t say the end of the trip — we say it&rsquo;s the beginning of our long-term relationship.&rdquo;
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-blue flex items-center gap-2">
            <MessageCircle size={15} /> Chat on WhatsApp
          </a>
          <a href={`mailto:${siteConfig.contact.emails[0]}`} className="btn-outline flex items-center gap-2">
            <Mail size={15} /> Send an Email
          </a>
        </div>
        <Link href="/" className="font-sans text-sm tracking-wider" style={{ color: '#2B6CB0' }}>← Back to Home</Link>
      </div>
    </section>
  );
}
