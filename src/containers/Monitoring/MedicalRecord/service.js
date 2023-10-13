import React from "react";
import axios from "axios";
import secureStorage from "../../../helpers/secureStorage";

const ServiceMedicalRecord = () => {
  const baseUrl = process.env.REACT_APP_API_INFORMATION_MONITORING;
  const accessToken = secureStorage.getItem("access_token");

  const hitMedicalRecordSeverity = async () => {
    try {
      const result = axios({
        method: "GET",
        url: `${baseUrl}/medicalRecordSeverity`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result;
    } catch (error) {
      alert(`error while fetching hitMedicalRecordSeverity\n${error}`);
    }
  };

  const hitMedicalRecordFilter = async (atmId, location) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/medicalRecordFilter`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          atmId: atmId,
          location: location,
        },
      });
      return result;
    } catch (error) {
      alert(`error while fetching hitMedicalRecordFilter\n${error}`);
    }
  };

  return {
    hitMedicalRecordSeverity,
    hitMedicalRecordFilter,
  };
};

export default ServiceMedicalRecord;
