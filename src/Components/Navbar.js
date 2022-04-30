import React from "react";
import { AppBar,Container, Toolbar, Typography } from "@mui/material";
import logo from "../Images/logo.png"

export default function NavBar(){
    return(
        <AppBar position="fixed" className="appBar">
            <div className="appBarContainer">
                <img style={{width:"200px"}} src={logo}></img>
            </div>
            
        </AppBar>
    )
}