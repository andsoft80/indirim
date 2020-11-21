import {history} from "../../utils";
import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from "../types";

const signInRequested = () => {
   return { type: SIGN_IN_REQUEST };
};

const signInLoaded = ( data ) => {
  return { type: SIGN_IN_SUCCESS, payload: data };
};

const signInError = (error) => {
  return { type: SIGN_IN_FAIL, payload: error };
};

const signUpRequested = () => {
  return { type: SIGN_UP_REQUEST };
};

const signUpLoaded = ( data ) => {
  return { type: SIGN_UP_SUCCESS, payload: data };
};

const signUpError = (error) => {
  return { type: SIGN_UP_FAIL, payload: error };
};

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

const fetchSignUp = (authService, registration) => {
  return dispatch => {
	dispatch(signUpRequested());
	authService.signUp(registration)
	  .then((data) => {
		dispatch(signUpLoaded(data));
	  })
	  .catch((error) => dispatch(signUpError(error)));
  };
};

const fetchSignOut = (authService) => {
  return dispatch => {
    dispatch(userSignOut());
	authService.signOut();
  };
};

export const authActions = {
  fetchSignIn,
  fetchSignUp,
  fetchSignOut
};

export {
  fetchSignIn,
  fetchSignUp,
  fetchSignOut
};
