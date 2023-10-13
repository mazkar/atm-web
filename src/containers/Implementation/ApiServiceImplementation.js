/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
import Axios from "axios";
import secureStorage from "../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

/*  (1) GET DATA NEW IMPLEMENTATION */
export const doFetchImplementationNew = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getListImplementationNew`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation New...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (2) GET DATA TERMIN IMPLEMENTATION */
export const doFetchImplementationTermin = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getListImplementationTermin`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Termin...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationTermin.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (3) GET DATA REPLACE IMPLEMENTATION */
export const doFetchImplementationReplace = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getListImplementationReplace`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Termin...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationReplace.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (4) GET DATA MIGRASI IMPLEMENTATION */
export const doFetchImplementationMigrasi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getListImplementationMigrasi`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Migrasi...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationMigrasi.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

export const doFetchImplementationDetail = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getDetailImplementation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doUpdateStatusTaskDetailImplementation = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/updateStatusTaskDetailImplementation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

// CARD TASK PARAMETER NEW / TERMIN
export const doCreateUpdateCardParameter = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateParameterNewTermin`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailParameterNewTermin = async (
  loaderHandler,
  dataHit
) => {
  console.log("+++ dataHit", dataHit);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailParameterNewTermin`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Parameter Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDeleteParameterNewTermin = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/deletParameterNewTermin`,
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

// CARD TASK PARAMETER SIGNAGE
export const doCreateUpdateCardSignage = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskSignage`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Add Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailSignage = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskSignage`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Parameter Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doDeleteCardSignage = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/deleteCardTaskSignage`,
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

// CARD TASK PARAMETER NEW / TERMIN
export const doCreateUpdateCardBooth = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateBooth`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailBooth = async (loaderHandler, dataHit) => {
  console.log("+++ dataHit", dataHit);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailCardTaskBooth`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Parameter Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doDeleteCardBooth = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/deleteCardTaskBooth`,
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

// CARD TASK SECURITY
export const doCreateUpdateCardSecurity = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskSecurity`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchDetailSecurity = async (loaderHandler, dataHit) => {
  console.log("+++ dataHit", dataHit);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskSecurity`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Parameter Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doDeleteCardSecurity = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/deleteCardTaskSecurity`,
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

// UPLOAD DOCUMENT TASK
export const doUploadDocument = async (dataHit) => {
  // console.log("+++ dataHit doUploadDocument", dataHit);
  const formData = new FormData();
  formData.append("file", dataHit);
  try {
    // loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/uploadDocument`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    // loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Upload Document...! \n${err}`);
    // loaderHandler(false);
  }
};

// UPLOAD PHOTO TASK
export const doUploadPhoto = async (dataHit) => {
  // console.log("+++ dataHit doUploadDocument", dataHit);
  const formData = new FormData();
  formData.append("file", dataHit);
  try {
    // loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/uploadPhoto`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    // loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Upload Document...! \n${err}`);
    // loaderHandler(false);
  }
};

export const doGetJarkom = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getJarkom`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Jarkom...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetKesiapanMesin = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getKesiapanMesin`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Kesiapan Mesin...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetPermintaan = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getPermintaan`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Permintaan...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSaranaKeamanan = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getSaranaKeamanan`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Sarana Keamanan...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetAktivasi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getAktivasi`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Aktivasi...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSingageStickerDanPajak = async (loaderHandler, dataHit) => {
  console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getSingageStickerDanPajak`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(
      `Error Fetching Data Implementation Singage Sticker Dan Pajak...! \n${err}`
    );
    loaderHandler(false);
  }
};

export const doGetBooth = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/getBooth`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Booth...! \n${err}`);
    loaderHandler(false);
  }
};

// API TASK NEED

export const doCreateUpdateTaskNeed = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskNeed`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doSaveComment = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveComment`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Save Comment...! \n${err}`);
    loaderHandler(false);
  }
};
//API TASK MIGRASI
export const doCreateUpdateTaskMigrasi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskParameterMigrasi`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};
export const doFetchDetailMigrasi = async (loaderHandler, dataHit) => {
  console.log("+++ dataHit", dataHit);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskParameterMigrasi`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Parameter Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};
export const doFetchDeleteMigrasi = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/deleteCardTaskParameterMigrasi`,
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

// CARD TASK TERMINATION
export const doCreateUpdateCardTermination = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTermin`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchTerminationDetail = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailCardTaskTermination`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Implementation Termination Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doDeleteCardTermination = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/deleteCardTaskTermin`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Delete Data Implementation Termination...! \n${err}`);
    loaderHandler(false);
  }
};

// CARD TASK TERMINATION
export const doCreateUpdateSaldoConfirmation = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateSaldoConfirmation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Create / Update Task Implementation...! \n${err}`);
    loaderHandler(false);
  }
};

export const doFetchSaldoConfirmationDetail = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailCardTaskBalance`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doDeleteCardSaldoConfirmation = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/deleteCardTaskBalance`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Delete Data Implementation...! \n${err}`);
    loaderHandler(false);
  }
};

export const doSendEmailActivation = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/sendAtmEmailActivation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Send Email...! \n${err}`);
    loaderHandler(false);
  }
};

/*  OVERVIEW */
export const doFetchOverSlaImpementation = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getListOverSlaImpementation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Overview...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

export const doFetchRolloutUpdate = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/rolloutUpdateImplementation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Overview...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

export const doFetchTotalImpleChart = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryVendorImplementationOverview`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Overview...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

export const doFetchCardTaskSummary = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/summaryAllVendorOverview`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation Overview...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

export const doAddRemarkSla = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/remarkOverSlaImplementation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Add Remark...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

export const doAddRemarkRollout = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/remarkRolloutUpdateImplementation`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Add Remark...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchImplementationNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

// JARKOM ORDER DETAIL
export const doCreatePostJarkomOrderDetail = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateTaskJarkomVendor`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Add Remark...! \n${err}`);
    loaderHandler(false);
  }
};

// CARD PARAMETER REPLACE

export const doFetchDetailParameterReplace = async (
  loaderHandler,
  dataHit
) => {
  console.log("+++ dataHit", dataHit);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/detailTaskParameterReplace`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Parameter Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

export const doCreateUpdateCardParameterReplace = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IMPLEMENTATION}/saveOrUpdateTaskParameterReplace`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Update Task Implementation Detail...! \n${err}`);
    loaderHandler(false);
  }
};
export const doGetEmailData = async(loaderHandler,id,taskType)=>{
  try{
   loaderHandler(true);
    const result = await Axios({
      url:`${process.env.REACT_APP_API_IMPLEMENTATION}/getDetailEmailData?id=${id}&taskType=${taskType}`,
      method:`GET`,
      headers: headersSetting,
    })
    loaderHandler(false);
    return result.data;
  }catch(err){
    alert(`Error Fetchinf Data.....!\n${err}`);
    loaderHandler(false)
  }
}