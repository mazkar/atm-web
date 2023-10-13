/* eslint-disable react/require-default-props */
import { Paper, StepLabel, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';

const steps = [
  { title: 'Pipeline', isActive: 'true' },
  { title: 'Profiling', isActive: 'true' },
  { title: 'Negotiation', isActive: 'true' },
  { title: 'Procurement', isActive: 'true' },
  { title: 'Approval', isActive: 'true' },
  { title: 'Tracking', isActive: 'true' },
  { title: 'Tracking', isActive: 'true' },
  { title: 'Tracking', isActive: 'true' },
];

const useStyles = makeStyles({
  root: {
    padding: 10,
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  stepper: {
    '& .MuiStepLabel-iconContainer': {
      boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
      borderRadius: '50%',
      border: '3px solid white',
    },
  },
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
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function PaperSubmissionProgress(props) {
  const classes = useStyles();
  const { dataSteps } = props;
  const [activeStep, setActiveStep] = useState(0);

  let count = 0;

  useEffect(() => {
    setActiveStep(count);
  }, [count]);

  return (
    <Paper className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
        className={classes.stepper}
      >
        {dataSteps.map((stepItem) => {
          if (stepItem.isActive === 'true') {
            count += 1;
          }
          return (
            <Step key={stepItem.title}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Typography
                  style={{
                    fontFamily: 'Barlow',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: '18px',
                  }}
                >
                  {stepItem.title}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Paper>
  );
}

PaperSubmissionProgress.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSteps: PropTypes.array,
};

PaperSubmissionProgress.defaultProps = {
  dataSteps: steps,
};

export default PaperSubmissionProgress;
