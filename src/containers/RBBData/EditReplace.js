import React, { useState, useEffect } from 'react';
import { Link as Routerlink, useHistory, useParams, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, Button, Link } from '@material-ui/core';
import { Input, DatePicker, Space } from 'antd';
import axios from 'axios';
import moment from 'moment';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import LoadingView from '../../components/Loading/LoadingView';
import { ReactComponent as ArrowLeft } from '../../assets/icons/siab/arrow-left.svg';
import constants from '../../helpers/constants';
import AutoCompleteTest from '../../components/Form/AutoComplete';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  container: {
    marginTop: 25,
  },
  paper: {
    padding: 45,
    borderRadius: 10,
    marginBottom: 40,
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
  buttonContainer: {
    marginTop: 50,
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
    padding: '14px 36px',
    borderRadius: 10,
    width: 100,
    height: 40,
    marginRight: -15,
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
    marginLeft: -15,
  },
  inputEdit: {
    '& .MuiTypography-root': {
      marginBottom: 7,
    },
    '& .ant-input': {
      borderRadius: 6,
      marginBottom: 30,
      height: 45,
    },
  },
  inputEditAuto: {
    '& .MuiTypography-root': {
      marginBottom: 7,
    },
    '& .ant-select .ant-select-selector': {
      borderRadius: 6,
      height: 45,
    },
    '& .ant-select .ant-select-selection-search .ant-select-selection-search-input': {
      marginTop: 6,
    },
  },
  inputDate: {
    '& .ant-picker': {
      width: 141,
      height: 45,
      borderRadius: 6,
    },
  },
  textEdit: {
    '& .MuiTypography-root': {
      marginBottom: 7,
    },
    '& .ant-input': {
      borderRadius: 6,
      marginBottom: 10,
      height: 120,
    },
  },
});

const EditReplace = () => {
  const {
    root,
    container,
    paper,
    backButton,
    buttonContainer,
    title,
    primaryButton,
    secondaryButton,
    inputEdit,
    inputEditAuto,
    inputDate,
    textEdit,
  } = useStyles();

  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  const idRow = params.id;
  const isUnplan = location.pathname.includes('unplan');

  const { TextArea } = Input;

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [newATM, setNewAtm] = useState([]);
  // declare state onChange
  const [Id, setId] = useState();
  const [Area, setArea] = useState();
  const [newLoc, setlocationName] = useState();
  const [remarks, setRemark] = useState();
  const [due, setDue] = useState();
  const [complete, setCompletDate] = useState();
  const [oldType, setOldType] = useState('');

  // set state onChange
  const handleId = (event) => {
    setId(event.target.value);
  };
  const handleArea = (data) => {
    setArea(data);
  };
  const handleLoc = (event) => {
    setlocationName(event.target.value);
  };
  const handleRemark = (event) => {
    setRemark(event.target.value);
  };
  const handleDue = (date, dateString) => {
    setDue(date, dateString);
  };
  const handleComplete = (date, dateString) => {
    setCompletDate(date, dateString);
  };

  // // HIT API GET data detail
  useEffect(() => {
    setModalLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getReplaceAtmData/${idRow}`)
      .then((res) => {
        // console.log(res);
        const {
          oldAtmId,
          locationName,
          areaName,
          targetDate,
          replaceCompleteDate,
          oldMachineType,
          remark,
        } = res.data.data;
        setId(oldAtmId);
        setlocationName(locationName);
        setArea(areaName);
        if (replaceCompleteDate) {
          setCompletDate(moment(replaceCompleteDate));
        }
        if (targetDate) {
          setDue(moment(targetDate));
        }
        setOldType(oldMachineType);
        setRemark(remark);
        setModalLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setModalLoader(false);
      });
  }, [idRow]);
  // END HIT API GET

  // HIT API PATCH data detail
  const handleSubmit = (e) => {
    setModalLoader(true);
    e.preventDefault();
    const data = {
      // oldAtmId: Id,
      // oldMachineType: oldType,
      // locationName: newLoc,
      targetDate: due,
      areaName: Area,
      remark: remarks,
      replaceCompleteDate: complete,
    };
    console.log(`ini data post ${data}`);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };

    // hit api
    try {
      axios
        .patch(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/updateReplaceAtmData/${idRow}`,
          data,
          config
        )
        .then((res) => {
          setModalLoader(false);
          // console.log(res);
          if (res.status === 200) {
            alert('Edit Rbb Success.');
            if (isUnplan) {
              window.location.assign('/rbb-data#UnplanReplace');
            } else {
              window.location.assign('/rbb-data#Replace');
            }
          }
        })
        .catch((error) => {
          alert(error);
          // console.log(error);
          setModalLoader(false);
        });
    } catch {
      setModalLoader(false);
    }
  };
  // END HIT API

  return (
    <div className={root}>
      <div className={backButton}>
        <MuiIconLabelButton
          label='Back'
          iconPosition='startIcon'
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>

      <Typography className={title}>Edit RBB {isUnplan && 'Unplan'} Replace</Typography>
      <div>
        {isOpenModalLoader ? (
          <LoadingView maxheight='100%' />
        ) : (
          <div className={container}>
            <Paper className={paper}>
              <Grid
                container
                justify='space-between'
                alignItems='center'
                direction='column'
                spacing={5}
              >
                <Grid container alignItems='left' direction='row' spacing={3}>
                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant='p' component='p'>
                      <b>ATM ID Lama :</b>
                    </Typography>
                    <Input
                      placeholder='1101'
                      onChange={handleId}
                      value={Id}
                      maxLength={10}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={4} className={inputEdit}>
                    <Typography variant='p' component='p'>
                      <b>Location :</b>
                    </Typography>
                    <Input
                      placeholder='MTN.CMBN Syariah'
                      onChange={handleLoc}
                      value={newLoc}
                      maxLength={75}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEditAuto}>
                    <AutoCompleteTest
                      label='PIC Area'
                      placeholder='Nama Kota'
                      setNilai={handleArea}
                      value={Area}
                      fieldName='namaArea'
                      keywordMaxLenght={30}
                      openingType='replace'
                      disabled
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant='p' component='p'>
                      <b>Target :</b>
                    </Typography>
                    <Space direction='vertical' className={inputDate}>
                      <DatePicker
                        onChange={handleDue}
                        value={due}
                        format='DD MMM YYYY'
                        allowClear={false}
                      />
                    </Space>
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant='p' component='p'>
                      <b> Tgl Selesai:</b>
                    </Typography>
                    <Space direction='vertical' className={inputDate}>
                      <DatePicker
                        onChange={handleComplete}
                        value={complete}
                        format='DD MMM YYYY'
                        allowClear={false}
                      />
                    </Space>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6} className={inputEdit}>
                    <Typography variant='p' component='p'>
                      <b>Mesin Lama :</b>
                    </Typography>
                    <Input placeholder='1101' value={oldType} maxLength={10} disabled />
                  </Grid>
                  <Grid item xs={6} className={textEdit}>
                    <Typography variant='p' component='p'>
                      <b>Remark :</b>
                    </Typography>
                    <TextArea
                      placeholder='alasan...'
                      allowClear
                      onChange={handleRemark}
                      value={remarks}
                      maxLength={75}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container justify='space-between' className={buttonContainer}>
                <Grid item style={{ marginTop: 10 }}>
                  <Link
                    underline='none'
                    component={Routerlink}
                    to={isUnplan ? '/rbb-data#UnplanReplace' : '/rbb-data#Replace'}
                    className={secondaryButton}
                  >
                    Cancel
                  </Link>
                </Grid>

                <Grid item>
                  <Button
                    variant='contained'
                    disableElevation
                    className={primaryButton}
                    onClick={handleSubmit}
                    style={{ textTransform: 'capitalize' }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
};

export default EditReplace;
