/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";
import { ja } from "date-fns/locale";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import SuccessPopUp from "../../../../Implementation/cimb/common/PopUp/successPopUp";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "../leftComponent";
import RightComponent from "../rightComponent";
import constants from "../../../../../helpers/constants";
import { RootContext } from "../../../../../router";
import ModalLoader from "../../../../../components/ModalLoader";
import {
  doSaveComment,
  doUploadDocument,
} from "../../../../Implementation/ApiServiceImplementation";
import {
  getInitialName,
  selectedStatus,
  statusToNumber,
} from "../../../../Implementation/cimb/common/Utils";
import { doSaveUpdateTerminasiAktivasi } from "../../../ApiServices";
// import DeletePopUp from "../../common/PopUp/deletePopUp";
// import SuccessPopUp from "../../common/PopUp/successPopUp";

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
  const [isDisabledEdit, setIsDisabledEdit] = useState(false);
  const { userId, userFullName, userRoleName } = useContext(RootContext);
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
    // photoList: [],
    ticketNumber: "",
    picVendor: "",
    region: "",
    jobType: "",
    impleDate: null,
    oldId: null,
    newId: null,
    jam: "",
    nameSignaeLouMou: "",
    emailSignaeLoMou: "",
    location: "",
    address: "",
    telpSignaeLouMou: "",
    noteDesc: "",
    bastId: null,
    picSlmTelp: null,
    picFlm: null,
    picFlmTelp: null,
    pisSlm: null,
    idRequest: "",
    initialBranch: "",
    gmfsCode: "",
    requestName: "",
    brancName: "",
    telpReq: "",
    emailRequester: "",
    branchAddress: "",
    namePicLoc: "",
    telpPicLoc: "",
    emailPicLoc: "",
    typeLoc: "",
    ruangAtm: "",
    luasArea: "",
    aksesUmum: "",
    operasional: null,
    jumlahAtmLain: null,
    denom: null,
    ac: null,
    kebersihan: "",
    komunikasi: "",
    promosi: null,
    notes: null,
    taskType: "",
    dateImleLapangan: null,
    documentDtoList: [],
    cimbAttachment: [],
    vendorAttachment: [],
    bastSubmitStatus: null,
  });

  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Add");
  const [isLoadData, setLoadData] = useState(false);
  const [dataResponse, setDataResponse] = useState(null);
  const [dataRightComponent, setDataRight] = useState({
    message: "",
    timeLineData: [],
    commentsData: [],
  });

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    jenisMesin: false,
    merekMesin: false,
  });

  const handleLeftComponent = (newVal, attribut) => {
    console.log(`+++ Change State ${attribut} : ${newVal}`);
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

  useEffect(() => {
    loadingHandler(true);
    setIsDisabledEdit(userRoleName.toLowerCase().includes("vendor") === false);
    // console.log("full URL", window.location.href.includes("terminasi"));
    axios({
      method: "GET",
      params: {
        id,
        taskType: window.location.href.includes("terminasi")
          ? "termination"
          : "activation",
      },
      url: `${constants.IMPLEMENTATION_SERVICE}/orderDetailActivationTermination`,
    })
      .then((res) => {
        // console.log("~ res.data ", res);
        loadingHandler(false);
        if (res) {
          const { content, vendorAttachment, cimbAttachment, historyLog } =
            res.data;
          // console.log("content", content);
          localStorage.setItem("bastId", content[0].bastId);
          const resDataLeft = {
            ticketNumber: content[0].ticketNumber
              ? content[0].ticketNumber
              : "-",
            taskType: content[0].taskType,
            picVendor: content[0].picVendor ? content[0].picVendor : "-",
            region: content[0].region ? content[0].region : "-",
            jobType: content[0].jobType,
            impleDate: moment
              .unix(content[0].impleDate / 1000)
              .format("DD/MM/YYYY"),
            oldId: content[0].oldId ? content[0].oldId : "-",
            jam: content[0].jam ? content[0].jam : null,
            jamImpleLapangan: content[0].jamLapangan
              ? content[0].jamLapangan
              : null,
            newId: content[0].newId ? content[0].newId : "-",
            location: content[0].location ? content[0].location : "-",
            nameSignaeLouMou: content[0].nameSignaeLouMou
              ? content[0].nameSignaeLouMou
              : "-",
            emailSignaeLouMou: content[0].emailSignaeLouMou
              ? content[0].emailSignaeLouMou
              : "-",
            address: content[0].address ? content[0].address : "-",
            telpSignaeLouMou: content[0].telpSignaeLouMou
              ? content[0].telpSignaeLouMou
              : "-",
            noteDesc: content[0].noteDesc ? content[0].noteDesc : "-",
            bastId: content[0].bastId ? content[0].bastId : null,
            pisSlm: content[0].pisSlm ? content[0].pisSlm : "-",
            picSlmTelp: content[0].picSlmTelp ? content[0].picSlmTelp : "-",
            picFlm: content[0].picFlm ? content[0].picFlm : "-",
            picFlmTelp: content[0].picFlmTelp ? content[0].picFlmTelp : "-",
            idRequest: content[0].idRequest ? content[0].idRequest : "-",
            initialBranch: content[0].initialBranch
              ? content[0].initialBranch
              : "-",
            gmfsCode: content[0].gmfsCode ? content[0].gmfsCode : "-",
            requestName: content[0].requestName ? content[0].requestName : "-",
            brancName: content[0].brancName ? content[0].brancName : "-",
            telpReq: content[0].telpReq ? content[0].telpReq : "-",
            emailRequester: content[0].emailRequester
              ? content[0].emailRequester
              : "-",
            branchAddress: content[0].branchAddress
              ? content[0].branchAddress
              : "-",
            namePicLoc: content[0].namePicLoc ? content[0].namePicLoc : "-",
            telpPicLoc: content[0].telpPicLoc ? content[0].telpPicLoc : "-",
            emailPicLoc: content[0].emailPicLoc ? content[0].emailPicLoc : "-",
            typeLoc: content[0].typeLoc ? content[0].typeLoc : "-",
            ruangAtm: content[0].ruangAtm ? content[0].ruangAtm : "-",
            luasArea: content[0].luasArea ? content[0].luasArea : "-",
            aksesUmum: content[0].aksesUmum ? content[0].aksesUmum : "-",
            operasional: content[0].operasional
              ? content[0].operasional.replace(/1970-01-01/g, "")
              : "-",
            jumlahAtmLain:
              content[0].jumlahAtmLain == null
                ? "-"
                : JSON.parse(content[0].jumlahAtmLain).toString(),
            denom: content[0].denom ? content[0].denom : "-",
            ac: content[0].ac ? content[0].ac : "-",
            kebersihan: content[0].kebersihan ? content[0].kebersihan : "-",
            komunikasi: content[0].komunikasi ? content[0].komunikasi : "-",
            dateImleLapangan:content[0].impleDateLapangan > 0 ? moment
              .unix(content[0].impleDateLapangan / 1000) : null
             ,
            promosi:
              content[0].promosi == null
                ? "-"
                : JSON.parse(content[0].promosi).toString(),
            notes: content[0].notes ? content[0].notes : "-",
            status: selectedStatus(content[0].status),
            photoSebelum1: content[0].photoFront,
            photoSebelum2: content[0].photoLeft,
            photoSebelum3: content[0].photoRear,
            photoSebelum4: content[0].photoRight,
            photoSesudah1: content[0].photoFrontVendor,
            photoSesudah2: content[0].photoLeftVendor,
            photoSesudah3: content[0].photoRightVendor,
            photoSesudah4: content[0].photoRearVendor,
            documentDtoList: [],
            cimbAttachment: res.data.cimbAttachment,
            vendorAttachment: res.data.vendorAttachment,
            bastSubmitStatus: content[0].bastSubmitStatus,
          };
          setDataLeft(resDataLeft);
          // console.log("left data", resDataLeft);
          // console.log("cimb", cimbAttachment);
          // console.log("vendor", vendorAttachment);
          // console.log("history", historyLog);
          const timeline = [];
          if (res.data.historyLog.length > 0) {
            res.data.historyLog.map((item) => {
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
            commentsData: res.data.comment,
          };
          setDataRight(resDataRight);
          // console.log("data rigth", resDataRight);
        }
      })
      .catch((err) => {
        loadingHandler(false);
        alert("Fetch data gagal!");
        // console.log("~ err", err);
      });
  }, []);

  const handleSave = async () => {
    const documentDtoList = [];
    if (dataLeftComponent.vendorAttachment.length > 0) {
      dataLeftComponent.vendorAttachment.map((item) => {
        documentDtoList.push({
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
                    documentDtoList.push({
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
    console.log("+++ documentList", dataLeftComponent.documentDtoList);
    await doUploadDocuments(dataLeftComponent.documentDtoList);

    const dataHit = {
      taskType: window.location.href.includes("terminasi")
        ? "termination"
        : "activation",
      dateImleLapangan: moment.unix(dataLeftComponent.dateImleLapangan / 1000),
      // moment(date_start_temp).utc().format("ddd MMM DD YYYY HH:mm:ss");
      jamImpleLapangan: dataLeftComponent.jamImpleLapangan,
      documentDtoList,
      id,
    };
    console.log("+++req data", dataHit);
    doSaveUpdateTerminasiAktivasi(loadingHandler, dataHit)
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
        message: dataRightComponent.message,
        cardTaskCategory: window.location.href.includes("terminasi")
          ? "termination"
          : "activation",
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
        <Typography className={classes.title}>Order Detail</Typography>

        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent
              content={dataLeftComponent}
              // isLoadData={isOpenModalLoader}
              errorForm={errorCreateKebutuhan}
              isDisabledEdit={isDisabledEdit}
              handleChangeState={handleLeftComponent}
              handleSave={handleSave}
              idCard={id}
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
      />
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={()=>setOpenSuccessPopUp(false)}
        label={successLabel}
        type={successType}
      /> */}
      <ModalLoader isOpen={isLoadData} />
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={() => window.location.assign(`/vendor-orders`)}
        label={successLabel}
        type={successType}
      />
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
