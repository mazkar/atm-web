/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Box, IconButton } from '@material-ui/core';
import { DatePicker } from 'antd';
import moment from "moment";
import "moment/locale/id";
import locale from 'antd/es/date-picker/locale/id_ID';
import DeleteIcon from "@material-ui/icons/Delete";
import { ReactComponent as IconTitle } from '../../../../../assets/icons/siab/camera-icon.svg'; 
import { ReactComponent as CalendarIcon } from '../../../../../assets/icons/linear-red/calendar.svg';
import { ReactComponent as UserIcon } from '../../../../../assets/icons/general/user_red.svg';
import { ChkyInputSmall } from '../../../../../components';
import * as Colors from '../../../../../assets/theme/colors';
import SelectLeftCustomIcon from '../../../../../components/Selects/SelectLeftCustomIcon';
import ErrorComponent from "../../common/ErrorComponent";
import ImageSelector from '../../../../../components/ImageSelector';
import MinioImageComponent from '../../../../../components/MinioImageComponent';
import AttachFileSelector from '../../../../../components/AttachFileSelector';
import { doGetVendors } from "../../../../UserManagement/ApiServicesUser";
import MinioDocComponent from '../../../../../components/MinioDocComponent';

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    padding: 25,
  },
  datePicker: {
    borderRadius: 6,
    height: '40px',
    border: '1px solid #BCC8E7',
  },
  iconButton: {
    padding: '0px 5px',
    color: Colors.GrayMedium,
    display: 'flex',
    alignItems: 'center'
  },
  uploadFile: {
    cursor: "pointer",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -65,
    color: "#DC241F",
  },
  deleteFile: {
    marginLeft: 10,
    color: "#DC241F",
  },
  deleteFilePhoto: {
    position: "absolute",
    right: -10,
    top: -10,
    color: "#DC241F",
  },
  imgContainer: {
    borderRadius: 10,
    width: 80, 
    height: 85,
  }
});

const typeSugestion = [
  {value: 'Pembuatan FM', name: "Pembuatan FM"},
  {value: 'Pembuatan Wall Sign', name: "Pembuatan Wall Sign"},
  {value: 'Pembuatan Neonbox', name: "Pembuatan Neonbox"},
  {value: 'Pembuatan Sticker Kaca', name: "Pembuatan Sticker Kaca"},
  {value: 'Pembuatan Sticker Mesin', name: "Pembuatan Sticker Mesin"},
  {value: 'Not Request (-)', name: "Not Request (-)"},
];

const vendorSugestion = [
  {value: 'PT. Royal', name: "PT. Royal"},
  {value: 'PT. Trias', name: "PT. Trias"},
  {value: 'PT. Cakrawala Mitra', name: "PT. Cakrawala Mitra"},
  {value: 'PT. Sarana Usaha Adhi', name: "PT. Sarana Usaha Adhi"},
];

const boothSugestion = [
  {value: 'Booth Standar', name: "Booth Standar"},
  {value: 'Booth Custom', name: "Booth Custom"},
  {value: 'Tanpa Booth', name: "Tanpa Booth"},
];

function LeftComponent(props) {
  const classes = useStyles();
  const {data, errorForm, onChange} = props;

  const [attachment1, setAttachment1] = useState('');
  const [attachment2, setAttachment2] = useState('');
  const [attachment3, setAttachment3] = useState('');

  const [photoFront, setPhotoFront] = useState('');
  const [photoLeft, setPhotoLeft] = useState('');
  const [photoRight, setPhotoRight] = useState('');
  const [photoRear, setPhotoRear] = useState('');

  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

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

  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }

  const handleChangeState = (newVal, state) => {
    // console.log(`+++ ${state}: ${newVal}`);
    onChange(newVal, state);
  };
  
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
        
    <Paper className={classes.rootPaper}>
      <Grid container direction='column' spacing={2} style={{paddingBottom: '15px', paddingRight: 70}}>
        <Grid item>
          <Grid container direction='row'>
            <Grid item style={{ padding: '2px 7px' }}>
              <IconTitle/>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600, color: '#DC241F', fontSize: 20 }}>Signage</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <SelectLeftCustomIcon
            selectOptionData={typeSugestion}
            selectedValue={data.taskTitle}
            onSelectValueChange={(newVal)=>handleChangeState(newVal, 'taskTitle')}/>
        </Grid>
        <Grid item>
          <ChkyInputSmall
            multiline
            rows={3}
            placeholder="Free text input"
            fullWidth
            onChange={(e) =>
              handleChangeState(e.target.value, 'notesDescription')
            }
            value={data.notesDescription}
          />
          { errorForm.note ? <ErrorComponent label="This Field is Required!" /> : null }
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due Date</Typography>
                </Grid>
                <Grid item>
                  <DatePicker 
                    locale={locale} 
                    suffixIcon={<CalendarIcon style={{height: 20, position: 'absolute', top: 0, left: -25}}/>}
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
                  {/* <SelectLeftCustomIcon 
                    leftIcon={<UserIcon style={{height: 20}}/>}
                    selectOptionData={vendorSugestion}
                    selectedValue={data.picVendor}
                    onSelectValueChange={(newVal)=>handleChangeState(newVal, 'picVendor')}/> */}
                  {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                    <SelectLeftCustomIcon
                      leftIcon={<UserIcon style={{height: 20}}/>}
                      selectOptionData={vendorsOption}
                      selectedValue={data.picVendorId}
                      onSelectValueChange={(newVal)=>handleChangeState(newVal, 'picVendorId')}/>
                  )}
                  { errorForm.picVendorId ? <ErrorComponent label="Select one!" /> : null }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Dimensi</Typography>
                </Grid>
                <Grid item>
                  {/*<ChkyInputSmall
                    inputProps={{
                      style: {padding: "9px 15px"}
                    }}
                    placeholder="Input Dimensi"
                    fullWidth
                    onChange={(e) =>
                      handleChangeState(e.target.value, 'dimensi')
                    }
                    value={data.dimensi}
                  />
                  { errorForm.dimensi ? <ErrorComponent label="This Field is Required!" /> : null }*/}
                   <SelectLeftCustomIcon selectOptionData={dimensiType} selectedValue={data.dimensi} 
                    onSelectValueChange={(newVal)=>handleChangeState(newVal,'dimensi')}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Type Mesin</Typography>
                </Grid>
                <Grid item>
                  {/*<ChkyInputSmall
                    inputProps={{
                      style: {padding: "9px 15px"}
                    }}
                    placeholder="Input Tipe Mesin"
                    fullWidth
                    onChange={(e) =>
                      handleChangeState(e.target.value, 'machineType')
                    }
                    value={data.machineType}
                  />
                  { errorForm.machineType ? <ErrorComponent label="This Field is Required!" /> : null }*/}
                   <SelectLeftCustomIcon selectOptionData={mesinType} selectedValue={data.machineType}
                    onSelectValueChange={(newVal)=>handleChangeState(newVal,'machineType')}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{paddingLeft: '20px', marginTop: '25px', width: '96%'}}>
          <Grid container spacing={2}>
            <Grid item>
              {data.photoFront ? (
                <div style={{position: "relative"}}>
                  <MinioImageComponent filePath={data.photoFront} className={classes.imgContainer}/>
                  <IconButton
                    className={classes.deleteFilePhoto}
                    onClick={() => {
                      handleChangeState(null,"photoFront");
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ): (<ImageSelector title="Depan" onChange={(e)=>setPhotoFront(e.target.files[0])} selectedImage={photoFront} onDelete={()=>setPhotoFront('')} />
              )}
            </Grid>
            <Grid item>
              {data.photoRight ? (
                <div style={{position: "relative"}}>
                  <MinioImageComponent filePath={data.photoRight} className={classes.imgContainer}/>
                  <IconButton
                    className={classes.deleteFilePhoto}
                    onClick={() => {
                      handleChangeState(null,"photoRight");
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ): (<ImageSelector title="Kanan" onChange={(e)=>setPhotoRight(e.target.files[0])} selectedImage={photoRight} onDelete={()=>setPhotoRight('')} />
              )}
            </Grid>
            <Grid item>
              {data.photoLeft ? (
                <div style={{position: "relative"}}>
                  <MinioImageComponent filePath={data.photoLeft} className={classes.imgContainer}/>
                  <IconButton
                    className={classes.deleteFilePhoto}
                    onClick={() => {
                      handleChangeState(null,"photoLeft");
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ): (<ImageSelector title="Kiri" onChange={(e)=>setPhotoLeft(e.target.files[0])} selectedImage={photoLeft} onDelete={()=>setPhotoLeft('')} />
              )}
            </Grid>
            <Grid item>
              {data.photoRear ? (
                <div style={{position: "relative"}}>
                  <MinioImageComponent filePath={data.photoRear} className={classes.imgContainer}/>
                  <IconButton
                    className={classes.deleteFilePhoto}
                    onClick={() => {
                      handleChangeState(null,"photoRear");
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ): (<ImageSelector title="Belakang" onChange={(e)=>setPhotoRear(e.target.files[0])} selectedImage={photoRear} onDelete={()=>setPhotoRear('')} />
              )}
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
          {data.cimbAttachment.length > 0 && 
            data.cimbAttachment.map((item, index)=>{
              const currentIndex = index;
              return(
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MinioDocComponent filePath={item.path}/>
                  <IconButton
                    className={classes.deleteFile}
                    onClick={() => {
                      const oldArr = data.cimbAttachment.slice();
                      const newArr = oldArr.filter(function(itemOld, i) {
                        return i !== currentIndex;
                      });
                      // console.log("+++ newArr",newArr);
                      handleChangeState(newArr,"cimbAttachment");
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              );
            })}
          {data.cimbAttachment.length < 1 && (
            <AttachFileSelector title="Attachment 1" refId="attachmet1" onChange={(e)=>setAttachment1(e.target.files[0])} selectedFile={attachment1} onDelete={()=>setAttachment1('')} />
          ) }

          {data.cimbAttachment.length < 2 && (
            <AttachFileSelector title="Attachment 2" refId="attachmet2" onChange={(e)=>setAttachment2(e.target.files[0])} selectedFile={attachment2} onDelete={()=>setAttachment2('')} />
          )}
    
          {data.cimbAttachment.length < 3 && (
            <AttachFileSelector title="Attachment 3" refId="attachmet3" onChange={(e)=>setAttachment3(e.target.files[0])} selectedFile={attachment3} onDelete={()=>setAttachment3('')} />
          )}
        </Grid>
            
      </Grid>
    </Paper>
  );
}

LeftComponent.propTypes = {
  data: PropTypes.object.isRequired,
  errorForm: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LeftComponent;