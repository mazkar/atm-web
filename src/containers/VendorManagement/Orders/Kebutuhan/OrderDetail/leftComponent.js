/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect, useContext} from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, Button, IconButton, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardReturnOutlined } from '@material-ui/icons';
import { ReactComponent as ExchangeIcon }from '../../../../../assets/icons/siab/gear-grinding.svg';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from '../../common/InputComponent';
import { ReactComponent as PaperClipIcon } from '../../../../../assets/icons/linear-red/paperclip.svg';
import { ReactComponent as TodoIcon } from '../../../../../assets/icons/siab/time-circle.svg';
import { ReactComponent as DoingIcon } from '../../../../../assets/icons/siab/refresh-blue.svg';
import { ReactComponent as DoneIcon } from '../../../../../assets/icons/duotone-others/check-green.svg';
import { ReactComponent as StripIcon } from '../../../../../assets/icons/siab/strip-circle.svg';
import NoImage from "../../../../../assets/images/image.png";
import SelectItemsIcon from '../../../../../components/Selects/SelectItemsIcon';
import LableValue from '../../../../../components/LableValue';
import constants from "../../../../../helpers/constants";
import useRupiah from "../../../../../helpers/useRupiahConverterSecondary";
import StatusComponent from '../../../../../components/StatusComponent';
import { ChkyInputSmall } from '../../../../../components';
import MinioImageComponent from '../../../../../components/MinioImageComponent';
import ImageSelector from '../../../../../components/ImageSelector';
import AttachFileSelector from '../../../../../components/AttachFileSelector';
import MinioDocComponent from '../../../../../components/MinioDocComponent';
import useTimestampConverter from '../../../../../helpers/useTimestampConverter';
import { RootContext } from '../../../../../router';
import ErrorComponent from '../../../../../components/ErrorComponent';

const { Option } = Select;

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    height: "100%",
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
    cursor: "pointer",
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
  attachment: {
    fontWeight: 500,
    fontFamily: 'Barlow',
    cursor: 'not-allowed',
    color: '#8D98B4'
  },
  attachmentEnabled: {
    fontWeight: 500,
    fontFamily: 'Barlow',
    cursor: 'pointer',
    color: '#DC241F'
  },
  paperClip: {
    width: 20,
    height: 20,
    paddingTop: 4,
    marginRight: 5,
    cursor: 'not-allowed'
  },
  paperClipEnabled: {
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
  select: {
    minWidth: 120,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  inputFieldSelect:{
    border: '1px solid #A8B6DB',
    borderRadius: '0px 6px 6px 0px',
    boxSizing: 'border-box',
    padding: '10px',
    fontFamily: 'Barlow',
    width: 320,
    height: '41px',
    '& ::placeholder': {
      color: '#A8B6DB'
    },
    '& ::selection': {
      background: '#FF6130'
    },
    '&:hover': {
      border: '1px solid #A8B6DB',
    },
  },
  selectPremises: {
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: '5px',
      color: '#DC241F'
    },
    "& .ant-select-single .ant-select-selector": {
      height: '41px',
      border: '1px solid #DC241F',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "& .ant-select-single .ant-select-arrow": {
      transition: 'transform 0.2s ease-in',
      color: '#DC241F'
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform:' rotate(180deg)',
      transition: 'transform 0.2s ease-in'
    },
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
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  imgContainer: {
    borderRadius: 10,
    width: 80,
    height: 85,
  }
});

const dataSelectStatus = [
  {value: 'TODO', name: 'TODO', icon: <TodoIcon/>},
  {value: 'DOING', name: 'DOING', icon: <DoingIcon/>},
  {value: 'DONE', name: 'DONE', icon: <DoneIcon/>},
  {value: 'STRIP', name: 'STRIP', icon: <StripIcon/>},
];

function Status(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor: props.borderColor,
          background: props.fillColor,
          color: props.textColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          // margin: "auto",
        }}
      >
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

function LeftComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { userRoleName } = useContext(RootContext);
  const { data, dataResponse, handleChangeState, handleSave, idCard, isDisabledEdit } = props;

  const [noInvoice, setNoInvoice] = useState(null);

  const [attachment1, setAttachment1] = useState('');
  const [attachment2, setAttachment2] = useState('');
  const [attachment3, setAttachment3] = useState('');
  const [dateNow, setDateNow] = useState(null);
  
  const [isMaxLimit, setIsMaxLimit] = useState(false);
  // const [photoSebelum1, setphotoSebelum1] = useState('');
  // const [photoSebelum2, setphotoSebelum2] = useState('');
  // const [photoSebelum3, setphotoSebelum3] = useState('');
  // const [photoSebelum4, setphotoSebelum4] = useState('');

  // const [photoSesudah1, setphotoSesudah1] = useState('');
  // const [photoSesudah2, setphotoSesudah2] = useState('');
  // const [photoSesudah3, setphotoSesudah3] = useState('');
  // const [photoSesudah4, setphotoSesudah4] = useState('');

  // FOTO SEBELUM

  // useEffect(() => {
  //   console.log("+++ photoSebelum1", JSON.stringify(photoSebelum1));
  //   if(photoSebelum1 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum1",
  //       file: photoSebelum1
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum1';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum1]);

  // useEffect(() => {
  //   if(photoSebelum2 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum2",
  //       file: photoSebelum2
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum2';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum2]);

  // useEffect(() => {
  //   if(photoSebelum3 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum3",
  //       file: photoSebelum3
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum3';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum3]);

  // useEffect(() => {
  //   if(photoSebelum4 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum4",
  //       file: photoSebelum4
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum4';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum4]);

  // FOTO Sesudah

  // useEffect(() => {
  //   console.log("+++ photoSesudah1", JSON.stringify(photoSesudah1));
  //   if(photoSesudah1 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah1",
  //       file: photoSesudah1
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah1';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah1]);

  // useEffect(() => {
  //   if(photoSesudah2 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah2",
  //       file: photoSesudah2
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah2';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah2]);

  // useEffect(() => {
  //   if(photoSesudah3 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah3",
  //       file: photoSesudah3
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah3';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah3]);

  // useEffect(() => {
  //   if(photoSesudah4 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah4",
  //       file: photoSesudah4
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah4';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah4]);

  // ATTACHMENT

  useEffect(() => {
    if(attachment1 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment1';
      });
      handleChangeState(newDataList,"documentList");
    }
  }, [attachment1]);

  useEffect(() => {
    if(attachment2 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment2",
        file: attachment2
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment2';
      });
      handleChangeState(newDataList,"documentList");
    }
  }, [attachment2]);

  useEffect(() => {
    if(attachment3 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment3",
        file: attachment3
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment3';
      });
      handleChangeState(newDataList,"documentList");
    }
  }, [attachment3]);

  useEffect(() => {
    console.log("+++ dataResponse", dataResponse);
    if(dataResponse){
      setNoInvoice(dataResponse.invoiceNumber);
    }
  }, [dataResponse]);

  function statusApproval(value){
    switch (value) {
    case 1:
      return <StatusComponent color="yellow" lable="Need Approval"/>;
    case 2:
      return <StatusComponent color="green" lable="Approved"/>;
    default:
      return value;
    }
  }

  function textDays(value){
    // eslint-disable-next-line radix
    if(parseInt(value) > 14){
      return (<Typography style={{color: "#FF6A6A"}}>{value} Days</Typography>);
    }
    return (<Typography style={{color: "#65D170"}}>{value} Days</Typography>);

    // switch (true) {
    // case  (value > 0):
    //   return (<Typography style={{color: "#65D170"}}>{value} Days</Typography>);
    // case (value === 0):
    //   return (<Typography style={{color: "#FFB443"}}>{value} Day</Typography>);
    // case (value < 0):
    //   return (<Typography style={{color: "#FF6A6A"}}>{value} Days</Typography>);
    // default:
    //   return value;
    // }
  }

  function paidStatus(value){
    switch (value) {
    case 0:
      return <StatusComponent color="red" lable="Unpaid"/>;
    default:
      return <StatusComponent color="green" lable="Approved"/>;
    }
  }

  const handleUploadFile = (e) => {
    const maxAllowedSize = 1 * 1024 * 1024; // 1 MB
    if(e.target.files[0].size > maxAllowedSize){
      setIsMaxLimit(true);
    }else{
      handleChangeState(e.target.files[0],"invoiceFile");
      setDateNow(Date.now());
      setIsMaxLimit(false);
    }
  };

  const handleDeleteFile = () => {
    handleChangeState('',"invoiceFile");
    setDateNow(null);
  };

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <div style={{padding: 20}}>

          {/* Informasi CIMB */}
          <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Informasi CIMB</Typography>
          <Divider variant='fullWidth' style={{height: '2px', backgroundColor: '#BCC8E7', marginTop: 10, marginBottom: 20}}/>

          <Grid container>
            <Grid item xs={6}>
              <LableValue lable="No Ticket" value={dataResponse?.ticketNumber}/>
              <LableValue lable="Tgl Request" value={dataResponse?.requestDate === null ? "-" : useTimestampConverter(dataResponse?.requestDate/1000, "DD-MM-YYYY") }/>
              <LableValue lable="User Request" value={dataResponse?.userRequester}/>
              <LableValue lable="ID Mesin" value={dataResponse?.idMesin}/>
              <LableValue lable="ID Location" value={dataResponse?.locationId}/>
              <LableValue lable="Nama Lokasi" value={dataResponse?.locationName}/>
              <LableValue lable="Alamat" value={dataResponse?.locationAddress}/>
              <LableValue lable="Area" value={dataResponse?.locationArea}/>
              <LableValue lable="City" value={dataResponse?.locationCity}/>
              <LableValue lable="Lat-Long" value={dataResponse?.latitudeLongitude}/>
              <LableValue lable="Nama Penandatangan LOO / MOU" value={dataResponse?.signerLooMouName}/>
              <LableValue lable="Email Penandatangan LOO / MOU" value={dataResponse?.signerLooMouEmail}/>
              <LableValue lable="No HP Penandatangan LOO / MOU" value={dataResponse?.signerLooMouTelephoneNumber}/>
            </Grid>
            <Grid item xs={6}>
              <LableValue lable="PIC / Vendor" value={dataResponse?.picVendor}/>
              <LableValue lable="Jenis Pekerjaan" value={dataResponse?.jobType}/>
              <LableValue lable="Due Date" value={dataResponse?.dueDate === null ? "-" : useTimestampConverter(dataResponse?.dueDate/1000, "DD-MM-YYYY")}/>
              <LableValue lable="Biaya Jasa" value={useRupiah(dataResponse?.serviceFee)}/>
              <LableValue lable="Biaya Barang" value={useRupiah(dataResponse?.goodsCost)}/>
              <LableValue lable="Total Biaya" value={useRupiah(dataResponse?.totalCost)}/>
              <LableValue lable="Total Biaya + PPN" value={useRupiah(dataResponse?.totalCostWithPpn)}/>
              <LableValue lable="Status Approval" value={statusApproval(dataResponse?.statusApproval)}/>
              <LableValue lable="Tgl Approved" value={ dataResponse?.approvalDate === null ? "-" : useTimestampConverter(dataResponse?.approvalDate/1000, "DD-MM-YYYY") }/>
              <LableValue lable="Tgl Pengerjaan" value={ dataResponse?.processingDate === null ? "-" : useTimestampConverter(dataResponse?.processingDate/1000, "DD-MM-YYYY")}/>
              <LableValue lable="SLA Pengerjaan" value={textDays(dataResponse?.slaWork)}/>
              <LableValue lable="Tgl Pembayaran" value={dataResponse?.paymentDate === null ? "-" : useTimestampConverter(dataResponse?.paymentDate/1000, "DD-MM-YYYY")}/>
              <LableValue lable="SLA Pembayaran" value={textDays(dataResponse?.slaPayment)}/>
              <LableValue lable="Status Paid" value={paidStatus(dataResponse?.paidStatus)}/>
              <LableValue lable="Notes & Desc" value={dataResponse?.notesDescription}/>
            </Grid>
          </Grid>

          {/* Informasi Vendor */}
          <Typography style={{fontWeight: 500, color: '#8D98B4', marginTop: 35}}>Informasi Vendor</Typography>
          <Divider variant='fullWidth' style={{height: '2px', backgroundColor: '#BCC8E7', marginTop: 10, marginBottom: 20}}/>

          <Grid container>
            <Grid item xs={6}>
              <LableValue lable="No Invoice" value={<ChkyInputSmall
                disabled={isDisabledEdit} value={noInvoice} onChange={(e)=>{
                  setNoInvoice(e.target.value);
                  handleChangeState(e.target.value,"invoiceNumber");
                }}/>}/>
              <LableValue lable="Upload Invoice" value={data?.invoiceFileRes? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MinioDocComponent filePath={data?.invoiceFileRes}/>
                  {isDisabledEdit === false && (
                    <IconButton
                      style={{marginLeft: 10, color: "#DC241F",}}
                      onClick={() => {
                        handleChangeState(null,"invoiceFileRes");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              ) : (
                <>
                  {isDisabledEdit === false && (
                    <>
                      <AttachFileSelector title="Select File Invoice" refId="invoiceAttach" onChange={(e)=>handleUploadFile(e)} selectedFile={data.invoiceFile} onDelete={handleDeleteFile} accept="image/*" />
                      {isMaxLimit && (
                        <ErrorComponent label='*) Ukuran File Melebihi 1Mb, silahkan pilih ukuran yang lebih kecil'/>
                      )}
                    </>
                  )}
                </>
              )}/>
              <LableValue
                lable="Tgl Kirim Invoice"
                value={
                  dataResponse?.invoiceDate === null
                    ? (dateNow ? useTimestampConverter(dateNow/1000, "DD-MM-YYYY") : "-")
                    : useTimestampConverter(dataResponse?.invoiceDate/1000, "DD-MM-YYYY")
                }
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue lable="BAST Digital" value={dataResponse?.bastSubmitStatus ? (
                <div>
                  <Link
                    onClick={()=>{
                      if(userRoleName.toLowerCase().includes('vendor')){
                        history.push(`/vendor-orders/kebutuhan/bast-digital/${idCard}?idBast=${dataResponse?.bastId}`);
                      }else{
                        // history.push(`/implementation/bast-digital-preview/${dataResponse?.bastId}`);
                        history.push(`/vendor-management/orders/kebutuhan/bast-digital-preview/${dataResponse?.bastId}`);
                      }
                    }
                    }
                    style={{color: 'green', display: 'flex', textDecoration: 'none'}}>
                      BAST Digital
                    <CheckIcon style={{color: 'green', marginLeft: 10}} />
                  </Link>
                </div>
              ): (
                <div>
                  <Link
                    onClick={()=>{
                      if(userRoleName.toLowerCase().includes('vendor')){
                        history.push(`/vendor-orders/kebutuhan/bast-digital/${idCard}?idBast=null`);
                      } else {
                        alert("BAST DIGITAL belum dibuat vendor");
                      }
                    }
                    }
                    style={{color: 'red', display: 'flex', textDecoration: 'none'}}>
                      BAST Digital
                    <CloseIcon style={{color: 'red', marginLeft: 10}} />
                  </Link>
                </div>
              )}/>
              <LableValue lable="Tgl Selesai" value={dataResponse?.completedDate === null ? "-" : useTimestampConverter(dataResponse?.completedDate/1000, "DD-MM-YYYY")}/>
            </Grid>
          </Grid>

          {/* Informasi Umum */}
          <Typography style={{fontWeight: 500, color: '#8D98B4', marginTop: 35}}>Informasi Umum</Typography>
          <Divider variant='fullWidth' style={{height: '2px', backgroundColor: '#BCC8E7', marginTop: 10, marginBottom: 20}}/>

          <Grid container>
            <Grid item xs={6}>
              <LableValue lable="ID Requester" value={dataResponse?.requesterId}/>
              <LableValue lable="Initial Cabang" value={dataResponse?.branchCode}/>
              <LableValue lable="Kode GFMS" value={dataResponse?.gfmsCode}/>
              <LableValue lable="Nama Req" value={dataResponse?.requesterName}/>
              <LableValue lable="Nama Branch" value={dataResponse?.branchName}/>
              <LableValue lable="No Telp Req" value={dataResponse?.requesterTelephoneNumber}/>
              <LableValue lable="Email Requester" value={dataResponse?.requesterEmail}/>
              <LableValue lable="Alamat Branch" value={dataResponse?.branchAddress}/>
              <LableValue lable="Nama PIC Loc" value={dataResponse?.picLocName}/>
              <LableValue lable="Telp PIC Loc" value={dataResponse?.picLocTelephoneNumber}/>
              <LableValue lable="Email PC Loc" value={dataResponse?.picLocEmail}/>
              <LableValue lable="Type Loc" value={dataResponse?.locationType}/>
              <LableValue lable="Ruang ATM" value={dataResponse?.atmBoothType}/>
            </Grid>
            <Grid item xs={6}>
              <LableValue lable="Luas Area" value={dataResponse?.atmBoothLarge}/>
              <LableValue lable="Akses Umum" value={dataResponse?.publicAccessibility}/>
              <LableValue lable="Operasional" value={dataResponse?.operational.replace(/1970-01-01/g,'')}/>
              <LableValue lable="Jumlah ATM Lain" value={dataResponse?.aroundAtmBank}/>
              <LableValue lable="Denom" value={dataResponse?.denom}/>
              <LableValue lable="AC" value={dataResponse?.acType}/>
              <LableValue lable="Kebersihan" value={dataResponse?.cleanType}/>
              <LableValue lable="Komunikasi" value={dataResponse?.commType}/>
              <LableValue lable="Media Promosi" value={dataResponse?.mediaPromotion == null ? "" : JSON.parse(dataResponse.mediaPromotion).toString()}/>
              <LableValue lable="Notes" value={dataResponse?.notes}/>
            </Grid>
          </Grid>

          <Grid item style={{marginTop: 15}}>
            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Status</Typography>
          </Grid>

          <Grid item xs={6} style={{marginTop: 5, paddingRight: '60px'}}>
            <SelectItemsIcon
              selectOptionData={dataSelectStatus}
              selectedValue={data.status}
              onSelectValueChange={(newVal)=>handleChangeState(newVal, 'status')}
              disabled={isDisabledEdit}/>
          </Grid>

          <Grid item style={{marginTop: 5, paddingRight: '60px'}}>
            <Typography
              style={{
                fontWeight: 400,
                fontStyle: 'Italic',
                color: '#8D98B4',
                fontSize: '13px',
              }}
            >
                *Status berubah menjadi <b>overdue</b> ketika due date terlewati
            </Typography>
          </Grid>

          <Grid item style={{ marginTop: '20px', width: '96%' }}>
            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Pekerjaan Sebelum</Typography>
            <Grid container direction='row' spacing={4} style={{marginTop: '5px'}}>
              <Grid item>
                {data.photoSebelum1 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSebelum1} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSebelum1");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sebelum1"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSebelum1(e.target.files[0])} selectedImage={photoSebelum1} onDelete={()=>setphotoSebelum1('')} />
                )}
                <Typography style={{textAlign: "center"}}>Sebelum 1</Typography>
              </Grid>
              <Grid item>
                {data.photoSebelum2 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSebelum2} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSebelum2");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sebelum2"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSebelum2(e.target.files[0])} selectedImage={photoSebelum2} onDelete={()=>setphotoSebelum2('')} />
                )}
                <Typography>Sebelum 2</Typography>
              </Grid>
              <Grid item>
                {data.photoSebelum3 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSebelum3} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSebelum3");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sebelum3"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSebelum3(e.target.files[0])} selectedImage={photoSebelum3} onDelete={()=>setphotoSebelum3('')} />
                )}
                <Typography>Sebelum 3</Typography>
              </Grid>
              <Grid item>
                {data.photoSebelum4 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSebelum4} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSebelum4");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sebelum4"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSebelum4(e.target.files[0])} selectedImage={photoSebelum4} onDelete={()=>setphotoSebelum4('')} />
                )}
                <Typography>Sebelum 4</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: '20px', width: '96%' }}>
            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Pekerjaan Sesudah</Typography>
            <Grid container direction='row' spacing={4} style={{marginTop: '5px'}}>
              <Grid item>
                {data.photoSesudah1 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSesudah1} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSesudah1");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sesudah1"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSesudah1(e.target.files[0])} selectedImage={photoSesudah1} onDelete={()=>setphotoSesudah1('')} />
                )}
                <Typography>Sesudah 1</Typography>
              </Grid>
              <Grid item>
                {data.photoSesudah2 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSesudah2} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSesudah2");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sesudah2"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSesudah2(e.target.files[0])} selectedImage={photoSesudah2} onDelete={()=>setphotoSesudah2('')} />
                )}
                <Typography>Sesudah 2</Typography>
              </Grid>
              <Grid item>
                {data.photoSesudah3 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSesudah3} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSesudah3");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sesudah3"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSesudah3(e.target.files[0])} selectedImage={photoSesudah3} onDelete={()=>setphotoSesudah3('')} />
                )}
                <Typography>Sesudah 3</Typography>
              </Grid>
              <Grid item>
                {data.photoSesudah4 ? (
                  <div style={{position: "relative"}}>
                    <MinioImageComponent filePath={data.photoSesudah4} className={classes.imgContainer}/>
                    {/* <IconButton
                      className={classes.deleteFilePhoto}
                      onClick={() => {
                        handleChangeState(null,"photoSesudah4");
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton> */}
                  </div>
                ): (
                  <img src={NoImage} className={classes.imgContainer} alt="img-sesudah4"/>
                  // <ImageSelector title="" refId="sebelum1" onChange={(e)=>setphotoSesudah4(e.target.files[0])} selectedImage={photoSesudah4} onDelete={()=>setphotoSesudah4('')} />
                )}
                <Typography>Sesudah 4</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{marginTop: '25px', width: '96%'}}>
            <Grid container direction='row'>

              <Grid item xs={6}>
                <Grid container direction='column' style={{marginTop:'10px'}}>
                  <Typography style={{fontWeight: 600, color: '#2B2F3C'}}>CIMB Attachment</Typography>
                  {dataResponse?.cimbAttachment.length > 0 ?
                    dataResponse.cimbAttachment.map((item)=>{
                      return (
                        <MinioDocComponent filePath={item.path} textColor="#8D98B4"/>
                      );
                    })
                    : (<Typography style={{ color: "#BCC8E7", fontStyle: "italic", fontSize: 12,}}>No Files</Typography>)}
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container direction='column' style={{marginTop:'10px'}}>
                  <Typography style={{fontWeight: 600, color: '#2B2F3C'}}>Vendor Attachment</Typography>
                  {data.vendorAttachment.length > 0 &&
                    data.vendorAttachment.map((item, index)=>{
                      const currentIndex = index;
                      return(
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <MinioDocComponent filePath={item.path}/>
                          {isDisabledEdit === false && (
                            <IconButton
                              cstyle={{marginLeft: 10, color: "#DC241F",}}
                              onClick={() => {
                                const oldArr = data.vendorAttachment.slice();
                                const newArr = oldArr.filter(function(itemOld, i) {
                                  return i !== currentIndex;
                                });
                                // console.log("+++ newArr",newArr);
                                handleChangeState(newArr,"vendorAttachment");
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </div>
                      );
                    })}
                  {isDisabledEdit? (
                    <>
                      {data.vendorAttachment.length < 1 &&
                        (<Typography style={{ color: "#BCC8E7", fontStyle: "italic", fontSize: 12,}}>No Files</Typography>)
                      }
                    </>
                  ): (
                    <>
                      {data.vendorAttachment.length < 1 && (
                        <AttachFileSelector title="Attachment 1" refId="attachmet1" onChange={(e)=>setAttachment1(e.target.files[0])} selectedFile={attachment1} onDelete={()=>setAttachment1('')} />
                      ) }

                      {data.vendorAttachment.length < 2 && (
                        <AttachFileSelector title="Attachment 2" refId="attachmet2" onChange={(e)=>setAttachment2(e.target.files[0])} selectedFile={attachment2} onDelete={()=>setAttachment2('')} />
                      )}

                      {data.vendorAttachment.length < 3 && (
                        <AttachFileSelector title="Attachment 3" refId="attachmet3" onChange={(e)=>setAttachment3(e.target.files[0])} selectedFile={attachment3} onDelete={()=>setAttachment3('')} />
                      )}
                    </>
                  )}
                </Grid>
              </Grid>

            </Grid>
          </Grid>

          {/* Button Container */}
          <Grid item style={{marginTop: 55}}>
            <Grid container justify='space-between' style={{paddingLeft: 30, paddingRight: 30}}>
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.secondaryButton}
                  onClick={()=>history.goBack()}
                  style={{ textTransform: "capitalize" }}
                >
                  Cancel
                </Button>
              </Grid>
              {isDisabledEdit === false && (
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={handleSave}
                    style={{ textTransform: "capitalize" }}
                  >
                    Simpan
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>

        </div>
      </Paper>
    </div>
  );
}

LeftComponent.propTypes = {
  data: PropTypes.object.isRequired,
  dataResponse: PropTypes.object.isRequired,
  handleChangeState: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  idCard: PropTypes.string.isRequired,
};
LeftComponent.defaultProps = {
};
function mapStateToProps() {
  return {};
};

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(LeftComponent))
);
