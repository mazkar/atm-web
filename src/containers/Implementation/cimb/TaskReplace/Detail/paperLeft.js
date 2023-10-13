import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import moment from 'moment';
import { ReactComponent as ExchangeIcon }from '../../../../../assets/icons/siab/list-ul.svg';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from '../../common/InputComponent';
import { ReactComponent as PaperClipIcon } from '../../../../../assets/icons/linear-red/paperclip.svg';
import { ReactComponent as DefUploadImageSvg } from "../../../../../assets/icons/general/def_upload.svg";
import ATM1 from "../../../../../assets/images/atm-1.png";
import ATM2 from "../../../../../assets/images/atm-2.png";
import ATM3 from "../../../../../assets/images/atm-3.png";
import ATM4 from "../../../../../assets/images/atmcimb.png";
import getMinioFile from '../../../../../helpers/getMinioFile';

const { Option } = Select;

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    height: "100%",
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
    cursor: 'not-allowed', 
    color: '#8D98B4'
  },
  paperClip: { 
    width: 20, 
    height: 20, 
    paddingTop: 4, 
    marginRight: 5, 
    cursor: 'not-allowed' 
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
    "& .ant-select.ant-select-single .ant-select-selector": {
      paddingTop: '5px',
      height: '41px',
      border: '1px solid #F4F7FB',
      backgroundColor: "#FFFF",
      color: "#2B2F3C",
      borderRadius: 6
    }
  },
});

const dataTaskParameter = [
  {id: 0, value: 'New', nameId: 'New', nameEn: 'New'},
  {id: 1, value: 'Existing', nameId: 'existing', nameEn: 'Existing'},
  {id: 2, value: 'Not Request (-)', nameId: 'notRequest', nameEn: 'Not Request (-)'},
];

const dataVendor = [
  {id: 0, value: 'PT. Citra', nameId: 'PT. Citra', nameEn: 'PT. Citra'},
  {id: 1, value: 'PT. Wahana', nameId: 'PT. Wahana', nameEn: 'PT. Wahana'},
  {id: 2, value: 'PT. Neopack', nameId: 'PT. Neopack', nameEn: 'PT. Neopack'},
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, isLoadData, errorForm, onChange } = props;

  const [value, setValue] = useState('New');
  const [valueLongText, setValueLongText] = useState('Butuh pengiriman Email DIstribusi kepada pihak yang terkait');
  const [valueVendor, setValueVendor] = useState('PT. Royal');
  const [valueTipeMesin, setValueTipeMesin] = useState('ATM');
  const [valueRequestType, setValueRequestType] = useState('Urgent');
  const [valueDate, setValueDate] = useState('12/11/2020');
  const [valueDenom, setValueDenom] = useState('100');
  const [valueGFMS, setValueGFMS] = useState('1231231');
  const [valueATMID, setValueATMID] = useState('21313');
  const [valueMesinBaru, setValueMesinBaru] = useState('ATM');
  const [valueStickerCondition, setValueStickerCondition] = useState('Baik');
  const [valueNoRFC, ssetValueNoRFC] = useState('12/11/2020');
  const [valueRFCSelesai, setValueRFCSelesai] = useState('23123');
  const [valuePSF, setValuePSF] = useState('12232');
  const [attachment1, setAttachment1] = useState(null);
  const [attachment2, setAttachment2] = useState(null);
  const [attachment3, setAttachment3] = useState(null);
  const [attachment4, setAttachment4] = useState(null);
  const [attachment5, setAttachment5] = useState(null);
  const [attachment6, setAttachment6] = useState(null);
  //   const [attachment1, setAttachment1] = useState({
  //     name: 'Surat Penawaran.pdf'
  //   })
  //   const [attachment2, setAttachment2] = useState({
  //     name: 'Attachment 2.pdf'
  //   })
  //   const [attachment3, setAttachment3] = useState({
  //     name: 'Attachment 3.pdf'
  //   })

  React.useEffect(() => {
    try {
      getMinioFile(
        "atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf"
      ).then((result) => {
        // console.log(">>>> try getMinio Offering ",JSON.stringify(result))
        setAttachment1(result);
        setAttachment2(result);
        setAttachment3(result);
        setAttachment4(result);
        setAttachment5(result);
        setAttachment6(result);

      });
    } catch (err) {
      console.log(">>>> Error try getMinio", err);
    }
  }, []);
  React.useEffect(() => {
    console.log("+++ data", data);
  }, [data]);
  function limitString(string, count) {
    try {
      const result = string.slice(0, count) + (string.length > count ? "..." : "");
      return result;
    } catch (e) {
      console.log("Limit String: ", e);
    }
  }

  const RenderCimbFile1 = () => {
    return (
      <Link
        href={attachment1 === null ? "#" : attachment1.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#DC241F",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment1 === null ? "N/A" : limitString(attachment1.fileName, 25)}
      </Link>
    );
  };

  const RenderCimbFile2 = () => {
    return (
      <Link
        href={attachment2 === null ? "#" : attachment2.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#DC241F",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment2 === null ? "N/A" : limitString(attachment2.fileName, 25)}
      </Link>
    );
  };

  const RenderCimbFile3 = () => {
    return (
      <Link
        href={attachment3 === null ? "#" : attachment3.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#DC241F",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment3 === null ? "N/A" : limitString(attachment3.fileName, 25)}
      </Link>
    );
  };

  const RenderVendorFile1 = () => {
    return (
      <Link
        href={attachment4 === null ? "#" : attachment4.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#DC241F",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment4 === null ? "N/A" : limitString(attachment4.fileName, 25)}
      </Link>
    );
  };

  const RenderVendorFile2 = () => {
    return (
      <Link
        href={attachment5 === null ? "#" : attachment5.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#DC241F",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment5 === null ? "N/A" : limitString(attachment5.fileName, 25)}
      </Link>
    );
  };

  const RenderVendorFile3 = () => {
    return (
      <Link
        href={attachment6 === null ? "#" : attachment6.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#DC241F",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment6 === null ? "N/A" : limitString(attachment6.fileName, 25)}
      </Link>
    );
  };

  const handleChangeKebutuhan = (dataKebutuhan, keyData) => {
    const items = {
      ...data,
      [keyData]: dataKebutuhan,
    };
    onChange(items);
  };

  const handleChange = (e) => {
    console.log(e);
    setValue(e);
    handleChangeKebutuhan(e, 'category');
  };

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

          <Grid item style={{paddingLeft: '20px', marginBottom: '20px', width: '96%'}} className={classes.selectKonven}>
            <Select 
              style={{width: '96%'}}
              onChange={handleChange}
              placeholder='Task Title'
              defaultValue={data.category}
              disabled
            >
              {dataTaskParameter.map((data) => (
                <Option key={data.id} value={data.value} >{data.value}</Option>
              ))}
            </Select>
          </Grid>

          <Grid item style={{paddingLeft: '15px', paddingTop: '15px', marginBottom: '20px', width: '96%'}}>
            <InputBordered
              multiline
              rows={6}
              style={{width: '96%'}}
              defaultValue={data.description}
              disabled
            />
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
                      <Grid item style={{marginTop: '13px'}}>
                        <InputBordered
                          style={{width: '85%', height: '24px'}}
                          defaultValue={moment(data.dueDate).format('DD/MM/YYYY')}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '100%', height: '24px'}}
                      defaultValue={data.picVendor}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginTop: '20px', width: '100%'}} className={classes.selectKonven}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tipe Mesin</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '85%', height: '24px'}}
                      defaultValue={data.tipeMesin}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Request Type</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '100%', height: '24px'}}
                      defaultValue={data.requestType}
                      disabled
                    />
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
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Denom</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '85%', height: '24px'}}
                      defaultValue={data.denom}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Kode GFMS</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '100%', height: '24px'}}
                      defaultValue={data.codeGfms}
                      disabled
                    />
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
                      style={{width: '85%', height: '24px', cursor: 'not-allowed'}}
                      defaultValue={data.newAtmId}
                      disabled
                    />
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
                      defaultValue={data.newMachineType}
                      disabled
                    />
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
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Premises</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '85%', height: '24px', cursor: 'not-allowed'}}
                      defaultValue={data.locationMode}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>No RFC</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '100%', height: '24px'}}
                      defaultValue={data.noRfc}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{paddingLeft: '20px', marginTop: '20px', width: '100%'}}>
            <Grid container direction="row">
              <Grid item  xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tgl RFC Selesai</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '86%', height: '24px', cursor: 'not-allowed'}}
                      defaultValue={moment(data.tglRfcSelesai).format('DD/MM/YYYY')}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>No PSF</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '13px'}}>
                    <InputBordered
                      style={{width: '100%', height: '24px'}}
                      defaultValue={data.noPsf}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item  xs={6} style={{paddingLeft: '20px', marginTop: '20px', width: '100%'}}>
            <Grid container direction='column'>
              <Grid item>
                <Typography style={{fontWeight: 500, color: '#8D98B4'}}>BAST  Digital</Typography>
              </Grid>
              <Grid item style={{marginTop: '5px'}}>
                <Typography style={{fontWeight: 500, color: '#2B2F3C'}}>{data.bastId}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginTop: '25px', width: '100%'}}>
            <Grid container direction="row">
              <Grid item  xs={6}>
                <Typography style={{fontWeight: 600, color: '#2B2F3C'}}>Cimb Attachment</Typography>
                <Grid container direction='column' style={{marginTop:'10px'}}>
                  <Grid item>
                    {/* <input
                                        id="attachment1"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e)=> handleAttatchment(e, 'attachment1')}
                                        ref={fileInput5}
                                        className={classes.input}
                                    /> */}
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                      <Grid item><RenderCimbFile1 filePath="atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf" type='attachment1'/></Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* <input
                                        id="attachment2"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e)=> handleAttatchment(e, 'attachment2')}
                                        ref={fileInput6}
                                        className={classes.input}
                                    /> */}
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                      <Grid item><RenderCimbFile2 filePath="atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf" type='attachment2'/></Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* <input
                                        id="attachment3"
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e)=> handleAttatchment(e, 'attachment3')}
                                        ref={fileInput7}
                                        className={classes.input}
                                    /> */}
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                      <Grid item><RenderCimbFile3 filePath="atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf" type='attachment3'/></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Typography style={{fontWeight: 600, color: '#2B2F3C'}}>Vendor Attachment</Typography>
                <Grid container direction='column' style={{marginTop:'10px'}}>
                  <Grid item>
                    {/* <input
                                            id="attachment1"
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e)=> handleAttatchment(e, 'attachment1')}
                                            ref={fileInput5}
                                            className={classes.input}
                                        /> */}
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                      <Grid item><RenderVendorFile1 filePath="atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf" type='attachment1'/></Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* <input
                                            id="attachment2"
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e)=> handleAttatchment(e, 'attachment2')}
                                            ref={fileInput6}
                                            className={classes.input}
                                        /> */}
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                      <Grid item><RenderVendorFile2 filePath="atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf" type='attachment2'/></Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {/* <input
                                            id="attachment3"
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e)=> handleAttatchment(e, 'attachment3')}
                                            ref={fileInput7}
                                            className={classes.input}
                                        /> */}
                    <Grid container direction='row'>
                      <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                      <Grid item><RenderVendorFile3 filePath="atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf" type='attachment3'/></Grid>
                    </Grid>
                  </Grid>
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