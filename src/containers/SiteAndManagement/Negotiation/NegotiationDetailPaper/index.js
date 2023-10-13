/* eslint-disable radix */
/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, {useEffect, useState,useContext} from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import constansts from '../../../../helpers/constants';
import NegotiationTimeline from '../NegotiationTimeline';
import { RootContext } from '../../../../router';
import { ChkyInputSmall, ChkyButtons, ChkySelectInputEffect } from '../../../../components';
import ModalDialogTerminate from '../ModalDialogTerminate';
import ModalDealNegotiation from '../ModalDealNegotiation';
import {doTerminateNegotiation, doDealNegotiation, doUploadSuratKonfirmasiLandlord} from '../ApiServiceNegotiation';
import ModalLoader from '../../../../components/ModalLoader';
import LoadingView from '../../../../components/Loading/LoadingView';

const useStyles = makeStyles ({
  root: {
    boxShadow:'0px 6px 6px rgba(232, 238, 255, 0.3)',
    padding:20,
    borderRadius: 10,
    height: '100%',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
    color: constansts.color.dark,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 500,
    color: constansts.color.dark,
  },
  valueInfo: {
    fontSize: 11,
    fontWeight: 400,
    color: constansts.color.dark,
  },
  labelFieldText: {fontSize: 11, fontWeight: 400, marginBottom: 5, marginTop: 15},
  inputTtd: {
    '& .MuiInputBase-input': {fontSize: 13},
  }
});

const dataNegoDummy=[
  {
    "yearlyRentCost": 35000000,
    "offeringPriceLandlord": 30000000,
    "offeringFilesLandlord": "https://minio.mylab-siab.com/project/atmb/public/abc.pdf",
    "offeringPriceCimb": 28000000,
    "offeringFilesCimb": "https://minio.mylab-siab.com/project/atmb/public/abc.pdf",
    "submitNegotiationDetailDate": 1603213200000,
    "priceLandlordDealFlag": false,
    "priceCimbDealFlag": false
  }
];

const dataNegoVia = [
  {value: 'Whatsapp', name: "Whatsapp"},
  {value: 'Email', name: "Email"},
  {value: 'Meet', name: "Meet"},
  {value: 'Call', name: "Call"},
];

const idrCurrencyFormat = (value) => {
  if((value !== null) || (value !== 0)|| (value !== undefined)){
    return `Rp ${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }
  return '-';
};

const thousandFormat = (value) => {
  if((value !== null) || (value !== 0)|| (value !== undefined)){
    return `${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }
  return '-';
};

const setStringValue = (value) =>{
  if ((value !== null) || (value !== '')|| (value !== undefined)){
    return value;
  }
  return '-';
};

function isEmpty(obj) {
  for (const x in obj) { if (obj.hasOwnProperty(x))  return false; }
  return true;
}

// eslint-disable-next-line react/prop-types
function SelisihNegoItem({dataArray = []}) {
  // console.log(">>> arrSelisih: ",dataArray);
  return (
    <>
      {dataArray &&
            dataArray.map((item, index)=>{
              return(
                <div>
                  <Typography style={{ fontSize: 12, position: 'relative', top: 0, fontWeight: 400 }}>Tahun ke {(index+1)}</Typography>
                  <div style={{ display: 'flex' }}>
                    <Typography style={{ fontSize: 25, fontWeight: 400 }}>{item.toFixed(2)}</Typography>
                    <Typography style={{ fontSize: 15, position: 'relative', top: 0, fontWeight: 400 }}> %</Typography>
                  </div>
                </div>
              );
            })
      }
    </>
  );
}

function NegotiationDetailPaper(props) {
  const classes = useStyles();
  // GET USER ID
  const { userId, userRoleName } = useContext(RootContext);
  const NewUserId = parseInt(userId);
  const {dataNego, dataInfoGeneral, idLoc, idSiteNewAtm, isLoadData} = props;
  const [isDisableAction, setIsDisableAction] = useState(false);

  // COMPONENT DIDI MOUNT
  useEffect(() => {
    if(userRoleName.toLowerCase().includes("tim approval negotiation")){
      setIsDisableAction(true);
    }
  }, []);

  // INIT DATA NEGO TEMP
  const [dataNegoTemp, setDataNegoTemp]=useState(dataNego);
  function defaultSignerVal(){
    if (!isEmpty(dataInfoGeneral)){
      return setStringValue(dataInfoGeneral.informasiNegotiation.signer);
    }
    return '';
  };
  useEffect(()=>{setDataNegoTemp(dataNego);},[dataNego]);
  function defaultBargainVal(){
    if (!isEmpty(dataInfoGeneral)){
      if(dataInfoGeneral.informasiNegotiation.bargainVia !== null){
        const bargainViaString = dataInfoGeneral.informasiNegotiation.bargainVia.toLowerCase();
        if (bargainViaString === 'whatsapp'){
          return 'Whatsapp';
        }
        if (bargainViaString === 'wa'){
          return 'Whatsapp';
        }
        if (bargainViaString === 'meet') {
          return 'Meet';
        }
        if (bargainViaString === 'call') {
          return 'Call';
        }
        if (bargainViaString === 'email'){
          return 'Email';
        }
        return 'null';
      }
      return 'null';
    }
    return 'null';
  };

  const [signerValue, setSignerValue] = useState('');
  const [bargainViaValue, setBargainValue] = useState('null');

  // Init Modal Loader
  const [isOpenModalLoader, setModalLoader] = useState(false);

  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue){
    setModalLoader(loaderValue);
  }

  // modal for Terminate Confirmation
  const [openModalTerminateConfirm, setOpenModalTerminateConfirm] = useState(false);
  const handleOpenModalTerminateConfirm = () => {
    setOpenModalTerminateConfirm (true);
  };
  const handleCloseModalTerminateConfirm= () => setOpenModalTerminateConfirm(false);

  // DATA DEAL
  const [dataDeal, setDataDeal] = useState(null);

  const [cagrOnNego, setCagrOnNego] = useState(0);
  const [priceDiffOnNego, setPriceDiffOnNego] = useState(null);
  const [penurunanOnNego, setPenurunanOnNego] = useState(0);

  // attach file konfirmasi landlord
  const [fileSuratKonfirmasiLandlord, setFileSuratKonfirmasiLandlord] = useState(null);
  function handleUploadSuratKonfirmasiLandlord(event) {
    setFileSuratKonfirmasiLandlord(event.target.files[0]);
  }

  // modal for Terminate Confirmation
  const [openModalDeal, setOpenModalDeal] = useState(false);
  const handleOpenModalDeal = () => {
    if(dataDeal === null){
      alert("Please select flag offering..!");
    }else{
      setOpenModalDeal(true);
    }
  };
  const handleCloseModalDeal= () => setOpenModalDeal(false);

  function onSignerValueChange(event){
    setSignerValue(event.target.value);
  }
  function onSelectBargainChange(value){    
    setBargainValue(value);
  }

  // DEAL HANDLER 
  function handleChangeDataDeal(dataTemp, selectedVal){
    // HANYA BISA CHANGE STATE JIKA STATUS === 1 (Negotiation) 
    if(dataInfoGeneral?.rent?.negotiationStatus === '1'){
      setDataNegoTemp(dataTemp);
      setDataDeal({
        "id":selectedVal.id,
        "idSiteNewAtm": selectedVal.idSiteNewAtm,
        "userId" : selectedVal.userId,
        "locationId":idLoc,
        "negotiationDealNotes":selectedVal.negotiationDealNotes,
        "dealAttachmentPath":selectedVal.dealAttachmentPath,
        "priceCimbDealFlag":selectedVal.priceCimbDealFlag,
        "priceLandlordDealFlag":selectedVal.priceLandlordDealFlag,
        "negotiationDealCost":selectedVal.negotiationDealCost,
        "negotiationDealCostList": selectedVal.negotiationDealCostList,
        "flatCost": selectedVal.flatCost,
      });
      // INIT CAGR AVERAGE FOR RENEWAL
      const cagrArr = [];
      let cagrAvrg = 0;

      const isEquals = selectedVal.negotiationDealCostList.every( (val, i, arr) => val === arr[0] ); 
      // isEquals = true => Non Tearing (FLAT)

      if (isEquals) {
        const hargaSewaTahunTerakhir = dataInfoGeneral.rent.yearlyRentCosts[dataInfoGeneral.rent.yearlyRentCosts.length - 1] ;
        const pangkat = 1 / selectedVal.negotiationDealCostList.length;
        const pembagianHargaSewa = selectedVal.negotiationDealCostList[0] / hargaSewaTahunTerakhir ;
        // console.log("+++ pangkat", pangkat);
        // console.log("+++ pembagianHargaSewa", pembagianHargaSewa);

        // eslint-disable-next-line no-restricted-properties
        const countCagr = (Math.pow( pembagianHargaSewa, pangkat) - 1) * 100;
        cagrAvrg = countCagr;
        // =(C4/B4)^(1/D4)-1
        // console.log("+++ countCagr", countCagr);
        selectedVal.negotiationDealCostList.map(()=>{
          cagrArr.push(countCagr);
        });
      } else {
        // TIERING
        selectedVal.negotiationDealCostList.map((item, index)=>{
          let countCagrItem = 0;
          if(index === 0){
            const hargaSewaTahunTerakhir = dataInfoGeneral.rent.yearlyRentCosts[dataInfoGeneral.rent.yearlyRentCosts.length - 1] ;
            // eslint-disable-next-line no-restricted-properties
            countCagrItem = (Math.pow((item / hargaSewaTahunTerakhir ),1) - 1) * 100;
          }else{
            const hargaSewaSelectedBefore = selectedVal.negotiationDealCostList[index-1] ;
            // eslint-disable-next-line no-restricted-properties
            countCagrItem = (Math.pow((item / hargaSewaSelectedBefore ),1) - 1) * 100;
          }
          // eslint-disable-next-line no-restricted-properties
          // console.log(">>> countCagrItem: ", countCagrItem);
          cagrArr.push(countCagrItem);
        });
        // CAGR (%)
        const sumCagr = cagrArr.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        cagrAvrg = sumCagr/cagrArr.length;
      }
      setCagrOnNego(cagrAvrg);

      // INIT Penurunan / Kenaikan Harga
      const diffHarga = [];
      selectedVal.negotiationDealCostList.map((item, index)=>{
        const hargaLandlordPertama = dataNego[0].offeringPriceLandlordList[index];
        const selisihPercentage = ((item - hargaLandlordPertama) / hargaLandlordPertama) * 100;
        diffHarga.push(selisihPercentage);
      });
      setPriceDiffOnNego(diffHarga);

      // INIT PENURUNAN NEGO
      const diffNego = [];
      selectedVal.negotiationDealCostList.map((item, index)=>{
        const hargaOfferPertama = dataNego[0].offeringPriceCimbList[index];
        const selisihPercentage = ((item - hargaOfferPertama) / hargaOfferPertama) * 100;
        diffNego.push(selisihPercentage);
      });
      const sumPenurunanNego= diffNego.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      setPenurunanOnNego(sumPenurunanNego/selectedVal.negotiationDealCostList.length);
    }
  }

  // useEffect(()=>{
  //   console.log(">>> dataDeal: ", JSON.stringify(dataDeal));
  // },[dataDeal]);
  // useEffect(()=>{
  //   console.log(">>> cagrOnNego: ", cagrOnNego);
  // },[cagrOnNego]);

  // useEffect(()=>{
  // console.log(">>>> ",bargainViaValue);
  // },[bargainViaValue]);

  useEffect(()=>{
    const signer = defaultSignerVal();
    setSignerValue(signer);
    // bargainVia
    const bargainVal = defaultBargainVal();
    setBargainValue(bargainVal);
  },[dataInfoGeneral]);
  
  // handle Button Deal
  function handleDealNego(){
    setOpenModalDeal(false);
    if(dataDeal === null){
      alert("Please select flag offering..!");
    }else if(fileSuratKonfirmasiLandlord === null){
      alert("Please attach file Surat Konfirmasi Landlord..!");
    }else{

      const isRenewal = dataInfoGeneral.informasiNegotiation.openingType==='Renewal';

      doUploadSuratKonfirmasiLandlord(loaderHandler, fileSuratKonfirmasiLandlord).then(response=>{
        if(response.data.responseCode=== '00'){

          const dataHit = {
            ...dataDeal,
            signer: signerValue,
            landlordAttachmentPath: response.data.path,
            cagr: isRenewal? cagrOnNego : penurunanOnNego,
            decreasePriceList: priceDiffOnNego,
          };
          
          doDealNegotiation(loaderHandler, dataHit).then(response=>{
            // console.log("<<<< doUpdateNegotiation DATA RESPON - dataFromApi : ",JSON.stringify(response));
            if(response.data.responseCode === '00'){
              if(window.confirm('Negotiation Deal Succesfully')){
                window.location.reload();}
            }
          });
        }else{
          alert('Error Upload File Surat Konfirmasi Landlord');
        }
      });
    }
  }

  // handle Button Modal Terminate Submit
  function handleTerminateNego(){
    setOpenModalTerminateConfirm(false);
    const dataHit={
      "id": idSiteNewAtm,
      "userId": NewUserId,
      "locationId": idLoc
    };
    doTerminateNegotiation(loaderHandler, dataHit).then(
      dataFromApi => {
        // console.log("<<<< doTerminateNegotiation DATA RESPON - dataFromApi : ",JSON.stringify(dataFromApi));
        if(dataFromApi.data.responseMessage === 'SUCCESS'){
          window.location.reload();
        }
      });
  }
  function showTieringData(dataTier){
    return dataTier.map((item, index)=>(<Typography>Tahun ke {index+1}: <b>{idrCurrencyFormat(item)}</b></Typography>));
  }
  // useEffect(() => {
  //   console.log("SIGNER==> ",signerValue);
  // }, [signerValue]);
  return (
    <Paper elevation={0} className={classes.root}>
      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <Grid container spacing={1} style={{height: '100%'}}>
          <Grid item xs={8}>
            <Typography className={classes.title}>Negotiation</Typography>
            <NegotiationTimeline 
              dataNego={dataNegoTemp} 
              idLoc={idLoc}
              signer={signerValue}
              bargainVia={bargainViaValue}
              handleTerminateNego={handleOpenModalTerminateConfirm}
              onFlagClicked={handleChangeDataDeal}
              dataInfoGeneral={isEmpty(dataInfoGeneral) ? {} : dataInfoGeneral}
              idSiteNewAtm={idSiteNewAtm}
              offeringFilesLandlord={isEmpty(dataInfoGeneral) ? null : dataInfoGeneral.informasiNegotiation.offeringFilesLandlord}
              hargaFirstLandlord={isEmpty(dataInfoGeneral) ? null : dataInfoGeneral.rent.yearlyRentCost}
              openingType={isEmpty(dataInfoGeneral) ? null : dataInfoGeneral.informasiNegotiation.openingType}
              dataToDraftModal={isEmpty(dataInfoGeneral) ? {
                "securityDeposit" : 0,
                "yearlyElectricityCost" : 0,
                "antenaLandCost" : 0,
                "yearlySignageCost" : 0,
                "atmId" : null
              } : {
                "securityDeposit" : dataInfoGeneral.rent.depositServiceCharge,
                "yearlyElectricityCost" : dataInfoGeneral.rent.yearlyElectricityCost,
                "antenaLandCost" : dataInfoGeneral.rent.antenaLandCost,
                "yearlySignageCost" : dataInfoGeneral.rent.yearlySignageCost,
                "atmId" : isEmpty(dataInfoGeneral) ? null : dataInfoGeneral.informasiNegotiation.atmId === null ? dataInfoGeneral.informasiNegotiation.locationId : dataInfoGeneral.informasiNegotiation.atmId,
              }}
            // onShowForm={handleBtnCreate}
            />
            {/* SHOW BUTTON TERMINATE / DEALS */}
            {isEmpty(dataInfoGeneral) ? null : dataInfoGeneral.rent.negotiationStatus !== '1' ? null :  
              <div>
                {dataNego.length > 0 &&
              <Grid container style={{marginTop: 30, paddingRight: 20}} justify="space-between" >
                <Grid item>
                  <ChkyButtons disabled={isDisableAction} buttonType="redOutlined"  style={{textTransform:'capitalize', zIndex:2}} onClick={handleOpenModalTerminateConfirm}>Terminate</ChkyButtons>
                </Grid>
                <Grid item>
                  <ChkyButtons disabled={isDisableAction} buttonType="greenFilled" style={{textTransform:'capitalize', width: 115, zIndex:2}} onClick={handleOpenModalDeal}>Deal</ChkyButtons>
                </Grid>
              </Grid>
                }
              </div>}
          
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item style={{width: '33%', paddingLeft: 10}}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography className={classes.subtitle}>Harga Penawaran :</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.subtitle}>
                  {isEmpty(dataInfoGeneral) ? '-' : showTieringData(dataInfoGeneral.rent.yearlyRentCosts)}
                </Typography>
              </Grid>
            </Grid>
            <Typography className={classes.valueInfo} style={{fontStyle: 'italic'}}>Exclude ppn, include pph</Typography>
            <div 
              // style={stykeRightPanelForm}
            >
              <Typography className={classes.labelFieldText}>Nama Penanda Tangan</Typography>
              <ChkyInputSmall placeholder="Name" className={classes.inputTtd} fullWidth value={signerValue} onChange={onSignerValueChange}/>
              <Typography className={classes.labelFieldText}>Nego by</Typography>
              <ChkySelectInputEffect 
                selectFirstDummy="- Choose one - "
                selectOptionData={dataNegoVia}
                selectedValue={bargainViaValue}
                onSelectValueChange={onSelectBargainChange}
              />
              <Typography className={classes.labelFieldText}>{(!isEmpty(dataInfoGeneral) && dataInfoGeneral.informasiNegotiation.openingType==='Renewal') ? 'CAGR' : 'Penurunan Nego' } :</Typography>
              <div style={{display: 'flex'}}>
                <Typography style={{fontSize: 25, fontWeight: 400}}>
                  {/* {isEmpty(dataInfoGeneral) ? '-' : dataInfoGeneral.informasiNegotiation.cagr !== null ? setStringValue(dataInfoGeneral.informasiNegotiation.cagr.toFixed(2)) : '-'} */}
                  { 
                    dataInfoGeneral?.rent?.negotiationStatus === "1" ? // <== ON NEGOTIOATION 
                    // JIKA ON NEGO == 1 cek opening type untuk menentukan menampilkan cagr (renewal) / penurunan newgo (others)
                      (
                        <> {
                          (!isEmpty(dataInfoGeneral) && dataInfoGeneral.informasiNegotiation.openingType==='Renewal') ? cagrOnNego?.toFixed(2) : penurunanOnNego.toFixed(2)  
                        }
                        </>
                      ) : dataInfoGeneral?.informasiNegotiation?.cagr?.toFixed(2)

                  }
                </Typography>
                <Typography style={{fontSize: 15, position: 'relative', top:0, fontWeight: 400}}>% </Typography>
              </div>
              <Typography className={classes.labelFieldText}>Penurunan/Kenaikan Harga :</Typography>
              {/* {
                  dataInfoGeneral?.informasiNegotiation?.decreasePriceList?.map((row,index)=>{
                    return(
                      <div>
                        <Typography style={{ fontSize: 12, position: 'relative', top: 0, fontWeight: 400 }}>Tahun ke {(index+1)}</Typography>
                        <div style={{ display: 'flex' }}>
                          <Typography style={{ fontSize: 25, fontWeight: 400 }}>{isEmpty(dataInfoGeneral) ? '-' : thousandFormat(row  )}</Typography>
                          <Typography style={{ fontSize: 15, position: 'relative', top: 0, fontWeight: 400 }}> %</Typography>
                        </div>
                      </div>
                    )
                  })
                } */}
              { 
                dataInfoGeneral?.rent?.negotiationStatus === "1" ? // <== ON NEGOTIOATION 
                  (<SelisihNegoItem dataArray={priceDiffOnNego}/>)  : <SelisihNegoItem dataArray={dataInfoGeneral?.informasiNegotiation?.decreasePriceList}/>
              }
            </div>
          </Grid>
        </Grid>
      }
      <ModalDialogTerminate
        isOpen={openModalTerminateConfirm}
        onNext={handleTerminateNego}
        onClose={handleCloseModalTerminateConfirm}
      />
      <ModalDealNegotiation
        fileSuratKonfirmasiLandlord={fileSuratKonfirmasiLandlord}
        setFileSuratKonfirmasiLandlord={setFileSuratKonfirmasiLandlord}
        handleUploadSuratKonfirmasiLandlord={handleUploadSuratKonfirmasiLandlord}
        isOpen={openModalDeal}
        onNext={handleDealNego}
        onClose={handleCloseModalDeal}
        dataDealNego={dataDeal}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </Paper>
  );
}

NegotiationDetailPaper.propTypes = {
  dataNego: PropTypes.array,
  dataInfoGeneral: PropTypes.object,
  idLoc: PropTypes.string,
  idSiteNewAtm: PropTypes.string,
  isLoadData: PropTypes.bool,
};
NegotiationDetailPaper.defaultProps = {
  dataNego: dataNegoDummy,
  dataInfoGeneral: {},
  idLoc: '',
  idSiteNewAtm: null,
  isLoadData: false,
};

export default NegotiationDetailPaper;

