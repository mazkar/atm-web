import axios from 'axios'
import SecureStorage from './secureStorage';
// import CONSTANTS from "../constants"
import * as BrowserType from './detectBrowser';

let access_token = "";
if (SecureStorage.getItem("credentials") !== null) {
    access_token = SecureStorage.getItem('access_token');
}

export default function getPDF(value) {
    value.loading(true)
    return axios({
        method: 'post',
        url: value.url,
        headers: {
            Authorization: "Bearer " + access_token
        },
        data: value.data,
        responseType: 'arraybuffer',
        // timeout: CONSTANTS.TIME_OUT_API
    })
        .then((response) => {
            value.loading(false)
            // let access_token = response.headers.access_token
            // SecureStorage.setItem('access_token', access_token);
            if (BrowserType.isIE || BrowserType.isEdge) {
                var blob = new Blob([response.data], { type: response.headers['content-type'] });
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob);
                    return;
                }

            } else {
                var blob = new Blob([response.data], { type: response.headers['content-type'] });
                const link = document.createElement('a');
                // create a blobURI pointing to our Blob
                link.href = URL.createObjectURL(blob);

                link.download = response.headers['content-filename'] || `${value.fileName}.${response.headers['content-type'].split('/')[1]}`
                // some browser needs the anchor to be in the doc
                document.body.append(link);
                link.click();
                link.remove();
                // in case the Blob uses a lot of memory
                window.addEventListener('focus', e => URL.revokeObjectURL(link.href), { once: true });
                // FileDownload(response.data, 'Transaction History (September 2019 - October 2019).pdf')
                // return true;
            }

        })
        .catch((error) => {
            value.loading(false)
            console.log(error)
            // return true;

        })
}