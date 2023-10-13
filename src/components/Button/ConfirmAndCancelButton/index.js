/* Third Party Import */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";

/* Internal Import */
import { PrimaryHard } from "../../../assets/theme/colors";

const useStyles = makeStyles({
  containedButton: {
    color: "#ffffff",
    backgroundColor: PrimaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  acceptButton:{
    color: "#ffffff",
    backgroundColor: "#65D170",
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: "#65D170",
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  outlinedButton: {
    color: PrimaryHard,
    backgroundColor: "#ffffff",
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    width: 100,
    height: 40,
  },
});

const ConfirmAndCancelButton = ({
  onCancel,
  onConfirm,
  textCancel,
  textConfirm,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <Grid container style={{ marginTop: 20 }} justify="space-between">
      <Grid item>
        <Button
          variant="contained"
          disableElevation
          className={classes.outlinedButton}
          style={{ textTransform: "capitalize" }}
          onClick={onCancel}
        >
          {textCancel}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          disableElevation
          className={textConfirm === "Accept"? classes.acceptButton:classes.containedButton}
          style={{ textTransform: "capitalize" }}
          onClick={onConfirm}
          disabled={disabled}
        >
          {textConfirm}
        </Button>
      </Grid>
    </Grid>
  );
};

ConfirmAndCancelButton.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  textCancel: PropTypes.string,
  textConfirm: PropTypes.string,
  disabled: PropTypes.bool,
};

ConfirmAndCancelButton.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
  textCancel: "",
  textConfirm: "",
  disabled: false
};

export default ConfirmAndCancelButton;
