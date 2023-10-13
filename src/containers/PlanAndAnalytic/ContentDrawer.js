import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import NewLocation from './NewLocation';
import NewAtm from './NewAtm';
import Reopen from './Reopen';

import theme from '../../assets/theme/theme';
import constants from '../../helpers/constants';
import { tuple } from 'antd/lib/_util/type';
import ATMSekitar from './ATMSekitar';

const useStyles = makeStyles({
  formContainer: {
    position: 'relative',
    padding: 10,
    // top: 100,
    maxHeight: 1049.5,
    width: 520,
    boxShadow: '0px 0px 0px rgba(232, 238, 255, 0.3)',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 0
  },
  title: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    fontStyle: 'normal',
  },
  formInput: {
    width: 230,
    height: 40,
    borderRadius: 8,
    backgroundColor: constants.color.grayUltraSoft,
    border: `1px solid ${constants.color.grayMedium}`,
    margin: 0,
  },
  formButtonContainer: {
    marginTop: 32,
  },
  formButton: {
    backgroundColor: constants.color.primaryHard,
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    borderRadius: 10,
    color: constants.color.white,
    textTransform: 'none',
  },
  errorText: {
    fontWeight: 400,
    fontSize: 12,
    color: constants.color.primaryHard,
  },
  tabContent: {
    paddingTop: 10,
    '& .MuiBox-root': {
      padding: 0,
    },
  },
});

const LocationIcon = () => (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="10" fill="#FFE9E9" />
    <g clipPath="url(#clip0)" fill="#DC241F">
      <path
        opacity=".4"
        d="M15 5c-4.14 0-7.5 3.36-7.5 7.5 0 3.024 1.055 3.867 6.73 12.096a.938.938 0 001.54 0c5.675-8.229 6.73-9.072 6.73-12.096C22.5 8.36 19.14 5 15 5zm0 11.25a3.75 3.75 0 110-7.501 3.75 3.75 0 010 7.5z"
      />
      <path d="M15 15a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" transform="translate(5 5)" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

const ContentTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: constants.color.primaryHard,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: constants.color.grayMedium,
    '&:hover': {
      color: constants.color.dark,
      opacity: 1,
    },
    '&$selected': {
      color: constants.color.dark,
    },
    '&:focus': {
      color: constants.color.dark,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `content-tab-${index}`,
    'aria-controls': `content-tabpanel-${index}`,
  };
}

const FormLocation = ({ dataResponse, onCancel, showSaveButton, saveLocationClick, postPhone, maxWidth = false }) => {
  const {
    formContainer,
    tabContent,
  } = useStyles();

  const [valueTab, setValueTab] = useState(0),
   [valueSaveButton, setValueSaveButton] = useState(false),
   handleShowSaveButton = () => setValueSaveButton(false),
   handleHideSaveButton = () => setValueSaveButton(true),
   handleChangeTab = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  useEffect(() => {
    // console.log("DATA ATM : ", dataResponse);
    showSaveButton(valueSaveButton);
  }, [dataResponse, valueSaveButton]);

  return (
    <Paper className={formContainer} style={{width: maxWidth && "100%"}}>
      <div style={{ marginTop: 20 }}>
        <ContentTabs
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="content tabs"
        >
          <ContentTab
            label="Lokasi"
            {...a11yProps(0)}
            onClick={() => {
              handleShowSaveButton();
              // showSaveButton(valueSaveButton);
            }}
          />
          <ContentTab
            label="ATM Sekitar"
            {...a11yProps(1)}
            onClick={() => {
              handleHideSaveButton();
              // showSaveButton(valueSaveButton);
            }}
          />
        </ContentTabs>
      </div>
      <Grid item>
        <TabPanel value={valueTab} index={1} className={tabContent}>
          <ATMSekitar maxWidth data={dataResponse} onCancel={onCancel} onClickSaveLocation={saveLocationClick} onClickPostPhone={postPhone}/>
        </TabPanel>
      </Grid>
      {/* <Grid container={true} direction="row">
        <FormTab />
      </Grid> */}
    </Paper>
  );
};

FormLocation.propTypes = {
  onClick: PropTypes.func.isRequired,
  inputPosition: PropTypes.any,
  dataResponse: PropTypes.array,
  showSaveButton: PropTypes.any,
  saveLocationClick: PropTypes.func.isRequired,
  postPhone: PropTypes.func.isRequired,
  maxWidth: PropTypes.bool.isRequired,
};

export default FormLocation;