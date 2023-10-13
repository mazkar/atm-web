/* eslint-disable radix */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { RootContext } from "../../../../../router";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import { selectedStatus, statusToNumber } from "../../common/Utils";
import { doCreateUpdateCardSecurity, doFetchDetailSecurity, doSaveComment } from "../../../ApiServiceImplementation";
import ModalLoader from "../../../../../components/ModalLoader";
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
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
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

const createKeamanan = () => {
  const classes = useStyles();
  const history = useHistory();
  // GET ID from URL
  const { taskId } = useParams();
  const { userId, userFullName  } = useContext(RootContext);
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [dataLeft, setDataLeft] = useState({
    id: null,
    category: null,
    description: null,
    dueDate: null,
    picVendor: "-",
  });

  const [dataRight, setDataRight] = useState({
    status: null,
    message: null,
    commentsData:[]
  });
  
  const [openConfirmPop, setOpenConfirmPop] = useState(false);
  const [openSuccessUpdate, setOpenSuccessUpdate] = useState(false);

  const [error, setError] = useState({
    category: false,
    description: false,
    dueDate: false,
    picVendor: false,
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
    setError((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm() {
    let errorCount = 0;

    if (dataLeft.category === "") {
      handleError("category", true);
      errorCount+= 1;
    } else {
      handleError("category", false);
    }

    if (dataLeft.description === "") {
      handleError("description", true);
      errorCount+= 1;
    } else {
      handleError("description", false);
    }

    if (dataLeft.picVendor === "" || dataLeft.picVendor === "-") {
      handleError("picVendor", true);
      errorCount+= 1;
    } else {
      handleError("picVendor", false);
    }

    if (dataLeft.dueDate === "") {
      handleError("dueDate", true);
      errorCount+= 1;
    } else {
      handleError("dueDate", false);
    }

    return errorCount;
  }

  useEffect(() => {
    doFetchDetailSecurity(loadingHandler, {idSecurity: taskId})
      .then((response) => {
        // console.log("+++ response", response);
        const resDataLeft = {
          id: response.detailImplementationSecurityDto.id,
          category: response.detailImplementationSecurityDto.taskTitle,
          description: response.detailImplementationSecurityDto.notesDescription,
          dueDate: response.detailImplementationSecurityDto.dueDate,
          picVendor: response.detailImplementationSecurityDto.picVendorId,
        };
        setDataLeft(resDataLeft);
        
        const resDataRight = {
          status: selectedStatus(response.detailImplementationSecurityDto.status),
          commentsData: response.comments
        };
        setDataRight(resDataRight);
        
      }).catch((err) => {
        // console.log('Error Get Detail Parameter', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  const onSubmit = () => {
    const errorCount = validateForm();
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu!");
    } else {
      
      const commentList = [];
      if(dataRight.message){
        const newDate = new Date().getTime();
        commentList.push({
          id : null,
          userId: parseInt(userId),
          userName: userFullName,
          createdDate: (newDate-(newDate%1000))/1000,
          message: dataRight.message
        });
      }

      const dataHit = {
        id: dataLeft.id,
        userId,
        userName: userFullName,
        implementationId,
        taskTitle : dataLeft.category,
        status : statusToNumber(dataRight.status),
        dueDate: moment.unix(dataLeft.dueDate/1000).format("YYYY-MM-DD"), // <----- "2021-12-21"
        picVendorId : dataLeft.picVendor,
        notesDescription : dataLeft.description,
        commentList
      };
      // console.log("+++ dataHit", dataHit);
      
      doCreateUpdateCardSecurity(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessUpdate(true);
          }
        }).catch((err) => {
          // console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };
  
  // KOMENTAR
  const saveComment=(e)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      const dataHit={
        message: dataRight.message,
        cardTaskCategory: 'security',
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
          loadingHandler(false);
        });
    }
  };

  return (
    <div className={classes.root}>
      {/* <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div> */}
      <div className={classes.content}>
        <Typography className={classes.title}>Edit Task</Typography>

        <Grid container spacing={6} style={{ marginTop: 20 }}>
          <Grid item xs={7}>
            <LeftComponent  data={dataLeft} errorForm={error} onChange={handleLeftComponent}/>
          </Grid>
          <Grid item xs={5}>
            <RightComponent  
              data={dataRight} 
              handleChangeState={handleRightComponent}
              onMessageEnter={saveComment}/>
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify="space-between">
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
      <ConfirmationPopUp
        isOpen={openConfirmPop}
        onSubmit={()=>onSubmit()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
      />
      <SuccessPopUp
        isOpen={openSuccessUpdate}
        onClose={()=>history.push(`/implementation/${implementationId}`)}
        label="Update Task Berhasil"
        type="Add"
      />
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKeamanan))
);
