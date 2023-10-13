/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import Axios from 'axios';
import { Category } from "@material-ui/icons";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import DeletePopUp from "./PopUp/deletePopUp";
import SuccessPopUp from "./PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import useRupiahConverter from "../../../../../helpers/useRupiahConverter";

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
  // const [taskId, setTaskId] = useState(null)
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataComments, setDataComments] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Delete');
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState(0);
  const [comment, setComment] = useState([]);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    picVendor: "",
    date: moment(),
    noInvoice: "",
    invoiceSendDate: "",
    invoicePath: null,
    bastId: null,
    bastSubmitStatus: false,
    totalBiaya: "",
    photoDepan: null,
    photoKanan: null,
    photoKiri: null,
    photoBelakang: null,
    cimbAttachments: [],
    vendorAttachments: []
  });
  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    picVendor: false,
    date: false
  });

  const handleLeftComponent = (e) => {
    setDataLeft(e);
  };

  const handleRightComponent = (e) => {
    setStatus(e);
  };

  const handleInputComment = (e) => {
    setComment(e);
    setDataComments(e);
  };

  useEffect(()=>{
    console.log("Comment List: ", comment);
  },[comment]);

  const getDetail = async () => {
    try {
      setModalLoader(true);
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
        setDataLeft({...dataLeftComponent, 
          category: resItem.implementationInfo.taskTitle,
          description: resItem.implementationInfo.notesDescription,
          picVendor: resItem.implementationInfo.picVendor,
          date: resItem.implementationInfo.dueDate ? resItem.implementationInfo.dueDate : '',
          noInvoice: resItem.implementationInfo.invoiceNumber  ? resItem.implementationInfo.invoiceNumber : '-',
          invoiceSendDate: resItem.implementationInfo.invoiceDate,
          invoicePath: resItem.implementationInfo.invoicePath,
          bastId: resItem.implementationInfo.bastId,
          bastSubmitStatus: resItem.implementationInfo.bastStatus || false,
          totalBiaya: resItem.implementationInfo.totalCost !== null ? useRupiahConverter(resItem.implementationInfo.totalCost, "noRp") : '-',
          photoDepan: resItem.implementationInfo.photoFront !== "" ? resItem.implementationInfo.photoFront : null,
          photoKanan: resItem.implementationInfo.photoRight !== "" ? resItem.implementationInfo.photoRight : null,
          photoKiri: resItem.implementationInfo.photoLeft !== "" ? resItem.implementationInfo.photoLeft : null,
          photoBelakang: resItem.implementationInfo.photoRear !== "" ? resItem.implementationInfo.photoRear : null,
          cimbAttachments: resItem.cimbAttachment,
          vendorAttachments: resItem.vendorAttachment,
          status: resItem.implementationInfo.status,
        });
        // setTaskId(resItem.implementationInfo.id)
        setDataHistory(resItem.logHistoryChanges);
        setDataComments(resItem.comments);
      } else {
        alert(data.data.responseMessage);
        // history.goBack()
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert(`Getting Detail ${error}`);
      history.goBack();
    }
  };

  const deleteTask = async (idKeb) => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/deleteCardTaskNeed`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          idKebutuhan: idKeb,
        },
      });
      if(data.data.responseCode === "00") {
        setOpenSuccessPopUp(true);
        setOpenDeletePop(false);
        // window.location.assign(`/implementation/vendor/main-kebutuhan`)
      } else {
        alert(data.data.responseMessage);
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert(`Getting Detail ${error}`);
    }
  };

  function handleEditTask() {
    const request = {
      taskTitle: dataLeftComponent.category,
      id: taskId,
      status: parseInt(status),
      notesDescription: dataLeftComponent.description,
      dueDate: dataLeftComponent.date,
      picVendor: dataLeftComponent.picVendor,
      implementationId: 13,
      photoFront: dataLeftComponent.photoDepan,
      photoRight: dataLeftComponent.photoKanan,
      photoLeft: dataLeftComponent.photoKiri,
      photoRear: dataLeftComponent.photoBelakang,
      documentList: dataLeftComponent.cimbAttachments,
      commentList: dataComments
    };
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    setModalLoader(true);
    Axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateTaskNeed`,
      request,
      headers
    ).then((res) => {
      if (res.status === 200) {
        setModalLoader(false);
        setOpenSuccessPopUp(true);
        setSuccessLabel('Perubahan Berhasil Disimpan');
        setSuccessType('Edit');
      }
    }).catch((err) => {
      console.log('Error Create New Task', err);
      alert(`Terjadi Kesalahan:${err}`);
      setModalLoader(false);
    });
  }

  // useEffect(()=>{
  //   console.log("Data left:", dataLeftComponent);
  // },[dataLeftComponent]);

  // useEffect(()=>{
  //   console.log("Data Status:", status);
  // },[status]);

  useEffect(()=>{
    getDetail();
  },[]);

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

  function loaderHandler(loaderValue) {
    setModalLoader(loaderValue);
  }

  function handleSaveEdit() {
    const errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    }else{
      // setOpenSuccessPopUp(true)
      // setSuccessLabel('Perubahan Berhasil Disimpan')
      // setSuccessType('Edit')
      handleEditTask();
    }
  }

  function handleDelete() {
    setOpenDeletePop(true);
    setSuccessLabel('Hapus Berhasil Dilakukan');
    setSuccessType('Delete');
  }

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
          Task Detail
        </Typography>
        
        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent 
              taskId={taskId} 
              data={dataLeftComponent} 
              isLoadData={isOpenModalLoader} 
              isEdit={isEdit} 
              errorForm={errorCreateKebutuhan} 
              onChange={handleLeftComponent}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              logHistory={dataHistory}
              comments={dataComments}
              isLoadData={isOpenModalLoader}
              editValue={isEdit}
              onChangeStatus={handleRightComponent}
              onInputComment={handleInputComment}
              status={dataLeftComponent.status}
            />
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify='space-between'>
          <Grid item>
            <div className={classes.backButton}>
              <MuiIconLabelButton
                label="Delete Card"
                iconPosition="startIcon"
                onClick={handleDelete}
                buttonIcon={<TrashIcon />}
              />
            </div>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.secondaryButton}
              onClick={()=>window.location.assign(`/implementation/task/need/${taskId}/edit?implementationId=${implementationId}`)}
              style={{ textTransform: "capitalize" }}
            >
                    Edit
            </Button>
          </Grid>
        </Grid>
      </div>
      <DeletePopUp
        isOpen={openDeletePop}
        onSubmit={()=>{
          // setOpenSuccessPopUp(true)
          // setOpenDeletePop(false)
          deleteTask(taskId);
        }}
        onLeave={()=>setOpenDeletePop(false)}
        onClose={()=>setOpenDeletePop(false)}
      />
      <SuccessPopUp 
        isOpen={OpenSuccessPopUp}
        onClose={()=>
        {
          if(successType === 'Delete'){
            window.location.assign(`/implementation/${implementationId}`);
            setOpenSuccessPopUp(false);
          }
          setOpenSuccessPopUp(false);
        }
        }
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default kebutuhanDetail;
