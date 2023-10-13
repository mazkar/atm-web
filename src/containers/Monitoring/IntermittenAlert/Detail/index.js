/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import {
  Typography,
  Button,
  Grid,
  Table,
  TableCell,
  TableRow,
  List,
  ListItem
} from '@material-ui/core';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Slider from "react-slick";
import { useParams } from 'react-router-dom';

/* Internal Import */
import { ChkyTablePagination } from "../../../../components";
import { ChkyTabsAsOption } from "../../../../components/chky";
import {PrimaryHard, PrimaryUltrasoft, GrayUltrasoft} from "../../../../assets/theme/colors";
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import {ReactComponent as MailIcon} from "../../../../assets/icons/whiteIcons/white-outlined.svg";
import dummyData from "../common/dummyData";
import TableTemplate from "../common/TableTemplate/detail";
import AddEmailPopup from "../common/AddEmailPopup";
import ServiceIntermittenAlert from '../service';
import LoadingView from '../../../../components/Loading/LoadingView';
import EmptyImg from "../../../../assets/images/empty_data.png"

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 28,
    color: "#2B2F3C",
  },
  rootButton: {
    width: "max-content",
    height: 40,
    borderRadius: 8,
    textTransform: "capitalize",
    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
  },
  containedButton: {
    color: "#ffffff",
    backgroundColor: PrimaryHard,
  },
  outlinedButton: {
    border: "1px solid",
    borderColor: PrimaryHard,
    color: PrimaryHard,
    backgroundColor: "#ffffff"
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize"
  },
  wrapper: {
    background: "#ffffff",
    borderRadius: "6px",
    padding: "20px",
    marginBottom: "24px"
  },
  labelBox: {
    backgroundColor: "#DEFFE1",
    color: "#65D170",
    border: "1px solid #65D170",
    borderRadius: "6px",
    padding: "8px 16px"
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2 },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 12,
  },
  listItem: {
    "&.Mui-selected": {
      backgroundColor: PrimaryUltrasoft
    },
    "&.Mui-selected:hover": {
      backgroundColor: PrimaryUltrasoft
    }
  },
  listTextTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#2B2F3C"
  },
  listTextSubtitle: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#8D98B4"
  },
  maps: {
    position: "relative",
    height: "400px",
    width: "100%",
    backgroundColor: GrayUltrasoft,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: "10px"

  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

const rowsPerPage = 10; // <--- init default rowsPerPage

const IntermittenAlertDetail = () => {
  const {id} = useParams()
  const { hitIntermittenDetail, hitProblemDetailIntermitten, hitProblemList } = ServiceIntermittenAlert()
  const classes = useStyles();
  const history = useHistory();

  const dataTab = [
    "Informasi Umum",
    "Location",
    "Detail"
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const dummyPhotos = [
    'https://images.unsplash.com/photo-1646549101199-4f96e60584e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80',
    'https://images.unsplash.com/photo-1646550574194-2409555b1866?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2350&q=80'
  ];

  // const tableData = [
  //   {
  //     id: "1234",
  //     start: "12/12/2021, 01:00:00",
  //     end: "12/12/2022, 01:00:00",
  //     durasi: "30 menit",
  //     jenisProblem: "Casette 3 Not Configured"
  //   },
  //   {
  //     id: "1234",
  //     start: "12/12/2021, 01:00:00",
  //     end: "12/12/2022, 01:00:00",
  //     durasi: "30 menit",
  //     jenisProblem: "Casette 3 Not Configured"
  //   },
  // ];

  const [generalInformation, setGeneralInformation] = useState([])
  const [detailData, setDetailData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadTable, setIsLoadTable] = useState(false)
  const [dialog, setDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [listMenu, setListMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState({});
  const [tableData, setTableData] = useState([])
  const [mapState, setMapState] = useState([])
  const [imageData, setImageData] = useState([])
  const [tableConfig, setTableConfig] = useState({
    dataRequest: {
      pageNumber: 0,
      dataPerPage: rowsPerPage,
      sortBy: "id",
      sortType: "ASC",
    },
    orderDirection: "ASC",
    totalPages: 0,
    totalRows: 0,
    sortBy: null
  });

  /* Methods */
  function handleBackButton() {
    history.push(`/monitoring/intermitten-alert`);
  }

  function handleChangeTab(event){
    setCurrentTab(event);
  }

  function handleListItemClick(event, object, index){
    const tempObject = {...object};
    const newObject = {
      name: tempObject.title,
      code: tempObject.problemCode,
      index
    };
    setSelectedMenu(newObject);
    console.log(newObject) 
  }

  function handleChangePage(newPage) {
    setTableConfig({
      dataRequest: {
        ...tableConfig.dataRequest,
        pageNumber: newPage
      }
    });
  }

  const dataTitle = (data) => {
    switch (data) {
      case "conditions":
        return "Kondisi";
        break;
      case "locationName":
        return "Nama Lokasi / ID";
        break;
      case "address":
        return "Alamat";
        break;
      case "picRequest":
        return "PIC Request";
        break;
      case "phonePicRequest":
        return "No HP PIC Request";
        break;
      case "emailPicRequest":
        return "Email PIC Request";
        break;
      case "picLocation":
        return "PIC Lokasi";
        break;
      case "phonePicLocation":
        return "No HP PIC Lokasi";
        break;
      case "emailPicLocation":
        return "Email PIC Lokasi";
        break;
      case "signedNameMou":
        return "Nama Penandatangan LOO / MOU";
        break;
      case "signedPhoneMou":
        return "NO HP Penandatangan LOO / MOU";
        break;
      case "signedEmailMou":
        return "Email Penandatangan LOO / MOU";
        break;
      case "gfmsCode":
        return "Kode GFMS";
        break;
      case "idRequester":
        return "ID Requester";
        break;
      case "area":
        return "RO/Area";
        break;
      case "branch":
        return "Cabang";
        break;
      case "locationVariety":
        return "Jenis Lokasi";
        break;
      case "locationType":
        return "Tipe Lokasi";
        break;
      case "atmPopulation":
        return "Populasi ATM";
        break;
      case "accessibility":
        return "Aksesibilitas/Operasional";
        break;
      case "publicAccess":
        return "Akses Umum/Publik";
        break;
      case "wideAtm":
        return "Luas Area ATM";
        break;
      case "numOfOtherAtm":
        return "Jumlah ATM Bank Lain";
        break;
      case "atmType":
        return "Tipe ATM";
        break;
      case "atmBooth":
        return "Ruang ATM";
        break;
      case "comm":
        return "Komunikasi";
        break;
      case "initialBranch":
        return "Initial Cabang";
        break;
      case "locationTypeDetail":
        return "Tipe Lokasi";
        break;
      case "atmRoomDetail":
        return "Ruang ATM";
        break;
      case "wideAtmDetail":
        return "Luas Area ATM";
        break;
      case "publicAccessDetail":
        return "Akses Umum";
        break;
      case "startWorkHourDetail":
        return "Jam Mulai Operasional";
        break;
      case "endWorkHourDetail":
        return "Jam Selesai Operasional";
        break;
      case "numOfOtherAtmDetail":
        return "Jumlah ATM Bank Lain";
        break;
      case "denomDetail":
        return "Denom";
        break;
      case "acDetail":
        return "AC";
        break;
      case "cleanDetail":
        return "Kebersihan";
        break;
      case "commTypeDetail":
        return "Jenis Komunikasi";
        break;
      case "mediaPromotionDetail":
        return "Media Promosi";
        break;
      default:
        return "UNKNOWN";
        break;
    }
  }

  const groupData = (data) => {
    switch (data) {
      case "conditions":
        return "generalInformation";
        break;
      case "locationName":
        return "generalInformation";
        break;
      case "address":
        return "generalInformation";
        break;
      case "picRequest":
        return "generalInformation";
        break;
      case "phonePicRequest":
        return "generalInformation";
        break;
      case "emailPicRequest":
        return "generalInformation";
        break;
      case "picLocation":
        return "generalInformation";
        break;
      case "phonePicLocation":
        return "generalInformation";
        break;
      case "emailPicLocation":
        return "generalInformation";
        break;
      case "signedNameMou":
        return "generalInformation";
        break;
      case "signedPhoneMou":
        return "generalInformation";
        break;
      case "signedEmailMou":
        return "generalInformation";
        break;
      case "gfmsCode":
        return "generalInformation";
        break;
      case "idRequester":
        return "generalInformation";
        break;
      case "area":
        return "generalInformation";
        break;
      case "branch":
        return "generalInformation";
        break;
      case "locationVariety":
        return "generalInformation";
        break;
      case "locationType":
        return "generalInformation";
        break;
      case "atmPopulation":
        return "generalInformation";
        break;
      case "accessibility":
        return "generalInformation";
        break;
      case "publicAccess":
        return "generalInformation";
        break;
      case "wideAtm":
        return "generalInformation";
        break;
      case "numOfOtherAtm":
        return "generalInformation";
        break;
      case "atmType":
        return "generalInformation";
        break;
      case "atmBooth":
        return "generalInformation";
        break;
      case "comm":
        return "generalInformation";
        break;
      case "initialBranch":
        return "generalInformation";
        break;
      case "locationTypeDetail":
        return "dataDetail";
        break;
      case "atmRoomDetail":
        return "dataDetail";
        break;
      case "wideAtmDetail":
        return "dataDetail";
        break;
      case "publicAccessDetail":
        return "dataDetail";
        break;
      case "startWorkHourDetail":
        return "dataDetail";
        break;
      case "endWorkHourDetail":
        return "dataDetail";
        break;
      case "numOfOtherAtmDetail":
        return "dataDetail";
        break;
      case "denomDetail":
        return "dataDetail";
        break;
      case "acDetail":
        return "dataDetail";
        break;
      case "cleanDetail":
        return "dataDetail";
        break;
      case "commTypeDetail":
        return "dataDetail";
        break;
      case "mediaPromotionDetail":
        return "dataDetail";
        break;
      case "latitude":
        return "maps";
        break;
      case "longitude":
        return "maps";
        break;
      case "images":
        return "images";
        break;
      default:
        return "UNKNOWN";
        break;
    }
  };
  
  const problemCategory = (param) => {
    switch (param) {
      case "CF":
        return "Card Reader";
        break;
      case "CO":
        return "Cash Out";
        break;
      case "LC":
        return "Lost Comm";
        break;
      case "SL":
        return "SLM";
        break;
      case "DF":
        return "Dispenser";
        break;
      case "EF":
        return "Encryptor";
        break;
      case "HW":
        return "Hardware";
        break;
      case "SP":
        return "Spv Mode";
        break;
      case "IM":
        return "Implementasi";
        break;
      case "IN":
        return "Insurance";
        break;
      case "JF":
        return "Journal";
        break;
      case "MT":
        return "Maintenance";
        break;
      case "MP":
        return "Media Promosi";
        break;
      case "PM":
        return "PM";
        break;
      case "RF":
        return "Receipt Printer";
        break;
      case "SC":
        return "Security";
        break;
      case "OT":
        return "Other";
        break;

      default:
        return param;
        break;
    }
  };

  const convertToSideCardUI = (res) => {
    const arr = [];
    res.map((item) => {
      const obj = {};
      obj.title = problemCategory(item.problem);
      obj.problemCode = item.problem;
      obj.subtitle = item.total;
      obj.isSelected = false;
      arr.push(obj);
    });
    return arr;
  };
  
  const convertToTableData = (res) => {
    const arr = [];
    res.map((item) => {
      const obj = {};
      obj.id = item.atmId;
      obj.start = new Date(item.startDate).toLocaleString();
      obj.end = new Date(item.endDate).toLocaleString();
      obj.durasi = item.duration;
      obj.jenisProblem = item.problemDetail;
      obj.category = problemCategory(item.category);
      arr.push(obj);
    });
    return arr;
  };
  
  const convertToUI = (data) => {
    const dataUI = [];
    Object.keys(data).map((key, index) => {
      const obj = {};
      obj.key = Object.keys(data)[index];
      obj.title = dataTitle(Object.keys(data)[index]);
      obj.group = groupData(Object.keys(data)[index]);
      obj.value = Object.values(data)[index];
      dataUI.push(obj);
    });
    return dataUI;
  };

  const checkNullValue = (val) => {
    if(!val) return "-"
    if(val === "null") return "-"
    return val
  }

  useEffect(() => {
    hitIntermittenDetail(id).then((res) => {
      if(res.status === 200) {
        const {data} = res.data
        const allData = convertToUI(data)
        const filterGeneralInformation = allData.filter((x) => x.group == "generalInformation")
        const filterDetailData = allData.filter((x) => x.group == "dataDetail")
        const filterImagesData = allData.find((x) => x.group == "images")
        const filterMaps = allData.filter((x) => x.group == "maps")
  
        setGeneralInformation(filterGeneralInformation)
        setDetailData(filterDetailData)
        setMapState(filterMaps)
        setImageData(filterImagesData)
        
        setIsLoading(false)
      }
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    })

    hitProblemList(id).then((res) => {
      if(res.status === 200) {
        setListMenu(convertToSideCardUI(res.data.totalProblemByCategory))
      }
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    const {dataRequest} = tableConfig
    if(selectedMenu.code) {
      setIsLoadTable(true)
      hitProblemDetailIntermitten(dataRequest.dataPerPage, dataRequest.pageNumber, dataRequest.sortType, id, selectedMenu.code).then((res) => {
        if(res.status === 200) {
          const { data } = res.data
  
          setTableData(convertToTableData(data))
          setTableConfig({...tableConfig, totalPages: res.data.totalPages, totalRows: res.data.totalElements })
        }
        setIsLoadTable(false)
      }).catch((err) => {
        setIsLoadTable(false)
        console.log(err) 
      })
    }
  }, [tableConfig.dataRequest.pageNumber, selectedMenu])

  /* Functional Component */
  const RenderImageSlider=({filePath})=>{
  // const [imageSlider,seImageSlider] = useState(null);
  // useEffect(()=>{
  //   try{
  //     getMinioFile(filePath).then(result=>{
  //     // console.log(">>>> try getMinio Offering ",JSON.stringify(result));
  //       seImageSlider(result);
  //     });
  //   }catch(err){
  //     console.log(">>>> Error try getMinio", err);
  //   }
  // },[]);
  // useEffect(()=>{console.log(">>>> imageSlider: ", imageSlider);},[imageSlider]);
    return(
      <div style={{ textAlign: 'center', }}>
        {filePath !== null &&
      <img src={filePath} alt="img" style={{width:'100%'}}/>
        }
      </div>
    );
  };
  RenderImageSlider.propTypes={
    filePath: PropTypes.string.isRequired,
  };

  const GeneralInformationPanel = () => {
    /* Anchor */
    const firstColumnStart = 0;
    const firstColumnEnd = Math.floor(generalInformation.length / 2);

    const secondColumnStart = firstColumnEnd;
    const secondColumnEnd = generalInformation.length;

    return(
      <Grid container alignItems="start" style={{flexWrap: "nowrap"}}>
        <Grid item xs={2} style={{marginBottom: '24px', marginRight: '24px'}}>
          <div className={classes.sliderContainer}>
            <Slider {...sliderSettings} adaptiveHeight>
              {imageData.value?.map((image) => {
                if(image) return <RenderImageSlider filePath={image} />;
              })}
            </Slider>
          </div>
        </Grid>
        <Grid item xs={5}>
          <Table size="small">
            {
              generalInformation
                .slice(firstColumnStart, firstColumnEnd)
                ?.map(data => (
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      {data.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>: {checkNullValue(data.value)}</TableCell>
                  </TableRow>
                ))
            }
          </Table>
        </Grid>
        <Grid item xs={5}>
          <Table size="small">
            {
              generalInformation
                .slice(secondColumnStart, secondColumnEnd)
                ?.map(data => (
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      {data.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>: {checkNullValue(data.value)}</TableCell>
                  </TableRow>
                ))
            }
          </Table>
        </Grid>
      </Grid>
    );
  };

  const LocationPanel = () => {
    const latitude = mapState.find((x) => x.key == "latitude")
    const longitude = mapState.find((x) => x.key == "longitude")
    const position = [latitude.value, longitude.value]
    const address = generalInformation.find((x) => x.key == "address")
    return (
      <div>
        <Map center={position} zoom={13} className={classes.maps}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {address.value}
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  };

  const DetailInformationPanel = () => {
    /* Anchor */
    const firstColumnStart = 0;
    const firstColumnEnd = Math.floor(detailData.length / 2);

    const secondColumnStart = firstColumnEnd;
    const secondColumnEnd = detailData.length;

    return(
      <Grid container alignItems="start" style={{flexWrap: "nowrap"}}>
        <Grid item xs={2} style={{marginBottom: '24px', marginRight: '24px'}}>
          <div className={classes.sliderContainer}>
            <Slider {...sliderSettings} adaptiveHeight>
              {imageData.value?.map((image) => {
                if(image) return <RenderImageSlider filePath={image} />;
              })}
            </Slider>
          </div>
        </Grid>
        <Grid item xs={5}>
          <Table size="small">
            {
              detailData
                .slice(firstColumnStart, firstColumnEnd)
                ?.map(data => (
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      {data.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>: {checkNullValue(data.value)}</TableCell>
                  </TableRow>
                ))
            }
          </Table>
        </Grid>
        <Grid item xs={5}>
          <Table size="small">
            {
              detailData
                .slice(secondColumnStart, secondColumnEnd)
                ?.map(data => (
                  <TableRow className={classes.tableRow}>
                    <TableCell width="40%" className={classes.tableCell}>
                      {data.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>: {checkNullValue(data.value)}</TableCell>
                  </TableRow>
                ))
            }
          </Table>
        </Grid>
      </Grid>
    );
  };

  const TabPanel = ({tabs}) => {
    const condition = {
      0: 
        <>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <LoadingView maxheight="100%" isTransparent />
            </div>
          ) : (
            <>
              {generalInformation ? (
                <GeneralInformationPanel />
              ) : (
                <Grid
                container
                alignContent="center"
                justify="center"
                style={{ height: 175 }}
                direction="column"
                >
                  <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                  <Typography
                    style={{
                      opacity: 0.3,
                      textAlign: "center",
                      fontSize: 11,
                      marginTop: 10,
                    }}
                  >
                    Empty
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </>,
      1: 
      <>
        {isLoading ? (
          <div className={classes.loaderWrapper}>
            <LoadingView maxheight="100%" isTransparent />
          </div>
        ) : (
          <>
            {generalInformation ? (
              <LocationPanel />
            ) : (
              <Grid
              container
              alignContent="center"
              justify="center"
              style={{ height: 175 }}
              direction="column"
              >
                <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                <Typography
                  style={{
                    opacity: 0.3,
                    textAlign: "center",
                    fontSize: 11,
                    marginTop: 10,
                  }}
                >
                  Empty
                </Typography>
              </Grid>
            )}
          </>
        )}
      </>,
      2: 
        <>
          {isLoading ? (
            <div className={classes.loaderWrapper}>
              <LoadingView maxheight="100%" isTransparent />
            </div>
          ) : (
            <>
              {generalInformation ? (
                <DetailInformationPanel />
              ) : (
                <Grid
                container
                alignContent="center"
                justify="center"
                style={{ height: 175 }}
                direction="column"
                >
                  <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                  <Typography
                    style={{
                      opacity: 0.3,
                      textAlign: "center",
                      fontSize: 11,
                      marginTop: 10,
                    }}
                  >
                    Empty
                  </Typography>
                </Grid>
              )}
            </>
          )}
        </>,
    };

    return condition[tabs] ?? "";
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justifyContent="space-between" style={{ marginBottom: "20px" }}>
        <Button
          className={classes.textButton}
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            handleBackButton();
          }}
        >
          Back
        </Button>
        <MuiIconLabelButton
          className={`${classes.rootButton} ${classes.containedButton}`}
          label="Kirim Email"
          iconPosition="startIcon"
          buttonIcon={<MailIcon width={24} height={24}/>}
          onClick={()=>{setDialog(true);}}
        />
      </Grid>
      <div className={classes.wrapper}>
        <Grid container justifyContent="space-between" alignItems="center" style={{marginBottom: "30px"}}>
          <Typography className={classes.title}>ATM #1101</Typography>
          <ChkyTabsAsOption currentTab={currentTab} handleChangeTab={handleChangeTab} dataTab={dataTab} minWidth="max-content"/>
          <div className={classes.labelBox}>New</div>
        </Grid>
        <TabPanel tabs={currentTab} />
      </div>
      <Grid container alignItems="start" style={{flexWrap: "nowrap"}}>
        <Grid item xs={3} className={classes.wrapper} style={{marginRight: "20px", height: "50vh"}}>
          <Typography style={{fontFamily: "Barlow", fontWeight: 600, fontSize: "13px"}}>Problems</Typography>
          <List component="nav" style={{maxHeight: "100%", overflow: "auto"}}>
            {isLoading ? (
              <div className={classes.loaderWrapper}>
                <LoadingView maxheight="100%" isTransparent />
              </div>
            ) : (
              <>
                {generalInformation ? (
                  <>
                    {listMenu?.map((item,index) => (
                      <ListItem
                        className={classes.listItem}
                        button
                        selected={selectedMenu && selectedMenu.index === index}
                        onClick={(event) => handleListItemClick(event, item, index)}
                      >
                        <div>
                          <Typography className={classes.listTextTitle}>{item.title}</Typography>
                          <Typography className={classes.listTextSubtitle}>{item.subtitle}</Typography>
                        </div>
                      </ListItem>
                    ))}
                  </>
                ) : (
                  <Grid
                  container
                  alignContent="center"
                  justify="center"
                  style={{ height: 175 }}
                  direction="column"
                  >
                    <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                    <Typography
                      style={{
                        opacity: 0.3,
                        textAlign: "center",
                        fontSize: 11,
                        marginTop: 10,
                      }}
                    >
                      Empty
                    </Typography>
                  </Grid>
                )}
              </>
            )}
          </List>
        </Grid>
        <Grid item xs={9}>
          <ChkyTablePagination
            data={tableData}
            rowsPerPage={rowsPerPage}
            fields={TableTemplate.titleTable}
            cellOption={TableTemplate.valueType}
            isSort={TableTemplate.isSort}
            totalPages={tableConfig.totalPages}
            totalRows={tableConfig.totalRows}
            sortBy={tableConfig.sortBy}
            order={tableConfig.orderDirection}
            changePage={handleChangePage}
            isLoadData={isLoadTable}
            // handleSort={handleSortTable}
            // isUsingMuiSort
          />
        </Grid>
      </Grid>
      <AddEmailPopup isOpen={dialog} onClose={() => setDialog(false)} />
    </div>
  );
};

export default IntermittenAlertDetail;
