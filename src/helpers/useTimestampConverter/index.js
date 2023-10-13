import moment from "moment";
import PropTypes from "prop-types";

const useTimestampConverter = (timestamp, format = "DD/MM/YYYY hh:mm:ss") => {
  if(timestamp){
    return moment.unix(timestamp).format(format);
  }
  return "";
};

useTimestampConverter.propTypes = {
  timestamp: PropTypes.number.isRequired,
};

export default useTimestampConverter;