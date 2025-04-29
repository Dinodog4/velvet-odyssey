'use client';

// This file handles database connections and operations
// For this implementation, we'll use a simple in-memory store with localStorage persistence
// In a production environment, this would connect to a real database

import { useEffect, useState } from 'react';

// Define types for our data models
export interface Cruise {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  destination: string;
  startDate: string;
  endDate: string;
  dateRange: string;
  imageUrl: string;
  galleryImages: string[];
  shortDescription: string;
  description: string;
  itinerary: {
    day: number;
    date: string;
    port: string;
    description: string;
  }[];
  amenities: string[];
  affiliateLink: string;
  categories?: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

// Sample data for initial state
const initialCruises: Cruise[] = [
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
      
      <h3>Highlights of Your Journey</h3>
      <ul>
        <li>Explore the ancient Acropolis in Athens</li>
        <li>Watch the sunset over Santorini's caldera</li>
        <li>Wander through the charming streets of Mykonos</li>
        <li>Visit the ruins of Pompeii near Naples</li>
        <li>Discover the eternal city of Rome</li>
        <li>Experience the Renaissance art of Florence</li>
      </ul>
      
      <h3>Onboard Experience</h3>
      <p>Our adult-only cruise offers a sophisticated atmosphere where you can relax and connect with like-minded travelers. Enjoy gourmet dining, premium beverages, and entertainment designed specifically for adults.</p>
      
      <p>The ship features multiple pools, hot tubs, a spa, fitness center, and various bars and lounges. Each evening brings new themed parties and events, creating the perfect balance of relaxation and excitement.</p>
    `,
    itinerary: [
      {
        day: 1,
        date: 'June 15, 2025',
        port: 'Athens, Greece',
        description: 'Embarkation day. Board the ship in Athens and settle into your luxurious accommodations. Join us for a welcome reception in the evening.',
      },
      {
        day: 2,
        date: 'June 16, 2025',
        port: 'At Sea',
        description: 'Enjoy a relaxing day at sea. Take advantage of the ship\'s amenities, join one of our workshops, or simply relax by the pool.',
      },
      {
        day: 3,
        date: 'June 17, 2025',
        port: 'Santorini, Greece',
        description: 'Explore the stunning island of Santorini, known for its white-washed buildings and blue domes. Don\'t miss the spectacular sunset views from Oia.',
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
      <p>Escape to the pristine beaches and crystal-clear waters of the Eastern Caribbean on our Caribbean Bliss cruise. This 7-day journey takes you to some of the most beautiful islands in the region, with plenty of time to relax, explore, and enjoy the vibrant local culture.</p>
      
      <p>From the moment you step aboard, you'll be immersed in luxury and comfort, with attentive service and a sophisticated adult-only atmosphere.</p>
      
      <h3>Island Highlights</h3>
      <ul>
        <li>Explore the colonial architecture of San Juan, Puerto Rico</li>
        <li>Relax on the pristine beaches of St. Thomas</li>
        <li>Discover the underwater wonders of St. Maarten</li>
        <li>Experience the exclusive beach clubs of the Bahamas</li>
      </ul>
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
      <p>Immerse yourself in the rich cultures, stunning landscapes, and exotic flavors of Southeast Asia on our Exotic Asia cruise. This 14-day adventure takes you through Thailand and Vietnam, offering a perfect blend of ancient traditions and modern wonders.</p>
      
      <p>From bustling cities to tranquil beaches, from historic temples to vibrant markets, this journey promises unforgettable experiences at every port.</p>
      
      <h3>Cultural Highlights</h3>
      <ul>
        <li>Explore the Grand Palace and temples of Bangkok</li>
        <li>Cruise through the stunning limestone karsts of Halong Bay</li>
        <li>Discover the ancient ruins of Ayutthaya</li>
        <li>Experience the vibrant street life of Ho Chi Minh City</li>
        <li>Relax on the pristine beaches of Koh Samui</li>
      </ul>
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialPages: Page[] = [
  {
    id: '1',
    slug: 'home',
    title: 'Home',
    content: 'Welcome to Velvet Odyssey',
    metaDescription: 'Experience luxury cruises designed for adults seeking adventure, relaxation, and unforgettable experiences.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'about',
    title: 'About Us',
    content: 'Learn about Velvet Odyssey',
    metaDescription: 'Discover the story behind Velvet Odyssey, your premier destination for adult-only luxury cruise experiences.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'contact',
    title: 'Contact Us',
    content: 'Get in touch with Velvet Odyssey',
    metaDescription: 'Contact Velvet Odyssey for inquiries about our luxury adult-only cruises and travel experiences.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@velvetodyssey.com',
    passwordHash: 'hashed_password_would_go_here', // In a real app, this would be properly hashed
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'editor',
    email: 'editor@velvetodyssey.com',
    passwordHash: 'hashed_password_would_go_here', // In a real app, this would be properly hashed
    role: 'editor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Database class to handle CRUD operations
export class Database {
  private cruises: Cruise[];
  private pages: Page[];
  private users: User[];

  constructor() {
    // Initialize with sample data or load from localStorage if available
    this.cruises = this.loadFromStorage('cruises') || initialCruises;
    this.pages = this.loadFromStorage('pages') || initialPages;
    this.users = this.loadFromStorage('users') || initialUsers;
  }

  // Helper methods for localStorage
  private loadFromStorage<T>(key: string): T[] | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(`velvet_odyssey_${key}`);
    return data ? JSON.parse(data) : null;
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`velvet_odyssey_${key}`, JSON.stringify(data));
  }

  // CRUD operations for cruises
  getCruises(): Cruise[] {
    return this.cruises;
  }

  getCruiseBySlug(slug: string): Cruise | undefined {
    return this.cruises.find(cruise => cruise.slug === slug);
  }

  getFeaturedCruises(): Cruise[] {
    return this.cruises.filter(cruise => cruise.isFeatured);
  }

  createCruise(cruise: Omit<Cruise, 'id' | 'createdAt' | 'updatedAt'>): Cruise {
    const newCruise: Cruise = {
      ...cruise,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.cruises = [...this.cruises, newCruise];
    this.saveToStorage('cruises', this.cruises);
    return newCruise;
  }

  updateCruise(id: string, cruise: Partial<Cruise>): Cruise | null {
    const index = this.cruises.findIndex(c => c.id === id);
    if (index === -1) return null;

    const updatedCruise: Cruise = {
      ...this.cruises[index],
      ...cruise,
      updatedAt: new Date().toISOString(),
    };

    this.cruises = [
      ...this.cruises.slice(0, index),
      updatedCruise,
      ...this.cruises.slice(index + 1),
    ];

    this.saveToStorage('cruises', this.cruises);
    return updatedCruise;
  }

  deleteCruise(id: string): boolean {
    const initialLength = this.cruises.length;
    this.cruises = this.cruises.filter(cruise => cruise.id !== id);
    
    if (this.cruises.length !== initialLength) {
      this.saveToStorage('cruises', this.cruises);
      return true;
    }
    
    return false;
  }

  // CRUD operations for pages
  getPages(): Page[] {
    return this.pages;
  }

  getPageBySlug(slug: string): Page | undefined {
    return this.pages.find(page => page.slug === slug);
  }

  updatePage(id: string, page: Partial<Page>): Page | null {
    const index = this.pages.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedPage: Page = {
      ...this.pages[index],
      ...page,
      updatedAt: new Date().toISOString(),
    };

    this.pages = [
      ...this.pages.slice(0, index),
      updatedPage,
      ...this.pages.slice(index + 1),
    ];

    this.saveToStorage('pages', this.pages);
    return updatedPage;
  }

  // User authentication and management
  authenticateUser(username: string, password: string): User | null {
    // In a real app, this would properly hash and compare passwords
    const user = this.users.find(u => u.username === username);
    if (!user) return null;
    
    // This is just a simple mock for demonstration purposes
    // In a real app, you would use proper password hashing and comparison
    if (password === 'password') {
      // Don't return the password hash
      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }
    
    return null;
  }

  getUserById(id: string): Omit<User, 'passwordHash'> | null {
    const user = this.users.find(u => u.id === id);
    if (!user) return null;
    
    // Don't return the password hash
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword as Omit<User, 'passwordHash'>;
  }

  getUsers(): Omit<User, 'passwordHash'>[] {
    // Don't return password hashes
    return this.users.map(({ passwordHash, ...user }) => user as Omit<User, 'passwordHash'>);
  }

  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Omit<User, 'passwordHash'> {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.users = [...this.users, newUser];
    this.saveToStorage('users', this.users);
    
    // Don't return the password hash
    const { passwordHash, ...userWithoutPassword } = newUser;
    return userWithoutPassword as Omit<User, 'passwordHash'>;
  }

  updateUser(id: string, user: Partial<User>): Omit<User, 'passwordHash'> | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;

    const updatedUser: User = {
      ...this.users[index],
      ...user,
      updatedAt: new Date().toISOString(),
    };

    this.users = [
      ...this.users.slice(0, index),
      updatedUser,
      ...this.users.slice(index + 1),
    ];

    this.saveToStorage('users', this.users);
    
    // Don't return the password hash
    const { passwordHash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as Omit<User, 'passwordHash'>;
  }

  deleteUser(id: string): boolean {
    // Prevent deleting the last admin
    const admins = this.users.filter(user => user.role === 'admin');
    const userToDelete = this.users.find(user => user.id === id);
    
    if (admins.length === 1 && userToDelete?.role === 'admin') {
      return false;
    }
    
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    
    if (this.users.length !== initialLength) {
      this.saveToStorage('users', this.users);
      return true;
    }
    
    return false;
  }
}

// Create a singleton instance
let dbInstance: Database | null = null;

export function getDatabase(): Database {
  if (!dbInstance) {
    dbInstance = new Database();
  }
  return dbInstance;
}

// React hook for accessing the database in components
export function useDatabase() {
  const [db] = useState<Database>(() => getDatabase());
  
  // Initialize database on client-side only
  useEffect(() => {
    // This is just to ensure the database is initialized on the client
  }, []);
  
  return db;
}
