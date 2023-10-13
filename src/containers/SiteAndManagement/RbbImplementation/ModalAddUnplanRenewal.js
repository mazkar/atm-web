/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-fragments */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import axios from 'axios';
import constants from '../../../helpers/constants';
import AutocompleteMui from '../../../components/AutocompleteMui';
import { ChkySelectInput } from '../../../components';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 650,
    minHeight: 500,
    borderRadius: 10,
    padding: 30,
    boxShadow: 'none',
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 20,
    // padding: '0px 40px 0px 40px',
  },
  textField: {
    '& .MuiInputBase-root': {
      border: '1px solid',
      borderColor: '#BCC8E7',
      borderRadius: '6px',
    },
    '& .MuiInputBase-input': {
      // right: '-20px',
    },
    '& .MuiOutlinedInput-input': {
      '&: hover': {
        background: '#F4F7FB',
      },
    },
    '& .MuiButton-root': {
      '&:hover': {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.9,
      },
    },
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 100,
    marginBottom: 5,
  },
  formContainer: {
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
});

const ModalAddUnplanRenewal = ({ isOpen, onClose, tabValue }) => {
  const classes = useStyles();
  const [remarks, setRemarks] = useState('');
  const [id, setId] = useState('');
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isLoadAtmIds, setIsLoadAtmIds] = useState(false);
  const [optionAtmIds, setOptionAtmIds] = useState([]);
  const [newMachineType, setNewMachineType] = useState('');

  const handleSubmit = () => {
    if (id === '') {
      alert('Please insert ATM ID');
    } else if (remarks === '') {
      alert('Remark is required');
    } else if (tabValue === 7 && !newMachineType) {
      alert('Machine type is required');
    } else {
      const request =
        tabValue === 7
          ? {
              oldAtmId: id,
              machineType: newMachineType,
              activityDate: moment().format('YYYY-MM-DD'),
              remark: remarks,
            }
          : {
              atmId: id,
              remark: remarks,
            };
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/${
              tabValue === 7 ? 'addUnplanReplaceRbbImpl' : 'addUnplanRenewalRbbImpl'
            }`,
            request,
            headers
          )
          .then((res) => {
            if (res.status === 200) {
              if (res.data.message === 'Success') {
                alert(`Unplan ${tabValue === 7 ? 'Replace' : 'Renewal'} submit success.`);
                window.location.reload();
                setModalLoader(false);
              } else {
                alert(res.data.message);
                setModalLoader(false);
              }
            }
            setModalLoader(false);
          })
          .catch((err) => {
            alert(err);
            setModalLoader(false);
          });
      } catch (err) {
        alert(`Error Add Unplan ${tabValue === 7 ? 'Replace' : 'Renewal'} Atm...! \n${err}`);
        setModalLoader(false);
      }
    }
  };

  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };

  const handleID = (e) => {
    setId(e.target.value);
  };

  // COMPONENT isOpen EFFECT
  useEffect(() => {
    const fetchDataAtmId = () => {
      try {
        setIsLoadAtmIds(true);
        axios
          .get(
            `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAllAtmIdAndLocationName`
          )
          .then((res) => {
            // console.log("getAllAtmIdAndLocationName", res.data);
            const optionsSet = [];
            const dataPre = res.data.data;
            dataPre.map(({ atmId, locationName, machineType }) => {
              optionsSet.push({ value: atmId, locationName, machineType });
            });
            setOptionAtmIds(optionsSet);
            setIsLoadAtmIds(false);
          })
          .catch((err) => {
            alert(err);
            setIsLoadAtmIds(false);
          });
      } catch (error) {
        console.log(error);
        setIsLoadAtmIds(false);
      }
    };

    if (isOpen) {
      fetchDataAtmId();
    } else {
      setId('')
      setNewMachineType('')
    }
  }, [isOpen]);

  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box className={classes.paper}>
          <Grid container justify='flex-end'>
            <Grid item>
              <IconButton onClick={onClose}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container justify='center' alignItems='center' direction='column'>
            <Grid item>
              <Typography variant='h4' component='h4' style={{ marginBottom: 20 }}>
                Add New Unplan {tabValue === 7 ? 'Replace' : 'Renewal'}
              </Typography>
            </Grid>

            <Grid container direction='column' spacing={2} style={{ marginTop: 20 }}>
              <Grid item>
                <Typography style={{ fontSize: 18, fontWeight: 100 }}>
                  ATM ID / Location Name { tabValue === 7 && 'yang hendak diganti' } :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {isLoadAtmIds ? (
                  <Typography
                    style={{
                      width: '100%',
                      height: 48,
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#BCC8E7',
                      borderRadius: 8,
                      outline: 'none',
                      padding: '12px 33px 12px 12px',
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress size={15} style={{ marginRight: 5, color: '#DC241F' }} />{' '}
                    Loading...
                  </Typography>
                ) : (
                  <AutocompleteMui
                    options={optionAtmIds}
                    getOptionLabel={(option) => `${option.value} - ${option.locationName}`}
                    placeholder='ATM ID / Location Name...'
                    onChange={(event, value) => {
                      console.log('>>> value', value);
                      if (value === null) {
                        setId('');
                      } else {
                        setId(value.value);
                      }
                      setNewMachineType('')
                    }}
                  />
                )}
              </Grid>
              {tabValue === 7 && id && (
                <Grid item>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography className={classes.fieldTitle}>
                        Jenis Mesin ATM Saat Ini :
                      </Typography>
                      <Typography>
                        {optionAtmIds.find(({ value }) => value === id)?.machineType}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={classes.fieldTitle}>Jenis Mesin ATM Baru :</Typography>
                      <ChkySelectInput
                        value={newMachineType}
                        selectOptionData={types}
                        onSelectValueChange={(val) => {
                          setNewMachineType(val);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Typography className={classes.fieldTitle}>Remark</Typography>
              </Grid>
              <Grid item xs={12} className={classes.formContainer}>
                <TextField
                  className={classes.textField}
                  id='outlined-textarea'
                  placeholder='mohon masukan remark....'
                  multiline
                  variant='outlined'
                  onChange={handleRemarks}
                  rows={3}
                />
              </Grid>
            </Grid>

            <Grid container justify='space-between' className={classes.buttonContainer}>
              <Grid item>
                <Button
                  variant='outlined'
                  disableElevation
                  className={classes.secondaryButton}
                  onClick={onClose}
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
                  onClick={handleSubmit}
                  style={{ textTransform: 'capitalize' }}
                  disabled={isOpenModalLoader}
                >
                  {isOpenModalLoader ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

ModalAddUnplanRenewal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalAddUnplanRenewal;

const types = ['ATM', 'CRM', 'MDM', 'CDM'].map((value) => ({ name: value, value }));
