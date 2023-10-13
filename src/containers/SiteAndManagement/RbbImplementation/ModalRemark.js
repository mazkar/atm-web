/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-fragments */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button, 
  TextField,
  CircularProgress
} from '@material-ui/core';
import { AutoComplete } from 'antd';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
// import constansts from '../../../helpers/constants'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RootContext } from '../../../router';
import LoadingView from '../../../components/Loading/LoadingView';
import constants from '../../../helpers/constants';
import AutocompleteMui from '../../../components/AutocompleteMui';

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
  buttonCancel: {
    margin: '65px',
    backgroundColor: constants.color.primaryHard,
    color: 'white',
    textTransform: 'capitalize',
    '& .MuiButton-root': {
      width: '100px',
      '&:hover': {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.8,
      },
    },
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
  inputNumber: {
    marginTop: 10,
    borderRadius: '8px',

    height: 35,
    '& .ant-input-number-input': {
      borderRadius: '8px',
      border: '8px',
    },
    '& .ant-input-number-handler-wrap': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
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
  remarkContainer: {

  },
  remarkTitle: {
    fontSize: 18,
    fontWeight: 100,
    marginBottom: 5
  },
  formContainer: {
    '& .MuiTextField-root': {
      width: '100%',
    },
  }
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 250,
    height: 25,
    borderRadius: 10,
    position: 'relative',
    border: '0px solid #BCC8E7',
    fontSize: 13,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Barlow', 'NunitoRegular'].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      right: '-20px',
      outline: 'none',
    },
  },
}))(InputBase);

const ModalRemark = ({ isOpen, onClose, rowToShow}) => {
  const classes = useStyles();
  const { userId } = useContext(RootContext);
  const [remarks, setRemarks] = useState('');
  const [id, setId] = useState('');
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isLoadAtmIds, setIsLoadAtmIds] = useState(false);
  const [optionAtmIds, setOptionAtmIds] = useState([]);
  
  const handleSubmit = () => {
    if(id===''){
      alert("Please insert ATM ID");
    }else if (remarks===''){
      alert("Remark is required");
    }else{
      const request = { 
        'atmId': id,
        'remark': remarks,
      };
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      };
      try {
        setModalLoader(true);
        axios.post(`${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/addUnplanTerminRbbImpl`, request, headers)
          .then((res) => {
            // console.log("Add Unplan Termin", res.data);
            if (res.status === 200){
              if(res.data.message === "Success"){
                alert("Unplan termin berhasil di submit");
                window.location.reload();
                setModalLoader(false);
              }else{
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
        alert(`Error Add Unplan Termin Atm...! \n${err}`);
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
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAllAtmIdAndLocationName`)
          .then((res) => {
            // console.log("getAllAtmIdAndLocationName", res.data);
            const optionsSet = [];
            const dataPre = res.data.data;
            dataPre.map((item) => {
              optionsSet.push({value: item.atmId, locationName: item.locationName});
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
    
    if(isOpen){
      fetchDataAtmId();
    }
  }, [isOpen]);

  function onSelectAtmId(value, option){
    console.log(">>>> value", value);
    console.log(">>>> option", option);
  };
  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <Box className={classes.paper}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton onClick={onClose}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column">
            <Grid item>
              <Typography variant="h4"
                component="h4"
                style={{ marginBottom: 20 }}>
                                Add New
              </Typography>
            </Grid>
            
            <Grid container direction="column" spacing={2} style={{ marginTop: 20 }}>
              <Grid item>
                <Typography style={{ fontSize: 18, fontWeight: 100 }}>
                ATM ID / Location Name :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {isLoadAtmIds? (
                  <Typography style={{
                    width: "100%",
                    height: 48,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#BCC8E7',
                    borderRadius: 8,
                    outline: 'none',
                    padding: '12px 33px 12px 12px',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center'
                  }}><CircularProgress size={15} style={{marginRight: 5, color: "#DC241F"}}/> Loading...</Typography>
                ):(
                  <AutocompleteMui
                    options={optionAtmIds}
                    getOptionLabel={(option) => `${option.value} - ${option.locationName}`}
                    placeholder="ATM ID / Location Name...."
                    onChange={(event, value)=>{
                      console.log(">>> value", value);
                      if(value===null){
                        setId("");
                      }else{
                        setId(value.value);
                      }
                    }}
                  />
                )}
              </Grid>
              
              <Grid item>
                <Typography className={classes.remarkTitle}>Remark</Typography>
              </Grid>
              <Grid item xs={12} className={classes.formContainer}>
                <TextField
                  className={classes.textField}
                  id="outlined-textarea"
                  placeholder="mohon masukan remark...."
                  multiline
                  variant="outlined"
                  onChange={handleRemarks}
                  rows={3} />
              </Grid>
            </Grid>
            <Grid container justify="space-between" className={classes.buttonContainer}>
              <Grid item>
                <Button
                  variant="outlined"
                  disableElevation
                  className={classes.secondaryButton}
                  onClick={onClose}
                  style={{ textTransform: 'capitalize' }}>
                                    Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.primaryButton}
                  onClick={handleSubmit}
                  style={{ textTransform: 'capitalize' }}
                  disabled={isOpenModalLoader}
                >
                  {isOpenModalLoader?"Submitting...":"Submit"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

ModalRemark.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalRemark;