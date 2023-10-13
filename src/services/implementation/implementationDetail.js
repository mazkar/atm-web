import axios from "axios";

const baseEndPoint = `${process.env.REACT_APP_API_IMPLEMENTATION}`;

const settingApi = {};

settingApi.implementationDetail = (requestData, loaderHandler) => {
  loaderHandler(true);
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseEndPoint}/getDetailImplementation`, requestData)
      .then((response) => {
        resolve(response.data);
        loaderHandler(false);
      })
      .catch((error) => {
        reject(error);
        loaderHandler(false);
      });
  });
};

settingApi.implementationDetailUpdate = (requestData, loaderHandler) => {
  loaderHandler(true);
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseEndPoint}/updateStatusTaskDetailImplementation`, requestData)
      .then((response) => {
        console.log("data berhasil");
        resolve(response);
        loaderHandler(false);
      })
      .catch((error) => {
        console.log("data gagal");
        console.log(error);
        reject(error);
        loaderHandler(false);
      });
  });
};
export default settingApi;
