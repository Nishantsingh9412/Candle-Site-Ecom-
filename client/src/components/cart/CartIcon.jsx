import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';

import { openCartModal } from '../../redux/action/cart';
import { getCartItemsCount } from '../../redux/action/cart';


const CartIcon = ({ className = '', size = 24 }) => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(getCartItemsCount);

  const handleCartClick = () => {
    dispatch(openCartModal());
  };

  return (
    <div className={`relative cursor-pointer ${className}`} onClick={handleCartClick}>
      {/* Shopping Cart Icon */}
      <ShoppingCart className={`w-${size} h-${size} text-gray-800`} />  

      {/* Cart Badge */}
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
          {cartItemsCount > 99 ? '99+' : cartItemsCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
