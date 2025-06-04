import * as api from "../../api/index.js";

export const createCategoryAction = (newCategory) => async (dispatch) => {
  try {
    const { data } = await api.CreateCategoryAPI(newCategory);
    dispatch({ type: "CREATE_CATEGORY", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const GetAllCategoriesAction = () => async (dispatch) => {
  try {
    const { data } = await api.GetAllCategoriesAPI();
    console.log(" data from GetAllCategoriesAction", data);
    dispatch({ type: "GET_ALL_CATEGORIES", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const GetSingleCategoryAction = (id) => async (dispatch) => {
    try {
        const { data } = await api.GetCategoryByIdAPI(id);
        dispatch({ type: "GET_SINGLE_CATEGORY", data: data?.result });
        return { success: true, message: data?.message };
    } catch (err) {
        console.log(err);
        return { success: false, message: err?.response?.data?.message };
    }
}

export const UpdateCategoryAction = (id, updatedCategory) => async (dispatch) => {
  try {
    const { data } = await api.UpdateCategoryByIdAPI(id, updatedCategory);
    dispatch({ type: "UPDATE_CATEGORY", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const DeleteCategoryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.DeleteCategoryByIdAPI(id);
    dispatch({ type: "DELETE_CATEGORY", data: id });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};


