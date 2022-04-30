import React, {useEffect, useState} from "react";
import {Grid} from '@mui/material';
import CardJob from "../Components/CardJob";
import HomeAppBar from "../Components/HomeAppBar";
import axios from "axios";
import CardInfo from "../Components/CardInfo";

export default function HomeScreen(){
    const [list, setList] = useState([]);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    useState(() => {
        axios.get("http://100.89.34.13:8080/api/offers")
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

    useEffect(() => {}, [info]);

    const renderCards = () => {
        if (list.length > 0) {
            return list.map(offer => {
                return <CardJob key={offer.id} func={renderInfoCards(offer)} offer={offer}/>;
            });
        }else{
            return <div>No hay ofertas disponibles para tu perfil</div>;
        }
    };

    const renderInfoCards = (_offer) => {
        return () => {
            setInfo(list.find(offer => offer.id === _offer.id));
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
                    {info.id ? <CardInfo offer={info}/> : <div>No hay ofertas disponibles para tu perfil</div>}
                </Grid>
                <Grid item xs={12} sm={12} lg={2}>

                </Grid>
            </Grid>
        </Grid>
    )
}