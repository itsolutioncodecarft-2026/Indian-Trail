import { tours } from '@/data/tours';
import { destinations } from '@/data/destinations';
import { festivals } from '@/data/festivals';

const BASE_URL = 'https://www.indianroutesandtrails.com';

export default function sitemap() {
  const tourUrls = tours.map((t) => ({
    url: `${BASE_URL}/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const destUrls = destinations.map((d) => ({
    url: `${BASE_URL}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const festivalUrls = festivals.map((f) => ({
    url: `${BASE_URL}/festivals/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticUrls = [
    '', '/about', '/tours', '/destinations', '/festivals', '/experiences', '/contact',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...tourUrls, ...destUrls, ...festivalUrls];
}
