import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from '../redux/rootReducer';
// import DevTools from './re'
import { verifyAuth } from "../redux/auth/AuthHelper";

const store  = createStore(rootReducer, 
    compose(applyMiddleware(thunk)));

store.dispatch(verifyAuth());
export default store;