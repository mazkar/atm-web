/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
import React, {useState,useEffect,useContext} from 'react';

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
import getMinioFile from '../../../../helpers/getMinioFromUrl';

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
      height: 270,
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
  labelFieldText: {fontSize: 11, fontWeight: 400, marginBottom: 5, marginTop: 15},
  labelFieldTextNoTop: {fontSize: 11, fontWeight: 400, marginBottom: 5},
  labelFieldTextBold: {fontSize: 14, fontWeight: 500, marginBottom: 5, marginTop: 15},
});

const idrCurrencyFormat = (value, delimiter) => {
  return `Rp ${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
};

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

const RenderOfferingFile=({filePath})=>{
  const [dataOffering,setDataOffering] = useState(null);
  function limitString(string, count){
    const result = string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  useEffect(()=>{
    try{
      getMinioFile(filePath).then(result=>{
        console.log(">>>> try getMinio Offering ",JSON.stringify(result));
        setDataOffering(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[]);
  useEffect(()=>{console.log(">>>> dataOffering: ", dataOffering);},[dataOffering]);
  return(
    <Link href={dataOffering === null ? '#' : dataOffering.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 13, color: '#DC241F', fontWeight: 400}}>
      {dataOffering === null ? 'N/A': limitString(dataOffering.fileName, 25)}
    </Link>
  );
};
RenderOfferingFile.propTypes={
  filePath: PropTypes.string.isRequired,
};

const NegotiationTimeline = (props) => {
  const {dataNego, onShowForm, idLoc, signer, bargainVia, handleTerminateNego, onFlagClicked, idSiteNewAtm} = props;
  const classes = useStyles();
  // GET USER ID
  const { userId } = useContext(RootContext);
  const NewUserId = parseInt(userId);
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

  // Init Modal Loader
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue){
    setModalLoader(loaderValue);
  }

  // HARGA INPUT
  const [hargaCimb, setHargaCimb] = useState(null);
  const handleHargaCimb = (value) => {
    setHargaCimb(value.floatValue);
  };
  const [hargaLandlord, setHargaLandlord] = useState('');
  const handleHargaLandlord = (value) => {
    setHargaLandlord(value.floatValue);
  };

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

  // attach file landlord
  const [fileSuratLandlord, setFileSuratLandlord] = useState(null);  
  function handleUploadSuratLandlord(event){
    setFileSuratLandlord(event.target.files[0]);
  }

  // handle Button Submit
  function handleSubmitDraft(){
    const dataHit={
      "id":null,
      "idSiteNewAtm": idSiteNewAtm,
      "userId" : NewUserId,
      "locationId": idLoc,
      "offeringPriceCimb": hargaCimb,
      "offeringFilesCimb":null,
      "offeringPriceLandlord":null,
      "offeringFilesLandlord":null,
      "note": noteValue,
      "signer": signer,
      "bargainVia": bargainVia
    };
    if(hargaCimb === null){
      alert("Please insert Price value");
    }else if(hargaCimb === 0){
      alert("Price value cannot be 0 ");
    }else if(signer === ''){
      alert("Please input Signer");
    }else if(bargainVia === null){
      alert("Please select Nego By");
    }else{
      doSaveNegotiation(loaderHandler, dataHit).then(
        dataFromApi => {
          console.log("<<<< doSaveNegotiation DATA RESPON - dataFromApi : ",JSON.stringify(dataFromApi));
          if(dataFromApi.data.responseCode === '00'){
            if(window.confirm('Submit Draft Nego Success, Reload page?')){
              window.location.reload();}
          }else{
            alert(dataFromApi.data.responseMessage);
          }
        });
    }
  }

  // handle Button Submit Update Nego
  function handleSubmitUpdateNego(dataBefore, priceLandlord, file){
    if((priceLandlord === null)||(priceLandlord === '')||(priceLandlord === 0)){
      alert("Please insert price offering landlord..!");
    }else if(file !== null){
      console.log("<<<< doUpdateNegotiation (WITH FILE) ", JSON.stringify(file));
      let fileLandlordPath = null;
      doUploadOfferingFile(loaderHandler, file).then(
        dataFromApi => {
          console.log("<<<< doUpdateNegotiation STATUS  (WITH FILE) - dataFromApi : ",JSON.stringify(dataFromApi));
          fileLandlordPath = dataFromApi.data.path;
          if(dataFromApi.data.responseCode === '00'){
            const dataHit={
              "id":dataBefore.idNegotiation,
              "idSiteNewAtm": idSiteNewAtm,
              "userId" : NewUserId,
              "locationId": idLoc,
              "offeringPriceCimb": dataBefore.offeringPriceCimb,
              "offeringFilesCimb":dataBefore.offeringFilesCimb,
              "offeringPriceLandlord":priceLandlord,
              "offeringFilesLandlord":fileLandlordPath,
              "note": dataBefore.note,
              "signer": signer,
              "bargainVia": bargainVia
            };
            doSaveNegotiation(loaderHandler, dataHit).then(
              dataFromApiSave => {
                console.log("<<<< doUpdateNegotiation DATA RESPON  (WITH FILE) - dataFromApi : ",JSON.stringify(dataFromApiSave));
                if(dataFromApiSave.data.responseCode === '00'){
                  if(window.confirm('Update Nego Success, Reload page?')){
                    window.location.reload();}
                }
              });
          }
            
        });
    }else{
      console.log("<<<< doUpdateNegotiation dataHit  (NO FILE) ");
      const dataHit={
        "id":dataBefore.idNegotiation,
        "idSiteNewAtm": idSiteNewAtm,
        "locationId": idLoc,
        "offeringPriceCimb": dataBefore.offeringPriceCimb,
        "offeringFilesCimb":dataBefore.offeringFilesCimb,
        "offeringPriceLandlord":priceLandlord,
        "offeringFilesLandlord":null,
        "note": dataBefore.note,
        "signer": signer,
        "bargainVia": bargainVia
      };
      console.log("<<<< doUpdateNegotiation dataHit  (NO FILE) ",dataHit);
      doSaveNegotiation(loaderHandler, dataHit).then(
        dataFromApi => {
          console.log("<<<< doUpdateNegotiation DATA RESPON - dataFromApi : ",JSON.stringify(dataFromApi));
          if(dataFromApi.data.responseCode === '00'){
            if(window.confirm('Update Nego Success, Reload page?')){
              window.location.reload();}
          }
        });
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
    const selectedValData = {
      "id":flagDataNego.idNegotiation,
      "idSiteNewAtm": idSiteNewAtm,
      "userId" : NewUserId,
      "locationId":idLoc,
      "negotiationDealNotes":flagDataNego.negotiationDealNotes,
      "dealAttachmentPath":dealAttachment(keyNameFlag),
      "priceCimbDealFlag":isCimbDeal(keyNameFlag),
      "priceLandlordDealFlag":!isCimbDeal(keyNameFlag),
      "negotiationDealCost":dealCost(keyNameFlag)
    };
    console.log("+++++ newTempNego",newTempNego);
    onFlagClicked(newTempNego, selectedValData);
  }

  return (
    <div className={classes.root}>

      {/* FORM INPUT as TOP Div */}

      {dataNego.length === 0 || dataNego[dataNego.length-1].offeringPriceLandlord !== null ? 
        <div className={classes.container} >
          <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
            <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{`${OrdinalNumber(dataNego.length + 1)  } negotiation`}</Typography>
            <Typography style={{fontSize:10, color:'#BCC8E7'}}>{moment(new Date()).format("DD MMMM YYYY")}</Typography>
          </Grid>
          <div style={displayCreateBtn} className={dataNego.length === 0 ? classes.contentFirstButton : classes.contentButton}>
            <ChkyButtons onClick={showForm} style={{textTransform:'capitalize'}}>
              <AddIcon style={{color: '#fff'}}/>Create Draft Penawaran
            </ChkyButtons>
          </div>
          <div style={displayForm}>
            {/* // FORM NEGO 1st */}
            <div className={dataNego.length === 0 ? classes.contentFirstForm : classes.contentForm}>
              <Typography className={classes.labelFieldText}>Masukan Harga CIMB :</Typography>
              <IdrNumberInput value={hargaCimb} onValueChange={handleHargaCimb} prefix="Rp " placeholder="Ex: Rp 1.000.000"/>
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
        : null }
      
      {/* SHOW DATA NEGO HISTORIES */}
      {dataNego.map((nego, index) =>{
        return (
          <>
            <div className={classes.container} style={ index < (dataNego.length-jumlahDataToShow) ? displayDifHide : null}>
              <Grid container justify="space-between" alignItems="center" style={{marginBottom: 20}}>
                <Typography style={{fontSize:15, fontWeight: 500, color:'#000'}}>{`${OrdinalNumber(index + 1)  } negotiation`}</Typography>
                <Typography style={{fontSize:10, color:'#BCC8E7'}}>{moment.unix(nego.submitNegotiationDetailDate/1000).format("DD MMMM YYYY")}</Typography>
              </Grid>
              {/* Check if the last Nego Has landlord price show nego form else show data only */}
              {nego.offeringPriceLandlord === null ?
                <div className={classes.contentForm}>
                  <Grid container justify="space-between">
                    <Grid item xs={6}>
                      <Typography className={classes.labelFieldTextNoTop}>Penawaran CIMB :</Typography>
                      <Typography style={{marginTop: 7.5, fontWeight: 500, fontSize: 14}}>Rp {numberWithCommas(dataNego[dataNego.length-1].offeringPriceCimb)}</Typography>
                      <div style={{display: 'flex', marginTop: 15, alignItems: 'center'}}>
                        <FileIcon style={{height: 14}}/> 
                        <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.labelFieldTextNoTop}>Masukan Harga Landlord :</Typography>
                      {/* <ChkyInputSmall placeholder="Rp. 000.000.000" /> */}
                      <IdrNumberInput value={hargaLandlord} onValueChange={handleHargaLandlord} prefix="Rp " placeholder="Ex: Rp 1.000.000"/>
                      <div style={{position: 'relative', marginTop: 5}}>
                        <PaperClipIcon style={{position: 'absolute', top: 5, width: 20}}/> 
                        <div style={{position: 'relative', paddingLeft: 20}}>
                          <input 
                            id='fileSuratLandlord'
                            type="file" 
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
                            {fileSuratLandlord === null ?
                              <Typography style={{fontSize: 14, color: '#DC241F', marginLeft:5 }}>Attach File.. </Typography>
                              : 
                              <Typography style={{fontSize: 14, color: '#DC241F', marginLeft:5 }}>{fileSuratLandlord.name}</Typography>
                            }
                          </label>
                          {fileSuratLandlord === null ? 
                            null 
                            : <IconButton style={{ position: 'absolute', top: -10, right: -20, color:'#DC241F',}} onClick={()=>{setFileSuratLandlord(null);}}>
                              <DeleteIcon fontSize="small"/>
                            </IconButton>}
        
                        </div>
                      </div>
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
                  <Grid container justify="space-between" style={{marginTop: 15}}>
                    <Grid item>
                      <ChkyButtons style={{textTransform:'capitalize'}} onClick={handleTerminateNego} buttonType="redOutlined">Terminate</ChkyButtons>
                    </Grid>
                    <Grid item>
                      <ChkyButtons style={{textTransform:'capitalize'}} onClick={()=>{handleSubmitUpdateNego(nego, hargaLandlord, fileSuratLandlord);}}>Submit</ChkyButtons>
                    </Grid>
                  </Grid>
                </div>
                :
                <div className={index === 0 ? classes.contentFirst : classes.content}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Grid container direction="column" alignItems="flex-start">
                        <Typography style={{fontSize:13, color:'#2B2F3C', marginBottom: 5}}>Penawaran CIMB :</Typography>
                        <div style={{display: 'flex', alignItems:'center'}}>
                          <Typography style={{fontSize:16, fontWeight: 500, color:'#2B2F3C', marginBottom: 5, marginRight: 10}}>
                            {idrCurrencyFormat(nego.offeringPriceCimb, '.')}
                          </Typography>
                          {nego.priceCimbDealFlag ? 
                            <FlagGreenIcon style={{height: 15, width: 15, cursor: 'pointer'}}/>
                            :
                            <FlagIcon style={{height: 15, width: 15, cursor: 'pointer'}} onClick={()=>{handleFlagClicked(nego, "priceCimbDealFlag", index);}}/>
                          }
                        </div>
                        <div style={{display: 'flex', marginTop: 5, alignItems: 'center'}}>
                          <FileIcon style={{height: 14, width: 14}}/> 
                          {nego.offeringFilesCimb === null? 
                            <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography>
                            :
                            <RenderOfferingFile filePath={nego.offeringFilesCimb}/>
                          }
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container direction="column" alignItems="flex-start">
                        <Typography style={{fontSize:13, color:'#2B2F3C', marginBottom: 5}}>Penawaran Landlord :</Typography>
                        <div style={{display: 'flex', alignItems:'center'}}>
                          <Typography style={{fontSize:16, fontWeight: 500, color:'#2B2F3C', marginBottom: 5, marginRight: 10}}>
                            {idrCurrencyFormat(nego.offeringPriceLandlord, '.')}
                          </Typography>
                          {nego.priceLandlordDealFlag ? 
                            <FlagGreenIcon style={{height: 15, width: 15, cursor: 'pointer'}}/>
                            :
                            <FlagIcon style={{height: 15, width: 15, cursor: 'pointer'}} onClick={()=>{handleFlagClicked(nego, "priceLandlordDealFlag", index);}}/>
                          }
                        </div>
                        <div style={{display: 'flex', marginTop: 5, alignItems: 'center'}}>
                          <FileIcon style={{height: 14, width: 14}}/> 
                          {nego.offeringFilesLandlord === null? 
                            <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography>
                            :
                            <RenderOfferingFile filePath={nego.offeringFilesLandlord}/>
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
              }
            
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
      <ModalLoader isOpen={isOpenModalLoader} />
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
};
  
NegotiationTimeline.defaultProps = {
  dataNego: [],
  onShowForm: (e)=>{console.log("<< Form Nego Showed...", e);},
  idLoc: '',
  signer: '',
  bargainVia: '',
  handleTerminateNego: '',
  onFlagClicked: (val)=>{console.log("<< Nego flag value: ", JSON.stringify(val));},
  idSiteNewAtm: null,
};

export default NegotiationTimeline;