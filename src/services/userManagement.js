import axios from "axios";

const baseEndPoint = `${process.env.REACT_APP_API_USERMANAGEMENTVENDOR}`;

const userSettingsApi = {};

userSettingsApi.VendorManagement = requestData => {
    let request = {};

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseEndPoint}/vendors?dataPerPage=10&pageNumber=${requestData}&sortBy=id&sortType=ASC`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.VendorManagementEdit = requestData => {
    let request = {};

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseEndPoint}/vendors/${requestData}`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.VendorManagementSaveEdit = (requestData) => {
    const request = requestData.data;

    return new Promise((resolve, reject) => {
        axios
            .put(`${baseEndPoint}/vendors/${requestData.id}`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.VendorManagementDelete = (requestData) => {
    const request = {};

    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseEndPoint}/vendors/${requestData}`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.VendorManagementCreate = (requestData) => {
    const request = requestData.data;

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/vendors/create`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default userSettingsApi;