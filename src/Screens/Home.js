import React, {useEffect, useState} from "react";
import { Grid,Card,CardContent,CardActions,Button,Modal,Box,Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import CardJob from "../Components/CardJob";
import HomeAppBar from "../Components/HomeAppBar";
import cardAvatarDefault from '../img/card_avatar_default.png';
import axios from "axios";
import { AutoGraph } from "@mui/icons-material";
import AuthService from "../Services/AuthService";

export const Auth = new AuthService();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function HomeScreen(){
    const [list, setList] = useState([]);
    const [myName,setMyName] = useState(Auth.userNameFromToken())
    const [mySkills,setMySkills] = useState(null)
    const [buttonClicked,setButtonClicked] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        axios.get("https://83a6-147-83-201-132.eu.ngrok.io/api/offers")
            .then(res => {
                setList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const openModal = async ()=>{
        let res = await axios("https://83a6-147-83-201-132.eu.ngrok.io/api/users/me/skills", {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            }
        })
        setMySkills(res.data)
        handleOpen()
    }

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

        <React.Fragment>
            <HomeAppBar/>
            <Grid container style={{padding:"20px"}}>
                <Grid item xs={12} lg={4} className="homeOfferCardJobs">
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
                <Grid item xs={12} lg={2} style={{display:"flex",flexDirection:"column",justifyContent:"space-between",padding: "1rem 1rem 1.5rem 1rem"}}>
                    <Card sx={{ minWidth: 275}}>
                        <CardContent style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <img style={{width:"50%",borderRadius:"50%"}} src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"></img>
                            <Typography variant="h4" >{myName}</Typography>
                        </CardContent>
                        <CardActions style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button onClick={openModal} size="large">Edit my skills</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ minWidth: 275,marginTop:"40px"}}>
                        <CardContent style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                            <h2>Your most wanted skills</h2>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between", width:"100%"}}>
                                <p>REACT.js</p>
                                <div style={{width:"80%",height:"20px",borderRadius:"20px",backgroundColor:"lightgray"}}>
                                    <div style={{width:"80%",height:"20px",backgroundColor:"#167db7",borderRadius:"20px"}}/>
                                </div>
                                <p>JAVA</p>
                                <div style={{width:"80%",height:"20px",borderRadius:"20px",backgroundColor:"lightgray"}}>
                                    <div style={{width:"70%",height:"20px",backgroundColor:"#167db7",borderRadius:"20px"}}/>
                                </div>
                                <p>mySQL</p>
                                <div style={{width:"80%",height:"20px",borderRadius:"20px",backgroundColor:"lightgray"}}>
                                    <div style={{width:"50%",height:"20px",backgroundColor:"#167db7",borderRadius:"20px"}}/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275,marginTop:"40px"}}>
                        <CardContent style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <h2 style={{textAlign:"center"}}>What should I learn or improve ?</h2>
                            <AutoGraph fontSize="large"/>
                        </CardContent>
                        <CardActions style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button size="large">See more</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Edit your skills
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {mySkills}
                </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    )
}