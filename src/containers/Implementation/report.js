/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import constants from '../../helpers/constants';
import sudirmanAtmImage from '../../assets/images/atm-1.png';
import paperClip from '../../assets/icons/siab/paperclip-white.png';
import Timeline from '../../components/Timeline/implementation';
import InputCustom from '../../components/Form/InputCustom';

const useStyles = makeStyles({
  root: {
    padding: '10px 20px 10px 20px',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  gridButton: {
    '& .MuiButton-root': {
      height: 40,
      width: 140,
      textTransform: 'capitalize',
      borderRadius: 10,
    },
    '& .MuiButton-text': {
      color: '#FFF',
      backgroundColor: '#DC241F',
      '&:hover': {
        opacity: 0.8,
      },
    },
    '& .MuiButton-outlined': {
      color: '#DC241F',
      backgroundColor: '#FFFFFF',
      border: '1px solid #DC241F',
      '&:hover': {
        opacity: 0.8,
      },
    },
  },
  gridButtonTerminate: {
    '& .MuiButton-root': {
      height: 40,
      textTransform: 'capitalize',
      borderRadius: 10,
    },
    '& .MuiButton-text': {
      color: '#FFF',
      backgroundColor: '#FFB443',
      '&:hover': {
        opacity: 0.8,
      },
    },
  },
  mapContainer: {
    width: '100%',
    height: 270,
  },
  maps: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: constants.color.graySoft,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  imageAtm: {
    height: 120,
    width: 120,
    objectFit: 'fill',
  },
});

const Overview = () => {
  const classes = useStyles();

  const position = [-7.8289701, 110.3776528];

  const imageData = [
    { src: sudirmanAtmImage },
    { src: sudirmanAtmImage },
    { src: sudirmanAtmImage },
    { src: sudirmanAtmImage },
  ];
  const dataNego = [
    {
      title: 'ATM Instalation',
      price: '',
      date: '20 July 2020',
      status: 'Complete',
      position: '',
    },
    {
      title: 'Input Data',
      price: '',
      date: '20 July 2020',
      status: 'Inprogress',
      position: '',
    },
    {
      title: 'Activation',
      price: '',
      date: '20 July 2020',
      status: 'Waiting',
      position: 'end',
    },
  ];

  const history = useHistory();

  return (
    <div className="content_container" style={{ paddingBottom: 65 }}>
      <Paper elevation={3} className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <Typography style={{ fontSize: 24 }}>Activation</Typography>
            <Box className={classes.mapContainer}>
              <Map
                className={classes.maps}
                center={position}
                zoom={7}
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
            <Grid container spacing={1} style={{ marginTop: 20 }}>
              {imageData.map((image) => {
                return (
                  <Grid item xs={3}>
                    <img className={classes.imageAtm} src={image.src} alt="" />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item xs={4}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#000',
                    marginBottom: 5,
                  }}
                >
                  Vendor Name :
                </Typography>
                <Typography>Vendor</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#000',
                    marginBottom: 5,
                  }}
                >
                  ATM Type :
                </Typography>
                <Typography>BCL-502</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#000',
                    marginBottom: 5,
                  }}
                >
                  ATM ID :
                </Typography>
                <Typography>102928</Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }}>
              <Typography style={{ width: '100%' }}>
                Document Legalitas
              </Typography>

              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <img
                  src={paperClip}
                  style={{ width: 18, height: 18, marginRight: 10 }}
                  alt=""
                />
                <Typography style={{ color: '#DC241F', cursor: 'pointer' }}>
                  Document - 1.wordx
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} style={{ marginTop: 10, marginBottom: 10 }}>
            <Typography style={{ fontSize: 24, paddingLeft: 40 }}>
              Activation Process
            </Typography>
            <div>
              <Timeline dataNego={dataNego} />
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          justify="space-between"
          style={{ marginTop: 10 }}
        >
          <Grid item xs={6} className={classes.gridButton}>
            <Button variant="outlined" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            className={classes.gridButton}
            style={{ textAlign: 'right' }}
          >
            <Button color="redHard">Edit</Button>
          </Grid>
        </Grid>
      </Paper>

      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Overview))
);
