import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import reducer from "./redusers";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
