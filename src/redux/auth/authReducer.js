let initialState = {
    isSignedUp: false,
    isSignedIn: false, 
    currentUser:{},
    error: false,
}
function AuthReducer(state = initialState, action) {
    switch (action.type){
        case "LOGIN_SUCCESS":
            return {
                ...state,
                currentUser: action.payload,
                isSignedIn: true
            }
        case "SIGNUP_SUCCESS":        
            console.log(action.payload)
            return {
                ...state,
                isSignedUp: true,
                currentUser: action.payload
            }
        case "SIGNUP_ERROR":
            return {
                ...state,
                error: action.payload
            }
        case "LOGOUT_ERROR":
            return {
                ...state,
                error: action.payload
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                currentUser: action.payload
            }
        default :
            return state;
    }
}
export default AuthReducer;
