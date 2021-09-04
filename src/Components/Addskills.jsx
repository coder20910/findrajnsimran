import React, {useEffect, useState, useContext} from 'react';
import {connect} from 'react-redux';

import {database} from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import "./Addskills.css"; 

function Addskills() {
    let {currentUser} = useContext(AuthContext);

    const [optionvalue, setOptionValue] = useState("");
    const [numOfSkills, setnumOfSkills] = useState(5);

    const [skills, setSkills] = useState([]);
    const [inputSkill, setInputSkill] = useState([]);
    const [proficiencyValues, setproficiencyValue] = useState([]);


    let skillsObj ={fullStack:[".NET", "Algorithms", "C","Android", "C++","Golang", "iOS", "Java",
    "JavaScript","PHP","Python","Ruby on Rails"],
    backEnd:[".NET", "Algorithms", "Big Data", "C", "C++", "Data Structures", "Golang",
    "Java","Node.js", "PHP", "Python", "Ruby", "Scala"], 
    frontEnd:["React", "Javascript", "Vue", "Angular", "HTML", "CSS"],
    mobileDev:["Android","Hybrid", "Apps", "iOS", "Windows", "Phone"]};

    const handleChange = (e) =>{
        if (e.currentTarget.value !== ""){
            setOptionValue(e.currentTarget.value);
        }
    }

    const handleInputSkillAndProficiency = (e) => {
        let value = e.target.value;
        let obj = {};
        obj[e.target.name] = value;
        
        if (e.target.className === "profOpt"){
            setproficiencyValue({...proficiencyValues, ...obj});
        }
        else{
            setInputSkill({...inputSkill, ...obj});
        }
    }
    const handleSkill = (skill) => {
        let inputs = document.getElementsByClassName('skill-inp');
        for(let input of inputs){
            if (input.value === ""){
                let obj = {};
                obj[input.name] = skill;
                input.value = skill;
                setInputSkill({...inputSkill, ...obj});
                break;
            }
        }
        let lengthOfInputSkill = 0;

        for(let i in inputSkill){
            lengthOfInputSkill++;
        }
        
        if (lengthOfInputSkill === 4){
            handleMoreButton();
        }
        let filteredSkills = skills.filter((objSkill)=>{
            return objSkill !== skill;
        })
        setSkills(filteredSkills);
        
    }
    const handleDelete = (i)=>{
        if (inputSkill[i] !== undefined){
            let filteredSkills = {...inputSkill};
            delete filteredSkills[i];
            setInputSkill(filteredSkills);
        }
        if (proficiencyValues[i] !== undefined){
            let filteredValues = {...proficiencyValues};
            delete filteredValues[i];
            setproficiencyValue(filteredValues);
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
    const handleSubmit = ()=>{
        
        if (Object.keys(inputSkill).length === 0 || Object.keys(proficiencyValues).length === 0 || Object.keys(inputSkill).length !==  Object.keys(proficiencyValues).length){
            alert("please enter atleast 1 skills");
            return;
        }
        database.posts.doc(currentUser.uid).set({
            skills: inputSkill,
            proficiency: proficiencyValues
        })
    }

    return (
        <>
        <div className="role-container">
            <label htmlFor="preferred_role">Select your preferred role:</label>
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
                                return <li key={index}>
                                    <button onClick={()=>handleSkill(skill)}>{skill}</button>
                                </li>
                            })
                            }
                        </ul>
                    </div>
                    <div className="input-skills-container">
                        {Array.from(Array(numOfSkills), (e, i)=>{
                            
                            let skillValue = inputSkill[i] === undefined ? "" : inputSkill[i];
                            let currProficiencyValue = proficiencyValues[i] === undefined ? "0": proficiencyValues[i]; 
                            
                            return <div className="skill-row" key={i}>
                                <div className="skill-col">
                                    <input type="text" name={i} className="skill-inp" value={skillValue} onChange={handleInputSkillAndProficiency} placeholder="e.g. Java"/>
                                </div>

                                <div className="skill-col1 proficiency-container">
                                    
                                    <label htmlFor="proficiency"/>
                                    <select  name={i} className="profOpt" value={currProficiencyValue} onChange={handleInputSkillAndProficiency} id="proficiency" >
                                           
                                        <option value={'0'} disabled>Select Proficiency</option>
                                        <option value="1"  label="Beginner">Beginner</option>
                                        <option value="2"  label="Intermediate">Intermediate</option>
                                        <option value="3"  label="Expert">Expert</option>                                            
                                    
                                    </select>
                                </div>

                                <div className="skill-col1 delete-container">
                                    <button onClick={()=> handleDelete(i)}>Delete</button>
                                </div>
                            </div>
                        })
                    }
                        {
                            numOfSkills === 5 
                                ?  <div className="add-more-button">
                                        <button onClick={handleMoreButton}>Add more</button>
                                    </div> 
                                : <></>
                        }
                    </div>
                  </>
            }
        </div>
        <div>
            <button onClick={handleSubmit}>Let's Go</button>
        </div>
        </>
    )
}
const mapStateToProps  = (store) =>{
    return store.POSTS;
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addSkillsToFireBase : (inputSkill, proficiencyValues) => dispatch({type:"ADD-DATA-TO-FIREBASE", payload:{inputSkill, proficiencyValues}})
//     }
// }
export default connect(mapStateToProps, null)(Addskills);
