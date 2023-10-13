/* eslint-disable radix */
import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { makeStyles } from '@material-ui/styles';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
// eslint-disable-next-line import/no-cycle
import { RootContext } from "../../../../../router";
import { ReactComponent as BackIcon } from '../../../../../assets/icons/general/arrow_back_red.svg';
import { ChkyButtons } from "../../../../../components";
import constansts from '../../../../../helpers/constants';
import * as ThemeColor from '../../../../../assets/theme/colors';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ModalLoader from '../../../../../components/ModalLoader';
import { doFetchDetailBooth, doCreateUpdateCardBooth, doUploadDocument, doUploadPhoto, doSaveComment, doFetchSaldoConfirmationDetail, doCreateUpdateSaldoConfirmation } from '../../../ApiServiceImplementation';
import { getInitialName, selectedStatus, statusToNumber } from '../../common/Utils';
import ConfirmationPopUp from '../../common/PopUp/ConfirmationPopUp';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
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
  const { userId, userFullName  } = useContext(RootContext);
  const implementationId = (new URLSearchParams(window.location.search)).get("implementationId");
  const [openSuccessEditPopUp, setOpenSuccessEditPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Update Task Berhasil');
  const [successType, setSuccessType] = useState('Add');
  const [dataLeft, setDataLeft] = useState({
    id: null,
    type: null,
    note: null,
    dueDate: null,
    vendor: null,
    boothType: null,
    dimensi: null,
    machineType: null,
    photoRear: null,
    photoFront: null,
    photoLeft: null,
    photoRight: null,
    cimbAttachment: [],
    documentList: [],
    photoList: [],
  });
  const [dataRight, setDataRight] = useState({
    status: null,
    message: null,
    commentsData:[]
  });
  const [errorCreate, setErrorCreate] = useState({
    note: false,
    dueDate: false,
  });
  const [openConfirmPop, setOpenConfirmPop] = useState(false);
  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const handleLeftComponent = (newVal, attribut) => {
    // console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataLeft((prevValue)=>{
      return{
        ...prevValue,
        [attribut]: newVal
      };
    });
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
    setErrorCreate((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;

    if(dataLeft.dueDate === ""){
      handleError('dueDate', true);
      errorCount+= 1;
    }else{
      handleError('dueDate', false);
    }

    if(dataLeft.note === ""){
      handleError('note', true);
      errorCount+= 1;
    }else{
      handleError('note', false);
    }

    return(errorCount);
  }

  const onSubmitEditTask = async() => {
    const errorCount = validateForm();
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {

      // HANDLE PHOTO FILES
      const photoFront = { path: dataLeft.photoFront, url: null };
      const photoRight = { path: dataLeft.photoRight, url: null };
      const photoLeft = { path: dataLeft.photoLeft, url: null };
      const photoRear = { path: dataLeft.photoRear, url: null };

      const doUploadPhotos = async(arr) =>{
        if(arr.length > 0){
          loadingHandler(true);
          await Promise.all(arr.map(async(item)=>{
            const {docKey} = item;

            await doUploadPhoto(item.file)
              .then((res) => {
                console.log("data res", res);
                console.log("docKey", docKey);
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
      await doUploadPhotos(dataLeft.photoList);

      const dataHit = {
        userId: parseInt(userId),
        userName: userFullName,
        id: dataLeft.id,
        taskTitle : dataLeft.type,
        implementationId: parseInt(implementationId),
        status : statusToNumber(dataRight.status),
        checkDate: moment.unix(dataLeft.dueDate/1000).format("YYYY-MM-DD"), // <----- "2021-12-21"
        notesDescription : dataLeft.note,
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
            setOpenSuccessEditPopUp(true);
            setSuccessLabel('Update Task Berhasil');
          }
        }).catch((err) => {
          console.log('Error Create New Task', err);
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
  };
  
  useEffect(() => {
    doFetchSaldoConfirmationDetail(loadingHandler, {balanceId: taskId})
      .then((response) => {
        // console.log("+++ response", response);
        const resDataLeft = {
          id: response.implementationBalanceInfo.id,
          type: response.implementationBalanceInfo.taskTitle,
          note: response.implementationBalanceInfo.notesDescription,
          dueDate: response.implementationBalanceInfo.dueDate,
          photoFront: response.implementationBalanceInfo.photoFront,
          photoLeft: response.implementationBalanceInfo.photoLeft,
          photoRight: response.implementationBalanceInfo.photoRight,
          photoRear: response.implementationBalanceInfo.photoRear,
          photoList: dataLeft.photoList
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

  const saveComment=(e)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      const dataHit={
        message: dataRight.message,
        cardTaskCategory: 'balance',
        cardTaskId: taskId,
      };
      doSaveComment(loadingHandler,dataHit)
        .then((res) => {
          // console.log('~ res.data', res.data);
          if(res.data){
            if(res.data.responseCode === "00"){
              alert(`Berhasil save comment`);
              history.go(0);
            }
          }
        })
        .catch((err) => {
          alert(`Gagal save comment. ${err}`);
          loadingHandler(false);
        });
    }
  };

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
          <Typography className={classes.title}>Edit Task</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item xs={7}>
              <LeftComponent  data={dataLeft} errorForm={errorCreate} onChange={handleLeftComponent}/>
            </Grid>
            <Grid item xs={5}>
              <RightComponent  data={dataRight} handleChangeState={handleRightComponent} onMessageEnter={saveComment}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="row" justify="space-between">
            <Grid item>
              <ChkyButtons
                buttonType='redOutlined'
                onClick={() => {
                  history.goBack();
                }}
                style={{textTransform: 'capitalize'}}
              >
                Cancel
              </ChkyButtons>
            </Grid>
            <Grid item>
              <ChkyButtons
                onClick={()=>setOpenConfirmPop(true)}
                style={{textTransform: 'capitalize'}}
              >
                Save
              </ChkyButtons>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmationPopUp
        isOpen={openConfirmPop}
        onSubmit={()=>onSubmitEditTask()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
      />
      <SuccessPopUp 
        isOpen={openSuccessEditPopUp}
        onClose={() => history.push(`/implementation/${implementationId}`)}
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

