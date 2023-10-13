import React, {useState, useEffect} from 'react';
import { Paper, Typography, Grid, IconButton, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Select, DatePicker } from 'antd';
import { withStyles } from "@material-ui/styles";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import ExchangeIcon from '../../../../../assets/icons/siab/exchange-alt.png';
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import { ReactComponent as CalendarIcon } from '../../../../../assets/icons/linear-red/calendar.svg';
import { ReactComponent as UserIcon } from '../../../../../assets/icons/linear-red/user.svg';
import * as Colors from '../../../../../assets/theme/colors';
import InputBordered from './InputComponent';
import ErrorComponent from "../CreateKebutuhan/ErrorComponent";
import AttachFileSelector from '../../../../../components/AttachFileSelector';
import ImageSelector from '../../../../../components/ImageSelector';
import MinioDocComponent from '../../../../../components/MinioDocComponent';
import MinioImageComponent from '../../../../../components/MinioImageComponent';
import { doGetVendors } from '../../../../UserManagement/ApiServicesUser';
import SelectLeftCustomIcon from '../../../../../components/Selects/SelectItemsIcon';

const { Option } = Select;

const useStyles = makeStyles({
  rootPaper: {
    width: '100%',
    minHeight: '550px',
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
    width: '850px',
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
  selectRegion: {
    paddingTop: '10px',
    "& .ant-select-single:not(.ant-select-customize-input) .ant-select-selector": {
      height: 39,
      border: `1px solid #BCC8E7`,
    },
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: 4,
    },
  },
  attachment: {
    fontWeight: 500, 
    fontFamily: 'Barlow', 
    cursor: 'pointer',
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
  inputMaterial: {
    width: '96%', 
    "& .MuiInputBase-input.Mui-disabled": {
      opacity: 1,
      cursor: 'not-allowed',
      backgroundColor: '#FFFF',
      border: '1px solid #F4F7FB',
    },
  },
  coloredText: {
    textAlign: "center",
    width: "max-content",
    height: "35px",
    padding: '5px 10px 5px 10px',
    cursor: 'pointer', 
    backgroundColor: '#F4F7FB',
    borderRadius: 12
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
  selectKonvenBlue: {
    "& .ant-select.ant-select-single .ant-select-selector": {
      paddingTop: '5px',
      height: '41px',
      border: '1px solid #BCC8E7',
      backgroundColor: "#FFFF",
      color: "#2B2F3C",
      borderRadius: 6
    }
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

const dataTitleKebutuhan = [
  {id: 0, value: 'Bangunan Baru', nameId: 'Bangunan Baru', nameEn: 'Bangunan Baru'},
  {id: 1, value: 'Renovasi Ruangan', nameId: 'Renovasi Ruangan', nameEn: 'Renovasi Ruangan'},
  {id: 2, value: 'Pemasangan AC', nameId: 'Pemasangan AC', nameEn: 'Pemasangan AC'},
  {id: 3, value: 'Pemasangan KWH & Installasi', nameId: 'Pemasangan KWH & Installasi', nameEn: 'Pemasangan KWH & Installasi'},
  {id: 4, value: 'Not Request (-)', nameId: 'Not Request (-)', nameEn: 'Not Request (-)'},
];

const dataVendor = [
  {id: 0, value: 'PT. Royal', nameId: 'PT. Royal', nameEn: 'PT. Royal'},
  {id: 1, value: 'PT. Trias', nameId: 'PT. Trias', nameEn: 'PT. Trias'},
  {id: 2, value: 'PT. Cakrawala Mitra', nameId: 'PT. Cakrawala Mitra', nameEn: 'PT. Cakrawala Mitra'},
  {id: 3, value: 'PT. Sarana Usaha Adhi', nameId: 'PT. Sarana Usaha Adhi', nameEn: 'PT. Sarana Usaha Adhi'},
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, isEdit, errorForm, onChange } = props;
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");

  const [value, setValue] = useState(data.category);
  const [valueLongText, setValueLongText] = useState(data.description);
  const [valueVendor, setValueVendor] = useState(data.picVendor);
  const [dateValue, setDateValue] = useState(null);

  const [attachment1, setAttachment1] = useState('');
  const [attachment2, setAttachment2] = useState('');
  const [attachment3, setAttachment3] = useState('');

  const [photoFront, setPhotoFront] = useState('');
  const [photoLeft, setPhotoLeft] = useState('');
  const [photoRight, setPhotoRight] = useState('');
  const [photoRear, setPhotoRear] = useState('');

  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }

  const handleChangeKebutuhan = (newVal, state) => {
    onChange(newVal, state);
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

  useEffect(() => {
    if(photoFront !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFront",
        file: photoFront
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoFront';
      });
      handleChangeKebutuhan(newDataList,"photoList");
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
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoRight';
      });
      handleChangeKebutuhan(newDataList,"photoList");
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
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoLeft';
      });
      handleChangeKebutuhan(newDataList,"photoList");
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
      handleChangeKebutuhan(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'photoRear';
      });
      handleChangeKebutuhan(newDataList,"photoList");
    }
  }, [photoRear]);

  const handleChange = (e) => {
    console.log(e);
    handleChangeKebutuhan(e, 'category');
    setValue(e);
  };

  const handleChangeLongText = (e) => {
    console.log(e);
    setValueLongText(e.target.value);
    handleChangeKebutuhan(e.target.value, 'description');
  };

  const handleChangeDate = (e) => {
    // console.log(e);
    // setDateValue(e.format('DD MMMM YYYY'));
    // handleChangeKebutuhan(e.format('DD MMMM YYYY'), 'date');
    const newDate = new Date(e);
    const milisec = newDate.getTime();
    // console.log(e);
    // handleChangeKebutuhan(e.format('DD MMMM YYYY'), 'date')
    handleChangeKebutuhan(milisec, 'date');
  };

  useEffect(() => {
    if(attachment1 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1
      };
      newDataList.push(newObj);
      handleChangeKebutuhan(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment1';
      });
      handleChangeKebutuhan(newDataList,"documentList");
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
      handleChangeKebutuhan(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment2';
      });
      handleChangeKebutuhan(newDataList,"documentList");
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
      handleChangeKebutuhan(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment3';
      });
      handleChangeKebutuhan(newDataList,"documentList");
    }
  }, [attachment3]);

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid container direction='column' style={{paddingBottom: '15px'}}>

          <Grid item>
            <Grid container direction='row' style={{padding: '15px 5px 15px 15px'}}>
              <Grid item style={{ padding: '2px 7px' }}>
                <img src={ExchangeIcon} />
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, fontSize: 20, color: '#DC241F' }}>
                  {openingType !=="Termin" ? "Kebutuhan":"Perapihan Ruangan"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginBottom: '20px', width: '96%'}} className={classes.selectKonvenBlue}>
            <Select 
              className="CommonSelect__select--bordered #BCC8E7"
              style={{width: '96%'}}
              // defaultValue={data.category}
              value={data.category}
              onChange={handleChange}
              suffixIcon={<AngleDownIcon className="CommonSelect__select-icon" />}
              placeholder='Task Title'
            >
              {dataTitleKebutuhan.map((item) => (
                <Option key={item.id} value={item.value} >{item.value}</Option>
              ))}
            </Select>
            { errorForm.category ? <ErrorComponent label="Select one!" /> : null }
          </Grid>

          <Grid item style={{paddingLeft: '20px', paddingTop: '15px', marginBottom: '20px', width: '96%'}}>
            <InputBordered
              multiline
              rows={4}
              onChange={handleChangeLongText}
              style={{width: '100%', height: 76}}
              value={data.description}
              placeholder='Notes & Description'
            />
            { errorForm.description ? <ErrorComponent label="Required!" /> : null }
          </Grid>

          <Grid item style={{paddingLeft: '20px', marginTop: '5px', marginBottom: '20px', width: '100%'}}>
            <Grid container direction='row'>
              <Grid item xs={6}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due date</Typography>
                  </Grid>
                  <Grid item style={{marginTop: isEdit ? '10px' : '17px'}}>
                    <Paper component="form" className={classes.rootPaperSecond} style={{width: '85%'}}>
                      <div className={classes.iconButton}>
                        <CalendarIcon style={{height: 20, marginLeft: 5}}/>
                      </div>
                      <DatePicker 
                        suffixIcon 
                        onChange={handleChangeDate}
                        value={moment(data.date)}
                        allowClear={false}
                        style={{borderRadius: 5, width: '96%', height: '30px', border: '1px solid #fff'}} 
                        placeholder='Pilih Tgl Kirim / Tarik'
                      />
                    </Paper>
                  </Grid>
                </Grid>
                { errorForm.date ? <ErrorComponent label="Required!" /> : null }
              </Grid>
                        
              <Grid item xs={5}>
                <Grid container direction='column'>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                  </Grid>
                  <Grid item style={{paddingTop: 17, width: '100%'}}>
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
              </Grid>
            </Grid>
            { errorForm.picVendor ? <ErrorComponent label="Required!" /> : null }
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
                        handleChangeKebutuhan(null,"photoFront");
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
                        handleChangeKebutuhan(null,"photoRight");
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
                        handleChangeKebutuhan(null,"photoLeft");
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
                        handleChangeKebutuhan(null,"photoRear");
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

          {/* Attachment CIMB */}
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
                                  handleChangeKebutuhan(newArr,"cimbAttachment");
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