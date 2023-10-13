import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { Grid, Typography } from "@material-ui/core";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import RightComponent from "./RightComponent";
import FromInput from "./FromInput";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { ChkyButtons } from "../../../../../components/chky";
import ConfirmDeletePopUp from "../../common/PopUp/deletePopUp";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import { doDeleteCardSecurity, doFetchDetailSecurity } from "../../../ApiServiceImplementation";
import { getInitialName, selectedStatus } from "../../common/Utils";
import ModalLoader from "../../../../../components/ModalLoader";

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
  const history = useHistory();
  const classes = useStyles();
  // GET ID from URL
  const { taskId } = useParams();
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openSuccesDelete, setOpenSuccesDelete] = useState(false);

  const [dataLeft, setDataLeft] = useState({
    id: null,
    category: null,
    description: null,
    dueDate: null,
    picVendor: null,
    bastDigital: null,
    bastSubmitStatus: false,
    photoFront: null,
    photoLeft: null,
    photoRight: null,
    photoRear: null,
    vendorAttachment: [],
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

  function handleDelete() {
    doDeleteCardSecurity(loadingHandler, {idSecurity: taskId})
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
  }

  useEffect(() => {
    doFetchDetailSecurity(loadingHandler, {idSecurity: taskId})
      .then((response) => {
        // console.log("+++ response", response);
        const resDataLeft = {
          category: response.detailImplementationSecurityDto.taskTitle !== null ?  response.detailImplementationSecurityDto.taskTitle : "-",
          description: response.detailImplementationSecurityDto.notesDescription !== null ?  response.detailImplementationSecurityDto.notesDescription : "-",
          dueDate: response.detailImplementationSecurityDto.dueDate !== null ? moment.unix(response.detailImplementationSecurityDto.dueDate/1000).format("YYYY-MM-DD") : "-",
          picVendor: response.detailImplementationSecurityDto.picVendor !== null ? response.detailImplementationSecurityDto.picVendor : "-",
          bastDigital: response.detailImplementationSecurityDto.bastId !== null ? response.detailImplementationSecurityDto.bastId : "-",
          bastSubmitStatus: response.detailImplementationSecurityDto.bastStatus || false,
          photoFront: response.detailImplementationSecurityDto.photoFrontVendor,
          photoLeft: response.detailImplementationSecurityDto.photoLeftVendor,
          photoRight: response.detailImplementationSecurityDto.photoRightVendor,
          photoRear: response.detailImplementationSecurityDto.photoRearVendor,
          vendorAttachment: response.vendorAttachment,
        };
        setDataLeft(resDataLeft);

        const timeline = [];
        if(response.historyLog.length > 0){
          response.historyLog.map((item)=>{
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
          status: selectedStatus(response.detailImplementationSecurityDto.status),
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
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              onClick={() => history.push(`/implementation/${implementationId}`)}
              buttonIcon={<ArrowLeft />}
            />
          </div>
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={7}><FromInput data={dataLeft}/></Grid>
            <Grid item xs={5}><RightComponent data={dataRight}/></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justify="space-between"
            direction="row"
            style={{ marginTop: 25 }}
          >
            <div className={classes.backButton}>
              <MuiIconLabelButton
                label="Delete Card"
                iconPosition="startIcon"
                onClick={()=>setOpenDeletePopUp(true)}
                buttonIcon={<TrashIcon />}
              />
            </div>
            <ChkyButtons
              height={38}
              btnType="redOutlined"
              buttonType="redOutlined"
              onClick={() => {
                history.push(`/implementation/task/security/${taskId}/edit?implementationId=${implementationId}`);
              }}
            >
              Edit
            </ChkyButtons>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmDeletePopUp
        isOpen={openDeletePopUp}
        onLeave={()=>setOpenDeletePopUp(false)}
        onClose={()=>setOpenDeletePopUp(false)}
        onSubmit={()=>{
          handleDelete();
        }}
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
