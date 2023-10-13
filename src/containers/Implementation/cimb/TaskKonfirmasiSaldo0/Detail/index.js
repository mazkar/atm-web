import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import moment from "moment";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FromInput from "./FromInput";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { ChkyButtons } from "../../../../../components/chky";
import ConfirmDeletePopUp from "../../common/PopUp/deletePopUp";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import RightComponent from "./RightComponent";
import LeftComponent from "./LeftComponent";
import { doDeleteCardSaldoConfirmation, doFetchSaldoConfirmationDetail } from "../../../ApiServiceImplementation";
import ModalLoader from "../../../../../components/ModalLoader";
import { getInitialName, selectedStatus } from "../../common/Utils";

const useStyles = makeStyles({
  backButton: {
    marginBottom: 20,
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      padding: 0,
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
      "& .MuiButton-label": {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
});

const index = () => {
  const classes = useStyles();
  const history = useHistory();
  // GET ID from URL
  const { taskId } = useParams();
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openSuccesDelete, setOpenSuccesDelete] = useState(false);
  const [dataLeft, setDataLeft] = useState({
    title: null,
    note: null,
    date: null,
    photoFront: null,
    photoLeft: null,
    photoRight: null,
    photoRear: null,
  });
  const [dataRight, setDataRight] = useState({
    status: null,
    timeLineData:[],
    commentsData:[]
  });
  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const onFixDelete = () => {
    doDeleteCardSaldoConfirmation(loadingHandler, {balanceId: taskId})
      .then((response) => {
      // console.log("+++ response", response);
        if(response.responseCode === "00"){
          setOpenSuccesDelete(true);
          setOpenDeletePopUp(false);
        }
      }).catch((err) => {
        console.log('Error Get Detail Parameter', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  };

  const onClose = () => {
    setOpenDeletePopUp(false);
    console.log("close");
  };

  useEffect(() => {
    doFetchSaldoConfirmationDetail(loadingHandler, {balanceId: taskId})
      .then((response) => {
        // console.log("+++ response", response);
        const resDataLeft = {
          title: response.implementationBalanceInfo.taskTitle !== null ?  response.implementationBalanceInfo.taskTitle : "-",
          note: response.implementationBalanceInfo.notesDescription !== null ?  response.implementationBalanceInfo.notesDescription : "-",
          date: response.implementationBalanceInfo.dueDate !== null ? moment.unix(response.implementationBalanceInfo.dueDate/1000).format("DD/MM/YYYY") : "-",
          photoFront: response.implementationBalanceInfo.photoFront,
          photoLeft: response.implementationBalanceInfo.photoLeft,
          photoRight: response.implementationBalanceInfo.photoRight,
          photoRear: response.implementationBalanceInfo.photoRear,
        };
        setDataLeft(resDataLeft);

        const timeline = [];
        if(response.logHistoryChange.length > 0){
          response.logHistoryChange.map((item)=>{
            timeline.push({
              name: item.userName,
              initial: getInitialName(item.userName),
              message: item.message,
              date: moment.unix(item.createdDate/1000).format("DD-MM-YYYY"),
              time: moment.unix(item.createdDate/1000).format("HH:mm"),
            });
          });
        }
        const resDataRight = {
          status: selectedStatus(response.implementationBalanceInfo.status),
          timeLineData: timeline,
          commentsData: response.comments
        };
        setDataRight(resDataRight);
        
      }).catch((err) => {
        console.log('Error Get Detail Parameter', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <Typography
        style={{
          fontWeight: "500",
          fontSize: "36px",
          lineHeight: "43px",
          marginBottom: 20,
        }}
      >
        Task Detail
      </Typography>

      <Grid container spacing={2} direction="row" justify="space-between">
        <Grid item xs={7}>
          <LeftComponent data={dataLeft} />
        </Grid>
        <Grid item xs={5}>
          <RightComponent data={dataRight} />
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="row" justify="space-between" style={{marginTop: 20}}>
        <Grid item>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Delete Card"
              iconPosition="startIcon"
              onClick={()=>setOpenDeletePopUp(true)}
              buttonIcon={<TrashIcon />}
            />
          </div>
        </Grid>
        <Grid item>
          <ChkyButtons
            buttonType='redOutlined'
            onClick={() => {
              history.push(`/implementation/task/balance/${taskId}/edit?implementationId=${implementationId}`);
            }}
            style={{textTransform: 'capitalize'}}
          >
            Edit
          </ChkyButtons>
        </Grid>
      </Grid>

      <ConfirmDeletePopUp
        isOpen={openDeletePopUp}
        onClose={onClose}
        onLeave={onClose}
        onSubmit={onFixDelete}
      />
      <SuccessPopUp
        isOpen={openSuccesDelete}
        onClose={()=>{
          setOpenSuccesDelete(false);
          history.push(`/implementation/${implementationId}`);
        }}
        label="Hapus Berhasil Dilakukan"
        type="Delete"
      />
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
};

export default index;
