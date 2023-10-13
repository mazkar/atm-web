/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import { ThemeProvider } from '@material-ui/styles';
import { I18nextProvider } from 'react-i18next';
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from '../assets/theme/theme';
import {RootContext} from '../router'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { GrayUltrasoft, PrimaryHard, PrimaryMedium } from '../assets/theme/colors';
import FloatingChat from '../components/GeneralComponent/FloatingChat';

const { Content } = Layout;

const useStyles=makeStyles(()=>({
  btnLabel:{
    textTransform:'capitalize'
  },
  continueBtn:{
    backgroundColor:PrimaryHard,
    color:'white'
  },
  logoutBtn:{
    borderColor:PrimaryHard,
    color:PrimaryHard,
    '&:hover':{
      color:PrimaryMedium,
      borderColor:PrimaryMedium
    }
  }
}))

const Container = (props) => {
  const { children } = props;
  const { isOpenModalRefresh, refreshToken, logout } = useContext(RootContext);
  const classes = useStyles();
  const [showMenu, setShowmenu] = React.useState(true);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  React.useEffect(() => {
    if (
      window.location.pathname.includes("/login") ||
      window.location.pathname == "/" ||
      window.location.pathname.includes("/forgot-password")
    ) {
      setShowmenu(false);
    } else {
      setShowmenu(true);
    }
  }, [window.location.pathname]);

  const toggleCollapse = (event) => {
    // setIsCollapse((prevstate) => !prevstate);
    event.preventDefault();
    if (isCollapse) {
      setIsCollapse(false);
    } else {
      setIsCollapse(true);
    }
  };

  useEffect(() => {
    setIsBtnDisabled(false)
  }, [isOpenModalRefresh])

  function handleConfirmRefresh() {
    setIsBtnDisabled(true);
    refreshToken().catch((err) => {
      // console.log(err);
      setIsBtnDisabled(false);
      alert('Refresh token error. Please try again later or logout.');
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider>
        <Router>
          {showMenu ? (
            <Layout
              style={{ 
                backgroundColor: GrayUltrasoft,
                minHeight: '100vh'
              }}
            >
              <Header collapsed={isCollapse} />
              <SideBar collapsed={isCollapse} onCollapse={toggleCollapse} />
              <Content
                style={{
                  marginLeft: isCollapse ? '40px' : '210px',
                  position: 'absolute',
                  left: 23,
                  paddingLeft: '17px',
                  top: 64,
                  minHeight: 'calc(100vh - 64px)',
                  width: isCollapse
                    ? 'calc(100vw - 80px)'
                    : 'calc(100vw - 250px)',
                  backgroundColor: 'rgb(244, 247, 251)'
                }}
              >
                {children}
              </Content>
              <Dialog open={isOpenModalRefresh}>
                <DialogTitle>Session Expired</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Your session has expired. Do you wish to continue?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    classes={{
                      label: classes.btnLabel,
                      root: classes.continueBtn,
                    }}
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmRefresh}
                    disabled={isBtnDisabled}
                  >
                    Continue
                  </Button>
                  <Button
                    classes={{
                      label: classes.btnLabel,
                      root: classes.logoutBtn,
                    }}
                    variant="outlined"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </DialogActions>
              </Dialog>
              <FloatingChat/>
            </Layout>
          ) : (
            <Layout style={{ height: '100vh', background: '#fff' }}>
              {children}
            </Layout>
          )}
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default Container;
