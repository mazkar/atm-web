/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { Box, Grid, Paper, Tab, Table, TableCell, TableRow, Tabs, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import PropTypes, { object } from 'prop-types';
import Slider from "react-slick";
import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, ZoomControl} from 'react-leaflet';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import constants from '../../../../helpers/constants';
import ImgcimbBank from '../../../../assets/images/cimb-atm.png';
import ImgcimbAtm from '../../../../assets/images/cimb-forecasting.png';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/general/dropdown_red.svg';
import getMinioFile from '../../../../helpers/getMinioFile';
import RupiahConverter from '../../../../helpers/useRupiahConverter';

const useStyles = makeStyles({
  root: {padding: 20,borderRadius: 10},
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
    "& .MuiTableCell-sizeSmall":{padding: 2,},
  },
  tableCell: {
    borderBottom: "unset",
    fontSize:12,
  },
  tableCellTotal: {
    borderBottom: "unset",
    fontWeight: 700,
    fontSize:13,
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
    '& .MuiSelect-icon':{
      top: 'unset',
      right: 5,
    }
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

const MapsLocation=(props)=>{
  const classes = useStyles();
  const {position, zoom} = props;
// console.log(`INI POSITION ${position}`);
  return(
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

const dataAtmDummy = {
  "type": "New",
  "kondisi": "Lama",
  "lokasiId": "JKT.CRM.Rezeki Fresh Market",
  "alamat": "Jl. Hayam Wuruk No. 2AA, RT.7/RW.2",
  "roArea": "-",
  "cabang": "Hayam Wuruk",
  "picCabang": "Username",
  "picPemilik": "Username",
  "picOnLocation": "Username",
  "populasiATM": "34 ATM sejenis dalam 1 area",
  "jenisLokasi": "Cabang",
  "jenisLokasiMakro": "-",
  "jenisLokasiMikro": "-",
  "aksesibilitas": "24 Jam",
  "aksesPublik": "Ya",
  "luasArea": "1,5 m2",
  "jumlahAtmBankLain": "1",
  "tipeAtm": "-",
  "ruangAtm": "-",
  "komunikasi": "Telepon",
  "images": [{"src":ImgcimbAtm}, {"src":ImgcimbBank}],
};

const costAtmDummy = {
  "biayaSewa": "Rp. 31.500.000",
  "biayaListrik": "Rp. 200.000",
  "telepon": "Rp. 300.000",
  "serviceCharge": "Rp. 100.000",
  "total": "Rp. 34.500.000",
  "nilaiTerendah": "Rp.10.000.000",
  "nilaiTengah": "Rp. 20.000.000",
  "nilaiTertinggi": "Rp. 30.000.000"
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
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useTypeStyles =makeStyles({
  root: {
    display:'flex', 
    flexWrap:'wrap', 
    padding: '15px 0px',
    alignItems: 'center',
    alignContent: 'center'
  },
  avatar: {}
});

const TypeAtm = (props) => {
  const {type} = props;
  const classes = useTypeStyles();
  function renderBackColor(openingType){
    if(openingType === 'New ATM' || openingType === 'New Location'){
      return '#DEFFE1';
    }
    if (openingType === 'Termin'){
      return '#FFF6F6';
    }
    if (openingType === 'Renewal'){
      return '#EBF0FF';
    }
    if (openingType === 'Replace'){
      return '#FFF9F0';
    }
    if (openingType === 'Migration'){
      return '#DDD7FF';
    }
    return '#EBF0FF';
  }
  function renderTypeColor(openingType){
    if(openingType === 'New ATM' || openingType === 'New Location'){
      return '#65D170';
    }
    if (openingType === 'Termin'){
      return '#FF6A6A';
    }
    if (openingType === 'Renewal'){
      return '#749BFF';
    }
    if (openingType === 'Replace'){
      return '#FFB443';
    }
    if (openingType === 'Migration'){
      return '#7B61FF';
    }
    return '#749BFF';
  }
  return(
    <div className={classes.root}>
      <Typography style={{
        position: 'relative', 
        marginLeft: 100,
        fontSize: 12, 
        fontWeight:'bold', 
        textAlign: 'center',
        padding: '8px 16px',
        borderRadius: 6,
        border: '1px solid',
        backgroundColor: renderBackColor(type),
        color: renderTypeColor(type),
        borderColor: renderTypeColor(type),
      }}>{type}</Typography>
    </div>
  );
};

TypeAtm.propTypes = {
  type: PropTypes.string,
};

const DetailAtmInfoPaper = (props) => {
  const { data, position, cost, atmId } = props;
  // console.log('TEST CST',cost);
  // console.log(`DATA ==>${JSON.stringify(data)}`);
  // console.log(atmId);

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
        let newPhotos=[]
          if(data.locationMachinePhotos){
            newPhotos.push(data.locationMachinePhotos)
          }
          if(data.locationFrontMachinePhoto){
            newPhotos.push(data.locationFrontMachinePhoto)
          }
          if(data.locationPhotosPositionNeonSign){
            newPhotos.push(data.locationPhotosPositionNeonSign)
          }
          if(data.locationPhotosPositionAtenaVsat){
            newPhotos.push(data.locationPhotosPositionAtenaVsat)
          }
          setDataPhotos(newPhotos)
      }catch(err){
        alert("Error get minio images: ",err);
      }
    }
  },[data]);
  useEffect(()=>{
  // console.log(">>>> Images dataPhotos: ",JSON.stringify(dataPhotos));
  // console.log('~ dataPhotos', dataPhotos)
  },[dataPhotos]);

  const RenderImageSlider=({filePath})=>{
    const [imageSlider,seImageSlider] = useState(null);
    useEffect(()=>{
      try{
        getMinioFile(filePath).then(result=>{
          // console.log(">>>> try getMinio Offering ",JSON.stringify(result));
          seImageSlider(result);
        });
      }catch(err){
        console.log(">>>> Error try getMinio", err);
      }
    },[]);
    
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

  // formatBy
  const [filterByValue, setFilterByValue] = useState(0);
  const handleFilterByChange = (event) => {
    setFilterByValue(event.target.value);
  };
  const [showCost, setShowCost] = useState({});
  const [images, setImages] = useState([]);
  useEffect(() => {
  // console.log('year berubah', filterByValue);
    if (cost?.length > 0) {
      const newCost = {
        biayaSewa: cost[filterByValue]?.yearlyRentCost === null ? "-" :RupiahConverter(cost[filterByValue]?.yearlyRentCost),
        biayaListrik: cost[filterByValue]?.yearlyElectricityCost === null ? "-" : RupiahConverter(cost[filterByValue]?.yearlyElectricityCost),
        telepon: cost[filterByValue]?.yearlyTelephoneRentCost === null ? "-" : RupiahConverter(cost[filterByValue]?.yearlyTelephoneRentCost),
        serviceCharge: cost[filterByValue]?.yearlyServiceCharge === null ? "-" : RupiahConverter(cost[filterByValue]?.yearlyServiceCharge),
        total: cost[filterByValue]?.totalRent === null ? "-" : RupiahConverter(cost[filterByValue]?.totalRent),
        nilaiTengah: data.nilaiTengah === null ? "-" : RupiahConverter(data.nilaiTengah),
        nilaiTertinggi: data.nilaiTertinggi === null ? "-" :RupiahConverter(data.nilaiTertinggi),
        nilaiTerendah: data.nilaiTerendah === null ? "-" : RupiahConverter(data.nilaiTerendah),
      };
      
      setShowCost(newCost);
    // console.log('test',newCost);
    }
  },[filterByValue,cost,data]);

  useEffect(()=> {
    try{
      if(data.locationPhotoslist){
        data.locationPhotoslist.map((image)=>{
        getMinioFile(image).then(
          result=>{
            try{
              // urlImages.push(result.fileUrl);
              setImages((prevData)=>{
                return [
                  ...prevData,
                  result.fileUrl
                ];
              });
            }catch{
              console.log(">>> error set data ");
            }
          });
        });
      }
    }catch(err){
      console.log("Error get minio images: ",err);
    }
    // console.log('>>>> data',data);
  },[data]);
  //   const [position, setPosition] = useState([-7.8289701, 110.3776528]);
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
    arrows:false,
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={3}><Typography style={{fontSize:28,}}>ATM {data.type=== "New ATM" || data.type=== "Reopen" ? data.requestId : data.atmId} </Typography></Grid>
        <Grid item sm={6}>
          <Tabs
            classes={tabsStyles}
            value={selectedTab} 
            onChange={handleSelectedTab}
            centered
          >
            <Tab classes={tabItemStyles} label="Informasi Umum"  />
            <Tab classes={tabItemStyles} label="Location" />
            <Tab classes={tabItemStyles} label="Estimasi & Perkiraan Harga" />
          </Tabs>
        </Grid>
        <Grid item sm={3} className={classes.type}>
          <TypeAtm type={data.type}/>
        </Grid>
      </Grid>
      <div style={{marginTop:10,}}>
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
                  <TableCell width="40%" className={classes.tableCell}>Kondisi</TableCell>
                  <TableCell className={classes.tableCell}>: {data.kondisi}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Nama Lokasi / ID</TableCell>
                  <TableCell className={classes.tableCell}>: {data.lokasiId}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Alamat</TableCell>
                  <TableCell className={classes.tableCell}>: {data.alamat}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Initial Cabang</TableCell>
                  <TableCell className={classes.tableCell}>: {data.branchInitial}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Code GFMS</TableCell>
                  <TableCell className={classes.tableCell}>: {data.codeGFMS}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>PIC Cabang</TableCell>
                  <TableCell className={classes.tableCell}>: {data.picCabang}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Nama PIC Lokasi</TableCell>
                  <TableCell className={classes.tableCell}>: {data.picPemilik}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Nama Penanda Tangan LOO / MOU</TableCell>
                  <TableCell className={classes.tableCell}>: {data.picOnLocation}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Populasi ATM</TableCell>
                  <TableCell className={classes.tableCell}>: {data.populasiATM}</TableCell>
                </TableRow>
              </Table>
            </Grid>
            <Grid item className={classes.gridContent} xs={5}>
              <Table size="small">
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Jenis Lokasi</TableCell>
                  <TableCell className={classes.tableCell}>: {data.categoryType}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Kategori Lokasi</TableCell>
                  <TableCell className={classes.tableCell}>: {data.locationCategory}</TableCell>
                </TableRow>
                {/* <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Jenis Lokasi Makro</TableCell>
                  <TableCell className={classes.tableCell}>: {data.jenisLokasiMakro}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Jenis Lokasi Mikro</TableCell>
                  <TableCell className={classes.tableCell}>: {data.jenisLokasiMikro}</TableCell>
                </TableRow> */}
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Aksesibilitas/Operasional</TableCell>
                  <TableCell className={classes.tableCell}>: {data.aksesibilitas}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Akses Umum/Publik</TableCell>
                  <TableCell className={classes.tableCell}>: {data.aksesPublik}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Luas Area ATM</TableCell>
                  <TableCell className={classes.tableCell}>: {data.luasArea}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Jumlah ATM Bank Lain</TableCell>
                  <TableCell className={classes.tableCell}>: {data.jumlahAtmBankLain}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Tipe ATM</TableCell>
                  <TableCell className={classes.tableCell}>: {data.tipeAtm}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Ruang ATM</TableCell>
                  <TableCell className={classes.tableCell}>: {data.boothType}</TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell width="40%" className={classes.tableCell}>Komunikasi</TableCell>
                  <TableCell className={classes.tableCell}>: {data.komunikasi}</TableCell>
                </TableRow>
              </Table>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <MapsLocation position={position}/>
        </TabPanel>
        <TabPanel value={selectedTab} index={2} style={{minHeight: 250}}>
          <Grid container direction="column">
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography style={{fontSize: 15, fontWeight: 600}}>Lihat Keseluruhan Biaya Dalam :</Typography>
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
                    {cost?.length > 0 ? cost?.map((item, index)=>{
                      return <MenuItem value={index}>Tahun ke - {index+1}</MenuItem>;
                    }) : <MenuItem value={0}>Tahun ke - 1</MenuItem>}
                    {/* <MenuItem value={1}>Tahun ke - 2</MenuItem>
                    <MenuItem value={2}>Tahun ke - 3</MenuItem>
                    <MenuItem value={3}>Tahun ke - 4</MenuItem>
                    <MenuItem value={4}>Tahun ke - 5</MenuItem> */}
                  </Select>
                </FormControl>
                {/* ===< End Select FilterBy */}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography style={{fontSize:15, fontWeight: 600, marginBottom: 10}}>Biaya Sewa</Typography>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>Biaya Sewa</TableCell>
                    <TableCell className={classes.tableCell}> : {showCost.biayaSewa}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>Biaya Listrik</TableCell>
                    <TableCell className={classes.tableCell}> : {showCost.biayaListrik}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>Telepon</TableCell>
                    <TableCell className={classes.tableCell}> : {showCost.telepon}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>Service Charge</TableCell>
                    <TableCell className={classes.tableCell}> : {showCost.serviceCharge}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCellTotal}>Total</TableCell>
                    <TableCell className={classes.tableCellTotal}> : {showCost.total}</TableCell>
                  </TableRow>
                </Table>
              </Grid>
              <Grid item xs={4}>
                <Typography style={{fontSize:15, fontWeight: 600, marginBottom: 10}}>Perkiraan Harga</Typography>
                <Table size="small">
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>Nilai Terendah</TableCell>
                    <TableCell className={classes.tableCell}> : {showCost.nilaiTerendah}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>Nilai Tengah</TableCell>
                    <TableCell className={classes.tableCell}> : {showCost.nilaiTengah}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>Nilai Tertinggi</TableCell>
                    <TableCell className={classes.tableCell}> : {showCost.nilaiTertinggi}</TableCell>
                  </TableRow>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    </Paper>
  );
};

DetailAtmInfoPaper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  position: PropTypes.array,
  cost: PropTypes.object,
  atmId: PropTypes.string,
};

DetailAtmInfoPaper.defaultProps  = {
  data: dataAtmDummy,
  position: [-7.8289701, 110.3776528],
  cost: costAtmDummy,
};

export default DetailAtmInfoPaper;
