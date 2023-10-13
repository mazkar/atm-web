/* eslint-disable react/require-default-props */
import { Paper, StepLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useState, useEffect, Fragment } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import LoadingView from "../../Loading/LoadingView";

// let steps = [
//   { title: "Profiling - 1", isActive: "true" },
//   { title: "Profiling - 2", isActive: "true" },
//   { title: "Negotiation", isActive: "true" },
//   { title: "Procurement", isActive: "false" },
//   { title: "Approval", isActive: "false" },
//   { title: "Submission", isActive: "false" },
//   { title: "Budgeting", isActive: "false" },
//   { title: "Implementation", isActive: "false" },
// ];

// let steps = [
//   { title: "Profiling - 1", isActive: "true" },
//   { title: "Profiling - 2", isActive: "true" },
//   { title: "Negotiation", isActive: "true" },
//   { title: "Procurement", isActive: "true" },
//   { title: "Approval", isActive: "true" },
//   { title: "Submission", isActive: "true" },
//   { title: "Implementation", isActive: "true" },
// ];

const useStyles = makeStyles({
  root: { padding: 10, borderRadius: 10 },
  stepper: {
    "& .MuiStepLabel-iconContainer": {
      boxShadow: "0px 4px 8px 2px rgba(188, 200, 231, 0.3)",
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

function NegotiationProgressPaper(props) {
  const classes = useStyles();
  let { openingType, status } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // setActiveStep(count);
    let hasil;
    if (status === 6) {
      hasil = status - 1;
    } else if (status === 12) {
      hasil = status - 6;
    } else if (status === 3) {
      hasil = 2;
    } else if (status === 4) {
      hasil = 3;
    } else if (status === 5) {
      hasil = 4;
    } else {
      hasil = status
    }
    setActiveStep(hasil);
    if (openingType) {
      if (openingType === "Renewal") {
        setSteps([
          { title: "Pipeline", isActive: "true" },
          { title: "Profiling", isActive: "true" },
          { title: "Negotiation", isActive: "true" },
          { title: "Procurement", isActive: "true" },
          { title: "Approval", isActive: "true" },
          { title: "Doc & Legality", isActive: "false" },
        ]);
      } else {
        setSteps([
          { title: "Pipeline", isActive: "true" },
          { title: "Profiling", isActive: "true" },
          { title: "Negotiation", isActive: "true" },
          { title: "Procurement", isActive: "true" },
          { title: "Approval", isActive: "true" },
          { title: "Submission", isActive: "false" },
          { title: "Doc & Legality", isActive: "false" },
          {
            title: "Implementation",
            isActive: status === 12 ? "true" : "false",
          },
        ]);
      }
    }
    setIsLoading(false);
  }, [openingType, status]);

  return (
    <Paper className={classes.root}>
      {isLoading ? (
        <LoadingView maxheight="100%" />
      ) : (
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
          className={classes.stepper}
        >
          {steps.map((stepItem) => {
            return (
              <Step key={stepItem.title}>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  {stepItem.title}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
    </Paper>
  );
}

NegotiationProgressPaper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSteps: PropTypes.array,
  isLoadData: PropTypes.bool,
};

NegotiationProgressPaper.defaultProps = {
  // dataSteps: steps,
  isLoadData: false,
};

export default NegotiationProgressPaper;
