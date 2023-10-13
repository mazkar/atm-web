/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import {
  doCreateUpdateTaskMigrasi,
  doUploadDocument,
} from "../../../ApiServiceImplementation";
import ModalLoader from "../../../../../components/ModalLoader";
import { ChkyButtons } from "../../../../../components";

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

const createMigrasi = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const implementationId = new URLSearchParams(window.location.search).get(
    "implementationId"
  );
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    date: "",
    picVendor: "",
    requestType: "",
    locationMode: "OFF",
    modelTeam: "konvensional",
    atmIdBaru: "",
    mesinBaru: "",
    lokasiBaru: "",
    documentList: [],
  });

  const [dataRightComponent, setDataRight] = useState({
    status: 0,
  });
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Add");
  const [isLoadData, setLoadData] = useState(false);

  const [errorCreateMigrasi, setErrorCreateMigrasi] = useState({
    category: false,
    description: false,
    date: false,
    picVendor: false,
    requestType: false,
    locationMode: false,
    modelTeam: false,
    atmIdBaru: false,
    mesinBaru: false,
    lokasiBaru: false,
  });

  function loadingHandler(bool) {
    setLoadData(bool);
  }
  const handleLeftComponent = (e) => {
    setDataLeft(e);
  };

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorCreateMigrasi((prevVal) => {
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

    if (dataLeftComponent.requestType === "") {
      handleError("requestType", true);
      errorCount++;
    } else {
      handleError("requestType", false);
    }

    {/*if (dataLeftComponent.atmIdBaru === "") {
      handleError("atmIdBaru", true);
      errorCount++;
    } else {
      handleError("atmIdBaru", false);
    }

    if (dataLeftComponent.mesinBaru === "") {
      handleError("mesinBaru", true);
      errorCount++;
    } else {
      handleError("mesinBaru", false);
    }

    if (dataLeftComponent.lokasiBaru === "") {
      handleError("lokasiBaru", true);
      errorCount++;
    } else {
      handleError("lokasiBaru", false);
    }*/}

    return errorCount;
  }

  const onSubmitNewTask = async () => {
    let errorCount = 0;
    const isNotRequest = dataLeftComponent.category
      .toLocaleLowerCase()
      .includes("not request");
    if (!isNotRequest) {
      errorCount = validateForm();
    }
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu!");
    } else {
      const documentList = [];
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
      await doUploadDocuments(dataLeftComponent.documentList);

      const dataHit = {
        id: null,
        implementationId,
        taskTitle: dataLeftComponent.category,
        status: dataRightComponent.status,
        dueDate: dataLeftComponent.date,
        picVendorId: isNotRequest ? null : dataLeftComponent.picVendor,
        notesDescription: dataLeftComponent.description,
        requestType: dataLeftComponent.requestType,
        locationMode: dataLeftComponent.locationMode,
        modelTeam: dataLeftComponent.modelTeam,
        newAtmId: dataLeftComponent.atmIdBaru,
        newMachineType: dataLeftComponent.mesinBaru,
        newLocationName: dataLeftComponent.lokasiBaru,
        documentList,
      };
      console.log("+++dataHit Req", dataHit);
      doCreateUpdateTaskMigrasi(loadingHandler, dataHit)
        .then((response) => {
          console.log("resp", response);
          if (response.status === 200) {
            setOpenSuccessCreatePopUp(true);
            setSuccessLabel("Task Berhasil Ditambahkan");
          }
        })
        .catch((err) => {
          console.log("Error Create New Task", err);
          alert(`Terjadi Kesalahan: ${err}`);
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
        <Typography className={classes.title}>New Task</Typography>

        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent
              data={dataLeftComponent}
              isLoadData={isOpenModalLoader}
              errorForm={errorCreateMigrasi}
              onChange={handleLeftComponent}
            />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              isLoadData={isOpenModalLoader}
              category={dataLeftComponent.category}
            />
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify="space-between">
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
              onClick={onSubmitNewTask}
              style={{ textTransform: "capitalize" }}
            >
              Submit
            </ChkyButtons>
          </Grid>
        </Grid>
      </div>
      <SuccessPopUp
        isOpen={openSuccessCreatePopUp}
        onClose={() => history.push(`/implementation/${implementationId}`)}
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
  connect(mapStateToProps)(withTranslation("translations")(createMigrasi))
);
