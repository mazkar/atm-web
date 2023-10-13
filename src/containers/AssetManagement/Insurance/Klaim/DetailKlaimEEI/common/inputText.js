import { InputBase, makeStyles, withStyles } from "@material-ui/core";
import constansts from "../../../../../../helpers/constants";
import React from "react";
import { Typography } from "@mui/material";

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
    fontStyle: "italic",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      fontStyle: "normal",
      borderRadius: 8,
      border: `1px solid ${constansts.color.primaryMedium}`,
      backgroundColor: constansts.color.white,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const InputText = (props) => {
  const { withLabel = false, label, placeholder, ...other } = props;
  return (
    <div>
      {withLabel && (
        <Typography
          style={{
            fontFamily: "Barlow",
            fontWeight: 400,
            color: constansts.color.dark,
            fontSize: 15,
            marginBottom: 5,
          }}
        >
          {label}
        </Typography>
      )}
      <CustomInput placeholder={placeholder} {...other} />
    </div>
  );
};

export default InputText;
