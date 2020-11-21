import {SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT} from "../types";

const authReducer = (state, action) => {

  if (state === undefined) {
	const token = localStorage.getItem("indirim_token");
	console.info("authReducer. Initial State: Token", token);
	if ((token === null) || (token === undefined)) {
	  console.log("token in localstorage is null or undefined");
	  return { token: {}, signingIn: false, isAuthenticated: false, isError: false, error: {} };
	}
    return { token: token, signingIn: false, isAuthenticated: true, isError: false, error: {} };
  }

  switch (action.type) {
	case SIGN_IN_REQUEST:
	  return {
	    token: null,
		signingIn: true,
		isAuthenticated: false,
		isError: false,
		error: null
	  };

	case SIGN_IN_SUCCESS:
	  const { data } = action.payload;
	  return {
	    token: data,
		signingIn: false,
		isAuthenticated: true,
		isError: false,
		error: null
	  };

	case SIGN_IN_FAIL:
	  return {
	    token: null,
		signingIn: false,
		isAuthenticated: false,
		isError: true,
		error: action.payload.message
	  };

	case SIGN_OUT:
	  return {
	    token: null,
		signingIn: false,
		isAuthenticated: false,
		isError: false,
		error: null
	  };

	default:
	  return state.auth;
  }
};

export default authReducer;
