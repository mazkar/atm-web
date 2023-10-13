/* eslint-disable react/forbid-prop-types */
import React, {useState, useRef} from 'react';
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
import { ChkyButtons } from '../../../../components';
import constants from '../../../../helpers/constants';
import { ReactComponent as PaperClipIcon } from '../../../../assets/icons/general/paperclip.svg';
import DeleteIcon from '@material-ui/icons/Delete';

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
    height: 600,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 40,
  },
});

const idrCurrencyFormat = (value) => {
  if (value === null) {
    return 'N/A';
  }
  return `Rp ${  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};
const ModalDealNegotiation = ({ isOpen, onClose, onNext, dataDealNego, fileSuratKonfirmasiLandlord, setFileSuratKonfirmasiLandlord, handleUploadSuratKonfirmasiLandlord }) => {
  const {
    modal,
    paper,
    closeIcon,
    buttonContainer,
  } = useStyles();
  const inputFileKonfirmasiLandlord = useRef();



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
          <Grid item style={{ position: 'absolute' }}>
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
                Kesepakatan
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="p">
                Dengan ini maka negosiasi akan berakhir dan tercapai kesepakatan.
            </Typography>
          </Grid>
          <Grid item>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography variant="body1" component="p" style={{ fontSize: 14, fontWeight: 500 }}>
                          Harga kesepakatan
                      </Typography>
                    </Grid>
                  </Grid>
                  {
                    dataDealNego?.negotiationDealCostList?.map((row,index)=>{
                      return (
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography variant="body1" component="p" style={{fontSize: 12, fontWeight: 500}}>
                                Tahun - {(index+1)}
                            </Typography>
                          </Grid>
                          <Grid item style={{marginLeft:20}}>
                            <Typography style={{border: '1px solid #E6EAF3', minWidth: 160, textAlign: 'right', padding: 10, borderRadius: 8, marginLeft: 40 }}>
                              {row === null ? 'N/A' : idrCurrencyFormat(row)}
                            </Typography>
                          </Grid>
                        </Grid>
                      )
                    })
                  }
            
            <Grid container style={{marginTop:20}}>
              <Grid item>
                <Typography variant="body1" component="p" style={{fontSize: 14, fontWeight: 500}}>
                    Surat Konfirmasi Landlord
                </Typography>
              </Grid>
              <Grid item style={{marginLeft:20}}>
                <div style={{ position: 'relative', marginTop: 5 }}>
                  <PaperClipIcon style={{ position: 'absolute', top: 5, width: 20 }} />
                  <div style={{ position: 'relative', paddingLeft: 20 }}>
                    <input
                      id='fileSuratKonfirmasiLandlord'
                      type="file"
                      ref={inputFileKonfirmasiLandlord}
                      onChange={handleUploadSuratKonfirmasiLandlord}
                      style={{
                        width: '0.1px',
                        height: '0.1px',
                        opacity: 0,
                        overflow: 'hidden',
                        position: 'absolute',
                        zIndex: -1,
                      }} />
                    <label htmlFor="fileSuratKonfirmasiLandlord" style={{ cursor: 'pointer' }}>
                      {fileSuratKonfirmasiLandlord === null ?
                        <Typography style={{ fontSize: 14, color: '#DC241F', marginLeft: 5 }}>Attach File.. </Typography>
                        :
                        <Typography style={{ fontSize: 14, color: '#DC241F', marginLeft: 5 }}>{fileSuratKonfirmasiLandlord.name}</Typography>
                      }
                    </label>
                    {fileSuratKonfirmasiLandlord === null ?
                      null
                      : <IconButton style={{ position: 'absolute', top: -10, right: -20, color: '#DC241F', }} onClick={() => { setFileSuratKonfirmasiLandlord(null); inputFileKonfirmasiLandlord.current.value = null; }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>}

                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify="space-between" className={buttonContainer}>
          <Grid item>
            <ChkyButtons style={{textTransform:'capitalize'}} buttonType="redOutlined" onClick={onClose}>Cancel</ChkyButtons>
          </Grid>

          <Grid item>
            <ChkyButtons disabled={fileSuratKonfirmasiLandlord==null ? true : false} style={{textTransform:'capitalize'}} onClick={onNext}>Yes</ChkyButtons>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalDealNegotiation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  dataDealNego: PropTypes.object.isRequired,
};

export default ModalDealNegotiation;
