/* eslint-disable react/forbid-prop-types */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
import React, {useState,useEffect,useContext,useRef} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Typography , Grid, IconButton, Link} from '@material-ui/core';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import { RootContext } from '../../../../router';
import {ReactComponent as PaperClipIcon} from '../../../../assets/icons/general/paperclip.svg';
import {ReactComponent as FlagIcon} from '../../../../assets/icons/duotone-gray/flag-alt.svg';
import {ReactComponent as FlagGreenIcon} from '../../../../assets/icons/duotone-others/flag-alt-green.svg';
import {ReactComponent as FileIcon} from '../../../../assets/icons/duotone-red/file-alt.svg';
import { ChkyButtons, ChkyInputSmall, IdrNumberInput } from '../../../../components';
import ModalLoader from '../../../../components/ModalLoader';
import {doSaveNegotiation, doUploadOfferingFile} from '../ApiServiceNegotiation';
import getMinioFromUrl from '../../../../helpers/getMinioFromUrl';
import getMinioFile from '../../../../helpers/getMinioFile';
import  idrCurrencyFormat from '../../../../helpers/useRupiahConverterSecondary';
import ModalDraftNego from '../ModalDraftNego';
import { Switch } from 'antd';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    '&::after':{
      content: '""',
      position: 'absolute',
      width: 6,
      backgroundColor: '#BCC8E7',
      top: 35,
      bottom: 0,
      left:10,
    }
  },
  container:{
    padding: '10px 10px 10px 40px',
    position: 'relative',
    width: '100%',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: '#FF6A6A',
      border: '3px solid #FFFF',
      top: 10,
      borderRadius: '50%',
      zIndex: 2,
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
    }
  },
  content: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    backgroundColor: '#fff',
  },
  contentFirst: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    backgroundColor: '#fff',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      // height: 270,
      height: '125%',
      left: -37,
      backgroundColor: '#fff',
      top: -20,
      zIndex: 1,
    }
  },
  contentButton: {
    position: 'relative',
  },

  contentFirstButton: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      height: 150,
      left: -37,
      backgroundColor: '#fff',
      top: -20,
      zIndex: 1,
    }
  },
  contentForm: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    backgroundColor: '#fff',
  },

  contentFirstForm: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    border: '1px solid #BCC8E7',
    backgroundColor: '#fff',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      height: 350,
      height: '125%',
      left: -37,
      backgroundColor: '#fff',
      top: -20,
      zIndex: 1,
    }
  },
  documentLink: {
    backgroundColor: 'unset', 
    padding: 0,
    '& .MuiButton-root':{padding: 0, textTransform: 'none' ,backgroundColor: 'unset'},
    '& .MuiButton-root:hover':{opacity: 0.6,backgroundColor: 'unset'},
  },
  labelFieldText: {fontSize: 11, fontWeight: 400, marginBottom: 5,},
  labelFieldTextNoTop: {fontSize: 11, fontWeight: 400, marginBottom: 5},
  labelFieldTextBold: {fontSize: 14, fontWeight: 500, marginBottom: 10, marginTop: 10},
});

const OrdinalNumber = (i)=>  {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i  }st`;
  }
  if (j === 2 && k !== 12) {
    return `${i  }nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i  }rd`;
  }
  return `${i  }th`;
};

const numberWithCommas = (x) => {
  if (x === null){return 'N/A';}
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const RenderOfferingFile=({filePath, isPath=false})=>{
  const [dataOffering,setDataOffering] = useState(null);
  function limitString(string, count){
    const result = string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  useEffect(()=>{
    try{
      if(isPath){
        getMinioFile(filePath).then(result => {
          // console.log("--------- try getMinio File ", JSON.stringify(result));
          setDataOffering(result);
        });
      }else{
        getMinioFromUrl(filePath).then(result=>{
          // console.log(">>>> try getMinio Offering ",JSON.stringify(result));
          setDataOffering(result);
        });
      }
    }catch(err){
      // console.log(">>>> Error try getMinio", err);
    }
  },[]);
  useEffect(()=>{
    // console.log(">>>> dataOffering: ", dataOffering);
  },[dataOffering]);
  return(
    <Link href={dataOffering == null ? '#' : dataOffering.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 13, color: '#DC241F', fontWeight: 400}}>
      {dataOffering == null ? 'N/A': limitString(dataOffering.fileName, 25)}
    </Link>
  );
};

RenderOfferingFile.propTypes={
  isPath: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
};


const NegotiationTimeline = (props) => {
  const { dataNego, onShowForm, dataInfoGeneral, idLoc, signer, bargainVia, handleTerminateNego, onFlagClicked, idSiteNewAtm, offeringFilesLandlord, openingType, hargaFirstLandlord, dataToDraftModal} = props;
  const classes = useStyles();
  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);
  const NewUserId = parseInt(userId);
  const [isDisableAction, setIsDisableAction] = useState(false);
  
  // COMPONENT DIDI MOUNT
  useEffect(() => {
    if(userRoleName.toLowerCase().includes("tim approval negotiation")||dataInfoGeneral?.rent?.negotiationStatus==2){
      setIsDisableAction(true);
    }
  }, []);

  // showHide FORM Input
  const [displayFormValue, setDisplayFormValue] = useState('none');
  const displayForm = {"display" : displayFormValue};
  const [displayButtonCreate, setDisplayButtonCreate] = useState('block');
  const displayCreateBtn = {"display" : displayButtonCreate};
  function showForm() {
    onShowForm(true);
    setDisplayFormValue('block');
    setDisplayButtonCreate('none');
  }  
  function hideFormInput() {
    onShowForm(false);
    setDisplayFormValue('none');
    setDisplayButtonCreate('block');
  }

  //flat cost
  const [flatCost, setFlatCost] = useState(true);
  const [flatCimbCost, setFlatCimbCost] = useState(true)
  const [flatLandlordCost, setFlatLandlordCost] = useState(true)
  const [yearlyRentCosts, setYearlyRentCosts] = useState([]);
  const [offeringPriceCimbList, setOfferingPriceCimbList] = useState([]);
  const [offeringPriceLandlordList, setOfferingPriceLandlordList] = useState([]);
  const [dataHitSaveNego, setDataHitSaveNego] = useState(null);
  
  useEffect(() => {
    // console.log('INFOGENERAL===', dataInfoGeneral);
    if (dataInfoGeneral.rent?.flatCost !== undefined) {
      const newFlatCost = dataInfoGeneral.rent.flatCost
      setFlatCost(newFlatCost);
      setFlatCimbCost(newFlatCost)
      setFlatLandlordCost(newFlatCost);
      const {
        rent,
      } = dataInfoGeneral;
      const newArray = rent?.yearlyRentCosts || [];
      setYearlyRentCosts(newArray);
      setDataOfferingPriceCimbList(newArray);
      setDataOfferingPriceLandlordList(newArray);
    }
  }, [dataInfoGeneral]);

  useEffect(() => {
    if(flatCimbCost){
      setOfferingPriceCimbList(list=>{
        return list.map(()=>list[0])
      })
    }
  }, [flatCimbCost])

  useEffect(() => {
    if(flatLandlordCost){
      setOfferingPriceLandlordList(list=>{
        return list.map(()=>list[0])
      })
    }
  }, [flatLandlordCost])

  function setDataOfferingPriceCimbList(arr){
    var newArr = [];
    if(arr!==null){
      for (let i = 0; i < arr.length; i++) {
        newArr[i] = null;
      }
    }
    setOfferingPriceCimbList(newArr);
  }
  function setDataOfferingPriceLandlordList(arr){
    var newArr = [];
    if(arr!==null){
      for (let i = 0; i < arr.length; i++) {
        newArr[i] = null;
      }
    }
    setOfferingPriceLandlordList(newArr);
  }

  // Init Modal Loader
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue){
    setModalLoader(loaderValue);
  }
  useEffect(()=>{
    // console.log(">>>> dataToDraftModal: ", dataToDraftModal);
  },[dataToDraftModal]);

  // Init Modal Draft
  const [isOpenModalDraft, setOpenModalDraft] = useState(false);
  const handleOpenModalDraft= () => setOpenModalDraft(true);
  const handleCloseModalDraft= () => setOpenModalDraft(false);

  // HARGA INPUT
  const [hargaCimb, setHargaCimb] = useState(null);
  const handleHargaCimb = (value) => {
    setHargaCimb(value.floatValue);
  };

  const handleHargaCimbBeda = (index,value)=>{
    setOfferingPriceCimbList((old) => {
      return old.map((oldVal, i) => {
        return flatCimbCost ? value.floatValue : i === index ? value.floatValue : oldVal;
      });
    });
  }

  const [hargaLandlord, setHargaLandlord] = useState(null);
  const handleHargaLandlord = (value) => {
    setHargaLandlord(value.floatValue);
  };

  const handleHargaLandlordBeda = (index, value) => {
    setOfferingPriceLandlordList((old) => {
      return old.map((oldVal, i) => {
        return flatLandlordCost ? value.floatValue : i === index ? value.floatValue : oldVal;
      });
    });
  }

  // Note Input
  const [noteValue, setNoteValue] = useState('');
  function handleChangeNoteValue(event) {
    setNoteValue(event.target.value);
  }

  // showHide Older hhistories
  const jumlahDataToShow = 1;
  const [displayValue, setDisplayValue] = useState('none');
  const displayDifHide = {"display" : displayValue};
  function showHideHistory() {
    if (displayValue === 'none') {
      setDisplayValue('block');
    } else {
      setDisplayValue('none');
    }
  }

  const inputFileSuratLandlord = useRef();
  // attach file landlord
  const [fileSuratLandlord, setFileSuratLandlord] = useState(null);  
  function handleUploadSuratLandlord(event){
    setFileSuratLandlord(event.target.files[0]);
  }
  function hargaBedaValidation(array){
    var jmlnull = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === null || array[i] === undefined){
        jmlnull += 1;
      }
    }
    if (jmlnull>0){
      return false;
    }else{
      return true;
    }
  }

  // handle Button Submit
  async function handleSubmitDraft(first){
    let dataFromApi
    if (!hargaBedaValidation(offeringPriceCimbList)){
      alert("Please insert Harga Cimb");
      return false;
    }
    if(!first){
      if(!hargaBedaValidation(offeringPriceLandlordList)){
        alert("Please insert Harga Landlord");
        return false;
      }
    }
    if((signer === null)|| (signer === '')){
      alert("Please input Signer");
    }else if((bargainVia === null)|| (bargainVia === '')|| (bargainVia === 'null')){
      alert("Please select Nego By");
    }else {
      let fileLandlordPath = null;
      const withFile = fileSuratLandlord != null
      try {
        dataFromApi = withFile ? await doUploadOfferingFile(loaderHandler, fileSuratLandlord) : null
        console.log('~ dataFromApi', dataFromApi)
        fileLandlordPath = dataFromApi?.data?.path;
      }
      catch(e){
        console.log(e);
      }
      const dataHit={
        "id": null,
        "idSiteNewAtm": idSiteNewAtm,
        "userId" : NewUserId,
        "isFlatCost": flatCimbCost && flatLandlordCost,
        "locationId": idLoc,
        "offeringPriceCimb": flatCost===false ? "" : hargaCimb,
        "offeringPriceCimbList": offeringPriceCimbList,
        "offeringFilesCimb":null,
        "offeringPriceLandlord": flatCost === false ? "" : hargaLandlord,
        "offeringPriceLandlordList": first ? yearlyRentCosts : offeringPriceLandlordList,
        "offeringFilesLandlord": withFile ? fileLandlordPath : null,
        "note": noteValue,
        "signer": signer,
        "bargainVia": bargainVia
      };
      // passing data hit nego to modal draft
      setDataHitSaveNego(dataHit);
      handleOpenModalDraft();
      // doSaveNegotiation(loaderHandler, dataHit).then(
      //   dataFromApiSave => {
      //     if(dataFromApiSave.data.responseCode === '00'){
      //       alert('Submit Draft Nego Success, Get email format Send to Landlord');
      //       handleOpenModalDraft();
      //     }
      //   });
    }
  }

  function handleFlagClicked(flagDataNego, keyNameFlag, indexArray){
    const isCimbDeal = (keyname) =>{
      if (keyname==='priceCimbDealFlag'){return true;}
      return false;
    };

    const newTempNego = [];
    dataNego.map((item, index)=>{
      if(index === indexArray){
        const newObject = { 
          ...item, 
          priceCimbDealFlag: isCimbDeal(keyNameFlag),
          priceLandlordDealFlag: !isCimbDeal(keyNameFlag)
        };
        newTempNego.push(newObject);
      }else{
        const newObject2 = { 
          ...item, 
          priceCimbDealFlag: false,
          priceLandlordDealFlag: false
        };
        newTempNego.push(newObject2);}
    });

    const dealAttachment = (keyname) =>{
      if (keyname==='priceCimbDealFlag'){return flagDataNego.offeringFilesCimb;}
      return flagDataNego.offeringFilesLandlord;
    };
    const dealCost = (keyname) =>{
      if (keyname==='priceCimbDealFlag'){return flagDataNego.offeringPriceCimb;}
      return flagDataNego.offeringPriceLandlord;
    };
    const dealCostList = (keyname) => {
      if (keyname === 'priceCimbDealFlag') { return flagDataNego.offeringPriceCimbList; }
      return flagDataNego.offeringPriceLandlordList;
    };
    const selectedValData = {
      "id":flagDataNego.idNegotiation,
      "idSiteNewAtm": idSiteNewAtm,
      "userId" : NewUserId,
      "locationId":idLoc,
      "negotiationDealNotes":flagDataNego.negotiationDealNotes,
      "dealAttachmentPath":dealAttachment(keyNameFlag),
      "priceCimbDealFlag":isCimbDeal(keyNameFlag),
      "priceLandlordDealFlag":!isCimbDeal(keyNameFlag),
      "negotiationDealCost":dealCost(keyNameFlag),
      "negotiationDealCostList":dealCostList(keyNameFlag)===null ? [] : dealCostList(keyNameFlag),
      "flatCost": flatCost,
    };
    // console.log("+++++ newTempNego",newTempNego);
    // console.log("++selectedVal", selectedValData);
    onFlagClicked(newTempNego, selectedValData);
  }

  const SwitchLine = ({onSwitchChange, value}) => {
    return (
      <>
        <Switch 
          checked={value} 
          checkedChildren="Flat" 
          unCheckedChildren="Tiering"
          onChange={onSwitchChange} 
        />
      </>
    )
  }

  function handleClickCimbSwitch(){
    setFlatCimbCost(!flatCimbCost)
  }

  function handleClickLandlordSwitch(){
    setFlatLandlordCost(!flatLandlordCost)
  }

  return (
    <div className={classes.root}>

      {/* FORM INPUT FIRST NEGO */}
      {dataNego.length === 0 && 
        <div className={classes.container} >
          <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
            <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{`${OrdinalNumber(dataNego.length + 1)  } negotiation`}</Typography>
            <Typography style={{fontSize:10, color:'#BCC8E7'}}>{moment(new Date()).format("DD MMMM YYYY")}</Typography>
          </Grid>
          <div style={displayCreateBtn} className={dataNego.length === 0 ? classes.contentFirstButton : classes.contentButton}>
            <ChkyButtons disabled={isDisableAction} onClick={showForm} style={{textTransform:'capitalize'}}>
              <AddIcon style={{color: isDisableAction? 'rgba(0, 0, 0, 0.26);' : '#fff'}}/>Create Draft Penawaran
            </ChkyButtons>
          </div>
          <div style={displayForm}>
            {/* // FORM NEGO 1st */}
            <div className={classes.contentFirstForm}>
              <Grid container justify="space-between" spacing={2}>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Typography className={classes.labelFieldTextBold}>Penawaran CIMB</Typography>
                      <SwitchLine value={flatCimbCost} onSwitchChange={handleClickCimbSwitch} />
                    </Grid>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Typography className={classes.labelFieldTextBold}>Penawaran Landlord</Typography>
                      <SwitchLine value={flatLandlordCost} onSwitchChange={handleClickLandlordSwitch} />
                    </Grid>
                    {
                      yearlyRentCosts.map((row,index)=>{
                        return(
                          <>
                            <Grid item xs={6}>
                              <Typography className={classes.labelFieldText}>Tahun - {(index+1)}</Typography>
                              <IdrNumberInput disabled={flatCimbCost && index > 0} value={offeringPriceCimbList[index]} onValueChange={(val) => { handleHargaCimbBeda(index, val) }} prefix="Rp " placeholder="Ex: Rp 1.000.000" style={{width: '100%'}}/>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography className={classes.labelFieldText}>&nbsp;</Typography>
                              <Typography style={{ fontSize: 16, fontWeight: 500, color: '#2B2F3C', marginBottom: 5, marginRight: 10 }}>
                                {idrCurrencyFormat(row, '.')}
                              </Typography>
                            </Grid>
                          </>
                        )
                      })
                    }
                <Grid item xs={6} />
                <Grid item xs={6}>
                  <div style={{position: 'relative', marginTop: 5}}>
                    {
                      openingType !== "New Location" &&
                      openingType !== "New ATM" &&
                      openingType !== "Reopen"
                      ? 
                      <div>
                        <PaperClipIcon style={{position: 'absolute', top: 5, width: 20}}/> 
                        <div style={{position: 'relative', paddingLeft: 20}}>
                          <input 
                            id='fileSuratLandlord'
                            type="file"
                            ref={inputFileSuratLandlord} 
                            onChange={handleUploadSuratLandlord}
                            style={{
                              width: '0.1px',
                              height: '0.1px',
                              opacity: 0,
                              overflow: 'hidden',
                              position: 'absolute',
                              zIndex: -1,
                            }}/>
                          <label htmlFor="fileSuratLandlord" style={{cursor: 'pointer'}}>
                            <Typography style={{fontSize: 14, color: '#DC241F', marginLeft:5, marginRight: 10, wordBreak: 'break-all' }}>
                              { !fileSuratLandlord ?
                                'Attach File..'
                                : 
                                fileSuratLandlord.name
                              }
                            </Typography>
                          </label>
                          { fileSuratLandlord &&
                            <IconButton style={{ position: 'absolute', top: -10, right: -20, color: '#DC241F', }} onClick={() => { setFileSuratLandlord(null); inputFileSuratLandlord.current.value = null;}}>
                              <DeleteIcon fontSize="small"/>
                            </IconButton>
                          }
                        </div>
                      </div> 
                      :
                      offeringFilesLandlord ?
                      <div>
                        <FileIcon style={{ height: 14, width: 14 }} />
                        <RenderOfferingFile filePath={offeringFilesLandlord} isPath />
                      </div>
                      :
                      "-" 
                    }
                  </div>
                </Grid>
              </Grid>
              <Typography className={classes.labelFieldTextBold}>Note</Typography>
              <ChkyInputSmall 
                multiline
                rows={3} 
                placeholder="(Optional)"
                fullWidth
                value={noteValue}
                onChange={handleChangeNoteValue}
              />
              <Grid container justify="space-between" style={{marginTop: 15}}>
                <Grid item>
                  <ChkyButtons style={{textTransform:'capitalize'}} onClick={hideFormInput} buttonType="redOutlined">Cancel</ChkyButtons>
                </Grid>
                <Grid item>
                  <ChkyButtons style={{textTransform:'capitalize'}} onClick={() => {if(window.confirm('Are you sure want to submit this draf negotiation?')){handleSubmitDraft(true);};}}>Submit</ChkyButtons>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      }
      {/* FORM INPUT as TOP Div */}
      {dataNego.length > 0 && 
        <div className={classes.container} >
          <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
            <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{`${OrdinalNumber(dataNego.length + 1)  } negotiation`}</Typography>
            <Typography style={{fontSize:10, color:'#BCC8E7'}}>{moment(new Date()).format("DD MMMM YYYY")}</Typography>
          </Grid>
          <div style={displayCreateBtn} className={dataNego.length === 0 ? classes.contentFirstButton : classes.contentButton}>
            <ChkyButtons disabled={isDisableAction}  onClick={showForm} style={{textTransform:'capitalize'}}>
              <AddIcon style={{color: isDisableAction? 'rgba(0, 0, 0, 0.26)' : '#fff'}}/>Create Draft Penawaran
            </ChkyButtons>
          </div>
          <div style={displayForm}>
            {/* // FORM NEGO INPUT */}
            <div className={dataNego.length === 0 ? classes.contentFirstForm : classes.contentForm}>
              <Grid container justify="space-between" spacing={2}>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Typography className={classes.labelFieldTextBold}>Penawaran CIMB</Typography>
                      <SwitchLine  value={flatCimbCost} onSwitchChange={handleClickCimbSwitch} />
                    </Grid>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Typography className={classes.labelFieldTextBold}>Penawaran Landlord</Typography>
                      <SwitchLine value={flatLandlordCost} onSwitchChange={handleClickLandlordSwitch} />
                    </Grid>
                    {
                      offeringPriceCimbList.map((row, index) => {
                        return (
                          <>
                            <Grid item xs={6}>
                              <Typography className={classes.labelFieldText}>Tahun - {(index + 1)}</Typography>
                              <IdrNumberInput disabled={flatCimbCost && index > 0} value={offeringPriceCimbList[index]} onValueChange={(val) => { handleHargaCimbBeda(index, val) }} prefix="Rp " placeholder="Ex: Rp 1.000.000" style={{width: '100%'}}/>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography className={classes.labelFieldText}>&nbsp;</Typography>
                              <IdrNumberInput disabled={flatLandlordCost && index > 0} value={offeringPriceLandlordList[index]} onValueChange={(val) => { handleHargaLandlordBeda(index, val) }} prefix="Rp " placeholder="Ex: Rp 1.000.000" style={{width: '100%'}}/>
                            </Grid>
                          </>
                        )
                      })
                    }
                <Grid item xs={6} />
                <Grid item xs={6}>
                  <div style={{position: 'relative', marginTop: 5}}>
                    <PaperClipIcon style={{position: 'absolute', top: 5, width: 20}}/> 
                    <div style={{position: 'relative', paddingLeft: 20}}>
                      <input 
                        id='fileSuratLandlord'
                        type="file"
                        ref={inputFileSuratLandlord} 
                        onChange={handleUploadSuratLandlord}
                        style={{
                          width: '0.1px',
                          height: '0.1px',
                          opacity: 0,
                          overflow: 'hidden',
                          position: 'absolute',
                          zIndex: -1,
                        }}/>
                      <label htmlFor="fileSuratLandlord" style={{cursor: 'pointer'}}>
                        <Typography style={{fontSize: 14, color: '#DC241F', marginLeft:5, marginRight: 10, wordBreak: 'break-all' }}>
                          { !fileSuratLandlord ?
                            'Attach File..'
                            : 
                            fileSuratLandlord.name
                          }
                        </Typography>
                      </label>
                      {fileSuratLandlord === null ? 
                        null 
                        : <IconButton style={{ position: 'absolute', top: -10, right: -20, color:'#DC241F',}} onClick={()=>{setFileSuratLandlord(null); inputFileSuratLandlord.current.value = null;}}>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>}
        
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Typography className={classes.labelFieldTextBold}>Note</Typography>
              <ChkyInputSmall 
                multiline
                rows={3} 
                placeholder="(Optional)"
                fullWidth
                value={noteValue}
                onChange={handleChangeNoteValue}
              />
              <Grid container justify="space-between" style={{marginTop: 15}}>
                <Grid item>
                  <ChkyButtons style={{textTransform:'capitalize'}} onClick={hideFormInput} buttonType="redOutlined">Cancel</ChkyButtons>
                </Grid>
                <Grid item>
                  <ChkyButtons style={{textTransform:'capitalize'}} onClick={() => {if(window.confirm('Are you sure want to submit this draf negotiation?')){handleSubmitDraft();};}}>Submit</ChkyButtons>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      }
      
      {/* SHOW DATA NEGO HISTORIES */}
      {dataNego.map((nego, index) =>{
        return (
          <>
            <div className={classes.container} style={ index < (dataNego.length-jumlahDataToShow) ? displayDifHide : null}>
              <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
                <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{`${OrdinalNumber(index + 1)  } negotiation`}</Typography>
                <Typography style={{fontSize:10, color:'#BCC8E7'}}>{moment.unix(nego.submitNegotiationDetailDate/1000).format("DD MMMM YYYY")}</Typography>
              </Grid>
              <div className={index === 0 ? classes.contentFirst : classes.content}>
                <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Grid container direction="column" alignItems="flex-start">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: 14, color: '#2B2F3C', marginBottom: 5, fontWeight:500 }}>Penawaran CIMB </Typography>
                            {nego.priceCimbDealFlag ?
                              <FlagGreenIcon style={{ marginLeft:10, height: 15, width: 15, cursor: 'pointer' }} />
                              :
                              <FlagIcon style={{ marginLeft:10, height: 15, width: 15, cursor: 'pointer' }} onClick={() => { handleFlagClicked(nego, "priceCimbDealFlag", index); }} />
                            }
                          </div>
                          {
                            nego.offeringPriceCimbList?.map((rowcimb,index)=>{
                              return (
                                <>
                                  <Typography style={{ fontSize: 11, color: '#2B2F3C' }}>Tahun - {(index+1)} </Typography>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography style={{ fontSize: 16, fontWeight: 500, color: '#2B2F3C', marginBottom: 5, marginRight: 10 }}>
                                      {idrCurrencyFormat(rowcimb, '.')}
                                    </Typography>
                                  </div>
                                </>
                              )
                            })
                          }
                          <div style={{ display: 'flex', marginTop: 5, alignItems: 'center' }}>
                            <FileIcon style={{ height: 14, width: 14 }} />
                            {nego.offeringFilesCimb === null ?
                              <Typography style={{ fontSize: 13, color: '#DC241F', fontWeight: 400 }}>N/A</Typography>
                              :
                              <RenderOfferingFile filePath={nego.offeringFilesCimb} />
                            }
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container direction="column" alignItems="flex-start">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontSize: 14, color: '#2B2F3C', marginBottom: 5, fontWeight:500 }}>Penawaran Landlord</Typography>
                            {nego.priceLandlordDealFlag ?
                              <FlagGreenIcon style={{ marginLeft:10, height: 15, width: 15, cursor: 'pointer' }} />
                              :
                              <FlagIcon style={{ marginLeft:10, height: 15, width: 15, cursor: 'pointer' }} onClick={() => { handleFlagClicked(nego, "priceLandlordDealFlag", index); }} />
                            }
                          </div>
                          {
                            nego.offeringPriceLandlordList?.map((rowcland,index)=>{
                              return (
                                <>
                                  <Typography style={{ fontSize: 11, color: '#2B2F3C' }}>Tahun - {(index+1)} </Typography>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography style={{ fontSize: 16, fontWeight: 500, color: '#2B2F3C', marginBottom: 5, marginRight: 10 }}>
                                      {idrCurrencyFormat(rowcland, '.')}
                                    </Typography>
                                  </div>
                                </>
                              )
                            })
                          }
                          <div style={{ display: 'flex', marginTop: 5, alignItems: 'center' }}>
                            <FileIcon style={{ height: 14, width: 14 }} />
                            {nego.offeringFilesLandlord === null ?
                              <Typography style={{ fontSize: 13, color: '#DC241F', fontWeight: 400 }}>N/A</Typography>
                              :
                              <RenderOfferingFile filePath={nego.offeringFilesLandlord} />
                            }
                          </div>
                        </Grid>
                      </Grid>
                </Grid>

                <div style={{border: '1px solid #749BFF', minHeight: 100, backgroundColor: '#F3F7FF', borderRadius: 4, marginTop: 10}}>
                  <div style={{padding: 10}}>
                    <Typography style={{color: '#749BFF', fontSize: 11, fontWeight: 500, marginBottom: 5}}>Note</Typography>
                    <Typography style={{color: '#749BFF', fontSize: 11, fontWeight: 400}}>
                      {nego.note}
                    </Typography>
                  </div>
                </div>

              </div>
            
            </div>
          </>

        );
      }).reverse()}
      {/* SHOW HIDE ACTION */}
      {dataNego.length > jumlahDataToShow &&
              <Grid>
                <Typography onClick={()=>{showHideHistory();}} style={{textAlign:'center',cursor: 'pointer', color: '#DC241F', fontSize: 12}}>
                    Show / Hide Older
                </Typography>
              </Grid> 
      }
      {/* <ChkyButtons style={{textTransform:'capitalize'}} onClick={() => {handleOpenModalDraft();}} >Email Draft</ChkyButtons> */}
      <ModalLoader isOpen={isOpenModalLoader} />
      <ModalDraftNego 
        isOpen={isOpenModalDraft} 
        onClose={handleCloseModalDraft} 
        idGet={idSiteNewAtm} 
        loaderHandler={loaderHandler}
        dataMinor={dataToDraftModal}
        dataHitSaveNego={dataHitSaveNego}
        openingType={openingType}
      />
    </div>
  );
};

NegotiationTimeline.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataNego: PropTypes.array,
  onShowForm: PropTypes.func,
  idLoc: PropTypes.string,
  signer: PropTypes.string,
  bargainVia: PropTypes.string,
  handleTerminateNego: PropTypes.func,
  onFlagClicked: PropTypes.func,
  idSiteNewAtm: PropTypes.string,
  hargaFirstLandlord: PropTypes.number,
  dataToDraftModal: PropTypes.object,
};
  
NegotiationTimeline.defaultProps = {
  dataNego: [],
  onShowForm: (e)=>{
    // console.log("<< Form Nego Showed...", e);
  },
  idLoc: '',
  signer: '',
  bargainVia: '',
  handleTerminateNego: '',
  onFlagClicked: (val)=>{
    // console.log("<< Nego flag value: ", JSON.stringify(val));
  },
  idSiteNewAtm: null,
  hargaFirstLandlord: null,
  dataToDraftModal: {
    "securityDeposit" : 0,
    "yearlyElectricityCost" : 0,
    "antenaLandCost" : 0,
    "yearlySignageCost" : 0
  }
};

export default NegotiationTimeline;