/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Grid, Typography } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
// import DeletePopUp from "../../common/PopUp/deletePopUp";
// import SuccessPopUp from "../../common/PopUp/successPopUp";
import { doFetchDetailBooth, doSaveOrUpdateTaskBoothVendor } from "../../../ApiServices";
import { doSaveComment, doUploadDocument } from "../../../../Implementation/ApiServiceImplementation";
import ModalLoader from "../../../../../components/ModalLoader";
import { RootContext } from "../../../../../router";
import {
  getInitialName,
  selectedStatus,
  statusToNumber
} from "../../../../Implementation/cimb/common/Utils";
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
  const { taskId } = useParams();
  // const param = useParams();
  // console.log("+++ param",param);
  const { userId, userFullName, userRoleName } = useContext(RootContext);
  const [isDisabledEdit, setIsDisabledEdit] = useState(false);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    status: null,
    photoSebelum1: null,
    photoSebelum2: null,
    photoSebelum3: null,
    photoSebelum4: null,
    photoSesudah1: null,
    photoSesudah2: null,
    photoSesudah3: null,
    photoSesudah4: null,
    invoiceNumber: null,
    invoiceFile: "",
    invoiceFileRes: null,
    tglSelesai: null,
    tglPengerjaan: null,
    documentList: [],
    cimbAttachment: [],
    vendorAttachment: [],
    category: "",
    description: "",
    date: "",
    picVendor: "",
    jenisMesin: "",
    merekMesin: "",
  });
  const [dataRightComponent, setDataRight] = useState([]);
  const [isLoadData, setLoadData] = useState(false);
  const [dataResponse, setDataResponse] = useState(null);

  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    jenisMesin: false,
    merekMesin: false,
  });

  const handleLeftComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataLeft((prevValue)=>{
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

  useEffect(() => {
    setIsDisabledEdit(userRoleName.toLowerCase().includes("vendor") === false);
    doFetchDetailBooth(loadingHandler, taskId)
      .then((response) => {
        // console.log("+++ response", response);
        if (response) {
          setDataResponse(response);
          // localStorage.setItem("bastId", response.bastId);
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
            invoiceNumber: response.invoiceNumber,
            invoiceFile: "",
            invoiceFileRes: response.invoiceFile,
            tglSelesai: response.completeDate,
            tglPengerjaan: response.processingDate,
            cimbAttachment: response.cimbAttachment,
            vendorAttachment: response.vendorAttachment,
            documentList: [],
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
        // console.log("Error Get Detail Parameter", err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message: dataRightComponent.message,
        cardTaskCategory: "booth",
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
          setModalLoader(false);
        });
    }
  };

  const handleSave = async()=>{
    // console.log("+++ dataRequest", dataLeftComponent);
    
    const documentList = [];

    const doUploadDocuments = async(arr) =>{
      if(arr.length > 0){
        loadingHandler(true);
        await Promise.all(arr.map(async(item)=>{
          await doUploadDocument(item.file)
            .then((res) => {
            // console.log("data res", res)
              if (res.status === 200) {
                if (res.data.responseCode === "00") {
                  documentList.push({
                    id: null,
                    path: res.data.path,
                    category: "vendor",
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
    
    await doUploadDocuments(dataLeftComponent.documentList);

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
    // console.log("+++ dataLeft.invoiceFile", dataLeftComponent.invoiceFile);
    if (dataLeftComponent.invoiceFile) {
      await uploadInvoiceAction(dataLeftComponent.invoiceFile);
    }

    const dataHit = {
      // eslint-disable-next-line radix
      id: parseInt(taskId),
      invoiceNumber: dataLeftComponent.invoiceNumber,
      invoiceFile: dataLeftComponent.invoiceFile? invoiceFile.path : dataResponse.invoiceFile,
      status: statusToNumber(dataLeftComponent.status),
      invoiceDate:
      dataLeftComponent.invoiceFile !== ""
        ? Date.now()
        : moment(dataResponse.invoiceDate, "DD-MM-YYYY").valueOf(),
      documentList: dataLeftComponent.documentList.length>0? documentList : dataResponse.vendorAttachment,
    };

    // console.log("+++ dataHit", dataHit);
    // alert("submit");
    doSaveOrUpdateTaskBoothVendor(loadingHandler, dataHit)
      .then((response) => {
        // console.log("+++ response", response);
        if (response.status === 200) {
          setOpenSuccessPopUp(true);
        }
      })
      .catch((err) => {
        // console.log("Error Create New Task", err);
        alert(`Terjadi Kesalahan:${err}`);
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
        <Typography className={classes.title}>Order Detail</Typography>

        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent
              data={dataLeftComponent}
              dataResponse={dataResponse}
              isLoadData={isOpenModalLoader}
              errorForm={errorCreateKebutuhan}
              handleChangeState={handleLeftComponent}
              handleSave={handleSave}
              isDisabledEdit={isDisabledEdit}
              idCard={taskId}
            />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              isLoadData={isOpenModalLoader}
              handleChangeState={handleRightComponent}
              onMessageEnter={saveComment}
            />
          </Grid>
        </Grid>

        {/* Button Container */}
        {/* <Grid container style={{ marginTop: 20 }} justify='space-between'>
            <Grid item>
                <div className={classes.backButton}>
                    <MuiIconLabelButton
                    label="Delete Card"
                    iconPosition="startIcon"
                    onClick={handleDelete}
                    buttonIcon={<TrashIcon />}
                    />
                </div>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={()=>window.location.assign('/implementation/edit-task-mesin')}
                    style={{ textTransform: "capitalize" }}
                >
                    Edit
                </Button>
            </Grid>
        </Grid> */}
      </div>
      {/* <DeletePopUp
        isOpen={openDeletePop}
        onSubmit={()=>{
          setOpenSuccessPopUp(true)
          setOpenDeletePop(false)
        }}
        onLeave={()=>setOpenDeletePop(false)}
        onClose={()=>setOpenDeletePop(false)}
      /> */}
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={() => window.location.assign(`/vendor-orders`)}
        label="Update Task Berhasil"
        type="success"
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
  connect(mapStateToProps)(withTranslation("translations")(createKebutuhan))
);
