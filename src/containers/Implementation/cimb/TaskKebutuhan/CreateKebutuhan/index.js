/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import axios from "axios";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../KebutuhanEdit/PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import { doCreateUpdateTaskNeed, doUploadDocument, doUploadPhoto } from '../../../ApiServiceImplementation';

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
  const { id } = useParams();
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    picVendor: "-",
    date: "",
    photoList: [],
    documentList: []
  });
  const [dataRightComponent, setDataRight] = useState({
    status: 0
  });
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Add');
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [isLoadData, setLoadData] = useState(false);

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    picVendor: false,
    date: false
  });

  useEffect(() => {
    setDataRight({
      ...dataRightComponent,
      dataLeftComponent
    });
  }, [dataLeftComponent]);

  const handleLeftComponent = (e) => {
    setDataLeft(e);
  };

  const handleRightComponent = (e) => {
    setDataRight(e);
  };

  function loadingHandler(bool) {
    setLoadData(bool);
  }

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

    if(dataLeftComponent.picVendor === "" || dataLeftComponent.picVendor === "-"){
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

  const handleCreateNewTask = async() => {
    let errorCount = 0;
    const isNotRequest = dataLeftComponent.category.toLocaleLowerCase().includes("not request");
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
      await doUploadDocuments(dataLeftComponent.documentList);

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
      await doUploadPhotos(dataLeftComponent.photoList);

      const dataHit = {
        id: null,
        implementationId,
        taskTitle : dataLeftComponent.category,
        status : dataRightComponent.status,
        dueDate: dataLeftComponent.date,
        photoRear: photoRear.path,
        photoFront: photoFront.path,
        photoLeft: photoLeft.path,
        photoRight: photoRight.path,
        picVendorId : isNotRequest? null : dataLeftComponent.picVendor,
        notesDescription : dataLeftComponent.description,
        documentList
      };
      // console.log("+++ dataHit", dataHit);
      
      doCreateUpdateTaskNeed(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessDeletePopUp(true);
            setSuccessLabel('Task Berhasil Ditambahkan');
          }
        }).catch((err) => {
          // console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.push(`/implementation/${implementationId}`)}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>
            New Task
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
              data={dataRightComponent} onChange={handleRightComponent}
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
              onClick={handleCreateNewTask}
              style={{ textTransform: "capitalize" }}
            >
                    Submit
            </Button>
          </Grid>
        </Grid>
      </div>
      <SuccessPopUp 
        isOpen={openSuccessDeletePopUp}
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

export default createKebutuhan;