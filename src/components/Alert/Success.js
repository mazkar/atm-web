/* Third Party Import */
import React from 'react';
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import {Dialog, Box, Typography} from "@material-ui/core";

/* Internal Import */
import { ReactComponent as SuccessSvg } from "../../assets/images/check-circle-green.svg";

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "320px",
    },
  },
  textRoot: {
    fontFamily: "Barlow",
    color: "#374062",
    textAlign: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: "20px",
    marginBottom: "8px",
  },
});

const AlertSuccess = ({isOpen, onClose, title}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={classes.modal}
    >
      <Box style={{ padding: "65px 30px" }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <SuccessSvg />
        </div>
        <Typography className={`${classes.textRoot} ${classes.title}`}>
          {title}
        </Typography>
      </Box>
    </Dialog>
  );
};

AlertSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default AlertSuccess;
