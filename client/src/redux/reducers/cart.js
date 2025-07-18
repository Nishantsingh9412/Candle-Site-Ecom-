// Cart action types
export const CART_ACTION_TYPES = {
  // Cart data
  GET_CART_START: 'GET_CART_START',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_FAIL: 'GET_CART_FAIL',
  
  ADD_TO_CART_START: 'ADD_TO_CART_START',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAIL: 'ADD_TO_CART_FAIL',
  
  UPDATE_CART_START: 'UPDATE_CART_START',
  UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',
  UPDATE_CART_FAIL: 'UPDATE_CART_FAIL',
  
  REMOVE_FROM_CART_START: 'REMOVE_FROM_CART_START',
  REMOVE_FROM_CART_SUCCESS: 'REMOVE_FROM_CART_SUCCESS',
  REMOVE_FROM_CART_FAIL: 'REMOVE_FROM_CART_FAIL',
  
  CLEAR_CART_START: 'CLEAR_CART_START',
  CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
  CLEAR_CART_FAIL: 'CLEAR_CART_FAIL',
  
  SYNC_CART_START: 'SYNC_CART_START',
  SYNC_CART_SUCCESS: 'SYNC_CART_SUCCESS',
  SYNC_CART_FAIL: 'SYNC_CART_FAIL',
  
  // UI states
  OPEN_CART_MODAL: 'OPEN_CART_MODAL',
  CLOSE_CART_MODAL: 'CLOSE_CART_MODAL',
  
  // Local cart (for guest users)
  ADD_TO_LOCAL_CART: 'ADD_TO_LOCAL_CART',
  UPDATE_LOCAL_CART: 'UPDATE_LOCAL_CART',
  REMOVE_FROM_LOCAL_CART: 'REMOVE_FROM_LOCAL_CART',
  CLEAR_LOCAL_CART: 'CLEAR_LOCAL_CART',
  
  // Reset
  RESET_CART: 'RESET_CART',
};

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('localCart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem('localCart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Calculate cart totals
const calculateCartTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return { totalItems, totalAmount };
};

const initialState = {
  // Backend cart data (for authenticated users)
  cart: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
  },
  
  // Local cart data (for guest users)
  localCart: loadCartFromStorage(),
  
  // UI states
  isCartModalOpen: false,
  
  // Loading states
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isRemoving: false,
  isClearing: false,
  isSyncing: false,
  
  // Error states
  error: null,
};

// Calculate initial local cart totals
const localCartTotals = calculateCartTotals(initialState.localCart);
initialState.localCartTotalItems = localCartTotals.totalItems;
initialState.localCartTotalAmount = localCartTotals.totalAmount;

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Cart
    case CART_ACTION_TYPES.GET_CART_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case CART_ACTION_TYPES.GET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        error: null,
      };
    
    case CART_ACTION_TYPES.GET_CART_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Add to Cart
    case CART_ACTION_TYPES.ADD_TO_CART_START:
      return {
        ...state,
        isAdding: true,
        error: null,
      };
    
    case CART_ACTION_TYPES.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        isAdding: false,
        cart: action.payload,
        error: null,
      };
    
    case CART_ACTION_TYPES.ADD_TO_CART_FAIL:
      return {
        ...state,
        isAdding: false,
        error: action.payload,
      };

    // Update Cart
    case CART_ACTION_TYPES.UPDATE_CART_START:
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    
    case CART_ACTION_TYPES.UPDATE_CART_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        cart: action.payload,
        error: null,
      };
    
    case CART_ACTION_TYPES.UPDATE_CART_FAIL:
      return {
        ...state,
        isUpdating: false,
        error: action.payload,
      };

    // Remove from Cart
    case CART_ACTION_TYPES.REMOVE_FROM_CART_START:
      return {
        ...state,
        isRemoving: true,
        error: null,
      };
    
    case CART_ACTION_TYPES.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        isRemoving: false,
        cart: action.payload,
        error: null,
      };
    
    case CART_ACTION_TYPES.REMOVE_FROM_CART_FAIL:
      return {
        ...state,
        isRemoving: false,
        error: action.payload,
      };

    // Clear Cart
    case CART_ACTION_TYPES.CLEAR_CART_START:
      return {
        ...state,
        isClearing: true,
        error: null,
      };
    
    case CART_ACTION_TYPES.CLEAR_CART_SUCCESS:
      return {
        ...state,
        isClearing: false,
        cart: action.payload,
        error: null,
      };
    
    case CART_ACTION_TYPES.CLEAR_CART_FAIL:
      return {
        ...state,
        isClearing: false,
        error: action.payload,
      };

    // Sync Cart
    case CART_ACTION_TYPES.SYNC_CART_START:
      return {
        ...state,
        isSyncing: true,
        error: null,
      };
    
    case CART_ACTION_TYPES.SYNC_CART_SUCCESS:
      return {
        ...state,
        isSyncing: false,
        cart: action.payload,
        // Clear local cart after successful sync
        localCart: [],
        localCartTotalItems: 0,
        localCartTotalAmount: 0,
        error: null,
      };
    
    case CART_ACTION_TYPES.SYNC_CART_FAIL:
      return {
        ...state,
        isSyncing: false,
        error: action.payload,
      };

    // Cart Modal
    case CART_ACTION_TYPES.OPEN_CART_MODAL:
      return {
        ...state,
        isCartModalOpen: true,
      };
    
    case CART_ACTION_TYPES.CLOSE_CART_MODAL:
      return {
        ...state,
        isCartModalOpen: false,
      };

    // Local Cart Operations (for guest users)
    case CART_ACTION_TYPES.ADD_TO_LOCAL_CART: {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.localCart.findIndex(
        item => item.product._id === product._id
      );
      
      let newLocalCart;
      if (existingItemIndex > -1) {
        // Update existing item
        newLocalCart = state.localCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newLocalCart = [...state.localCart, {
          product,
          quantity,
          price: product.price,
        }];
      }
      
      saveCartToStorage(newLocalCart);
      const totals = calculateCartTotals(newLocalCart);
      
      return {
        ...state,
        localCart: newLocalCart,
        localCartTotalItems: totals.totalItems,
        localCartTotalAmount: totals.totalAmount,
      };
    }

    case CART_ACTION_TYPES.UPDATE_LOCAL_CART: {
      const { productId, quantity } = action.payload;
      const newLocalCart = state.localCart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      );
      
      saveCartToStorage(newLocalCart);
      const totals = calculateCartTotals(newLocalCart);
      
      return {
        ...state,
        localCart: newLocalCart,
        localCartTotalItems: totals.totalItems,
        localCartTotalAmount: totals.totalAmount,
      };
    }

    case CART_ACTION_TYPES.REMOVE_FROM_LOCAL_CART: {
      const productId = action.payload;
      const newLocalCart = state.localCart.filter(
        item => item.product._id !== productId
      );
      
      saveCartToStorage(newLocalCart);
      const totals = calculateCartTotals(newLocalCart);
      
      return {
        ...state,
        localCart: newLocalCart,
        localCartTotalItems: totals.totalItems,
        localCartTotalAmount: totals.totalAmount,
      };
    }

    case CART_ACTION_TYPES.CLEAR_LOCAL_CART:
      saveCartToStorage([]);
      return {
        ...state,
        localCart: [],
        localCartTotalItems: 0,
        localCartTotalAmount: 0,
      };

    // Reset Cart
    case CART_ACTION_TYPES.RESET_CART:
      return {
        ...initialState,
        localCart: state.localCart, // Keep local cart
        localCartTotalItems: state.localCartTotalItems,
        localCartTotalAmount: state.localCartTotalAmount,
      };

    default:
      return state;
  }
};

export default cartReducer;
