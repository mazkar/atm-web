/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import axios from "axios";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import { RootContext } from "../../../../../router";
import ModalLoader from "../../../../../components/ModalLoader";
import { statusToNumber } from "../../common/Utils";

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
  const { userId, userFullName } = useContext(RootContext);
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    date: "",
    picVendor: "-",
    jenisMesin: "",
    merekMesin: "",
    tipeMesin: "",
    snMesin: "",
  });
  const [dataRightComponent, setDataRight] = useState({
    status: 'TODO',
  });
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false);
  const implementationId = new URLSearchParams(window.location.search).get(
    "implementationId"
  );
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
  });

  const handleLeftComponent = (e) => {
    setDataLeft(e);
  };

  const handleRightComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRight((prevValue)=>{
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

  useEffect(() => {
    console.log("Data Left: ", dataLeftComponent);
  }, [dataLeftComponent]);

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

    if (
      dataLeftComponent.picVendor === "" ||
      dataLeftComponent.picVendor === "-"
    ) {
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

    if (dataLeftComponent.jenisMesin === "") {
      handleError("jenisMesin", true);
      errorCount++;
    } else {
      handleError("jenisMesin", false);
    }

    if (dataLeftComponent.merekMesin === "") {
      handleError("merekMesin", true);
      errorCount++;
    } else {
      handleError("merekMesin", false);
    }

   /* if (dataLeftComponent.tipeMesin === "") {
      handleError("tipeMesin", true);
      errorCount++;
    } else {
      handleError("tipeMesin", false);
    }

    if (dataLeftComponent.snMesin === "") {
      handleError("snMesin", true);
      errorCount++;
    } else {
      handleError("snMesin", false);
    }*/

    return errorCount;
  }

  function handleCreateNewTask() {
    const isNotRequest = dataLeftComponent.category.toLocaleLowerCase().includes("not request");
    const request = {
      implementationId,
      userId,
      userName: userFullName,
      timeStamp: "",
      taskTitle: dataLeftComponent.category,
      notesDescription: dataLeftComponent.description,
      // planTanggalKirim: dataLeftComponent.date,
      planTanggalKirim: isNotRequest? null : moment
        .unix(dataLeftComponent.date / 1000)
        .format("YYYY-MM-DD"),
      picVendorId: isNotRequest? null : dataLeftComponent.picVendor,
      typeAtm: dataLeftComponent.jenisMesin,
      brandName: dataLeftComponent.merekMesin,
      machineType: dataLeftComponent.tipeMesin,
      snMachine: dataLeftComponent.snMesin,
      status: statusToNumber(dataRightComponent.status),
      id: null,
    };
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    setModalLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateTaskMesin`,
        request,
        headers
      )
      .then((res) => {
        if (res.status === 200) {
          setModalLoader(false);
          setOpenSuccessDeletePopUp(true);
          setSuccessLabel("Task Berhasil Ditambahkan");
        }
      })
      .catch((err) => {
        console.log("Error Create New Task", err);
        alert("Terjadi Kesalahan" + err);
        setModalLoader(false);
      });
  }

  const onSubmitNewTask = () => {
    let errorCount = 0;
    const isNotRequest = dataLeftComponent.category.toLocaleLowerCase().includes("not request");
    if(!isNotRequest){
      errorCount = validateForm();
    }
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu!");
    } else {
      handleCreateNewTask();
      // setOpenSuccessDeletePopUp(true)
      // setSuccessLabel('Task Berhasil Ditambahkan')
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
              errorForm={errorCreateKebutuhan}
              onChange={handleLeftComponent}
            />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              leftCategory={dataLeftComponent.category}
              onChange={handleRightComponent}
            />
          </Grid>
        </Grid>

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
            <Button
              variant="contained"
              disableElevation
              className={classes.primaryButton}
              onClick={onSubmitNewTask}
              style={{ textTransform: "capitalize" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
      <SuccessPopUp
        isOpen={openSuccessDeletePopUp}
        onClose={() => history.push(`/implementation/${implementationId}`)}
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
