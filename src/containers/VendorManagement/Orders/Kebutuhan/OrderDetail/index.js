/* eslint-disable radix */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { withTranslation } from "react-i18next";
import { RootContext } from "../../../../../router";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import {
  doFetchDetailKebutuhan,
  doSaveOrUpdateTaskNeedVendor,
} from "../../../ApiServices";
import ModalLoader from "../../../../../components/ModalLoader";
import {
  getInitialName,
  selectedStatus,
  statusToNumber,
} from "../../../../Implementation/cimb/common/Utils";
import {
  doSaveComment,
  doUploadDocument,
} from "../../../../Implementation/ApiServiceImplementation";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import SuccessPopUp from "../../../../Implementation/cimb/common/PopUp/successPopUp";

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
  const { userId, userFullName, userRoleName } = useContext(RootContext);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isDisabledEdit, setIsDisabledEdit] = useState(false);
  const [dataLeft, setDataLeft] = useState({
    status: null,
    photoSebelum1: null,
    photoSebelum2: null,
    photoSebelum3: null,
    photoSebelum4: null,
    photoSesudah1: null,
    photoSesudah2: null,
    photoSesudah3: null,
    photoSesudah4: null,
    // photoList: [],
    invoiceNumber: null,
    invoiceFile: "",
    invoiceFileRes: null,
    documentList: [],
    cimbAttachment: [],
    vendorAttachment: [],
  });
  const [dataResponse, setDataResponse] = useState(null);
  const [dataRightComponent, setDataRight] = useState({
    message: "",
    timeLineData: [],
    commentsData: [],
  });
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Update Task Berhasil");
  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleLeftComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
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

  useEffect(() => {
    setIsDisabledEdit(userRoleName.toLowerCase().includes("vendor") === false);
    doFetchDetailKebutuhan(loadingHandler, id)
      .then((response) => {
        // console.log("+++ response", response);
        if (response) {
          setDataResponse(response);
          localStorage.setItem("bastId", response.bastId);
          const resDataLeft = {
            status: selectedStatus(response.status),
            photoSebelum1: response.photoFront,
            photoSebelum2: response.photoRight,
            photoSebelum3: response.photoLeft,
            photoSebelum4: response.photoRear,
            photoSesudah1: response.photoFrontVendor,
            photoSesudah2: response.photoRightVendor,
            photoSesudah3: response.photoLeftVendor,
            photoSesudah4: response.photoRearVendor,
            // photoList: [],
            invoiceNumber: response.invoiceNumber,
            invoiceFile: dataLeft.invoiceFile,
            invoiceFileRes: response.invoiceFile,
            documentList: [],
            cimbAttachment: [],
            vendorAttachment: response.vendorAttachment,
          };
          setDataLeft(resDataLeft);

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
            message: dataRightComponent.message,
            timeLineData: timeline,
            commentsData: response.comments,
          };
          setDataRight(resDataRight);
        }
      })
      .catch((err) => {
        console.log("Error Get Detail Parameter", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  const handleSave = async () => {
    const documentList = [];
    if (dataLeft.vendorAttachment.length > 0) {
      dataLeft.vendorAttachment.map((item) => {
        documentList.push({
          id: item.id,
          path: item.path,
          category: item.category,
          filename: item.filename,
        });
      });
    }

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
                      category: "vendor",
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

    // console.log("+++ documentList", dataLeft.documentList);
    await doUploadDocuments(dataLeft.documentList);

    // INVOICE HANDLE
    const invoiceFile = { path: dataResponse.invoiceFile };
    const uploadInvoiceAction = async (file) => {
      loadingHandler(true);
      await doUploadDocument(file)
        .then((res) => {
          // console.log("data res", res)
          if (res.status === 200) {
            if (res.data.responseCode === "00") {
              invoiceFile.path = res.data.path;
            } else {
              alert(res.data.responseMessage);
            }
          }
        })
        .catch((err) => {
          alert(`Failed to upload file ${err}`);
          loadingHandler(false);
        });
    };
    console.log("+++ dataLeft.invoiceFile", dataLeft.invoiceFile);
    if (dataLeft.invoiceFile) {
      await uploadInvoiceAction(dataLeft.invoiceFile);
    }

    const dataHit = {
      invoiceFile: invoiceFile.path,
      invoiceNumber: dataLeft.invoiceNumber,
      invoiceDate:
        dataLeft.invoiceFile !== ""
          ? Date.now()
          : dataResponse.invoiceDate,
      status: statusToNumber(dataLeft.status),
      documentList,
      id: parseInt(id),
    };
    console.log("+++ dataRequest", dataHit);
    doSaveOrUpdateTaskNeedVendor(loadingHandler, dataHit)
      .then((response) => {
        console.log("+++ response", response);
        if (response.status === 200) {
          setOpenSuccessPopUp(true);
          setSuccessLabel("Update Task Berhasil");
        }
      })
      .catch((err) => {
        console.log("Error Create New Task", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  };

  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message: dataRightComponent.message,
        cardTaskCategory: "need",
        cardTaskId: id,
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
          setModalLoader(false);
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
        <Typography className={classes.title}>Order Detail</Typography>

        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent
              data={dataLeft}
              dataResponse={dataResponse}
              isLoadData={isOpenModalLoader}
              handleChangeState={handleLeftComponent}
              handleSave={handleSave}
              idCard={id}
              isDisabledEdit={isDisabledEdit}
            />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              handleChangeState={handleRightComponent}
              onMessageEnter={saveComment}
            />
          </Grid>
        </Grid>
      </div>
      <ModalLoader isOpen={isLoadData} />
      {/* <FloatingChat /> */}
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={() => window.location.assign(`/vendor-orders`)}
        label={successLabel}
        type="Add"
      />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKebutuhan))
);
