import ToursHero from '@/sections/tours/ToursHero';
import ToursList from '@/sections/tours/ToursList';

export const metadata = {
  title: 'Our Journeys — Seven Curated India Expeditions',
  description: 'Explore seven extraordinary India journeys curated by Om — from the 6-day Golden Triangle to the 15-day North India grand tour spanning Amritsar, Varanasi, Rajasthan and beyond.',
};

export default function ToursPage() {
  return (
    <>
      <ToursHero />
      <ToursList />
    </>
  );
}
