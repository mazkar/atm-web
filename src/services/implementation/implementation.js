import axios from 'axios';

const baseEndPoint = `${process.env.REACT_APP_API_IMPLEMENTATION}`;

const userSettingsApi = {};

userSettingsApi.GetImplementationSummary = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseEndPoint}/getImplementationSummary`)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default userSettingsApi;