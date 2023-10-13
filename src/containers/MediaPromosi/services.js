/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Axios from "axios";
import secureStorage from "../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

export const doFetchMediaPromosiResultList = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryMediaPromosi`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchMediaPromosiTicketingList = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryTicketingMediaPromosi`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetDetailSurvey = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/detailResultMediaPromosi?id=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSummaryTaxTrackingOpen = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryTaxTrackingOpen`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Dataaa...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSummaryTaxTrackingDone = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryTaxTrackingDone`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching data...!``n${err}`);
    loaderHandler(false);
  }
};

export const exportSummaryTaxTrackingOpen = async () => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/mediaPromosiExport`,
      method: "GET",
      headers: headersSetting,
      responseType: "blob",
    });
    console.log(result);
    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `SummaryTaxTrackingOpen.xlsx`;
    link.click();
    return result.data;
  } catch (error) {
    alert(`Cannot export Summary Tax Tracking Open \n${error}`);
  }
};

export const exportSummaryTaxTrackingDone = async () => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getExportExcelPajakDone`,
      method: "GET",
      headers: headersSetting,
      responseType: "blob",
    });
    console.log(result);
    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `SummaryTaxTrackingDone.xlsx`;
    link.click();
    return result.data;
  } catch (error) {
    alert(`Cannot export Summary Tax Tracking Done \n${error}`);
  }
};

export const doUploadPembayaran = async (loaderHandler, formData) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/uploadTaxInvoice`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
    loaderHandler(false);
    return result.data;
  } catch (error) {
    alert(`cannot Upload Excel ${error}`);
    loaderHandler(false);
  }
};

export const doGetPopUpReminder = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getReminderPajakOpen`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching data ...! \n${error}`);
    loaderHandler(false);
  }
};

export const doGetPopUpReminderDone = async (loaderHandler, id) => {
  try {
    // loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getReminderPajakDone?id=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    // loaderHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching Data Reminder Done ...! \n${error}`);
    // loaderHandler(false);
  }
};

export const doSendReminder = async (loadingHandler, dataHit) => {
  try {
    loadingHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/sendTaxReminder`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loadingHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching Data ...! \n${error}`);
    loadingHandler(false);
  }
};

export const doGetSummaryMediaPromosi = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getSummaryMediaPromosi`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching data overview...!``n${err}`);
    loaderHandler(false);
  }
};

export const doGetMediaPromosiEyebowling = async (
  loadingHandler,
  dataRequest
) => {
  try {
    loadingHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/mediaPromosiEyebowling`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loadingHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching data EyeBowling...! \n${error}`);
    loadingHandler(false);
  }
};

export const doPrevAndNextGalleryMediaPromosi = async (
  loadingHandler,
  dataRequest
) => {
  try {
    loadingHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/prevAndNextGalleryMediaPromosi`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loadingHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching data ...! \n${error}`);
    loadingHandler(false);
  }
};

export const doGetJumlahObjectPajak = async (loadingHandler, dataHit) => {
  try {
    loadingHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/jumlahObjekPajak`,
      method: "GET",
      headers: headersSetting,
      data: dataHit,
    });
    loadingHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching Data (Jumlah Object Pajak)...! \n${error}`);
    loadingHandler(false);
  }
};

export const doGetSummarySurveyVendor = async (loadingHandler, dataRequest) => {
  try {
    loadingHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getSummarySurveyVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loadingHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching Data (Summary Survey Vendor)...! \n${error}`);
    loadingHandler(false);
  }
};

export const doGetVendors = async () => {
  try {
    // loadingHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getAllVendor`,
      method: "GET",
      headers: headersSetting,
      // data: dataRequest,
    });
    // loadingHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching Data (Summary Survey Vendor)...! \n${error}`);
    // loadingHandler(false);
  }
};

export const doUploadSurveyMediaPromosi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/uploadSurveyMediaPromosi`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Upload Document...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSummaryTahun = async (loadingHandler) => {
  try {
    loadingHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getSummaryMediaPromosiTahun`,
      method: "GET",
      headers: headersSetting,
    });
    loadingHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error Fetching Data (Summary Survey Vendor)...! \n${error}`);
    loadingHandler(false);
  }
};
