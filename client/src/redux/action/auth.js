import * as api from "../../api/index.js";

export const signUpAction = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.SignupAPI(newUser);
    dispatch({ type: "AUTH", data: data?.result });
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
    dispatch({ type: "AUTH", data: data?.result });
    return {
      success: true,
      message: "User logged in successfully",
      result:data?.result,
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};
