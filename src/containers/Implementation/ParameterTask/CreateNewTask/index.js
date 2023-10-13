/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import LeftComponent from "./leftComponent";
import RightComponent from "./rightComponent";
import constants from "../../../../helpers/constants";
import SuccessPopUp from "../PopUp/successPopUp";

const useStyles = makeStyles({
  root: {
    padding: 15,
    marginBottom: 30,
  },
  content: {
    padding: 10,
  },
  backButton: {
    marginBottom: 20,
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
});

const createKebutuhan = () => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const [isOpenModalLoader, setModalLoader] = useState(false)
  const [dataLeftComponent, setDataLeft] = useState({
    category: "",
    description: "",
    picVendor: "",
    date: ""
  })
  const [dataRightComponent, setDataRight] = useState([])
  const [openSuccessDeletePopUp, setOpenSuccessDeletePopUp] = useState(false)
  const [successLabel, setSuccessLabel] = useState('Hapus Berhasil Dilakukan')
  const [successType, setSuccessType] = useState('Add')

  const [errorCreateKebutuhan, setErrorCreateKebutuhan] = useState({
    category: false,
    description: false,
    picVendor: false,
    date: false
  })

  const handleLeftComponent = (e) => {
    setDataLeft(e)
  }

  function handleError(keyname, bool) {
    // eslint-disable-next-line default-case
      setErrorCreateKebutuhan((prevVal) => {
        return {
          ...prevVal,
          [keyname]: bool,
        }
      })
  }

  function validateForm(){
    let errorCount = 0
    
    if(dataLeftComponent.category === ""){
      handleError('category', true)
      errorCount++
    }else{
      handleError('category', false)
    }

    if(dataLeftComponent.description === ""){
      handleError('description', true)
      errorCount++
    }else{
      handleError('description', false)
    }

    if(dataLeftComponent.picVendor === ""){
      handleError('picVendor', true)
      errorCount++
    }else{
      handleError('picVendor', false)
    }

    if(dataLeftComponent.date === ""){
      handleError('date', true)
      errorCount++
    }else{
      handleError('date', false)
    }

    return(errorCount)
  }

  const onSubmitNewTask = () => {
    const errorCount = validateForm()
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!')
    } else {
      setOpenSuccessDeletePopUp(true)
      setSuccessLabel('Task Berhasil Ditambahkan')
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>
            New Task
        </Typography>
        
        {/* Container */}
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {/* Left Component */}
          <Grid item xs={7}>
            <LeftComponent data={dataLeftComponent} isLoadData={isOpenModalLoader} errorForm={errorCreateKebutuhan} onChange={handleLeftComponent}/>
          </Grid>
          {/* Right Component */}
          <Grid item xs={5}>
            <RightComponent
              data={dataRightComponent}
              isLoadData={isOpenModalLoader}
            />
          </Grid>
        </Grid>

        {/* Button Container */}
        <Grid container style={{ marginTop: 20 }} justify='space-between'>
            <Grid item>
                <Button
                    variant="contained"
                    disableElevation
                    className={classes.secondaryButton}
                    onClick={() => history.goBack()}
                    style={{ textTransform: "capitalize" }}
                >
                    Cancel
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={onSubmitNewTask}
                    style={{ textTransform: "capitalize" }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
      </div>
      <SuccessPopUp 
        isOpen={openSuccessDeletePopUp}
        onClose={()=>setOpenSuccessDeletePopUp(false)}
        label={successLabel}
        type={successType}
      />
      {/* <FloatingChat /> */}
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(createKebutuhan))
);