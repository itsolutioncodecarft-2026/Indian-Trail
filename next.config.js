/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  async redirects() {
    return [
      // Dev Deepawali has been removed from the festival calendar.
      // Redirect old URL to the main festivals listing.
      {
        source: '/festivals/dev-deepawali',
        destination: '/festivals',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
