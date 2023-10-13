import { Paper, StepLabel } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import LoadingView from '../../../components/Loading/LoadingView';

const steps= [
  {'title': 'Profiling - 1', 'isActive':'true'},
  {'title': 'Profiling - 2', 'isActive':'true'},
  {'title': 'Negotiation', 'isActive':'false'},
  {'title': 'Procurement', 'isActive':'false'},
  {'title': 'Approval', 'isActive':'false'},
  {'title': 'Submission', 'isActive':'false'},
  // {'title': 'Budgeting', 'isActive':'false'},
  {'title': 'Implementation', 'isActive':'false'},
];

const useStyles = makeStyles({
  root: {padding: 10,},
  stepper:{
    '& .MuiStepLabel-iconContainer':{
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
      borderRadius: 20,
      border: '3px solid white',
    },
    '& .MuiStepIcon-root':{color: '#BCC8E7',},
    '& .MuiStepIcon-active':{color: '#65D170',},
  }
});

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 13,
    left: 'calc(-50% + 15px)',
    right: 'calc(50% + 15px)',
  },
  active: {
    '& $line': {
      borderColor: '#65D170',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#65D170',
    },
  },
  line: {
    borderColor: '#BCC8E7',
    borderWidth: 5,
  },
})(StepConnector);
  
const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#BCC8E7',
    display: 'flex',
    alignItems: 'center',
  },
  active: {
    color: '#FF6A6A',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    width: 25,
    height: 25,
    color: 'white',
    backgroundColor: '#65D170',
    borderRadius: '50%',
    zIndex: 1,
    fontSize: 18,
  },
});
  
function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;
  
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}
  
QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function NegotiationProgress(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const {isLoadData} = props;
  let count = 0;

  useEffect(()=>{
    setActiveStep(count);
  },[count]);

  return (
    <Paper className={classes.root}>
      {isLoadData ?
        <LoadingView maxheight='100%' />
        :
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className={classes.stepper}>
          {steps.map((stepItem) => {
            if(stepItem.isActive === 'true'){
              count += 1;
            }
            return (
              <Step key={stepItem.title}>
                <StepLabel StepIconComponent={QontoStepIcon}>{stepItem.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      }
    </Paper>
  );
}
NegotiationProgress.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isLoadData: PropTypes.bool,
};

NegotiationProgress.defaultProps = {
  isLoadData: false,
};

export default NegotiationProgress;
