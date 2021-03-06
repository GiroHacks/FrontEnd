import React, {useEffect, useRef, useState} from "react";
import { Grid,Card,CardContent,CardActions,Button,Modal,Box,Typography,Autocomplete,TextField,Link } from "@mui/material";
import CardJob from "../Components/CardJob";
import HomeAppBar from "../Components/HomeAppBar";
import axios from "axios";

import CardInfo from "../Components/CardInfo";
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
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
};

const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
};


export default function HomeScreen(){
    const [list, setList] = useState([]);
    const [top, setTop] = useState([]);
    const [myName] = useState(Auth.userNameFromToken())
    const [mySkills,setMySkills] = useState([])
    const [myJobs,setMyJobs] = useState([])
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [selectedImage, setSelectedImage] = useState(undefined)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    const [updateToggle,setUpdateToggle] = useState(false)
    const [skillsOptions, setSkillsOptions] = useState([])
    const [myJobDescription,setJobDescription] = useState("")

    const openModal = async () => {
        let res = await axios.get("http://100.89.34.13:8080/api/users/me/skills", {
            headers: {
                Authorization: localStorage.getItem("id_token"),
            }
        })
        setMySkills(res.data)
        handleOpen()
    }

    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        axios.get("http://100.89.34.13:8080/api/users/me/jobprofile",{
            headers: {
                Authorization: localStorage.getItem("id_token"),
            }
        }).then(res=>{
            setJobDescription(res.data[0])

        }).catch(err=>{
            console.log(err)
        })
    },[])

    useEffect(() => {
       axios.get("http://100.89.34.13:8080/api/offers", {
            headers: {
                Authorization: localStorage.getItem("id_token"),
            }
        }).then(res => {

            setList(res.data.offers);
            setTop(res.data.top);
            if (res.data.offers.length > 0) {
                setInfo(res.data.offers[0]);

            }
        })
        .catch(err => {
            console.log(err);
        });
    }, [updateToggle]);

    useEffect(() => {}, [info]);

    const renderCards = () => {
        if (list.length > 0) {
            return list.map(offer => {
                return <CardJob key={offer.id} func={renderInfoCards(offer)} click={modalForJob(offer)} offer={offer}/>;
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

    const modalForJob = (_offer) => {
        return () => {
            setMyJobs(_offer);
            setOpen3(true);
        }
    };

    const handleOnChange = (event,newValue)=>{
        setMySkills(newValue)
    }
    const handleOnChangeOptions = async(event)=>{
        const options = {
            method: 'POST',
            url: 'http://100.89.34.13:8080/api/skills/find',
            headers: {'Content-Type': 'application/json'},
            data: {name: event.target.value}
        };
        let res = await axios.request(options)
        setSkillsOptions(res.data)
    }

    const updateSkills = ()=>{
        console.log(mySkills)
        const options = {
            method: 'POST',
            url: 'http://100.89.34.13:8080/api/users/me/skills',
            headers: {
              'Content-Type': 'application/json',
              Authorization: Auth.getToken()
            },
            data: mySkills.map(s=>s.id)
        };
        axios.request(options).then(function (response) {
            setUpdateToggle(!updateToggle)
            handleClose()

        }).catch(function (error) {
            console.error(error);
        });
    }

    const imageChange = async (event)=>{
        const imageFile = event.target.files[0]
        const options = {
            method: 'POST',
            url: 'http://100.89.34.13:8080/api/users/me/image',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: Auth.getToken()
              },
            data: {image: imageFile}
        };
        await axios.request(options)
        setSelectedImage(imageFile)
        setOpen2(false)
        window.location.reload()
    }

    return(
        <React.Fragment>
            <HomeAppBar/>
            <Grid container style={{background: "#f3f3f3", minWidth: "100%", minHeight: "100%"}}>
                <Grid item xs={12} lg={4} className="homeOfferCardJobs">
                    {renderCards()}
                </Grid>
                <Grid id="info" item xs={12} lg={5} className="homeOfferCardJobs">
                    {info.id ? <CardInfo offer={info}/> : <div>No hay ofertas disponibles para tu perfil</div>}
                </Grid>
                <Grid item xs={12} lg={3} style={{ overflowY: "auto", maxHeight: "calc(100vh - 5rem)", flexDirection:"column", justifyContent:"space-between",padding: "1rem 1rem 1.5rem 1rem"}}>
                    <Card>
                        <CardContent style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <img className="profileImage" onClick={handleOpen2} style={{width:"50%",borderRadius:"50%"}} alt="profile" src={"http://100.89.34.13:8080/api/users/"+Auth.idFromToken()+"/image"}></img>
                            <Typography variant="h4" >{myName}</Typography>
                            <Typography variant="h6" >{myJobDescription}</Typography>
                        </CardContent>
                        <CardActions style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button onClick={openModal} size="large">Edit my skills</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ marginTop:"40px"}}>
                        <CardContent style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                            <h2>Your most wanted skills</h2>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"flex-end", width:"80%"}}>
                                <div style={{display:"flex",flexDirection:"column",width:"33%"}}>
                                    <Typography sx={{textAlign:"center"}} variant="h6">{top.length>=2?top[1]:""}</Typography>
                                    <div style={{backgroundColor:"#c1c1c1",height:"7vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>2??</div>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",width:"33%"}}>
                                    <Typography sx={{textAlign:"center"}} variant="h6">{top.length>=1?top[0]:""}</Typography>
                                    <div style={{backgroundColor:"#c1c1c1",height:"10vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>1??</div>
                                </div>
                                <div style={{display:"flex",flexDirection:"column",width:"33%"}}>
                                    <Typography sx={{textAlign:"center"}} variant="h6">{top.length>=3?top[2]:""}</Typography>
                                    <div style={{backgroundColor:"#c1c1c1",height:"5vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontWeight:"bold"}}>3??</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card sx={{ marginTop:"40px"}}>
                        <CardContent style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <h2 style={{textAlign:"center"}}>What should I learn or improve ?</h2>
                            <AutoGraph fontSize="large"/>
                        </CardContent>
                        <CardActions style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button size="large" onClick={()=>window.location = "/dashboard"}>See more</Button>
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
                    <Autocomplete
                        style={{marginTop:"20px"}}
                        fullWidth
                        onChange={handleOnChange}
                        multiple
                        id="tags-standard"
                        value={mySkills}
                        options={skillsOptions}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Skill"
                            onChange={handleOnChangeOptions}
                            fullWidth
                        />
                        )}
                    />
                    <Button onClick={updateSkills} style={{marginTop:"20px"}} size="large" variant="contained">SAVE</Button>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Edit your image
                    </Typography>
                    <img style={{width:"20%",borderRadius:"50%",marginTop:"10px"}} alt="profile" src={"http://100.89.34.13:8080/api/users/"+Auth.idFromToken()+"/image"}></img>
                    <input style={{fontSize:"1em"}} type="file" accept="image/jpeg" onChange={imageChange}></input>
                </Box>
            </Modal>

            <Modal
            open={open3}
            onClose={handleClose3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style3}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {myJobs.job_title}
                </Typography>
                <Typography id="modal-modal-description" className="modalDescription" sx={{ mt: 2 }}>
                {myJobs.description}
                </Typography>
            </Box>
            </Modal>
        </React.Fragment>
    )
}