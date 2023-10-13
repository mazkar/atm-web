import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "antd";
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Typography,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import qs from "qs";
import Axios from "axios";
import { RootContext } from "../../router";

// internal
import { ReactComponent as LogoLogin } from "../../assets/images/logo-cimb-niaga.svg";
import LoginMap from "../../assets/images/map-login.svg";
import mailRed from "../../assets/icons/siab/mail.png";
import { ReactComponent as MailGrey } from "../../assets/icons/siab/mail-grey.svg";
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
  GrayHard,
  PrimaryUltrasoft,
} from "../../assets/theme/colors";
import constants from "../../helpers/constants";
import ModalLoader from "../../components/ModalLoader";
import PopupSuccess from "./common/PopUpSuccess";
import axios from "axios";

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
        color: "#97A5C9",
        fontStyle: "italic",
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

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const [popUpOTP, setPopUpOTP] = useState(false);
  const [inputEmail, setEmailInput] = useState("");
  const [username, setUsername] = useState("atmsiab1223@gmail.com");
  const [password, setPassword] = useState("pass1233");
  const [loadingAddNew, setLoadingAddNew] = useState(false);
  const { saveToken } = useContext(RootContext);
  const [error, setError] = useState("");

  function loadAddNewHandler(bool) {
    setLoadingAddNew(bool);
  }
  function handleOtpOpen() {
    history.push(`/forgot-password-otp-page?email=${inputEmail}`);
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleChange = (event) => {
    if (!isValidEmail(event.target.value) && inputEmail === "") {
      setError("Email is not valid");
    } else {
      setError("");
    }
    setEmailInput(event.target.value);
  };
  useEffect(() => {
    const data = qs.stringify({
      grant_type: "password",
      username,
      password,
    });
    axios({
      url: `${constants.apiDomain}/oauth/token`,
      method: "post",
      data,
      auth: {
        username: "clientId",
        password: "secret",
      },
    }).then((res) => {
      console.log("res", res);
      saveToken(res);
    });
  }, []);
  const handleSubmitEmail = () => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    const dataHit = {
      email: inputEmail,
    };
    if (error.length === 0 && inputEmail !== "") {
      try {
        loadAddNewHandler(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/api/v1/users/api/v1/mobile/generateOtp`,
            dataHit,
            headers
          )
          .then((res) => {
            if (res.status === 200) {
              setPopUpOTP(true);
            }
          })
          .catch((err) => {
            alert(err);
          });
      } catch (err) {
        alert(`Fail to Send Remark..!\n ${err}`);
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
                  fontWeight: 600,
                  // padding: "10px 0px",
                }}
              >
                Forgot Password
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
                Please enter the registered email to reset your account password
              </Typography>
              <form>
                <Typography
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                    padding: "20px 0px 10px 0px",
                  }}
                >
                  Email:
                </Typography>
                <LoginField
                  placeholder="Email"
                  type="text"
                  value={inputEmail}
                  onChange={handleChange}
                  icon={<MailGrey />}
                  error={error.length > 0}
                  helperText={error}
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
                      onClick={handleSubmitEmail}
                      disabled={loadingAddNew}
                    >
                      Lanjut
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
      {popUpOTP && (
        <PopupSuccess
          isOpen={popUpOTP}
          onClose={() => setPopUpOTP(false)}
          onOtp={handleOtpOpen}
        />
      )}
    </div>
  );
};
ForgotPassword.propTypes = {};

export default ForgotPassword;
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
