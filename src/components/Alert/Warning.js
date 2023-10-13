/* Third Party Import */
import React from 'react';
import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import {Dialog, Box, Typography} from "@material-ui/core";

/* Internal Import */
import {
  PrimaryHard,
} from "../../assets/theme/colors";
import { ReactComponent as AlertSvg } from "../../assets/images/exclamation-triangle.svg";
import ConfirmAndCancelButton from '../Button/ConfirmAndCancelButton';

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
  subtitle: {
    fontWeight: 500,
    fontSize: "13px",
    marginBottom: "40px",
  },
});

const AlertWarning = ({isOpen, onClose, title, subTitle, onConfirm}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={classes.modal}
    >
      <Box style={{ padding: "16px 30px" }}>
        <Typography className={`${classes.textRoot} ${classes.title}`}>
          {title}
        </Typography>
        <Typography className={`${classes.textRoot} ${classes.subtitle}`}>
          {subTitle}
        </Typography>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <AlertSvg />
        </div>
        <ConfirmAndCancelButton
          onCancel={onClose}
          onConfirm={onConfirm}
          textCancel="Batal"
          textConfirm="Delete"
        />
      </Box>
    </Dialog>
  );
};

AlertWarning.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  subTitle: PropTypes.string,
};
AlertWarning.defaultProps = {
  subTitle: ''
};

export default AlertWarning;
