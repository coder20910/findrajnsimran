import {database} from '../../firebase';
export async function getPostMiddleWare(dispatch) {
    try{
        database.users.orderBy("createdAt", "desc")
        .onSnapshot(async (snapshot) => {
            let posts = snapshot.docs.map((doc)=>doc.data());
            dispatch({
                type: "SUCCESS_POSTS",
                payload: posts
            })
        })
    }
    catch(err){
        dispatch({type: "ERROR_POSTS", payload: err.message})
    }
}