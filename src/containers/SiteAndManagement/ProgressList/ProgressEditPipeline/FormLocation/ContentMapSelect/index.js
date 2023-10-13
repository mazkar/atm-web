/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
import constants from "../../../../../../helpers/constants";

const useStyles = makeStyles({
  maps: {
    overflow: "scroll",
    height: "85vh",
    width: "100%",
  },
});

function ContentMapSelect(props) {
  const classes = useStyles();
  const {position, onClickPoint} = props;
  return (
    <div className={classes.maps}>
      <LoadScript
        googleMapsApiKey={constants.API_MAP_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            // height: "47.2vh",
          }}
          center={position}
          zoom={8}
          options={{
            streetViewControl: false,
            draggable: true, // make map draggable
            keyboardShortcuts: false, // disable keyboard shortcuts
            scaleControl: true, // allow scale controle
            scrollwheel: false, // allow scroll wheel
            fullscreenControlOptions: {
              position: 10
            } 
          }}
          onClick={(e)=>onClickPoint(e)}
        >
          <Marker
            position={position}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

ContentMapSelect.propTypes = {
  position: PropTypes.object.isRequired,
  onClickPoint: PropTypes.func.isRequired,
};

export default ContentMapSelect;

