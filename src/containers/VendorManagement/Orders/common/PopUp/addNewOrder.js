/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import { Select } from 'antd';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/styles";
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg";
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import constants from '../../../../../helpers/constants';
import InputBordered from '../InputComponent';
import { ReactComponent as DefUploadImageSvg } from "../../../../../assets/icons/general/def_upload.svg";
import { ReactComponent as UserIcon } from '../../../../../assets/icons/general/user_red.svg';
import { doAddNewOrders, doGetConfigAttributes } from '../../../ApiServices';
import AutoCompleteByAtmId from '../../../../../components/AutoCompleteByAtmId';
import { doGetVendors } from '../../../../UserManagement/ApiServicesUser';
import ImageSelector from '../../../../../components/ImageSelector';
import SelectLeftCustomIcon from '../../../../../components/Selects/SelectItemsIcon';
// eslint-disable-next-line import/no-cycle
import { RootContext } from "../../../../../router";
import { doUploadPhoto } from '../../../../Implementation/ApiServiceImplementation';
import ErrorComponent from '../../../../Implementation/cimb/TaskKebutuhan/CreateKebutuhan/ErrorComponent';

const { Option } = Select;

const DeleteIconButton = withStyles(() => ({
  root: {
    backgroundColor: "#DC241F75",
    color: "#fff",
    "&:hover": {
      color: "#DC241F",
      backgroundColor: "#fff8f8cc",
    },
  },
}))(IconButton);

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
    height: "570px",
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
});

const successPopUp = ({ isOpen, onClose, onSuccessSubmit }) => {
  const {
    modal,
    paper,
    primaryButton,
    secondaryButton
  } = useStyles();

  const { userId, userFullName } = useContext(RootContext);

  const [dataRequest, setDataRequest] = useState({
    id: null,
    timestamp: null,
    implementationId: null,
    mesinId: null,
    locationId: null,
    locationName: null,        
    status: 0,
    taskTitle: "-",
    notesDescription : "",
    picVendorId: "-",
    photoList: []
  });

  const [errorValidation, setErrorValidation] = useState({
    taskTitle: false,
    notesDescription: false,
    picVendorId: false,
    mesinId: false,
  });

  const [photoFront, setPhotoFront] = useState('');
  const [photoLeft, setPhotoLeft] = useState('');
  const [photoRight, setPhotoRight] = useState('');
  const [photoRear, setPhotoRear] = useState('');

  const [jenisPekerjaanOption, setJenisPekerjaanOption] = useState([{value: '-', name: "-Pilih Jenis Pekerjaan-"}]);
  const [isLoadJenisPekerjaan, setIsLoadJenisPekerjaan] = useState(false);

  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  const [loadingAddNew, setLoadingAddNew] = useState(false);

  const handleChangeRequest = (newVal, attribut) => {
    // console.log(`+++ ${state}: ${newVal}`);
    setDataRequest((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  function loadAddNewHandler(bool) {
    setLoadingAddNew(bool);
  }

  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }

  function loadJenisPekerjaanHandler(bool) {
    setIsLoadJenisPekerjaan(bool);
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

    if(dataRequest.taskTitle === "" || dataRequest.taskTitle === "-" || dataRequest.taskTitle === null ){
      handleError('taskTitle', true);
      errorCount+= 1;
    }else{
      handleError('taskTitle', false);
    }
    
    // if(dataRequest.notesDescription === ""){
    //   handleError('notesDescription', true);
    //   errorCount+= 1;
    // }else{
    //   handleError('notesDescription', false);
    // }

    if(dataRequest.picVendorId === "" || dataRequest.picVendorId === "-" || dataRequest.picVendorId === null){
      handleError('picVendorId', true);
      errorCount+= 1;
    }else{
      handleError('picVendorId', false);
    }

    if(dataRequest.mesinId === "" || dataRequest.mesinId === null){
      handleError('mesinId', true);
      errorCount+= 1;
    }else{
      handleError('mesinId', false);
    }
    return(errorCount);
  }

  const handleSubmitNewOrder = async () => {
    const errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    }else{

      // HANDLE PHOTO FILES
      const reqPhotoFront = { path: null, url: null };
      const reqPhotoRight = { path: null, url: null };
      const reqPhotoLeft = { path: null, url: null };
      const reqPhotoRear = { path: null, url: null };
  
      const doUploadPhotos = async(arr) =>{
        if(arr.length > 0){
          loadAddNewHandler(true);
          await Promise.all(arr.map(async(item)=>{
            const {docKey} = item;
  
            await doUploadPhoto(item.file)
              .then((res) => {
                // console.log("data res", res);
                // console.log("docKey", docKey);
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    // eslint-disable-next-line default-case
                    switch (docKey) {
                    case "photoFront":
                      reqPhotoFront.path = res.data.path;
                      break;
                    case "photoLeft":
                      reqPhotoLeft.path = res.data.path;
                      break;
                    case "photoRight":
                      reqPhotoRight.path = res.data.path;
                      break;
                    case "photoRear":
                      reqPhotoRear.path = res.data.path;
                      break;
                    }
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              }).catch((err) => {
                alert(`Failed to upload file ${err}`);
                loadAddNewHandler(false);
              });
          }));
        }
      };
      await doUploadPhotos(dataRequest.photoList);
  
      const dataHit = {
        userId,
        userName: userFullName,
        id: null,
        timestamp: null,
        implementationId: null,
        mesinId: dataRequest.mesinId,
        locationId: dataRequest.locationId,
        locationName: dataRequest.locationName,     
        status: 0,
        taskTitle: dataRequest.taskTitle,
        notesDescription : dataRequest.notesDescription,
        picVendorId: dataRequest.picVendorId,
        photoFrontVendor: reqPhotoFront.path,
        photoRightVendor: reqPhotoRight.path,
        photoLeftVendor: reqPhotoLeft.path,
        photoRearVendor: reqPhotoRear.path,
      };
      // console.log("+++ dataHit", dataHit);
  
      doAddNewOrders(loadAddNewHandler, dataHit)
        .then((response) => {
          console.log("+++ response", response);
          if(response){
            if(response.responseCode === "00"){
              onSuccessSubmit(`ID - ${response.id}`);
            }
          }
        })
        .catch((err) => {
          // console.log("Error Fetch Data Summary", err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  // FOTO

  useEffect(() => {
    if(photoFront !== ''){
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFront",
        file: photoFront
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList,"photoList");
    }else{
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoFront'; 
      });
      handleChangeRequest(newDataList,"photoList");
    }
  }, [photoFront]);

  useEffect(() => {
    if(photoRight !== ''){
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRight",
        file: photoRight
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList,"photoList");
    }else{
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoRight'; 
      });
      handleChangeRequest(newDataList,"photoList");
    }
  }, [photoRight]);

  useEffect(() => {
    if(photoLeft !== ''){
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoLeft",
        file: photoLeft
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList,"photoList");
    }else{
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoLeft'; 
      });
      handleChangeRequest(newDataList,"photoList");
    }
  }, [photoLeft]);

  useEffect(() => {
    // console.log("+++ photoRear", JSON.stringify(photoRear));
    if(photoRear !== ''){
      const oldDataList = dataRequest.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRear",
        file: photoRear
      };
      newDataList.push(newObj);
      handleChangeRequest(newDataList,"photoList");
    }else{
      const oldDataList = dataRequest.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoRear'; 
      });
      handleChangeRequest(newDataList,"photoList");
    }
  }, [photoRear]);

  // GET OPTION VENDORS
  useEffect(() => {
    if(isOpen){
      doGetVendors(loadVendorsHandler).then(response=>{
        // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
        if(response?.length > 0){
          const options = [{value: '-', name: "-Pilih Vendor-"}];
          response.map((item)=>{
            const newObj = {value: item.id, name: item.name};
            options.push(newObj);
          });
          setVendorsOption(options);
        }
      });
      doGetConfigAttributes(loadJenisPekerjaanHandler).then(response=>{
        // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
        if(response){
          if(response.responseCode === 200){
            const resAttributes = response.data.configAttributeList;
            const options = [{value: '-', name: "-Pilih Jenis Pekerjaan-"}];
            resAttributes.map((item)=>{
              const newObj = {value: item.name, name: item.name};
              options.push(newObj);
            });
            setJenisPekerjaanOption(options);
          }
        }
      });
    }
  }, [isOpen]);

  return (
    <Modal
      className={modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>

        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ color: "#374062", fontWeight: 600 }}
            >
              Add New Order
            </Typography>
          </Grid>
          <Grid item style={{margin: 50}}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                {/* <Grid container direction="column">
                  <Grid item>
                    <Typography>No Ticket :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 600 }}>B-02342</Typography>
                  </Grid>
                </Grid> */}
                <Grid container direction="column">
                  <Grid item>
                    <Typography>ID Mesin :</Typography>
                  </Grid>
                  <Grid item>
                    <AutoCompleteByAtmId onChange={(value)=> {
                      // console.log("+++ value", value);
                      if(value){
                        handleChangeRequest(value.value, "mesinId");
                        handleChangeRequest(value.locationName, "locationName");
                        handleChangeRequest(value.locationName, "locationName");
                      }
                    }}/>
                    { errorValidation.mesinId ? <ErrorComponent label="This Field is Required!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>ID Location :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{dataRequest.locationId ? dataRequest.locationId : "-"}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 15 }} spacing={4}>
              <Grid item xs={6} />
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Nama Lokasi :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{dataRequest.locationName ? dataRequest.locationName : "-"}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 15 }}  spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Jenis Pekerjaan :</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    {/* <Select
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentElement
                      }
                      className="CommonSelect__select--bordered #BCC8E7"
                      onChange={(val)=> {
                        handleChangeRequest(val, "taskTitle");
                        // console.log("+++ jenis Pekerjaan",val); 
                      }}
                      placeholder="Pilih Jenis Pekerjaan"
                      style={{ width: "100%" }}
                      suffixIcon={
                        <AngleDownIcon className="CommonSelect__select-icon" />
                      }
                      value={dataRequest.taskTitle}
                    >
                      {jenisPekerjaanOption.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Option key={index} value={item.value}>
                          {item.name}
                        </Option>
                      ))}
                    </Select> */}
                    {isLoadJenisPekerjaan? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectLeftCustomIcon
                        leftIcon={<UserIcon style={{height: 20}}/>}
                        selectOptionData={jenisPekerjaanOption}
                        selectedValue={dataRequest.taskTitle}
                        onSelectValueChange={(newVal)=>handleChangeRequest(newVal, 'taskTitle')}/>
                    )}
                    { errorValidation.taskTitle ? <ErrorComponent label="This Field is Required!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Nama Vendor :</Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 5 }}>
                    {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectLeftCustomIcon
                        leftIcon={<UserIcon style={{height: 20}}/>}
                        selectOptionData={vendorsOption}
                        selectedValue={dataRequest.picVendorId}
                        onSelectValueChange={(newVal)=>handleChangeRequest(newVal, 'picVendorId')}/>
                    )}
                    { errorValidation.picVendorId ? <ErrorComponent label="Please Select One!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid container direction="column" style={{ marginTop: 15 }} spacing={3}>
              <Grid item>
                <Typography>Notes & Description :</Typography>
              </Grid>
              <Grid item>
                <InputBordered
                  multiline
                  rows={6}
                  style={{ width: "100%" }}
                  onChange={(e)=>{
                    handleChangeRequest(e.target.value, 'notesDescription');
                  }}
                  placeholder="Notes & Description"
                  value={dataRequest.notesDescription}
                />
                { errorValidation.notesDescription ? <ErrorComponent label="This Field is Required!" /> : null }
              </Grid>
            </Grid>

            <Grid container direction="row" spacing={4} style={{marginTop: 20}}>
              <Grid item>
                <ImageSelector isLarger largerWidth={130} largerMinHeight={90} title="Depan" onChange={(e)=>setPhotoFront(e.target.files[0])} selectedImage={photoFront} onDelete={()=>setPhotoFront('')} />
              </Grid>
              <Grid item>
                <ImageSelector isLarger largerWidth={130} largerMinHeight={90} title="Kanan" onChange={(e)=>setPhotoRight(e.target.files[0])} selectedImage={photoRight} onDelete={()=>setPhotoRight('')} />
              </Grid>
              <Grid item>
                <ImageSelector isLarger largerWidth={130} largerMinHeight={90} title="Kiri" onChange={(e)=>setPhotoLeft(e.target.files[0])} selectedImage={photoLeft} onDelete={()=>setPhotoLeft('')} />
              </Grid>
              <Grid item>
                <ImageSelector isLarger largerWidth={130} largerMinHeight={90} title="Belakang" onChange={(e)=>setPhotoRear(e.target.files[0])} selectedImage={photoRear} onDelete={()=>setPhotoRear('')} />
              </Grid>
            </Grid>

            <Grid container
              alignItems="stretch"
              style={{ marginTop: 5, marginLeft: 15 }}
            >
              <Typography style={{ fontWeight: 400, color: "#8D98B4" }}>
                *Tolong upload foto sesuai dengan keterangan yang tersedia
              </Typography>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: 20 }} justify='space-between'>
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                className={secondaryButton}
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
                className={primaryButton}
                onClick={handleSubmitNewOrder}
                style={{ textTransform: "capitalize" }}
                disabled={loadingAddNew}
              >
                    Submit
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </Modal>
  );
};

successPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
};

export default successPopUp;