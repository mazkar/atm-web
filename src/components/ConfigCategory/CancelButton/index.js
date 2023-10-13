import React from "react";
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

const CancelButton = (props) => {
  const classes = useStyles();

  return <Button onClick={props.onCancelHandler} className={classes.button}>{props.children}</Button>;
};

export default CancelButton;
