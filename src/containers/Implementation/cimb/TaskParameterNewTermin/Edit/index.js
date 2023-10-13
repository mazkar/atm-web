/* eslint-disable radix */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { Button, Grid, Typography } from "@material-ui/core";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import { ChkyButtons } from "../../../../../components";
import constansts from "../../../../../helpers/constants";
import * as ThemeColor from "../../../../../assets/theme/colors";
import { RootContext } from "../../../../../router";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";
import {
  doCreateUpdateCardParameter,
  doFetchDetailParameterNewTermin,
  doSaveComment,
  doUploadDocument,
} from "../../../ApiServiceImplementation";
import ConfirmationPopUp from "../../common/PopUp/ConfirmationPopUp";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
});
function Create(props) {
  const classes = useStyles();
  const history = useHistory();
  // GET ID from URL
  const { taskId } = useParams();
  const { userId, userFullName } = useContext(RootContext);
  const implementationId = new URLSearchParams(window.location.search).get(
    "implementationId"
  );
  const [openSuccessEditPopUp, setOpenSuccessEditPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Update Task Berhasil");
  const [successType, setSuccessType] = useState("Add");
  const [dataLeft, setDataLeft] = useState({
    id: null,
    type: null,
    note: null,
    dueDate: null,
    vendor: null,
    requestType: null,
    typePremises: null,
    premises: null,
    cimbAttachment: [],
    documentList: [],
  });
  const [dataRight, setDataRight] = useState({
    status: null,
    message: null,
    commentsData: [],
  });
  const [errorCreate, setErrorCreate] = useState({
    note: false,
    dueDate: false,
  });
  const [openConfirmPop, setOpenConfirmPop] = useState(false);
  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
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
    setErrorCreate((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function selectedStatus(num) {
    // console.log("+++ num", num);
    const status = parseInt(num);
    switch (status) {
      case 0:
        return "TODO";
      case 1:
        return "DOING";
      case 2:
        return "DONE";
      case 3:
        return "STRIP";
      default:
        return "TODO";
    }
  }

  function statusToNumber(string) {
    switch (string) {
      case "TODO":
        return 0;
      case "DOING":
        return 1;
      case "DONE":
        return 2;
      case "STRIP":
        return 3;
      default:
        return 0;
    }
  }

  useEffect(() => {
    doFetchDetailParameterNewTermin(loadingHandler, { parameterId: taskId })
      .then((response) => {
        // console.log("+++ response", response);
        const resDataLeft = {
          id: response.implementationInfo.id,
          type: response.implementationInfo.taskTitle,
          note: response.implementationInfo.notesDescription,
          dueDate: response.implementationInfo.dueDate,
          vendor: response.implementationInfo.picVendorId,
          machineType: response.implementationInfo.machineType,
          requestType: response.implementationInfo.requestType,
          typePremises: response.implementationInfo.locationMode,
          premises: response.implementationInfo.modelTeam,
          cimbAttachment: response.cimbAttachment,
          documentList: dataLeft.documentList,
        };
        setDataLeft(resDataLeft);
        console.log(
          "+++ status",
          selectedStatus(response.implementationInfo.status)
        );
        const resDataRight = {
          status: selectedStatus(response.implementationInfo.status),
          message: dataRight.message,
          commentsData: response.comments,
        };
        setDataRight(resDataRight);
      })
      .catch((err) => {
        console.log("Error Get Detail Parameter", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  function validateForm() {
    let errorCount = 0;

    if (dataLeft.dueDate === "") {
      handleError("dueDate", true);
      errorCount += 1;
    } else {
      handleError("dueDate", false);
    }

    if (dataLeft.note === "") {
      handleError("note", true);
      errorCount += 1;
    } else {
      handleError("note", false);
    }

    return errorCount;
  }

  const onSubmitEditTask = async () => {
    const errorCount = validateForm();
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu!");
    } else {
      const documentList = [];
      // console.log("+++ cimbAttachment", dataLeft.cimbAttachment);
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
                  // console.log("data res", res)
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

      // console.log("+++ documentList", dataLeft.documentList);
      await doUploadDocuments(dataLeft.documentList);
      const dataHit = {
        id: dataLeft.id,
        implementationId: parseInt(implementationId),
        taskTitle: dataLeft.type,
        status: statusToNumber(dataRight.status),
        dueDate: moment.unix(dataLeft.dueDate / 1000).format("YYYY-MM-DD"), // <----- "2021-12-21"
        locationMode: dataLeft.typePremises,
        picVendorId: dataLeft.vendor,
        requestType: dataLeft.requestType,
        notesDescription: dataLeft.note,
        modelTeam: dataLeft.premises,
        documentList,
        commentList,
      };
      // console.log("+++ dataHit", dataHit);

      doCreateUpdateCardParameter(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessEditPopUp(true);
            setSuccessLabel("Update Task Berhasil");
          }
        })
        .catch((err) => {
          console.log("Error Create New Task", err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };

  // useEffect(() => {
  //   console.log("+++ dataLeft", dataLeft);
  // }, [dataLeft]);

  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message: dataRight.message,
        cardTaskCategory: "parameter",
        cardTaskId: taskId,
      };
      doSaveComment(loadingHandler, dataHit)
        .then((res) => {
          // console.log('~ res.data', res.data);
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
      <Grid container direction="column" spacing={2}>
        {/* <Grid item>
          <div className={classes.backAction}>
            <Button onClick={() => history.goBack()}>
              <BackIcon />
              <Typography className={classes.backLabel}>Back</Typography>
            </Button>
          </div>
        </Grid> */}
        <Grid item>
          <Typography className={classes.title}>Edit Task</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item xs={7}>
              <LeftComponent
                data={dataLeft}
                errorForm={errorCreate}
                onChange={handleLeftComponent}
              />
            </Grid>
            <Grid item xs={5}>
              <RightComponent
                data={dataRight}
                handleChangeState={handleRightComponent}
                onMessageEnter={saveComment}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item>
              <ChkyButtons
                buttonType="redOutlined"
                onClick={() => {
                  history.goBack();
                }}
                style={{ textTransform: "capitalize" }}
              >
                Cancel
              </ChkyButtons>
            </Grid>
            <Grid item>
              <ChkyButtons
                onClick={()=>setOpenConfirmPop(true)}
                style={{ textTransform: "capitalize" }}
              >
                Save
              </ChkyButtons>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmationPopUp
        isOpen={openConfirmPop}
        onSubmit={()=>onSubmitEditTask()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
      />
      <SuccessPopUp
        isOpen={openSuccessEditPopUp}
        onClose={() => history.push(`/implementation/${implementationId}`)}
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
}

Create.propTypes = {};

export default Create;
