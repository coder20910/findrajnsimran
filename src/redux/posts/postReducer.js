let initialState = {
    posts: [], 
    loading: true,
    error: ''
};

function postReducer(state= initialState, action){
    switch(action.type){
        case 'SUCCESS_POSTS':
            return{
                posts: [...action.payload],
                loading: false
            }
        case 'ERROR_POSTS':
            return {
                ...state,
                loading: false,
                error : action.payload
            }
        default : 
        return state;
        
    }
}

export default postReducer;