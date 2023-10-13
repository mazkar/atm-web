/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Axios from "axios";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import DeletePopUp from "../../common/PopUp/deletePopUp";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";

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
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    date: "",
    picVendor: "",
    jenisMesin: "",
    merekMesin: "",
    tipeMesin: "",
    snMesin: "",
    jumlahKaset: "",
    jumlahReject: "",
    kondisiSticker: "",
    stickerId: "",
    newAtmId: "",
    photoDepan: null,
    photoKanan: null,
    photoKiri: null,
    photoBelakang: null,
    bastId: null,
    bastSubmitStatus: false,
    vendorAttachments: [],
  });
  const [dataRightComponent, setDataRight] = useState({
    status: "",
  });
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [dataComments, setDataComments] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Add");

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    jenisMesin: false,
    merekMesin: false,
    tipeMesin: false,
    snMesin: false,
    jumlahKaset: false,
    jumlahReject: false,
    kondisiSticker: false,
    stickerId: false,
    newAtmId: false,
  });

  const handleLeftComponent = (e) => {
    setDataLeft(e);
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

  function handleDelete() {
    setOpenDeletePop(true);
    setSuccessLabel("Hapus Berhasil Dilakukan");
    setSuccessType("Delete");
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
      // console.log("Response: ", resItem);
        setDataLeft({
          ...dataLeftComponent,
          category: resItem.detailImplementationMesinDto.taskTitle,
          description: resItem.detailImplementationMesinDto.notesDescription,
          picVendor: resItem.detailImplementationMesinDto.picVendor,
          date: resItem.detailImplementationMesinDto.planTanggalKirim,
          jenisMesin: resItem.detailImplementationMesinDto.typeAtm,
          merekMesin: resItem.detailImplementationMesinDto.brandName,
          tipeMesin: resItem.detailImplementationMesinDto.machineType,
          snMesin: resItem.detailImplementationMesinDto.snMachine,
          jumlahKaset: resItem.detailImplementationMesinDto.jumlahKaset,
          jumlahReject: resItem.detailImplementationMesinDto.jumlahReject,
          kondisiSticker: resItem.detailImplementationMesinDto.kondisiSticker,
          stickerId: resItem.detailImplementationMesinDto.stickerId,
          newAtmId: resItem.detailImplementationMesinDto.newAtmId,
          photoDepan:
            resItem.detailImplementationMesinDto.photoFrontVendor !== ""
              ? resItem.detailImplementationMesinDto.photoFrontVendor
              : null,
          photoKanan:
            resItem.detailImplementationMesinDto.photoRightVendor !== ""
              ? resItem.detailImplementationMesinDto.photoRightVendor
              : null,
          photoKiri:
            resItem.detailImplementationMesinDto.photoLeftVendor !== ""
              ? resItem.detailImplementationMesinDto.photoLeftVendor
              : null,
          photoBelakang:
            resItem.detailImplementationMesinDto.photoRearVendor !== ""
              ? resItem.detailImplementationMesinDto.photoRearVendor
              : null,
          vendorAttachments: resItem.vendorAttachment,
          bastId: resItem.detailImplementationMesinDto.bastId,
          bastSubmitStatus: resItem.detailImplementationMesinDto.bastStatus || false,
        });
        setDataRight({
          ...dataRightComponent,
          status: resItem.detailImplementationMesinDto.status,
          commentsData: resItem.detailImplementationMesinDto.comments,
        });
        setDataHistory(resItem.logHistoryChanges);
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

  const deleteTask = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/deleteCardTaskMesin`,
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
      if (data.data.responseCode === "00") {
        setOpenSuccessPopUp(true);
        setOpenDeletePop(false);
        setSuccessLabel("Hapus Berhasil Dilakukan");
        setSuccessType("Delete");
        // window.location.assign(`/implementation/vendor/main-kebutuhan`)
      } else {
        alert(data.data.responseMessage);
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert("Getting Detail " + error);
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
        <Typography className={classes.title}>Task Detail</Typography>

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
              comments={dataComments}
              isLoadData={isOpenModalLoader}
              logHistory={dataHistory}
              status={dataRightComponent.status}
            />
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify="space-between">
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
              onClick={() =>
                window.location.assign(
                  `/implementation/task/mesin/${taskId}/edit?implementationId=${implementationId}`
                )
              }
              style={{ textTransform: "capitalize" }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </div>
      <DeletePopUp
        isOpen={openDeletePop}
        onSubmit={() => {
          // setOpenSuccessPopUp(true)
          // setOpenDeletePop(false)
          deleteTask();
        }}
        onLeave={() => setOpenDeletePop(false)}
        onClose={() => setOpenDeletePop(false)}
      />
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={() => {
          if (successType === "Delete") {
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
