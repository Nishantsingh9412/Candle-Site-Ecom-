import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';

import { addToCart, addToLocalCart } from '../../redux/action/cart';

const AddToCartButton = ({
  product,
  quantity: initialQuantity = 1,
  showQuantitySelector = false,
  variant = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  className = '',
  disabled = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isAdding } = useSelector((state) => state.cart);
  
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isLoading, setIsLoading] = useState(false);

  // Validate product availability
  if (!product || !product.isActive) {
    return (
      <button
        disabled
        className={`cursor-not-allowed opacity-50 ${getButtonClasses(variant, size)} ${className}`}
      >
        Unavailable
      </button>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      // For guest users, add to local cart
      dispatch(addToLocalCart(product, quantity));
      return;
    }

    setIsLoading(true);
    try {
      dispatch(addToCart(product._id, quantity));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < product.minOrderQuantity) {
      setQuantity(product.minOrderQuantity);
    } else if (product.maxOrderQuantity && newQuantity > product.maxOrderQuantity) {
      setQuantity(product.maxOrderQuantity);
    } else {
      setQuantity(newQuantity);
    }
  };

  const isButtonLoading = isAdding || isLoading;
  const isButtonDisabled = disabled || isButtonLoading || !product.isActive;

  return (
    <div className="flex flex-col gap-2">
      {showQuantitySelector && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= product.minOrderQuantity}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min={product.minOrderQuantity}
              max={product.maxOrderQuantity}
              className="w-16 h-8 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={product.maxOrderQuantity && quantity >= product.maxOrderQuantity}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          {product.maxOrderQuantity && (
            <span className="text-xs text-gray-500">
              Max: {product.maxOrderQuantity}
            </span>
          )}
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isButtonDisabled}
        className={`
          ${getButtonClasses(variant, size)}
          ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
          ${className}
          transition-all duration-200 flex items-center justify-center gap-2
        `}
      >
        {isButtonLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="w-6 h-6" />
            Add to Cart
          </>
        )}
      </button>

      {!user && (
        <p className="text-xs text-gray-500 text-center">
          Items will be saved locally. Login to sync your cart.
        </p>
      )}
    </div>
  );
};

// Helper function to get button classes based on variant and size
const getButtonClasses = (variant, size) => {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

export default AddToCartButton;
