import React, {useState} from "react";
import { FormControl, TextField, Button } from "@mui/material"
import AuthService from "../Services/AuthService";
import Swal from "sweetalert2";

export default function LoginForm(){
    const [notMatching,setNotMatching] = useState(false)


    const authHandler = async (datos) => {
        const auth = new AuthService();
        try{
            const response = await auth.login(datos.email, datos.password);
            if(response !== undefined){
                setNotMatching(false)
                window.location.href = "/home";
            }
            else{
                setNotMatching(true)
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: "Email or password doesn't match!",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }catch(e){
            setNotMatching(true)
            Swal.fire({
                position: 'bottom-end',
                icon: 'error',
                title: "Email or password doesn't match!",
                showConfirmButton: false,
                timer: 1500
            })
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
        <form className="formLogin" onSubmit={enviarDatos}>
            <FormControl className="formControlLogin" sx={{ '& .MuiTextField-root': { m: 1 }, '& button': { m: 1, height: '3rem' }}}>
                <TextField error={notMatching } id="email" type="email" label="Email" variant="outlined" name="email" onChange={handleInputChange} />
                <TextField error={notMatching } id="password" type="password" label="Password" variant="outlined" name="password" onChange={handleInputChange} />
                <Button variant="contained" type="submit" color="primary">Login</Button>
            </FormControl>
        </form>
    )
}