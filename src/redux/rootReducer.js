import {combineReducers} from "redux";
import postReducer from "./posts/postReducer";

const rootReducer = combineReducers({
    POSTS: postReducer
})
export default rootReducer;