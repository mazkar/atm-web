import React, { useState, useEffect } from "react";
import { Link as Routerlink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import { Input, DatePicker, Space } from "antd";
import axios from "axios";
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

  const { TextArea } = Input;

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [newATM, setNewAtm] = useState([]);
  // declare state onChange
  const [Id, setId] = useState();
  const [Area, setArea] = useState();
  const [newLoc, setlocationName] = useState();
  const [remarks, setRemark] = useState();
  const [due, setDue] = useState();
  const [complete, setCompletDate] = useState();
  // set state onChange
  const handleId = (event) => {
    setId(event.target.value);
  };
  const handleArea = (data) => {
    setArea(data);
  };
  const handleLoc = (event) => {
    setlocationName(event.target.value);
  };
  const handleRemark = (event) => {
    setRemark(event.target.value);
  };
  const handleDue = (date, dateString) => {
    setDue(date, dateString);
  };
  const handleComplete = (date, dateString) => {
    setCompletDate(date, dateString);
  };

  // get Id Row from RBB data
  let rowID = "";
  rowID = localStorage.getItem("rowIdEditUnplanRenewal");
  rowID = JSON.parse(rowID);
  //console.log(`hasil id ${rowID.idRow}`);

  // // HIT API GET data detail
  useEffect(() => {
    setModalLoader(true);
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getUnplannedRenewalAtm/${rowID.idRow}`
      )
      .then((res) => {
         console.log(res);

        const editData = {
          atmId: res.data.data.atmId,
          areaName: res.data.data.areaName,
          locationName: res.data.data.locationName,
          dueDate: res.data.data.dueDate,
          renewalCompletedDate: res.data.data.renewalCompletedDate,
          remark: res.data.data.remark,
        };
        setNewAtm(editData);
        setModalLoader(false);
      })
      .catch((err) => {
        alert(err);
        setNewAtm([]);
        setModalLoader(false);
      });
  }, [rowID.idRow]);
  // END HIT API GET

  // set State for first value
  useEffect(() => {
    setId(newATM.atmId);
  }, [newATM.atmId]);
  useEffect(() => {
    setlocationName(newATM.locationName);
  }, [newATM.locationName]);
  useEffect(() => {
    setArea(newATM.areaName);
  }, [newATM.areaName]);
  useEffect(() => {
    setRemark(newATM.remark);
  }, [newATM.remark]);
  useEffect(() => {
    if (newATM.renewalCompletedDate) {
      setCompletDate(moment(newATM.renewalCompletedDate));
    }
  }, [newATM.renewalCompletedDate]);
  useEffect(() => {
    if (newATM.dueDate) {
      setDue(moment(newATM.dueDate));
    }
  }, [newATM.dueDate]);
  // end set State

  // HIT API PATCH data detail
  const handleSubmit = (e) => {
    setModalLoader(true);
    e.preventDefault();
    const data = {
      // atmId: Id,
      areaName: Area,
      // locationName: newLoc,
      renewalCompletedDate: complete,
      dueDate: due,
      remark: remarks,
    };
    // console.log('~ data', data)
    // console.log(`ini data post ${data}`);
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
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/updateUnplannedRenewalAtmData/${rowID.idRow}`,
          data,
          config
        )
        .then((res) => {
          setModalLoader(false);
          // console.log(res);
          if (res.status === 200) {
            window.location.assign("/rbb-data#UnplanRenewal");
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
          onClick={() => window.location.assign(`/rbb-data#UnplanRenewal`)}
          buttonIcon={<ArrowLeft />}
        />
      </div>

      <Typography className={title}>Edit RBB Unplan Renewal</Typography>
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
                      placeholder="ATM ID"
                      onChange={handleId}
                      value={Id}
                      maxLength={10}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={4} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b>Location :</b>
                    </Typography>
                    <Input
                      placeholder="Location"
                      onChange={handleLoc}
                      value={newLoc}
                      maxLength={75}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEditAuto}>
                    {/* <Typography variant="p" component="p">
                  <b>PIC Area :</b>
                </Typography>
                <Input placeholder="Nama Kota" /> */}
                    {/* <AutoCompleteTest label="PIC Area" placeholder="Nama Kota" setNilai={handleArea} value={Area} fieldName='namaArea'/> */}
                    <AutoCompleteTest
                      label="PIC Area"
                      placeholder="Nama Kota"
                      setNilai={handleArea}
                      value={Area}
                      fieldName="namaArea"
                      keywordMaxLenght={30}
                      openingType="renewal"
                      disabled
                    />
                  </Grid>

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b> Tgl Jatuh Tempo :</b>
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

                  <Grid item xs={2} className={inputEdit}>
                    <Typography variant="p" component="p">
                      <b> Tgl Selesai Renewal :</b>
                    </Typography>
                    <Space direction="vertical" className={inputDate}>
                      <DatePicker
                        onChange={handleComplete}
                        value={complete}
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
                  <Grid
                    item
                    xs={6}
                    className={textEdit}
                    style={{ float: "right" }}
                  >
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
                    to="/rbb-data#UnplanRenewal"
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
