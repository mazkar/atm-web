/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
import Axios from "axios";
import secureStorage from "../../helpers/secureStorage";

const accessToken = secureStorage.getItem("access_token");

const baseUrl = process.env.REACT_APP_API_IENVIRONTMENT_SERVICE;

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
const headersSetting = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${accessToken}`,
};

export const doGetCategoryEnvironmentPremises = async (loaderHandler) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getCategoryEnvironmentPremises`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};

doGetCategoryEnvironmentPremises.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
};

export const doAddOrUpdateCategory = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IENVIRONTMENT_SERVICE}/saveAndUpdateCategoryEnvironmentPremises`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};
doAddOrUpdateCategory.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
};

export const doDeleteCategory = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IENVIRONTMENT_SERVICE}/removeCategoryEnvironmentPremises`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};
doDeleteCategory.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
};

export const doDeleteSubCategory = async (loaderHandler, dataHit) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_IENVIRONTMENT_SERVICE}/removeSubCategoryEnvironmentPremises`,
      method: "POST",
      headers: headersSetting,
      data: dataHit,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Terjadi Kesalahan: ! \n${err}`);
    loaderHandler(false);
  }
};
doDeleteSubCategory.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
};

export const doGetDetailEnvironmentPremises = async (loaderHandler, id) => {
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${baseUrl}/getSubCategoryEnvironmentPremises?id=${id}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (err) {
    alert(`Error Fetching Data Implementation New...! \n${err}`);
    loaderHandler(false);
  }
};

export const doGetTopTenVendor = async (loaderHandler) => {
  try {
    const result = await Axios({
      url: `${baseUrl}/getTopTenVendor`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`Error Fetching Data Top Ten Vendor...!\n${error}`);
    loaderHandler(false);
  }
};

export const doGetVisitPercentageOverview = async (loaderHandler, year) => {
  try {
    const result = await Axios({
      url: `${baseUrl}/visitPercentageOverview?year=${year}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`Error Fetching Data Percentage Overview\n${error}`);
    loaderHandler(false);
  }
};

export const doGetOverviewSurveyVendor = async (
  loaderHandler,
  pageNumber = 0,
  dataPerPage = 10,
  sortBy = "id",
  sortType = "ASC",
  vendorName
) => {
  try {
    const result = await Axios({
      url: `${baseUrl}/overviewSurveyVendor`,
      method: "POST",
      headers: headersSetting,
      data: {
        pageNumber: pageNumber,
        dataPerPage: dataPerPage,
        sortBy: sortBy,
        sortType: sortType,
        vendorName: vendorName,
      },
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`Error Fetching Data SurveyVendor\n${error}`);
    loaderHandler(false);
  }
};

export const doGetOverviewElectricity = async (loaderHandler, month) => {
  try {
    const result = await Axios({
      url: `${baseUrl}/overviewElectricity?month=${month}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`Error Fetching Data Electricity\n${error}`);
    loaderHandler(false);
  }
};

export const doGetOverviewPraAndPasca = async (loaderHandler, type) => {
  try {
    const result = await Axios({
      url: `${baseUrl}/overviewPraAndPasca?type=${type}`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`Error Fetching Data Pra & Pasca Bayar\n${error}`);
    loaderHandler(false);
  }
};

export const doGetSummaryOverview = async (loaderHandler) => {
  try {
    const result = await Axios({
      url: `${baseUrl}/summaryOverview`,
      method: "GET",
      headers: headersSetting,
    });
    loaderHandler(false);
    return result;
  } catch (error) {
    alert(`Error Fetching Summary Overview\n${error}`);
    loaderHandler(false);
  }
};

doGetCategoryEnvironmentPremises.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
};

doGetDetailEnvironmentPremises.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

doGetTopTenVendor.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

doGetVisitPercentageOverview.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
};

doGetOverviewSurveyVendor.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  pageNumber: PropTypes.string.isRequired,
  dataPerPage: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
};

doGetOverviewElectricity.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  month: PropTypes.string.isRequired,
};

doGetOverviewPraAndPasca.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

doGetSummaryOverview.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};
