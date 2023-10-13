import React, { useState, useRef, useEffect,useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
import PopupFailed from "../PopUpOTP";
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
  resendBtn: {
    backgroundColor: "transparent",
    color: "#DC241F",
    fontWeight: 500,
    fontSize: 17,
    border: "none",
    boxShadow: "0 0 0",
    height: "32px",
    textTransform: "none",
  },
  disabledResend: {
    backgroundColor: "transparent",
    color: GrayMedium,
    fontWeight: 500,
    fontSize: 17,
    border: "none",
    boxShadow: "0 0 0",
    height: "32px",
    textTransform: "none",
  },
});

const OtpPage = () => {
  const classes = useStyles();
  const Ref = useRef(null);
  const history = useHistory();
  const emailUser = new URLSearchParams(window.location.search).get("email");
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [counterClick, setCounterClick] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const [valueOtp, setValueOtp] = useState("1234");
  const [inputOtp, setInputOtp] = useState();
  const [error, setError] = useState("Please Input OTP Code");
  const [loadingAddNew, setLoadingAddNew] = useState(false);
  const [counterResend,setCounterResend]=useState(0);
  const { logout, userFullName } = useContext(RootContext);

  function loadAddNewHandler(bool) {
    setLoadingAddNew(bool);
  }
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const increase = () => {
    setCounterClick(() => counterClick + 1);
  };
  const increaseResend = ()=>{
    setCounterResend(() => counterResend + 1);
  };
  useEffect(() => {
    console.log("count", counterClick);
    if (counterClick > 3) {
      setPopUp(true);
    }
  }, [counterClick]);
  useEffect(() => {
    if (counterResend > 3) {
      setPopUp(true);
    }
    console.log("count", counterResend);
  }, [counterResend]);
  // doOtp
  const doOtp = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      loadAddNewHandler(true);
      increase();
      axios
        .get(
          `${process.env.REACT_APP_API_DOMAIN}/api/v1/users/api/v1/mobile/validateOtp/${inputOtp}`,
          config
        )
        .then((res) => {
          console.log("otp", res);
          if (res.status === 200) {
            history.push(`/forgot-password-confirm-reset-password?email=${emailUser}`);
            loadAddNewHandler(false);
          }
        })
        .catch((err) => {
          alert(`Error Get ${err}`);
          loadAddNewHandler(false);
        });
    } catch (err) {
      alert(`Error OTP ${err}`);
      loadAddNewHandler(false);
    }
  };
  // doresend
  const doOtpResend= () => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const dataHit={
      email:emailUser
    }
    try {
      // loadAddNewHandler(true);
      increaseResend();
      setMinutes(5);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/api/v1/users/api/v1/mobile/generateOtp`,dataHit,
          headers
        )
        .then((res) => {
          console.log("otp", res);
          /* if (res.status === 200) {
            history.push(
              `/forgot-password-confirm-reset-password?email=${emailUser}`
            );
            loadAddNewHandler(false);
          } */
        })
        .catch((err) => {
          alert(`Error Get ${err}`);
          // loadAddNewHandler(false);
        });
    } catch (err) {
      alert(`Error OTP ${err}`);
      // loadAddNewHandler(false);
    }
  };
  const handleOtp = (event) => {
    if (event.target.value === "") {
      setError("Please Input OTP Code");
    } else {
      setError("");
    }
    setInputOtp(event.target.value);
  };
  const handleClose = () => {
    // history.push(`/forgot-password-expired-page`);
    logout();
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
                  fontWeight: 600,
                  // padding: "10px 0px",
                }}
              >
                OTP Code
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
                OTP Code has been sent to <b>{emailUser}</b>
              </Typography>
              <form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                >
                  {" "}
                  {minutes === 0 && seconds === 0 ? null : (
                    <Typography
                      style={{
                        fontSize: 23,
                        fontWeight: 600,
                        color: "#DC241F",
                      }}
                    >
                      {" "}
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </Typography>
                  )}
                </div>

                <LoginField
                  placeholder="Input 6 digits OTP Code"
                  type="text"
                  value={inputOtp}
                  icon={<Lock />}
                  onChange={handleOtp}
                  error={error.length > 0}
                  helperText={error}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 30,
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "17px",
                      fontWeight: 400,
                    }}
                  >
                    Not Receiving OTP Code ?
                  </Typography>
                  <Button
                    classes={{
                      root: classes.resendBtn,
                      disabled: classes.disabledResend,
                    }}
                    onClick={doOtpResend}
                    disabled={(minutes <= 4 && minutes > 0) || seconds > 0}
                  >
                    {"Resend"}
                  </Button>
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
                      onClick={doOtp}
                      disabled={loadingAddNew}
                    >
                      Verification
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
      <PopupFailed
        isOpen={popUp}
        onClose={() => setPopUp(false)}
        onOtp={handleClose}
      />
    </div>
  );
};
OtpPage.propTypes = {};

export default OtpPage;
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
