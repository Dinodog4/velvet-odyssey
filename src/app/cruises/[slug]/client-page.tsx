'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CruiseDetail from '@/components/cruises/CruiseDetail';
import { cruises } from '@/data/mock-data';

export default function ClientPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [cruise, setCruise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      // Use mock data for static export
      const cruiseData = cruises.find(c => c.slug === slug);
      if (cruiseData) {
        setCruise(cruiseData);
      } else {
        setError('Cruise not found');
      }
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="spinner mb-4"></div>
          <p>Loading cruise details...</p>
        </div>
      </div>
    );
  }

  if (error || !cruise) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error || 'Cruise not found'}</p>
        </div>
      </div>
    );
  }

  return <CruiseDetail cruise={cruise} />;
}
