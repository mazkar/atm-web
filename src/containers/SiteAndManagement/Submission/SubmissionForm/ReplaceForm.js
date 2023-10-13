import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { TimePicker, DatePicker, Upload } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import constants from '../../../../helpers/constants';
import { ReactComponent as PaperClip } from '../../../../assets/icons/siab/paperclip.svg';
import secureStorage from '../../../../helpers/secureStorage';
import getMinioFromUrl from '../../../../helpers/getMinioFromUrl';
import ModalLoader from '../../../../components/ModalLoader';

const useStyles = makeStyles({
  details: {
    margin: '20px 0px',
    padding: 10,
    border: '1px solid #BCC8E7',
    borderRadius: 8,
  },
  inputDate: {
    '& .ant-picker': {
      borderRadius: 6,
    },
  },
  btnSend: {
    backgroundColor: constants.color.primaryHard,
    color: 'white',
    borderRadius: 6,
    textTransform: 'capitalize',
  },
});

const ReplaceForm = ({ openingType, submit, id }) => {
  const classes = useStyles();  
  const history = useHistory();
  // const dateFormat = 'YYYY-MM-DD';
  const format = 'HH:mm';
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileReplacePath, setFileReplacePath] = useState('');
  const token = secureStorage.getItem('access_token');
  const [replacementType, setReplacementType] = useState('');

  const roleName = window.sessionStorage.getItem("roleName");

  useEffect(() => {
    setModalLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/viewSubmissionReplace`,
        { id }
      )
      .then((res) => {
        const newData = res.data;
        setStartDate(newData.replaceDate? moment(newData.replaceDate) : null);
        setStartTime(newData.startReplaceTime);
        setEndTime(newData.endReplaceTime);
        setFileReplacePath(newData.fileReplacePath);
        setReplacementType(newData.replacementType);
        setModalLoader(false);
      })
      .catch((err) => {
        setModalLoader(false);
        console.log('~ err', err);
      });
  }, [id]);

  useEffect(() => {
    if (fileReplacePath) {
      getMinioFromUrl(fileReplacePath)
        .then((result) => {
          // console.log('~ result', result);
          setFileList([
            {
              uid: '1',
              name: result.fileName,
              status: 'done',
              url: result.fileUrl,
            },
          ]);
        })
        .catch((err) => {
          setFileList([]);
        });
    } else {
      setFileList([]);
    }
  }, [fileReplacePath]);

  const matchRoleName = (value) => {
    if (value) {
      const result = value.toLowerCase().match(/planning/g) || [];
      if (result.length) {
        return result[0];
      } 
      return value;
    }
  };

  function RenderSubmit(isSubmit, role, openType){
    if(matchRoleName(role) === 'planning'){
      return true;
    }
    if(isSubmit){
      if(openType === "New Location"){
        return true;
      }
      return true;
    }
    return false;  
  }

  function RenderApproval(isSubmit, role, openType){
    if(matchRoleName(role) === 'planning'){
      return true;
    }
    if(isSubmit){
      if(openType === "New Location"){
        return false;
      }
      return true;
    }
    return false;  
  }
  
  const handleSubmit = () => {
    // console.log('submit');
    setModalLoader(true);
    const theDate = startDate ? moment(startDate, "DD/MM/YYYY") : null;
    const dataSubmit = {
      id,
      replaceDay: theDate?.format("dddd"),
      replaceDate: theDate?.format("YYYY-MM-DD"),
      startReplaceTime: startTime,
      endReplaceTime: endTime,
      submit: RenderSubmit(submit, roleName, openingType),
      approval: RenderApproval(submit, roleName, openingType),
      fileReplacePath,
    };
    // console.log('~ dataSubmit', dataSubmit);
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/submitSubmissionReplace`,
        dataSubmit,
        config
      )
      .then((resultSubmit) => {
        setModalLoader(false);
        alert(`Success ${submit ? 'Submission' : 'Update'}!`);
        if(submit){
          history.push('/site-management/document-legality#replace');
        } else {
          window.location.reload()
        }
      })
      .catch((err) => {
        setModalLoader(false);
        console.log('~ err', err);
      });
  };

  function handleChange(info) {
    //console.log('~ info', info);
    if (info.file.status === 'done') {
      setFileReplacePath(info.file.response.path);
    } else if (info.file.status === 'removed') {
      setFileReplacePath(null);
    }
  }

  const handleSelectDate = (date, dateString) => {
    //console.log('TAMPILKAN', date, dateString);
    setStartDate(dateString);
  };

  const handleTimeStart = (time, timeString) => {
    //console.log(time, timeString);
    setStartTime(timeString);
  };

  const handleTimeEnd = (time, timeString) => {
    //console.log(time, timeString);
    setEndTime(timeString);
  };

  return (
    <>
      <div className={classes.details}>
        <Typography
          style={{
            fontSize: 15,
            fontWeight: 500,
            marginBottom: 25,
          }}
        >
          Replacement Type
        </Typography>
        {replacementType}
      </div>

      <div className={classes.details}>
        <Typography
          style={{
            fontSize: 15,
            fontWeight: 500,
            marginBottom: 25,
          }}
        >
          Konfirmasi dari landlord
        </Typography>
        <Grid container direction='row' spacing={2}>
          <Grid item xs={3} className={classes.inputDate}>
            <Typography>Tanggal :</Typography>
            <DatePicker
              format="DD/MM/YYYY" // format yg ditampilkan di input picker
              value={startDate ? moment(startDate, "DD/MM/YYYY") : null}
              popupStyle={{ zIndex: 1500 }}
              onChange={handleSelectDate}
              allowClear={false}
            />
          </Grid>
          <Grid item xs={2} className={classes.inputDate}>
            <Typography>Waktu :</Typography>
            <TimePicker
              popupStyle={{ zIndex: 1500 }}
              onChange={handleTimeStart}
              value={startTime ? moment(startTime, format) : null}
              format={format}
              allowClear={false}
            />
          </Grid>
          <Grid item xs={2} className={classes.inputDate}>
            <Typography>Hingga :</Typography>
            <TimePicker
              popupStyle={{ zIndex: 1500 }}
              onChange={handleTimeEnd}
              value={endTime ? moment(endTime, format) : null}
              format={format}
              allowClear={false}
            />
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignContent: 'flex-end',
          marginTop: '4.5%',
        }}
      >
        <Button
          variant='contained'
          className={classes.btnSend}
          style={{ width: 115 }}
          onClick={handleSubmit}
          // disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </div>
      <ModalLoader isOpen={isOpenModalLoader} />
    </>
  );
};

export default ReplaceForm;
