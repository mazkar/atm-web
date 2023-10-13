/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import Slider from "react-slick";
import { isObejctEmpty } from '../../../../helpers/useFormatter';
import RenderImageSlider from '../../../../helpers/RenderImageSlider';
import constants from '../../../../helpers/constants';
import LoadingView from '../../../../components/Loading/LoadingView';
import SliderImage from '../../ComponentsOwn/ImageSlider';

const useStyles = makeStyles({
  root: {
    width: '100%' ,
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
    '& .MuiDivider-root':{
      height: 2,
      backgroundColor: '#BCC8E7',
    },
  },
  content: {padding: 20,},
  title: {
    fontFamily: 'Barlow',
    fontWeight: 500,
    fontSize: 24,
  },
  subTitle: {
    fontFamily: 'Barlow',
    fontWeight: 600,
    fontSize: 15,
  },
  keyName: {
    fontFamily: 'Barlow',
    fontWeight: 600,
    fontSize: 13,
  },
  value: {
    fontFamily: 'Barlow',
    fontWeight: 400,
    fontSize: 13,
  },
  divider:{marginTop: 20},
  listDaftar: {marginBottom: 8,},
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 250,
    textAlign: 'center',
    '& .slick-prev:before': {
      color: constants.color.primaryHard,
    },
    '& .slick-next:before': {
      color: constants.color.primaryHard,
    },
    "& .MuiSvgIcon-root": {
      color: "black",
      backgroundColor: "#00000024",
      borderRadius: 20,
    },
  },
});

function renderType(str){
  if (str === null){
    return 'N/A';
  }
  const string = str.toLowerCase();
  switch (string) {
  case 'new':
    return <Typography align="right" style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #65D170', color: '#65D170', fontSize: 14, fontWeight: 500, backgroundColor: '#DEFFE1'}}>
        New
    </Typography>;
  case 'replace':
    return <Typography align="right" style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #FFB443', color: '#FFB443', fontSize: 14, fontWeight: 500, backgroundColor: '#FFF9F0'}}>
        Replace
    </Typography>;
  case 'migrasi':
    return <Typography align="right" style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #88ADFF', color: '#88ADFF', fontSize: 14, fontWeight: 500, backgroundColor: '#EFF4FF'}}>
        Migrasi
    </Typography>;
  case 'termin':
    return <Typography align="right" style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #FF7A76', color: '#FF7A76', fontSize: 14, fontWeight: 500, backgroundColor: '#FFE9E9'}}>
        Termin
    </Typography>;
  default:
    return <Typography align="right" style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #CB88FF', color: '#CB88FF', fontSize: 14, fontWeight: 500, backgroundColor: '#F3E3FF'}}>
      {str}
    </Typography>;
  }
}
function renderRequestionStatus(value){
  console.log(">>>> value nego status",value);
  switch (value) {
  case '1':
    return <Typography style={{padding: '4px 14px', borderRadius: 20, border: '1px solid #65D170', color: '#65D170', fontSize: 13, fontWeight: 500, backgroundColor: '#DEFFE1'}}>
        Complete
    </Typography>;
  case '2':
    return <Typography style={{padding: '4px 14px', borderRadius: 20, border: '1px solid #88ADFF', color: '#88ADFF', fontSize: 13, fontWeight: 500, backgroundColor: '#EFF4FF'}}>
        In Progress
    </Typography>;
  case '3':
    return <Typography style={{padding: '4px 14px', borderRadius: 20, border: '1px solid #FFB443', color: '#FFB443', fontSize: 13, fontWeight: 500, backgroundColor: '#FFF9F0'}}>
        Not Complete
    </Typography>;
  default:
    return 'N/A';
  }
}

const settingsSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

function DetailInfo(props) {
  const classes = useStyles();
  const {data, isLoadData} = props;

  // PHOTOS
  const [dataPhotos, setDataPhotos]=useState([]);

  useEffect(()=>{
    console.log(">>>> Images dataPhotos: ",JSON.stringify(dataPhotos));
  },[dataPhotos]);

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.title}>Detail</Typography>
          </Grid>
          <Grid item>
            {isObejctEmpty(data) ? 'N/A' : renderType(data.openingType) }
          </Grid>
        </Grid>

        {isLoadData ?
          <LoadingView maxheight='100%' isTransparent />
          :
          <div>
            <div className={classes.divider}/>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography className={classes.subTitle}>Status Requestion</Typography>
              </Grid>
              <Grid item>
                {isObejctEmpty(data) ? 'N/A' : renderRequestionStatus(data.status)}
              </Grid>
            </Grid>
            <div className={classes.divider}/>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography className={classes.keyName}>ID ATM :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.idAtm}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Lokasi :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography>
              </Grid>
            </Grid>
            <div className={classes.divider}/>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Latitude :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.idAtm}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Longitude :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography>
              </Grid>
            </Grid>
            <div className={classes.divider}/>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Area :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.idAtm}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Kota :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography>
              </Grid>
            </Grid>
            <div className={classes.divider}/>
            <Typography className={classes.keyName}>Alamat :</Typography>
            <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography>
            <div className={classes.divider}/> <Divider/> <div className={classes.divider}/>
            <Typography className={classes.title}>Informasi Unmum</Typography>
            <div className={classes.divider}/>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography className={classes.keyName}>ID Lama :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.idAtm}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Konven / Syariah :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography>
              </Grid>
            </Grid>
            <div className={classes.divider}/>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Bisa VSAT :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.idAtm}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.keyName}>Dimensi (m) :</Typography>
                <Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography>
              </Grid>
            </Grid>
            <div className={classes.divider}/> <Divider/> <div className={classes.divider}/>
            <Typography className={classes.title}>Daftar Kebutuhan</Typography>
            <div className={classes.divider}/>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Bangun Ruangan</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Renovasi Ruangan</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Pemasangan AC</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Pemasangan KWH</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Pemasangan Outlet</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Type Jarkom</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Pembuatan Booth</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Pembuatan FM</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Pembuatan Neon Box</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.listDaftar}>
              <Grid item><Typography className={classes.value}>Target Online</Typography></Grid>
              <Grid item><Typography className={classes.value}>{isObejctEmpty(data) ? 'N/A' : data.lokasi}</Typography></Grid>
            </Grid>
            <div className={classes.divider}/> <Divider/> <div className={classes.divider}/>
            <Typography className={classes.title}>Foto</Typography>
            <div className={classes.divider}/>
            <SliderImage />
            {/* <div className={classes.sliderContainer}>
              {dataPhotos.length > 0 ? <Slider {...settingsSlider}>
                {dataPhotos.map((image) => {
                  return <RenderImageSlider filePath={image} />;
                })}
              </Slider>: <Typography style={{color: '#749BFF', fontStyle: 'italic'}}>Image N/A</Typography>
              }
            </div> */}
          </div>
        }
      </Paper>
    </div>
  );
}

DetailInfo.propTypes = {
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
};

DetailInfo.defaultProps = {
  isLoadData: false,
};

export default DetailInfo;

