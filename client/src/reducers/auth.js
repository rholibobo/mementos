import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
        // Saving to local storage
        localStorage.setItem("profile", JSON.stringify({...action?.data}))
      return {...state, authData: action?.data};
    default:
      return state;
  }
};

export default authReducer;
