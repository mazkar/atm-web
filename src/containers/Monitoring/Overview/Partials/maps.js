/* eslint-disable react/jsx-no-bind */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Map,
  Marker,
  TileLayer,
  ZoomControl,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";
import { Box } from "@material-ui/core";
import FullscreenControl from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import L, { divIcon } from "leaflet";
import clsx from "clsx";
import { Button, Typography } from "antd";
import * as Colors from "../../../../assets/theme/colors";
import IconMarkerMaps from "../../../../assets/icons/duotone-red/map-marker-alt.svg";
import MarkerSelected from "../../../../assets/icons/duotone-others/flag-alt-green.svg";
import constants from "../../../../helpers/constants";
import LoadingView from "../../../../components/Loading/LoadingView";
import FilterMap from "./FilterMap";
import { PrimaryHard } from "../../../../assets/theme/colors";

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
    border: `2px solid ${PrimaryHard}`,
    backgroundColor: "#FFF",
  },
  textMarker: {
    width: "100%",
    display: "block",
    textAlign: "center",
    lineHeight: "12px",
    fontSize: 10,
    marginTop: 4,
  },
  textMarkerRed: {
    color: "#DC241F",
  },
  textMarkerGreen: {
    color: "#65d170",
  },
  popupRoot: {
    textAlign: "center",
    "& .MuiButton-text": {
      padding: 0,
      textTransform: "capitalize",
      fontSize: 11,
    },
  },
  rootMap: {
    position: "relative",
    top: -50,
    zIndex: 1,
  },
}));

const problemFilter = {
  "SP": "Spv Mode",
  "DF": "Dispenser",
  "CF": "Card Reader",
  "IM": "Implementasi",
  "IN": "Insurance",
  "MT": "Maintenance",
  "CO": "Cash Out",
  "HW": "Hardware",
  "SC": "Security",
  "EF": "Encryptor",
  "RF": "Receipt Printer",
  "LC": "Lost Comm",
  "SL": "SLM",
  "JF": "Journal",
  "PM": "PM",
  "MP": "Media Promosi",
  "OT": "Other",
}

export default function SiteMap(props) {
  const { dataMarker, isLoadData, ...other } = props;
  const [center, setCenter] = useState(props.center);
  const [dataMaps, setDataMaps] = useState(dataMarker);
  const [zoom, setZoom] = useState(props.zoom);
  const [modalLoader, setModalLoader] = useState(false);
  const [nameProvince, setNameProvince] = useState("");
  const [dataProblemMap, setDataProblemMap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterArea, setFilterArea] = useState([])
  const [filterProblem, setFilterProblem] = useState([])
  const [filterType, setFilterType] = useState([])
  const [dataFilter, setDataFilter] = useState({
    area: "",
    machineType: "",
    problem: "",
  });

  function handleFilter(newValue) {
    if (newValue === null) {
      setDataFilter({
        area: "",
        machineType: "",
        problem: "",
      });
    } else {
      // setMachineTypes(newValue.population);
      setDataFilter({
        area: newValue.area,
        machineType: newValue.population,
        problem: newValue.promises,
      });
    }
  }

  async function getDataProblemMap() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constants.MONITORING_SERVICE}/getOvreviewProblemMonitoring?areaId=${dataFilter.area}&problm=${dataFilter.problem}&atm=${dataFilter.machineType}`
      );
      console.log("res data problem map", result.data.overviewDetailList);
      const {overviewDetailList} = result.data
      setDataProblemMap(overviewDetailList);
      const arrArea = []
      const arrProb = []
      const arrType = []
      overviewDetailList.map((item) => {
        if(!arrArea.includes({id: item.areaId, name: item.name})) arrArea.push({id: item.areaId, name: item.name})
      })
      Object.keys(problemFilter).map((problem, index) => {
        arrProb.push({id: problem, name: Object.values(problemFilter)[index]})
      })
      setFilterArea(arrArea)
      setFilterProblem(arrProb)
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getDataProblemMap();
    setCenter([-2.5486509, 115.7074837]);
    setZoom(5);
  }, [dataMarker, dataFilter]);

  const handleClickMarker = (record) => {
    setZoom(8);
    setCenter([record.latlng.lat, record.latlng.lng]);

    console.log(record, "Sasd");
  };
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <FilterMap onFilterSubmit={handleFilter} area={filterArea} problems={filterProblem} />
      {isLoading ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div>
          <div className={classes.rootMap}>
            <Map
              className={classes.maps}
              center={center}
              zoom={zoom}
              scrollWheelZoom={false}
              height={475}
            >
              <FullscreenControl position="bottomright" />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              {dataProblemMap.map((item, key) => {
                const icon = divIcon({
                  className: classes.markerRounded,
                  html:
                    item.key === "atm" && zoom >= 8
                      ? `<div style="text-align: center; position: absolute; top:850%; left: 50%; transform: translate(-50%, -50%); ">
                       
                      <img src='${IconMarkerMaps}' alt="Marker Maps" width="20px" height="20px" />
             
                      </div>`
                      : `<span class='${clsx(
                          classes.textMarker,
                          classes.textMarkerGreen
                        )}'>
                              ${item.nonProblem && item.nonProblem}
                       
                          </span>
                          <span class='${clsx(
                            classes.textMarker,
                            classes.textMarkerRed
                          )}'>
                              ${item.problem && item.problem}
                       
                          </span>`,
                  iconSize: [40, 40],
                });
                return (
                  <Marker
                    icon={icon}
                    key={key.id}
                    position={[item.latitude, item.longitude]}
                    onclick={(record) => handleClickMarker(record)}
                  >
                    <Popup>
                      <Typography>Area: {item.name}</Typography>
                      <Typography>nonProblem: {item.nonProblem}</Typography>
                      <Typography>Problem: {item.problem}</Typography>
                    </Popup>
                  </Marker>
                );
              })}
            </Map>
          </div>
        </div>
      )}
    </Box>
  );
}
