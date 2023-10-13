import React from "react";
import { Card } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { GraySoft } from "../../../assets/theme/colors";

const GeneralCard = withStyles({
  root: {
    border: `1px solid ${GraySoft}`,
    borderRadius: 8,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
})(Card);

export default GeneralCard
