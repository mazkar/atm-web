/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Button, Switch } from '@material-ui/core';
import { Input } from 'antd';
import { useHistory } from "react-router-dom";
import { red } from '@material-ui/core/colors';
import constants from '../../helpers/constants';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import { ReactComponent as ArrowLeft } from '../../assets/icons/siab/arrow-left.svg';
import ModalLoader from '../../components/ModalLoader';
import ImageSelector from '../../components/ImageSelector';
import ChangePassword from '../../components/ChangePassword';
import PopupSucces from '../../components/PopupSucces';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
    minHeight: 550
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
function EditProfile() {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [phone, setPhone] = useState('');
  const [photoProfil, setPhotoProfil] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  
  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setIsLoading(bool);
  }

  const handleSave = async() => {

    // const profilePath = {path: null}; 
    // const signaturePath = {path: null}; 

    // const uploadAction = (file)=>{
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const res = "/inipath";
    //       // console.log("+++ profilePath", profilePath.path);
    //       resolve(res);
    //     }, 1000);
    //   });
    // };

    // if(photoProfil !== ''){
    //   profilePath.path = await uploadAction(photoProfil);
    // }
    // if(signature !== ''){
    //   signaturePath.path = await uploadAction(signature);
    // }

    // const reqData = {
    //   data: {
    //     name: UserName,
    //     address,
    //     serviceType,
    //     status: userStatus,
    //     email,
    //     photoProfil: profilePath.path,
    //     signature: signaturePath.path
    //   }
    // };
    // console.log("+++ reqData",reqData);

    // doAddEditVendor(loadingHandler, formData, "register", "POST")
    //   .then((response) => {
    //     console.log("+++ response", response);
    //     // if (response.status === 200) {
    //     //   setOpenSuccessCreatePopUp(true);
    //     //   setSuccessLabel('Task Berhasil Ditambahkan');
    //     // }
    //   }).catch((err) => {
    //     alert(`Terjadi Kesalahan:${err}`);
    //   });
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" style={{ marginBottom: '50px' }}>
        <Grid item>
          <div item className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              onClick={() => history.goBack()}
              buttonIcon={<ArrowLeft />}
            />
          </div>
        </Grid>
        <div className={classes.container}>
          <Typography className={classes.title}>Edit Profile</Typography>
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
                              <Grid item><Typography>Nama :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert Vendor Name" className={classes.inputForm} values={userName} onChange={(e)=>setUserName(e.target.value)} />
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
                              <Grid item><Typography>Phone :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert Phone Number" className={classes.inputForm} value={phone} onChange={(e)=>setPhone(e.target.value)} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={8}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>Nama Vendor :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Nama Vendor" className={classes.inputForm} value={vendorName} disabled/>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* <Grid item>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Grid container justify="space-between">
                              <Grid item><Typography>No Telepon/Hp :</Typography></Grid>
                              <Grid item><Mandatory/></Grid>
                            </Grid>
                            <Input placeholder="Insert No Telepon" className={classes.inputForm} value={phone} onChange={(e)=>setPhone(e.target.value)} />
                          </Grid>
                          <Grid item xs={4}>
                            <AddSignatureSelector refId="addSignature" title="Add Signature" onChange={(e)=>setSignature(e.target.files[0])} selectedImage={signature} onDelete={()=>setSignature('')} />
                            <Typography style={{textAlign: "center", fontSize: 13, marginTop: 10}}>Recommended dimension 300x120 px, 1mb</Typography>
                          </Grid>
                        </Grid>
                      </Grid> */}
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
                onClick={() => { window.location.assign('/user-vendor'); }}
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
      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isLoading} />
    </div>
  );
};

export default EditProfile;