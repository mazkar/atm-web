/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import constants from "../../../../helpers/constants";
import ModalLoader from "../../../../components/ModalLoader";
import FormLocation from "./FormLocation";

const useStyles = makeStyles({
  contentHeader: {
    padding: 20,
    marginLeft: 20,
  },
  contentBody: {
    padding: 30,
  },
  contentLeft: {
    maxWidth: 520,
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: constants.color.dark,
    textShadow: "0px 6px 10px rgba(0, 0, 0, 0.08)",
  },
  widgetContainer: {
    // position: "absolute",
    // margin: 30,
    // maxWidth: 520,
    // maxHeight: 560,
    // marginTop: "0px",
  },
});

const ProgressEditPipeline = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.contentHeader}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.title} variant="h1" component="h1">
              Progress Edit Pipeline
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.contentBody}>
        <div className={classes.contentLeft}>
          <FormLocation />
        </div>
      </Box>
    </>
  );
};

ProgressEditPipeline.propTypes = {
  history: PropTypes.func.isRequired,
};

export default ProgressEditPipeline;
