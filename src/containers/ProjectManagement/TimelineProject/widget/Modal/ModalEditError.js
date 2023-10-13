/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";
import constants from "../../../../../helpers/constants";
import FileFailed from "../../../../../assets/icons/siab/file-failed.png";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 660,
    height: 525,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 45,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 135,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 180,
  },
  textField: {
    "& .MuiInputBase-root": {
      width: 380,
    },
    "& .MuiOutlinedInput-input": {
      borderRadius: 8,
      border: "1px solid #BCC8E7",
      background: "#F4F7FB",
      "&: hover": {
        borderRadius: 5,
        border: "1px solid #DDE6FF",
        background: "#F4F7FB",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #BCC8E7",
    },
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 380,
    height: 40,
    borderRadius: 10,
    position: "relative",
    border: "1px solid #BCC8E7",
    backgroundColor: "#F4F7FB",
    fontSize: 13,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      // 'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
      "Barlow",
      "NunitoRegular",
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const ModalEditError = ({ isOpen, onClose, onLeave, message }) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
    primaryButton,
    secondaryButton,
    textField,
  } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={5}
        >
          <Grid item>
            <Typography variant="h4" component="h4">
              Mengedit Timeline Gagal
            </Typography>
          </Grid>

          <span>{message}</span>

          <Grid item className={textField}>
            {/* <TextField 
              id="outlined-basic" 
              label="Masukan quotation" 
              variant="outlined" /> */}
            {/* <BootstrapInput placeholder="Masukan quotation" id="inputField" /> */}
            <img src={FileFailed} />
          </Grid>

          <Button
            onClick={onClose}
            className={primaryButton}
            variant="contained"
            disableElevation
            style={{ margin: 30, textTransform: "capitalize" }}
          >
            Retry
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalEditError.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default ModalEditError;
