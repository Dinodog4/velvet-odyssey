'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCruises } from '@/hooks/useDatabase';

interface AffiliateTrackerProps {
  affiliateLink: string;
  cruiseId: string;
  cruiseTitle: string;
}

export default function AffiliateTracker({ 
  affiliateLink, 
  cruiseId, 
  cruiseTitle 
}: AffiliateTrackerProps) {
  const [trackingLink, setTrackingLink] = useState(affiliateLink);
  
  // Add tracking parameters to the affiliate link
  useEffect(() => {
    try {
      const url = new URL(affiliateLink);
      
      // Add tracking parameters
      url.searchParams.append('utm_source', 'velvetodyssey');
      url.searchParams.append('utm_medium', 'website');
      url.searchParams.append('utm_campaign', 'cruise_listing');
      url.searchParams.append('utm_content', cruiseId);
      
      setTrackingLink(url.toString());
    } catch (error) {
      console.error('Invalid URL:', affiliateLink);
      // Fallback to original link if URL is invalid
      setTrackingLink(affiliateLink);
    }
  }, [affiliateLink, cruiseId]);

  // Track click event
  const handleClick = () => {
    // In a real implementation, this would send analytics data to a backend
    console.log(`Affiliate link clicked: ${cruiseTitle} (${cruiseId})`);
    
    // You could also track this with Google Analytics or similar
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'affiliate_click', {
        'event_category': 'outbound',
        'event_label': cruiseTitle,
        'value': cruiseId
      });
    }
  };

  return (
    <a
      href={trackingLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-center inline-block"
    >
      Book Now
    </a>
  );
}
