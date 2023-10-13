/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import Axios from "axios";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import { RootContext } from "../../../../../router";
import ModalLoader from "../../../../../components/ModalLoader";
import { selectedStatus, statusToNumber } from "../../common/Utils";
import { doSaveComment } from "../../../ApiServiceImplementation";
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

const createKebutuhan = () => {
  const classes = useStyles();
  const history = useHistory();
  const { taskId } = useParams();
  const implementationId = new URLSearchParams(window.location.search).get(
    "implementationId"
  );
  const { userId, userFullName } = useContext(RootContext);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    category: null,
    description: null,
    // date: moment(),
    date: null,
    picVendor: "-",
    jenisMesin: null,
    merekMesin: null,
    tipeMesin: null,
    snMesin: null,
  });
  const [dataRightComponent, setDataRight] = useState({
    // status: 0,
    status: null,
    message: null,
    commentsData: [],
  });
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Edit");
  const [dataComments, setDataComments] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [status, setStatus] = useState(0);
  const [comment, setComment] = useState([]);

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    jenisMesin: false,
    merekMesin: false,
    tipeMesin: false,
    snMesin: false,
  });
  const [openConfirmPop, setOpenConfirmPop] = useState(false);
  const [isLoadData, setLoadData] = useState(false);
  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleLeftComponent = (e) => {
    setDataLeft(e);
  };

  const handleRightComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRight((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };

  // const handleRightComponent = (e) => {
  //   setStatus(e);
  // };

  const handleInputComment = (e) => {
    setComment(e);
    setDataComments(e);
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

  function validateForm() {
    let errorCount = 0;

    if (dataLeftComponent.category === "") {
      handleError("category", true);
      errorCount++;
    } else {
      handleError("category", false);
    }

    if (dataLeftComponent.description === "") {
      handleError("description", true);
      errorCount++;
    } else {
      handleError("description", false);
    }

    if (dataLeftComponent.picVendor === "") {
      handleError("picVendor", true);
      errorCount++;
    } else {
      handleError("picVendor", false);
    }

    if (dataLeftComponent.date === "") {
      handleError("date", true);
      errorCount++;
    } else {
      handleError("date", false);
    }

    if (dataLeftComponent.jenisMesin === "") {
      handleError("jenisMesin", true);
      errorCount++;
    } else {
      handleError("jenisMesin", false);
    }

    if (dataLeftComponent.merekMesin === "") {
      handleError("merekMesin", true);
      errorCount++;
    } else {
      handleError("merekMesin", false);
    }

    // if (dataLeftComponent.tipeMesin === "") {
    //   handleError("tipeMesin", true);
    //   errorCount++;
    // } else {
    //   handleError("tipeMesin", false);
    // }

    // if (dataLeftComponent.snMesin === "") {
    //   handleError("snMesin", true);
    //   errorCount++;
    // } else {
    //   handleError("snMesin", false);
    // }

    return errorCount;
  }

  const getDetail = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/detailTaskMesin`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          implementationId: implementationId,
          idMesin: taskId,
        },
      });
      const resItem = data.data;
      if (resItem) {
        console.log("Response: ", resItem);
        setDataLeft({
          ...dataLeftComponent,
          category: resItem.detailImplementationMesinDto.taskTitle,
          description: resItem.detailImplementationMesinDto.notesDescription,
          picVendor: resItem.detailImplementationMesinDto.picVendorId,
          date: resItem.detailImplementationMesinDto.planTanggalKirim,
          jenisMesin: resItem.detailImplementationMesinDto.typeAtm,
          merekMesin: resItem.detailImplementationMesinDto.brandName,
          tipeMesin: resItem.detailImplementationMesinDto.machineType,
          snMesin: resItem.detailImplementationMesinDto.snMachine,
        });
        setDataRight({
          ...dataRightComponent,
          status: selectedStatus(resItem.detailImplementationMesinDto.status),
          commentsData: resItem.detailImplementationMesinDto.comments,
        });
        // setDataHistory(resItem.logHistoryChanges);
        setDataComments(resItem.comments);
      } else {
        alert(data.data.responseMessage);
        // history.goBack()
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert("Getting Detail " + error);
      // history.goBack()
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  function handleEditTask() {
    const commentList = [];
    if (dataRightComponent.message) {
      const newDate = new Date().getTime();
      commentList.push({
        id: null,
        userId: parseInt(userId),
        userName: userFullName,
        createdDate: (newDate - (newDate % 1000)) / 1000,
        message: dataRightComponent.message,
      });
    }

    const request = {
      userId: userId,
      userName: userFullName,
      timeStamp: "",
      taskTitle: dataLeftComponent.category,
      notesDescription: dataLeftComponent.description,
      // planTanggalKirim: dataLeftComponent.date,
      planTanggalKirim: moment
        .unix(dataLeftComponent.date / 1000)
        .format("YYYY-MM-DD"),
      picVendorId: dataLeftComponent.picVendor,
      typeAtm: dataLeftComponent.jenisMesin,
      brandName: dataLeftComponent.merekMesin,
      machineType: dataLeftComponent.tipeMesin,
      snMachine: dataLeftComponent.snMesin,
      // status: 0,
      status: statusToNumber(dataRightComponent.status),
      id: taskId,
      implementationId: implementationId,
      commentList,
    };
    // console.log("+++ request", request);

    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    setModalLoader(true);
    Axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateTaskMesin`,
      request,
      headers
    )
      .then((res) => {
        console.log("~ res dataCreate", res.data);
        if (res.status === 200) {
          setModalLoader(false);
          setOpenSuccessDeletePopUp(true);
          setSuccessLabel("Task Berhasil Ditambahkan");
          setSuccessType("Edit");
        }
      })
      .catch((err) => {
        console.log("Error Create New Task ", err);
        alert("Terjadi Kesalahan " + err);
        setModalLoader(false);
      });
  }

  const onSubmitNewTask = () => {
    const errorCount = validateForm();
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu!");
    } else {
      handleEditTask();
      // setOpenSuccessDeletePopUp(true)
      // setSuccessLabel('Task Berhasil Ditambahkan')
    }
  };

  // KOMENTAR
  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const request = {
        message: dataRightComponent.message,
        cardTaskCategory: "mesin",
        cardTaskId: taskId,
      };
      console.log("~ request", request);
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
        <Typography className={classes.title}>Edit Task</Typography>

        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent
              data={dataLeftComponent}
              isLoadData={isOpenModalLoader}
              errorForm={errorCreateKebutuhan}
              onChange={handleLeftComponent}
            />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              handleChangeState={handleRightComponent}
              onMessageEnter={saveComment}
              comments={dataComments}
              isLoadData={isOpenModalLoader}
              logHistory={dataHistory}
              status={dataRightComponent.status}
              onChangeStatus={handleRightComponent}
              // onInputComment={handleInputComment}
            />
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
        onSubmit={()=>onSubmitNewTask()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
      />
      <SuccessPopUp
        isOpen={openSuccessDeletePopUp}
        onClose={() => {
          if (successType === "Edit") {
            window.location.assign(`/implementation/${implementationId}`);
            setOpenSuccessPopUp(false);
          }
          setOpenSuccessPopUp(false);
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
