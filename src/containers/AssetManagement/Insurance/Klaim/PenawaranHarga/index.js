import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ReactComponent as RightIcon } from "../../../../../assets/icons/siab/chevron-right.svg";
import { ReactComponent as LeftIcon } from "../../../../../assets/icons/siab/chevron-left.svg";
import React from "react";
import constansts from "../../../../../helpers/constants";
import TopComponent from "./topComponent";
import BottomComponent from "./bottomComponent";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  titleContainer: {
    marginBottom: 25,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },

  arrowAction: {
    backgroundColor: "unset",
    padding: 0,
    borderRadius: 10,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: constansts.color.primaryUltaSoft,
    },
    "& .MuiButton-root:hover": {
      opacity: 0.6,
      backgroundColor: constansts.color.primaryUltaSoft,
    },
  },
});

const ApprovalPenawaranHarga = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container style={{ marginBottom: 20 }}>
        <Grid item xs={12} className={classes.backAction}>
          <Button onClick={() => history.push("/asset-management/inventory")}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>
        <Grid xs={12} item className={classes.titleContainer}>
          <Typography className={classes.title}>Invetory Detail</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopComponent />
        </Grid>
        <Grid item xs={12}>
          <BottomComponent />
        </Grid>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: 20,
          }}
        >
          <Button variant="outlined" className={classes.arrowAction}>
            <LeftIcon />
          </Button>
          <Typography style={{ fontWeight: 600, margin: 5, fontSize: 20 }}>
            Approval 1
          </Typography>
          <Button variant="outlined" className={classes.arrowAction}>
            <RightIcon />
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default ApprovalPenawaranHarga;
