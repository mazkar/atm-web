/* eslint-disable radix */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { makeStyles } from '@material-ui/styles';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as BackIcon } from '../../../../../assets/icons/general/arrow_back_red.svg';
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";
import { ChkyButtons } from "../../../../../components";
import constansts from '../../../../../helpers/constants';
import * as ThemeColor from '../../../../../assets/theme/colors';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
import DeletePopUp from "../../common/PopUp/deletePopUp";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import { doDeleteCardTermination, doFetchTerminationDetail } from '../../../ApiServiceImplementation';
import ModalLoader from '../../../../../components/ModalLoader';
import { getInitialName, selectedStatus } from '../../common/Utils';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: 'unset',
    padding: 0,
    '& .MuiButton-root': {
      padding: 0,
      textTransform: 'none',
      backgroundColor: 'unset',
    },
    '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
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
});
function Create(props) {
  const classes = useStyles();
  const history = useHistory();
  // GET ID from URL
  const { taskId } = useParams();
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan');
  const [successType, setSuccessType] = useState('Add');  
  
  const [dataLeft, setDataLeft] = useState({
    isMailed: false,
    taskTitle: null,
    note: null,
    dueDate: null,
    vendor: null,
    bastDigital: null,
    photoFront: null,
    photoLeft: null,
    photoRight: null,
    photoRear: null,
    cimbAttachment: [],
    vendorAttachment: []
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
    doDeleteCardTermination(loadingHandler, {terminId: taskId})
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

  useEffect(() => {
    doFetchTerminationDetail(loadingHandler, {terminId: parseInt(taskId)})
      .then((response) => {
        // console.log("+++ response", response);
        const resDataLeft = {    
          isMailed: response.implementationInfo.emailSentStatus !== 0,
          taskTitle: response.implementationInfo.taskTitle !== null ?  response.implementationInfo.taskTitle : "-",
          note: response.implementationInfo.notesDescription !== null ?  response.implementationInfo.notesDescription : "-",
          dueDate: response.implementationInfo.dueDate !== null ? moment.unix(response.implementationInfo.dueDate/1000).format("YYYY-MM-DD, HH:mm") : "-",
          vendor: response.implementationInfo.picVendor !== null ? response.implementationInfo.picVendor : "-",
          bastDigital: response.implementationInfo.bastId !== null ? response.implementationInfo.bastId : "-",
          photoFront: response.implementationInfo.photoFront,
          photoLeft: response.implementationInfo.photoLeft,
          photoRight: response.implementationInfo.photoRight,
          photoRear: response.implementationInfo.photoRear,
          cimbAttachment: response.cimbAttachment,
          vendorAttachment: response.vendorAttachment,
          bastId: response.implementationInfo.bastId,
        };
        setDataLeft(resDataLeft);

        const timeline = [];
        if(response.logHistoryInfo.length > 0){
          response.logHistoryInfo.map((item)=>{
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
          status: selectedStatus(response.implementationInfo.status),
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
    <div className={classes.root}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <div className={classes.backAction}>
            <Button onClick={() => history.goBack()}>
              <BackIcon />
              <Typography className={classes.backLabel}>Back</Typography>
            </Button>
          </div>
        </Grid>
        <Grid item>
          <Typography className={classes.title}>Task Detail</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item xs={7}>
              <LeftComponent data={dataLeft} />
            </Grid>
            <Grid item xs={5}>
              <RightComponent  data={dataRight}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item>
              <div className={classes.backButton}>
                <MuiIconLabelButton
                  label="Delete Card"
                  iconPosition="startIcon"
                  onClick={()=>setOpenDeletePop(true)}
                  buttonIcon={<TrashIcon />}
                />
              </div>
            </Grid>
            <Grid item>
              <ChkyButtons
                buttonType='redOutlined'
                onClick={() => {
                  history.push(`/implementation/task/termination/${taskId}/edit?implementationId=${implementationId}`);
                }}
                style={{textTransform: 'capitalize'}}
              >
                Edit
              </ChkyButtons>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
        onClose={()=>{
          setOpenSuccessPopUp(false);
          history.push(`/implementation/${implementationId}`);
        }}
        label={successLabel}
        type={successType}
      />
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
}

Create.propTypes = {

};

export default Create;

