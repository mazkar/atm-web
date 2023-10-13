/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SelectItemsIcon from '../../../../../components/Selects/SelectItemsIcon';
import { ReactComponent as TodoIcon } from "../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../assets/icons/siab/strip-circle.svg";
import { ReactComponent as WarningIcon } from "../../../../../assets/icons/duotone-gray/alert-triangle-gray.svg";
import InputBordered from '../../common/InputComponent';

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "550px",
    height: "685px",
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

const timeLineData = [
  {name:'Ghefira Faradhia Shofa', message: 'Change Due Date', initial:'GF', date: '12-12-2020', time: '12:36:12 AM'},
  {name:'Anfika Sigma', message: 'Change Due Date', initial:'AS', date: '12-12-2020', time: '12:36:12 AM'},
  {name:'Tamima ARS', message: 'Change Due Date', initial:'TA', date: '12-12-2020', time: '12:36:12 AM'},
];

const commentsData = [
  {name:'Deden Hidayat', comment: 'Untuk pesanannya warnanya kurang sesuai', date:'10/12/2020 | 16:18'},
  {name:'Adam Rizananda', comment: 'Ada perubahan ukuran dari requirement awalnya', date:'05/12/2020 | 16:18'},
  {name:'Ghefira FS', comment: 'Ada perubahan ukuran dari requirement awalnya', date:'01/12/2020 | 16:18'},
];

const dataSelectStatus = [
  {value: 'TODO', name: 'TODO', icon: <TodoIcon/>},
  {value: 'DOING', name: 'DOING', icon: <DoingIcon/>},
  {value: 'DONE', name: 'DONE', icon: <DoneIcon/>},
  {value: 'STRIP', name: 'STRIP', icon: <StripIcon/>},
];
function RightComponent(props) {
  const classes = useStyles();
  const { data } = props;

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
                  <SelectItemsIcon
                    style={{width: '96%'}}
                    selectOptionData={dataSelectStatus}
                    selectedValue={data.status}
                    disabled/>
                </Grid>
                <Grid item style={{marginTop: 5}}>
                  <Typography style={{fontWeight: 400, fontStyle: 'Italic', color: '#8D98B4', fontSize: '13px'}}>
                    *Status berubah menjadi overdue ketika due date terlewati
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

RightComponent.propTypes = {
  data: PropTypes.object.isRequired,
  // onChange: PropTypes.func.isRequired,
};
RightComponent.defaultProps = {
};
function mapStateToProps() {
  return {};
};

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RightComponent))
);