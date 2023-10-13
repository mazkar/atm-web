import React,{useState} from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import constants from "../../../../../../helpers/constants";
import InputBordered from "../common/InputBase";
import ErrorComponent from "../../../../../Implementation/cimb/TaskKebutuhan/CreateKebutuhan/ErrorComponent";
import { ReactComponent as CloseButton } from "../../../../../../assets/icons/siab/x-new.svg";
import {doSaveCategoryConfig} from '../../../../ApiServices'

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 498,
    height: 350,
    borderRadius: 10,
    padding: 30,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 134,
    height: 38,
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

const AddNewCategory = ({ isOpen, onClose, onSuccessSubmit }) => {
  const { modal, paper, primaryButton, secondaryButton } = useStyles();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  function loadSubmitHandler(bool) {
    setLoadingSubmit(bool);
  }

  const [dataRequest, setDataRequest] = useState({
    category: "",
    status: 1,
  });
  const[errorValidation, setErrorValidation]= useState({
    category:false,
  })
  const handleChangeRequest = (newVal, attribut)=>{
    setDataRequest((prevValue)=>{
      return{
        ...prevValue,
        [attribut]:newVal
      }
    })
  }
  function handleError(keyname,bool){
    setErrorValidation((prevVal)=>{
      return {
        ...prevVal,
        [keyname]:bool,
      }
    })
  }
  function validateForm(){
     let errorCount = 0;
     if (dataRequest.category === "") {
       handleError("category", true);
       errorCount += 1;
     } else {
       handleError("category", false);
     }
     return(errorCount)
  }
  const handleSubmit = async()=>{
    const errorCount = validateForm();
    //console.log(errorCount);
    if(errorCount > 0){
      alert('Harap lengkapi data terlebih dahulu!')
    }else{
      const dataHit={
        category: dataRequest.category,
        status: dataRequest.status,
      }
      doSaveCategoryConfig(loadSubmitHandler, dataHit)
        .then((response) => {
          if (response) {
            if (response.responseCode === "200") {
              onSuccessSubmit();
            }
          }
        })
        .catch((err) => {
          alert(`Terjadi Kesalahan: ${err}`);
        });
    }
  }
  return (
    <Modal
      className={modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ color: "#374062", fontWeight: 500, fontSize: "36px" }}
            >
              Tambah Kategori
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ color: "#374062", fontWeight: 400, fontSize: "15px" }}
            >
              Nama Kategori:
            </Typography>
          </Grid>
          <Grid item>
            <InputBordered
              style={{ width: "100%", height: "30px", marginBottom:"20px" }}
              placeholder="Masukan nama kategori"
              onChange={(e) => handleChangeRequest(e.target.value, "category")}
            />
            {errorValidation.category ? (
              <ErrorComponent label="This Field is Required!" />
            ) : ""}
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 60 }} justify="space-between">
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={secondaryButton}
              onClick={onClose}
              style={{ textTransform: "capitalize" }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={handleSubmit}
              style={{ textTransform: "capitalize" }}
              disabled={loadingSubmit}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loadingSubmit && (
                  <CircularProgress size={15} style={{ marginRight: 10 }} />
                )}
                <Typography>Submit</Typography>
              </div>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default AddNewCategory;
