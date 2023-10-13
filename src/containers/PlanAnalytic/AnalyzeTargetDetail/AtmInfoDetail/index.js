/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import {
  Box,
  Grid,
  Paper,
  Tab,
  Table,
  TableCell,
  TableRow,
  Tabs,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, ZoomControl } from "react-leaflet";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";
import constants from "../../../../helpers/constants";
import ImgcimbBank from "../../../../assets/images/cimb-atm.png";
import ImgcimbAtm from "../../../../assets/images/cimb-forecasting.png";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";

const useStyles = makeStyles({
  root: {
    padding: 20,
    borderRadius: 10,
    boxShadow: "none",
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2 },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 12,
  },
  tableCellTotal: {
    borderBottom: "unset",
    fontWeight: 700,
    fontSize: 13,
  },
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    "& .slick-prev:before": {
      color: constants.color.primaryHard,
    },
    "& .slick-next:before": {
      color: constants.color.primaryHard,
    },
    "& .slick-dots button:before": {
      color: constants.color.primaryHard,
    },
    "& .slick-dots li.slick-active button:before": {
      color: constants.color.primaryHard,
    },
    "& .MuiSvgIcon-root": {
      color: "black",
      backgroundColor: "#00000024",
      borderRadius: 20,
    },
  },
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

const AtmInfoDetail = (props) => {
  // console.log(`DATA IMG==>${JSON.stringify(data)}`);
  const classes = useStyles();
  const { dataTable, atmDetail, atmID } = props;
  const [dataImage, setDataImage] = useState(null);

  var Minio = require("minio");
  var prepareData = [];

  var minioClient = new Minio.Client({
    endPoint: `${process.env.REACT_APP_MINIO_URL}`,
    useSSL: true,
    accessKey: `${process.env.REACT_APP_MINIO_ACCESS_KEY}`,
    secretKey:
      process.env.REACT_APP_MINIO_SECRET_KEY === "IstuatATM"
        ? "IstuatATM$14b"
        : process.env.REACT_APP_MINIO_SECRET_KEY,
  });

  useEffect(() => {
    atmDetail.images &&
      atmDetail.images.map((image) => {
        minioClient.presignedUrl(
          "GET",
          "project",
          image,
          24 * 60 * 60,
          function (err, presignedUrl) {
            if (err) return console.log(err);
            console.log("Pre Design ===> ", presignedUrl);
            prepareData.push(presignedUrl);
            setDataImage(prepareData);
          }
        );
      });
  }, [atmDetail]);

  useEffect(() => console.log("Check Data Image : ", dataImage), [dataImage]);

  const dateFormatter = (date) => {
    const dateNew = moment(new Date(date)).format("DD MMMM YYYY");
    return dateNew;
  };

  const settingsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Filter
  const [filterByValue, setFilterByValue] = useState("yearly");
  const handleFilterByChange = (event) => {
    setFilterByValue(event.target.value);
  };

  return (
    <Paper className={classes.root}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontSize: 28 }}>ATM {atmID.atmId}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            style={{ fontSize: 15, textAlign: "right", fontWeight: 500 }}
          >
            Due Date: {moment(atmDetail.dueDate).format("LL")}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ marginTop: 10 }}>
        <Grid container spacing={2}>
          <Grid item className={classes.gridContent} xs={2}>
            {atmDetail.images === null || atmDetail.images === undefined ? (
              <Typography style={{ fontStyle: "italic", color: "#BCC8E7" }}>
                No images
              </Typography>
            ) : (
              <div className={classes.sliderContainer}>
                <Slider {...settingsSlider}>
                  {atmDetail.images &&
                    atmDetail.images.map((n, i) => {
                      return (
                        <div style={{ textAlign: "center" }}>
                          <img
                            src={dataImage && dataImage[0]}
                            style={{
                              margin: "auto",
                              height: "180px",
                              width: "240px",
                            }}
                          />
                        </div>
                      );
                    })}
                </Slider>
              </div>
            )}
          </Grid>
          <Grid item className={classes.gridContent} xs={5}>
            <Table size="small">
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Kondisi
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.kondisi}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Nama Lokasi / ID
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.lokasiId}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Alamat
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.alamat}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  RO/Area
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.roArea}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Cabang
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.cabang}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  PIC Cabang
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.picCabang}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  PIC Pemilik / Pengelola
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.picPemilik}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  PIC on Location
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.picOnLocation}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Populasi ATM
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.populasiATM}
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
                  : {atmDetail.jenisLokasiMakro}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Aksesibilitas/Operasional
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.aksesibilitas}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Akses Umum/Publik
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.aksesPublik}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Luas Area ATM
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.luasArea}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Jumlah ATM Bank Lain
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.jumlahAtmBankLain}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Tipe ATM
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.tipeAtm}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Ruang ATM
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.ruangAtm}
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell width="40%" className={classes.tableCell}>
                  Komunikasi
                </TableCell>
                <TableCell className={classes.tableCell}>
                  : {atmDetail.komunikasi}
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

AtmInfoDetail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // data: PropTypes.object,
  dataTable: PropTypes.array,
  atmDetail: PropTypes.object,
  atmID: PropTypes.object,
};

// AtmInfoDetail.defaultProps  = {
//   data: dataAtmDummy,
// };

export default AtmInfoDetail;
