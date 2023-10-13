/* Third Party Import */
import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Dialog, Box, Grid, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";
import axios from "axios";
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

const DialogEditList = ({ isOpen = false, onClose, type,listData }) => {
  const classes = useStyles();
  const history = useHistory();
  const { desk, realProblem, partTime, rangeTime, jumlah, idSubConfig,duration,startTime,endTime,typeTime} = listData;
  const [deskChange,setDeskChange]=useState(desk);
  const [jumlahEvent,setJumlahEvent]=useState(jumlah);
  const [timeChoose,setTimeChoose]=useState(partTime);
  const [intervalTime,setIntervalTime]=useState(rangeTime);
  const [problemReal,setProblemReal]=useState(realProblem);
  const [durationAnomali,setDurationAnomali]=useState(duration);
  const [typeTimeChoose,seTypeTimeChoose]=useState(typeTime);
  const [startTimeChoose,setStartTime]=useState(startTime);
  const [endTimeChoose,setEndTime]=useState(endTime);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isOpenPopUp, setOpenPopUp] = useState(false);
  const [optionProblem, setOptionProblem] = useState([
    {
      value: "-",
      name: "Pilih Problem",
    },
  ]);
  const initialPayload = {
    problem: realProblem,
    description: desk,
    parameter: "all",
    parameterText: "",
    range: partTime,
    rangeDuration: rangeTime,
    jumlahInter:jumlah,
  };
  const [payload, setPayload] = useState(initialPayload); 
  
  function getProblem() {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try {
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
              value: "-",
              name: "Pilih Problem",
            },
          ];
          theProblem.map((item, i) => {
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
    } catch (err) {
      alert(`Fail to get data ${err}`);
    }
  }

  useEffect(() => {
    getProblem();
    console.log("listt",listData);
  }, []);

  const handleSubmit = () => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    if (type === "intermiten") {
      const hitIntermiten = {
        id: idSubConfig,
        monitoringConfigurationId: "2",
        problem: problemReal,
        description: deskChange,
        parameter: jumlahEvent,
        rangeInterval: intervalTime,
        rangeIntervalDescription: timeChoose,
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
            console.log("dataReq", hitIntermiten);
          })
          .catch((err) => {
            alert(err);
          });
      } catch (err) {
        alert(`Fail to Send Remark..!\n ${err}`);
      }
    }else if(type === "anomali"){
      if(typeTimeChoose === "duration"){
        const hitDuration = {
          id: idSubConfig,
          monitoringConfigurationId: "1",
          problem: problemReal,
          description: deskChange,
          duration: durationAnomali,
        };
        try {
          setLoadingSubmit(true);
          axios
            .post(
              `${process.env.REACT_APP_API_INFORMATION_MONITORING}/addAndUpdateDataConfiguration`,
              hitDuration,
              headers
            )
            .then((res) => {
              setOpenPopUp(true);
              setLoadingSubmit(false);
              console.log("dataReq", hitDuration);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (err) {
          alert(`Fail to Send Remark..!\n ${err}`);
        }
      }
      else if (typeTimeChoose === "time") {
        const hitDuration = {
          id:idSubConfig,
          monitoringConfigurationId: "1",
          problem: problemReal,
          description: deskChange,
          startTime: useTimestampConverter(startTimeChoose / 1000, "HH:mm"),
          endTime: useTimestampConverter(endTimeChoose / 1000, "HH:mm"),
        };
        try {
          setLoadingSubmit(true);
          axios
            .post(
              `${process.env.REACT_APP_API_INFORMATION_MONITORING}/addAndUpdateDataConfiguration`,
              hitDuration,
              headers
            )
            .then((res) => {
              setOpenPopUp(true);
              setLoadingSubmit(false);
              console.log("dataReq", hitDuration);
            })
            .catch((err) => {
              alert(err);
            });
        } catch (err) {
          alert(`Fail to Send Remark..!\n ${err}`);
        }
      }
    }
  };

  const handleChangePayload = (value, key) => {
    setPayload((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

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
        <Typography className={classes.title}>Edit List</Typography>
        <div style={{ marginBottom: "20px" }}>
          <Typography className={classes.label}>Jenis Problem</Typography>
          <SelectMui
            selectOptionData={optionProblem}
            selectedValue={problemReal}
            onSelectValueChange={(newVal) => setProblemReal(newVal)}
            height="47px"
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <LabelTextField
            label="Deskripsi: "
            placeholder="Masukkan Deskripsi"
            onChange={(newVal) => setDeskChange(newVal.target.value)}
            value={deskChange}
            height="47px"
          />
        </div>
        {type === "anomali" && (
          <div style={{ marginBottom: "60px" }}>
            <Typography className={classes.label}>Parameter</Typography>
            <SelectAndTextField
              option={dummyOption}
              selectedOption={typeTimeChoose}
              textValue={durationAnomali}
              startTime={startTimeChoose}
              endTime={endTimeChoose}
              handleChangeSelectField={(newValue) => seTypeTimeChoose(newValue)}
              handleChangeTextField={(e) => setDurationAnomali(e.target.value)}
              handleStartTime={(newVal) => setStartTime(newVal)}
              handleEndTime={(newVal) => setEndTime(newVal)}
            />
          </div>
        )}
        {type === "intermiten" && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <Typography className={classes.label}>Parameter</Typography>
              <PrependTextField
                prependLabel="Jumlah"
                textValue={jumlahEvent}
                handleInputText={(e) => setJumlahEvent(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "60px" }}>
              <Typography className={classes.label}>Range Waktu</Typography>
              <SelectAndTextField
                option={dummyOptionIntermiten}
                selectedOption={timeChoose}
                textValue={intervalTime}
                handleChangeSelectField={(e) => setTimeChoose(e)}
                handleChangeTextField={(e) => setIntervalTime(e.target.value)}
              />
            </div>
          </>
        )}
        <ConfirmAndCancelButton
          onCancel={onClose}
          onConfirm={handleSubmit}
          textCancel="Cancel"
          textConfirm="Submit"
        />
        <ModalLoader isOpen={loadingSubmit} />
      </Box>
      <SuccesPopUp
        isOpen={isOpenPopUp}
        onClose={() => history.go(0)}
        label="Berhasil Edit List"
        type="Add"
      />
    </Dialog>
  );
};

export default DialogEditList;
