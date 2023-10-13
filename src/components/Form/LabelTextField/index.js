/*
REUSABLE LABEL & TEXT FIELD COMPONENT
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  OutlinedInput,
  FormHelperText,
  Typography,
  InputAdornment
} from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
  PrimaryUltrasoft,
} from "../../../assets/theme/colors";

const useStyles = makeStyles({
  label: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "13px",
    marginBottom: "5px",
  },
  inputText: {
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
    "& .MuiSvgIcon-root": {
      fill: PrimaryHard,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: GrayUltrasoft,
    },
    "& .MuiOutlinedInput-input": {
      padding: "16px 0 16px 12px",
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

const LabelTextField = (props) => {
  const {
    label,
    placeholder,
    icon,
    type,
    value,
    onChange,
    onBtnClick,
    isBtnDisabled,
    error,
    helperText,
    currencyField,
    height,
    style,
    endIcon,
    ...others
  } = props;
  const classes = useStyles();
  return (
    <>
      {label && (
        <Typography className={classes.label}>{label}</Typography>
      )}
      <FormControl error={error} fullWidth>
        <OutlinedInput
          {...{ type, placeholder, value, onChange, error, ...others }}
          classes={{ root: classes.inputText }}
          style={{ ...style, height }}
          startAdornment={
            currencyField ? (
              <InputAdornment position="start">Rp</InputAdornment>
            ) : (
              ""
            )
          }
          endAdornment={
            endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>
          }
        />
        {error && helperText && (
          <FormHelperText style={{ color: PrimaryHard }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

LabelTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  currencyField: PropTypes.bool,
  height: PropTypes.string,
  endIcon: PropTypes.any,
};

LabelTextField.defaultProps = {
  label: "",
  placeholder: "",
  type: "text",
  icon: "",
  value: "",
  error: false,
  helperText: "",
  currencyField: false,
  height: "auto"
};

export default LabelTextField;
