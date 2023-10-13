import PropTypes from "prop-types";
import Axios from "axios";
import secureStorage from "../../helpers/secureStorage";
import constansts from "../../helpers/constants";

const accessToken = secureStorage.getItem("access_token");

const baseUrl = process.env.REACT_APP_API_ADD_ONS;
// const baseUrl = "https://dev-micro-siab.app.mylab-siab.com/addonsservice/v1";

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

export const getCategoryAddOns = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getCategoryAddons`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};

export const createUpdateCategoryAddOns = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/saveAndUpdateCategoryAddons`,
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

export const deleteCategoryAddOns = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/removeCategoryAddons`,
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

export const createUpdateSubCategoryAddOns = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/addOrUpdateSubConfig`,
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

export const deleteSubCategoryAddOns = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/deleteSubConfig`,
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

getCategoryAddOns.PropTypes = {
  loaderHandler: PropTypes.func.isRequired,
  //   id: PropTypes.object.isRequired,
};
createUpdateCategoryAddOns.PropTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
  //   id: PropTypes.object.isRequired,
};
deleteCategoryAddOns.PropTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
  //   id: PropTypes.object.isRequired,
};
createUpdateSubCategoryAddOns.PropTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
  //   id: PropTypes.object.isRequired,
};
deleteSubCategoryAddOns.PropTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
  //   id: PropTypes.object.isRequired,
};

export const doGetTodoList = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getTodoList`,
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

export const doGetDetailTodoList = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/todoListDetail?id=${id}`,
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

export const doSaveAndUpdateTodoList = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/saveAndUpdateTodoList`,
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

export const doCommentTodolist = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/userCommentTodoList`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Submit Comment...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetAllUsers = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${constansts.userServiceBaseUrl}/users`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result.data.data;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetSummaryForumDiscussion = async (
  loaderHandler,
  dataRequest
) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/overviewForumDiscuss`,
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

export const doAddUpdateForumDiscuss = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/addOrUpdateForumDiscuss`,
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

export const doGetDetailEvent = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getDetailEvents?id=${id}`,
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

export const doGetDetailSchedule = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getDetailSchedule?id=${id}`,
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

export const doGetDetailNews = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getDetailNews?id=${id}`,
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

export const doGetCategoryForumDiscuss = async () => {
  try {
    const result = await Axios({
      url: `${baseUrl}/getCategoryForumDiscuss `,
      method: "GET",
      headers: headersSetting,
    });
    return result.data;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
  }
};

export const doGetSubCategoryForumDiscuss = async (id) => {
  try {
    const result = await Axios({
      url: `${baseUrl}/getSubCategoryForumDiscuss?id=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    return result.data;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
  }
};

export const doGetDetailForumDiscuss = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await Axios({
      url: `${baseUrl}/getDetailForumDiscuss?id=${id}`,
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

export const doDeleteForumDiscuss = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/deleteForumDiscuss`,
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

export const doSendCommentForumDiscuss = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/commentForumDiscuss`,
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

export const doSendCommentEvents = async (loaderHandler, dataRequest) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/userCommentEvents`,
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

