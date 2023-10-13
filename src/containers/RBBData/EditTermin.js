import React, { useEffect, useState } from "react";
import { Link as Routerlink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import { Input, DatePicker, Space } from "antd";
import moment from "moment";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import MuiIconLabelButton from "../../components/Button/MuiIconLabelButton";
import LoadingView from "../../components/Loading/LoadingView";
import { ReactComponent as ArrowLeft } from "../../assets/icons/siab/arrow-left.svg";
import constants from "../../helpers/constants";
import AutoCompleteTest from "../../components/Form/AutoComplete";

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
  buttonContainer: {
    marginTop: 50,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
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
    buttonContainer,
    title,
    primaryButton,
    secondaryButton,
    inputEdit,
    inputEditAuto,
    inputDate,
    textEdit,
  } = useStyles();

  // function onChange(date, dateString) {
  //   console.log(date, dateString);
  // }

  const { TextArea } = Input;

  // const onChangeRemark = e => {
  //   console.log(e);
  // };

  // const handleSubmit = e => {
  //   console.log(e, 'button clicked!');
  // };

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [newATM, setNewAtm] = useState([]);
  // declare state onChange
  const [atmsId, setAtmId] = useState();
  const [cities, setcities] = useState();
  const [pic, setPic] = useState();
  const [reasonRbb, setReasonRbb] = useState();
  const [newLoc, setLocation] = useState();
  const [mesin, setMesin] = useState();
  const [jaboOuts, setJaboOut] = useState();
  const [remarks, setRemark] = useState();
  const [reportDate, setReportDate] = useState();
  const [revoke, setRevoke] = useState();
  const [due, setDue] = useState();

  // set state onChange
  const handleId = (event) => {
    setAtmId(event.target.value);
  };
  const handleRegion = (event) => {
    setJaboOut(event.target.value);
  };
  const handlecities = (data) => {
    setcities(data);
  };
  // const handlePic = (event) => {
  //   setPic(event.target.value);
  // };
  const handleReason = (event) => {
    setReasonRbb(event.target.value);
  };
  const handleLoc = (event) => {
    setLocation(event.target.value);
  };
  const handleMesin = (event) => {
    setMesin(event.target.value);
  };
  const handleRemark = (event) => {
    setRemark(event.target.value);
  };
  const handleReport = (date, dateString) => {
    setReportDate(date, dateString);
  };
  const handleRevoke = (date, dateString) => {
    setRevoke(date, dateString);
  };
  const handleDue = (date, dateString) => {
    setDue(date, dateString);
  };
  // get Id Row from RBB data
  let rowID = "";
  rowID = localStorage.getItem("rowIdEditTermin");
  rowID = JSON.parse(rowID);
  console.log(`hasil id ${rowID.idRow}`);

  // // HIT API GET data detail
  useEffect(() => {
    setModalLoader(true);
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getCloseAtm/${rowID.idRow}`
      )
      .then((res) => {
        console.log(res);

        const editData = {
          biClosingReportDate: res.data.data.biClosingReportDate,
          id: res.data.data.id,
          atmId: res.data.data.atmId,
          machineType: res.data.data.machineType,
          citiesName: res.data.data.city,
          locationName: res.data.data.locationName,
          closingRbbReason: res.data.data.closingRbbReason,
          dueDate: res.data.data.dueDate,
          information: res.data.data.information,
          jaboOut: res.data.data.jaboOut,
          areaName: res.data.data.areaName,
          machineRevokeDate: res.data.data.machineRevokeDate,
          status: res.data.data.status,
          type: res.data.data.type,
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
    setAtmId(newATM.atmId);
  }, [newATM.atmId]);
  useEffect(() => {
    setLocation(newATM.location);
  }, [newATM.oldLocation]);
  useEffect(() => {
    setcities(newATM.citiesName);
  }, [newATM.citiesName]);
  useEffect(() => {
    setPic(newATM.areaName);
  }, [newATM.areaName]);
  useEffect(() => {
    setReasonRbb(newATM.closingRbbReason);
  }, [newATM.closingRbbReason]);
  useEffect(() => {
    setLocation(newATM.locationName);
  }, [newATM.locationName]);
  useEffect(() => {
    setMesin(newATM.machineType);
  }, [newATM.machineType]);
  useEffect(() => {
    setJaboOut(newATM.jaboOut);
  }, [newATM.jaboOut]);
  useEffect(() => {
    setRemark(newATM.remark);
  }, [newATM.remark]);
  useEffect(() => {
    if (newATM.biClosingReportDate) {
      setReportDate(moment(newATM.biClosingReportDate));
    }
  }, [newATM.biClosingReportDate]);
  useEffect(() => {
    if (newATM.machineRevokeDate) {
      setRevoke(moment(newATM.machineRevokeDate));
    }
  }, [newATM.machineRevokeDate]);
  useEffect(() => {
    if (newATM.dueDate) {
      setDue(moment(newATM.dueDate));
    }
  }, [newATM.dueDate]);
  // end set State

  // HIT API PATCH data detail
  const handleSubmit = (e) => {
    // setModalLoader(true);
    e.preventDefault();
    const data = {
      atmId: atmsId,
      city: cities,
      jaboOut: jaboOuts,
      machineType: mesin,
      locationName: newLoc,
      dueDate: due,
      machineRevokeDate: revoke,
      biClosingReportDate: reportDate,
      closingRbbReason: reasonRbb,
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
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/updateCloseAtmData/${rowID.idRow}`,
          data,
          config
        )
        .then((res) => {
          setModalLoader(false);
          console.log(res);
          if (res.status === 200) {
            window.location.assign("/rbb-data#Termin");
          }
        })
        .catch((error) => {
          alert(error);
          console.log(error);
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
          onClick={() => window.location.assign(`/rbb-data#Termin`)}
          buttonIcon={<ArrowLeft />}
        />
      </div>

      <Typography className={title}>Edit RBB Termin</Typography>
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
                      <b>ATM ID :</b>
                    </Typography>
                    <Input
                      placeholder="1101"
                      onChange={handleId}
                      value={atmsId}
                      maxLength={10}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={4} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Location :</b>
                    </Typography>
                    <Input
                      placeholder="MTN.CMBN Syariah"
                      onChange={handleLoc}
                      value={newLoc}
                      maxLength={75}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEditAuto}>
                    <AutoCompleteTest
                      label="City :"
                      placeholder="Nama Kota"
                      setNilai={handlecities}
                      value={cities}
                      fieldName="namaKota"
                      pic={pic}
                      keywordMaxLenght={30}
                    />
                    {/* <Typography variant="p" component="p">
                  <b>cities :</b>
                </Typography>
                <Input placeholder="Nama Kota" onChange={handlecities} value={cities} /> */}
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b> PIC :</b>
                    </Typography>
                    <Input
                      placeholder="Nama PIC"
                      // onChange={handlePic}
                      value={newATM.areaName}
                      maxLength={30}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b> Jabo/Out Region :</b>
                    </Typography>
                    <Input
                      placeholder="Nama PIC"
                      onChange={handleRegion}
                      value={jaboOuts}
                      maxLength={30}
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
                      <b>Reason :</b>
                    </Typography>
                    <Input
                      placeholder="MTN.CMBN Syariah"
                      onChange={handleReason}
                      value={reasonRbb}
                      maxLength={75}
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Tgl Tarik Mesin :</b>
                    </Typography>
                    <Space direction="vertical" className={inputDate}>
                      <DatePicker
                        onChange={handleRevoke}
                        value={revoke}
                        format="DD MMM YYYY"
                        disabled={true}
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

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Tgl Jatuh Tempo :</b>
                    </Typography>
                    <Space direction="vertical" className={inputDate}>
                      <DatePicker
                        onChange={handleDue}
                        value={due}
                        format="DD MMM YYYY"
                        allowClear={false}
                      />
                    </Space>
                  </Grid>
                </Grid>

                <Grid
                  container
                  alignItems="right"
                  direction="row-reverse"
                  spacing={3}
                >
                  <Grid item xs={6} className={textEdit}>
                    <Typography variant="p" component="p">
                      <b>Remark :</b>
                    </Typography>
                    <TextArea
                      placeholder="alasan..."
                      allowClear
                      onChange={handleRemark}
                      value={remarks}
                      maxLength={75}
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
                    to="/rbb-data#Termin"
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
