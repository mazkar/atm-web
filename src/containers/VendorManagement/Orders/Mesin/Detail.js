/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import FloatingChat from '../../../../components/GeneralComponent/FloatingChat';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import LeftComponent from './partials/leftComponent';
import RightComponent from './partials/rightComponent';
import constants from '../../../../helpers/constants';
import axios from 'axios';
import ModalLoader from '../../../../components/ModalLoader';

const useStyles = makeStyles({
  root: {
    padding: 15,
    marginBottom: 30,
  },
  content: {
    padding: 10,
  },
  backButton: {
    marginBottom: 20,
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '10px 32px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '10px 32px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
});

const Detail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataMesin, setDataMesin] = useState({});

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    jenisMesin: false,
    merekMesin: false,
  });

  const handleLeftComponent = (e) => {
    setDataMesin(e);
  };

  useEffect(() => {
    setModalLoader(true);
    axios({
      method: 'GET',
      url: `${constants.IMPLEMENTATION_SERVICE}/getDetailTaskMesinVendor?id=${id}`,
    })
      .then((res) => {
        // console.log('~ res.data', res.data);
        setModalLoader(false);
        setDataMesin(res.data);
      })
      .catch((err) => {
        setModalLoader(false);
        console.log('~ err', err);
      });
  }, [id]);

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label='Back'
          iconPosition='startIcon'
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>Order Detail</Typography>

        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent
              content={dataMesin}
              errorForm={errorCreateKebutuhan}
              onChange={handleLeftComponent}
            />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent content={dataMesin} />
          </Grid>
        </Grid>
      </div>
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Detail))
);
