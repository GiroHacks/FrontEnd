import * as React from 'react';
import { useState } from 'react';
import {AppBar, Box, Toolbar, IconButton, Badge, MenuItem, Menu,ListItemIcon,ListItemText} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '../img/logo.png';
import AuthService from '../Services/AuthService';
import Swal from "sweetalert2";
import { Logout, ModeEdit } from '@mui/icons-material';


export const Auth = new AuthService();

export default function PrimarySearchAppBar() {

  const logoutAndExit = async ()=>{
    let response = await Swal.fire({
        title: 'Are you sure yo want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
    if (response.isConfirmed){
      Auth.logout()
      window.location="/"
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#FFF' }}>
        <Toolbar>
          <img src={Logo} alt="logo" width="50" height="50" />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: '#a7a7a7' }}
            >
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              sx={{ color: '#d32f2f' }}
              onClick={logoutAndExit}
            >
              <Logout/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{ color: '#a7a7a7' }}
            >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              sx={{ color: '#d32f2f' }}
              onClick={logoutAndExit}
            >
              <Logout/>
            </IconButton>
        
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}