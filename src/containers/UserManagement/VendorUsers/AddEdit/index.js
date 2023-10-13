import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Button, Switch, IconButton } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Input } from 'antd';
import DeleteIcon from "@material-ui/icons/Delete";
import { doGetVendors, doAddEditUser, doFetchDetailUser } from '../../ApiServicesUser';
import constants from '../../../../helpers/constants';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import SelectLeftCustomIcon from '../../../../components/Selects/SelectItemsIcon';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import ModalLoader from '../../../../components/ModalLoader';
import ImageSelector from '../../../../components/ImageSelector';
import { doUploadPhoto } from '../../../Implementation/ApiServiceImplementation';
import MinioImageComponent from '../../../../components/MinioImageComponent';
import ChangePassword from '../../../../components/ChangePassword';
import PopupSucces from '../../../../components/PopupSucces';

const useStyles = makeStyles({
  root: {
    padding: '0px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
  },
  title: {
    margin: 10,
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: constants.color.dark,
  },
  backButton: {
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red'
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
    },
  },
  containerContent: {
    '& .MuiPaper-elevation1': {
      boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
  },
  userTitle: {
    marginBottom: 30,
    fontFamily: 'Barlow',
    fontWeight: 500,
    fontSize: 24,
    color: constants.color.dark,
  },
  buttonContainer: {
    marginTop: 25,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 72,
    height: 40,
    marginRight: 25,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
    marginLeft: 25,
  },
  inputForm: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    border: '1px solid #BCC8E7',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputArea: {
    paddingLeft: 10,
    width: "100%",
    height: 300,
    borderRadius: 0,
    border: '1px solid #BCC8E7',
    overflow: 'scroll',
    float: 'left',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
});
  
const RedSwitch = withStyles({
  switchBase: {
    color: red[300],
    '&$checked': {
      color: red[500],
    },
    '&$checked + $track': {
      backgroundColor: red[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const Mandatory = () =>{
  return (
    <Typography style={{fontSize: 13, color: "#DC241F"}}>*mandatory</Typography>
  );
};

function AddEdit(props) {
  const {formType = "add"} = props;
  const classes = useStyles();
  const history = useHistory();
  // get id from uri
  const { userId } = useParams();
  // INIT STATE
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadVendors, setIsLoadVendors] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [vendor, setVendor] = useState('-');
  const [vendorRole, setVendorRole] = useState(null);
  const [phone, setPhone] = useState('');
  const [photoProfil, setPhotoProfil] = useState('');
  const [photoProfilRes, setPhotoProfilRes] = useState(null);
  const [userStatus, setUserStatus] = useState(true);
  const [vendorSugestion, setVendorSugestion] = useState([{value: '-', name: "-Pilih Vendor-", roleId: null}]);

  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)

  function loadDataHandler(bool){
    setIsLoading(bool);
  }
  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }
  function handleChangeVendor(newVal){
    setVendor(newVal);
    const selectedVendorRole = vendorSugestion.find(x => x.value === newVal).roleId;
    console.log("+++ selectedVendorRole",selectedVendorRole);
    setVendorRole(selectedVendorRole);
  }
  useEffect(() => {
    doGetVendors(loadVendorsHandler).then(response=>{
      console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
      if(response?.length > 0){
        const options = [{value: '-', name: "-Pilih Vendor-", roleId: null}];
        response.map((item)=>{
          const newObj = {value: item.id, name: item.name, roleId: item.roleId};
          options.push(newObj);
        });
        setVendorSugestion(options);
      }
    });
    if(formType==="edit"){
      doFetchDetailUser(loadDataHandler, userId).then(response=>{
        console.log(">>>> doFetchDetailUser :", JSON.stringify(response));
        if(response){
          setFullname(response.fullName);
          setEmail(response.email);
          setVendor(response.vendorId);
          setVendorRole(response.roleId);
          setPhone(response.phoneNumber);
          setPhotoProfilRes(response.photoProfile);
          setUserStatus(response.status);
        }
      });
    }

  }, []);
  
  useEffect(() => {
    console.log("+++ vendorSugestion", vendorSugestion);
  }, [vendorSugestion]);
  const handleSave = async() => {
    let emptyField = 0;
    if(fullname === null || fullname === ''){
      emptyField+=1;
    }
    if(email === null || email === ''){
      emptyField+=1;
    }
    if(vendor === null || vendor === '-'){
      emptyField+=1;
    }
    if(vendorRole === null || vendorRole === ''){
      emptyField+=1;
    }
    if(phone === null || phone === ''){
      emptyField+=1;
    }
    if(emptyField > 0){
      alert("Silahkan Lengkapi Mandatory Kolom!");
    }else{
      const profilePath = {path: photoProfilRes}; 

      const uploadAction = async (file)=>{
        loadDataHandler(true);
        await doUploadPhoto(file)
          .then((res) => {
            // console.log("+++ fileType", fileType);
            if (res.status === 200) {
              if (res.data.responseCode === "00") {
                const {path} = res.data;
                // console.log("+++ res path", path);
                // eslint-disable-next-line default-case
                profilePath.path = path;
              }
            } else {
              alert(res.data.responseMessage);
            }
          }).catch((err) => {
            alert(`Failed to upload file ${err}`);
            loadDataHandler(false);
          });
      };

      if(photoProfil !== ''){
        await uploadAction(photoProfil);
      }

      const reqData = {
        id : formType === "edit"? userId : null,
        fullname,
        email,
        photoProfile: profilePath.path,
        phoneNumber: phone,
        vendorId: vendor,
        roleId: vendorRole,
        userStatus,
        isEdit: formType === "edit",
        method: formType === "edit"?  "PUT":"POST",
      };
      // console.log("+++ letterHeadPath",letterHeadPath);
      // console.log("+++ profilePath",profilePath);
      console.log("+++ reqData",reqData);

      doAddEditUser(loadDataHandler, reqData )
        .then((response) => {
          console.log("+++ response", response);
          if (response.status === "success") {
            // eslint-disable-next-line no-alert
            alert(`Vendor User Berhasil ${formType === "edit"? "Diperbarui":"Ditambahkan"}!`);
            if(formType === "edit"){
              history.go(0);
            }else{
              history.push(`/user-management/`);
            }
          }else{
            alert(`Gagal ${formType === "edit"? "Memperbarui":"Menambahkan"} Data User : ${response.message}`);
          }
        }).catch((err) => {
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
    
  };
  
  return (
    <div className={classes.root}>
      <Grid container direction="column" style={{ marginBottom: '50px' }}>
        <div className={classes.container}>
          <Paper className={classes.containerContent}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.userTitle}>User Detail</Typography>
              </Grid>
              <Grid item>
                <Button 
                  style={{ textTransform: 'none', color: constants.color.primaryHard }}
                  onClick={()=>setOpenChangePassword(true)}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                {photoProfilRes ? (
                  <div style={{position: "relative", width: 260}}>
                    <MinioImageComponent filePath={photoProfilRes} style={{ borderRadius: 10, width: 255, }}/>
                    <IconButton
                      style={{position: "absolute", right: -10, top: -10, color: "#DC241F"}}
                      onClick={() => {
                        setPhotoProfilRes(null);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ): (
                  <ImageSelector isLarger title="Profil" onChange={(e)=>setPhotoProfil(e.target.files[0])} selectedImage={photoProfil} onDelete={()=>setPhotoProfil('')} />
                )}
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>Nama :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert Full Name" className={classes.inputForm} value={fullname} onChange={(e)=>setFullname(e.target.value)} />
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>Email :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert Mail" className={classes.inputForm} value={email} onChange={(e)=>setEmail(e.target.value)} />
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>Phone:</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert No Telepon" className={classes.inputForm} value={phone} onChange={(e)=>setPhone(e.target.value)} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>Nama Vendor :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                              <SelectLeftCustomIcon
                                selectOptionData={vendorSugestion}
                                selectedValue={vendor}
                                onSelectValueChange={handleChangeVendor}/>
                            )}
                            
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container spacing={2} alignItems="center" style={{marginTop: 10}}>
                              <Grid item><Typography>Status :</Typography></Grid>
                              <Grid item>
                                <FormGroup>
                                  <FormControlLabel control={<RedSwitch checked={userStatus} onChange={(e)=>setUserStatus(e.target.checked)}/>}/>
                                </FormGroup>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          
          <Grid container justify="space-between" className={classes.buttonContainer}>
            <Grid item>
              <Button
                variant="outlined"
                disableElevation
                className={classes.secondaryButton}
                onClick={() => { window.location.assign('/vendors'); }}
                style={{ textTransform: 'capitalize' }}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                disableElevation
                className={classes.primaryButton}
                onClick={handleSave}
                style={{ textTransform: 'capitalize' }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <ChangePassword 
        open={openChangePassword} 
        onClose={()=>setOpenChangePassword(false)} 
        onSubmit={()=>{
          setOpenChangePassword(false)
          setOpenSuccess(true)
          setTimeout(()=>{
            setOpenSuccess(false)
          },3000)
        }}
        />
      <PopupSucces 
        isOpen={openSuccess} 
        onClose={()=>setOpenSuccess(false)} 
        message="Password changed successfully!" 
      />
      <ModalLoader isOpen={isLoading} />
    </div>
  );
}

AddEdit.propTypes = {
  formType: PropTypes.string.isRequired
};

export default AddEdit;

