import { Grid } from "@mui/material";
import React, { useState } from "react";
import HomeAppBar from "../Components/HomeAppBar"
import { ListItem, ListItemIcon, ListItemText,Divider,List,Box,Typography } from "@mui/material";
import {PieChartOutline,StackedBarChart} from "@mui/icons-material"
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";

export default function Dashboard(){
    const [navClicked,setNavClicked] = useState(0)
    return(
        <React.Fragment>
            <HomeAppBar/>
            <Grid container>
                <Box
                    style={{width:"20%",backgroundColor:"#167db7",height:"93.3vh"}}
                    role="presentation"
                    >
                    <List style={{color:"white",marginTop:"30px"}}>
                        {['Valuable skills for you to learn', 'Most Wanted Skills'].map((text, index) => (
                        <ListItem button key={text} onClick={()=>setNavClicked(index)}>
                            <ListItemIcon>
                            {index % 2 === 0 ? <StackedBarChart fontSize="large" style={{color:"white"}} /> : <PieChartOutline fontSize="large" style={{color:"white"}} />}
                            </ListItemIcon>
                            <Typography variant="h6" style={{ color: '#FFFFFF' }}>{text}</Typography>
                        </ListItem>
                        ))}
                    </List>
                </Box>
                {
                    navClicked===0 ?(<BarChart/>):(<PieChart/>)
                }
                
            </Grid>
        </React.Fragment>
    )
}