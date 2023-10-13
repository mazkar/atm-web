import axios from 'axios';
import secureStorage from '../secureStorage';

axios.interceptors.request.use(
  (request) => {
    try {
      //   request.timeout = 180 * 1000;
      const token = secureStorage.getItem('access_token');
      if (token) {
        request.headers['Authorization'] = 'Bearer ' + token;
      }
    } catch (e) { }

    return request;
  },
  (error) => {
    return error;
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
