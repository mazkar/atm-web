/* eslint-disable no-useless-escape */
/* eslint-disable no-alert */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import {
  Grid,
  Paper,
  Tab,
  Table,
  TableCell,
  TableRow,
  Tabs,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, ZoomControl } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";
import constants from "../../helpers/constants";
import LoadingView from "../Loading/LoadingView";
import ImagesSlider from "../ImagesSlider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  paper: { padding: 10 },
  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
    width: "fit-content",
    position: "relative",
    left: "10%",
  },
  tabsIndicator: {
    display: "none",
  },
  rootItemTabs: {
    minHeight: 40,
    minWidth: 72,
    padding: "7px 10px",
    fontSize: 13,
  },
  selectedTabItem: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapperTabItem: {
    textTransform: "none",
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2 },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 13,
  },
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 180,
    "& .slick-prev:before": {
      color: constants.color.primaryHard,
    },
    "& .slick-next:before": {
      color: constants.color.primaryHard,
    },
    "& .MuiSvgIcon-root": {
      color: "black",
      backgroundColor: "#00000024",
      borderRadius: 20,
    },
  },
  maps: {
    height: "100%",
    width: "100%",
    backgroundColor: constants.color.graySoft,
    marginTop: 10,
    marginBottom: 10,
  },
  mapContainer: {
    width: "100%",
    height: 200,
    marginTop: 5,
  },
  select: {
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  tableTextBold: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: 15,
    borderBottom: "unset",
  },
  tableTextTot: {
    fontFamily: "Barlow",
    fontWeight: 700,
    fontSize: 13,
    borderBottom: "unset",
  },
});

const dataAtmDummy = {};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const setStringValue = (value) => {
  if (value === null) {
    return "-";
  }
  if (value === "") {
    return "-";
  }
  if (value === undefined) {
    return "-";
  }
  return value;
};

function stripeMedia(mediaString) {
  if (mediaString?.length > 0) {
    return mediaString.replace(/\[|\]|\"/g, "");
  }
  return "-";
}

function isEmpty(obj) {
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

// DEFAULT EXPORT
const InfoTabDigitalisasi = (props) => {
  const classes = useStyles();
  const { data, isLoadData } = props;

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };
  // PHOTOS
  const [dataPhotos, setDataPhotos] = useState([]);

  // TABS
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };
  const settingsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const locationMarker = (lat, long) => {
    if (lat === null || long === null) {
      return [-6.229728, 106.6894312];
    }
    return [lat, long];
  };

  useEffect(() => {
    if (isEmpty(data) === false) {
      try {
        if (data.locationMachinePhotos !== null) {
          setDataPhotos((prevData) => {
            return [
              ...prevData,
              {
                path: data.locationMachinePhotos,
                header: "Posisi Mesin",
              },
            ];
          });
        }
        if (data.locationFrontMachinePhoto !== null) {
          setDataPhotos((prevData) => {
            return [
              ...prevData,
              {
                path: data.locationFrontMachinePhoto,
                header: "Tampak Muka",
              },
            ];
          });
        }
      } catch (err) {
        alert("Error get minio images: ", err);
      }
    }
  }, [data]);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item sm={4}>
            <Typography style={{ fontSize: 28 }}>
              ATM {isEmpty(data) ? "-" : data.atmId}
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Tabs
              classes={tabsStyles}
              value={selectedTab}
              onChange={handleSelectedTab}
              centered
            >
              <Tab classes={tabItemStyles} label="Informasi Umum" />
              <Tab classes={tabItemStyles} label="Location" />
              <Tab classes={tabItemStyles} label="Detail" />
            </Tabs>
          </Grid>
          <Grid item sm={4} />
        </Grid>
        {isLoadData ? (
          <LoadingView maxheight="100%" />
        ) : (
          <div style={{ marginTop: 10 }}>
            <TabPanel value={selectedTab} index={0}>
              <Grid container spacing={2}>
                <Grid item className={classes.gridContent} xs={3}>
                  <div className={classes.sliderContainer}>
                    {dataPhotos.length > 0 ? (
                      <Slider {...settingsSlider}>
                        {dataPhotos.map((image) => {
                          return (
                            <ImagesSlider
                              filePath={image.path}
                              filename={image.header}
                            />
                          );
                        })}
                      </Slider>
                    ) : (
                      <Typography
                        style={{ fontStyle: "italic", color: "#BCC8E7" }}
                      >
                        No images
                      </Typography>
                    )}
                  </div>
                </Grid>
                <Grid item className={classes.gridContent} xs={5}>
                  <Table size="small">
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Kondisi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.condition)}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Nama Lokasi / ID
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.locationName)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Alamat
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.locationAddress)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        PIC Lokasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.picLocationName)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        No HP PIC Lokasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.picLocationTelephoneNumber)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Email PIC Lokasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.picLocationEmail)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Nama Penandatangan LOO / MOU
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.landlordName)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="50%" className={classes.tableCell}>
                        NO HP Penandatangan LOO / MOU
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.landlordTelephoneNumber)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Email Penandatangan LOO / MOU
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.landlordEmail)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Kode GFMS
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.codeGfms)}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
                <Grid item className={classes.gridContent} xs={4}>
                  <Table size="small">
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        ID Requester
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : setStringValue(data.idRequester)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        PIC Request
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.requesterName)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        No HP PIC Request
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.requesterTelephoneNumber)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Email PIC Request
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.requesterEmail)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Initial Cabang
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.branchInitial)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Kategori Lokasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.locationMode)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Tipe Lokasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.locationType)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Populasi ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.atmPopulation)}{" "}
                        ATM
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Tipe ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : setStringValue(data.machineType)}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
              {/* <Typography>Location</Typography> */}
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Box className={classes.mapContainer}>
                    <Map
                      className={classes.maps}
                      center={
                        isEmpty(data)
                          ? [-6.229728, 106.6894312]
                          : locationMarker(data.latitude, data.longitude)
                      }
                      zoom={80}
                      scrollWheelZoom={false}
                      zoomControl={false}
                    >
                      <FullscreenControl position="bottomright" />
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={
                          isEmpty(data)
                            ? [-6.229728, 106.6894312]
                            : locationMarker(data.latitude, data.longitude)
                        }
                      />
                      <ZoomControl position="topright" />
                    </Map>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              <Grid container spacing={2}>
                <Grid item className={classes.gridContent} xs={2}>
                  <div className={classes.sliderContainer}>
                    {dataPhotos.length > 0 ? (
                      <Slider {...settingsSlider}>
                        {dataPhotos.map((image) => {
                          return (
                            <ImagesSlider
                              filePath={image.path}
                              filename={image.header}
                            />
                          );
                        })}
                      </Slider>
                    ) : (
                      <Typography
                        style={{ fontStyle: "italic", color: "#BCC8E7" }}
                      >
                        No images
                      </Typography>
                    )}
                  </div>
                </Grid>
                <Grid item className={classes.gridContent} xs={5}>
                  <Table size="small">
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Tipe Lokasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.locationType)}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Ruang ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.boothType)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Luas Area ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.buildingLarge)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Akses Umum
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.publicAccessibility)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Notes Akses Umum
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.publicAccessbilityNote)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Operasional
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : `${data.operasional}`}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Jumlah ATM Bank Lain
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.aroundAtm)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Denom
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.denom)}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
                <Grid item className={classes.gridContent} xs={5}>
                  <Table size="small">
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        AC
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.acType)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Kebersihan
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.cleanType)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Jenis Komunikasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.commType)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Media Promosi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : stripeMedia(data.mediaPromotion)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Notes
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.mediaPromotionNote)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Nomor Meteran
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.electricNumber)}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Atas Nama
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.electricityOwnerName)}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Listrik per Tahun
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.yearlyElectricityCost)}{" "}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
              </Grid>
            </TabPanel>
          </div>
        )}
      </Paper>
    </div>
  );
};

InfoTabDigitalisasi.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  idAtm: PropTypes.string,
  isLoadData: PropTypes.bool,
};

InfoTabDigitalisasi.defaultProps = {
  data: dataAtmDummy,
  idAtm: "",
  isLoadData: false,
};

export default InfoTabDigitalisasi;
