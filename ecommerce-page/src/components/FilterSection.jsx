import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

const FilterSection = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  onSortChange,
  sortBy 
}) => {
  return (
    <div className="bg-white p-3 border-b">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <button 
          className="text-sm text-blue-600"
          onClick={onClearFilters}
        >
          Clear All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`px-3 py-1 rounded-full text-sm ${
              filter.active
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex items-center">
        <span className="text-sm text-gray-600 mr-2">Sort by:</span>
        <select
          className="text-sm border rounded p-1"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="distance">Distance</option>
          <option value="popularity">Popularity</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection; 