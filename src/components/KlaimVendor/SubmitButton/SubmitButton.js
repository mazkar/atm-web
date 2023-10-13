import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    color: "#FFFFFF",
    textTransform: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "15px",
    fontWeight: 600,
  },
});

const SubmitButton = () => {
  const { button } = useStyles();

  return <Button className={button} style={{ background: "#DC241F", }}>Simpan</Button>;
};

export default SubmitButton;
