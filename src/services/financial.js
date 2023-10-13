import axios from "axios";

const baseEndPoint = `${process.env.REACT_APP_API_FINANCIAL}`;
const baseEndPointNPB = `${process.env.REACT_APP_API_FINANCIALNPB}`;
const baseEndPointPlanner = `${process.env.REACT_APP_API_FINANCIALPLANNER}`;

const userSettingsApi = {};

userSettingsApi.BudgetSummaryInfoByMP = requestData => {
    let request = {};

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/budgetSummaryInfoByMP`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.BudgetSummaryInfoByNPB = requestData => {
    let request = {};

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/budgetSummaryInfoByNPB`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.BudgetSummaryInfo = requestData => {
    let request = {};

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/budgetSummaryInfo`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.SummaryFinancialStatus = requestData => {
    let request = {}
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointPlanner}/summaryFinancialStatus`, request)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
};

userSettingsApi.GenerateNPBCode = requestData => {
    let request = {};

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointNPB}/generateNpbCode`, request)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.SubmitNPB = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointNPB}/submitNpb`, requestData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.AdjustmentBudgetBesaran = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointPlanner}/adjustmentBudgetBesaran `, requestData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

userSettingsApi.BudgetSummary = requestData => {
    let request = {}
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/budgetSummary`, request)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
};

userSettingsApi.UpdateStatusTransaction = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/updateStatusTransaction`, requestData)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
};

userSettingsApi.ListBudgetBesaran = requestData => {
    let request = {}
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointNPB}/listBudgetBesaran`, request)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

userSettingsApi.ListBudgetNpb = requestData => {
    let request = {}
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPointNPB}/listBudgetNpb`, request)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default userSettingsApi;
