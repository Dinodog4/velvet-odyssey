// This file contains mock data for static export
// In a production environment, this would be replaced with real data from a database

export const cruises = [
  {
    id: '1',
    slug: 'mediterranean-dream',
    title: 'Mediterranean Dream',
    subtitle: 'Greece & Italy Luxury Cruise',
    destination: 'Greece & Italy',
    startDate: 'June 15, 2025',
    endDate: 'June 29, 2025',
    dateRange: 'June 15 - June 29, 2025',
    imageUrl: '/images/cruises/mediterranean.jpg',
    galleryImages: [
      '/images/cruises/mediterranean-1.jpg',
      '/images/cruises/mediterranean-2.jpg',
      '/images/cruises/mediterranean-3.jpg',
      '/images/cruises/mediterranean-4.jpg',
    ],
    shortDescription: 'Experience the beauty of the Mediterranean with stops in Athens, Santorini, and Rome.',
    description: `
      <h2>Experience the Mediterranean Like Never Before</h2>
      <p>Embark on a journey of discovery through the stunning Mediterranean Sea, where ancient history meets modern luxury. Our Mediterranean Dream cruise takes you on a 14-day adventure through the most beautiful destinations in Greece and Italy.</p>
      
      <p>Starting in Athens, you'll explore the cradle of Western civilization before setting sail to the breathtaking islands of Santorini and Mykonos. Continue your journey to the historic coasts of Italy, visiting Naples, Rome, and Florence.</p>
    `,
    itinerary: [
      {
        day: 1,
        date: 'June 15, 2025',
        port: 'Athens, Greece',
        description: 'Embarkation day. Board the ship in Athens and settle into your luxurious accommodations.',
      },
      {
        day: 2,
        date: 'June 16, 2025',
        port: 'At Sea',
        description: 'Enjoy a relaxing day at sea. Take advantage of the ship\'s amenities.',
      },
      {
        day: 3,
        date: 'June 17, 2025',
        port: 'Santorini, Greece',
        description: 'Explore the stunning island of Santorini, known for its white-washed buildings and blue domes.',
      },
    ],
    amenities: [
      'Adults-only environment',
      'Premium beverage package included',
      'Gourmet dining options',
      'Multiple pools and hot tubs',
      'Full-service spa and fitness center',
      'Nightly entertainment and themed parties',
    ],
    affiliateLink: 'https://partner-booking.com/mediterranean-dream',
    categories: ['luxury', 'couples'],
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'caribbean-bliss',
    title: 'Caribbean Bliss',
    subtitle: 'Eastern Caribbean Adventure',
    destination: 'Eastern Caribbean',
    startDate: 'July 10, 2025',
    endDate: 'July 17, 2025',
    dateRange: 'July 10 - July 17, 2025',
    imageUrl: '/images/cruises/caribbean.jpg',
    galleryImages: [
      '/images/cruises/caribbean-1.jpg',
      '/images/cruises/caribbean-2.jpg',
      '/images/cruises/caribbean-3.jpg',
    ],
    shortDescription: 'Sail through the crystal-clear waters of the Caribbean with stops at exclusive adult-only resorts.',
    description: `
      <h2>Caribbean Paradise Awaits</h2>
      <p>Escape to the pristine beaches and crystal-clear waters of the Eastern Caribbean on our Caribbean Bliss cruise. This 7-day journey takes you to some of the most beautiful islands in the region.</p>
    `,
    itinerary: [
      {
        day: 1,
        date: 'July 10, 2025',
        port: 'Miami, Florida',
        description: 'Embarkation day. Board the ship in Miami and begin your Caribbean adventure.',
      },
      {
        day: 2,
        date: 'July 11, 2025',
        port: 'At Sea',
        description: 'Enjoy a day at sea with pool parties, onboard activities, and relaxation.',
      },
      {
        day: 3,
        date: 'July 12, 2025',
        port: 'San Juan, Puerto Rico',
        description: 'Explore the historic streets of Old San Juan and visit the impressive El Morro fortress.',
      },
    ],
    amenities: [
      'Adults-only environment',
      'Premium beverage package included',
      'Multiple dining venues',
      'Pool deck with private cabanas',
      'Evening entertainment and themed parties',
      'Casino and nightclub',
    ],
    affiliateLink: 'https://partner-booking.com/caribbean-bliss',
    categories: ['tropical', 'party'],
    isFeatured: true,
  },
  {
    id: '3',
    slug: 'exotic-asia',
    title: 'Exotic Asia',
    subtitle: 'Thailand & Vietnam Discovery',
    destination: 'Thailand & Vietnam',
    startDate: 'October 5, 2025',
    endDate: 'October 19, 2025',
    dateRange: 'October 5 - October 19, 2025',
    imageUrl: '/images/cruises/asia.jpg',
    galleryImages: [
      '/images/cruises/asia-1.jpg',
      '/images/cruises/asia-2.jpg',
      '/images/cruises/asia-3.jpg',
    ],
    shortDescription: 'Discover the exotic beauty and rich cultures of Southeast Asia on this unforgettable journey.',
    description: `
      <h2>Discover the Wonders of Southeast Asia</h2>
      <p>Immerse yourself in the rich cultures, stunning landscapes, and exotic flavors of Southeast Asia on our Exotic Asia cruise.</p>
    `,
    itinerary: [
      {
        day: 1,
        date: 'October 5, 2025',
        port: 'Bangkok, Thailand',
        description: 'Embarkation day. Board the ship in Bangkok and begin your Southeast Asian adventure.',
      },
      {
        day: 2,
        date: 'October 6, 2025',
        port: 'Bangkok, Thailand',
        description: 'Full day to explore Bangkok\'s temples, palaces, and vibrant markets.',
      },
      {
        day: 3,
        date: 'October 7, 2025',
        port: 'Koh Samui, Thailand',
        description: 'Relax on pristine beaches or explore the island\'s natural beauty and Buddhist temples.',
      },
    ],
    amenities: [
      'Adults-only environment',
      'Asian-inspired cuisine and dining options',
      'Cultural enrichment programs',
      'Spa treatments featuring traditional Asian techniques',
      'Evening entertainment showcasing local performances',
      'Shore excursions led by local experts',
    ],
    affiliateLink: 'https://partner-booking.com/exotic-asia',
    categories: ['exotic', 'adventure'],
    isFeatured: true,
  },
];
