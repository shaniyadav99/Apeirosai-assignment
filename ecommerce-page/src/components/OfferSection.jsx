import React from 'react';
import { Heart, ShoppingCart, Clock } from 'lucide-react';

const OfferCard = ({ offer, isFavorite, onToggleFavorite, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img 
          src={offer.image} 
          alt={offer.title}
          className="w-full aspect-[4/3] object-cover rounded-t-lg"
        />
        <button 
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
          onClick={() => onToggleFavorite(offer.id)}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900">{offer.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{offer.retailer}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{offer.distance} km</span>
          <div className="flex items-center">
            <Clock className="w-3 h-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">{offer.expiresIn}h left</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-sm font-medium text-blue-600">${offer.price}</span>
            <span className="text-xs text-gray-500 ml-1 line-through">${(offer.price * (1 + offer.discount/100)).toFixed(2)}</span>
          </div>
          <button 
            className="bg-blue-600 text-white p-1 rounded-full"
            onClick={() => onAddToCart(offer)}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const OfferSection = ({ 
  section, 
  favorites, 
  onToggleFavorite, 
  onAddToCart,
  loading 
}) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {section.offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            isFavorite={favorites.includes(offer.id)}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferSection; 