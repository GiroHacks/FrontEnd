import { Container, TextField, IconButton,Autocomplete,Chip,Stack } from "@mui/material";
import { ArrowForward,ArrowBack } from "@mui/icons-material";
import React, { useEffect,useRef,useState } from "react";


export default function Aptitudes(props){

    const [skills,setSkills] = useState(null)

    const handleOnChange = (event, newValue)=>{
        setSkills(newValue)
    }

    const sendDataAndIncrease = ()=>{
        props.sendData(skills)
        props.increase()
    }
    return(
        <div className="formContainer">
            <h2 style={{color:"#167db7"}} >YOUR APTITUDES</h2>
            <Autocomplete
                fullWidth
                onChange={handleOnChange}
                multiple
                id="tags-standard"
                options={["Java","Haskell","C++","JavaScript"]}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Skill"
                    fullWidth
                />
                )}
            />
            <div className="horizontalFlexEnd" style={{marginTop:"30px"}}>
                <IconButton  onClick={sendDataAndIncrease} aria-label="next" size="large">
                    <ArrowForward fontSize="inherit" />
                </IconButton>
            </div>
            
        </div>
    )
}