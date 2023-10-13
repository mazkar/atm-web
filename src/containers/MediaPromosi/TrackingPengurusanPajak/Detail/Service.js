import React from "react";
import axios from "axios";

const ServiceDetailTrackingPajak = () => {
  const fetchDataDetail = async (id, loaderHandler) => {
    loaderHandler(true);
    try {
      // loaderHandler(true)
      const result = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_MONITORING}/getDetailTaxVendor?id=${id}`,
      });
      loaderHandler(false);
      return result.data;
    } catch (error) {
      loaderHandler(false);
      alert(`error while fetching Data\n${error}`);
    }
  };

  const doHitUpdateOrderNewTax = async (reqBody, loaderHandler, popUpOpen) => {
    const {
      id,
      status,
      startTax,
      endTax,
      taxValue,
      vendorId,
      remark,
      orderType,
      signageAvailable,
      signageSizeLook,
      mediaSignageSizeOne,
      mediaSignageSizeTwo,
      mediaSignageSizeThree,
      mediaSignageSizeFour,
      signageMediaOne,
      signageMediaTwo,
      signageMediaThree,
      signageMediaFour,
    } = reqBody;
    try {
      const result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_MONITORING}/saveOrUpdateOrderNewTax`,
        data: {
          id: id,
          status: status,
          startTax: startTax,
          endTax: endTax,
          taxValue: taxValue,
          vendorId: vendorId,
          remark: remark,
          orderType: orderType,
          signageAvailable: signageAvailable,
          signageSizeLook: signageSizeLook,
          mediaSignageSizeOne: mediaSignageSizeOne,
          mediaSignageOne: signageMediaOne,
          mediaSignageSizeTwo: mediaSignageSizeTwo,
          mediaSignageTwo: signageMediaTwo,
          mediaSignageSizeThree: mediaSignageSizeThree,
          mediaSignageThree: signageMediaThree,
          mediaSignageSizeFour: mediaSignageSizeFour,
          mediaSignageFour: signageMediaFour,
        },
      });
      loaderHandler(false);
      popUpOpen(true);
      return result;
    } catch (error) {
      alert(`error while assign to vendor\n${error}`);
      loaderHandler(false);
      console.log(error);
      return reqBody;
    }
  };

  return {
    fetchDataDetail,
    doHitUpdateOrderNewTax,
  };
};

export default ServiceDetailTrackingPajak;
