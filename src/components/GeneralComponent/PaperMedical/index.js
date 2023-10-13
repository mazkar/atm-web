/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes, { array } from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Paper, Grid, Typography, Table, TableCell, TableRow, Button, TableBody } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import moment from 'moment';
import MuiIconLabelButton from '../../Button/MuiIconLabelButton';
import { ReactComponent as HisIcon } from '../../../assets/icons/siab/history.svg';
import constants from '../../../helpers/constants';

const useStepStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowY: 'scroll',
    maxHeight: 500,
    scrollable: 'true',
    '& .MuiStepConnector-lineVertical': {
      borderLeftWidth: 5
    },
    '& .MuiStepper-root': {
      padding: '0px 24px 0px 0px',
    },
  },    
  stepper: {
    '& .MuiStepper-root': {
      paddingRight: 24,
    },
    '& .MuiStepLabel-iconContainer':{
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
      borderRadius: '50%',
      border: '3px solid white',
      paddingRight: 0,
    },
    '& .MuiStepIcon-root': {
      color: '#FF6A6A',
      '& .MuiStepIcon-text': {
        visibility: 'hidden',
      },
    },
  },
  '& .MuiStepConnector-lineVertical': {
    borderLeftWidth: 5
  },
  label: {
    '& .MuiStepLabel-label': {
      marginLeft: 10,
      fontWeight: 500,
      border: '1px solid #E6EAF3',
      borderRadius: 10,
      padding: 10,
      color: 'black',
    }
  }
}));

// function getSteps() {
//   return [
//     {label: 'Hardware',date:'21 July 2020'}, 
//     {label: 'Komunikasi', date:'21 July 2020'}, 
//     {label: 'Supply Mesin', date: '21 July 2020'}, 
//     {label: 'Vandalisme', date: '21 July 2020'},
//     {label: 'Fraud', date: '21 July 2020'}, 
//     {label: 'Forcce Majeure', date: '21 July 2020'},
//     {label: 'Penggantian Part', date: '21 July 2020'},
//     {label: 'Kebersihan ', date: '21 July 2020'},
//     {label: 'Ruangan', date: '21 July 2020'},
//     {label: 'Media Promosi', date: '21 July 2020'},
//     {label: 'AC', date: '21 July 2020'},
//     {label: 'Komplain Nasabah', date: '21 July 2020'},
//   ];}
  
function VerticalLinearStepper(props) {
  const classes = useStepStyles();
  const  {steps}  = props;
  // console.log(steps);

  // const arrayDate = Object.values(steps.eventDate);
  // const date = moment(arrayDate);
  // console.log(date);
  return (
    <div className={classes.root}>
      <Stepper orientation="vertical" className={classes.stepper}>
        {steps.map((data,i) => 
          (
            <Step key={i} onClick={()=>props.handleDetail(i)}>
              <StepLabel className={classes.label}><span>{data.probelmCategory}</span> <span style={{float: 'right', color: '#BCC8E7'}}>{moment(data.eventDate).format('YYYY MM DD')}</span></StepLabel>
              {/* <StepContent>
            </StepContent> */}
            </Step>
          ))}
      </Stepper>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    padding: 20
  },
  tableCell: {
    borderBottom: "unset",
    fontSize:13,
    padding: 5,
  },
  detail: {
    padding: 10,
    border: '1px solid #E6EAF3',
    borderRadius: 10,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 'max-content',
    height: 40,
    marginTop: 10,
    float: 'right',
  },
});

const PaperHistory = (props) => {
  const classes = useStyles();
  const { history, steps } = props;
  const [detail, setDetail] = useState(0);

  const handleDetail = (i) => {
    setDetail(i);
  };

  const handleRequest = () => {
    alert('Page Not Ready Yet');
  }
  return(
    <Paper className={classes.container}>
      <Grid container direction="row" spacing={2} justify="flex-start">
        <Grid item><HisIcon/></Grid>
        <Grid item>
          <Typography variant="body1" component="h6" style={{fontWeight: 500}}>Medical Record</Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" justify="space-between" spacing={2}>
        <Grid item xs={6}>
          <Typography style={{fontWeight: 500}}>Medical Record</Typography>
          <br/>
          <VerticalLinearStepper steps={steps} handleDetail={handleDetail}/>
        </Grid>
        <Grid item xs={6}>
          <Typography style={{fontWeight: 500}}>Log Detail</Typography>
          <br/>
          <div className={classes.detail}>
            <Typography style={{fontWeight: 500}}>{steps[detail]?.detailMedicalRecords.information}</Typography>
            <br/>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell width="20%" className={classes.tableCell}>Status</TableCell>
                  <TableCell className={classes.tableCell}>: {steps[detail]?.detailMedicalRecords.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%" className={classes.tableCell}>Submitter</TableCell>
                  <TableCell className={classes.tableCell}>: {steps[detail]?.detailMedicalRecords.submitterUsername}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Button
            variant="contained"
            disableElevation
            className={classes.primaryButton}
            // onClick={handleSubmit}
            style={{ textTransform: 'capitalize' }}
            onClick={handleRequest}
          >
                  Request Maintenance
          </Button>
        </Grid>

      </Grid>
    </Paper>
  );
};

PaperHistory.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  steps: PropTypes.array.isRequired,
};

export default PaperHistory;