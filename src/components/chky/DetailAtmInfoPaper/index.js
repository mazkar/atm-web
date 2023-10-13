/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-use-before-define */
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
  Avatar,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import constants from '../../../helpers/constants';
import ImgcimbBank from '../../../assets/images/cimb-atm.png';
import ImgcimbAtm from '../../../assets/images/cimb-forecasting.png';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import RupiahConverter from '../../../helpers/useRupiahConverter';
import getMinioFile from '../../../helpers/getMinioFile';
import ModalLoader from '../../../components/ModalLoader';

const useStyles = makeStyles({
  root: {
    padding: 20,
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  // Tabs Style
  rootTabs: {
    minHeight: 40,
    backgroundColor: constants.color.grayUltraSoft,
    borderRadius: 10,
    color: constants.color.grayMedium,
    width: 'fit-content',
    position: 'relative',
    left: '10%',
  },
  tabsIndicator: {
    display: 'none',
  },
  rootItemTabs: {
    minHeight: 40,
    minWidth: 72,
    padding: '7px 10px',
  },
  selectedTabItem: {
    backgroundColor: constants.color.primaryHard,
    color: constants.color.white,
  },
  wrapperTabItem: {
    textTransform: 'none',
  },
  tableRow: {
    '& .MuiTableCell-sizeSmall': { padding: 2 },
  },
  tableCell: {
    borderBottom: 'unset',
    fontSize: 12,
  },
  tableCellTotal: {
    borderBottom: 'unset',
    fontWeight: 700,
    fontSize: 13,
  },
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
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
  mapContainer: {
    width: '100%',
    height: 270,
  },
  maps: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: constants.color.graySoft,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  select: {
    padding: 10,
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 5,
    },
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    fontSize: 13,
    padding: '6px 12px 6px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const MapsLocation = (props) => {
  const classes = useStyles();
  const { position, zoom } = props;
  return (
    <Box className={classes.mapContainer}>
      <Map
        className={classes.maps}
        center={position}
        zoom={zoom}
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
  );
};

MapsLocation.propTypes = {
  position: PropTypes.array,
  zoom: PropTypes.number,
};

MapsLocation.defaultProps = {
  position: [-7.8289701, 110.3776528],
  zoom: 13,
};

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
  case 'renewal':
    return <Typography align="right" style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #FFB443', color: '#FFB443', fontSize: 14, fontWeight: 500, backgroundColor: '#FFF9F0'}}>
      Renewal
    </Typography>;
  case 'reopen':
    return <Typography align="right" style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #88ADFF', color: '#88ADFF', fontSize: 14, fontWeight: 500, backgroundColor: '#EFF4FF'}}>
      Reopen
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

const DetailAtmInfoPaper = (props) => {
  const { data, type, location, cost } = props;
  const classes = useStyles();
  const tabsStyles = {
    root: classes.rootTabs,
    indicator: classes.tabsIndicator,
  };
  const tabItemStyles = {
    root: classes.rootItemTabs,
    selected: classes.selectedTabItem,
    wrapper: classes.wrapperTabItem,
  };
  console.log(data);
  // useEffect(() => {
  //   if(data === null){
  //     setModalLoader(true)
  //   } else{
  //     setModalLoader(false)
  //   }
  // }, [data])

  // const [position, setPosition] = useState([-7.8289701, 110.3776528]);
  // const position = location;
  // TABS
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTab = (event, newValue) => {
    event.preventDefault();
    setSelectedTab(newValue);
    if (newValue === 0) {
      console.log('Tab Current 0');
    } else if (newValue === 1) {
      console.log('Tab Current 1');
    } else if (newValue === 2) {
      console.log('Tab Current 2');
    } else {
      console.log('Tab Default');
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

  // formatBy
  // Cost
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [filterByValue, setFilterByValue] = useState('1');
  const [showCost, setShowCost] = useState({});
  const handleFilterByChange = (event) => {
    setFilterByValue(event.target.value);
  };
  useEffect(() => {
    console.log('year berubah', filterByValue);
    if (cost?.length > 0) {
      const newCost = {
        biayaSewa:
          cost[filterByValue]?.yearlyRentCost === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.yearlyRentCost),
        biayaListrik:
          cost[filterByValue]?.yearlyElectricityCost === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.yearlyElectricityCost),
        telepon:
          cost[filterByValue]?.yearlyTelephoneRentCost === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.yearlyTelephoneRentCost),
        service:
          cost[filterByValue]?.yearlyServiceCharge === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.yearlyServiceCharge),
        totalSewa:
          cost[filterByValue]?.totalRent === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.totalRent),
        tengah:
          cost[filterByValue]?.averageOffering === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.averageOffering),
        max:
          cost[filterByValue]?.maxOffering === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.maxOffering),
        min:
          cost[filterByValue]?.minOffering === null
            ? 'N/A'
            : RupiahConverter(cost[filterByValue]?.minOffering),
      };
      console.log('TEST', cost);
      console.log('test', newCost);
      setShowCost(newCost);
    }
  },[filterByValue,cost,]);

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  const [dataPhotos, setDataPhotos]=useState([]);
  useEffect(()=>{

    if (isEmpty(data) === false){
      try{
        if(data.locationMachinePhotos !== null){
          if(data.locationMachinePhotos !== ""){
            setDataPhotos((prevData)=>{
              return [
                ...prevData,
                data.locationMachinePhotos
              ];
            });
          }
        } if(data.locationFrontMachinePhoto !== null){
          if(data.locationFrontMachinePhoto !== ""){
            setDataPhotos((prevData)=>{
              return [
                ...prevData,
                data.locationFrontMachinePhoto
              ];
            });
          }
        }  if(data.locationPhotosPositionNeonSign !== null){
          if(data.locationPhotosPositionNeonSign !== ""){
            setDataPhotos((prevData)=>{
              return [
                ...prevData,
                data.locationPhotosPositionNeonSign
              ];
            });
          }
        } if(data.locationPhotosPositionAtenaVsat !== null){
          if(data.locationPhotosPositionAtenaVsat !== ""){
            setDataPhotos((prevData)=>{
              return [
                ...prevData,
                data.locationPhotosPositionAtenaVsat
              ];
            });
          }
        } 
      }catch(err){
        alert("Error get minio images: ",err);
      }
    }
  },[data]);
  useEffect(()=>{
    console.log(">>>> Images dataPhotos: ",JSON.stringify(dataPhotos));
  },[dataPhotos]);

  const RenderImageSlider=({filePath})=>{
    const [imageSlider,seImageSlider] = useState(null);
    useEffect(()=>{
      try{
        getMinioFile(filePath).then(result=>{
          console.log(">>>> try getMinio Offering ",JSON.stringify(result));
          seImageSlider(result);
        });
      }catch(err){
        console.log(">>>> Error try getMinio", err);
      }
    },[]);
    useEffect(()=>{console.log(">>>> imageSlider: ", imageSlider);},[imageSlider]);
    return(
      <div style={{ textAlign: 'center', }}>
        {imageSlider !== null &&
        <img src={imageSlider.fileUrl} alt="img" style={{width:'100%'}}/>
        }
      </div>
    );
  };
  RenderImageSlider.propTypes={
    filePath: PropTypes.string.isRequired,
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item>
          {data === undefined ? (
            <Typography style={{ fontSize: 28 }}>ATM</Typography>
          ) : (
            <Typography style={{ fontSize: 28 }}>ATM {data.id}</Typography>
          )}
        </Grid>
        <Grid item>
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
        <Grid item>{isEmpty(data) ? 'N/A' : renderType(data.openingType)}</Grid>
      </Grid>
      <div style={{ marginTop: 10 }}>
        <TabPanel value={selectedTab} index={0}>
          <Grid container spacing={2}>
            <Grid item className={classes.gridContent} xs={2}>
              <div className={classes.sliderContainer}>
                {dataPhotos.length > 0 ? <Slider {...settingsSlider}>
                  {dataPhotos.map((image) => {
                    return <RenderImageSlider filePath={image} />;
                  })}
                </Slider>: <Typography style={{fontStyle: 'italic', color: '#BCC8E7'}}>No images</Typography>
                }
              </div>
            </Grid>
            <Grid item className={classes.gridContent} xs={5}>
              <Table size="small">
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Kondisi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.openingType}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Nama Lokasi / ID
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.newLocation}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Alamat
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.address}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    RO/Area
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.area}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Cabang
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.branch}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    PIC Cabang
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.branchPicName}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    PIC Pemilik / Pengelola
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.ownerPicName}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    PIC on Location
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.locationPicName}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Populasi ATM
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.countAtm}
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
                    : {isEmpty(data) ? 'N/A' : data.locationType}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Kategori Lokasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.locationCategory}
                  </TableCell>
                </TableRow>
                {/* <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Jenis Lokasi Makro
                  </TableCell>
                  <TableCell className={classes.tableCell}>: -</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Jenis Lokasi Mikro
                  </TableCell>
                  <TableCell className={classes.tableCell}>: -</TableCell>
                </TableRow> */}
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Aksesibilitas/Operasional
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.workingHour}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Akses Umum/Publik
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.publicAccessibility}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Luas Area ATM
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.buildingLarge}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Jumlah ATM Bank Lain
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.aroundAtmCount}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Tipe ATM
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.typeAtm}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Ruang ATM
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.boothType}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>
                    Komunikasi
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    : {isEmpty(data) ? 'N/A' : data.commType}
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <MapsLocation position={location} />
        </TabPanel>
        <TabPanel value={selectedTab} index={2} style={{ minHeight: 250 }}>
          <Grid container direction="column">
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography style={{ fontSize: 15, fontWeight: 600 }}>
                  Lihat Keseluruhan Harga Dalam :
                </Typography>
              </Grid>
              <Grid item>
                {/* ===> Start Select FilterBy */}
                <FormControl className={classes.select}>
                  <Select
                    id="filterBy"
                    value={filterByValue}
                    onChange={handleFilterByChange}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value={0}>Tahun ke 1</MenuItem>
                    <MenuItem value={1}>Tahun ke 2</MenuItem>
                    <MenuItem value={2}>Tahun ke 3</MenuItem>
                    <MenuItem value={3}>Tahun ke 4</MenuItem>
                    <MenuItem value={4}>Tahun ke 5</MenuItem>
                  </Select>
                </FormControl>
                {/* ===< End Select FilterBy */}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}
                >
                  Biaya Sewa
                </Typography>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Biaya Sewa
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.biayaSewa}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Biaya Listrik
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.biayaListrik}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                    Komunikasi
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.telepon}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Service Charge
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.service}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCellTotal}>
                      Total
                    </TableCell>
                    <TableCell className={classes.tableCellTotal}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.totalSewa}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}
                >
                  Perkiraan Harga
                </Typography>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Nilai Terendah
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.min}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Nilai Tengah
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.tengah}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      Nilai Tertinggi
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      : {isEmpty(showCost) ? 'N/A' : showCost.max}
                    </TableCell>
                  </TableRow>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
      </div>
      <ModalLoader isOpen={isOpenModalLoader} />
    </Paper>
  );
};

DetailAtmInfoPaper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  type: PropTypes.string,
  location: PropTypes.array,
  cost: PropTypes.object,
  id: PropTypes.string,
};

DetailAtmInfoPaper.defaultProps = {
  type: null,
};

export default DetailAtmInfoPaper;
