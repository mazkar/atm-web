/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'antd';
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Typography,
  Button,
  FormHelperText,
} from '@material-ui/core';
import qs from 'qs';
import Axios from 'axios';
import {useHistory} from "react-router-dom";

import { ReactComponent as LogoLogin } from '../../assets/images/logo-cimb-niaga.svg';
import LoginMap from '../../assets/images/map-login.svg';
import mailRed from '../../assets/icons/siab/mail.png';
import { ReactComponent as Lock } from '../../assets/icons/siab/lock.svg';
import { ReactComponent as MailGrey } from '../../assets/icons/siab/mail-grey.svg';
import eyeRed from '../../assets/icons/siab/eye.png';
import eyeRedOff from '../../assets/icons/siab/eye-off.png';
import { ReactComponent as EyeGrey } from '../../assets/icons/siab/eye-grey.svg';
import { ReactComponent as EyeGreyOff } from '../../assets/icons/siab/eye-off-grey.svg';
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
  GrayHard,
  PrimaryUltrasoft,
} from '../../assets/theme/colors';
import constants from '../../helpers/constants';
import { RootContext } from '../../router';
import ModalLoader from '../../components/ModalLoader';
import ButtonLink from '../../components/Button/ButtonLink';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    padding: 40,
    backgroundColor: GrayUltrasoft,
    display: 'flex',
    flexDirection: 'column',
  },
  leftLayout: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  leftInner: {
    backgroundColor: 'white',
    padding: 30,
    background: 'white',
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderRadius: '10px',
  },
  inputText: {
    margin: 0,
    backgroundColor: GrayUltrasoft,
    border: `1px solid ${GrayMedium}`,
    borderRadius: 8,
    fontSize: '13px',
    lineHeight: '16px',
    '&.Mui-error': {
      borderColor: PrimaryHard,
      backgroundColor: PrimaryUltrasoft,
      '& fieldset': {
        backgroundColor: PrimaryHard,
        opacity: 0.1,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiOutlinedInput-input': {
      padding: '16px 0 16px 12px',
      '&:-webkit-autofill': {
        borderRadius: '8px 0 0 8px',
      },
      '&::placeholder': {
        color: GrayMedium,
        fontStyle: 'italic',
      },
    },
  },
  btnRoot: {
    borderRadius: '6px',
    padding: '10px 0',
    width: 115,
    backgroundColor: GrayHard,
    '&:hover': {
      backgroundColor: GrayHard,
    },
  },
  btnDisabled: {
    background: GrayMedium,
  },
  btnLabel: {
    fontWeight: 600,
    fontSize: '17px',
    lineHeight: '20px',
    color: 'white',
    textTransform: 'capitalize',
  },
  copyright: {
    fontSize: '13px',
    lineHeight: '16px',
    color: GrayHard,
    textAlign: 'center',
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { saveToken } = useContext(RootContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passHelperText, setPassHelperText] = useState('');

  function login() {
    var data = qs.stringify({
      grant_type: 'password',
      username,
      password,
    });
    setIsBtnDisabled(true);
    setIsModalOpen(true);
    setIsError(false);
    Axios({
      url: `${constants.apiDomain}/oauth/token`,
      method: 'post',
      data,
      auth: {
        username: 'clientId',
        password: 'secret',
      },
    })
      .then((res) => {
        // alert(JSON.stringify(res.data));
        const { role } = res.data;
        // alert(role);
        if (role || role === '') {
          saveToken(res);
          // ===> Start EMAIL Link Handler <===
          const directPathname = sessionStorage.getItem("directPathname");
          if(directPathname){
            window.location.href = directPathname;
          } else if(role.toLowerCase().includes("vendor order")){
            window.location.href = '/vendor-orders';
          }else{
            window.location.href = '/dashboard-overview';
          }
          // ===> End EMAIL Link Handler <===
        } else {
          setEmailHelperText('');
          setPassHelperText('User tidak memiliki role.');
          setIsBtnDisabled(false);
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        let errDesc = err.response?.data?.error_description;
        // console.log(err,errDesc,err.response);
        setIsBtnDisabled(false);
        setIsModalOpen(false);
        if (errDesc === 'Incorrect email') {
          setEmailHelperText(errDesc);
          setPassHelperText('');
        } else if (errDesc === 'Incorrect password') {
          setPassHelperText(errDesc);
          setEmailHelperText('');
        } else if (errDesc) {
          setPassHelperText(errDesc);
          setEmailHelperText('');
        } else {
          console.log(err);
          setEmailHelperText('');
          setPassHelperText('');
        }
      });
  }

  useEffect(() => {
    if (username?.length > 0 && password?.length > 5) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [username, password]);

  return (
    <>
      <div className={classes.container}>
        <div>
          <LogoLogin />
        </div>
        <div
          style={{ flex: "0 1 580px", display: "flex", alignItems: "center" }}
        >
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
                    marginBottom: 52,
                  }}
                >
                  Welcome to
                  <br />
                  <b>Sistem Informasi ATM Business</b>
                </Typography>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    login();
                  }}
                >
                  <LoginField
                    placeholder="Username/email"
                    type="text"
                    icon={isError ? <img src={mailRed} /> : <MailGrey />}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    isBtnDisabled
                    error={emailHelperText.length > 0}
                    helperText={emailHelperText}
                  />
                  <LoginField
                    placeholder="Password"
                    type={isVisible ? "text" : "password"}
                    icon={
                      password.length == 0 ? (
                        <Lock />
                      ) : isVisible ? (
                        isError ? (
                          <img src={eyeRed} />
                        ) : (
                          <EyeGrey />
                        )
                      ) : isError ? (
                        <img src={eyeRedOff} />
                      ) : (
                        <EyeGreyOff />
                      )
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    isBtnDisabled={password.length == 0}
                    onBtnClick={(e) => setIsVisible(!isVisible)}
                    error={passHelperText.length > 0}
                    helperText={passHelperText}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 18,
                    }}
                  >
                    <div>
                      <ButtonLink
                        title="Forgot Password"
                        onClick={() =>history.push("/forgot-password")}
                      />
                    </div>
                    <div>
                      <Button
                        classes={{
                          root: classes.btnRoot,
                          label: classes.btnLabel,
                          disabled: classes.btnDisabled,
                        }}
                        type="submit"
                        disabled={isBtnDisabled}
                      >
                        Login
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
      <ModalLoader isOpen={isModalOpen} />
    </>
  );
};

export default Login;

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
          <InputAdornment position='end'>
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
