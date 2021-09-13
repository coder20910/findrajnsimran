import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

import {getUserMiddleWare} from "../redux/user/getUserMiddleWare";

import  Skills from "./Skills";

function UserRegistration(props) {
    let {currentUser} = props.auth;
    let fetchUserData = props.fetchUserData;
    
    useEffect(() => {
        if(currentUser.uid !== undefined){
            fetchUserData(currentUser.uid);
        }
    }, [currentUser,fetchUserData]);
    
    let { userSkills, userProficiencies, partnerSkills, partnerProficiencies, userTechStack, partnerTechStack} = props.USER;
    const [next, setNext] = useState(false);
    console.log(props.USER);
    const sendDataToReducer = (inputSkills, inputProficiencyValues) => {
        if(next === false){
            props.addDataToUSer(inputSkills, inputProficiencyValues)
        }
        else{
            props.addDataToPartner(inputSkills, inputProficiencyValues)
        }
    }
    return (
        <>{next === false
            ?
                <Skills skillsArr={userSkills} proficiencyValues={userProficiencies} currentUser={currentUser} techStack={userTechStack} setNext={setNext} next={next} sendDataToReducer={sendDataToReducer}/>
            : 
                <Skills skillsArr={partnerSkills} proficiencyValues={partnerProficiencies} currentUser={currentUser} techStack={partnerTechStack} setNext={setNext} next={next} sendDataToReducer={sendDataToReducer}/>
        }
        </>
    )
}
const mapStateToProps = (store) =>{
    return {
        USER : store.USER,
        auth : store.auth
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        fetchUserData : (uid) => dispatch(getUserMiddleWare(uid)),
        addDataToUSer : (inputSkills, inputProficiencyValues) => dispatch({type:"ADD_DATA_TO_USER", payload:{inputSkills, inputProficiencyValues}}),
        addDataToPartner : (inputSkills, inputProficiencyValues) => dispatch({type:"ADD_DATA_TO_PARTNER", payload:{inputSkills, inputProficiencyValues}})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
