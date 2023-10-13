/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  InputLabel,
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { withRouter, useHistory } from "react-router-dom";
import { Close } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextArea from "antd/lib/input/TextArea";
// import { Table } from 'semantic-ui-react';
// import { Table } from 'antd';
import moment from "moment";
import DoubleGrid from "../../../components/Grid/DoubleGrid";
import constants from "../../../helpers/constants";
import RupiahConverter from "../../../helpers/useRupiahConverter";
import ModalLoader from "../../../components/ModalLoader";
import SelectWithCaptions from "../../../components/Selects/SelectWithCaptions";
import { ReactComponent as DropDownIcon } from "../../../assets/icons/general/dropdown_red.svg";
import ThounsandSeparator from "../../../helpers/useThousandSeparator";
import LoadingView from "../../../components/Loading/LoadingView";
// import constansts from '../../../helpers/constants';

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  paper: {
    backgroundColor: constants.color.white,
    width: "90%",
    height: 600,
    borderRadius: 10,
    padding: 30,
  },
  scrolledContent: {
    overflowY: "scroll",
    scrollable: "true",
    maxHeight: 500,
    padding: 25,
  },
  remark: {
    "& .ant-input": {
      borderRadius: 6,
      height: 120,
      width: 350,
    },
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonCancel: {
    margin: "65px",
    backgroundColor: constants.color.primaryHard,
    color: "white",
    textTransform: "capitalize",
    "& .MuiButton-root": {
      width: "100px",
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.8,
      },
    },
  },
  buttonContainer: {
    marginTop: 45,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 130,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 130,
  },
  textField: {
    "& .MuiInputBase-root": {
      width: 280,
    },
    "& .MuiInputBase-input": {
      right: "-20px",
    },
    "& .MuiOutlinedInput-input": {
      "&: hover": {
        background: "#F4F7FB",
      },
    },
    "& .MuiButton-root": {
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.9,
      },
    },
  },
  inputMenu: {
    marginTop: 20,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#E6EAF3",
    outline: "none",
    height: "38px",
    width: "150px",
  },
  container: {
    marginTop: 40,
  },
  dataRemodel: {
    border: "1px solid",
    borderColor: constants.color.grayMedium,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    display: "grid",
    alignContent: "space-evenly",
  },
  dataTop: {
    background: constants.color.white,
    width: "100%",
    border: "1px solid",
    borderColor: `${constants.color.grayMedium}`,
    borderRadius: 8,
    // borderColor: constants.color.grayMedium,
  },
  inputBottom: {
    width: "100%",
  },
  headTop: {
    background: constants.color.white,
    width: 250,
    border: "3px solid",
    borderColor: `${constants.color.primaryHard}`,
    borderRadius: 8,
  },
  h3: {
    textAlign: "center",
    color: `${constants.color.primaryHard}`,
  },
  paperTabel: {
    width: "100%",
    overflowX: "auto",
    scrollable: "true",
  },
});

const modelFinal = [
  { id: 0, id_Model: "0", value: "0", name: "High SA" },
  { id: 1, id_model: "0", value: "1", name: "Medium SA" },
  { id: 2, id_model: "0", value: "2", name: "High Usage" },
  { id: 3, id_model: "0", value: "3", name: "Medium Usage" },
  { id: 4, id_model: "0", value: "4", name: "High Revenue" },
  { id: 5, id_model: "0", value: "5", name: "Medium Revenue" },
  { id: 6, id_model: "0", value: "6", name: "Low Performance" },
  { id: 7, id_model: "0", value: "6", name: "Branding" },
  { id: 8, id_model: "0", value: "6", name: "Prominent" },
  { id: 9, id_model: "0", value: "6", name: "Unrated" },
  { id: 10, id_model: "0", value: "", name: "" },
];

const EditModel = ({
  isOpen,
  onClose,
  rowToShow,
  onSubmitBtn,
  loaderHandler,
}) => {
  const {
    root,
    modal,
    content,
    paper,
    closeIcon,
    buttonContainer,
    primaryButton,
    secondaryButton,
    scrolledContent,
    dataRemodel,
    remark,
    inputMenu,
    dataTop,
    container,
    inputBottom,
    headTop,
    h3,
    paperTabel,
  } = useStyles();

  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      width: 130,
      height: 25,
      borderRadius: 8,
      position: "relative",
      marginLeft: 15,
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #BCC8E7",
      fontSize: 16,
      padding: "6px 12px 6px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      "&:focus": {
        borderRadius: 8,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }))(InputBase);

  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [dataAtm, setDataAtm] = useState([]);
  const [modelValue, setModelValue] = useState("High SA");
  const [textField, setTextField] = useState("aaa");
  const [monthName, setMonthName] = useState([]);
  const [history, setHistory] = useState([]);
  const [anomali, setAnomaly] = useState([]);
  const goTo = useHistory();

  const handleModelChange = (event) => {
    setModelValue(event.target.value);
    console.log("change model", event.target.value);
  };
  const handleTextChange = (event) => {
    setTextField(event.target.value);
  };

  // const handleMedical = () => {
  //   alert("Page Not Ready Yet");
  // };

  useEffect(() => {
    console.log("row to show edit model", rowToShow);
    if (rowToShow !== "") {
      setModalLoader(true);
      axios
        .get(
          `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/modelings/${rowToShow}`
        )
        .then((res) => {
          console.log(res);
          const revPayment = res.data.data.revenuePaymentPerCost* 100;
          const revPaymentShow = `${revPayment.toFixed(2)}%`;

          console.log("+++ revPayment:", revPayment);
          const editData = {
            id: res.data.data.id,
            atmId: res.data.data.atmId,
            locationName: res.data.data.locationName,
            averageCasa: RupiahConverter(res.data.data.averageCasa),
            averageTransaction: ThounsandSeparator(
              res.data.data.averageTransaction
            ),
            averageRevenue: RupiahConverter(res.data.data.averageRevenue),
            yearlyRentCost: RupiahConverter(res.data.data.yearlyRentCost),
            overhead: RupiahConverter(res.data.data.overhead),
            cost: RupiahConverter(res.data.data.cost),
            locationType: res.data.data.locationType,
            revenuePaymentPerCost: res.data.data.revenuePaymentPerCost !== null ? revPaymentShow : "N/A",
            currentModel: res.data.data.modelTeam,
            modelFinal: res.data.data.modelFinal,
            totalNumberOfTransactionDays:
              res.data.data.totalNumberOfTransactionDays,
            lastMonthRemark: res.data.data.lastMonthRemark,
            previousMonthRemark: res.data.data.previousMonthRemark,
            monthIndex: res.data.data.monthIndex,
            details: res.data.data.details,
            lastMonthModel: res.data.data.lastMonthModel,
            lastTwoMonthModel: res.data.data.lastTwoMonthModel,
          };
          setDataAtm(editData);
          setModalLoader(false);
          const month = Object.values(editData.monthIndex);
          setMonthName(month);
          setAnomaly(editData.monthIndex);
          setHistory(editData.details);
          setModelValue(res.data.data.modelFinal);
          setTextField(res.data.data.remark);
          console.log(editData);
        })
        .catch((err) => {
          setModalLoader(false);
          console.log(err);
        });
    }
  }, [rowToShow]);

  const onSubmit = (e) => {
    // setModalLoader(true);
    const data = {
      atmId: dataAtm.atmId,
      modelFinal: modelValue,
      remark: textField,
    };
    console.log(`row to show ${rowToShow}`);
    console.log(data);
    // e.preventDefault();
    if (data.modelFinal != null) {
      if (data.remark != null) {
        // setModalLoader(true);
        loaderHandler(true);
        try {
          // setModalLoader(true);
          // alert('submited');
          const dataToSet = [];
          // const fetchDataMaster = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          };

          // hit API

          axios
            .patch(
              `${constants.MODELINGS_SERVICE}/modelings/${rowToShow}`,
              data,
              config
            )
            .then((response) => {
              setModalLoader(false);
              loaderHandler(false);

              console.log(response);
              if (response.status === 200) {
                window.location.reload(false);
                onClose();
                onSubmitBtn();
              } else {
                alert("FAIL EDIT DATA");
                window.location.reload(false);
                // loaderHandler(false);
              }
            })
            .catch((err) => {
              loaderHandler(false);
            });
        } catch (err) {
          // alert(`Error Fetching Data...! \n${err}`);

          // alert(`Error Fetching Data...! \n${err}`);
          setModalLoader(false);
          // loaderHandler(false);
        }
      } else {
        setModalLoader(false);
        loaderHandler(false);
        alert("Remarks is required");
      }
    } else {
      setModalLoader(false);
      loaderHandler(false);
      alert("Please select Model Final");
    }
  };

  // var today = new Date(2020, 2, 28);
  const months = moment().month(-1).format("MMMM YYYY");
  const monthsSecond = moment().month(0).format("MMMM YYYY");
  // const goMonth = today.getMonth();
  // const testMoment = moment().month(goMonth).format("MMMM");

  const listAnomali = (data) => {
    console.log("data anomali", data);
    const widthCell = { minWidth: "20px" };
    const anomali = Object.keys(data).map((kName, j) => {
      // console.log("data anomali kName", kName);
      if (kName !== "anomaly" && kName !== "type") {
        const dataAnomali = data.anomaly
          ? data.anomaly.toString()
          : data.anomaly;
        if (dataAnomali === kName) {
          console.log("data saat anomali", data[kName]);
          let dataAnomShow = data[kName];
          if (data.type === "Trx") {
            dataAnomShow = ThounsandSeparator(data[kName]);
          } else if (data.type === "Rev" || data.type === "SA") {
            dataAnomShow = RupiahConverter(data[kName]);
          }
          return (
            <TableCell style={{ color: constants.color.primaryHard }}>
              {" "}
              {/* {data[kName]} */}
              {dataAnomShow}
            </TableCell>
          );
        }
        // return <TableCell> {data[kName]}</TableCell>;
        let dataShow = data[kName];
        if (data.type === "Trx") {
          dataShow = ThounsandSeparator(data[kName]);
        } else if (data.type === "Rev" || data.type === "SA") {
          dataShow = RupiahConverter(data[kName]);
        }
        return <TableCell style={widthCell}> {dataShow}</TableCell>;
      }
    });
    return anomali;
  };

  const handleMedical = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    setModalLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/analysismodelingservice/v1/analyticData/detailAnalyticData`,
        {
          atmId: dataAtm.atmId,
        },
        config
      )
      .then((res) => {
        console.log(res);
        setModalLoader(false);
        if (res.data.statusCode == 200) {
          //       const dataInfo = res.data.data.infoAtm[0];
          //       localStorage.setItem('infoAtmDetail', JSON.stringify(dataInfo));
          goTo.push(`/trend-analisa/detail/${dataAtm.atmId}#medicalrecord`);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        setModalLoader(false);
        console.log("error", err);
        alert("atm ID not found");
      });
  };

  return (
    <div className={root}>
      <Modal
        className={modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={paper}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton onClick={onClose}>
                <Close className={closeIcon} />
              </IconButton>
            </Grid>
          </Grid>
          <div>
            {isOpenModalLoader ? (
              <LoadingView maxheight="100%" />
            ) : (
              <div className={scrolledContent}>
                <Grid container justify="center">
                  <Grid item>
                    <Typography
                      variant="h4"
                      component="h4"
                      style={{ marginBottom: 20, textAlign: "center" }}
                    >
                      Remodeling
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="column">
                  <div className={dataRemodel}>
                    <Grid item>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography component="h6" variant="h6">
                            Informasi berdasarkan 1 th terakhir
                          </Typography>
                        </Grid>
                        <Grid item style={{ paddingRight: "7%" }}>
                          <Button
                            variant="outlined"
                            onClick={handleMedical}
                            style={{
                              textTransform: "capitalize",
                              color: "#DC241F",
                              border: "1px solid #DC241F",
                              width: 230,
                            }}
                          >
                            Show Medical Record
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Grid container direction="row" style={{ marginTop: 20 }}>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            ATM ID :
                          </Typography>
                          <Typography>{dataAtm.atmId}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Location :
                          </Typography>
                          <Typography>{dataAtm.locationName}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Type Location :
                          </Typography>
                          <Typography>{dataAtm.locationType}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Harga Sewa Per Bulan :
                          </Typography>
                          <Typography>{dataAtm.yearlyRentCost}</Typography>
                        </Grid>
                      </Grid>

                      <Grid container direction="row" style={{ marginTop: 20 }}>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Avg Transaksi :
                          </Typography>
                          <Typography>{dataAtm.averageTransaction}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Avg CASA :
                          </Typography>
                          <Typography>{dataAtm.averageCasa}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Jml Hari Ada Trx Cash :
                          </Typography>
                          <Typography>
                            {dataAtm.totalNumberOfTransactionDays}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Revenue Per Cost :
                          </Typography>
                          <Typography>
                            {dataAtm.revenuePaymentPerCost}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container direction="row" style={{ marginTop: 20 }}>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            {months} :
                          </Typography>
                          <Typography>{dataAtm.lastMonthModel}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            {monthsSecond} : 
                            {/* {testMoment} */}
                          </Typography>
                          <Typography>{dataAtm.lastTwoMonthModel}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Current Model :
                          </Typography>
                          <Typography>{dataAtm.currentModel}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography style={{ fontWeight: 600 }}>
                            Remark Bulan Lalu :
                          </Typography>
                          <Typography>{dataAtm.lastMonthRemark}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>

                  <Grid item xs={11}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>&nbsp;</TableCell>
                          {monthName.map((month, i) => {
                            return <TableCell>{month}</TableCell>;
                          })}
                          <TableCell>Anomaly</TableCell>
                        </TableRow>
                      </TableHead>
                      {history.length > 0 ? (
                        <TableBody>
                          {history.map((data, i) => {
                            return (
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "#E6EAF3",
                                    color: "#8D98B4",
                                  }}
                                >
                                  {data.type}
                                </TableCell>
                                {listAnomali(data)}
                                <TableCell
                                  style={{ color: constants.color.primaryHard }}
                                >
                                  {dataAtm.monthIndex[data.anomaly]}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      ) : (
                        <Typography>Data Kosong</Typography>
                      )}
                    </Table>
                  </Grid>

                  <Grid item>
                    <Grid container direction="row" justify="space-between">
                      <Grid item>
                        <Grid container direction="column">
                          <Grid
                            container
                            direction="row"
                            style={{ marginTop: 20 }}
                          >
                            <Grid item xs={5}>
                              <Typography>
                                <strong>Model Team : </strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography>{dataAtm.currentModel}</Typography>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                          >
                            <Grid item>
                              <Typography>
                                <strong>Model Final :</strong>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Select
                                id="status"
                                value={modelValue}
                                onChange={handleModelChange}
                                input={<BootstrapInput />}
                                IconComponent={DropDownIcon}
                              >
                                {modelFinal.map((item) => {
                                  return (
                                    <MenuItem key={item.id} value={item.name}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item className={remark}>
                        <Typography
                          variant="p"
                          component="p"
                          style={{ marginTop: 20 }}
                        >
                          Remarks :
                        </Typography>
                        <TextArea
                          value={textField}
                          placeholder="Tulis alasan..."
                          required={true}
                          onChange={handleTextChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justify="space-between"
                  className={buttonContainer}
                >
                  <Grid item>
                    <Button
                      variant="outlined"
                      disableElevation
                      className={secondaryButton}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      disableElevation
                      className={primaryButton}
                      onClick={onSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

EditModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  rowToShow: PropTypes.string.isRequired,
  onSubmitBtn: PropTypes.func.isRequired,
  loaderHandler: PropTypes.func.isRequired,
};

export default EditModel;
