'use client';
import Image from 'next/image';

export default function ExperiencesHero() {
  return (
    <section className="relative h-[58vh] min-h-[380px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=2000&q=85"
          alt="Spiritual India — unique experiences" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.38) 55%, transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,42,0.55) 0%, transparent 60%)' }} />
      </div>
      <div className="relative container-luxury">
        <p className="eyebrow mb-4" style={{ color: '#C8A96E' }}>Experiences</p>
        <h1 className="display-title leading-none" style={{ color: '#FEFCF7' }}>
          Beyond the<br />
          <span className="italic font-light" style={{ color: '#C8A96E' }}>Ordinary</span>
        </h1>
        <p className="mt-5 font-sans font-light max-w-xl" style={{ color: 'rgba(254,252,247,0.62)', fontSize: '1.05rem' }}>
          Cultural ceremonies, wildlife safaris, village immersions — the moments that define a journey with Om.
        </p>
      </div>
    </section>
  );
}
