import React, { useEffect} from 'react';
import {connect} from "react-redux";
import {getPostMiddleWare} from "../redux/posts/getPostMiddleWare";

import Posts from './Posts';
import Header from './Header';

function Home(props) {
    let {fetchPosts} = props;  
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])
    return (
        <>
        <Header></Header>
        <Posts></Posts>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts : ()=>{
            return dispatch(getPostMiddleWare)
        }
    }
}
export default connect(null, mapDispatchToProps)(Home);
