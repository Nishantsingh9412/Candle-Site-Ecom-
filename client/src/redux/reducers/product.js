const initialState = {
  products: [],
  slugProduct: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.data],
      };
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.data,
      };
    case "GET_SINGLE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.data._id ? action.data : product
        ),
      };

    case "GET_SLUG_PRODUCT":
      return {
        ...state,
        slugProduct: action.data,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.data._id ? action.data : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.data
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
