import React from "react";
import { Grid, Box } from "@mui/material";
import loginImage from "../img/undraw_login_re_4vu2.svg";
import loginLogoImage from "../img/logo.png";
import LoginForm from "../Components/LoginForm";

export default function LoginScreen(){
    return(
        <Grid container className="loginGrid">
            <Grid item lg={6} className="leftLoginGrid" display={{ xs: "none", sm: "none", md: "flex"}}>
                <Box className="leftLoginImageBox">
                    <img src={loginImage} alt="login_job_image"/>
                </Box>
            </Grid>
            <Grid item xs={12} lg={6} className="rightLoginGrid">
                <Box className="rightParentLoginBox">
                    <Box className="rightChildImageLoginBox">
                        <img src={loginLogoImage} alt="login_job_logo"/>
                    </Box>
                    <Box className="rightChildFormLoginBox">
                        <LoginForm/>
                    </Box>
                    <Box className="rightChildSignUpBox">
                        <p>Don't have an account yet? <a href="/register">Sign Up</a></p>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}