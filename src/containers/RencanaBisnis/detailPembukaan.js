import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import TitleAndSearch from '../../components/Title/TitleAndSearch';
import Constants from '../../helpers/constants';

const useStyles = makeStyles({
  root: {
    padding: '30px 50px 20px 30px',
  },
});

function detailPembukaan(props) {
  const classes = useStyles();
  const center = {
    lat: -7.8289701,
    lng: 110.3776528
  };
  
  const position = {
    lat: -7.8289701,
    lng: 110.3776528
  };
  
  const onLoad = marker => {
    console.log('marker: ', marker);
  };
  return (
    <div className={classes.root}>
      <TitleAndSearch
        title="Detail Pembukaan"
        searchPlaceholder="Pencarian berdasarkan lokasi atau ATM ID"
      />
      <Typography>Detail Rencana Bisnis</Typography>
      <Grid container>
        <LoadScript
          googleMapsApiKey={Constants.API_MAP_KEY}
        >
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              width: "100%",
              height: "100vh",
            }}
            zoom={15}
            center={center}
          >
            <Marker
              onLoad={onLoad}
              position={position}
            />
          </GoogleMap>
        </LoadScript>
      </Grid>
      
    </div>
  );
}

detailPembukaan.propTypes = {

};

export default detailPembukaan;

// googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${Constants.API_MAP_KEY}`}