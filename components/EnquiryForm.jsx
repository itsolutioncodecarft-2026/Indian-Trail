'use client';
import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import { siteConfig } from '@/data/siteContent';
import { MessageCircle, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import FormDatePicker from '@/components/FormDatePicker';

const inp = {
  width: '100%', padding: '0.65rem 0.9rem',
  backgroundColor: 'var(--color-surface-alt)',
  border: '1px solid var(--color-border)',
  fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
  fontSize: '0.875rem', color: 'var(--color-text)',
  outline: 'none', transition: 'border-color 0.2s ease',
  borderRadius: 'var(--radius-control)',
};
const inpFocus  = { ...inp, borderColor: 'var(--color-primary)' };
const inpErr    = { ...inp, borderColor: 'var(--color-error)' };
const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
  fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.16em',
  textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '6px',
};

export default function EnquiryForm({ defaultTour = '', defaultMessage = '', defaultDate = '' }) {
  const { lang } = useLang();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', tour: defaultTour,
    date: defaultDate, travellers: 1, message: defaultMessage, language: lang,
  });
  const [errors, setErrors]   = useState({});
  const [focus, setFocus]     = useState({});
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

  const inputStyle = (field) => {
    if (errors[field]) return inpErr;
    if (focus[field])  return inpFocus;
    return inp;
  };

  const buildWA = () => {
    const lines = [
      `*Enquiry — Indian Routes & Trails*`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone   ? `Phone: ${form.phone}`        : null,
      form.tour    ? `Journey: ${form.tour}`        : null,
      form.date    ? `Travel Date: ${form.date}`    : null,
      `Travellers: ${form.travellers}`,
      form.message ? `Message: ${form.message}`     : null,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const buildMailto = () => {
    const sub  = encodeURIComponent(`Enquiry from ${form.name} — Indian Routes & Trails`);
    const body = encodeURIComponent([
      `Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone || '—'}`,
      `Journey: ${form.tour || '—'}`, `Date: ${form.date || '—'}`,
      `Travellers: ${form.travellers}`, `Message: ${form.message || '—'}`,
    ].join('\n'));
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
        <CheckCircle size={44} className="mx-auto mb-4"
          style={{ color: 'var(--color-primary)' }} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl font-light mb-3"
          style={{ color: 'var(--color-text)' }}>Thank You!</h3>
        <p className="font-sans text-sm font-light mb-8 max-w-sm mx-auto"
          style={{ color: 'var(--color-text-muted)' }}>
          Your enquiry has been received. Om will be in touch personally very soon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${buildWA()}`}
            target="_blank" rel="noopener noreferrer" className="btn-indigo">
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
    <form onSubmit={handleSubmit} noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}
        className="max-sm:!grid-cols-1">

        {/* Name */}
        <div>
          <label style={labelStyle}>
            Full Name <span style={{ color: 'var(--color-secondary)' }}>*</span>
          </label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Your name" style={inputStyle('name')}
            onFocus={() => setFocus(f => ({ ...f, name: true }))}
            onBlur={() => setFocus(f => ({ ...f, name: false }))} />
          {errors.name && (
            <p style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>
            Email <span style={{ color: 'var(--color-secondary)' }}>*</span>
          </label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com" style={inputStyle('email')}
            onFocus={() => setFocus(f => ({ ...f, email: true }))}
            onBlur={() => setFocus(f => ({ ...f, email: false }))} />
          {errors.email && (
            <p style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="+1 234 567 8900" style={inputStyle('phone')}
            onFocus={() => setFocus(f => ({ ...f, phone: true }))}
            onBlur={() => setFocus(f => ({ ...f, phone: false }))} />
        </div>

        {/* Journey select */}
        <div>
          <label style={labelStyle}>Preferred Journey</label>
          <select name="tour" value={form.tour} onChange={handleChange}
            style={{ ...inputStyle('tour'), appearance: 'none', cursor: 'pointer' }}
            onFocus={() => setFocus(f => ({ ...f, tour: true }))}
            onBlur={() => setFocus(f => ({ ...f, tour: false }))}>
            <option value="">Select a journey (optional)</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.slug}>{t.title} ({t.duration} Days)</option>
            ))}
          </select>
        </div>

        {/* Travel date — custom calendar with booked dates blocked */}
        <div className="max-sm:col-span-full" style={{ gridColumn: 'span 2' }}>
          <FormDatePicker
            value={form.date}
            onChange={(iso) => setForm(f => ({ ...f, date: iso }))}
            labelStyle={labelStyle}
          />
        </div>

        {/* Travellers */}
        <div>
          <label style={labelStyle}>Travellers</label>
          <input type="number" name="travellers" value={form.travellers} onChange={handleChange}
            min={1} max={50} style={inputStyle('travellers')}
            onFocus={() => setFocus(f => ({ ...f, travellers: true }))}
            onBlur={() => setFocus(f => ({ ...f, travellers: false }))} />
        </div>
      </div>

      {/* Language */}
      <div>
        <label style={labelStyle}>Preferred Language</label>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[['en', 'English'], ['es', 'Spanish / Español']].map(([val, lbl]) => (
            <label key={val}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="language" value={val}
                checked={form.language === val} onChange={handleChange}
                style={{ accentColor: 'var(--color-primary)' }} />
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{lbl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
          placeholder="Tell us about your travel preferences, dates, interests…"
          style={{ ...inputStyle('message'), resize: 'none' }}
          onFocus={() => setFocus(f => ({ ...f, message: true }))}
          onBlur={() => setFocus(f => ({ ...f, message: false }))} />
      </div>

      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
        Your information is safe with us. We will never share your details.
      </p>

      <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
        Send Enquiry <ArrowRight size={15} />
      </button>

      {/* Direct contact links */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px',
        paddingTop: '8px', borderTop: '1px solid var(--color-border)',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
          Or reach us directly:
        </span>
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '11px', color: 'var(--color-primary)' }}>
          <MessageCircle size={12} /> WhatsApp
        </a>
        <a href={`mailto:${siteConfig.contact.emails[0]}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '11px', color: 'var(--color-primary)' }}>
          <Mail size={12} /> Email
        </a>
      </div>
    </form>
  );
}
