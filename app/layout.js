import './globals.css';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
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
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans antialiased bg-ivory-50 text-charcoal">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
