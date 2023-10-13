/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import {  makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Box, } from "@material-ui/core";
import { Map, Marker, ZoomControl, TileLayer, Popup} from "react-leaflet";
import L from 'leaflet';
import * as Colors from '../../../../assets/theme/colors';
import MarkerIcon from '../../../../assets/icons/duotone-red/map-marker-alt.svg';
import MarkerIconAtm from '../../../../assets/icons/duotone-red/map-location-1001.svg';


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: (props) => props.height,
  },
  maps: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.GraySoft,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  markerRounded: {
    display: 'inline-block',
    borderRadius: 80,
    border: '2px solid #DC241F',
    backgroundColor: '#FFF',
  },
  textMarker: {width: '100%', display: 'block', textAlign: 'center',lineHeight: '40px',},
});

// const dataDummy = [
//   {"loc": [-2.5991529,115.0864795], "population": 100, "province":"nama provinsi"},
//   {"loc": [-6.229728,106.6894317], "population": 90, "province":"nama provinsi"},
//   {"loc": [-6.9032739,107.5731171], "population": 50, "province":"nama provinsi"},
//   {"loc": [-0.936984, 100.388512], "population": 10, "province":"nama provinsi"},
//   {"loc": [-7.8722737,110.144093], "population": 19, "province":"nama provinsi"},
//   {"loc": [4.604278, 96.681133], "population": 5, "province":"nama provinsi"},
//   {"loc": [3.602965, 98.583843], "population": 9, "province":"nama provinsi"},
//   {"loc": [2.706189, 115.923852], "population": 23, "province":"nama provinsi"},
//   {"loc": [-5.154229, 119.425284], "population": 129, "province":"nama provinsi"},
//   {"loc": [-0.930766, 131.348304], "population": 19, "province":"nama provinsi"},
// ];

const LocationMaps = (props) => {
  const classes = useStyles(props);
  const { center, zoom, position, ...other} = props;
  // console.log(">>>+ POSITION",position);
  // console.log(">>>+ CENTER",center);
  const myIconAtm = new L.Icon({
    iconUrl: MarkerIconAtm,
    iconRetinaUrl: MarkerIconAtm,
    popupAnchor:  [-0, -0],
    iconSize: [45,45],     
  });
  return (
    <Box className={classes.root}>
      <Map
        className={classes.maps}
        center={center}
        zoom={zoom}
        zoomControl={false}
        scrollWheelZoom={false}
        {...other}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={myIconAtm} />
        {
          position.map((item, index)=>{
            const myIcon = new L.Icon({
              iconUrl: MarkerIcon,
              iconRetinaUrl: MarkerIcon,
              popupAnchor:  [-0, -0],
              iconSize: [32,45],     
            });
            return( 
              <Marker 
                key={index}
                position={item.loc}
                icon={myIcon}
              >
                  
                <Popup>
                  <b>{item.id} {item.name}</b>
                  <br/>
                  {item.distance /1000} Km
                </Popup>
              </Marker>
            );
            
          })
        }
        <ZoomControl position="bottomright" />

      </Map>
    </Box>
  );
};

LocationMaps.propTypes = {
  children: PropTypes.node,
  // height: PropTypes.string,
  center: PropTypes.array,
  zoom: PropTypes.number,
  position: PropTypes.array,
};

LocationMaps.defaultProps  = {
  height: 500,
  center: [-6.7271777,110.2458198],
  zoom: 7,
};

export default LocationMaps;
