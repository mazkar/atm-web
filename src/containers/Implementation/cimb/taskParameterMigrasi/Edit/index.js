/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RootContext } from "../../../../../router";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";
import { ChkyButtons } from "../../../../../components";
import moment from "moment";
import {
  doCreateUpdateTaskMigrasi,
  doFetchDetailMigrasi,
  doSaveComment,
  doUploadDocument,
} from "../../../ApiServiceImplementation";
import {
  getInitialName,
  selectedStatus,
  statusToNumber,
} from "../../common/Utils";
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
  const { id } = useParams();
  const { userId, userFullName } = useContext(RootContext);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Add");
  const implementationId = new URLSearchParams(window.location.search).get(
    "implementationId"
  );
  const [dataLeft, setDataLeft] = useState({
    id: null,
    taskTitle: "",
    notesDescription: "",
    dueDate: "",
    picVendorId: "",
    requestType: "",
    locationMode: "OFF",
    modelTeam: "konvensional",
    newAtmId: "",
    newMachineType: "",
    lokasiBaru: "",
    cimbAttachment: [],
    documentList: [],
  });
  const [dataRight, setDataRight] = useState({
    status: null,
    message: null,
    commentsData: [],
  });

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    taskTitle: false,
    notesDescription: false,
    dueDate: false,
    picVendorId: false,
    requestType: false,
    locationMode: false,
    modelTeam: false,
    newAtmId: false,
    newMachineType: false,
    lokasiBaru: false,
  });
  const [isLoadData, setLoadData] = useState(false);

  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleLeftComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${JSON.stringify(newVal)}`);
    setDataLeft((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
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

    if (dataLeft.category === "") {
      handleError("category", true);
      errorCount++;
    } else {
      handleError("category", false);
    }

    if (dataLeft.description === "") {
      handleError("description", true);
      errorCount++;
    } else {
      handleError("description", false);
    }

    if (dataLeft.picVendor === "") {
      handleError("picVendor", true);
      errorCount++;
    } else {
      handleError("picVendor", false);
    }

    if (dataLeft.date === "") {
      handleError("date", true);
      errorCount++;
    } else {
      handleError("date", false);
    }

    if (dataLeft.requestType === "") {
      handleError("requestType", true);
      errorCount++;
    } else {
      handleError("requestType", false);
    }

    if (dataLeft.newAtmId === "") {
      handleError("newAtmId", true);
      errorCount++;
    } else {
      handleError("newAtmId", false);
    }

    if (dataLeft.newMachineType === "") {
      handleError("newMachineType", true);
      errorCount++;
    } else {
      handleError("newMachineType", false);
    }

    if (dataLeft.lokasiBaru === "") {
      handleError("lokasiBaru", true);
      errorCount++;
    } else {
      handleError("lokasiBaru", false);
    }

    return errorCount;
  }
  useEffect(() => {
    doFetchDetailMigrasi(loadingHandler, {
      idParameter: id,
    }).then((response) => {
      console.log("+++ Resp Get", response);
      const resDataLeft = {
        id: response.implementationParameterMigrasiDto.id,
        implementationId:
          response.implementationParameterMigrasiDto.implementationId,
        taskTitle: response.implementationParameterMigrasiDto.taskTitle,
        notesDescription:
          response.implementationParameterMigrasiDto.notesDescription,
        dueDate: response.implementationParameterMigrasiDto.dueDate,
        picVendorId: response.implementationParameterMigrasiDto.picVendorId,
        requestType: response.implementationParameterMigrasiDto.requestType,
        locationMode: response.implementationParameterMigrasiDto.locationMode,
        modelTeam: response.implementationParameterMigrasiDto.modelTeam,
        newAtmId: response.implementationParameterMigrasiDto.newAtmId,
        newMachineType:
          response.implementationParameterMigrasiDto.newMachineType,
        lokasiBaru: response.implementationParameterMigrasiDto.newLocation,
        cimbAttachment: response.cimbAttachment,
        documentList: dataLeft.documentList,
      };
      setDataLeft(resDataLeft);
      console.log(resDataLeft);

      const timeline = [];
      if (response.logHistoryChanges.length > 0) {
        response.logHistoryChanges.map((item) => {
          timeline.push({
            name: item.userName,
            initial: getInitialName(item.userName),
            message: item.message,
            date: moment.unix(item.createdDate / 1000).format("DD-MM-YYYY"),
            time: moment.unix(item.createdDate / 1000).format("HH:mm"),
          });
        });
      }
      const resDataRight = {
        status: selectedStatus(
          response.implementationParameterMigrasiDto.status
        ),
        timeLineData: timeline,
        commentsData: response.comments,
      };
      console.log(timeline);
      setDataRight(resDataRight);
      console.log(resDataRight);
    });
  }, []);

  const onSubmitEditTask = async () => {
    const errorCount = validateForm();
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu!");
    } else {
      const documentList = [];
      console.log("+++ cimbAttachment", dataLeft.cimbAttachment);
      if (dataLeft.cimbAttachment.length > 0) {
        dataLeft.cimbAttachment.map((item) => {
          documentList.push({
            id: item.id,
            path: item.path,
            category: item.category,
            filename: item.filename,
          });
        });
      }
      const doUploadDocuments = async (arr) => {
        if (arr.length > 0) {
          loadingHandler(true);
          await Promise.all(
            arr.map(async (item) => {
              await doUploadDocument(item.file)
                .then((res) => {
                  console.log("data res", res);
                  if (res.status === 200) {
                    if (res.data.responseCode === "00") {
                      documentList.push({
                        id: null,
                        path: res.data.path,
                        category: "cimb",
                        filename: res.data.filename,
                      });
                    } else {
                      alert(res.data.responseMessage);
                    }
                  }
                })
                .catch((err) => {
                  alert(`Failed to upload file ${err}`);
                  loadingHandler(false);
                });
            })
          );
        }
      };
      const commentList = [];
      if (dataRight.message) {
        const newDate = new Date().getTime();
        commentList.push({
          id: null,
          userId: parseInt(userId),
          userName: userFullName,
          createdDate: (newDate - (newDate % 1000)) / 1000,
          message: dataRight.message,
        });
      }
      console.log("+++doc list ", dataLeft.documentList);
      await doUploadDocuments(dataLeft.documentList);

      const dataHit = {
        id: dataLeft.id,
        implementationId: dataLeft.implementationId,
        taskTitle: dataLeft.taskTitle,
        status: statusToNumber(dataRight.status),
        dueDate: moment.unix(dataLeft.dueDate / 1000).format("YYYY-MM-DD"),
        notesDescription: dataLeft.notesDescription,
        picVendorId: dataLeft.picVendorId,
        requestType: dataLeft.requestType,
        locationMode: dataLeft.locationMode,
        modelTeam: dataLeft.modelTeam,
        newAtmId: dataLeft.newAtmId,
        newMachineType: dataLeft.newMachineType,
        newLocationName: dataLeft.lokasiBaru,
        documentList,
        commentList,
      };
      console.log("+++dataHit Req", dataHit);
      doCreateUpdateTaskMigrasi(loadingHandler, dataHit)
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setOpenSuccessDeletePopUp(true);
            setSuccessLabel("Update Task Berhasil");
          }
        })
        .catch((err) => {
          console.log("Error Update New Task", err);
          alert(`Terjadi Kesalahan Update:${err}`);
        });
    }
  };
  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message: dataRight.message,
        cardTaskCategory: "parameter",
        cardTaskId: id,
      };
      doSaveComment(loadingHandler, dataHit)
        .then((res) => {
          console.log("~ res.data", res.data);
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

        <Grid container spacing={6} style={{ marginTop: 20 }}>
          <Grid item xs={7}>
            <LeftComponent
              data={dataLeft}
              isLoadData={isOpenModalLoader}
              errorForm={errorCreateKebutuhan}
              onChange={handleLeftComponent}
            />
          </Grid>
          <RightComponent
            data={dataRight}
            handleChangeState={handleRightComponent}
            onMessageEnter={saveComment}
          />
        </Grid>
        {/* Container */}
        {/* <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}

        {/* Right Component */}
        {/* <Grid item xs={5}>
          <HistorySection
            disableDropdown={true}
            showChatInput={true}
            showHistory={false}
            showChatHistory={true}
          />
          </Grid>
        </Grid> */}

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
            <ChkyButtons
              onClick={onSubmitEditTask}
              style={{ textTransform: "capitalize" }}
            >
              Submit
            </ChkyButtons>
          </Grid>
        </Grid>
      </div>
      <SuccessPopUp
        isOpen={openSuccessDeletePopUp}
        onClose={() => setOpenSuccessDeletePopUp(false)}
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
