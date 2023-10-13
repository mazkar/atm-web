/* eslint-disable no-alert */
import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import { ReactComponent as BackIcon } from '../../../../../assets/icons/general/arrow_back_red.svg';
import { ChkyButtons } from "../../../../../components";
import constansts from '../../../../../helpers/constants';
import * as ThemeColor from '../../../../../assets/theme/colors';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import { doCreateUpdateCardBooth, doUploadDocument, doUploadPhoto } from '../../../ApiServiceImplementation';
import { statusToNumber } from '../../common/Utils';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: 'unset',
    padding: 0,
    '& .MuiButton-root': {
      padding: 0,
      textTransform: 'none',
      backgroundColor: 'unset',
    },
    '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
});
function Create(props) {
  const classes = useStyles();
  const history = useHistory();
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Task Berhasil Ditambahkan');
  const [successType, setSuccessType] = useState('Add');
  const [dataLeft, setDataLeft] = useState({
    type: "Pengadaan Booth",
    note: "",
    dueDate: "",
    vendor: "-",
    boothType: "Booth Standar",
    dimensi: "180x90",
    machineType: "ATM",
    documentList: [],
    photoList: [],
  });
  const [dataRight, setDataRight] = useState({
    status: 'TODO',
  });
  const [errorCreate, setErrorCreate] = useState({
    note: false,
    dueDate: false,
    vendor: false,
  });
  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleLeftComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataLeft((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });

  };
  const handleRightComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRight((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorCreate((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;

    if(dataLeft.dueDate === ""){
      handleError('dueDate', true);
      errorCount+= 1;
    }else{
      handleError('dueDate', false);
    }

    if(dataLeft.note === ""){
      handleError('note', true);
      errorCount+= 1;
    }else{
      handleError('note', false);
    }

    if(dataLeft.vendor === "" || dataLeft.vendor === "-" || dataLeft.vendor === null){
      handleError('vendor', true);
      errorCount+= 1;
    }else{
      handleError('vendor', false);
    }

    return(errorCount);
  }

  const onSubmitNewTask = async() => {

    let errorCount = 0;
    const isNotRequest = dataLeft.type.toLocaleLowerCase().includes("not request");
    if(!isNotRequest){
      errorCount = validateForm();
    }
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      // HANDLE ATTACHMENT FILES
      const documentList = [];
      const doUploadDocuments = async(arr) =>{
        if(arr.length > 0){
          loadingHandler(true);
          await Promise.all(arr.map(async(item)=>{
            await doUploadDocument(item.file)
              .then((res) => {
              // console.log("data res", res)
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    documentList.push({
                      id: null,
                      path: res.data.path,
                      category: "cimb",
                      filename: res.data.filename
                    });
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              }).catch((err) => {
                alert(`Failed to upload file ${err}`);
                loadingHandler(false);
              });
          }));
        }
      };
      await doUploadDocuments(dataLeft.documentList);

      // HANDLE PHOTO FILES
      const photoFront = { path: null, url: null };
      const photoRight = { path: null, url: null };
      const photoLeft = { path: null, url: null };
      const photoRear = { path: null, url: null };

      const doUploadPhotos = async(arr) =>{
        if(arr.length > 0){
          loadingHandler(true);
          await Promise.all(arr.map(async(item)=>{
            const {docKey} = item;

            await doUploadPhoto(item.file)
              .then((res) => {
                console.log("data res", res);
                console.log("docKey", docKey);
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    // eslint-disable-next-line default-case
                    switch (docKey) {
                    case "photoFront":
                      photoFront.path = res.data.path;
                      break;
                    case "photoLeft":
                      photoLeft.path = res.data.path;
                      break;
                    case "photoRight":
                      photoRight.path = res.data.path;
                      break;
                    case "photoRear":
                      photoRear.path = res.data.path;
                      break;
                    }
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              }).catch((err) => {
                alert(`Failed to upload file ${err}`);
                loadingHandler(false);
              });
          }));
        }
      };
      await doUploadPhotos(dataLeft.photoList);

      const dataHit = {
        id: null,
        implementationId,
        taskTitle : dataLeft.type,
        status : statusToNumber(dataRight.status),
        dueDate: dataLeft.dueDate ? moment.unix(dataLeft.dueDate/1000).format("YYYY-MM-DD") : "", // <----- "2021-12-21"
        photoRear: photoRear.path,
        photoFront: photoFront.path,
        photoLeft: photoLeft.path,
        photoRight: photoRight.path,
        machineType: dataLeft.machineType,
        dimensi: dataLeft.dimensi,
        boothType: dataLeft.boothType,
        picVendorId : isNotRequest? null : dataLeft.vendor,
        notesDescription : dataLeft.note,
        documentList,
        commentList : []
      };
      console.log("+++ dataHit", dataHit);

      doCreateUpdateCardBooth(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessCreatePopUp(true);
            setSuccessLabel('Task Berhasil Ditambahkan');
          }
        }).catch((err) => {
          console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  useEffect(() => {

    // const selectedDate = Math.floor((dataLeft.dueDate)/ 1000000);
    // const today = Math.floor(+new Date()/1000000);
    // const jatuhTempo = selectedDate < today;

    // console.log(">>> selectedDate",selectedDate);
    // console.log(">>> today",today);
    // console.log(">>> jatuhTempo",jatuhTempo);

    const isNotRequest = dataLeft.type.toLocaleLowerCase().includes("not request");
    if(isNotRequest){
      handleRightComponent('STRIP', 'status');
    }
    else{
      handleRightComponent('TODO', 'status');
    }
  }, [dataLeft]);

  return (
    <div className={classes.root}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <div className={classes.backAction}>
            <Button onClick={() => history.goBack()}>
              <BackIcon />
              <Typography className={classes.backLabel}>Back</Typography>
            </Button>
          </div>
        </Grid>
        <Grid item>
          <Typography className={classes.title}>New Task</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item xs={7}>
              <LeftComponent data={dataLeft} errorForm={errorCreate} onChange={handleLeftComponent}/>
            </Grid>
            <Grid item xs={5}>
              <RightComponent data={dataRight} handleChangeState={handleRightComponent} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item>
              <ChkyButtons
                buttonType='redOutlined'
                onClick={()=>history.push(`/implementation/${implementationId}`)}
                style={{textTransform: 'capitalize'}}
              >
                Cancel
              </ChkyButtons>
            </Grid>
            <Grid item>
              <ChkyButtons
                onClick={onSubmitNewTask}
                style={{textTransform: 'capitalize'}}
              >
                Submit
              </ChkyButtons>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SuccessPopUp
        isOpen={openSuccessCreatePopUp}
        onClose={()=>history.push(`/implementation/${implementationId}`)}
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
}

Create.propTypes = {

};

export default Create;

