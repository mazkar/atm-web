import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import { PrimaryHard } from "../../../assets/theme/colors";

const UseStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  paramButton: {
    width: "max-content",
    color: PrimaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
});

export default function overviewProjectManagement() {
  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>Overview</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
