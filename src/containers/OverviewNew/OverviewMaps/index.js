/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import {
  Map,
  Marker,
  TileLayer,
  ZoomControl,
  CircleMarker,
  Popup,
} from "react-leaflet";
import { divIcon } from "leaflet";
import FullscreenControl from 'react-leaflet-fullscreen';
import * as Colors from "../../../assets/theme/colors";
import "leaflet/dist/leaflet.css";
import LoadingView from "../../../components/Loading/LoadingView";
import IconMarkerMaps from "../../../assets/icons/duotone-red/map-marker-alt.svg";
import ModalLoader from "../../../components/ModalLoader";
import axios from "axios";

import { HorizontalSplitOutlined } from "@material-ui/icons";
import 'react-leaflet-fullscreen/dist/styles.css';

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
    position: "relative",
    width: "100%",
    display: "block",
    textAlign: "center",
    lineHeight: "40px",
    zIndex: 100,
  },
});

// const dataDummy = [
//   {
//     loc: [-2.5991529, 115.0864795],
//     population: 100,
//     province: 'nama provinsi',
//   },
//   { loc: [-6.229728, 106.6894317], population: 90, province: 'nama provinsi' },
//   { loc: [-6.9032739, 107.5731171], population: 50, province: 'nama provinsi' },
//   { loc: [-0.936984, 100.388512], population: 10, province: 'nama provinsi' },
//   { loc: [-7.8722737, 110.144093], population: 19, province: 'nama provinsi' },
//   { loc: [4.604278, 96.681133], population: 5, province: 'nama provinsi' },
//   { loc: [3.602965, 98.583843], population: 9, province: 'nama provinsi' },
//   { loc: [2.706189, 115.923852], population: 23, province: 'nama provinsi' },
//   { loc: [-5.154229, 119.425284], population: 129, province: 'nama provinsi' },
//   { loc: [-0.930766, 131.348304], population: 19, province: 'nama provinsi' },
// ];

const OverviewMaps = (props) => {
  const classes = useStyles(props);
  const { dataMarker, dataFilter, loading, ...other } = props;
  const [zoom, setZoom] = useState(props.zoom);
  const [center, setCenter] = useState(props.center);
  const [dataMaps, setDataMaps] = useState(dataMarker);
  const [modalLoader, setModalLoader] = useState(false);
  const [nameProvince, setNameProvince] = useState("");
  const [storeDataMaps, setStoreDataMaps] = useState([]);

  // console.log("dataMarker", dataMarker);

  useEffect(() => {
    setDataMaps(dataMarker);
    setZoom(5);
    setCenter([-2.5486509, 115.7074837]);
  }, [dataMarker]);

  // console.log("hit machineType", dataFilter.machineType);
  // console.log("hit locBranch", dataFilter.locBranch);
  // console.log("hit nameBrand", dataFilter.nameBrand);

  const klikProvinsi = (location, name, provinceId) => {
    console.log("klik provinceId", provinceId);
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
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getProvince`
        )
        .then((responseProvince) => {
          if (responseProvince.data.statusCode === 200) {
            const filterProvince = responseProvince.data.data.filter(
              (p) => p.name === name
            );
            axios
              .get(
                `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/dashboard/getAtmLocation?machineType=${dataFilter.machineType}&locationBranchType=${dataFilter.locBranch}&brandName=${dataFilter.nameBrand}&provinceId=${provinceId}`
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
      {loading ? (
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

OverviewMaps.propTypes = {
  children: PropTypes.node,
  // height: PropTypes.string,
  center: PropTypes.array,
  zoom: PropTypes.number,
  dataMarker: PropTypes.array,
};

OverviewMaps.defaultProps = {
  height: 475,
  // center: [-2.5486509, 115.7074837],
  // zoom: 5,
  // dataMarker: dataDummy,
};

export default OverviewMaps;
