import DestinationsHero from '@/sections/destinations/DestinationsHero';
import DestinationsList from '@/sections/destinations/DestinationsList';

export const metadata = {
  title: 'Destinations — India\'s Most Magnificent Cities',
  description: 'Explore 15 extraordinary destinations across India — from the royal cities of Rajasthan to the spiritual ghats of Varanasi, the cave temples of Aurangabad and the energy of Mumbai.',
};

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />
      <DestinationsList />
    </>
  );
}
