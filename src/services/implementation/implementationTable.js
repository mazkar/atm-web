import axios from 'axios';

const baseEndPoint = `${process.env.REACT_APP_API_IMPLEMENTATION}`;

const userSettingsApi = {};

userSettingsApi.GetListImplementationNew = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/getListImplementationNew`, requestData)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.GetListImplementationTermin = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/getListImplementationTermin`, requestData)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.GetListImplementationReplace = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/getListImplementationReplace`, requestData)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.GetListImplementationMigrasi = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/getListImplementationMigrasi`, requestData)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default userSettingsApi;