import React, {useState} from 'react';

import {database} from "../firebase";
import {signup} from "../redux/auth/AuthHelper";
import {connect} from "react-redux";

function Signup(props) {
    let { signupUser} = props;
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    async function handleSignup (e){
        e.preventDefault();
        let currentUser = await signupUser(email, password);
    
        let uid = currentUser.uid;
        console.log(email, name)
        // console.log(currentUser);
        database.users.doc(uid).set({
            email,
            uid,
            name,
            partnerProficiencies:[],
            partnerSkills: [],
            userSkills:[],
            userProficiencies: [],
            userTechStack: "",
            partnerTechStack: "",
            createdAt: database.getUserTimeStamp(),
        })
        // props.history.push("/");
        props.history.push("/register")
    }
    return (
        <>
        <form onSubmit={handleSignup}>
            <div className="nameContainer">
            <label htmlFor="userName">Your Name</label>
                <input value={name} type="text" id="userName" onChange={handleName} placeholder="Enter your name"/>
            </div>
            <div className="emailContainer">
                <label htmlFor="userEmail">Email</label>
                <input value={email} type="email" id="userEmail"onChange={handleEmail} placeholder="Enter your email"/>
            </div> 
            <div className="passwordContainer">
                <label htmlFor="userPassword">Password</label>
                <input value={password} type="password" id="userPassword" onChange={handlePassword} placeholder="Enter your password"/>
            </div> 
            <div className="submit-button">
                <button type="submit">Get Started</button>
            </div>
        </form>
        </>
    )
}
const mapStateToProps = (store) => {
    return store.auth;
}
const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (email, password) => dispatch(signup(email, password))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup);
