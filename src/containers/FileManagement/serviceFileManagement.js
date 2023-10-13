/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Axios from "axios";
import secureStorage from "../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
export const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

// base url
const baseUrl = process.env.REACT_APP_API_FILE_MANAGEMENT;

export const doGetFolderDocControl = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFolderDocControl`,
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

export const doAddFolderDocControl = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/saveAndUpdateFolderDocControl`,
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

export const doDeleteFolderDocControl = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/removeFolderDocControl`,
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

export const doOverviewKnowledgeBase = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/overviewDocumentKnowledge`,
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

export const doGetOverviewNoSurat = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/overviewNoSurat`,
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

export const doAddAndUpdateNoSurat = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/AddOrUpdateNoSurat`,
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

export const doDeleteNoSurat = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/deleteNoSurat`,
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

export const doGetOverviewDocProject = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/overviewDocumentProject`,
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

export const doGetDetailKnowledgeBase = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getDetailFolderDocKnowledge?id=${dataHit}`,
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

export const doGetDetailFolderDocControl = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFolderDocControl?id=${dataHit}`,
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

export const doGetFolderDocProject = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getDetailFolderDocProject?id=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetFolderDocKnowledge = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFolderDocKnowledge`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetDetailFileKnowledgeBase = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getDetailFileDocKnowledge?id=${dataHit}`,
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

export const doAddAndUpdateFolderKnowledge = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/saveAndUpdateFolderDocKnowledge`,
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

export const doDeleteFolderKnowledge = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/removeFolderDocKnowledge`,
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

export const doGetFileDocKnowledge = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFileDocKnowledge?fileId=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doAddAndUpdateFileKnowledge = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/saveAndUpdateFileDocKnowledge`,
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

export const doAddAndUpdateFolderDocProject = async (
  loaderHandler,
  dataHit
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/saveAndUpdateFolderDocProject`,
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

export const doDeleteFolderDocProject = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/removeFolderDocProject`,
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
export const doGetSummaryDocBast = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getSummaryDocBast`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};
export const doGetOverviewDocBast = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/overviewDocBast`,
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
export const getDocumenControl = async (loaderHandler, payload) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "POST",
      url: `${baseUrl}/getDocumenControl`,
      headers: headersSetting,
      data: payload,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while get document control\n${error}`);
    loaderHandler(false);
  }
};

export const getFolderDocProject = async (loaderHandler) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "GET",
      url: `${baseUrl}/getFolderDocProject`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while get folder doc project\n${error}`);
    loaderHandler(false);
  }
};

export const getDetailFolderDocControl = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "GET",
      url: `${baseUrl}/getDetailFolderDocControl?id=${id}`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while get detail folder doc control\n${error}`);
    loaderHandler(false);
  }
};

export const uploadDocControl = async (loaderHandler, payload) => {
  // const dateNow = new Date().getTime();
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "POST",
      url: `${baseUrl}/uploadDocControl`,
      headers: headersSetting,
      // data: { ...payload, createAt: dateNow },
      data: payload,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while upload file document control\n${error}`);
    loaderHandler(false);
  }
};

export const getDetailFolderDocProject = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "GET",
      url: `${baseUrl}/getDetailFolderDocProject?id=${id}`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while get file doc project\n${error}`);
    loaderHandler(false);
  }
};

export const doFetchFileApproval = async (loaderHandler, dataRequest) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "POST",
      url: `${baseUrl}/overviewApproval`,
      headers: headersSetting,
      data: dataRequest,
    });
    loaderHandler(false);
    return result.data;
  } catch (error) {
    alert(`error while get folder doc project\n${error}`);
    loaderHandler(false);
  }
};

export const doGetDetailFileDocProject = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getDetailFileDocProject?id=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetDetailDocBast = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getDetailDocBast?id=${id}`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error to fetch data\n${error}`);
    loaderHandler(false);
  }
};
export const doGetVendorDocBast = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/vendorDocBast?id=${id}`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data;
  } catch (error) {
    alert(`Error to fetch data\n${error}`);
    loaderHandler(false);
  }
};
export const doGetTableDocBast = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/docBastPagination`,
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

export const dogetDetailAllFile = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getDetailFile`,
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

export const removeFileDocProject = async (loaderHandler, payload) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      data: payload,
      method: "POST",
      url: `${baseUrl}/removeFileDocProject`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while deleting file on doc project\n${error}`);
    loaderHandler(false);
  }
};

export const saveAndUpdateFileManagement = async (loaderHandler, payload) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      method: "POST",
      url: `${baseUrl}/saveAndUpdateFile`,
      headers: headersSetting,
      data: payload,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while add or edit file doc control\n${error}`);
    loaderHandler(false);
  }
};

export const doGetDetailInfoSKPD = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/detailAtmDocLegality?snaId=${id}`,
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

export const doGetDetailSKPD = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/docLegality`,
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

export const doGetFileDocumentLegalityNew = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFileNewDocumentLegality`,
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

export const doGetFileDocumentLegalityRenew = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFileRenewalDocumentLegality`,
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

export const doGetFileDocumentLegalityTermin = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFileTerminDocumentLegality`,
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

export const doGetFileDocumentLegalityReplace = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/getFileReplaceDocumentLegality`,
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
