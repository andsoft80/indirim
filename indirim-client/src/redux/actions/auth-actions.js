import {history} from "../../utils";
import {SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT} from "../types";

const signInRequested = (login, password) => {
   return { type: SIGN_IN_REQUEST };
};

const signInLoaded = ( data ) => {
  return { type: SIGN_IN_SUCCESS, payload: data };
};

const signInError = (error) => {
  return { type: SIGN_IN_FAIL, payload: error };
};

// const userSignUp = () => {};

const userSignOut= () => {
  return {
    type: SIGN_OUT
  };
};

const fetchSignIn = (authService, credentials, from) => {
  return dispatch => {
	const {login, password} = credentials;
	dispatch(signInRequested());
	authService.signIn(login, password)
	  .then((data) => {
		dispatch(signInLoaded(data));
		history.push(from);
	  })
	  .catch((error) => dispatch(signInError(error)));
  };
};

export const authActions = {
  fetchSignIn,
};
