/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Button, Switch, Select, InputBase, MenuItem } from '@material-ui/core';
import { Input } from 'antd';
import { red } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router-dom';
import constants from '../../../helpers/constants';
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import FloatingChat from '../../../components/GeneralComponent/FloatingChat';
import { ReactComponent as ArrowLeft } from '../../../assets/icons/siab/arrow-left.svg';
import ModalLoader from '../../../components/ModalLoader';
import AddSignatureSelector from '../../../components/AddSignatureSelector';
import ImageSelector from '../../../components/ImageSelector';
import { doAddEditVendor } from '../ApiServiceVendor';
import { doUploadPhoto } from '../../Implementation/ApiServiceImplementation';
import SelectLeftCustomIcon from '../../../components/Selects/SelectItemsIcon';
import { getRoles } from '../../../helpers/userManagement';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
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
function NewVendor() {
  const classes = useStyles();
  const history = useHistory();

  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [vendorRole, setVendorRole] = useState('-');
  const [phone, setPhone] = useState('');
  const [letterHead, setLetterHead] = useState('');
  const [letterFooter, setLetterFooter] = useState('');
  const [photoProfil, setPhotoProfil] = useState('');
  const [userStatus, setUserStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorRoleSugestion, setVendorRoleSugestion] = useState([{value: '-', name: "-Pilih Role-"}]);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setIsLoading(bool);
  }

  const handleSave = async() => {
    let emptyField = 0;
    if(vendorName === null || vendorName === ''){
      emptyField+=1;
    }
    if(email === null || email === ''){
      emptyField+=1;
    }
    if(address === null || address === ''){
      emptyField+=1;
    }
    if(vendorRole === null || vendorRole === '-'){
      emptyField+=1;
    }
    if(phone === null || phone === ''){
      emptyField+=1;
    }
    if(emptyField > 0){
      alert("Silahkan Lengkapi Mandatory Kolom!");
    }else{
      const profilePath = {path: null}; 
      const letterHeadPath = {path: null}; 
const letterFooterPath = { path: null };
      const uploadAction = async (file, fileType)=>{
        loadingHandler(true);
        await doUploadPhoto(file)
          .then((res) => {
            // console.log("+++ fileType", fileType);
            if (res.status === 200) {
              if (res.data.responseCode === "00") {
                const {path} = res.data;
                // console.log("+++ res path", path);
                // eslint-disable-next-line default-case
                switch (fileType) {
                  case "profilePath":
                    profilePath.path = path;
                    break;
                  case "letterHeadPath":
                    letterHeadPath.path = path;
                    break;
                  case "letterFooterPath":
                    letterFooterPath.path = path;
                    break;
                }
              }
            } else {
              alert(res.data.responseMessage);
            }
          }).catch((err) => {
            alert(`Failed to upload file ${err}`);
            loadingHandler(false);
          });
      };

      if(photoProfil !== ''){
        await uploadAction(photoProfil, "profilePath");
      }
      if(letterHead !== ''){
        await uploadAction(letterHead, "letterHeadPath");
      }
      if (letterFooter !== '') {
       await uploadAction(letterFooter, "letterFooterPath");
        }
      const reqData = {
        id : null,
        name: vendorName,
        address,
        email,
        photoProfile: profilePath.path,
        telephoneNumber: phone,
        roleId: vendorRole,
        letterHead: letterHeadPath.path,
        letterFooter:letterFooterPath.path,
        active: userStatus
      };
      // console.log("+++ letterHeadPath",letterHeadPath);
      // console.log("+++ profilePath",profilePath);
      // console.log("+++ reqData",reqData);

      doAddEditVendor(loadingHandler, reqData)
        .then((response) => {
          // console.log("+++ response", response);
          if (response.status === 200) {
            alert("Vendor Berhasil Ditambahkan!");
            history.push(`/vendors`);
          }
        }).catch((err) => {
          alert(`Terjadi Kesalahan:${err}`);
        });
    }
    
  };

  useEffect(() => {
    getRoles().then((response)=>{
      // console.log("+++ response getRoles", response);
      if(response.status === 200){
        const {roles} = response.data.data;
        const rolesOptions = [{value: '-', name: "-Pilih Role-"}];
        roles.map((item)=>{
          const newObj = {value: item.id, name: item.name};
          rolesOptions.push(newObj);
        });
        setVendorRoleSugestion(rolesOptions);
      }
    }).catch((err) => {
      alert(`Failed to fetch user roles ${err}`);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="column" style={{ marginBottom: '50px' }}>
        <Grid item>
          <div item className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              onClick={() => window.location.assign('/vendors')}
              buttonIcon={<ArrowLeft />}
            />
          </div>
        </Grid>
        <div className={classes.container}>
          <Typography className={classes.title}>New Vendor</Typography>
          <Paper className={classes.containerContent}>
            <Typography className={classes.userTitle}>Vendor Detail</Typography>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <ImageSelector isLarger title="Profil" onChange={(e)=>setPhotoProfil(e.target.files[0])} selectedImage={photoProfil} onDelete={()=>setPhotoProfil('')} />
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>Vendor Name :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert Vendor Name" className={classes.inputForm} values={vendorName} onChange={(e)=>setVendorName(e.target.value)} />
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>User Email :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert Mail" className={classes.inputForm} value={email} onChange={(e)=>setEmail(e.target.value)} />
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>User Role :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <SelectLeftCustomIcon
                              selectOptionData={vendorRoleSugestion}
                              selectedValue={vendorRole}
                              onSelectValueChange={(newVal)=>setVendorRole(newVal)}/>
                            {/* <Input placeholder="Insert Jenis Task" className={classes.inputForm} value={serviceType} onChange={(e)=>setServiceType(e.target.value)} /> */}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={8}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>Alamat :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert Alamat" className={classes.inputForm} value={address} onChange={(e)=>setAddress(e.target.value)} />
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
                      <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>No Telepon/Hp :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert No Telepon" className={classes.inputForm} value={phone} onChange={(e)=>setPhone(e.target.value)} />
                          </Grid>
                          <Grid item xs={4}>
                            <AddSignatureSelector refId="addLetterHead" title="Logo Perusahaan" onChange={(e)=>setLetterHead(e.target.files[0])} selectedImage={letterHead} onDelete={()=>setLetterHead('')} />
                            <Typography style={{textAlign: "center", fontSize: 13, marginTop: 10}}>Recommended dimension 120x120 px, 1mb</Typography>
                          </Grid>
                           <Grid item xs={4}>
                            <AddSignatureSelector refId="addLetterFooter" title="TTD" onChange={(e)=>setLetterFooter(e.target.files[0])} selectedImage={letterFooter} onDelete={()=>setLetterFooter('')} />
                            <Typography style={{textAlign: "center", fontSize: 13, marginTop: 10}}>Recommended dimension 120x120 px, 1mb</Typography>
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

      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isLoading} />
    </div>
  );
};

export default NewVendor;