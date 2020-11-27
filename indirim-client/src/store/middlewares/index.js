import {applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();

const middleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

export default middleware;
