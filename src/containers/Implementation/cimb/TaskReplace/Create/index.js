/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import axios from 'axios';
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";
import { doUploadDocument } from "../../../ApiServiceImplementation";
import { statusToNumber } from "../../common/Utils";

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
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataRequest, setDataRequest] = useState({
    category: "",
    description: "",
    duedate: "",
    picVendor: "-",
    requestType: "",
    locationMode: "ON",
    modelTeam: "Konvensional",
    newAtmID: "",
    mesinBaru: "",
    documentList: [],
  });
  const [dataRight, setDataRight] = useState({
    status: 'TODO',
  });
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Add');

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    duedate: false,
    picVendor: false,
    requestType: false,
    locationMode: false,
    modelTeam: false,
    newAtmID: false,
    mesinBaru: false,
    documentList: false,
  });

  const handleChangeRequest = (newVal, keyname)=>
    setDataRequest((prevVal) => {
      return {
        ...prevVal,
        [keyname]: newVal,
      };
    });

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
    setErrorCreateKebutuhan((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;
    
    if(dataRequest.category === ""){
      handleError('category', true);
      errorCount++;
    }else{
      handleError('category', false);
    }

    if(dataRequest.description === ""){
      handleError('description', true);
      errorCount++;
    }else{
      handleError('description', false);
    }

    if(dataRequest.duedate === ""){
      handleError('date', true);
      errorCount++;
    }else{
      handleError('date', false);
    }

    if(dataRequest.picVendor === "" || dataRequest.picVendor === "-" || dataRequest.picVendor === null){
      handleError('picVendor', true);
      errorCount++;
    }else{
      handleError('picVendor', false);
    }

    if(dataRequest.requestType === ""){
      handleError('requestType', true);
      errorCount++;
    }else{
      handleError('requestType', false);
    }

    /*if(dataRequest.newAtmID === ""){
      handleError('atmID', true);
      errorCount++;
    }else{
      handleError('atmID', false);
    }*/

   /* if(dataRequest.mesinBaru === ""){
      handleError('mesinBaru', true);
      errorCount++;
    }else{
      handleError('mesinBaru', false);
    }*/

    return(errorCount);
  }

  async function handleCreateReplace(isNotRequest) {

    const documentList = [];

    const doUploadDocuments = async(arr) =>{
      if(arr.length > 0){
        setModalLoader(true);
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
              setModalLoader(false);
            });
        }));
      }
    };

    await doUploadDocuments(dataRequest.documentList);

    const request = {
      taskTitle : dataRequest.category,
      id : null,
      status: statusToNumber(dataRequest.status),
      notesDescription : dataRequest.description,
      dueDate: dataRequest.duedate,
      picVendorId : isNotRequest? null : dataRequest.picVendor,
      implementationId,
      requestType : dataRequest.requestType,
      locationMode : dataRequest.locationMode,
      modelTeam : dataRequest.modelTeam,
      newAtmId : dataRequest.newAtmID,
      newMachineType : dataRequest.mesinBaru,
      documentList,
    };
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    console.log("datanya",request);

    setModalLoader(true);

    axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateTaskParameterReplace`,
      request,
      headers
    ).then((res) => {
      if (res.status === 200) {
        setModalLoader(false);
        setOpenSuccessDeletePopUp(true);
        setSuccessLabel('Task Berhasil Ditambahkan');
      }
    }).catch((err) => {
      console.log('Error Create New Task', err);
      alert(`Terjadi Kesalahan${err}`);
      setModalLoader(false);
    });
  }

  const onSubmitNewTask = () => {
    let errorCount = 0;
    const isNotRequest = dataRequest.category.toLocaleLowerCase().includes("not request");
    if(!isNotRequest){
      errorCount = validateForm();
    }
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      handleCreateReplace(isNotRequest);
      // setOpenSuccessDeletePopUp(true)
      // setSuccessLabel('Task Berhasil Ditambahkan')
    }
  };

  useEffect(() => {
    const isNotRequest = dataRequest.category.toLocaleLowerCase().includes("not request");
    if(isNotRequest){
      handleRightComponent('STRIP', 'status');
    }
    else{
      handleRightComponent('TODO', 'status');
    }
  }, [dataRequest]);

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
            <LeftComponent data={dataRequest} isLoadData={isOpenModalLoader} errorForm={errorCreateKebutuhan} onChange={handleChangeRequest}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRight}
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
        isOpen={openSuccessDeletePopUp}
        onClose={()=>{
          setOpenSuccessDeletePopUp(false);
          history.push(`/implementation/${implementationId}`);
        }}
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

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKebutuhan))
);