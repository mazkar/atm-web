import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const Barlow = withStyles({
  root: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
})(Typography);

export default Barlow;
