/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  Checkbox
} from '@material-ui/core';
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import DeleteIcon from "@material-ui/icons/Delete";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CircularProgress from '@material-ui/core/CircularProgress';
import constants from '../../../../helpers/constants';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& .MuiCheckbox-root": {
      color: constants.color.primaryHard,
    },
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 660,
    minHeight: 420,
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 62,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width:180,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border:'1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width:180,
  },
  areaText: {
    width: '600px',
    height: '70px',
    borderRadius: 8,
    backgroundColor: constants.color.white,
  },
  uploadFile: {
    cursor: "pointer",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -65,
    color: "#DC241F",
  },
});

const ModalAttachLoiPks = ({ isOpen, onClose, loiOrPksData }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  const [fileAttach, setFileAttach] = useState(null);
  // CHECK IF FILE NULL
  useEffect(() => {
    if(fileAttach === null || fileAttach === undefined){
      setIsButtonDisabled(true);
    }else{
      setIsButtonDisabled(false);
    }
  }, [fileAttach]);

  const handleClose = () =>{
    setFileAttach(null);
    setChecked(false);
    onClose();
  };

  const handleUpload = () => {
    setIsUploading(true);
    const {siteNewAtmId, category} = loiOrPksData;
    // console.log("+++ handleUpload file",fileAttach);
    // console.log("+++ handleUpload siteNewAtmId",siteNewAtmId);
    // console.log("+++ handleUpload type",category.toLowerCase());
    // console.log("+++ handleUpload signedStatus", checked);
    const formData = new FormData();
    formData.append("file", fileAttach);
    formData.append("siteNewAtmId", siteNewAtmId);
    formData.append("type", category.toLowerCase());
    formData.append("signedStatus", checked);
    Axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/attachSignedDocument`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert(`Upload file ${category} berhasil, reload page!`); 
          window.location.reload();
        }else {
          alert(res.data.responseMessage);
        }

        setIsUploading(false);
      })
      .catch((err) => {
        alert(`Gagal upload file ${err}`);
        setIsUploading(false);
      });
  };
  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton onClick={handleClose}>
              <Close className={classes.closeIcon} />
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
                Attach {loiOrPksData.category}
            </Typography>
          </Grid>
        </Grid>
        <Typography style={{fontWeight: 500, marginTop: 30}}>Attach {loiOrPksData.category} File :</Typography>
        <Box style={{ position: "relative", width: "fit-content", marginTop: 12 }}>
          <input
            id="fileAttach"
            type="file"
            accept=".doc, .docx, .xls, .xlxs, .pdf"
            onChange={(e) => {
              setFileAttach(e.target.files[0]);
            }}
            style={{
              width: "0.1px",
              height: "0.1px",
              opacity: 0,
              overflow: "hidden",
              position: "absolute",
              zIndex: -1,
              marginTop: 12,
            }}
          />
          <label htmlFor="fileAttach" className={classes.uploadFile}>
            {fileAttach !== null ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <AttachFileIcon height={24} width={24} style={{color: "#DC241F"}}/>
                <Typography
                  style={{ fontSize: 14, color: "#DC241F", marginLeft: 5 }}
                >
                  {fileAttach.name}
                </Typography>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <AttachFileIcon height={24} width={24} style={{color: "#DC241F"}}/>
                <Typography
                  style={{ color: "#DC241F", marginLeft: 5 }}
                >
                      Attach File{" "}
                </Typography>
              </div>
            )}
          </label>
          {fileAttach!== null && (
            <IconButton
              className={classes.resetFile}
              onClick={() => {
                setFileAttach(null);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Grid container justify="space-between" alignItems="center" style={{marginTop: 60}}>
          <Grid item>
            <Typography>Centang Apabila File {loiOrPksData.category} Sudah Ditandatangani Kedua Pihak</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              checked={checked}
              onChange={(event)=>setChecked(event.target.checked)}
            />
          </Grid>
        </Grid>

        <Grid container justify="space-between" className={classes.buttonContainer}>
          <Grid item>
            <Button
              variant="outlined"
              disableElevation
              className={classes.secondaryButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.primaryButton}
              onClick={handleUpload}
              disabled={isButtonDisabled}
            >
              {isUploading&&(<CircularProgress size={20} style={{marginRight: 10}} />)}
              Upload
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalAttachLoiPks.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loiOrPksData: PropTypes.object.isRequired
};

export default ModalAttachLoiPks;