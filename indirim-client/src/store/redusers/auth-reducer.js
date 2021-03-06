import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from "../types";

const authReducer = (state, action) => {

  if (state === undefined) {
	const token = localStorage.getItem("indirim_token");
	console.info("authReducer. Initial State: Token", token);
	if ((token === null) || (token === undefined)) {
	  console.log("token in localstorage is null or undefined");
	  return {
	    token: {},
		loading: false,
		isAuthenticated: false,
		isRegistered: false,
		isError: false,
		error: {}
	  };
	}
    return {
	  token: token,
	  loading: false,
	  isAuthenticated: true,
	  isRegistered: false,
	  isError: false,
	  error: {}
	};
  }

  switch (action.type) {
	case SIGN_IN_REQUEST:
	  return {
	    token: null,
		loading: true,
		isAuthenticated: false,
		isError: false,
		error: null
	  };

	case SIGN_IN_SUCCESS:
	  const { data } = action.payload;
	  localStorage.setItem("indirim_token", data);
	  console.log('reducer SIGN_IN_SUCCESS',data)
	  return {
	    token: data,
		loading: false,
		isAuthenticated: true,
		isError: false,
		error: null
	  };

	case SIGN_IN_FAIL:
	  return {
	    token: null,
		loading: false,
		isAuthenticated: false,
		isError: true,
		error: action.payload.message
	  };
	case SIGN_UP_REQUEST:
	  return {
	    ...state.auth,
		loading: true,
		isRegistered: false,
		isError: false,
		error: null
	  };
  
	case SIGN_UP_SUCCESS:
	  return {
		...state.auth,
		loading: false,
		isRegistered: true,
	  };
  
	case SIGN_UP_FAIL:
	  return {
		...state.auth,
		loading: false,
		isRegistered: false,
		isError: true,
		error: action.payload.message
	  };
	case SIGN_OUT:
	  return {
	    token: null,
		loading: false,
		isAuthenticated: false,
		isRegistered: false,
		isError: false,
		error: null
	  };

	default:
	  return state.auth;
  }
};

export default authReducer;
