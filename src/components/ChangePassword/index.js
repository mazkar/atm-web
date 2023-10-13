import {
    Box,
    Collapse,
    Grid,
    IconButton,
    InputBase,
    makeStyles,
    Modal,
    Typography,
  } from "@material-ui/core";
  import { ReactComponent as XIcon } from "../../assets/icons/duotone-red/x.svg";
  import React, { useState } from "react";
  import { ChkyButtons } from "../../components";
import InputText from "../AssetManagement/inputText";
  
  const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: "#FFFFFF",
      width: 580,
      // height: "554px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      padding: 30,
      borderRadius: 10,
    },
    upperContainer: {
      width: "100%",
    },
    exitContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "end",
    },
    exitButton: {
      cursor: "pointer",
    },
    title: {
      textAlign: "center",
      fontSize: 36,
      fontWeight: 500,
      lineHeight: "43.2px",
      marginBottom: 50,
    },
    buttonsContainer: {
      padding: "0 30px",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      fontWeight: 400,
      fontSize: 13,
      color: "#2B2F3C",
      marginBottom: 5,
      fontWeight: 500,
    },
    input: {
      fontFamily: "Barlow",
      fontStyle: "italic",
      fontSize: 13,
      width: "100%",
      border: "1px solid #BCC8E7",
      borderRadius: "8px",
      padding: "15px 12px",
    },
  });
  
  const ChangePassword = (props) => {
    const { open, onSubmit, onClose } = props;
  
    const classes = useStyles();
    const [openCollapse, setOpenCollapse] = useState(false);
  
    const [letterType, setLetterType] = useState("");
    const [letterCode, setLetterCode] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [category, setCategory] = useState("");
  
    const handleSubmit = () => {
    //   if (
    //     letterType == "" ||
    //     letterCode == "" ||
    //     month == "" ||
    //     year == "" ||
    //     category == ""
    //   ) {
    //     alert("Pastikan Anda Mengisi Semua Input!");
    //   } else {
        const requestData = {
          letterType,
          letterCode,
          month,
          year,
          category,
        };
        setOpenCollapse(true);
        onSubmit();
    //   }
    };
  
    return (
      <Modal
        open={open}
        onClose={() => {
          onClose();
          setOpenCollapse(false);
        }}
        className={classes.root}
      >
        <Box className={classes.container}>
          <Box className={classes.upperContainer}>
            <Box className={classes.exitContainer}>
              <IconButton
                onClick={() => {
                  onClose();
                  setOpenCollapse(false);
                }}
              >
                <XIcon style={{ width: 24 }} />
              </IconButton>
            </Box>
            <Typography className={classes.title}>Change Password</Typography>
            <Box style={{ padding: "0 30px", marginBottom: 80 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputText 
                    label="Old Password"
                    placeholder="Old Password"
                    withLabel
                    boldLabel
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputText 
                    label="New Password"
                    placeholder="New Password"
                    withLabel
                    boldLabel
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputText 
                    label="Confirm New Password"
                    placeholder="Confirm New Password"
                    withLabel
                    boldLabel
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className={classes.buttonsContainer}>
            <ChkyButtons
              style={{ textTransform: "none" }}
              buttonType="redOutlined"
              onClick={onClose}
            >
              Cancel
            </ChkyButtons>
            <ChkyButtons style={{ textTransform: "none" }} onClick={handleSubmit}>
              Confirm
            </ChkyButtons>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default ChangePassword;
  