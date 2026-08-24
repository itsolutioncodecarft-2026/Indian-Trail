'use client';
import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { tours } from '@/data/tours';
import { siteConfig } from '@/data/siteContent';
import { MessageCircle, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const inputClass = 'w-full px-4 py-3 bg-[#FAF6EC] border border-[#E8D5B0] font-sans text-sm text-[#2C1810] placeholder-[#2C1810]/30 focus:outline-none focus:border-[#B8892A] transition-colors';
const inputErrorClass = 'w-full px-4 py-3 bg-[#FAF6EC] border border-red-400 font-sans text-sm text-[#2C1810] placeholder-[#2C1810]/30 focus:outline-none transition-colors';
const labelClass = 'block font-sans text-xs tracking-[0.15em] uppercase text-[#2C1810]/60 mb-2';

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
    if (!form.name.trim()) e.name = t('form.validation_name');
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = t('form.validation_email');
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  };

  const buildWhatsappMessage = () => {
    const lines = [
      `*New Enquiry — Indian Routes & Trails*`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.tour ? `Preferred Journey: ${form.tour}` : null,
      form.date ? `Travel Date: ${form.date}` : null,
      `Travellers: ${form.travellers}`,
      form.message ? `Message: ${form.message}` : null,
      `Language: ${form.language === 'es' ? 'Spanish' : 'English'}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const buildMailtoLink = () => {
    const subject = encodeURIComponent(`Tour Enquiry from ${form.name} — Indian Routes & Trails`);
    const body = encodeURIComponent(
      [`Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone || 'Not provided'}`,
       `Journey: ${form.tour || 'Not specified'}`, `Travel Date: ${form.date || 'Not specified'}`,
       `Travellers: ${form.travellers}`, `Message: ${form.message || 'None'}`,
       `Language: ${form.language === 'es' ? 'Spanish' : 'English'}`].join('\n')
    );
    return `mailto:${siteConfig.contact.emails[0]}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <CheckCircle size={48} className="text-[#B8892A] mx-auto mb-5" strokeWidth={1.5} />
        <h3 className="font-serif text-2xl font-light text-[#2C1810] mb-3">{t('form.success_title')}</h3>
        <p className="font-sans text-sm font-light text-[#2C1810]/60 mb-8 max-w-md mx-auto">{t('form.success_message')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${buildWhatsappMessage()}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={16} />
            {t('form.whatsapp_cta')}
          </a>
          <a href={buildMailtoLink()} className="btn-outline">
            <Mail size={16} />
            {t('form.email_cta')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className={labelClass}>{t('form.name')} <span className="text-[#B8892A]">*</span></label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            placeholder={t('form.placeholder_name')}
            className={errors.name ? inputErrorClass : inputClass} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>{t('form.email')} <span className="text-[#B8892A]">*</span></label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder={t('form.placeholder_email')}
            className={errors.email ? inputErrorClass : inputClass} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>{t('form.phone')}</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder={t('form.placeholder_phone')} className={inputClass} />
        </div>

        {/* Tour */}
        <div>
          <label className={labelClass}>{t('form.tour')}</label>
          <select name="tour" value={form.tour} onChange={handleChange}
            className={inputClass + ' appearance-none cursor-pointer'}>
            <option value="">{t('form.select_tour')}</option>
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.title} ({tour.duration} {t('common.days')})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>{t('form.date')}</label>
          <input type="date" name="date" value={form.date} onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} className={inputClass} />
        </div>

        {/* Travellers */}
        <div>
          <label className={labelClass}>{t('form.travellers')}</label>
          <input type="number" name="travellers" value={form.travellers} onChange={handleChange}
            min={1} max={50} className={inputClass} />
        </div>
      </div>

      {/* Language preference */}
      <div>
        <label className={labelClass}>{t('form.language')}</label>
        <div className="flex gap-6">
          {['en', 'es'].map((l) => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="language" value={l}
                checked={form.language === l} onChange={handleChange}
                className="accent-[#B8892A]" />
              <span className="font-sans text-sm text-[#2C1810]/70">
                {l === 'en' ? t('form.language_en') : t('form.language_es')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>{t('form.message')}</label>
        <textarea name="message" value={form.message} onChange={handleChange}
          rows={4} placeholder={t('form.placeholder_message')}
          className={inputClass + ' resize-none'} />
      </div>

      {/* Privacy */}
      <p className="font-sans text-xs text-[#2C1810]/40">{t('form.privacy_note')}</p>

      {/* Submit */}
      <button type="submit" className="btn-primary w-full justify-center">
        {t('form.submit')}
        <ArrowRight size={16} />
      </button>

      {/* Direct contact alternatives */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-[#E8D5B0]/40">
        <span className="font-sans text-xs text-[#2C1810]/40">Or reach us directly:</span>
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-sans text-xs text-[#B8892A] hover:text-[#8B6914] transition-colors">
          <MessageCircle size={13} /> WhatsApp
        </a>
        <a href={`mailto:${siteConfig.contact.emails[0]}`}
          className="flex items-center gap-1.5 font-sans text-xs text-[#B8892A] hover:text-[#8B6914] transition-colors">
          <Mail size={13} /> Email
        </a>
      </div>
    </form>
  );
}
