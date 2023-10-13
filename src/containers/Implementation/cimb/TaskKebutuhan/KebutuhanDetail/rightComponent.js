import React, {useContext} from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from "moment";
import TimeLineAvatar from './TimeLineAvatarKebutuhan';
import Comment from './comment';
import SelectWithIcon from '../../../../../components/Selects/SelectWithIcon';
import { ReactComponent as TodoIcon } from "../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../assets/icons/siab/strip-circle.svg";
import { ReactComponent as WarningIcon } from "../../../../../assets/icons/duotone-gray/alert-triangle-gray.svg";
import InputBordered from "./InputComponent";
// eslint-disable-next-line import/no-cycle
import { RootContext } from '../../../../../router';

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "550px",
    height: "760px",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  dashedLine: {
    position: "relative",
    width: "100%",
    margin: "0 auto",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 0,
      top: 35,
      bottom: 0,
      left: 17,
      border: "3px solid #BCC8E7",
      height: "90%",
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "#BCC8E7",
      borderRadius: 1,
      borderStyle: "dashed",
    },
  },
  dashedLineNoHeight: {
    position: "relative",
    width: "100%",
    margin: "0 auto",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 0,
      top: 35,
      bottom: 0,
      left: 17,
      border: "3px solid #BCC8E7",
      height: "0%",
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "#BCC8E7",
      borderRadius: 1,
      borderStyle: "dashed",
    },
  },
  boxStyle: {
    padding: "15px 15px",
    position: "relative",
    borderRadius: 10,
    marginTop: 20,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    width: "96%",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: "125%",
      left: -37,
      backgroundColor: "#fff",
      top: -100,
      zIndex: 1,
    },
    height: "270px",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
  },
});

const dataSelectStatus = [
  {id: 0, value: 'TODO', nameId: 'TODO', nameEn: 'TODO', icon: <TodoIcon/>},
  {id: 1, value: 'DOING', nameId: 'DOING', nameEn: 'DOING', icon: <DoingIcon/>},
  {id: 2, value: 'DONE', nameId: 'DONE', nameEn: 'DONE', icon: <DoneIcon/>},
  {id: 3, value: 'STRIP', nameId: 'STRIP', nameEn: 'STRIP', icon: <StripIcon/>},
];

function RightComponent(props) {
  const { id } = useParams();
  const {userFullName} = useContext(RootContext);
  const classes = useStyles();
  const { comments, logHistory, status, editValue, onChangeStatus, onInputComment } = props;
  const [statusKey, setStatusKey] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [newComment, setComment] = React.useState([]);

  // React.useEffect(()=>{console.log("Comments: ", comments)},[comments])
  // React.useEffect(()=>{console.log("History: ", logHistory)},[logHistory])
  
  const value = dataSelectStatus.find(val=>val.id==status)?.value;

  const handleInputComment = (e) => {
    console.log(e.target.value);
    setMessage(e.target.value);
  };

  const handleInputCommentOnKeyPress = (e) => {
    const newList = [...comments];
    newList.push({
      id: null,
      userId: id,
      userName: userFullName,
      createdDate: moment().valueOf(),
      message
    });
    onInputComment(newList);
  };

  const handleChangeKey = (e) => {
    console.log('KEY: ',e.key);
    onChangeStatus(e.key);
    setStatusKey(e.key);
  };

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <div style={{ paddingTop: 25, paddingLeft: 25 }}>
          <Grid container direction='column'>
            {/* Top */}
            <Grid item>
              <Grid container direction='column'>
                <Grid item>
                  <Grid container direction='row'>
                    <Grid item style={{padding: '2px 7px'}}>
                      <WarningIcon /> 
                    </Grid>
                    <Grid item>
                      <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Status</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{marginTop: 5}}>
                  <SelectWithIcon disabled bordered value={value} suggestions={dataSelectStatus} width='96%' handleChange={()=>{}} handleKey={handleChangeKey}/>
                </Grid>
                <Grid item style={{marginTop: 5}}>
                  <Typography style={{fontWeight: 400, fontStyle: 'Italic', color: '#8D98B4', fontSize: '13px'}}>
                                    *Status berubah menjadi overdue ketika due date terlewati
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {editValue ? 
              <Grid item style={{marginTop: '25px'}}>
                <InputBordered
                  style={{width: '96%', height: '23px'}}
                  onChange={handleInputComment}
                  onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                      handleInputCommentOnKeyPress();
                    }
                  }
                  }
                  value={message}
                  placeholder='Masukkan Pesan Anda'
                />
              </Grid> : null
            }

            {/* Middle */}
            {!editValue ?
              <Grid item>
                <Box className={classes.boxStyle}>
                  {/* <div className={logHistory.length <= 1 ?  classes.dashedLineNoHeight : classes.dashedLine}> */}
                  {logHistory.map((data,i) =>
                    (
                      <TimeLineAvatar 
                        name={data.userName} 
                        initial={data?.userName?.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()} 
                        message={data.message} 
                        date={moment(data.createdDate).format('DD-MM-YYYY')} 
                        time={`${moment(data.createdDate).format('HH:mm:ss')} ${moment(data.createdDate).format('A') == 'siang' ? 'AM' : 'PM'}`} 
                        indexDashLine={i+1}
                        dataLength={logHistory.length}
                      />
                    ))}
                  {/* </div> */}
                </Box>
              </Grid> : null }

            {/* Bottom */}
            <Grid item>
              <Box className={classes.boxStyle}>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "5px 0px",
                  alignItems: "center",
                  zIndex: 2
                }}>
                  {comments.sort(function (a, b) { return b.id - a.id; }).map((data) =>
                    (
                      <Comment name={data.userName} comment={data.message} date={moment(data.createdDate).format('DD/MM/YYYY | HH:mm')} />
                    ))}
                </div>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

RightComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  isLoadData: PropTypes.bool,
};
RightComponent.defaultProps = {
  isLoadData: false,
};
function mapStateToProps() {
  return {};
};

export default RightComponent;