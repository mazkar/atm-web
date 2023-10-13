/* eslint-disable radix */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Checkbox, Grid, makeStyles, Typography } from '@material-ui/core';
import { Button, DatePicker, Dropdown, Menu, Popover } from 'antd';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import { CalendarFilled, CalendarOutlined } from '@ant-design/icons';
import { ReactComponent as IconChecklist } from '../../../assets/icons/general/check-grey.svg';
import { ReactComponent as IconUnchecklist } from '../../../assets/icons/general/uncheck.svg';
import { ReactComponent as IconMenu } from '../../../assets/icons/duotone-gray/ellipsis-h.svg';
import { ReactComponent as FlagIcon } from "../../../assets/icons/general/flag.svg";
import { ReactComponent as FlagRedIcon } from "../../../assets/icons/general/flag-red.svg";
import { ReactComponent as FlagYellowIcon } from "../../../assets/icons/general/flag-yellow.svg";
import { ReactComponent as FlagGreenIcon } from "../../../assets/icons/general/flag-green.svg";
import * as Colors from '../../../assets/theme/colors';
import { stringLimit } from '../../../helpers/useFormatter';
import constansts from '../../../helpers/constants';
import { renderPriority } from '../ChecklistSubTask';

const useStyles =  makeStyles({
  iconButton: {
    // padding: 5,
    color: Colors.GrayMedium
  },
});

function ChecklistSubTaskView(props) {
  const {value, onChange} = props;
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item>
        <div className={classes.iconButton}>
          {value.subTaskStatus === 1 ? <IconChecklist style={{height: 18}} /> : <IconUnchecklist style={{height: 18}} />}
        </div>
      </Grid>
      <Grid item>
        <Typography style={{fontWeight: 400, fontSize: 15,color: "#2B2F3C"}}>{stringLimit(value.subTaskName, 40)}</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <CalendarOutlined style={{color: "#75D37F", paddingRight: 5}} />
              </Grid>
              <Grid item>
                <Typography style={{fontWeight: 400, fontSize: 13,color: "#75D37F"}}>{value.subTaskStartDate}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography style={{fontWeight: 400, fontSize: 13,color: "#2B2F3C"}}> - </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <CalendarFilled style={{color: "#DC241F", paddingRight: 5}} />
              </Grid>
              <Grid item>
                <Typography style={{fontWeight: 400, fontSize: 13,color: "#DC241F"}}>{value.subTaskEndDate}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {renderPriority(value.subTaskPriority)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ChecklistSubTaskView.propTypes = {
};

ChecklistSubTaskView.defaultProps  = {
};

export default ChecklistSubTaskView;

