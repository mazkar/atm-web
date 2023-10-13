import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from '@material-ui/core';
import * as Colors from '../../../../assets/theme/colors';
import { ReactComponent as ProgressIcon } from "../../../../assets/icons/duotone-others/refresh-2nd.svg";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/duotone-others/check-circle-2nd.svg";

const useStyles = makeStyles ({
  root: {
    position: 'relative',
    '& .MuiPaper-elevation1':{
      boxShadow:'0px 6px 6px rgba(232, 238, 255, 0.3)',
      borderRadius: 10,
    },
    marginBottom: 20,
  },
  content: {
    padding: 20,
    paddingTop: 75,
  },
  title:{
    fontSize: 15,
    fontFamily: 'Barlow',
    fontWeight: 500, 
    color: Colors.Dark,
  },
  stringBlack:{
    fontSize: 13,
    fontFamily: 'Barlow',
    fontWeight: 500, 
    color: Colors.Dark,
  },
  stringGreen:{
    fontSize: 13,
    fontFamily: 'Barlow',
    fontWeight: 500, 
    color: Colors.Green,
  },
  headTitle: {color: '#fff', fontSize: 20, fontWeight: 600},
  headerGreen: {
    padding: '13px 20px',
    backgroundColor: '#65D170',
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerBlue: {
    padding: '13px 20px',
    backgroundColor: '#749BFF',
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
function renderHeader(status, title){
  const classes = useStyles();
  switch (status) {
  case 'complete':
    return (
      <Grid container justify="space-between" alignItems="center" className={classes.headerGreen}>
        <Grid item><Typography className={classes.headTitle}>{title}</Typography></Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item><Typography style={{color: '#fff', fontSize: 15, fontWeight: 600}}>Complete</Typography></Grid>
            <Grid item><CheckIcon style={{height: 20, width: 20}}/></Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  case 'notComplete':
    return (
      <Grid container justify="space-between" alignItems="center" className={classes.headerBlue}>
        <Grid item><Typography className={classes.headTitle}>{title}</Typography></Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item><Typography style={{color: '#fff', fontSize: 15, fontWeight: 600}}>Not Complete</Typography></Grid>
            <Grid item><ProgressIcon style={{height: 20, width: 20}}/></Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  default:
    return 'N/A';
  }
}
function PaperDraftDetail(props) {
  const classes = useStyles();
  const {title, status, children}=props;
  return (
    <div className={classes.root}>
      <Paper>
        {renderHeader(status, title)}
        <div container className={classes.content} >
          {children}
        </div>
      </Paper>
    </div>
  );
}

PaperDraftDetail.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  children: PropTypes.node,
};
PaperDraftDetail.defaultProps = {
  title: "Title",
  status: "complete",
  children: (<Typography>Component Paper</Typography>),

};
export default PaperDraftDetail;

