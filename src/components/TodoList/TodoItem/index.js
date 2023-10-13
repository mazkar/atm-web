/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as IconUncheck } from '../../../assets/icons/general/uncheck.svg';
import { ReactComponent as IconChecked } from '../../../assets/icons/general/checked.svg';
import { ReactComponent as IconDueDate } from '../../../assets/icons/general/exclamation-triangle.svg';
import { ReactComponent as IconOnDate } from '../../../assets/icons/general/clock.svg';
import { ReactComponent as IconOnDateGray } from '../../../assets/icons/general/clock-gray.svg';
import useTimestampConverter from '../../../helpers/useTimestampConverter';
import StatusTask from '../StatusTask';
import { ChildMenuMore } from '../../chky';

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
    padding: 10,
    width: "100%",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 20, 
    fontWeight: 600,
  },
  summaryDeadline: {
    marginTop: 13
  },
});

function checkOverdue(deadline){
  const currentTime = moment().valueOf();
  return currentTime>deadline;
}

export function renderStatus(deadline, sts){
  if(sts === 3){
    return 1; // DONE
  }
  switch (checkOverdue(deadline)){
  case true:
    return 2; // OVERDUE
  default:
    return 0; // TODO
  }
}

function renderDeadlineIcon(deadline, sts){
  switch (renderStatus(deadline, sts)) {
  case 1:
    return <IconOnDateGray style={{display: "block"}}/>;
  case 2: 
    return <IconDueDate style={{display: "block"}}/>;
  default:
    return <IconOnDate style={{display: "block"}}/>;
  }
}

function renderColorDeadline(deadline, sts){
  switch (renderStatus(deadline, sts)) {
  case 1:
    return { color: "#BCC8E7" };
  case 2: 
    return { color: "#DC241F" };
  default:
    return { color: "#2B2F3C" };
  }
}

const useStylesDeadline = makeStyles({
  deadline: {
    fontSize: 10, 
    fontWeight: 500,
  },
});

function DeadlineComponent(props) {
  const classes = useStylesDeadline();
  // eslint-disable-next-line react/prop-types
  const {deadline, status} = props;
  return(
    <Grid container>
      <Grid item>{renderDeadlineIcon(deadline, status)}</Grid>
      <Grid item style={{paddingLeft: 5}}>
        <Typography className={classes.deadline} style={renderColorDeadline(deadline, status)}>
          {useTimestampConverter(deadline/1000 || null)}
        </Typography>
      </Grid>
    </Grid>
  );
}

function stringLimit(text, limit = 50){
  return text.toString().slice(0, limit) + (text.length > limit ? "..." : "");
};

function TodoItem(props) {
  const {data, handleDelete} = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container alignItems='center'>
        <Grid item sm="auto" style={{padding: 10}}>
          {data.status === 3 ? (
            <IconChecked style={{display: "block"}}/>
          ) : (
            <IconUncheck style={{display: "block"}}/>
          )}
        </Grid>
        <Grid item sm>
          <Grid container justifyContent='space-between'>
            <Grid item sm>
              <Link to={`/add-ons/todo-list/${data.id}`} >
                <Grid container direction='column' justifyContent='flex-start'>
                  <Grid item>
                    <Typography className={classes.summaryTitle} style={{color: data.status === 1 ? "#BCC8E7" : "#2B2F3C"}}>{stringLimit(data.title)}</Typography>
                  </Grid>
                  <Grid item>
                    <DeadlineComponent deadline={data.deadline} status={data.status}/>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
            <Grid item sm="auto">
              <Grid container direction='column' alignItems='flex-end'>
                <Grid item>
                  <StatusTask value={data.status}/>
                </Grid>
                <Grid item style={{paddingTop: 15}}>
                  <ChildMenuMore
                    padding={0}
                    value={[
                      {
                        name: "Edit",
                        type: "edit",
                        handler: () => history.push(`/add-ons/todo-list/edit/${data.id}`),
                      },
                      {
                        name: "Delete",
                        type: "delete",
                        handler: () => handleDelete(data.id),
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

TodoItem.propTypes = {
  data: PropTypes.object,
  handleDelete: PropTypes.func,
};

TodoItem.defaultProps = {
  data: {
    id: 1,
    title: "Laporan Harian",
    status: 0, // 0 or 1
    deadline: 1595007321000,
  },
  handleDelete: (id)=>alert(`Delete ID: ${id}`)
};

export default TodoItem;
