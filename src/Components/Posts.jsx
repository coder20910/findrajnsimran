import React from 'react';
import {connect} from "react-redux";
import './Posts.css';
import Avatar from "@material-ui/core/Avatar"
function Posts(props) {
    let {loading, posts} = props;
    let imgSrc = "";
    return (
        <>
        {loading === true 
            ? <>Loading...</>
            : <>
            {posts.map((post, index)=>{
                console.log(post.userSkills);
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
                                    <button className="interested-button">View »</button>
                                </div>
                                <div>
                                    <button className="not-interested-button">Not Interested</button>    
                                </div>
                            </div>
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
{/* <div class="media">
  <img class="align-self-center mr-3" src="..." alt="Generic placeholder image">
  <div class="media-body">
    <h5 class="mt-0">Center-aligned media</h5>
    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
    <p class="mb-0">Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  </div>
</div> */}