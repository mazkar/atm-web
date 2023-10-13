import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Typography,
  Button,
  FormHelperText,
  Grid,
} from "@material-ui/core";

// internal
import { ReactComponent as LogoLogin } from "../../../../assets/images/logo-cimb-niaga.svg";
import LoginMap from "../../../../assets/images/map-login.svg";
import { ReactComponent as ExclamationIcon } from "../../../../assets/icons/duotone-red/exclamation-circle.svg";
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
  GrayHard,
  PrimaryUltrasoft,
} from "../../../../assets/theme/colors";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    padding: 40,
    backgroundColor: GrayUltrasoft,
    display: "flex",
    flexDirection: "column",
  },
  leftLayout: {
    alignContent: "center",
    justifyContent: "center",
  },
  imgIcon: {
    width: 80,
    height: 80,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  leftInner: {
    backgroundColor: "white",
    padding: 30,
    background: "white",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "15px",
  },
  inputText: {
    margin: 0,
    // backgroundColor: GrayUltrasoft,
    width: "340px",
    height: "48px",
    border: `1px solid ${GrayMedium}`,
    borderRadius: 10,
    fontSize: "14px",
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
      padding: "16px 0 16px 12px",
      "&:-webkit-autofill": {
        borderRadius: "8px 0 0 8px",
      },
      "&::placeholder": {
        color: "#8D98B4",
        fontStyle: "italic",
        fontSize: 13,
        fontWeight: 400,
      },
    },
  },
  btnRoot: {
    borderRadius: "10px",
    padding: "10px 18px",
    width: 340,
    height: 40,
    backgroundColor: PrimaryHard,
    "&:hover": {
      backgroundColor: PrimaryHard,
    },
  },
  btnDisabled: {
    background: GrayMedium,
  },
  btnLabel: {
    fontWeight: 600,
    fontSize: "17px",
    lineHeight: "20px",
    color: "white",
    textTransform: "capitalize",
  },
  copyright: {
    fontSize: "13px",
    lineHeight: "16px",
    color: GrayHard,
    textAlign: "center",
  },
});

const ExpiredPage = () => {
  const classes = useStyles();
  const history = useHistory();

  function handleClose(){
    history.go(0);
  }
  return (
    <div className={classes.container}>
      <div>
        <LogoLogin />
      </div>
      <div style={{ flex: "380px", display: "flex", alignItems: "center" }}>
        <Row
          style={{
            width: "100%",
            backgroundImage: `url('${LoginMap}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center left 380px",
          }}
        >
          <Col flex="400px" className={classes.leftLayout}>
            <div className={classes.leftInner}>
              <Typography
                style={{
                  fontSize: "23px",
                  lineHeight: "32px",
                  fontWeight: 600,
                  // padding: "10px 0px",
                }}
              >
                Verification Link Expired
              </Typography>
              <Typography
                style={{
                  fontSize: "23px",
                  lineHeight: "32px",
                  fontWeight: 400,
                  color: "#2B2F3C",
                  // padding: "20px 0px",
                }}
              >
                The verification link has been expired.Please request new
                verification below
              </Typography>
              <form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 40,
                    marginTop: 40,
                  }}
                >
                  <ExclamationIcon className={classes.imgIcon} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <div>
                    <Button
                      classes={{
                        root: classes.btnRoot,
                        label: classes.btnLabel,
                        disabled: classes.btnDisabled,
                      }}
                      // type="submit"
                      onClick={handleClose}
                      // disabled={isBtnDisabled}
                    >
                      Request New Verification
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <Typography className={classes.copyright}>
        Copyright 2021 | ATM Business Group
      </Typography>
    </div>
  );
};
ExpiredPage.propTypes = {};

export default ExpiredPage;
const LoginField = ({
  placeholder,
  icon,
  type,
  value,
  onChange,
  onBtnClick,
  isBtnDisabled,
  error,
  helperText,
}) => {
  const classes = useStyles();
  return (
    <FormControl error={error} fullWidth style={{ marginBottom: 40 }}>
      <OutlinedInput
        {...{ type, placeholder, value, onChange, error }}
        classes={{ root: classes.inputText }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onBtnClick} disabled={isBtnDisabled}>
              {icon}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && helperText && (
        <FormHelperText style={{ color: PrimaryHard }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
