/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from "moment";
import SelectItemsIcon from '../../../../../../components/Selects/SelectItemsIcon';
import { ReactComponent as TodoIcon } from "../../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../../assets/icons/siab/strip-circle.svg";
import { ReactComponent as WarningIcon } from "../../../../../../assets/icons/duotone-gray/alert-triangle-gray.svg";
import TimeLineAvatar from '../../../common/TimeLineAvatarKebutuhan';
import Comment from '../../../common/Comment';

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    height: "100%",
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    paddingBottom: 30,
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
    height: "250px",
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
  {value: 'TODO', name: 'TODO', icon: <TodoIcon/>},
  {value: 'DOING', name: 'DOING', icon: <DoingIcon/>},
  {value: 'DONE', name: 'DONE', icon: <DoneIcon/>},
  {value: 'STRIP', name: 'STRIP', icon: <StripIcon/>},
];
function RightComponent({data}) {
  const classes = useStyles();

  return (
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
                <SelectItemsIcon
                  selectOptionData={dataSelectStatus}
                  selectedValue={data.status}
                  disabled/>
              </Grid>
              <Grid item style={{marginTop: 5}}>
                <Typography style={{fontWeight: 400, fontStyle: 'Italic', color: '#8D98B4', fontSize: '13px'}}>
                    *Status berubah menjadi <b>overdue</b> ketika due date terlewati
                </Typography>
              </Grid>
              <Grid item style={{marginTop: '25px'}}>
                <div className={classes.boxStyle}>
                  <div className={classes.dashedLine}>
                    {data.timeLineData.length > 0 ? 
                      data.timeLineData.map((item) =>
                        (
                          <TimeLineAvatar name={item.name} initial={item.initial} message={item.message} date={item.date} time={item.time} />
                        ))
                      :(<Typography className={classes.noData}>No History Log</Typography>)}
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.boxStyle}>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "5px 0px",
                    alignItems: "center",
                    zIndex: 2
                  }}>
                    {data.commentsData.length > 0 ? 
                      data.commentsData.map((item) =>
                        (
                          <Comment name={item.userName} comment={item.message} date={moment.unix(item.createdDate/1000).format("DD-MM-YYYY")} />
                        )): (<Typography className={classes.noData}>No Comment Data</Typography>)}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

RightComponent.propTypes = {
  data: PropTypes.object.isRequired,
};
RightComponent.defaultProps = {
};

export default RightComponent;