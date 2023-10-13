/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { Modal, Box, Grid, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import constants from '../../../helpers/constants';
import FileText from '../../../assets/images/file-text.png';
import Cross from '../../../assets/images/cross.png';
import GreenCheck from '../../../assets/images/check-green.png';
import PaperClip from '../../../assets/icons/siab/paperclip.png';
import CloseIconRed from '../../../assets/images/GeneralIcon/close-red.svg';
import getMinioFile from '../../../helpers/getMinioFromUrl';
import {
  GrayMedium,
  PrimaryHard,
  PrimarySoft,
  SuccessMedium,
  SuccessSoft,
} from '../../../assets/theme/colors';

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
    height: 540,
    borderRadius: 10,
    padding: 30,
    overflow: 'scroll',
  },
  buttonContainer: {
    marginTop: 62,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '8px 20px',
    borderRadius: 10,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '8px 20px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
  },
  tableHeader: {
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 600,
  },
  InputFileContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  InputFile: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  ImageIconClose: {
    height: '16px',
    width: '16px',
    marginRight: 3,
    display: 'block',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  acknowledgeButton: {
    fontWeight: '600',
    fontSize: '11px',
    lineHeight: '13px',
    textAlign: 'center',
    textTransform: 'none',
    padding: '6px 9px',
  },
  acknowledgeButtonSuccess: {
    backgroundColor: SuccessSoft,
    color: SuccessMedium,
    '&.Mui-disabled': {
      color: SuccessMedium,
    },
  },
  acknowledgeButtonFailed: {
    backgroundColor: PrimarySoft,
    color: PrimaryHard,
    '&.Mui-disabled': {
      color: PrimaryHard,
    },
  },
  acknowledgeButtonBlue: {
    backgroundColor: GrayMedium,
    color: 'white',
    '&.Mui-disabled': {
      color: 'white',
    },
  },
});

const ModalUploadFile = ({
  isOpen,
  onRemark,
  type,
  atmId,
  onClose,
  setModalLoader,
  isAcknowledgeUser,
  confirmAction,
}) => {
  const {
    modal,
    paper,
    buttonContainer,
    primaryButton,
    secondaryButton,
    tableHeader,
    InputFileContainer,
    InputFile,
    ImageIconClose,
  } = useStyles();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInputFile, setShowInputFile] = useState(false);
  const [idDoc, setIdDoc] = useState('');
  const [filesToUpload, setFilesToUpload] = useState([]);

  useEffect(() => {
    // console.log('~ documents', documents)
  }, [documents]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      FetchData();
    } else {
      setDocuments([]);
      setFilesToUpload([]);
    }
  }, [atmId, type, isOpen]);

  const FetchData = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/getDetailDocumentLegality`,
        {
          siteNewAtmId: atmId,
        }
      );
      // console.log("hit api detail", result);
      setDocuments(result.data.documents);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        alert(`Internal Server Error`);
      }, 100);
    }
  };

  const changeInputFile = (e, id) => {
    const file = e.target.files[0];
    const oldFiles = [...filesToUpload];
    let newFiles = [];
    if (oldFiles.findIndex((val) => id === val.id) >= 0) {
      newFiles = oldFiles.map((val) => {
        return id === val.id ? { ...val, file } : val;
      });
    } else {
      newFiles = [...oldFiles, { id, file }];
    }
    setFilesToUpload(newFiles);

    const newDocuments = [...documents];
    const docIndex = documents.findIndex((d) => d.id === id);
    newDocuments[docIndex].filename = file.name;
    newDocuments[docIndex].available = true;
    newDocuments[docIndex].isLocal = true;
    setDocuments(newDocuments);
    setIdDoc('');
  };

  const upload = (file, id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append('atmId', atmId);
    return axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/attachDocument`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  const deleteFileApi = (id) => {
    return axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/attachDocumentDelete`,
      {
        id,
      }
    );
  };

  const deleteFile = (id) => {
    const newDocuments = [...documents];
    const docIndex = documents.findIndex((d) => d.id === id);
    newDocuments[docIndex].available = false;
    newDocuments[docIndex].isLocal = false;
    setDocuments(newDocuments);
    setShowInputFile(true);
    setIdDoc(id);
    const oldFiles = [...filesToUpload];
    let newFiles = [];
    if (oldFiles.findIndex((val) => id === val.id) >= 0) {
      newFiles = oldFiles.map((val) => {
        return id === val.id ? { ...val, file: null } : val;
      });
    } else {
      newFiles = [...oldFiles, { id, file: null }];
    }
    setFilesToUpload(newFiles);
  };

  const clickDownloadFile = (file) => {
    getMinioFile(file).then((result) => {
      window.open(`${result.fileUrl}`);
    });
  };

  const clickButtonUpload = () => {
    // console.log('~ filesToUpload', filesToUpload)
    if(filesToUpload?.length > 0){
      setModalLoader(true);
      const promises = filesToUpload.map(({ file, id }) => {
        return file ? upload(file, id) : deleteFileApi(id);
      });
      Promise.all(promises)
        .then((res) => {
          alert('File Uploaded Successfully');
          window.location.reload();
        })
        .catch((err) => {
          setModalLoader(false);
          console.log(err);
          alert("Error upload file");
        });
    }
  };

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Box className={paper}>
        <div>
          <div style={{ marginBottom: 20 }}>
            <Grid container justify='space-between' alignItems='center'>
              <Grid item>
                <Typography style={{ fontSize: '20px', fontWeight: 600 }}>
                  Upload Document {type}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={onClose} style={{color:PrimaryHard}}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginBottom: 20 }}>
            <Grid container direction='row' alignItems='flex-start' spacing={2}>
              <Grid item xs={3}>
                <Typography className={tableHeader} style={{ color: '#2B2F3C', textAlign: 'left' }}>
                  Document Name
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography className={tableHeader} style={{ color: '#2B2F3C' }}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography className={tableHeader} style={{ color: '#2B2F3C' }}>
                  Attach
                </Typography>
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </div>
          {!loading &&
            documents.map((item, index) => {
              return (
                <div style={{ marginBottom: 20 }}>
                  <Grid container direction='row' alignItems='flex-start' key={index} spacing={2}>
                    <Grid item xs={3}>
                      <Typography
                        gutterBottom
                        variant='p'
                        style={{ fontSize: '13px', fontWeight: 600 }}
                      >
                        <img src={FileText} style={{ borderRadius: 18 }} />{' '}
                        {item.documentName ? item.documentName : 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: 'center' }}>
                      <img src={item.available ? GreenCheck : Cross} style={{ borderRadius: 18 }} />
                    </Grid>
                    <Grid item xs className={InputFileContainer}>
                      {item.filename && item.available === true && (
                        <Grid container alignItems='center' justify='center'>
                          <Grid item>
                            <img
                              onClick={() => deleteFile(item.id)}
                              src={CloseIconRed}
                              className={ImageIconClose}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{
                                fontSize: '13px',
                                color: '#DC241F',
                              }}
                              onClick={() => {
                                if (!item.isLocal) {
                                  clickDownloadFile(item.filename);
                                }
                              }}
                            >
                              {item.filename.slice(item.filename.lastIndexOf('/') + 1)}
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                      {(!item.filename || !item.available) && (
                        <Grid container alignItems='center' justify='center'>
                          <Grid item>
                            <input
                              accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf, .docx'
                              type='file'
                              className={InputFile}
                              onChange={(e) => changeInputFile(e, item.id)}
                            />
                            <Typography
                              style={{
                                fontSize: '13px',
                                color: '#DC241F',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <img
                                src={PaperClip}
                                style={{
                                  height: '16px',
                                  width: '16px',
                                  marginRight: 3,
                                  display: 'block',
                                }}
                              />
                              <span>Attach Document</span>
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={2}>
                      <AcknowledgeButton
                        acknowledged={item.acknowledge}
                        isAcknowledgeUser={isAcknowledgeUser}
                        id={item.id}
                        reloadDocs={FetchData}
                        filename={item.filename}
                      />
                    </Grid>
                  </Grid>
                </div>
              );
            })}
        </div>
        {loading && (
          <div style={{ padding: '100px 100px', textAlign: 'center' }}>
            <CircularProgress style={{ color: constants.color.primaryHard }} />
          </div>
        )}
        <Grid container justify='space-between' className={buttonContainer}>
          <Grid item>
            <Button
              variant='outlined'
              disableElevation
              className={secondaryButton}
              onClick={onRemark}
            >
              <Typography style={{ fontSize: '13px', fontWeight: 'bold' }}>Remark</Typography>
            </Button>
          </Grid>
          {isAcknowledgeUser && (
            <Grid item>
              <Button
                variant='contained'
                disableElevation
                className={primaryButton}
                onClick={confirmAction}
              >
                Finish Acknowledge
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant='contained'
              disableElevation
              className={primaryButton}
              onClick={clickButtonUpload}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalUploadFile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRemark: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default ModalUploadFile;

function AcknowledgeButton({ acknowledged, isAcknowledgeUser, id, reloadDocs, filename, ...rest }) {
  const {
    acknowledgeButtonSuccess,
    acknowledgeButtonFailed,
    acknowledgeButtonBlue,
    acknowledgeButton,
  } = useStyles();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (acknowledged || !isAcknowledgeUser) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [acknowledged, isAcknowledgeUser]);

  async function clickAction() {
    if (isAcknowledgeUser) {
      if(!acknowledged){// CEK JIKA FILE BELUM TERSEDIA
        if(!filename){
          alert('File document belum tersedia, belum bisa melakukan Acknowledge!');
        }else{
          setIsDisabled(true);
          try {
            const result = await axios.post(
              `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/updateDocumentLegalityAcknowledge`,
              {
                id,
                acknowledge: true
              }
            );
            reloadDocs();
          } catch (e) {
            alert(`Internal Server Error`, e);
            console.log(e);
            setIsDisabled(false);
          }
        }
      }else if(window.confirm('Apakah anda yakin UnAcknowledge dokumen ini?')){
        // alert("DO UnAknowledge");
        setIsDisabled(true);
        try {
          const result = await axios.post(
            `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/updateDocumentLegalityAcknowledge`,
            {
              id,
              acknowledge: false
            }
          );
          reloadDocs();
        } catch (e) {
          alert(`Internal Server Error`, e);
          console.log(e);
          setIsDisabled(false);
        }
        
      }
    // } else if (!isAcknowledgeUser) {
    } else {
      alert('You are not allowed to take this action.');
      // alert('Action forbidden.');
    }
  }

  const acknowledgeButtonNotYetStyle = isAcknowledgeUser
    ? acknowledgeButtonFailed
    : acknowledgeButtonBlue;

  return (
    <>
      <Button
        className={clsx(
          acknowledgeButton,
          acknowledged ? acknowledgeButtonSuccess : acknowledgeButtonNotYetStyle
        )}
        onClick={clickAction}
        disabled={isAcknowledgeUser? false : isDisabled}
        {...rest}
      >
        Acknowledge
      </Button>
      {/* {(isAcknowledgeUser && acknowledged) && (
        <Button
          className={clsx(acknowledgeButton,acknowledgeButtonNotYetStyle)}
          {...rest}
          style={{marginTop: 5}}
        >
          UnAcknowledge
        </Button>
      ) } */}
    </>
  );
}
