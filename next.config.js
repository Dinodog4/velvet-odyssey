/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static HTML export
  images: {
    unoptimized: true, // Required for static export
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'res.cloudinary.com',
    ],
  },
  // Enable trailing slashes for better SEO
  trailingSlash: true,
};

module.exports = nextConfig;
