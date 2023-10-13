/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext , createContext , useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import qs from 'qs';
import axios from 'axios';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import { ReactComponent as DoubleCheck } from '../../../../assets/icons/task/aktivasi-red.svg';
import trashUrl from '../../../../assets/icons/siab/trash-2.png';
import HistorySection from '../common/HistorySection';
import { ChkyButtons } from '../../../../components';
import PopupAktivasiMail from '../../../../components/PopupAktivasiMail';

import {
  Dark,
  GrayHard,
  GraySoft,
  PrimaryHard,
  SuccessMedium,
} from '../../../../assets/theme/colors';
import CommonInput from './common/CommonInput';
import ImageUpload from './common/ImageUpload';
import FileUpload from './common/FileUpload';
import { ReactComponent as GreenCheck } from '../../../../assets/icons/general/green-check.svg';
import { ReactComponent as RedPlus } from '../../../../assets/icons/general/plus_red.svg';
import DeletePopup from '../common/PopUp/deletePopUp';
import SuccessPopup from '../common/PopUp/successPopUp';

import constansts from '../../../../helpers/constants';
import { createOptions } from '../taskJarkom/Detail';
import { RootContext } from '../../../../router';
import ModalLoader from '../../../../components/ModalLoader';
import { doSaveComment, doUploadDocument, doUploadPhoto,doGetEmailData } from '../../ApiServiceImplementation';
import SelectVendor from './common/SelectVendor';
import ModalEmail from './common/ModalEmail';
import ConfirmationPopUp from '../common/PopUp/ConfirmationPopUp';

export const TaskAktivasiCtx = createContext();
const { Provider } = TaskAktivasiCtx;

const useStyles = makeStyles({
  backBtn: {
    marginBottom: 20,
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      padding: 0,
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
      '& .MuiButton-label': {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
  delBtn: {
    marginBottom: 0,
    '& .MuiButton-root .MuiButton-label': {
      fontSize: 15,
      lineHeight: '18px',
    },
  },
  filesTitle: {
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '16px',
  },
});

const Detail = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const { userId, userFullName } = useContext(RootContext);
  const { search, pathname } = location;
  const { implementationId } = qs.parse(search, { ignoreQueryPrefix: true });
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState();
  const [popupLabel, setPopupLabel] = useState('');
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  const [detailValues, setDetailValues] = useState({});
  const [editableValues, setEditableValues] = useState({
    status: 0,
    photoFront: null,
    photoRear: null,
    photoLeft: null,
    photoRight: null,
    picVendorId: "-",
    commentList: [],
    notesDescription: null,
    dueDate: null,
    taskTitle: null,
  });
  const [message, setMessage] = useState('');
  const [isMailed, setIsMailed] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const isNew = pathname.includes('create');
  const isEdit = pathname.includes('edit');
  const isEditable = isEdit || isNew;
  const [openConfirmPop, setOpenConfirmPop] = useState(false);
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");

  //email
  const [taskType, setTaskType]= useState("activation");
  const [dataEmail, setDataEmail] = useState({
    no: 1,
    address: "",
    oldId: "",
    newId: "",
    location: "",
    region: "",
    unit: "",
    serialNumber: "",
    comms: "",
    picComm: "",
    slmPic: "",
    flmVendor: "",
    flmPic: "",
  });
  
  useEffect(()=>{
    doGetEmailData(loadingHandler, implementationId, taskType)
      .then((response) => {
        if (response) {
          if (response.responseCode === "200") {
            const emailData = response.implementationInfo;
            setDataEmail(emailData);
          }
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  },[])


  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setIsModalLoaderOpen(bool);
  }

  function handleClickBtn() {
    if (isEdit) {
      // console.log('save edit');
      // saveOrUpdate();
      setOpenConfirmPop(true);
    } else if (isNew) {
      // console.log('save new');
      saveOrUpdate();
    } else {
      history.push(
        `/implementation/task/activation/${id}/edit?implementationId=${implementationId}`
      );
    }
  }

  function handleCancel() {
    if (isEdit) {
      history.goBack();
    } else if (isNew) {
      history.goBack();
    } else {
      console.log('else');
    }
  }

  function handleDelete() {
    setIsDelPopupOpen(true);
  }

  function handleCloseDelPopup() {
    setIsDelPopupOpen(false);
  }

  function handleSubmitDelete() {
    setIsDelPopupOpen(false);
    setIsModalLoaderOpen(true);
    axios
      .post(`${constansts.IMPLEMENTATION_SERVICE}/deleteCardTaskActivation`, {
        activationId: id * 1,
      })
      .then((res) => {
        setIsModalLoaderOpen(false);
        setIsPopupOpen(true);
        setPopupType('Delete');
        setPopupLabel('Hapus Berhasil Dilakukan');
        // console.log('~ res', res);
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        console.log('~ err', err);
      });
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
    setPopupType();
    setPopupLabel('');
    history.push(`/implementation/${implementationId}`);
  }

  async function saveOrUpdate() {
    let {photoFront} = editableValues;
    let {photoRight} = editableValues;
    let {photoLeft} = editableValues;
    let {photoRear} = editableValues;
    const documentList = editableValues.cimbAttachment || [];
    const photoList = editableValues.photoList || [];
    const docs = editableValues.documentList || [];

    try {
      setIsModalLoaderOpen(true);
      await Promise.all([
        ...photoList.map(async (item) => {
          const { name, img } = item;
          const res = await doUploadPhoto(img);
          // console.log('~ name', name);
          // console.log('~ res', res);
          if (name === 'photoFront') {
            photoFront = res.data.path;
          }
          if (name === 'photoRight') {
            photoRight = res.data.path;
          }
          if (name === 'photoLeft') {
            photoLeft = res.data.path;
          }
          if (name === 'photoRear') {
            photoRear = res.data.path;
          }
        }),
        ...docs.map(async (doc, i) => {
          const res = await doUploadDocument(doc.file);
          const { path, filename } = res.data;
          documentList.push({
            path,
            filename,
            id: null,
            category: 'cimb',
          });
        }),
      ]);
    } catch (e) {
      console.log('~ e', e);
      setIsModalLoaderOpen(false);
      return;
    }

    const isNotRequest = editableValues.taskTitle.toLocaleLowerCase().includes("not request");
    const saveData = {
      // ...editableValues,
      status: editableValues.status,
      // commentList: [],
      notesDescription: editableValues.notesDescription,
      dueDate: editableValues.dueDate,
      taskTitle: editableValues.taskTitle,
      photoFront,
      photoRight,
      photoLeft,
      photoRear,
      implementationId,
      documentList,
      id: isEdit ? id : null,
      picVendorId: isNotRequest? null : editableValues.picVendorId,
      ...(isEdit &&
        message?.length > 0 && {
        commentList: [
          {
            userId,
            userName: userFullName,
            message,
            createdDate: +moment(),
          },
        ],
      }),
    };

    // delete saveData.cimbAttachment;
    // delete saveData.photoList;
    // delete saveData.timestamp;
    // delete saveData.userId;
    // delete saveData.userName;
    // delete saveData.picVendor;
    // delete saveData.bastId;

    // console.log('~ saveData', saveData);
    axios
      .post(`${constansts.IMPLEMENTATION_SERVICE}/saveOrUpdateActivation`, saveData)
      .then((res) => {
        setIsModalLoaderOpen(false);
        setIsPopupOpen(true);
        setPopupLabel(isNew ? 'Task Berhasil Ditambahkan' : 'Perubahan Berhasil Disimpan');
        setMessage('');
        // console.log('~ res', res);
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        console.log('~ err', err);
      });
  }

  function fetchDetail() {
    setIsModalLoaderOpen(true);
    const req = { id };
    // console.log('~ req', req);
    axios
      .post(`${constansts.IMPLEMENTATION_SERVICE}/detailCardTaskActivation`, {
        activationId: id,
      }) // ?id=${id}`)
      .then((res) => {
        // console.log('~ res.data', res.data);
        const {
          implementationInfo,
          cimbAttachment,
          vendorAttachment,
          comments,
          logHistoryChange,
        } = res.data;
        setIsMailed(implementationInfo.emailSentStatus === 1);
        setEditableValues({
          ...implementationInfo,
          cimbAttachment,
        });
        setDetailValues({
          ...implementationInfo,
          bastSubmitStatus: implementationInfo.bastStatus || false,
          vendorAttachment: vendorAttachment.map((doc, i) => {
            return {
              id: doc.id || null,
              filename: doc.filename || '',
              path: doc.path || '',
            };
          }),
          commentsData: comments
            .map((c) => ({
              name: c.userName,
              comment: c.message,
              date:
                c.createdDate != null ? moment(c.createdDate).format('DD/MM/YYYY | HH:mm') : null,
            }))
            .reverse(),
          timeLineData: logHistoryChange
            .map((h) => {
              const formatted =
                h.createdDate != null
                  ? moment(h.createdDate).locale('en').format('DD-MM-YYYY,hh:mm:ss A')
                  : '-,-';
              const splitted = formatted.split(',');
              return {
                message: h.message,
                name: h.userName,
                initial: getInitialName(h.userName),
                date: splitted[0],
                time: splitted[1],
              };
            })
            .reverse(),
        });
        setIsModalLoaderOpen(false);
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        console.log('~ err', err);
        alert(err);
      });
  }

  function handleChange(e) {
    // console.log('~ e', e)
    const newVal = e.target.value;
    const {name} = e.target;
    setEditableValues({ ...editableValues, [name]: newVal });
  }
  function handleChangePicVendor(newVal) {
    // console.log('~ e', e)
    setEditableValues({ ...editableValues, 'picVendorId': newVal });
  }

  function handleChangeDate(date) {
    // console.log('~ date', date);
    setEditableValues({ ...editableValues, 'dueDate': date ? +date : null });
  }

  function handleMessage(text) {
    setMessage(text);
  }

  function getInitialName(name) {
    if(name){
      let initials = name.match(/\b\w/g) || [];
      initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
      return initials;
    }return "";
  }

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  useEffect(() => {
    // console.log('~ id', id);
    if (!isNew) {
      fetchDetail();
    }
  }, [id, pathname]);

  useEffect(() => {
    console.log('+++ editableValues', editableValues);
  }, [editableValues]);

  const documents = isEditable
    ? [1, 2, 3].map((val, i) => {
      const doc = editableValues.cimbAttachment ? editableValues.cimbAttachment[i] : null;
      return doc;
    })
    : editableValues.cimbAttachment || [];

  // KOMENTAR
  const saveComment=(e)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      const dataHit={
        message,
        cardTaskCategory: 'activation',
        cardTaskId: id,
      };
      if(message){
        doSaveComment(loadingHandler,dataHit)
          .then((res) => {
            // console.log('~ res.data', res.data);
            if(res.data){
              if(res.data.responseCode === "00"){
                alert(`Berhasil save comment`);
                history.go(0);
              }
            }
          })
          .catch((err) => {
            alert(`Gagal save comment. ${err}`);
            loadingHandler(false);
          });
      }
    }
  };

  return (
    <Provider value={{ isEditable, editableValues, setEditableValues }}>
      <div style={{ padding: 30 }}>
        {!isEdit && (
          <div className={classes.backBtn}>
            <MuiIconLabelButton
              label='Back'
              iconPosition='startIcon'
              onClick={() => history.goBack()}
              buttonIcon={<ArrowLeft />}
            />
          </div>
        )}
        <Typography
          style={{
            fontWeight: '500',
            fontSize: '36px',
            lineHeight: '43px',
            marginBottom: 20,
          }}
        >
          {isNew ? 'New ' : isEdit ? 'Edit ' : ''}Task {isEditable ? '' : 'Detail'}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={7}>
            <Paper
              style={{
                padding: 30,
                borderRadius: 10,
                boxShadow: '0px 6px 6px rgb(232 238 255 / 30%)',
                minHeight: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <DoubleCheck />
                </div>
                <Typography
                  style={{
                    fontWeight: '600',
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: PrimaryHard,
                    marginLeft: 10,
                  }}
                >
                  Aktivasi
                </Typography>
              </div>
              <Grid container spacing={2}>
                <CommonInput
                  xs={12}
                  disabled={!isEditable}
                  value={editableValues.taskTitle}
                  name="taskTitle"
                  type='select'
                  onChange={(e)=>{
                    const newVal = e.target.value;
                    // console.log("+++ newVal", newVal);
                    let newStatus = 0;
                    const isNotRequest = newVal.toLocaleLowerCase().includes("not request");
                    if(isNotRequest){
                      newStatus = 3;
                    }
                    else{
                      newStatus = 0;
                    }
                    const newState = {
                      taskTitle: newVal,
                      status: newStatus
                    };
                    // console.log("+++ newState", newState);
                    setEditableValues({ ...editableValues, ...newState });
                  }}
                  options={createOptions(['Pengerjaan Aktivasi', 'Not Request (-)'])}
                />

                <CommonInput
                  xs={12}
                  disabled={!isEditable}
                  value={editableValues.notesDescription}
                  name="notesDescription"
                  type='textArea'
                  onChange={handleChange}
                />
                <CommonInput
                  disabledDate={disabledDate}
                  xs={6}
                  disabled={!isEditable}
                  value={editableValues.dueDate}
                  onChange={handleChangeDate}
                  type='date'
                  label='Due date &amp; Time'
                />
                {/* <CommonInput
                  xs={6}
                  disabled={!isEditable}
                  value={editableValues.picVendor}
                  name={'picVendor'}
                  onChange={handleChange}
                  label='PIC / Vendor'
                  type='select'
                  options={createOptions(picVendors)}
                /> */}
                <Grid item xs={6}>
                  <SelectVendor
                    disabled={!isEditable}
                    value={editableValues.picVendorId}
                    onChange={handleChangePicVendor}
                  />
                </Grid>
              </Grid>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 30 }}>
                <Button
                  style={{
                    fontWeight: '600',
                    fontSize: '15px',
                    lineHeight: '18px',
                    marginRight: 8,
                    textTransform: "capitalize",
                    color: isMailed ?  SuccessMedium : PrimaryHard,
                  }}
                  onClick={()=>setOpenMail(true)}
                  disabled={isMailed}
                >
                Email Aktivasi
                  {isMailed ? <GreenCheck style={{marginLeft: 10}}/> : <RedPlus style={{marginLeft: 10}}/>}
                </Button>
                {/* <Typography
                  style={{
                    fontWeight: '600',
                    fontSize: '15px',
                    lineHeight: '18px',
                    marginRight: 8,
                    color: isNew ? PrimaryHard : SuccessMedium,
                  }}
                >
                  Email Aktivasi
                </Typography>
                {isNew ? <RedPlus /> : <GreenCheck />} */}
              </div>
              {!isEditable && (
                <Grid container spacing={2} style={{ marginTop: 30 }}>
                  <Grid item xs={6}>
                    <Typography
                      style={{
                        fontWeight: '600',
                        fontSize: '13px',
                        lineHeight: '16px',
                        color: GrayHard,
                        marginBottom: '10px',
                      }}
                    >
                      BAST Digital
                    </Typography>
                    <div>
                      {detailValues.bastSubmitStatus === true ? (
                        <Link
                          onClick={()=>history.push(`/vendor-management/orders/aktivasi/bast-digital-preview/${detailValues.bastId}?taskType=activation`)}
                          style={{
                            backgroundColor: GraySoft,
                            padding: '6px 10px',
                            fontSize: '13px',
                            lineHeight: '16px',
                            borderRadius: '14px',
                            display: 'inline-block',
                            color: Dark,
                          }}
                        >
                          BAST Digital - Aktivasi
                        </Link>
                      ) : (
                        '-'
                      )}
                    </div>
                  </Grid>
                </Grid>
              )}
              <Typography
                style={{
                  fontWeight: '600',
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: GrayHard,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                Photo Lokasi / Layout
              </Typography>
              <Grid container spacing={2}>
                <ImageUpload name="photoFront" title='Depan' />
                <ImageUpload name="photoRight" title='Kanan' />
                <ImageUpload name="photoLeft" title='Kiri' />
                <ImageUpload name="photoRear" title='Belakang' />
              </Grid>
              {isEditable && (
                <Typography
                  style={{
                    fontSize: '12px',
                    lineHeight: '14px',
                    color: GrayHard,
                    marginTop: 10,
                  }}
                >
                  *Tolong upload foto sesuai dengan keterangan yang tersedia
                </Typography>
              )}
              <Grid container style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <Typography className={classes.filesTitle}>CIMB Attachment</Typography>
                  {documents?.length > 0
                    ? documents.map((doc, i) => {
                      return <FileUpload doc={doc} index={i} />;
                    })
                    : 'No files'}
                </Grid>
                {!isEditable && (
                  <Grid item xs={6}>
                    <Typography className={classes.filesTitle}>Vendor Attachment</Typography>
                    {detailValues.vendorAttachment?.length > 0
                      ? detailValues.vendorAttachment?.map((doc, i) => {
                        return <FileUpload doc={doc} index={i} isVendor />;
                      })
                      : 'No files'}
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          <HistorySection
            disableDropdown={isNew}
            showChatInput={isEdit}
            showHistory={!isEditable}
            showChatHistory={!isNew}
            status={editableValues.status}
            taskType='activation'
            taskId={id}
            reloadDetail={fetchDetail}
            message={message}
            handleMessage={handleMessage}
            commentsData={detailValues.commentsData}
            timeLineData={detailValues.timeLineData}
            onMessageEnter={saveComment}
          />
        </Grid>
        <Grid container justify='space-between' alignItems='center' style={{ marginTop: 20 }}>
          <Grid item>
            {isEditable ? (
              <ChkyButtons buttonType='redOutlined' onClick={handleCancel}>
                Cancel
              </ChkyButtons>
            ) : (
              <div className={clsx(classes.backBtn, classes.delBtn)}>
                <MuiIconLabelButton
                  label='Delete Card'
                  onClick={handleDelete}
                  iconPosition='startIcon'
                  buttonIcon={<img src={trashUrl} />}
                />
              </div>
            )}
          </Grid>
          <Grid item>
            <ChkyButtons buttonType={isEditable ? null : 'redOutlined'} onClick={handleClickBtn}>
              {isEditable ? 'Submit' : 'Edit'}
            </ChkyButtons>
          </Grid>
        </Grid>
      </div>
      <ConfirmationPopUp
        isOpen={openConfirmPop}
        onSubmit={()=>saveOrUpdate()}
        onLeave={()=>setOpenConfirmPop(false)}
        onClose={()=>setOpenConfirmPop(false)}
      />
      <DeletePopup
        isOpen={isDelPopupOpen}
        onClose={handleCloseDelPopup}
        onLeave={handleCloseDelPopup}
        onSubmit={handleSubmitDelete}
      />
      <SuccessPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        label={popupLabel}
        type={popupType}
      />
      <ModalLoader isOpen={isModalLoaderOpen} />
      {/* <PopupAktivasiMail open={false} /> */}
      <ModalEmail open={openMail} onClose={()=>setOpenMail(false)} loadingHandler={loadingHandler} onSent={()=>setIsMailed(true)} dataEmail={dataEmail} openingType={openingType}/>
    </Provider>
  );
};

export default Detail;

const picVendors = [
  'Vendor Aktivasi',
  'PT Trias',
  'PT Royal',
  'PT. Cakrawala Mitra',
  'PT. Sarana Usaha Adhi',
];
