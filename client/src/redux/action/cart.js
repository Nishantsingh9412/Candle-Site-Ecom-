import {
  GetCartAPI,
  AddToCartAPI,
  UpdateCartItemAPI,
  RemoveFromCartAPI,
  ClearCartAPI,
  SyncCartAPI,
} from '../../api/index.js';
import { CART_ACTION_TYPES } from '../reducers/cart.js';
import { showSuccess, showError, showWarning, showInfo } from '../../utils/notifications.js';

// Get Cart
export const getCart = () => async (dispatch) => {
  dispatch({ type: CART_ACTION_TYPES.GET_CART_START });
  
  try {
    const { data } = await GetCartAPI();
    
    dispatch({
      type: CART_ACTION_TYPES.GET_CART_SUCCESS,
      payload: data.cart,
    });
    
    return data.cart;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to get cart';
    
    dispatch({
      type: CART_ACTION_TYPES.GET_CART_FAIL,
      payload: errorMessage,
    });
    
    showError(errorMessage);
    throw error;
  }
};

// Add to Cart
export const addToCart = (productId, quantity = 1) => async (dispatch, getState) => {
  const { auth } = getState();
  
  // If user is not logged in, show warning
  if (!auth.user) {
    showWarning('Please login to add items to cart');
    return;
  }
  
  dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART_START });
  
  try {
    const { data } = await AddToCartAPI({ productId, quantity });
    
    dispatch({
      type: CART_ACTION_TYPES.ADD_TO_CART_SUCCESS,
      payload: data.cart,
    });
    
    showSuccess(data.message);
    return data.cart;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
    
    dispatch({
      type: CART_ACTION_TYPES.ADD_TO_CART_FAIL,
      payload: errorMessage,
    });
    
    showError(errorMessage);
    throw error;
  }
};

// Add to Local Cart (for guest users)
export const addToLocalCart = (product, quantity = 1) => (dispatch, getState) => {
  const { cart } = getState();
  
  // Check if adding to existing item would exceed max quantity
  const existingItem = cart.localCart.find(item => item.product._id === product._id);
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (product.maxOrderQuantity && newQuantity > product.maxOrderQuantity) {
      showWarning(`Cannot add more. Maximum order quantity is ${product.maxOrderQuantity}`);
      return;
    }
  }
  
  // Check min quantity
  if (quantity < product.minOrderQuantity) {
    showWarning(`Minimum order quantity is ${product.minOrderQuantity}`);
    return;
  }
  
  dispatch({
    type: CART_ACTION_TYPES.ADD_TO_LOCAL_CART,
    payload: { product, quantity },
  });
  
  showSuccess('Item added to cart successfully');
};

// Update Cart Item
export const updateCartItem = (productId, quantity) => async (dispatch, getState) => {
  const { auth } = getState();
  
  if (!auth.user) {
    // Update local cart
    dispatch({
      type: CART_ACTION_TYPES.UPDATE_LOCAL_CART,
      payload: { productId, quantity },
    });
    showSuccess('Cart updated successfully');
    return;
  }
  
  dispatch({ type: CART_ACTION_TYPES.UPDATE_CART_START });
  
  try {
    const { data } = await UpdateCartItemAPI({ productId, quantity });
    
    dispatch({
      type: CART_ACTION_TYPES.UPDATE_CART_SUCCESS,
      payload: data.cart,
    });
    
    showSuccess(data.message);
    return data.cart;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update cart';
    
    dispatch({
      type: CART_ACTION_TYPES.UPDATE_CART_FAIL,
      payload: errorMessage,
    });
    
    showError(errorMessage);
    throw error;
  }
};

// Remove from Cart
export const removeFromCart = (productId) => async (dispatch, getState) => {
  const { auth } = getState();
  
  if (!auth.user) {
    // Remove from local cart
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_FROM_LOCAL_CART,
      payload: productId,
    });
    showSuccess('Item removed from cart');
    return;
  }
  
  dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART_START });
  
  try {
    const { data } = await RemoveFromCartAPI(productId);
    
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_FROM_CART_SUCCESS,
      payload: data.cart,
    });
    
    showSuccess(data.message);
    return data.cart;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to remove item';
    
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_FROM_CART_FAIL,
      payload: errorMessage,
    });
    
    showError(errorMessage);
    throw error;
  }
};

// Clear Cart
export const clearCart = () => async (dispatch, getState) => {
  const { auth } = getState();
  
  if (!auth.user) {
    // Clear local cart
    dispatch({ type: CART_ACTION_TYPES.CLEAR_LOCAL_CART });
    showSuccess('Cart cleared');
    return;
  }
  
  dispatch({ type: CART_ACTION_TYPES.CLEAR_CART_START });
  
  try {
    const { data } = await ClearCartAPI();
    
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_CART_SUCCESS,
      payload: data.cart,
    });
    
    showSuccess(data.message);
    return data.cart;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to clear cart';
    
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_CART_FAIL,
      payload: errorMessage,
    });
    
    showError(errorMessage);
    throw error;
  }
};

// Sync Cart (merge local cart with backend after login)
export const syncCart = () => async (dispatch, getState) => {
  const { cart } = getState();
  
  // Only sync if there are items in local cart
  if (cart.localCart.length === 0) {
    return;
  }
  
  dispatch({ type: CART_ACTION_TYPES.SYNC_CART_START });
  
  try {
    // Prepare items for sync
    const items = cart.localCart.map(item => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));
    
    const { data } = await SyncCartAPI({ items });
    
    dispatch({
      type: CART_ACTION_TYPES.SYNC_CART_SUCCESS,
      payload: data.cart,
    });
    
    // Clear local storage
    localStorage.removeItem('localCart');
    
    showSuccess('Cart synced successfully');
    return data.cart;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to sync cart';
    
    dispatch({
      type: CART_ACTION_TYPES.SYNC_CART_FAIL,
      payload: errorMessage,
    });
    
    showError(errorMessage);
    throw error;
  }
};

// Cart Modal Actions
export const openCartModal = () => ({
  type: CART_ACTION_TYPES.OPEN_CART_MODAL,
});

export const closeCartModal = () => ({
  type: CART_ACTION_TYPES.CLOSE_CART_MODAL,
});

// Toggle Cart Modal
export const toggleCartModal = () => (dispatch, getState) => {
  const { cart } = getState();
  
  if (cart.isCartModalOpen) {
    dispatch(closeCartModal());
  } else {
    dispatch(openCartModal());
  }
};

// Reset Cart (on logout)
export const resetCart = () => ({
  type: CART_ACTION_TYPES.RESET_CART,
});

// Helper function to get total cart items count
export const getCartItemsCount = (state) => {
  const { cart, auth } = state;
  
  if (auth.user) {
    return cart.cart.totalItems || 0;
  } else {
    return cart.localCartTotalItems || 0;
  }
};

// Helper function to get cart items
export const getCartItems = (state) => {
  const { cart, auth } = state;
  
  if (auth.user) {
    return cart.cart.items || [];
  } else {
    return cart.localCart || [];
  }
};

// Helper function to get cart total amount
export const getCartTotalAmount = (state) => {
  const { cart, auth } = state;
  
  if (auth.user) {
    return cart.cart.totalAmount || 0;
  } else {
    return cart.localCartTotalAmount || 0;
  }
};
