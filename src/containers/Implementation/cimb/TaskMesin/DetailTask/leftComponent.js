import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ReactComponent as ExchangeIcon }from '../../../../../assets/icons/siab/gear-grinding.svg'
import { Select } from 'antd';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from '../../common/InputComponent';
import { ReactComponent as PaperClipIcon } from '../../../../../assets/icons/linear-red/paperclip.svg';
import ImageNotFound from "../../../../../assets/images/image.png";
import moment from 'moment';
import getMinioFile from '../../../../../helpers/getMinioFile';
import { dataCard } from "../../../../../helpers/constants";
import ValueDetailTask from '../../../../../components/ValueDetailTask';

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

const dataTaskMesin = [
    {id: 0, value: 'Kirim Mesin', nameId: 'Kirim Mesin', nameEn: 'Kirim Mesin'},
    {id: 1, value: 'Tarik Mesin', nameId: 'Tarik Mesin', nameEn: 'Tarik Mesin'},
    {id: 2, value: 'No Aset Gudang', nameId: 'No Aset Gudang', nameEn: 'No Aset Gudang'},
    {id: 3, value: 'Not Request (-)', nameId: 'Not Request (-)', nameEn: 'Not Request (-)'},
]
function LeftComponent(props) {
  const classes = useStyles();
  const { data, isLoadData, errorForm, onChange } = props;
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");

  const [photoDepan, setPhotoDepan] = React.useState(null)
  const [photoKanan, setPhotoKanan] = React.useState(null)
  const [photoKiri, setPhotoKiri] = React.useState(null)
  const [photoBelakang, setPhotoBelakang] = React.useState(null)
  const [attachment1, setAttachment1] = useState(null)
  const [attachment2, setAttachment2] = useState(null)
  const [attachment3, setAttachment3] = useState(null)

  const handleChangeKebutuhan = (dataKebutuhan, keyData) => {
    var items = {
      ...data,
      [keyData]: dataKebutuhan,
    }
    onChange(items)
  }

  const handleChange = (e) => {
  // console.log(e)
    handleChangeKebutuhan(e, 'category')
  }

  var Minio = require("minio"),
    prepareData = [],
    prepareData2 = [],
    prepareData3 = [],
    prepareData4 = [],
    minioClient = new Minio.Client({
      endPoint: `${process.env.REACT_APP_MINIO_URL}`,
      useSSL: true,
      accessKey: `${process.env.REACT_APP_MINIO_ACCESS_KEY}`,
      secretKey:
        process.env.REACT_APP_MINIO_SECRET_KEY === "IstuatATM"
          ? "IstuatATM$14b"
          : process.env.REACT_APP_MINIO_SECRET_KEY,
    })

    React.useEffect(() => {
      if(data.photoDepan !== null){
        minioClient.presignedUrl(
          "GET",
          "project",
          data.photoDepan,
          24 * 60 * 60,
          function (err, presignedUrl) {
            if (err) return console.log(err)
            prepareData.push(presignedUrl)
            setPhotoDepan(prepareData)
        })
      }
    }, [data.photoDepan])
  
    React.useEffect(() => {
      if(data.photoKanan !== null){
        minioClient.presignedUrl(
          "GET",
          "project",
          data.photoKanan,
          24 * 60 * 60,
          function (err, presignedUrl) {
            if (err) return console.log(err)
            prepareData2.push(presignedUrl)
            setPhotoKanan(prepareData2)
        })
      }
    }, [data.photoKanan])
  
    React.useEffect(() => {
      if(data.photoKiri !== null){
        minioClient.presignedUrl(
          "GET",
          "project",
          data.photoKiri,
          24 * 60 * 60,
          function (err, presignedUrl) {
            if (err) return console.log(err)
            prepareData3.push(presignedUrl)
            setPhotoKiri(prepareData3)
        })
      }
    }, [data.photoKiri])
  
    React.useEffect(() => {
      if(data.photoBelakang !== null){
        minioClient.presignedUrl(
          "GET",
          "project",
          data.photoBelakang,
          24 * 60 * 60,
          function (err, presignedUrl) {
            if (err) return console.log(err)
            prepareData4.push(presignedUrl)
            setPhotoBelakang(prepareData4)
        })
      }
    }, [data.photoBelakang])

  function limitString(string, count) {
    try {
      const result = string.slice(0, count) + (string.length > count ? "..." : "")
      return result
    } catch (e) {
      console.log("Limit String: ", e)
    }
  }

  React.useEffect(()=>{
    try{
        data.vendorAttachments.forEach((val,i) => {
          getMinioFile(val.path).then(result=>{
            // console.log(">>>> try getMinio Offering ",JSON.stringify(result))
            if(i===0) setAttachment1(result)
            else if(i===1) setAttachment2(result)
            else setAttachment3(result)
        });
      })
    }catch(err){
      console.log(">>>> Error try getMinio", err)
    }
  },[data.vendorAttachments])

  const RenderOfferingFile1 = () => {
    return (
      <Link
        href={attachment1 === null ? "#" : attachment1.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#8D98B4",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment1 === null ? "N/A" : limitString(attachment1.fileName, 25)}
      </Link>
    );
  };

  const RenderOfferingFile2 = () => {
    return (
      <Link
        href={attachment2 === null ? "#" : attachment2.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#8D98B4",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment2 === null ? "N/A" : limitString(attachment2.fileName, 25)}
      </Link>
    );
  };

  const RenderOfferingFile3 = () => {
    return (
      <Link
        href={attachment3 === null ? "#" : attachment3.fileUrl}
        target="_blank"
        style={{
          textDecoration: "none",
          fontSize: 15,
          color: "#8D98B4",
          fontWeight: 500,
        }}
        disabled
      >
        {attachment3 === null ? "N/A" : limitString(attachment3.fileName, 25)}
      </Link>
    );
  };

  return (
    <div>
        <Paper className={classes.rootPaper}>
            <Grid container direction='column' style={{paddingBottom: '15px'}}>

                <Grid item>
                    <Grid container direction='row' style={{padding: '15px 5px 15px 15px'}}>
                        <Grid item style={{ padding: '2px 7px' }}>
                            <ExchangeIcon />
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontWeight: 600, color: '#DC241F' }}>
                              {openingType !=="Termin" ? "Mesin":"Cabut Mesin"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{paddingLeft: '20px', marginBottom: '20px', width: '96%'}} className={classes.selectKonven}>
                    <Select 
                      style={{width: '96%'}}
                      onChange={handleChange}
                      placeholder='Task Title'
                      value={data.category}
                      disabled
                      >
                        {dataTaskMesin.map((data) => (
                          <Option key={data.id} value={data.value} >{data.value}</Option>
                        ))}
                    </Select>
                </Grid>

                <Grid item style={{paddingLeft: '15px', paddingTop: '15px', marginBottom: '20px', width: '96%'}}>
                    <InputBordered
                        multiline
                        rows={6}
                        style={{width: '96%'}}
                        value={data.description}
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
                                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tgl Kirim / Tarik</Typography>
                                        </Grid>
                                        <Grid item style={{marginTop: '13px'}}>
                                            <InputBordered
                                                style={{width: '85%', height: '24px'}}
                                                value={moment(data.date).format('DD/MM/YYYY')}
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
                                                    value={data.picVendor}
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
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Jenis Mesin</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '85%', height: '24px'}}
                                        value={data.jenisMesin}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Merek Mesin</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '100%', height: '24px'}}
                                        value={data.merekMesin}
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
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tipe Mesin</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '85%', height: '24px'}}
                                        value={data.tipeMesin}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>SN Mesin</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '100%', height: '24px'}}
                                        value={data.snMesin}
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
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Jumlah Kaset</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '85%', height: '24px', cursor: 'not-allowed'}}
                                        value={data.jumlahKaset}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Jumlah Reject</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '100%', height: '24px'}}
                                        value={data.jumlahReject}
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
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Kondisi Sticker</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '85%', height: '24px', cursor: 'not-allowed'}}
                                        value={data.kondisiSticker}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Sticker ID</Typography>
                                </Grid>
                                <Grid item style={{marginTop: '13px'}}>
                                    <InputBordered
                                        style={{width: '100%', height: '24px'}}
                                        value={data.stickerId}
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
                                <Typography style={{fontWeight: 500, color: '#8D98B4'}}>ID Baru</Typography>
                            </Grid>
                            <Grid item style={{marginTop: '13px'}}>
                                <InputBordered
                                    style={{width: '86%', height: '24px', cursor: 'not-allowed'}}
                                    value={data.newAtmId}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                </Grid>

                <Grid item  xs={6} style={{paddingLeft: '20px', marginTop: '20px', width: '100%'}}>
                    <ValueDetailTask
                        label="BAST Digital" 
                        value={data.bastId} 
                        bastSubmitStatus={data.bastSubmitStatus}
                        txtValue='BAST Digital - Mesin' 
                        href={dataCard.find(val=>val.type=='mesin').url+'/bast-digital-preview/'+data.bastId}
                        bast 
                    />
                </Grid>

                <Grid item style={{ paddingLeft: '20px', marginTop: '20px', width: '96%' }}>
                      <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Photo</Typography>
                      <Grid container direction='row' spacing={4} style={{marginTop: '5px'}}> 
                          <Grid item>
                              <Box className={classes.imageUploadContainer}>
                                  <label
                                      htmlFor="depan"
                                      className={classes.imgDefault} style={{ cursor: 'not-allowed' }}
                                  >
                                      <Grid container direction='column' alignItems="center">
                                        {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
                                        <img src={photoDepan ? photoDepan : ImageNotFound} style={{ width: '135px', height: '135px' }} />
                                        <Typography>Depan</Typography>
                                      </Grid>
                                  </label>
                              </Box>
                          </Grid>
                          <Grid item>
                              <Box className={classes.imageUploadContainer}>
                                  <label
                                      htmlFor="kanan"
                                      className={classes.imgDefault} style={{ cursor: 'not-allowed' }}
                                  >
                                      <Grid container direction='column' alignItems="center">
                                        {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
                                        <img src={photoKanan ? photoKanan : ImageNotFound} style={{ width: '135px', height: '135px' }} />
                                        <Typography>Kanan</Typography>
                                      </Grid>
                                  </label>
                              </Box>
                          </Grid>
                          <Grid item>
                              <Box className={classes.imageUploadContainer}>
                                  <label
                                      htmlFor="kiri"
                                      className={classes.imgDefault} style={{ cursor: 'not-allowed' }}
                                  >
                                      <Grid container direction='column' alignItems="center">
                                        {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
                                        <img src={photoKiri ? photoKiri : ImageNotFound} style={{ width: '135px', height: '135px' }} />
                                        <Typography>Kiri</Typography>
                                      </Grid>
                                  </label>
                              </Box>
                          </Grid>
                          <Grid item>
                              <Box className={classes.imageUploadContainer}>
                                  <label
                                      htmlFor="belakang"
                                      className={classes.imgDefault} style={{ cursor: 'not-allowed' }}
                                  >
                                      <Grid container direction='column' alignItems="center">
                                        {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
                                        <img src={photoBelakang ? photoBelakang : ImageNotFound} style={{ width: '135px', height: '135px' }} />
                                        <Typography>Belakang</Typography>
                                      </Grid>
                                  </label>
                              </Box>
                          </Grid>
                      </Grid>
                  </Grid>

                  <Grid item style={{paddingLeft: '20px', marginTop: '25px', width: '96%'}}>
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
                                    {/* <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment1'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment1'><Typography className={classes.attachment}>{attachment1 && attachment1.name ? attachment1.name : 'Attachment 1'}</Typography></label></Grid>
                                    </Grid> */}
                                    <Grid container direction='row'>
                                          <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                                          <Grid item><RenderOfferingFile1 filePath={'atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf'} type='attachment1'/></Grid>
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
                                    {/* <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment2'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment2'><Typography className={classes.attachment}>{attachment2 && attachment2.name ? attachment2.name : 'Attachment 2'}</Typography></label></Grid>
                                    </Grid> */}
                                    <Grid container direction='row'>
                                          <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                                          <Grid item><RenderOfferingFile2 filePath={'atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf'} type='attachment2'/></Grid>
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
                                    {/* <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment3'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment3'><Typography className={classes.attachment}>{attachment3 && attachment3.name ? attachment3.name : 'Attachment 3'}</Typography></label></Grid>
                                    </Grid> */}
                                    <Grid container direction='row'>
                                          <Grid item><PaperClipIcon className={classes.paperClip} style={{ cursor: 'not-allowed' }}/></Grid>
                                          <Grid item><RenderOfferingFile3 filePath={'atm_business/private/Surat Negosiasi/210816104924762/Surat Negosiasi.pdf'} type='attachment3'/></Grid>
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