import React, { useState, useEffect, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Link,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Select } from "antd";
import constants from "../../../../../helpers/constants";
import * as Colors from "../../../../../assets/theme/colors";
import StatusComponent from "../../../../../components/StatusComponent";
import NoImage from "../../../../../assets/images/image.png";
import useRupiah from "../../../../../helpers/useRupiahConverterSecondary";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import SelectItemsIcon from "../../../../../components/Selects/SelectItemsIcon";
import { RootContext } from "../../../../../router";
import { ReactComponent as TodoIcon } from "../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../assets/icons/siab/strip-circle.svg";
import LableValue from "../../../../../components/LableValue";
import { ChkyInputSmall } from "../../../../../components";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import AttachFileSelector from "../../../../../components/AttachFileSelector";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import ErrorComponent from "../../../../../components/ErrorComponent";

const { Option } = Select;
const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "550px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  rootPaperSecond: {
    display: "flex",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: Colors.White,
    boxShadow: "unset",
    height: "40px",
    border: "1px solid #BCC8E7",
  },
  iconButton: {
    padding: "0px 5px",
    color: Colors.GrayMedium,
    display: "flex",
    alignItems: "center",
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  resetImage: {
    position: "absolute",
    width: "15px",
    height: "15px",
    top: -10,
    right: -10,
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
  paperClip: {
    width: 20,
    height: 20,
    paddingTop: 4,
    marginRight: 5,
    cursor: "not-allowed",
  },
  paperClipEnabled: {
    width: 20,
    height: 20,
    paddingTop: 4,
    marginRight: 5,
    cursor: "pointer",
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  select: {
    minWidth: 120,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  inputFieldSelect: {
    border: "1px solid #A8B6DB",
    borderRadius: "0px 6px 6px 0px",
    boxSizing: "border-box",
    padding: "10px",
    fontFamily: "Barlow",
    width: 320,
    height: "41px",
    "& ::placeholder": {
      color: "#A8B6DB",
    },
    "& ::selection": {
      background: "#FF6130",
    },
    "&:hover": {
      border: "1px solid #A8B6DB",
    },
  },
  selectPremises: {
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder":
      {
        paddingTop: "5px",
        color: "#DC241F",
      },
    "& .ant-select-single .ant-select-selector": {
      height: "41px",
      border: "1px solid #DC241F",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "& .ant-select-single .ant-select-arrow": {
      transition: "transform 0.2s ease-in",
      color: "#DC241F",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: " rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
  selectKonven: {
    "& .ant-select.ant-select-single .ant-select-selector": {
      paddingTop: "5px",
      height: "41px",
      border: "1px solid #F4F7FB",
      backgroundColor: "#FFFF",
      color: "#2B2F3C",
      borderRadius: 6,
    },
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
  imgContainer: {
    borderRadius: 10,
    width: 80,
    height: 85,
  },
});
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
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}
const dataSelectStatus = [
  { value: "TODO", name: "TODO", icon: <TodoIcon /> },
  { value: "DOING", name: "DOING", icon: <DoingIcon /> },
  { value: "DONE", name: "DONE", icon: <DoneIcon /> },
  { value: "STRIP", name: "STRIP", icon: <StripIcon /> },
];

function LeftComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { userRoleName } = useContext(RootContext);
  const [noInvoice, setNoInvoice] = useState(null);
  const {
    data,
    dataResponse,
    isDisabledEdit,
    handleChangeState,
    handleSave,
    idCard,
  } = props;
  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");
  const [attachment3, setAttachment3] = useState("");
  
  const [isMaxLimit, setIsMaxLimit] = useState(false);

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

  useEffect(() => {
    console.log("+++ dataResponse", dataResponse);
    if (dataResponse) {
      setNoInvoice(dataResponse.invoiceNumber);
    }
  }, [dataResponse]);

  function statusApproval(value) {
    switch (value) {
    case 0:
      return <StatusComponent color="yellow" lable="Need Approval" />;
    case 1:
      return <StatusComponent color="green" lable="Approved" />;
    default:
      return value;
    }
  }
  function textDays(value) {
    // eslint-disable-next-line radix
    if (parseInt(value) > 14) {
      return <Typography style={{ color: "#FF6A6A" }}>{value} Days</Typography>;
    }
    return <Typography style={{ color: "#65D170" }}>{value} Days</Typography>;
  }
  function paidStatus(value) {
    switch (value) {
    case 0:
      return <StatusComponent color="red" lable="Unpaid" />;
    default:
      return <StatusComponent color="green" lable="Approved" />;
    }
  }
  return (
    <div>
      <Paper className={classes.rootPaper}>
        <div style={{ padding: 20 }}>
          {/* Informasi CIMB */}
          <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
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
                value={
                  dataResponse?.ticket !== null ? dataResponse?.ticket : "-"
                }
              />
              <LableValue
                lable="Tgl Request"
                value={
                  dataResponse?.requestDate === null
                    ? "-"
                    : useTimestampConverter(
                        dataResponse?.requestDate / 1000,
                        "DD-MM-YYYY"
                    )
                }
              />
              <LableValue
                lable="User Request"
                value={dataResponse?.requestUser}
              />
              <LableValue
                lable="ID Mesin"
                value={
                  dataResponse?.idMesin !== null ? dataResponse?.idMesin : "-"
                }
              />
              <LableValue
                lable="ID Location"
                value={
                  dataResponse?.locationId !== null
                    ? dataResponse?.locationId
                    : "-"
                }
              />
              <LableValue
                lable="Nama Lokasi"
                value={
                  dataResponse?.locationName !== null
                    ? dataResponse?.locationName
                    : "-"
                }
              />
              <LableValue
                lable="Alamat"
                value={
                  dataResponse?.address !== null ? dataResponse?.address : "-"
                }
              />
              <LableValue
                lable="Area"
                value={dataResponse?.area !== null ? dataResponse?.area : "-"}
              />
              <LableValue
                lable="City"
                value={dataResponse?.city !== null ? dataResponse?.city : "-"}
              />
              <LableValue
                lable="Lat-Long"
                value={
                  dataResponse?.latLong !== null ? dataResponse?.latLong : "-"
                }
              />
              <LableValue
                lable="Nama Penandatangan LOO / MOU"
                value={
                  dataResponse?.signerLooMouName !== null
                    ? dataResponse?.signerLooMouName
                    : "-"
                }
              />
              <LableValue
                lable="No HP Penandatangan LOO / MOU"
                value={
                  dataResponse?.signerLooMouTelepone !== null
                    ? dataResponse?.signerLooMouTelepone
                    : "-"
                }
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue
                lable="PIC / Vendor"
                value={dataResponse?.picVendor}
              />
              <LableValue
                lable="Jenis Pekerjaan"
                value={
                  dataResponse?.jobType !== null ? dataResponse?.jobType : "-"
                }
              />
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
                lable="Biaya Jasa"
                value={useRupiah(dataResponse?.biayaJasa)}
              />
              <LableValue
                lable="Biaya Barang"
                value={useRupiah(dataResponse?.biayaBarang)}
              />
              <LableValue
                lable="Total Biaya"
                value={useRupiah(dataResponse?.totalBiaya)}
              />
              <LableValue
                lable="Total Biaya + PPN"
                value={useRupiah(dataResponse?.totalBiayaWithPpn)}
              />
              <LableValue
                lable="Status Approval"
                value={statusApproval(dataResponse?.statusApproval)}
              />
              <LableValue
                lable="Tgl Approved"
                value={
                  dataResponse?.dateApproved === null
                    ? "-"
                    : useTimestampConverter(
                        dataResponse?.dateApproved / 1000,
                        "DD-MM-YYYY"
                    )
                }
              />
              <LableValue
                lable="Tgl Pengerjaan"
                value={
                  dataResponse?.precessDate === null
                    ? "-"
                    : useTimestampConverter(
                        dataResponse?.precessDate / 1000,
                        "DD-MM-YYYY"
                    )
                }
              />
              <LableValue
                lable="SLA Pengerjaan"
                value={textDays(dataResponse?.slaPengerjaan)}
              />
              <LableValue
                lable="Status Paid"
                value={paidStatus(dataResponse?.paidStatus)}
              />
              <LableValue lable="Notes & Desc" value={dataResponse?.noteDesc} />
            </Grid>
          </Grid>
          {/* Informasi Vendor */}
          <Typography
            style={{ fontWeight: 500, color: "#8D98B4", marginTop: 35 }}
          >
            Informasi Vendor
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
                lable="No Invoice"
                value={
                  <ChkyInputSmall
                    disabled={isDisabledEdit}
                    value={noInvoice}
                    onChange={(e) => {
                      setNoInvoice(e.target.value);
                      handleChangeState(e.target.value, "invoiceNumber");
                    }}
                  />
                }
              />
              <LableValue
                lable="Upload Invoice"
                value={
                  data?.invoiceFileRes ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <MinioDocComponent filePath={data?.invoiceFileRes} />
                      {isDisabledEdit === false && (
                        <IconButton
                          style={{ marginLeft: 10, color: "#DC241F" }}
                          onClick={() => {
                            handleChangeState("", "invoiceFileRes");
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </div>
                  ) : (
                    <>
                      {isDisabledEdit === false && (
                        <>
                          <AttachFileSelector
                            title="Select File Invoice"
                            refId="invoiceAttach"
                            onChange={(e) =>{
                              const maxAllowedSize = 1 * 1024 * 1024; // 1 MB
                              if(e.target.files[0].size > maxAllowedSize){
                                setIsMaxLimit(true);
                              }else{
                                setIsMaxLimit(false);
                                handleChangeState(e.target.files[0], "invoiceFile");
                              }
                            }}
                            selectedFile={data.invoiceFile}
                            onDelete={() => {
                              handleChangeState("", "invoiceFile");
                            }}
                            accept="image/*"
                          />
                          {isMaxLimit && (
                            <ErrorComponent label='*) Ukuran File Melebihi 1Mb, silahkan pilih ukuran yang lebih kecil'/>
                          )}
                        </>
                      )}
                    </>
                  )
                }
              />
              <LableValue
                lable="Tgl Kirim Invoice"
                value={
                  dataResponse?.invoiceDate === null
                    ? "-"
                    : moment
                      .unix(dataResponse?.invoiceDate / 1000)
                      .format("DD-MM-YYYY")
                }
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue
                lable="BAST Digital"
                value={
                  dataResponse?.bastSubmitStatus ? (
                    <div>
                      <Link
                        onClick={() => {
                          if (userRoleName.toLowerCase().includes("vendor")) {
                            history.push(
                              `/vendor-orders/keamanan/bast-digital/${idCard}?idBast=${dataResponse?.bastId}`
                            );
                          } else {
                            // history.push(`/implementation/bast-digital-preview/${dataResponse?.bastId}`);
                            history.push(
                              `/vendor-management/orders/keamanan/bast-digital-preview/${dataResponse?.bastId}`
                            );
                          }
                        }}
                        style={{
                          color: "green",
                          display: "flex",
                          textDecoration: "none",
                        }}
                      >
                        BAST Digital
                        <CheckIcon style={{ color: "green", marginLeft: 10 }} />
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link
                        onClick={() => {
                          if (userRoleName.toLowerCase().includes("vendor")) {
                            history.push(
                              `/vendor-orders/keamanan/bast-digital/${idCard}?idBast=null`
                            );
                          } else {
                            alert("BAST DIGITAL belum dibuat vendor");
                          }
                        }}
                        style={{
                          color: "red",
                          display: "flex",
                          textDecoration: "none",
                        }}
                      >
                        BAST Digital
                        <CloseIcon style={{ color: "red", marginLeft: 10 }} />
                      </Link>
                    </div>
                  )
                }
              />
              <LableValue
                lable="Tgl Selesai"
                value={
                  dataResponse?.completeDate === null
                    ? "-"
                    : useTimestampConverter(
                        dataResponse?.completeDate / 1000,
                        "DD-MM-YYYY"
                    )
                }
              />
            </Grid>
          </Grid>
          {/* Informasi Umum */}
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
                value={
                  dataResponse?.idRequester !== null
                    ? dataResponse?.idRequester
                    : "-"
                }
              />
              <LableValue
                lable="Initial Cabang"
                value={
                  dataResponse?.initialCabang !== null
                    ? dataResponse?.initialCabang
                    : "-"
                }
              />
              <LableValue
                lable="Kode GFMS"
                value={
                  dataResponse?.codeGfms !== null ? dataResponse?.codeGfms : "-"
                }
              />
              <LableValue
                lable="Nama Req"
                value={
                  dataResponse?.reqName !== null ? dataResponse?.reqName : "-"
                }
              />
              <LableValue
                lable="Nama Branch"
                value={
                  dataResponse?.branchName !== null
                    ? dataResponse?.branchName
                    : "-"
                }
              />
              <LableValue
                lable="No Telp Req"
                value={
                  dataResponse?.telpReq !== null ? dataResponse?.telpReq : "-"
                }
              />
              <LableValue
                lable="Email Requester"
                value={
                  dataResponse?.emailRequest !== null
                    ? dataResponse?.emailRequest
                    : "-"
                }
              />
              <LableValue
                lable="Alamat Branch"
                value={
                  dataResponse?.brancAdderss !== null
                    ? dataResponse?.brancAdderss
                    : "-"
                }
              />
              <LableValue
                lable="Nama PIC Loc"
                value={
                  dataResponse?.picLocName !== null
                    ? dataResponse?.picLocName
                    : "-"
                }
              />
              <LableValue
                lable="Telp PIC Loc"
                value={
                  dataResponse?.picLocTelp !== null
                    ? dataResponse?.picLocTelp
                    : "-"
                }
              />
              <LableValue
                lable="Email PC Loc"
                value={
                  dataResponse?.picLocEmail !== null
                    ? dataResponse?.picLocEmail
                    : "-"
                }
              />
              <LableValue
                lable="Type Loc"
                value={
                  dataResponse?.typeLoc !== null ? dataResponse?.typeLoc : "-"
                }
              />
              <LableValue
                lable="Ruang ATM"
                value={
                  dataResponse?.ruangAtm !== null ? dataResponse?.ruangAtm : "-"
                }
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue
                lable="Luas Area"
                value={
                  dataResponse?.luasArea !== null ? dataResponse?.luasArea : "-"
                }
              />
              <LableValue
                lable="Akses Umum"
                value={
                  dataResponse?.aksessUmum !== null
                    ? dataResponse?.aksessUmum
                    : "-"
                }
              />
              <LableValue
                lable="Operasional"
                value={dataResponse?.operasional.replace(/1970-01-01/g, "")}
              />
              <LableValue
                lable="Jumlah ATM Lain"
                value={
                  dataResponse?.jumlahAtmLain == null
                    ? ""
                    : JSON.parse(dataResponse.jumlahAtmLain).toString()
                }
              />
              <LableValue
                lable="Denom"
                value={dataResponse?.denom !== null ? dataResponse?.denom : "-"}
              />
              <LableValue
                lable="AC"
                value={dataResponse?.ac !== null ? dataResponse?.ac : "-"}
              />
              <LableValue
                lable="Kebersihan"
                value={
                  dataResponse?.kebersihan !== null
                    ? dataResponse?.kebersihan
                    : "-"
                }
              />
              <LableValue
                lable="Komunikasi"
                value={
                  dataResponse?.komunikasi !== null
                    ? dataResponse?.komunikasi
                    : "-"
                }
              />
              <LableValue
                lable="Media Promosi"
                value={
                  dataResponse?.mediaPromo == null
                    ? ""
                    : JSON.parse(dataResponse.mediaPromo).toString()
                }
              />
              <LableValue
                lable="Notes"
                value={dataResponse?.note !== null ? dataResponse?.note : "-"}
              />
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 15 }}>
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Status
            </Typography>
            <Grid item xs={6} style={{ marginTop: 5, paddingRight: "60px" }}>
              {/* disni nnti select statusnya */}
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
            <Grid item style={{ marginTop: "20px", width: "96%" }}>
              <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                Pekerjaan Sesudah
              </Typography>
              <Grid
                container
                direction="row"
                spacing={4}
                style={{ marginTop: "5px" }}
              >
                <Grid item>
                  {data.photoFrontVendor ? (
                    <div style={{ position: "relative" }}>
                      <MinioImageComponent
                        filePath={data.photoFrontVendor}
                        className={classes.imgContainer}
                      />
                    </div>
                  ) : (
                    <img
                      src={NoImage}
                      className={classes.imgContainer}
                      alt="img-sesudah1"
                    />
                  )}
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      position: "static",
                      paddingLeft: 15,
                    }}
                  >
                    Sesudah 1
                  </Typography>
                </Grid>
                <Grid item>
                  {data.photoRightVendor ? (
                    <div style={{ position: "relative" }}>
                      <MinioImageComponent
                        filePath={data.photoRightVendor}
                        className={classes.imgContainer}
                      />
                    </div>
                  ) : (
                    <img
                      src={NoImage}
                      className={classes.imgContainer}
                      alt="img-sesudah2"
                    />
                  )}
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      position: "static",
                      paddingLeft: 15,
                    }}
                  >
                    Sesudah 2
                  </Typography>
                </Grid>
                <Grid item>
                  {data.photoLeftVendor ? (
                    <div style={{ position: "relative" }}>
                      <MinioImageComponent
                        filePath={data.photoLeftVendor}
                        className={classes.imgContainer}
                      />
                    </div>
                  ) : (
                    <img
                      src={NoImage}
                      className={classes.imgContainer}
                      alt="img-sesudah3"
                    />
                  )}
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      position: "static",
                      paddingLeft: 15,
                    }}
                  >
                    Sesudah 3
                  </Typography>
                </Grid>
                <Grid item>
                  {data.photoRearVendor ? (
                    <div style={{ position: "relative" }}>
                      <MinioImageComponent
                        filePath={data.photoRearVendor}
                        className={classes.imgContainer}
                      />
                    </div>
                  ) : (
                    <img
                      src={NoImage}
                      className={classes.imgContainer}
                      alt="img-sesudah4"
                    />
                  )}
                  <Typography
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      position: "static",
                      paddingLeft: 15,
                    }}
                  >
                    Sesudah 4
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: "25px", width: "96%" }}>
              <Grid container direction="row">
                <Grid item xs={6}>
                  <Grid
                    container
                    direction="column"
                    styke={{ marginTop: "10px" }}
                  >
                    <Typography style={{ fontWeight: 600, color: "#2B2F3C" }}>
                      Vendor Attachment
                    </Typography>
                    {data.vendorAttachment.map((item, index) => {
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
                            title="Attachment 3"
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
            <Grid item style={{ marginTop: 55 }}>
              <Grid
                container
                justify="space-between"
                style={{ paddingLeft: 10, paddingRight: 30 }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    disabledElevation
                    className={classes.secondaryButton}
                    onClick={() => history.goBack()}
                    style={{ textTransform: "capitalize" }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={handleSave}
                    style={{ textTransform: "capitalize" }}
                  >
                    Simpan
                  </Button>
                </Grid>
              </Grid>
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
