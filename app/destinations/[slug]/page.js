import { notFound } from 'next/navigation';
import { destinations, getDestinationBySlug } from '@/data/destinations';
import DestinationDetailClient from './DestinationDetailClient';

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: 'Destination Not Found' };
  return {
    title: `${dest.name} — ${dest.tagline}`,
    description: dest.description.slice(0, 155),
    openGraph: {
      title: dest.name,
      description: dest.description.slice(0, 155),
      images: [{ url: dest.featuredImage, width: 1200, height: 630 }],
    },
  };
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();
  return <DestinationDetailClient destination={dest} />;
}
