'use client';

import { useState } from 'react';

interface FormData {
  title: string;
  subtitle: string;
  destination: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  shortDescription: string;
  description: string;
  affiliateLink: string;
  categories: string;
  isFeatured: boolean;
  amenities: string;
  itinerary: string;
  galleryImages: string;
  [key: string]: string | boolean; // Add index signature
}

export default function CruiseForm({ 
  initialData = null, 
  onSubmit, 
  onCancel 
}: { 
  initialData?: any, 
  onSubmit: (data: any) => void, 
  onCancel: () => void 
}) {
  // Initialize form state with initial data or empty values
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    destination: initialData?.destination || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    imageUrl: initialData?.imageUrl || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    affiliateLink: initialData?.affiliateLink || '',
    categories: initialData?.categories?.join(', ') || '',
    isFeatured: initialData?.isFeatured || false,
    amenities: initialData?.amenities?.join('\n') || '',
    itinerary: initialData?.itinerary ? formatItinerary(initialData.itinerary) : '',
    galleryImages: initialData?.galleryImages?.join('\n') || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format itinerary data for the textarea
  function formatItinerary(itinerary: any[]) {
    return itinerary.map(item => 
      `Day ${item.day}: ${item.date}\nPort: ${item.port}\n${item.description}`
    ).join('\n\n');
  }

  // Parse itinerary text back to structured data
  function parseItinerary(text: string) {
    if (!text.trim()) return [];
    
    const entries = text.split('\n\n');
    return entries.map(entry => {
      const lines = entry.split('\n');
      const dayMatch = lines[0].match(/Day (\d+): (.+)/);
      
      if (!dayMatch) return null;
      
      const day = parseInt(dayMatch[1]);
      const date = dayMatch[2];
      const portMatch = lines[1].match(/Port: (.+)/);
      const port = portMatch ? portMatch[1] : '';
      const description = lines.slice(2).join('\n');
      
      return { day, date, port, description };
    }).filter(Boolean);
  }

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = ['title', 'destination', 'startDate', 'endDate', 'imageUrl', 'shortDescription', 'affiliateLink'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Date validation
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start > end) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    
    // URL validation
    const urlFields = ['imageUrl', 'affiliateLink'];
    urlFields.forEach(field => {
      if (formData[field] && !isValidUrl(formData[field] as string)) {
        newErrors[field] = 'Please enter a valid URL';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if a string is a valid URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Process form data
    const processedData = {
      ...formData,
      categories: formData.categories.split(',').map(cat => cat.trim()).filter(Boolean),
      amenities: formData.amenities.split('\n').map(item => item.trim()).filter(Boolean),
      itinerary: parseItinerary(formData.itinerary),
      galleryImages: formData.galleryImages.split('\n').map(url => url.trim()).filter(Boolean),
    };
    
    // Call the onSubmit callback with processed data
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination*
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.destination ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.destination && <p className="mt-1 text-sm text-red-600">{errors.destination}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="e.g., June 15, 2025"
                className={`w-full px-4 py-2 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="text"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="e.g., June 29, 2025"
                className={`w-full px-4 py-2 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
              Categories (comma separated)
            </label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="e.g., luxury, couples, adventure"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
              Featured Cruise
            </label>
          </div>
        </div>
        
        {/* Media and Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Media and Links</h3>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image URL*
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
          </div>
          
          <div>
            <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-700 mb-1">
              Gallery Image URLs (one per line)
            </label>
            <textarea
              id="galleryImages"
              name="galleryImages"
              value={formData.galleryImages}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="affiliateLink" className="block text-sm font-medium text-gray-700 mb-1">
              Affiliate Booking Link*
            </label>
            <input
              type="text"
              id="affiliateLink"
              name="affiliateLink"
              value={formData.affiliateLink}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${errors.affiliateLink ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.affiliateLink && <p className="mt-1 text-sm text-red-600">{errors.affiliateLink}</p>}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Content</h3>
        
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Short Description* (displayed on cards)
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={2}
            className={`w-full px-4 py-2 border rounded-md ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.shortDescription && <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Full Description (HTML supported)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
            Amenities (one per line)
          </label>
          <textarea
            id="amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="itinerary" className="block text-sm font-medium text-gray-700 mb-1">
            Itinerary
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Format: "Day X: Date", "Port: Location", followed by description. Separate days with blank lines.
          </p>
          <textarea
            id="itinerary"
            name="itinerary"
            value={formData.itinerary}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm"
          />
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Cruise' : 'Create Cruise'}
        </button>
      </div>
    </form>
  );
}
