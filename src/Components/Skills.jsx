import React, {useEffect, useState} from 'react';
import {useHistory } from "react-router-dom";

import {database} from '../firebase';

import "./Skills.css"; 

function Skills(props) {
    
    let {currentUser} = props;
    let history = useHistory();

    const [optionvalue, setOptionValue] = useState("");
    const [numOfSkills, setnumOfSkills] = useState(5);

    const [skills, setSkills] = useState([]);
    const [inputSkills, setinputSkills] = useState([]);
    const [inputProficiencyValues, setproficiencyValue] = useState([]);
    const [error, setError] = useState({eName:"", one:{errorValue:""}, skillInputErr:{}, profErr:{}});

    
    let skillsObj ={fullStack:[".NET", "Algorithms", "C","Android", "C++","Golang", "iOS", "Java",
    "JavaScript","PHP","Python","Ruby on Rails"],
    backEnd:[".NET", "Algorithms", "Big Data", "C", "C++", "Data Structures", "Golang",
    "Java","Node.js", "PHP", "Python", "Ruby", "Scala"], 
    frontEnd:["React", "Javascript", "Vue", "Angular", "HTML", "CSS"],
    mobileDev:["Android","Hybrid", "Apps", "iOS", "Windows", "Phone"]};

    

    useEffect(() => {
        setOptionValue(props.techStack);
        if(props.techStack !== ""){
            setSkills(skillsObj[props.techStack]);
        }
        setinputSkills(props.skillsArr);
        setproficiencyValue(props.proficiencyValues);
    },[props.techStack, props.skillsArr, props.proficiencyValues]);
    

    const handleChange = (e) =>{
        if (e.currentTarget.value !== ""){
            setOptionValue(e.currentTarget.value);
        }
    }

    const handleinputSkillsAndProficiency = (e) => {
        let value = e.target.value;
        let obj = {};
        obj[e.target.name] = value;
        
        if (e.target.className === "profOpt"){
            setproficiencyValue({...inputProficiencyValues, ...obj});
        }
        else{
            setinputSkills({...inputSkills, ...obj}
                );
        }
    }
    const handleSkill = (skill) => {
        let inputs = document.getElementsByClassName('skill-inp');
        for(let input of inputs){
            if (input.value === ""){
                let obj = {};
                obj[input.name] = skill;
                input.value = skill;
                setinputSkills({...inputSkills, ...obj});
                break;
            }
        }
        let lengthOfinputSkills =  Object.keys(inputSkills).length;
        
        if (lengthOfinputSkills === 4){
            handleMoreButton();
        }
    }
    const handleDelete = (i)=>{
        if (inputSkills[i] !== undefined){
            let filteredSkills = {...inputSkills};
            delete filteredSkills[i];
            setinputSkills(filteredSkills);
        }
        if (inputProficiencyValues[i] !== undefined){
            let filteredValues = {...inputProficiencyValues};
            delete filteredValues[i];
            setproficiencyValue(filteredValues);
        }
        if (error.skillInputErr[i] !== undefined){
            let filteredSkillsError = {...error.skillInputErr};
            delete filteredSkillsError[i];
            setError({...error, skillInputErr: filteredSkillsError});
        }
        if (error.profErr[i] !== undefined){
            let filteredProfError = {...error.profErr};
            delete filteredProfError[i];
            setError({...error, profErr: filteredProfError});
        }
    }
    const handleMoreButton =()=> {
        setnumOfSkills(10);
    }
    // Componentdid update
    useEffect(() => {
        if(optionvalue !== ""){
            setSkills(skillsObj[optionvalue]);
        }
    },[optionvalue]);
    useEffect(() => {
        let lengthOfinputSkills =  Object.keys(inputSkills).length;
        if (lengthOfinputSkills>=5){
            handleMoreButton();
        }
        if(skills.length >0){
            let inputTobeFiltered = Object.values(inputSkills)
            let filteredSkills = skills.filter((skillTobeFiltered)=>{
                
                return !inputTobeFiltered.includes(skillTobeFiltered)
            });
            setSkills(filteredSkills)
        } 
    },[inputSkills])
    const handleSubmit = ()=>{
        let skillLength = Object.keys(inputSkills).length;
        let proficiencyLength = Object.keys(inputProficiencyValues).length;

        if (skillLength === 0 && proficiencyLength === 0){
            setError({eName:"One", one:{ errorValue:"Enter at least one skill"}});
            return;
        }
        let flagForError = 0;
        let profErr = {errorValue:"Select Proficiency"};
        for (let key in inputSkills){
            if  (inputProficiencyValues[key] === undefined){
                flagForError = 1;
                profErr[key] = true;
            }
        }
        let skillInputErr = {errorValue:"This field is required"};
        for (let key in inputProficiencyValues){
            if (inputSkills[key] === undefined){
                flagForError = 1;
                skillInputErr[key] = true;
            }
        }
        if (flagForError === 1){
            setError({eName:"",skillInputErr, profErr});    
            return ;
        }
        else{
            if (props.next === false){
                database.users.doc(currentUser.uid).update({
                    userSkills: inputSkills,
                    userProficiencies: inputProficiencyValues,
                    userTechStack: optionvalue
                })
            }
            else{
                database.users.doc(currentUser.uid).update({
                    partnerSkills: inputSkills,
                    partnerProficiencies: inputProficiencyValues,
                    partnerTechStack: optionvalue
                })
            }
        }

        props.sendDataToReducer(inputSkills, inputProficiencyValues);

        if(props.next === true){
            history.push("/");
        }
        props.setNext(!props.next);
    }
    const handlePrevClick = () => {
        props.setNext(false);
        setError({eName:"", one:{errorValue:""}, skillInputErr:{}, profErr:{}});
    }
    return (
        <>
        <div className="role-container">
            {props.next === false
                ?
                    <label htmlFor="preferred_role">Select your preferred role:</label>
                :   <label htmlFor="preferred_role">Select partner preferred role:</label>
            }
            <select id="preferred_role" value={optionvalue} onChange={handleChange}>
                <option value=""></option>
                <optgroup label="Software Engineering">
                    <option value="fullStack" >Full-Stack Development</option>
                    <option value="frontEnd" >Front Development</option>
                    <option value="backEnd" >Backend Development</option>
                    <option value="mobileDev">Mobile Development</option>
                    <option value="betDev">Big Data / EWH / ETL</option>
                    <option value="blockChainDev">Blockchain Development</option>
                    <option value="testDev">QA / SDET</option>
                </optgroup>
            </select>
        </div>
        <div className="skills-detalis-container">
            <p>Add up to 10 skills and how much expertise you have with each. For best results, click relevant skills below to add them:</p>
            {optionvalue === ""
                ? <></>
                : <>
                    <div className="primary-skills" >
                        <ul className="tags">{
                            skills.map((skill, index) =>{
                                return <li  key={index}>
                                    <button onClick={()=>handleSkill(skill)}>{skill}</button>
                                </li>
                            })
                            }
                        </ul>
                    </div>
                    <div className="input-skills-container">
                        {Array.from(Array(numOfSkills), (e, i)=>{
                            
                            let skillValue = inputSkills[i] === undefined ? "" : inputSkills[i];
                            let currProficiencyValue = inputProficiencyValues[i] === undefined ? "0": inputProficiencyValues[i]; 
                            return <div className="skill-row" key={i}>
                                <div className="skill-col">
                                    <input type="text" name={i} required="required" className="skill-inp" value={skillValue} onChange={handleinputSkillsAndProficiency} placeholder="e.g. Java"/>
                                    {error.skillInputErr !== undefined
                                        ?
                                        error.skillInputErr[i] !== undefined 
                                                ?
                                                <div className="show-error">
                                                    {error.skillInputErr.errorValue}
                                                </div>
                                                : <></>
                                        :<></> 
                                    }
                                </div>

                                <div className="skill-col1 proficiency-container">
                                    
                                    <label htmlFor="proficiency"/>
                                    <select  name={i} className="profOpt" value={currProficiencyValue} onChange={handleinputSkillsAndProficiency} id="proficiency" >
                                        <option value={'0'} disabled>Select Proficiency</option>
                                        <option value="Beginner"  label="Beginner">Beginner</option>
                                        <option value="Intermediate"  label="Intermediate">Intermediate</option>
                                        <option value="Expert"  label="Expert">Expert</option>                                            
                                    </select>
                                    {error.profErr !== undefined
                                        ?
                                        error.profErr[i] !== undefined 
                                                ?
                                                <div className="show-error">
                                                    {error.profErr.errorValue}
                                                </div>
                                                : <></>
                                        :<></> 
                                    }
                                </div>

                                <div className="skill-col1 delete-container">
                                    <button onClick={()=> handleDelete(i)}>Delete</button>
                                </div>
                            </div>
                        })
                    }
                        {numOfSkills === 5 
                                ?  <div className="add-more-button">
                                        <button onClick={handleMoreButton}>Add more</button>
                                    </div> 
                                : <></>
                        }
                    </div>
                  </>
            }
        </div>
        {error.eName === "One" 
            ?
            <div className="show-error">
                {error.one.errorValue}
            </div>
            :<></>
        }
        <div>
            {
                props.next === true 
                ?
                <button onClick={handlePrevClick}>Prev</button>
                :  
                <></>
            }
            <button onClick={handleSubmit} className="next-button">Next</button>
        </div>
        </>
    )
}

export default Skills;
