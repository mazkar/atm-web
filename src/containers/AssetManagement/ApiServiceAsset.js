import PropTypes from "prop-types";
import Axios from "axios";
import secureStorage from "../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");

const baseUrl = process.env.REACT_APP_API_ASSET;
// const baseUrl = "https://mylab-siab.com/assetservice/v1";

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

export const doGetKlaimEEI = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getKlaimEEI`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSubmissionClaim = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/claimSubmissionApproval`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Terjadi Kesalahan: !\n${err}`);
    loaderHandler(false);
  }
};

export const doEditUps = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/editUps`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};

export const doViewDetailUPS = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/detailUps?id=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};

export const doSendChat = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: "https://mylab-siab.com/implementationservice/v1/saveComment",
      method: "POST",
      headers: headersSetting,
      data: dataRequest,
    });
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};
