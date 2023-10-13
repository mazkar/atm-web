/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Box } from '@material-ui/core';
import {
  LoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import polyline from "@mapbox/polyline";
import { Point } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { ContentTab, ContentTabs, TabPanelNoPadding } from '../../../../../../components/MaterialTabs';
import constants from "../../../../../../helpers/constants";
import SelectedMarker from "../../../../../../assets/icons/general/map-location-selected.svg";
import { ChkyButtons } from '../../../../../../components';
import AtmSekitar from './AtmSekitar';
import NearMarker from "../../../../../../assets/icons/general/map-location.svg";

const useStyles = makeStyles({
  maps: {
    overflow: "scroll",
    height: "65vh",
    width: "100%",
  },
});

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    "aria-controls": `content-tabpanel-${index}`,
  };
}

function ContentNearAtm(props) {
  const classes = useStyles();
  const {position, quotaBI, dataAtmSekitar, onNext} = props;

  const [valueTab, setValueTab] = useState(0);
  const [showLabelMarker, setShowLabelMarker] = useState(true);
  const [routePolyline, setRoutePolyline] = useState('');
  
  // ACTION untuk merubah route berdasarkan titik atm sekitar yg di klik
  function decodePolyline(poly) {
    const encodedRoute = poly || '';
    const decodedRoute = polyline.decode(encodedRoute);
    // console.log('~ decodedRoute', decodedRoute)
    const newroute = decodedRoute.map((item, index) => {
      const coord = {
        lat: item[0],
        lng: item[1],
      };
      return coord;
    });
    setRoutePolyline(newroute);
  }

  // SET Polyline yg pertama saat dataAtmSekitar berubah 
  useEffect(() => {
    // console.log("+++ dataAtmSekitar",dataAtmSekitar);
    if(dataAtmSekitar.length > 0){
      decodePolyline(dataAtmSekitar[0].polyline);
    }
  }, [dataAtmSekitar]);

  return (
    <div>
      <div style={{padding: "10px 20px"}}>
        <Typography style={{ fontSize: "18px", fontWeight: 500 }} >
          Quota BI Area Ini:
        </Typography>
        <Typography
          style={{
            fontSize: "32px",
            fontWeight: 400,
          }}
        >
          {quotaBI}
        </Typography>
      </div>
      <ContentTabs
        value={valueTab}
        onChange={(event, newValueTab)=>setValueTab(newValueTab)}
        aria-label="simple tabs example"
      >
        <ContentTab label="Lokasi" {...a11yProps(0)} />
        <ContentTab label="ATM Sekitar" {...a11yProps(1)} />
      </ContentTabs>
      {/* SECTION TAB PANEL */}
      <TabPanelNoPadding value={valueTab} index={0}>
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
              }}
              center={position}
              zoom={13}
              options={{
                streetViewControl: false,
                draggable: true, // make map draggable
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: true, // allow scale controle
                scrollwheel: false, // allow scroll wheel
              }}
            >
              <Marker
                position={position}
                onClick={() => {
                  setShowLabelMarker(!showLabelMarker);
                }}
                icon={{
                  url: SelectedMarker,
                  anchor: new Point(20, 20),
                }}
              >
                {showLabelMarker ? (
                  <InfoWindow
                    onCloseClick={() =>
                      setShowLabelMarker(!showLabelMarker)
                    }
                  >
                    <div>Your Location</div>
                  </InfoWindow>
                ) : null}
                {dataAtmSekitar.map((item, index)=>{
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(item.latitude),
                        lng: parseFloat(item.longitude),
                      }}
                      onClick={() => {
                        decodePolyline(item.polyline);
                      }}
                      icon={{
                        url: NearMarker,
                        anchor: new Point(20, 20),
                      }}
                    >
                      <InfoWindow>
                        <div>{item.locationName}</div>
                      </InfoWindow>
                    </Marker>
                  );
                })}
                <Polyline
                  path={routePolyline}
                  options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                  }}
                />
              </Marker>
            </GoogleMap>
          </LoadScript>
        </div>
      </TabPanelNoPadding>
      <TabPanelNoPadding value={valueTab} index={1} style={{padding: "10px 20px"}}>
        <AtmSekitar data={dataAtmSekitar} />
      </TabPanelNoPadding>
      <Grid container justify="space-between" style={{padding: 20, marginTop: 35}}>
        <Grid item>
          <ChkyButtons buttonType="redOutlined" onClick={()=>window.location.assign('/site-management/progress-list')}>Cancel</ChkyButtons>
        </Grid>
        <Grid item>
          <ChkyButtons onClick={onNext}>Save & Next</ChkyButtons>
        </Grid>
      </Grid>
    </div>
  );
}

ContentNearAtm.propTypes = {
  position: PropTypes.object.isRequired,
  dataAtmSekitar: PropTypes.array.isRequired,
  quotaBI: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default ContentNearAtm;

