import * as api from "../../api/index.js";
import { syncCart, getCart, resetCart } from "./cart.js";

export const signUpAction = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.SignupAPI(newUser);
    dispatch({ type: "AUTH", data: data?.result, token: data?.token });
    
    // Sync cart after successful signup
    try {
      await dispatch(syncCart());
    } catch (cartError) {
      console.log("Cart sync failed after signup:", cartError);
    }
    
    return {
      success: true,
      message: data?.message,
      result: data?.result?._id,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const loginAction = (logindata) => async (dispatch) => {
  try {
    const { data } = await api.LoginAPI(logindata);
    dispatch({ type: "AUTH", data: data?.result, token: data?.token });
    
    // Sync cart after successful login
    try {
      await dispatch(syncCart());
      // Also get the current cart from backend
      await dispatch(getCart());
    } catch (cartError) {
      console.log("Cart sync failed after login:", cartError);
    }
    
    return {
      success: true,
      message: "User logged in successfully",
      result: data?.result,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const logoutAction = () => (dispatch) => {
  // Reset cart before logout
  dispatch(resetCart());
  
  // Clear localStorage and reset auth state
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
  
  return {
    success: true,
    message: "Logged out successfully",
  };
};
