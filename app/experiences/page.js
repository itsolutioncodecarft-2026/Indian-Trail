import ExperiencesHero from '@/sections/experiences/ExperiencesHero';
import ExperiencesList from '@/sections/experiences/ExperiencesList';

export const metadata = {
  title: 'Optional Experiences — Unique Add-Ons for Your India Journey',
  description: 'Camel safaris, village boat rides, Ganga Aarti ceremonies, heritage food walks, Jeep safaris in tiger country — exclusive optional experiences to enrich your India journey.',
};

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      <ExperiencesList />
    </>
  );
}
