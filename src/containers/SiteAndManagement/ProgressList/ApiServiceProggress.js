/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import Axios from 'axios';
// HELPER

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
/*  (1) New Approval */
export const doFetchGetDraft = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraftDetail`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log( `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`);
    const dataResponse = result.data.detailData;
    loaderHandler(false);
    return dataResponse;
  } catch (err) {
    alert(`Error Fetching Data Draft Detail...! \n${err}`);
    loaderHandler(false);
  }
};

doFetchGetDraft.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (2) Get Nearly ATM */
export const doGetNearlyATM = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitLocation`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log( `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`);
    const dataResponse = result.data;
    loaderHandler(false);
    return dataResponse;
  } catch (err) {
    alert(`Error Fetching Data Get Nearly ATM...! \n${err}`);
    loaderHandler(false);
  }
};

doGetNearlyATM.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (3) UPDATE DATA */
export const doUpdateData = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/updateProgressListDetail`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log( `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`);
    const dataResponse = result.data;
    loaderHandler(false);
    return dataResponse;
  } catch (err) {
    alert(`Error Update Data...! \n${err}`);
    loaderHandler(false);
  }
};

doUpdateData.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (3) UPDATE DATA PIPELINE */
export const doUpdateDataPipeline = async (loaderHandler, dataHit) => {
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/updateProgressListPipeline`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: dataHit,
    });
    // console.log( `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`);
    const dataResponse = result.data;
    loaderHandler(false);
    return dataResponse;
  } catch (err) {
    alert(`Error Update Data...! \n${err}`);
    loaderHandler(false);
  }
};

doUpdateDataPipeline.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};
