import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";

const AvatarBox = withStyles({
  root: {
    borderRadius: 9999,
    border: "2px solid #FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
})(Box);

export default AvatarBox;
