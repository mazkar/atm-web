/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import { RootContext } from "../../../../../../router";
import constants from "../../../../../../helpers/constants";
import FloatingChat from "../../../../../../components/GeneralComponent/FloatingChat";
import MuiIconLabelButton from "../../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../../assets/images/trash.svg";
import {
  doFetchDetailParamMigrasi,
  doSaveOrUpdateParamMigrasi,
} from "../../../../ApiServices";
import ModalLoader from "../../../../../../components/ModalLoader";
import {
  selectedStatus,
  getInitialName,
  statusToNumber,
} from "../../../../../Implementation/cimb/common/Utils";
import {
  doSaveComment,
  doUploadDocument,
} from "../../../../../Implementation/ApiServiceImplementation";
import useTimestampConverter from "../../../../../../helpers/useTimestampConverter";
import SuccessPopUp from "../../../../../Implementation/cimb/common/PopUp/successPopUp";

const useStyles = makeStyles({
  root: {
    padding: 15,
    marginBottom: 10,
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
    fontWeight: "600",
    fontSize: "36px",
    color: "#2B2F3C",
  },
});

const paramNewTermin = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [isLoadData, setLoadData] = useState(false);
  const { userId, userFullName, userRoleName } = useContext(RootContext);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [isDisabledEdit, setIsDisabledEdit] = useState(false);
  const [dataLeft, setDataLeft] = useState({
    id: "",
    newAtmId: "",
    newMachineType: "",
    newLocationName: "",
    status: null,
    tellerId: "",
    remotePort: "",
    flmVendor: "",
    flmVendorRegional: "",
    flmVendorSubRegional: "",
    escrow: "",
    account: "",
    subAccount: "",
    noPsf: "",
    psfRequestDate: "",
    psfDoneDate: "",
    psfFile: "",
    psfFileRes: null,
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
    doFetchDetailParamMigrasi(loadingHandler, id)
      .then((response) => {
        console.log("get detail response", response);
        if (response) {
          setDataResponse(response);
          localStorage.setItem("bastId", response.bastId);
          const resDataLeft = {
            status: selectedStatus(response.status),
            newAtmId: response.newAtmId,
            newMachineType: response.newMachineType,
            newLocationName: response.newLocationName,
            tellerId: response.tellerId,
            remotePort: response.remotePort,
            flmVendor: response.remotePort,
            flmVendorRegional: response.flmVendorRegional,
            flmVendorSubRegional: response.flmVendorSubRegional,
            escrow: response.escrow,
            account: response.account,
            subAccount: response.subAccount,
            noPsf: response.noPsf,
            psfRequestDate: response.psfRequestDate,
            psfDoneDate: response.psfDoneDate,
            psfFile: dataLeft.psfFile,
            psfFileRes: response.psfFile,
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
        console.log("Error Get Detail", err);
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
                console.log("data res", res);
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

    //pfFILE
    const psfFile = {
      path: dataResponse.psfFile,
    };
    const uploadpsfFileAction = async (file) => {
      loadingHandler(true);
      await doUploadDocument(file)
        .then((res) => {
          console.log("data upload", res);
          if (res.status === 200) {
            if (res.data.responseCode === "00") {
              psfFile.path = res.data.path;
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
    console.log("dataleft.psfFile", dataLeft.psfFile);
    if (dataLeft.psfFile) {
      await uploadpsfFileAction(dataLeft.psfFile);
    }

    const dataHit = {
      id,
      newAtmId: dataLeft.newAtmId,
      newMachineType: dataLeft.newMachineType,
      newLocationName: dataLeft.newLocationName,
      tellerId: dataLeft.tellerId,
      remotePort: dataLeft.remotePort,
      flmVendor: dataLeft.flmVendor,
      flmVendorRegional: dataLeft.flmVendorRegional,
      flmVendorSubRegional: dataLeft.flmVendorSubRegional,
      escrow: dataLeft.escrow,
      account: dataLeft.account,
      subAccount: dataLeft.subAccount,
      noPsf: dataLeft.noRcf,
      psfRequestDate: moment.unix(dataLeft.psfRequestDate / 1000),
      psfDoneDate: moment.unix(dataLeft.psfDoneDate / 1000),
      psfFile: psfFile.path,
      status: statusToNumber(dataLeft.status),
      documentList,
      commentList,
    };
    console.log("req", dataHit);

    doSaveOrUpdateParamMigrasi(loadingHandler, dataHit)
      .then((res) => {
        console.log("response Req", res);
        if (res.status === 200) {
          setOpenSuccessPopUp(true);
          setSuccessLabel("Update Berhasil");
        }
      })
      .catch((err) => {
        console.log("Error Update", err);
        alert(`Terjadi Kesalahan: ${err}`);
      });
  };

  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message: dataRightComponent.message,
        cardTaskCategory: "parameter",
        cardTaskId: id,
      };
      doSaveComment(loadingHandler, dataHit)
        .then((res) => {
          console.log("res.comment", res.data);
          if (res.data) {
            if (res.data.responseCode === "00") {
              alert(`Berhasil save comment`);
              history.go(0);
            }
          }
        })
        .catch((err) => {
          alert(`Gagal save comment.${err}`);
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
        onClose={() => history.go(0)}
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
  connect(mapStateToProps)(withTranslation("translations")(paramNewTermin))
);
