import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    border: "1px solid #DC241F",
    color: "#DC241F",
    textTransform: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "15px",
    backgroundColor: "#FFFFFF",
    fontWeight: 600,
  },
});

const CancelButton = () => {
  const { button } = useStyles();

  return <Button className={button}>Cancel</Button>;
};

export default CancelButton;
