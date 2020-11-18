import {SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT} from "../types";

const authReducer = (state, action) => {

  if (state === undefined) {
	const token = localStorage.getItem("indirim_token");
	console.info("authReducer. Initial State: Token", token);
    return token
	  ? { token: token, isAuthenticated: true, error: {} }
	  : { token: {}, isAuthenticated: false, error: {} };
  }

  switch (action.type) {
	case SIGN_IN_REQUEST:
	  return {
	    token: null,
		isAuthenticated: true,
		error: null
	  };

	case SIGN_IN_SUCCESS:
	  const { data } = action.payload;
	  localStorage.setItem("indirim_token", data);
	  return {
	    token: data,
		isAuthenticated: true,
		error: null
	  };

	case SIGN_IN_FAIL:
	  return {
	    token: null,
		isAuthenticated: false,
		error: action.payload
	  };

	case SIGN_OUT:
	  return {
	    token: null,
		isAuthenticated: false,
		error: null
	  };

	default:
	  return state.auth;
  }
};

export default authReducer;
