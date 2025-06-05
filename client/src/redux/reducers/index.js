import { combineReducers } from "redux";

import authReducer from "./auth";
import categoryReducer from "./category"
import subCategoryReducer from "./subCategory"

export default combineReducers({
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer
});