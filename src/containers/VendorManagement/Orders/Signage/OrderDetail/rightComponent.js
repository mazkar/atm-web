import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, InputBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { PrimaryHard } from '../../../../../assets/theme/colors';
import PropTypes from 'prop-types';
import TimeLineAvatarKebutuhan from '../../../../Implementation/cimb/common/TimeLineAvatarKebutuhan';
import ChatHistory from '../../common/chatHistory';
import getInitials from '../../../../../helpers/initialName';
import moment from 'moment';
import { doSaveComment } from '../../../../Implementation/ApiServiceImplementation';
import ModalLoader from '../../../../../components/ModalLoader';

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
    backgroundColor: (props) => props.backgroundColor, //theme.palette.common.white,
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
      left: 18,
      border: '3px dashed #BCC8E7',
      height: 'calc( 100% - 65px )',
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#BCC8E7',
      borderRadius: 1,
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
  const { data, fetchData } = props;
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataHit = {
      message,
      cardTaskCategory: 'signage',
      cardTaskId: id,
    };
    setIsModalLoaderOpen(true);
    doSaveComment(() => {}, dataHit)
      .then((res) => {
        // console.log('~ res.data', res.data);
        setIsModalLoaderOpen(false);
        if (res.data) {
          if (res.data.responseCode == '00') {
            alert(`Berhasil save comment`);
            fetchData();
            setMessage('');
          }
        }
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        alert(`Gagal save comment. ${err}`);
      });
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
                  {data.logHistoryChanges
                    ?.map((item) => (
                      <TimeLineAvatarKebutuhan
                        name={item.userName}
                        initial={getInitials(item.userName || '')}
                        message={item.message}
                        date={moment.unix(item.createdDate / 1000).format('DD-MM-YYYY')}
                        time={moment.unix(item.createdDate / 1000).format('HH:mm')}
                      />
                    ))
                    .reverse()}
                </div>
              </Box>
            </Grid>

            <Grid item style={{ marginTop: 30 }}>
              <Typography style={{ color: '#2B2F3C', fontWeight: 600 }}>Chat History</Typography>
            </Grid>

            <Grid item style={{ marginTop: 15 }}>
              <form onSubmit={handleSubmit}>
                <SmallInput
                  style={{ width: '96%', height: '23px' }}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  placeholder='Masukkan Pesan Anda'
                />
              </form>
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
                  {data.comments
                    ?.map((data) => (
                      <ChatHistory
                        name={data.userName}
                        comment={data.message}
                        date={
                          data.createdDate
                            ? moment(data.createdDate).format('DD/MM/YYYY | HH:mm')
                            : '-'
                        }
                        showName
                      />
                    ))
                    .reverse()}
                </div>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <ModalLoader isOpen={isModalLoaderOpen} />
    </div>
  );
}

RightComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
};
RightComponent.defaultProps = {
  isLoadData: false,
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RightComponent))
);
