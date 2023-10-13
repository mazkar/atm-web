/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import Axios from 'axios';
import useThousandSeparator from '../../../helpers/useThousandSeparator';
import explodeArray from '../../../helpers/explodeArray';
import useRupiahConverterSecondary from '../../../helpers/useRupiahConverterSecondary';
// HELPER

const format = useRupiahConverterSecondary

// const newApproverList = (list) => {
//   const newArrange = [];
//   list.map((item)=>{ 
//     // console.log("+++ newApprover",item.toLowerCase());
//     if(item.toLowerCase().includes('deden')){
//       // console.log("+++ newApprover include deden");
//       newArrange.splice(0, 0,item);
//     }else if(item.toLowerCase().includes('trisna')){
//       newArrange.splice(1, 0,item);
//     }else if(item.toLowerCase().includes('bambang')){
//       newArrange.splice(2, 0,item);
//     }
//   });
//   return newArrange;
// };

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
/*  (1) New Approval */
export const doFetchDataApprovalNew = async (loaderHandler, loadDataHandler, dataHit) => {
  let dataPage = {};
  const dataToSet = [];
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(false);
    loadDataHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getApprovalList`,
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
      const dataPre = result.data.approvalList;
      dataPage = {
        "totalPages": result.data.totalPages,
        "totalElements": result.data.totalElements
      };
      dataPre.map((row) => {
        const actionData = [
          {name: 'Detail', url:`${window.location.origin.toString()}/approval/detail/${row.idSiteNewAtm}`}
        ];
        const { negotiationDealCostList : negoCostList, priceReduceList: priceRedNegoList } = row
        const newRow = {
          id: row.idSiteNewAtm,
          idLokasi: row.locationId,
          lokasi: row.locationName,
          harga: listDownPrices(negoCostList),
          penurunan: priceRedNegoList,
          category: row.category,
          status: row.approvalStatus,
          sla: row.sla,
          requester: row.requester,
          approver: row.approverList,
          action : actionData,
        };
        dataToSet.push(newRow);
      });
    }catch{
      loaderHandler(false);
      loadDataHandler(false);
      alert(`Error Re-Construct Data Approval New...!`);
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
    alert(`Error Fetching Data Data Approval New...! \n${err}`);
    loaderHandler(false);
    loadDataHandler(false);
  }
};
doFetchDataApprovalNew.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

// (2) ReNewal Approval
export const doFetchDataApprovalRenewal = async (loaderHandler, loadDataHandler, dataHit) => {
  let dataPage = {};
  const dataToSet = [];
  try {
    loaderHandler(false);
    loadDataHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getApprovalRenewal`,
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
      const dataPre = result.data.approvalRenewal;
      dataPage = {
        "totalPages": result.data.totalPages,
        "totalElements": result.data.totalElements
      };
      dataPre.map((row) => {
        const actionData = [
          {name: 'Detail', url:`${window.location.origin.toString()}/approval/detail/${row.id}`}
        ];
        const { negotiationDealCostList : negoCostList } = row
        const newRow = {
          id: row.id,
          atmId: row.atmId,
          lokasi: row.locationName,
          harga: listDownPrices(negoCostList),
          renewalCagr: row.renewalCagr != null ? row.renewalCagr.toFixed(2) : '-',
          category: row.category,
          status: row.approvalStatus,
          sla: row.sla,
          requester: row.requester,
          approver: row.approverList,
          action : actionData
        };
        dataToSet.push(newRow);
      });
    }catch{
      loaderHandler(false);
      loadDataHandler(false);
      alert(`Error Re-Construct Data Approval ReNewal...!`);
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
    alert(`Error Fetching Data Data Approval ReNewal...! \n${err}`);
    loaderHandler(false);
    loadDataHandler(false);
  }
};
doFetchDataApprovalRenewal.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

// (3) Reopen Approval
export const doFetchDataApprovalReopen = async (loaderHandler, loadDataHandler, dataHit) => {
  let dataPage = {};
  const dataToSet = [];
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(false);
    loadDataHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getApprovalReopen`,
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
          {name: 'Detail', url:`${window.location.origin.toString()}/approval/detail/${row.id}`}
        ];
        const { negotiationDealCostList : negoCostList, priceRedNegoList } = row
        const explodedPrices = explodeArray(negoCostList)
        const newRow = {
          id: row.id,
          locationId: row.locationId,
          lokasi: row.newLocation,
          harga: explodedPrices ? listDownPrices(explodedPrices) : ['-'],
          penurunan: (priceRedNegoList),
          category: row.modelTeam,
          status: row.approvalStatus,
          sla: row.sla,
          requester: row.requester,
          approver: row.approvalApprover,
          action : actionData
        };
        dataToSet.push(newRow);
      });
    }catch{
      loaderHandler(false);
      loadDataHandler(false);
      alert(`Error Re-Construct Data Approval Reopen...!`);
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
    alert(`Error Fetching Data Data Approval Reopen...! \n${err}`);
    loaderHandler(false);
    loadDataHandler(false);
  }
};
doFetchDataApprovalReopen.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

// (4) Termin Approval
export const doFetchDataApprovalTermin = async (loaderHandler, loadDataHandler, dataHit) => {
  let dataPage = {};
  const dataToSet = [];
  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(false);
    loadDataHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getApprovalTermin`,
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
          {name: 'Detail', url:`${window.location.origin.toString()}/approval/detail/${row.id}`}
        ];
        const newRow = {
          id: row.id,
          atmId: row.atmId,
          lokasi: row.newLocation,
          casa: useThousandSeparator(row.casa),
          transaksi: useThousandSeparator(row.transaction),
          revenue: format(row.revenue),
          category: row.category,
          status: row.approvalStatus,
          reason: row.terminReason,
          requester: row.requester,
          approver: row.approvalApprover,
          action : actionData
        };
        dataToSet.push(newRow);
      });
    }catch{
      loaderHandler(false);
      loadDataHandler(false);
      alert(`Error Re-Construct Data Approval Termin...!`);
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
    alert(`Error Fetching Data Data Approval Termin...! \n${err}`);
    loaderHandler(false);
    loadDataHandler(false);
  }
};
doFetchDataApprovalTermin.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
};

/*  (5) GET DATA DETAIL APPROVAL */
export const doFetchDataApprovalDetail = async (loaderHandler, dataHit) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getDetailApproval`,
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
    alert(`Error Fetching Data Approval Detail...! \n${err}`);
    loaderHandler(false);
  }
};
doFetchDataApprovalDetail.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (6) APPROVE APPROVAL */
export const doApproveApproval = async (loaderHandler, dataHit) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/approveApproval`,
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
    alert(`Error Approve Data Approval...! \n${err}`);
    loaderHandler(false);
  }
};
doApproveApproval.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

/*  (7) REJECT APPROVAL */
export const doRejectApproval = async (loaderHandler, dataHit) => {

  // console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/rejectApproval`,
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
    alert(`Error Reject Data Approval...! \n${err}`);
    loaderHandler(false);
  }
};
doRejectApproval.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};

// ++++++++++++++ END Init Hit API Function ++++++++++++++ 

function listDownPrices(arr){
  return arr?.map((val,i)=>{
    const formatted = format(val)
    return formatted
  })
}