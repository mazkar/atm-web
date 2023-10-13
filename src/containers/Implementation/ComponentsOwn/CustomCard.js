import React from "react";
import { Typography } from "@material-ui/core";
import { ReactComponent as CalcIcon } from "../../../assets/icons/whiteIcons/calculator.svg";
import { Dark, PrimaryHard } from "../../../assets/theme/colors";

const CustomCard = ({ title, value }) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: PrimaryHard,
          borderRadius: "10px 0 0 10px",
          padding: 12,
          display: "flex",
          alignItems: "center",
        }}
      >
        <CalcIcon />
      </div>
      <div style={{ padding: 15, flexGrow: 1, overflow: "hidden" }}>
        <Typography
          style={{
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "22px",
            color: Dark,
            marginBottom: 12,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography
          style={{
            fontWeight: "500",
            fontSize: "30px",
            lineHeight: "36px",
            textAlign: "right",
            color: Dark,
          }}
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};

export default CustomCard;
