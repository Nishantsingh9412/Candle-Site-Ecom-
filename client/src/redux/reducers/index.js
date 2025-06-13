import { combineReducers } from "redux";

import authReducer from "./auth";
import categoryReducer from "./category"
import subCategoryReducer from "./subCategory"
import productReducer from "./product"
import collectionsReducer from "./collections"

export default combineReducers({
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    product: productReducer,
    collections: collectionsReducer
});