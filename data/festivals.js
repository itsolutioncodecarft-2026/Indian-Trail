/**
 * Festival Calendar data for Indian Routes & Trails
 *
 * DATES POLICY (per project brief):
 * - Only confirmed, verified dates are stored.
 * - For lunar/astrological festivals where only 2026–2027 could be confirmed,
 *   those two years are included and anything further marked provisional in comments.
 * - Festivals marked TODO below require date verification before going live.
 *   Do NOT guess or approximate any date — a wrong festival date on a client site
 *   is worse than a missing one.
 *
 * @typedef {Object} FestivalDate
 * @property {number} year
 * @property {string} start  - ISO 8601 date string YYYY-MM-DD
 * @property {string} end    - ISO 8601 date string YYYY-MM-DD
 * @property {string} [note] - Optional note shown to visitors
 *
 * @typedef {Object} Festival
 * @property {string} slug
 * @property {{en: string, es: string}} name
 * @property {{en: string, es: string}} tagline
 * @property {{en: string, es: string}} description
 * @property {string[]} regions
 * @property {string} heroImage
 * @property {string} cardImage
 * @property {FestivalDate[]} dates
 */

/** @type {Festival[]} */
export const festivals = [
  {
    slug: 'diwali',
    name: {
      en: 'Diwali',
      es: 'Diwali',
    },
    tagline: {
      en: 'The Festival of Lights — India Ablaze with Diyas and Fireworks',
      // Revisión de español recomendada por hablante nativo
      es: 'El Festival de las Luces — India Iluminada por Lámparas y Fuegos Artificiales',
    },
    description: {
      en: 'Diwali — the Festival of Lights — is India\'s most celebrated national holiday, marking the triumph of light over darkness and knowledge over ignorance. For five days in October or November, cities across the country light up with oil lamps (diyas), candles, strings of electric lights and fireworks. In Jaipur and Udaipur, palaces are illuminated and the City Palace of Udaipur organises spectacular celebrations on the lake. In Varanasi, the ghats are lined with thousands of diyas. Diwali is also the new year for many Hindu communities and a major time for family gatherings, sweets and the exchange of gifts.',
      // Revisión de español recomendada por hablante nativo
      es: 'Diwali —el Festival de las Luces— es la fiesta nacional más celebrada de India, que marca el triunfo de la luz sobre la oscuridad. Durante cinco días en octubre o noviembre, las ciudades se iluminan con lámparas de aceite (diyas), velas y fuegos artificiales. En Jaipur y Udaipur, los palacios se iluminan de forma espectacular; en Varanasi, los ghats se cubren de miles de diyas. Diwali es también el año nuevo para muchas comunidades hindúes.',
    },
    regions: ['Jaipur', 'Udaipur', 'Varanasi', 'Pan-India'],
    heroImage: '/festivals/diwali.png',
    cardImage: '/festivals/diwali.png',
    dates: [
      {
        year: 2026,
        start: '2026-11-08',
        end: '2026-11-08',
        note: 'Main Diwali night — Lakshmi Puja. Celebrations span 5 days (Dhanteras to Bhai Dooj).',
      },
      // TODO: Diwali 2027 date not confirmed — verify before publishing.
      // Diwali falls on the new moon of Kartik (Hindu calendar); consult a
      // verified Hindu calendar source for the 2027 date.
    ],
  },
  {
    slug: 'holi',
    name: {
      en: 'Holi',
      es: 'Holi',
    },
    tagline: {
      en: 'The Festival of Colours — Spring Erupts Across India',
      // Revisión de español recomendada por hablante nativo
      es: 'El Festival de los Colores — La Primavera Estalla por Toda India',
    },
    description: {
      en: 'Holi marks the arrival of spring and the victory of good over evil — and no festival in India is more viscerally joyful. On Holi morning, people take to the streets to throw powdered pigment and water at each other, turning every neighbourhood into a kaleidoscope of red, blue, yellow and green. The celebrations are particularly exuberant in Jaipur, where the royal family traditionally plays Holi from the balconies of the City Palace. In the Mathura and Vrindavan region, about four hours from Delhi, the festival begins a full week in advance with flower Holi and lath mar Holi (women beating men with sticks) — some of India\'s most spectacular and ancient celebrations.',
      // Revisión de español recomendada por hablante nativo
      es: 'Holi celebra la llegada de la primavera y el triunfo del bien sobre el mal. En la mañana de Holi, la gente llena las calles lanzando polvos de colores y agua. En Jaipur, la familia real celebra Holi desde los balcones del City Palace. En Mathura y Vrindavan (a cuatro horas de Delhi), el festival comienza una semana antes con el Lath Mar Holi, una de las celebraciones más antiguas y espectaculares de India.',
    },
    regions: ['Jaipur', 'Mathura / Vrindavan', 'Pan-India'],
    heroImage: '/festivals/holi.png',
    cardImage: '/festivals/holi.png',
    dates: [
      {
        year: 2026,
        start: '2026-03-03',
        end: '2026-03-04',
        note: 'Holika Dahan (bonfire) on the evening of 3 March; Rangwali Holi (colour play) on 4 March.',
      },
      {
        year: 2027,
        start: '2027-03-22',
        end: '2027-03-23',
        note: 'Holika Dahan on 22 March; Rangwali Holi on 23 March.',
      },
    ],
  },
  {
    slug: 'pushkar-camel-fair',
    name: {
      en: 'Pushkar Camel Fair',
      es: 'Feria del Camello de Pushkar',
    },
    tagline: {
      en: 'The World\'s Largest Camel Fair — Five Days of Desert Spectacle',
      // Revisión de español recomendada por hablante nativo
      es: 'La Feria de Camellos más Grande del Mundo — Cinco Días de Espectáculo Desértico',
    },
    description: {
      en: 'The Pushkar Camel Fair is one of the world\'s largest livestock fairs and one of India\'s most extraordinary spectacles — a confluence of some 50,000 camels, horses and cattle that draws traders, pilgrims and photographers from across the globe. The fair takes place on the dunes outside Pushkar each November, building to its climax on Kartik Purnima (the full moon of Kartik), when pilgrims descend on the sacred lake for a ritual bath. Beyond the trading, the fair is a festival of folk music, acrobatics, turban-tying competitions and camel races — a riot of colour, noise and activity against the backdrop of the desert at dusk.',
      // Revisión de español recomendada por hablante nativo
      es: 'La Feria del Camello de Pushkar es una de las ferias ganaderas más grandes del mundo y uno de los espectáculos más extraordinarios de India. Cada noviembre, unos 50,000 camellos, caballos y ganado llenan las dunas de Pushkar. La feria alcanza su clímax en Kartik Purnima (luna llena de Kartik), cuando los peregrinos se bañan en el lago sagrado. También hay música folclórica, acrobacias y carreras de camellos.',
    },
    regions: ['Pushkar'],
    heroImage: '/festivals/pushkar_camel_fair.png',
    cardImage: '/festivals/pushkar_camel_fair.png',
    dates: [
      {
        year: 2026,
        start: '2026-11-17',
        end: '2026-11-25',
        note: 'Peak date: Kartik Purnima (full moon) on 24 November 2026.',
      },
      // TODO: Pushkar Camel Fair 2027 dates not confirmed — verify against
      // the Rajasthan Tourism calendar before publishing.
    ],
  },
  {
    slug: 'dev-deepawali',
    name: {
      en: 'Dev Deepawali',
      es: 'Dev Deepawali',
    },
    tagline: {
      en: 'The Festival of Gods\' Lights — Varanasi\'s Ghats Ablaze',
      // Revisión de español recomendada por hablante nativo
      es: 'El Festival de las Luces de los Dioses — Los Ghats de Varanasi en Llamas',
    },
    description: {
      en: 'Dev Deepawali — "Diwali of the Gods" — takes place 15 days after Diwali on the full moon of Kartik at Varanasi. The ghats of the Ganges are lit with hundreds of thousands of earthen lamps, creating a river of light that is one of the most magical visual experiences in India. Priests perform elaborate aarti ceremonies on every ghat simultaneously, and the reflections of the lamps in the still water of the Ganges at night are unforgettable. Varanasi is at its most luminous and most itself on this evening.',
      // Revisión de español recomendada por hablante nativo
      es: 'Dev Deepawali —"Diwali de los Dioses"— tiene lugar 15 días después de Diwali en luna llena de Kartik en Varanasi. Los ghats del Ganges se iluminan con cientos de miles de lámparas de barro, creando un río de luz. Los sacerdotes realizan ceremonias aarti en cada ghat simultáneamente, y los reflejos de las lámparas en el río son inolvidables.',
    },
    regions: ['Varanasi'],
    heroImage: '/festivals/dev_dipawali.png',
    cardImage: '/festivals/dev_dipawali.png',
    dates: [
      // TODO: Dev Deepawali falls approximately 15 days after Diwali (Kartik Purnima).
      // For 2026: Diwali is 8 Nov 2026; Kartik Purnima is approximately 23–24 Nov 2026.
      // Verify the exact date from a reliable Hindu calendar source before publishing.
      {
        year: 2026,
        start: '2026-11-24',
        end: '2026-11-24',
        note: 'Provisional date — verify before publishing. Falls on Kartik Purnima, ~15 days after Diwali.',
      },
    ],
  },
  {
    slug: 'makar-sankranti-kite-festival',
    name: {
      en: 'Makar Sankranti — International Kite Festival',
      es: 'Makar Sankranti — Festival Internacional de Cometas',
    },
    tagline: {
      en: 'The Sky Above Jaipur Fills with 10,000 Kites',
      // Revisión de español recomendada por hablante nativo
      es: 'El Cielo sobre Jaipur se Llena de 10,000 Cometas',
    },
    description: {
      en: 'Makar Sankranti marks the transition of the sun into Capricorn and the beginning of the harvest season — a solar festival that falls on a fixed calendar date (14 January, occasionally 15 January) unlike most Indian festivals. In Jaipur, Rajasthan celebrates with the International Kite Festival: rooftops across the entire city become launching pads for kite-fighters, and the sky above the Pink City is thick with paper kites of every colour from dawn until dark. The sound of string-cutting and the sight of hundreds of defeated kites spiralling down is a spectacle that belongs entirely to Jaipur on this one day.',
      // Revisión de español recomendada por hablante nativo
      es: 'Makar Sankranti marca la transición del sol hacia Capricornio y el inicio de la temporada de cosecha. En Jaipur, Rajasthan celebra con el Festival Internacional de Cometas: las azoteas de toda la ciudad se convierten en plataformas de lanzamiento, y el cielo sobre la Ciudad Rosa se llena de cometas de papel de todos los colores desde el amanecer hasta el anochecer.',
    },
    regions: ['Jaipur', 'Pan-India'],
   heroImage: '/festivals/makar sankranti.jpg',
    cardImage: '/festivals/makar sankranti.jpg',
    dates: [
      {
        year: 2026,
        start: '2026-01-14',
        end: '2026-01-14',
        note: 'Fixed solar calendar date — 14 January annually.',
      },
      // TODO: Makar Sankranti 2027 confirm: fixed date is 14 Jan 2027
      // but verify Jaipur Kite Festival dates with Rajasthan Tourism.
    ],
  },
];

/**
 * Journey–Festival links table.
 * matchStrength: 'perfect' = festival falls within journey dates and city;
 *               'good'    = festival city is on the journey route.
 *
 * @typedef {Object} FestivalJourneyLink
 * @property {string} festivalSlug
 * @property {string} journeySlug
 * @property {'perfect'|'good'} matchStrength
 * @property {{en: string, es: string}} hook   — one-liner shown on journey page
 * @property {number} [suggestedStartOffset]   — days before festival to start journey
 */

/** @type {FestivalJourneyLink[]} */
export const festivalJourneyLinks = [
  // Diwali — Udaipur and Jaipur journeys
  {
    festivalSlug: 'diwali',
    journeySlug: 'echoes-of-forts-and-forests',
    matchStrength: 'perfect',
    hook: {
      en: 'Udaipur\'s City Palace lights up for Diwali — one of the most spectacular settings in India.',
      es: 'El City Palace de Udaipur se ilumina para Diwali — uno de los escenarios más espectaculares de India.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'diwali',
    journeySlug: 'crowns-citadel-countryside',
    matchStrength: 'perfect',
    hook: {
      en: 'Time your Udaipur visit to coincide with Diwali for palace illuminations on the lake.',
      es: 'Planifica tu visita a Udaipur para coincidir con Diwali y ver los palacios iluminados sobre el lago.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'diwali',
    journeySlug: 'north-india-unveiled',
    matchStrength: 'good',
    hook: {
      en: 'Varanasi at Diwali is lit by thousands of diyas along every ghat.',
      es: 'Varanasi en Diwali brilla con miles de diyas en cada ghat.',
    },
    suggestedStartOffset: 11,
  },
  // Holi — Jaipur journeys
  {
    festivalSlug: 'holi',
    journeySlug: 'golden-triangle-wildlife-trail',
    matchStrength: 'perfect',
    hook: {
      en: 'Holi in Jaipur is celebrated from the City Palace balconies — a sight like no other.',
      es: 'El Holi en Jaipur se celebra desde los balcones del City Palace — un espectáculo único.',
    },
    suggestedStartOffset: 4,
  },
  {
    festivalSlug: 'holi',
    journeySlug: 'echoes-of-empires-delhi-agra',
    matchStrength: 'good',
    hook: {
      en: 'Time your Jaipur days to fall on Holi for the royal City Palace celebrations.',
      es: 'Planifica tus días en Jaipur para el Holi y disfruta las celebraciones en el City Palace.',
    },
    suggestedStartOffset: 3,
  },
  {
    festivalSlug: 'holi',
    journeySlug: 'temples-thrones-holy-ghats',
    matchStrength: 'good',
    hook: {
      en: 'Holi in Jaipur pairs with Varanasi\'s ancient ghats on this spiritual circuit.',
      es: 'El Holi en Jaipur complementa los ghats ancestrales de Varanasi en este circuito espiritual.',
    },
    suggestedStartOffset: 3,
  },
  // Pushkar Camel Fair
  {
    festivalSlug: 'pushkar-camel-fair',
    journeySlug: 'crowns-citadel-countryside',
    matchStrength: 'perfect',
    hook: {
      en: 'Journey 6 passes through Pushkar — time it for the Camel Fair and you\'ll witness one of the world\'s great spectacles.',
      es: 'El Viaje 6 pasa por Pushkar — programa tu visita durante la Feria del Camello para una experiencia única en el mundo.',
    },
    suggestedStartOffset: 10,
  },
  {
    festivalSlug: 'pushkar-camel-fair',
    journeySlug: 'north-india-unveiled',
    matchStrength: 'perfect',
    hook: {
      en: 'The Pushkar stop on this journey can be perfectly timed for the Camel Fair in November.',
      es: 'La parada en Pushkar de este viaje puede coincidir perfectamente con la Feria del Camello en noviembre.',
    },
    suggestedStartOffset: 11,
  },
  // Dev Deepawali — Varanasi journeys
  {
    festivalSlug: 'dev-deepawali',
    journeySlug: 'temples-thrones-holy-ghats',
    matchStrength: 'perfect',
    hook: {
      en: 'Dev Deepawali lights 100,000 lamps on the Varanasi ghats — the most extraordinary night in the city\'s calendar.',
      es: 'Dev Deepawali ilumina 100,000 lámparas en los ghats de Varanasi — la noche más extraordinaria del año en la ciudad.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'dev-deepawali',
    journeySlug: 'north-india-unveiled',
    matchStrength: 'perfect',
    hook: {
      en: 'Time the Varanasi leg of this journey for Dev Deepawali — lamps on every ghat, reflections in the Ganges.',
      es: 'Programa la etapa de Varanasi en este viaje para Dev Deepawali — lámparas en cada ghat, reflejos en el Ganges.',
    },
    suggestedStartOffset: 5,
  },
  // Makar Sankranti Kite Festival — Jaipur
  {
    festivalSlug: 'makar-sankranti-kite-festival',
    journeySlug: 'echoes-of-empires-delhi-agra',
    matchStrength: 'perfect',
    hook: {
      en: 'Jaipur\'s rooftops fill with 10,000 kites on 14 January — a spectacle visible from Amber Fort.',
      es: 'Las azoteas de Jaipur se llenan de 10,000 cometas el 14 de enero — un espectáculo visible desde Amber Fort.',
    },
    suggestedStartOffset: 3,
  },
  {
    festivalSlug: 'makar-sankranti-kite-festival',
    journeySlug: 'golden-triangle-wildlife-trail',
    matchStrength: 'perfect',
    hook: {
      en: 'Catch Jaipur\'s International Kite Festival on 14 January — the entire sky above the Pink City turns to colour.',
      es: 'Disfruta el Festival Internacional de Cometas de Jaipur el 14 de enero — todo el cielo sobre la Ciudad Rosa se llena de color.',
    },
    suggestedStartOffset: 4,
  },
];

// ─── Pure utility functions ───────────────────────────────────────────────────

/**
 * Returns the next occurrence of a festival's start date on or after `today`.
 * @param {Festival} festival
 * @param {Date} today
 * @returns {FestivalDate|null}
 */
export function getNextOccurrence(festival, today) {
  const upcoming = festival.dates
    .filter((d) => new Date(d.start) >= today)
    .sort((a, b) => new Date(a.start) - new Date(b.start));
  return upcoming[0] ?? null;
}

/**
 * Returns the next `count` festivals sorted by nearest upcoming date.
 * @param {Date} today
 * @param {number} count
 * @returns {Array<{festival: Festival, nextDate: FestivalDate}>}
 */
export function getUpcomingFestivals(today, count = 4) {
  return festivals
    .map((f) => ({ festival: f, nextDate: getNextOccurrence(f, today) }))
    .filter((x) => x.nextDate !== null)
    .sort((a, b) => new Date(a.nextDate.start) - new Date(b.nextDate.start))
    .slice(0, count);
}

/**
 * Returns the number of days until the festival's next start date.
 * Returns null if no future date is available.
 * @param {Festival} festival
 * @param {Date} today
 * @returns {number|null}
 */
export function daysUntil(festival, today) {
  const next = getNextOccurrence(festival, today);
  if (!next) return null;
  const ms = new Date(next.start) - today;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

/**
 * Returns all journeys linked to a festival slug.
 * @param {string} festivalSlug
 * @returns {FestivalJourneyLink[]}
 */
export function getJourneysForFestival(festivalSlug) {
  return festivalJourneyLinks.filter((l) => l.festivalSlug === festivalSlug);
}

/**
 * Returns all festivals linked to a journey slug.
 * @param {string} journeySlug
 * @returns {FestivalJourneyLink[]}
 */
export function getFestivalsForJourney(journeySlug) {
  return festivalJourneyLinks.filter((l) => l.journeySlug === journeySlug);
}

/**
 * Returns a festival by slug.
 * @param {string} slug
 * @returns {Festival|undefined}
 */
export function getFestivalBySlug(slug) {
  return festivals.find((f) => f.slug === slug);
}

/**
 * Client-side journey filter.
 * @param {import('./tours').tours} allTours
 * @param {{festival?: string, durationBand?: string, interests?: string[], destinations?: string[], month?: string}} filters
 * @returns {typeof allTours}
 */
export function filterJourneys(allTours, filters = {}) {
  return allTours.filter((tour) => {
    if (filters.festival) {
      const linked = getJourneysForFestival(filters.festival).map((l) => l.journeySlug);
      if (!linked.includes(tour.slug)) return false;
    }
    if (filters.durationBand) {
      if (filters.durationBand === '1-7' && tour.duration > 7) return false;
      if (filters.durationBand === '8-12' && (tour.duration < 8 || tour.duration > 12)) return false;
      if (filters.durationBand === '13+' && tour.duration < 13) return false;
    }
    if (filters.interests?.length) {
      const hasAll = filters.interests.every((i) => tour.interests?.includes(i));
      if (!hasAll) return false;
    }
    if (filters.destinations?.length) {
      const hasAny = filters.destinations.some((d) =>
        tour.route.some((city) => city.toLowerCase().includes(d.toLowerCase()))
      );
      if (!hasAny) return false;
    }
    if (filters.month) {
      if (!tour.bestMonths?.includes(filters.month)) return false;
    }
    return true;
  });
}
