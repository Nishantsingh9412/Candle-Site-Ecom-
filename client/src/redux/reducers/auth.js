const initialState = {
  data: JSON.parse(localStorage.getItem("Profile")) || {},
  token: JSON.parse(localStorage.getItem("Profile"))?.token || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem(
        "Profile",
        JSON.stringify({
          ...action?.data,
          token: action?.token,
        })
      );
      return { ...state, data: action?.data, token: action?.token };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
