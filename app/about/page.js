import AboutHero from '@/sections/about/AboutHero';
import AboutStory from '@/sections/about/AboutStory';
import AboutExpertise from '@/sections/about/AboutExpertise';
import AboutPhilosophy from '@/sections/about/AboutPhilosophy';
import AboutWhereIGuide from '@/sections/about/AboutWhereIGuide';
import AboutClosing from '@/sections/about/AboutClosing';

export const metadata = {
  title: 'About Om — The Man Behind Every Journey',
  description: 'Meet Om Prakash Saini — Government of India authorised PAN-India Tourist Guide with 38+ years of guiding excellence, Spanish-language specialist, and the heart of Indian Routes & Trails.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutExpertise />
      <AboutPhilosophy />
      <AboutWhereIGuide />
      <AboutClosing />
    </>
  );
}
