/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, {useState} from 'react';
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
import Button from '../../../../components/chky/ChkyButtons';
import constants from '../../../../helpers/constants';
import ModalApproveSuccesful from '../ModalApproveSuccesful';
import {doApproveApproval} from '../ApiServiceApproval';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 660,
    borderRadius: 10,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 35,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  formContainer: {
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  buttonContainer: {
    marginTop: 60,
  },
});

const ModalApproveAll = ({ isOpen, onClose, selectedItems, tabValue, loaderHandler, userId, username }) => {
  const classes = useStyles();
  const title = (tab)=>{
    if(tab===0){
      return "New";
    }
    if(tabValue===1){
      return "Renewal";
    }
    if(tabValue===2){
      return "Reopen";
    }
    if(tabValue===3){
      return "Termin";
    }
  };

  // modal for Approve Success
  const [openModalSuccessful, setOpenModalSuccessful] = useState(false);
  const handleOpenModalSuccessful = () => {
    setOpenModalSuccessful(true);
  };
  const handleCloseModalSuccessful= () => {
    setOpenModalSuccessful(false);
    window.location.reload();
  };

  // handle function when confirm button clicked
  const handleApproveAll = ()=>{
    function renderDataHit(tab){    
      const idSiteNewAtm = [];
      const locationId = [];
      if(tab===0){
        try{selectedItems.map((item)=>{
          idSiteNewAtm.push(item.id);
          locationId.push(item.idLokasi);
        });
        }catch(err){
          console.log(err);
        }
        const dataHit={ "idSiteNewAtm": idSiteNewAtm, "locationId":locationId, "userId" : userId};
        return dataHit;
      }
      if(tabValue===1){
        try{selectedItems.map((item)=>{
          idSiteNewAtm.push(item.id);
          locationId.push(item.locationId);
        });
        }catch(err){
          console.log(err);
        }
        const dataHit={ "idSiteNewAtm": idSiteNewAtm, "locationId":locationId, "userId" : userId};
        return dataHit;
      }
      if(tabValue===2){
        try{selectedItems.map((item)=>{
          idSiteNewAtm.push(item.id);
          locationId.push(item.locationId);
        });
        }catch(err){
          console.log(err);
        }
        const dataHit={ "idSiteNewAtm": idSiteNewAtm, "locationId":locationId, "userId" : userId};
        return dataHit;
      }
      if(tabValue===3){
        try{selectedItems.map((item)=>{
          idSiteNewAtm.push(item.id);
          locationId.push(item.atmId);
        });
        }catch(err){
          console.log(err);
        }
        const dataHit={ "idSiteNewAtm": idSiteNewAtm, "locationId":locationId, "userId" : userId};
        return dataHit;
      }
    }
    doApproveApproval(loaderHandler, renderDataHit(tabValue)).then(
      respons=>{
        console.log(">>>>> APPROVE Location : ", JSON.stringify(respons));
        if(respons.data.responseMessage === 'SUCCESS'){
          onClose();
          handleOpenModalSuccessful();
        }else{
          alert(respons.data.responseMessage);
        }
      }
    );
    // setModalLoader(true);
    // setTimeout(() => { handleOpenModalSuccessful(); }, 3000);
    // setTimeout(() => {onClose(); }, 3000);
    // setTimeout(() => { setModalLoader(false); }, 3000);
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.paper}>
          <Grid container justify="space-between">
            <Grid item/>
            <Grid item>
              <IconButton onClick={onClose}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container direction="column" style={{marginTop: 10,}}>
            <Grid item>
              <Typography className={classes.title} >{selectedItems.length} {title(tabValue)} ATM Approve</Typography>
            </Grid>
            <Grid item>
              <Typography style={{fontSize: 17, fontWeight: 400, textAlign: 'center'}}>Are you sure want to approve {selectedItems.length} selected {tabValue===0 || tabValue===2 ? `ID Requester` : `ATM ID`} ?</Typography>
              <Typography style={{fontSize: 15, fontWeight: 400, textAlign: 'center', fontStyle: 'italic', opacity: 0.75, marginTop: 10}}>
              Selected items: 
              </Typography>
              <Typography style={{fontSize: 15, fontWeight: 400, textAlign: 'center', fontStyle: 'italic', opacity: 0.75, marginTop: 10}}>
                {selectedItems.map((item, i)=>{
                  if(tabValue===0){
                    if(i === (selectedItems.length-1)){
                      return `${item.idLokasi}`;
                    }
                    return `${item.idLokasi}, `;
                  }
                  if(tabValue===1){
                    if(i === (selectedItems.length-1)){
                      return `${item.atmId}`;
                    }
                    return `${item.atmId}, `;
                  }
                  if(tabValue===2){
                    if(i === (selectedItems.length-1)){
                      return `${item.locationId}`;
                    }
                    return `${item.locationId}, `;
                  }
                  if(tabValue===3){
                    if(i === (selectedItems.length-1)){
                      return `${item.atmId}`;
                    }
                    return `${item.atmId}, `;
                  }
                })}

              </Typography>
            </Grid>
          </Grid>

          <Grid container justify="space-between" className={classes.buttonContainer}>
            <Grid item>
              <Button
                buttonType="redOutlined"
                disableElevation
                onClick={onClose}
              >
              Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button
                disableElevation
                onClick={handleApproveAll}
              >
              Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <ModalApproveSuccesful
        isOpen={openModalSuccessful}
        onClose={handleCloseModalSuccessful}
        selectedItems={selectedItems}
        tabValue={tabValue}
        type="Approve"
        username={username}
      />
    </div>
  );
};

ModalApproveAll.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  tabValue: PropTypes.number.isRequired,
  loaderHandler: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default ModalApproveAll;
