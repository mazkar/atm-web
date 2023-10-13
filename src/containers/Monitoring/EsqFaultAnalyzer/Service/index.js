import React from "react";
import axios from "axios";
import secureStorage from "../../../../helpers/secureStorage";

const ServiceEsqFaultAnalyzer = () => {
  const accessToken = secureStorage.getItem("access_token");
  const baseUrl = process.env.REACT_APP_API_INFORMATION_MONITORING;
  const hitSummaryEsqFaultAnalyzer = async (
    pageNumber,
    dataPerPage,
    sortBy,
    sortType
  ) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/summaryListEsqAnalyzer`,
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
        },
      });
      return result;
    } catch (error) {
      alert(`error while fetching SummaryEsqFaultAnalyzer\n${error}`);
      return error;
    }
  };

  const hitFilterEsqFaultAnalyzer = async (filter, atmId, problemCategory) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/filterEsqFaultAnalyzer`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          filter: filter,
          atmId: atmId,
          problemCategory: problemCategory,
        },
      });

      return result;
    } catch (error) {
      alert(`error while fetching filterEsqFaultAnalyzer\n${error}`);
      return error;
    }
  };

  const hitDetailEsqAnalyzer = async (id) => {
    try {
      const result = await axios({
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        url: `${baseUrl}/getDetailEsqAnalyzer?id=${id}`,
      });
      return result;
    } catch (error) {
      alert(`error while fething detailEsqAnalyzer\n${error}`);
      return error;
    }
  };

  const hitExportEsqFaultAnalizer = async (id, daily, monthly) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${baseUrl}/exportEsqFaultAnalizer`,
        header: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          id: id,
          isDaily: daily,
          isMonthly: monthly,
        },
        responseType: "blob",
      });
      // return result;
      console.log(result);
      const blob = new Blob([result.data], {
        type: result.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `EsqFaultAnalyzer-id-${id}.xlsx`;
      link.click();
      return result.data;
    } catch (error) {
      alert(`error while Export to Excel\n${error}`);
      return error;
    }
  };

  return {
    hitSummaryEsqFaultAnalyzer,
    hitFilterEsqFaultAnalyzer,
    hitDetailEsqAnalyzer,
    hitExportEsqFaultAnalizer,
  };
};

export default ServiceEsqFaultAnalyzer;

// const res = [
//   {
//     CR: {
//       flm: "SSI",
//       slm: "Diebold Nixdorf",
//       jarkom: "LINTASARTA",
//       date: [
//         {
//           id: 1,
//           problemPerDate: 20,
//         },
//         {
//           id: 2,
//           problemPerDate: 10,
//         },
//         {
//           id: 3,
//           problemPerDate: 15,
//         },
//         {
//           id: 4,
//           problemPerDate: 5,
//         },
//       ],
//       problem: [
//         {
//           name: "Magnetic Card Read Write Warning",
//           flm: "SSI",
//           slm: "Diebold Nixdorf",
//           jarkom: "LINTASARTA",
//           date: [
//             {
//               id: 1,
//               problemPerDate: 20,
//             },
//             {
//               id: 2,
//               problemPerDate: 10,
//             },
//             {
//               id: 3,
//               problemPerDate: 15,
//             },
//             {
//               id: 4,
//               problemPerDate: 5,
//             },
//           ],
//         },
//         {
//           name: "Magnetic Card Read Write Alarm",
//           flm: "SSI",
//           slm: "Diebold Nixdorf",
//           jarkom: "LINTASARTA",
//           date: [
//             {
//               id: 1,
//               problemPerDate: 20,
//             },
//             {
//               id: 2,
//               problemPerDate: 10,
//             },
//             {
//               id: 3,
//               problemPerDate: 15,
//             },
//             {
//               id: 4,
//               problemPerDate: 5,
//             },
//           ],
//         },
//       ],
//     },
//   },
// ];

// const res2 = [
//     {
//       CR: {
//         flm: "SSI",
//         slm: "Diebold Nixdorf",
//         jarkom: "LINTASARTA",
//         problemPerDate: [20, 10, 15, 5],
//         problem: [
//           {
//             name: "Magnetic Card Read Write Warning",
//             problemPerDate: [20, 10, 15, 5],
//           },
//           {
//             name: "Magnetic Card Read Write Alarm",
//             problemPerDate: [20, 10, 15, 5],
//           },
//         ],
//       },
//     },
//     {
//       CO: {
//         flm: "SSI",
//         slm: "Diebold Nixdorf",
//         jarkom: "LINTASARTA",
//         problemPerDate: [20, 10, 15, 5],
//         problem: [
//           {
//             name: "Magnetic Card Read Write Warning",
//             problemPerDate: [20, 10, 15, 5],
//           },
//           {
//             name: "Magnetic Card Read Write Alarm",
//             problemPerDate: [20, 10, 15, 5],
//           },
//         ],
//       },
//     },
//   ];
