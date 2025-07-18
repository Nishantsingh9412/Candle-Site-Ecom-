import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import {
  closeCartModal,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartItems,
  getCartTotalAmount,
} from "../../redux/action/cart";

const CartModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isCartModalOpen, isUpdating, isRemoving, isClearing } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();
  const cartItems = useSelector(getCartItems);
  const totalAmount = useSelector(getCartTotalAmount);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        dispatch(closeCartModal());
      }
    };

    if (isCartModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isCartModalOpen, dispatch]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      dispatch(updateCartItem(productId, newQuantity));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to proceed to checkout");
      return;
    }
    // Navigate to checkout
    console.log("Proceeding to checkout...");
    // You can add navigation logic here
  };

  if (!isCartModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => dispatch(closeCartModal())}
      ></div>

      {/* Sidebar Container */}
      <div className="fixed right-0 top-0 h-full flex">
        {/* Sidebar */}
        <div
          className={`relative bg-white shadow-xl w-96 h-full flex flex-col transform transition-transform duration-300 ease-in-out ${
            isCartModalOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={() => dispatch(closeCartModal())}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-300 mb-4"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Start adding some amazing candles!
                </p>
                <button
                  onClick={() => dispatch(closeCartModal())}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {cartItems.map((item) => (
                      <CartItem
                        key={user ? item.product._id : item.product._id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                        isUpdating={isUpdating}
                        isRemoving={isRemoving}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer - Cart Summary & Actions */}
          {cartItems.length > 0 && (
            <div className="border-t bg-gray-50 p-4 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  Subtotal:
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  {" "}
                  ₹ {totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                        // Alert user to login
                      alert("Please login to proceed to checkout");
                      dispatch(closeCartModal());
                      return;
                    }
                    handleCheckout();
                  }}
                //   disabled={!user}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg hover:cursor-pointer"
                >
                  {user ? "Proceed to Checkout" : "Login to Checkout"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(closeCartModal())}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleClearCart}
                    disabled={isClearing}
                    className="flex-1 border border-red-300 text-red-600 py-2 px-4 rounded-md hover:bg-red-50 disabled:opacity-50 transition-colors font-medium"
                  >
                    {isClearing ? "Clearing..." : "Clear Cart"}
                  </button>
                </div>
              </div>

              {!user && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Login to save your cart and proceed to checkout
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Cart Item Component - Optimized for sidebar
const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
  isRemoving,
}) => {
  const product = item.product;
  const quantity = item.quantity;
  const price = item.price;

  return (
    <div className="flex gap-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          //   src={product.images?.[0] || 'https://via.placehold.co/80x80'}
          src={
            product.images?.[0]
              ? `${import.meta.env.VITE_API_URL}/uploads/${product.images?.[0]}`
              : "https://placehold.co/64X64?text=No+Image+Available"
          }
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
          {product.name}
        </h4>
        <p className="text-sm text-gray-500 mb-2">₹ {price.toFixed(2)} each</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(product._id, quantity - 1)}
            disabled={isUpdating || quantity <= 1}
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 font-medium"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(product._id, quantity + 1)}
            disabled={
              isUpdating ||
              (product.maxOrderQuantity && quantity >= product.maxOrderQuantity)
            }
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="text-sm font-semibold text-gray-900 mb-2">
          ₹ {(price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(product._id)}
          disabled={isRemoving}
          className="text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors p-1"
          title="Remove item"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H5H21M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6M19 6V20C19 20.55 18.55 21 18 21H6C5.45 21 5 20.55 5 20V6H19ZM10 11V17M14 11V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartModal;
