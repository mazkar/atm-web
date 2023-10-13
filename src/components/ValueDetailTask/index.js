import { Box, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Typography } from "antd";
import {
  GrayHard,
  GraySoft,
  GrayUltrasoft,
  White,
} from "../../assets/theme/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  label: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 600,
    color: GrayHard,
    marginBottom: 10,
  },
  txtValue: {
    fontFamily: "Barlow",
    fontSize: 13,
    margin: 10,
  },
  bast: {
    border: 1,
    height: 28,
    width: "80%",
    backgroundColor: GraySoft,
    borderRadius: 20,
    paddingTop: 3,
  },
  txtBast: {
    fontFamily: "Barlow",
    fontSize: 13,
    textAlign: "center",
    fontWeight: 400,
  },
});

const index = (props) => {
  const classes = useStyles();

  let valBast;
  if (props.bastSubmitStatus === true) {
    valBast = (
      <Box component={Link} className={classes.bast} to={props.href}>
        <Typography className={classes.txtBast}>{props.txtValue}</Typography>
      </Box>
    );
  } else {
    valBast = <Typography className={classes.txtValue}>-</Typography>;
  }
  return (
    <div>
      <Grid container direction="column">
        <Typography className={classes.label}>{props.label}</Typography>
        {props.bast ? (
          valBast
        ) : (
          <Box
            border={1}
            borderColor={GrayUltrasoft}
            width="100%"
            height={40}
            color={White}
            borderRadius={8}
          >
            <Typography className={classes.txtValue}>{props.value}</Typography>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default index;
