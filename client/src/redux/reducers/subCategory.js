const initialState = {
  subCategories: [],
};

const subCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SUB_CATEGORY":
      return { ...state, subCategories: [...state.subCategories, action.data] };
    case "GET_ALL_SUB_CATEGORIES":
      return { ...state, subCategories: action.data };
    case "GET_SINGLE_SUB_CATEGORY":
      return {
        ...state,
        subCategories: state.subCategories.map((subCat) =>
          subCat._id === action.data._id ? action.data : subCat
        ),
      };
    case "UPDATE_SUB_CATEGORY":
      return {
        ...state,
        subCategories: state.subCategories.map((subCat) =>
          subCat._id === action.data._id ? action.data : subCat
        ),
      };
    case "DELETE_SUB_CATEGORY":
      return {
        ...state,
        subCategories: state.subCategories.filter(
          (subCat) => subCat._id !== action.data
        ),
      };
    default:
      return state;
  }
};

export default subCategoryReducer;
