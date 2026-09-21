import FestivalsHero from '@/sections/festivals/FestivalsHero';
import FestivalsList from '@/sections/festivals/FestivalsList';

export const metadata = {
  title: 'Festival Calendar — Time Your Journey Around India\'s Great Celebrations',
  description: 'Plan your India journey around Diwali, Holi, the Pushkar Camel Fair, Dev Deepawali and more. Om will help you experience India at its most alive.',
};

export default function FestivalsPage() {
  return (
    <>
      <FestivalsHero />
      <FestivalsList />
    </>
  );
}
