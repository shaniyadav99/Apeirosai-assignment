import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

const LocationHeader = ({ location, onLocationClick }) => {
  return (
    <div className="bg-white p-3 border-b">
      <button 
        className="flex items-center text-gray-700"
        onClick={onLocationClick}
      >
        <MapPin className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">{location.city}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default LocationHeader; 