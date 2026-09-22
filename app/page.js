import HomeHero from '@/sections/home/HomeHero';
import HomeBrand from '@/sections/home/HomeBrand';
import HomeFestivalStrip from '@/sections/home/HomeFestivalStrip';
import HomeTours from '@/sections/home/HomeTours';
import HomeDestinations from '@/sections/home/HomeDestinations';
import HomeAboutTeaser from '@/sections/home/HomeAboutTeaser';
import HomeWhyUs from '@/sections/home/HomeWhyUs';
import HomeResponsible from '@/sections/home/HomeResponsible';
import HomeCTA from '@/sections/home/HomeCTA';

export const metadata = {
  title: 'Indian Routes & Trails — Exclusive India Tours by Om',
  description: 'Curated luxury journeys across India by Om — a master guide with 10+ years experience and Spanish-language expertise. Timeless, authentic, deeply personal travel.',
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBrand />
      <HomeFestivalStrip />
      <HomeTours />
      <HomeAboutTeaser />
      <HomeDestinations />
      <HomeWhyUs />
      <HomeResponsible />
      <HomeCTA />
    </>
  );
}
