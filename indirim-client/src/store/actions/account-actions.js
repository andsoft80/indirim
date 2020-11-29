import {ACCOUNT_INFO_FAILURE, ACCOUNT_INFO_REQUESTED, ACCOUNT_INFO_SUCCESS} from "../types";

const accountInfoRequested = () => {
  return {
    type: ACCOUNT_INFO_REQUESTED
  };
};

const accountInfoLoaded = (data) => {
  return {
    type: ACCOUNT_INFO_SUCCESS,
	payload: data,
  };
};

const accountInfoError = (error) => {
  return{
    type: ACCOUNT_INFO_FAILURE,
	payload: error
  };
};

const fetchAccountInfo = (accountService) => (dispatch) => {
  console.log(accountService);
  dispatch(accountInfoRequested());
  accountService.getInfo()
	.then(data => dispatch(accountInfoLoaded(data)))
	.catch(error => dispatch(accountInfoError(error)));
};

export {
  fetchAccountInfo,
};
