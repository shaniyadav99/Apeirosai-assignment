import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartButton = ({ cart, onClick }) => {
  return (
    <button className="relative" onClick={onClick}>
      <ShoppingCart className="w-5 h-5" />
      {cart.length > 0 && (
        <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full transform translate-x-1 -translate-y-1">
          {cart.length}
        </span>
      )}
    </button>
  );
};

export default CartButton; 