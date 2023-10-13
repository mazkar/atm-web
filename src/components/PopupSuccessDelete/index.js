/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import constants from '../../helpers/constants';
import FileCheck from '../../assets/icons/siab/file-check.png';
import { ReactComponent as TrashIcon } from "../../assets/icons/siab/trash-new.svg";

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: (props) => props.width,
    borderRadius: 10,
    padding: 30,
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
    textAlign: "center"
  }
});

const PopupSuccesDelete = ({ isOpen, onClose, message="Delete Success!", width=320 }) => {
  const classes = useStyles({width});

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid item className={classes.imgContainer}>
            <TrashIcon className={classes.imgIcon}/>
          </Grid>
          <Grid item>
            <Typography variant="h4" component="h4" className={classes.message}>
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

PopupSuccesDelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.func.isRequired,
  width: PropTypes.func.isRequired,
};

export default PopupSuccesDelete;
