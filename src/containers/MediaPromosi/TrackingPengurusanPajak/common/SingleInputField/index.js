/* Third Party Import */
import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles';
import {FormControl, OutlinedInput} from "@material-ui/core";

/* Internal Import */
import { PrimaryHard, GrayMedium, PrimaryUltrasoft } from "../../../../../assets/theme/colors";

const useStyles = makeStyles({
  customInputText: {
    margin: 0,
    backgroundColor: "#ffffff",
    border: `1px solid ${GrayMedium}`,
    borderRadius: 8,
    fontSize: "13px",
    lineHeight: "16px",
    "&.Mui-error": {
      borderColor: PrimaryHard,
      backgroundColor: PrimaryUltrasoft,
      "& fieldset": {
        backgroundColor: PrimaryHard,
        opacity: 0.1,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px",
      "&:-webkit-autofill": {
        borderRadius: "8px 0 0 8px",
      },
      "&::placeholder": {
        color: GrayMedium,
        fontStyle: "italic",
      },
    },
  },
});

function SingleInputField(props){
  const classes = useStyles();
  const {placeholder, type, value, onChange, ...others} = props;
  return(
    <FormControl style={{width: "50px"}}>
      <OutlinedInput
        {...{placeholder, type, value, onChange, ...others}}
        className={classes.customInputText}
      />
    </FormControl>
  );
}

SingleInputField.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
SingleInputField.defaultProps = {
  placeholder: "",
  type: "text"
};

export default SingleInputField;
