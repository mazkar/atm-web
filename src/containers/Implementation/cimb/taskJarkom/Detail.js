import React, { useContext, useEffect , createContext , useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useHistory, useParams, useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import { DatePicker } from "antd";
import locale from 'antd/es/date-picker/locale/id_ID';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import { ReactComponent as Wifi } from '../../../../assets/icons/duotone-red/wifi.svg';
import trashUrl from '../../../../assets/icons/siab/trash-2.png';
import HistorySection, { statusOptions } from '../common/HistorySection';
import { ChkyButtons } from '../../../../components';
import { Dark, GrayHard, GraySoft, PrimaryHard } from '../../../../assets/theme/colors';
import CommonInput from './common/CommonInput';
import InputBordered from "../common/InputComponent";
import ImageUpload from './common/ImageUpload';
import FileUpload from './common/FileUpload';
import DeletePopup from '../common/PopUp/deletePopUp';
import SuccessPopup from '../common/PopUp/successPopUp';
import constansts, { dataCard } from '../../../../helpers/constants';
import ModalLoader from '../../../../components/ModalLoader';
import SelectLeftCustomIcon from "../../../../components/Selects/SelectLeftCustomIcon";
import DoublePicker from "../../../../components/Picker/DoublePicker";
import { RootContext } from '../../../../router';
import { doGetVendors } from "../../../UserManagement/ApiServicesUser";
import { doSaveComment, doUploadDocument, doUploadPhoto } from '../../ApiServiceImplementation';
import { getInitialName } from '../common/Utils';
import { ReactComponent as AngleDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as UserIcon } from "../../../../assets/icons/linear-red/user.svg";
import ConfirmationPopUp from '../common/PopUp/ConfirmationPopUp';
import ErrorComponent from '../common/ErrorComponent';
import DoubleSelector from '../../../../components/Selects/DoubleSelector';

export const TaskJarkomCtx = createContext();
const { Provider } = TaskJarkomCtx;

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
      // '& .MuiButton-label': {
      //   fontSize: 17,
      //   fontWeight: 500,
      // },
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

const typePremissesSugestion = [
  {value: 'ON', name: "ON"},
  {value: 'OFF', name: "OFF"},
];

const premissesOnSugestion = [
  {value: 'Konvensional', name: "Konvensional"},
  {value: 'Syariah', name: "Syariah"},
];

const premissesOffSugestion = [
  {value: 'Prominent', name: "Prominent"},
  {value: 'Branding', name: "Branding"},
  {value: 'High SA', name: "High SA"},
  {value: 'Medium SA', name: "Medium SA"},
  {value: 'High Usage', name: "High Usage"},
];

const Detail = () => {
  const { userId, userFullName } = useContext(RootContext);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const classes = useStyles();
  const { search, pathname } = location;
  const { implementationId } = qs.parse(search, { ignoreQueryPrefix: true });
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState();
  const [popupLabel, setPopupLabel] = useState('');
  const [detailValues, setDetailValues] = useState({});
  const [editableValues, setEditableValues] = useState({
    status : 0,
    taskTitle : 'New Link',
    picVendorId : '-',
    jarkomType : 'Vsat',
    requestType : 'Urgent',
    commType : 'M2M',
    locationMode : 'ON',
    modelTeam : premissesOnSugestion[0].value,
    notesDescription : '',
    dueDate: "",
  });
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
  const [message, setMessage] = useState('');

  const isNew = pathname.includes('create');
  const isEdit = pathname.includes('edit');
  const isEditable = isEdit || isNew;
  const [openConfirmPop, setOpenConfirmPop] = useState(false);

  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  const [errorForm, setErrorForm] = useState({
    picVendorId: false,
  });

  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }
  function loadingHandler(bool){
    setIsModalLoaderOpen(bool);
  }

  // GET OPTION VENDORS
  useEffect(() => {
    doGetVendors(loadVendorsHandler).then(response=>{
      // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
      if(response?.length > 0){
        const options = [{value: '-', name: "-Pilih Vendor-"}];
        // eslint-disable-next-line array-callback-return
        response.map((item)=>{
          const newObj = {value: item.id, name: item.name};
          options.push(newObj);
        });
        setVendorsOption(options);
      }
    });
  }, []);

  // const changeStatus = (e) => {
  //   // console.log("assasasas",e)
  //   const isNotRequest = e.toLocaleLowerCase().includes("not request");
  //   if(isNotRequest){
  //     // handleRightComponent('STRIP', 'status');
  //     setEditableValues({ ...editableValues, status: 3 });
  //   }
  //   else{
  //     // handleRightComponent('TODO', 'status');
  //     setEditableValues({ ...editableValues, status: 0 });
  //   }
  // };

  function handleClickBtn() {
    if (isEdit) {
      // console.log('save edit');
      // Konfirmasi sebelum edit
      setOpenConfirmPop(true);
    } else if (isNew) {
      // console.log('save new');
      saveOrUpdate();
    } else {
      history.push(`/implementation/task/jarkom/${id}/edit?implementationId=${implementationId}`);
    }
  }

  function handleMessage(text) {
    setMessage(text);
  }

  function handleCancel() {
    if (isEdit) {
      history.goBack();
    } else if (isNew) {
      history.goBack();
    } else {
      // console.log('else');
    }
  }

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

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
      .post(`${constansts.IMPLEMENTATION_SERVICE}/deleteCardTaskJarkom`, { id: id * 1 })
      .then((res) => {
        setIsModalLoaderOpen(false);
        setIsPopupOpen(true);
        setPopupType('Delete');
        setPopupLabel('Hapus Berhasil Dilakukan');
        // console.log('~ res', res);
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        // console.log('~ err', err);
      });
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
    setPopupType();
    setPopupLabel('');
    // if (isEdit) {
    //   history.push(`/implementation/task/jarkom/${id}?implementationId=${implementationId}`);
    // } else {
    history.push(`/implementation/${implementationId}`);
    // }
  }

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
    setErrorForm((prevVal) => {
      return {
        ...prevVal,
        [keyname]: bool,
      };
    });
  }

  function validateForm(){
    let errorCount = 0;

    if(editableValues.dueDate === ""){
      handleError('dueDate', true);
      errorCount+= 1;
    }else{
      handleError('dueDate', false);
    }

    if(editableValues.picVendorId === "" || editableValues.picVendorId === "-" || editableValues.picVendorId === null){
      handleError('picVendorId', true);
      errorCount+= 1;
    }else{
      handleError('picVendorId', false);
    }

    return(errorCount);
  }

  async function saveOrUpdate() {
    const isNotRequest = editableValues.taskTitle.toLocaleLowerCase().includes("not request");
    let errorCount = 0;
    if(!isNotRequest){
      errorCount = validateForm();
    }
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!');
    } else {let {photoFront} = editableValues;
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
        // console.log('~ e', e);
        setIsModalLoaderOpen(false);
        return;
      }
      const saveData = {
        implementationId,
        id: isEdit ? id : null,
        ...editableValues,
        photoFront,
        picVendorId: isNotRequest ? null : editableValues.picVendorId,
        photoRight,
        photoLeft,
        photoRear,
        documentList,
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
      delete saveData.picVendor;
      delete saveData.bastId;
      delete saveData.cimbAttachment;
      delete saveData.photoList;
      delete saveData.picVendorTelephoneNumber;
      delete saveData.vendorCompleteInstallation;
      delete saveData.vendorGateway;
      delete saveData.vendorHub;
      delete saveData.vendorHubNumber;
      delete saveData.vendorMachineAddress;
      delete saveData.vendorProvider;
      delete saveData.vendorSubnetMask;

      // console.log('~ saveData', saveData);
      axios
        .post(`${constansts.IMPLEMENTATION_SERVICE}/saveOrUpdateTaskJarkom`, saveData)
        .then((res) => {
          setIsModalLoaderOpen(false);
          setIsPopupOpen(true);
          setPopupLabel(isNew ? 'Task Berhasil Ditambahkan' : 'Perubahan Berhasil Disimpan');
          setMessage('');
          // console.log('~ res', res);
        })
        .catch((err) => {
          setIsModalLoaderOpen(false);
          // console.log('~ err', err);
        });
    }
  }

  // function handleChange(e) {
  //   // console.log('~ e', e)
  //   const newVal = e.target.value;
  //   const {name} = e.target;
  //   setEditableValues({ ...editableValues, [name]: newVal });
  // }

  const handleChangeState = (newVal, state) => {
    // console.log(`+++ ${state}: ${newVal}`);
    setEditableValues((prevValue)=>{
      return{
        ...prevValue,
        [state]: newVal
      };
    });
  };

  const handleOnOff = (e) => {
    // console.log(e);
    // setValOnOff(e);
    handleChangeState(e, "locationMode");
  };

  const onPremises = (e) => {
    // console.log(e);
    // setValPremises(e);
    handleChangeState(e, "modelTeam");
  };

  // function handlePremiseChange(val) {
  //   setEditableValues({
  //     ...editableValues,
  //     locationMode: val,
  //     ...(val === 'OFF' && { modelTeam: 'Konvensional' }),
  //   });
  // }

  // function handlePremiseChange2(val) {
  //   if (editableValues.locationMode !== 'OFF') {
  //     setEditableValues({ ...editableValues, modelTeam: val });
  //   }
  // }

  // function handleChangeDate(date) {
  //   // console.log('~ date', date);
  //   setEditableValues({ ...editableValues, 'dueDate': date ? +date : null });
  // }

  function fetchDetail() {
    setIsModalLoaderOpen(true);
    const req = { id };
    // console.log('~ req', req);
    axios
      .get(`${constansts.IMPLEMENTATION_SERVICE}/getTaskJarkomDetail?id=${id}`)
      .then((res) => {
        //  console.log('~ res.data', res.data);
        if (res.data.responseCode === '00') {
          const {
            jarkomDetail,
            cimbAttachment,
            vendorAttachment,
            comments,
            logHistoryChanges,
          } = res.data;
          setEditableValues({
            ...jarkomDetail,
            cimbAttachment,
          });
          setDetailValues({
            ...jarkomDetail,
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
            timeLineData: logHistoryChanges
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
        } else {
          alert(res.data.responseMessage);
          setIsModalLoaderOpen(false);
        }
      })
      .catch((err) => {
        setIsModalLoaderOpen(false);
        // console.log('~ err', err);
        alert(err);
      });
  }

  useEffect(() => {
    // console.log('~ id', id);
    if (!isNew) {
      fetchDetail();
    }
  }, [id, pathname]);

  // useEffect(() => {
  //   console.log('+++ editableValues', editableValues);
  // }, [editableValues]);

  const typeSugestion = [
    {value: 'New Link', name: "New Link"},
    {value: 'Existing Link', name: "Existing Link"},
    {value: 'Not Request (-)', name: "Not Request (-)"},
  ];

  const typeJarkom = [
    {value: 'Vsat', name: "Vsat"},
    {value: 'Non Vsat', name: "Non Vsat"},
    {value: 'M2M', name:'M2M'}
  ];

  const reqType = [
    {value: 'Urgent', name: "Urgent"},
    {value: 'Regular', name: "Regular"},
  ];

  const comType = [
    {value: 'M2M', name: "M2M"},
    {value: 'IOT', name: "IOT"},
  ];

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
        cardTaskCategory: 'jarkom',
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
      <div style={{ padding: 30, marginBottom: 30 }}>
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
        <div style={{ paddingTop: 10 }}>
          <Typography
            style={{
              fontFamily: "Barlow",
              fontWeight: '500',
              fontSize: '36px',
              color: "#2B2F3C",
            // lineHeight: '43px',
            // marginBottom: 20,
            }}
          >
            {isNew ? 'New ' : isEdit ? 'Edit ' : ''}Task {isEditable ? '' : 'Detail'}
          </Typography>

          {/* Container */}
          <Grid container style={{ marginTop: 20 }} spacing={4}>
            <Grid item xs={7}>
              <Paper
                style={{
                  width: "100%",
                  minHeight: '400px',
                  height: "100%",
                  borderRadius: 10,
                  boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
                  padding: 25,
                }}
              >
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <Wifi />
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontWeight: 600, color: "#DC241F", marginLeft: 10 }}>
                          {openingType !=="Termin" ? "Jarkom":"Cabut Jarkom"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Header Title */}
                  <Grid item style={{paddingLeft: '10px', marginBottom: '20px', width: '100%'}}>
                    <SelectLeftCustomIcon
                      disabled={!isEditable}
                      selectOptionData={typeSugestion}
                      selectedValue={editableValues.taskTitle}
                      onSelectValueChange={(newVal)=>{
                        // console.log("~ newVal", newVal);
                        let newStatus = 0;
                        // handleChangeState(newVal, 'taskTitle');
                        // changeStatus(newVal);
                        // console.log("assasasas",e)
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
                      }}/>
                  </Grid>

                  <Grid item>
                    <InputBordered
                      disabled={!isEditable}
                      multiline
                      rows={6}
                      value={editableValues.notesDescription}
                      style={{ width: "100%" }}
                      onChange={(e)=>handleChangeState(e.target.value, "notesDescription")}
                      placeholder="Notes & Description"
                    />
                  </Grid>

                  {/* Content */}
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due Date</Typography>
                          </Grid>
                          <Grid item>
                            <DatePicker
                              disabledDate={disabledDate}
                              disabled={!isEditable}
                              locale={locale}
                              suffixIcon={<CalendarIcon style={{height: 20, position: 'absolute', top: 0, left: -25}}/>}
                              value={editableValues.dueDate? moment(editableValues.dueDate): ""}
                              onChange={(newDate)=>{
                                let valDate = "";
                                if(newDate === null){
                                  valDate = "";
                                }else{
                                  valDate = newDate.unix() * 1000;
                                }
                                handleChangeState(valDate, 'dueDate');
                              }}
                              style={{
                                borderRadius: 6,
                                height: '40px',
                                border: '1px solid #BCC8E7',
                                width: '100%',
                                paddingLeft: 35,
                              }}
                              placeholder='Choose Due Date'
                              format="DD MMMM YYYY"
                            />
                            { errorForm.dueDate ? <ErrorComponent label="Select one!" /> : null }
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={6}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                          </Grid>
                          <Grid item>
                            {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                              <SelectLeftCustomIcon
                                disabled={!isEditable}
                                leftIcon={<UserIcon style={{height: 20}}/>}
                                selectOptionData={vendorsOption}
                                selectedValue={editableValues?.picVendorId}
                                onSelectValueChange={(newVal)=>handleChangeState(newVal, 'picVendorId')}/>
                            )}
                            { errorForm.picVendorId ? <ErrorComponent label="Select one!" /> : null }
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={6}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Jenis Jarkom</Typography>
                          </Grid>
                          <Grid item>
                            <SelectLeftCustomIcon
                              disabled={!isEditable}
                              selectOptionData={typeJarkom}
                              selectedValue={editableValues?.jarkomType}
                              onSelectValueChange={(newVal)=>handleChangeState(newVal, 'jarkomType')}/>
                            {/* { errorForm.picVendor ? <ErrorComponent label="Select one!" /> : null } */}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={6}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Request Type</Typography>
                          </Grid>
                          <Grid item>
                            <SelectLeftCustomIcon
                              disabled={!isEditable}
                              selectOptionData={reqType}
                              selectedValue={editableValues?.requestType}
                              onSelectValueChange={(newVal)=>handleChangeState(newVal, 'requestType')}/>
                            {/* { errorForm.picVendor ? <ErrorComponent label="Select one!" /> : null } */}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={6}>
                        <Grid container direction="column" spacing={1}>
                          {/* <DoublePicker defaultOnOff="Off" defaultPremises="Konvensional" onOff={handleOnOff} onPremises={onPremises} disabled={!isEditable}/> */}
                          <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Premises</Typography>
                          </Grid>
                          <Grid item>
                            <DoubleSelector 
                              selectLeftOptionData={typePremissesSugestion}
                              selectedLeftValue={editableValues.locationMode}
                              onSelectLeftValueChange={(newVal)=>{
                                handleChangeState(newVal, 'locationMode');
                                const optionArray = newVal === "ON" ? premissesOnSugestion : premissesOffSugestion;
                                handleChangeState(optionArray[0].value, 'modelTeam');
                              }}
                              selectOptionData={editableValues.locationMode === "ON" ? premissesOnSugestion : premissesOffSugestion}
                              selectedValue={editableValues.modelTeam}
                              onSelectValueChange={(newVal)=>handleChangeState(newVal, 'modelTeam')}/>
                          </Grid>
                          {/* {errorForm.premises ? (<ErrorComponent label="Select one!" />) : null} */}
                        </Grid>
                      </Grid>

                     {/*} <Grid item xs={6}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Comm Type</Typography>
                          </Grid>
                          <Grid item>
                            <SelectLeftCustomIcon
                              disabled={!isEditable}
                              selectOptionData={comType}
                              selectedValue={editableValues?.commType}
                              onSelectValueChange={(newVal)=>handleChangeState(newVal, 'commType')}/>
                          { errorForm.picVendor ? <ErrorComponent label="Select one!" /> : null } 
                          </Grid>
                        </Grid>
                            </Grid>*/}
                      {/* End Midle Content */}

                      {!isEditable && (
                        <>
                          <CommonInput
                            xs={6}
                            disabled
                            value={detailValues.vendorHub ? 'Ya' : 'Tidak'}
                            label='Menggunakan HUB'
                          />
                          <CommonInput
                            xs={6}
                            disabled
                            value={detailValues.vendorHubNumber}
                            label='Hub Number'
                          />
                          <CommonInput
                            xs={6}
                            disabled
                            value={detailValues.picVendorTelephoneNumber}
                            label='No Telp PIC / Vendor'
                          />
                          <CommonInput
                            xs={6}
                            disabled
                            value={detailValues.vendorMachineAddress}
                            label='IP Mesin'
                          />
                          <CommonInput
                            xs={6}
                            disabled
                            value={detailValues.vendorSubnetMask}
                            label='IP Subnet Mask'
                          />
                          <CommonInput
                            xs={6}
                            disabled
                            value={detailValues.vendorGateway}
                            label='IP Gateway'
                          />
                          <CommonInput
                            xs={6}
                            disabled
                            value={
                              detailValues.vendorGateway
                                ? moment(vendorCompleteInstallation).format('DD/MM/YYYY')
                                : '-'
                            }
                            label='Tgl Installasi Selesai'
                          />
                          <CommonInput
                            xs={6}
                            disabled
                            value={detailValues.vendorProvider}
                            label='Provider'
                          />
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
                              {detailValues.bastStatus === true ? (
                                <Link
                                  to={`${dataCard.find(val=>val.type==='jarkom').url}/bast-digital/${detailValues.bastId}`}
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
                                  BAST Digital - Jarkom
                                </Link>
                              ) : (
                                '-'
                              )}
                            </div>
                          </Grid>
                        </>
                      )}
                      {/* </Grid> */}

                      <Grid item xs={12}>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Photo Lokasi / Layout</Typography>
                          </Grid>
                          <Grid container spacing={2}>
                            <ImageUpload name="photoFront" title='Depan' />
                            <ImageUpload name="photoRight" title='Kanan' />
                            <ImageUpload name="photoLeft" title='Kiri' />
                            <ImageUpload name="photoRear" title='Belakang' />
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
                          </Grid>
                          <Grid item style={{paddingLeft: '0px', marginTop: '25px', width: '96%'}}>
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
                        </Grid>
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <HistorySection
              disableDropdown={isNew}
              showChatInput={isEdit}
              showHistory={!isEditable}
              showChatHistory={!isNew}
              status={editableValues.status}
              taskType='jarkom'
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
                <ChkyButtons buttonType='redOutlined' onClick={()=>history.push(`/implementation/${implementationId}`)}>
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
      </div>
    </Provider>
  );
};

export default Detail;

export function createOptions(arr) {
  return arr?.map((value) => ({ name: value, value }));
}
