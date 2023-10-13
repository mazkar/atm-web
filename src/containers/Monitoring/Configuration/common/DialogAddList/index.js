/* Third Party Import */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Dialog, Box, Grid, Typography, IconButton,FormControl } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";
import axios from "axios";
import { Select } from "antd";
import { TimePicker } from "antd";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useHistory } from "react-router-dom";
/* Internal Import */
import ConfirmAndCancelButton from "../../../../../components/Button/ConfirmAndCancelButton";
import LabelTextField from "../../../../../components/Form/LabelTextField";
import SelectMui from "../../../../../components/Selects/SelectMui";
import { GrayUltrasoft, PrimaryHard } from "../../../../../assets/theme/colors";
import SelectAndTextField from "../SelectAndTextField";
import PrependTextField from "../PrependTextField";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import SuccesPopUp from "../../../../Implementation/cimb/common/PopUp/successPopUp";
import ModalLoader from "../../../../../components/ModalLoader";
const { Option } = Select;

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "500px",
      borderRadius: "10px",
    },
  },
  title: {
    fontSize: "36px",
    fontWeight: 500,
    color: "#2B2F3C",
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 400,
    color: "#2B2F3C",
    marginBottom: "5px",
  },
  root: {
    "& .ant-select-single .ant-select-selector": {
      height: "100%",
      border: "1px solid #DC241F",
      backgroundColor: "#ffffff",
      paddingTop: "5px",
      paddingBottom: "4px",
      color: " #DC241F",
      borderRadius: "6px 0px 0px 6px",
    },
    "& .ant-select-single .ant-select-arrow": {
      color: "#DC241F",
      transition: "transform 0.2s ease-in",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: "rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
  datePicker: {
    padding: "7px 10px 7px 10px",
    margin: "0px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
});

const dummyOption = [
  {
    text: "Durasi",
    value: "duration",
  },
  {
    text: "Waktu",
    value: "time",
  },
];
const dummyOptionIntermiten = [
  {
    text: "Hari",
    value: "Hari",
  },
  {
    text: "Minggu",
    value: "Minggu",
  },
  {
    text: "Bulan",
    value: "Bulan",
  },
  {
    text: "Tahun",
    value: "Tahun",
  },
];


const DialogAddList = ({ isOpen = false, onClose, type }) => {
  const classes = useStyles();
  const [dataRequest,setDataRequest]=useState();
  const [parameter,setDataParameter]= useState("all");
  const history = useHistory();
  const [isOpenPopUp, setOpenPopUp] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const initialPayload = {
    problem: "test",
    description: "",
    parameter: "all",
    parameterText: "",
    range: "Hari",
    jumlah:"",
    rangeDuration: "",
    startTime:"",
    endTime:"",
  };
  const [optionProblem,setOptionProblem]= useState([{
    value:"test",
    name:"Pilih Problem"
  }]);
  
  const [payload, setPayload] = useState(initialPayload);
  
  const handleChangePayload = (value, key) => {
    // console.log("test",value,key);
    setPayload((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  function getProblem(){
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try{
      // setLoadingSubmit(true);
      axios
        .get(
          `${process.env.REACT_APP_API_INFORMATION_MONITORING}/getDropDownProblem`,
          headers
        )
        .then((res) => {
          const theProblem = res.data.jenisProblem;
          const dataPush = [
            {
              value: "test",
              name: "Pilih Problem",
            },
          ];
          theProblem.map((item,i)=>{
            const rowNew = {
              value: item.jenisProblem,
              name: item.jenisProblem,
            };
            dataPush.push(rowNew);
          });
          setOptionProblem(dataPush);
          // console.log("dataReq", dataPush);
        })
        .catch((err) => {
          alert(err);
        });
    }catch(err){
      alert(`Fail to get data ${err}`);
    }
  }

  useEffect(()=>{
    getProblem();
  },[]);

  async function handleSubmit() {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    if(type === "anomali"){
      if(parameter === "duration"){
        const dataHitDuration = {
          monitoringConfigurationId: "1",
          problem: payload.problem,
          description: payload.description,
          duration: payload.parameterText,
        };
        try {
          setLoadingSubmit(true);
          axios
            .post(
              `${process.env.REACT_APP_API_INFORMATION_MONITORING}/addAndUpdateDataConfiguration`,
              dataHitDuration,
              headers
            )
            .then((res) => {
              setOpenPopUp(true);
              setLoadingSubmit(false);
              // console.log("berhasil");
              // console.log("dataReq", dataRequest);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (err) {
          alert(`Fail to Send Remark..!\n ${err}`);
        }
      }else if(parameter === "time"){
        const hitTime = {
          monitoringConfigurationId: "1",
          problem: payload.problem,
          description: payload.description,
          startTime: useTimestampConverter(payload.startTime / 1000, "HH:mm"),
          endTime: useTimestampConverter(payload.endTime/1000,"HH:mm")
        };
        try {
          setLoadingSubmit(true);
          axios
            .post(
              `${process.env.REACT_APP_API_INFORMATION_MONITORING}/addAndUpdateDataConfiguration`,
              hitTime,
              headers
            )
            .then((res) => {
              setOpenPopUp(true);
              setLoadingSubmit(false);
              // console.log("dataReq", dataRequest);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (err) {
          alert(`Fail to Send Remark..!\n ${err}`);
        }
      }  
    }else if(type === "intermiten"){
      const hitIntermiten = {
        monitoringConfigurationId: "2",
        problem: payload.problem,
        description: payload.description,
        parameter: payload.jumlah,
        rangeInterval: payload.rangeDuration,
        rangeIntervalDescription: payload.range,
      };
      try {
        setLoadingSubmit(true);
        axios
          .post(
            `${process.env.REACT_APP_API_INFORMATION_MONITORING}/addAndUpdateDataConfiguration`,
            hitIntermiten,
            headers
          )
          .then((res) => {
            setOpenPopUp(true);
            setLoadingSubmit(false);
            // console.log("dataReq", dataRequest);
          })
          .catch((err) => {
            alert(err);
          });
      } catch (err) {
        alert(`Fail to Send Remark..!\n ${err}`);
      }
    }
  };
 
  useEffect(() => {
    console.log("render dialog add list");

    return () => {
      setPayload(initialPayload);
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={classes.modal}
    >
      <Box style={{ padding: "30px" }}>
        <Grid container justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography className={classes.title}>Tambah List</Typography>
        <div style={{ marginBottom: "20px" }}>
          <Typography className={classes.label}>Jenis Problem</Typography>
          <SelectMui
            selectOptionData={optionProblem}
            selectedValue={payload.problem}
            onSelectValueChange={(newVal) =>
              handleChangePayload(newVal, "problem")
            }
            height="47px"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <LabelTextField
            label="Deskripsi: "
            placeholder="Masukkan Deskripsi"
            onChange={(e) => handleChangePayload(e.target.value, "description")}
            value={payload.description}
            height="47px"
          />
        </div>
        {type === "anomali" && (
          <div style={{ marginBottom: "60px" }}>
            <Typography className={classes.label}>Parameter</Typography>
            <Grid container style={{ flexWrap: "nowrap" }}>
              <Grid item xs={3}>
                <FormControl className={classes.root} style={{ width: "100%" }}>
                  <Select
                    value={parameter}
                    onChange={(newValue) => setDataParameter(newValue)}
                    getPopupContainer={(node) => node.parentNode}
                  >
                    <Option value="all">All</Option>
                    {dummyOption.map((item) => {
                      return <Option value={item.value}>{item.text}</Option>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={9}>
                {parameter === "time" ? (
                  <div>
                    <Grid container style={{ flexWrap: "nowrap" }}>
                      <Grid item>
                        <TimePicker
                          format="HH:mm"
                          popupStyle={{ zIndex: 1500 }}
                          allowClear={false}
                          // showTime={{ format: "HH:mm" }}
                          suffixIcon={<AccessTimeIcon />}
                          className={classes.datePicker}
                          placeholder="Start"
                          onChange={(value) =>
                            handleChangePayload(value, "startTime")
                          }
                        />
                      </Grid>
                      <Grid item>-</Grid>
                      <Grid item>
                        <TimePicker
                          format="HH:mm"
                          popupStyle={{ zIndex: 1500 }}
                          allowClear={false}
                          // showTime={{ format: "HH:mm" }}
                          suffixIcon={<AccessTimeIcon />}
                          className={classes.datePicker}
                          onChange={(value) =>
                            handleChangePayload(value, "endTime")
                          }
                          placeholder="End"
                        />
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div>
                    <LabelTextField
                      placeholder="Masukkan Parameter"
                      value={payload.parameterText}
                      onChange={(e) =>
                        handleChangePayload(e.target.value, "parameterText")
                      }
                      height="41px"
                      style={{
                        borderLeft: "0px",
                        borderRadius: "0px 6px 6px 0px",
                      }}
                      endIcon={<AccessTimeIcon />}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        )}
        {type === "intermiten" && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <Typography className={classes.label}>Parameter</Typography>
              <PrependTextField
                prependLabel="Jumlah"
                textValue={payload.jumlah}
                handleInputText={(e) =>
                  handleChangePayload(e.target.value, "jumlah")
                }
              />
            </div>
            <div style={{ marginBottom: "60px" }}>
              <Typography className={classes.label}>Range Waktu</Typography>
              <SelectAndTextField
                option={dummyOptionIntermiten}
                selectedOption={payload.range}
                textValue={payload.rangeDuration}
                handleChangeSelectField={(newValue) =>
                  handleChangePayload(newValue, "range")
                }
                handleChangeTextField={(e) =>
                  handleChangePayload(e.target.value, "rangeDuration")
                }
              />
            </div>
          </>
        )}
        <ConfirmAndCancelButton
          onCancel={onClose}
          onConfirm={handleSubmit}
          isSubmit={loadingSubmit}
          textCancel="Cancel"
          textConfirm="Submit"
        />
      </Box>
      <SuccesPopUp
        isOpen={isOpenPopUp}
        onClose={() => history.go(0)}
        label="Berhasil Menambahkan List"
        type="Add"
      />
      <ModalLoader isOpen={loadingSubmit}/>
    </Dialog>
  );
};

export default DialogAddList;
