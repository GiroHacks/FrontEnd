import React, {useEffect, useState} from "react";
import { Grid } from "@mui/material";
import CardJob from "../Components/CardJob";
import HomeAppBar from "../Components/HomeAppBar";
import axios from "axios";

export default function HomeScreen(){
    const [list, setList] = useState([]);

    useEffect(() => {
        axios({
          url: "http://66.70.178.146:8001/api/offers",
        })
          .then((response) => {
            setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [setList]);

    const renderCards = () => {
        return list.map(offer => {
            return <CardJob key={offer.id} offer={offer} />;
        });
    };

    return(
        <Grid container flexDirection="column" className="homeBody">
            <Grid item>
                <HomeAppBar />
            </Grid>
            <Grid item>
                <Grid item xs={12} lg={4} className="homeOfferCardJobs">
                    {renderCards()}
                </Grid>
                <Grid item xs={12} lg={6}>
                    
                </Grid>
                <Grid item xs={12} lg={2}>

                </Grid>
            </Grid>
        </Grid>
    )
}