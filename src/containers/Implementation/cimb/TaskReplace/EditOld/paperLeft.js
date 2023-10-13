import React, {useState, createRef} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, FormControl, MenuItem } from '@material-ui/core';
import SelectBootstrap from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ReactComponent as ExchangeIcon }from '../../../../../assets/icons/siab/list-ul.svg'
import { DatePicker, Select } from 'antd';
import { ReactComponent as PaperClipIcon } from '../../../../../assets/icons/linear-red/paperclip.svg';
import { withStyles } from "@material-ui/styles";
import { ReactComponent as UserIcon } from '../../../../../assets/icons/linear-red/user.svg';
import { ReactComponent as CalendarIcon } from '../../../../../assets/icons/linear-red/calendar.svg';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from '../../common/InputComponent';
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import { ReactComponent as AngleDownIconBrown } from "../../../../../assets/icons/general/chevron-down.svg";
import ErrorComponent from "../../common/ErrorComponent";
import InputBase from "@material-ui/core/InputBase";
import moment from 'moment';

const { Option } = Select;

const BootstrapInputLeft = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: "6px 0px 0px 6px",
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #DC241F',
      fontSize: 13,
      color: Colors.PrimaryHard,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: "6px 0px 0px 6px",
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  const BootstrapInputRight = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: "0px 6px 6px 0px",
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #BCC8E7',
      fontSize: 13,
      //color: "#BCC8E7",
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: "0px 6px 6px 0px",
        borderColor: '#BCC8E7',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    height: "685px",
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)'
  },
  rootPaperSecond: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: Colors.White,
    boxShadow: 'unset',
    height: '40px',
    border: '1px solid #BCC8E7',
  },
  iconButton: {
    padding: '0px 5px',
    color: Colors.GrayMedium,
    display: 'flex',
    alignItems: 'center'
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    cursor: "pointer",
    display: "flex",
    flexDirection: 'column'
  },
  resetImage: {
    position: "absolute",
    width: '15px',
    height: '15px',
    top: -10,
    right: -10,
  },
  attachment: {
      fontWeight: 500, 
      fontFamily: 'Barlow', 
      cursor: 'pointer', 
      color: '#DC241F'
  },
  paperClip: { 
      width: 20, 
      height: 20, 
      paddingTop: 4, 
      marginRight: 5, 
      cursor: 'pointer' 
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  select: {
    minWidth: 120,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  inputFieldSelect:{
    border: '1px solid #A8B6DB',
    borderRadius: '0px 6px 6px 0px',
    boxSizing: 'border-box',
    padding: '10px',
    fontFamily: 'Barlow',
    width: 320,
    height: '41px',
    '& ::placeholder': {
      color: '#A8B6DB'
    },
    '& ::selection': {
      background: '#FF6130'
    },
    '&:hover': {
      border: '1px solid #A8B6DB',
    },
  },
  selectPremises: {
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
        paddingTop: '5px',
        color: '#DC241F'
    },
    "& .ant-select-single .ant-select-selector": {
        height: '41px',
        border: '1px solid #DC241F',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    "& .ant-select-single .ant-select-arrow": {
        transition: 'transform 0.2s ease-in',
        color: '#DC241F'
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
        transform:' rotate(180deg)',
        transition: 'transform 0.2s ease-in'
    },
  },
  selectKonven: {
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
        paddingTop: '5px',
    },
    "& .ant-select-single .ant-select-selector": {
        height: '41px',
        border: '1px solid #A8B6DB',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    "& .ant-select-single .ant-select-arrow": {
        transition: 'transform 0.2s ease-in'
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
        transform: 'rotate(180deg)',
        transition: 'transform 0.2s ease-in'
    }
  },
});

const dataTaskParameter = [
    {id: 0, value: 'New', nameId: 'New', nameEn: 'New'},
    {id: 1, value: 'Existing', nameId: 'existing', nameEn: 'Existing'},
    {id: 2, value: 'Not Request (-)', nameId: 'notRequest', nameEn: 'Not Request (-)'},
]

const dataVendor = [
    {id: 0, value: 'PT. Royal', nameId: 'PT. Royal', nameEn: 'PT. Royal'},
    {id: 1, value: 'PT. Wahana', nameId: 'PT. Wahana', nameEn: 'PT. Wahana'},
    {id: 2, value: 'PT. Neopack', nameId: 'PT. Neopack', nameEn: 'PT. Neopack'},
]

const dataRequest = [
    {id: 0, value: 'Urgent', nameId: 'Urgent', nameEn: 'Urgent'},
    {id: 1, value: 'Vsat', nameId: 'Vsat', nameEn: 'Vsat'},
    {id: 2, value: 'Non Vsat', nameId: 'Non Vsat', nameEn: 'Non Vsat'},
]

const itemSearchPremises = [
    {text: 'ATM ID', value: 'atm'},
    {text: 'Tanggal Submit', value: 'submit_date'},
    {text: 'ID Submit', value: 'submit_id'},
    {text: 'Nama Lokasi', value: 'location_name'},
    {text: 'Type Mesin', value: 'type_mesin'},
    {text: 'PIC Request', value: 'request_pic'},
    {text: 'Tanggal Ready', value: 'ready_date'},
    {text: 'Tanggal Aktivasi', value: 'activation_date'},
    {text: 'SLA', value: 'sla'}
]

const itemPremises = [
    {text: 'Konvensional 2', value: 'konvensional2'}
]

const dataMerekMesin = [
    {id: 0, value: 'Diebold', nameId: 'Diebold', nameEn: 'Diebold'},
    {id: 1, value: 'Hitachi', nameId: 'Hitachi', nameEn: 'Hitachi'},
    {id: 0, value: 'IBM', nameId: 'IBM', nameEn: 'IBM'},
    {id: 1, value: 'NCR', nameId: 'NCR', nameEn: 'NCR'},
    {id: 0, value: 'OKI', nameId: 'OKI', nameEn: 'OKI'},
    {id: 1, value: 'Wincor', nameId: 'Wincor', nameEn: 'Wincor'},
]


function LeftComponent(props) {
  const classes = useStyles();
  const { data, isLoadData, errorForm, onChange } = props;

  let fileInput5 = createRef(),
    fileInput6 = createRef(),
    fileInput7 = createRef();

  const [attachment1, setAttachment1] = useState(null)
  const [attachment2, setAttachment2] = useState(null)
  const [attachment3, setAttachment3] = useState(null)
  const [selectedSearch, setSelectedSearch] = useState('off');
  const [selectedPremises, setSelectedPremises] = useState('konvensional');
  const [valueCategory, setValueCategory] = useState('New')
  const [valueLongText, setValueLongText] = useState('Butuh pengiriman Email DIstribusi kepada pihak yang terkait')
  const [valueVendor, setValueVendor] = useState('PT. Royal')
  const [valueRequestType, setValueRequestType] = useState('Urgent')
  const [valueDate, setValueDate] = useState(moment())
  const [valueATMID, setValueATMID] = useState('2131')
  const [valueMesinBaru, setValueMesinBaru] = useState('ATM')


  const handleChangeKebutuhan = (dataKebutuhan, keyData) => {
    var items = {
      ...data,
      [keyData]: dataKebutuhan,
    }
    onChange(items)
  }

  const handleChange = (e) => {
    console.log(e)
    setValueCategory(e)
    handleChangeKebutuhan(e, 'category')
  }

  const handleChangeLongText = (e) => {
    console.log(e)
    setValueLongText(e)
    handleChangeKebutuhan(e.target.value, 'description')
  }

  const handleChangeDate = (e) => {
    console.log(e)
    setValueDate(e.format('DD MMMM YYYY'))
    handleChangeKebutuhan(e.format('DD MMMM YYYY'), 'date')
  }

  const handleChangeVendor = (e) => {
    console.log(e)
    setValueVendor(e)
    handleChangeKebutuhan(e, 'picVendor')
  }

  const handleRequestType = (e) => {
    console.log(e)
    setValueRequestType(e)
    handleChangeKebutuhan(e, 'requestType')
  }

  const handleATMID = (e) => {
    console.log(e)
    setValueATMID(e)
    handleChangeKebutuhan(e.target.value, 'atmID')
  }

  const handleMesinBaru = (e) => {
    console.log(e)
    setValueMesinBaru(e)
    handleChangeKebutuhan(e.target.value, 'mesinBaru')
  }

  const onChangeSelectSearch = (e) => {
    const value = e.target.value;
    setSelectedSearch(value);
  };

  const onChangeSelectPremises = (e) => {
    const value = e.target.value;
    setSelectedPremises(value);
  };

  function handleAttatchment(event, type) {
    event.preventDefault()
    switch(type){
        case 'attachment1':
            setAttachment1(event.target.files[0])
            break
        case 'attachment2':
            setAttachment2(event.target.files[0])
            break
        case 'attachment3':
            setAttachment3(event.target.files[0])
            break
    }
  }

  return (
    <div>
        <Paper className={classes.rootPaper}>
            <Grid container direction='column' style={{paddingBottom: '15px'}}>

                <Grid item>
                    <Grid container direction='row' style={{padding: '15px 5px 15px 15px'}}>
                        <Grid item style={{ padding: '0px 17px' }}>
                            <ExchangeIcon />
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontWeight: 600, color: '#DC241F' }}>Parameter</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{paddingLeft: '15px', marginBottom: '20px', width: '96%'}}>
                    <Select className={'CommonSelect__select--bordered #BCC8E7'} 
                      style={{width: '96%'}}
                      onChange={handleChange}
                      placeholder='Task Title'
                      defaultValue={valueCategory}
                      suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
                      >
                        {dataTaskParameter.map((data) => (
                          <Option key={data.id} value={data.value} >{data.value}</Option>
                        ))}
                    </Select>
                    { errorForm.category ? <ErrorComponent label="Select one!" /> : null }
                </Grid>

                <Grid item style={{paddingLeft: '15px', paddingTop: '15px', marginBottom: '20px', width: '96%'}}>
                    <InputBordered
                        multiline
                        rows={6}
                        style={{width: '96%'}}
                        onChange={handleChangeLongText}
                        placeholder='Notes & Description'
                        defaultValue={valueLongText}
                    />
                    { errorForm.description ? <ErrorComponent label="Required!" /> : null }
                </Grid>

                <Grid item style={{paddingLeft: '20px', width: '100%'}}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Grid container direction='row'>
                                <Grid item style={{width: '100%'}}>
                                    <Grid container direction='column'>
                                        <Grid item>
                                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due Date</Typography>
                                        </Grid>
                                        <Grid item style={{paddingTop: '5px'}}>
                                            <Paper component="form" className={classes.rootPaperSecond} style={{width: '85%'}}>
                                                <div className={classes.iconButton}>
                                                    <CalendarIcon style={{height: 20, marginLeft: 5}}/>
                                                </div>
                                                <DatePicker 
                                                    suffixIcon 
                                                    onChange={handleChangeDate} 
                                                    defaultValue={valueDate}
                                                    style={{borderRadius: 5, width: '96%', height: '30px', border: '1px solid #fff'}} 
                                                    placeholder='Pilih Tgl Kirim / Tarik'
                                                />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            { errorForm.date ? <ErrorComponent label="Required!" /> : null }
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '5px', width: '100%'}}>
                                <Paper component="form" className={classes.rootPaperSecond} style={{width: '100%'}}>
                                    <div className={classes.iconButton}>
                                        <UserIcon style={{height: 20, marginLeft: 5}}/>
                                    </div>
                                    <Select className={'CommonSelect__select'} 
                                        style={{width: '96%'}}
                                        onChange={handleChangeVendor}
                                        placeholder='Pilih PIC / Vendor'
                                        suffixIcon={<AngleDownIcon/>}
                                        defaultValue={valueVendor}
                                    >
                                        {dataVendor.map((data) => (
                                        <Option key={data.id} value={data.value} >{data.value}</Option>
                                        ))}
                                    </Select>
                                </Paper>
                                { errorForm.picVendor ? <ErrorComponent label="Select one!" /> : null }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{paddingLeft: '20px', marginTop: '20px', width: '100%'}}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Request Type</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '5px', width: '100%'}}>
                                    <Select className={'CommonSelect__select--bordered #BCC8E7'} 
                                        style={{width: '85%'}}
                                        onChange={handleRequestType}
                                        placeholder='Choose Request Type'
                                        suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
                                        defaultValue={valueRequestType}
                                    >
                                        {dataRequest.map((data) => (
                                            <Option key={data.id} value={data.value} >{data.value}</Option>
                                        ))}
                                     </Select>
                                    { errorForm.requestType ? <ErrorComponent label="Select one!" /> : null }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Premises</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '5px', width: '100%'}}>
                                    <div style={{display: "flex"}}>
                                        <FormControl className={classes.select} style={{minWidth: `${(6*selectedSearch.length) + 70}px`}}>
                                            <SelectBootstrap
                                            value={selectedSearch}
                                            onChange={onChangeSelectSearch}
                                            input={<BootstrapInputLeft />}
                                            IconComponent={AngleDownIcon}
                                            >
                                            <MenuItem value="off">OFF</MenuItem>
                                            {itemSearchPremises.map((data) => {
                                                return (
                                                <MenuItem value={data.value}>
                                                 {/* onClick={() => setIsFilterActive(true)}> */}
                                                    {data.text}
                                                </MenuItem>
                                                );
                                            })}
                                            </SelectBootstrap>
                                        </FormControl>
                                        <FormControl className={classes.select} style={{width: "100%"}}>
                                            <SelectBootstrap
                                            style={selectedSearch == "off" ? {color:"#BCC8E7"} : {color:"black"}}
                                            value={selectedPremises}
                                            onChange={onChangeSelectPremises}
                                            input={<BootstrapInputRight />}
                                            IconComponent={selectedSearch == "off" ? AngleDownIconBrown : AngleDownIcon}
                                            disabled={selectedSearch == "off" ? true : false}
                                            >
                                            <MenuItem value="konvensional">Konvensional</MenuItem>
                                            {itemPremises.map((data) => {
                                                return (
                                                <MenuItem value={data.value} >
                                                {/* onClick={() => setIsFilterActive(true)}> */}
                                                    {data.text}
                                                </MenuItem>
                                                );
                                            })}
                                            </SelectBootstrap>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{paddingLeft: '20px', marginTop: '20px', width: '100%'}}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>ATM ID Baru</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '85%', height: '24px'}}
                                        onChange={handleATMID}
                                        placeholder='Input ATM Baru'
                                        defaultValue={valueATMID}
                                     />
                                </Grid>
                                <Grid item style={{marginTop:'8px'}}>
                                    { errorForm.atmID ? <ErrorComponent label="Required!" /> : null }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Mesin Baru</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '100%', height: '24px'}}
                                        onChange={handleMesinBaru}
                                        placeholder='Input Mesin Baru'
                                        defaultValue={valueMesinBaru}
                                     />
                                </Grid>
                                <Grid item style={{marginTop:'8px'}}>
                                    { errorForm.mesinBaru ? <ErrorComponent label="Required!" /> : null }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{paddingLeft: '20px', marginTop: '25px', width: '96%'}}>
                      <Grid container direction='column'>
                          <Grid item>
                                <input
                                      id="attachment1"
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e)=> handleAttatchment(e, 'attachment1')}
                                      ref={fileInput5}
                                      className={classes.input}
                                />
                                    <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment1'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment1'><Typography className={classes.attachment}>{attachment1 && attachment1.name ? attachment1.name : 'Attachment 1'}</Typography></label></Grid>
                                    </Grid>
                          </Grid>
                          <Grid item>
                                <input
                                      id="attachment2"
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e)=> handleAttatchment(e, 'attachment2')}
                                      ref={fileInput6}
                                      className={classes.input}
                                />
                                    <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment2'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment2'><Typography className={classes.attachment}>{attachment2 && attachment2.name ? attachment2.name : 'Attachment 2'}</Typography></label></Grid>
                                    </Grid>
                          </Grid>
                          <Grid item>
                                <input
                                      id="attachment3"
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e)=> handleAttatchment(e, 'attachment3')}
                                      ref={fileInput7}
                                      className={classes.input}
                                />
                                    <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment3'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment3'><Typography className={classes.attachment}>{attachment3 && attachment3.name ? attachment3.name : 'Attachment 3'}</Typography></label></Grid>
                                    </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
            </Grid>
        </Paper>
    </div>
  );
}

LeftComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
};
LeftComponent.defaultProps = {
  isLoadData: false,
};
function mapStateToProps() {
  return {};
};

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(LeftComponent))
);