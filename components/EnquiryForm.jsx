'use client';
import { useState, useEffect } from 'react';
import { tours } from '@/data/tours';
import { getShortTripSelectOptions, parseShortTripValue } from '@/data/shortTrips';
import { siteConfig } from '@/data/siteContent';
import { MessageCircle, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import FormDatePicker from '@/components/FormDatePicker';

/* ── Shared control styles ──────────────────────────────────────── */
const ctrl = {
  display:         'block',
  width:           '100%',
  minWidth:        0,
  maxWidth:        '100%',
  boxSizing:       'border-box',
  padding:         '0.65rem 0.9rem',
  backgroundColor: 'var(--color-surface-alt)',
  border:          '1px solid var(--color-border)',
  fontFamily:      'var(--font-body, Inter, system-ui, sans-serif)',
  fontSize:        '0.875rem',
  color:           'var(--color-text)',
  outline:         'none',
  transition:      'border-color 0.2s ease',
  borderRadius:    'var(--radius-control)',
};
const ctrlFocus = { ...ctrl, borderColor: 'var(--color-primary)' };
const ctrlErr   = { ...ctrl, borderColor: 'var(--color-error)' };

/* ── Label style ────────────────────────────────────────────────── */
const lbl = {
  display:       'block',
  fontFamily:    'var(--font-body, Inter, system-ui, sans-serif)',
  fontSize:      '0.68rem',
  fontWeight:    500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color:         'var(--color-text-muted)',
  marginBottom:  '7px',
  lineHeight:    1.3,
  whiteSpace:    'normal',
  wordBreak:     'break-word',
};

// Precompute short-trip options once (stable reference)
const SHORT_TRIP_OPTIONS = getShortTripSelectOptions();

export default function EnquiryForm({
  defaultTour      = '',
  defaultMessage   = '',
  defaultDate      = '',
  defaultShortTrip = '',   // "slug__variantId" composite value
}) {
  const [form, setForm] = useState({
    name:       '',
    email:      '',
    phone:      '',
    tour:       defaultTour,
    shortTrip:  defaultShortTrip,
    date:       defaultDate,
    travellers: 1,
    message:    defaultMessage,
  });

  // Sync URL-driven defaults
  useEffect(() => {
    if (defaultDate)      setForm(f => ({ ...f, date:      defaultDate }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDate]);
  useEffect(() => {
    if (defaultShortTrip) setForm(f => ({ ...f, shortTrip: defaultShortTrip }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultShortTrip]);
  useEffect(() => {
    if (defaultTour)      setForm(f => ({ ...f, tour:      defaultTour }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTour]);

  const [errors,    setErrors]    = useState({});
  const [focus,     setFocus]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Please enter your name';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Please enter a valid email';
    return e;
  };

  const handleChange = (e) => {
    setForm(f  => ({ ...f,   [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const ctrlStyle = (field) => {
    if (errors[field]) return ctrlErr;
    if (focus[field])  return ctrlFocus;
    return ctrl;
  };

  // Human-readable short trip label for payloads
  const shortTripDisplay = form.shortTrip
    ? (parseShortTripValue(form.shortTrip)?.displayLabel ?? form.shortTrip)
    : null;

  const buildWA = () => {
    const lines = [
      `*Enquiry — Indian Routes & Trails*`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone       ? `Phone: ${form.phone}`              : null,
      form.tour        ? `Journey: ${form.tour}`              : null,
      shortTripDisplay ? `Short Trip: ${shortTripDisplay}`    : null,
      form.date        ? `Travel Date: ${form.date}`          : null,
      `Travellers: ${form.travellers}`,
      form.message     ? `Message: ${form.message}`           : null,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const buildMailto = () => {
    const sub  = encodeURIComponent(`Enquiry from ${form.name} — Indian Routes & Trails`);
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '—'}`,
      `Journey: ${form.tour || '—'}`,
      `Short Trip: ${shortTripDisplay || '—'}`,
      `Date: ${form.date || '—'}`,
      `Travellers: ${form.travellers}`,
      `Message: ${form.message || '—'}`,
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
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>

      {/*
        .ef-grid: mobile = 1 col, ≥640px = 2 col (defined in globals.css)
        .ef-span2: always spans full width
        Every field wrapper has min-width:0 via CSS class.
      */}
      <div className="ef-grid">

        {/* Full Name */}
        <div>
          <label style={lbl}>
            Full Name <span style={{ color: 'var(--color-secondary)' }}>*</span>
          </label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Your name" style={ctrlStyle('name')}
            onFocus={() => setFocus(f => ({ ...f, name: true }))}
            onBlur={() =>  setFocus(f => ({ ...f, name: false }))} />
          {errors.name && (
            <p style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label style={lbl}>
            Email <span style={{ color: 'var(--color-secondary)' }}>*</span>
          </label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com" style={ctrlStyle('email')}
            onFocus={() => setFocus(f => ({ ...f, email: true }))}
            onBlur={() =>  setFocus(f => ({ ...f, email: false }))} />
          {errors.email && (
            <p style={{ fontSize: '11px', color: 'var(--color-error)', marginTop: '4px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label style={lbl}>Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="+1 234 567 8900" style={ctrlStyle('phone')}
            onFocus={() => setFocus(f => ({ ...f, phone: true }))}
            onBlur={() =>  setFocus(f => ({ ...f, phone: false }))} />
        </div>

        {/* Preferred Journey */}
        <div>
          <label style={lbl}>Preferred Journey</label>
          <select name="tour" value={form.tour} onChange={handleChange}
            style={{ ...ctrlStyle('tour'), appearance: 'none', cursor: 'pointer', paddingRight: '2rem' }}
            onFocus={() => setFocus(f => ({ ...f, tour: true }))}
            onBlur={() =>  setFocus(f => ({ ...f, tour: false }))}>
            <option value="">Select a journey (optional)</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.slug}>{t.title} ({t.duration} Days)</option>
            ))}
          </select>
        </div>

        {/* Preferred Short Trip — full width so long labels don't truncate */}
        <div className="ef-span2">
          <label style={lbl}>Preferred Short Trip (optional)</label>
          <select
            name="shortTrip"
            value={form.shortTrip}
            onChange={handleChange}
            style={{ ...ctrlStyle('shortTrip'), appearance: 'none', cursor: 'pointer', paddingRight: '2rem' }}
            onFocus={() => setFocus(f => ({ ...f, shortTrip: true }))}
            onBlur={() =>  setFocus(f => ({ ...f, shortTrip: false }))}
          >
            <option value="">Select a short trip (optional)</option>
            {SHORT_TRIP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Helper text — choose one or both */}
        <div className="ef-span2"
          style={{ marginTop: '-6px' }}>
          <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
            Choose a full journey, a short trip, or both.
          </p>
        </div>

        {/* Travel Date — full width */}
        <div className="ef-span2">
          <FormDatePicker
            value={form.date}
            onChange={(iso) => setForm(f => ({ ...f, date: iso }))}
            labelStyle={lbl}
            initialMonth={defaultDate}
          />
        </div>

        {/* Travellers */}
        <div>
          <label style={lbl}>Travellers</label>
          <input type="number" name="travellers" value={form.travellers} onChange={handleChange}
            min={1} max={50} style={ctrlStyle('travellers')}
            onFocus={() => setFocus(f => ({ ...f, travellers: true }))}
            onBlur={() =>  setFocus(f => ({ ...f, travellers: false }))} />
        </div>

      </div>

      {/* Message — outside grid, always full width */}
      <div>
        <label style={lbl}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
          placeholder="Tell us about your travel preferences, dates, interests…"
          style={{ ...ctrlStyle('message'), resize: 'none', minHeight: '120px' }}
          onFocus={() => setFocus(f => ({ ...f, message: true }))}
          onBlur={() =>  setFocus(f => ({ ...f, message: false }))} />
      </div>

      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
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
