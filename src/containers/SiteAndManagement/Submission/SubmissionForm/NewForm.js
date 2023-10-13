/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Checkbox, DatePicker, TimePicker, Divider, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import LoadingView from '../../../../components/Loading/LoadingView';
import ModalRbbArea from '../ModalAction/ModalRbbArea';
import constansts from '../../../../helpers/constants';
import { ReactComponent as ArrowRight } from '../../../../assets/icons/siab/arrow-right.svg';
import ModalLoader from '../../../../components/ModalLoader';

const useStyles = makeStyles({
  root: { padding: '30px 20px 20px 30px' },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
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
      '& .MuiButton-label': {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
  paperDetail: { padding: 20 },
  rows: { border: 'none' },
  cell: { borderBottom: 'unset', fontSize: 12 },
  cellTotal: {
    borderBottom: 'unset',
    position: 'relative',
    left: -15,
    fontSize: 13,
    fontWeight: 500,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    color: constansts.color.white,
    backgroundColor: constansts.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 85,
    height: 40,
    marginRight: 25,
  },
  secondaryButton: {
    color: constansts.color.primaryHard,
    backgroundColor: constansts.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constansts.color.primaryHard}`,
    width: 85,
    height: 40,
    marginLeft: 25,
    visibility: 'hidden',
  },
  inputDate: {
    '& .ant-picker': {
      borderRadius: 6,
    },
  },
});

const matchRoleName = (value) => {
  if (value) {
    const result = value.toLowerCase().match(/planning/g) || [];
    if (result.length) {
      return result[0];
    } else {
      return value;
    }
  }
};

const SubDetailNew = ({ formType, id }) => {
  const roleName = window.sessionStorage.getItem('roleName');
  const classes = useStyles();
  // ANTD COMPONENT //
  const dateFormat = 'DD/MM/YYYY';
  const format = 'DD/MM/YYYY, HH:mm';
  const fullFormat = 'YYYY-MM-DD HH:mm';
  const { TextArea } = Input;
  const history = useHistory();
  // INITIAL STATE //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [valueNote, setValueNote] = useState('');
  const [checkRoom, setCheckRoom] = useState(false);
  const [room, setRoom] = useState();
  const [isDisabledRoom, setIsDisabledRoom] = useState(true);
  const [checkElectric, setCheckElectric] = useState(false);
  const [electric, setElectric] = useState();
  const [isDisabledElectric, setIsDisabledElectric] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [onlineDate, setOnlineDate] = useState();
  const [selectedArea, setSelectedArea] = useState(0);
  const [areaName, setAreaName] = useState('');
  const [rbbAreaId, setRbbAreaId] = useState('');

  // GET ID from URL
  const rowId = { id: id };
  const isSubmit = formType === 'submit' ? true : false;

  // MODAL UPDATE RBB AREA //
  const [openModalUpdateArea, setOpenModalUpdateArea] = useState(false);
  const handleOpenModalArea = () => setOpenModalUpdateArea(true);
  const handleSaveModalArea = (id, name) => {
    setSelectedArea(id);
    setAreaName(name);
    setOpenModalUpdateArea(false);
  };
  const handleCloseModalArea = () => {
    setOpenModalUpdateArea(false);
  };

  const handleModalRbbArea = (id) => {
    handleOpenModalArea();
  };

  const onCheckRoom = (e) => {
    setCheckRoom(e.target.checked);
    if (e.target.checked === true) {
      setIsDisabledRoom(false);
    } else {
      setIsDisabledRoom(true);
    }
  };

  const onCheckElectric = (e) => {
    setCheckElectric(e.target.checked);
    if (e.target.checked === true) {
      setIsDisabledElectric(false);
    } else {
      setIsDisabledElectric(true);
    }
  };

  const handleSelectRoomDate = (date, dateString) => {
    setRoom(date);
  };

  const handleSelectElectricDate = (date, dateString) => {
    setElectric(date);
  };

  const handleSelectStartDate = (date, dateString) => {
    setStartDate(date);
  };

  const handleSelectEndDate = (date, dateString) => {
    setEndDate(date);
  };

  const handleSelectOnlineDate = (date, dateString) => {
    console.log('handle change online date');
    setOnlineDate(date);
  };

  const handleNote = (event) => {
    setValueNote(event.target.value);
  };

  // HIT API GET Data Detail
  useEffect(() => {
    setModalLoader(true);
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/viewSubmissionNew`,
        rowId,
        config
      )
      .then((res) => {
        const n = res.data;
        const d = {
          room: n.preparationLocation,
          electric: n.preparationElectricity,
          roomDate: n.preparationLocationDate,
          electricDate: n.preparationElectrictyDate,
          onlineTargetDate: n.onlineTargetDate,
          startDate: n.startWorkPermit == null ? moment() : moment(n.startWorkPermit, fullFormat),
          endDate: n.endWorkPermit == null ? moment() : moment(n.endWorkPermit, fullFormat),
          startTime: n.startWorkPermit,
          endTime: n.endWorkPermit,
          valueNote: n.notePreparation,
          rbbArea: n.rbbArea ? n.rbbArea : '',
          rbbAreaId: n.rbbAreaId ? n.rbbAreaId : '',
        };

        if (d.room === 0) {
          setCheckRoom(false);
          setIsDisabledRoom(true);
        } else {
          setCheckRoom(true);
          setIsDisabledRoom(false);
        }

        if (d.electric === 0) {
          setCheckElectric(false);
          setIsDisabledElectric(true);
        } else {
          setCheckElectric(true);
          setIsDisabledElectric(false);
        }

        if (d.onlineTargetDate === null) {
          setOnlineDate(null);
        } else {
          setOnlineDate(moment(d.onlineTargetDate));
        }

        setRoom(d.roomDate === null ? new Date() : moment(d.roomDate));
        setElectric(d.electricDate === null ? new Date() : moment(d.electricDate));
        setStartDate(d.startDate);
        setEndDate(d.endDate);
        setValueNote(d.valueNote);
        setAreaName(d.rbbArea);
        setRbbAreaId(d.rbbAreaId);
        setModalLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setModalLoader(false);
      });
  }, [id]);

  const handleSave = () => {
    var data = {
      id: rowId.id,
      cityId: selectedArea ? selectedArea : rbbAreaId,
      preparationLocation: checkRoom === false ? 'tidak' : 'ya',
      preparationElectricty: checkElectric === false ? 'tidak' : 'ya',
      preparationLocationDate: moment(room).format('YYYY-MM-DD'),
      preparationElectrictyDate: moment(electric).format('YYYY-MM-DD'),
      startWorkPermit: moment(startDate).format(fullFormat),
      endWorkPermit: moment(endDate).format(fullFormat),
      notePreparation: valueNote,
      cityName: areaName,
      submit: isSubmit,
      approval: matchRoleName(roleName) == 'planning' ? true : false,
    };

    if (onlineDate) {
      data.onlineTargetDate = moment(onlineDate).format('YYYY-MM-DD');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };

    try {
      setModalLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/submitSubmissionNew`,
          data,
          config
        )
        .then((res) => {
          if (res.data.responseCode === '00') {
            setModalLoader(false);
            alert('Success send Data!');
            if (isSubmit) {
              history.push('/site-management/document-legality');
            } else {
              location.reload();
            }
          } else {
            setModalLoader(false);
            alert(res.data.responseMessage);
          }
        });
    } catch (err) {
      setModalLoader(false);
      alert('FAILED TO SEND DATA!');
    }
  };

  return (
    <>
      <Grid container alignItems='left' direction='column' spacing={5}>
        <Grid item>
          <Typography variant='h6' component='h6' style={{ fontSize: 24, fontWeight: 500 }}>
            Kesiapan Lokasi
          </Typography>
        </Grid>

        <Grid item>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={3}>
              <Checkbox onChange={onCheckRoom} checked={checkRoom}>
                Persiapan Ruangan
              </Checkbox>
            </Grid>
            <Grid item xs={3} className={classes.inputDate}>
              <DatePicker
                format={dateFormat}
                value={moment(room, dateFormat)}
                popupStyle={{ zIndex: 1500 }}
                onChange={handleSelectRoomDate}
                disabled={isDisabledRoom}
                allowClear={false}
              />
            </Grid>

            <Grid item>
              <Grid container direction='row'>
                <Grid item xs={6}>
                  <Typography style={{ fontSize: 15, fontWeight: 400 }}>Tanggal Online</Typography>
                </Grid>
                <Grid item xs={6} className={classes.inputDate}>
                  <DatePicker
                    format={dateFormat}
                    value={onlineDate ? moment(onlineDate, dateFormat) : undefined}
                    popupStyle={{ zIndex: 1500 }}
                    onChange={handleSelectOnlineDate}
                    // allowClear={false}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction='row' style={{ marginTop: 20 }} spacing={2}>
            <Grid item xs={3}>
              <Checkbox onChange={onCheckElectric} checked={checkElectric}>
                Persiapan Listrik
              </Checkbox>
            </Grid>
            <Grid item xs={3} className={classes.inputDate}>
              <DatePicker
                format={dateFormat}
                value={moment(electric, dateFormat)}
                popupStyle={{ zIndex: 1500 }}
                onChange={handleSelectElectricDate}
                disabled={isDisabledElectric}
                allowClear={false}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography style={{ fontSize: 15, fontWeight: 400 }}>RBB Area</Typography>
            </Grid>
            <Grid item xs={3} style={{ marginLeft: 45 }}>
              <Link
                href='#'
                onClick={handleModalRbbArea}
                style={{ fontSize: 16 }}
                color={constansts.color.primaryHard}
              >
                {areaName ? areaName : 'Choose'}
                <ArrowRight style={{ paddingTop: 6, marginLeft: 5 }} />
              </Link>
            </Grid>
          </Grid>
          <Divider />

          <Grid item>
            <Typography
              variant='p'
              component='p'
              style={{
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              Izin Kerja
            </Typography>
          </Grid>

          <Grid item>
            <Grid container direction='row' alignContent='center' spacing={3}>
              <Grid item xs={3}>
                <Typography variant='p' component='p' style={{ marginTop: 25 }}>
                  Tanggal Kerja
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.inputDate}>
                <Typography variant='p' component='p'>
                  Dari
                </Typography>
                <DatePicker
                  format={format}
                  value={startDate}
                  popupStyle={{ zIndex: 1500 }}
                  onChange={handleSelectStartDate}
                  allowClear={false}
                  showTime={{ format: 'HH:mm' }}
                />
              </Grid>
              <Grid item xs={3} className={classes.inputDate}>
                <Typography variant='p' component='p'>
                  Hingga
                </Typography>
                <DatePicker
                  format={format}
                  value={endDate}
                  popupStyle={{ zIndex: 1500 }}
                  onChange={handleSelectEndDate}
                  allowClear={false}
                  showTime={{ format: 'HH:mm' }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography style={{ marginTop: 20 }}>Catatan :</Typography>
          </Grid>

          <Grid item>
            <TextArea
              style={{ borderRadius: 6 }}
              rows={4}
              value={valueNote}
              onChange={handleNote}
            />
          </Grid>
        </Grid>

        <Grid container justify='space-between' className={classes.buttonContainer}>
          <Grid item>
            <Button
              variant='outlined'
              disableElevation
              className={classes.secondaryButton}
              // onClick={onCancel}
              style={{ textTransform: 'capitalize' }}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              disableElevation
              className={classes.primaryButton}
              onClick={handleSave}
              style={{ textTransform: 'capitalize' }}
            >
              {isSubmit ? 'Submit' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {openModalUpdateArea && (
        <ModalRbbArea
          isOpen={openModalUpdateArea}
          onClose={handleCloseModalArea}
          onLeave={() => {
            handleCloseModalArea();
          }}
          handleSave={handleSaveModalArea}
          rowToShow={id}
          idAtmSite={rowId.id}
        />
      )}
      <ModalLoader isOpen={isOpenModalLoader} />
    </>
  );
};

export default withRouter(SubDetailNew);
