import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { useHistory, useParams } from 'react-router-dom';
import { DatePicker } from 'antd';
import {
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  Button,
  Divider,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import Axios from 'axios';
import qs from 'qs';
import { PDFDownloadLink } from "@react-pdf/renderer";
import MuiIconLabelButton from '../../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../../../assets/icons/siab/arrow-left.svg';
import { ReactComponent as CimbLogo } from '../../../../../assets/icons/siab/cimbLogo.svg';
import { ReactComponent as ShareIcon } from '../../../../../assets/icons/siab/share-2.svg';
import { ReactComponent as PlusIcon } from '../../../../../assets/icons/linear-red/plus.svg';
import { ReactComponent as CalendarIcon } from '../../../../../assets/icons/linear-red/calendar.svg';
import { doUploadPhoto } from '../../../../Implementation/ApiServiceImplementation';
import MinioImageComponent from '../../../../../components/MinioImageComponent';
import useTimestampConverter from '../../../../../helpers/useTimestampConverter';
import SuccessPopUp from '../../common/PopUp/successPopUp';
import ImageSelector from '../../../../../components/ImageSelector';
import NoImage from '../../../../../assets/images/image.png';
import constants from '../../../../../helpers/constants';
import AddNewVendorPopUp from '../../common/PopUp/AddNewVendor';
import Loading from '../../../../../components/Loading/LoadingView';
import ModalLoader from '../../../../../components/ModalLoader';
import BastPdf from "../BastDigital/BastPdf";
import { defaultDataBast } from '../BastDigital/defaultData';

const SmallInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: (props) => props.backgroundColor, // theme.palette.common.white,
    fontSize: 15,
    width: '100%',
    height: '100%',
    padding: '7px 9px',
    border: '1px solid #BCC8E7',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#DC241F',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
  },
  rootPaper: {
    width: '60%',
    minHeight: '550px',
    height: '100%',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
  },
  rootPaperSecond: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: constants.color.white,
    boxShadow: 'unset',
    height: '40px',
    width: '850px',
    border: '1px solid #BCC8E7',
  },
  iconButton: {
    padding: '0px 5px',
    color: constants.color.grayMedium,
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 20,
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
  content: {
    padding: 10,
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  imageUploadContainer: {
    position: 'relative',
  },
  imgDefault: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
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
    width: '100%',
    height: '100px',
  },
  deleteFilePhoto: {
    position: 'absolute',
    right: -10,
    top: -10,
    color: '#DC241F',
  },
});

function BASTDigital() {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [isOpenAddVendor, setIsOpenAddVendor] = useState(false);
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Summary */
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [openSuccessCreatePopUp, setOpenSuccessCreatePopUp] = useState(false);
  const [photoFront, setPhotoFront] = useState('');
  const [photoLeft, setPhotoLeft] = useState('');
  const [photoRight, setPhotoRight] = useState('');
  const [photoRear, setPhotoRear] = useState('');
  const [photoFLM, setPhotoFLM] = useState('');
  const [photoSLM, setPhotoSLM] = useState('');
  const [dataChecked, setDataChecked] = useState({
    checkedFLM: false,
    checkedSLM: false,
    checkedJarkom: false,
    checkedCR: false,
    checkedSecurity: false,
    checkedPromosi: false,
    checkedSurvey: false,
    checkedOther: false,
  });

  const [dataBast, setDataBast] = useState(defaultDataBast); // <--- init data BAST

  useEffect(() => {
    getResponse(id);
  }, [id]);

  useEffect(() => {
    console.log(dataBast);
  }, [dataBast]);

  async function getResponse(bastId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const params = qs.stringify({
      id,
      taskType: 'maintenance',
    });
    try {
      setIsLoading(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getDetailBastTask?${params}`,
        config
      );
      try {
        console.log('HASIL: ', result);
        const response = result.data;
        let dataFLM; let dataSLM; let photoFLMVendor; let photoSLMVendor;
        if (response.vendorDetails != null && response.vendorDetails.length > 0) {
          response.vendorDetails.map((item, index) => {
            if (item.key == 'FLM Signature') {
              photoFLMVendor = item.value;
            } else if (item.key == 'SLM Signature') {
              photoSLMVendor = item.value;
            } else if (item.key == 'FLM Telephone Number') {
              dataFLM = item.value;
            } else if (item.key == 'SLM Telephone Number') {
              dataSLM = item.value;
            }
          });
        }
        if (response) {
          const vendorDetailsArr = (val) =>{
            if(val === null){
              return dataBast.vendorDetails;
            }if(val.length>0){
              const newArr = [
                {
                  check: "checkedCR",
                  phone: val.find(obj => obj.key === "CR Telephone Number")?.value,
                  name: val.find(obj => obj.key === "CR Name")?.value,
                  key: "CR",
                },
                {
                  check: "checkedFLM",
                  phone: val.find(obj => obj.key === "FLM Telephone Number")?.value,
                  name: val.find(obj => obj.key === "FLM Name")?.value,
                  key: "FLM",
                },
                {
                  check: "checkedSLM",
                  phone: val.find(obj => obj.key === "SLM Telephone Number")?.value,
                  name: val.find(obj => obj.key === "SLM Name")?.value,
                  key: "SLM",
                },
                {
                  check: "checkedJarkom",
                  phone: val.find(obj => obj.key === "Jarkom Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Jarkom Name")?.value,
                  key: "Jaringan",
                },
                {
                  check: "checkedSecurity",
                  phone: val.find(obj => obj.key === "Security Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Security Name")?.value,
                  key: "Maintenance",
                },
                {
                  check: "checkedPromosi",
                  phone: val.find(obj => obj.key === "Promosi Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Promosi Name")?.value,
                  key: "Promosi",
                },
                {
                  check: "checkedSurvey",
                  phone: val.find(obj => obj.key === "Survey Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Survey Name")?.value,
                  key: "Survey",
                },
                {
                  check: "checkedOther",
                  phone: val.find(obj => obj.key === "Other Telephone Number")?.value,
                  name: val.find(obj => obj.key === "Other Name")?.value,
                  key: "Other",
                },
              ];
              return newArr;
            }
            return dataBast.vendorDetails;
          };
          const newArrVendorDetails = vendorDetailsArr(response.vendorDetails);

          const dataNew = {
            noReference: response.referenceNumber !== null ? response.referenceNumber : '-',
            letterDate: response.letterDate !== null ? response.letterDate : '-',
            nameLandlord: response.nameLandlord !== null ? response.nameLandlord : '-',
            locationArea: response.locationArea !== null ? response.locationArea : '-',
            locationAddress: response.locationAddress !== null ? response.locationAddress : '-',
            locationName: response.locationName !== null ? response.locationName : '-',
            locationCity: response.locationCity !== null ? response.locationCity : '-',
            atmId: response.atmId !== null ? response.atmId : '-',
            latitude: response.latitude !== null ? response.latitude : '-',
            longitude: response.longitude !== null ? response.longitude : '-',
            areaName: response.areaName !== null ? response.areaName : '-',
            cityName: response.cityName !== null ? response.cityName : '-',
            phoneFLM: dataFLM !== null ? dataFLM : '-',
            phoneSLM: dataSLM !== null ? dataSLM : '-',
            ticketNumber: response.ticketNumber !== null ? response.ticketNumber : '-',
            locationId: response.locationId !== null ? response.locationId : '-',
            idMesin: response.idMesin !== null ? response.idMesin : '-',
            jobType: response.jobType !== null ? response.jobType : '-',
            requestDate:
              response.requestDate !== null
                ? moment(response.requestDate).format('DD/MM/YYYY')
                : '-',
            processingDate:
              response.processingDate !== null
                ? moment(response.processingDate).format('DD/MM/YYYY')
                : '-',
            requesterName: response.requesterName !== null ? response.requesterName : '-',
            notesDescription: response.notesDescription !== null ? response.notesDescription : '-',
            engineerTelephoneNumber:
              response.engineerTelephoneNumber !== null ? response.engineerTelephoneNumber : '',
            linkVideo: response.linkVideo !== null ? response.linkVideo : '',
            partNumber: response.partNumber !== null ? response.partNumber : '',
            installationDate: response.installationDate !== null ? response.installationDate : null,
            picInstall: response.picInstall !== null ? response.picInstall : '',
            brandTypeName: response.brandTypeName !== null ? response.brandTypeName : '',
            stickerId: response.stickerId !== null ? response.stickerId : '',
            version: response.version !== null ? response.version : '',
            photoFrontCimb: response.photoFrontCimb,
            datefrontCimb:
              response.photoFrontCimbUploadDate !== null
                ? 
                moment(response.photoFrontCimbUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoLeftCimb: response.photoLeftCimb,
            dateLeftCimb:
              response.photoLeftCimbUploadDate !== null
                ? 
                moment(response.photoLeftCimbUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoRightCimb: response.photoRightCimb,
            dateRightCimb:
              response.photoRightCimbUploadDate !== null
                ? 
                moment(response.photoRightCimbUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoRearCimb: response.photoRearCimb,
            dateRearCimb:
              response.photoRearCimbUploadDate !== null
                ? 
                moment(response.photoRearCimbUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoFrontVendor: response.photoFrontVendor,
            dateFrontVendor:
              response.photoFrontVendorUploadDate !== null
                ? 
                moment(response.photoFrontVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoLeftVendor: response.photoLeftVendor,
            dateLeftVendor:
              response.photoLeftVendorUploadDate !== null
                ? 
                moment(response.photoLeftVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoRearVendor: response.photoRearVendor,
            dateRearVendor:
              response.photoRearVendorUploadDate !== null
                ? 
                moment(response.photoRearVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoRightVendor: response.photoRightVendor,
            dateRightVendor:
              response.photoRightVendorUploadDate !== null
                ? 
                moment(response.photoRightVendorUploadDate).format(
                  "DD-MM-YYYY, HH:mm"
                )
                : '-',
            photoFLMVendor,
            photoSLMVendor,
            photoList: [],
            vendorDetails: newArrVendorDetails,
          };

          if(response.vendorDetails !== null){
            if(response.vendorDetails.length>0){
              const dataChek = {
                checkedFLM: response.vendorDetails.find(obj => obj.key === "FLM Name")?.value || false,
                checkedSLM: response.vendorDetails.find(obj => obj.key === "SLM Name")?.value || false,
                checkedJarkom: response.vendorDetails.find(obj => obj.key === "Jarkom Name")?.value || false,
                checkedCR: response.vendorDetails.find(obj => obj.key === "CR Name")?.value || false,
                checkedSecurity: response.vendorDetails.find(obj => obj.key === "Security Name")?.value || false,
                checkedPromosi: response.vendorDetails.find(obj => obj.key === "Promosi Name")?.value || false,
                checkedSurvey: response.vendorDetails.find(obj => obj.key === "Survey Name")?.value || false,
                checkedOther: response.vendorDetails.find(obj => obj.key === "Other Name")?.value || false
              };
              // console.log("+++ dataChek",dataChek);
              setDataChecked(dataChek);
            }
          }

          setIsLoading(false);
          setDataBast(dataNew);
        }
      } catch (error) {
        alert(`Error ${error}`);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err) {
      alert(`Error ${err}`);
      setIsLoading(false);
    }
  }

  // FOTO
  useEffect(() => {
    if (photoFront !== '') {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: 'photoFront',
        file: photoFront,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, 'photoList');
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== 'photoFront';
      });
      handleChangeState(newDataList, 'photoList');
    }
  }, [photoFront]);

  useEffect(() => {
    if (photoRight !== '') {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: 'photoRight',
        file: photoRight,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, 'photoList');
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== 'photoRight';
      });
      handleChangeState(newDataList, 'photoList');
    }
  }, [photoRight]);

  useEffect(() => {
    if (photoLeft !== '') {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: 'photoLeft',
        file: photoLeft,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, 'photoList');
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== 'photoLeft';
      });
      handleChangeState(newDataList, 'photoList');
    }
  }, [photoLeft]);

  useEffect(() => {
    console.log('+++ photoRear', JSON.stringify(photoRear));
    if (photoRear !== '') {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: 'photoRear',
        file: photoRear,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, 'photoList');
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== 'photoRear';
      });
      handleChangeState(newDataList, 'photoList');
    }
  }, [photoRear]);

  useEffect(() => {
    if (photoFLM !== '') {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: 'photoFLM',
        file: photoFLM,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, 'photoList');
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== 'photoFLM';
      });
      handleChangeState(newDataList, 'photoList');
    }
  }, [photoFLM]);

  useEffect(() => {
    if (photoSLM !== '') {
      const oldDataList = dataBast.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: 'photoSLM',
        file: photoSLM,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, 'photoList');
    } else {
      const oldDataList = dataBast.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== 'photoSLM';
      });
      handleChangeState(newDataList, 'photoList');
    }
  }, [photoSLM]);

  const handleChangeState = (newVal, attribut) => {
    console.log(`+++ Change State ${attribut} : ${newVal}`);
    setDataBast((prevValue) => {
      return {
        ...prevValue,
        [attribut]: newVal,
      };
    });
  };

  const onSubmitNewBAST = async () => {
    // HANDLE PHOTO FILES
    const photoFront = { path: null, url: null };
    const photoRight = { path: null, url: null };
    const photoLeft = { path: null, url: null };
    const photoRear = { path: null, url: null };

    const photoSLM = { path: null, url: null };
    const photoFLM = { path: null, url: null };

    setModalLoader(true);
    const doUploadPhotos = async (arr) => {
      if (arr.length > 0) {
        setModalLoader(true);
        await Promise.all(
          arr.map(async (item) => {
            const { docKey } = item;

            await doUploadPhoto(item.file)
              .then((res) => {
                console.log('data res', res);
                console.log('docKey', docKey);
                if (res.status === 200) {
                  if (res.data.responseCode === '00') {
                    // eslint-disable-next-line default-case
                    switch (docKey) {
                    case 'photoFront':
                      photoFront.path = res.data.path;
                      break;
                    case 'photoLeft':
                      photoLeft.path = res.data.path;
                      break;
                    case 'photoRight':
                      photoRight.path = res.data.path;
                      break;
                    case 'photoRear':
                      photoRear.path = res.data.path;
                      break;
                    case 'photoSLM':
                      photoSLM.path = res.data.path;
                      break;
                    case 'photoFLM':
                      photoFLM.path = res.data.path;
                      break;
                    }
                  } else {
                    alert(res.data.responseMessage);
                  }
                }
              })
              .catch((err) => {
                alert(`Failed to upload file ${err}`);
                setModalLoader(false);
              });
          })
        );
      }
    };
    await doUploadPhotos(dataBast.photoList);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const dataHit = {
      id,
      taskType: 'maintenance',
      engineerTelephoneNumber: dataBast.engineerTelephoneNumber,
      linkVideo: dataBast.linkVideo,
      photoRearVendor: photoRear.path ? photoRear.path : dataBast.photoRearVendor,
      photoFrontVendor: photoFront.path ? photoFront.path : dataBast.photoFrontVendor,
      photoRightVendor: photoRight.path ? photoRight.path : dataBast.photoRightVendor,
      photoLeftVendor: photoLeft.path ? photoLeft.path : dataBast.photoLeftVendor,
      partNumber: dataBast.partNumber,
      installationDate: dataBast.installationDate,
      picInstall: dataBast.picInstall,
      brandTypeName: dataBast.brandTypeName,
      stickerId: dataBast.stickerId,
      version: dataBast.version,
      vendorDetails: [{
        key: "FLM Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedFLM").phone,
      },
      {
        key: "SLM Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedSLM").phone,
      },
      {
        key: "Jarkom Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedJarkom").phone,
      },
      {
        key: "CR Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedCR").phone,
      },
      {
        key: "Security Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedSecurity").phone,
      },
      {
        key: "Promosi Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedPromosi").phone,
      },
      {
        key: "Survey Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedSurvey").phone,
      },
      {
        key: "Other Telephone Number",
        value: dataBast.vendorDetails.find(values => values.check === "checkedOther").phone,
      },
      {
        key: "FLM Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedFLM").name,
      },
      {
        key: "SLM Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedSLM").name,
      },
      {
        key: "CR Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedCR").name,
      },
      {
        key: "Jarkom Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedJarkom").name,
      },
      {
        key: "Security Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedSecurity").name,
      },
      {
        key: "Survey Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedSurvey").name,
      },
      {
        key: "Promosi Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedPromosi").name,
      },
      {
        key: "Other Name",
        value: dataBast.vendorDetails.find(values => values.check === "checkedOther").name,
      },
      {
        key: 'FLM Signature',
        value: photoFLM.path ? photoFLM.path : dataBast.photoFLMVendor,
      },
      {
        key: 'SLM Signature',
        value: photoSLM.path ? photoSLM.path : dataBast.photoSLMVendor,
      },
      ],
    };
    const result = await Axios.post(
      `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/saveOrUpdateBastTask`,
      dataHit,
      config
    );
    try {
      console.log('AHASIL: ', result);
      if (result.status === 200) {
        setOpenSuccessCreatePopUp(true);
      } else {
        alert(`Save failed data BAST`, result.status);
      }
      setModalLoader(false);
    } catch (error) {
      alert(`Error ${error}`);
      setModalLoader(false);
    }
  };

  const handleChangeDate = (e) => {
    const newDate = new Date(e);
    const milisec = newDate.getTime();
    handleChangeState(milisec, 'installationDate');
  };

  function setAddTextbox(value) {
    const data = {
      checkedFLM: value.checkedFLM,
      checkedSLM: value.checkedSLM,
      checkedJarkom: value.checkedJarkom,
      checkedCR: value.checkedCR,
      checkedSecurity: value.checkedSecurity,
      checkedPromosi: value.checkedPromosi,
      checkedSurvey: value.checkedSurvey,
      checkedOther: value.checkedOther,
    };
    setDataChecked(data);
  }

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label='Back'
          iconPosition='startIcon'
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>BAST Digital</Typography>

        <Grid container style={{ marginTop: 20, marginLeft: 180 }}>
          <Paper className={classes.rootPaper}>
            {isLoading ? (
              <Loading maxheight='100%' />
            ) : (
              <div style={{ padding: 40 }}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <CimbLogo style={{ width: 146, height: 46 }} />
                  </Grid>
                  <Grid item>
                    <div className={classes.backButton}>
                      <PDFDownloadLink
                        document={
                          <BastPdf data={dataBast} dataChecked={dataChecked} />
                        }
                        fileName="BAST_Digital"
                      >
                        {({ loading }) =>
                          loading ? (
                            "loading document..."
                          ) : (
                            <MuiIconLabelButton
                              label="Export To PDF"
                              iconPosition="endIcon"
                              buttonIcon={<ShareIcon />}
                            />
                          )
                        }
                      </PDFDownloadLink>
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={5} style={{ marginTop: 40 }}>
                  <Grid item xs={6}>
                    <Grid container direction='column' spacing={2}>
                      <Grid item>
                        <Typography>
                          {dataBast.noReference !== undefined ? dataBast.noReference : '-'}
                        </Typography>
                        <Typography>
                          {dataBast.letterDate !== undefined ? dataBast.letterDate : '-'}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Kepada Yth :</Typography>
                        <Typography>
                          Bapak/Ibu{' '}
                          {dataBast.nameLandlord !== undefined ? dataBast.nameLandlord : '-'}
                        </Typography>
                        <Typography>
                          Pemilik Pengelola Lokasi{' '}
                          {dataBast.locationName !== undefined ? dataBast.locationName : '-'}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          Perihal : <b>Berita Acara Serah Terima</b>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction='column' spacing={2}>
                      <Grid item>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>ID ATM :</Typography>
                            <Typography>
                              {dataBast.atmId !== undefined ? dataBast.atmId : '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>Lokasi :</Typography>
                            <Typography style={{ wordWrap: 'anywhere' }}>
                              {dataBast.locationName !== undefined ? dataBast.locationName : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>Latitude :</Typography>
                            <Typography style={{wordWrap: "break-word"}}>
                              {dataBast.latitude !== undefined ? dataBast.latitude : '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>Longitude :</Typography>
                            <Typography style={{wordWrap: "break-word"}}>
                              {dataBast.longitude !== undefined ? dataBast.longitude : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>Area :</Typography>
                            <Typography>
                              {dataBast.areaName !== undefined ? dataBast.areaName : '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>Kota :</Typography>
                            <Typography>
                              {dataBast.cityName !== undefined ? dataBast.cityName : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>Alamat :</Typography>
                            <Typography>
                              {dataBast.locationAddress !== undefined
                                ? dataBast.locationAddress
                                : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={5} style={{ marginTop: 40 }}>
                  {/* LEFT */}

                  <Grid item xs={6}>
                    <Grid container direction='column'>

                      <Grid item>
                        <Grid container justify='space-between'>
                          <Grid item>
                            <Typography>Tgl Pekerjaan :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.processingDate !== undefined
                                ? dataBast.processingDate
                                : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container justify='space-between'>
                          <Grid item>
                            <Typography>PIC Pekerjaan:</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.requesterName !== undefined ? dataBast.requesterName : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container justify='space-between'>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 400 }}>No Engineer:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.engineerTelephoneNumber !== undefined ? dataBast.engineerTelephoneNumber : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container justify='space-between' alignItems='center'>
                          <Grid item>
                            <Typography>Vendor Lainnya :</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          style={{ paddingLeft: 10 }}
                        >
                          {dataBast.vendorDetails.map((item, index) => {
                            if (dataChecked[item.check]) {
                              return (
                                <Grid
                                  item
                                  style={{ marginTop: 10, marginBottom: 10 }}
                                >
                                  <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                  >
                                    <Grid item>
                                      <Typography style={{ fontWeight: 600 }}>
                                        {item.key}
                                      </Typography>
                                    </Grid>
                                    <Grid item style={{ marginRight: 20 }}>
                                      <Grid
                                        container
                                        direction="column"
                                        spacing={2}
                                      >
                                        <Grid item>
                                          <Typography style={{ fontWeight: 600 }}>
                                            {item.name}
                                          </Typography>
                                        </Grid>
                                        <Grid item>
                                          <Typography style={{ fontWeight: 600 }}>
                                            {item.phone}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              );
                            }
                          })}
                        </Grid>
                      </Grid>

                    </Grid>
                  </Grid>

                  {/* RIGTH */}
                  <Grid item xs={6}>
                    <Grid container direction='column'>
                      <Grid item>
                        <Grid container justify='space-between'>
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>No Ticket :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.ticketNumber !== undefined ? dataBast.ticketNumber : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container justify='space-between'>
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>ID Location :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.locationId !== undefined ? dataBast.locationId : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container justify='space-between'>
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Nama Lokasi :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.locationName !== undefined ? dataBast.locationName : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container justify='space-between'>
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>ID Mesin :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.idMesin !== undefined ? dataBast.idMesin : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container justify='space-between'>
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Jenis Pekerjaan :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.jobType !== undefined ? dataBast.jobType : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 10 }}>
                        <Grid container justify='space-between'>
                          <Grid item style={{ marginTop: 5 }}>
                            <Typography>Tanggal Request :</Typography>
                          </Grid>
                          <Grid item>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.requestDate !== undefined ? dataBast.requestDate : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 20 }}>
                        <Grid container justify='space-between'>
                          <Grid item xs={4}>
                            <Typography>Keterangan:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600, textAlign: 'right' }}>
                              {dataBast.notesDescription !== undefined
                                ? dataBast.notesDescription
                                : '-'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item style={{ marginTop: 30 }}>
                        <Grid container justify='space-between'>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 400 }}>Link Video :</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ fontWeight: 600 }}>
                              {dataBast.linkVideo !== undefined ? dataBast.linkVideo : "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* FOTO SEBELUM */}
                <div style={{ marginTop: 35 }}>
                  <Typography style={{ fontWeight: 600 }}>Foto Sebelum</Typography>
                </div>

                <Grid container spacing={2} style={{ marginTop: 15 }}>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='depan'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoFrontCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoFrontCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sebelum 1
                          </Typography>
                          <Typography>{dataBast.datefrontCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='kanan'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoRightCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoRightCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sebelum 2
                          </Typography>
                          <Typography>{dataBast.dateRightCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='kiri'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoLeftCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoLeftCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sebelum 3
                          </Typography>
                          <Typography>{dataBast.dateLeftCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='belakang'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoRearCimb ? (
                            <MinioImageComponent
                              filePath={dataBast.photoRearCimb}
                              className={classes.imgContainer}
                            />
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sebelum 4
                          </Typography>
                          <Typography>{dataBast.dateRearCimb}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                </Grid>

                {/* FOTO SESUDAH */}
                <div style={{ marginTop: 35 }}>
                  <Typography style={{ fontWeight: 600 }}>Foto Sesudah</Typography>
                </div>

                <Grid container spacing={2} style={{ marginTop: 15 }}>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='depan'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoFrontVendor ? (
                            <div style={{ position: 'relative' }}>
                              <MinioImageComponent
                                filePath={dataBast.photoFrontVendor}
                                className={classes.imgContainer}
                              />
                            </div>
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sesudah 1
                          </Typography>
                          <Typography>{dataBast.dateFrontVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='kanan'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoRightVendor ? (
                            <div style={{ position: 'relative' }}>
                              <MinioImageComponent
                                filePath={dataBast.photoRightVendor}
                                className={classes.imgContainer}
                              />
                            </div>
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sesudah 2
                          </Typography>
                          <Typography>{dataBast.dateRightVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='kiri'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoLeftVendor ? (
                            <div style={{ position: 'relative' }}>
                              <MinioImageComponent
                                filePath={dataBast.photoLeftVendor}
                                className={classes.imgContainer}
                              />
                            </div>
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sesudah 3
                          </Typography>
                          <Typography>{dataBast.dateLeftVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='belakang'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoRearVendor ? (
                            <div style={{ position: 'relative' }}>
                              <MinioImageComponent
                                filePath={dataBast.photoRearVendor}
                                className={classes.imgContainer}
                              />
                            </div>
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            Sesudah 4
                          </Typography>
                          <Typography>{dataBast.dateRearVendor}</Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                </Grid>

                <div style={{ marginTop: 35 }}>
                  <Typography style={{ fontWeight: 400 }}>
                    Demikian kami sampaikan atas perhatian dan kerjasamanya kami ucapkan terima
                    kasih.
                  </Typography>
                </div>

                <Grid container justifyContent='space-around' style={{ marginTop: 40 }}>
                  <Grid item>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='depan'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoFLMVendor ? (
                            <div style={{ position: 'relative' }}>
                              <MinioImageComponent
                                filePath={dataBast.photoFLMVendor}
                                className={classes.imgContainer}
                              />
                            </div>
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            FLM Vendor
                          </Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box className={classes.imageUploadContainer}>
                      <label
                        htmlFor='kanan'
                        className={classes.imgDefault}
                        style={{ cursor: 'not-allowed' }}
                      >
                        <Grid container direction='column' alignItems='center'>
                          {dataBast.photoSLMVendor ? (
                            <div style={{ position: 'relative' }}>
                              <MinioImageComponent
                                filePath={dataBast.photoSLMVendor}
                                className={classes.imgContainer}
                              />
                            </div>
                          ) : (
                            <img src={NoImage} className={classes.imgContainer} alt='img-depan' />
                          )}
                          <Typography style={{ fontWeight: 600, marginTop: 10 }}>
                            SLM Vendor
                          </Typography>
                        </Grid>
                      </label>
                    </Box>
                  </Grid>
                </Grid>

                {/* Button Container */}
                <Grid container style={{ marginTop: 240 }} justify='space-between'>
                  <Grid item>
                    <Button
                      variant='contained'
                      disableElevation
                      className={classes.secondaryButton}
                      onClick={() => window.location.assign('/vendor-management/orders')}
                      style={{ textTransform: 'capitalize' }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  {/* <Grid item>
                    <Button
                      variant='contained'
                      disableElevation
                      className={classes.primaryButton}
                      onClick={onSubmitNewBAST}
                      style={{ textTransform: 'capitalize' }}
                    >
                      Simpan
                    </Button>
                  </Grid> */}
                </Grid>
              </div>
            )}
          </Paper>
        </Grid>
        <AddNewVendorPopUp
          // eslint-disable-next-line react/jsx-no-bind
          onFilterChecked={setAddTextbox}
          defaultChecked={dataChecked}
          isOpen={isOpenAddVendor}
          onClose={() => setIsOpenAddVendor(false)}
        />
      </div>
      <SuccessPopUp
        isOpen={openSuccessCreatePopUp}
        onClose={() => {
          setOpenSuccessCreatePopUp(false);
          history.goBack();
        }}
        label='Task Berhasil Ditambahkan'
        type='Add'
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

export default BASTDigital;
