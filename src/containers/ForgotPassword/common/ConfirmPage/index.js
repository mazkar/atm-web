import React, { useState, useRef, useEffect,useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "antd";
import axios from "axios";
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
import { RootContext } from "../../../../router";
import { ReactComponent as LogoLogin } from "../../../../assets/images/logo-cimb-niaga.svg";
import LoginMap from "../../../../assets/images/map-login.svg";
import mailRed from "../../../../assets/icons/siab/mail.png";
import { ReactComponent as Lock } from "../../../../assets/icons/siab/lock.svg";
import { ReactComponent as MailGrey } from "../../../../assets/icons/siab/mail-grey.svg";
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
  GrayHard,
  PrimaryUltrasoft,
} from "../../../../assets/theme/colors";
import PopUpReset from "../PopUpReset";

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
      // backgroundColor: PrimaryUltrasoft,
      "& fieldset": {
        // backgroundColor: PrimaryHard,
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

const ConfirmPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [popUpReset, setPopUpReset] = useState(false);
  const emailUser = new URLSearchParams(window.location.search).get("email");
  const [inputPassword, setInputPassword] = useState();
  const { logout, userFullName } = useContext(RootContext);
  const [passwordError, setPasswordError] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  function handleOpenPopUp() {
    if (passwordError === "" && errorConfirm === "") {
      setPopUpReset(true);
    }
  }
  function goToHome() {
    if (
      window.location.pathname !== "/" &&
      !window.location.pathname.includes("/login")
    ) {
      window.location.href = "/";
      // console.log(window.location.pathname)
      // alert('Session Anda telah habis.');
    }
  }
  const handlePassword = (event) => {
    const passwordInputValue = event.target.value;

    // const uppercaseRegExp = /(?=.*?[A-Z])/;
    // const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    // const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    // const minLengthRegExp = /.{8,}/;

    const passwordLength = passwordInputValue.length;
    // const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
    // const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
    const digitsPassword = digitsRegExp.test(passwordInputValue);
    // const specialCharPassword = specialCharRegExp.test(passwordInputValue);
    // const minLengthPassword = minLengthRegExp.test(passwordInputValue);
    const passMaxLength = passwordInputValue.length > 12;

    let errMsg = "";
    if (passwordLength === 0) {
      errMsg = "Password is empty";
    } else if (!digitsPassword) {
      errMsg = "At least one digit";
    } else if (passMaxLength) {
      errMsg = "Maximum 12 characters";
    } else {
      errMsg = "";
    }
    setPasswordError(errMsg);
    setInputPassword(passwordInputValue);
  };

  const handleConfirm = (event) => {
    const confirmPassword = event.target.value;
    if (confirmPassword !== inputPassword) {
      setErrorConfirm("Does not match");
    } else {
      setErrorConfirm("");
    }
    setMatchPassword(confirmPassword);
  };
  const handleSubmitNew = () => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const dataHit = {
      email: emailUser,
      newPassword: inputPassword,
      confirmedPassword: matchPassword,
    };
    if (passwordError === "" && errorConfirm === "") {
      try {
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/api/v1/users/api/v1/mobile/changePassword`,
            dataHit,
            headers
          )
          .then((res) => {
            if (res.status === 200) {
              setPopUpReset(true);
            }
          })
          .catch((err) => {
            alert(`Error Sent ${err}`);
          });
      } catch (err) {
        alert(`Error Sent ${err}`);
      }
    }
  };
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
                  fontWeight: 400,
                  // padding: "10px 0px",
                }}
              >
                New Password
              </Typography>
              <Typography
                style={{
                  fontSize: "23px",
                  lineHeight: "32px",
                  fontWeight: 600,
                  color: "#2B2F3C",
                  marginBottom: 52,
                }}
              >
                Sistem Informasi ATM Bisnis
              </Typography>
              <form>
                <LoginField
                  placeholder="New Password"
                  type="password"
                  icon={<Lock />}
                  value={inputPassword}
                  onChange={handlePassword}
                  error={passwordError.length > 0}
                  helperText={passwordError}
                />
                <LoginField
                  placeholder=" Confirm New Password"
                  type="password"
                  icon={<Lock />}
                  value={matchPassword}
                  onChange={handleConfirm}
                  error={errorConfirm.length > 0}
                  helperText={errorConfirm}
                />
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
                      onClick={handleSubmitNew}
                      // disabled={isBtnDisabled}
                    >
                      Reset Password
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
      <PopUpReset
        isOpen={popUpReset}
        onClose={() => setPopUpReset(false)}
        onOtp={() => logout()}
      />
    </div>
  );
};

ConfirmPage.propTypes = {};

export default ConfirmPage;

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
