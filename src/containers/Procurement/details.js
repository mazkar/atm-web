/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import Button from "@material-ui/core/Button";
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import constants from '../../helpers/constants';
import sudirmanAtmImage from '../../assets/images/atm-1.png';
import paperClip from '../../assets/icons/siab/paperclip-white.png';
import Timeline from '../../components/Timeline';

import ModalDialogSubmit from './ModalDialogSubmit';
import ModalDialogTerminate from './ModalDialogTerminate';
import ModalDialogDeal from './ModalDialogDeal';

const useStyles = makeStyles({
  root: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  gridButton:{
    '& .MuiButton-root':{
      height:40,
      textTransform: 'capitalize',
      borderRadius: 10,
    },
    '& .MuiButton-text':{
      color: '#FFF',
      backgroundColor:'#DC241F',
      '&:hover': {
        opacity:0.8,
      },
    },
    '& .MuiButton-outlined':{
      color: '#DC241F',
      backgroundColor:'#FFFFFF',
      border: '1px solid #DC241F',
      '&:hover': {
        opacity:0.8,
      },
    },
  },
  gridButtonTerminate:{
    '& .MuiButton-root':{
      height:40,
      textTransform: 'capitalize',
      borderRadius: 10,
    },
    '& .MuiButton-text':{
      color: '#FFF',
      backgroundColor:'#FFB443',
      '&:hover': {
        opacity:0.8,
      },
    },
  },
  mapContainer:{
    width:'100%',
    height:270,
  },
  maps: {
    position: 'relative',
    height:'100%',
    width: '100%',
    backgroundColor: constants.color.graySoft,
    borderRadius:10,
    marginTop:10,
    marginBottom:10,
  },
  imageAtm:{
    height: 120,
    width:120,
    objectFit: 'fill',
  },
});

const Overview = () => {
  const classes = useStyles();

  const position = [-7.8289701, 110.3776528];

  const imageData=[{src: sudirmanAtmImage},{src: sudirmanAtmImage},{src: sudirmanAtmImage}];
  const infoPrice=[{info: "Quota BI :", price: "300.000.000"},{info: "GRID Analys : ", price: "300.000.000"},{info: "Penawaran :", price: "300.000.000"}];
  const dataNego=[
    {title: "First Negotiation", price: "Rp 30.000.000", date:"20 July 2020", status:"Failed"},
    {title: "Second Negotiation", price: "Rp 30.010.000", date:"20 July 2020", status:"Failed"},
    {title: "Third Negotiation", price: "Rp 30.020.000", date:"20 July 2020", status:"Failed"},
    {title: "Forth Negotiation", price: "Rp 30.030.000", date:"20 July 2020", status:"Complete"},
  ];

  const [openDialogSubmit, setOpenDialogSubmit] = React.useState(false);
  const handleOpenDialogSubmit = () => setOpenDialogSubmit(true);
  const handleCloseDialogSubmit = () => setOpenDialogSubmit(false);

  const [openDialogDeal, setOpenDialogDeal] = React.useState(false);
  const handleOpenDialogDeal = () => setOpenDialogDeal(true);
  const handleCloseDialogDeal= () => setOpenDialogDeal(false);

  const [openDialogTerminate, setOpenDialogTerminate] = React.useState(false);
  const handleOpenDialogTerminate = () => setOpenDialogTerminate(true);
  const handleCloseDialogTerminate= () => setOpenDialogTerminate(false);

  return (
    <div className="content_container" style={{paddingBottom:65}}>
      <Paper elevation={3} className={classes.root}>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={7}>
            <Typography style={{fontSize:24}}>Procurement Detail #0029182</Typography>
            <Box className={classes.mapContainer}>
              <Map 
                className={classes.maps}
                center={position}
                zoom={80}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
                <ZoomControl position="topright" />
              </Map>
            </Box>
            <Grid container spacing={3} style={{marginTop:10}}>
              {infoPrice.map((info) => {
                return(
                  <Grid item xs={3}>
                    <Typography style={{fontWeight: 500}}>{info.info} </Typography>  
                    <Typography>{info.price} </Typography>  
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={3}>
              {imageData.map((image) => {
                return(
                  <Grid item xs={3}>
                    <img className={classes.imageAtm} src={image.src} alt=""/>
                  </Grid>
                );
              })}
            </Grid>
            <Grid container style={{marginTop:20}}>
              <Typography style={{width:'100%'}}>Document Legalitas</Typography>
              
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <img src={paperClip} style={{width:18, height:18, marginRight:10}} alt=""/>
                <Typography style={{color:'#DC241F', cursor: 'pointer'}}>Document - 1.wordx</Typography>
              </div>

            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} style={{marginTop:10, marginBottom:10}}>
            <Typography style={{fontSize:24, paddingLeft:40}}>Negotiation</Typography>
            <div>
              <Timeline dataNego={dataNego}/>
              
            </div>
            <Grid container spacing={3} justify="space-between" style={{marginTop:10}}>
              <Grid item xs={4} className={classes.gridButtonTerminate}>
                <Button onClick={handleOpenDialogTerminate}>Terminate</Button>
              </Grid>
              <Grid item xs={4} className={classes.gridButton}>
                <Button variant="outlined" onClick={handleOpenDialogDeal}>Deal</Button>
              </Grid>
              <Grid item xs={4} className={classes.gridButton}>
                <Button color="redHard" onClick={handleOpenDialogSubmit}>Submit New Quote</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* <FloatingChat/> */}

      <ModalDialogSubmit
        isOpen={openDialogSubmit}
        onClose={handleCloseDialogSubmit}
        onLeave={() => {
          handleCloseDialogSubmit();
        }}
      />

      <ModalDialogDeal
        isOpen={openDialogDeal}
        onClose={handleCloseDialogDeal}
        onLeave={() => {
          handleCloseDialogDeal();
        }}
      />

      <ModalDialogTerminate
        isOpen={openDialogTerminate}
        onClose={handleCloseDialogTerminate}
        onLeave={() => {
          handleCloseDialogTerminate();
        }}
      />
            
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Overview))
);
