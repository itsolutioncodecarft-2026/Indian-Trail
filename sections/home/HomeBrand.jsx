'use client';
import { siteConfig } from '@/data/siteContent';

export default function HomeBrand() {
  return (
    <section style={{ backgroundColor: '#2C1810' }} className="py-5">
      <div className="container-luxury">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#FAF6EC]/30">
            Exclusive Journeys by Om
          </p>
          <div className="hidden sm:block h-px w-32 bg-[#B8892A]/20" />
          <p className="font-serif text-sm italic text-[#FAF6EC]/50">
            &ldquo;When you journey with Om, you are not a tourist holding a map.&rdquo;
          </p>
          <div className="hidden sm:block h-px w-32 bg-[#B8892A]/20" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#FAF6EC]/30">
            {siteConfig.contact.phones[0]}
          </p>
        </div>
      </div>
    </section>
  );
}
