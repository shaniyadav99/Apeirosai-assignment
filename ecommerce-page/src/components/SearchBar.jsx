import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClose = () => {
    setShowSearch(false);
    setSearchQuery('');
    onSearch(''); // Clear search when closing
  };

  return (
    <div className="relative">
      {showSearch ? (
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-[200px] sm:max-w-[300px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-1 text-sm text-black rounded-l-md focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 px-2 py-1 rounded-r-md"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </form>
      ) : (
        <button onClick={() => setShowSearch(true)}>
          <Search className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar; 