/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import Axios from "axios";
import secureStorage from "../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};
export const doGetSummaryReportUpTime = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/summaryReportUptime`,
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
export const doGetSummaryUptimeDetail = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/summaryReportUptimeDetail?atmId=${id}`,
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
export const doGetDetailUptimeDetail = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/detailReportUptimeDowntime`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetReportUptime = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getReportUptime`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data ...!\n${err}`);
    loaderHandler(false);
  }
};

export const doGetOverviewAnomaly = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getOverviewAnomaly`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};

export const doGetDataEJ = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getDataEj`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};

export const doAcceptAnomalyAlert = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/sendAcceptAnomaly`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};

export const doSendRejectAnomaly = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/sendRejectAnomaly`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};

export const doRemarkAnomaly = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/remarkAnomalyAlert`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};

export const doGetUploadResponseCodeAnalizer = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getUploadResponseCodeAnalizer`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};
export const doGetListIntermiten = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getListIntermittenAlert`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data....!\n${err}`);
    loaderHandler(false);
  }
};
