import {ACCOUNT_INFO_FAILURE, ACCOUNT_INFO_REQUESTED, ACCOUNT_INFO_SUCCESS, SIGN_OUT} from "../types";

const initialState = {
  loading: false,
  data: {
    firstName: "John",
	lastName: "Doe",
	email: "john.doe@fakemail.com"
  },
  error: {},
};

const accountReducer = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  
  switch (action.type) {
  
	case ACCOUNT_INFO_REQUESTED:
	  return {
		loading: true,
		data: {},
		error: {},
	  };
	  
	case ACCOUNT_INFO_SUCCESS:
	  const { data } = action.payload;
	  return {
	    loading: false,
		data: data,
		error: {}
	  };
	  
	case ACCOUNT_INFO_FAILURE:
	  const {message} = action.payload;
	  return {
		loading: false,
		data: {},
		error: message,
	  };
  
	case SIGN_OUT:
	  return initialState;
	  
	default:
	  return state.account;
  }
};

export default accountReducer;
