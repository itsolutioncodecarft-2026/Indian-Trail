import { notFound } from 'next/navigation';
import { shortTrips, getShortTripBySlug } from '@/data/shortTrips';
import ShortTripDetail from '@/sections/short-trips/ShortTripDetail';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return shortTrips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = getShortTripBySlug(slug);
  if (!trip) return { title: 'Short Trip Not Found' };
  const variant = trip.variants[0];
  return {
    title: `${trip.title} — ${variant.duration} from ${variant.origin}`,
    description: trip.summary,
    openGraph: {
      title: trip.title,
      description: trip.summary,
      images: [{ url: trip.image, width: 1200, height: 800 }],
    },
  };
}

export default async function ShortTripPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const trip = getShortTripBySlug(slug);
  if (!trip) notFound();
  return <ShortTripDetail trip={trip} initialVariant={sp?.variant ?? null} />;
}
