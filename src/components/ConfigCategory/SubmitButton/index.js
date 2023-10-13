import React from "react";
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

const SubmitButton = (props) => {
  const classes = useStyles();

  return <Button onClick={props.onSubmitHandler} className={classes.button} style={{ background: "#DC241F", }}>{props.children}</Button>;
};

export default SubmitButton;
