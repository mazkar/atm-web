/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import PropTypes from "prop-types";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import {
  Map,
  Marker,
  TileLayer,
  ZoomControl,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import L, { divIcon } from "leaflet";
import * as Colors from "../../../assets/theme/colors";
import "leaflet/dist/leaflet.css";
import LoadingView from "../../../components/Loading/LoadingView";
import ModalLoader from "../../../components/ModalLoader";
import IconMarkerMaps from "../../../assets/icons/duotone-red/map-marker-alt.svg";
import MarkerSelected from "../../../assets/icons/duotone-others/flag-alt-green.svg";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: (props) => props.height || 475,
  },
  maps: {
    position: "relative",
    height: (props) => props.height || 475,
    width: "100%",
    backgroundColor: Colors.GraySoft,
    marginTop: 10,
    marginBottom: 10,
  },
  markerRounded: {
    display: "inline-block",
    borderRadius: 80,
    border: "2px solid #DC241F",
    backgroundColor: "#FFF",
  },
  textMarker: {
    width: "100%",
    display: "block",
    textAlign: "center",
    lineHeight: "40px",
  },
  popupRoot: {
    textAlign: "center",
    "& .MuiButton-text": {
      padding: 0,
      textTransform: "capitalize",
      fontSize: 11,
    },
  },
}));

const dataDummy = [
  { loc: [-2.5991529, 115.0864795], population: 100 },
  { loc: [-6.229728, 106.6894317], population: 90 },
  { loc: [-6.9032739, 107.5731171], population: 50 },
  { loc: [-0.936984, 100.388512], population: 10 },
  { loc: [-7.8722737, 110.144093], population: 19 },
  { loc: [4.604278, 96.681133], population: 5 },
  { loc: [3.602965, 98.583843], population: 9 },
  { loc: [2.706189, 115.923852], population: 23 },
  { loc: [-5.154229, 119.425284], population: 129 },
  { loc: [-0.930766, 131.348304], population: 19 },
];
const SelectedMarker = (props) => {
  const initMarker = (ref) => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };
  return <Marker ref={initMarker} {...props} />;
};

const selectedIcon = new L.Icon({
  iconUrl: MarkerSelected,
  iconRetinaUrl: MarkerSelected,
  popupAnchor: [-0, -0],
  iconSize: [10, 10],
});

const PopulationMaps = (props) => {
  const classes = useStyles(props);
  const { dataMarker, dataFilter, isLoadData, ...other } = props;
  const [zoom, setZoom] = useState(props.zoom);
  const [center, setCenter] = useState(props.center);
  const [dataMaps, setDataMaps] = useState(dataMarker);
  const [modalLoader, setModalLoader] = useState(false);
  const [nameProvince, setNameProvince] = useState("");
  const [storeDataMaps, setStoreDataMaps] = useState([]);

  useEffect(() => {
    setDataMaps(dataMarker);
    setZoom(5);
    setCenter([-2.5486509, 115.7074837]);
  }, [dataMarker]);

  const klikProvinsi = (location, name, provinceId) => {
    const cek = dataMarker.some((d) => d.province === name);
    if (cek) {
      setNameProvince(name);
      setModalLoader(true);
      const filterMaps = dataMaps.filter((m) => m.population !== "");
      setCenter(location);
      setTimeout(() => {
        setZoom(8);
      }, 300);
      axios
        .get(
          `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/population/getAtmLocation?cityId=${dataFilter.cityId}&districtId=${dataFilter.districtId}&provinceId=${provinceId}`
        )
        .then((responseAtm) => {
          if (responseAtm.data.statusCode === 200) {
            const convertDataLngLat = [];
            for (let i = 0; i < responseAtm.data.data.length; i++) {
              const dataLongLat = {
                loc: [
                  responseAtm.data.data[i].latitude,
                  responseAtm.data.data[i].longitude,
                ],
                population: "",
                province: responseAtm.data.data[i].atmId,
                key: "atm",
                provinceId: responseAtm.data.data[i].provinceId,
              };
              convertDataLngLat.push(dataLongLat);
            }
            setDataMaps([...filterMaps, ...convertDataLngLat]);
            setModalLoader(false);
          }
        })
        .catch((e) => {
          setTimeout(() => {
            alert(`Internal Server Error`);
          }, 100);
        });
    }
  };

  const detectPositionZoom = (e) => {
    console.log(e);
  };

  const onViewportChanged = (viewport) => {
    if (viewport.zoom < 8) {
      setStoreDataMaps(dataMaps);
      setDataMaps(dataMarker);
    } else if (viewport.zoom >= 8) {
      if (dataMarker.length === dataMaps.length) {
        setDataMaps(storeDataMaps);
      }
    }
    setZoom(viewport.zoom);
  };

  return (
    <Box className={classes.root}>
      {isLoadData ? (
        <LoadingView maxheight="100%" />
      ) : (
        <Map
          className={classes.maps}
          center={center}
          zoom={zoom}
          zoomControl={false}
          scrollWheelZoom={false}
          height={475}
          {...other}
          // onmoveend={(e) => detectPositionZoom(e)}
          onViewportChanged={onViewportChanged}
        >
          <FullscreenControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {dataMaps.map((item, i) => {
            const icon = divIcon({
              className: item.key === "atm" ? "" : classes.markerRounded,
              html:
                item.key === "atm" && zoom >= 8
                  ? `<div style="text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); ">
                      <img src='${IconMarkerMaps}' alt="Marker Maps" width="20px" height="20px" />
                    </div>`
                  : `<span class='${classes.textMarker}'>
                        ${item.population && item.population}
                    </span>`,
              iconSize: [40, 40],
            });
            return (
              <Marker
                key={i}
                icon={icon}
                position={item.loc}
                onclick={() =>
                  klikProvinsi(item.loc, item.province, item.provinceId)
                }
              >
                <Popup>
                  {zoom < 8 && nameProvince ? nameProvince : item.province}
                </Popup>
              </Marker>
            );
          })}

          <ZoomControl position="bottomright" />
        </Map>
      )}
      <ModalLoader isOpen={modalLoader} />
    </Box>
  );
};

PopulationMaps.propTypes = {
  children: PropTypes.node,
  height: PropTypes.string,
  center: PropTypes.array,
  zoom: PropTypes.number,
  dataMarker: PropTypes.array,
  // isLoadData: PropTypes.bool,
  // refresh: PropTypes.number,
};

PopulationMaps.defaultProps = {
  height: 475,
  // center: [-2.5486509, 115.7074837],
  // zoom: 5,
  // dataMarker: dataDummy,
  // isLoadData: false,
  // refresh: 0,
};

export default PopulationMaps;
