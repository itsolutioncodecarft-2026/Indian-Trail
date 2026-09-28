import ToursHero from '@/sections/tours/ToursHero';
import ToursList from '@/sections/tours/ToursList';

export const metadata = {
  title: 'Our Journeys — Sixteen Curated India Expeditions',
  description: 'Explore sixteen extraordinary India journeys curated by Om — from 6-day classic circuits to 17-day grand South India tours spanning Tamil Nadu, Kerala, Karnataka, Gujarat and beyond.',
};

export default function ToursPage() {
  return (
    <>
      <ToursHero />
      <ToursList />
    </>
  );
}
