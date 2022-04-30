import React from "react";
import { useState} from "react";
import { Grid, Step, Stepper, StepLabel, Box} from "@mui/material";
import personal_info from "../Images/personal_info.svg"
import skills_image from "../Images/skills_image.svg"
import password_image from "../Images/password_image.svg"
import NavBar from "../Components/Navbar";
import PersonalInfo from "../Components/PersonalInfo";
import Aptitudes from "../Components/Aptitudes";
import PasswordGenerator from "../Components/PasswordGenerator";
import axios from "axios";
import Swal from "sweetalert2";


const steps = [
    'Personal information',
    'Aptitudes',
    'Password generation',
];

export default function RegisterScreen(){

    const [stepCount,setStepCount] = useState(0);
    const [registerUser,setUserRegister] = useState(null)
    const [userSkills,setUserSkills] = useState(null)
    const [setUnexpectedError] = useState(false)

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
            let res = await axios.post("https://83a6-147-83-201-132.eu.ngrok.io/api/register",postUser)
            if(res.status===200){
                setUnexpectedError(false)
            }else{
                setUnexpectedError(true)
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'Unexpected server error!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }catch(e){
            setUnexpectedError(true)
            Swal.fire({
                position: 'bottom-end',
                icon: 'error',
                title: 'Unexpected server error!',
                showConfirmButton: false,
                timer: 1500
            })
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
                    <img className="rightImage" src={stepCount===0 ? personal_info : stepCount===1 ? skills_image : password_image } alt="skills_image"></img>
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
                    </div>
                    
                </Grid>
            </Grid>
        </React.Fragment>
        
    )
}