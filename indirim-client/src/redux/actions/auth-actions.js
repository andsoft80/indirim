import {SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS} from "../types";

const signInRequested = () => {
   return {
     type: SIGN_IN_REQUEST,
   };
};

const signInLoaded = ( data ) => {
  return {
    type: SIGN_IN_SUCCESS,
	payload: data,
  };
};

const signInError = (error) => {
  return {
	type: SIGN_IN_FAIL,
	payload: error,
  };
};

// const userSignUp = () => {};
//
// const userSignOut= () => {};

const signIn = (login, password) => (authService) => () => (dispatch) => {
  console.log("REDUX signIn", login, password);
  dispatch(signInRequested());
  authService.signIn(login, password)
	.then((data) => dispatch(signInLoaded(data)))
	.catch((error) => dispatch(signInError(error)));
};

export {
  signIn,
};
