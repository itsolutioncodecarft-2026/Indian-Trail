/**
 * Testimonials data — Guest Stories section
 * ─────────────────────────────────────────────────────────────────
 * Status: PLACEHOLDER
 *
 * These testimonials are demo/placeholder content with neutral names
 * (e.g. "Guest from London"). They are NOT real customer reviews.
 *
 * └── TODO: Replace all entries with real, approved testimonials ──┘
 *     before going live. Set `status` to 'verified' and use the
 *     traveller's real name only with written permission.
 *
 * Fields:
 *   id         — unique string
 *   quote      — testimonial text (moderate length, no clamping)
 *   name       — traveller name (placeholder uses "Guest from …")
 *   location   — city / country of origin
 *   journey    — { title: string, slug: string|null }
 *                  slug links to /tours/[slug] when known,
 *                  null renders as plain text.
 *   rating     — number 1-5 (ONLY set when real/approved;
 *                  null hides stars)
 *   travelDate — optional string, e.g. "February 2025"
 *   status     — 'placeholder' | 'verified'
 */

export const testimonials = [
  {
    id: 't-01',
    quote:
      'From the moment we landed in Delhi to the final sunset over the backwaters in Kerala, every detail was handled with quiet precision. Om understood exactly the pace we wanted — never rushed, always immersive.',
    name: 'Guest from London',
    location: 'London, United Kingdom',
    journey: { title: 'Echoes of Empires: Delhi, Agra and Beyond', slug: 'echoes-of-empires-delhi-agra' },
    rating: null,
    travelDate: 'October 2024',
    status: 'placeholder',
  },
  {
    id: 't-02',
    quote:
      'The temples of Tamil Nadu were beyond anything we had imagined. Standing inside the Brihadishvara at Tanjore, you feel a thousand years of devotion in the stone. This is travel that changes you.',
    name: 'Guest from Toronto',
    location: 'Toronto, Canada',
    journey: { title: 'Coromandel to Coast: Temples, Backwaters & Spice Trails', slug: 'temples-spices-south-india' },
    rating: null,
    travelDate: 'December 2024',
    status: 'placeholder',
  },
  {
    id: 't-03',
    quote:
      'What sets this apart is the access. We weren\'t just looking at Jaipur from a bus window — we were inside a family home, cooking together, sharing stories. That\'s the India you come for but rarely find.',
    name: 'Guest from Melbourne',
    location: 'Melbourne, Australia',
    journey: { title: 'The Golden Triangle: Delhi, Agra & Jaipur', slug: 'golden-triangle-wildlife-trail' },
    rating: null,
    travelDate: 'November 2024',
    status: 'placeholder',
  },
  {
    id: 't-04',
    quote:
      'The houseboat cruise from Kumarakom to Alleppey was the most peaceful day of our entire trip. Coconut palms reflected in still water, fishermen in the distance, and the most incredible Kerala food served on board.',
    name: 'Guest from Barcelona',
    location: 'Barcelona, Spain',
    journey: { title: 'Enchanting South: Hills, Heritage & Coastlines — Karnataka & Kerala', slug: 'karnataka-kerala-escape' },
    rating: null,
    travelDate: 'January 2025',
    status: 'placeholder',
  },
  {
    id: 't-05',
    quote:
      'Munnar\'s tea estates stretched endlessly in every shade of green. Our guide knew the best viewpoints, the quiet trails, and exactly where to stop for a cup of fresh Nilgiri tea. It felt like a private Discovery.',
    name: 'Guest from Munich',
    location: 'Munich, Germany',
    journey: { title: 'Sacred Shrines and Serene Waters: The Grand Southern Trail', slug: 'exotic-south-india-grand-tour' },
    rating: null,
    travelDate: 'February 2025',
    status: 'placeholder',
  },
  {
    id: 't-06',
    quote:
      'Every morning felt like a new chapter. Hampi\'s ruins at sunrise, the Badami caves, then Goa\'s coastline by evening. Ten days that covered more ground than we thought possible without ever feeling rushed.',
    name: 'Guest from Amsterdam',
    location: 'Amsterdam, Netherlands',
    journey: { title: 'Empires of Stone & Sun-Kissed Shores: Hampi, Badami & Goa', slug: 'karnataka-goa-hampi-heritage' },
    rating: null,
    travelDate: 'December 2024',
    status: 'placeholder',
  },
  {
    id: 't-07',
    quote:
      'We travelled as a family with two teenagers and Om made it effortless. The kids were engaged at every temple, every fort. It wasn\'t just sightseeing — it was storytelling that brought India alive for all of us.',
    name: 'Guest from Singapore',
    location: 'Singapore',
    journey: { title: 'The Royal Forts, Wilderness & Heritage Trail', slug: 'royal-forts-wilderness-heritage-trail' },
    rating: null,
    travelDate: 'November 2024',
    status: 'placeholder',
  },
  {
    id: 't-08',
    quote:
      'The attention to detail was remarkable — from the choice of hotels to the timing of each visit that avoided crowds. Watching the Taj Mahal at sunrise with so few people around was a moment we will never forget.',
    name: 'Guest from Paris',
    location: 'Paris, France',
    journey: { title: 'The Golden Triangle: Delhi, Agra & Jaipur', slug: 'golden-triangle-wildlife-trail' },
    rating: null,
    travelDate: 'January 2025',
    status: 'placeholder',
  },
];
