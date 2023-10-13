/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import Axios from 'axios';
import constants from "../../helpers/constants";
import secureStorage from "../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");
const { userServiceBaseUrl } = constants;

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
/*  (1) GET DATA VENDORS */
export const doFetchDataVendor = async (loaderHandler, rowsPerPage, pageNumber, orderBy, orderDirection) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getVendorList?dataPerPage=${rowsPerPage}&pageNumber=${pageNumber}&sortBy=${orderBy}&sortType=${orderDirection}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    //   data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchDataVendor.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  orderDirection: PropTypes.string.isRequired,
};

/*  (2) GET LIST VENDORS FOR DROPDOWN LIST */
export const doDropdownListVendor = async (loaderHandler) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getAllVendor`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    //   data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doDropdownListVendor.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

/*  (3) ADD EDIT DATA VENDOR  */
export const doAddEditVendor = async (loaderHandler, dataHit) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/saveOrUpdateVendor`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${accessToken}`,
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
    alert(`Error Data Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doAddEditVendor.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (4) GET DATA VENDOR BY ID */
export const doGetVendorDetail = async (loaderHandler, id) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getVendorDetailById?id=${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    //   data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doGetVendorDetail.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

/*  (5) DELETE DATA VENDOR */
export const doDeleteDataVendor = async (loaderHandler, id) => {

  console.log(`+++ accessToken : ${accessToken}`);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/deleteVendorById`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`
      },
      data: {id},
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doDeleteDataVendor.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
