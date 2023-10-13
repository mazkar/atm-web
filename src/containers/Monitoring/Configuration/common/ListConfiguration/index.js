/* eslint-disable react/forbid-prop-types */
/* Third Party Import */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

/* Internal Import */
import RowData from "./Row";
import LoadingView from "../../../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: {
    border: "1px solid #BCC8E7",
    borderRadius: "10px",
    height: "350px",
    overflowY: "scroll",
  },
});

const ListConfiguration = ({ data, type,loadData}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loadData ? (
        <LoadingView />
      ) : (
        <>
          {data.map((item) => (
            <RowData data={item} type={type} />
          ))}
        </>
      )}
    </div>
  );
};

ListConfiguration.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string.isRequired,
};

ListConfiguration.defaultProps = {
  data: [
    {
      title: "Default - 1",
      subtitle: "Subtitle Default - 1",
      duration: "Default Duration",
    },
  ],
};

export default ListConfiguration;
