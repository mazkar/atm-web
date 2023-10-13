import moment from "moment";

const useDateFormatter = (dateString, fromDateFormat, toDateFormat) => {
  return moment(dateString, fromDateFormat).format(toDateFormat).toString();
};

function formatDateReplace(dateUnix){
  return moment(dateUnix).isValid() ? moment(dateUnix).format('DD/MM/YYYY') : null
}

export default useDateFormatter;
export {formatDateReplace}