/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from "moment";
import { withStyles } from "@material-ui/styles";
import { DatePicker } from 'antd';
import { ReactComponent as CloseButton } from "../../../../../../assets/icons/siab/x-new.svg";
import constants from '../../../../../../helpers/constants';
import { ReactComponent as UserIcon } from '../../../../../../assets/icons/general/user_red.svg';
import { doGetVendors, doGetVendorUsers } from '../../../../../UserManagement/ApiServicesUser';
import SelectLeftCustomIcon from '../../../../../../components/Selects/SelectItemsIcon';
// eslint-disable-next-line import/no-cycle
import { RootContext } from "../../../../../../router";
import ErrorComponent from '../../../../../Implementation/cimb/TaskKebutuhan/CreateKebutuhan/ErrorComponent';
import SelectMui from '../../../../../../components/Selects/SelectMui';
import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/linear-red/calendar.svg";
import SelectWithInputValue from '../../../../../../components/Selects/SelectWithInputValue';
import { doGetSurveyTypes, doSaveOrUpdateSchedule } from '../../../../ApiServices';
import AutoCompleteSelectedValue from '../../../../../../components/AutoCompleteSelectedValue';
import { disableDateBeforeStart } from '../../../../../../helpers/useFormatter';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
    backgroundColor: constants.color.white,
    width: 800,
    minHeight: "550px",
    borderRadius: 10,
    padding: 30,
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    display: "flex",
    flexDirection: 'column'
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  resetImage: {
    position: "absolute",
    width: '15px',
    height: '15px',
    top: -10,
    right: -10,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    width: "100%",
    height: 47,
    '& .ant-picker-input > input::placeholder': {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: 'ellipsis !important',
      fontSize: 12,
    }
  }
});
// const checklistTypeOption =[
//   {value: '-', name: "Pilih Checklist Vendor"},
//   {value: 'FLM', name: "FLM"},
//   {value: 'FLM RPL', name: "FLM RPL"},
//   {value: 'SLM', name: "SLM"},
//   {value: 'CCTV', name: "CCTV"},
//   {value: 'Site Quality', name: "Site Quality"},
//   {value: 'Kebersihan', name: "Kebersihan"},
//   {value: 'Maintenance Premises', name: "Maintenance Premises"},
//   {value: 'Inventory Cassette ( Vault )', name: "Inventory Cassette ( Vault )"},
// ];

const statusOption =[
  {value: 1, name: "Aktif"},
  {value: 0, name: "Inactive"},
];

const EditSchedulePopUp = ({ isOpen, onClose, onSuccessSubmit, currentRow }) => {
  const classes = useStyles();

  const { userId, userFullName } = useContext(RootContext);

  const [dataRequest, setDataRequest] = useState({
    atmId: null,
    checklistType: "-",
    vendorName: "-",
    userVendor: "-",
    startDate: "",
    endDate: "",
    intervalType: "Hari",
    interval: null,
    status: 1,
  });

  const [errorValidation, setErrorValidation] = useState({
    atmId: false,
    checklistType: false,
    vendorName: false,
    userVendor: false,
  });

  const [checklistTypeOption, setChecklistTypeOption] = useState([{value: '-', name: "Pilih Checklist Vendor"}]);
  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "Masukan Vendor Name"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);
  const [uservendorsOption, setUserVendorsOption] = useState([{value: '-', name: "Masukan Vendor Name"}]);
  const [isLoadUserVendors, setIsLoadUserVendors] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isLoadSuyeyTypes, setIsLoadSuyeyTypes] = useState(false);

  const handleChangeRequest = (newVal, attribut) => {
    // console.log(`+++ ${state}: ${newVal}`);
    setDataRequest((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  function loadSubmitHandler(bool) {
    setLoadingSubmit(bool);
  }

  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }

  function loadUserVendorsHandler(bool){
    setIsLoadUserVendors(bool);
  }

  function loadSurveyTypes(bool) {
    setIsLoadSuyeyTypes(bool);
  }

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorValidation((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;
    if(dataRequest.atmId === null){
      handleError('atmId', true);
      errorCount+= 1;
    }else{
      handleError('atmId', false);
    }
    if(dataRequest.vendorName === "" || dataRequest.vendorName === "-" || dataRequest.vendorName === null){
      handleError('vendorName', true);
      errorCount+= 1;
    }else{
      handleError('vendorName', false);
    }

    if(dataRequest.checklistType === "" || dataRequest.checklistType === "-" || dataRequest.checklistType === null){
      handleError('checklistType', true);
      errorCount+= 1;
    }else{
      handleError('checklistType', false);
    }

    if(dataRequest.userVendor === "" || dataRequest.userVendor === "-" || dataRequest.userVendor === null){
      handleError('userVendor', true);
      errorCount+= 1;
    }else{
      handleError('userVendor', false);
    }

    return(errorCount);
  }

  const handleSubmit = async () => {
    const errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    }else{
  
      const dataHit = {
        id: currentRow.id,
        atmId: dataRequest.atmId,
        vendorChecklist: dataRequest.checklistType,
        picVendorId: dataRequest.vendorName,
        userVendor: dataRequest.userVendor,
        startDate: moment(dataRequest.startDate).format("DD-MM-YYYY"),
        endDate: moment(dataRequest.endDate).format("DD-MM-YYYY"),
        intervalDay: dataRequest.interval,
        intervalDesc: dataRequest.intervalType,
        status: dataRequest.status
      };

      // console.log("+++ dataHit", dataHit);
      // alert("HIT service");
      doSaveOrUpdateSchedule(loadSubmitHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if(response){
            if(response.responseCode === "200"){
              onSuccessSubmit();
            }
          }
        })
        .catch((err) => {
        // console.log("Error Fetch Data Summary", err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  function handleChangeVendor(vendorId, isFirstLoad){
    if((vendorId !== null)||(vendorId !== "-")||(vendorId !== undefined)||(vendorId !== "")){
      // console.log("+++ vendorId :", vendorId);
      doGetVendorUsers(loadUserVendorsHandler, vendorId).then(response=>{
        const arrDataUser = response.data;
        if(arrDataUser){
          if(arrDataUser?.length > 0){
            const options = [{value: '-', name: "Masukan Vendor Name"}];
            arrDataUser.map((item)=>{
              const newObj = {value: item.id, name: item.fullName};
              options.push(newObj);
            });
            setUserVendorsOption(options);
            if(!isFirstLoad){
              handleChangeRequest("-", "userVendor");
            }
          }
        }
      });
    }else{
      handleChangeRequest("-", "userVendor");
    }
  }

  // GET OPTION VENDORS
  useEffect(() => {
    if(isOpen){
      doGetVendors(loadVendorsHandler).then(response=>{
        // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
        if(response?.length > 0){
          const options = [{value: '-', name: "Masukan Vendor Name"}];
          response.map((item)=>{
            const newObj = {value: item.id, name: item.name};
            options.push(newObj);
          });
          setVendorsOption(options);
        }
      });
      doGetSurveyTypes(loadSurveyTypes)
        .then((response) => {
          // console.log("+++ doGetSurveyTypes", response);
          if(response?.nameSurvey.length > 0){
            // console.log("+++ doGetSurveyTypes mapp data");
            const options = [{value: '-', name: "Pilih Checklist Vendor"}];
            response.nameSurvey.map((item)=>{
              const newObj = {value: item.name, name: item.name};
              options.push(newObj);
            });
            setChecklistTypeOption(options);
          }
        })
        .catch((err) => {
        // console.log("Error Fetch Data Summary", err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
    // console.log("+++ currentRow", currentRow);

    if(currentRow){
      handleChangeVendor(currentRow.vendorId, true);
      setDataRequest({
        atmId: currentRow.atmId,
        checklistType: currentRow.checklistVendor,
        vendorName: currentRow.vendorId,
        userVendor: parseInt(currentRow.userId),
        startDate: currentRow.startDate,
        endDate: currentRow.endDate,
        intervalType: currentRow.intervalDesc,
        interval: currentRow.intervalDay,
        status: currentRow.status !== null ? currentRow.status : 1,
      });

    }
  }, [isOpen]);

  // useEffect(() => {
  //   console.log("+++ dataRequest", dataRequest);
  // }, [dataRequest]);  

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>

        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ color: "#2B2F3C", fontWeight: 500, fontSize: 36 }}
            >
              Edit Schedule
            </Typography>
          </Grid>
          <Grid item style={{margin: 50}}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>ATM ID : </Typography>
                  </Grid>
                  <Grid item>
                    <AutoCompleteSelectedValue 
                      selectedAtmId={currentRow?.atmId} 
                      onChange={(value)=> {
                      // console.log("+++ value", value);
                        if(value){
                          handleChangeRequest(value.value, "atmId");
                        }
                      }}
                      // onLoadedAtmIds={onLoadedAtmIds}
                    />
                    { errorValidation.mesinId ? <ErrorComponent label="This Field is Required!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Checklist Vendor :</Typography>
                  </Grid>
                  <Grid item>
                    {isLoadSuyeyTypes? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectMui
                        selectOptionData={checklistTypeOption}
                        selectedValue={dataRequest.checklistType}
                        onSelectValueChange={(newVal)=>handleChangeRequest(newVal, 'checklistType')}/>
                    )}
                    { errorValidation.checklistType ? <ErrorComponent label="Please Select One!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 15 }}  spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Vendor Name:</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectMui
                        selectOptionData={vendorsOption}
                        selectedValue={dataRequest.vendorName}
                        onSelectValueChange={(newVal)=>{
                          // console.log("+++ newVal",newVal);
                          handleChangeRequest(newVal, 'vendorName');
                          handleChangeVendor(newVal);
                        }}/>
                    )}
                    { errorValidation.vendorName ? <ErrorComponent label="Please Select One!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>User Vendor:</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    {isLoadUserVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectMui
                        selectOptionData={uservendorsOption}
                        selectedValue={dataRequest.userVendor}
                        onSelectValueChange={(newVal)=>handleChangeRequest(newVal, 'userVendor')}/>
                    )}
                    { errorValidation.userVendor ? <ErrorComponent label="Please Select One!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 15 }}  spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Start Date :</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      popupStyle={{ zIndex: 1500 }}
                      allowClear={false}
                      suffixIcon={<CalendarIcon />}
                      className={classes.datePicker}
                      placeholder="Pilih Start Date"
                      value={dataRequest.startDate? moment(dataRequest.startDate):""}
                      onChange={(newDate) => {
                        let valDate = "";
                        if (newDate === null) {
                          valDate = "";
                        } else {
                          valDate = newDate.unix() * 1000;
                        }
                        handleChangeRequest(valDate, "startDate");
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>End Date :</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      popupStyle={{ zIndex: 1500 }}
                      allowClear={false}
                      suffixIcon={<CalendarIcon />}
                      className={classes.datePicker}
                      placeholder="Pilih End Date"
                      value={dataRequest.endDate? moment(dataRequest.endDate):""}
                      onChange={(newDate) => {
                        let valDate = "";
                        if (newDate === null) {
                          valDate = "";
                        } else {
                          valDate = newDate.unix() * 1000;
                        }
                        handleChangeRequest(valDate, "endDate");
                      }}
                      disabledDate={(current)=>disableDateBeforeStart(current, dataRequest.startDate)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 15 }}  spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Interval</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    <SelectWithInputValue 
                      leftValue={dataRequest.intervalType}
                      onLeftChange={(e)=>handleChangeRequest(e.target.value, "intervalType")}
                      leftSugestion={[
                        // {value: 'Jam', name: "Jam"},
                        {value: 'Hari', name: "Hari"},
                        // {value: 'Bulan', name: "Bulan"},
                      ]}
                      value={dataRequest.interval}
                      onChange={(e)=>handleChangeRequest(e.target.value, "interval")}
                      placeholder="Masukan Jumlah Interval"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Status :</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    <SelectMui
                      selectOptionData={statusOption}
                      selectedValue={dataRequest.status}
                      onSelectValueChange={(newVal)=>handleChangeRequest(newVal, 'status')}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>

          <Grid container style={{ marginTop: 20 }} justify='space-between'>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                className={classes.secondaryButton}
                onClick={onClose}
                style={{ textTransform: "capitalize" }}
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
                style={{ textTransform: "capitalize" }}
                disabled={loadingSubmit}
              >
                <div style={{display: "flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                  {loadingSubmit&&(<CircularProgress size={15} style={{marginRight: 10}} />)}
                  <Typography>Submit</Typography>
                </div>
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Modal>
  );
};

EditSchedulePopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
  currentRow: PropTypes.object.isRequired,
};

export default EditSchedulePopUp;