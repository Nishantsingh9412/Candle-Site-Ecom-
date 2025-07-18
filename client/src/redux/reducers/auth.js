const initialState = {
  user: JSON.parse(localStorage.getItem("Profile")) || null,
  token: JSON.parse(localStorage.getItem("Profile"))?.token || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      const userData = {
        ...action?.data,
        token: action?.token,
      };
      localStorage.setItem("Profile", JSON.stringify(userData));
      return { 
        ...state, 
        user: action?.data, 
        token: action?.token 
      };
    case "LOGOUT":
      localStorage.clear();
      return { 
        ...state, 
        user: null, 
        token: null 
      };
    default:
      return state;
  }
};

export default authReducer;
