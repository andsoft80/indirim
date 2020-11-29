import {FETCH_ORDER_FAILURE, FETCH_ORDER_REQUESTED, FETCH_ORDER_SUCCESS, SIGN_OUT} from "../types";

const initialState = {
  loading: false,
  data: [],
  error: {},
};

const ordersReducer = (state, action) => {
  if (state === undefined) {
	return initialState;
  }
  
  switch (action.type) {
	case FETCH_ORDER_REQUESTED:
	  return {
		loading: true,
		data: [],
		error: {},
	  };
	  
	case FETCH_ORDER_SUCCESS:
	  const { data } = action.payload;
	  return {
		loading: false,
		data: data,
		error: {},
	  };
	  
	case FETCH_ORDER_FAILURE:
	  const {message} = action.payload;
	  return {
		loading: false,
		data: [],
		error: message,
	  };
	
	case SIGN_OUT:
	  return initialState;
	  
	default:
	  return state.orders;
  }
};

export default ordersReducer;
