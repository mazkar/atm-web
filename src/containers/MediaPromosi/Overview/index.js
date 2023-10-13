import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid } from "@material-ui/core";
import ChartBar from "./ChartBar/index";
import TabelOverview from "./TabelOverview";
import PersentationStatus from "./PersentationStatus";
import NumberVendor from "./NumberVendor";
import VendorPajak from "./VendorPajak";

const UseStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
  },
  titleContainer: {
    marginBottom: 15,
  },
});

function index() {
  const classes = UseStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="space-between"
        className={classes.titleContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title}>Media Promosi</Typography>
        </Grid>
      </Grid>
      {/* content */}

      {/* chart 1 */}
      <Grid container direction="column" style={{ marginTop: 30 }} spacing={2}>
        <Grid item>
          <ChartBar />
        </Grid>
      </Grid>
      {/* end chart 1 */}

      {/* persentasistatus */}
      <Grid container direction="column" style={{ marginTop: 30 }} spacing={2}>
        <Grid item>
          <PersentationStatus />
        </Grid>
      </Grid>
      {/* end persentasi status */}

      {/* table and fileter */}
      <Grid container direction="column" style={{ marginTop: 30 }} spacing={2}>
        <Grid item>
          <NumberVendor />
        </Grid>
      </Grid>
      {/* end table and filter */}

      {/* vendor Pajak */}
      <Grid container direction="column" style={{ marginTop: 30 }} spacing={2}>
        <Grid item>
          <VendorPajak />
        </Grid>
      </Grid>
      {/* end vendor pajak */}
    </div>
  );
}

export default index;
