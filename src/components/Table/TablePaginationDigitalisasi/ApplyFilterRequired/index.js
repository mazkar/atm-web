/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as SearchIcon } from "../../../../assets/icons/linear-red/search.svg";

function ApplyFilterRequired({rowsPerPage}) {
  //console.log("console",rowsPerPage)
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ position: "absolute", top: (37/2) * rowsPerPage, width: "98%" }}
    >
      <Grid item>
        <SearchIcon />
      </Grid>
      <Grid item>
        <Typography
          style={{
            fontSize: 15,
            fontWeight: 500,
            textAlign: "center",
            width: 190
          }}
        >
        Silahkan pilih rentang waktu terlebih dahulu
        </Typography>
      </Grid>
    </Grid>
  );
}

ApplyFilterRequired.propTypes = {};

export default ApplyFilterRequired;
