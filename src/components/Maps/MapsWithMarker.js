import React, { useState } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import {MarkerWithLabel} from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import { compose } from 'recompose';

const defaultLoc = {
  lat: -6.2732641,
  lng: 106.7239952,
};

const MapWithMarker = compose(
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={props.zoom || 8}
    // defaultCenter={props.center || defaultLoc}
    center={props.center || defaultLoc}
    onClick={e => {
      props.onClickMap({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      })
    }}
  >
    {/* {props.hideYourLoc ? null : (
      <Marker
        position={props.center}
      />
    )} */}
   
    {props.markers
      ? props.markers.map((atm, index) => {
          return <Marker position={atm} />;
        })
      : null}
  </GoogleMap>
));

export default MapWithMarker;
