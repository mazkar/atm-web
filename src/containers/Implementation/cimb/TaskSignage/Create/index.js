/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import { doCreateUpdateCardSignage, doUploadDocument, doUploadPhoto } from '../../../ApiServiceImplementation';
import { statusToNumber } from '../../common/Utils';
import moment from "moment";

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
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const [isOpenModalLoader, setModalLoader] = useState(false)
  const [dataLeftComponent, setDataLeft] = useState({
    type: "Pembuatan FM",
    description: "",
    dueDate: "",
    vendor: "-",
    dimensi: "180x90",
    typeMesin: "ATM",
    photoList: [],
    documentDtoList: [],
  })
  const [dataRightComponent, setDataRight] = useState({
    status: 'TODO',
  });
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan')
  const [successType, setSuccessType] = useState('Add')

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    type: false,
    description: false,
    dueDate: false,
    vendor: false,
    dimensi: false,
    typeMesin: false,
    photoList: false,
    documentDtoList: false,
  })

  const handleLeftComponent = (newVal, attribut) => {
    setDataLeft((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
  }

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
      setErrorCreateKebutuhan((prevVal) => {
        return {
          ...prevVal,
          [keyname]: bool,
        }
      })
  }

  useEffect(() => {
    const isNotRequest = dataLeftComponent.type.toLocaleLowerCase().includes("not request");
    if(isNotRequest){
      handleRightComponent('STRIP', 'status');
    }
    else{
      handleRightComponent('TODO', 'status');
    }
  }, [dataLeftComponent]);

  function validateForm(){
    let errorCount = 0
    //console.log(dataLeftComponent)
    
    if(dataLeftComponent.type === ""){
      handleError('type', true)
      errorCount++
    }else{
      handleError('type', false)
    }

    if(dataLeftComponent.description === ""){
      handleError('description', true)
      errorCount++
    }else{
      handleError('description', false)
    }

    if(dataLeftComponent.dueDate === ""){
      handleError('dueDate', true)
      errorCount++
    }else{
      handleError('dueDate', false)
    }

    if(dataLeftComponent.vendor === "" || dataLeftComponent.vendor === "-"){
      handleError('vendor', true)
      errorCount++
    }else{
      handleError('vendor', false)
    }

    if(dataLeftComponent.typeMesin === ""){
      handleError('typeMesin', true)
      errorCount++
    }else{
      handleError('typeMesin', false)
    }

    return(errorCount)
  }

  const onSubmitNewTask = async() => {
    let errorCount = 0;
    const isNotRequest = dataLeftComponent.type.toLocaleLowerCase().includes("not request");
    if(!isNotRequest){
      errorCount = validateForm();
    }
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      // HANDLE ATTACHMENT FILES
      const documentDtoList = [];
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
      await doUploadDocuments(dataLeftComponent.documentDtoList);

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
        implementationId: implementationId,
        taskTitle : dataLeftComponent.type,
        status : statusToNumber(dataRightComponent.status),
        notesDescription: dataLeftComponent.description,
        //dueDate: moment.unix(dataLeftComponent.dueDate/1000).format("YYYY-MM-DD"), // <----- "2021-12-21"
        dueDate: dataLeftComponent.dueDate,
        picVendorId : isNotRequest? null: dataLeftComponent.vendor,
        machineType: dataLeftComponent.typeMesin,
        photoRear: photoRear.path,
        photoFront: photoFront.path,
        photoLeft: photoLeft.path,
        photoRight: photoRight.path,
        dimensi: dataLeftComponent.dimensi,
        documentDtoList,
        commentDtoList : []
      };
      console.log("+++ dataHit", dataHit);
      
      doCreateUpdateCardSignage(loadingHandler, dataHit)
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

  // HANDLER FOR STATE
  const [isLoadData, setLoadData] = useState(false);
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleRightComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRight((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
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
            New Task
        </Typography>
        
        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent data={dataLeftComponent} isLoadData={isOpenModalLoader} errorForm={errorCreateKebutuhan} onChange={handleLeftComponent}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              handleChangeState={handleRightComponent}
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
                    onClick={onSubmitNewTask}
                    style={{ textTransform: "capitalize" }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
      </div>
      <SuccessPopUp 
        isOpen={openSuccessCreatePopUp}
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