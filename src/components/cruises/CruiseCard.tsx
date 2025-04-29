'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AffiliateTracker from '@/components/features/AffiliateTracker';

interface CruiseCardProps {
  cruise: {
    id: string;
    slug: string;
    title: string;
    destination: string;
    dateRange: string;
    imageUrl: string;
    shortDescription: string;
    affiliateLink: string;
    categories?: string[];
  };
}

export default function CruiseCard({ cruise }: CruiseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* Image */}
      <Link href={`/cruises/${cruise.slug}`} className="block relative h-48">
        <Image
          src={cruise.imageUrl}
          alt={cruise.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Link>
      
      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">
              <Link href={`/cruises/${cruise.slug}`} className="hover:text-blue-600">
                {cruise.title}
              </Link>
            </h3>
          </div>
          
          <div className="mb-3">
            <div className="text-sm text-gray-600 mb-1">{cruise.destination}</div>
            <div className="text-sm text-gray-600">{cruise.dateRange}</div>
          </div>
          
          <p className="text-gray-700 mb-4">{cruise.shortDescription}</p>
          
          {cruise.categories && cruise.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {cruise.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Link
            href={`/cruises/${cruise.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details
          </Link>
          <AffiliateTracker 
            affiliateLink={cruise.affiliateLink}
            cruiseId={cruise.id}
            cruiseTitle={cruise.title}
          />
        </div>
      </div>
    </div>
  );
}
