import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Modal,
  Grid,
  Typography,
  Button,
  Paper,
  Select,
  FormControl,
  MenuItem,
  InputBase,
} from '@material-ui/core';
import { DatePicker, TimePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import constants from '../../../helpers/constants';
import Logo from '../../../assets/images/SideMenu/logo_cimb.png';
import { ReactComponent as DropDownIcon } from '../../../assets/icons/general/dropdown_red.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/images/calendar-alt.svg';
import SecureStorage from '../../../helpers/secureStorage';
import { AdvancedSmallInput } from '../../chky/ChkyInputSmall';
import getMinioFromUrl from '../../../helpers/getMinioFromUrl';
import { RootContext } from '../../../router';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #BCC8E7',
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 13,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: 8,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  modal: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Barlow',
  },
  paperRoot: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    top: 0,
    width: 720,
    height: '100%',
    borderRadius: 10,
    padding: 30,
    overflow: 'scroll',
  },
  girdAreaContent: {
    // background: 'blue',
    width: '100%',
  },
  logoArea: {
    marginBottom: 51,
  },
  wrapperArea: {
    marginBottom: 20,
  },
  deskripsiArea: {
    marginBottom: 20,
  },
  deskripsi: {
    fontStyle: 'normal',
    fontSize: 13,
    color: '#2B2F3C',
    textAlign: 'justify',
  },
  labelInput: {
    fontSize: 13,
    color: constants.color.dark,
    marginBottom: 5,
  },
  inputForm: {
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    height: 34,
  },
  inputFormTime: {
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    height: 34,
    width: 100,
  },
  buttonContainer: {
    marginTop: 40,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    width: '100%',
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
  },
  areaTandaTangan: {
    marginTop: 50,
    marginBottom: 40,
  },
  fontBold: {
    fontWeight: 700,
    fontSize: 13,
  },
});

const DraftIjinPenggantianMesin = (props) => {
  const timeFormat = 'HH:mm';
  const [cimbPic, setCimbPic] = useState('Bp. Ramlan Hidayat Said');
  const classes = useStyles();
  const [data, setData] = useState();
  const { isOpen, onClose, rowToShow, setModalLoader } = props;
  const [valueWaktu, setValueWaktu] = useState(moment().startOf('day'));
  const [valueHingga, setValueHingga] = useState(moment().startOf('day'));
  const [dateValue, setDate] = useState(moment());
  const [letterDate, setLetterDate] = useState('');
  const [letterPlace, setLetterPlace] = useState('');
  const { userSignature, userFullName } = useContext(RootContext);
  const [signatureSupport, setSignatureSupport] = useState(null);
  const [signatureManagement, setSignatureManagement] = useState(null);
  const [managementName, setManagementName] = useState('');
  const [replaceVendor, setReplaceVendor] = useState('PT. Citra Removindo');
  const [machineActivationVendor, setMachineActivationVendor] = useState('PT. NCR Ind');
  const [withdrawVendor, setWithdrawVendor] = useState('SSI');

  // useEffect(() => {
  // console.log('~ data', data);
  // }, [data]);

  // address
  let sendAddress = [];
  if (data?.sendTo) {
    sendAddress = data.sendTo.split('\n').map((item) => (item === 'null' ? '-' : item));
    // sendAddress.shift();
  }

  function getManagementSignature(signature) {
    if (signature) {
      getMinioFromUrl(signature)
        .then((res) => {
          // setIsLoading(false);
          // console.log("THIS IS TTD USER LOGIN : ", res.fileUrl);
          setSignatureManagement(res.fileUrl);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      // setIsLoading(false);
    }
  }

  function getSupportSignature(signature) {
    if (signature) {
      getMinioFromUrl(signature)
        .then((res) => {
          // setIsLoading(false);
          // console.log("THIS IS TTD USER LOGIN : ", res.fileUrl);
          setSignatureSupport(res.fileUrl);
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      // setIsLoading(false);
    }
  }

  const dateFormatList = ['DD MMMM YYYY', 'YYYY MMMM DD'];

  const handleChangeWaktu = (date, dateString) => {
    setValueWaktu(date);
  };

  const handleChangeHingga = (date, dateString) => {
    setValueHingga(date);
  };

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  useEffect(() => {
    try {
      if (isOpen) {
        let dataDraftTermin = {};
        dataDraftTermin = SecureStorage.getItem('dataDraftReplace');
        // console.log('~ dataDraftTermin', dataDraftTermin)
        const securedLetterPlace = SecureStorage.getItem('replaceLetterPlace');
        setData(dataDraftTermin);
        setLetterDate(dataDraftTermin?.letterDate?.split(',')[1]);
        setLetterPlace(securedLetterPlace);
        getManagementSignature(dataDraftTermin?.firstSignatureUrl);
        getSupportSignature(dataDraftTermin?.secondSignatureUrl);
        setManagementName(dataDraftTermin?.firstSigner);
        // console.log('dataDraftTermin', dataDraftTermin);
      }
    } catch (err) {
      console.log('~ err', err);
    }
  }, [isOpen]);

  function handleGeneratePDF() {
    const request = {
      id: rowToShow,
      atmId: data.atmId,
      referenceNumber: isEmpty(data) ? 'N/A' : data.referencedNumber,
      letterDate: `${letterPlace},${letterDate}`,
      picName: isEmpty(data) ? 'N/A' : data.piclandlord,
      sendTo: isEmpty(data) ? 'N/A' : data.sendTo,
      locationName: isEmpty(data) ? 'N/A' : data.locationName,
      landlordName: isEmpty(data) ? 'N/A' : data.landlordName,
      date: dateValue.format(dateFormatList[0]),
      day: dateValue.format('dddd'),
      timeFrom: moment(valueWaktu).format(timeFormat),
      timeUntil: moment(valueHingga).format(timeFormat),
      cimbPic: cimbPic || 'N/A',
      nameBusinessEntity: isEmpty(data) ? 'N/A' : data.nameBusinessEntity,
      vendorDetailList: [
        {
          vendorName: replaceVendor,
          vendorJobName: 'Penggantian Mesin ATM',
        },
        {
          vendorName: machineActivationVendor,
          vendorJobName: 'Aktivasi Mesin',
        },
        {
          vendorName: withdrawVendor,
          vendorJobName: 'Penarikan Uang',
        },
      ],
    };
    // console.log('~ request', request);
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    setModalLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getDraftReplace`,
        request,
        headers
      )
      .then((res) => {
        if (res.status == 200) {
          alert('Success Generate PDF');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log('~ err', err);
        alert(err);
        setModalLoader(false);
      });
  }

  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <Paper className={classes.paperRoot}>
        <Grid item className={classes.girdAreaContent}>
          <Grid item className={classes.logoArea}>
            <img style={{ width: '145px' }} src={Logo} alt='logo' />
          </Grid>
          <Grid container justify='space-between' direction='row' className={classes.deskripsiArea}>
            <Grid item>
              <Typography variant='body2'>
                {' '}
                <span className={classes.fontBold}>
                  {isEmpty(data) ? 'N/A' : data.referencedNumber}
                </span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>
                <AdvancedSmallInput stateVar={letterPlace} stateModifier={setLetterPlace} />
                <span>{isEmpty(letterDate) ? 'N/A' : letterDate}</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              {/* <b>Kepada Yth:</b> <br />
              <b>{isEmpty(data) ? 'N/A' : data.piclandlord ? data.piclandlord : '-'}</b> <br />
              <b>{isEmpty(data) ? 'N/A' : data.nameBusinessEntity ? data.nameBusinessEntity : '-'}</b> <br />
              {isEmpty(data) ? (
                <b>N/A</b>
              ) : (
                sendAddress.map((item) => (
                  <div>
                    <b>{item}</b>
                  </div>
                ))
              )}
              <br /> */}

              <b>Kepada Yth:</b> <br />
              <b>{isEmpty(data) ? 'N/A' : data.landlordName ? data.landlordName : '-'}</b> <br />
              <b>{isEmpty(data) ? 'N/A' : data.nameBusinessEntity ? data.nameBusinessEntity : '-'}</b> <br />
              {/* {isEmpty(data) ? (
                <b>N/A</b>
              ) : (
                sendAddress.map((item) => (
                  <div>
                    <b>{item}</b>
                  </div>
                ))
              )} */}
              <b>Telp. {isEmpty(data) ? 'N/A' : data.landLordPhone ? data.landLordPhone : '-'}</b> <br />
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              <b>
                <u>
                  Permohonan Ijin Penggantian Mesin ATM CIMB Niaga di{' '}
                  {isEmpty(data) ? 'N/A' : data.locationName}
                </u>
              </b>
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>Dengan Hormat,</Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Sebelumnya kami mengucapkan terima kasih atas kepercayaan Bapak yang telah bersedia
              memberikan kesempatan kepada kami untuk menyewakan lokasi ATM CIMB Niaga di{' '}
              <b>{isEmpty(data) ? 'N/A' : data.locationName}</b>
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Bersama ini kami bermaksud mengkonfirmasikan bahwa vendor yang akan melakukan
              peenggantian mesin ATM dan perangkat lainnya akan dilakukan oleh :
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Penggantian Mesin ATM : <br />
              <AdvancedSmallInput stateVar={replaceVendor} stateModifier={setReplaceVendor} />
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Aktivasi Mesin : <br />
              <AdvancedSmallInput
                stateVar={machineActivationVendor}
                stateModifier={setMachineActivationVendor}
              />
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Penarikan Uang : <br />
              <AdvancedSmallInput stateVar={withdrawVendor} stateModifier={setWithdrawVendor} />
            </Typography>
          </Grid>
          <Typography className={classes.labelInput}>Dan waktu pelaksanaannya yaitu :</Typography>
          <Grid container className={classes.wrapperArea} spacing={2}>
            <Grid item xs={3}>
              <Grid item>
                <Typography className={classes.labelInput}>Tanggal :</Typography>
              </Grid>
              <Grid item>
                <DatePicker
                  className={classes.inputForm}
                  popupStyle={{ zIndex: 1700 }}
                  clearIcon
                  suffixIcon={<CalendarIcon className='DateSelect__icon' />}
                  format={dateFormatList[0]}
                  value={dateValue}
                  onChange={(e) => {
                    // console.log('onchange date', e);
                    setDate(e);
                  }}
                  allowClear={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid item>
                <Typography className={classes.labelInput}>Waktu :</Typography>
              </Grid>
              <Grid item>
                <TimePicker
                  format={timeFormat}
                  className={classes.inputFormTime}
                  popupStyle={{ zIndex: 1500 }}
                  value={moment(valueWaktu, timeFormat)}
                  onChange={handleChangeWaktu}
                  allowClear={false}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid item>
                <Typography className={classes.labelInput}>Hingga :</Typography>
              </Grid>
              <Grid item>
                <TimePicker
                  format={timeFormat}
                  className={classes.inputFormTime}
                  popupStyle={{ zIndex: 1500 }}
                  value={moment(valueHingga, timeFormat)}
                  onChange={handleChangeHingga}
                  allowClear={false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              <b>Dengan PIC dari pihak Bank CIMB Niaga dibantu oleh</b>{' '}
              <AdvancedSmallInput stateVar={cimbPic} stateModifier={setCimbPic} />
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Demikian kami sampaikan, atas bantuan dan kerjasamanya, kami ucapkan terimakasih.{' '}
              <br />
              Hormat Kami,
            </Typography>
          </Grid>
          <Grid item className={classes.deskripsiArea}>
            <Typography className={classes.deskripsi}>
              Hormat kami, <br />
              <b>PT. Bank CIMB Niaga, Tbk.</b> <br />
              ATM Business Group <br />
            </Typography>
          </Grid>
          <Grid container justify='space-between' className={classes.areaTandaTangan}>
            <Grid item>
              <img
                src={signatureManagement}
                style={{
                  width: '132px',
                  height: '55px',
                  marginBottom: '10px',
                  marginLeft: '10px',
                }}
              />
              <Typography style={{ textAlign: 'center' }}>
                <b>
                  <u>{managementName}</u>
                </b>{' '}
                <br />
                ATM Site Management
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={signatureSupport}
                style={{
                  width: '132px',
                  height: '55px',
                  marginBottom: '10px',
                  marginLeft: '40px',
                }}
              />
              <Typography style={{ textAlign: 'center' }}>
                <b>
                  <u>{userFullName}</u>
                </b>{' '}
                <br />
                ATM Site Management Support
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify='space-between' className={classes.buttonContainer}>
            <Grid item>
              <Button
                variant='outlined'
                disableElevation
                className={classes.secondaryButton}
                onClick={onClose}
                style={{ textTransform: 'capitalize' }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                disableElevation
                className={classes.primaryButton}
                onClick={handleGeneratePDF}
                style={{ textTransform: 'capitalize' }}
              >
                Generate PDF
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default DraftIjinPenggantianMesin;
