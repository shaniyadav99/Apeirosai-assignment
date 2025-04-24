import React from 'react';
import { MapPin } from 'lucide-react';

const LocationHeader = ({ location, onLocationClick }) => {
  return (
    <div className="bg-white p-3 border-b">
      <button 
        onClick={onLocationClick}
        className="flex items-center text-sm text-gray-700"
      >
        <MapPin className="w-4 h-4 mr-1" />
        <span className="truncate max-w-[200px] sm:max-w-[300px]">
          {location.fullAddress || `${location.city}, ${location.state}, ${location.country}`}
        </span>
      </button>
    </div>
  );
};

export default LocationHeader; 