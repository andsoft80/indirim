import {ROUTING_TO_PAGE} from "../types";
import {history} from "../../utils";

const redirect = store => next => action => {
  if (action.type === ROUTING_TO_PAGE) {
    const { payload: { method, nextUrl}} = action;
    console.log('redirect middleware ROUTING_TO_PAGE!', method, nextUrl);
    history.push(nextUrl);
    // history[method](nextUrl);
  }
  return next(action);
};

export default redirect;
