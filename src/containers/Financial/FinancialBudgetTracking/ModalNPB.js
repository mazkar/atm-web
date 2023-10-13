import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Box, Grid, IconButton, Typography, Button, LinearProgress, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { Input, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import TextArea from 'antd/lib/input/TextArea';
import { ReactComponent as FileIcon } from '../../../assets/icons/general/paperclip.svg';
import { useDispatch, useSelector } from '../../../helpers/Utils/react-redux-hook';
import { IdrNumberInput } from '../../../components';
import constants from '../../../helpers/constants';
import Mail from '../../../assets/images/mail.png';
import Phone from '../../../assets/images/phone.png';
import getInitials from '../../../helpers/initialName';
import useRupiahConverter from '../../../helpers/useRupiahConverter';
import './style.css'
import index from '../../../components/TabelCellOptions';
import {RootContext} from '../../../router'

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto'
  },
  paper: {
    top: 0,
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 920,
    minHeight: 620,
    borderRadius: 10,
    padding: 20,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonContainer: {
    marginTop: 15,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 140,
    height: 40
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 140,
    height: 40
  },
  textField: {
    '& .MuiInputBase-root': {
      width: 380,
    },
    '& .MuiOutlinedInput-input': {
      borderRadius: 8,
      border: '1px solid #BCC8E7',
      background: '#F4F7FB',
      '&: hover': {
        borderRadius: 5,
        border: '1px solid #DDE6FF',
        background: '#F4F7FB',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #BCC8E7',
    },
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#F4F7FB'
  },
});

var months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

const getPresentDate = () => {
  var date = new Date(),
    loc = date.toLocaleDateString(),
    today = loc.split('/');
  return today[1] + ' ' + months[parseInt(today[0])] + ' ' + today[2];
};


const ModalCreateNPB = (props) => {
  const {
    isOpen,
    onClose,
    onEdit,
    onComplete,
    sendData,
    tableData,
    suggestion,
    capexDescription,
    fullYearBudget,
    setShowModalDetail,
    availableBudget,
    typeGl,
    rcCode,
    setLoading,
    npbCode,
    division
  } = props
  const { modal, paper, closeIcon, buttonContainer, primaryButton, secondaryButton, infoContainer } = useStyles();

  const dispatch = useDispatch()
  const financial = useSelector(state => state.financial)
  const today = new Date();
  const year = today.getFullYear();

  // user
  const {userId, userFullName, userEmail, userPhone, userDivision} = useContext(RootContext);

  const userProfileDummy = {
    name: 'Rita Lisdawati',
    email: 'rita.lisdawati@cimbniaga.co.id',
    phone: '89225',
    division: 'ATMI&M / ABG',
    rcCode: 1611470771806
  }

  const dataNPB = { npbCode: sendData?.npbCode, availableBudget: sendData?.endingBudget }

  // budget information state : row 1
  const [subLedger1, setSubLedger1] = useState('')
  const [capexDesc1, setCapexDesc1] = useState('')
  const [fullYearBudget1, setFullYearBudget1] = useState('')
  const [requested1, setRequested1] = useState('')
  const [availableBudget1, setAvailableBudget1] = useState(0);
  const [typeGl1, setTypeGl1] = useState('');
  const [div, setDiv] = useState('');

  // budget information state : row 2
  const [subLedger2, setSubLedger2] = useState('')
  const [capexDesc2, setCapexDesc2] = useState('')
  const [fullYearBudget2, setFullYearBudget2] = useState('')
  const [requested2, setRequested2] = useState('')
  const [budgetId1, setBudgetId1] = useState('')
  const [budgetId2, setBudgetId2] = useState('')

  const [description, setDescription] = useState('')

  const [fileUpload, setFileUpload] = useState([])
  const [chipData, setChipData] = useState([]);
  const [uploadYear, setUploadYear] = useState(year);
  const [code, setCode] = useState('');

  const availableBalance = availableBudget1 - requested1;

  // close modal
  const closeModal = () => {
    setShowModalDetail(false);
    setCapexDesc1('');
    setFullYearBudget1('');
    setRequested1('');
    setDescription('');
    setFileUpload([]);
    setAvailableBudget1('');
    setChipData([]);
    setCode('');
    setDiv('');
  };

  // budget information handler : row 1
  const handleSubLedger1 = value => {
    setSubLedger1(value);
    for(let i=0; i<suggestion.length; i++) {
      if (suggestion[i].budgetId === value) {
        if (capexDescription !== undefined) {
          let desc = capexDescription[suggestion[i].id - 1];
          setCapexDesc1(desc);
        }
        if (fullYearBudget !== undefined) {
          let budget = fullYearBudget[suggestion[i].id - 1];
          setFullYearBudget1(budget);
        }
        if (availableBudget !== undefined) {
          let avaBudget = availableBudget[suggestion[i].id - 1]
          setAvailableBudget1(avaBudget);
        }
        if (typeGl !== undefined) {
          let type = typeGl[suggestion[i].id - 1]
          setTypeGl1(type);
        }
        if (rcCode !== undefined) {
          let code = rcCode[suggestion[i].id - 1]
          setCode(code);
        }
        if (division !== undefined) {
          let div = division[suggestion[i].id - 1]
          setDiv(div==='' ? '-' : div);
        }
        setBudgetId1(suggestion[i].budgetId)
      }
    }
    // suggestion.map(item => {
    //   if (item.value === value) {
    //     if (capexDescription !== undefined) {
    //       let desc = capexDescription[item.id - 1];
    //       setCapexDesc1(desc);
    //     }
    //     if (fullYearBudget !== undefined) {
    //       let budget = fullYearBudget[item.id - 1];
    //       setFullYearBudget1(budget);
    //     }
    //     if (availableBudget !== undefined) {
    //       let avaBudget = availableBudget[item.id - 1]
    //       setAvailableBudget1(avaBudget);
    //     }
    //     setBudgetId1(item.budgetId)
    //   }
    // })
  }
  const handleRequested1 = value => {
    setRequested1(value.value)
  }

  // budget information handler : row 2
  const handleSubLedger2 = value => {
    setSubLedger2(value)
    suggestion.map(item => {
      if (item.value === value) {
        if (capexDescription !== undefined) {
          let desc = capexDescription[item.id - 1]
          setCapexDesc2(desc)
        }
        if (fullYearBudget !== undefined) {
          let budget = fullYearBudget[item.id - 1]
          setFullYearBudget2(budget)
        }
        setBudgetId2(item.budgetId)
      }
    })
  }
  const handleRequested2 = value => {
    setRequested2(value.value)
  }

  const handleDescription = event => {
    setDescription(event.target.value)
  }

  const uploadFile = (event) => {
    event.preventDefault();
    // setModalLoader(true);
    // const formData = new FormData();
    // formData.append('file', fileUpload[0]);
    // formData.append('uploadYear', uploadYear);
    // // console.log(`CEK FILE Name${JSON.stringify(formData)}`);

    // axios({
    //   method: 'post',
    //   url: `${process.env.REACT_APP_API_DOMAIN}/financialservices/financialNpbServices/v1/uploadFileNpb`,
    //   data: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => {
    //     console.log(JSON.stringify(res));
    //     if (res.status == 200) {
    //       // if (res.data.responseMessage == "SUCCESS") {
    //       // setOpenModalUploadSuccess(true);
    //       // setOpenModalUploadError(false);
    //       // setModalLoader(false);
    //       handleSubmitNPB(res.data.documentId)
    //       alert('Berhasil menambahkan NPB');
    //       closeModal();
    //       // } else {
    //       // setOpenModalUploadError(true);
    //       // setOpenModalUploadSuccess(false);
    //       // setMessageUpload(res.data.message);
    //       // setModalLoader(false);
    //       // handleSubmitNPB(null)
    //       // }
    //     }
    //   })
    //   .catch((_err) => {
    //     // setOpenModalUploadError(true);
    //     // setOpenModalUploadSuccess(false);
    //     // setMessageUpload('Please check your connection and try again');
    //     // setModalLoader(false);
    //     handleSubmitNPB(null);
    //     closeModal();
    //   });

    if(subLedger1 !== '' && requested1 !== '' && availableBudget1 > 0 && availableBalance >= 0) {
      if(parseInt(requested1) >= 1000000) {
        setLoading(true);
        if(fileUpload.length > 0) {
          const loopFile = async _ => {
            let string = '';
            for(let i = 0; i < fileUpload.length; i++) {
              const formData = new FormData();
              formData.append('file', fileUpload[i]);
              formData.append('uploadYear', uploadYear);
              await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_DOMAIN}/financialservices/financialNpbServices/v1/uploadFileNpb`,
                data: formData,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
                .then((res) => {
                  if (res.status == 200) {
                    if(string==='') {
                      string += res.data.documentId;
                    } else {
                      string += `,${res.data.documentId}`;
                    }
                  }
                })
                .catch((_err) => {
                  setLoading(false);
                  alert('Failed to add NPB');
                });
            }
            if(string !== '') {
              handleSubmitNPB(string);
              alert('Successfully added NPB');
              closeModal();
            }
          };
          loopFile();
        } else {
          handleSubmitNPB();
          alert('Successfully added NPB');
          closeModal();
        };
      } else {
        setLoading(false);
        alert('Input requested harus lebih dari 1 juta');
      };
    } else {
      setLoading(false);
      alert('Failed to add NPB');
    }
  }

  const handleSubmitNPB = (documentId) => {
    let store = [
      {
        budgetId: budgetId1,
        subledger: subLedger1,
        capexDescription: capexDesc1,
        fullYearBudget: fullYearBudget1,
        requested: requested1,
        typeGl: typeGl1
      },
      // {
      //   budgetId: budgetId2,
      //   subledger: subLedger2,
      //   capexDescription: capexDesc2,
      //   fullYearBudget: fullYearBudget2,
      //   requested: requested2
      // }
    ]

    let requestData;
    if (sendData.npbCode !== undefined) {
      if (subLedger1 !== '') {
        requestData = {
          submitter: {
            name: userFullName,
            email: userEmail,
            phone: userPhone,
            division: userDivision,
            id: userId
          },
          rcCode: code,
          npbCode: dataNPB.npbCode,
          budget: {
            availableBudget: dataNPB.availableBudget,
            info: store,
            balance: availableBalance
          },
          description: description
        }
        if(fileUpload.length > 0) {
          requestData.documentId = documentId;
        }
      }
    }
    dispatch.financial.submitNpb(requestData)
  }

  function upload(event) {
    event.preventDefault();
    const file = fileUpload;
    let files = [];
    file.push(...event.target.files);
    file.map((data, index) => {
      let temp = {};
      temp.key = index;
      temp.label = data.name;
      files.push(temp);
    });
    setFileUpload(file);
    setChipData(files);
    clearInput();
  }

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  useEffect(() => {
    let response = financial.data
    if (response.responseCode === '00') {
      onComplete()
      dispatch.financialTable.searchBudgetTracking(tableData)
    }
  }, [financial])

  useEffect(() => {
    if(chipData.length===0) {
      setFileUpload([]);
    } else {
      let arr = [];
      chipData.map(chip => {
        let file = fileUpload.find(file => file.name === chip.label);
        arr.push(file);
      });
      setFileUpload(arr);
    }
  }, [chipData]);

  const clearInput = () => {
    const element = document.getElementById('file-form');
    element.reset();
  };

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6" component="h6">
              Create NPB
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={closeModal} style={{ padding: '5px' }}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={1} style={{ marginTop: 5 }}>
          <Grid item>
            <Grid container justify="flex-end" direction="row">
              <Grid item>
                <Typography variant="p" component="p" style={{ fontSize: '15px', fontWeight: 500 }}>
                  No. NPB : {npbCode ? npbCode : '....../.../....../.../../....' }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-end" direction="row">
              <Grid item>
                <Typography style={{ fontSize: '15px', color: '#BCC8E7', fontWeight: 400 }} >
                  {getPresentDate()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="column" className={infoContainer}>
          <Grid container justify="flex-start" direction="row" style={{ padding: '10px 5px 5px 10px' }}>
            <Grid item>{CircleText('#88ADFF', getInitials(userFullName))}</Grid>
            <Grid item>{BlueText(userFullName)}</Grid>
          </Grid>
          <Grid container justify="flex-start" direction="row" style={{ padding: '10px 5px 5px 10px' }} spacing={5}>
            <Grid item><img src={Mail} style={{ width: '20px', height: '20px' }} /> {userEmail} </Grid>
            <Grid item>Division : {div} </Grid>
          </Grid>

          <Grid container justify="flex-start" direction="row" style={{ padding: '10px 5px 15px 10px' }} spacing={5}>
            <Grid item><img src={Phone} style={{ width: '20px', height: '20px' }} /> {userPhone} </Grid>
            <Grid item style={{ marginLeft: '149px' }}>RC : {code} </Grid>
          </Grid>
        </Grid>

        <Grid container justify="space-between" direction="row" style={{ padding: '10px 5px 5px 0' }}>
          <Grid item>
            <Typography style={{ fontSize: '20px', color: '#BCC8E7', fontWeight: 400 }} >
              Budget Information
                </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="flex-start" direction="row" spacing={1}>
              <Grid item style={{ padding: '10px 10px 0 0' }}>
                <Typography style={{ fontSize: '15px', fontWeight: 400 }} >
                  Available Budget :
                </Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Barlow' }} >
                  {useRupiahConverter(availableBudget1)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="column">
          <Grid container justify="flex-start" direction="row" style={{ padding: '10px 5px 5px 0px' }} spacing={2}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    Sub-Ledger
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Select
                    className='select-ledger'
                    getPopupContainer={(trigger) => trigger.parentNode}
                    placeholder='Select Sub-Ledger'
                    onChange={handleSubLedger1}
                    options={suggestion}
                  /> */}
                  <Select
                    className='select-ledger'
                    getPopupContainer={(trigger) => trigger.parentNode}
                    placeholder='Select Sub-Ledger'
                    onChange={handleSubLedger1}
                  >
                    {suggestion.map(item => {
                      return <Option value={item.budgetId}>{item.value}</Option>
                    })}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    {typeGl1==='' ? 'Description' : `${typeGl1==='Opex' ? 'OPEX' : 'CAPEX'} Description`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Input
                    disabled
                    style={{ borderRadius: 6, width: '280px', top: 10, height: '32px', color:'rgba(0, 0, 0, 0.85)'}}
                    placeholder="Description"
                    value={capexDesc1}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    Full Year Budget
                  </Typography>
                </Grid>
                <Grid item>
                  <IdrNumberInput
                    disabled
                    value={fullYearBudget1}
                    placeholder={useRupiahConverter(0)}
                    className='full-year-budget'
                    prefix={'Rp'}
                  />
                  {/* <Input
                    style={{ borderRadius: 6, width: '200px', top: 10, height: '32px', float: 'right' }}
                    placeholder="Input Amount"
                    defaultValue={useRupiahConverter(100000000)}
                    onChange={handleBudget1}
                  /> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    Requested
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Input
                    style={{ borderRadius: 6, width: '200px', top: 10, height: '32px', }}
                    placeholder="Input Amount"
                    onChange={handleRequested1}
                  /> */}
                  <IdrNumberInput
                    value={requested1}
                    onValueChange={handleRequested1}
                    placeholder='Input Amount'
                    className='full-year-budget'
                    prefix={'Rp'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid container direction="column" style={{ marginTop: 10 }}>
          <Grid container justify="flex-start" direction="row" style={{ padding: '10px 5px 5px 0px' }} spacing={2}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    Sub-Ledger
                  </Typography>
                </Grid>
                <Grid item>
                  <Select
                    className='select-ledger'
                    getPopupContainer={(trigger) => trigger.parentNode}
                    placeholder='Select Sub-Ledger'
                    onChange={handleSubLedger2}
                    options={suggestion}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    CAPEX Description
                  </Typography>
                </Grid>
                <Grid item>
                  <Input
                    style={{ borderRadius: 6, width: '280px', top: 10, height: '32px', }}
                    placeholder="Input CAPEX Description"
                    value={capexDesc2}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    Full Year Budget
                  </Typography>
                </Grid>
                <Grid item>
                  <IdrNumberInput
                    value={fullYearBudget2}
                    // onValueChange={handleBudget2}
                    placeholder={useRupiahConverter(1000000000)}
                    className='full-year-budget'
                    prefix={'Rp'}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '18px', fontWeight: 500 }}>
                    Requested
                  </Typography>
                </Grid>
                <Grid item>
                  <IdrNumberInput
                    value={requested2}
                    onValueChange={handleRequested2}
                    placeholder='Input Amount'
                    className='full-year-budget'
                    prefix={'Rp'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}

        <Grid container direction="column" style={{ marginTop: 10 }}>
          <Grid container justify="space-between" direction="row" style={{ padding: '10px 5px 5px 0px' }} spacing={2}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontFamily: 'Barlow', fontSize: '15px', fontWeight: 400 }}>
                    Description :
                  </Typography>
                </Grid>
                <Grid item>
                  <TextArea
                    style={{ width: "420px", height: "120px", top: 5, borderRadius: 6 }}
                    placeholder="Input Description..."
                    required={true}
                    value={description}
                    defaultValue="Perbaikan cassete ATM sesuai dengan list perhitungan terlampir dan harga sesuai SPK 114/SPK/SPAPM/P&CM-ITPRC/III/20"
                    onChange={handleDescription}
                  />
                </Grid>
                <div style={{ marginTop: 5 }}>
                  <Row style={{ alignItems: "center" }}>
                    <div item style={{ marginTop: 5 }}><FileIcon /></div>
                    <label htmlFor="upload-file" style={{ color: '#DC241F', fontSize: '14px', marginLeft: '5px' }} className="buttonUploadFile">Attach File : </label>
                    <form id='file-form'><input style={{ display: "none" }} type="file" accept=".xlsx" id="upload-file" multiple onInput={upload} /></form>
                    <div>
                      <ul style={{display:'flex', listStyleType:'none', padding:'3px 0 0 10px', margin:'0'}}>
                        {chipData.map((item) => (
                          <li key={item.key} style={{marginRight:'3px'}}>
                             <Chip
                              label={item.label}
                              size='small'
                              onDelete={handleDelete(item)}
                              // className={classes.chip}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Row>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justify="flex-start" direction="row" spacing={1}>
                <Grid item style={{ padding: '10px 10px 0 0' }}>
                  <Typography style={{ fontSize: '15px', fontWeight: 400 }} >
                    Balance :
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Barlow' }} >
                    {useRupiahConverter(availableBalance)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify="space-between" className={buttonContainer}>

          <Grid item>
            <Button
              variant="outlined"
              disableElevation
              className={secondaryButton}
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={uploadFile}
            >
              Submit
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Modal>
  );
};

function Progress(props) {
  const useStyles = makeStyles({
    rootProgress: {
      display: 'block',
      height: '100%',
      minWidth: '250px',
      marginLeft: 80,
      borderRadius: 5,
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: props.barColor,
      },
    },
  });

  const classes = useStyles();
  return (
    <Box alignItems="center">
      <Box
        width="100%"
        style={{
          position: 'relative',
          height: '20px',
        }}
      >
        <LinearProgress
          className={classes.rootProgress}
          variant="determinate"
          {...props}
        />
        <Box
          minWidth={35}
          style={{
            textAlign: 'right',
            width: '100%',
            height: '15px',
            paddingRight: '5%',
            transform: 'translate(20px, -20px)',
            zIndex: 9,
          }}
        >
          <Typography
            style={{ paddingRight: '15%' }}
            variant="body2"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

const CircleText = (color, text) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: 'white',
        border: '2px solid #FFFFFF',
        boxSizing: 'border-box',
        boxShadow: '0px 8px 8px rgba(188, 200, 231, 0.2)',
        borderRadius: '50%',
        height: 30,
        width: 30,
        textAlign: 'center',
        padding: 2,
      }}
    >
      {text}
    </div>
  );
};

const BlueText = (text) => {
  return (
    <div
      style={{
        height: 30,
        textAlign: 'center',
        padding: 2,
        marginLeft: 5,
        marginTop: 2,
        fontWeight: 500
      }}
    >
      {text}
    </div>
  );
};

ModalCreateNPB.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
};

export default ModalCreateNPB;
