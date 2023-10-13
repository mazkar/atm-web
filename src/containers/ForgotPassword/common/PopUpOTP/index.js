/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import constants from "../../../../helpers/constants";
import FileCheck from "../../../../assets/icons/siab/file-check.png";
import { ReactComponent as DoneIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import {ReactComponent as CloseIcon}from "../../../../assets/icons/duotone-red/close.svg";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: (props) => props.width,
    borderRadius: 10,
    padding: 30,
    height: 400,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 120,
    height: 41,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  imgContainer: {
    marginTop: 35,
    marginBottom: 15,
  },
  imgIcon: {
    width: 80,
    height: 80,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  message: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 30,
    textAlign: "center",
  },
});

const PopupFailed = ({ isOpen, onClose, onOtp, width = 420 }) => {
  const classes = useStyles({ width });

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton onClick={onClose}>
              <Close style={{ color: constants.color.primaryHard }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={3}
        >
          <Grid item>
            {" "}
            <Typography style={{ fontSize: 36, fontWeight: 600 }}>
              Request Limit
            </Typography>
          </Grid>
          <Grid item>
            <CloseIcon className={classes.imgIcon} />
          </Grid>
          <Grid item>
            <Typography
              style={{
                color: "#374062",
                fontWeight: 400,
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              OTP Code request reached the limit{" "}
              <span style={{ color: constants.color.primaryHard }}>3/3</span>.
            </Typography>
            <Typography
              style={{
                color: "#374062",
                fontWeight: 400,
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              Please try again after 24 hours.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.primaryButton}
              onClick={onOtp}
              style={{ textTransform: "capitalize" }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

PopupFailed.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.func.isRequired,
  width: PropTypes.func.isRequired,
};

export default PopupFailed;
