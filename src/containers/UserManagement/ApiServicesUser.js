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
/*  (1) GET DATA USERS */
export const doFetchDataUser = async (loaderHandler, rowsPerPage, pageNumber, orderBy, orderDirection) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${userServiceBaseUrl}/users?rowPerPage=${rowsPerPage}&currentPage=${pageNumber}&orderDirection=${orderDirection}&ordersBy=${orderBy}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`,
      },
    //   data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data User Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchDataUser.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  orderDirection: PropTypes.string.isRequired,
};

/*  (2) DELETE DATA USER */
export const doDeleteDataUser = async (loaderHandler, id) => {

  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${userServiceBaseUrl}/users/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
doDeleteDataUser.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

/*  (3) GET DATA VENDORS */
export const doGetVendors= async (loaderHandler) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_VENDORS}/getAllVendor`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`,
      },
      //   data: dataHit,
    });
      // console.log(
      //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
      // );
    loaderHandler(false);
    return result.data.vendorList;
  } catch (err) {
    alert(`Error Fetching Data User Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doGetVendors.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  orderDirection: PropTypes.string.isRequired,
};

/*  (4) ADD / EDIT DATA USER */
export const doAddEditUser= async (loaderHandler, reqData) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  const formData = new FormData();
  formData.append("email", reqData.email);
  formData.append("fullName", reqData.fullname);
  formData.append("phoneNumber", reqData.phoneNumber);
  formData.append("status", reqData.userStatus);
  formData.append("photoProfile", reqData.photoProfile);
  formData.append("vendorId", reqData.vendorId);
  formData.append("roleId", reqData.roleId);
  
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${userServiceBaseUrl}/users/${reqData.isEdit ? reqData.id : "register"}`,
      method: reqData.method,
      headers: {
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data User Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doAddEditUser.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
/*  (5) GET DATA USER BY ID */
export const doFetchDetailUser = async (loaderHandler, userId) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${userServiceBaseUrl}/users/${userId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`,
      },
    //   data: dataHit,
    });
    // console.log(
    //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
    // );
    loaderHandler(false);
    return result.data.data;
  } catch (err) {
    alert(`Error Fetching Data User Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchDetailUser.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

/* GET USER VENDORS BY VENDOR ID */
export const doGetVendorUsers= async (loaderHandler, vendorId) => {

  console.log('+++ vendorId doGetVendorUsers', vendorId);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_USERMANAGEMENTVENDOR}/users/vendor/${vendorId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`,
      },
    });
      // console.log(
      //   `<<< CEKPoint Hit API (B)  =>${JSON.stringify(result)}`
      // );
    loaderHandler(false);
    return result.data;
  } catch (err) {
    alert(`Error Fetching Data User Vendor ...! \n${err}`);
    loaderHandler(false);
  }
};
doGetVendorUsers.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.string.isRequired,
};
