import React from "react";
import { FormControl, TextField, Button } from "@mui/material";

export default function LoginForm(){
    return(
        <FormControl className="formLogin" sx={{ '& .MuiTextField-root': { m: 1 }, '& button': { m: 1, height: '3rem' }}}>
            <TextField id="username" type="username" label="Username" variant="outlined" />
            <TextField id="password" type="password" label="Password" variant="outlined" />
            <Button variant="contained" color="primary">Login</Button>
        </FormControl>
    )
}