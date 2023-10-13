import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Constants from '../../helpers/constants';
import CIMBLoading from '../Loading/CIMBLoading';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    color: Constants.color.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ModalLoader = (props) => {
  const classes = useStyles();
  const { isOpen } = props;

  // console.log('props loader', props)

  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick
      >
        <Fade in={isOpen}>
          {props.content ? (
            <Typography style={{ color: 'white', fontSize: 20 }}>
              {props.content}
            </Typography>
          ) : (
              <div className={classes.paper}>
                {/* <CircularProgress />
              <Typography>Loading ...</Typography> */}
                <CIMBLoading heigth='100px' width='100px' />
              </div>
            )}
        </Fade>
      </Modal>
    </div>
  );
};

ModalLoader.propTypes = {
  isOpen: PropTypes.bool,
};

ModalLoader.defaultProps = {
  isOpen: false,
};

export default ModalLoader;
