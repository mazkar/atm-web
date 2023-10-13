import React, { useState } from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Grid, Paper, Collapse } from "@material-ui/core";
import Donut from "./Donut";
import { ReactComponent as MachineIcon } from "../../../../assets/icons/general/calculator_overview.svg";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const UseStyles = makeStyles({
  boxPaper: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  titleChart: {
    fontFamily: "Barlow",
    fontWeight: 500,
    color: "#2B2F3C",
    marginLeft: 10,
  },
});

const dummyByATM = [
  {
    status: "Gudang",
    value: 3329,
  },
  {
    status: "Inventory Asset",
    value: 20201,
  },
  {
    status: "ATM di Lokasi",
    value: 14257,
  },
];

const dummyByUPS = [
  {
    status: "Gudang",
    value: 3329,
  },
  {
    status: "Inventory Asset",
    value: 20201,
  },
  {
    status: "ATM di Lokasi",
    value: 14257,
  },
];

const dummyByDVR = [
  {
    status: "Gudang",
    value: 4029,
  },
  {
    status: "Inventory Asset",
    value: 20201,
  },
  {
    status: "ATM di Lokasi",
    value: 14257,
  },
];

function PieChart(props) {
  const classes = UseStyles();
  const [collapsed, setCollapsed] = useState(true);

  const handleChange = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Paper className={classes.boxPaper} elevation={1}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <div className={classes.col}>
            <MachineIcon />
            <Typography className={classes.titleChart}>
              Asset Population
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <IconButton aria-label="drop-down" onClick={handleChange}>
            {collapsed ? (
              <KeyboardArrowUpIcon style={{ color: "#DC241F" }} />
            ) : (
              <KeyboardArrowDownIcon style={{ color: "#DC241F" }} />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={collapsed}>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginTop: 18 }}
          spacing={1}
        >
          <Grid item lg={4} md={6} sm={12}>
            <Donut title="By ATM" data={dummyByATM} />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <Donut title="By UPS" data={dummyByUPS} />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <Donut title="By DVR" data={dummyByDVR} />
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
}

export default PieChart;
