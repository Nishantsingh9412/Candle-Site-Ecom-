import * as api from "../../api/index.js";

export const createProductAction = (newProduct) => async (dispatch) => {
  try {
    const { data } = await api.CreateProductAPI(newProduct);
    dispatch({ type: "CREATE_PRODUCT", data: data?.result });
    console.log("Product created successfully: action", data?.result);
    return { success: true, message: data?.message };
  } catch (err) {
    console.error("Error creating product:", err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const getAllProductsAction = () => async (dispatch) => {
  try {
    const { data } = await api.GetAllProductsAPI();
    dispatch({ type: "GET_ALL_PRODUCTS", data: data?.result });
    console.log("All products fetched successfully: action", data);
    return { success: true, message: data?.message };
  } catch (err) {
    console.error("Error fetching all products:", err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const getProductByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.GetProductByIdAPI(id);
    dispatch({ type: "GET_SINGLE_PRODUCT", data: data?.result });
    return { success: true, message: data?.message };
  } catch (err) {
    return { success: false, message: err?.response?.data?.message };
  }
};

export const getProductBySlugAction = (slug) => async (dispatch) => {
  try {
    const { data } = await api.GetProductBySlugAPI(slug);
    dispatch({ type: "GET_SLUG_PRODUCT", data: data?.result });
    console.log("Product fetched by slug successfully: action", data?.result);
    return { success: true, message: data?.message };
  } catch (err) {
    return { success: false, message: err?.response?.data?.message };
  }
};

export const updateProductByIdAction =
  (id, updatedProduct) => async (dispatch) => {
    try {
      const { data } = await api.UpdateProductByIdAPI(id, updatedProduct);
      dispatch({ type: "UPDATE_PRODUCT", data: data?.result });
      return { success: true, message: data?.message };
    } catch (err) {
      return { success: false, message: err?.response?.data?.message };
    }
  };

export const deleteProductByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.DeleteProductByIdAPI(id);
    dispatch({ type: "DELETE_PRODUCT", data: id });
    return { success: true, message: data?.message };
  } catch (err) {
    return { success: false, message: err?.response?.data?.message };
  }
};
