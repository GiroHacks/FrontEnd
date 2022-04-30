import React from "react";

import {Box, Card, CardContent, Avatar, Grid} from '@mui/material';
import cardAvatarDefault from '../img/card_avatar_default.png';

export default function CardInfo(props){
    const {offer} = props;
    return(
        <Box>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Grid container>
                            <Grid container className="cardInfoContainer">
                                <Grid item xs={12} lg={2}>
                                    <Avatar src={cardAvatarDefault} variant="rounded"/>
                                </Grid>
                                <Grid item xs={12} lg={10}>
                                    <h3>{offer.job_title}</h3><br></br>
                                </Grid>
                                <Grid item xs={12} className="cardInfoDescription">
                                    <h3>Descripción:</h3>
                                    <span>{offer.description}</span>
                                </Grid>
                                {(offer.requirements !== undefined) &&(
                                    <Grid item xs={12} className="cardInfoDescription">
                                        <h3>Requisitos:</h3>
                                        <span>{offer.requirements}</span>
                                    </Grid>
                                )}
                                {(offer.min_salary !== undefined) && (offer.max_salary !== undefined) && (
                                    <Grid item xs={12} className="cardInfoDescription">
                                        <h3>Salario:</h3>
                                        <span>{offer.min_salary}€ - {offer.max_salary}€</span>
                                    </Grid>
                                )}
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