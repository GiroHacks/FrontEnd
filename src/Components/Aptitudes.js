import { Container, TextField, IconButton,Autocomplete,Chip,Stack } from "@mui/material";
import { ArrowForward,ArrowBack } from "@mui/icons-material";
import React, { useEffect,useRef,useState } from "react";
import axios from "axios";


export default function Aptitudes(props){

    const [skills,setSkills] = useState(null)
    const [skillsOptions, setSkillsOptions] = useState([])

    const handleOnChangeSkillInput= async(event)=>{
        const options = {
            method: 'POST',
            url: 'http://100.89.34.13:8080/api/skills/find',
            headers: {'Content-Type': 'application/json'},
            data: {name: event.target.value}
        };
        let res = await axios.request(options)
        setSkillsOptions(res.data)
    }

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
                options={skillsOptions}
                id="tags-standard"
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={handleOnChangeSkillInput}
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