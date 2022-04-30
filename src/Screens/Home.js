import React, {useEffect, useState} from "react";
import { Grid, Box, Card, CardContent, Avatar } from "@mui/material";
import CardJob from "../Components/CardJob";
import HomeAppBar from "../Components/HomeAppBar";
import cardAvatarDefault from '../img/card_avatar_default.png';
import axios from "axios";

export default function HomeScreen(){
    const [list, setList] = useState([]);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    useState(() => {
        axios.get("https://83a6-147-83-201-132.eu.ngrok.io/api/offers")
            .then(res => {
                setList(res.data);
                if (loading === false && res.data.length > 0) {
                    setInfo(res.data[0]);
                    setLoading(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log(info);
    }, [info]);

    const renderCards = () => {
        if (list.length > 0) {
            return list.map(offer => {
                return <CardJob key={offer.id} func={renderInfoCards(offer.id)} offer={offer}/>;
            });
        }else{
            return <div>No hay ofertas disponibles para tu perfil</div>;
        }
    };

    const renderInfoCards = (id) => {
        return () => {
            setInfo(list.find(offer => offer.id === id));
        }
    };


    return(
        <Grid container flexDirection="column" className="homeBody">
            <Grid item>
                <HomeAppBar />
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={6} lg={4} className="homeOfferCardJobs">
                    {renderCards()}
                </Grid>
                <Grid item xs={12} sm={6} lg={6} className="homeOfferCardJobs">
                    <Box>
                        <Card variant="outlined">
                            <React.Fragment>
                                <CardContent>
                                    <Grid container>
                                        <Grid container>
                                            <Grid item xs={12} lg={2}>
                                                <Avatar src={cardAvatarDefault} variant="rounded"/>
                                            </Grid>
                                            <Grid item xs={12} lg={10}>
                                                <span>{info.job_title}</span><br></br>
                                                <span>{info.description}</span>
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
                </Grid>
                <Grid item xs={12} sm={12} lg={2}>

                </Grid>
            </Grid>
        </Grid>
    )
}