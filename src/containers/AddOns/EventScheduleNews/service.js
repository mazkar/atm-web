import axios from "axios";
import secureStorage from "../../../helpers/secureStorage";

const baseUrl = process.env.REACT_APP_API_ADD_ONS;
const accessToken = secureStorage.getItem("access_token");
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

export const getEventsScheduleNews = async (
  loaderHandler,
  dataRequest,
  keyword
) => {
  const { sortType, sortBy, pageNumber, dataPerPage, category } = dataRequest;
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/overviewEventOrScheduleOrNews`,
      headers: headersSetting,
      data: {
        sortType: sortType,
        sortBy: sortBy,
        pageNumber: pageNumber,
        dataPerPage: dataPerPage,
        category: category, // Events / Schedule / News
        keyword: keyword,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while get events, schedule and news\n${error}`);
    loaderHandler(false);
  }
};

export const saveEvent = async (
  loaderHandler,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/addOrUpdateTaskEvensts`,
      headers: headersSetting,
      data: {
        title: title,
        coverImage: coverImage,
        description: description,
        attachmentOne: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while save events\n${error}`);
    loaderHandler(false);
  }
};

export const saveSchedule = async (
  loaderHandler,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/addOrUpdateTaskSchedule`,
      headers: headersSetting,
      data: {
        title: title,
        coverImage: coverImage,
        description: description,
        attachmentOne: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while save events\n${error}`);
    loaderHandler(false);
  }
};

export const saveNews = async (
  loaderHandler,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/addOrUpdateTaskNews`,
      headers: headersSetting,
      data: {
        title: title,
        coverImage: coverImage,
        description: description,
        attachmentOne: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while save events\n${error}`);
    loaderHandler(false);
  }
};

export const deleteEventScheduleNews = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/deleteEventOrScheduleOrNews`,
      headers: headersSetting,
      data: {
        id: id,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while delete event, schedule or news\n${error}`);
    loaderHandler(false);
  }
};

export const getDetailEvent = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/getDetailEvents?id=${id}`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while getting detail event\n${error}`);
    loaderHandler(false);
  }
};

export const getDetailSchedule = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/getDetailSchedule?id=${id}`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while getting detail schedule\n${error}`);
    loaderHandler(false);
  }
};

export const getDetailNews = async (loaderHandler, id) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/getDetailNews?id=${id}`,
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while getting detail news\n${error}`);
    loaderHandler(false);
  }
};

export const editEvent = async (
  loaderHandler,
  id,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/addOrUpdateTaskEvensts`,
      headers: headersSetting,
      data: {
        id: id,
        title: title,
        coverImage: coverImage,
        description: description,
        attachmentOne: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error whileditevents\n${error}`);
    loaderHandler(false);
  }
};

export const editSchedule = async (
  loaderHandler,
  id,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/addOrUpdateTaskSchedule`,
      headers: headersSetting,
      data: {
        id: id,
        title: title,
        coverImage: coverImage,
        description: description,
        attachmentOne: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while save events\n${error}`);
    loaderHandler(false);
  }
};
export const saveThread = async (
  loaderHandler,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/saveAndUpdateThreadUser`,
      headers: headersSetting,
      data: {
        title: title,
        coverImage: coverImage,
        description: description,
        attachment: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while save events\n${error}`);
    loaderHandler(false);
  }
};

export const editNews = async (
  loaderHandler,
  id,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/addOrUpdateTaskNews`,
      headers: headersSetting,
      data: {
        id: id,
        title: title,
        coverImage: coverImage,
        description: description,
        attachmentOne: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while save events\n${error}`);
    loaderHandler(false);
  }
};
export const editThread = async (
  loaderHandler,
  id,
  title,
  coverImage,
  description,
  attachment
) => {
  loaderHandler(true);
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/saveAndUpdateThreadUser`,
      headers: headersSetting,
      data: {
        threadId: id,
        title: title,
        coverImage: coverImage,
        description: description,
        attachment: attachment,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`error while save events\n${error}`);
    loaderHandler(false);
  }
};
