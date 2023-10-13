/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
/* eslint-disable radix */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import { RootContext } from "../../../../../router";
import { doFetchDetailSignage, doCreateUpdateCardSignage, doUploadDocument, doUploadPhoto, doSaveComment } from '../../../ApiServiceImplementation';
import { getInitialName, selectedStatus, statusToNumber } from '../../common/Utils';
import ConfirmationPopUp from "../../common/PopUp/ConfirmationPopUp";

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
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
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

const createKebutuhan = () => {
  const classes = useStyles();
  const history = useHistory();

  // HANDLER FOR STATE
  const [isLoadData, setLoadData] = useState(false);
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const [dataLeftComponent, setDataLeft] = useState({
    id: null,
    taskTitle: "",
    notesDescription: "",
    dueDate: "",
    picVendorId: "-",
    dimensi: "",
    machineType: "",
    photoRear: null,
    photoFront: null,
    photoLeft: null,
    photoRight: null,
    cimbAttachment: [],
    photoList: [],
    documentDtoList: [],
  });
  const [dataRightComponent, setDataRight] = useState({
    status: null,
    message: null,
    commentDtoList:[]
  });
  const [openSuccessUpdatePopUp, setOpenSuccessUpdatePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Add');
  const [openConfirmPop, setOpenConfirmPop] = useState(false);

  // GET ID from URL
  const { taskId } = useParams();
  const { userId, userFullName  } = useContext(RootContext);
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    notesDescription: false,
    dueDate: false,
    picVendorId: false,
    dimensi: false,
    machineType: false,
  });

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
    // console.log(`+++ Change State --> ${attribut} : ${newVal}`);
    setDataRight((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorCreateKebutuhan((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;

    if(dataLeftComponent.notesDescription === ""){
      handleError('notesDescription', true);
      errorCount++;
    }else{
      handleError('notesDescription', false);
    }

    if(dataLeftComponent.dueDate === ""){
      handleError('dueDate', true);
      errorCount++;
    }else{
      handleError('dueDate', false);
    }

    if(dataLeftComponent.picVendorId === "" || dataLeftComponent.picVendorId === "-"){
      handleError('picVendorId', true);
      errorCount++;
    }else{
      handleError('picVendorId', false);
    }

    if(dataLeftComponent.dimensi === ""){
      handleError('dimensi', true);
      errorCount++;
    }else{
      handleError('dimensi', false);
    }

    if(dataLeftComponent.machineType === ""){
      handleError('machineType', true);
      errorCount++;
    }else{
      handleError('machineType', false);
    }

    return(errorCount);
  }

  const onSubmitEditTask = async() => {
    const errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      const documentDtoList = [];
      // console.log("+++ cimbAttachment", dataLeft.cimbAttachment);
      if(dataLeftComponent.cimbAttachment.length > 0){
        dataLeftComponent.cimbAttachment.map((item)=>{
          documentDtoList.push({
            id: item.id,
            path: item.path,
            category: item.category,
            filename: item.filename
          });
        });
      }

      const doUploadDocuments = async(arr) =>{
        if(arr.length > 0){
          loadingHandler(true);
          await Promise.all(arr.map(async(item)=>{
            await doUploadDocument(item.file)
              .then((res) => {
              // console.log("data res", res)
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    documentDtoList.push({
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

      // HANDLE PHOTO FILES
      const photoFront = { path: dataLeftComponent.photoFront, url: null };
      const photoRight = { path: dataLeftComponent.photoRight, url: null };
      const photoLeft = { path: dataLeftComponent.photoLeft, url: null };
      const photoRear = { path: dataLeftComponent.photoRear, url: null };

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
      await doUploadPhotos(dataLeftComponent.photoList);

      const commentDtoList = [];
      if(dataRightComponent.message){
        const newDate = new Date().getTime();
        commentDtoList.push({
          id : null,
          userId: parseInt(userId),
          userName: userFullName,
          createdDate: (newDate-(newDate%1000))/1000,
          message: dataRightComponent.message
        });
      }

      // console.log("+++ documentList", dataLeft.documentList);
      await doUploadDocuments(dataLeftComponent.documentDtoList);
      const dataHit = {
        id: dataLeftComponent.id,
        implementationId: parseInt(implementationId),
        taskTitle : dataLeftComponent.taskTitle,
        notesDescription : dataLeftComponent.notesDescription,
        status : statusToNumber(dataRightComponent.status),
        // dueDate: moment.unix(dataLeftComponent.dueDate/1000).format("YYYY-MM-DD"), // <----- "2021-12-21"
        dueDate: dataLeftComponent.dueDate,
        photoRear: photoRear.path,
        photoFront: photoFront.path,
        photoLeft: photoLeft.path,
        photoRight: photoRight.path,
        machineType: dataLeftComponent.machineType,
        dimensi: dataLeftComponent.dimensi,
        picVendorId : dataLeftComponent.picVendorId,
        documentDtoList,
        commentDtoList,
      };
      
      doCreateUpdateCardSignage(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessUpdatePopUp(true);
            setSuccessLabel('Update Task Berhasil');
          }
        }).catch((err) => {
          console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan Update:${err}`);
        });
    }
  };

  useEffect(() => {
    doFetchDetailSignage(loadingHandler, { implementationId, idSignage : taskId })
      .then((response) => {
        // console.log("+++ response", response);
        const resDataLeft = {
          id: response.detailImplementationSignageDto.id,
          taskTitle : response.detailImplementationSignageDto.taskTitle,
          notesDescription: response.detailImplementationSignageDto.notesDescription,
          dueDate: response.detailImplementationSignageDto.dueDate,
          dimensi: response.detailImplementationSignageDto.dimensi,
          picVendorId : response.detailImplementationSignageDto.picVendorId,
          machineType: response.detailImplementationSignageDto.machineType,
          photoRear: response.detailImplementationSignageDto.photoRear,
          photoFront: response.detailImplementationSignageDto.photoFront,
          photoLeft: response.detailImplementationSignageDto.photoLeft,
          photoRight: response.detailImplementationSignageDto.photoRight,
          cimbAttachment: response.cimbAttachment,
          documentDtoList: dataLeftComponent.documentDtoList,
          photoList: dataLeftComponent.photoList
        };
        setDataLeft(resDataLeft);

        const timeline = [];
        if(response.baseHistoryLogDtoList.length > 0){
          response.baseHistoryLogDtoList.map((item)=>{
            timeline.push({
              name: item.userName,
              initial: getInitialName(item.userName),
              message: item.message,
              date: moment.unix(item.createdDate/1000).format("DD-MM-YYYY"),
              time: moment.unix(item.createdDate/1000).format("HH:mm"),
            });
          });
        }
        const resDataRight = {
          status: selectedStatus(response.detailImplementationSignageDto.status),
          timeLineData: timeline,
          commentDtoList: response.commentDtoList
        };
        setDataRight(resDataRight);
        
      }).catch((err) => {
        console.log('Error Get Detail Parameter', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  // KOMENTAR
  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const request = {
        message: dataRightComponent.message,
        cardTaskCategory: "signage",
        cardTaskId: taskId,
      };
      // console.log("~ request", request);
      doSaveComment(loadingHandler, request)
        .then((res) => {
          // console.log("~ res.data", res.data);
          if (res.data) {
            if (res.data.responseCode === "00") {
              alert(`Berhasil save comment`);
              history.go(0);
            }
          }
        })
        .catch((err) => {
          alert(`Gagal save comment. ${err}`);
          loadingHandler(false);
        });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>
            Edit Task
        </Typography>
        
        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent data={dataLeftComponent} errorForm={errorCreateKebutuhan} onChange={handleLeftComponent}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent 
              data={dataRightComponent} 
              handleChangeState={handleRightComponent} 
              onMessageEnter={saveComment}/>
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify='space-between'>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.secondaryButton}
              onClick={() => history.goBack()}
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
              onClick={()=>setOpenConfirmPop(true)}
              style={{ textTransform: "capitalize" }}
            >
                    Save
            </Button>
          </Grid>
        </Grid>
      </div>
      <ConfirmationPopUp
        isOpen={openConfirmPop}
        onSubmit={()=>onSubmitEditTask()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
      />
      <SuccessPopUp 
        isOpen={openSuccessUpdatePopUp}
        onClose={()=>history.push(`/implementation/${implementationId}`)}
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKebutuhan))
);