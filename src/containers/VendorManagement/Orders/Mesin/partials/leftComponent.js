/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react';
import { withRouter, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, Button, Link, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';
import InputBordered from '../../common/InputComponent';
import { ReactComponent as PaperClipIcon } from '../../../../../assets/icons/linear-red/paperclip.svg';
import SelectWithIcon from '../../../../../components/Selects/SelectWithIcon';
import { ReactComponent as TodoIcon } from '../../../../../assets/icons/siab/time-circle.svg';
import { ReactComponent as DoingIcon } from '../../../../../assets/icons/siab/refresh-blue.svg';
import { ReactComponent as DoneIcon } from '../../../../../assets/icons/duotone-others/check-green.svg';
import { ReactComponent as StripIcon } from '../../../../../assets/icons/siab/strip-circle.svg';
import constants from '../../../../../helpers/constants';
import { TextRupiah } from '../../common/FormattedNumber';
import MinioDocComponent from '../../../../../components/MinioDocComponent';
import AttachFileSelector from '../../../../../components/AttachFileSelector';
import ModalLoader from '../../../../../components/ModalLoader';
import { doUploadDocument } from '../../../../Implementation/ApiServiceImplementation';
import SuccessPopUp from '../../common/PopUp/successPopUp';
import constansts from '../../../../../helpers/constants';
// eslint-disable-next-line import/no-cycle
import { RootContext } from '../../../../../router';
import useTimestampConverter from '../../../../../helpers/useTimestampConverter';
import ErrorComponent from '../../../../../components/ErrorComponent';
import MinioImageComponent from '../../../../../components/MinioImageComponent';
import NoImage from "../../../../../assets/images/image.png";

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    height: '100%',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  imageUploadContainer: {
    position: 'relative',
  },
  imgDefault: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  attachment: {
    fontWeight: 500,
    fontFamily: 'Barlow',
    cursor: 'not-allowed',
    color: '#8D98B4',
  },
  attachmentEnabled: {
    fontWeight: 500,
    fontFamily: 'Barlow',
    cursor: 'pointer',
    color: '#DC241F',
  },
  paperClip: {
    width: 20,
    height: 20,
    paddingTop: 4,
    marginRight: 5,
    cursor: 'not-allowed',
  },
  paperClipEnabled: {
    width: 20,
    height: 20,
    paddingTop: 4,
    marginRight: 5,
    cursor: 'pointer',
  },
  select: {
    minWidth: 120,
    '& .MuiSelect-icon': {
      top: 'unset',
      right: 5,
    },
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '10px 32px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '10px 32px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  imgContainer: {
    borderRadius: 10,
    width: 80,
    height: 85,
  },
  deleteFile: {
    marginLeft: 10,
    color: "#DC241F",
  },
});

const dataSelectStatus = [
  { id: 0, value: 'TODO', nameId: 'TODO', nameEn: 'TODO', icon: <TodoIcon /> },
  { id: 1, value: 'DOING', nameId: 'DOING', nameEn: 'DOING', icon: <DoingIcon /> },
  { id: 2, value: 'DONE', nameId: 'DONE', nameEn: 'DONE', icon: <DoneIcon /> },
  { id: 3, value: 'STRIP', nameId: 'STRIP', nameEn: 'STRIP', icon: <StripIcon /> },
];

function Status(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: 'center',
          border: '1px solid',
          borderColor: props.borderColor,
          background: props.fillColor,
          color: props.textColor,
          borderRadius: 20,
          width: 'max-content',
          paddingLeft: 10,
          paddingRight: 10,
          // margin: "auto",
        }}
      >
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

function LeftComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { content, onChange } = props;
  const { status } = content;

  const { userRoleName } = useContext(RootContext);
  const isUserVendor = userRoleName.toLowerCase().includes("vendor");

  const coord = content.latitudeLongitude?.split(',') || [null, null];
  const [valueStatus, setValueStatus] = useState('DOING');
  const [invoice, setInvoice] = useState(null);
  const [isOpenModalLoader, setIsOpenModalLoader] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const [attachment1, setAttachment1] = useState('');
  const [attachment2, setAttachment2] = useState('');
  const [attachment3, setAttachment3] = useState('');

  const [attachmentResVendors, setAttachmentResVendors] = useState([]);
  const [attachmentLists, setAttachmentLists] = useState([]);

  useEffect(() => {
    setAttachmentResVendors(content?.vendorAttachment || []);
  }, [content]);

  useEffect(() => {
    console.log("+++ attachmentLists", attachmentLists);
  }, [attachmentLists]);
  // ATTACHMENT

  useEffect(() => {
    if(attachment1 !== ''){
      const oldDataList = attachmentLists.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1
      };
      newDataList.push(newObj);
      setAttachmentLists(newDataList);
    }else{
      const oldDataList = attachmentLists.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment1'; 
      });
      setAttachmentLists(newDataList);
    }
  }, [attachment1]);

  useEffect(() => {
    if(attachment2 !== ''){
      const oldDataList = attachmentLists.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment2",
        file: attachment2
      };
      newDataList.push(newObj);
      setAttachmentLists(newDataList);
    }else{
      const oldDataList = attachmentLists.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment2'; 
      });
      setAttachmentLists(newDataList);
    }
  }, [attachment2]);

  useEffect(() => {
    if(attachment3 !== ''){
      const oldDataList = attachmentLists.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment3",
        file: attachment3
      };
      newDataList.push(newObj);
      setAttachmentLists(newDataList);
    }else{
      const oldDataList = attachmentLists.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment3'; 
      });
      setAttachmentLists(newDataList);
    }
  }, [attachment3]);

  const handleChangeMesin = (val, key) => {
    const items = {
      ...content,
      [key]: val,
    };
    onChange(items);
  };

  async function handleSave() {

    // HANDLING DOCUMENT ATTACHMENT
    const documentList = [];
    if (attachmentResVendors.length > 0) {
      attachmentResVendors.map((item) => {
        documentList.push({
          id: item.id,
          path: item.path,
          category: item.category,
          filename: item.filename,
        });
      });
    }
    const doUploadDocuments = async (arr) => {
      if (arr.length > 0) {
        setIsOpenModalLoader(true);
        await Promise.all(
          arr.map(async (item) => {
            await doUploadDocument(item.file)
              .then((res) => {
                console.log("data resfile", res);
                if (res.status === 200) {
                  if (res.data.responseCode === "00") {
                    documentList.push({
                      id: null,
                      path: res.data.path,
                      category: "vendor",
                      filename: res.data.filename,
                    });
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              })
              .catch((err) => {
                alert(`Failed to upload file ${err}`);
                setIsOpenModalLoader(false);
              });
          })
        );
      }
    };
    console.log("+++ attachmentLists", attachmentLists);
    await doUploadDocuments(attachmentLists);

    setIsOpenModalLoader(true);
    try {
      const resUpload = invoice ? await doUploadDocument(invoice) : {};
      const { path } = resUpload.data || {};
      console.log('~ resUpload', resUpload);
      const resSave = await axios.post(
        `${constansts.IMPLEMENTATION_SERVICE}/saveOrUpdateTaskKirimTarikMesinVendor`,
        // console.log(
        {
          invoiceNumber: content.invoiceNumber,
          invoiceFile: path || '',
          id: id * 1,
          status: dataSelectStatus.find((val) => val.value === valueStatus)?.id || 0,
          invoiceDate: content.invoiceDate ? +moment(content.invoiceDate, 'DD-MM-YYYY') : +moment(),
          documentList
        }
      );
      // console.log('~ resSave', resSave);
      setIsOpenSuccessModal(true);
      setIsOpenModalLoader(false);
    } catch (e) {
      console.log('~ e', e);
      setIsOpenModalLoader(false);
    }
  }

  function handleCloseSuccess() {
    setIsOpenSuccessModal(false);
    window.location.assign(`/vendor-orders`);
  }

  useEffect(() => {
    setValueStatus(dataSelectStatus.find((val) => val.id === status)?.value);
  }, [status]);

  function ImageGrid({ index, src }) {
    return (
      <Grid item xs={3}>
        <Box className={classes.imageUploadContainer}>
          <label htmlFor='depan' className={classes.imgDefault} style={{ cursor: 'not-allowed' }}>
            <Grid container direction='column' alignItems='center'>
              {/* <DefUploadImageSvg style={{ width: '135px', height: '135px' }}/> */}
              {/* <img src={src} style={{ width: '135px', height: '100px' }} /> */}

              {src ? (
                <div style={{ position: "relative" }}>
                  <MinioImageComponent
                    filePath={src}
                    className={classes.imgContainer}
                  />
                </div>
              ) : (
                <img
                  src={NoImage}
                  className={classes.imgContainer}
                  alt="img-sesudah1"
                />
              )}

              <Typography>Sesudah {index + 1}</Typography>
            </Grid>
          </label>
        </Box>
      </Grid>
    );
  }

  function AttachmentLink({ url, filename, isVendor }) {
    return (
      <div style={{ marginTop: 5 }}>
        <Grid container direction='row'>
          <Grid item>
            <label htmlFor='attachment1'>
              <PaperClipIcon className={isVendor ? classes.paperClipEnabled : classes.paperClip} />
            </label>
          </Grid>
          <Grid item>
            <label htmlFor='attachment1'>
              <Typography className={isVendor ? classes.attachmentEnabled : classes.attachment}>
                {filename}
              </Typography>
            </label>
          </Grid>
        </Grid>
      </div>
    );
  }

  const fieldInformasiCIMBLeft = [
    { label: 'No Ticket', value: content.ticketNumber },
    {
      label: 'Tgl Request',
      value: content.requestDate? useTimestampConverter(content.requestDate / 1000, "DD/MM/YYYY") : "",
    },
    { label: 'User Request', value: content.userRequester },
    { label: 'Tgl Kirim / Tarik', value: content.sendRevokeDate? useTimestampConverter(content.sendRevokeDate / 1000, "DD/MM/YYYY") : "" },
    { label: 'ID Mesin', value: content.idMesin },
    { label: 'Tipe Mesin', value: content.machineType },
    { label: 'ID Location', value: content.locationId },
    {
      label: 'Nama Lokasi',
      value: content.locationName,
    },
    { label: 'Alamat', value: content.locationAddress },
    {
      label: 'Area',
      value: content.locationArea,
    },
    { label: 'City', value: content.locationCity },
    {
      label: 'Lat-Long',
      value: (
        <div>
          Lat {coord[0]}
          <br />Long {coord[1]}
        </div>
      ),
    },
    {
      label: 'Nama Penandatangan LOO / MOU',
      value: content.signerLooMouName,
    },
    {
      label: 'Email Penandatangan LOO / MOU',
      value: content.signerLooMouEmail,
    },
    {
      label: 'No HP Penandatangan LOO / MOU',
      value: content.signerLooMouTelephoneNumber,
    },
  ];

  const fieldInformasiCIMBRight = [
    { label: 'PIC / Vendor', value: content.picVendor },
    {
      label: 'Jenis Pekerjaan',
      value: content.jobType,
    },
    { label: 'Jenis Mesin', value: content.machineTypeImplementation },
    { label: 'SN Mesin', value: content.machineSnImplementation },
    { label: 'Merek Mesin', value: content.machineBrand },
    { label: 'Biaya Jasa', value: <TextRupiah value={content.serviceFee} /> },
    { label: 'Biaya Barang', value: <TextRupiah value={content.goodsCost} /> },
    {
      label: 'Total Biaya',
      value: <TextRupiah value={content.totalCost} />,
    },
    { label: 'Total Biaya + PPN', value: <TextRupiah value={content.totalCostWithPpn} /> },
    {
      label: 'Status Approval',
      value: content.statusApproval,
      type: 'Approval',
    },
    { label: 'Tgl Approved', value: content.approvalDate? useTimestampConverter(content.approvalDate / 1000, "DD/MM/YYYY") : "" },
    {
      label: 'Tgl Pengerjaan',
      value: content.processingDate? useTimestampConverter(content.processingDate / 1000, "DD/MM/YYYY") : ""
    },
    {
      label: 'SLA Pengerjaan',
      value: `${content.slaWork  } Day(s)`,
      color: content.slaWork > 0 ? '#65D170' : '#FF6A6A',
      fontWeight: 400,
    },
    {
      label: 'Tgl Pembayaran',
      value: content.paymentDate? useTimestampConverter(content.paymentDate / 1000, "DD/MM/YYYY") : ""
    },
    {
      label: 'SLA Pembayaran',
      value: `${content.slaPayment  } Day(s)`,
      color: content.slaPayment > 0 ? '#65D170' : '#FF6A6A',
      fontWeight: 400,
    },
    {
      label: 'Status Paid',
      value: content.paidStatus,
      type: 'Paid',
    },
    {
      label: 'Notes & Desc',
      value: content.notesDescription,
    },
  ];

  const fieldInformasiVendorLeft = [
    {
      label: 'No Invoice',
      value: content.invoiceNumber,
      type: 'input',
      config: {
        onChange: (e) => handleChangeMesin(e.target.value, 'invoiceNumber'),
      },
    },
    {
      label: 'Upload Invoice',
      value: content.invoiceFile,
      isAttachment: true,
      config: {
        file: invoice,
        onChange: (e) => setInvoice(e.target.files[0]),
        onDelete: () => setInvoice(null),
      },
    },
    { label: 'Tgl Kirim Invoice', value: content.invoiceDate? useTimestampConverter(content.invoiceDate / 1000, "DD/MM/YYYY") : "" },
  ];

  const fieldInformasiVendorRight = [
    {
      label: 'BAST Digital',
      value: content.bastId,
      fontWeight: 600,
      type: 'bast',
      config: {
        bastSubmitStatus: content.bastSubmitStatus,
      },
    },
    {
      label: 'Tgl Selesai',
      value: content.completedDate? useTimestampConverter(content.completedDate / 1000, "DD/MM/YYYY") : ""
    },
  ];

  const fieldInformasiUmumLeft = [
    { label: 'ID Requester', value: content.requesterId },
    { label: 'Initial Cabang', value: content.branchCode },
    { label: 'Kode GFMS', value: content.gfmsCode },
    { label: 'Nama Req', value: content.requesterName },
    { label: 'Nama Branch', value: content.branchName },
    { label: 'No Telp Req', value: content.requesterTelephoneNumber },
    { label: 'Email Requester', value: content.requesterEmail },
    { label: 'Alamat Branch', value: content.branchAddress },
    { label: 'Nama PIC Loc', value: content.picLocName },
    { label: 'Telp PIC Loc', value: content.picLocTelephoneNumber },
    { label: 'Email PC Loc', value: content.picLocEmail },
    { label: 'Type Loc', value: content.locationType },
    { label: 'Ruang ATM', value: content.atmBoothType },
  ];

  const fieldInformasiUmumRight = [
    { label: 'Luas Area', value: content.atmBoothLarge },
    { label: 'Akses Umum', value: content.publicAccessibility },
    { label: 'Operasional', value: content.operational },
    { label: 'Jumlah ATM Lain', value: content.aroundAtmBank },
    { label: 'Denom', value: content.denom },
    { label: 'AC', value: content.acType },
    { label: 'Kebersihan', value: content.cleanType },
    { label: 'Komunikasi', value: content.commType },
    { label: 'Media Promosi', value: content.mediaPromotion },
    { label: 'Notes', value: content.notes },
  ];
  const images = [
    { src: content.photoFrontVendor },
    { src: content.photoRightVendor },
    { src: content.photoLeftVendor },
    { src: content.photoRearVendor },
  ];
  
  const cimbAttachment = [];

  const vendorAttachment = content?.vendorAttachment || [];

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Typography style={{ fontWeight: 500, color: '#8D98B4' }}>Informasi CIMB</Typography>
        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <Divider
            variant='fullWidth'
            style={{ width: '100%', height: '2px', backgroundColor: '#BCC8E7' }}
          />
        </div>

        {/* Informasi CIMB */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {fieldInformasiCIMBLeft.map((data) => {
                return <Field data={data} />;
              })}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {fieldInformasiCIMBRight.map((data) => {
                return <Field data={data} />;
              })}
            </Grid>
          </Grid>
        </Grid>

        {/* Informasi Vendor */}
        <div style={{ marginTop: 20 }}>
          <Typography style={{ fontWeight: 500, color: '#8D98B4' }}>Informasi Vendor</Typography>
        </div>

        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <Divider
            variant='fullWidth'
            style={{ width: '100%', height: '2px', backgroundColor: '#BCC8E7' }}
          />
        </div>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {fieldInformasiVendorLeft.map((data) => {
                return <Field data={data} />;
              })}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {fieldInformasiVendorRight.map((data) => {
                return <Field data={data} />;
              })}
            </Grid>
          </Grid>
        </Grid>

        {/* Informasi Umum */}
        <div style={{ marginTop: 20 }}>
          <Typography style={{ fontWeight: 500, color: '#8D98B4' }}>Informasi Umum</Typography>
        </div>

        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <Divider
            variant='fullWidth'
            style={{ width: '100%', height: '2px', backgroundColor: '#BCC8E7' }}
          />
        </div>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {fieldInformasiUmumLeft.map((data) => {
                return <Field data={data} />;
              })}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {fieldInformasiUmumRight.map((data) => {
                return <Field data={data} />;
              })}
            </Grid>
          </Grid>
        </Grid>

        <div style={{ marginTop: 20 }}>
          <Typography style={{ fontWeight: 500, color: '#8D98B4' }}>Status</Typography>
        </div>

        <div style={{ marginTop: 10 }}>
          <SelectWithIcon
            bordered
            value={valueStatus}
            suggestions={dataSelectStatus}
            width='50%'
            handleChange={(e) => setValueStatus(e)}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <Typography
            style={{
              fontWeight: 400,
              fontStyle: 'Italic',
              color: '#8D98B4',
              fontSize: '13px',
            }}
          >
            *Status berubah menjadi overdue ketika due date terlewati
          </Typography>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Typography style={{ fontWeight: 500, color: '#8D98B4' }}>Pekerjaan Sesudah</Typography>
          <Grid container direction='row' spacing={4} style={{ marginTop: '5px' }}>
            {images.map((val, i) => {
              return <ImageGrid src={val.src} index={i} />;
            })}
          </Grid>
        </div>

        <div style={{ paddingLeft: '20px', marginTop: '25px', width: '96%' }}>
          <Grid container direction='row'>
            {/* <Grid item xs={6}>
              <div style={{ marginTop: '10px' }}>
                <Typography style={{ fontWeight: 600, color: '#2B2F3C' }}>
                  CIMB Attachment
                </Typography>
                {cimbAttachment.map((val) => {
                  return <AttachmentLink url={val.url} filename={val.filename} />;
                })}
              </div>
            </Grid> */}

            {/* <Grid item xs={6}>
              <div style={{ marginTop: '10px' }}>
                <Typography style={{ fontWeight: 600, color: '#2B2F3C' }}>
                  Vendor Attachment
                </Typography>
                {vendorAttachment.map((val) => {
                  return <AttachmentLink url={val.url} filename={val.filename} isVendor />;
                })}
              </div>
            </Grid> */}

            <Grid item xs={6}>
              <Typography style={{ fontWeight: 600, color: '#2B2F3C', marginTop: '10px' }}>
                Vendor Attachment
              </Typography>
              {attachmentResVendors.length > 0 && 
              attachmentResVendors.map((item, index)=>{
                const currentIndex = index;
                return(
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MinioDocComponent filePath={item.path}/>
                    {isUserVendor && (
                      <IconButton
                        className={classes.deleteFile}
                        onClick={() => {
                          const oldArr = attachmentResVendors.slice();
                          const newArr = oldArr.filter(function(itemOld, i) {
                            return i !== currentIndex;
                          });
                          // console.log("+++ newArr",newArr);
                          setAttachmentResVendors(newArr);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                );
              })}
              {isUserVendor && (
                <>
                  {attachmentResVendors.length < 1 && (
                    <AttachFileSelector title="Attachment 1" refId="attachmet1" onChange={(e)=>setAttachment1(e.target.files[0])} selectedFile={attachment1} onDelete={()=>setAttachment1('')} />
                  ) }
                  {attachmentResVendors.length < 2 && (
                    <AttachFileSelector title="Attachment 2" refId="attachmet2" onChange={(e)=>setAttachment2(e.target.files[0])} selectedFile={attachment2} onDelete={()=>setAttachment2('')} />
                  )}
                  {attachmentResVendors.length < 3 && (
                    <AttachFileSelector title="Attachment 3" refId="attachmet3" onChange={(e)=>setAttachment3(e.target.files[0])} selectedFile={attachment3} onDelete={()=>setAttachment3('')} />
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </div>

        {/* Button Container */}
        <div style={{ marginLeft: 15, marginTop: 55, paddingRight: 65 }}>
          <Grid container justify='space-between'>
            <Grid item>
              <Button
                variant='contained'
                disableElevation
                className={classes.secondaryButton}
                onClick={() => history.goBack()}
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
                onClick={handleSave}
                style={{ textTransform: 'capitalize' }}
              >
                Simpan
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <ModalLoader isOpen={isOpenModalLoader} />
      <SuccessPopUp
        isOpen={isOpenSuccessModal}
        onClose={handleCloseSuccess}
        label="Add New Order Success"
      />
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
}

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(LeftComponent)));

function renderValue(type, value, color, fontWeight, isDone, isAttachment, config) {

  const { userRoleName } = useContext(RootContext);
  const history = useHistory();

  const [isMaxLimit, setIsMaxLimit] = useState(false);

  if (type === 'Approval') {
    if (value) {
      return (
        <Status value='Approved' borderColor='#65D170' textColor='#65D170' fillColor='#DEFFE1' />
      );
    } 
    return (
      <Status
        value='Not Approved'
        borderColor='#FF6A6A'
        textColor='#FF6A6A'
        fillColor='#FFF6F6'
      />
    );
    
  } if (type === 'Paid') {
    if (value) {
      return <Status value='Paid' borderColor='#65D170' textColor='#65D170' fillColor='#DEFFE1' />;
    } 
    return (
      <Status value='Unpaid' borderColor='#FF6A6A' textColor='#FF6A6A' fillColor='#FFF6F6' />
    );
    
  } if (type === 'bast') {
    return (
      <Grid container>
        {config?.bastSubmitStatus ? (
          <div>
            <Link 
              onClick={()=>{
                if(userRoleName.toLowerCase().includes('vendor')){
                  history.push(`/vendor-orders/mesin/bast-digital/${value}`);
                }else{
                // history.push(`/implementation/bast-digital-preview/${dataResponse?.bastId}`);
                  history.push(`/vendor-management/orders/mesin/bast-digital-preview/${value}`);
                }
              }
              }
              style={{color: 'green', display: 'flex', textDecoration: 'none'}}>
                          BAST Digital
              <CheckIcon style={{color: 'green', marginLeft: 10}} />
            </Link>
          </div>
        ): (
          <div>
            <Link 
              onClick={()=>{
                if(userRoleName.toLowerCase().includes('vendor')){
                  history.push(`/vendor-orders/mesin/bast-digital/${value}`);
                } else {
                  alert("BAST DIGITAL belum dibuat vendor");
                }
              }
              }
              style={{color: 'red', display: 'flex', textDecoration: 'none'}}>
                          BAST Digital
              <CloseIcon style={{color: 'red', marginLeft: 10}} />
            </Link>
          </div>
        )}

        {/* <Typography
          style={{
            fontWeight: fontWeight || 600,
            color: value ? '#65D170' : constants.color.primaryHard,
          }}
        >
          BAST Digital
        </Typography>
        {value ? (
          <CheckIcon style={{ color: '#65D170' }} />
        ) : (
          <AddIcon style={{ color: constants.color.primaryHard }} />
        )} */}

      </Grid>
    );
  } if (isAttachment) {
    const { onChange, onDelete, file } = config;
    if (value) {
      return <MinioDocComponent filePath={value} />;
    }
    return (
      <>
        <AttachFileSelector
          title="Attach document"
          refId='attachment'
          onChange={(e)=>{
            const maxAllowedSize = 1 * 1024 * 1024; // 1 MB
            if(e.target.files[0].size > maxAllowedSize){
              setIsMaxLimit(true);
            }else{
              setIsMaxLimit(false);
              onChange(e);
            }
          }}
          selectedFile={file}
          onDelete={onDelete}
          accept="image/*"
        />
        {isMaxLimit && (
          <ErrorComponent label='*) Ukuran File Melebihi 1Mb, silahkan pilih ukuran yang lebih kecil'/>
        )}
      </>
    );
  } if (type === 'input') {
    const { onChange } = config;
    return <InputBordered value={value} onChange={onChange} />;
  } 
  return (
    <Typography
      style={{ fontWeight: fontWeight || 600, color: color || '#2B2F3C', wordBreak: "break-all" }}
    >
      {value}
    </Typography>
  );
  
}

function Field({ data }) {
  return (
    <Grid item xs={12}>
      <Grid container alignItems='center'>
        <Grid item xs={5}>
          <Typography style={{ fontWeight: 400 }}>{data.label}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography style={{ paddingLeft: 10 }}>:</Typography>
        </Grid>
        <Grid item xs={6} justify='flex-start'>
          {renderValue(
            data.type,
            data.value,
            data.color,
            data.fontWeight,
            data.isDone,
            data.isAttachment,
            data.config
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
