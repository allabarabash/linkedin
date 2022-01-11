import { createStore, applyMiddleware } from "redux";
import thinkMiddleware from 'redux-thunk';
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thinkMiddleware));

export default store;