/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import { withStyles} from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import Slider from "react-slick";

import constants from '../../helpers/constants';
import Title from '../../components/Title/Title';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import TotalTransactionForecastingChart from '../../components/Chart/TotalTransactionForecastingChart';
import SelectWithCaptions from '../../components/Selects/SelectWithCaptions';

import { ReactComponent as ArrowLeft } from '../../assets/icons/siab/arrow-left.svg';
import History from '../../assets/icons/siab/atm-history.png';
import cimbBank from '../../assets/images/cimb-atm.png';
import cimbAtm from '../../assets/images/cimb-forecasting.png';

const styles = () => ({
  root: {
    padding: '30px 20px 20px 30px',
  },
  container: {
    marginTop: 25,
  },
  backButton: {
    marginBottom: 20, 
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red'
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
  mapContainer:{
    width:'98%',
    height:300,
    marginLeft: 10,
    marginTop: 5,
  },
  maps: {
    height:'100%',
    width: '99%',
    backgroundColor: constants.color.graySoft,
    marginTop:10,
    marginBottom:10,
  },
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "340px",
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
  imgStyle: {
    textAlign: 'center',
  }
});

const totalTransactionData = [
  { date: 'Jan', transaction: 10_000_000 },
  { date: 'Feb', transaction: 12_000_000 },
  { date: 'Mar', transaction: 24_500_000 },
  { date: 'Apr', transaction: 13_800_000 },
  { date: 'May', transaction: 34_200_000 },
  { date: 'Jun', transaction: 19_100_000 },
  { date: 'Jul', transaction: 20_000_000 },
  { date: 'Aug', transaction: 25_000_000 },
  { date: 'Sep', transaction: 34_000_000 },
  { date: 'Oct', transaction: 19_000_000 },
  { date: 'Nov', transaction: 20_000_000 },
  { date: 'Des', transaction: 35_000_000 },
];

const showingSuggestions = [
  {
    id: 0,
    value: 'All',
    nameEn: 'All',
    nameId: 'All ATM',
  },
  {
    id: 1,
    value: 'All Cimb Niaga',
    nameEn: 'All Cimb Niaga',
    nameId: 'All Cimb Niaga'
  }
];

const imageData=[{src: cimbBank}, {src: cimbAtm}];

const renewalDetail = (props) => {
  const {
    // showingSuggestions,
    // handleShowingOnChange,
    classes,
  } = props;

  const position = [-7.8289701, 110.3776528];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  // variableWidth: true
  // centerMode: true
  };

  const handleShowingOnChange= (value) => {
    console.log(value);
  };

  const handleYearData = (prevValue) => {
    console.log('year data', prevValue);
  };

  const [monthFilter, setMonthFilter] = useState(totalTransactionData);

  const handleSelectMonth = (newValue) => {
    console.log('month data', newValue);
    if (newValue === 0) {
      setMonthFilter(totalTransactionData.slice(0, 3));
      console.log('3 Months Data');
    } else if (newValue === 1) {
      setMonthFilter(totalTransactionData.slice(0, 4));
      console.log('4 Months Data');
    } else if (newValue === 2) {
      setMonthFilter(totalTransactionData.slice(0, 6));
      console.log('6 Months Data');
    } else if (newValue === 3) {
      setMonthFilter(totalTransactionData.slice(0, 9));
      console.log('9 Months Data');
    } else {
      setMonthFilter(totalTransactionData);
      console.log('A Year Data');
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => window.location.assign(`/forecasting`)}
          buttonIcon={<ArrowLeft/>}
        />
      </div>

      <Title title="Renewal ATM Detail" />

      <div className={classes.container}>
        <Paper>
          <Grid item>
            <TotalTransactionForecastingChart
              data={monthFilter} 
              title= "Total Transaction"
              handleYearData={handleYearData}
              handleSelectMonth={handleSelectMonth}
            />
          </Grid>
        </Paper>
      </div>

      <div>
        <Paper className={classes.root} style={{marginTop: 15}}>
          <Typography variant="h6" component="p">
            <img src={History}/> ATM History Placement
          </Typography>
          <br/>

          <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <p>Showing data from 5 past years</p>

            <SelectWithCaptions
              className={classes.selectAtm}
              bordered
              caption="Showing"
              suggestions={showingSuggestions}
              defaultValue={showingSuggestions[0].value}
              handleChange={handleShowingOnChange}
              width="auto"
            />
          </Grid>
          <br/>

          <Grid 
            container
            direction="row"
            spacing={5}
          >

            <Box className={classes.mapContainer}>
              <Map 
                className={classes.maps}
                center={position}
                zoom={80}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
                <ZoomControl position="topright" />
              </Map>
            </Box>
          </Grid>

          <Grid 
            container
            direction="row"
            spacing={5}
            style={{ marginTop: 35, justifyContent: 'space-between', padding: 20}}>
            <ul style={{listStyle: 'none', marginLeft: -45}}>
              <li><b>Detail ATM</b></li>
              <li>Jenis Lokasi                    : Cabang</li>
              <li>Jenis Lokasi Makro              : -</li>
              <li>Jenis Lokasi Mikro              : -</li>
              <li>Aksesibilitas/Operasional       : 24 Jam</li>
              <li>Akses Umum/Publik               : Ya</li>
              <li>Luas Area ATM                   : 1,5 m2</li>
              <li>Jumlah ATM Bank Lain            : 1</li>
              <li>Tipe ATM                        : R-023</li>
              <li>Ruang ATM                       : -</li>
              <li>Komunikasi                      : Telepon</li>
            </ul>

            <ul style={{listStyle: 'none', marginLeft: -75}}>
              <li><b>Estimasi Total Harga</b></li>
              <li>Biaya Sewa                    : Rp.31.500.000</li>
              <li>Biaya Listrik                 : Rp.200.000</li>
              <li>Telepon                       : Rp.300.000</li>
              <li>Service Charge                : Rp.100.000</li>
              <li><b>Total                      : Rp.34.500.000</b></li>
            </ul>
            
            <Grid style={{display: 'flex', flexDirection: 'column', paddingRight: 25 }}>
              <p><b>Foto Lokasi</b></p>
              <div className={classes.sliderContainer}>
                <Slider {...settings}>
                  {imageData.map((image) => {
                    return(
                      <div className={classes.imgStyle}>
                        <img src={image.src} style={{margin: 'auto'}}/>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </Grid>
          </Grid> 
        </Paper>
      </div>
    </div>
  );
};

export default withStyles(styles)(renewalDetail);
