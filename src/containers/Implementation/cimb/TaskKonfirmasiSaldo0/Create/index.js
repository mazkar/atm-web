/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import { statusToNumber } from "../../common/Utils";
import { doCreateUpdateSaldoConfirmation, doUploadPhoto } from "../../../ApiServiceImplementation";
import { RootContext } from "../../../../../router";

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

const createKonfirmasiSaldo0 = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userId, userFullName } = useContext(RootContext);
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "Konfirmasi Saldo 0",
    description: "",
    date: "",
    photoList: [],
  });
  const [status, setStatus] = useState('DONE');
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Add");

  const [
    errorCreateKonfirmasiSaldo0,
    setErrorCreateKonfirmasiSaldo0,
  ] = useState({
    category: false,
    description: false,
    date: false,
  });

  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleLeftComponent = (e) => {
    setDataLeft(e);
  };

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorCreateKonfirmasiSaldo0((prevVal) => {
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

    if (dataLeftComponent.date === "") {
      handleError("date", true);
      errorCount++;
    } else {
      handleError("date", false);
    }

    return errorCount;
  }

  const onSubmitNewTask = async() => {
    let errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {
      // HANDLE PHOTO FILES
      const photoFront = { path: null, url: null };
      const photoRight = { path: null, url: null };
      const photoLeft = { path: null, url: null };
      const photoRear = { path: null, url: null };

      const doUploadPhotos = async(arr) =>{
        if(arr.length > 0){
          loadingHandler(true);
          await Promise.all(arr.map(async(item)=>{
            const {docKey} = item;

            await doUploadPhoto(item.file)
              .then((res) => {
              // console.log("data res", res);
              // console.log("docKey", docKey);
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    // eslint-disable-next-line default-case
                    switch (docKey) {
                    case "photoFront":
                      photoFront.path = res.data.path;
                      break;
                    case "photoLeft":
                      photoLeft.path = res.data.path;
                      break;
                    case "photoRight":
                      photoRight.path = res.data.path;
                      break;
                    case "photoRear":
                      photoRear.path = res.data.path;
                      break;
                    }
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
      await doUploadPhotos(dataLeftComponent.photoList);

      const dataHit = {
        userId: parseInt(userId),
        userName: userFullName,
        id: null,
        taskTitle : dataLeftComponent.category,
        implementationId: parseInt(implementationId),
        status : statusToNumber(status),
        notesDescription : dataLeftComponent.description,
        checkDate: moment.unix(dataLeftComponent.date/1000).format("YYYY-MM-DD"), // <----- "2021-12-21"
        photoRear: photoRear.path,
        photoFront: photoFront.path,
        photoLeft: photoLeft.path,
        photoRight: photoRight.path,
      };
    // console.log("+++ dataHit", dataHit);
      
      doCreateUpdateSaldoConfirmation(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessCreatePopUp(true);
            setSuccessLabel('Task Berhasil Ditambahkan');
          }
        }).catch((err) => {
          console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
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
              errorForm={errorCreateKonfirmasiSaldo0}
              onChange={handleLeftComponent}
            />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              status={status}
              isLoadData={isOpenModalLoader}
              handleChangeStatus={(newVal)=>setStatus(newVal)}
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
        isOpen={openSuccessCreatePopUp}
        onClose={()=>history.push(`/implementation/${implementationId}`)}
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
  connect(mapStateToProps)(
    withTranslation("translations")(createKonfirmasiSaldo0)
  )
);
