import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  Checkbox,
  Chip,
  Button,
  Paper,
  IconButton,
  InputBase,
  CircularProgress,
} from "@material-ui/core";
import * as Colors from "../../../../../../assets/theme/colors";
import Plus from "@material-ui/icons/Add";
import { Select } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import constants from "../../../../../../helpers/constants";
import { PrimaryHard } from "../../../../../../assets/theme/colors";
import { ReactComponent as CloseButton } from "../../../../../../assets/icons/siab/x-new.svg";
import { grey, red } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { doSaveCategoryConfig } from "../../../../ApiServices";
import CustomSwitch from "../common/CustomSwitch";



const { Option } = Select;
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
    backgroundColor: constants.color.white,
    width: 663,
    minHeight: "550px",
    height: "572px",
    borderRadius: 10,
    padding: 30,
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    display: "flex",
    flexDirection: "column",
  },
  formInput: {
    padding: "10px 10px",
    display: "flex",
    width: "93%",
    borderRadius: "6px 6px 6px 6px",
    border: "1px solid #A8B6DB",
    backgroundColor: Colors.White,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    height: 50,
    marginTop: -8,
  },
  formInputTrue: {
    padding: "10px 10px",
    display: "flex",
    width: "93%",
    borderRadius: "6px 6px 6px 6px",
    border: "1px solid #A8B6DB",
    backgroundColor: grey,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    height: 50,
    marginTop: -8,
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  resetImage: {
    position: "absolute",
    width: "15px",
    height: "15px",
    top: -10,
    right: -10,
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

  fieldName: {
    color: "#2B2F3C",
    fontSize: 15,
    paddingRight: 10,
    paddingLeft: 10,
  },
  inputType: {
    padding: 10,
  },
  root: {
    borderRadius: 10,
  },
  chipRoot: {
    "& .MuiChip-outlined": {
      border: "1px solid #8D98B4",
      backgroundColor: "#F4F7FB",
    },
  },
});
const RedCheckbox = withStyles({
  root: {
    color: "#E6EAF3",
    "&$checked": {
      color: "#DC241F",
    },
  },
  checked: {},
})((props) => <Checkbox {...props} />);

const AddNewItem = ({ isOpen, onClose, onSuccessSubmit,categoriesId }) => {
  const { modal, paper, primaryButton, secondaryButton, chipRoot, formInput,formInputTrue } =
    useStyles();
  const [typeNames, setTypeNames]=useState([]);
  const [inputTypeNames, setInputTypeNames]= useState("");
  const [existingNames, setExistingNames]=useState([]);
  const [inputExistingNames, setInputExistingNames]=useState("");
  const [conditionNames, setConditionNames]= useState([])
  const [inputConditionNames, setInputConditionNames]= useState("");
  const [checkTrue, setCheckTrue] = useState(false);
  const [checkExist, setCheckExist]= useState(false);
  const [checkType,setCheckType]= useState(false);
  const [checkCondition,setCheckCondition]= useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [dataRequest, setDataRequest]= useState({
    name:"",
    typeList:"",
    existing:"",
    existingName:[],
    condition:"",
    conditionName:[],
    photoStatus:"",
    customizeId:""
  })

  const handleChangeRequest = (newVal, attribut)=>{
    setDataRequest((prevValue)=>{
      return{
        ...prevValue,
        [attribut]:newVal
      }
    })
  }
   function loadSubmitHandler(bool) {
     setLoadingSubmit(bool);
   }
  //addTypeNames
  function addDetailField(){
      const newObject=inputTypeNames
      const tempArray = [...typeNames]
      tempArray.push(newObject)
      setTypeNames(tempArray);
      setInputTypeNames("");
  }
  //addExisting
  function addExistingName(){
    const newExistingName = inputExistingNames
    const arrExisting = [...existingNames]
    arrExisting.push(newExistingName)
    setExistingNames(arrExisting);
    setInputExistingNames("");
  }
  //addCondition
   function addConditionName() {
     const newConditionName = inputConditionNames;
     const arrCondition = [...conditionNames];
     arrCondition.push(newConditionName);
     setConditionNames(arrCondition);
     setInputConditionNames("");
   }
// input exsist
const handleCheckbox=(event) =>{
  setCheckExist(event.target.checked);
}
//input type
const handleCheckboxType = (event) => {
  setCheckType(event.target.checked);
};
//input condition
const handleCheckboxCondition = (event) => {
  setCheckCondition(event.target.checked);
};

  const handleDeleteChip = (chipToDelete) => {
  setTypeNames((chips) => chips.filter((chip) => chip !== chipToDelete));
  };
   const handleDeleteChipCondition = (chipToDelete) => {
     setConditionNames((chips) => chips.filter((chip) => chip !== chipToDelete));
   };
   const handleDeleteChipExisting = (chipToDelete) => {
     setExistingNames((chips) =>
       chips.filter((chip) => chip !== chipToDelete)
     );
   };
const handleCheckButton = (event) => {
  setCheckTrue(event.target.checked);
};
  const handleSubmit = async()=>{
    //let promises =[];
    const types = typeNames.filter((val)=>val);
    const existings = existingNames.filter((val)=>val);
    const conditions = conditionNames.filter((val)=>val)
    const exist = checkExist
    const typeInput = checkType
    const conditionInput = checkCondition
    const photo = checkTrue
    //promises.push(filtered)
    const dataHit = {
      name: dataRequest.name,
      typeList: typeInput == true ? "Type":"Type",
      existing:exist == true ? "Keberadaan" :"Keberadaan",
      condition: conditionInput == true ? "Kondisi":"Kondisi",
      photoStatus:checkTrue,
      customizeId: categoriesId,
      ...(typeInput && {inputTypeStatus: true}),
      ...(!typeInput && {typeName: types}),
      ...(exist && {inputExistingStatus : true}),
      ...(!exist && {existingName :existings}),
      ...(conditionInput && {inputConditionStatus: true}),
      ...(!conditionInput && {conditionName:conditions})
    };
  doSaveCategoryConfig(loadSubmitHandler,dataHit).then((response)=>{
   if(response){
     if(response.responseCode === "200"){
       onSuccessSubmit()
     }
   }
 }).catch((err)=>{
   alert(`Terjadi Kesalahan: ${err}`)
 })
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
              Tambah Items
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            style={{ marginTop: 15, marginLeft: 15 }}
          >
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>Nama Items:</Typography>
                </Grid>
                <Grid item>
                  <Paper component="form" className={formInput}>
                    <InputBase
                      placeholder="Masukan nama items"
                      onChange={(e) =>
                        handleChangeRequest(e.target.value, "name")
                      }
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid item>
                <CustomSwitch
                  title="Upload photo ?"
                  checked={checkTrue}
                  onChange={handleCheckButton}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>Keberadaan:</Typography>
                </Grid>
                <Grid item>
                  <Paper
                    component="form"
                    className={checkExist == true ? formInputTrue : formInput}
                  >
                    <InputBase
                      placeholder="Masukan opsi keberadaan"
                      onChange={(newVal) =>
                        setInputExistingNames(newVal.target.value)
                      }
                      value={inputExistingNames}
                      disabled={checkExist == true}
                    />
                    <IconButton
                      style={{ marginLeft: 40 }}
                      onClick={addExistingName}
                    >
                      <Plus style={{ color: PrimaryHard }} />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <RedCheckbox
                        checked={checkExist}
                        onChange={handleCheckbox}
                      />
                    }
                    style={{
                      padding: "4px 0",
                    }}
                    label={<Typography>Input Field</Typography>}
                  />
                </Grid>
                {existingNames.length == 0 ? (
                  <div></div>
                ) : (
                  <Grid item>
                    <Grid container spacing={1}>
                      {existingNames.map((data) => {
                        return (
                          <Grid item className={chipRoot}>
                            <Chip
                              variant="outlined"
                              label={data}
                              style={{ color: "#8D98B4", fontStyle: "italic" }}
                              onDelete={() => handleDeleteChipExisting(data)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            style={{ marginTop: 15, marginLeft: 15 }}
          >
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>Type:</Typography>
                </Grid>
                <Grid item>
                  <Paper component="form" className={formInput}>
                    <InputBase
                      placeholder="Masukan opsi type"
                      onChange={(newVal) =>
                        setInputTypeNames(newVal.target.value)
                      }
                      value={inputTypeNames}
                      disabled={checkType == true}
                    />
                    <IconButton
                      style={{ marginLeft: 40 }}
                      onClick={addDetailField}
                    >
                      <Plus style={{ color: PrimaryHard }} />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <RedCheckbox
                        checked={checkType}
                        onChange={handleCheckboxType}
                      />
                    }
                    style={{
                      padding: "4px 0",
                    }}
                    label={<Typography>Input Field</Typography>}
                  />
                </Grid>
                {typeNames.length == 0 ? (
                  <div></div>
                ) : (
                  <Grid item>
                    <Grid container spacing={1}>
                      {typeNames.map((data) => {
                        return (
                          <Grid item className={chipRoot}>
                            <Chip
                              variant="outlined"
                              label={data}
                              style={{ color: "#8D98B4", fontStyle: "italic" }}
                              onDelete={() => handleDeleteChip(data)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography>Kondisi:</Typography>
                </Grid>
                <Grid item>
                  <Paper component="form" className={formInput}>
                    <InputBase
                      placeholder="Masukan opsi kondisi"
                      onChange={(newVal) =>
                        setInputConditionNames(newVal.target.value)
                      }
                      value={inputConditionNames}
                      disabled={checkCondition == true}
                    />
                    <IconButton
                      style={{ marginLeft: 40 }}
                      onClick={addConditionName}
                    >
                      <Plus style={{ color: PrimaryHard }} />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <RedCheckbox
                        checked={checkCondition}
                        onChange={handleCheckboxCondition}
                      />
                    }
                    style={{
                      padding: "4px 0",
                    }}
                    label={<Typography>Input Field</Typography>}
                  />
                </Grid>
                {conditionNames.length == 0 ? (
                  <div></div>
                ) : (
                  <Grid item>
                    <Grid container spacing={1}>
                      {conditionNames.map((data) => {
                        return (
                          <Grid item className={chipRoot}>
                            <Chip
                              variant="outlined"
                              label={data}
                              style={{ color: "#8D98B4", fontStyle: "italic" }}
                              onDelete={() => handleDeleteChipCondition(data)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
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

AddNewItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
};

export default AddNewItem;
