import React from 'react';

const CategoryNav = ({ filterCategory, setFilterCategory }) => {
  const categories = ['All', 'Grocery', 'Pharmacy', 'Fashion', 'Tech', 'Food', 'Home'];

  return (
    <div className="flex overflow-x-auto hide-scrollbar pb-2 px-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 mx-1 text-xs font-medium rounded-full whitespace-nowrap ${
            cat.toLowerCase() === filterCategory || (cat === 'All' && filterCategory === 'all')
              ? 'bg-white text-blue-600' 
              : 'bg-blue-500 text-white'
          }`}
          onClick={() => setFilterCategory(cat === 'All' ? 'all' : cat.toLowerCase())}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryNav; 