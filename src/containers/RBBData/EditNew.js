/* eslint-disable radix */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link as Routerlink } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import { Input, DatePicker, Space } from "antd";
import moment from "moment";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import MuiIconLabelButton from "../../components/Button/MuiIconLabelButton";

import { ReactComponent as ArrowLeft } from "../../assets/icons/siab/arrow-left.svg";
import constants from "../../helpers/constants";
import AutoCompleteTest from "../../components/Form/AutoComplete";
import LoadingView from "../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  container: {
    marginTop: 25,
  },
  paper: {
    padding: 45,
    borderRadius: 10,
    marginBottom: 40,
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
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  buttonContainer: {
    marginTop: 50,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 100,
    height: 40,
    marginRight: -15,
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
    marginLeft: -15,
  },
  inputEdit: {
    "& .MuiTypography-root": {
      marginBottom: 7,
    },
    "& .ant-input": {
      borderRadius: 6,
      marginBottom: 30,
      height: 45,
    },
  },
  inputEditAuto: {
    "& .MuiTypography-root": {
      marginBottom: 7,
    },
    "& .ant-select .ant-select-selector": {
      borderRadius: 6,
      height: 45,
    },
    "& .ant-select .ant-select-selection-search .ant-select-selection-search-input": {
      marginTop: 6,
    },
  },
  inputDate: {
    "& .ant-picker": {
      width: 141,
      height: 45,
      borderRadius: 6,
    },
  },
  textEdit: {
    "& .MuiTypography-root": {
      marginBottom: 7,
    },
    "& .ant-input": {
      borderRadius: 6,
      marginBottom: 10,
      height: 120,
    },
  },
});

const EditNew = () => {
  const {
    root,
    container,
    paper,
    backButton,
    title,
    buttonContainer,
    primaryButton,
    secondaryButton,
    inputEdit,
    inputEditAuto,
    inputDate,
    textEdit,
  } = useStyles();

  const { TextArea } = Input;

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [newATM, setNewAtm] = useState([]);
  // declare state onChange
  const [oldId, setOldId] = useState();
  const [oriLocation, setOldLocation] = useState();
  const [city, setCity] = useState();
  const [pic, setPic] = useState();
  const [reasonRbb, setReasonRbb] = useState();
  const [newLoc, setNewLocation] = useState();
  const [mesin, setMesin] = useState();
  const [cityOrigin, setCityOrigin] = useState();
  const [remarks, setRemark] = useState();
  const [reportDate, setReportDate] = useState();
  const [subDate, setSubmissionDate] = useState();

  // set state onChange
  const handleOldId = (event) => {
    setOldId(event.target.value);
  };
  const handleOldLoc = (event) => {
    setOldLocation(event.target.value);
  };
  const handleCity = (data) => {
    setCity(data);
  };
  const handlePic = (event) => {
    setPic(event.target.value);
  };
  const handleReason = (event) => {
    let val = event.target.value;
    if (val.length > 75) {
      val = val.slice(0, 75);
    }
    setReasonRbb(val);
  };
  const handleLoc = (event) => {
    setNewLocation(event.target.value);
  };
  const handleMesin = (event) => {
    setMesin(event.target.value);
  };
  const handleCityOri = (data) => {
    setCityOrigin(data);
  };
  const handleRemark = (event) => {
    let val = event.target.value;
    if (val.length > 75) {
      val = val.slice(0, 75);
    }
    setRemark(val);
  };
  const handleReport = (date, dateString) => {
    setReportDate(date, dateString);
  };
  const handleSubmission = (date, dateString) => {
    setSubmissionDate(date, dateString);
  };

  // get Id Row from RBB data
  let rowID = "";
  rowID = localStorage.getItem("rowIdEditNewAtm");
  rowID = JSON.parse(rowID);
  console.log(`hasil id ${rowID.idRow}`);

  // // HIT API GET data detail
  useEffect(() => {
    setModalLoader(true);
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getNewAtm/${rowID.idRow}`
      )
      .then((res) => {
        console.log(res);

        const editData = {
          biOpeningReportDate: res.data.data.biOpeningReportDate,
          id: res.data.data.id,
          latitude: res.data.data.latitude,
          atmId: res.data.data.atmId,
          longitude: res.data.data.longitude,
          machineType: res.data.data.machineType,
          newCity: res.data.data.newCity,
          newLocation: res.data.data.newLocation,
          newRbbReason: res.data.data.newRbbReason,
          oldCity: res.data.data.oldCity,
          oldLocation: res.data.data.oldLocation,
          oldMasterRbbId: res.data.data.oldMasterRbbId,
          areaName: res.data.data.areaName,
          potentialModel: res.data.data.potentialModel,
          status: res.data.data.status,
          submissionDate: res.data.data.submissionDate,
          userId: res.data.data.userId,
          activityDate: res.data.data.activityDate,
          negotiationStatus: res.data.data.negotiationStatus,
          remark: res.data.data.remark,
        };
        setNewAtm(editData);
        setModalLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setModalLoader(false);
      });
  }, [rowID.idRow]);
  // END HIT API GET

  // set State for first value
  useEffect(() => {
    setOldId(newATM.atmId);
  }, [newATM.atmId]);
  useEffect(() => {
    setOldLocation(newATM.oldLocation);
  }, [newATM.oldLocation]);
  useEffect(() => {
    setCity(newATM.newCity);
  }, [newATM.newCity]);
  useEffect(() => {
    setPic(newATM.areaName);
  }, [newATM.areaName]);
  useEffect(() => {
    setReasonRbb(newATM.newRbbReason);
  }, [newATM.newRbbReason]);
  useEffect(() => {
    setNewLocation(newATM.newLocation);
  }, [newATM.newLocation]);
  useEffect(() => {
    setMesin(newATM.machineType);
  }, [newATM.machineType]);
  useEffect(() => {
    setCityOrigin(newATM.oldCity);
    console.log(newATM.oldCity);
  }, [newATM.oldCity]);
  useEffect(() => {
    setRemark(newATM.remark);
  }, [newATM.remark]);
  useEffect(() => {
    if (newATM.biOpeningReportDate == null) {
      setReportDate(null);
    } else {
      setReportDate(moment(newATM.biOpeningReportDate));
    }
  }, [newATM.biOpeningReportDate]);
  useEffect(() => {
    if (newATM.submissionDate == null) {
      setSubmissionDate(null);
    } else {
      setSubmissionDate(moment(newATM.submissionDate));
    }
  }, [newATM.submissionDate]);
  // end set State

  // HIT API PATCH data detail
  const handleSubmit = (e) => {
    setModalLoader(true);
    e.preventDefault();
    const data = {
      atmId: oldId,
      oldLocation: oriLocation,
      newCity: city,
      // areaName: newATM.areaName,
      machineType: mesin,
      newLocation: newLoc,
      oldCity: cityOrigin,
      submissionDate: subDate,
      biOpeningReportDate: reportDate,
      newRbbReason: reasonRbb,
      remark: remarks,
    };
    console.log(`ini data post ${JSON.stringify(data)}`);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    // hit api
    try {
      axios
        .patch(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/updateNewAtmData/${rowID.idRow}`,
          data,
          config
        )
        .then((res) => {
          setModalLoader(false);
          // console.log(res);
          if (res.status === 200) {
            window.location.assign("/rbb-data#NewATM");
          }
        })
        .catch((error) => {
          alert(error);
          // console.log(error);
          setModalLoader(false);
        });
    } catch {
      setModalLoader(false);
    }
  };
  // END HIT API

  return (
    <div className={root}>
      <div className={backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => window.location.assign("/rbb-data#NewATM")}
          buttonIcon={<ArrowLeft />}
        />
      </div>

      <Typography className={title}>Edit RBB New</Typography>
      <div>
        {isOpenModalLoader ? (
          <LoadingView maxheight="100%" />
        ) : (
          <div className={container}>
            <Paper className={paper}>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                direction="column"
                spacing={5}
              >
                <Grid container alignItems="left" direction="row" spacing={3}>
                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Old ATM ID :</b>
                    </Typography>
                    <Input
                      onChange={handleOldId}
                      value={oldId}
                      maxLength={10}
                    />
                  </Grid>

                  <Grid item xs={4} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Old Location :</b>
                    </Typography>
                    <Input
                      placeholder="MTN.CMBN Syariah"
                      onChange={handleOldLoc}
                      value={oriLocation}
                      maxLength={75}
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEditAuto}>
                    <AutoCompleteTest
                      label="City"
                      placeholder="Nama Kota"
                      setNilai={handleCity}
                      value={city}
                      fieldName="namaKota"
                      pic={pic}
                      keywordMaxLenght={30}
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b> PIC :</b>
                    </Typography>
                    <Input
                      placeholder="Nama PIC"
                      onChange={handlePic}
                      value={pic}
                      maxLength={30}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container alignItems="left" direction="row" spacing={3}>
                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Mesin :</b>
                    </Typography>
                    <Input
                      placeholder="CRM"
                      onChange={handleMesin}
                      value={mesin}
                      maxLength={5}
                    />
                  </Grid>

                  <Grid item xs={4} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>New Location :</b>
                    </Typography>
                    <Input
                      placeholder="MTN.CMBN Syariah"
                      onChange={handleLoc}
                      value={newLoc}
                      maxLength={75}
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEditAuto}>
                    <AutoCompleteTest
                      label="City Asli"
                      placeholder="Nama Kota"
                      setNilai={handleCityOri}
                      value={cityOrigin}
                      fieldName="namaKota"
                      pic={pic}
                      keywordMaxLenght={30}
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Tgl Submission :</b>
                    </Typography>
                    <Space direction="vertical" className={inputDate}>
                      <DatePicker
                        onChange={handleSubmission}
                        value={subDate}
                        format="DD MMM YYYY"
                        allowClear={false}
                      />
                    </Space>
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Tgl Lapor BI :</b>
                    </Typography>
                    <Space direction="vertical" className={inputDate}>
                      <DatePicker
                        onChange={handleReport}
                        value={reportDate}
                        format="DD MMM YYYY"
                        allowClear={false}
                      />
                    </Space>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justify="space-between"
                  alignItems="left"
                  direction="row"
                  spacing={3}
                >
                  <Grid item xs={6} className={textEdit}>
                    <Typography variant="p" component="p">
                      <b>Alasan Masuk RBB :</b>
                    </Typography>
                    <TextArea
                      placeholder="alasan..."
                      allowClear
                      onChange={handleReason}
                      value={reasonRbb}
                    />
                  </Grid>

                  <Grid item xs={6} className={textEdit}>
                    <Typography variant="p" component="p">
                      <b>Remark :</b>
                    </Typography>
                    <TextArea
                      placeholder="alasan..."
                      allowClear
                      onChange={handleRemark}
                      value={remarks}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                justify="space-between"
                className={buttonContainer}
              >
                <Grid item style={{ marginTop: 10 }}>
                  <Link
                    underline="none"
                    component={Routerlink}
                    to="/rbb-data#NewATM"
                    className={secondaryButton}
                  >
                    Cancel
                  </Link>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={primaryButton}
                    onClick={handleSubmit}
                    style={{ textTransform: "capitalize" }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
};

export default EditNew;
