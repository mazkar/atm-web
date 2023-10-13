/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import Axios from 'axios';

/*  ++++++++++++++ Init Hit API Function ++++++++++++++ */
/*  (1) GET DATA DETAIL DOCUMENT & LEGALITY */
export const doFetchDocumentDetail = async (loaderHandler, dataHit) => {

// console.log(`<<< CEKPoint Hit API (A)  `);
  try {
    loaderHandler(true);
    const result = await Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getDetailDocument`,
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
doFetchDocumentDetail.propTypes = {
  loaderHandler: PropTypes.func.isRequired,
  dataHit: PropTypes.object.isRequired,
};