import React from 'react';
import { Heart } from 'lucide-react';

const FavoriteButton = ({ favorites, onClick }) => {
  return (
    <button onClick={onClick}>
      <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-red-200' : 'text-white'}`} />
    </button>
  );
};

export default FavoriteButton; 