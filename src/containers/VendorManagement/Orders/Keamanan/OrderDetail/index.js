import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { Grid, Typography, Button } from "@material-ui/core";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import constants from "../../../../../helpers/constants";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import { RootContext } from "../../../../../router";
import ModalLoader from "../../../../../components/ModalLoader";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import SuccessPopUp from "../../../../Implementation/cimb/common/PopUp/successPopUp";
import {
  doFetchDetailKeamanan,
  doSaveOrUpdateTaskSecurityVendor,
} from "../../../ApiServices";
import {
  doSaveComment,
  doUploadDocument,
} from "../../../../Implementation/ApiServiceImplementation";
import {
  getInitialName,
  selectedStatus,
  statusToNumber,
} from "../../../../Implementation/cimb/common/Utils";
import moment from "moment";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
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
  const { id } = useParams();
  const { userId, userFullName, userRoleName } = useContext(RootContext);
  const [isDisabledEdit, setIsDisabledEdit] = useState(false);
  const [isLoadData, setLoadData] = useState(false);
  const [dataResponse, setDataResponse] = useState(null);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Update Task Berhasil");
  const [dataLeft, setDataLeft] = useState({
    status: "",
    photoFrontVendor: null,
    photoLeftVendor: null,
    photoRearVendor: null,
    photoRightVendor: null,
    invoiceNumber: null,
    invoiceFile: "",
    invoiceFileRes: "",
    documentList: [],
    vendorAttachment: [],
  });
  const [dataRight, setDataRight] = useState({
    message: "",
    timeLineData: [],
    commentsData: [],
  });
  function loadingHandler(bool) {
    setLoadData(bool);
  }
  const handleRightComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRight((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };
  const handleLeftComponent = (newVal, attribut) => {
    console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataLeft((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };
  /*Fetch Detail Data*/
  useEffect(() => {
    setIsDisabledEdit(userRoleName.toLowerCase().includes("vendor") === false);
    doFetchDetailKeamanan(loadingHandler, { id: id })
      .then((response) => {
        console.log("+++ response", response);
        if (response) {
          setDataResponse(response);
          localStorage.setItem("bastId", response.bastId);
          const resDataLeft = {
            status: selectedStatus(response.status),
            photoFrontVendor: response.photoFrontVendor,
            photoLeftVendor: response.photoLeftVendor,
            photoRearVendor: response.photoRearVendor,
            photoRightVendor: response.photoRightVendor,
            invoiceNumber: response.invoiceNumber,
            invoiceFile: dataLeft.invoiceFile,
            invoiceFileRes: response.invoiceFile,
            documentList: [],
            vendorAttachment: response.documentVendor,
          };
          setDataLeft(resDataLeft);
          console.log(resDataLeft);

          const timeline = [];
          if (response.historyLog.length > 0) {
            response.historyLog.map((item) => {
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
            message: dataRight.message,
            timeLineData: timeline,
            commentsData: response.comment,
          };
          setDataRight(resDataRight);
          console.log(resDataRight);
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
    const doUploadDocuments = async (arr) => {
      if (arr.length > 0) {
        loadingHandler(true);
        await Promise.all(
          arr.map(async (item) => {
            await doUploadDocument(item.file)
              .then((res) => {
                console.log("data resfile", res);
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
    console.log("+++ documentList", dataLeft.documentList);
    await doUploadDocuments(dataLeft.documentList);

    //Upload Invoice

    const invoiceFile = { path: dataResponse.invoiceFile };
    const uploadInvoiceAction = async (file) => {
      loadingHandler(true);
      await doUploadDocument(file)
        .then((res) => {
          console.log("res file invoice", res);
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
    console.log("dataLeft.invoiceFile", dataLeft.invoiceFile);
    if (dataLeft.invoiceFile) {
      await uploadInvoiceAction(dataLeft.invoiceFile);
    }
    const dataHit = {
      invoiceFile: invoiceFile.path ? invoiceFile.path : "",

      invoiceNumber: dataLeft.invoiceNumber,
      invoiceDate:
        dataLeft.invoiceFile !== ""
          ? moment.unix(Math.round(+new Date() / 1000), "DD-MM-YYYY")
          : moment.unix(dataResponse.invoiceDate / 1000, "DD-MM-YYYY"),
      status: statusToNumber(dataLeft.status),
      userId: parseInt(userId),
      userName: userFullName,
      documentList,
      commentList,
      id,
    };
    console.log("+++req data", dataHit);
    doSaveOrUpdateTaskSecurityVendor(loadingHandler, dataHit)
      .then((response) => {
        console.log("+++response", response);
        if (response.status === 200) {
          setOpenSuccessPopUp(true);
          setSuccessLabel("Update Task Berhasil");
        }
      })
      .catch((err) => {
        console.log("Error Create New Task", err);
        alert(`Terjadi Kesalahan: ${err}`);
      });
  };
  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message: dataRight.message,
        cardTaskCategory: "security",
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
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component*/}
          <Grid item xs={7}>
            <LeftComponent
              data={dataLeft}
              dataResponse={dataResponse}
              isDisabledEdit={isDisabledEdit}
              handleChangeState={handleLeftComponent}
              handleSave={handleSave}
              idCard={id}
            />
          </Grid>
          {/*Right Component*/}
          <Grid item xs={5}>
            <RightComponent
              data={dataRight}
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
  connect(mapStateToProps)(withTranslation("translations")(createKeamanan))
);
