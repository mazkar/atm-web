import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, InputBase } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TimeLineAvatar from './TimeLineAvatarKebutuhan';
import Comment from './Comment';
import SelectWithIcon from '../../../../components/Selects/SelectWithIcon';
import { ReactComponent as TodoIcon } from '../../../../assets/icons/siab/time-circle.svg';
import { ReactComponent as DoingIcon } from '../../../../assets/icons/siab/refresh-blue.svg';
import { ReactComponent as DoneIcon } from '../../../../assets/icons/duotone-others/check-green.svg';
import { ReactComponent as StripIcon } from '../../../../assets/icons/siab/strip-circle.svg';
import { ReactComponent as WarningIcon } from '../../../../assets/icons/duotone-gray/alert-triangle-gray.svg';
import { PrimaryHard } from '../../../../assets/theme/colors';
import axios from 'axios';
import constansts from '../../../../helpers/constants';
import ModalLoader from '../../../../components/ModalLoader';
import { filterOptionsById } from './filterStatusOptions';

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '340px',
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
      top: '50%',
      left: 17,
      border: '3px solid #BCC8E7',
      height: 'calc(100% - 35px)',
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#BCC8E7',
      borderRadius: 1,
      borderStyle: 'dashed',
      transform: 'translateY(-50%)',
    },
  },
  boxStyle: {
    padding: '15px 15px',
    position: 'relative',
    borderRadius: 10,
    marginTop: 20,
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

export const statusOptions = [
  { id: 0, value: 'TODO', nameId: 'TODO', nameEn: 'TODO', icon: <TodoIcon /> },
  { id: 1, value: 'DOING', nameId: 'DOING', nameEn: 'DOING', icon: <DoingIcon /> },
  { id: 2, value: 'DONE', nameId: 'DONE', nameEn: 'DONE', icon: <DoneIcon /> },
  { id: 3, value: 'STRIP', nameId: 'STRIP', nameEn: 'STRIP', icon: <StripIcon /> },
];

function RightComponent(props) {
  const classes = useStyles();
  const {
    showChatInput,
    disableDropdown,
    showHistory,
    showChatHistory,
    status,
    taskType,
    taskId,
    reloadDetail,
    message,
    handleMessage,
    commentsData,
    timeLineData,
    onMessageEnter
  } = props;
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  const [statusOptionToShow, setStatusOptionToShow] = useState(statusOptions);
  
  const handleChange = (e) => {
    // console.log(e);
  };

  const handleKey = (newObj) => {
    // console.log(newObj);
    if (taskId && taskType) {
      setIsModalLoaderOpen(true);
      axios
        .post(`${constansts.IMPLEMENTATION_SERVICE}/updateStatusTaskDetailImplementation`, {
          id: taskId,
          status: newObj.key * 1,
          taskType,
        })
        .then((res) => {
          setIsModalLoaderOpen(false);
          if (reloadDetail) {
            reloadDetail();
          }
        })
        .catch((err) => {
          setIsModalLoaderOpen(false);
          console.log('~ err', err);
        });
    }
  };

  useEffect(() => {
    setStatusOptionToShow(filterOptionsById(statusOptions, status));
  }, [status]);

  return (
    <Grid item xs={5}>
      <Paper className={classes.rootPaper}>
        <div style={{ paddingTop: 25, paddingLeft: 25, paddingBottom: 25 }}>
          <div>
            {/* Top */}
            <div>
              <div>
                <div>
                  <Grid container>
                    <Grid item style={{ padding: '2px 7px' }}>
                      <WarningIcon />
                    </Grid>
                    <Grid item>
                      <Typography style={{ fontWeight: 500, color: '#8D98B4' }}>Status</Typography>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ marginTop: 5 }}>
                  <SelectWithIcon
                    bordered
                    value={statusOptions.find(({ id }) => id == status)?.value}
                    suggestions={statusOptionToShow}
                    width='96%'
                    handleChange={handleChange}
                    handleKey={handleKey}
                    disabled={disableDropdown}
                  />
                </div>
                <div style={{ marginTop: 5 }}>
                  <Typography
                    style={{
                      fontWeight: 400,
                      fontStyle: 'Italic',
                      color: '#8D98B4',
                      fontSize: '13px',
                    }}
                  >
                    *Status berubah menjadi overdue ketika due date terlewati
                  </Typography>
                </div>
              </div>
            </div>

            {showChatInput ? (
              <div style={{ marginTop: '25px' }}>
                <SmallInput
                  style={{ width: '96%', height: '23px' }}
                  onChange={(e) => handleMessage(e.target.value)}
                  value={message}
                  placeholder='Masukkan Pesan Anda'
                  onKeyUp={onMessageEnter}
                />
              </div>
            ) : null}

            {/* Middle */}
            {showHistory ? (
              <div>
                <Box className={classes.boxStyle} style={{ maxHeight: 300 }}>
                  <div className={classes.dashedLine}>
                    {timeLineData.map((data) => (
                      <TimeLineAvatar
                        name={data.name}
                        initial={data.initial}
                        message={data.message}
                        date={data.date}
                        time={data.time}
                      />
                    ))}
                  </div>
                </Box>
              </div>
            ) : null}

            {/* Bottom */}
            {showChatHistory && commentsData.length > 0 && (
              <div>
                <Box className={classes.boxStyle} style={{ maxHeight: 300 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      padding: '5px 0px',
                      alignItems: 'center',
                      zIndex: 2,
                    }}
                  >
                    {commentsData.map((data) => (
                      <Comment name={data.name} comment={data.comment} date={data.date} />
                    ))}
                  </div>
                </Box>
              </div>
            )}
          </div>
        </div>
      </Paper>
      <ModalLoader isOpen={isModalLoaderOpen} />
    </Grid>
  );
}

RightComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
};
RightComponent.defaultProps = {
  isLoadData: false,
  handleMessage: () => {},
  commentsData: [],
  timeLineData: [],
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RightComponent))
);

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
