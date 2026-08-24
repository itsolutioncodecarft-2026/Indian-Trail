import ToursHero from '@/sections/tours/ToursHero';
import ToursList from '@/sections/tours/ToursList';

export const metadata = {
  title: 'Our Journeys — Five Curated India Expeditions',
  description: 'Explore five extraordinary India journeys curated by Om — from 8-day Golden Triangle tours to 17-day grand expeditions spanning Rajasthan, Varanasi, Mumbai and beyond.',
};

export default function ToursPage() {
  return (
    <>
      <ToursHero />
      <ToursList />
    </>
  );
}
