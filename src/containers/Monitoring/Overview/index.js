import React from "react";
import { makeStyles, Grid, Typography, Paper } from "@material-ui/core";
import constansts from "../../../helpers/constants";
// import Map1 from "./Partials/maps";
import PopulationFilter from "../../DashboardPopulation/PopulationFilter";
import SiteMap from "./Partials/maps";
import Summary from "./Partials/summary";
import SummaryCountProblem from "./Partials/summaryCountProblem";
import TerimalStatistik from "./Partials/TerimalStatistik";
import FilterMap from "./Partials/FilterMap";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constansts.color.dark,
  },
  tableContent: {
    marginTop: 20,
  },
  rootMap: {
    position: "relative",
    top: -50,
    zIndex: 1,
  },
});

export default function Index() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography className={classes.title}>Monitoring</Typography>
        </Grid>
      </Grid>

      <div>
        <React.Suspense fallback={<div />}>
          <SiteMap />
        </React.Suspense>
      </div>
      <div style={{ marginTop: 64 }}>
        <Summary />
        <SummaryCountProblem />
        {/* <TerimalStatistik /> */}
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
}
