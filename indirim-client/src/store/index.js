import {createStore} from "redux";
import reducer from "./redusers";
import middleware from "./middlewares";

const store = createStore(reducer, middleware);

export default store;
