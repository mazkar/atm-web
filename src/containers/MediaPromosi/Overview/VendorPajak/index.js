import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Paper, Grid, Typography } from "@material-ui/core";
import { ReactComponent as IconNumber } from "../../../../assets/icons/duotone-red/exchange-icon.svg";
import ObjectPajak from "./ObjectPajak";
import ObjectPajakDone from "./ObjectPajakDone";
import ObjectPajakNotExtended from "./ObjectPajakNotExtended";

const UseStyles = makeStyles((theme) => ({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    //position: "relative",
    borderRadius: 10,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "15px",
    color: "#2B2F3C",
    marginLeft: 10,
  },
  box: {
    border: "1px solid #BCC8E7",
    borderRadius: 8,
    padding: 20,
    //height: "100%",
    width: "100%",
    maxHeight: "286px",
    minHeight: "250px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  box1: {
    border: "1px solid #BCC8E7",
    borderRadius: 8,
    padding: 20,
    //height: "100%",
    width: "100%",
    height: "250px",
  },
}));

function VendorPajak() {
  const classes = UseStyles();
  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          className={classes.indicator}
        >
          <Grid item>
            <div className={classes.root}>
              <Grid
                container="row"
                justifyContent="space-between"
                alignItems="
                center"
                className={classes.indicator}
              >
                <Grid item>
                  <div className={classes.col}>
                    <IconNumber />
                    <Typography
                      className={classes.title}
                      style={{ marginLeft: 10 }}
                    >
                      Tracking Pengurusan Pajak
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <Grid item xs={4}>
                <div className={classes.box1}>
                  <ObjectPajak />
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className={classes.box}>
                  <ObjectPajakDone />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 15 }}>
            <div className={classes.box}>
              <ObjectPajakNotExtended />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default VendorPajak;
