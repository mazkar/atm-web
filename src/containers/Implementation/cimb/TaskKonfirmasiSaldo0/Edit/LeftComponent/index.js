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
import { ReactComponent as IconTitle } from '../../../../../../assets/icons/duotone-red/store.svg'; 
import { ReactComponent as CalendarIcon } from '../../../../../../assets/icons/linear-red/calendar.svg';
import { ReactComponent as UserIcon } from '../../../../../../assets/icons/general/user_red.svg';
import { ReactComponent as FileIcon } from "../../../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as IconKonfirmasiSaldo0 } from "../../../../../../assets/icons/task/konfirmasiSaldo0Red.svg";
import { ChkyInputSmall } from '../../../../../../components';
import * as Colors from '../../../../../../assets/theme/colors';
import SelectLeftCustomIcon from '../../../../../../components/Selects/SelectLeftCustomIcon';
import DoubleSelector from '../../../../../../components/Selects/DoubleSelector';
import ErrorComponent from "../../../common/ErrorComponent";
import UploadFoto from "../../../common/UploadFoto";
import AttachFileSelector from '../../../../../../components/AttachFileSelector';
import ImageSelector from '../../../../../../components/ImageSelector';
import MinioDocComponent from '../../../../../../components/MinioDocComponent';
import MinioImageComponent from '../../../../../../components/MinioImageComponent';
import { doGetVendors } from '../../../../../UserManagement/ApiServicesUser';
import InputBorderedAll from '../../../common/InputComponent';

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
  {value: 'Pengadaan Booth', name: "Pengadaan Booth"},
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

  const [photoFront, setPhotoFront] = useState('');
  const [photoLeft, setPhotoLeft] = useState('');
  const [photoRight, setPhotoRight] = useState('');
  const [photoRear, setPhotoRear] = useState('');

  const handleChangeState = (newVal, state) => {
    // console.log(`+++ ${state}: ${newVal}`);
    onChange(newVal, state);
  };

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
    console.log("+++ photoRear", JSON.stringify(photoRear));
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

  return (
        
    <Paper className={classes.rootPaper}>
      <Grid container direction='column' spacing={2} style={{paddingBottom: '15px', paddingRight: 70}}>
        <Grid item>
          <Grid container direction='row'>
            <Grid item style={{ padding: '2px 7px' }}>
              <IconKonfirmasiSaldo0 />
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600, color: '#DC241F', fontSize: 20 }}>
                Konfirmasi Saldo 0
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <InputBorderedAll
            style={{ width: "96%", height: "24px" }}
            placeholder="Input ID Baru"
            value={data.type}
            disabled
          />
        </Grid>
        <Grid item>
          <ChkyInputSmall
            multiline
            rows={3}
            placeholder="Free text input"
            fullWidth
            onChange={(e) =>
              handleChangeState(e.target.value, 'note')
            }
            value={data.note}
          />
          { errorForm.note ? <ErrorComponent label="This Field is Required!" /> : null }
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Tanggal Check</Typography>
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

