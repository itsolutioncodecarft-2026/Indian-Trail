import { notFound } from 'next/navigation';
import { tours, getTourBySlug } from '@/data/tours';
import TourDetailClient from './TourDetailClient';

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: 'Tour Not Found' };
  return {
    title: `${tour.title} — ${tour.duration}-Day India Journey`,
    description: tour.overview.slice(0, 155),
    openGraph: {
      title: tour.title,
      description: tour.overview.slice(0, 155),
      images: [{ url: tour.featuredImage, width: 1200, height: 630 }],
    },
  };
}

export default async function TourDetailPage({ params }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();
  return <TourDetailClient tour={tour} />;
}
