import React from "react";
import axios from "axios";
import secureStorage from "../../../helpers/secureStorage";

const ServiceQueryProblem = () => {
  const baseUrl = process.env.REACT_APP_API_INFORMATION_MONITORING;
  const accessToken = secureStorage.getItem("access_token");
  const hitQueryProblemOverview = async (data) => {
    const {
      pageNumber,
      dataPerPage,
      sortBy,
      sortType,
      atmId,
      lokasi,
      flm,
      slm,
      jarkom,
      durasi,
      downTime,
      upTime,
      startDate,
      endDate,
    } = data;
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/queryProblemOverview`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          pageNumber: pageNumber,
          dataPerPage: dataPerPage,
          sortBy: sortBy,
          sortType: sortType,
          atmId: atmId,
          lokasi: lokasi,
          flm: flm,
          slm: slm,
          jarkom: jarkom,
          durasi: durasi,
          downTime: downTime,
          upTime: upTime,
          startDate: startDate,
          endDate: endDate,
        },
      });
      return result;
    } catch (error) {
      alert(`error while fetching Query Problem Overview\n${error}`);
      return error;
    }
  };

  const hitQueryProblemOverviewDetail = async (data, atmId) => {
    const {
      pageNumber,
      dataPerPage,
      sortBy,
      sortType,
      lokasi,
      flm,
      slm,
      jarkom,
      kategori,
      problem,
      durasi,
      downTime,
      upTime,
      startDate,
      endDate,
    } = data;
    console.log(data);
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/queryProblemOverviewDetail`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          pageNumber: pageNumber,
          dataPerPage: dataPerPage,
          sortBy: sortBy,
          sortType: sortType,
          atmId: atmId,
          lokasi: lokasi,
          flm: flm,
          slm: slm,
          jarkom: jarkom,
          kategori: kategori,
          problem: problem,
          durasi: durasi,
          downTime: downTime,
          upTime: upTime,
        },
      });
      return result;
    } catch (error) {
      alert(`error while fetching Query Problem Overview Detail\n${error}`);
      return error;
    }
  };

  const hitExportQueryProblem = async (
    loaderHandler,
    type,
    sortBy,
    sortType,
    id
  ) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/exportQueryProblem`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          type: type,
          sortBy: sortBy,
          sortType: sortType,
        },
        responseType: "blob",
      });
      console.log(result);
      const blob = new Blob([result.data], {
        type: result.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `QueryProblem-atmId-${id}.xlsx`;
      link.click();
      loaderHandler(false);
      return result.data;
    } catch (error) {
      alert(`error while fetching Export Query Problem\n${error}`);
      loaderHandler(false);
    }
  };

  return {
    hitQueryProblemOverview,
    hitQueryProblemOverviewDetail,
    hitExportQueryProblem,
  };
};

export default ServiceQueryProblem;
