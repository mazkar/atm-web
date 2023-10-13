import React from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as TrashIcon } from "../../../../assets/icons/siab/trash-new.svg";
import { ReactComponent as DoneIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import PropTypes from 'prop-types';
import constants from '../../../../helpers/constants';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 500,
    height: 400,
    borderRadius: 10,
    padding: 30,
  },
});

const successPopUp = ({ isOpen, onClose, label, type }) => {
  const {
    modal,
    paper,
  } = useStyles();

  const renderIcon = () => {
    if (type !== "Delete") {
      return (
        <DoneIcon style={{ width: "120px", height: "120px", marginTop: 60 }} />
      );
    } else {
      return (
        <TrashIcon style={{ width: "120px", height: "120px", marginTop: 60 }} />
      );
    }
  };

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={5}
        >
          <Grid item>
            {renderIcon()}
          </Grid>

          <Grid item>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: "#374062", fontWeight: 500 }}
            >
              {label}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

successPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default successPopUp;