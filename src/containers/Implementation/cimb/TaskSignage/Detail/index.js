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
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import LeftComponent from "./paperLeft";
import RightComponent from "./paperRight";
import constants from "../../../../../helpers/constants";
import DeletePopUp from "../../common/PopUp/deletePopUp";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import moment from "moment";
import { doDeleteCardSignage, doFetchDetailSignage } from '../../../ApiServiceImplementation';

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
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const [isOpenModalLoader, setModalLoader] = useState(false)
  const [dataLeftComponent, setDataLeft] = useState({
    type: null,
    note: null,
    dueDate: null,
    vendor: null,
    machineType: null,
    bastDigital: null,
    bastSubmitStatus: false,
    photoFront: null,
    photoLeft: null,
    photoRight: null,
    photoRear: null,
    cimbAttachment: [],
    vendorAttachment: [],
  })
  const [dataRightComponent, setDataRight] = useState({
    status: null,
    timeLineData:[],
    commentsData:[]
  });
  const [openDeletePop, setOpenDeletePop] = useState(false)
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false)
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan')
  const [successType, setSuccessType] = useState('Add')

  // GET ID from URL
  const { taskId } = useParams();
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");

  // HANDLER FOR STATE
  const [isLoadData, setLoadData] = useState(false);
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  function selectedStatus(num){
    // console.log("+++ num", num);
    const status = parseInt(num);
    switch (status) {
    case 0:
      return 'TODO';
    case 1:
      return 'DOING';
    case 2:
      return 'DONE';
    case 3:
      return 'STRIP';
    default:
      return 'TODO';
    }
  }

  function handleDelete() {
    doDeleteCardSignage(loadingHandler, { implementationId: implementationId, idSignage: taskId })
      .then((response) => {
        // console.log("+++ response", response);
        if(response.responseCode === "00"){
          setSuccessLabel('Hapus Berhasil Dilakukan');
          setSuccessType('Delete');
          setOpenSuccessPopUp(true);
          setOpenDeletePop(false);
        }
      }).catch((err) => {
        console.log('Error Get Detail Parameter', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }

  function getInitialName(name) {
    if(name){
      let initials = name.match(/\b\w/g) || [];
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
      return initials;
    }
    return "";
    
  }

  useEffect(() => {
    doFetchDetailSignage(loadingHandler, { implementationId: implementationId, idSignage: taskId })
      .then((response) => {
         console.log("+++ response", response);
        const resDataLeft = {
          type: response.detailImplementationSignageDto.taskTitle !== null ?  response.detailImplementationSignageDto.taskTitle : "-",
          note: response.detailImplementationSignageDto.notesDescription !== null ?  response.detailImplementationSignageDto.notesDescription : "-",
          dueDate: response.detailImplementationSignageDto.dueDate !== null ? moment.unix(response.detailImplementationSignageDto.dueDate/1000).format("YYYY-MM-DD") : "-",
          vendor: response.detailImplementationSignageDto.picVendor !== null ? response.detailImplementationSignageDto.picVendor : "-",
          machineType: response.detailImplementationSignageDto.machineType !== null ? response.detailImplementationSignageDto.machineType : "-",
          bastDigital: response.detailImplementationSignageDto.bastId !== null ? response.detailImplementationSignageDto.bastId : "-",
          bastSubmitStatus: response.detailImplementationSignageDto.bastStatus || false,
          dimensi: response.detailImplementationSignageDto.dimensi !== null ? response.detailImplementationSignageDto.dimensi : "-",
          photoFront: response.detailImplementationSignageDto.photoFront,
          photoLeft: response.detailImplementationSignageDto.photoLeft,
          photoRight: response.detailImplementationSignageDto.photoRight,
          photoRear: response.detailImplementationSignageDto.photoRear,
          cimbAttachment: response.cimbAttachment,
          vendorAttachment: response.vendorAttachment,
        };
        console.log(resDataLeft)
        setDataLeft(resDataLeft);

        const timeline = [];
        if(response.baseHistoryLogDtoList.length > 0){
          response.baseHistoryLogDtoList.map((item)=>{
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
          status: selectedStatus(response.detailImplementationSignageDto.status),
          timeLineData: timeline,
          commentsData: response.commentDtoList
        };
        setDataRight(resDataRight);
        
      }).catch((err) => {
        console.log('Error Get Detail Parameter', err);
        alert(`Terjadi Kesalahan:${err}`);
      });
  }, []);

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
            <LeftComponent data={dataLeftComponent}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent data={dataRightComponent}/>
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify='space-between'>
            <Grid item>
                <div className={classes.backButton}>
                    <MuiIconLabelButton
                    label="Delete Card"
                    iconPosition="startIcon"
                    onClick={() => setOpenDeletePop(true)}
                    buttonIcon={<TrashIcon />}
                    />
                </div>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={()=>window.location.assign(`/implementation/task/signage/${taskId}/edit?implementationId=${implementationId}`)}
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
          handleDelete();
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
       <ModalLoader isOpen={isLoadData} />
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