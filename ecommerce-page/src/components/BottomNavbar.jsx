import React from 'react';
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around p-3">
        <button className="flex flex-col items-center">
          <Home className="w-5 h-5 text-blue-600" />
          <span className="text-xs text-blue-600 mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center">
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center">
          <Heart className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Favorites</span>
        </button>
        <button className="flex flex-col items-center">
          <ShoppingCart className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Cart</span>
        </button>
        <button className="flex flex-col items-center">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavbar; 