import axios from "axios";

const baseEndPoint = `${process.env.REACT_APP_API_FINANCIAL}`;
const baseEndPointMemoPembayaran = `${process.env.REACT_APP_API_MEMOPEMBAYARAN}`;
const baseEndPointNPB = `${process.env.REACT_APP_API_FINANCIALNPB}`;

const userSettingsApi = {};

userSettingsApi.DetailBudgetOpex = requestData => {
    let request = {}
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/detailBudgetOpex`, request)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

userSettingsApi.DetailBudgetCapex = requestData => {
    let request = {}
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/detailBudgetCapex`, request)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

userSettingsApi.ListMemoPembayaran = requestData => {
    let request = {};

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointMemoPembayaran}/listMemoPembayaran`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.ListApprovalNPB = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointNPB}/listApprovalNpb`, requestData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.ListFinancialStatus = requestData => {
    let request = {}
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/listFinancialStatus`, request)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

userSettingsApi.SearchBudgetTracking = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/searchBudgetTracking`, requestData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.SearchBudgetBesaran = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/searchBudgetBesaran`, requestData)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default userSettingsApi;
