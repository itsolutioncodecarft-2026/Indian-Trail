import DestinationsHero from '@/sections/destinations/DestinationsHero';
import DestinationsList from '@/sections/destinations/DestinationsList';

export const metadata = {
  title: 'Destinations — India\'s Most Magnificent Cities & Sites',
  description: 'Explore extraordinary destinations across India — from the royal cities of Rajasthan to Varanasi\'s sacred ghats, the cave temples of Central India and the golden forts of the North.',
};

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />
      <DestinationsList />
    </>
  );
}
