import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { PrimaryHard } from "../../../assets/theme/colors";

export const OutlinedButton = withStyles({
  root: {
    borderRadius: 8,
    border: `1px solid ${PrimaryHard}`,
    background: "white",
    color: PrimaryHard,
    padding: "10px 20px",
    fontSize: 15,
    fontWeight: 500,
    textTransform: "capitalize",
    fontFamily: "Barlow",
    boxShadow: "0px 6px 6px 0px rgba(220, 36, 31, 0.1)",
    "&:hover": {
      border: "1px solid white",
    },
  },
})(Button);

export const ContainedButton = withStyles({
  root: {
    borderRadius: 8,
    background: PrimaryHard,
    color: "white",
    padding: "10px 20px",
    fontSize: 15,
    fontWeight: 500,
    textTransform: "capitalize",
    fontFamily: "Barlow",
    boxShadow: "0px 6px 6px 0px rgba(220, 36, 31, 0.1)",
  },
})(Button);
