import React from "react";
import {Box, Card, CardContent, Avatar, Grid} from '@mui/material';
import cardAvatarDefault from '../img/card_avatar_default.png';

export default function CardJob(props){
    const {offer} = props;
    return (
        <Box>
          <Card variant="outlined" className="cardStyle">
          <React.Fragment>
            <CardContent>
                <Grid container>
                    <Grid container>
                        <Grid item xs={2}>
                            <Avatar src={cardAvatarDefault} variant="rounded"/>
                        </Grid>
                        <Grid item xs={10}>
                            {(window.innerWidth >= 768) && (
                                <a href="#" onClick={props.func} className="cardTitle">{offer.job_title}</a>)}
                            {(window.innerWidth < 768) && (
                                <a href="#" onClick={props.click} className="cardTitle">{offer.job_title}</a>
                            )}
                            <br></br>
                            <span className="cardDescription">{offer.description}</span>
                        </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} lg={2}>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </React.Fragment>
          </Card>
        </Box>
      );
}