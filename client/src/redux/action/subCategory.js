import * as api from "../../api/index.js";

export const createSubCategoryAction = (newSubCategory) => async (dispatch) => {
  try {
    const { data } = await api.CreateSubCategoryAPI(newSubCategory);
    dispatch({ type: "CREATE_SUB_CATEGORY", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const GetAllSubCategoriesAction = () => async (dispatch) => {
  try {
    const { data } = await api.GetAllSubCategoriesAPI();
    dispatch({ type: "GET_ALL_SUB_CATEGORIES", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const GetSingleSubCategoryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.GetSubCategoryByIdAPI(id);
    dispatch({ type: "GET_SINGLE_SUB_CATEGORY", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const UpdateSubCategoryAction = (id, updatedSubCategory) => async (dispatch) => {
  try {
    const { data } = await api.UpdateSubCategoryByIdAPI(id, updatedSubCategory);
    dispatch({ type: "UPDATE_SUB_CATEGORY", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const DeleteSubCategoryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.DeleteSubCategoryByIdAPI(id);
    dispatch({ type: "DELETE_SUB_CATEGORY", data: id });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};
