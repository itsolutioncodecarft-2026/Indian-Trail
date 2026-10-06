/**
 * Short Trips & Day Excursions — Indian Routes & Trails
 *
 * Image mapping:
 *   /destination/agra.jpg       — Agra in a Day
 *   /destination/bharatpur.jpg  — Bharatpur Bird Park
 *   /destination/jaipur.jpg     — Jaipur in a Day
 *   /destination/pushkar.jpg    — Pushkar & Bagru Block Printing
 *   /destination/ranthambore.jpg— Ranthambore Tiger Safari
 *
 * All images are verified files under public/destination/.
 *
 * TODO (operational verifications before publishing):
 *   1. Verify current Gatimaan Express (train 12049/12050) timetable and booking policy.
 *   2. Verify Taj Mahal current entry-fee bands (Indian / foreign national / SAARC).
 *   3. Verify Keoladeo National Park current entry fees and authorised rickshaw charges.
 *   4. Confirm dinner inclusion on Ranthambore overnight trip (narrative mentions it,
 *      but it is not listed in the source inclusions — marked clearly in planningNotes).
 *   5. Verify Savitri Temple ropeway current operating status and hours.
 *   6. Verify Ranthambore Fort and Ganesh Temple access route / park-permit requirements.
 *   7. Verify general Amber Fort entry by private jeep vs. walking current rules.
 */

export const shortTrips = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Agra in a Day
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'agra-in-a-day',
    title: 'Agra in a Day',
    summary: 'The Taj Mahal, Agra Fort and the exquisite Itimad-ud-Daulah — India\'s most iconic city in a single beautifully arranged day.',
    image: '/destination/agra.jpg',
    featured: true,
    defaultVariant: 'delhi',
    variants: [
      {
        id: 'delhi',
        label: 'From Delhi',
        origin: 'Delhi',
        type: 'day-trip',
        interests: ['heritage', 'culture', 'architecture', 'photography'],
        travelTime: 'Approximately 2 hours by Gatimaan Express train (subject to timetable) or approximately 3.5–4 hours by road, subject to traffic',
        duration: '1 Day',
        overview: 'Begin the day from Delhi — either on the Gatimaan Express, India\'s fastest train linking Delhi Hazrat Nizamuddin to Agra Cantt in approximately two hours (subject to current timetable and availability), or by an early private road departure to beat the traffic. Your guide meets you at Agra station or hotel and the day unfolds across the city\'s three great Mughal monuments. Agra Fort, the red-sandstone imperial citadel on the Yamuna bank, comes first — its immense walls, audience halls and the Musamman Burj tower from which, tradition holds, Shah Jahan watched the Taj Mahal in his final years. Next, the Itimad-ud-Daulah (the "Baby Taj") — an exquisite garden tomb whose finely inlaid white marble surface inspired the craftsmen who would later complete the Taj itself. After lunch at a recommended local restaurant, the afternoon belongs to the Taj Mahal. The monument is most luminous in the warm afternoon light before the crowds thin; your guide will explain the geometry of the char-bagh, the Quranic inscriptions and the Pietra Dura inlay that took 22 years to complete. If the schedule allows, a stop at a verified Agra marble-inlay artisan workshop gives a direct encounter with the craft tradition that has been practised here continuously since the Mughal court. Return to Delhi by the evening train or arranged transport, with a transfer to your Delhi hotel on arrival.',
        timeline: [
          {
            sequence: 'Early morning',
            heading: 'Departure from Delhi',
            description: 'Depart Delhi by Gatimaan Express from Hazrat Nizamuddin station (subject to current timetable and booking), or by private road at approximately 05:30–06:00 to arrive in Agra before the main tourist rush. TODO: verify current Gatimaan Express departure time and booking process.',
          },
          {
            sequence: 'Morning',
            heading: 'Agra Fort',
            description: 'Guided visit to Agra Fort (UNESCO World Heritage Site) — the great red-sandstone imperial citadel that served as the principal seat of the Mughal Empire under Akbar, Jahangir and Shah Jahan. See the Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), Khas Mahal, Musamman Burj and the views across the Yamuna toward the Taj Mahal.',
          },
          {
            sequence: 'Late morning',
            heading: 'Itimad-ud-Daulah (Baby Taj)',
            description: 'The tomb of Mirza Ghiyas Beg — Nur Jahan\'s father and the first major monument in Mughal India to be entirely faced in white marble. Its delicate Pietra Dura inlay work directly prefigures the Taj. Usually far less crowded than the main monument, and arguably more intimate and refined.',
          },
          {
            sequence: 'Afternoon',
            heading: 'Lunch and Taj Mahal',
            description: 'Lunch at a recommended local Agra restaurant. Afternoon visit to the Taj Mahal — the most celebrated building in the world, built between 1632 and 1653 by Shah Jahan in memory of Mumtaz Mahal. Your guide covers the geometry of the char-bagh, the symmetry of the minarets, the Quranic calligraphic inscriptions and the extraordinary Pietra Dura inlay of semi-precious stones. Note: the Taj Mahal is closed to general visitors every Friday.',
          },
          {
            sequence: 'Late afternoon (if time allows)',
            heading: 'Marble Artisan Workshop',
            description: 'An optional stop at a verified Agra marble-inlay artisan\'s workshop — where craftspeople continue the Pietra Dura tradition introduced by Mughal court artisans in the 17th century. A direct encounter with a living craft heritage.',
          },
          {
            sequence: 'Evening',
            heading: 'Return to Delhi',
            description: 'Transfer to Agra Cantt station or road departure. Return to Delhi by evening train or private vehicle with transfer to your Delhi hotel on arrival.',
          },
        ],
        highlights: [
          'Agra Fort — UNESCO imperial Mughal citadel',
          'Itimad-ud-Daulah — the exquisite "Baby Taj" marble tomb',
          'Taj Mahal — guided visit with full contextual explanation',
          'Optional: Agra marble-inlay artisan workshop',
        ],
        inclusions: [
          'Return Delhi–Agra train fare (when train variant is selected and booked)',
          'Private air-conditioned vehicle for arrival, local sightseeing and departure transfers in Agra',
          'Local Agra lunch',
          'Licensed local monument guide throughout the day',
          'Monument entry fees (Agra Fort, Itimad-ud-Daulah, Taj Mahal)',
        ],
        exclusions: [
          'Personal expenses',
          'Gratuities for guide and driver',
          'Meals not mentioned in inclusions',
        ],
        planningNotes: [
          'The Taj Mahal is closed to general visitors every Friday. Please confirm your visit date avoids Friday.',
          'Gatimaan Express timetable and availability should be verified at time of booking — train numbers, times and fares are subject to change. TODO: verify current Gatimaan Express schedule.',
          'Monument opening hours are subject to change. Entry fees for foreign nationals differ from Indian nationals. TODO: verify current Taj Mahal entry fees.',
        ],
        responsibleTourism: null,
      },
      {
        id: 'jaipur',
        label: 'From Jaipur',
        origin: 'Jaipur',
        type: 'day-trip',
        interests: ['heritage', 'culture', 'architecture', 'photography'],
        travelTime: 'Approximately 4.5 hours by road, subject to traffic',
        duration: '1 Day',
        overview: 'An early road departure from Jaipur — around 07:00, or approximately 06:00 if including the optional detour to Chand Baori and Harshat Mata Temple at Abhaneri village. Abhaneri is home to Chand Baori, one of the largest and most remarkable stepwells in the world: 3,500 narrow steps descending in perfect geometric symmetry to the water below, carved in the 9th century. On arrival in Agra, your guide meets you and the day follows the same sequence: Agra Fort, Itimad-ud-Daulah, lunch and the Taj Mahal. If the schedule allows, an optional sunset view from the Mehtab Bagh — the formal Mughal garden directly across the Yamuna from the Taj, where the monument is reflected perfectly in the water as the light fades — and a stop at a verified marble-inlay artisan workshop. Return by road, approximately 4.5 hours to Jaipur, with a hotel drop on arrival.',
        timeline: [
          {
            sequence: 'Early morning (approximately 07:00, or 06:00 if including Abhaneri)',
            heading: 'Departure from Jaipur',
            description: 'Private road departure from Jaipur heading east toward Agra. Approximately 4.5-hour journey subject to traffic and route conditions.',
          },
          {
            sequence: 'En route (optional)',
            heading: 'Chand Baori and Harshat Mata Temple, Abhaneri',
            description: 'The stepwell at Abhaneri village — one of the largest in India, descending 3,500 steps in precise inverted-pyramid geometry to a depth of approximately 20 metres, carved in the 9th century. The adjacent Harshat Mata Temple dates from the same period. An outstanding 45-minute stop on the road.',
          },
          {
            sequence: 'Morning',
            heading: 'Agra Fort',
            description: 'Guided visit to Agra Fort (UNESCO). See the Diwan-i-Aam, Diwan-i-Khas, Khas Mahal, Musamman Burj and the views toward the Taj Mahal from the fort\'s riverside ramparts.',
          },
          {
            sequence: 'Late morning',
            heading: 'Itimad-ud-Daulah (Baby Taj)',
            description: 'The first great all-white-marble Mughal tomb, its Pietra Dura inlay work a direct inspiration for the Taj Mahal. Intimate, beautiful and rarely crowded.',
          },
          {
            sequence: 'Afternoon',
            heading: 'Lunch and Taj Mahal',
            description: 'Lunch at a recommended local restaurant. Afternoon guided visit to the Taj Mahal. Note: closed every Friday.',
          },
          {
            sequence: 'Late afternoon (if schedule allows)',
            heading: 'Mehtab Bagh Sunset and Artisan Workshop',
            description: 'Optional sunset view from Mehtab Bagh garden across the Yamuna — the finest and least crowded vantage point for the Taj Mahal at dusk. Optional stop at a verified marble-inlay artisan workshop.',
          },
          {
            sequence: 'Evening',
            heading: 'Return to Jaipur',
            description: 'Road departure from Agra, approximately 4.5 hours subject to traffic, with transfer to your Jaipur hotel on arrival.',
          },
        ],
        highlights: [
          'Optional: Chand Baori stepwell and Harshat Mata Temple, Abhaneri (9th century)',
          'Agra Fort — UNESCO imperial Mughal citadel',
          'Itimad-ud-Daulah — the exquisite "Baby Taj" marble tomb',
          'Taj Mahal — guided visit with full contextual explanation',
          'Optional: Mehtab Bagh sunset, Agra marble-inlay artisan workshop',
        ],
        inclusions: [
          'Private air-conditioned vehicle for return Jaipur–Agra–Jaipur road journey',
          'Guided city experience in Agra throughout the day',
          'Local Agra lunch',
          'Monument entry fees (Agra Fort, Itimad-ud-Daulah, Taj Mahal)',
        ],
        exclusions: [
          'Gratuities for guide and driver',
          'Personal expenses',
          'Meals not mentioned in inclusions',
        ],
        planningNotes: [
          'The Taj Mahal is closed to general visitors every Friday.',
          'Road travel times are approximate and subject to traffic and road conditions.',
          'Chand Baori and Harshat Mata Temple entry is managed by ASI — fees apply. TODO: verify current fees.',
        ],
        responsibleTourism: null,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Bharatpur Bird Park
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'bharatpur-bird-park',
    title: 'Bharatpur Bird Park',
    summary: 'The UNESCO-listed Keoladeo wetland sanctuary and the 9th-century Chand Baori stepwell — a day or overnight of nature and heritage from Jaipur.',
    image: '/destination/bharatpur.jpg',
    featured: true,
    defaultVariant: 'same-day',
    variants: [
      {
        id: 'same-day',
        label: 'Same Day',
        origin: 'Jaipur',
        type: 'day-trip',
        interests: ['wildlife', 'nature', 'photography', 'heritage'],
        travelTime: 'Approximately 4 hours each way, subject to traffic',
        duration: '1 Day',
        overview: 'An early road departure from Jaipur, heading east toward Bharatpur — approximately 180 km, four hours subject to route and traffic. The first stop is Abhaneri village, home to Chand Baori — one of the largest and most architecturally remarkable stepwells in the world: 3,500 steps in precise inverted-pyramid symmetry, carved in the 9th century, alongside the Harshat Mata Temple. Arriving in Bharatpur, lunch at a local restaurant before the afternoon visit to Keoladeo National Park. Keoladeo — formerly known as Keoladeo Ghana or Bharatpur Bird Sanctuary — is a UNESCO World Heritage Site and one of Asia\'s most important wetland habitats for resident and migratory birdlife. An authorised cycle-rickshaw or foot birdwatching experience through the park\'s wetlands and woodland allows quiet, unhurried observation of the resident bird colonies and, between October and February, large flocks of migratory waterfowl. The sanctuary is home to over 370 recorded species of birds. Sightings are never guaranteed and depend entirely on season and conditions. Return to Jaipur approximately four hours, with hotel drop on arrival.',
        timeline: [
          {
            sequence: 'Early morning',
            heading: 'Departure from Jaipur',
            description: 'Private road departure from Jaipur heading east toward Bharatpur/Abhaneri. Approximately 4 hours subject to traffic.',
          },
          {
            sequence: 'Morning (en route)',
            heading: 'Chand Baori and Harshat Mata Temple, Abhaneri',
            description: 'One of the finest stepwells in India — 3,500 steps in inverted-pyramid geometry descending approximately 20 metres, carved in the 9th century. The adjacent Harshat Mata Temple is contemporaneous. A rewarding 45-minute stop.',
          },
          {
            sequence: 'Afternoon arrival',
            heading: 'Lunch in Bharatpur',
            description: 'Arrival in Bharatpur. Lunch at a local restaurant.',
          },
          {
            sequence: 'Afternoon',
            heading: 'Keoladeo National Park',
            description: 'Guided birdwatching visit to Keoladeo National Park (UNESCO World Heritage Site). An authorised cycle-rickshaw or foot experience through the wetlands and woodland. The park shelters a rich and diverse resident and migratory birdlife across its wetlands, grassland and woodland. Sightings vary by season; the park is at its richest for migratory waterfowl between October and February. TODO: verify current park entry fees and authorised rickshaw charges.',
          },
          {
            sequence: 'Evening',
            heading: 'Return to Jaipur',
            description: 'Road departure from Bharatpur, approximately 4 hours subject to traffic, hotel drop in Jaipur.',
          },
        ],
        highlights: [
          'Chand Baori stepwell, Abhaneri — 9th century, UNESCO-adjacent heritage',
          'Harshat Mata Temple, Abhaneri',
          'Keoladeo National Park — UNESCO World Heritage wetland birdwatching',
          'Authorised cycle-rickshaw or foot safari through the wetlands',
        ],
        inclusions: [
          'Private air-conditioned vehicle for return Jaipur–Bharatpur–Jaipur journey',
          'Guided visits to Abhaneri and Keoladeo National Park',
          'Relevant monument and park entry fees',
          'Authorised rickshaw or birdwatching guide experience within the park',
          'Arrival lunch in Bharatpur',
        ],
        exclusions: [
          'Gratuities for guide and driver',
          'Personal expenses',
        ],
        planningNotes: [
          'Keoladeo National Park is at its richest for migratory waterfowl between October and February, but resident birdlife is present year-round.',
          'Wildlife sightings are never guaranteed and depend entirely on season and conditions.',
          'Park entry fees and authorised rickshaw charges apply. TODO: verify current Keoladeo entry fees.',
        ],
        responsibleTourism: 'All wildlife is observed from designated paths, from a respectful distance, in accordance with park regulations. No feeding, disturbing or approaching of animals is permitted.',
      },
      {
        id: 'overnight',
        label: 'Overnight',
        origin: 'Jaipur',
        type: 'overnight',
        interests: ['wildlife', 'nature', 'photography', 'heritage'],
        travelTime: 'Approximately 4 hours each way, subject to traffic',
        duration: '2 Days / 1 Night',
        overview: 'The overnight variant allows a far more immersive experience of Keoladeo\'s birdlife — an evening visit as the birds roost, a full night in Bharatpur and a relaxed early morning in the park when birdsong is at its richest and the light is at its most photogenic. The outward journey follows the same route: Jaipur by road, Abhaneri\'s Chand Baori and Harshat Mata Temple en route, arrival at Bharatpur hotel, lunch and rest. The afternoon and sunset hours are spent in Keoladeo National Park on an authorised rickshaw or foot safari. A leisurely hotel dinner follows in the evening. The next morning, an early start for the best birdwatching conditions in the park — the golden-hour light and the activity of feeding birds make this one of the most rewarding natural experiences in North India. After breakfast and checkout, the drive returns to Jaipur, approximately four hours subject to traffic.',
        timeline: [
          {
            sequence: 'Day 1 — Early morning',
            heading: 'Departure from Jaipur',
            description: 'Private road departure from Jaipur heading east. Approximately 4 hours subject to traffic.',
          },
          {
            sequence: 'Day 1 — Morning (en route)',
            heading: 'Chand Baori and Harshat Mata Temple, Abhaneri',
            description: '9th-century stepwell and temple at Abhaneri village — one of the finest heritage stops on this road.',
          },
          {
            sequence: 'Day 1 — Afternoon arrival',
            heading: 'Hotel Arrival, Lunch and Rest',
            description: 'Arrival at Bharatpur hotel. Lunch and time to settle in before the afternoon park visit.',
          },
          {
            sequence: 'Day 1 — Afternoon and Sunset',
            heading: 'Keoladeo National Park — Evening Birdwatching',
            description: 'Guided evening birdwatching in Keoladeo National Park on an authorised rickshaw or foot safari. Keoladeo is particularly atmospheric in the late afternoon as the light softens and the resident birds begin to roost.',
          },
          {
            sequence: 'Day 1 — Evening',
            heading: 'Hotel Dinner and Overnight',
            description: 'Return to hotel for dinner and overnight stay in Bharatpur.',
          },
          {
            sequence: 'Day 2 — Early morning',
            heading: 'Keoladeo National Park — Morning Safari',
            description: 'An early start for the golden-hour birdwatching visit — the most rewarding time in the park, when the light is photogenic, the birds are most active and the pathways are still quiet.',
          },
          {
            sequence: 'Day 2 — Morning',
            heading: 'Breakfast and Checkout',
            description: 'Hotel breakfast and checkout.',
          },
          {
            sequence: 'Day 2 — Late morning',
            heading: 'Return to Jaipur',
            description: 'Road departure from Bharatpur. Approximately 4 hours subject to traffic. Hotel drop in Jaipur.',
          },
        ],
        highlights: [
          'Chand Baori stepwell, Abhaneri — 9th century',
          'Keoladeo National Park — UNESCO World Heritage, evening and golden-hour morning birdwatching',
          'Overnight Bharatpur — relaxed two-session park experience',
          'Authorised cycle-rickshaw or foot safari',
        ],
        inclusions: [
          'Private air-conditioned vehicle for return Jaipur–Bharatpur–Jaipur journey',
          'Guided visits to Abhaneri and Keoladeo National Park (both sessions)',
          'Bharatpur hotel stay with breakfast, lunch and dinner',
          'Relevant monument and park entry fees',
          'Authorised rickshaw or birdwatching guide experience within the park',
        ],
        exclusions: [
          'Gratuities for guide and driver',
          'Personal expenses',
        ],
        planningNotes: [
          'Keoladeo National Park is at its richest for migratory waterfowl between October and February.',
          'Wildlife sightings are never guaranteed.',
          'Hotel category and specific property are confirmed at time of booking.',
          'TODO: verify current Keoladeo entry fees and authorised rickshaw charges.',
        ],
        responsibleTourism: 'All wildlife is observed from designated paths at a respectful distance, following park regulations. No feeding or disturbing of animals is permitted.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Jaipur in a Day from Delhi
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'jaipur-in-a-day',
    title: 'Jaipur in a Day from Delhi',
    summary: 'Amber Fort, the Hawa Mahal, Jantar Mantar, the City Palace and the Pink City\'s bazaars — Rajasthan\'s royal capital in a single well-crafted day from Delhi.',
    image: '/destination/jaipur.jpg',
    featured: true,
    defaultVariant: null,
    variants: [
      {
        id: 'delhi',
        label: 'From Delhi',
        origin: 'Delhi',
        type: 'day-trip',
        interests: ['heritage', 'culture', 'architecture', 'shopping'],
        travelTime: 'Approximately 4 hours each way, subject to traffic',
        duration: '1 Day',
        overview: 'An early road departure from Delhi at approximately 05:00 — the only way to make meaningful use of a single day in Jaipur is to arrive before the main visitor rush. The drive takes approximately four hours, subject to traffic on the Delhi–Jaipur expressway. The day opens at Amber Fort and Palace — the magnificent hilltop citadel of the Kachhawaha dynasty rising above Maota Lake, with its Diwan-i-Aam, Sheesh Mahal (Hall of Mirrors) and sweeping views across the Aravalli foothills. Ascent to the fort is by private jeep or on foot; in keeping with the responsible-tourism commitment of Indian Routes and Trails, elephant rides are not offered or encouraged. A short photo stop at Jal Mahal — the lake palace that appears to float on Man Sagar reservoir — precedes a visit to a hand-block-printing artisan workshop, where guests can experience the traditional Rajasthani craft directly. Lunch at a local Jaipur restaurant, then an afternoon circuit of the old walled city: Hawa Mahal, the five-storied Palace of Winds; Jantar Mantar, Sawai Jai Singh\'s 18th-century royal astronomical observatory with its extraordinary masonry instruments (UNESCO); and the City Palace complex. Time permitting, a visit to a Jaipur jewellery or artisan workshop. An optional astrology consultation can be arranged at the City Palace area if specifically requested. Return road journey to Delhi, approximately 4.5 hours subject to traffic.',
        timeline: [
          {
            sequence: 'Early morning (approximately 05:00)',
            heading: 'Departure from Delhi',
            description: 'Private road departure from Delhi. Approximately 4 hours to Jaipur, subject to traffic.',
          },
          {
            sequence: 'Morning',
            heading: 'Amber Fort and Palace',
            description: 'Guided visit to Amber Fort and Palace — the hilltop citadel of the Kachhawaha Rajput dynasty, perched above Maota Lake. Explore the Diwan-i-Aam, Ganesh Pol, Sheesh Mahal and royal apartments. Ascent by private jeep or on foot. Elephant rides are not offered or encouraged.',
          },
          {
            sequence: 'Late morning',
            heading: 'Jal Mahal and Block Printing Workshop',
            description: 'A photo stop at Jal Mahal — the 18th-century lake palace on Man Sagar reservoir — then a visit to a hand-block-printing artisan workshop for a hands-on encounter with a traditional Rajasthani craft.',
          },
          {
            sequence: 'Afternoon',
            heading: 'Lunch and Old City Tour',
            description: 'Lunch at a recommended local Jaipur restaurant. Afternoon: Hawa Mahal (five-storied Palace of Winds, exterior and courtyard), Jantar Mantar (UNESCO royal astronomical observatory, 1720s), City Palace (royal residence, Diwan-i-Khas, museum courtyards). Time permitting: Jaipur jewellery or artisan workshop visit.',
          },
          {
            sequence: 'Late afternoon',
            heading: 'Bazaars',
            description: 'Time in the Pink City\'s bazaars — Johari Bazaar for jewellery and gemstones, Bapu Bazaar for block-print textiles and Rajasthani footwear, and the lanes around Hawa Mahal for blue pottery and miniature paintings.',
          },
          {
            sequence: 'Evening',
            heading: 'Return to Delhi',
            description: 'Road departure from Jaipur. Approximately 4.5 hours to Delhi, subject to traffic. Hotel drop in Delhi.',
          },
        ],
        highlights: [
          'Amber Fort and Palace — Kachhawaha dynasty hilltop citadel',
          'Jal Mahal — lake palace on Man Sagar reservoir (photo stop)',
          'Hand-block-printing artisan workshop visit',
          'Hawa Mahal — the five-storied Palace of Winds',
          'Jantar Mantar — UNESCO royal astronomical observatory',
          'City Palace — royal residence and museum complex',
          'Pink City bazaars — jewellery, textiles, blue pottery',
        ],
        inclusions: [
          'Private air-conditioned return vehicle Delhi–Jaipur–Delhi',
          'Monument entry fees (Amber Fort, Hawa Mahal, Jantar Mantar, City Palace)',
          'Local Jaipur lunch',
          'Guided city visits throughout the day',
        ],
        exclusions: [
          'Gratuities for guide and driver',
          'Personal expenses',
          'Meals not mentioned in inclusions',
        ],
        planningNotes: [
          'Elephant rides are not offered or recommended, in keeping with the responsible-tourism principles of Indian Routes and Trails.',
          'Jaipur monument entry fees vary for Indian and international visitors. TODO: verify current entry fees.',
          'An astrology consultation at City Palace can be arranged on specific request only.',
          'Road travel time is approximately 4–4.5 hours each way, subject to traffic. Early departure is essential.',
        ],
        responsibleTourism: 'Amber Fort ascent is by private jeep or on foot. Elephant rides are not offered or encouraged by Indian Routes and Trails.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Pushkar & Bagru Block Printing
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'pushkar-bagru-block-printing',
    title: 'Pushkar & Bagru Block Printing',
    summary: 'A day from Jaipur combining a hands-on block-printing workshop in a traditional craftsperson\'s village with the sacred lake, ghats and temples of Pushkar.',
    image: '/destination/pushkar.jpg',
    featured: false,
    defaultVariant: null,
    variants: [
      {
        id: 'jaipur',
        label: 'From Jaipur',
        origin: 'Jaipur',
        type: 'day-trip',
        interests: ['culture', 'spiritual', 'rural', 'artisan'],
        travelTime: 'Approximately 1 hour to Bagru; approximately 1.5 hours Bagru to Pushkar; approximately 1.5 hours Pushkar to Jaipur',
        duration: '1 Day',
        overview: 'Departure from Jaipur at approximately 09:00 heading west. The first stop is Bagru village, home to the Chhipa community — one of the oldest and most respected hand-block-printing traditions in Rajasthan. A two-hour hands-on workshop introduces guests to the complete process: natural and traditional dyes, the hand-carved wooden blocks, resist and direct printing techniques, and the distinctive Bagru aesthetic that has been passed down through generations of master craftspeople. Each guest makes their own print using chosen blocks and colour combinations, taking home a souvenir of the craft. Continue to Pushkar — one of the holiest towns in Hindu tradition, built around the sacred Pushkar Lake, which is believed to have appeared where petals fell from the divine hand of Lord Brahma. The town is home to one of the very few temples in the world dedicated to Brahma the Creator. A guided walking tour of the sacred ghats and the Brahma Temple precedes free time to explore Pushkar\'s vibrant bazaar lanes — incense, silver jewellery, fabrics and spice stalls. Lunch is self-paid at one of Pushkar\'s many lakeside cafés or restaurants (excluded from the package). The evening option of watching the sunset from Pushkar Lake, or the Savitri Temple hilltop accessed by ropeway or stairs subject to operation and physical ability, brings a contemplative close to the day. Return to Jaipur.',
        timeline: [
          {
            sequence: 'Morning (approximately 09:00)',
            heading: 'Departure from Jaipur',
            description: 'Private road departure from Jaipur west toward Bagru village. Approximately 45 minutes to 1 hour.',
          },
          {
            sequence: 'Late morning (approximately 2 hours)',
            heading: 'Bagru Village — Hand-Block-Printing Workshop',
            description: 'Guided visit to the Chhipa community workshop in Bagru. Introduction to the complete block-printing process: preparation of natural and traditional dyes, selection of hand-carved wooden blocks, resist and direct printing on cotton fabric. A approximately two-hour hands-on session — each guest creates their own print using chosen blocks and colours.',
          },
          {
            sequence: 'Afternoon arrival',
            heading: 'Drive to Pushkar and Arrival',
            description: 'Approximately 1.5-hour drive from Bagru to Pushkar. Arrival and time to settle at a Pushkar café or restaurant for a self-paid lunch.',
          },
          {
            sequence: 'Afternoon',
            heading: 'Sacred Ghats and Brahma Temple',
            description: 'Guided exploration of Pushkar\'s 52 sacred ghats around Pushkar Lake, with context on the mythology of the lake and the significance of this pilgrimage site. Visit to the Brahma Temple — one of the very few temples in the world dedicated to Brahma the Creator. Respectful walking tour: visitors should dress modestly, remove shoes at temple thresholds and follow clockwise circumambulation customs.',
          },
          {
            sequence: 'Afternoon',
            heading: 'Pushkar Bazaar',
            description: 'Free time in Pushkar\'s bazaar lanes — silver jewellery, incense, printed textiles, spices and Rajasthani craft items.',
          },
          {
            sequence: 'Evening',
            heading: 'Sunset by Pushkar Lake or Savitri Temple',
            description: 'Sunset by Pushkar Lake — one of the most peaceful and atmospheric experiences in Rajasthan. Optional: Savitri Temple hilltop, accessed by ropeway or stairs, for a panoramic view across the desert plains at dusk. Ropeway operation and accessibility subject to current conditions. TODO: verify Savitri Temple ropeway current operating status.',
          },
          {
            sequence: 'Evening',
            heading: 'Return to Jaipur',
            description: 'Private road departure from Pushkar. Approximately 1.5 hours to Jaipur, with hotel drop.',
          },
        ],
        highlights: [
          'Bagru Chhipa community — hands-on block-printing workshop',
          'Create your own hand-block print to take home',
          'Pushkar Lake — one of the holiest sites in Hindu tradition',
          'Brahma Temple — one of the world\'s few Brahma-dedicated temples',
          'Pushkar bazaar — silver, textiles, spices',
          'Optional: sunset from Savitri Temple hilltop',
        ],
        inclusions: [
          'Private air-conditioned return vehicle Jaipur–Bagru–Pushkar–Jaipur',
          'Guided Bagru village visit and hands-on block-printing workshop',
          'Hand-block-printing experience with take-home printed souvenir',
          'Guided walking tour of Pushkar ghats and Brahma Temple',
        ],
        exclusions: [
          'Meals (lunch and all meals are self-paid at Pushkar restaurants)',
          'Gratuities for guide and driver',
          'Unmentioned activities',
        ],
        planningNotes: [
          'Pushkar is a sacred Hindu pilgrimage town; visitors should dress modestly, avoid bringing leather goods to the ghats and follow respectful customs at all temples.',
          'Savitri Temple ropeway operation is subject to weather and maintenance conditions. TODO: verify current operating status.',
          'The Pushkar Camel Fair takes place in November each year — if visiting during the fair, advance arrangements are strongly recommended as accommodation and roads are very busy.',
        ],
        responsibleTourism: 'The block-printing workshop directly supports the Chhipa artisan community and their traditional livelihood. This is an authentic craft encounter, not a staged demonstration.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Ranthambore Tiger Safari
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'ranthambore-tiger-safari',
    title: 'Ranthambore Tiger Safari',
    summary: 'An overnight from Jaipur into one of India\'s premier wildlife reserves — jeep safaris, the 10th-century Ranthambore Fort and the forests of the Aravalli foothills.',
    image: '/destination/ranthambore.jpg',
    featured: false,
    defaultVariant: null,
    variants: [
      {
        id: 'jaipur',
        label: 'From Jaipur',
        origin: 'Jaipur',
        type: 'overnight',
        interests: ['wildlife', 'nature', 'heritage', 'photography'],
        travelTime: 'Approximately 3 hours each way, subject to traffic',
        duration: '2 Days / 1 Night',
        overview: 'Ranthambore National Park — formerly the private hunting grounds of the Maharajas of Jaipur, now one of India\'s best-known wildlife reserves and a major conservation success story for the Royal Bengal Tiger. Set among the rocky terrain and ancient ruins of the Aravalli foothills, Ranthambore is unusually photogenic for an Indian tiger reserve — its open grassland, crumbling ruins and lakeside settings give sightings a dramatic backdrop that few other parks can match. The two-day, one-night trip begins with a morning road departure from Jaipur after breakfast, arriving in time for hotel check-in and lunch. An evening authorized shared-canter vehicle safari through the park follows. The next morning brings an early start for the golden-hour safari — the most productive time for wildlife observations. A visit to the extraordinary 10th-century Ranthambore Fort and the Ganesh Temple within the park precedes a return to the hotel for breakfast, checkout and the drive back to Jaipur. A tiger sighting is never guaranteed and depends entirely on the animal\'s natural movements and choices. The experience of the park — its landscape, its birds, its deer, its ancient ruins and its atmosphere — is rewarding independent of any single sighting. All wildlife is observed at a distance, from designated vehicles, in full compliance with park regulations.',
        timeline: [
          {
            sequence: 'Day 1 — Morning (after breakfast)',
            heading: 'Departure from Jaipur',
            description: 'Private road departure from Jaipur after breakfast. Approximately 3-hour drive to Ranthambore, subject to traffic.',
          },
          {
            sequence: 'Day 1 — Afternoon',
            heading: 'Hotel Check-in and Lunch',
            description: 'Arrival at Ranthambore hotel, check-in and lunch.',
          },
          {
            sequence: 'Day 1 — Afternoon/Evening',
            heading: 'Evening Safari — Ranthambore National Park',
            description: 'Authorized shared-canter vehicle safari through Ranthambore National Park. The park\'s woodland, grassland, lakes and ancient ruins provide a dramatic setting for wildlife viewing. Resident wildlife includes Royal Bengal Tiger, leopard, sloth bear, hyena, jackal, sambar deer, chital, nilgai, marsh crocodile and a rich diversity of birds. A tiger sighting is never guaranteed.',
          },
          {
            sequence: 'Day 1 — Evening',
            heading: 'Return to Hotel and Dinner',
            description: 'Return to hotel. Rajasthani dinner. TODO: confirm whether dinner is included in the package — the narrative references it but it is not in the standard inclusions list. Confirm with operations team before publishing.',
          },
          {
            sequence: 'Day 1 — Night',
            heading: 'Overnight at Ranthambore',
            description: 'Overnight in Ranthambore hotel.',
          },
          {
            sequence: 'Day 2 — Early morning',
            heading: 'Morning Safari — Ranthambore National Park',
            description: 'Early start for the golden-hour morning safari — the most productive time for wildlife, when the animals are active in the cool morning air and the photographic light is at its best.',
          },
          {
            sequence: 'Day 2 — Late morning',
            heading: 'Ranthambore Fort and Ganesh Temple',
            description: 'Visit to the 10th-century Ranthambore Fort — an ancient hilltop citadel whose ruins rise dramatically from the forested hillside within the park boundary. The Ganesh Temple within the fort is an active pilgrimage site. Subject to current park/route access regulations. TODO: verify current access route to Ranthambore Fort and Ganesh Temple within park.',
          },
          {
            sequence: 'Day 2 — Morning',
            heading: 'Breakfast, Checkout and Return to Jaipur',
            description: 'Hotel breakfast and checkout. Approximately 3-hour road journey back to Jaipur, with hotel drop.',
          },
        ],
        highlights: [
          'Authorized shared-canter vehicle safaris — morning and evening',
          'Ranthambore National Park — Royal Bengal Tiger habitat',
          '10th-century Ranthambore Fort within the park',
          'Ganesh Temple within the fort (active pilgrimage site)',
          'Rich non-predator wildlife: leopard, sloth bear, deer, marsh crocodile, birds',
        ],
        inclusions: [
          'Private air-conditioned vehicle Jaipur–Ranthambore–Jaipur',
          'Guided park safaris (authorized shared-canter vehicle for both sessions)',
          'Ranthambore hotel stay with bed and breakfast and lunch',
        ],
        exclusions: [
          'Guide and driver gratuities',
          'Personal expenses',
          'Meals not mentioned in inclusions',
        ],
        planningNotes: [
          'A tiger sighting is never guaranteed. The park experience is rewarding regardless of specific sightings.',
          'Ranthambore National Park safaris operate on authorised shared-canter vehicles. Private jeep options are available at additional cost — enquire at time of booking.',
          'The park has a limited number of daily safari permits; advance booking is strongly recommended, especially October–February.',
          'TODO: confirm whether dinner is included — operations team to verify before publishing.',
          'TODO: verify current access to Ranthambore Fort and Ganesh Temple from within the park.',
          'Park is closed for a period in June/July for the monsoon — verify current seasonal calendar.',
        ],
        responsibleTourism: 'All wildlife is observed at a distance, from authorized vehicles only, in compliance with Ranthambore National Park regulations. No feeding, baiting or disturbing of animals. No off-road driving.',
      },
    ],
  },
];

/** Returns a trip by slug */
export const getShortTripBySlug = (slug) => shortTrips.find((t) => t.slug === slug);

/** Returns a specific variant by trip slug and variant id */
export const getVariant = (slug, variantId) => {
  const trip = getShortTripBySlug(slug);
  if (!trip) return null;
  return trip.variants.find((v) => v.id === variantId) ?? trip.variants[0];
};

/**
 * Returns flat list of {value, label} options for all canonical short trips + variants.
 * value format: "slug__variantId"  (double underscore separator)
 * label: "Trip Title — Variant Label" or just "Trip Title" if single variant.
 */
export const getShortTripSelectOptions = () => {
  const options = [];
  shortTrips.forEach((trip) => {
    if (trip.variants.length === 1) {
      options.push({
        value: `${trip.slug}__${trip.variants[0].id}`,
        label: `${trip.title} — ${trip.variants[0].label}`,
        tripTitle: trip.title,
        variantLabel: trip.variants[0].label,
      });
    } else {
      trip.variants.forEach((v) => {
        options.push({
          value: `${trip.slug}__${v.id}`,
          label: `${trip.title} — ${v.label}`,
          tripTitle: trip.title,
          variantLabel: v.label,
        });
      });
    }
  });
  return options;
};

/**
 * Parses a "slug__variantId" value string back to { slug, variantId, displayLabel }.
 * Returns null for any invalid/malformed value.
 */
export const parseShortTripValue = (value) => {
  if (!value || typeof value !== 'string') return null;
  const sep = value.lastIndexOf('__');
  if (sep === -1) return null;
  const slug      = value.slice(0, sep);
  const variantId = value.slice(sep + 2);
  const trip = getShortTripBySlug(slug);
  if (!trip) return null;
  const v = trip.variants.find((x) => x.id === variantId);
  if (!v) return null;
  return { slug, variantId, tripTitle: trip.title, variantLabel: v.label, displayLabel: `${trip.title} — ${v.label}` };
};
