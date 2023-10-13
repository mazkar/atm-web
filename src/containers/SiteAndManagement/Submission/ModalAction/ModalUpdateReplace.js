/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Modal, Box, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import constants from '../../../../helpers/constants';
import ReplaceForm from '../SubmissionForm/ReplaceForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 816,
    height: 'max-content',
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
}));

const ModalUpdate = ({ isOpen, onClose, id }) => {
  const { modal, paper, closeIcon } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Box className={paper}>
        <Grid container justify='space-between' alignItems='flex-start'>
          <Grid item>
            <Typography variant='h6' component='h6'>
              Update Detail Replace
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>
        <div>
          <ReplaceForm id={id} />
        </div>
      </Box>
    </Modal>
  );
};

ModalUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  rowToShow: PropTypes.string.isRequired,
  idLocation: PropTypes.string.isRequired,
  handleModalRbbArea: PropTypes.func.isRequired,
  defaultArea: PropTypes.string.isRequired,
};

export default withRouter(ModalUpdate);
