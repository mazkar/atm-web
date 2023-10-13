/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { withRouter , useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, IconButton, InputBase, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Input, Select, DatePicker } from 'antd';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from "@material-ui/styles";
import ClearIcon from '@material-ui/icons/Clear';
import moment from "moment";
import Axios from 'axios';
import ExchangeIcon from '../../../../../assets/icons/siab/exchange-alt.png';
import { ReactComponent as DefUploadImageSvg } from "../../../../../assets/icons/general/def_upload.svg";
import { ReactComponent as PaperClipIcon } from '../../../../../assets/icons/linear-red/paperclip.svg';
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import { ReactComponent as CalendarIcon } from '../../../../../assets/icons/linear-red/calendar.svg';
import { ReactComponent as UserIcon } from '../../../../../assets/icons/linear-red/user.svg';
import { ReactComponent as AngleDownIconGrey } from '../../../../../assets/icons/siab/chevron-down-grey.svg';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from './InputComponent';
import ErrorComponent from "../CreateKebutuhan/ErrorComponent";
import getMinioFile from '../../../../../helpers/getMinioFromUrl';
import ModalLoader from '../../../../../components/ModalLoader';
import MinioDocComponent from '../../../../../components/MinioDocComponent';
import useTimestampConverter from '../../../../../helpers/useTimestampConverter';

const { Option } = Select;

const DeleteIconButton = withStyles(() => ({
  root: {
    backgroundColor: "#DC241F75",
    color: "#fff",
    "&:hover": {
      color: "#DC241F",
      backgroundColor: "#fff8f8cc",
    },
  },
}))(IconButton);

const SmallInputFocusRed = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    fontSize: 15,
    width: '100%',
    height: '23px',
    padding: '7px 9px',
    border: '1px solid #BCC8E7',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: Colors.PrimaryHard,
    },
  },
}))(InputBase);

const SmallInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    fontSize: 15,
    width: '100%',
    height: '23px',
    padding: '7px 9px',
    border: '1px solid #BCC8E7',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: Colors.PrimaryHard,
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)'
  },
  rootPaperSecond: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: Colors.White,
    boxShadow: 'unset',
    height: '40px',
    width: '850px',
    border: '1px solid #BCC8E7',
  },
  iconButton: {
    padding: '0px 5px',
    color: Colors.GrayMedium,
    display: 'flex',
    alignItems: 'center'
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    display: "flex",
    flexDirection: 'column'
  },
  resetImage: {
    position: "absolute",
    width: '15px',
    height: '15px',
    top: -10,
    right: -10,
  },
  selectRegion: {
    paddingTop: '10px',
    "& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector": {
      height: 39,
      border: `1px solid #BCC8E7`,
    },
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: 4,
    },
  },
  attachment: {
    fontWeight: 500, 
    fontFamily: 'Barlow', 
    cursor: 'pointer',
    color: Colors.Dark
  },
  paperClip: { 
    width: 20, 
    height: 20, 
    paddingTop: 4, 
    marginRight: 5, 
    cursor: 'pointer' 
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  inputMaterial: {
    width: '96%', 
    "& .MuiInputBase-input.Mui-disabled": {
      opacity: 1,
      cursor: 'not-allowed',
      backgroundColor: '#FFFF',
      border: '1px solid #F4F7FB',
    },
  },
  coloredText: {
    textAlign: "center",
    width: "max-content",
    height: "35px",
    padding: '5px 10px 5px 10px',
    cursor: 'pointer', 
    backgroundColor: '#F4F7FB',
    borderRadius: 12
  },
  selectKonven: {
    "& .ant-select.ant-select-single .ant-select-selector": {
      paddingTop: '5px',
      height: '41px',
      border: '1px solid #F4F7FB',
      backgroundColor: "#FFFF",
      color: "#2B2F3C",
      borderRadius: 6
    }
  },
  selectKonvenBlue: {
    "& .ant-select.ant-select-single .ant-select-selector": {
      paddingTop: '5px',
      height: '41px',
      border: '1px solid #BCC8E7',
      backgroundColor: "#FFFF",
      color: "#2B2F3C",
      borderRadius: 6
    }
  },
});

const dataTitleKebutuhan = [
  {id: 0, value: 'Bangunan Baru', nameId: 'Bangunan Baru', nameEn: 'Bangunan Baru'},
  {id: 1, value: 'Renovasi Ruangan', nameId: 'Renovasi Ruangan', nameEn: 'Renovasi Ruangan'},
  {id: 2, value: 'Pemasangan AC', nameId: 'Pemasangan AC', nameEn: 'Pemasangan AC'},
  {id: 3, value: 'Pemasangan KWH & Installasi', nameId: 'Pemasangan KWH & Installasi', nameEn: 'Pemasangan KWH & Installasi'},
  {id: 4, value: 'Not Request (-)', nameId: 'Not Request (-)', nameEn: 'Not Request (-)'},
];

const dataVendor = [
  {id: 0, value: 'PT. Royal', nameId: 'PT. Royal', nameEn: 'PT. Royal'},
  {id: 1, value: 'PT. Trias', nameId: 'PT. Trias', nameEn: 'PT. Trias'},
  {id: 2, value: 'PT. Cakrawala Mitra', nameId: 'PT. Cakrawala Mitra', nameEn: 'PT. Cakrawala Mitra'},
  {id: 3, value: 'PT. Sarana Usaha Adhi', nameId: 'PT. Sarana Usaha Adhi', nameEn: 'PT. Sarana Usaha Adhi'},
];

const currencySuggestion = [
  {id: 0, value: 'IDR', nameId: 'IDR'},
  {id: 1, value: 'USD', nameId: 'USD'},
  {id: 2, value: 'EUR', nameId: 'EUR'},
  {id: 3, value: 'AUD', nameId: 'AUD'},
  {id: 4, value: 'CNY', nameId: 'CNY'},
  {id: 5, value: 'EGP', nameId: 'EGP'},
  {id: 6, value: 'GBP', nameId: 'GBP'},
];

function LeftComponent(props) {
  const classes = useStyles();
  const history = useHistory()
  const { data, isLoadData, isEdit, errorForm, onChange, taskId } = props;
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");

  const fileInput1 = React.createRef();
  const fileInput2 = React.createRef();
  const fileInput3 = React.createRef();
  const fileInput4 = React.createRef();
  // Attachment Files
  const fileInput5 = React.createRef();
  const fileInput6 = React.createRef();
  const fileInput7 = React.createRef();

  const [isOpenModalLoader, setModalLoader] = React.useState(false);
  const [value, setValue] = React.useState(data.category);
  const [valueLongText, setValueLongText] = React.useState(data.description);
  const [invoice, setInvoice] = React.useState('1232323');
  const [dateInvoice, setDateInvoice] = React.useState(null);
  const [valueVendor, setValueVendor] = React.useState(data.picVendor);
  const [valueCurrency, setValueCurrency] = React.useState('IDR');
  const [totalBiaya, setTotalBiaya] = React.useState('13.000.000');
  const [photoDepan, setPhotoDepan] = React.useState(null);
  const [photoKanan, setPhotoKanan] = React.useState(null);
  const [photoKiri, setPhotoKiri] = React.useState(null);
  const [photoBelakang, setPhotoBelakang] = React.useState(null);
  const [attachment1, setAttachment1] = React.useState(null);
  const [attachment2, setAttachment2] = React.useState(null);
  const [attachment3, setAttachment3] = React.useState(null);
  const [attachment4, setAttachment4] = React.useState(null);
  const [attachment5, setAttachment5] = React.useState(null);
  const [attachment6, setAttachment6] = React.useState(null);
  // const [dateValue, setDateValue] = React.useState(data.date.format('DD/MM/YYYY'))
  const [dateValue, setDateValue] = React.useState(null);

  const convertDate = () => {
    return moment(data.date).format('DD/MM/YYYY');
  };

  React.useEffect(()=>{
    if(data && data.category){
      const items = {
        ...dataTitleKebutuhan,
        id: dataTitleKebutuhan.length + 1, 
        value: data.category, 
        nameId: data.category, 
        nameEn: data.category
      };
      dataTitleKebutuhan.push(items);
    }
  },[data]);

  const Minio = require("minio");
  const prepareData = [];
  const prepareData2 = [];
  const prepareData3 = [];
  const prepareData4 = [];
  const minioClient = new Minio.Client({
    endPoint: `${process.env.REACT_APP_MINIO_URL}`,
    useSSL: true,
    accessKey: `${process.env.REACT_APP_MINIO_ACCESS_KEY}`,
    secretKey: process.env.REACT_APP_MINIO_SECRET_KEY === "IstuatATM" ? "IstuatATM$14b" : process.env.REACT_APP_MINIO_SECRET_KEY,
  });

  React.useEffect(() => {
    if(data.photoDepan !== null){
      minioClient.presignedUrl(
        "GET",
        "project",
        data.photoDepan,
        24 * 60 * 60,
        function (err, presignedUrl) {
          if (err) return console.log(err);
          prepareData.push(presignedUrl);
          setPhotoDepan(prepareData);
        });
    }
  }, [data.photoDepan]);

  React.useEffect(() => {
    if(data.photoKanan !== null){
      minioClient.presignedUrl(
        "GET",
        "project",
        data.photoKanan,
        24 * 60 * 60,
        function (err, presignedUrl) {
          if (err) return console.log(err);
          prepareData2.push(presignedUrl);
          setPhotoKanan(prepareData2);
        });
    }
  }, [data.photoKanan]);

  React.useEffect(() => {
    if(data.photoKiri !== null){
      minioClient.presignedUrl(
        "GET",
        "project",
        data.photoKiri,
        24 * 60 * 60,
        function (err, presignedUrl) {
          if (err) return console.log(err);
          prepareData3.push(presignedUrl);
          setPhotoKiri(prepareData3);
        });
    }
  }, [data.photoKiri]);

  React.useEffect(() => {
    if(data.photoBelakang !== null){
      minioClient.presignedUrl(
        "GET",
        "project",
        data.photoBelakang,
        24 * 60 * 60,
        function (err, presignedUrl) {
          if (err) return console.log(err);
          prepareData4.push(presignedUrl);
          setPhotoBelakang(prepareData4);
        });
    }
  }, [data.photoBelakang]);

  const handleChangeKebutuhan = (dataKebutuhan, keyData) => {
    const items = {
      ...data,
      [keyData]: dataKebutuhan,
    };
    onChange(items);
  };

  const handleChange = (e) => {
    console.log(e);
    handleChangeKebutuhan(e, 'category');
    setValue(e);
  };

  const handleChangeLongText = (e) => {
    console.log(e);
    setValueLongText(e.target.value);
    handleChangeKebutuhan(e.target.value, 'description');
  };

  const handleChangeVendor = (e) => {
    console.log(e);
    setValueVendor(e);
    handleChangeKebutuhan(e, 'picVendor');
  };

  const handleChangeDate = (e) => {
    console.log(e);
    setDateValue(e.format('DD MMMM YYYY'));
    handleChangeKebutuhan(e.format('DD MMMM YYYY'), 'date');
  };

  function handlePhoto(event, type) {
    event.preventDefault();
    switch(type){
    case 'depan':
      setPhotoDepan(event.target.files[0]);
      // handleUpload(photoDepan, "depan")
      break;
    case 'kanan':
      setPhotoKanan(event.target.files[0]);
      // handleUpload(photoKanan, "kanan")
      break;
    case 'kiri':
      setPhotoKiri(event.target.files[0]);
      // handleUpload(photoKiri, "kiri")
      break;
    case 'belakang':
      setPhotoBelakang(event.target.files[0]);
      // handleUpload(photoBelakang, "belakang")
      break;
    }
  }

  React.useEffect(() => {
    if(isEdit){
      if(photoDepan) {
        handleUpload(photoDepan, "depan");
      }
    }
  }, [photoDepan]);

  React.useEffect(() => {
    if(isEdit){
      if(photoDepan) {
        handleUpload(photoKanan, "kanan");
      }
    }
  }, [photoKanan]);

  React.useEffect(() => {
    if(isEdit){
      if(photoKiri) {
        handleUpload(photoKiri, "kiri");
      }
    }
  }, [photoKiri]);

  React.useEffect(() => {
    if(isEdit){
      if(photoBelakang) {
        handleUpload(photoBelakang, "belakang");
      }
    }
  }, [photoBelakang]);

  const handleUpload = (file, type) => {
    setModalLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/uploadPhoto`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      // console.log("data res", res)
      if (res.status === 200) {
        if (res.data.responseCode === "00") {
          switch(type){
          case 'depan':
            // setLocationMachinePhotos(res.data.path)
            handleChangeKebutuhan(res.data.path, "photoDepan");
            // photoMachinePath = res.data.path
            break;
          case 'kanan':
            // setLocationMachinePhotos(res.data.path)
            handleChangeKebutuhan(res.data.path, "photoKanan");
            // photoMachinePath = res.data.path
            break;
          case 'kiri':
            // setLocationMachinePhotos(res.data.path)
            handleChangeKebutuhan(res.data.path, "photoKiri");
            // photoMachinePath = res.data.path
            break;
          case 'belakang':
            // setLocationMachinePhotos(res.data.path)
            handleChangeKebutuhan(res.data.path, "photoBelakang");
            // photoMachinePath = res.data.path
            break;
          default:
            alert("Error uploading Image");
          }
        } else {
          alert(res.data.responseMessage);
        }
      }
      // console.log("Data", res.data)
      setModalLoader(false);
    }).catch((err) => {
      alert(`Failed to upload picture ${err}`);
      // console.log(err)
      // console.log("Form Data", formData)
      setModalLoader(false);
    });
  };

  const renderImage = (ImgLocal) => {
    if (ImgLocal !== null) {
      // try{
      //   return <img src={URL.createObjectURL(ImgLocal)} style={{ maxWidthidth: '135px', height: '135px' }} />
      // }catch(e){
      return <img src={ImgLocal} style={{ width: '135px', height: '135px' }} />;
      // }
    } 
    return <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/>;
    
  };

  const renderDeleteImage = (image, type) => {
    if (image !== null && isEdit) {
      return (
        <DeleteIconButton
          className={classes.resetImage}
          onClick={() => {
            switch (type) {
            case "depan":
              setPhotoDepan(null);
              fileInput1.current.value = null;
              break;
            case "kanan":
              setPhotoKanan(null);
              fileInput2.current.value = null;
              break;
            case "kiri":
              setPhotoKiri(null);
              fileInput3.current.value = null;
              break;
            case "belakang":
              setPhotoBelakang(null);
              fileInput4.current.value = null;
              break;
            }
          }}
        >
          <ClearIcon />
        </DeleteIconButton>
      );
    }
  };

  React.useEffect(() => {
    if(isEdit && attachment1) {
      handleUploadFile(attachment1, "cimbAttachments");
    }}, [attachment1]);
  
  React.useEffect(() => {
    if(isEdit && attachment2) {
      handleUploadFile(attachment2, "cimbAttachments");
    }}, [attachment2]);

  React.useEffect(() => {
    if(isEdit && attachment3) {
      handleUploadFile(attachment3, "cimbAttachments");
    }}, [attachment3]);

  const [newData, setNewData] = React.useState([]);

  React.useEffect(()=>{
    console.log("NEW DATA:", newData);
  }, [newData]);

  const handleUploadFile = (file, type) => {
    setModalLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/uploadDocument`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      // console.log("data res", res)
      if (res.status === 200) {
        if (res.data.responseCode === "00") {
          const newList = [...newData];
          newList.push({
            id: null,
            path: res.data.path,
            category: "cimb",
            filename: res.data.filename
          });
          setNewData(newList);
          handleChangeKebutuhan(newList, type);
        } else {
          alert(res.data.responseMessage);
        }
      }
      // console.log("Data", res.data)
      setModalLoader(false);
    }).catch((err) => {
      alert(`Failed to upload file ${err}`);
      setModalLoader(false);
    });
  };

  function handleAttatchment(event, type) {
    event.preventDefault();
    switch(type){
    case 'attachment1':
      setAttachment1(event.target.files[0]);
      break;
    case 'attachment2':
      setAttachment2(event.target.files[0]);
      break;
    case 'attachment3':
      setAttachment3(event.target.files[0]);
      break;
    }
  }

  function limitString(string, count){
    try{
      const result = string.slice(0, count) + (string.length > count ? "..." : "");
      return result;
    }catch(e){
      console.log("Limit String: ", e);
    }
  }

  React.useEffect(()=>{
    try{
      getMinioFile(data.cimbAttachments[0].path).then(result=>{
        // console.log(">>>> try getMinio Offering ",JSON.stringify(result))
        setAttachment1(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[data.cimbAttachments]);

  React.useEffect(()=>{
    try{
      getMinioFile(data.cimbAttachments[1].path).then(result=>{
        setAttachment2(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[data.cimbAttachments]);

  React.useEffect(()=>{
    try{
      getMinioFile(data.cimbAttachments[2].path).then(result=>{
        setAttachment3(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[data.cimbAttachments]);

  useEffect(()=>{
    if(data.vendorAttachments?.length>0){
      data.vendorAttachments.forEach((attachment,i)=>{
        try{
          getMinioFile(attachment.path).then(result=>{
            console.log('~ i', i)
            console.log('~ result', result)
            if(i===0){
              setAttachment4(result);
            } else if(i===1){
              setAttachment5(result);
            } else{
              setAttachment6(result);
            }
          });
        }catch(err){
          console.log(">>>> Error try getMinio", err);
        }
      })
    }
  },[data.vendorAttachments]);

  const RenderOfferingFile1 = () => {
    return(
      <Link href={attachment1 === null ? '#' : attachment1.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 15, color: '#DC241F', fontWeight: 500}}
        disabled={attachment1 === null}>
        {attachment1 === null ? '-': limitString(attachment1.fileName, 25)}
      </Link>
    );
  };

  const RenderOfferingFile2 = () => {
    return(
      <Link href={attachment2 === null ? '#' : attachment2.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 15, color: '#DC241F', fontWeight: 500}}
        disabled={attachment2 === null}>
        {attachment2 === null ? '-': limitString(attachment2.fileName, 25)}
      </Link>
    );
  };

  const RenderOfferingFile3 = () => {
    return(
      <Link href={attachment3 === null ? '#' : attachment3.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 15, color: '#DC241F', fontWeight: 500}} 
        disabled={attachment3 === null}>
        {attachment3 === null ? '-': limitString(attachment3.fileName, 25)}
      </Link>
    );
  };

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid container direction='column' style={{paddingBottom: '15px'}}>

          <Grid item>
            <Grid container direction='row' style={{padding: '15px 5px 15px 15px'}}>
              <Grid item style={{ padding: '2px 7px' }}>
                <img src={ExchangeIcon} />
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, fontSize: 20, color: '#DC241F' }}>
                  {openingType !=="Termin" ? "Kebutuhan":"Perapihan Ruangan"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginBottom: '20px', width: '96%'}} className={isEdit ? classes.selectKonvenBlue : classes.selectKonven}>
            <Select 
              className="CommonSelect__select--bordered #BCC8E7"
              style={{width: '96%'}}
              // defaultValue={data.category}
              value={data.category}
              onChange={handleChange}
              disabled={!isEdit}
              suffixIcon={isEdit ? <AngleDownIcon className="CommonSelect__select-icon" /> : <AngleDownIconGrey className="CommonSelect__select-icon"/>}
              placeholder='Task Title'
            >
              {dataTitleKebutuhan.map((item) => (
                <Option key={item.id} value={item.value} >{item.value}</Option>
              ))}
            </Select>
            { errorForm.category ? <ErrorComponent label="Select one!" /> : null }
          </Grid>

          <Grid item style={{paddingLeft: '20px', paddingTop: '15px', marginBottom: '20px', width: '96%'}}>
            <InputBordered
              multiline
              rows={4}
              style={{width: '96%'}}
              onChange={handleChangeLongText}
              value={data.description}
              disabled={!isEdit}
              placeholder='Notes & Description'
            />
            { errorForm.description ? <ErrorComponent label="Required!" /> : null }
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginTop: '5px', marginBottom: '20px', width: '100%'}}>
            <Grid container direction='row'>
              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due date</Typography>
                  </Grid>
                  <Grid item style={{marginTop: isEdit ? '10px' : '17px'}}>
                    { isEdit ?
                      <Paper component="form" className={classes.rootPaperSecond} style={{width: '85%'}}>
                        <div className={classes.iconButton}>
                          <CalendarIcon style={{height: 20, marginLeft: 5}}/>
                        </div>
                        <DatePicker 
                          suffixIcon 
                          onChange={handleChangeDate}
                          defaultValue={moment(data.date)}
                          allowClear={false}
                          style={{borderRadius: 5, width: '96%', height: '30px', border: '1px solid #fff'}} 
                          placeholder='Pilih Tgl Kirim / Tarik'
                        />
                      </Paper> :
                      <InputBordered
                        style={{width: '85%', height: '24px'}}
                        value={convertDate()}
                        disabled
                      /> }
                  </Grid>
                </Grid>
                { errorForm.date ? <ErrorComponent label="Required!" /> : null }
              </Grid>
                        
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                  </Grid>
                  <Grid item style={{marginTop: isEdit ? '10px' : '17px', width: '100%'}}>
                    {isEdit ?
                      <Paper component="form" className={classes.rootPaperSecond} style={{width: '100%'}}>
                        <div className={classes.iconButton}>
                          <UserIcon style={{height: 20, marginLeft: 5}}/>
                        </div>
                        <Select className="CommonSelect__select" 
                          style={{width: '96%'}}
                          defaultValue={valueVendor}
                          onChange={handleChangeVendor}
                          placeholder='Pilih PIC / Vendor'
                          suffixIcon={<AngleDownIcon/>}
                        >
                          {dataVendor.map((data) => (
                            <Option key={data.id} value={data.value} >{data.value}</Option>
                          ))}
                        </Select>
                      </Paper> :
                      <InputBordered
                        style={{width: '100%', height: '24px'}}
                        value={data.picVendor}
                        disabled={!isEdit}
                      /> }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            { errorForm.picVendor ? <ErrorComponent label="Required!" /> : null }
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginTop: '20px', marginBottom: '20px', width: '100%'}}>
            <Typography style={{
              "fontWeight":"600",
              "fontSize":"13px",
              "lineHeight":"16px", 
              paddingBottom: 10,
              borderBottom: `2px solid ${Colors.GrayMedium}`,
              color: Colors.GrayMedium}}
            >
                    Informasi Vendor
            </Typography>
          </Grid>

          {!isEdit ? 
            <Grid item style={{paddingLeft: '20px', marginTop: '5px', marginBottom: '20px', width: '100%'}}>
              <Grid container direction='row'>
                <Grid item xs={6}>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Total Biaya</Typography>
                    </Grid>
                    <Grid item className={classes.selectRegion}>
                      <Input.Group compact style={{width: '85%'}}>
                        <SmallInput className={classes.inputMaterial} style={{width: '12%'}} value='Rp' disabled={!isEdit}/>
                        <SmallInputFocusRed className={classes.inputMaterial} style={{width: '82%'}} onChange={(e)=>setTotalBiaya(e)} value={data.totalBiaya} disabled={!isEdit}/>
                      </Input.Group>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography style={{fontWeight: 500, color: '#8D98B4'}}>No Invoice</Typography>
                    </Grid>
                    <Grid item style={{paddingTop: '15px'}}>
                      <InputBordered
                        style={{width: '100%', height: '23px'}}
                        className={classes.inputMaterial}
                        onChange={(e)=>setInvoice(e)}
                        value={data.noInvoice}
                        disabled={!isEdit}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              { errorForm.date ? <ErrorComponent label="Required!" /> : null }
            </Grid> : null}

          {!isEdit ?
            <Grid item style={{paddingLeft: '20px', marginTop: '5px', width: '100%'}}>
              <Grid container direction='row'>
                <Grid item xs={6}>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tgl Kirim Invoice</Typography>
                    </Grid>
                    <Grid item style={{paddingTop: '15px'}}>
                      <InputBordered
                        style={{width: '85%', height: '24px'}}
                        className={classes.inputMaterial}
                        onChange={(e)=>setDateInvoice(e)}
                        value={data.invoiceSendDate? useTimestampConverter(data.invoiceSendDate/1000, "DD-MM-YYYY") : '-'}
                        disabled={!isEdit}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography style={{fontWeight: 500, color: '#8D98B4', fontFamily: 'Barlow'}}>Invoice</Typography>
                    </Grid>
                    <Grid item>
                      {data.invoicePath? (
                        <div className={classes.coloredText} style={{ display: "flex", alignItems: "center" }}>
                          <MinioDocComponent filePath={data.invoicePath}/>
                        </div>
                      ):(
                        <Typography className={classes.coloredText} style={{marginTop: '5px'}}>Belum tersedia.</Typography>
                      )}
                              
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid> : null}

          {!isEdit ?
            <Grid item style={{paddingLeft: '20px', marginTop: '30px', width: '96%'}}>
              <Grid container direction='column'>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4', fontFamily: 'Barlow'}}>BAST Digital</Typography>
                </Grid>
                <Grid item>
                  {data.bastSubmitStatus === true ? (
                    <div className={classes.coloredText} style={{ display: "flex", alignItems: "center" }}>
                      <Link 
                        onClick={()=>history.push(`/implementation/task/bast-digital-preview/${data.bastId}`)} 
                        style={{color: 'green', display: 'flex', textDecoration: 'none'}}>
                        BAST Digital
                        <CheckIcon style={{color: 'green', marginLeft: 10}} />
                      </Link>
                    </div>
                  ):(
                    <Typography className={classes.coloredText} style={{marginTop: '5px'}}>Belum tersedia.</Typography>
                  )}
                </Grid>
              </Grid>
            </Grid> : null}

          <Grid item style={{ paddingLeft: '20px', marginTop: '20px', width: '96%' }}>
            <Grid container direction='row' spacing={4}> 
              <Grid item>
                <Box className={classes.imageUploadContainer}>
                  {isEdit &&
                                    (<input
                                      id="depan"
                                      type="file"
                                      accept=".png,.jpg, .jpeg"
                                      onChange={(e)=> handlePhoto(e, 'depan')}
                                      ref={fileInput1}
                                      className={classes.input}
                                    />)
                  }
                  <label
                    htmlFor="depan"
                    className={classes.imgDefault} style={{ cursor: isEdit ? 'pointer' : 'not-allowed' }}
                  >
                    <Grid container direction='column' alignItems="center">
                      {renderImage(photoDepan)}
                      <Typography>Depan</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoDepan, 'depan')}
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.imageUploadContainer}>
                  {isEdit &&
                                    (<input
                                      id="kanan"
                                      type="file"
                                      accept=".png,.jpg, .jpeg"
                                      onChange={(e)=> handlePhoto(e, 'kanan')}
                                      ref={fileInput2}
                                      className={classes.input}
                                    />)
                  }
                  <label
                    htmlFor="kanan"
                    className={classes.imgDefault} style={{ cursor: isEdit ? 'pointer' : 'not-allowed' }}
                  >
                    <Grid container direction='column' alignItems="center">
                      {renderImage(photoKanan)}
                      <Typography>Kanan</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoKanan, 'kanan')}
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.imageUploadContainer}>
                  {isEdit &&
                                    (<input
                                      id="kiri"
                                      type="file"
                                      accept=".png,.jpg, .jpeg"
                                      onChange={(e)=> handlePhoto(e, 'kiri')}
                                      ref={fileInput3}
                                      className={classes.input}
                                    />)
                  }
                  <label
                    htmlFor="kiri"
                    className={classes.imgDefault} style={{ cursor: isEdit ? 'pointer' : 'not-allowed' }}
                  >
                    <Grid container direction='column' alignItems="center">
                      {renderImage(photoKiri)}
                      <Typography>Kiri</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoKiri, 'kiri')}
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.imageUploadContainer}>
                  {isEdit &&
                                    (<input
                                      id="belakang"
                                      type="file"
                                      accept=".png,.jpg, .jpeg"
                                      onChange={(e)=> handlePhoto(e, 'belakang')}
                                      ref={fileInput4}
                                      className={classes.input}
                                    />)
                  }
                  <label
                    htmlFor="belakang"
                    className={classes.imgDefault} style={{ cursor: isEdit ? 'pointer' : 'not-allowed' }}
                  >
                    <Grid container direction='column' alignItems="center">
                      {renderImage(photoBelakang)}
                      <Typography>Belakang</Typography>
                    </Grid>
                  </label>
                  {renderDeleteImage(photoBelakang, 'belakang')}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginTop: '10px', fontFamily: 'Barlow', fontSize: '12px'}}>
            <Typography style={{fontWeight: 400, color: '#8D98B4'}}>
                        *Tolong upload foto sesuai dengan keterangan yang tersedia
            </Typography>
          </Grid>

          {/* Attachment CIMB */}
          <Grid item style={{paddingLeft: '20px', marginTop: '20px'}}>
            <Grid container direction='row'>
              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 600, color: '#2B2F3C'}}>
                                CIMB Attachment
                    </Typography>
                  </Grid>
                  <Grid item style={{marginTop: '10px', marginBottom: 20}}>
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'default' }}/></Grid>
                      <Grid item><RenderOfferingFile1/></Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{marginBottom: 20}}>
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'default' }}/></Grid>
                      <Grid item><RenderOfferingFile2/></Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'default' }}/></Grid>
                      <Grid item><RenderOfferingFile3/></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Attachment Vendor */}
              {data.vendorAttachments.length > 0 ? 
              <Grid item xs={5}>
                <div>
                  <Typography style={{fontWeight: 600, color: '#2B2F3C'}}>
                    Vendor Attachment
                  </Typography>
                  <VendorAttachmentLink file={attachment4} />
                  <VendorAttachmentLink file={attachment5} />
                  <VendorAttachmentLink file={attachment6} />
                </div>
              </Grid> : null}

            </Grid>
          </Grid>
                
        </Grid>
      </Paper>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

LeftComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
};
LeftComponent.defaultProps = {
  isLoadData: false,
};

export default LeftComponent;

function VendorAttachmentLink({file}){
  const classes = useStyles();
  return ( file &&
    <div style={{marginTop: '5px'}}>
      <a href={file.fileUrl} target='_blank'>
        <Grid container direction='row'>
          <Grid item>
            <PaperClipIcon className={classes.paperClip} />
          </Grid>
          <Grid item>
            <Typography className={classes.attachment} >
              {file.fileName}
            </Typography>
          </Grid>
        </Grid>
      </a>
    </div>
  )
}