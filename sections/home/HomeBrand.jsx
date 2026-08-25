'use client';
import { siteConfig } from '@/data/siteContent';

export default function HomeBrand() {
  return (
    <div className="border-b" style={{ backgroundColor: '#FAFBFD', borderColor: '#E2E8F0' }}>
      <div className="container-luxury py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-y-1.5">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: '#A0AEC0' }}>
            Exclusive Journeys by Om
          </span>
          <span className="hidden sm:block h-px flex-1 mx-8 bg-[#E2E8F0]" />
          <span className="font-serif text-xs italic" style={{ color: '#718096' }}>
            &ldquo;You are not a tourist holding a map — you are an honoured guest.&rdquo;
          </span>
          <span className="hidden sm:block h-px flex-1 mx-8 bg-[#E2E8F0]" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: '#A0AEC0' }}>
            {siteConfig.contact.phones[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
