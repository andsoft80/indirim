import {SIGN_OUT} from "../types";

const initialState = {
  info: {
	loading: false,
	error: {},
	data: {
	  firstName: "John",
	  lastName: "Doe",
	  email: "john.doe@fakemail.com"
	}
  },
  orders: {
	loading: false,
	error: {},
	data: []
  },
  offers: {
	loading: false,
	error: {},
	data: []
  }
};

const accountReducer = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  
  switch (action.type) {
  
	case SIGN_OUT:
	  return initialState;
	  
	default:
	  return state.account;
  }
};

export default accountReducer;
