import React, { useState } from "react";
import { TextField,IconButton,Button,Alert,AlertTitle } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function PasswordGenerator(props){

    const [password,setPassword] = useState("")
    const [confirmPass,setConfirmPass] = useState("")
    const [submited,setSubmited] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const sendDataAndSubmit=()=>{
        setSubmited(true)
        if(password===confirmPass){
            setPasswordsMatch(true)
            props.submit(password)
        }
        else{
            setPasswordsMatch(false)
            Swal.fire({
                position: 'bottom-end',
                icon: 'error',
                title: "Paswords doesn't match!",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return(
        <div className="formContainer">
            <h2 style={{color:"#167db7"}} >GENERATE YOUR PASSWORD</h2>
            <TextField error={password!=="" && submited} style={{marginTop:"30px"}} value={password} onChange={(event)=>setPassword(event.target.value)} type="password" fullWidth  label="Password*" variant="outlined" />
            <TextField error={confirmPass!=="" && submited} style={{marginTop:"30px"}} value={confirmPass} onChange={(event)=>setConfirmPass(event.target.value)} type="password" fullWidth  label="Confirm Password*" variant="outlined" />
            <div className="horizontalFlexEnd" style={{marginTop:"30px"}}>
                <Button variant="contained" onClick={sendDataAndSubmit}>SUBMIT</Button>
            </div>
            
        </div>
    )
}