import {database} from '../../firebase';

export function getUserMiddleWare(uid) {
    return async(dispatch) =>{
        try{
            let res = await database.users.doc(uid).get();
            dispatch({
                type: "SUCCESS_USER_DETAILS",
                payload: res.data()
            })
    }
    catch(err){
        dispatch({type: "ERROR_USER_DETAILS", payload: err.message})
    }
    }
}