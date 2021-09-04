import React, {useState, useContext} from 'react';
import {AuthContext} from "../Context/AuthContext";
import {database} from "../firebase";

function Signup(props) {
    const [email, setEmail]  = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    let {signup} = useContext(AuthContext);

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
        let res = await signup(email, password);
        let uid = res.user.uid;
        
        database.users.doc(uid).set({
            email,
            uid,
            name,
            createdAt: database.getUserTimeStamp(),
        })
        props.push("/addskills")
        // setLoader(false);
        // props.history.push("/");
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

export default Signup;
