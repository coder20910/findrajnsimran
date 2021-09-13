import auth from '../../firebase';

export const login = async(email, password)=>{
    return async(dispatch) =>{
        try{
            let res = await auth.signInWithEmailAndPassword(email, password);
            dispatch({type:"LOGIN_SUCCESS", payload: res.user});
            return res.user;
        }
        catch (err){
            dispatch({type:"LOGIN_ERROR", payload:err.message})
        }
    }
}
export async function signOut(){
    return async(dispatch) =>{
        try{
            await auth.signOut();
            dispatch({type:"LOGOUT_SUCCESSFULLY", payload:{}})
        }
        catch(err){
            dispatch({type: "LOGOUT_SUCCESSFULLY", payload: err.message})
        }
    }
}
export const signup = (email, password)=>{
    return async(dispatch)=>{
        try{
            let signUpData = await auth.createUserWithEmailAndPassword(email, password);
            dispatch({type:"SIGNUP_SUCCESS", payload: signUpData.user});
            return signUpData.user;
        }
        catch(err ){
            dispatch({type: "SIGNUP_ERROR", payload: err.message});
        };
    }  

}
export function verifyAuth() {
    return  (dispatch) =>{
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch({type:"LOGIN_SUCCESS", payload:user});
            } else {
                dispatch(signOut);
            }
        });
    }
}