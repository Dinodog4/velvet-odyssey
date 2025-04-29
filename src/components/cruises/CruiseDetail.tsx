'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SocialMediaShare from '@/components/features/SocialMediaShare';
import AffiliateTracker from '@/components/features/AffiliateTracker';

interface CruiseDetailProps {
  cruise: any;
}

export default function CruiseDetail({ cruise }: CruiseDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Function to render HTML content safely
  const renderHTML = (html: string) => {
    return { __html: html };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cruise Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{cruise.title}</h1>
        {cruise.subtitle && (
          <p className="text-xl text-gray-600 mb-4">{cruise.subtitle}</p>
        )}
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {cruise.destination}
            </div>
            <div className="text-gray-600">
              {cruise.dateRange}
            </div>
          </div>
          <SocialMediaShare 
            title={`${cruise.title} - Velvet Odyssey Cruise`}
            url={typeof window !== 'undefined' ? window.location.href : ''}
            description={`Experience ${cruise.destination} on the ${cruise.title} cruise with Velvet Odyssey. ${cruise.shortDescription}`}
            hashtags={['VelvetOdyssey', 'LuxuryCruise', ...cruise.categories || []]}
            image={cruise.imageUrl}
          />
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4">
          <Image
            src={cruise.galleryImages[activeImageIndex] || cruise.imageUrl}
            alt={cruise.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {cruise.galleryImages && cruise.galleryImages.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {cruise.galleryImages.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative h-20 w-32 rounded-md overflow-hidden flex-shrink-0 ${
                  activeImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${cruise.title} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'itinerary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Itinerary
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'amenities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Amenities
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={renderHTML(cruise.description)} />
        )}

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Cruise Itinerary</h2>
            <div className="space-y-6">
              {cruise.itinerary.map((day: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">Day {day.day}: {day.date}</h3>
                    <span className="text-blue-600 font-medium">{day.port}</span>
                  </div>
                  <p className="text-gray-600">{day.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === 'amenities' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Cruise Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cruise.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Ready to Experience This Cruise?</h3>
            <p className="text-gray-600">
              Book now to secure your spot on this incredible journey.
            </p>
          </div>
          <AffiliateTracker 
            affiliateLink={cruise.affiliateLink}
            cruiseId={cruise.id}
            cruiseTitle={cruise.title}
          />
        </div>
      </div>

      {/* Related Cruises */}
      {cruise.relatedCruises && cruise.relatedCruises.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cruise.relatedCruises.map((relatedCruise: any) => (
              <div key={relatedCruise.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={relatedCruise.imageUrl}
                    alt={relatedCruise.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{relatedCruise.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedCruise.dateRange}</p>
                  <Link
                    href={`/cruises/${relatedCruise.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
