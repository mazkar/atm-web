import { makeStyles, Modal } from '@material-ui/core';
import React, { useEffect } from 'react';
import ContentLOI from './ContentLOI.js'; 

const useStyles = makeStyles({
  modal: {
    display: "block",
    overflowY:'auto',
    height:'100%',
    width: 720,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

const ModalDraftLOI = (props) => {
  const { isOpen, onClose, rowToShow, type } = props;
  const classes = useStyles();

  // console.log('prop LOI', props);
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className={classes.modal}>
        <ContentLOI {...{rowToShow, onClose, type}}  />
      </div>
      
    </Modal>
  );
};

export default ModalDraftLOI;
