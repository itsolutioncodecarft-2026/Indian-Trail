import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActionGroup from '@/components/FloatingActionGroup';

// latin-ext includes Spanish diacritics: á é í ó ú ñ ¿ ¡
const displayFont = Cormorant_Garamond({
  subsets: ['latin-ext'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin-ext'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Indian Routes & Trails — Exclusive India Tours by Om',
    template: '%s | Indian Routes & Trails',
  },
  description:
    'Curated luxury journeys across India by Om — a master guide fluent in Spanish with 10+ years of experience. Timeless, unhurried, deeply authentic India travel for discerning international travellers.',
  keywords: [
    'India luxury tours', 'India travel', 'Rajasthan tours', 'Taj Mahal',
    'exclusive India tours', 'viajes India', 'turismo India lujo',
    'Golden Triangle India', 'Om guide India', 'Spanish speaking India guide',
    'Indian Routes and Trails', 'festival tours India',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    siteName: 'Indian Routes & Trails',
    title: 'Indian Routes & Trails — Exclusive India Tours by Om',
    description: 'Curated luxury journeys across India. A Signature of Excellence.',
    images: [{
      url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
      width: 1200,
      height: 630,
      alt: 'Taj Mahal — Indian Routes & Trails',
    }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActionGroup />
        </LanguageProvider>
      </body>
    </html>
  );
}
