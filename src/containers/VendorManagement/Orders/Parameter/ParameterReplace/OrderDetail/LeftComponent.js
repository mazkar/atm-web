import React, { useState, useEffect, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Link,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { KeyboardReturnOutlined } from "@material-ui/icons";
import { ReactComponent as ExchangeIcon } from "../../../../../../assets/icons/siab/gear-grinding.svg";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import LableValue from "../../../../../../components/LableValue";
import InputBordered from "../../../common/InputComponent";
import { ReactComponent as PaperClipIcon } from "../../../../../../assets/icons/linear-red/paperclip.svg";
import SelectItemsIcon from "../../../../../../components/Selects/SelectItemsIcon";
import constants from "../../../../../../helpers/constants";
import { DatePicker } from "antd";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as TodoIcon } from "../../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../../assets/icons/siab/strip-circle.svg";
import { RootContext } from "../../../../../../router";
import useTimestampConverter from "../../../../../../helpers/useTimestampConverter";
import AttachFileSelector from "../../../../../../components/AttachFileSelector";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import moment from "moment";

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "550px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  paperClip: {
    width: 20,
    height: 20,
    paddingTop: 4,
    marginRight: 5,
    cursor: "not-allowed",
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
  attachment: {
    fontWeight: 500,
    fontFamily: "Barlow",
    cursor: "not-allowed",
    color: "#8D98B4",
  },
  attachmentEnabled: {
    fontWeight: 500,
    fontFamily: "Barlow",
    cursor: "pointer",
    color: "#DC241F",
  },
  paperClipEnabled: {
    width: 20,
    height: 20,
    paddingTop: 4,
    marginRight: 5,
    cursor: "pointer",
  },
});

const dataSelectStatus = [
  { value: "TODO", name: "TODO", icon: <TodoIcon /> },
  { value: "DOING", name: "DOING", icon: <DoingIcon /> },
  { value: "DONE", name: "DONE", icon: <DoneIcon /> },
  { value: "STRIP", name: "STRIP", icon: <StripIcon /> },
];
function Status(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          border: "1px solid",
          borderColor: props.borderColor,
          background: props.fillColor,
          color: props.textColor,
          borderRadius: 20,
          width: "max-content",
          paddingLeft: 10,
          paddingRight: 10,
          // margin: "auto",
        }}
      >
        a<Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

const disabledDate = (current) => {
  return current && current < moment().startOf('day');
};
function LeftComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { userRoleName } = useContext(RootContext);
  const {
    data,
    dataResponse,
    handleChangeState,
    handleSave,
    idCard,
    isDisabledEdit,
  } = props;

  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");
  const [attachment3, setAttachment3] = useState("");

  const [ValueTellerId, setValueTellerId] = useState("");
  const [ValueRemotePort, setValueRemotePort] = useState("");
  const [valueflmVendor, setValueflmVendor] = useState("");
  const [valueflmVendorRegional, setValueflmVendorRegional] = useState("");
  const [valueflmVendorSubRegional, setValueflmVendorSubRegional] = useState(
    ""
  );
  const [valueEscrow, setValueEscrow] = useState("");
  const [valueAccount, setValueAccount] = useState("");
  const [valueSubAccount, setValueSubAccount] = useState("");
  const [valueNoPsf, setValueNoPsf] = useState("");
  //Attachment

  useEffect(() => {
    if (attachment1 !== "") {
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "documentList");
    } else {
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment1";
      });
      handleChangeState(newDataList, "documentList");
    }
  }, [attachment1]);
  useEffect(() => {
    if (attachment2 !== "") {
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment2",
        file: attachment2,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "documentList");
    } else {
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment2";
      });
      handleChangeState(newDataList, "documentList");
    }
  }, [attachment2]);

  useEffect(() => {
    if (attachment3 !== "") {
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment3",
        file: attachment3,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "documentList");
    } else {
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment3";
      });
      handleChangeState(newDataList, "documentList");
    }
  }, [attachment3]);

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <div style={{ padding: 20 }}>
          {/*Informasi CIMB*/}
          <Typography style={{ fontWeight: 600, color: "#BCC8E7" }}>
            Informasi CIMB
          </Typography>
          <Divider
            variant="fullWidth"
            style={{
              height: "2px",
              backgroundColor: "#BCC8E7",
              marginTop: 10,
              marginBottom: 20,
            }}
          />

          <Grid container>
            <Grid item xs={6}>
              <LableValue
                lable="No Ticket"
                value={dataResponse?.ticketNumber}
              />
              <LableValue
                lable="ID Location"
                value={dataResponse?.locationId}
              />
              <LableValue
                lable="Nama Lokasi"
                value={dataResponse?.locationName}
              />
              <LableValue
                lable="Alamat"
                value={dataResponse?.locationAddress}
              />
              <LableValue lable="Area" value={dataResponse?.locationArea} />
              <LableValue lable="City" value={dataResponse?.locationCity} />
              <LableValue
                lable="Coordinate"
                value={dataResponse?.latitudeLongitude}
              />
              <LableValue lable="ATM ID Lama" value={dataResponse?.atmId} />
              <LableValue
                lable="Tipe Mesin Lama"
                value={dataResponse?.typeAtm}
              />
            </Grid>

            <Grid item xs={6}>
              <LableValue lable="Premises" value={dataResponse?.premises} />
              <LableValue lable="Kode GFMS" value={dataResponse?.gfmscode} />
              <LableValue lable="PIC/Vendor" value={dataResponse?.picVendor} />
              <LableValue
                lable="Due Date"
                value={
                  dataResponse?.dueDate === null
                    ? "-"
                    : useTimestampConverter(
                        dataResponse?.dueDate / 1000,
                        "DD-MM-YYYY"
                      )
                }
              />
              <LableValue
                lable="Jenis Pekerjaan"
                value={dataResponse?.jobType}
              />
              <LableValue
                lable="Request Type"
                value={dataResponse?.requestType}
              />
              <LableValue lable="Denom" value={dataResponse?.denom} />
              <LableValue
                lable="Notes & Desc"
                value={dataResponse?.notesDescription}
              />
            </Grid>
          </Grid>

          {/*Informasi Vendor*/}
          <Typography
            style={{ fontWeight: 500, color: "#8D98B4", marginTop: 35 }}
          >
            Informasi PIC/Vendor
          </Typography>
          <Divider
            variant="fullWidth"
            style={{
              height: "2px",
              backgroundColor: "#BCC8E7",
              marginTop: 10,
              marginBottom: 20,
            }}
          />
          <Grid container direction="row">
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    ATM ID Baru
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    value={data?.newAtmId}
                    onChange={(e) => {
                      handleChangeState(e.target.value, "newAtmId");
                    }}
                    placeholder="Masukan ATM ID Baru"
                  />
                </Grid>
                {/* <Grid item style={{ marginTop: "13px", marginLeft: "15px" }}>
                  <Typography style={{ fontWeight: "bold", color: "#2B2F3C" }}>
                    {dataResponse?.newAtmId}
                  </Typography>
                </Grid> */}
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Tipe Mesin Baru
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    value={data?.newMachineType}
                    onChange={(e) => {
                      handleChangeState(e.target.value, "newMachineType");
                    }}
                    placeholder="Masukan Tipe Mesin Baru"
                  />
                </Grid>
                {/* <Grid item style={{ marginTop: "13px", marginLeft: "15px" }}>
                  <Typography style={{ fontWeight: "bold", color: "#2B2F3C" }}>
                    {dataResponse?.newMachineType}
                  </Typography>
                </Grid> */}
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Teller ID
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      //setValueTellerId(e.target.value);
                      handleChangeState(e.target.value, "tellerId");
                    }}
                    placeholder="Masukan Teller ID"
                    value={data?.tellerId}
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Remote Port
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueRemotePort(e.target.value);
                      handleChangeState(e.target.value, "remotePort");
                    }}
                    value={data?.remotePort}
                    placeholder="Masukan Remote Port"
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    FLM Vendor
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueflmVendor(e.target.value);
                      handleChangeState(e.target.value, "flmVendor");
                    }}
                    placeholder="Masukan FLM Vendor"
                    value={data?.flmVendor}
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    FLM Vendor Regional
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueflmVendorRegional(e.target.value);
                      handleChangeState(e.target.value, "flmVendorRegional");
                    }}
                    placeholder="Masukan FLM Vendor Regional"
                    value={data?.flmVendorRegional}
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    FLM Vendor Sub Regional
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueflmVendorSubRegional(e.target.value);
                      handleChangeState(e.target.value, "flmVendorSubRegional");
                    }}
                    placeholder="Masukan FLM Vendor Sub Regional"
                    value={data?.flmVendorSubRegional}
                  />
                </Grid>
                {/* <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Escrow
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueEscrow(e.target.value);
                      handleChangeState(e.target.value, "escrow");
                    }}
                    placeholder="Masukan Escrow"
                    value={data?.escrow}
                  />
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Grid item>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Escrow
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      handleChangeState(e.target.value, "escrow");
                    }}
                    placeholder="Masukan Escrow"
                    value={data?.escrow}
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Account
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueAccount(e.target.value);
                      handleChangeState(e.target.value, "account");
                    }}
                    placeholder="Masukan Account"
                    value={data?.account}
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Sub Account
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueSubAccount(e.target.value);
                      handleChangeState(e.target.value, "subAccount");
                    }}
                    placeholder="Masukan Sub Account"
                    value={data?.subAccount}
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    No PSF
                  </Typography>
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <InputBordered
                    style={{
                      width: "90%",
                      height: "24px",
                    }}
                    onChange={(e) => {
                      setValueNoPsf(e.target.value);
                      handleChangeState(e.target.value, "noPsf");
                    }}
                    placeholder="Masukan No PSF"
                    value={data?.noPsf}
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Tgl Request PSF
                  </Typography>
                </Grid>
                <Grid item>
                  <DatePicker
                    suffixIcon={
                      <CalendarIcon
                        style={{
                          height: 20,
                          position: "absolute",
                          top: 0,
                          right: -10,
                        }}
                      />
                    }
                    disabledDate={disabledDate}
                    onChange={(newDate) => {
                      let valDate = "";
                      if (newDate === null) {
                        valDate = "";
                      } else {
                        valDate = newDate.unix() * 1000;
                      }
                      handleChangeState(valDate, "requestDate");
                    }}
                    value={data.requestDate ? moment(data.requestDate) : ""}
                    style={{
                      borderRadius: 6,
                      height: "40px",
                      border: "1px solid #BCC8E7",
                      width: "90%",
                      marginTop: "5px",
                    }}
                    placeholder="Masukan Tgl Request PSF"
                    format="DD-MM-YYYY"
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <Typography style={{ fontWeight: 500, color: "#2B2F3C" }}>
                    Tgl Selesai PSF
                  </Typography>
                </Grid>
                <Grid item>
                  <DatePicker
                    suffixIcon={
                      <CalendarIcon
                        style={{
                          height: 20,
                          position: "absolute",
                          top: 0,
                          right: -10,
                        }}
                      />
                    }
                    disabledDate={disabledDate}
                    onChange={(newDate) => {
                      let valDate = "";
                      if (newDate === null) {
                        valDate = "";
                      } else {
                        valDate = newDate.unix() * 1000;
                      }
                      handleChangeState(valDate, "doneDate");
                    }}
                    value={data.doneDate ? moment(data.doneDate) : ""}
                    style={{
                      borderRadius: 6,
                      height: "40px",
                      border: "1px solid #BCC8E7",
                      width: "90%",
                      marginTop: "5px",
                    }}
                    placeholder="Masukan Tgl Selesai PSF"
                    format="DD-MM-YYYY"
                  />
                </Grid>
                <Grid item style={{ marginTop: "13px" }}>
                  <LableValue
                    lable="Upload PSF"
                    value={
                      data?.psfFileRes ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <MinioDocComponent filePath={data?.psfFileRes} />
                          {isDisabledEdit === false && (
                            <IconButton
                              style={{ marginleft: 10, color: "#DC241F" }}
                              onClick={() => {
                                handleChangeState(null, "psfFileRes");
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </div>
                      ) : (
                        <>
                          {isDisabledEdit === false && (
                            <AttachFileSelector
                              title="Upload PSF"
                              refId="psfAttach"
                              onChange={(e) =>
                                handleChangeState(e.target.files[0], "psfFile")
                              }
                              selectedFile={data.psfFile}
                              onDelete={() => handleChangeState("", "psfFile")}
                            />
                          )}
                        </>
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography
            style={{ fontWeight: 500, color: "#8D98B4", marginTop: 35 }}
          >
            Informasi Umum
          </Typography>
          <Divider
            variant="fullWidth"
            style={{
              height: "2px",
              backgroundColor: "#BCC8E7",
              marginTop: 10,
              marginBottom: 20,
            }}
          />
          <Grid container>
            <Grid item xs={6}>
              <LableValue
                lable="ID Requester"
                value={dataResponse?.requesterId}
              />
              <LableValue
                lable="Initial Cabang"
                value={dataResponse?.branchCode}
              />
              <LableValue lable="Kode GFMS" value={dataResponse?.gfmsCode} />
              <LableValue
                lable="Nama Req"
                value={dataResponse?.requesterName}
              />
              <LableValue
                lable="Nama Branch"
                value={dataResponse?.branchName}
              />
              <LableValue
                lable="No Telp Req"
                value={dataResponse?.requesterTelephoneNumber}
              />
              <LableValue
                lable="Email Requester"
                value={dataResponse?.requestEmail}
              />
              <LableValue
                lable="Alamat Branch"
                value={dataResponse?.branchAddress}
              />
              <LableValue
                lable="Nama PIC Loc"
                value={dataResponse?.picLocName}
              />
              <LableValue
                lable="Telp PIC Loc"
                value={dataResponse?.picLocTelephoneNumber}
              />
              <LableValue
                lable="Email PIC Loc"
                value={dataResponse?.picLocEmail}
              />
              <LableValue lable="Type Loc" value={dataResponse?.LocationType} />
              <LableValue
                lable="Ruang ATM"
                value={dataResponse?.atmBoothType}
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue
                lable="Luas Area"
                value={dataResponse?.atmBoothLarge}
              />
              <LableValue
                lable="Akses Umum"
                value={dataResponse?.publicAccessibility}
              />
              <LableValue
                lable="Operasional"
                value={dataResponse?.operational}
              />
              <LableValue
                lable="Jumlah ATM Lain"
                value={dataResponse?.aroundAtmBank}
              />
              <LableValue lable="Denom" value={dataResponse?.denom} />
              <LableValue lable="AC" value={dataResponse?.acType} />
              <LableValue lable="Kebersihan" value={dataResponse?.cleanType} />
              <LableValue lable="Komunikasi" value={dataResponse?.commType} />
              <LableValue
                lable="Media Promosi"
                value={
                  dataResponse?.mediaPromotion == null
                    ? ""
                    : JSON.parse(dataResponse.mediaPromotion).toString()
                }
              />
              <LableValue lable="Notes" value={dataResponse?.notes} />
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 15 }}>
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Status
            </Typography>
          </Grid>
          <Grid item xs={7} style={{ marginTop: 5, paddingRight: "60px" }}>
            <SelectItemsIcon
              selectOptionData={dataSelectStatus}
              selectedValue={data.status}
              onSelectValueChange={(newVal) =>
                handleChangeState(newVal, "status")
              }
              disabled={isDisabledEdit}
            />
          </Grid>
          <Grid item style={{ marginTop: 5, paddingRight: "60px" }}>
            <Typography
              style={{
                fontWeight: 400,
                fontStyle: "Italic",
                color: "#8D98B4",
                fontSize: "13px",
              }}
            >
              *Status berubah menjadi <b>overdue</b> ketika due date terlewati
            </Typography>
          </Grid>

          <Grid item style={{ marginTop: "25px", width: "96%" }}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "10px" }}
                >
                  <Typography style={{ fontWeight: 600, color: "#2B2F3C" }}>
                    CIMB Attachment
                  </Typography>
                  {dataResponse?.cimbAttachment.length > 0 ? (
                    dataResponse.cimbAttachment.map((item) => {
                      return (
                        <MinioDocComponent
                          filePath={item.path}
                          textColor="#8D98B4"
                        />
                      );
                    })
                  ) : (
                    <Typography
                      style={{
                        color: "#BCC8E7",
                        fontStyle: "italic",
                        fontSize: 12,
                      }}
                    >
                      No Files
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "10px" }}
                >
                  <Typography style={{ fontWeight: 600, color: "#2B2F3C" }}>
                    PIC/Vendor Attachment
                  </Typography>
                  {data.vendorAttachment.length > 0 &&
                    data.vendorAttachment.map((item, index) => {
                      const currentIndex = index;
                      return (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <MinioDocComponent filePath={item.path} />
                          {isDisabledEdit === false && (
                            <IconButton
                              cstyle={{ marginLeft: 10, color: "#DC241F" }}
                              onClick={() => {
                                const oldArr = data.vendorAttachment.slice();
                                const newArr = oldArr.filter(function (
                                  itemOld,
                                  i
                                ) {
                                  return i !== currentIndex;
                                });
                                handleChangeState(newArr, "vendorAttachment");
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </div>
                      );
                    })}
                  {isDisabledEdit ? (
                    <>
                      {data.vendorAttachment.length < 1 && (
                        <Typography
                          style={{
                            color: "#BCC8E7",
                            fontStyle: "italic",
                            fontSize: 12,
                          }}
                        >
                          No Files
                        </Typography>
                      )}
                    </>
                  ) : (
                    <>
                      {data.vendorAttachment.length < 1 && (
                        <AttachFileSelector
                          title="Attachment 1"
                          refId="attachmet1"
                          onChange={(e) => setAttachment1(e.target.files[0])}
                          selectedFile={attachment1}
                          onDelete={() => setAttachment1("")}
                        />
                      )}
                      {data.vendorAttachment.length < 2 && (
                        <AttachFileSelector
                          title="Attachment 2"
                          refId="attachmet2"
                          onChange={(e) => setAttachment2(e.target.files[0])}
                          selectedFile={attachment2}
                          onDelete={() => setAttachment2("")}
                        />
                      )}
                      {data.vendorAttachment.length < 3 && (
                        <AttachFileSelector
                          title="Attachment 3 "
                          refId="attachmet3"
                          onChange={(e) => setAttachment3(e.target.files[0])}
                          selectedFile={attachment3}
                          onDelete={() => setAttachment3("")}
                        />
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*Button Container */}
          <Grid item style={{ marginTop: 55 }}>
            <Grid
              container
              justify="space-between"
              style={{ paddingLeft: 5, paddingRight: 30 }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.secondaryButton}
                  style={{ textTransform: "capitalize" }}
                >
                  Cancel
                </Button>
              </Grid>
              {isDisabledEdit === false && (
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={handleSave}
                    style={{ textTransform: "capitalize" }}
                  >
                    Submit
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}
LeftComponent.propTypes = {
  data: PropTypes.object.isRequired,
  dataResponse: PropTypes.object.isRequired,
  handleChangeState: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  idCard: PropTypes.string.isRequired,
};
LeftComponent.defaultProps = {};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(LeftComponent))
);
