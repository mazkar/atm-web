/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { makeStyles, Grid, Typography, Button, Paper } from "@material-ui/core";
import { Select, DatePicker, TimePicker } from "antd";
import moment from "moment";
import axios from "axios";
import { DateRangeTwoTone } from "@material-ui/icons";
import constants from "../../../../helpers/constants";
import { ReactComponent as PaperClip } from "../../../../assets/icons/siab/paperclip.svg";
import { ReactComponent as FileText } from "../../../../assets/icons/siab/file-text.svg";
import { ReactComponent as BackIcon } from "../../../../assets/icons/general/arrow_back_red.svg";
import SubAtmInfo from "./subAtmInfo";
import SubDetailPaper from "./subDetailPaper";
import PaperSubmissionProgress from "../../../../components/GeneralComponent/PaperSubmissionProgress";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../../assets/icons/siab/arrow-left.svg";
import RupiahConverter from "../../../../helpers/useRupiahConverter";
import LoadingView from "../../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constants.color.primaryHard,
    marginLeft: 5,
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
      "& .MuiButton-label": {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
  details: {
    margin: "20px 0px",
    padding: 10,
    border: "1px solid #BCC8E7",
    borderRadius: 8,
  },
  inputDate: {
    "& .ant-picker": {
      borderRadius: 6,
    },
  },
  inputDay: {
    width: 90,
    "& .ant-select:not .ant-select-customize-input .ant-select-selector": {
      borderRadius: 6,
    },
  },
  btnSend: {
    backgroundColor: constants.color.primaryHard,
    color: "white",
    borderRadius: 6,
    textTransform: "capitalize",
    height: 30,
  },
  btnSubmit: {
    backgroundColor: constants.color.primaryHard,
    color: "white",
    borderRadius: 6,
    textTransform: "capitalize",
  },
  uploadFile: {
    cursor: "pointer",
    width: "100%",
    display: "flex",
    justifyItems: "space-between",
    height: 3,
  },
});

const SubDetailTermin = ({ history }) => {
  const classes = useStyles();

  // ANTD COMPONENT //
  const { Option } = Select;
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";

  const roleName = window.sessionStorage.getItem("roleName");

  // INITIAL STATE //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileNamePath, setFileNamePath] = useState("");
  const [fileFile, setFileFile] = useState(null);
  const [data, setData] = useState("");
  const [position, setPosition] = useState(null);
  const [cost, setCost] = useState("");
  const [dataDetailCost, setDataDetailCost] = useState("");
  const [isButtonDisabled, setIsButtonDisables] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [statusProgress, setStatusProgress] = useState();
  // GET ID from URL
  const { id } = useParams();
  const rowId = { id };

  const { atmId } = useParams();
  const idAtm = { atmId };

  function handleChangeDay(value) {
    setDay(value);
  }

  const handleSelectDate = (date, dateString) => {
    setStartDate(date);
  };

  const handleTimeStart = (time, timeString) => {
    setStartTime(moment(time).format(timeFormat));
  };

  function limitString(string, count) {
    const result =
      string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }

  function isEmpty(obj) {
    for (const x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
    return true;
  }

  const handleTimeEnd = (time, timeString) => {
    setEndTime(moment(time).format(timeFormat));
  };

  function fileSizeValidate(fdata, maxSize) {
    const fsize = fdata.size / 1024;
    if (fsize > maxSize) {
      // alert(`Maximum file size is 1 MB. Try Again With Another File!`);
      setFileFile(null);
      return false;
    }
    // console.log(`File valid`);
    return true;
  }

  const handleChange = (event) => {
    event.preventDefault();
    setFileName(event.target.files[0].name);
    setFileFile(event.target.files[0]);
  };

  useEffect(() => {
    if (statusProgress === 12) {
      setIsButtonDisables(true);
    } else if (fileName) {
      setIsButtonDisables(false);
    } else {
      setIsButtonDisables(true);
    }
  }, [fileName, statusProgress]);

  // HIT API GET Data Detail
  useEffect(() => {
    setModalLoader(true);
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/viewSubmissionTermin`,
          rowId,
          config
        )
        .then((res) => {
          const newData = res.data;
          const dataTermin = {
            revocationDay: newData.revocationDay
              ? newData.revocationDay
              : "Senin",
            revocationDate: newData.revocationDate
              ? moment(newData.revocationDate)
              : new Date(),
            startRevocationTime: newData.startRevocationTime
              ? newData.startRevocationTime
              : "00:00",
            endRevocationTime: newData.endRevocationTime
              ? newData.endRevocationTime
              : "00:00",
            fileTerminPath: newData.fileTerminPath
              ? newData.fileTerminPath.slice(
                newData.fileTerminPath.lastIndexOf("/") + 1
              )
              : null,
          };

          setDay(dataTermin.revocationDay);
          setStartTime(dataTermin.startRevocationTime);
          setEndTime(dataTermin.endRevocationTime);
          setStartDate(dataTermin.revocationDate);
          setFileName(dataTermin.fileTerminPath);
          setFileNamePath(newData.fileTerminPath);
          setModalLoader(false);
        });
    } catch (err) {
      alert(err);
    }

    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/detailSubmissionNew`,
        rowId,
        config
      )
      .then((res) => {
        // console.log("RESPONSE", JSON.stringify(res));
        const dataInfo = res.data.informasiNegotiation[0];
        // console.log("INI DATA", dataInfo);
        const newInfo = {
          atmId: dataInfo.atmId || '-',
          type: dataInfo.openingType === null ? "-" : dataInfo.openingType,
          locationPhotoslist: dataInfo.locationPhotoslist,
          kondisi: dataInfo.openingType === null ? "-" : dataInfo.openingType,
          lokasiId: dataInfo.newLocation === null ? "-" : dataInfo.newLocation,
          alamat: dataInfo.address === null ? "-" : dataInfo.address,
          roArea: dataInfo.area === null ? "-" : dataInfo.area,
          cabang: dataInfo.branch === null ? "-" : dataInfo.branch,
          picCabang:
            dataInfo.branchPicName === null ? "-" : dataInfo.branchPicName,          
          branchInitial: dataInfo.branchInitial || '-',
          codeGFMS: dataInfo.codeGFMS || '-',
          boothType: dataInfo.boothType || '-',
          picPemilik:
            dataInfo.ownerPicName === null ? "-" : dataInfo.ownerPicName,
          picOnLocation:
            dataInfo.locationPicName === null ? "-" : dataInfo.locationPicName,
          populasiATM: dataInfo.countAtm === null ? "-" : dataInfo.countAtm,
          categoryType:
            dataInfo.categoryType === null ? "-" : dataInfo.categoryType,
          locationCategory:
            dataInfo.locationCategory === null
              ? "-"
              : dataInfo.locationCategory,
          // jenisLokasiMakro: dataInfo.macroLocationType === null ? '-' : dataInfo.macroLocationType,
          // jenisLokasiMikro: dataInfo.microLocationType === null ? '-' : dataInfo.microLocationType,
          aksesibilitas:
            dataInfo.workingHour === null ? "-" : `${dataInfo.workingHour} Jam`,
          aksesPublik:
            dataInfo.publicAccessibility === null
              ? "-"
              : dataInfo.publicAccessibility,
          luasArea:
            dataInfo.buildingLarge === null ? "-" : dataInfo.buildingLarge,
          jumlahAtmBankLain:
            dataInfo.aroundAtmCount === null ? "-" : dataInfo.aroundAtmCount,
          tipeAtm: dataInfo.typeAtm === null ? "-" : dataInfo.typeAtm,
          ruangAtm:
            dataInfo.boothAvailability === null
              ? "-"
              : dataInfo.boothAvailability,
          komunikasi: dataInfo.commType === null ? "-" : dataInfo.commType,
          nilaiTerendah: dataInfo.minOffering,
          nilaiTengah: dataInfo.averageOffering,
          nilaiTertinggi: dataInfo.maxOffering,
          locationPhotosPositionNeonSign:
            dataInfo.locationPhotosPositionNeonSign,
          locationPhotosPositionAtenaVsat:
            dataInfo.locationPhotosPositionAtenaVsat,
          locationMachinePhotos:
            dataInfo.locationMachinePhotos,
          locationFrontMachinePhoto:
            dataInfo.locationFrontMachinePhoto,
        };
        // console.log("INI NEW INFO", JSON.stringify(newInfo));
        // set constructed data
        setData(newInfo);
        setModalLoader(false);

        const dataLocation = res.data.informasiNegotiation[0];
        const newPosition = [
          dataLocation.latitude === null ? -6.1753924 : dataLocation.latitude,
          dataLocation.longitude === null
            ? 106.8249641
            : dataLocation.longitude,
        ];

        setPosition(newPosition);
        setModalLoader(false);
        // console.log("new location", newPosition);

        const dataCost = res.data.detailRent;
        // console.log("INI COST", dataCost);
        setCost(dataCost);
        setModalLoader(false);

        const dataCostDetail = res.data.rent[0];
        const { detailRent } = res.data;
        const approver = res.data.rent[0].daNameList;
        // console.log("INI DETAIL BIAYA", dataCostDetail);
        // console.log("APPROVER", approver);
        const newDetail = {
          biayaSewa: detailRent.map(({yearlyRentCost})=>RupiahConverter(yearlyRentCost)),
          biayaListrik:
            dataCostDetail.yearlyElectricityCost === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyElectricityCost),
          telepon:
            dataCostDetail.yearlyTelephoneRentCost === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyTelephoneRentCost),
          serviceCharge:
            dataCostDetail.yearlyServiceCharge === null
              ? "-"
              : RupiahConverter(dataCostDetail.yearlyServiceCharge),
          totalSewa:
            dataCostDetail.totalRent === null
              ? "-"
              : RupiahConverter(dataCostDetail.totalRent),
          fileDocument: dataCostDetail.documents,
          name: approver === null ? "N/A" : approver,
        };
        setDataDetailCost(newDetail);
        setModalLoader(false);
        setStatusProgress(res.data.status);
      // console.log("DETAIL COST", newDetail);
      })
      .catch((err) => {
        setModalLoader(false);
        alert(err);
      });
  }, []);

  const doUpload = async (file) => {
    setModalLoader(true);
    try {
      setModalLoader(true);
      const formData = new FormData();
      formData.append("file", file);
      const result = await axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/uploadOfferingFiles`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      // console.log(result);
      setModalLoader(false);
      return result;
    } catch (err) {
      setModalLoader(false);
      alert(`Upload file failed, Please Try Again! \n${err}`);
    }
  };

  const matchRoleName = (value) => {
    if (value) {
      const result = value.toLowerCase().match(/planning/g) || [];
      if (result.length) {
        return result[0];
      } 
      return value;
    }
  };

  const handleSubmit = () => {
    setModalLoader(true);

    if (fileFile !== null) {
      if (fileSizeValidate(fileFile, 1024) === false) {
        setModalLoader(false);
        alert("Maximum file size is 1 MB. Try Again with Another File!");
      } else {
        doUpload(fileFile).then((response) => {
          if (response.data.responseCode === "00") {
            try {
              const dataSubmit = {
                id: rowId.id,
                revocationDay: moment(startDate).format("dddd"),
                revocationDate: moment(startDate).format("YYYY-MM-DD"),
                startRevocationTime: startTime,
                endRevocationTime: endTime,
                fileTerminPath: response.data.path,
                submit: true,
                approval: true,
              };

              const config = {
                headers: { "Content-Type": "application/json" },
              };

              axios
                .post(
                  `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/submitSubmissionTermin`,
                  dataSubmit,
                  config
                )
                .then((resultSubmit) => {
                // console.log("resultSubmit", resultSubmit);
                  setModalLoader(false);
                  alert(`Success Submission!`);
                  window.location.assign("/site-management/document-legality#termin");
                });
            } catch (err) {
              setModalLoader(false);
              alert(`Failed Submit Data to Landlord!`);
            // console.log(err);
            }
          }
        });
      }
    } else {
      try {
        const dataSubmit = {
          id: rowId.id,
          revocationDay: moment(startDate).format("dddd"),
          revocationDate: moment(startDate).format("YYYY-MM-DD"),
          startRevocationTime: startTime,
          endRevocationTime: endTime,
          fileTerminPath: fileNamePath,
          submit: true,
          approval: true,
        };

        const config = {
          headers: { "Content-Type": "application/json" },
        };

        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/submitSubmissionTermin`,
            dataSubmit,
            config
          )
          .then((resultSubmit) => {
            setModalLoader(false);
            alert(`Success Submission!`);
            window.location.assign("/site-management/document-legality#termin");
          });
      } catch (err) {
        setModalLoader(false);
        alert(`Failed Submit Data to Landlord!`);
      }
    }
  };

  return (
    <div>
      {isOpenModalLoader ? (
        <LoadingView maxheight="100%" />
      ) : (
        <div className={classes.root}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container>
                <div className={classes.backButton}>
                  <MuiIconLabelButton
                    label="Back"
                    iconPosition="startIcon"
                    onClick={() => window.history.back()}
                    buttonIcon={<ArrowLeft />}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid item>
              <SubAtmInfo
                atmId={idAtm}
                data={data}
                position={position}
                cost={cost}
              />
            </Grid>

            <Grid item>
              <PaperSubmissionProgress statusProgress={statusProgress} />
            </Grid>

            <Grid item>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <SubDetailPaper dataDetail={dataDetailCost} />
                </Grid>

                <Grid item xs={8}>
                  <Paper style={{ padding: 20 }}>
                    <Typography style={{ fontSize: 24, fontWeight: 500 }}>
                      Detail Penarikan
                    </Typography>

                    <div className={classes.details}>
                      <Typography
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          marginBottom: 25,
                        }}
                      >
                        Konfirmasi dari Landlord
                      </Typography>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={3} className={classes.inputDate}>
                          <Typography>Tanggal :</Typography>
                          <DatePicker
                            format={dateFormat}
                            value={moment(startDate, dateFormat)}
                            popupStyle={{ zIndex: 1500 }}
                            onChange={handleSelectDate}
                            allowClear={false}
                          />
                        </Grid>
                        <Grid item xs={2} className={classes.inputDate}>
                          <Typography>Waktu :</Typography>
                          <TimePicker
                            popupStyle={{ zIndex: 1500 }}
                            onChange={handleTimeStart}
                            format={timeFormat}
                            value={moment(startTime, timeFormat)}
                            allowClear={false}
                          />
                        </Grid>
                        <Grid item xs={2} className={classes.inputDate}>
                          <Typography>Hingga :</Typography>
                          <TimePicker
                            popupStyle={{ zIndex: 1500 }}
                            onChange={handleTimeEnd}
                            format={timeFormat}
                            value={moment(endTime, timeFormat)}
                            allowClear={false}
                          />
                        </Grid>
                        {/* <Grid item xs={3}>
                          <Typography>&nbsp;</Typography>
                          <input
                            id="fileFile"
                            type="file"
                            onChange={handleChange}
                            style={{
                              width: "0.1px",
                              height: "0.1px",
                              opacity: 0,
                              overflow: "hidden",
                              position: "absolute",
                              zIndex: -1,
                            }}
                          />
                          <label htmlFor="fileFile">
                            <div className={classes.uploadFile}>
                              {fileName === null ? (
                                <div
                                  style={{
                                    marginTop: 4,
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <PaperClip />
                                  <Typography
                                    style={{
                                      fontSize: 13,
                                      color: "#DC241F",
                                      fontWeight: 400,
                                      fontStyle: "italic",
                                      marginLeft: 5,
                                    }}
                                  >
                                    Attach Document
                                  </Typography>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    marginTop: 4,
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <FileText />
                                  <Typography
                                    style={{
                                      fontSize: 13,
                                      color: "#DC241F",
                                      marginLeft: 5,
                                    }}
                                  >
                                    {limitString(fileName, 15)}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </label>
                        </Grid> */}
                        {/* <Grid item xs={3}>
                          <Typography>&nbsp;</Typography>
                          <Button
                            variant="contained"
                            className={classes.btnSend}
                            onClick={handleSend}
                            disabled={isButtonSend}
                          >
                            Send To Landlord
                          </Button>
                        </Grid> */}
                      </Grid>
                    </div>

                    {/* <div className={classes.details} style={{display: displayFormValue}}>
                      <Typography style={{fontSize: 15, fontWeight: 500, marginBottom: 25}}>Tanggal & Waktu Tarik</Typography>
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={2}>
                          <Typography>Hari :</Typography>
                          <Select defaultValue="Senin" value={isEmpty(dayTwo) ? "Senin" : (dayTwo)} className='CommonSelect__select--bordered' onChange={handleChangeDaySubmit}>
                            <Option value="Senin">Senin</Option>
                            <Option value="Selasa">Selasa</Option>
                            <Option value="Rabu" >Rabu</Option>
                            <Option value="Kamis">Kamis</Option>
                            <Option value="Jumat">Jumat</Option>
                            <Option value="Sabtu">Sabtu</Option>
                            <Option value="Minggu">Minggu</Option>
                          </Select>
                        </Grid>
                        <Grid item xs={3} className={classes.inputDate}>
                          <Typography>Tanggal :</Typography>
                          <DatePicker 
                            format={dateFormat}  
                            popupStyle={{zIndex: 1500}} 
                            onChange={handleSelectDate} 
                            value={moment(dateSubmit)}
                          />
                        </Grid>
                        <Grid item xs={2} className={classes.inputDate}>
                          <Typography>Waktu :</Typography>
                          <TimePicker 
                            popupStyle={{zIndex: 1500}} 
                            onChange={handleTimeStart} 
                            // defaultValue={moment('14:00', format)} 
                            format={format} 
                            value={moment(startTimeSubmit)}
                          />
                        </Grid>
                        <Grid item xs={2} className={classes.inputDate}>
                          <Typography>Hingga :</Typography>
                          <TimePicker 
                            popupStyle={{zIndex: 1500}} 
                            onChange={handleTimeEnd} 
                            // defaultValue={moment('14:00', format)} 
                            format={format} 
                            value={moment(endTimeSubmit)}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography>&nbsp;</Typography>
                          <input 
                            id='fileFile'
                            type="file" 
                            onChange={handleChange}
                            style={{
                              width: '0.1px',
                              height: '0.1px',
                              opacity: 0,
                              overflow: 'hidden',
                              position: 'absolute',
                              zIndex: -1,
                            }}/>
                          <label htmlFor="fileFile" >
                            <div className={classes.uploadFile}>
                              {fileFile === null ?
                                <div style={{marginTop: 4, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                  <PaperClip/>
                                  <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400, fontStyle: 'italic', marginLeft:5 }}>Attach Document</Typography>
                                </div>
                                : 
                                <div style={{marginTop: 4, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                  <FileText/>
                                  <Typography style={{fontSize: 13, color: '#DC241F', marginLeft:5 }}>{limitString(fileFile.name, 15)}</Typography>
                                </div> 
                              }
                            </div>
                          </label>
                        </Grid>
                      </Grid>
                    </div> */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignContent: "flex-end",
                        marginTop: 60,
                      }}
                    >
                      <Button
                        variant="contained"
                        className={classes.btnSubmit}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default withRouter(SubDetailTermin);
