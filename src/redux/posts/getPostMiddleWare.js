import {database} from '../../firebase';
export async function getPostMiddleWare(dispatch) {
    try{
        const postPromise = await  database.posts.orderBy("createdAt", "desc")
        .onSnapshot(async (snapshot) => {

            let posts = snapshot.docs.map((doc)=>doc.data());
            let postArr = [];
            for(let i = 0; i < posts.length; i++){
                let pid = posts[i].pid;
                let uid = posts[i].uid;
                let lookingFor = posts[i].looking;

                postArr.push({
                    pid,
                    uid,
                    lookingFor        
                })
            }
            dispatch({
                type: "SUCCESS_POSTS",
                payload: postArr
            })
        })
    }
    catch(err){
        dispatch({type: "ERROR_POSTS", payload: err.message})
    }
}