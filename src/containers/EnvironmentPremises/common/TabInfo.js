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
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, ZoomControl } from "react-leaflet";
import FullscreenControl from "react-leaflet-fullscreen";
import { Button, Modal } from "antd";
import constants from "../../../helpers/constants";
import getMinioFile from "../../../helpers/getMinioFile";
import LoadingView from "../../../components/Loading/LoadingView";
import {
  SuccessMedium,
  SuccessSoft,
} from "../../../assets/theme/colors";

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

const RenderImageSlider = ({ filePath, filename }) => {
  const [imageSlider, seImageSlider] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      getMinioFile(filePath).then((result) => {
        // console.log(">>>> try getMinio Offering ", JSON.stringify(result));
        seImageSlider(result);
      });
    } catch (err) {
      console.log(">>>> Error try getMinio", err);
    }
  }, []);
  useEffect(() => {
    // console.log(">>>> imageSlider: ", imageSlider);
  }, [imageSlider]);
  return (
    <div style={{ textAlign: "center" }}>
      {imageSlider !== null && (
        <>
          <Typography>{filename}</Typography>
          <Link onClick={() => setOpen(true)}>
            <div style={{ height: 180, width: 180 }}>
              <img
                src={imageSlider.fileUrl}
                alt="img"
                style={{
                  width: "100%",
                  margin: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
          <Modal
            centered
            visible={open}
            onCancel={() => setOpen(false)}
            footer={[
              <Button
                key="submit"
                type="primary"
                onClick={() => window.open(imageSlider.fileUrl, "_blank")}
              >
                Download
              </Button>,
            ]}
            zIndex={2000}
          >
            <img
              src={imageSlider.fileUrl}
              style={{ width: "100%" }}
              alt="img"
            />
          </Modal>
        </>
      )}
    </div>
  );
};
RenderImageSlider.propTypes = {
  filePath: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
};

// DEFAULT EXPORT
const TabInfo = (props) => {
  const classes = useStyles();
  const { data, idAtm, isLoadData } = props;

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
  const [operasionalStart, setOperasionalStart] = useState([]);

  // TABS
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    if (newValue === 0) {
      console.log("Tab Current 0");
    } else if (newValue === 1) {
      console.log("Tab Current 1");
    } else if (newValue === 2) {
      console.log("Tab Current 2");
    } else {
      console.log("Tab Default");
    }
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
  useEffect(() => {
    // console.log(">>>> Images dataPhotos: ", JSON.stringify(dataPhotos));
  }, [dataPhotos]);
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
          <Grid item sm={4}></Grid>
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
                            <RenderImageSlider
                              filePath={image.path}
                              filename={image.header}
                            />
                          );
                        })}
                      </Slider>
                    ) : (
                      "-"
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
                        : {isEmpty(data) ? "-" : setStringValue(data.kondisi)}{" "}
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
                        : {isEmpty(data) ? "-" : setStringValue(data.alat)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        PIC Lokasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : setStringValue(data.picLocation)}
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
                          : setStringValue(data.handphonePicLocation)}
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
                          : setStringValue(data.emailPicLocation)}
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
                          : setStringValue(data.nameSignageMou)}
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
                          : setStringValue(data.noSignageMou)}
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
                          : setStringValue(data.emailSignageMou)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Kode GFMS
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.gfmsCode)}
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
                        : {isEmpty(data) ? "-" : setStringValue(data.requestId)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        PIC Request
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : setStringValue(data.picRequest)}
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
                          : setStringValue(data.handphonePicRequest)}
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
                          : setStringValue(data.emailPicRequest)}
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
                          : setStringValue(data.initialCabang)}
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
                          : setStringValue(data.locationCategori)}
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
                          : setStringValue(data.typeLocation)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Populasi ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : setStringValue(data.populasiAtm)}{" "}
                        ATM
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Tipe ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.typeAtm)}
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
                            <RenderImageSlider
                              filePath={image.path}
                              filename={image.header}
                            />
                          );
                        })}
                      </Slider>
                    ) : (
                      "-"
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
                          : setStringValue(data.typeLocation)}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Ruang ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.atmRoom)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Luas Area ATM
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : setStringValue(data.luasAreaAtm)}
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
                          : setStringValue(data.publicAccess)}
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
                          : setStringValue(data.noteAccessUmum)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Operasional
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : `${data.operasional} - ${data.operasional}`}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Jumlah ATM Bank Lain
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.totalOtherBank)}
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
                        : {isEmpty(data) ? "-" : setStringValue(data.ac)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Kebersihan
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data) ? "-" : setStringValue(data.kebersihan)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Jenis Komunikasi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : setStringValue(data.jenisComunication)}
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
                        : {isEmpty(data) ? "-" : setStringValue(data.notes)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Nomor Meteran
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.noMeteran)}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Atas Nama
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        : {isEmpty(data) ? "-" : setStringValue(data.atasNama)}{" "}
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
                          : setStringValue(data.electricityCostYear)}{" "}
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

TabInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  idAtm: PropTypes.string,
  isLoadData: PropTypes.bool,
};

TabInfo.defaultProps = {
  data: dataAtmDummy,
  idAtm: "",
  isLoadData: false,
};

export default TabInfo;
