import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUESTED,
  FETCH_ORDER_SUCCESS
} from "../types";


const orderRequested = () => {
  return {
    type: FETCH_ORDER_REQUESTED
  };
};

const orderLoaded = (data) => {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: data
  };
};

const orderError = (error) => {
  return {
    type: FETCH_ORDER_FAILURE,
    payload: error
  };
};

const fetchMyOrder = (accountService) => (dispatch) => {
  dispatch(orderRequested());
  accountService.getOrders()
    .then(data => dispatch(orderLoaded(data)))
    .catch(error => dispatch(orderError(error)));
};

export {
  fetchMyOrder,
};
