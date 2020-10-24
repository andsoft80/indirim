import {SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT} from "../types";

const authReducer = (state, action) => {
  
  if (state === undefined) {
	const token = localStorage.getItem("indirim_token");
	console.info("authReducer. Initial State: Token", token);
    return token
	  ? { token: token, isLoggedIn: true, error: {} }
	  : { token: {}, isLoggedIn: false, error: {} };
  }
  
  switch (action.type) {
	case SIGN_IN_REQUEST:
	  return {token: null, isLoggedIn: false, error: null};
	  
	case SIGN_IN_SUCCESS:
	  return {token: action.payload, isLoggedIn: true, error: null};
	  
	case SIGN_IN_FAIL:
	  return {token: null, isLoggedIn: false, error: action.payload};
  
	case SIGN_OUT:
	  return {token: null, isLoggedIn: false, error: null};
	  
	default:
	  return state.auth;
  }
};

export default authReducer;
