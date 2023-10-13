import React, {useState, createRef, useEffect} from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DatePicker, Select } from 'antd';
import moment from "moment";
import { ReactComponent as ExchangeIcon }from '../../../../../assets/icons/siab/camera-icon.svg';
import { ReactComponent as UserIcon } from '../../../../../assets/icons/linear-red/user.svg';
import { ReactComponent as CalendarIcon } from '../../../../../assets/icons/linear-red/calendar.svg';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from '../../common/InputComponent';
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import ErrorComponent from "./ErrorComponent";
import ImageSelector from '../../../../../components/ImageSelector';
import AttachFileSelector from '../../../../../components/AttachFileSelector';
import SelectLeftCustomIcon from '../../../../../components/Selects/SelectLeftCustomIcon';
import { doGetVendors } from "../../../../UserManagement/ApiServicesUser";

const { Option } = Select;

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
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

const typeSugestion = [
  {value: 'Pembuatan FM', name: "Pembuatan FM"},
  {value: 'Pembuatan Wall Sign', name: "Pembuatan Wall Sign"},
  {value: 'Pembuatan Neonbox', name: "Pembuatan Neonbox"},
  {value: 'Pembuatan Sticker Kaca', name: "Pembuatan Sticker Kaca"},
  {value: 'Pembuatan Sticker Mesin', name: "Pembuatan Sticker Mesin"},
  {value: 'Not Request (-)', name: "Not Request (-)"},
];

const dataVendor = [
  {value: 'PT. Royal', name: "PT. Royal"},
  {value: 'PT. Trias', name: "PT. Trias"},
  {value: 'PT. Cakrawala Mitra', name: "PT. Cakrawala Mitra"},
  {value: 'PT. Sarana Usaha Adhi', name: "PT. Sarana Usaha Adhi"},
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, errorForm, onChange } = props;

  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  const [photoFront, setPhotoFront] = useState('');
  const [photoLeft, setPhotoLeft] = useState('');
  const [photoRight, setPhotoRight] = useState('');
  const [photoRear, setPhotoRear] = useState('');

  const [attachment1, setAttachment1] = useState('');
  const [attachment2, setAttachment2] = useState('');
  const [attachment3, setAttachment3] = useState('');

  const dimensiType = [
    {value:'180x90', name:'180x90'},
    {value:'80x60',name:'80x60'},
    {value:'65x40',name:'65x40'}
  ];
  const mesinType =[
    {value:'ATM',name:'ATM'},
    {value:'CRM',name:'CRM'},
    {value:'CDM',name:'CDM'}
  ]

  const handleChangeState = (newVal, state) => {
    // console.log(`+++ ${state}: ${newVal}`);
    onChange(newVal, state);
  };

  // GET OPTION VENDORS
  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

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

  // FOTO
  useEffect(() => {
    if(photoFront !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFront",
        file: photoFront
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoFront';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoFront]);

  useEffect(() => {
    if(photoRight !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRight",
        file: photoRight
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoRight';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoRight]);

  useEffect(() => {
    if(photoLeft !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoLeft",
        file: photoLeft
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoLeft';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoLeft]);

  useEffect(() => {
    // console.log("+++ photoRear", JSON.stringify(photoRear));
    if(photoRear !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRear",
        file: photoRear
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoRear';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoRear]);

  // ATTACHMENT
  useEffect(() => {
    if(attachment1 !== ''){
      const oldDataList = data.documentDtoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentDtoList");
    }else{
      const oldDataList = data.documentDtoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment1';
      });
      handleChangeState(newDataList,"documentDtoList");
    }
  }, [attachment1]);

  useEffect(() => {
    if(attachment2 !== ''){
      const oldDataList = data.documentDtoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment2",
        file: attachment2
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentDtoList");
    }else{
      const oldDataList = data.documentDtoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment2';
      });
      handleChangeState(newDataList,"documentDtoList");
    }
  }, [attachment2]);

  useEffect(() => {
    if(attachment3 !== ''){
      const oldDataList = data.documentDtoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment3",
        file: attachment3
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentDtoList");
    }else{
      const oldDataList = data.documentDtoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'attachment3';
      });
      handleChangeState(newDataList,"documentDtoList");
    }
  }, [attachment3]);

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
                <Typography style={{ fontWeight: 600, color: '#DC241F' }}>Signage</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{paddingLeft: '15px', marginBottom: '20px', width: '92%'}}>
            <SelectLeftCustomIcon
              selectOptionData={typeSugestion}
              selectedValue={data.type}
              onSelectValueChange={(newVal)=>handleChangeState(newVal, 'type')}/>
          </Grid>
          <Grid item style={{paddingLeft: '15px', paddingTop: '15px', marginBottom: '20px', width: '96%'}}>
            <InputBordered
              multiline
              rows={6}
              style={{width: '96%'}}
              // onChange={handleChangeLongText}
              onChange={(e) =>
                handleChangeState(e.target.value, 'description')
              }
              value={data.description}
              placeholder='Notes & Description'
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
                            disabledDate={disabledDate}
                            suffixIcon
                            value={data.dueDate? moment(data.dueDate): ""}
                            onChange={(newDate)=>{
                              let valDate = "";
                              if(newDate === null){
                                valDate = "";
                              }else{
                                valDate = newDate.unix() * 1000;
                              }
                              handleChangeState(valDate, 'dueDate');
                            }}
                            style={{borderRadius: 5, width: '96%', height: '30px', border: '1px solid #fff'}}
                            placeholder='Pilih Tgl Kirim / Tarik'
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                { errorForm.dueDate ? <ErrorComponent label="Required!" /> : null }
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                  </Grid>
                  <Grid item style={{marginTop: '5px', width: '100%'}}>
                    {/* <Paper component="form" className={classes.rootPaperSecond} style={{width: '100%'}}>
                                    <div className={classes.iconButton}>
                                        <UserIcon style={{height: 20, marginLeft: 5}}/>
                                    </div>
                                    <Select className={'CommonSelect__select'}
                                        style={{width: '96%'}}
                                        onChange={(newVal)=>handleChangeState(newVal, 'vendor')}
                                        selectedValue={data.vendor}
                                        placeholder='Pilih PIC / Vendor'
                                        suffixIcon={<AngleDownIcon/>}
                                    >
                                        {dataVendor.map((data) => (
                                        <Option value={data.value} >{data.value}</Option>
                                        ))}
                                    </Select>
                                </Paper> */}
                    {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectLeftCustomIcon
                        leftIcon={<UserIcon style={{height: 20}}/>}
                        selectOptionData={vendorsOption}
                        selectedValue={data.vendor}
                        onSelectValueChange={(newVal)=>handleChangeState(newVal, 'vendor')}/>
                    )}
                    { errorForm.vendor ? <ErrorComponent label="Select one!" /> : null }
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
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Dimensi</Typography>
                  </Grid>
                  <Grid item style={{marginTop: 5}}>
                    {/*<InputBordered
                      style={{width: '85%', height: '24px'}}
                      // onChange={handleATMID}
                      onChange={(e) =>
                        handleChangeState(e.target.value, 'dimensi')
                      }
                      value={data.dimensi}
                      placeholder='Input Dimensi'
                    />*/}
                    <SelectLeftCustomIcon selectOptionData={dimensiType} style={{width:"85%"}} selectedValue={data.dimensi} 
                    onSelectValueChange={(newVal)=>handleChangeState(newVal,'dimensi')}/>
                  </Grid>
                  <Grid item style={{marginTop:'8px'}}>
                    { errorForm.dimensi ? <ErrorComponent label="Required!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Type Mesin</Typography>
                  </Grid>
                  <Grid item style={{marginTop: 5}}>
                    {/*<InputBordered
                      style={{width: '100%', height: '24px'}}
                      onChange={(e) =>
                        handleChangeState(e.target.value, 'typeMesin')
                      }
                      value={data.typeMesin}
                      placeholder='Input Mesin Baru'
                    />*/}
                    <SelectLeftCustomIcon selectOptionData={mesinType} selectedValue={data.typeMesin}
                    onSelectValueChange={(newVal)=>handleChangeState(newVal,'typeMesin')}/>
                  </Grid>
                  <Grid item style={{marginTop:'8px'}}>
                    { errorForm.typeMesin ? <ErrorComponent label="Required!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{paddingLeft: '20px', marginTop: '25px', width: '96%'}}>
            <Grid container spacing={2}>
              <Grid item>
                <ImageSelector title="Depan" onChange={(e)=>setPhotoFront(e.target.files[0])} selectedImage={photoFront} onDelete={()=>setPhotoFront('')} />
              </Grid>
              <Grid item>
                <ImageSelector title="Kanan" onChange={(e)=>setPhotoRight(e.target.files[0])} selectedImage={photoRight} onDelete={()=>setPhotoRight('')} />
              </Grid>
              <Grid item>
                <ImageSelector title="Kiri" onChange={(e)=>setPhotoLeft(e.target.files[0])} selectedImage={photoLeft} onDelete={()=>setPhotoLeft('')} />
              </Grid>
              <Grid item>
                <ImageSelector title="Belakang" onChange={(e)=>setPhotoRear(e.target.files[0])} selectedImage={photoRear} onDelete={()=>setPhotoRear('')} />
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
          <Grid item style={{paddingLeft: '20px', marginTop: '25px', width: '96%'}}>
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

export default LeftComponent;
