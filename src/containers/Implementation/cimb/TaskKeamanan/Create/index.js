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
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";
import { doCreateUpdateCardSecurity } from "../../../ApiServiceImplementation";
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

const createKeamanan = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userId, userFullName  } = useContext(RootContext);
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [dataRequest, setDataRequest] = useState({
    category: "",
    description: "",
    dueDate: "",
    picVendor: "-",
    status: 'TODO',
  });
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState("Hapus Berhasil Dilakukan");
  const [successType, setSuccessType] = useState("Add");

  const [errorCreate, setErrorCreate] = useState({
    category: false,
    description: false,
    dueDate: false,
    picVendor: false,
  });
  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleDataRequest = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataRequest((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });

  };

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorCreate((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm() {
    let errorCount = 0;

    if (dataRequest.category === "") {
      handleError("category", true);
      errorCount+= 1;
    } else {
      handleError("category", false);
    }

    if (dataRequest.description === "") {
      handleError("description", true);
      errorCount+= 1;
    } else {
      handleError("description", false);
    }

    if (dataRequest.picVendor === "" || dataRequest.picVendor === "-") {
      handleError("picVendor", true);
      errorCount+= 1;
    } else {
      handleError("picVendor", false);
    }

    if (dataRequest.dueDate === "") {
      handleError("dueDate", true);
      errorCount+= 1;
    } else {
      handleError("dueDate", false);
    }

    return errorCount;
  }

  const onSubmitNewTask = () => {
    let errorCount = 0;
    const isNotRequest = dataRequest.category.toLocaleLowerCase().includes("not request");
    if(!isNotRequest){
      errorCount = validateForm();
    }
    if (errorCount > 0) {
      alert("Harap lengkapi data terlebih dahulu!");
    } else {
      const dataHit = {
        id: null,
        userId,
        userName: userFullName,
        implementationId,
        taskTitle : isNotRequest? "Not Request": dataRequest.category,
        status : statusToNumber(dataRequest.status),
        dueDate: dataRequest.dueDate ? moment.unix(dataRequest.dueDate/1000).format("YYYY-MM-DD") : '', // <----- "2021-12-21"
        picVendorId : isNotRequest? null : dataRequest.picVendor,
        notesDescription : dataRequest.description,
        commentList : []
      };
      // console.log("+++ dataHit", dataHit);

      doCreateUpdateCardSecurity(loadingHandler, dataHit)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            setOpenSuccessPopUp(true);
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
          onClick={()=>history.push(`/implementation/${implementationId}`)}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>New Task</Typography>

        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent data={dataRequest} errorForm={errorCreate} onChange={handleDataRequest}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent titleCategory={dataRequest.category} data={dataRequest} onChange={handleDataRequest} />
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
        isOpen={openSuccessPopUp}
        onClose={()=>history.push(`/implementation/${implementationId}`)}
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKeamanan))
);
