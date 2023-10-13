import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { Map, Marker, TileLayer, ZoomControl, Popup } from "react-leaflet";
import L from "leaflet";
import * as Colors from "../../../assets/theme/colors";
// import MarkerAtm from "../../../assets/icons/general/marker.png";
import MarkerAtm from "../../../assets/icons/general/map-location-selected.svg";
import MarkerAtmNear from "../../../assets/icons/general/marker-red.png";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: (props) => props.height,
  },
  maps: {
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundColor: Colors.GraySoft,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
const myIconAtm = new L.Icon({
  iconUrl: MarkerAtm,
  iconRetinaUrl: MarkerAtm,
  popupAnchor: [-0, -0],
  iconSize: [40, 40],
});
const myIconAtmRed = new L.Icon({
  iconUrl: MarkerAtmNear,
  iconRetinaUrl: MarkerAtmNear,
  popupAnchor: [-0, -0],
  iconSize: [40, 40],
});
const ChkyLeafletMaps = (props) => {
  const classes = useStyles(props);
  const { disableTooltip, dataATM, position, zoom, ...other } = props;

  let tooltip = (name) => {
    if (!disableTooltip) {
      return <Popup>{name}</Popup>;
    } else {
      return null;
    }
  };

  return (
    <Box className={classes.root} onClick={(e) => props.onClickMap(e)}>
      <Map
        className={classes.maps}
        center={position}
        zoom={zoom}
        zoomControl={false}
        {...other}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={myIconAtm}>
          {tooltip("Your Location")}
        </Marker>
        {dataATM &&
          dataATM.map((item) => {
            // console.log("data atm", item);
            let lon = parseFloat(item.longitude);
            let lat = parseFloat(item.latitude);
            return (
              <Marker position={[lat, lon]} icon={myIconAtmRed}>
                {tooltip(item.locationName)}
              </Marker>
            );
          })}
        <ZoomControl position="bottomright" />
      </Map>
    </Box>
  );
};

ChkyLeafletMaps.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  height: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  position: PropTypes.array,
  zoom: PropTypes.number,
};

ChkyLeafletMaps.defaultProps = {
  height: 300,
  position: [-7.8289701, 110.3776528],
  zoom: 13,
};

export default ChkyLeafletMaps;
