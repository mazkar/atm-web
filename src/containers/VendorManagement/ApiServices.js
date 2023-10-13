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

export const doFetchDetailKebutuhan = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getDetailTaskNeedVendor?id=${id}`,
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

export const doSaveOrUpdateTaskNeedVendor = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskNeedVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

/*  GET DATA VENDOR BY ID */
export const doFetchListCard = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/vendorPortalMenuList`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
/* PARAMETER REPLACE */
export const doFetchDetailParameter = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/findDetailTaskParameterVendorById?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

export const doSaveOrUpdateParameter = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskReplaceParameterVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};
/* Keamanan */
export const doFetchDetailKeamanan = async (loaderHandler, dataHit) => {
  console.log("+++ dataHit", dataHit);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getOrderDetailSecurity`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};
export const doSaveOrUpdateTaskSecurityVendor = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateOrderVendorSecurity`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};
export const doFetchHargaPenawaranVendorSecurity = async (
  loaderHandler,
  id
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getPenawaranHargaKeamananVendor?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

/* PARAMETER NEW TERMIN */
export const doFetchDetailParamNewTermin = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskParameterNewTerminVendor?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

export const doSaveOrUpdateParamNewTermin = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskParameterNewTerminVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

/* PARAMETER MIGRASI */
export const doFetchDetailParamMigrasi = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskParameterMigrasiVendor?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

export const doSaveOrUpdateParamMigrasi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateParameterMigrasiVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

// LIST BOOTH - Order Detail
export const doFetchDetailBooth = async (loaderHandler, id) => {
  // console.log(`${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskBoothVendor?id=${id}`);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskBoothVendor?id=${id}`,
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

export const doSaveOrUpdateTaskBoothVendor = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskBoothVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

/*  GET DATA ALL CARD ORDERS */
export const doFetchAllOrders = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/allTaskImplementation`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchSummaryVendorOrders = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/summaryAllGetOrdersVendor`,
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

export const doAddNewOrders = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTicketingNewOrder`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};
export const doAddNewOrderTicketing = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTicketingNegatifOrder`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetConfigAttributes = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getConfigAttribute`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doUploadExcelInvoice = async (loaderHandler, formData) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/uploadExcelInvoice`,
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
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};
/* AKTIVASI TERMINASI  */

export const doSaveUpdateTerminasiAktivasi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/updateOrderDetailActivationTermination`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

/* DIGITALISASI */
/* Ticketing */
export const doFetchTicketing = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/ticketingTaskList`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};
/* Result */
export const doFetchResult = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryDigitalisasiChecklistResult`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

/* Result */
export const doFetchCountChecklistResult = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/SummaryCountChecklistResult?type=${dataHit}`,
      method: "GET",
      headers: headersSetting,
      data: {},
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

// DIGITALISASI

export const doSaveOrUpdateSchedule = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/saveOrUpdateScheduleSurvey`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSurveyTypes= async (loaderHandler) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getListSurveyType`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`,
      },
      //   data: dataHit,
    });
      // console.log(
      //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
      // );
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data User Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailVendorCctv = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/findDetailCctvVendorById?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailVendorSiteQuality = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/findDetailSiteQualityProfileById?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

// Environtment Premisses Premisses Quality

export const doFetchDetailSiteSurvey = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/detailResultPremisesQuality?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailVendorMaintenance = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/detailResultPremisesQuality?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailVendorFlm = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/detailChecklistResultVendorFlm?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

// SCHEDULING
export const doFetchListSchedules = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getListSchedules`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doDeleteSchedule = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/deleteChecklistSchedule`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doUploadSchedule = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/uploadScheduleTask`,
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

/* Environment Premises - Premises Quality */
export const doFetchResultPremisesQuality = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryPremisesQuality`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchCountPremissesQuality = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/SummaryCountSummaryPremisesQuality?type=${dataHit}`,
      method: "GET",
      headers: headersSetting,
      data: {},
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchCountClearnessQuality = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/SummaryCountCleanlinessQuality?type=${dataHit}`,
      method: "GET",
      headers: headersSetting,
      data: {},
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchCountMediaPromosi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/SummaryCountMediaPromosi?type=${dataHit}`,
      method: "GET",
      headers: headersSetting,
      data: {},
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doExportExcelResultPremises = async () => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/downloadPremisesData`,
      method: "GET",
      headers: headersSetting,
      responseType: "blob",
    });

    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Environment Premises-Result.xlsx`;
    link.click();
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
  }
};

export const doFetchTicketPremisesQuality = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryTicketingPremisesQuality`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

// ENVIRONMENT PREMISES Clearliness
// RESULT
export const doFetchResultClearliness = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryCleanlinessSurvey`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doExportExcelResultClearliness = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/exportExcelClearinessQuality`,
      method: "GET",
      headers: headersSetting,
      responseType: "blob",
    });
    loaderHandler(false);
    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Environment Clearliness-Result.xlsx`;
    link.click();
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchTicketingClearliness = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryTicketingCleanliness`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetDetailSurveyFlmRpl = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getDetailSurveyFlmRpl?id=${id}`,
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

export const doGetDetailSurveyCassette = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/findDetailInventoryCassetteById?id=${id}`,
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

// FETCH Detail Vendor SLM
export const doFetchDetailVendorSLM = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/detailChecklistResultVendorSlm?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};
// FETCH Detail Kebersihan
export const doFetchDetailVendorKebersihan = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/detailChecklistResultVendorKebersihan?id=${id}`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};

// Add Category

export const doSaveCategoryConfig = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/saveOrUpdateConfigCategory`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Orders ...! \n${err}`);
    loaderHandler(false);
  }
};
// fetch config
export const doFetchConfiguration = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getCustomSurvey?attributeStatus=1`,
      method: `GET`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ... !\n${err}`);
    loaderHandler(false);
  }
};
// delete item config
export const doFetchDeleteItem = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/deleteConfigAttribute`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Delete Data Parameter Implementation...! \n${err}`);
    loaderHandler(false);
  }
};

/* Vendor & Service Catalog */
export const fetchSummaryVendorCatalog = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true, "table");
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryVendorCatalog`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    return result.data;
  } catch (error) {
    alert(`Error Fetching Data Summary \n${error}`);
  } finally {
    loaderHandler(false, "table");
  }
};

export const exportExcelCatalog = async (loaderHandler) => {
  try {
    loaderHandler(true, "modal");
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/exportExcelCatalog`,
      method: "GET",
      headers: headersSetting,
      responseType: "blob",
    });
    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Catalog.xlsx`;
    link.click();
    return result.data;
  } catch (error) {
    alert(`Cannot export excel \n${error}`);
  } finally {
    loaderHandler(false, "modal");
  }
};

export const uploadExcelCatalog = async (formData) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/uploadCatalogVendor`,
      method: "POST",
      headers: { ...headersSetting, "Content-Type": "multipart/form-data" },
      data: formData,
    });
    console.log(result);
  } catch (error) {
    alert(`Cannot upload excel \n${error}`);
  }
};

/*
  dataHit: {
    id: valueId
  }
*/
export const fetchDetailCatalog = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/findDetailCatalogById`,
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    console.log(result);
    return result.data;
  } catch (error) {
    alert(`Cannot fetch detail \n${error}`);
  } finally {
    loaderHandler(false);
  }
};

export const addNewCatalog = async (dataHit) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/saveServiceCatalog`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    return result;
  } catch (error) {
    alert(`Cannot add new catalog \n${error}`);
  }
};

export const deleteCatalogItem = async (id) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/deleteCatalogItem`,
      method: "POST",
      headers: headersSetting,
      data: id,
    });
    return result;
  } catch (error) {
    alert(`Cannot delete catalog \n${error}`);
  }
};

/* Vendor Part & Service Pricelist */
export const fetchPricelistPart = async (loaderHandler, payload, searchKey, searchValue) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryPriceListPart`,
      method: "POST",
      headers: headersSetting,
      data: {...payload, [searchKey] : searchValue},
    });
    console.log(result);
    return result.data;
  } catch (error) {
    alert(`Cannot fetch part pricelist \n${error}`);
  } finally {
    loaderHandler(false);
  }
};

export const addPricelistPart = async (payload) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/saveOrUpdatePriceListPart`,
      method: "POST",
      headers: headersSetting,
      data: payload,
    });
    console.log(result);
    return result.data;
  } catch (error) {
    alert(`Cannot add part pricelist \n${error}`);
  }
};

export const deletePricelistPart = async (payload) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/deletePriceListPart`,
      method: "POST",
      headers: headersSetting,
      data: payload,
    });
    console.log(result);
    return result.data;
  } catch (error) {
    alert(`Cannot delete part pricelist \n${error}`);
  }
};

export const exportPricelistPart = async () => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/exportExcelPriceListPart`,
      method: "GET",
      headers: headersSetting,
      responseType: "blob",
    });
    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `PartPricelist.xlsx`;
    link.click();
    return result.data;
  } catch (error) {
    alert(`Cannot export part pricelist \n${error}`);
  }
};

export const uploadExcelPricelistPart = async (formData) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/uploadPriceListPart`,
      method: "POST",
      headers: { ...headersSetting, "Content-Type": "multipart/form-data" },
      data: formData,
    });
    console.log(result);
  } catch (error) {
    alert(`Cannot upload excel \n${error}`);
  }
};

export const fetchPricelistService = async (loaderHandler, payload, searchKey, searchValue) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryPriceListService`,
      method: "POST",
      headers: headersSetting,
      data: {...payload, [searchKey]: searchValue},
    });
    console.log(result);
    return result.data;
  } catch (error) {
    alert(`Cannot fetch pricelist service \n${error}`);
  } finally {
    loaderHandler(false);
  }
};

export const addPricelistService = async (payload) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/saveOrEditPriceListService`,
      method: "POST",
      headers: headersSetting,
      data: payload,
    });
    console.log(result);
    return result.data;
  } catch (error) {
    alert(`Cannot add part pricelist \n${error}`);
  }
};

export const deletePricelistService = async (payload) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/deletePriceListService`,
      method: "POST",
      headers: headersSetting,
      data: payload,
    });
    return result.data;
  } catch (error) {
    alert(`Cannot delete service pricelist \n${error}`);
  }
};

export const exportPricelistService = async () => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/exportExcelPriceListService`,
      method: "GET",
      headers: headersSetting,
      responseType: "blob",
    });
    const blob = new Blob([result.data], {
      type: result.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `ServicePricelist.xlsx`;
    link.click();
    return result.data;
  } catch (error) {
    alert(`Cannot export service pricelist \n${error}`);
  }
};

export const uploadExcelPricelistService = async (formData) => {
  try {
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/uploadPriceListService`,
      method: "POST",
      headers: { ...headersSetting, "Content-Type": "multipart/form-data" },
      data: formData,
    });
    console.log(result);
  } catch (error) {
    alert(`Cannot upload excel \n${error}`);
  }
};

export const doUploadSurveyTask = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/uploadSurveyTask`,
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

// VENDOR PAJAK
export const doFetchVendorPajak = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryTaxByVendor`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchReminderPajak = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getReminderPajakDone?id=${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailPajak = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/detailTaskVendorMediaTax?id=${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...! \n${err}`);
    loaderHandler(false);
  }
};

export const doSaveOrUpdateVendorTaxOrder = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/saveOrUpdateVendorTaxOrder`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const getCountObjectPajak = async(loaderHandler,year)=>{
  try{
    loaderHandler(true);
    const result = await Axios({
      url:`${process.env.REACT_APP_API_MONITORING}/countObjekPajak?tahun=${year}`,
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      }
    })
    loaderHandler(false);
    return result.data
  }catch(err){
    alert(`Error Fetching Data...!\n${err}`)
    loaderHandler(false)
  }
};
export const doGetObjectData = async(loaderHandler)=>{
  try{
    loaderHandler(true);
    const result = await Axios({
      url:`${process.env.REACT_APP_API_MONITORING}/getOverviewObjekPajak`,
      method:"GET",
      header:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      }
    })
    loaderHandler(false)
    return result.data
  }catch(err){
    alert(`Error Fetching Data ...!\n${err}`)
    loaderHandler(false)
  }
}
export const doGetObjectExtend = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getPajakTerbayar`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetObjectNotExtend = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/getPajakBlmTerbayar`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetNumberEmployee = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryVendorOverview`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetNumberVendor = async(loaderHandler,dataHit)=>{
  try{
    loaderHandler(true);
    const result = await Axios({
      url:`${process.env.REACT_APP_API_VENDORS}/summarySurveyVendor`,
      method:"POST",
      headers:headersSetting,
      data:dataHit,
    })
    loaderHandler(false);
    return result;
  }catch(err){
    alert(`Error Fetching Data...!\n${err}`)
    loaderHandler(false)
  }
}
export const getSummaryPajakTerbayar = async(loaderHandler,dataHit)=>{
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryObjekPajakTerbayar`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...!\n${err}`);
    loaderHandler(false);
  }
}
export const getSummaryObjectPajak = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryObjekPajak`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...!\n${err}`);
    loaderHandler(false);
  }
};
export const getSummaryNotExtend = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_MONITORING}/summaryObjekPajakBlmTerbayar`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetOrderToVendor = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/totalOrderkeVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetNumberTaskEmployee = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/summaryTaskVendorOverview`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetSummaryReportUpTime = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION}/summaryReportUptime`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data ...!\n${err}`);
    loaderHandler(false);
  }
};