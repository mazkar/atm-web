import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import ChartBar from "./ChartBar";
import PropTypes from "prop-types";
import PieChart from "./PieChart";

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

function AssetsOverview(props) {
  const classes = UseStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item xs={12} style={{ marginBottom: 25 }}>
          <Typography className={classes.title}>Overview</Typography>
        </Grid>
        {/* chart */}
        <Grid item xs={12} style={{ marginBottom: 25 }}>
          <ChartBar />
        </Grid>
        <Grid item xs={12}>
          <PieChart />
        </Grid>
      </Grid>
    </div>
  );
}

AssetsOverview.PropTypes = {};

export default AssetsOverview;
