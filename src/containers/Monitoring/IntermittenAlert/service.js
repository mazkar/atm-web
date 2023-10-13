import React from "react";
import axios from "axios";
import secureStorage from "../../../helpers/secureStorage";

const ServiceIntermittenAlert = () => {
  const accessToken = secureStorage.getItem("access_token");
  const baseUrl = process.env.REACT_APP_API_INFORMATION_MONITORING;

  const hitIntermittenDetail = async (atmId) => {
    try {
      const result = await axios({
        method: "GET",
        url: `${baseUrl}/getIntermittenDetail?atmId=${atmId}`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return alert(`error while fetching data intermittenDetail\n${error}`);
    }
  };

  const hitProblemDetailIntermitten = async (
    dataPerPage,
    pageNumber,
    sortType,
    atmId,
    problem
  ) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/getProblemDetailIntermitten`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          dataPerPage: dataPerPage,
          pageNumber: pageNumber,
          sortType: sortType,
          atmId: atmId,
          problem: problem,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return alert(
        `error while fething data problemDetailIntermitten\n${error}`
      );
    }
  };

  const hitProblemList = async (atmId) => {
    try {
      const result = await axios({
        method: "GET",
        url: `${baseUrl}/problemDetailIntermitten?atmId=${atmId}`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return alert(`error while getting list Problem\n${error}`);
    }
  };

  const hitDraftEmailIntermitten = async (atmId) => {
    try {
      const result = await axios({
        method: "GET",
        url: `${baseUrl}/draftEmailIntermitten?atmId=${atmId}`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return alert(`error while hitDraftEmailIntermitten\n${error}`);
    }
  };

  const sendEmailIntermitten = async (data) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/emailIntermitten`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          atmId: data.atmId,
          recepient: data.recepient,
          ccSender: data.ccSender,
          subject: data.subject,
          vendorName: data.vendorName,
          vendorAddress: data.vendorAddress,
          vendorEmail: data.vendorEmail,
          vendorTelephone: data.vendorTelephone,
          atmLocation: data.atmLocation,
          strProblem: data.strProblem,
        },
      });
    } catch (error) {
      console.log(error);
      return alert(`error while sending email\n${error}`);
    }
  };

  return {
    hitIntermittenDetail,
    hitProblemDetailIntermitten,
    hitProblemList,
    hitDraftEmailIntermitten,
    sendEmailIntermitten,
  };
};

export default ServiceIntermittenAlert;
