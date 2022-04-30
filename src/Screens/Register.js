import React from "react";
import { useState,useEffect } from "react";
import { Grid, Step,Stepper,StepLabel, Button, Box,Alert,AlertTitle } from "@mui/material";
import personal_info from "../Images/personal_info.svg"
import skills_image from "../Images/skills_image.svg"
import password_image from "../Images/password_image.svg"
import NavBar from "../Components/Navbar";
import PersonalInfo from "../Components/PersonalInfo";
import Aptitudes from "../Components/Aptitudes";
import PasswordGenerator from "../Components/PasswordGenerator";
import axios from "axios";


const steps = [
    'Personal information',
    'Aptitudes',
    'Password generation',
];

export default function RegisterScreen(){

    const [stepCount,setStepCount] = useState(0);
    const [registerUser,setUserRegister] = useState(null)
    const [userSkills,setUserSkills] = useState(null)
    const [unexpectedError,setUnexpectedError] = useState(false)

    const increaseStepCount = () =>{
        setStepCount(stepCount+1)
    }
    const submitUser = async (password)=>{
        const postUser = {
            "email":registerUser.email,
            "password":password,
            "first_name":registerUser.firstName,
            "last_name":registerUser.lastName,
            "phone":registerUser.phoneNumber,
            "birthdate":registerUser.birthDate,
            "skills":userSkills
        }
        try{
            let res = await axios.post("http://66.70.178.146:8001/api/register",postUser)
            if(res.status===200){
                setUnexpectedError(false)
                console.log("user posted")
            }else{
                setUnexpectedError(true)
            }
        }catch(e){
            setUnexpectedError(true)
        }
    }
    const handleUserPersonalData=(personalData)=>{
        setUserRegister(personalData)
    }
    const handleUserSkills=(skills)=>{
        setUserSkills(skills)
    }

    return(
        <React.Fragment>
            <NavBar/>
            <Grid container className="parentGrid">
                <Grid item xs={12} sm={12} lg={6} className="leftGridItem" display={{xs:"none",sm:"none",md:"none",lg:"flex"}}>
                    <img className="rightImage" src={stepCount===0 ? personal_info : stepCount===1 ? skills_image : password_image }></img>
                </Grid>
                <Grid item xs={12} sm={12} lg={6} className="rightGridItem">
                    <Box className="stepperBox">
                        <Stepper activeStep={stepCount} alternativeLabel>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <div className="contentDiv">
                        {
                            stepCount===0?(
                                <PersonalInfo increase = {increaseStepCount} sendData={handleUserPersonalData}/>
                            ):stepCount===1?(
                                <Aptitudes increase = {increaseStepCount} sendData = {handleUserSkills} />
                            ):(
                                <PasswordGenerator submit = {submitUser}/>
                            )
                            
                        }
                        <Alert severity="error" style={!unexpectedError?{display:"none"}:{display:"block",width:"45%"}}>
                            <AlertTitle>Error</AlertTitle>
                            Some unexpected error ocurred on our server!
                        </Alert>
                    </div>
                    
                </Grid>
            </Grid>
        </React.Fragment>
        
    )
}