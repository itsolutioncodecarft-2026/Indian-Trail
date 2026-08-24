import AboutHero from '@/sections/about/AboutHero';
import AboutStory from '@/sections/about/AboutStory';
import AboutPhilosophy from '@/sections/about/AboutPhilosophy';
import AboutCTA from '@/sections/about/AboutCTA';

export const metadata = {
  title: 'About Om — The Visionary Behind the Voyage',
  description: 'Meet Om — professional guide with 10+ years experience, Spanish-language expert, and the heart behind Indian Routes & Trails. His story, philosophy and approach to luxury travel.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutPhilosophy />
      <AboutCTA />
    </>
  );
}
