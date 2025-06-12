import * as api from "../../api/index.js";

export const createCollectionAction = (newCollection) => async (dispatch) => {
  try {
    const { data } = await api.CreateCollectionAPI(newCollection);
    dispatch({ type: "CREATE_COLLECTION", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const getAllCollectionsAction = () => async (dispatch) => {
  try {
    const { data } = await api.GetAllCollectionsAPI();
    console.log("Data from getAllCollectionsAction", data);
    dispatch({ type: "GET_ALL_COLLECTIONS", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const getSingleCollectionAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.GetCollectionByIdAPI(id);
    dispatch({ type: "GET_SINGLE_COLLECTION", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};
export const updateCollectionAction =
  (id, updatedCollection) => async (dispatch) => {
    try {
      const { data } = await api.UpdateCollectionByIdAPI(id, updatedCollection);
      dispatch({ type: "UPDATE_COLLECTION", data: data?.result });
      return { success: true, message: data?.message };
    } catch (err) {
      console.log(err);
      return { success: false, message: err?.response?.data?.message };
    }
  };

export const deleteCollectionAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.DeleteCollectionByIdAPI(id);
    dispatch({ type: "DELETE_COLLECTION", data: id });
    return { success: true, message: data?.message };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};
