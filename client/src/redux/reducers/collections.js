const initialState = {
  collections: [],
  selectedCollection: null,
};

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_COLLECTION":
      return {
        ...state,
        collections: action.data,
      };
    case "GET_ALL_COLLECTIONS":
      return {
        ...state,
        collections: action.data,
      };
    case "GET_COLLECTION_BY_SLUG":
      return {
        ...state,
        selectedCollection: action.data,
      };
    case "GET_SINGLE_COLLECTION":
      return {
        ...state,
        selectedCollection: action.data,
      };
    case "UPDATE_COLLECTION":
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection._id === action.data._id ? action.data : collection
        ),
      };
    case "DELETE_COLLECTION":
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection._id !== action.data
        ),
      };
    default:
      return state;
  }
};

export default collectionsReducer;
