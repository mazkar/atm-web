import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import constansts from "../../../../helpers/constants";
import InfoTabDigitalisasi from "../../../../components/InfoTabDigitalisasi";
import DetailPaper, { defaultData } from "./DetailPaper";
import VendorInputPaper, { defaultData as defaultDataInput }  from "./VendorInputPaper";
import { doFetchDetailPajak, doSaveOrUpdateVendorTaxOrder } from "../../ApiServices";
import { ChkyButtons } from "../../../../components";
import ModalLoader from "../../../../components/ModalLoader";
import useTimestampConverter from "../../../../helpers/useTimestampConverter";
import PopupSucces from "../../../../components/PopupSucces";
import { doUploadDocument } from "../../../Implementation/ApiServiceImplementation";
import ConfirmationPopUp from "../../../Implementation/cimb/common/PopUp/ConfirmationPopUp";

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  divider: { marginTop: 25 },
});

const DetailVendorPajak = () => {
  const classes = useStyles();
  // GET ID from URI
  const { id } = useParams();
  const history = useHistory();
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [stateDetail, setStateDetail] = useState(defaultData);
  const [stateInputPaper, setStateInputPaper] = useState(defaultDataInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [openConfirmPop, setOpenConfirmPop] = useState(false);

  const [errorValidation, setErrorValidation] = useState({
    noInvoice: false
  });

  function loadingHandler(bool){
    setIsLoading(bool);
  }
  
  const handleStateDetail = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setStateDetail((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  const handleStateInput = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setStateInputPaper((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorValidation((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;
    if(stateDetail.noInvoice === null){
      handleError('atmId', true);
      errorCount+= 1;
    }else{
      handleError('atmId', false);
    }

    return(errorCount);
  }
  const onSubmit = async() =>{
    // alert("Submit");

    // const errorCount = validateForm();
    // if(errorCount > 0){
    //   alert('Harap lengkapi data terlebih dahulu!');
    // }else{

      const documentList = [];

      if(stateDetail.invoiceFile){
        documentList.push({
          file: stateDetail.invoiceFile,
          type: "invoiceFile"
        });
      }
      if(stateInputPaper.skkpdFile){
        documentList.push({
          file: stateInputPaper.skkpdFile,
          type: "skkpdFile"
        });
      }

      const invoiceFile = { path: stateDetail.invoiceFileRes };
      const skkpdFile = { path: stateInputPaper.skkpdFileRes };

      const doUploadDocuments = async(arr) =>{
        if(arr.length > 0){
          loadingHandler(true);
          await Promise.all(arr.map(async(item)=>{
            await doUploadDocument(item.file)
              .then((res) => {
              // console.log("data res", res)
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    // eslint-disable-next-line default-case
                    switch (item.type) {
                    case "invoiceFile":
                      invoiceFile.path = res.data.path;
                      break;
                    case "skkpdFile":
                      skkpdFile.path = res.data.path;
                      break;
                    }
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              }).catch((err) => {
                alert(`Failed to upload file ${err}`);
                loadingHandler(false);
              });
          }));
        }
      };

      await doUploadDocuments(documentList);

      const dataHit = {
        id,
        invoiceFile: invoiceFile.path,
        invoiceNumber: stateDetail.noInvoice,
        surveyObjectTax: stateInputPaper.tglObjectPajak? moment(stateInputPaper.tglObjectPajak).format("YYYY-MM-DD") : "",
        registerProcess: stateInputPaper.tglDaftar? moment(stateInputPaper.tglDaftar).format("YYYY-MM-DD") : "",
        reviewSkpd: stateInputPaper.tglReview? moment(stateInputPaper.tglReview).format("YYYY-MM-DD") : "",
        printSkpd: stateInputPaper.tglCetak? moment(stateInputPaper.tglCetak).format("YYYY-MM-DD") : "",
        paymentProcess: stateInputPaper.tglBayar? moment(stateInputPaper.tglBayar).format("YYYY-MM-DD") : "",
        attachmentFile: skkpdFile.path,
        nextStartDate: stateInputPaper.tglPajakAkhir? moment(stateInputPaper.tglPajakAkhir).format("YYYY-MM-DD") : "",
        nextEndDate: stateInputPaper.tglPajakAkhir? moment(stateInputPaper.tglPajakAkhir).format("YYYY-MM-DD") : "",
        taxValue: stateInputPaper.nilaiPajak,
        serviceValue: stateInputPaper.nilaiJasa,
      };

      // console.log("+++ dataHit", dataHit);
      // alert("HIT service");
      doSaveOrUpdateVendorTaxOrder(setIsLoading, dataHit)
        .then((response) => {
          console.log("+++ response", response);
          if(response){
            if(response.data.responseCode === "200"){
              setIsSuccessSubmit(true);
              setOpenConfirmPop(false);
              setTimeout(() => {  
                setIsSuccessSubmit(false);
                history.push("/vendor-management/pajak")
              },2000)
            }
          }
        })
        .catch((err) => {
        // console.log("Error Fetch Data Summary", err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    // }
  };

  useEffect(() => {
    doFetchDetailPajak(loadingHandler, id)
      .then((response) => {
        // console.log("+++ response", response);
        if(response.responseCode === "200"){
          const {implementationInformation} = response;
          const infoDetail = response.mediaTaxDetailCardList[0];
          const infoInput = response.vendorInputDetail[0];
          setInfoGeneral({
            locationMachinePhotos: null,
            locationFrontMachinePhoto: null,
            atmId: implementationInformation.atmId,
            condition: implementationInformation.condition,
            locationName: implementationInformation.locationName,
            locationAddress: implementationInformation.locationAddress,
            picLocationName: implementationInformation.picLocationName,
            picLocationTelephoneNumber: implementationInformation.picLocationTelephoneNumber,
            picLocationEmail: implementationInformation.picLocationEmail,
            landlordName: implementationInformation.landlordName,
            landlordTelephoneNumber: implementationInformation.landlordTelephoneNumber,
            landlordEmail: implementationInformation.landlordEmail,
            codeGfms: implementationInformation.codeGfms,
            idRequester: implementationInformation.idRequester,
            requesterName: implementationInformation.requesterName,
            requesterTelephoneNumber: implementationInformation.requesterTelephoneNumber,
            requesterEmail: implementationInformation.requesterEmail,
            branchInitial: implementationInformation.branchInitial,
            locationMode: implementationInformation.locationMode,
            locationType: implementationInformation.locationType,
            atmPopulation: implementationInformation.atmPopulation,
            machineType: implementationInformation.machineType,
            latitude: implementationInformation.latitude,
            longitude: implementationInformation.longitude,
            boothType: implementationInformation.boothType,
            buildingLarge: implementationInformation.buildingLarge,
            publicAccessibility: implementationInformation.publicAccessibility,
            publicAccessbilityNote: implementationInformation.publicAccessbilityNote,
            operasional: implementationInformation.workingHour,
            aroundAtm: implementationInformation.aroundAtm,
            denom: implementationInformation.denom,
            acType: implementationInformation.acType,
            cleanType: implementationInformation.cleanType,
            commType: implementationInformation.commType,
            mediaPromotion: implementationInformation.mediaPromotion,
            mediaPromotionNote: implementationInformation.mediaPromotionNote,
            electricNumber: "?",
            electricityOwnerName: "?",
            yearlyElectricityCost: "?",
          });
          
          setStateDetail({
            tglOrder: infoDetail.dateOrder? useTimestampConverter(infoDetail.dateOrder / 1000, "DD/MM/YYYY") : "-",
            typeOrder: infoDetail.typeOrder,
            pajakAwal: infoDetail.taxStartdate? useTimestampConverter(infoDetail.taxStartdate / 1000, "DD/MM/YYYY") : "-",
            pajakAkhir: infoDetail.taxEnddate? useTimestampConverter(infoDetail.taxEnddate / 1000, "DD/MM/YYYY") : "-",
            remark: infoDetail.remark,
            statusPajak: infoDetail.taxStatus,
            statusPembayaran: infoDetail.statusPayment,
            tglPembayaran: infoDetail.paymentDate? useTimestampConverter(infoDetail.paymentDate / 1000, "DD/MM/YYYY") : "-",
            invoiceFileRes: infoDetail.invoiceFile,
            invoiceFile: "",
            tglKirimInvoice: infoDetail.paymentSendDate? useTimestampConverter(infoDetail.paymentSendDate / 1000, "DD/MM/YYYY") : "-",
            noInvoice: infoDetail.invoiceNumber,
          });
          setStateInputPaper({
            tglObjectPajak: infoInput.surveyObjectTax,
            tglDaftar: infoInput.registerProcess,
            tglReview: infoInput.reviewSkpd,
            tglCetak: infoInput.printSkpd,
            tglBayar: infoInput.paymentProcess,
            skkpdFileRes: infoInput.attachmentFile,
            skkpdFile: "",
            tglPajakAwal: infoInput.nextStartDate,
            tglPajakAkhir: infoInput.nextEndDate,
            nilaiPajak: infoInput.taxValue,
            nilaiJasa: infoInput.serviceValue,
          });
        }
      }).catch((err) => {
        console.log('Error Fetching: ', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <div className={classes.backAction}>
          <Button onClick={() => history.push("/vendor-management/pajak")}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </div>
      </Grid>
      <div className={classes.divider} />
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography className={classes.title}>
            Pajak Detail
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <InfoTabDigitalisasi data={dataInfoGeneral}/>
      </Grid>
      <div className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <DetailPaper data={stateDetail} onChange={handleStateDetail}/>
        </Grid>
        <Grid item xs={6}>
          <VendorInputPaper data={stateInputPaper} onChange={handleStateInput}/>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" style={{marginTop: 25, paddingBottom: 35}}>
        <Grid item>
          <ChkyButtons
            buttonType='redOutlined'
            onClick={()=>history.push(`/vendor-management/pajak`)}
            style={{textTransform: 'capitalize'}}
          >
                Cancel
          </ChkyButtons>
        </Grid>
        <Grid item>
          <ChkyButtons
            onClick={()=>setOpenConfirmPop(true)}
            style={{textTransform: 'capitalize'}}
          >
                Submit
          </ChkyButtons>  
        </Grid>
      </Grid>

      <ModalLoader isOpen={isLoading} />

      <ConfirmationPopUp
        isOpen={openConfirmPop}
        onSubmit={()=>onSubmit()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
        message= "Apakah Anda yakin Submit data pajak ini.?"
      />
      <PopupSucces isOpen={isSuccessSubmit}
        onClose={()=>{
          setIsSuccessSubmit(false);
          history.push("/vendor-management/pajak");
        }}
        message="Data Berhasil Disubmit!"/>
    </div>
  );
};

export default DetailVendorPajak;
