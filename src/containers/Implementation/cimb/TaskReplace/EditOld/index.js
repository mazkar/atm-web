/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from 'moment';
import Axios from 'axios';
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";

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
  const { taskId } = useParams();
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "No Aset Gudang",
    description: "Butuh pengiriman Email DIstribusi kepada pihak yang terkait",
    date: moment(),
    picVendor: "PT. Citra",
    requestType: "Urgent",
    atmID: "2131",
    mesinBaru: "ATM",
  });
  const [dataRightComponent, setDataRight] = useState([]);
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Add');

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    requestType: false,
    atmID: false,
    mesinBaru: false
  });

  const handleLeftComponent = (e) => {
    setDataLeft(e);
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

    if(dataLeftComponent.requestType === ""){
      handleError('requestType', true);
      errorCount++;
    }else{
      handleError('requestType', false);
    }

    if(dataLeftComponent.atmID === ""){
      handleError('atmID', true);
      errorCount++;
    }else{
      handleError('atmID', false);
    }

    if(dataLeftComponent.mesinBaru === ""){
      handleError('mesinBaru', true);
      errorCount++;
    }else{
      handleError('mesinBaru', false);
    }

    return(errorCount);
  }

  const getDetail = async (idKeb, implId) => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/detailTaskParameterReplace`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          implementationId,
          idParameter: taskId,
        },
      });
      const resItem = data.data;
      if (resItem) {
        console.log("Response: ", resItem);
        setDataLeft({...dataLeftComponent,
          category: resItem.implementationParameterReplaceDto.taskTitle,
          description: resItem.implementationParameterReplaceDto.notesDescription,
          date: resItem.implementationParameterReplaceDto.dueDate,
          picVendor: resItem.implementationParameterReplaceDto.picVendor,
          tipeMesin: resItem.implementationParameterReplaceDto.machineType,
          requestType: resItem.implementationParameterReplaceDto.requestType,
          denom: resItem.implementationParameterReplaceDto.denom,
          codeGfms: resItem.implementationParameterReplaceDto.codeGfms,
          newAtmId: resItem.implementationParameterReplaceDto.newAtmId,
          mesinBaru: resItem.implementationParameterReplaceDto.newMachineType,
          locationMode: resItem.implementationParameterReplaceDto.locationMode,
          noRfc: resItem.implementationParameterReplaceDto.noRfc,
          tglRfcSelesai: resItem.implementationParameterReplaceDto.tglRfcSelesai,
          noPsf: resItem.implementationParameterReplaceDto.noPsf,
          bastId: resItem.implementationParameterReplaceDto.bastId,
        });
        setDataRight({...dataRightComponent, status: resItem.implementationParameterReplaceDto.status,});
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
      // history.goBack()
    }
  };

  useEffect(()=>{getDetail();},[]);

  function handleEditTask() {
    const request = {
      userId: id,
      userName: userFullName,
      timeStamp: '',
      taskTitle: dataLeftComponent.category,
      notesDescription: dataLeftComponent.description,
      picVendor: dataLeftComponent.picVendor,
      status: 1,
      id: 5,
      implementationId,
      dueDate: dataLeftComponent.date,
      locationMode: dataLeftComponent.locationMode,
      modelTeam: dataLeftComponent.modelTeam,
      requestType: dataLeftComponent.requestType,
    };
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    setModalLoader(true);
    Axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateTaskMesin`,
      request,
      headers
    ).then((res) => {
      if (res.status === 200) {
        setModalLoader(false);
        setOpenSuccessDeletePopUp(true);
        setSuccessLabel('Task Berhasil Ditambahkan');
        setSuccessType('Edit');
      }
    }).catch((err) => {
      console.log('Error Create New Task ', err);
      alert(`Terjadi Kesalahan ${ err}`);
      setModalLoader(false);
    });
  }

  const onSubmitNewTask = () => {
    const errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      handleEditTask();
      // setOpenSuccessDeletePopUp(true)
      // setSuccessLabel('Task Berhasil Ditambahkan')
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
            <LeftComponent data={dataLeftComponent} isLoadData={isOpenModalLoader} errorForm={errorCreateKebutuhan} onChange={handleLeftComponent}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              isLoadData={isOpenModalLoader}
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
        onClose={()=>setOpenSuccessDeletePopUp(false)}
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