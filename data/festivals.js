/**
 * Festival Calendar data for Indian Routes & Trails
 *
 * DATES POLICY:
 * - Only confirmed, verified dates are stored.
 * - Lunar/Hindu-calendar festivals change annually. Do NOT store one year's
 *   date as a recurring fixed Gregorian date.
 * - Festivals marked TODO require date verification from official/Hindu
 *   calendar sources before publishing.
 * - Fixed solar festivals (Baisakhi ~13 Apr, Pongal ~14 Jan, Makar Sankranti
 *   14 Jan) are based on the solar calendar and are stable.
 * - Dates field may be empty [] for newly added festivals until verified.
 *   The UI renders "Date to be confirmed" when dates is empty or all past.
 *
 * REGION FIELD:
 *   "north"     — primarily a North India festival
 *   "south"     — primarily a South India festival
 *   "pan-india" — celebrated nationwide (appears under both filters)
 *
 * Dev Deepawali was removed from this dataset per product decision.
 * The redirect /festivals/dev-deepawali → /festivals is handled in next.config.js.
 *
 * @typedef {Object} FestivalDate
 * @property {number} year
 * @property {string} start  - ISO 8601 YYYY-MM-DD
 * @property {string} end    - ISO 8601 YYYY-MM-DD
 * @property {string} [note]
 *
 * @typedef {Object} Festival
 * @property {string}   slug
 * @property {string}   region     — "north" | "south" | "pan-india"
 * @property {{en: string, es: string}} name
 * @property {{en: string, es: string}} tagline
 * @property {{en: string, es: string}} description
 * @property {string[]} regions    — display locations
 * @property {string}   heroImage
 * @property {string}   cardImage
 * @property {string}   imageStatus — "verified" | "placeholder"
 * @property {FestivalDate[]} dates
 */

const PLACEHOLDER = '/destination/jaipur.jpg';

/** @type {Festival[]} */
export const festivals = [

  // ─── RETAINED FESTIVALS ──────────────────────────────────────────

  {
    slug: 'diwali',
    region: 'pan-india',
    name: { en: 'Diwali', es: 'Diwali' },
    tagline: {
      en: 'The Festival of Lights — India Ablaze with Diyas and Fireworks',
      es: 'El Festival de las Luces — India Iluminada por Lámparas y Fuegos Artificiales',
    },
    description: {
      en: 'Diwali — the Festival of Lights — is India\'s most celebrated national holiday, marking the triumph of light over darkness and knowledge over ignorance. Traditionally celebrated over five days in October or November, the five-day sequence begins with Dhanteras (associated with prosperity and wealth), followed by Naraka Chaturdashi (Choti Diwali), the main night of Lakshmi Puja when homes are illuminated with thousands of oil lamps (diyas), then Goverdhan Puja, and finally Bhai Dooj celebrating the bond between brothers and sisters. In Jaipur and Udaipur, palaces are illuminated and the City Palace of Udaipur organises spectacular celebrations on the lake. In Varanasi, the ghats are lined with thousands of diyas. Diwali is also the new year for many Hindu communities and a major time for family gatherings, sweets and the exchange of gifts. If you want to experience India not only as a country of monuments but as a living culture, Diwali is a wonderful time to visit — homes, temples, markets, hotels, monuments and historic neighbourhoods are all illuminated. Jaipur, Varanasi, Ayodhya, Udaipur, Jodhpur and Delhi are particularly interesting destinations during the festival period.',
      es: 'Diwali —el Festival de las Luces— es la fiesta nacional más celebrada de India, que marca el triunfo de la luz sobre la oscuridad. Durante cinco días en octubre o noviembre, las ciudades se iluminan con lámparas de aceite (diyas), velas y fuegos artificiales. En Jaipur y Udaipur, los palacios se iluminan de forma espectacular; en Varanasi, los ghats se cubren de miles de diyas. Diwali es también el año nuevo para muchas comunidades hindúes.',
    },
    regions: ['Jaipur', 'Udaipur', 'Varanasi', 'Pan-India'],
    heroImage: '/festivals/north/diwali.jpg',
    cardImage: '/festivals/north/diwali.jpg',
    imageStatus: 'verified',
    dates: [
      {
        year: 2026,
        start: '2026-11-08',
        end: '2026-11-08',
        note: 'Main Diwali night — Lakshmi Puja. Celebrations span 5 days (Dhanteras to Bhai Dooj).',
      },
      // TODO: Diwali 2027 — verify from a reliable Hindu calendar source before publishing.
    ],
  },

  {
    slug: 'holi',
    region: 'pan-india',
    name: { en: 'Holi', es: 'Holi' },
    tagline: {
      en: 'The Festival of Colours — Spring Erupts Across India',
      es: 'El Festival de los Colores — La Primavera Estalla por Toda India',
    },
    description: {
      en: 'Holi marks the arrival of spring and the victory of good over evil — and no festival in India is more viscerally joyful. The celebration has two major stages: Holika Dahan, a sacred bonfire on the preceding evening connected with the story of Prahlada and the victory of devotion over arrogance; and Rangwali Holi (Dhulandi), the day of colours when people throw coloured powder and water at one another, dance, sing and share food. On Holi morning, people take to the streets to throw powdered pigment and water at each other, turning every neighbourhood into a kaleidoscope of red, blue, yellow and green. The celebrations are particularly exuberant in Jaipur, where the royal family traditionally plays Holi from the balconies of the City Palace. In the Mathura and Vrindavan region, the festival begins a full week in advance with flower Holi and lath mar Holi (women beating men with sticks) — some of India\'s most spectacular and ancient celebrations. In the Braj region around Mathura and Vrindavan, the festival has a deep connection with the childhood stories of Lord Krishna and Radha. The festival is particularly spectacular in North India, especially Mathura, Vrindavan, Barsana, Nandgaon, Jaipur, Delhi, Agra and parts of Rajasthan and Uttar Pradesh.',
      es: 'Holi celebra la llegada de la primavera y el triunfo del bien sobre el mal. En la mañana de Holi, la gente llena las calles lanzando polvos de colores y agua. En Jaipur, la familia real celebra Holi desde los balcones del City Palace. En Mathura y Vrindavan, el festival comienza una semana antes con el Lath Mar Holi, una de las celebraciones más antiguas y espectaculares de India.',
    },
    regions: ['Jaipur', 'Mathura / Vrindavan', 'Pan-India'],
    heroImage: '/festivals/north/holi.jpg',
    cardImage: '/festivals/north/holi.jpg',
    imageStatus: 'verified',
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
    region: 'north',
    name: { en: 'Pushkar Camel Fair', es: 'Feria del Camello de Pushkar' },
    tagline: {
      en: 'The World\'s Largest Camel Fair — Five Days of Desert Spectacle',
      es: 'La Feria de Camellos más Grande del Mundo — Cinco Días de Espectáculo Desértico',
    },
    description: {
      en: 'The Pushkar Camel Fair is one of the world\'s largest livestock fairs and one of India\'s most extraordinary spectacles — a confluence of some 50,000 camels, horses and cattle that draws traders, pilgrims and photographers from across the globe. The fair takes place on the dunes outside Pushkar each November, building to its climax on Kartik Purnima (the full moon of Kartik), when pilgrims descend on the sacred Pushkar Lake for a ritual bath. The fair is a unique combination of religious pilgrimage, livestock trading, rural Rajasthan, folk culture and tourism. On one side: camels, horses and cattle brought from rural Rajasthan — decorated, bought and sold, with traditional competitions and cultural programmes. On the other side: the sacred Pushkar Lake, where Hindu pilgrims come to bathe and perform religious ceremonies. Beyond the trading, the fair is a festival of folk music, acrobatics, turban-tying competitions and camel races — a riot of colour, noise and activity against the backdrop of the desert at dusk. For foreign tourists, Pushkar offers a remarkable opportunity to experience the traditional world of Rajasthan — camels, horses, cattle, colourful costumes, folk music, desert landscapes and Hindu pilgrimage all in one place.',
      es: 'La Feria del Camello de Pushkar es una de las ferias ganaderas más grandes del mundo. Cada noviembre, unos 50,000 camellos, caballos y ganado llenan las dunas de Pushkar. La feria alcanza su clímax en Kartik Purnima, cuando los peregrinos se bañan en el lago sagrado. También hay música folclórica, acrobacias y carreras de camellos.',
    },
    regions: ['Pushkar', 'Rajasthan'],
    heroImage: '/festivals/north/pushkar_camel_fair.jpg',
    cardImage: '/festivals/north/pushkar_camel_fair.jpg',
    imageStatus: 'verified',
    dates: [
      {
        year: 2026,
        start: '2026-11-17',
        end: '2026-11-25',
        note: 'Peak date: Kartik Purnima (full moon) on 24 November 2026.',
      },
      // TODO: Pushkar Camel Fair 2027 dates — verify against Rajasthan Tourism calendar before publishing.
    ],
  },

  {
    slug: 'makar-sankranti-kite-festival',
    region: 'north',
    name: { en: 'Makar Sankranti — International Kite Festival', es: 'Makar Sankranti — Festival Internacional de Cometas' },
    tagline: {
      en: 'The Sky Above Jaipur Fills with 10,000 Kites',
      es: 'El Cielo sobre Jaipur se Llena de 10,000 Cometas',
    },
    description: {
      en: 'Makar Sankranti is one of the most important solar festivals of India, celebrated when the Sun enters Makara (Capricorn), marking Uttarayana — the traditional period associated with the Sun\'s northward journey. Unlike many Hindu festivals that follow the lunar calendar, Makar Sankranti is based on the solar calendar, which is why it generally falls around 14 January every year (occasionally 15 January depending on astronomical timing). The festival is dedicated particularly to Surya, the Sun God. People visit sacred rivers and traditionally take a holy bath, offer water to the Sun and pray for prosperity and well-being. In Jaipur, Rajasthan celebrates with the International Kite Festival: rooftops across the entire city become launching pads for kite-fighters, and the sky above the Pink City is thick with paper kites of every colour from dawn until dark. The sound of string-cutting and the sight of hundreds of defeated kites spiralling down is a spectacle that belongs entirely to Jaipur on this one day. Kite flying is particularly spectacular in Gujarat and Rajasthan. The festival is also considered an auspicious time for charity and acts of generosity.',
      es: 'Makar Sankranti marca la transición del sol hacia Capricornio. En Jaipur, Rajasthan celebra con el Festival Internacional de Cometas: las azoteas de toda la ciudad se convierten en plataformas de lanzamiento, y el cielo sobre la Ciudad Rosa se llena de cometas de papel de todos los colores desde el amanecer hasta el anochecer.',
    },
    regions: ['Jaipur', 'Gujarat', 'Pan-India'],
    heroImage: '/festivals/north/makar sankranti.jpg',
    cardImage: '/festivals/north/makar sankranti.jpg',
    imageStatus: 'verified',
    dates: [
      {
        year: 2026,
        start: '2026-01-14',
        end: '2026-01-14',
        note: 'Fixed solar calendar date — 14 January annually (occasionally 15 January depending on astronomical timing). TODO: confirm Jaipur Kite Festival programme dates with Rajasthan Tourism.',
      },
      {
        year: 2027,
        start: '2027-01-14',
        end: '2027-01-14',
        note: 'Fixed solar calendar — 14 January 2027. TODO: confirm Jaipur Kite Festival programme dates with Rajasthan Tourism.',
      },
    ],
  },

  // ─── NEW NORTH INDIA FESTIVALS ────────────────────────────────────

  {
    slug: 'dussehra',
    region: 'north',
    name: { en: 'Dussehra', es: 'Dussehra' },
    tagline: {
      en: 'The Triumph of Dharma — Ravan Dahan Across the Land',
      es: 'El Triunfo del Dharma — Ravan Dahan en toda la India',
    },
    description: {
      en: 'Vijayadashmi — Dussehra — is one of the most important Hindu festivals of India, falling on the 10th lunar day (Dashami) of the bright fortnight of Ashwin, usually in September or October. It marks the culmination of the Navratri festival and, in many traditions, represents the triumph of righteousness (dharma) over evil (adharma). In much of North India, Dussehra is associated with the story of the Ramayana: Lord Rama fought the demon king Ravana of Lanka after Ravana abducted Sita. With the help of his brother Lakshmana, Hanuman and the vanara army, Rama ultimately defeated Ravana. The victory of Rama is traditionally understood as the triumph of dharma over adharma. The most recognisable North Indian Dussehra tradition is Ravan Dahan — huge effigies of Ravana, Meghnada and Kumbhakarna are erected in open grounds and ceremonially set on fire at dusk, the burning symbolising the destruction of evil and the victory of righteousness. Kota Dussehra in Rajasthan is particularly famous, with its tradition dating back to the 18th century. Kullu Dussehra in Himachal Pradesh is very different from the typical Ravan Dahan: the festival begins in Vijayadashmi and continues for about a week, with the principal deity Lord Raghunath brought in a grand procession to Dhalpur Maidan, accompanied by numerous village deities carried in decorated palanquins. Mysuru Dussehra is a magnificent 10-day royal celebration, its Jumbo Savari procession of decorated elephants being one of South India\'s most spectacular sights. One of the most important cultural traditions associated with North Indian Dussehra is Ramlila — theatrical enactments of the Ramayana — bringing the epic to life for audiences across the region.',
      es: 'Dussehra marca el triunfo del bien sobre el mal en la tradición hindú, culminando los nueve días de Navratri. En el norte de India, se celebra con el Ravan Dahan — enormes efigies de Ravana son quemadas al atardecer. En Kullu y Kota, las celebraciones tienen características regionales únicas.',
    },
    regions: ['North India', 'Kota', 'Kullu', 'Mysuru', 'Pan-India'],
    heroImage: '/festivals/north/dussehra.jpg',
    cardImage: '/festivals/north/dussehra.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Dussehra falls on Dashami of Ashwin Shukla Paksha (Sep–Oct).
      // Verify exact 2026 and 2027 dates from a reliable Hindu calendar source before publishing.
    ],
  },

  {
    slug: 'janmashtami',
    region: 'north',
    name: { en: 'Janmashtami', es: 'Janmashtami' },
    tagline: {
      en: 'The Birth of Lord Krishna — Midnight Celebrations Across India',
      es: 'El Nacimiento del Señor Krishna — Celebraciones de Medianoche',
    },
    description: {
      en: 'Janmashtami — also known as Krishna Janmashtami — is a Hindu festival celebrating the birth of Lord Krishna, one of the most widely worshipped deities in Hinduism. It is observed on the Ashtami (eighth lunar day) of the dark fortnight (Krishna Paksha) of the month of Bhadrapada, usually in August or September. According to Hindu tradition, Krishna was born at midnight in Mathura to Devaki and Vasudeva, and was later raised in Gokul by Nanda and Yashoda. Devotees fast during the day and stay awake until midnight, when temples celebrate Krishna\'s birth with prayers, music, lamps and the ritual bathing and rocking of an image of the baby Krishna. Mathura, Vrindavan and Gokul are particularly important during the festival because they are associated with different stages of Krishna\'s early life — visiting these places at Janmashtami is one of the most atmospherically powerful experiences in North India. In other parts of India, especially Maharashtra, the festival is also celebrated through the lively Dahi Handi tradition. Devotees may: fast during the day; visit Krishna temples; sing bhajans and kirtans; recite passages from the Bhagavad Gita and Bhagavata Purana; decorate temples and homes; prepare special sweets and food offerings; perform Rass Leela; keep a vigil until midnight; bathe and dress an image of infant Krishna; place Krishna in a decorative cradle.',
      es: 'Janmashtami celebra el nacimiento del Señor Krishna. Los devotos ayunan durante el día y se quedan despiertos hasta la medianoche para celebrar el nacimiento con oraciones, música y el ritual de bañar la imagen del bebé Krishna. Mathura, Vrindavan y Gokul son los centros de celebración más importantes.',
    },
    regions: ['Mathura', 'Vrindavan', 'Gokul', 'North India'],
    heroImage: '/festivals/north/janmasthami.jpg',
    cardImage: '/festivals/north/janmasthami.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Janmashtami falls on Ashtami of Bhadrapada Krishna Paksha (Aug–Sep).
      // Verify exact 2026 and 2027 dates from a reliable Hindu calendar source before publishing.
    ],
  },

  {
    slug: 'gangaur',
    region: 'north',
    name: { en: 'Gangaur', es: 'Gangaur' },
    tagline: {
      en: 'The Festival of Goddess Parvati — Rajasthan\'s Living Heritage',
      es: 'El Festival de la Diosa Parvati — El Patrimonio Vivo de Rajasthan',
    },
    description: {
      en: 'Gangaur — the Festival of Gauri (Parvati) — is one of the most important and beautiful festivals of Rajasthan, particularly associated with Jaipur, Udaipur, Jodhpur, Bikaner and other parts of the state. The word Gangaur is traditionally understood as a combination of "Gan," referring to Shiva, and "Gaur" or "Gauri," referring to Parvati. The festival is celebrated in the month of Chaitra, beginning soon after Holi and continuing for approximately 18 days, culminating on Chaitra Shukla Tritiya, usually in March or April. It is dedicated to Goddess Gauri (Parvati), the consort of Lord Shiva, and is particularly important for women. They worship beautifully decorated images of Gauri and Shiva, sing traditional songs, wear their finest Rajasthani clothes and jewellery, and pray for family happiness and marital well-being. The growing wheat shoots used during the festival symbolise fertility and prosperity. The final days bring colourful processions through the historic cities of Rajasthan. In Jaipur: a traditional procession carries an image of Teej Mata (Goddess Parvati) seated on a silver palanquin through the historic streets of the Pink City, with decorated elephants, camels and horses, traditional musicians, folk dancers, local tribe performers, men and women in traditional Rajasthani costumes and the city\'s famous musical bands. In Udaipur, Gangaur becomes a wonderful meeting point between religion, women\'s culture, folk art and the royal heritage of Rajasthan. For a visitor, it is a chance to experience Rajasthan not as a museum, but as a living culture.',
      es: 'Gangaur es uno de los festivales más importantes y bellos de Rajasthan, dedicado a la Diosa Gauri (Parvati). Dura aproximadamente 18 días desde Holi hasta Chaitra Shukla Tritiya. Las mujeres adoran imágenes decoradas de Gauri y Shiva, visten sus mejores ropas rajasthanesas y rezan por la felicidad familiar. Las procesiones coloridas por las ciudades históricas de Rajasthan son su culminación.',
    },
    regions: ['Jaipur', 'Udaipur', 'Jodhpur', 'Rajasthan'],
    heroImage: '/festivals/north/gangaur.jpg',
    cardImage: '/festivals/north/gangaur.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Gangaur culminates on Chaitra Shukla Tritiya (Mar–Apr).
      // Verify exact 2026 and 2027 dates from a reliable Hindu calendar source before publishing.
    ],
  },

  {
    slug: 'maha-shivratri',
    region: 'north',
    name: { en: 'Maha Shivratri', es: 'Maha Shivratri' },
    tagline: {
      en: 'The Great Night of Shiva — Night-Long Devotion at India\'s Holiest Temples',
      es: 'La Gran Noche de Shiva — Devoción Nocturna en los Templos más Sagrados de India',
    },
    description: {
      en: 'Mahashivratri — literally "the Great Night of Shiva" — is one of the most important festivals dedicated to Lord Shiva. It is observed on the 14th day of the dark fortnight (Krishna Paksha Chaturdashi) of the Hindu month of Phalguna, usually in February or March. Unlike many Hindu festivals that are celebrated mainly during the daytime, Mahashivaratri is especially associated with night-long worship, meditation, fasting and devotion. Shiva is one of the principal deities of Hinduism and traditionally associated with the cosmic cycle of creation, preservation and dissolution. The central object of worship is often the Shiva Lingam. Devotees perform Abhisheka — the ritual bathing of the lingam using water, milk, yogurt, honey, ghee and sugar. They may also offer Bilva (Bael) leaves, lamps, flowers, incense and fruits, and chant "Om Namah Shivaya" while remaining awake through the night in prayer and meditation. One important tradition connects the festival with the divine union of Shiva and Parvati. Mahashivaratri is particularly important at India\'s great Shiva temples and pilgrimage centres including: Kashi Vishwanath (Varanasi); Mahakaleshwar (Ujjain); Somnath (Gujarat); Kedarnath (Uttarakhand); Rameshwaram (Tamil Nadu); Baidyanath (Jharkhand); Trimbakeshwar (Maharashtra); Omkareshwar (Madhya Pradesh); and others. Shiva represents many things at once: the great yogi, the ascetic, the householder, the destroyer of obstacles and the force of transformation.',
      es: 'Maha Shivratri es la Gran Noche de Shiva, observada con devoción nocturna, meditación y ayuno. Los devotos realizan el Abhisheka — el baño ritual del Shiva Lingam — y cantan "Om Namah Shivaya" toda la noche. Es especialmente importante en los grandes templos de Shiva como Kashi Vishwanath en Varanasi.',
    },
    regions: ['Varanasi', 'Ujjain', 'Kedarnath', 'Pan-India'],
    heroImage: '/festivals/north/mahashivratri.jpg',
    cardImage: '/festivals/north/mahashivratri.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Maha Shivratri falls on Krishna Paksha Chaturdashi of Phalguna (Feb–Mar).
      // Verify exact 2026 and 2027 dates from a reliable Hindu calendar source before publishing.
    ],
  },

  {
    slug: 'baisakhi',
    region: 'north',
    name: { en: 'Baisakhi', es: 'Baisakhi' },
    tagline: {
      en: 'Harvest and Khalsa — Punjab\'s Joyous Spring Festival',
      es: 'Cosecha y Khalsa — El Alegre Festival de Primavera del Punjab',
    },
    description: {
      en: 'Baisakhi is one of the most important festivals of Punjab and North India, celebrated around 13 or 14 April when the Sun enters Mesha (Aries) in the traditional solar calendar. Baisakhi has two particularly important dimensions. First, it is an agricultural harvest festival, especially important to Punjab\'s farming community, marking the arrival of the wheat harvest. Second, it is a major Sikh religious festival, commemorating the creation of the Khalsa at Anandpur Sahib on 30 March 1699 by the 10th Guru Gobind Singh. On Baisakhi, people visit gurudwaras, listen to devotional music, participate in processions and share Langer — the community meal in which everyone sits together regardless of social background. Outside the religious celebrations, one can experience the great cultural traditions of Punjab: Bhangra, Giddha, the dhol and colourful processions. So Baisakhi brings together two fundamental aspects of Punjab: the agricultural life of its countryside and the spiritual and historical heritage of the Sikh community. For a foreign visitor, Baisakhi is particularly interesting because it combines fire worship, agriculture, community celebration, music, dance and traditional Punjabi food. Amritsar — home of the Golden Temple and the site of the original Khalsa creation — is the most significant location for experiencing Baisakhi at its most authentic and meaningful.',
      es: 'Baisakhi es uno de los festivales más importantes del Punjab, celebrado alrededor del 13 o 14 de abril. Combina dos dimensiones: es un festival de cosecha de trigo y una celebración sikh conmemorando la creación del Khalsa en 1699 por el Guru Gobind Singh. Amritsar, con el Templo Dorado, es el centro de las celebraciones.',
    },
    regions: ['Amritsar', 'Punjab', 'North India'],
    heroImage: '/festivals/north/baisakhi.jpg',
    cardImage: '/festivals/north/baisakhi.jpg',
    imageStatus: 'verified',
    dates: [
      {
        year: 2026,
        start: '2026-04-13',
        end: '2026-04-14',
        note: 'Solar calendar festival — falls on approximately 13 or 14 April annually when the Sun enters Mesha (Aries). TODO: confirm exact 2026 calendar date and Amritsar programme from official sources.',
      },
      {
        year: 2027,
        start: '2027-04-14',
        end: '2027-04-14',
        note: 'Approximate — solar calendar. TODO: confirm exact 2027 date from official sources.',
      },
    ],
  },

  // ─── NEW SOUTH INDIA FESTIVALS ────────────────────────────────────

  {
    slug: 'mysuru-dasara',
    region: 'south',
    name: { en: 'Mysuru Dasara', es: 'Mysuru Dasara' },
    tagline: {
      en: 'The Royal Festival of Karnataka — Jumbo Savari and the Golden Hawdah',
      es: 'El Festival Real de Karnataka — La Procesión de los Elefantes',
    },
    description: {
      en: 'Mysuru Dasara is one of the most famous festivals of Karnataka and one of India\'s great royal and cultural celebrations. It is centred on Mysuru and traditionally takes place during the 10 days of Navratri, culminating in Vijayadashmi (Dasara), usually falling in September or October according to the Hindu lunisolar calendar. The religious story behind the festival is the victory of Goddess Chamundeshwari — a form of Durga — over the buffalo demon Mahishasura. Chamundeshwari is the presiding deity of Mysuru, and her temple stands on Chamundi Hill overlooking the city. But Mysuru Dasara is also famous because it developed as a royal celebration under the Wadiyar rulers of Mysuru, whose dynasty played a major role in the history and culture of the region. The magnificent Mysuru Palace becomes the centre of the festivities and is brilliantly illuminated with thousands of lights. The great finale is the Jumbo Savari — a spectacular procession of decorated elephants, musicians, dancers and cultural tableaux. The central elephant traditionally carries the Golden Hawdah containing the image of Goddess Chamundeshwari. There are also music and dance performances, exhibitions and Ayudha Puja, when people traditionally honour the tools and instruments through which they work. Mysuru Dasara brings together mythology, royal history, architecture, elephants, music and Karnataka\'s living cultural traditions.',
      es: 'Mysuru Dasara es una de las celebraciones reales más famosas de India, centrada en Mysuru durante los 10 días de Navratri. El Palacio de Mysuru se ilumina espectacularmente, y el gran final es el Jumbo Savari — una procesión de elefantes decorados que llevan la imagen de la Diosa Chamundeshwari en un Hawdah de oro.',
    },
    regions: ['Mysuru', 'Karnataka'],
    heroImage: '/festivals/south/maysuru_dusara.jpg',
    cardImage: '/festivals/south/maysuru_dusara.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Mysuru Dasara falls during Navratri/Vijayadashmi (Sep–Oct).
      // Verify exact 2026 and 2027 dates from Karnataka Tourism or official Mysuru Dasara calendar.
    ],
  },

  {
    slug: 'pongal',
    region: 'south',
    name: { en: 'Pongal', es: 'Pongal' },
    tagline: {
      en: 'Tamil Nadu\'s Harvest Festival — Thanksgiving to the Sun and the Land',
      es: 'El Festival de la Cosecha de Tamil Nadu — Gratitud al Sol y a la Tierra',
    },
    description: {
      en: 'Pongal is the major Tamil harvest festival, celebrated in Tamil Nadu and by Tamil communities around the world. It takes place in the Tamil month of Thai, usually around 14–17 January. Pongal is especially important because it is both a harvest celebration and a thanksgiving festival — people express gratitude to the Sun, nature, cattle, farmers and the land for providing food. The Tamil word "Pongal" means "to boil over" or "overflow," and the name comes from the traditional preparation of sweet rice in a new clay pot. When the milk and rice boil and overflow, people joyfully say "Pongalo Pongal!" — the overflowing pot symbolising abundance, prosperity and a plentiful harvest. The festival traditionally lasts four days, each with its own meaning. Bhogi is associated with cleaning and renewal. Thai Pongal is thanksgiving to the Sun and nature. Mattu Pongal honours cattle, which traditionally played an essential role in agriculture. Kannum Pongal is a day for visiting relatives and spending time with family and friends. Visitors will see beautiful Kolam (geometric patterns) at the entrances of houses, decorated cattle, fresh sugarcane and traditional Pongal pots. Pongal is a thanksgiving ceremony for the entire journey from sunlight and soil to the food on our table.',
      es: 'Pongal es el principal festival de cosecha de Tamil Nadu, celebrado alrededor del 14-17 de enero. La palabra "Pongal" significa "desbordarse" y da nombre al plato de arroz dulce preparado en una olla de barro nueva. Cuando el arroz y la leche se desbordan, la gente exclama "¡Pongalo Pongal!". El festival dura cuatro días con significados distintos.',
    },
    regions: ['Tamil Nadu', 'Pan-South India'],
    heroImage: '/festivals/south/pongal.jpg',
    cardImage: '/festivals/south/pongal.jpg',
    imageStatus: 'verified',
    dates: [
      {
        year: 2027,
        start: '2027-01-14',
        end: '2027-01-17',
        note: 'Pongal falls in the Tamil month of Thai, approximately 14–17 January annually. TODO: confirm exact 2027 programme dates.',
      },
    ],
  },

  {
    slug: 'onam',
    region: 'south',
    name: { en: 'Onam', es: 'Onam' },
    tagline: {
      en: 'Kerala\'s Great Harvest Festival — The Return of King Mahabali',
      es: 'El Gran Festival de Cosecha de Kerala — El Regreso del Rey Mahabali',
    },
    description: {
      en: 'Onam is the most celebrated traditional festival of Kerala — a ten-day cultural and religious celebration held in the Malayalam month of Chingam, usually during August–September. The central day is Thiruvonam, associated with the Shravana/Thiruvonam nakshatra. Onam combines several themes — mythology, harvest, family reunion, food, music, dance, flowers, traditional games and Kerala\'s cultural identity. The festival is traditionally connected with the legendary king Mahabali. According to the story, Mahabali was a generous and popular king whose kingdom was prosperous and peaceful. Vishnu appeared before him as a dwarf Brahmin called Vamana and asked Mahabali for only three paces of land. Vamana then assumed a gigantic cosmic form: with the first step he covered the earth, with the second the heavens. There was nowhere left for the third step, so Mahabali offered his own head. Vishnu then sent him to the netherworld, but allowed him to return once a year to visit his beloved people. Onam celebrates this annual return. During the ten-day celebration, families decorate their homes with beautiful flower carpets (pookalam), prepare the famous vegetarian Onam Sadya on banana leaves and gather with relatives. Kerala\'s culture comes alive through boat races (Vallam Kali), traditional dances and folk performances such as Pulikali. Onam is the festival when Kerala welcomes its legendary king Mahabali — and welcomes abundance, family and community along with him.',
      es: 'Onam es el festival más celebrado de Kerala, una celebración de diez días en el mes de Chingam (agosto-septiembre). El festival conmemora el retorno anual del legendario rey Mahabali. Las familias decoran sus hogares con alfombras de flores (pookalam), preparan el festín vegetariano Onam Sadya y disfrutan de carreras de barcos y danzas tradicionales.',
    },
    regions: ['Kerala', 'Kumarakom', 'Alleppey', 'Kochi'],
    heroImage: '/festivals/south/onam.jpg',
    cardImage: '/festivals/south/onam.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Onam (Thiruvonam) falls in the Malayalam month of Chingam (Aug–Sep).
      // Verify exact 2026 and 2027 dates from Kerala Tourism or official calendar before publishing.
    ],
  },

  {
    slug: 'ugadi',
    region: 'south',
    name: { en: 'Ugadi', es: 'Ugadi' },
    tagline: {
      en: 'The New Year of the Deccan — A New Beginning with Six Tastes of Life',
      es: 'El Año Nuevo del Decán — Un Nuevo Comienzo con Seis Sabores de la Vida',
    },
    description: {
      en: 'Ugadi is the traditional New Year festival celebrated mainly in Karnataka, Andhra Pradesh and Telangana. The name Ugadi comes from Sanskrit Yuga + Adi, meaning "the beginning of a new age or era," and the festival welcomes the arrival of a new year according to the lunisolar calendar. It is celebrated on Chaitra Shukla Pratipada — the first day of the bright fortnight of the month Chaitra — usually in March or April. In Karnataka it is known as Ugadi, while in Andhra Pradesh and Telangana the same New Year observance is generally called Yugadi. People clean and decorate their homes, wear new clothes, visit temples and prepare a special dish called Ugadi Pachadi. This dish contains six different tastes — sweet, sour, bitter, spicy, salty and astringent — and these six tastes represent the different experiences that life can bring during the coming year: happiness and sadness, success and difficulty, pleasant and unpleasant experiences. So the message of Ugadi is much deeper than simply celebrating a New Year. It teaches that life will contain its full range of experiences, and we should accept the complete journey with balance and optimism.',
      es: 'Ugadi es el festival de Año Nuevo en Karnataka, Andhra Pradesh y Telangana. El nombre significa "el comienzo de una nueva era". Lo más especial es el Ugadi Pachadi, un plato con seis sabores — dulce, agrio, amargo, picante, salado y astringente — que representan las diferentes experiencias que la vida puede traer en el año nuevo.',
    },
    regions: ['Karnataka', 'Andhra Pradesh', 'Telangana', 'South India'],
    heroImage: '/festivals/south/ugadi.jpg',
    cardImage: '/festivals/south/ugadi.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Ugadi falls on Chaitra Shukla Pratipada (Mar–Apr).
      // Verify exact 2026 and 2027 dates from official Karnataka/Andhra Pradesh calendar sources.
    ],
  },

  {
    slug: 'chithirai-thiruvizha',
    region: 'south',
    name: { en: 'Chithirai Thiruvizha', es: 'Chithirai Thiruvizha' },
    tagline: {
      en: 'The Grand Festival of Madurai — The Sacred Wedding of Meenakshi and Shiva',
      es: 'El Gran Festival de Madurai — La Boda Sagrada de Meenakshi y Shiva',
    },
    description: {
      en: 'Chithirai Thiruvizha is one of the most important and spectacular temple festivals of Tamil Nadu, celebrated in Madurai during the Tamil month of Chithirai, usually in April–May. Chithirai is the first month of the Tamil solar calendar, generally beginning around 14 April, and Thiruvizha means "festival." The festival is centred on the great Meenakshi Amman Temple and the traditions surrounding Goddess Meenakshi and Lord Sundareshwarar (Shiva). It also incorporates the famous story of Kallazhagar — a form of Lord Vishnu and traditionally regarded as Meenakshi\'s brother — who travels from his temple (Alagar Koyil) towards Madurai to attend the wedding. According to the legend, he arrives too late and enters the Vaigai River. The festival celebrates the divine marriage of Meenakshi (the fish-eyed goddess) and Sundareshwarar (the handsome Shiva) — one of the most celebrated sacred unions in South Indian temple tradition. For several weeks, the city becomes a sacred stage. Gods are carried through the streets in grand processions, thousands of pilgrims gather, traditional music fills the air and the Meenakshi Amman Temple becomes the centre of community life. Witnessing this festival is one of the most immersive South Indian temple experiences a traveller can have.',
      es: 'Chithirai Thiruvizha es uno de los festivales de templo más espectaculares de Tamil Nadu, celebrado en Madurai durante el mes tamil de Chithirai (abril-mayo). El festival celebra la boda divina de la diosa Meenakshi y el Señor Sundareshwarar (Shiva). Durante semanas, la ciudad se convierte en un escenario sagrado con grandes procesiones y miles de peregrinos.',
    },
    regions: ['Madurai', 'Tamil Nadu'],
    heroImage: '/festivals/south/chithirai_thiruvizha.jpg',
    cardImage: '/festivals/south/chithirai_thiruvizha.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Chithirai Thiruvizha is celebrated in the Tamil month of Chithirai (April–May).
      // Verify exact 2026 and 2027 dates from Madurai Meenakshi Temple or Tamil Nadu Tourism.
    ],
  },

  {
    slug: 'gowri-habba',
    region: 'south',
    name: { en: 'Gowri Habba', es: 'Gowri Habba' },
    tagline: {
      en: 'Karnataka\'s Festival of Goddess Gowri — Welcoming the Divine Daughter Home',
      es: 'El Festival de la Diosa Gowri en Karnataka — Bienvenida a la Hija Divina',
    },
    description: {
      en: 'Gowri Habba is an important Hindu festival dedicated to Goddess Gowri (Parvati), especially celebrated in Karnataka and also observed in parts of Andhra Pradesh and Telangana under related traditions. It is celebrated in the month of Bhadrapada, usually in August–September, on the day before Ganesh Chaturthi. According to popular tradition, Gowri comes to her maternal home to visit her family, and the household welcomes her like an honoured daughter. Gowri is regarded as the auspicious and benevolent form of Goddess Parvati, representing purity, fertility, prosperity, strength and marital well-being. Women prepare a beautiful shrine for the goddess, decorating her with flowers, jewellery, turmeric and kumkum. They perform special prayers and exchange auspicious gifts such as Bageena. The festival is associated with prosperity, fertility, family happiness and the well-being of married women. The day after, Ganesha arrives for Ganesh Chaturthi. So the two festivals are beautifully connected: first the mother is welcomed, and then her son.',
      es: 'Gowri Habba es un festival hindú dedicado a la Diosa Gowri (Parvati), especialmente celebrado en Karnataka. Se celebra en Bhadrapada (agosto-septiembre), el día antes de Ganesh Chaturthi. Según la tradición, Gowri regresa al hogar materno, y la familia la recibe como una hija honrada. Las mujeres preparan un hermoso altar para la diosa.',
    },
    regions: ['Karnataka', 'Andhra Pradesh', 'South India'],
    heroImage: '/festivals/south/gowri_habba.jpg',
    cardImage: '/festivals/south/gowri_habba.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Gowri Habba falls in Bhadrapada (Aug–Sep), the day before Ganesh Chaturthi.
      // Verify exact 2026 and 2027 dates from official Karnataka calendar sources before publishing.
    ],
  },

  {
    slug: 'panguni-uthiram',
    region: 'south',
    name: { en: 'Panguni Uthiram', es: 'Panguni Uthiram' },
    tagline: {
      en: 'The Festival of Divine Unions — Sacred Weddings at Tamil Temples',
      es: 'El Festival de las Uniones Divinas — Bodas Sagradas en los Templos Tamiles',
    },
    description: {
      en: 'Panguni Uthiram is an important Tamil Nadu festival celebrated during the Tamil month of Panguni, usually in March or April. It falls on the day when the Uthiram (Uttara Phalguni) nakshatra coincides with the full moon period. The festival is especially important in Tamil Nadu and is celebrated at major temples to Lord Murugan, Shiva, Vishnu and the Divine Mother. The central theme of Panguni Uthiram is the celebration of sacred marriages and divine unions. Depending on the temple, one can witness the symbolic wedding of Shiva and Parvati, Murugan and Deivanai, Vishnu and Lakshmi, or other divine couples. The gods and goddesses are beautifully dressed in silk and jewellery, priests perform the wedding ceremony, and afterwards the deities may be carried through the streets in grand processions accompanied by traditional South Indian music. Panguni Uthiram is the day when the divine world celebrates marriage, and the temple becomes the centre of that sacred wedding. This festival offers travellers a rare window into living South Indian temple culture at its most ceremonially rich.',
      es: 'Panguni Uthiram es un festival tamil que se celebra cuando el nakshatra Uthiram coincide con la luna llena del mes de Panguni (marzo-abril). El tema central son las bodas sagradas entre las deidades: Shiva y Parvati, Murugan y Deivanai, Vishnu y Lakshmi. Los dioses vestidos con seda y joyas son llevados en procesión mientras los sacerdotes realizan la ceremonia nupcial.',
    },
    regions: ['Tamil Nadu', 'South India'],
    heroImage: '/festivals/south/panguni_uthiram.jpg',
    cardImage: '/festivals/south/panguni_uthiram.jpg',
    imageStatus: 'verified',
    dates: [
      // TODO: Panguni Uthiram falls when Uthiram nakshatra coincides with full moon of Panguni (Mar–Apr).
      // Verify exact 2026 and 2027 dates from Tamil Nadu temple calendars before publishing.
    ],
  },

];

// ─── Festival-to-Journey links ────────────────────────────────────────────────
// Dev Deepawali links removed — that festival has been removed from the dataset.

/** @type {FestivalJourneyLink[]} */
export const festivalJourneyLinks = [
  // Diwali
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
  // Holi
  {
    festivalSlug: 'holi',
    journeySlug: 'golden-triangle-wildlife-trail',
    matchStrength: 'perfect',
    hook: {
      en: 'Holi in Jaipur is celebrated from the City Palace balconies — a sight like no other.',
      es: 'El Holi en Jaipur se celebra desde los balcones del City Palace — un espectáculo único.',
    },
    suggestedStartOffset: 2,
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
  // Makar Sankranti Kite Festival
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
    suggestedStartOffset: 2,
  },
  // Gangaur — Jaipur/Rajasthan journeys
  {
    festivalSlug: 'gangaur',
    journeySlug: 'echoes-of-forts-and-forests',
    matchStrength: 'perfect',
    hook: {
      en: 'Gangaur\'s colourful procession through Jaipur and Udaipur is Rajasthan at its most vivid — women in traditional dress, decorated palanquins and festive music.',
      es: 'La colorida procesión de Gangaur por Jaipur y Udaipur es Rajasthan en su máximo esplendor.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'gangaur',
    journeySlug: 'north-india-unveiled',
    matchStrength: 'perfect',
    hook: {
      en: 'Jaipur\'s Gangaur procession — silver palanquins, decorated elephants and folk dancers — is one of Rajasthan\'s most beautiful festivals.',
      es: 'La procesión de Gangaur en Jaipur — palanquines de plata, elefantes decorados y bailarines folclóricos — es uno de los festivales más bellos de Rajasthan.',
    },
    suggestedStartOffset: 5,
  },
  {
    festivalSlug: 'gangaur',
    journeySlug: 'crowns-citadel-countryside',
    matchStrength: 'perfect',
    hook: {
      en: 'Time your Jaipur and Udaipur days on this journey to fall during Gangaur — the streets come alive with colour and processions.',
      es: 'Planifica tus días en Jaipur y Udaipur durante Gangaur — las calles cobran vida con color y procesiones.',
    },
    suggestedStartOffset: 3,
  },
  // Dussehra — North + South journeys
  {
    festivalSlug: 'dussehra',
    journeySlug: 'echoes-of-forts-and-forests',
    matchStrength: 'good',
    hook: {
      en: 'Dussehra in Rajasthan is celebrated with Ravan Dahan — the ceremonial burning of effigies marking the victory of good over evil.',
      es: 'Dussehra en Rajasthan se celebra con el Ravan Dahan — la quema ceremonial de efigies que marca el triunfo del bien sobre el mal.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'dussehra',
    journeySlug: 'north-india-unveiled',
    matchStrength: 'good',
    hook: {
      en: 'Experience Dussehra in Jaipur — one of North India\'s most vibrant Ravan Dahan celebrations.',
      es: 'Vive Dussehra en Jaipur — una de las celebraciones de Ravan Dahan más vibrantes del norte de India.',
    },
    suggestedStartOffset: 5,
  },
  {
    festivalSlug: 'dussehra',
    journeySlug: 'three-cultures-mumbai-south-india',
    matchStrength: 'perfect',
    hook: {
      en: 'Mysuru Dasara — the grandest Dussehra celebration in South India — falls along this journey\'s Karnataka route.',
      es: 'Mysuru Dasara — la celebración de Dussehra más grandiosa del sur de India — cae a lo largo de la ruta Karnataka de este viaje.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'dussehra',
    journeySlug: 'karnataka-kerala-escape',
    matchStrength: 'perfect',
    hook: {
      en: 'Mysuru is the showpiece of Karnataka\'s Dussehra — time this journey to coincide with the Jumbo Savari elephant procession.',
      es: 'Mysuru es el escaparate del Dussehra de Karnataka — planifica este viaje para coincidir con la procesión de elefantes Jumbo Savari.',
    },
    suggestedStartOffset: 4,
  },
  // Janmashtami — Mathura/Vrindavan journeys
  {
    festivalSlug: 'janmashtami',
    journeySlug: 'temples-thrones-holy-ghats',
    matchStrength: 'good',
    hook: {
      en: 'This spiritual journey passes through the Mathura–Vrindavan region — the epicentre of Janmashtami celebrations.',
      es: 'Este viaje espiritual pasa por la región de Mathura-Vrindavan, el epicentro de las celebraciones de Janmashtami.',
    },
    suggestedStartOffset: 7,
  },
  // Maha Shivratri — Varanasi journeys
  {
    festivalSlug: 'maha-shivratri',
    journeySlug: 'temples-thrones-holy-ghats',
    matchStrength: 'perfect',
    hook: {
      en: 'Varanasi\'s Kashi Vishwanath Temple comes alive for Maha Shivratri — a night of lamps, chanting and devotion on the ghats.',
      es: 'El Templo Kashi Vishwanath de Varanasi cobra vida en Maha Shivratri — una noche de lámparas, cánticos y devoción en los ghats.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'maha-shivratri',
    journeySlug: 'north-india-unveiled',
    matchStrength: 'perfect',
    hook: {
      en: 'Time your Varanasi visit on this journey to coincide with Maha Shivratri for an unforgettable night on the ghats.',
      es: 'Planifica tu visita a Varanasi en este viaje para coincidir con Maha Shivratri y vivir una noche inolvidable en los ghats.',
    },
    suggestedStartOffset: 11,
  },
  // Baisakhi — Amritsar journeys
  {
    festivalSlug: 'baisakhi',
    journeySlug: 'north-india-unveiled',
    matchStrength: 'perfect',
    hook: {
      en: 'This journey visits the Golden Temple at Amritsar — the heart of Baisakhi celebrations and the birthplace of the Khalsa.',
      es: 'Este viaje visita el Templo Dorado de Amritsar — el corazón de las celebraciones de Baisakhi.',
    },
    suggestedStartOffset: 3,
  },
  // Mysuru Dasara — Karnataka/South India journeys
  {
    festivalSlug: 'mysuru-dasara',
    journeySlug: 'three-cultures-mumbai-south-india',
    matchStrength: 'perfect',
    hook: {
      en: 'Mysuru Dasara — ten days of royal pageantry culminating in the Jumbo Savari — is one of India\'s greatest royal festivals.',
      es: 'Mysuru Dasara — diez días de pompa real que culminan en el Jumbo Savari — es uno de los más grandes festivales reales de India.',
    },
    suggestedStartOffset: 9,
  },
  {
    festivalSlug: 'mysuru-dasara',
    journeySlug: 'karnataka-kerala-escape',
    matchStrength: 'perfect',
    hook: {
      en: 'Mysuru on this journey becomes extraordinary during Dasara — the palace blazes with light and decorated elephants fill the streets.',
      es: 'Mysuru en este viaje se vuelve extraordinaria durante Dasara — el palacio resplandece y los elefantes decorados llenan las calles.',
    },
    suggestedStartOffset: 4,
  },
  {
    festivalSlug: 'mysuru-dasara',
    journeySlug: 'karnataka-goa-hampi-heritage',
    matchStrength: 'good',
    hook: {
      en: 'Extend your Karnataka journey to Mysuru and experience the grandeur of Dasara — one of South India\'s most spectacular events.',
      es: 'Amplía tu viaje por Karnataka hasta Mysuru y vive la grandiosidad del Dasara — uno de los eventos más espectaculares del sur de India.',
    },
    suggestedStartOffset: 5,
  },
  {
    festivalSlug: 'mysuru-dasara',
    journeySlug: 'three-cultures-mumbai-alternate',
    matchStrength: 'good',
    hook: {
      en: 'Time your Mysuru stop on this journey during Dasara for the Jumbo Savari procession of decorated elephants.',
      es: 'Planifica tu parada en Mysuru durante Dasara para la procesión Jumbo Savari de elefantes decorados.',
    },
    suggestedStartOffset: 9,
  },
  // Pongal — Tamil Nadu journeys
  {
    festivalSlug: 'pongal',
    journeySlug: 'temples-spices-south-india',
    matchStrength: 'perfect',
    hook: {
      en: 'Pongal transforms Tamil Nadu in January — decorated cattle, fresh sugarcane and the joyful "Pongalo Pongal!" fill every household.',
      es: 'Pongal transforma Tamil Nadu en enero — ganado decorado, caña de azúcar fresca y el alegre "¡Pongalo Pongal!" llenan cada hogar.',
    },
    suggestedStartOffset: 3,
  },
  {
    festivalSlug: 'pongal',
    journeySlug: 'three-cultures-mumbai-south-india',
    matchStrength: 'good',
    hook: {
      en: 'Experience Pongal in Tamil Nadu — a four-day harvest thanksgiving that connects you directly to South India\'s agricultural soul.',
      es: 'Vive Pongal en Tamil Nadu — una acción de gracias de cosecha de cuatro días que te conecta directamente con el alma agrícola del sur de India.',
    },
    suggestedStartOffset: 11,
  },
  {
    festivalSlug: 'pongal',
    journeySlug: 'exotic-south-india-grand-tour',
    matchStrength: 'good',
    hook: {
      en: 'Pongal is the perfect time to be in Tamil Nadu — kolam floor patterns, sugarcane decorations and the spirit of abundance everywhere.',
      es: 'Pongal es el momento perfecto para estar en Tamil Nadu — patrones de kolam en el suelo, decoraciones de caña de azúcar y el espíritu de abundancia por todas partes.',
    },
    suggestedStartOffset: 5,
  },
  // Onam — Kerala journeys
  {
    festivalSlug: 'onam',
    journeySlug: 'karnataka-kerala-escape',
    matchStrength: 'perfect',
    hook: {
      en: 'Onam in Kerala — pookalam flower carpets, the Onam Sadya feast and the famous Vallam Kali boat races — is the most joyful time to visit.',
      es: 'Onam en Kerala — alfombras de flores pookalam, el festín Onam Sadya y las famosas carreras de barcos Vallam Kali — es el momento más alegre para visitar.',
    },
    suggestedStartOffset: 7,
  },
  {
    festivalSlug: 'onam',
    journeySlug: 'south-india-wildlife-backwaters',
    matchStrength: 'perfect',
    hook: {
      en: 'Kerala\'s backwaters come alive during Onam with Vallam Kali snake boat races — a spectacular sight on the waterways.',
      es: 'Las aguas interiores de Kerala cobran vida durante Onam con las carreras de barcos serpiente Vallam Kali — un espectáculo impresionante.',
    },
    suggestedStartOffset: 8,
  },
  {
    festivalSlug: 'onam',
    journeySlug: 'temples-spices-south-india',
    matchStrength: 'good',
    hook: {
      en: 'Time your Kerala section to fall during Onam for the grandest harvest celebration in South India.',
      es: 'Planifica tu sección de Kerala durante Onam para la celebración de cosecha más grande del sur de India.',
    },
    suggestedStartOffset: 10,
  },
  {
    festivalSlug: 'onam',
    journeySlug: 'three-cultures-mumbai-south-india',
    matchStrength: 'good',
    hook: {
      en: 'Experience Onam in Kerala — flower carpets, feasts and the spirit of King Mahabali\'s return fill every home.',
      es: 'Vive Onam en Kerala — alfombras de flores, festines y el espíritu del retorno del Rey Mahabali llenan cada hogar.',
    },
    suggestedStartOffset: 13,
  },
  // Ugadi — Karnataka journeys
  {
    festivalSlug: 'ugadi',
    journeySlug: 'karnataka-kerala-escape',
    matchStrength: 'perfect',
    hook: {
      en: 'Ugadi in Karnataka — new clothes, temple visits and the six-flavoured Ugadi Pachadi marking a new year — is a wonderful cultural experience.',
      es: 'Ugadi en Karnataka — ropa nueva, visitas a templos y el Ugadi Pachadi de seis sabores que marcan un año nuevo — es una experiencia cultural maravillosa.',
    },
    suggestedStartOffset: 2,
  },
  {
    festivalSlug: 'ugadi',
    journeySlug: 'karnataka-goa-hampi-heritage',
    matchStrength: 'perfect',
    hook: {
      en: 'Celebrate Ugadi in Karnataka — the six tastes of Ugadi Pachadi represent the full range of life\'s experiences in the year ahead.',
      es: 'Celebra Ugadi en Karnataka — los seis sabores del Ugadi Pachadi representan la gama completa de experiencias de vida en el año que viene.',
    },
    suggestedStartOffset: 2,
  },
  // Chithirai Thiruvizha — Tamil Nadu journeys
  {
    festivalSlug: 'chithirai-thiruvizha',
    journeySlug: 'temples-spices-south-india',
    matchStrength: 'perfect',
    hook: {
      en: 'Chithirai Thiruvizha in Madurai — the sacred marriage of Meenakshi and Shiva celebrated with grand processions over several weeks.',
      es: 'Chithirai Thiruvizha en Madurai — el matrimonio sagrado de Meenakshi y Shiva celebrado con grandes procesiones durante varias semanas.',
    },
    suggestedStartOffset: 7,
  },
  {
    festivalSlug: 'chithirai-thiruvizha',
    journeySlug: 'exotic-south-india-grand-tour',
    matchStrength: 'perfect',
    hook: {
      en: 'Madurai\'s Meenakshi Temple becomes the living stage for the divine wedding during Chithirai Thiruvizha — an immersive South Indian temple experience.',
      es: 'El Templo Meenakshi de Madurai se convierte en escenario vivo de la boda divina durante Chithirai Thiruvizha — una experiencia inmersiva en los templos del sur de India.',
    },
    suggestedStartOffset: 8,
  },
  // Gowri Habba — Karnataka journeys
  {
    festivalSlug: 'gowri-habba',
    journeySlug: 'karnataka-kerala-escape',
    matchStrength: 'perfect',
    hook: {
      en: 'Gowri Habba in Karnataka — the welcoming of Goddess Gowri to her maternal home — falls on the day before Ganesh Chaturthi.',
      es: 'Gowri Habba en Karnataka — la bienvenida a la Diosa Gowri en su hogar materno — cae el día antes de Ganesh Chaturthi.',
    },
    suggestedStartOffset: 4,
  },
  {
    festivalSlug: 'gowri-habba',
    journeySlug: 'karnataka-goa-hampi-heritage',
    matchStrength: 'good',
    hook: {
      en: 'Experience Gowri Habba in Karnataka — a beautifully intimate festival dedicated to Goddess Parvati, the day before Ganesh Chaturthi.',
      es: 'Vive Gowri Habba en Karnataka — un festival íntimo y hermoso dedicado a la Diosa Parvati, el día antes de Ganesh Chaturthi.',
    },
    suggestedStartOffset: 4,
  },
  // Panguni Uthiram — Tamil Nadu journeys
  {
    festivalSlug: 'panguni-uthiram',
    journeySlug: 'temples-spices-south-india',
    matchStrength: 'perfect',
    hook: {
      en: 'Panguni Uthiram — divine marriages celebrated at Tamil temples with silk, jewellery and sacred processions — is a rare window into living temple culture.',
      es: 'Panguni Uthiram — matrimonios divinos celebrados en los templos tamiles con seda, joyas y procesiones sagradas — es una ventana única a la cultura viva del templo.',
    },
    suggestedStartOffset: 6,
  },
  {
    festivalSlug: 'panguni-uthiram',
    journeySlug: 'exotic-south-india-grand-tour',
    matchStrength: 'good',
    hook: {
      en: 'Experience Panguni Uthiram along this Tamil Nadu route — sacred weddings of the gods celebrated with ceremony and procession.',
      es: 'Vive Panguni Uthiram a lo largo de esta ruta de Tamil Nadu — bodas sagradas de los dioses celebradas con ceremonia y procesión.',
    },
    suggestedStartOffset: 5,
  },
];

// ─── Pure utility functions ───────────────────────────────────────────────────

/**
 * Returns the next occurrence of a festival's start date on or after `today`.
 * Returns null if no future dates are configured (empty dates array is valid —
 * it means dates are not yet confirmed, not that the festival doesn't exist).
 */
export function getNextOccurrence(festival, today) {
  if (!festival.dates || festival.dates.length === 0) return null;
  const upcoming = festival.dates
    .filter((d) => new Date(d.start + 'T00:00:00Z') >= today)
    .sort((a, b) => new Date(a.start) - new Date(b.start));
  return upcoming[0] ?? null;
}

/**
 * Returns the next `count` festivals sorted by nearest upcoming date.
 * Festivals with no confirmed dates are excluded from the homepage strip.
 */
export function getUpcomingFestivals(today, count = 4) {
  return festivals
    .map((f) => ({ festival: f, nextDate: getNextOccurrence(f, today) }))
    .filter((x) => x.nextDate !== null)
    .sort((a, b) => new Date(a.nextDate.start) - new Date(b.nextDate.start))
    .slice(0, count);
}

/**
 * Returns days until the festival's next start date, or null if none.
 */
export function daysUntil(festival, today) {
  const next = getNextOccurrence(festival, today);
  if (!next) return null;
  const ms = new Date(next.start + 'T00:00:00Z') - today;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function getJourneysForFestival(festivalSlug) {
  return festivalJourneyLinks.filter((l) => l.festivalSlug === festivalSlug);
}

export function getFestivalsForJourney(journeySlug) {
  return festivalJourneyLinks.filter((l) => l.journeySlug === journeySlug);
}

export function getFestivalBySlug(slug) {
  return festivals.find((f) => f.slug === slug);
}

/** Returns festivals filtered by region for the /festivals page filter. */
export function getFestivalsByRegion(region) {
  if (!region || region === 'all') return festivals;
  // pan-india appears in both north and south filters
  return festivals.filter(
    (f) => f.region === region || f.region === 'pan-india'
  );
}

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
