/* eslint-disable react/require-default-props */
import { Paper, StepLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";

const useStyles = makeStyles({
  root: {
    padding: 10,
    borderRadius: 10,
    boxShadow: " 0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  stepper: {
    "& .MuiStepLabel-iconContainer": {
      borderRadius: "50%",
      border: "3px solid white",
    },
  },
});

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 13,
    left: "calc(-50% + 15px)",
    right: "calc(50% + 15px)",
  },
  active: {
    "& $line": {
      borderColor: "#65D170",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#65D170",
    },
  },
  line: {
    borderColor: "#BCC8E7",
    borderWidth: 5,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#BCC8E7",
    display: "flex",
    alignItems: "center",
  },
  active: {
    color: "#FF6A6A",
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    width: 25,
    height: 25,
    color: "white",
    backgroundColor: "#65D170",
    borderRadius: "50%",
    zIndex: 1,
    fontSize: 18,
  },
});

const QontoStepIcon = (props) => {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={classes.root}
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
};

const PaperSubmissionProgress = (props) => {
  const { statusProgress, openingType } = props;
  const classes = useStyles();
  const [stepsNumber, setStepsNumber] = useState();

  useEffect(() => {
    let hasil;
    if (statusProgress === 6) {
      hasil = statusProgress - 1;
    } else if (statusProgress === 12) {
      hasil = statusProgress - 6;
    }
    setStepsNumber(hasil);
  }, [statusProgress]);

  const steps = [
    { title: "Pipeline", isActive: "true" },
    { title: "Profiling", isActive: "true" },
    { title: "Negotiation", isActive: "true" },
    { title: "Procurement", isActive: "true" },
    { title: "Approval", isActive: "true" },
    { title: "Submission", isActive: "false" },
    { title: "Document & Legality", isActive: "false" },
    { title: "Implementation", isActive: "false" },
  ];

  return (
    <Paper className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={stepsNumber}
        connector={<QontoConnector />}
        className={classes.stepper}
      >
        {steps.map((stepItem, i) => {
          return (
            <Step key={stepItem.title}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                {stepItem.title}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Paper>
  );
};

// StepIconComponent={QontoStepIcon}

export default PaperSubmissionProgress;
