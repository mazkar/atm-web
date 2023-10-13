/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  withStyles, makeStyles, TextField } from '@material-ui/core';
import { Input , InputNumber } from "antd";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Close } from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import axios from "axios";
import Loading from '../../components/Loading/LoadingView';
import * as Colors from '../../assets/theme/colors';

import constants from '../../helpers/constants';
import AutoCompleteByAtmId from '../../components/AutoCompleteByAtmId';
import ErrorComponent from './cimb/common/ErrorComponent';
import secureStorage from "../../helpers/secureStorage";

const AutoTextField = withStyles(() => ({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      border: '1px solid #A8B6DB',
      fontSize: 13,
      padding: 5,
      borderRadius: 8,
      height: 48,
      backgroundColor: Colors.White,
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
      '& fieldset': {
        padding: '7px 9px',
        border: 0,
      },
      '&:hover fieldset': {
        borderColor: '#749BFF',
      },
      '&.Mui-focused fieldset': {
        border: 0,
      },
    },
  },
}))(TextField);

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  rootAuto: {
    width: "100%",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 580,
    height: 423,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    minHeight: 100,
    marginTop: 50,
    padding: '0px 40px 0px 40px',
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
});

const ModalUpload = ({ isOpen, onClose, onSuccessSubmit }) => {
  const classes = useStyles();

  const today = new Date();
  const year = today.getFullYear();

  const [isLoading, loaderHandler] = useState(false);
  // const [optionAtmIds,setOptionAtmIds] = useState(false);
  const [dataRequest, setDataRequest] = useState({ atmId: null });
  const [errorForm,setErrorForm] = useState(false);

  const accessToken = secureStorage.getItem("access_token");

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  // useEffect(() => {
  //   async function fetchDataLoader() {
  //     loaderHandler(true);
  //     try {
  //       const result = await axios.get(
  //         `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getListAtmIdForMigrasi`,
  //         configNew
  //       );
  //       try {
  //         loaderHandler(false);
  //         // setOptionAtmIds(result.data.listAtmIdForMigrasi);
  //       } catch (err) {
  //         loaderHandler(false);
  //         alert(`Error Get-List Data ATM for Migrasi...! \n${err}`);
  //       }
  //     } catch (err) {
  //       alert(`Error Fetching Data... ATM for Migrasi! \n${err}`);
  //       loaderHandler(false);
  //     }
  //   }
  //   fetchDataLoader();
  // },[isOpen]);

  const handleSubmit = async () => {
    if(!dataRequest.atmId){
      setErrorForm(true);
    }else{
      setErrorForm(false);
      try{
        loaderHandler(true);
        // const dataHit = { id: valueId, atmId: valueATMId };
        const result = await axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/addProcessAtmMigrasi`,
          method: 'POST',
          data: dataRequest,
          headers: configNew.headers,
        });
        if(result){
          // console.log("+++ result", result.data);
          if(result.data.responseCode === "00"){
            loaderHandler(false);
            onClose(true);
            onSuccessSubmit();
          }else{
            loaderHandler(false);
            alert(`Error Add Implementation Migrasi...! \n${result.data.responseMessage}`);
          }
        }
      } catch (err) {
        alert(`Error Add Implementation Migrasi...! \n${err}`);
        loaderHandler(false);
      }
    }
    
  };

  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       
        <Box className={classes.paper}>
          {isLoading ?
            <Loading maxheight='100%' />
            :
            <div>
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
                direction="column"
                spacing={5}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    component="h4"
                    style={{ marginBottom: 40, fontWeight: 500 }}
                  >
                  Add New
                  </Typography>
                </Grid>

                <Grid container justify="center" direction="row" spacing={2}>
                  <Grid item xs={10}>
                    <Typography style={{marginBottom:5}}>
                      ATM ID :
                    </Typography>
                    {/* <Autocomplete 
                      className={classes.rootAuto}
                      options={optionAtmIds}
                      getOptionLabel={(option) => `${option.atmId}`}
                      onChange={(event, value)=>{
                        if(value===null){
                          setValueId("");
                          setValueATMId("");
                        }else{
                          setValueId(value.id);
                          setValueATMId(value.atmId);
                        }
                      }}
                      renderInput={(params) => <AutoTextField
                        {...params} 
                        variant="outlined" 
                        onKeyDown={handleKeyDown}
                        placeholder="Masukan ATM ID"
                      />}
                    /> */}
                    <AutoCompleteByAtmId onChange={(value)=> {
                      // console.log("+++ value", value);
                      if(value){
                        setDataRequest({
                          atmId: value.value
                        });
                      }
                    }}/>
                    { errorForm ? <ErrorComponent label="This Field is Required!" /> : null }
                  </Grid>
                </Grid>
                <Grid container justify="space-between" className={classes.buttonContainer }>
                  <Grid item>
                    <Button
                      variant="outlined"
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
                      variant="contained"
                      disableElevation
                      className={classes.primaryButton}
                      onClick={handleSubmit}
                      style={{ textTransform: 'capitalize' }}
                    >
                    Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          }
        </Box>
      </Modal>
    </div>
  );
};

ModalUpload.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
};

export default ModalUpload;
