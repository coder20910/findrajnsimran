import React from 'react';
import {connect} from "react-redux";
import './Posts.css';
function Posts(props) {
    let {loading, error, posts} = props;
    return (
        <>
        {loading === true 
            ? <>Loading...</>
            : <>
            {posts.map((post, index)=>{
                return <div key={index}>
                    <div style={{display:"flex", flexBasis: "fill", height:"20vh", width:"35vw", border: "1px solid red"}}>

                        <p>{post.uid}</p>
                        <p>Hello Peter</p>
                        {post.lookingFor.map((lookingFor, index)=>{
                            return <>
                                    <p>{lookingFor}</p>
                                </>
                            })
                        }
                    </div> 
                    </div>
            })

            }</>
        }
        </>
    )
}
const mapStateToProps  = (store) =>{
    return store.POSTS;
}

export default connect(mapStateToProps)(Posts);
