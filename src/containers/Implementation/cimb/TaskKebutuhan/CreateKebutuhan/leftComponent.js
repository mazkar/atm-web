import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Paper, Typography, Grid, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DatePicker, Select } from 'antd';
import { withStyles } from "@material-ui/styles";
import ClearIcon from '@material-ui/icons/Clear';
import moment from 'moment';
import Axios from 'axios';
import ExchangeIcon from '../../../../../assets/icons/siab/exchange-alt.png';
import { ReactComponent as DefUploadImageSvg } from "../../../../../assets/icons/general/def_upload.svg";
import { ReactComponent as PaperClipIcon } from '../../../../../assets/icons/linear-red/paperclip.svg';
import { ReactComponent as UserIcon } from '../../../../../assets/icons/linear-red/user.svg';
import { ReactComponent as CalendarIcon } from '../../../../../assets/icons/linear-red/calendar.svg';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from '../KebutuhanEdit/InputComponent';
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import ErrorComponent from "./ErrorComponent";
import ModalLoader from '../../../../../components/ModalLoader';
import ImageSelector from '../../../../../components/ImageSelector';
import AttachFileSelector from '../../../../../components/AttachFileSelector';
import { doGetVendors } from '../../../../UserManagement/ApiServicesUser';
import SelectLeftCustomIcon from '../../../../../components/Selects/SelectItemsIcon';

const { Option } = Select;

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    padding: 30,
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
});

const dataCreateTitle = [
  {id: 0, value: 'Bangunan Baru', nameId: 'Bangunan Baru', nameEn: 'Bangunan Baru'},
  {id: 1, value: 'Renovasi Ruangan', nameId: 'Renovasi Ruangan', nameEn: 'Renovasi Ruangan'},
  {id: 2, value: 'Pemasangan AC', nameId: 'Pemasangan AC', nameEn: 'Pemasangan AC'},
  {id: 3, value: 'Pemasangan KWH & Installasi', nameId: 'Pemasangan KWH & Installasi', nameEn: 'Pemasangan KWH & Installasi'},
  {id: 4, value: 'Not Request', nameId: 'Not Request', nameEn: 'Not Request'},
];

const dataVendor = [
  {id: 0, value: 'PT. Royal', nameId: 'PT. Royal', nameEn: 'PT. Royal'},
  {id: 1, value: 'PT. Trias', nameId: 'PT. Trias', nameEn: 'PT. Trias'},
  {id: 2, value: 'PT. Cakrawala Mitra', nameId: 'PT. Cakrawala Mitra', nameEn: 'PT. Cakrawala Mitra'},
  {id: 3, value: 'PT. Sarana Usaha Adhi', nameId: 'PT. Sarana Usaha Adhi', nameEn: 'PT. Sarana Usaha Adhi'},
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, errorForm, onChange } = props;
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");

  const [value, setValue] = useState('Pemasangan AC');
  const [valueLongText, setValueLongText] = useState('');
  const [valueVendor, setValueVendor] = useState('PT. Royal');
  const [photoDepan, setPhotoDepan] = useState('');
  const [photoKanan, setPhotoKanan] = useState('');
  const [photoKiri, setPhotoKiri] = useState('');
  const [photoBelakang, setPhotoBelakang] = useState('');
  const [attachment1, setAttachment1] = useState('');
  const [attachment2, setAttachment2] = useState('');
  const [attachment3, setAttachment3] = useState('');
  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }
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

  const handleChangeLongText = (e) => {
    console.log(e);
    setValueLongText(e);
    handleChangeKebutuhan(e.target.value, 'description');
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  // GET OPTION VENDORS
  useEffect(() => {
    doGetVendors(loadVendorsHandler).then(response=>{
      // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
      if(response?.length > 0){
        const options = [{value: '-', name: "-Pilih Vendor-"}];
        response.map((item)=>{
          const newObj = {value: item.id, name: item.name};
          options.push(newObj);
        });
        setVendorsOption(options);
      }
    });
  }, []);

  // PHOTOS
  useEffect(() => {
    if(photoDepan !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFront",
        file: photoDepan
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoFront';
      });
      handleChangeKebutuhan(newDataList, "photoList");
    }
  }, [photoDepan]);

  useEffect(() => {
    if(photoKanan !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRight",
        file: photoKanan
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoRight';
      });
      handleChangeKebutuhan(newDataList,"photoList");
    }
  }, [photoKanan]);

  useEffect(() => {
    if(photoKiri !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoLeft",
        file: photoKiri
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoLeft';
      });
      handleChangeKebutuhan(newDataList,"photoList");
    }
  }, [photoKiri]);

  useEffect(() => {
    if(photoBelakang !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRear",
        file: photoBelakang
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoRear';
      });
      handleChangeKebutuhan(newDataList,"photoList");
    }
  }, [photoBelakang]);

  const handleChangeDate = (e) => {
    const newDate = new Date(e);
    const milisec = newDate.getTime();
    console.log(e);
    // handleChangeKebutuhan(e.format('DD MMMM YYYY'), 'date')
    handleChangeKebutuhan(milisec, 'date');
  };

  // ATTACHMENTS
  useEffect(() => {
    if(attachment1 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList, "documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment1';
      });
      handleChangeKebutuhan(newDataList, "documentList");
    }
  }, [attachment1]);

  useEffect(() => {
    if(attachment2 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment2",
        file: attachment2
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList, "documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment2';
      });
      handleChangeKebutuhan(newDataList, "documentList");
    }
  }, [attachment2]);

  useEffect(() => {
    if(attachment3 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment3",
        file: attachment3
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList, "documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment3';
      });
      handleChangeKebutuhan(newDataList, "documentList");
    }
  }, [attachment3]);

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid container direction='column' spacing={3} style={{width: '96%'}}>
          <Grid item>
            <Grid container direction='row'>
              <Grid item style={{ padding: '2px 7px' }}>
                <img src={ExchangeIcon} alt="icon"/>
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, fontSize: 20, color: '#DC241F' }}>
                  {openingType !=="Termin" ? "Kebutuhan":"Perapihan Ruangan"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Select className="CommonSelect__select--bordered #BCC8E7"
              onChange={handleChange}
              style={{width: '100%'}}
              placeholder='Task Title'
              suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
            >
              {dataCreateTitle.map((data) => (
                <Option key={data.id} value={data.value} >{data.value}</Option>
              ))}
            </Select>
            { errorForm.category ? <ErrorComponent label="Select one!" /> : null }
          </Grid>

          <Grid item>
            <InputBordered
              multiline
              rows={4}
              onChange={handleChangeLongText}
              style={{width: '100%', height: 76}}
              placeholder='Notes & Description'
            />
            { errorForm.description ? <ErrorComponent label="Required!" /> : null }
          </Grid>

          <Grid item>
            <Grid container direction='row'>
              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due date</Typography>
                  </Grid>
                  <Grid item style={{paddingTop: '5px'}}>
                    <Paper component="form" className={classes.rootPaperSecond} style={{width: '85%'}}>
                      <div className={classes.iconButton}>
                        <CalendarIcon style={{height: 20, marginLeft: 5}}/>
                      </div>
                      <DatePicker
                        suffixIcon
                        disabledDate={disabledDate}
                        onChange={handleChangeDate}
                        style={{borderRadius: 5, width: '89%', height: '30px', border: '1px solid #fff'}}
                        placeholder='Choose Due Date'
                      />
                    </Paper>
                  </Grid>
                </Grid>
                { errorForm.date ? <ErrorComponent label="Required!" /> : null }
              </Grid>

              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                  </Grid>
                  <Grid item style={{paddingTop: '5px', width: '100%'}}>
                    {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectLeftCustomIcon
                        leftIcon={<UserIcon style={{height: 20}}/>}
                        selectOptionData={vendorsOption}
                        selectedValue={data.picVendor}
                        onSelectValueChange={(newVal)=>{
                          setValueVendor(newVal);
                          handleChangeKebutuhan(newVal, 'picVendor');}
                        }/>
                    )}
                  </Grid>
                </Grid>
                { errorForm.picVendor ? <ErrorComponent label="Select one!" /> : null }
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <ImageSelector title="Depan" onChange={(e)=>setPhotoDepan(e.target.files[0])} selectedImage={photoDepan} onDelete={()=>setPhotoDepan('')} />
              </Grid>
              <Grid item>
                <ImageSelector title="Kanan" onChange={(e)=>setPhotoKanan(e.target.files[0])} selectedImage={photoKanan} onDelete={()=>setPhotoKanan('')} />
              </Grid>
              <Grid item>
                <ImageSelector title="Kiri" onChange={(e)=>setPhotoKiri(e.target.files[0])} selectedImage={photoKiri} onDelete={()=>setPhotoKiri('')} />
              </Grid>
              <Grid item>
                <ImageSelector title="Belakang" onChange={(e)=>setPhotoBelakang(e.target.files[0])} selectedImage={photoBelakang} onDelete={()=>setPhotoBelakang('')} />
              </Grid>
            </Grid>
            <Typography
              style={{
                fontSize: '12px',
                lineHeight: '14px',
                color: Colors.GrayHard,
                marginTop: 10,
              }}
            >
                    *Tolong upload foto sesuai dengan keterangan yang tersedia
            </Typography>
          </Grid>

          <Grid item>
            <AttachFileSelector title="Attachment 1" refId="attachmet1" onChange={(e)=>setAttachment1(e.target.files[0])} selectedFile={attachment1} onDelete={()=>setAttachment1('')} />
            <AttachFileSelector title="Attachment 2" refId="attachmet2" onChange={(e)=>setAttachment2(e.target.files[0])} selectedFile={attachment2} onDelete={()=>setAttachment2('')} />
            <AttachFileSelector title="Attachment 3" refId="attachmet3" onChange={(e)=>setAttachment3(e.target.files[0])} selectedFile={attachment3} onDelete={()=>setAttachment3('')} />
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
}

export default LeftComponent;
