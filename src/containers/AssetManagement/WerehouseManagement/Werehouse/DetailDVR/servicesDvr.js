import axios from "axios";
import CONFIG from "./configDvr";
import secureStorage from "../../../../../helpers/secureStorage";

const fullURL = (path) => {
  return `${CONFIG.API_URL}/${path}`;
};
const accessToken = secureStorage.getItem("access_token");

export const handleNetworkError = (error) => {
  // if (error.message === "Network request failed") {
  //   alert(
  //     "Kesalahan Jaringan",
  //     "Silakan periksa koneksi Anda dan coba kembali.",
  //     "iconNoInet"
  //   );
  // }
  // throw error;
};

const get =
  (api) =>
  (param = "") => {
    return axios(`${fullURL(api)}${param}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

const post = (api) => (data) => {
  return axios.post(fullURL(api), data, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getDetailDvr = get("assetservice/v1/");
export const postComent = post("implementationservice/v1/saveComment");

const API = {
  getDetailDvr,
  postComent,
};

export default API;
