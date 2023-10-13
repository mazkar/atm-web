import axios from "axios";

export default axios.create({
  baseURL: "https://atmbusiness.getsandbox.com:443/",
  responseType: "json"
});