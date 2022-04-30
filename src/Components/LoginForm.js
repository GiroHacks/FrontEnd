import React, {useState} from "react";
import { FormControl, TextField, Button } from "@mui/material"
import AuthService from "../Services/AuthService";

export default function LoginForm(){

    const authHandler = async (datos) => {
        const auth = new AuthService();
        const response = await auth.login(datos.email, datos.password);
        if(response === 200){
            window.location.href = "/home";
        }
    }

    const [datos, setDatos] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        authHandler(datos);
    }

    return(
        <FormControl className="formLogin" sx={{ '& .MuiTextField-root': { m: 1 }, '& button': { m: 1, height: '3rem' }}}>
            <TextField id="email" type="email" label="Email" variant="outlined" name="email" onChange={handleInputChange} />
            <TextField id="password" type="password" label="Password" variant="outlined" name="password" onChange={handleInputChange} />
            <Button variant="contained" type="submit" color="primary" onClick={enviarDatos}>Login</Button>
        </FormControl>
    )
}