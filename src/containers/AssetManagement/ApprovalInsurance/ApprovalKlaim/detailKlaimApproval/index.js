import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Box, Typography, makeStyles,Paper} from "@material-ui/core";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrowIcon } from "../../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from './leftComponent';
import RightComponent from './rightComponent';
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import RejectApproval from './PopUp/rejectPopUp';
import ConfirmationApprove from './PopUp/confirmationApprove';
import ApprovedInformation from './PopUp/ApprovedInformation';

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  informationVendor: {
    backgroundColor: "#FFFFFF",
    padding: "20px 30px 30px",
    minHeight: 360,
    flex: 1,
    // marginRight: "30px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#2B2F3C",
    fontSize: "36px",
    fontWeight: 500,
    fontFamily: "Barlow",
    marginBottom: "24px",
  },
  history: {
    backgroundColor: "#FFFFFF",
    padding: "30px 20px",
    flex: 0.5,
    borderRadius: "10px",
  },
});
const DetailApprovalKlaim=()=>{
  const classes = useStyles();
  const history = useHistory();
  const [popUpReject,setPopUpReject]=useState(false);
  const [confirmationPopup,setConfirmationPopup]=useState(false);
  const [approvedConfirmation,setApprovedConfirmation]=useState(false);
  function rejectShow(){
    setPopUpReject(true);
  }
  function confirmationShow(){
    setConfirmationPopup(true);
  }
  function approvedInfo(){
    setApprovedConfirmation(true);
    setConfirmationPopup(false);
  }
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <MuiIconLabelButton
            label="Back"
            iconPosition="startIcon"
            buttonIcon={<LeftArrowIcon />}
            onClick={() => {
              history.goBack();
            }}
            style={{ background: "inherit", color: "#DC241F", padding: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title}>Detail Asuransi</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box className={classes.informationVendor}>
            <LeftComponent
              rejectPopUp={rejectShow}
              confirmationUp={confirmationShow}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box className={classes.informationVendor}>
            <RightComponent />
          </Box>
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
      <RejectApproval
        isOpen={popUpReject}
        onClose={() => setPopUpReject(false)}
      />
      <ConfirmationApprove
        isOpen={confirmationPopup}
        onClose={() => setConfirmationPopup(false)}
        approveConfirmation={approvedInfo}
      />
      <ApprovedInformation
        isOpen={approvedConfirmation}
        onClose={() => setApprovedConfirmation(false)}
      />
    </Box>
  );
};

export default DetailApprovalKlaim;