import {REDIRECT_TO_MAIN, REDIRECT_TO_SIGN_IN, ROUTING_TO_PAGE} from "../types";

const routeToPage = (data) => {
  return {
    type: ROUTING_TO_PAGE,
	payload: data
  };
};

const redirectToSignIn = () => { return { type: REDIRECT_TO_SIGN_IN }};
const redirectToMain = () => { return { type: REDIRECT_TO_MAIN }};

export {
  routeToPage,
  redirectToSignIn,
  redirectToMain
};
