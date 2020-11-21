import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import reducer from "./redusers";
import {logger, redirect} from "./middlewares";

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
	logger
	// redirect
));

export default store;
