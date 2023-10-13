/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
import React, { useState, useEffect, useContext } from 'react';

import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import "moment/locale/id";
import axios from 'axios';

import constants from '../../../helpers/constants';

import './partials/style.css';
import Logo from './partials/Logo';
import LetterNumber from './partials/LetterNumber';
import LetterReceiver from './partials/LetterReceiver';
import LetterSubject from './partials/LetterSubject';
import LetterNegotiation from './partials/LetterNegotiation';
import LetterApproval from './partials/LetterApproval';
import LetterTerm from './partials/LetterTerm';
import LetterPayment from './partials/LetterPayment';
import LetterClosing from './partials/LetterClosing';
import LetterButton from './partials/LetterButton';
import LetterAddition from './partials/LetterAddition';
import LoadingView from '../../Loading/LoadingView';
import { RootContext } from '../../../router';
import getMinioFromUrl from '../../../helpers/getMinioFromUrl';
import useRupiahConverterSecondary from '../../../helpers/useRupiahConverterSecondary';

moment.locale('id');

const useStyles = makeStyles({
  paper: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
  },
  top10Left20: {
    marginTop: 10,
    marginLeft: 20,
  },
  top15Left20: {
    marginTop: 15,
    marginLeft: 20,
  },
  top20Left20: {
    marginTop: 20,
    marginLeft: 20,
  },
  top25Left20: {
    marginTop: 25,
    marginLeft: 20,
  },
  top30Left20: {
    marginTop: 30,
    marginLeft: 20,
  },
  top55Left5: {
    marginTop: 55,
    marginLeft: 5,
  },
  input: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: constants.color.grayMedium,
    borderRadius: 8,
    outline: 'none',
    padding: '12px 33px 12px 12px',
    fontSize: 13,
  },
  font13: {
    fontSize: 13,
  },
  sendButton: {
    position: 'absolute',
    right: 50,
  },
  areaTandaTangan: {
    marginTop: 110,
    marginBottom: 40,
  },
  footerLine: {
    fontSize: '8pt',
    color: constants.color.primaryHard,
    marginTop: 30,
  }
});

const ContentLOI = ({ rowToShow, onClose, type }) => {
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [selectCommunication, setSelectCommunication] = useState('');
  const [selectTenancy, setSelectTenancy] = useState('');
  const [selectBank, setSelectBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountRecipient, setAccountRecipient] = useState('');
  const [price, setPrice] = useState('');
  const [priceList, setPriceList] = useState('[]');
  const [priceListArray, setPriceListArray] = useState([]);
  const [flatCost, setFlatCost] = useState(true);
  const [selectDate, setSelectDate] = useState("");
  const [selectPeriode, setSelectPeriode] = useState(new Date());
  const [paramPeriode, setParamPeriode] = useState();
  const [checkLeft, setCheckLeft] = useState('');
  const [checkRight, setCheckRight] = useState('');
  // const [recipientName, setRecipientName] = useState('');
  const [dataLoi, setDataLoi] = useState('');
  const [referencedNumber, setReferencedNumber] = useState('');
  const [letterNumber, setLetterNumber] = useState('');
  const [username, setUsername] = useState('');
  const [nameBusinessEntity, setNameBusinessEntity] = useState('');
  const [letterDate, setLetterDate] = useState('');
  const [location, setLocation] = useState('');
  const [subject, setSubject] = useState('');
  const [letterPlace, setLetterPlace] = useState('');
  const { userSignature, userFullName } = useContext(RootContext);
  const [signatureManagement, setSignatureManagement] = useState(null);
  const [managementName, setManagementName] = useState('');
  const [deposit, setDeposit] = useState('');
  const [valueTenancies, setValueTenancies] = useState('');
  const { userServiceBaseUrl } = constants;

  const [termList, setTermList] = useState({
    leftSide: {
      'PPn Exclude': false,
      'PPh Include': false,
      'Jenis Listrik': false,
      'Neon Sign': false,
    },
    rightSide: {
      'AC': false,
      'Kebersihan': false,
      'Lahan Penempatan VSAT': false,
    }
  });

  function getManagementSignature(signature) {
    if (signature) {
      getMinioFromUrl(signature)
        .then((res) => {
          setSignatureManagement(res.fileUrl);
        })
        .catch((err) => {});
    } else {
    }
  }

  const { t } = useTranslation();
  const classes = useStyles();

  // select on communication view
  const viewCommunications = [
    { id: 0, value: 'Whatsapp', nameId: 'Whatsapp', nameEn: 'Whatsapp' },
    { id: 1, value: 'Email', nameId: 'Email', nameEn: 'Email' },
    { id: 2, value: 'Chat', nameId: 'Chat', nameEn: 'Chat' },
  ];

  // select on tenancy view
  const year = t('modal.rbbImplementation.LOI.letter.content.year');
  const viewTenancies = [
    { id: 0, value: `1`, nameId: '1 Tahun', nameEn: '1 Years' },
    { id: 1, value: `2`, nameId: '2 Tahun', nameEn: '2 Years' },
    { id: 2, value: `3`, nameId: '3 Tahun', nameEn: '3 Years' },
    { id: 3, value: `4`, nameId: '4 Tahun', nameEn: '4 Years' },
    { id: 4, value: `5`, nameId: '5 Tahun', nameEn: '5 Years' },
  ];

  // select on bank view
  const viewBanks = [
    { id: 0, value: 'Mandiri', nameId: 'Mandiri', nameEn: 'Mandiri' },
    { id: 1, value: 'BCA', nameId: 'BCA', nameEn: 'BCA' },
    { id: 2, value: 'BRI', nameId: 'BRI', nameEn: 'BRI' },
    { id: 3, value: 'BNI', nameId: 'BNI', nameEn: 'BNI' },
  ];

  const itemList = [
    { id: 0, value: 'BANK BRI', nameId: 'BANK BRI', nameEn: 'BANK BRI' },
    { id: 1, value: 'BANK BCA', nameId: 'BANK BCA', nameEn: 'BANK BCA' },
    { id: 2, value: 'BANK MANDIRI', nameId: 'BANK MANDIRI', nameEn: 'BANK MANDIRI' },
    { id: 3, value: 'BANK BNI', nameId: 'BANK BNI', nameEn: 'BANK BNI' },
    { id: 4, value: 'BANK BNI SYARIAH', nameId: 'BANK BNI SYARIAH', nameEn: 'BANK BNI SYARIAH' },
    {
      id: 5,
      value: 'BANK SYARIAH MANDIRI (BSM)',
      nameId: 'BANK SYARIAH MANDIRI (BSM)',
      nameEn: 'BANK SYARIAH MANDIRI (BSM',
    },
    { id: 6, value: 'BANK CIMB NIAGA', nameId: 'BANK CIMB NIAGA', nameEn: 'BANK CIMB NIAGA' },
    {
      id: 7,
      value: 'BANK CIMB NIAGA SYARIAH',
      nameId: 'BANK CIMB NIAGA SYARIAH',
      nameEn: 'BANK CIMB NIAGA SYARIAH',
    },
    { id: 8, value: 'BANK MUAMALAT', nameId: 'BANK MUAMALAT', nameEn: 'BANK MUAMALAT' },
    { id: 9, value: 'BANK BTPN', nameId: 'BANK BTPN', nameEn: 'BANK BTPN' },
    {
      id: 10,
      value: 'BANK BTPN SYARIAH',
      nameId: 'BANK BTPN SYARIAH',
      nameEn: 'BANK BTPN SYARIAH',
    },
    { id: 11, value: 'BANK PERMATA', nameId: 'BANK PERMATA', nameEn: 'BANK PERMATA' },
    {
      id: 12,
      value: 'BANK PERMATA SYARIAH',
      nameId: 'BANK PERMATA SYARIAH',
      nameEn: 'BANK PERMATA SYARIAH',
    },
    {
      id: 13,
      value: 'BANK DBS INDONESIA',
      nameId: 'BANK DBS INDONESIA',
      nameEn: 'BANK DBS INDONESIA',
    },
    { id: 14, value: 'DIGIBANK', nameId: 'DIGIBANK', nameEn: 'DIGIBANK' },
    { id: 15, value: 'BANK BRI SYARIAH', nameId: 'BANK BRI SYARIAH', nameEn: 'BANK BRI SYARIAH' },
    { id: 16, value: 'BANK BTN', nameId: 'BANK BTN', nameEn: 'BANK BTN' },
    { id: 17, value: 'BANK DANAMON', nameId: 'BANK DANAMON', nameEn: 'BANK DANAMON' },
    {
      id: 18,
      value: 'BANK MAYBANK (BII)',
      nameId: 'BANK MAYBANK (BII)',
      nameEn: 'BANK MAYBANK (BII)',
    },
    { id: 19, value: 'BANK MEGA', nameId: 'BANK MEGA', nameEn: 'BANK MEGA' },
    { id: 20, value: 'BANK SINARMAS', nameId: 'BANK SINARMAS', nameEn: 'BANK SINARMAS' },
    {
      id: 21,
      value: 'BANK COMMONWEALTH',
      nameId: 'BANK COMMONWEALTH',
      nameEn: 'BANK COMMONWEALTH',
    },
    { id: 22, value: 'BANK OCBC NISP', nameId: 'BANK OCBC NISP', nameEn: 'BANK OCBC NISP' },
    { id: 23, value: 'BANK BUKOPIN', nameId: 'BANK BUKOPIN', nameEn: 'BANK BUKOPIN' },
    {
      id: 24,
      value: 'BANK BUKOPIN SYARIAH',
      nameId: 'BANK BUKOPIN SYARIAH',
      nameEn: 'BANK BUKOPIN SYARIAH',
    },
    { id: 25, value: 'BANK BCA SYARIAH', nameId: 'BANK BCA SYARIAH', nameEn: 'BANK BCA SYARIAH' },
    { id: 26, value: 'BANK LIPPO', nameId: 'BANK LIPPO', nameEn: 'BANK LIPPO' },
    { id: 27, value: 'CITIBANK', nameId: 'CITIBANK', nameEn: 'CITIBANK' },
  ];

  // date format
  const dateFormat = 'DD MM YYYY';

  const monthsInd = {
    '01': 'Januari',
    '02': 'Februari',
    '03': 'Maret',
    '04': 'April',
    '05': 'Mei',
    '06': 'Juni',
    '07': 'Juli',
    '08': 'Agustus',
    '09': 'September',
    10: 'Oktober',
    11: 'November',
    12: 'Desember',
  };

  const getFullDate = (date) => {
    if (date) {
      const splitDate = date.split(' ');
      return `${parseInt(splitDate[0])} ${monthsInd[splitDate[1]]} ${splitDate[2]}`;
    }
  };

  // handle select date on negotiation
  const handleSelectDate = (date) => {
    // const selectedDate = moment(date).format(dateFormat);
    setSelectDate(date);
  };

  // handle select periode on rent
  const handleSelectPeriode = (date) => {
    // const selectedPeriode = moment(date).format(dateFormat);
    setSelectPeriode(date.valueOf());
  };

  // handle select communication
  const handleSelectCommunication = (value) => {
    setSelectCommunication(value);
  };

  // handle select tenancy
  const handleSelectTenancy = (value) => {
    setSelectTenancy(value);
  };

  // handle select bank
  const handleSelectBank = (value) => {
    setSelectBank(value);
  };

  // cancel button onClick
  const cancelButton = () => {
    alert('Cancel button is clicked');
  };

  // handle recipient name
  const handleRecipient = (event) => {
    setAccountRecipient(event.target.value);
  };

  // handle to change account number format
  const accountNumberHandler = (number) => {
    const account = number.value;
    setAccountNumber(account);
    // console.log("akun", account);
  };

  // handle to format number to rupiah currency
  const priceHandler = (nilai) => {
    setPrice(nilai.floatValue);
    // console.log("PRICE", nilai.floatValue);
  };

  const selectCheckboxLeft = (value) => {
    setCheckLeft(value);
  };

  const selectCheckboxRight = (value) => {
    setCheckRight(value);
  };

  const handleDeposit = (e) => {
    setDeposit(e.floatValue);
  };

  // const arr1 = checkLeft;
  // const arr2 = checkRight;
  // const termValue = [...arr1, ...arr2];
  // console.log("result", termValue);

  const fetchDataLoi = () => {
    const data = { id: rowToShow };
    const config = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    };
    try {
      setModalLoader(true);
      axios
        .post(
          `${
            process.env.REACT_APP_API_DOMAIN
          }/profilelocationservices/profilelocationservices/v1/getRequestLetterOfIntent${
            type === 'renewal' ? 'Renewal' : 'New'
          }`,
          data,
          config
        )
        .then((res) => {
          const newData = res.data;
          const newDataLoi = {
            letterDate: newData.letterDate,
            referencedNumber: newData.referenceNumber,
            username: newData.landlordName,
            location: newData.locationName,
            subject: newData.subject,
          };
          const letterDateArr = newData.letterDate.split(',');
          setLetterPlace(letterDateArr[0]);
          // console.log("+++ submitDealDate",new Date(newData.submitDealDate));
          setSelectDate(newData.submitDealDate);
          // console.log("NEW DATA DRAFT LOI", newData);
          getManagementSignature(newData.firstSignatureUrl);
          setManagementName(newData.firstSigner);
          setDataLoi(newDataLoi);
          setReferencedNumber(newDataLoi.referencedNumber);
          setLetterNumber(newData.draftNegotiationRefNumber || '');
          setUsername(newDataLoi.username);
          setNameBusinessEntity(res.data.nameBusinessEntity);
          setLetterDate(letterDateArr[1]);
          setLocation(newDataLoi.location);
          setSubject(newDataLoi.subject);
          setValueTenancies(res.data.tenancy.toString());
          setPrice(res.data.rentCost);
          setPriceList(res.data.rentCostList);
          setAccountNumber(res.data.accountNumber);
          setAccountRecipient(res.data.accountRecipient);
          setSelectBank(res.data.bankName);
          
          setTermList({
            leftSide: {
              'PPn Exclude': true,
              'PPh Include': true,
              [`Jenis Listrik : ${res.data.electricityType.charAt(0).toUpperCase() + res.data.electricityType.slice(1)}`]: true,
              [`Neon Sign : ${useRupiahConverterSecondary(parseFloat(res.data.yearlySignageCost))}`]: true,
            },
            rightSide: {
              [`AC : ${res.data.acType}`]: res.data.acType ? true : false,
              'Kebersihan': res.data.cleanType === 'include',
              [`Lahan Penempatan VSAT : ${useRupiahConverterSecondary(parseFloat(res.data.antenaLandCost))}`]: true,
            }
          });
          
          if (res.data.rentCostList!==null){
            const dataPriceList = res.data.rentCostList;
            const priceListSplit = dataPriceList.replace("[", "").replace("]", "").split(",");
            const priceListArray = [];
            for (let i = 0; i < priceListSplit.length; i++) {
              priceListArray.push(Number(priceListSplit[i]));
            }
            setPriceListArray(priceListArray);
          }
          setFlatCost(res.data.flatCost);
          setSelectPeriode(moment(res.data.startRentDate).format('DD/MM/YYYY'));
          setParamPeriode(res.data.startRentDate);
          setSelectCommunication(res.data.communication);
          setModalLoader(false);
          if (res.data.responseCode === '404') {
            alert(res.data.responseMessage);
          }
        })
        .catch((err) => {
          setModalLoader(false);
          alert(`${err}`);
        });
    } catch (err) {
      setModalLoader(false);
      alert(`Error Fetching Data...! \n${err}`);
    }
  };

  useEffect(() => {
    // console.log('SELECT PERIODE : ', paramPeriode);
  }, [paramPeriode]);

  // send to landlord button onClick
  const sendToLandlordButton = () => {
    // alert('Send button is clicked');
    // const sendDataLoi = () => {
    // console.log('~ selectBank', selectBank)
    // console.log('~ recipientName', recipientName)
    // console.log('~ accountNumber', accountNumber)
    if(!accountNumber){
      alert('Please input Account Number');
    }
    else if(!accountRecipient){
      alert('Please input Receiver Name');
    }
    else if(!selectBank){
      alert('Please select Bank');
    }
    else{
      // console.log("+++ rentInclude", rentInclude);
      const arr1 = checkLeft;
      const arr2 = checkRight;
      const termValue = [...arr1, ...arr2];
  
      // console.log("+++ termValue", termValue);
      const data = {
        id: rowToShow,
        // username: username,
        landlordName: username,
        nameBusinessEntity,
        // date: moment(selectDate).unix(),
        referenceNumber: referencedNumber,
        date: moment.unix(selectDate / 1000).format("DD MMMM YYYY"),
        letterDate: letterDate.trim(),
        letterPlace,
        subject,
        letterNumber: letterNumber || null,
        communication: selectCommunication,
        rentCost: price,
        rentCostList: priceListArray,
        flatCost,
        rentPeriod: valueTenancies,
        // startRentDate: moment(selectPeriode).valueOf(),
        startRentDate: paramPeriode,
        locationName: location,
        rentInclude: termValue,
        accountNumber,
        accountRecipient,
        bankName: selectBank,
        depositRent: deposit,
      };
      // console.log("REQ DATA NEW LOI", data);
      const config = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      };
      // console.log("+++ data", data);
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/createDraftLoi`,
            data,
            config
          )
          .then((res) => {
            if (res.data.responseCode === '00') {
              alert('Success Send Data to Landlord!');
              setModalLoader(false);
              window.location.reload();
            } else {
              alert('Failed to Send Data to Landlord', res.data.responseMessage);
              setModalLoader(false);
            }
          })
          .catch((err) => {
            setModalLoader(false);
            alert(`${err}`);
          });
      } catch (err) {
        setModalLoader(false);
        alert(`Error Fetching Data...! \n${err}`);
      }
    }
    
  };

  useEffect(() => {
    fetchDataLoi();
  }, []);

  return (
    <>
      {isOpenModalLoader ? (
        <LoadingView maxheight='100%' />
      ) : (
        <Box className={classes.paper}>
          <Grid container direction='column' alignItems='flex-start' justify='flex-start'>
            <Logo />
            <LetterNumber
              fontSize={classes.font13}
              referencedNumber={referencedNumber}
              letterDate={letterDate}
              placeState={letterPlace}
              placeModifier={setLetterPlace}
            />
            <LetterReceiver
              margin={classes.top20Left20}
              fontSize={classes.font13}
              username={username}
              location={location}
              nameBusinessEntity={nameBusinessEntity}
            />
            <LetterSubject
              margin={classes.top25Left20}
              fontSize={classes.font13}
              subject={subject}
            />
            <LetterNegotiation
              margin1={classes.top20Left20}
              margin2={classes.top10Left20}
              fontSize={classes.font13}
              input={classes.input}
              value={selectDate}
              letterNumber={letterNumber}
              handleChange={handleSelectDate}
              communications={viewCommunications}
              commValue={selectCommunication}
              handleSelect={handleSelectCommunication}
            />
            <LetterApproval
              margin1={classes.top20Left20}
              margin2={classes.top10Left20}
              fontSize={classes.font13}
              input={classes.input}
              flatCost={flatCost}
              price={price}
              priceList={priceList}
              handlePrice={priceHandler}
              tenancies={viewTenancies}
              valueTenancies={valueTenancies}
              handleTenancy={handleSelectTenancy}
              periode={selectPeriode}
              handlePeriode={handleSelectPeriode}
            />
            <LetterTerm
              margin1={classes.top20Left20}
              margin2={classes.top15Left20}
              fontSize={classes.font13}
              valueCheckLeft={selectCheckboxLeft}
              valueCheckRight={selectCheckboxRight}
              termList={termList}
            />
            <LetterPayment
              margin1={classes.top25Left20}
              margin2={classes.top10Left20}
              fontSize={classes.font13}
              input={classes.input}
              account={accountNumber}
              accountRecipient={accountRecipient}
              handleAccount={accountNumberHandler}
              // banks={viewBanks}
              banks={itemList}
              handleBank={handleSelectBank}
              handleRecipient={handleRecipient}
              selectBank={selectBank}
            />
            <LetterAddition handleChange={handleDeposit} input={classes.input} deposit={deposit} />
            <div className={classes.top30Left20} style={{marginTop: 20}}>
              <Typography className={classes.font13}>Demikian kami sampaikan atas perhatian dan kerjasamanya kami ucapkan terima kasih.</Typography>
            </div>
            <Grid container style={{marginTop: 20}}>
              <Grid item xs={5}>
                <Typography className={classes.font13} style={{ textAlign: 'left', paddingLeft: 20 }}>Hormat kami, <br /> <b>PT. Bank CIMB Niaga, Tbk</b>.</Typography>
              </Grid>
              <Grid item xs={3}/>
              <Grid item xs={4}><Typography className={classes.font13} style={{ textAlign: 'left' }}>{nameBusinessEntity} <br /> <b>LOKASI/PT </b></Typography></Grid>
            </Grid>
            <Grid container style={{marginTop: 5}}>
              <Grid item xs={5} >
                <img
                  src={signatureManagement}
                  style={{
                    width: '132px',
                    height: '55px',
                    marginBottom: '10px',
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  alt="signature"
                />
              </Grid>
              <Grid item xs={2}/>
              <Grid item xs={5}/>
            </Grid>
            <Grid container style={{marginTop: 5}}>
              <Grid item xs={5}>
                <Typography style={{ textAlign: 'left', paddingLeft: 20 }}>
                  <b>{managementName}</b> <br />
                  Head ATM Site Management
                </Typography>
              </Grid>
              <Grid item xs={3}/>
              <Grid item xs={4}><Typography style={{ textAlign: 'left' }}><b>{username}</b><br/>Pemilik</Typography></Grid>
            </Grid>
            <Grid item>
              <Typography className={classes.footerLine}>
                <b style={{fontSize: '9pt'}}>PT Bank CIMB Niaga Tbk</b><br />
                Griya Niaga  2 Lt 10 , Jl. Wahid Hasyim Blok B-4 No 3 Bintaro Sektor VII Tangerang 15224<br />
                Telp. 021-299 72 400  Fax. 021-748 67 959<br />
                SWIFT <b>BNIAIDJA www.cimbniaga.com</b>
              </Typography>
            </Grid>
            <LetterButton
              margin={classes.top55Left5}
              cancelButton={onClose}
              sendButton={sendToLandlordButton}
            />
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ContentLOI;
