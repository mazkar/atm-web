import { InputBase, makeStyles, withStyles } from "@material-ui/core";
import constansts from "../../../../../../helpers/constants";
import React from "react";

const CustomInput = withStyles((theme) => ({
  root: {
    width: "100%",
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 8,
    fontFamily: "Barlow",
    fontSize: 13,
    padding: "16px 12px",
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      border: `1px solid ${constansts.color.primaryMedium}`,
      backgroundColor: constansts.color.white,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const InputMessage = (props) => {
  const { placeholder, ...other } = props;
  return <CustomInput placeholder={placeholder} {...other} />;
};

export default InputMessage;
