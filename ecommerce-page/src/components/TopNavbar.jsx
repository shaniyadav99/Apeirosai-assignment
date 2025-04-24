import React from 'react';
import { Menu } from 'lucide-react';
import SearchBar from './SearchBar';
import CartButton from './CartButton';
import FavoriteButton from './FavoriteButton';
import CategoryNav from './CategoryNav';

const TopNavbar = ({ 
  cart, 
  favorites, 
  showMenu, 
  setShowMenu, 
  filterCategory, 
  setFilterCategory, 
  onSearch 
}) => {
  return (
    <div className="bg-blue-600 text-white">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <button 
            className="mr-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold">ShopNearby</span>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar onSearch={onSearch} />
          <CartButton 
            cart={cart} 
            onClick={() => alert(`${cart.length} items in cart`)} 
          />
          <FavoriteButton 
            favorites={favorites} 
            onClick={() => alert(`${favorites.length} favorite offers`)} 
          />
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav 
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
    </div>
  );
};

export default TopNavbar; 