'use client';

import { useState } from 'react';
import CruiseCard from '@/components/cruises/CruiseCard';
import { cruises } from '@/data/mock-data';

interface CruiseGridProps {
  title?: string;
  showFilters?: boolean;
}

export default function CruiseGrid({ 
  title = 'Our Cruises', 
  showFilters = true 
}: CruiseGridProps) {
  const [filteredCruises, setFilteredCruises] = useState(cruises);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Extract unique destinations for filtering
  const destinations = ['all', ...new Set(cruises.map(cruise => cruise.destination))];

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredCruises(cruises);
    } else {
      setFilteredCruises(cruises.filter(cruise => cruise.destination === filter));
    }
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    
    let sorted = [...filteredCruises];
    
    switch (value) {
      case 'featured':
        sorted = sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case 'date-asc':
        sorted = sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'date-desc':
        sorted = sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'title-asc':
        sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted = sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredCruises(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">{title}</h2>
        
        {showFilters && (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-2">
              {destinations.map(destination => (
                <button
                  key={destination}
                  onClick={() => handleFilterChange(destination)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeFilter === destination
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {destination === 'all' ? 'All Destinations' : destination}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="featured">Featured</option>
              <option value="date-asc">Date (Earliest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        )}
      </div>
      
      {filteredCruises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCruises.map(cruise => (
            <CruiseCard
              key={cruise.id}
              cruise={cruise}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No cruises found matching your criteria</h3>
          <p className="mt-2 text-gray-500">Try changing your filters or check back later for new cruises.</p>
        </div>
      )}
    </div>
  );
}
