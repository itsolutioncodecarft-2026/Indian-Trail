'use client';
import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import { siteConfig } from '@/data/siteContent';
import { MessageCircle, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const inp = {
  width: '100%', padding: '0.65rem 0.9rem',
  backgroundColor: '#F4F6FA',
  border: '1px solid #E2E8F0',
  fontFamily: 'var(--font-sans, Jost, Inter, sans-serif)',
  fontSize: '0.875rem', color: '#1a2332',
  outline: 'none', transition: 'border-color 0.2s ease',
};
const inpErr = { ...inp, borderColor: '#FC8181' };
const label = {
  display: 'block', fontFamily: 'var(--font-sans, Jost, Inter, sans-serif)',
  fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.16em',
  textTransform: 'uppercase', color: '#4A5568', marginBottom: '6px',
};

export default function EnquiryForm({ defaultTour = '' }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', tour: defaultTour,
    date: '', travellers: 1, message: '', language: lang,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const buildWA = () => {
    const lines = [`*Enquiry — Indian Routes & Trails*`, `Name: ${form.name}`, `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.tour ? `Journey: ${form.tour}` : null,
      form.date ? `Travel Date: ${form.date}` : null,
      `Travellers: ${form.travellers}`,
      form.message ? `Message: ${form.message}` : null,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const buildMailto = () => {
    const sub = encodeURIComponent(`Enquiry from ${form.name} — Indian Routes & Trails`);
    const body = encodeURIComponent([`Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone || '—'}`,
      `Journey: ${form.tour || '—'}`, `Date: ${form.date || '—'}`, `Travellers: ${form.travellers}`,
      `Message: ${form.message || '—'}`].join('\n'));
    return `mailto:${siteConfig.contact.emails[0]}?subject=${sub}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 px-4">
        <CheckCircle size={44} className="mx-auto mb-4" style={{ color: '#2B6CB0' }} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl font-light mb-3" style={{ color: '#1a2332' }}>Thank You!</h3>
        <p className="font-sans text-sm font-light mb-8 max-w-sm mx-auto" style={{ color: '#718096' }}>
          Your enquiry has been received. Om will be in touch personally very soon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${buildWA()}`}
            target="_blank" rel="noopener noreferrer" className="btn-blue">
            <MessageCircle size={15} /> Chat on WhatsApp
          </a>
          <a href={buildMailto()} className="btn-outline">
            <Mail size={15} /> Send Email
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="max-sm:!grid-cols-1">
        {/* Name */}
        <div>
          <label style={label}>Full Name <span style={{ color: '#C49A3C' }}>*</span></label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Your name" style={errors.name ? inpErr : inp}
            onFocus={e => e.target.style.borderColor = '#2B6CB0'}
            onBlur={e => e.target.style.borderColor = errors.name ? '#FC8181' : '#E2E8F0'} />
          {errors.name && <p style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px' }}>{errors.name}</p>}
        </div>
        {/* Email */}
        <div>
          <label style={label}>Email <span style={{ color: '#C49A3C' }}>*</span></label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com" style={errors.email ? inpErr : inp}
            onFocus={e => e.target.style.borderColor = '#2B6CB0'}
            onBlur={e => e.target.style.borderColor = errors.email ? '#FC8181' : '#E2E8F0'} />
          {errors.email && <p style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px' }}>{errors.email}</p>}
        </div>
        {/* Phone */}
        <div>
          <label style={label}>Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="+1 234 567 8900" style={inp}
            onFocus={e => e.target.style.borderColor = '#2B6CB0'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
        </div>
        {/* Tour */}
        <div>
          <label style={label}>Preferred Journey</label>
          <select name="tour" value={form.tour} onChange={handleChange}
            style={{ ...inp, appearance: 'none', cursor: 'pointer' }}
            onFocus={e => e.target.style.borderColor = '#2B6CB0'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}>
            <option value="">Select a journey (optional)</option>
            {tours.map(t => (
              <option key={t.slug} value={t.slug}>{t.title} ({t.duration} Days)</option>
            ))}
          </select>
        </div>
        {/* Date */}
        <div>
          <label style={label}>Travel Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} style={inp}
            onFocus={e => e.target.style.borderColor = '#2B6CB0'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
        </div>
        {/* Travellers */}
        <div>
          <label style={label}>Travellers</label>
          <input type="number" name="travellers" value={form.travellers} onChange={handleChange}
            min={1} max={50} style={inp}
            onFocus={e => e.target.style.borderColor = '#2B6CB0'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
        </div>
      </div>

      {/* Language */}
      <div>
        <label style={label}>Preferred Language</label>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[['en', 'English'], ['es', 'Spanish / Español']].map(([val, lbl]) => (
            <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="language" value={val} checked={form.language === val}
                onChange={handleChange} style={{ accentColor: '#2B6CB0' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#4A5568' }}>{lbl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={label}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
          placeholder="Tell us about your travel preferences, dates, interests…"
          style={{ ...inp, resize: 'none' }}
          onFocus={e => e.target.style.borderColor = '#2B6CB0'}
          onBlur={e => e.target.style.borderColor = '#E2E8F0'} />
      </div>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#A0AEC0' }}>
        Your information is safe with us. We will never share your details.
      </p>

      <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
        Send Enquiry <ArrowRight size={15} />
      </button>

      {/* Direct contacts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', paddingTop: '8px', borderTop: '1px solid #E2E8F0' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#A0AEC0' }}>Or reach us directly:</span>
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#2B6CB0' }}>
          <MessageCircle size={12} /> WhatsApp
        </a>
        <a href={`mailto:${siteConfig.contact.emails[0]}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#2B6CB0' }}>
          <Mail size={12} /> Email
        </a>
      </div>
    </form>
  );
}
