/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, InputBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PrimaryHard } from '../../../../../assets/theme/colors';
import ChatHistory from '../../common/chatHistory';
import ModalLoader from '../../../../../components/ModalLoader';
import { doSaveComment } from '../../../../Implementation/ApiServiceImplementation';
import TimeLineAvatarKebutuhan from '../../../../Implementation/cimb/common/TimeLineAvatarKebutuhan';
import { getInitialName } from '../../../../../helpers/todoList';

const SmallInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: (props) => props.backgroundColor, // theme.palette.common.white,
    fontSize: 15,
    width: '100%',
    height: '100%',
    padding: '7px 9px',
    border: '1px solid #BCC8E7',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    height: '100%',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  dashedLine: {
    position: 'relative',
    width: '100%',
    margin: '0 auto',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 0,
      top: 35,
      bottom: 0,
      left: 11,
      border: '3px solid #BCC8E7',
      height: '80%',
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#BCC8E7',
      borderRadius: 1,
      //   borderStyle: "dashed",
    },
  },
  boxStyle: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    // marginTop: 20,
    border: '1px solid #BCC8E7',
    backgroundColor: '#fff',
    width: '96%',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      height: '125%',
      left: -37,
      backgroundColor: '#fff',
      top: -100,
      zIndex: 1,
    },
    height: '370px',
    overflow: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#F4F7FB',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#BCC8E7',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#9AC2FF',
    },
  },
});
function RightComponent(props) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const {
    content: { logHistoryChanges, comments }
  } = props;

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [message, setMessage] = useState('');
  
  const logHistoryData =
    logHistoryChanges
      ?.map((val) => ({
        name: val.userName,
        initial: getInitialName(val.userName),
        message: val.message,
        date: moment(val.createdDate).format('DD/MM/YYYY'),
        time: moment(val.createdDate).format('HH:mm'),
      }))
      .reverse() || [];

  const chatHistoryData =
  comments
    ?.map((val) => ({
      name: val.userName,
      comment: val.message,
      date: moment(val.createdDate).format('DD/MM/YYYY | HH:mm'),
    }))
    .reverse() || [];

  const saveComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const dataHit = {
        message,
        cardTaskCategory: "mesin",
        cardTaskId: id,
      };
      if(message){
        doSaveComment((bool)=>setModalLoader(bool), dataHit)
          .then((res) => {
          // console.log('~ res.data', res.data);
            if (res.data) {
              if (res.data.responseCode === "00") {
                alert(`Berhasil save comment`);
                history.go(0);
              }
            }
          })
          .catch((err) => {
            alert(`Gagal save comment. ${err}`);
            setModalLoader(false);
          });
      }else{
        alert("Silahkan Masukan Pesan Terlebih Dahulu.");
      }
    }
  };

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <div style={{ paddingTop: 25, paddingLeft: 25, paddingBottom: 25 }}>
          <Grid container direction='column'>
            <Grid item>
              <Typography style={{ color: '#2B2F3C', fontWeight: 600 }}>History</Typography>
            </Grid>

            <Grid item style={{ marginTop: 10 }}>
              <Box className={classes.boxStyle}>
                <div className={classes.dashedLine}>
                  {logHistoryData.map((item) => (
                    // <ChatHistory comment={data.comment} date={data.date} />
                    <TimeLineAvatarKebutuhan 
                      name={item.name}
                      initial={item.initial}
                      message={item.message}
                      date={item.date}
                      time={item.time}
                    />
                  ))}
                </div>
              </Box>
            </Grid>

            <Grid item style={{ marginTop: 30 }}>
              <Typography style={{ color: '#2B2F3C', fontWeight: 600 }}>Chat History</Typography>
            </Grid>

            <Grid item style={{ marginTop: 15 }}>
              <SmallInput
                style={{ width: '96%', height: '23px' }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyUp={saveComment}
                placeholder='Masukkan Pesan Anda'
              />
            </Grid>

            <Grid item style={{ marginTop: 25 }}>
              <Box className={classes.boxStyle}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '5px 0px',
                    alignItems: 'center',
                    zIndex: 2,
                  }}
                >
                  {chatHistoryData.map((data) => (
                    <ChatHistory
                      name={data.name}
                      comment={data.comment}
                      date={data.date}
                      showName
                    />
                  ))}
                </div>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

RightComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.object.isRequired,
};
RightComponent.defaultProps = {
  // isLoadData: false,
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RightComponent))
);
