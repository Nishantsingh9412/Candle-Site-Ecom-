const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY":
      return { ...state, categories: [...state.categories, action.data] };
    case "GET_ALL_CATEGORIES":
      return { ...state, categories: action.data };
    case "GET_SINGLE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.data._id ? action.data : category
        ),
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.data._id ? action.data : category
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.data
        ),
      };
    default:
      return state;
  }
};

export default categoryReducer;