/* eslint-disable no-nested-ternary */
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
import moment from "moment";
import constants from "../../../../../helpers/constants";
import { ChkySelectInput } from "../../../../../components";
import getMinioFile from "../../../../../helpers/getMinioFile";
import LoadingView from "../../../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: { padding: 10 },
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
    fontSize: 12,
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
    // marginLeft: 0,
    marginTop: 5,
  },
  select: {
    // padding: 10,
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
const dataSelectYear = [
  { name: "Tahun Ke 1", value: "0" },
  { name: "Tahun Ke 2", value: "1" },
  { name: "Tahun Ke 3", value: "2" },
  { name: "Tahun Ke 4", value: "3" },
  { name: "Tahun Ke 5", value: "4" },
];

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

const idrCurrencyFormat = (value) => {
  if (value === null) {
    return "-";
  }
  return `Rp ${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
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

function isEmpty(obj) {
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}
function timestamptToDate(timestamp) {
  const dateString = moment.unix(timestamp / 1000).format("DD MMMM YYYY");
  return dateString;
}

const RenderImageSlider = ({ filePath }) => {
  const [imageSlider, seImageSlider] = useState(null);
  useEffect(() => {
    try {
      getMinioFile(filePath).then((result) => {
        // console.log(">>>> try getMinio Offering ",JSON.stringify(result));
        seImageSlider(result);
      });
    } catch (err) {
      // console.log(">>>> Error try getMinio", err);
    }
  }, []);
  useEffect(() => {
    // console.log(">>>> imageSlider: ", imageSlider);
  }, [imageSlider]);
  return (
    <div style={{ textAlign: "center" }}>
      {imageSlider !== null && (
        <img src={imageSlider.fileUrl} alt="img" style={{ width: "100%" }} />
      )}
    </div>
  );
};
RenderImageSlider.propTypes = {
  filePath: PropTypes.string.isRequired,
};

// DEFAULT EXPORT
const ApprovalTabInfo = (props) => {
  const classes = useStyles();
  const { data, idAtm, isLoadData, isNewLocation } = props;

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
    if (newValue === 0) {
      // console.log("Tab Current 0");
    } else if (newValue === 1) {
      // console.log("Tab Current 1");
    } else if (newValue === 2) {
      // console.log("Tab Current 2");
    } else {
      // console.log("Tab Default");
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

  const [yearValue, setYearValue] = useState("0");
  function onSelectValueChange(value) {
    setYearValue(value);
  }

  function showDataBiayaSewa(keyName, index) {
    if (keyName === "yearlyRentCost") {
      return idrCurrencyFormat(data.detailRent[index].yearlyRentCost);
    }
    if (keyName === "yearlyElectricityCost") {
      return idrCurrencyFormat(data.detailRent[index].yearlyElectricityCost);
    }
    if (keyName === "yearlyTelephoneRentCost") {
      return idrCurrencyFormat(data.detailRent[index].yearlyTelephoneRentCost);
    }
    if (keyName === "yearlyServiceCharge") {
      return idrCurrencyFormat(data.detailRent[index].yearlyServiceCharge);
    }
    if (keyName === "totalRent") {
      return idrCurrencyFormat(data.detailRent[index].totalRent);
    }
    return "-";
  }

  function renderType(str) {
    if (str === null) {
      return "-";
    }
    const string = str.toLowerCase();
    switch (string) {
      case "new":
        return (
          <Typography
            align="right"
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid #65D170",
              color: "#65D170",
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: "#DEFFE1",
            }}
          >
            New
          </Typography>
        );
      case "renewal":
        return (
          <Typography
            align="right"
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid #FFB443",
              color: "#FFB443",
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: "#FFF9F0",
            }}
          >
            Renewal
          </Typography>
        );
      case "reopen":
        return (
          <Typography
            align="right"
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid #88ADFF",
              color: "#88ADFF",
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: "#EFF4FF",
            }}
          >
            Reopen
          </Typography>
        );
      case "termin":
        return (
          <Typography
            align="right"
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid #FF7A76",
              color: "#FF7A76",
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: "#FFE9E9",
            }}
          >
            Termin
          </Typography>
        );
      default:
        return (
          <Typography
            align="right"
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "1px solid #CB88FF",
              color: "#CB88FF",
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: "#F3E3FF",
            }}
          >
            {str}
          </Typography>
        );
    }
  }

  useEffect(() => {
    if (isEmpty(data) === false) {
      try {
        if (data.informasiApproval.locationMachinePhotos !== null) {
          if (data.informasiApproval.locationMachinePhotos !== "") {
            setDataPhotos((prevData) => {
              return [
                ...prevData,
                data.informasiApproval.locationMachinePhotos,
              ];
            });
          }
        }
        if (data.informasiApproval.locationFrontMachinePhoto !== null) {
          if (data.informasiApproval.locationFrontMachinePhoto !== "") {
            setDataPhotos((prevData) => {
              return [
                ...prevData,
                data.informasiApproval.locationFrontMachinePhoto,
              ];
            });
          }
        }
        if (data.informasiApproval.locationPhotosPositionNeonSign !== null) {
          if (data.informasiApproval.locationPhotosPositionNeonSign !== "") {
            setDataPhotos((prevData) => {
              return [
                ...prevData,
                data.informasiApproval.locationPhotosPositionNeonSign,
              ];
            });
          }
        }
        if (data.informasiApproval.locationPhotosPositionAtenaVsat !== null) {
          if (data.informasiApproval.locationPhotosPositionAtenaVsat !== "") {
            setDataPhotos((prevData) => {
              return [
                ...prevData,
                data.informasiApproval.locationPhotosPositionAtenaVsat,
              ];
            });
          }
        }
      } catch (err) {
        alert("Error get minio images: ", err);
      }
    }
  }, [data]);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={3}>
          <Typography style={{ fontSize: 22 }}>
            {isNewLocation ? "ID Request" : "ATM"}{" "}
            {isEmpty(data)
              ? "-"
              : !isNewLocation
              ? data.informasiApproval.atmId
              : data.informasiApproval.locationId}
          </Typography>
        </Grid>
        <Grid item sm={7}>
          <Tabs
            classes={tabsStyles}
            value={selectedTab}
            onChange={handleSelectedTab}
            centered
          >
            <Tab classes={tabItemStyles} label="Informasi Umum" />
            <Tab classes={tabItemStyles} label="Location" />
            <Tab classes={tabItemStyles} label="Estimasi & Perkiraan Harga" />
          </Tabs>
        </Grid>
        <Grid item sm={2}>
          <Grid container justify="space-between">
            <Grid item />
            <Grid item>
              {isEmpty(data)
                ? "-"
                : renderType(data.informasiApproval.openingType)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {isLoadData ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div style={{ marginTop: 10 }}>
          <TabPanel value={selectedTab} index={0}>
            <Grid container spacing={2}>
              <Grid item className={classes.gridContent} xs={2}>
                <div className={classes.sliderContainer}>
                  {dataPhotos.length > 0 ? (
                    <Slider {...settingsSlider}>
                      {dataPhotos.map((image) => {
                        return <RenderImageSlider filePath={image} />;
                      })}
                    </Slider>
                  ) : (
                    ""
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
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(
                            data.informasiApproval.openingType
                          )}{" "}
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
                        : setStringValue(data.informasiApproval.newLocation)}
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
                        : setStringValue(data.informasiApproval.address)}
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
                        : setStringValue(data.informasiApproval.branchInitial)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Code GFMS
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(data.informasiApproval.codeGFMS)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      PIC Cabang
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(data.informasiApproval.branchPicName)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Nama PIC Lokasi
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(data.informasiApproval.ownerPicName)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Nama Penanda Tangan LOO / MOU
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(
                            data.informasiApproval.locationPicName
                          )}
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
                        : setStringValue(data.informasiApproval.countAtm)}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item className={classes.gridContent} xs={5}>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Jenis Lokasi
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(data.informasiApproval.categoryType)}
                    </TableCell>
                  </TableRow>
                  {/* <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Jenis Lokasi Makro</TableCell>
                  <TableCell className={classes.tableCell}>:  {isEmpty(data) ? '-' : setStringValue(data.informasiApproval.locationType)}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Jenis Lokasi Mikro</TableCell>
                  <TableCell className={classes.tableCell}>:  {isEmpty(data) ? '-' : setStringValue(data.informasiApproval.locationType)}</TableCell>
                </TableRow> */}
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Kategori Lokasi
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(
                            data.informasiApproval.locationCategory
                          )}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Aksesibilitas/Operasional
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : `${setStringValue(data.informasiApproval.workingHour)} Jam`}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Akses Umum/Publik
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(
                            data.informasiApproval.publicAccessibility
                          )}
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
                        : setStringValue(data.informasiApproval.buildingLarge)}
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
                        : setStringValue(data.informasiApproval.aroundAtmCount)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Tipe ATM
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(data.informasiApproval.typeAtm)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Ruang ATM
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(data.informasiApproval.boothType)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Komunikasi
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : setStringValue(data.informasiApproval.commType)}
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
                        : locationMarker(
                            data.informasiApproval.latitude,
                            data.informasiApproval.longitude
                          )
                    }
                    zoom={80}
                    scrollWheelZoom={false}
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={
                        isEmpty(data)
                          ? [-6.229728, 106.6894312]
                          : locationMarker(
                              data.informasiApproval.latitude,
                              data.informasiApproval.longitude
                            )
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
              <Grid item xs={7} className={classes.gridContent}>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableTextBold}>
                      Lihat Keseluruhan Harga Dalam
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <div style={{ width: 135 }}>
                        <ChkySelectInput
                          selectedValue={yearValue}
                          onSelectValueChange={onSelectValueChange}
                          selectOptionData={
                            isEmpty(data)
                              ? [{ name: "Tahun Ke 1", value: "0" }]
                              : data.detailRent.length < 1
                              ? [{ name: "Tahun Ke 1", value: "0" }]
                              : dataSelectYear.slice(0, data.detailRent.length)
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography style={{ fontSize: 15, fontWeight: 600 }}>
                        Periode Existing :
                      </Typography>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        {isEmpty(data) ? (
                          "-"
                        ) : (
                          <span>
                            {timestamptToDate(
                              data.informasiApproval.startRentDate
                            )}{" "}
                            -{" "}
                            {timestamptToDate(
                              data.informasiApproval.endRentDate
                            )}
                          </span>
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item xs={6} className={classes.gridContent}>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableTextBold}>
                      Biaya Sewa
                    </TableCell>
                  </TableRow>
                </Table>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Biaya Sewa
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : data.detailRent.length < 1
                        ? "-"
                        : showDataBiayaSewa("yearlyRentCost", yearValue)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Biaya Listrik
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : data.detailRent.length < 1
                        ? "-"
                        : showDataBiayaSewa("yearlyElectricityCost", yearValue)}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Komunikasi
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : data.detailRent.length < 1
                        ? "-"
                        : showDataBiayaSewa(
                            "yearlyTelephoneRentCost",
                            yearValue
                          )}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Service Charge
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : data.detailRent.length < 1
                        ? "-"
                        : showDataBiayaSewa(
                            "yearlyServiceCharge",
                            yearValue
                          )}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableTextTot}>
                      Total
                    </TableCell>
                    <TableCell className={classes.tableTextTot}>
                      :{" "}
                      {isEmpty(data)
                        ? "-"
                        : data.detailRent.length < 1
                        ? "-"
                        : showDataBiayaSewa("totalRent", yearValue)}{" "}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item className={classes.gridContent} xs={6}>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableTextBold}>
                      Perkiraan Harga
                    </TableCell>
                  </TableRow>
                  <Table size="small">
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Nilai Terendah
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : idrCurrencyFormat(
                              data.informasiApproval.minOffering
                            )}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Nilai Tengah
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : idrCurrencyFormat(
                              data.informasiApproval.averageOffering
                            )}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.tableRow}>
                      <TableCell width="40%" className={classes.tableCell}>
                        Nilai Tertinggi
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        :{" "}
                        {isEmpty(data)
                          ? "-"
                          : idrCurrencyFormat(
                              data.informasiApproval.maxOffering
                            )}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Table>
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      )}
    </Paper>
  );
};

ApprovalTabInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  idAtm: PropTypes.string,
  isLoadData: PropTypes.bool,
  isNewLocation: PropTypes.bool,
};

ApprovalTabInfo.defaultProps = {
  data: dataAtmDummy,
  idAtm: "",
  isLoadData: false,
  isNewLocation: false,
};

export default ApprovalTabInfo;
