import { Box, Typography } from "@material-ui/core";
import React from "react";
import {
  InfoMedium,
  InfoSoft,
  SecondaryMedium,
  SuccessMedium,
  SuccessSoft,
  WarningMedium,
  WarningSoft,
} from "../../assets/theme/colors";

const TagCardTask = (props) => {
  let borderColor;
  let background;
  if (props.type === "Todo") {
    borderColor = WarningMedium;
    background = WarningSoft;
  } else if (props.type === "Overdue") {
    borderColor = SecondaryMedium;
    background = "#FFF9F0";
  } else if (props.type === "Doing") {
    borderColor = InfoMedium;
    background = InfoSoft;
  } else if (props.type === "Done") {
    (borderColor = SuccessMedium), (background = SuccessSoft);
  }
  return (
    <Box
      style={{
        textAlign: "center",
        border: "1px solid",
        borderColor,
        background,
        color: borderColor,
        borderRadius: 20,
        width: "max-content",
        padding: "2px 10px",
      }}
    >
      <Typography style={{ fontSize: 12, fontFamily: "Barlow" }}>
        {props.type}
      </Typography>
    </Box>
  );
};

export default TagCardTask;
