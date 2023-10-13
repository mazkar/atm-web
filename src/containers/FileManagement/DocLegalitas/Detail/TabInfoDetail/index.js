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
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, ZoomControl } from "react-leaflet";
import moment from "moment";
import constants from "../../../../../helpers/constants";
import ChkySelectInput from "../../../../DashboardPopulation/selectMonthYear";
import getMinioFile from "../../../../../helpers/getMinioFile";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { ReactComponent as PaperClip } from "../../../../../assets/icons/general/paperclip_red.svg";

const UseStyles = makeStyles({
  root: { padding: 10, minHeight: "500px" },
  // Tabs Style
  rootTabs: {
    right: "10%",
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
    width: "fit-content",
    position: "relative",
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
        <img src={imageSlider.fileUrl} alt="img" style={{ width: "100%" }} />
      )}
    </div>
  );
};
RenderImageSlider.propTypes = {
  filePath: PropTypes.string.isRequired,
};

function TabInfoDetail({ dataInfo, dataPhotos, atmId, type }) {
  const classes = UseStyles();

  const [minioFile, setMinioFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };

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

  //function type status

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
      case "renew":
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
            Renew
          </Typography>
        );
      case "replace":
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
            Replace
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

  // function type pembayaran
  function PaidType(str) {
    if (str === null) {
      return "-";
    }
    const string = str.toLowerCase();
    switch (string) {
      case "unpaid":
        return (
          <span
            align="right"
            style={{
              padding: "3px 11px",
              borderRadius: 10,
              border: "1px solid #FF6A6A",
              color: "#FF6A6A",
              fontSize: 12,
              fontWeight: 500,
              backgroundColor: "#FFF6F6",
              width: "min-content",
            }}
          >
            Unpaid
          </span>
        );
      case "paid":
        return (
          <Typography
            align="right"
            style={{
              padding: "3px 11px",
              borderRadius: 10,
              border: "1px solid #65D170",
              color: "#65D170",
              fontSize: 12,
              fontWeight: 500,
              backgroundColor: "#DEFFE1",
              width: "min-content",
            }}
          >
            Paid
          </Typography>
        );
    }
  }

  // function download file
  //>>>>>>>>>>>>>>>>>>>>>>>>>function download file
  const document = async (documentFile, openFile) => {
    const filePath = documentFile;
    console.log("document", filePath);
    if (filePath) {
      try {
        //setIsLoading(true);
        getMinioFile(filePath).then((result) => {
          console.log(">>>> try getMinio Offering ", JSON.stringify(result));
          setMinioFile(result);
          setFileUrl(result.fileUrl);
          openFile(result.fileUrl);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Document does not exist");
    }
  };

  const openFile = (urlFile) => {
    // alert(`File opened:${urlFile}`)
    window.open(urlFile, "_blank");
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>function download file

  return (
    <Paper className={classes.root}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item sm={3}>
          <Typography style={{ fontSize: 28 }}>ATM #{atmId}</Typography>
        </Grid>
        <Grid
          item
          sm={7}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            classes={tabsStyles}
            value={selectedTab}
            onChange={handleSelectedTab}
            centered
          >
            <Tab classes={tabItemStyles} label="Informasi Umum" />
            <Tab classes={tabItemStyles} label="Detail" />
          </Tabs>
        </Grid>
        <Grid item sm={2}>
          <Grid container justify="space-between">
            <Grid item />
            <Grid item>{renderType(type)}</Grid>
          </Grid>
        </Grid>
      </Grid>

      <div style={{ marginTop: 10 }}>
        {/* tab panel 0 */}

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
                    : {dataInfo.conditions ? dataInfo.conditions : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Nama Lokasi / ID
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.locationName ? dataInfo.locationName : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Alamat
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.address ? dataInfo.address : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    PIC Request
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.picRequest ? dataInfo.picRequest : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    No HP PIC Request
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    :{" "}
                    {dataInfo.phonePicRequest ? dataInfo.phonePicRequest : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Email PIC Request
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    :{" "}
                    {dataInfo.emailPicRequest ? dataInfo.emailPicRequest : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    PIC Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.picLocation ? dataInfo.picLocation : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    No HP PIC Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    :{" "}
                    {dataInfo.phonePicLocation
                      ? dataInfo.phonePicLocation
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Email PIC Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    :{" "}
                    {dataInfo.emailPicLocation
                      ? dataInfo.emailPicLocation
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Nama Penandatangan LOO / MOU
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.signedNameMou ? dataInfo.signedNameMou : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    NO HP Penandatangan LOO / MOU
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.signedPhoneMou ? dataInfo.signedPhoneMou : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Email Penandatangan LOO / MOU
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.signedEmailMou ? dataInfo.signedEmailMou : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Kode GFMS
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.gfmsCode ? dataInfo.gfmsCode : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    ID Requester
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.idRequester ? dataInfo.idRequester : "-"}
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
            <Grid item className={classes.gridContent} xs={5}>
              <Table size="small">
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    RO/Area
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.area ? dataInfo.area : "-"}
                  </TableCell>
                </TableRow>

                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Cabang
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.branch ? dataInfo.branch : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Jenis Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    :{" "}
                    {dataInfo.locationVariety ? dataInfo.locationVariety : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Tipe Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.locationType ? dataInfo.locationType : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Populasi ATM
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.atmPopulation ? dataInfo.atmPopulation : 0} ATM
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Aksesibilitas/Operasional
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.accessibility ? dataInfo.accessibility : 0} Jam
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Akses Umum/Publik
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.publicAccess ? dataInfo.publicAccess : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Luas Area ATM
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.wideAtm ? dataInfo.wideAtm : "-"} m2
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Jumlah ATM Bank Lain
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.numOfOtherAtm ? dataInfo.numOfOtherAtm : 0}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Ruang ATM
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.atmBooth ? dataInfo.atmBooth : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Komunikasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.comm ? dataInfo.comm : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Initial Cabang
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.initialBranch ? dataInfo.initialBranch : "-"}
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
          </Grid>
        </TabPanel>

        {/* end tab panel 0 */}

        {/* tab panel 1 */}

        <TabPanel value={selectedTab} index={1}>
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
                    Tgl Order
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.orderDate ? dataInfo.orderDate : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Type Orderan
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.orderType ? dataInfo.orderType : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Pajak Awal
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.beginTax ? dataInfo.beginTax : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Pajak Akhir
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.endTax ? dataInfo.endTax : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Remark
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.remark ? dataInfo.remark : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Status Kepengurusan Pajak
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.taxStatus ? dataInfo.taxStatus : "-"}
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
            <Grid item className={classes.gridContent} xs={5}>
              <Table size="small">
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Status Pembayaran
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>
                      :{" "}
                      {PaidType(
                        dataInfo.paymentStatus ? dataInfo.paymentStatus : "-"
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Tgl Pembayaran
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.paymentDate ? dataInfo.paymentDate : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Upload Invoice
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    :{" "}
                    <Button
                      style={{
                        color: PrimaryHard,
                        textTransform: "capitalize",
                        backgroundColor: "transparent",
                        padding: 0,
                      }}
                      onClick={() =>
                        document(
                          dataInfo.invoiceFile ? dataInfo.invoiceFile : null,
                          openFile
                        )
                      }
                    >
                      <PaperClip />{" "}
                      {dataInfo.invoiceFile ? dataInfo.invoiceFile : "-"}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Tgl Kirim Invoice
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    :{" "}
                    {dataInfo.sendInvoiceDate ? dataInfo.sendInvoiceDate : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    No Invoice
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {dataInfo.invoiceNumber ? dataInfo.invoiceNumber : "-"}
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
          </Grid>
        </TabPanel>
        {/* end tab panel 1 */}
      </div>
    </Paper>
  );
}

TabInfoDetail.PropTypes = {
  dataInfo: PropTypes.object.isRequired,
  dataPhotos: PropTypes.array.isRequired,
  atmId: PropTypes.string.isRequired,
};

export default TabInfoDetail;
