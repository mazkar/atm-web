/* eslint-disable radix */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios';
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "./PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import { doCreateUpdateTaskNeed, doSaveComment, doUploadDocument, doUploadPhoto } from '../../../ApiServiceImplementation';
// eslint-disable-next-line import/no-cycle
import { RootContext } from "../../../../../router";
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

const kebutuhanDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const { taskId } = useParams();
  const { userId, userFullName  } = useContext(RootContext);
  // const [taskId, setTaskId] = useState(null)
  // const [idImplementation, setIdImplementation] = useState(null)
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataComments, setDataComments] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Edit');
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState(0);
  const [comment, setComment] = useState(null);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    picVendor: "-",
    date: "",
    noInvoice: "",
    totalBiaya: "",
    invoiceSendDate: "",
    photoRear: null,
    photoFront: null,
    photoLeft: null,
    photoRight: null,
    cimbAttachment: [],
    documentList: [],
    photoList: [],
  });
  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    picVendor: false,
    date: false
  });
  const [openConfirmPop, setOpenConfirmPop] = useState(false);

  const [isLoadData, setLoadData] = useState(false);

  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleLeftComponent = (newVal, attribut) => {
    // setDataLeft(e)
    setDataLeft((prevValue)=>{
      return {
        ...prevValue,
        [attribut]: newVal
      };
    });
  };

  const handleRightComponent = (e) => {
    setStatus(e);
  };

  const handleInputComment = (e) => {
    setComment(e);
    // setDataComments(e)
  };

  const saveComment=(e)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      const dataHit={
        message: comment,
        cardTaskCategory: 'need',
        cardTaskId: taskId,
      };
      doSaveComment(loadingHandler,dataHit)
        .then((res) => {
          // console.log('~ res.data', res.data);
          if(res.data){
            if(res.data.responseCode === "00"){
              alert(`Berhasil save comment`);
              history.go(0);
            }
          }
        })
        .catch((err) => {
          alert(`Gagal save comment. ${err}`);
          setModalLoader(false);
        });
    }
  };

  useEffect(()=>{
  },[dataLeftComponent]);

  const getDetail = async() => {
    try {
      setLoadData(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/detailTaskNeed`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          idKebutuhan: parseInt(taskId),
          implementationId: parseInt(implementationId)
        },
      });
      const resItem = data.data;
      if (resItem) {
        console.log("Response: ", resItem);
        const resDataLeft = {
          category: resItem.implementationInfo.taskTitle,
          description: resItem.implementationInfo.notesDescription,
          picVendor: resItem.implementationInfo.picVendorId,
          date: resItem.implementationInfo.dueDate,
          noInvoice: resItem.implementationInfo.invoiceNumber  ? resItem.implementationInfo.invoiceNumber : '',
          totalBiaya: resItem.implementationInfo.totalCost,
          invoiceSendDate: resItem.implementationInfo.sendInvoiceDate,
          photoFront: resItem.implementationInfo.photoFront !== "" ? resItem.implementationInfo.photoFront : null,
          photoRight: resItem.implementationInfo.photoRight !== "" ? resItem.implementationInfo.photoRight : null,
          photoLeft: resItem.implementationInfo.photoLeft !== "" ? resItem.implementationInfo.photoLeft : null,
          photoRear: resItem.implementationInfo.photoRear !== "" ? resItem.implementationInfo.photoRear : null,
          cimbAttachment: resItem.cimbAttachment,
          documentList: dataLeftComponent.documentList,
          photoList: dataLeftComponent.photoList
        };
        setStatus(resItem.implementationInfo.status)
        setDataHistory(resItem.logHistoryChanges);
        setDataComments(resItem.comments);
        setDataLeft(resDataLeft);
      } else {
        alert(data.data.responseMessage);
        // history.goBack()
      }
      setLoadData(false);
    } catch (error) {
      console.log("error", error);
      setLoadData(false);
      alert(`Getting Detail ${error}`);
      history.goBack();
    }
  };

  useEffect(()=>{
    getDetail();
  },[]);

  const handleSaveEdit = async() => {
    const errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      const documentList = [];
      // console.log("+++ cimbAttachment", dataLeft.cimbAttachment)
      if(dataLeftComponent.cimbAttachment.length > 0){
        dataLeftComponent.cimbAttachment.map((item)=>{
          documentList.push({
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
      await doUploadDocuments(dataLeftComponent.documentList);
      
      const commentList = [];
      if(comment){
        const newDate = new Date().getTime();
        commentList.push({
          id : null,
          userId: parseInt(userId),
          userName: userFullName,
          createdDate: (newDate-(newDate%1000))/1000,
          message: comment
        });
      }

      const dataHit = {
        taskTitle: dataLeftComponent.category,
        id: parseInt(taskId),
        status: parseInt(status),
        notesDescription: dataLeftComponent.description,
        dueDate: dataLeftComponent.date,
        picVendorId: dataLeftComponent.picVendor,
        implementationId: parseInt(implementationId),
        photoFront: photoFront.path,
        photoRight: photoRight.path,
        photoLeft: photoLeft.path,
        photoRear: photoRear.path,
        documentList,
        commentList
      };
      // console.log("+++ dataHit", dataHit);
      
      doCreateUpdateTaskNeed(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessPopUp(true);
            setSuccessLabel('Update Task Berhasil');
          }
        }).catch((err) => {
          console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  useEffect(()=>{
    console.log("Data left:", dataLeftComponent);
  },[dataLeftComponent]);

  useEffect(()=>{
    console.log("Data Status:", status);
  },[status]);

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
    
    if(dataLeftComponent.category === ""){
      handleError('category', true);
      errorCount++;
    }else{
      handleError('category', false);
    }

    if(dataLeftComponent.description === ""){
      handleError('description', true);
      errorCount++;
    }else{
      handleError('description', false);
    }

    if(dataLeftComponent.picVendor === ""){
      handleError('picVendor', true);
      errorCount++;
    }else{
      handleError('picVendor', false);
    }

    if(dataLeftComponent.date === ""){
      handleError('date', true);
      errorCount++;
    }else{
      handleError('date', false);
    }

    return(errorCount);
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title}>
          Edit Task
        </Typography>
        
        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent data={dataLeftComponent} isEdit={isEdit} errorForm={errorCreateKebutuhan} onChange={handleLeftComponent}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              logHistory={dataHistory}
              comments={dataComments}
              editValue={isEdit}
              onChangeStatus={handleRightComponent}
              onInputComment={handleInputComment}
              onMessageEnter={saveComment}
              status={status}
            />
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify='space-between'>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.secondaryButton}
              onClick={() =>history.goBack()}
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
        onSubmit={()=>handleSaveEdit()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
      />
      <SuccessPopUp 
        isOpen={OpenSuccessPopUp}
        onClose={()=>{
          // history.goBack();
          history.push(`/implementation/${implementationId}`);
          setOpenSuccessPopUp(false);
        }
        }
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
    </div>
  );
};

export default kebutuhanDetail;
