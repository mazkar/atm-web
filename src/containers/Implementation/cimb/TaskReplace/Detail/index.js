/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { withTranslation } from "react-i18next";
import Axios from 'axios';
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "./LeftComponent";
import RightComponent from "./paperRight";
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
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
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
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    dueDate: "",
    picVendor: "",
    tipeMesin: "",
    requestType: "",
    denom: "",
    codeGfms: "",
    newAtmId: "",
    newMachineType: "",
    locationMode: "",
    modelTeam: "",
    noPsf: "",
    tglPsfSelesai: "",
    bastId: "",
    cimbAttachment:[],
    vendorAttachment: [],
  });
  const [dataRightComponent, setDataRight] = useState({
    status: ""
  });
  const [dataHistory, setDataHistory] = useState([]);
  const [dataComments, setDataComments] = useState([]);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Add');

  const getDetail = async (idKeb, implId) => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/detailTaskParameterReplace`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          implementationId,
          idParameter: taskId,
        },
      });
      const resItem = data.data;
      if (resItem) {
        const infoDetail = resItem.implementationParameterReplaceDto;
        // console.log("+++ infoDetail: ", infoDetail);
        setDataLeft({...dataLeftComponent, 
          category: infoDetail.taskTitle,
          description: infoDetail.notesDescription,
          dueDate: infoDetail.dueDate !== null ? moment.unix(infoDetail.dueDate/1000).format("DD/MM/YYYY") : "-",
          picVendor: infoDetail.picVendor,
          tipeMesin: infoDetail.machineType,
          requestType: infoDetail.requestType,
          denom: infoDetail.denom,
          codeGfms: infoDetail.codeGfms,
          newAtmId: infoDetail.newAtmId,
          newMachineType: infoDetail.newMachineType,
          locationMode: infoDetail.locationMode,
          modelTeam: infoDetail.modelTeam,
          tglPsfSelesai: infoDetail.psfDoneDate > 0 ? moment.unix(infoDetail.psfDoneDate/1000).format("DD/MM/YYYY") : "-",
          noPsf: infoDetail.noPsf,
          bastId: infoDetail.bastId,
          cimbAttachment: resItem.cimbAttachment,
          vendorAttachment: resItem.vendorAttachment,
        });
        setDataRight({...dataRightComponent, status: infoDetail.status,});
        setDataHistory(resItem.logHistoryChanges);
        setDataComments(resItem.comments);
      } else {
        alert(data.data.responseMessage);
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert(`Getting Detail ${error}`);
    }
  };

  useEffect(()=>{getDetail();},[]);

  const deleteTask = async () => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/deleteCardTaskParameterReplace`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          implementationId,
          idParameter: taskId
        },
      });
      if(data.data.responseCode === "00") {
        setOpenSuccessPopUp(true);
        setOpenDeletePop(false);
        setSuccessLabel('Hapus Berhasil Dilakukan');
        setSuccessType('Delete');
        // window.location.assign(`/implementation/vendor/main-kebutuhan`)
      } else {
        alert(data.data.responseMessage);
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert(`Getting Detail ${error}`);
    }
  };

  function handleDelete() {
    setOpenDeletePop(true);
    setSuccessLabel('Hapus Berhasil Dilakukan');
    setSuccessType('Delete');
  }

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
        <Typography className={classes.title}>
            Task Detail
        </Typography>
        
        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent data={dataLeftComponent} />
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              isLoadData={isOpenModalLoader}
              status={dataRightComponent.status}
              logHistory={dataHistory}
              comments={dataComments}
            />
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify='space-between'>
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
              onClick={()=>window.location.assign(`/implementation/task/parameter-replace/${taskId}/edit?implementationId=${implementationId}`)}
              style={{ textTransform: "capitalize" }}
            >
                    Edit
            </Button>
          </Grid>
        </Grid>
      </div>
      <DeletePopUp
        isOpen={openDeletePop}
        onSubmit={()=>{
          // setOpenSuccessPopUp(true)
          // setOpenDeletePop(false)
          deleteTask();
        }}
        onLeave={()=>setOpenDeletePop(false)}
        onClose={()=>setOpenDeletePop(false)}
      />
      <SuccessPopUp 
        isOpen={OpenSuccessPopUp}
        onClose={()=>history.push(`/implementation/${implementationId}`)}
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