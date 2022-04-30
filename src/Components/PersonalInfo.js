import { Container, TextField, IconButton, Alert, AlertTitle } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";


export default function PersonalInfo(props){

    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [birthDate,setBirthDate] = useState(undefined)
    const [submited,setSubmited] = useState(false)
    const [emailExists, setEmailExists] = useState(false)

    const sendDataAndIncrease = async ()=>{
        setSubmited(true)
        if(firstName!=="" && lastName!=="" && email!=="" && phoneNum!=="" && birthDate!==undefined){
            try{
                let res = await axios.post("http://100.89.34.13:8080/api/checkemail",{"email":email})
                if(res.status===200){
                    setEmailExists(false)
                    const userObject={
                        firstName : firstName,
                        lastName : lastName,
                        email : email,
                        phoneNumber : phoneNum,
                        birthDate : birthDate
                    }
                    props.sendData(userObject)
                    props.increase()
                }
                else{
                    setEmailExists(true)
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'error',
                        title: 'This email already exist!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } 
            }catch(e){
                setEmailExists(true)
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'This email already exist!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    return(
        <div className="formContainer">
            <h2 style={{color:"#167db7"}} >PERSONAL INFORMATION</h2>
            <div className="horizontalFlex">
                <TextField error={firstName==="" && submited} value={firstName} onChange={(event)=>setFirstName(event.target.value)} style={{width:"47%"}}  label="First Name*" variant="outlined" />
                <TextField error={lastName==="" && submited} value={lastName} onChange={(event)=>setLastName(event.target.value)} style={{width:"47%"}}  label="Last Name*" variant="outlined" />
            </div>
            <TextField error={(email==="" || emailExists) && submited} value={email} onChange={(event)=>setEmail(event.target.value)} style={{marginTop:"30px"}} type="email" fullWidth  label="Email*" variant="outlined" />
            <div className="horizontalFlex" style={{marginTop:"30px"}}>
                <TextField error={phoneNum==="" && submited}  value={phoneNum} onChange={(event)=>setPhoneNum(event.target.value)} style={{width:"47%"}}  label="Phone number*" variant="outlined" />
                <TextField error={birthDate===undefined && submited} value={birthDate} onChange={(event)=>setBirthDate(event.target.value)} type="date" style={{width:"47%"}} variant="outlined" />
            </div>
            <div className="horizontalFlexEnd" style={{marginTop:"30px"}}>
                <IconButton onClick={sendDataAndIncrease} aria-label="next" size="large">
                    <ArrowForward fontSize="inherit" />
                </IconButton>
            </div>
        </div>
    )
}