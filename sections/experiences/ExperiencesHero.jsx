'use client';
import Image from 'next/image';

export default function ExperiencesHero() {
  return (
    <section className="relative h-[55vh] min-h-[380px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1800&q=80"
          alt="Unique India Experiences"
          fill priority className="object-cover object-center" sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/40 to-[#2C1810]/10" />
      </div>
      <div className="relative container-luxury">
        <p className="eyebrow mb-4" style={{ color: '#B8892A' }}>Experiences</p>
        <h1 className="display-title leading-none" style={{ color: '#FAF6EC' }}>
          Beyond the<br />
          <span className="italic font-light" style={{ color: '#D4A853' }}>Ordinary</span>
        </h1>
        <p className="mt-5 font-sans text-lg font-light max-w-xl" style={{ color: 'rgba(250,246,236,0.6)' }}>
          Unique cultural encounters, wildlife safaris, spiritual ceremonies and village immersions — the experiences that define a journey with Om.
        </p>
      </div>
    </section>
  );
}
