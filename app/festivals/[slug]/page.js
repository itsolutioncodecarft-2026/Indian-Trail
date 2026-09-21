import { notFound } from 'next/navigation';
import { festivals, getFestivalBySlug } from '@/data/festivals';
import FestivalDetailClient from './FestivalDetailClient';

export async function generateStaticParams() {
  return festivals.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) return { title: 'Festival Not Found' };
  return {
    title: `${festival.name.en} — Indian Routes & Trails Festival Calendar`,
    description: festival.description.en.slice(0, 155),
    openGraph: {
      title: festival.name.en,
      description: festival.description.en.slice(0, 155),
      images: [{ url: festival.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default async function FestivalDetailPage({ params }) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  if (!festival) notFound();
  return <FestivalDetailClient festival={festival} />;
}
