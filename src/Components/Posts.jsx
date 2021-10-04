import React,{useEffect, useState} from 'react';
import {connect} from "react-redux";


import Avatar from '@material-ui/core/Avatar';

import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import {database} from '../firebase';

import './Posts.css';

function Posts(props) {
    const [openId, setOpenId] = useState();
    const [filteredPosts, setPosts] = useState([]);
    const [notInterestedPosts, setnotInterestedPosts] = useState([]);
    const [interestedPosts, setInterestedPosts] = useState([]);

    let {loading, posts} = props.POSTS;
    let {currentUser} = props.auth;

    const filterInitialPosts = (postsArr, postsToFilter) =>{        
        if (postsToFilter !== undefined){
            const filtetredArr = postsArr.filter((elem) => !postsToFilter.find((id) => elem.uid === id));
            return filtetredArr;
        }
        else{
            return postsArr;
        }
    }
    useEffect(() => {
        if (loading !== true){
            
            let currentUserDetails;
            
            for(let currPost of posts){
                if (currPost.uid === currentUser.uid){
                    currentUserDetails = currPost;
                    break;
                }
            }

            let filteredPostsArr = posts.filter((post)=>{
            return post.uid !== currentUserDetails.uid;
            })
            
            filteredPostsArr = filterInitialPosts(filteredPostsArr, currentUserDetails.notInterestedPosts);
            filteredPostsArr = filterInitialPosts(filteredPostsArr, currentUserDetails.interestedPosts);
           
            setnotInterestedPosts(currentUserDetails.notInterestedPosts);
            setnotInterestedPosts(currentUserDetails.interestedPosts);

            setPosts(filteredPostsArr);
    }
    }, [loading])

    const handleClose = () => {
        setOpenId(null);
    }
    const handleInterested = (id) => {
        setOpenId(id)
    }
    const postFilterHelper = (id) => {
        let newFilteredPosts = filteredPosts.filter((currPost)=>{
            return currPost.uid !== id;
        })
        return newFilteredPosts;
    }

    const nextPostHelper = (id) => {
        let indexofNextElement;
        for(let i=0; i<filteredPosts.length; i++){
            if(filteredPosts[i].uid === id){
                indexofNextElement = (i + 1)%(filteredPosts.length);
            }
        }
        return indexofNextElement;
    }
    const handleInterestedModal = (id) => {
        let newInterestedArr = [...interestedPosts, id]
        setInterestedPosts(newInterestedArr);

        let newFilteredPosts = postFilterHelper(id);
        let nextPostIndex = nextPostHelper(id);

        database.users.doc(currentUser.uid).update({
            interestedPosts : newInterestedArr
        })
        setOpenId(filteredPosts[nextPostIndex].uid)
        setPosts(newFilteredPosts);
    }

    const handleNotInterested = (id) => {
        let newNotInterestedArr = [...notInterestedPosts, id];

        setnotInterestedPosts(newNotInterestedArr);
        database.users.doc(currentUser.uid).update({
            notInterestedPosts : newNotInterestedArr
        })
        
        let newFilteredPosts = postFilterHelper(id);
        setPosts(newFilteredPosts);
    }
    const handleNotInterestedModal = (id) => {
        handleNotInterested(id);
        let nextPostIndex = nextPostHelper(id);
        setOpenId(filteredPosts[nextPostIndex].uid);        
    } 

    let imgSrc = "";
    return (
        <>
        {loading === true 
            ? <>Loading...</>
            : <>
            {filteredPosts.map((post, index)=>{
            
                return <div key={index}>
                        <div style={{display:"flex", flexBasis: "fill", height:"10rem", width:"40rem", border: "1px solid red"}}>
                            
                            <div className="profilePicContainer">
                                <div className="dpHelper">

                                {imgSrc ===""
                                    ? <Avatar>{post.name[0]}</Avatar>
                                    
                                    : <Avatar alt="Remy Sharp" src={imgSrc} />
                                }
                                </div>
                            </div>
                            <div className="dataContainer" >
                                <div className="info">
                                    <div>{post.name} - {post.userTechStack}</div>
                                </div>
                                <div className="clgName" style={{paddingTop:"0rem"}}>
                                    <span>Sant Longowal</span>
                                </div>
                                <div className="passingYear">
                                    <span>2018-2021</span>
                                    <span style={{marginLeft:"5px", marginRight:"5px"}}>•</span>
                                    <span>Availble for 10 days</span>
                                </div>
                                <div className="aboutAndLookingFor">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam possimus provident mollitia. Voluptas, fugiat earum!
                                </div>
                                {/* {Object.keys(post.userSkills).map((lookingFor, index)=>{
                                    return <div key={index}>
                                            <p>{post.userSkills[lookingFor]}</p>
                                        </div>
                                    })
                                } */}
                            </div>
                            <div className="interestContainer">
                                <div>
                                    <button className="interested-button" onClick={()=>handleInterested(post.uid)}>View »</button>
                                </div>
                                <div>
                                    <button className="not-interested-button" onClick={()=>handleNotInterested(post.uid)}>Not Interested</button>    
                                </div>
                            </div>
                        </div> 
                        <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.uid}>
                            <MuiDialogContent>
                            <div style={{display:"flex"}}>
                                
                                <div className="profilePicContainer">
                                    <div className="dpHelper">

                                    {imgSrc ===""
                                        ? <Avatar>{post.name[0]}</Avatar>
                                        
                                        : <Avatar alt="Remy Sharp" src={imgSrc} />
                                    }
                                    </div>
                                </div>
                                <div className="dataContainer" >
                                    <div className="info">
                                        <div>{post.name} - {post.userTechStack}</div>
                                    </div>
                                    <div className="clgName" style={{paddingTop:"0rem"}}>
                                        <span>Sant Longowal</span>
                                    </div>
                                    <div className="passingYear">
                                        <span>2018-2021</span>
                                        <span style={{marginLeft:"5px", marginRight:"5px"}}>•</span>
                                        <span>Availble for 10 days</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="aboutAndLookingFor">
                            <h5>About Me</h5>
                            <hr/>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam possimus provident mollitia. Voluptas, fugiat earum!
                            </div>
                            
                            <div className="mySkills">
                                <h5>My Skills:</h5>
                                <hr/>
                                {/* userProficiencies
*/}
                                {Object.keys(post.userSkills).map((mySkill, index)=>{
                                return <div key={index}>
                                    <p className="skillsInDetails">{post.userSkills[mySkill]} -------------------------------- Intermediate</p>
                                </div>
                                })
                            }
                            </div>
                            <div className="requiredSkills">
                                <h5>Partner Minimum Required Skills</h5>
                                <hr/>
                                {Object.keys(post.partnerSkills).map((lookingFor, index)=>{
                                    return <div key={index}>
                                        <p className="skillsInDetails">{post.partnerSkills[lookingFor]}</p>
                                    </div>
                                })}
                            </div>
                            <hr/>
                            <div className="interestContainermodal" style={{display:"flex"}}>
                                <div className="interseted-section-modal">
                                    <button className="interested-button-modal" onClick={()=>handleInterestedModal(post.uid)}>Apply </button>
                                </div>
                                <div>
                                    <button className="not-interested-button-modal" onClick={()=>handleNotInterestedModal(post.uid)}>Not Interested</button>    
                                </div>
                            </div>
                            </MuiDialogContent>
                        </Dialog>
                </div>
            })
            }</>
        }
        </>
    )
}
const mapStateToProps  = (store) =>{
    return {
        POSTS: store.POSTS,
        auth : store.auth 
    }
}

export default connect(mapStateToProps)(Posts);