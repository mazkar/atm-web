/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import {
  Grid,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import moment from "moment";
import constants from "../../../helpers/constants";
import getMinioFile from '../../../helpers/getMinioFile';

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
    maxWidth: '100vw',
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

const DetailAtmInfoPaper = (props) => {
  const { atmDetail, atmID } = props;
  const classes = useStyles();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if(atmDetail?.images){
      const promises = atmDetail.images.map(val=>getMinioFile(val));
      Promise.allSettled(promises)
        .then(res=>{
          // console.log('~ res', res);
          setImages(res.filter(({status, value})=>status==='fulfilled' && value !== null).map(({value})=>value.fileUrl));
        });
    }
    // console.log('~ atmDetail', atmDetail)
  }, [atmDetail]);

  // useEffect(() => console.log(images), [images]);

  const settingsSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} alignItems="center" direction="row">
        <Grid item xs={12} sm={6}>
          <Typography style={{ fontSize: 28 }}>ATM {atmID.atmId}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            style={{ fontSize: 15, textAlign: "right", fontWeight: 500 }}
          >
            Start Date: {moment(atmDetail.startDate).format("D MMM YYYY")}
          </Typography>
          <Typography
            style={{ fontSize: 15, textAlign: "right", fontWeight: 500 }}
          >
            Due Date: {moment(atmDetail.dueDate).format("D MMM YYYY")}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ marginTop: 10 }}>
        <Grid container spacing={2}>
          <Grid item className={classes.gridContent} xs={2}>
            {atmDetail.images == null ? (
              <Typography style={{ fontStyle: "italic", color: "#BCC8E7" }}>
                No images
              </Typography>
            ) : (
              <div className={classes.sliderContainer}>
                <Slider {...settingsSlider}>
                  {images &&
                    images.map((val, i) => {
                      return (<img src={val} />);
                    })}
                </Slider>
              </div>
            )}
          </Grid>
          <Grid item className={classes.gridContent} xs={5}>
            <Table size="small">
              <TableBody>
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
                    Initial Cabang
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {atmDetail.branchInitial}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Code GFMS
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {atmDetail.codeGfms}
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
                    Nama PIC Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {atmDetail.picPemilik}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Nama Penanda Tangan LOO / MOU	
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
              </TableBody>
            </Table>
          </Grid>
          <Grid item className={classes.gridContent} xs={5}>
            <Table size="small">
              <TableBody>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Jenis Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {atmDetail.categoryType}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Kategori Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {atmDetail.locationType}
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
                    Machine Type
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
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

DetailAtmInfoPaper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // data: PropTypes.object,
  dataTable: PropTypes.array,
  // atmDetail: PropTypes.object,
  atmID: PropTypes.object,
};

// DetailAtmInfoPaper.defaultProps  = {
//   data: dataAtmDummy,
// };

export default DetailAtmInfoPaper;
