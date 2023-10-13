import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  nonInsurance: {
    textTransform: "none",
    borderRadius: "6px 0 0 6px",
    padding: "10px 20px",
    fontSize: "12px",
  },
  insurance: {
    textTransform: "none",
    borderRadius: "0 6px 6px 0",
    padding: "10px 20px",
    fontSize: "12px",
  },
});

const InsuranceButton = () => {
  const { root, nonInsurance, insurance } = useStyles();
  const [isSelected, setIsSelected] = useState(true);

  return (
    <Box className={root}>
      <Button
        className={nonInsurance}
        onClick={() => setIsSelected(true)}
        style={{
          backgroundColor: isSelected ? "#DC241F" : "#F4F7FB",
          color: isSelected ? "#FFFFFF" : "#BCC8E7",
          fontWeight: isSelected ? "normal" : 500,
        }}
      >
        Non Asuransi
      </Button>
      <Button
        className={insurance}
        onClick={() => setIsSelected(false)}
        style={{
          backgroundColor: !isSelected ? "#DC241F" : "#F4F7FB",
          color: !isSelected ? "#FFFFFF" : "#BCC8E7",
          fontWeight: !isSelected ? "normal" : 500,
        }}
      >
        Asuransi
      </Button>
    </Box>
  );
};

export default InsuranceButton;
