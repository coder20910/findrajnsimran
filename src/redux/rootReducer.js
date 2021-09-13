import {combineReducers} from "redux";
import postReducer from "./posts/postReducer";
import userReducer from "./user/userReducer";
import AuthReducer from "./auth/authReducer";

const rootReducer = combineReducers({
    POSTS: postReducer,
    USER: userReducer,
    auth: AuthReducer
})
export default rootReducer;