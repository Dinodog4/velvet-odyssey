'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Analytics configuration
const ANALYTICS_ID = 'G-EXAMPLE123456'; // Replace with actual Google Analytics ID in production

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize analytics
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // You could add additional analytics initialization here
      console.log('Analytics initialized');
    }
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {/* Affiliate Tracking Script */}
      <Script
        id="affiliate-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Custom affiliate tracking
            window.trackAffiliateClick = function(cruiseId, cruiseTitle, affiliateLink) {
              // Log the click
              console.log('Affiliate click tracked:', { cruiseId, cruiseTitle, affiliateLink });
              
              // Send to Google Analytics if available
              if (typeof gtag === 'function') {
                gtag('event', 'affiliate_click', {
                  'event_category': 'outbound',
                  'event_label': cruiseTitle,
                  'value': cruiseId
                });
              }
              
              // You could also send to a custom endpoint
              // fetch('/api/track-affiliate', {
              //   method: 'POST',
              //   headers: { 'Content-Type': 'application/json' },
              //   body: JSON.stringify({ cruiseId, cruiseTitle, affiliateLink, timestamp: new Date().toISOString() })
              // });
            };
          `,
        }}
      />

      {children}
    </>
  );
}
