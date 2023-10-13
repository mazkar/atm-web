import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import ContentAdjustment from './ContentAdjustment';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  }
});
const ModalAdjustment = props => {
  const { isOpen, onClose, setOpen, dataModal, dataSl, dataRequest, index, slValue, setLoading, slOptions=[] } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <ContentAdjustment
          isOpen={isOpen}
          setOpen={setOpen}
          dataModal={dataModal}
          dataSl={dataSl}
          dataRequest={dataRequest}
          index={index}
          onClose={onClose}
          slValue={slValue}
          setLoading={setLoading}
          slOptions={slOptions}
        />
      </Modal>
    </div>
  );
};

export default ModalAdjustment;