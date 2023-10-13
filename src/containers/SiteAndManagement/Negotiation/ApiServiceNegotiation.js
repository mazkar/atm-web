/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import Axios from 'axios';
import useRupiahConverterSecondary from '../../../helpers/useRupiahConverterSecondary';

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
/*  (1) GET DATA DETAIL NEGOTIATION */
export const doFetchDataNegotiationDetail = async (loaderHandler, dataHit) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getDetailNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Negotiation Detail...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchDataNegotiationDetail.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (2) SAVE DATA NEGOTIATION */
export const doSaveNegotiation = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API SAVE DATA NEGOTIATION (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/saveNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API SAVE DATA NEGOTIATION (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
    
  } catch (err) {
    alert(`Error Save Data Negotiation Detail...! \n${err}`);
    loaderHandler(false);
  }
};

doSaveNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (3) UPLOAD OFFERING FILES  */
export const doUploadOfferingFile = async (loaderHandler, file) => {
  function renameFile(filename){
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(filename)[1];  
    const newString = `OfferingFile_${Math.floor(Math.random() * 1000)}_${+new Date()}.${ext}`;
    return newString;
  }
  const renamedAcceptedFile = new File([file], `${renameFile(file.name)}`, { type: file.type });
  
  // console.log(`<<< CEKPoint Hit API UPLOAD OFFERING FILES (A)`);
  try {
    loaderHandler(true);
    const formData = new FormData();
    formData.append('file', renamedAcceptedFile);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/uploadOfferingFiles`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    // console.log(
    //   `<<< CEKPoint Hit API UPLOAD OFFERING FILES (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Upload Offering File...! \n${err}`);
    loaderHandler(false);
  }
};

doUploadOfferingFile.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
};

/*  (4) TERMINATE NEGOTIATION */
export const doTerminateNegotiation = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/terminateNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
    
  } catch (err) {
    alert(`Error TERMINATE Negotiation...! \n${err}`);
    loaderHandler(false);
  }
};

doTerminateNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (3) UPLOAD SURAT KONFIRMASI LANDLORD FILES  */
export const doUploadSuratKonfirmasiLandlord = async (loaderHandler, file) => {
  function renameFile(filename) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(filename)[1];
    const newString = `SuratKonfirmasiLandlord_${Math.floor(Math.random() * 1000)}_${+new Date()}.${ext}`;
    return newString;
  }
  const renamedAcceptedFile = new File([file], `${renameFile(file.name)}`, { type: file.type });

  // console.log(`<<< CEKPoint Hit API UPLOAD OFFERING FILES (A)`);
  try {
    loaderHandler(true);
    const formData = new FormData();
    formData.append('file', renamedAcceptedFile);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/uploadFilesLandlord`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    // console.log(
    //   `<<< CEKPoint Hit API UPLOAD OFFERING FILES (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Upload Offering File...! \n${err}`);
    loaderHandler(false);
  }
};

doUploadOfferingFile.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
};

/*  (5) DEAL NEGOTIATION */
export const doDealNegotiation = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/dealNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error DEALing Negotiation...! \n${err}`);
    loaderHandler(false);
  }
};

doDealNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (6) ONGOING NEGOTIATION LIST */
export const doFetchOngoingNegotiation = async (loaderHandler, loadDataHandler, dataHit) => {
  let dataPage = {};
  const dataToSet = [];
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(false);
    loadDataHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    // reconstruct data from DB 
    try{
      // reconstruct data from DB
      const dataPre = result.data.content;
      dataPage = {
        "totalPages": result.data.totalPages,
        "totalElements": result.data.totalElements
      };
      dataPre.map((row) => {
        const actionData = [
          {name: 'Detail', url:`${window.location.origin.toString()}/negotiation/detail/${row.id}`}
        ];
        const newRow = {
          // atmId: row.locationId,
          locationName: row.newLocation,
          status: row.negotiationStatus,
          locationType: row.locationType,
          yearlyRentCost: {flatCost: false, costList: row.openingType.toLowerCase() === 'renewal' ? row.yearlyRentCostListFront : row.yearlyRentCostList},
          negotiationDealCost: { flatCost: false, costList: row.negotiationDealCostList},
          type: row.openingType,
          requester: row.requester,
          action: actionData
        };
        dataToSet.push(newRow);
      });
    }catch{
      loaderHandler(false);
      loadDataHandler(false);
      alert(`Error Re-Construct Data ONGOING NEGOTIATION LIST...!`);
    }
    loaderHandler(false);
    loadDataHandler(false);
    const dataReturn = {
      "totalPages":dataPage.totalPages, 
      "totalElements": dataPage.totalElements ,
      "dataTable": dataToSet
    };
    return dataReturn;
  } catch (err) {
    alert(`Error Fetching Data ONGOING NEGOTIATION LIST...! \n${err}`);
    loaderHandler(false);
    loadDataHandler(false);
  }
};
doFetchOngoingNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

/*  (7) APPROVAL NEGOTIATION LIST */
export const doFetchApprovalNegotiation = async (loaderHandler, loadDataHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(false);
    loadDataHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getNegotiationApproval`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    loadDataHandler(false);
    // const dataReturn = {
    //   "totalPages":dataPage.totalPages, 
    //   "totalElements": dataPage.totalElements ,
    //   "dataTable": dataToSet
    // };
    return result;
  } catch (err) {
    alert(`Error Fetching Data APPROVAL NEGOTIATION LIST ...! \n${err}`);
    loaderHandler(false);
    loadDataHandler(false);
  }
};
doFetchApprovalNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

/*  (8) APPROVE NEGOTIATION */
export const doApproveNegotiation = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/approveNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error APPROVE Negotiation...! \n${err}`);
    loaderHandler(false);
  }
};

doApproveNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (9) DECLINE NEGOTIATION */
export const doDeclineNegotiation = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/declineNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error DECLINE Negotiation...! \n${err}`);
    loaderHandler(false);
  }
};

doDeclineNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};
/*  (10) GET DATA DRAFT NEGOTIATION */
export const doGetRequestDraftNegotation = async (loaderHandler, dataHit) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRequestDraftNegotation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error GET DATA DRAFT NEGOTIATION ...! \n${err}`);
    loaderHandler(false);
  }
};
doGetRequestDraftNegotation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (11) SEND DRAFT NEGOTIATION */
export const doSendDraftNegotiation = async (loaderHandler, dataHit) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/sendDraftNegotiation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error SEND DRAFT NEGOTIATION...! \n${err}`);
    loaderHandler(false);
  }
};
doSendDraftNegotiation.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};
/*  ++++++++++++++ END Init Hit API Function ++++++++++++++ */
