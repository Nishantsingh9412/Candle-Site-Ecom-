import * as api from '../../api/index.js';

export const signUpAction = (newUser) => async (dispatch) => {
    try {
        const { data } = await api.SignupAPI(newUser);
        dispatch({ type: 'AUTH', data: data?.result });
        console.log('Data from Signup Action', data)
        return { success: true, message: data?.message }
    } catch (err) {
        console.log(err);
        return { success: false, message: err?.response?.data?.message }
    }
}

export const loginAction = (logindata) => async (dispatch) => {
    try {
        const { data } = await api.LoginAPI(logindata);
        dispatch({ type: 'AUTH', data: data?.result });
        return { success: true, message: 'User logged in successfully' }
    } catch (err) {
        console.log(err);
        return { success: false, message: err?.response?.data?.message }
    }
}
