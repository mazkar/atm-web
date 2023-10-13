/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import ModalLoader from "../../../../../components/ModalLoader";
import SuccessPopUp from "../../../../Implementation/cimb/common/PopUp/successPopUp";
import {
  getInitialName,
  selectedStatus,
  statusToNumber
} from "../../../../Implementation/cimb/common/Utils";
import { doCreatePostJarkomOrderDetail, doSaveComment, doUploadDocument } from "../../../../Implementation/ApiServiceImplementation";
import { RootContext } from "../../../../../router";
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
  const { userId, userFullName, userRoleName } = useContext(RootContext);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Add");
  const [responseContent, setResponseContent] = useState({});
  const [dataLeftComponent, setDataLeft] = useState({
    photoSebelum1: null,
    photoSebelum2: null,
    photoSebelum3: null,
    photoSebelum4: null,
    photoSesudah1: null,
    photoSesudah2: null,
    photoSesudah3: null,
    photoSesudah4: null,

    completedDate: null,

    invoiceNumber: null,
    invoiceFile: "",
    invoiceFileRes: null,
    documentList: [],
    cimbAttachment: [],
    vendorAttachment: [],

    // ipMesin: "",
    status: null,
    locationPic: null,
    locationPicEmail: null,
    locationPicTelephone: null,

    machineType: null,
    remarkVendor: null,
    ipAddressMachine: null,
    ipAddress: null,
    provider: null,
    ipGateway: null,
    ipSubnetMask: null,
    hub: true,
    hubNumber: null,
    branchCode: null,

  });

  const [dataRightComponent, setDataRight] = useState([]);
  const [isLoadData, setLoadData] = useState(false);
  const [isDisabledEdit, setIsDisabledEdit] = useState(false);

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    jenisMesin: false,
    merekMesin: false,
  });

  function loadingHandler(bool) {
    setLoadData(bool);
  }

  // const handleLeftComponent = (e) => {
  //   setDataLeft(e);
  // };

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

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorCreateKebutuhan((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function fetchData() {
    loadingHandler(true);
    axios
      .get(
        `${constants.IMPLEMENTATION_SERVICE}/getDetailTaskJarkomVendor?id=${id}`
      )
      .then((res) => {
        // console.log("II DATA RES =>", res);
        setResponseContent(res.data);
        loadingHandler(false);
        const resDataLeft = {
          photoSebelum1: res.data.photoFront,
          photoSebelum2: res.data.photoRight,
          photoSebelum3: res.data.photoLeft,
          photoSebelum4: res.data.photoRear,
          photoSesudah1: res.data.photoFrontVendor,
          photoSesudah2: res.data.photoRightVendor,
          photoSesudah3: res.data.photoLeftVendor,
          photoSesudah4: res.data.photoRearVendor,

          completedDate: res.data.completedDate,

          invoiceNumber: res.data.invoiceNumber,
          invoiceFile: dataLeftComponent.invoiceFile,
          invoiceFileRes: res.data.invoiceFile,
          documentList: [],
          cimbAttachment: res.data.cimbAttachment,
          vendorAttachment: res.data.vendorAttachment,

          // ipMesin:res.data.ipAddressMachine,
          status: selectedStatus(res.data.status),
          locationPic: res.data.locationPic,
          locationPicEmail: res.data.locationPicEmail,
          locationPicTelephone: res.data.locationPicTelephone,

          machineType: res.data.machineType,
          remarkVendor: res.data.remarkVendor,
          ipAddress: res.data.ipAddress,
          ipAddressMachine: res.data.ipAddressMachine,
          provider: res.data.provider,
          ipGateway: res.data.ipGateway,
          ipSubnetMask: res.data.ipSubnetMask,
          hub: res.data.hub? "true" : "false",
          hubNumber: res.data.hubNumber,
          branchCode: res.data.branchCode,

        };
        setDataLeft(resDataLeft);
        const timeline = [];
        if (res.data?.logHistoryChanges?.length > 0) {
          res.data.logHistoryChanges.map((item) => {
            // console.log("ITEMS MAP =>", item);
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
          commentsData: res.data.comments,
        };
        // console.log("INI DATA RIGHT", resDataRight);
        setDataRight(resDataRight);
      })
      .catch((err) => {
        loadingHandler(false);
        // console.log("~ err", err);
        alert("Terjadi kesalahan", err);
      });
  }

  useEffect(() => {
    fetchData();
    setIsDisabledEdit(userRoleName.toLowerCase().includes("vendor") === false);
  }, [id]);

  const backHandle = ()=>{
    if(userRoleName.toLowerCase().includes("vendor")){
      window.location.assign('/vendor-orders')
    }else{
      window.location.assign('/vendor-management/orders')
    }
  }
  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const dataHit = {
        message: dataRightComponent.message,
        cardTaskCategory: "jarkom",
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

  const handleSubmit = async () => {

    const documentList = [];

    if(dataLeftComponent.vendorAttachment.length > 0){
      dataLeftComponent.vendorAttachment.map((item)=>{
        documentList.push({
          id: item.id,
          path: item.path,
          category: item.category,
          filename: item.filename
        });
      });
    }

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

    const bodyData = {
      id,
      // ipMesin: dataLeftComponent.ipAddressMachine,
      status: statusToNumber(dataLeftComponent.status),
      ipAddressMachine: dataLeftComponent.ipAddressMachine,
      locationPic: dataLeftComponent.locationPic,
      locationPicEmail: dataLeftComponent.locationPicEmail,
      locationPicTelephone: dataLeftComponent.locationPicTelephone,
      machineType: dataLeftComponent.machineType,
      remarkVendor: dataLeftComponent.remarkVendor,
      provider: dataLeftComponent.provider,
      ipAddress: dataLeftComponent.ipAddress,
      ipGateway: dataLeftComponent.ipGateway,
      ipSubnetMask: dataLeftComponent.ipSubnetMask,
      hub: dataLeftComponent.hub === "true",
      hubNumber: dataLeftComponent.hubNumber,
      branchCode: dataLeftComponent.branchCode,
      documentList,
    };
    // console.log("+++ bodyData", bodyData);

    doCreatePostJarkomOrderDetail(loadingHandler, bodyData)
      .then((response) => {
        // console.log("+++ response", response);
        const {data} = response;
        if (data.responseCode === "200") {
           setOpenSuccessPopUp(true);
           setSuccessLabel("Update Task Berhasil");
        }
      }).catch((err) => {
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
              content={responseContent}
              errorForm={errorCreateKebutuhan}
              handleChangeState={handleLeftComponent}
              isDisabledEdit={isDisabledEdit}
              idCard={id}
              handleSubmit={handleSubmit}
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
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={backHandle}
        label={successLabel}
        type={successType}
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
