/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Link,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Select , DatePicker } from "antd";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Done";
import { KeyboardReturnOutlined } from "@material-ui/icons";
import { RootContext } from "../../../../router";
import AttachFileSelector from "../../../../components/AttachFileSelector";
import { ChkyInputSmall } from "../../../../components";
import { ReactComponent as ExchangeIcon } from "../../../../assets/icons/siab/gear-grinding.svg";
import * as Colors from "../../../../assets/theme/colors";
import InputBordered from "../common/InputComponent";
import { ReactComponent as PaperClipIcon } from "../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as DefUploadImageSvg } from "../../../../assets/icons/general/def_upload.svg";
import SelectWithIcon from "../../../../components/Selects/SelectWithIcon";
import { ReactComponent as TodoIcon } from "../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../assets/icons/siab/strip-circle.svg";
import MinioDocComponent from "../../../../components/MinioDocComponent";
import ATM1 from "../../../../assets/images/atm-1.png";
import ATM2 from "../../../../assets/images/atm-2.png";
import ATM3 from "../../../../assets/images/atm-3.png";
import ATM4 from "../../../../assets/images/atmcimb.png";
import MinioImageComponent from "../../../../components/MinioImageComponent";
import NoImage from "../../../../assets/images/image.png";
import constants from "../../../../helpers/constants";

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

const dataSelectStatus = [
  { id: 0, value: "TODO", nameId: "TODO", nameEn: "TODO", icon: <TodoIcon /> },
  {
    id: 1,
    value: "DOING",
    nameId: "DOING",
    nameEn: "DOING",
    icon: <DoingIcon />,
  },
  { id: 2, value: "DONE", nameId: "DONE", nameEn: "DONE", icon: <DoneIcon /> },
  {
    id: 3,
    value: "STRIP",
    nameId: "STRIP",
    nameEn: "STRIP",
    icon: <StripIcon />,
  },
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
        <Typography className={classes.value}>{props.value}</Typography>
      </Box>
    </Box>
  );
}

function LeftComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { userRoleName } = useContext(RootContext);
  const {
    content,
    handleChangeState,
    handleSave,
    data,
    isDisabledEdit,
    idCard,
  } = props;
  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");
  const [attachment3, setAttachment3] = useState("");
  // ATTACHMENT

  useEffect(() => {
    if (attachment1 !== "") {
      const oldDataList = content.documentDtoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "documentDtoList");
    } else {
      const oldDataList = content.documentDtoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment1";
      });
      handleChangeState(newDataList, "documentDtoList");
    }
  }, [attachment1]);

  useEffect(() => {
    if (attachment2 !== "") {
      const oldDataList = content.documentDtoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment2",
        file: attachment2,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "documentDtoList");
    } else {
      const oldDataList = content.documentDtoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment2";
      });
      handleChangeState(newDataList, "documentDtoList");
    }
  }, [attachment2]);

  useEffect(() => {
    if (attachment3 !== "") {
      const oldDataList = content.documentDtoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment3",
        file: attachment3,
      };
      newDataList.push(newObj);
      handleChangeState(newDataList, "documentDtoList");
    } else {
      const oldDataList = content.documentDtoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment3";
      });
      handleChangeState(newDataList, "documentDtoList");
    }
  }, [attachment3]);
  const handleChangeKebutuhan = (dataKebutuhan, keyData) => {
    const items = {
      ...data,
      [keyData]: dataKebutuhan,
    };
    onChange(items);
  };

  const handleChange = (e) => {
    console.log(e);
    setValue(e);
    handleChangeKebutuhan(e, "category");
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  const fieldInformasiCIMB = [
    {
      label1: "No Ticket",
      value1: content.ticketNumber,
      label2: "PIC / Vendor",
      value2: content.picVendor,
    },
    {
      label1: "Region",
      value1: content.region,
      label2: "Jenis Pekerjaan",
      value2: content.jobType,
    },
    {
      label1: "Tgl Implementasi",
      value1: content.impleDate,
      label2: "IDLama",
      value2: content.oldId,
    },
    // {label1: 'ID Mesin', value1: 'A0002', label2: 'Biaya Jasa', value2: 'Rp.15.000.000'},
    {
      label1: "Jam",
      value1: content.jam,
      label2: "ID Baru",
      value2: content.newId,
    },
    {
      label1: "Nama Penandatanganan LOU/MOU",
      value1: content.nameSignaeLouMou,
      label2: "Lokasi",
      value2: content.location,
    },
    {
      label1: "Email Penandatanganan LOU/MOU",
      value1: content.emailSignaeLouMou,
      label2: "Alamat",
      value2: content.address,
    },

    {
      label1: "No Hp Penandatanganan LOU/MOU",
      value1: content.telpSignaeLouMou,
      label2: "Notes & Desc",
      value2: content.noteDesc,
    },

    // {label1: '', value1: '', label2: '', value2: '', paddingTop: 22},
  ];
  const fieldInformasiVendor = [
    {
      label1: "BAST Digital",
      value1:
        content.bastSubmitStatus === null ||
        content.bastSubmitStatus === false ? (
          <div>
            <Link
              onClick={() => {
                if (userRoleName.toLowerCase().includes("vendor")) {
                  history.push(
                    `/vendor-orders/${
                      content.taskType === `termination`
                        ? `terminasi`
                        : `aktivasi`
                    }/bast-digital/${content.bastId}?taskType=${
                      content.taskType
                    }`
                  );
                } else {
                  alert("BAST DIGITAL belum dibuat vendor");
                }
              }}
              style={{ color: "red", display: "flex", textDecoration: "none" }}
            >
              BAST Digital
              <CloseIcon style={{ color: "red", marginLeft: 10 }} />
            </Link>
          </div>
        ) : (
          <div>
            <Link
              onClick={() => {
                if (userRoleName.toLowerCase().includes("vendor")) {
                  history.push(
                    `/vendor-orders/${
                      content.taskType === `termination`
                        ? `terminasi`
                        : `aktivasi`
                    }/bast-digital/${content.bastId}?taskType=${
                      content.taskType
                    }`
                  );
                } else {
                  // history.push(`/implementation/bast-digital-preview/${dataResponse?.bastId}`);
                  history.push(
                    `/vendor-management/orders/${
                      content.taskType === `termination`
                        ? `terminasi`
                        : `aktivasi`
                    }/bast-digital-preview/${content?.bastId}?taskType=${
                      content.taskType
                    }`
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
        ),
      label2: "PIC SLM",
      value2: content.pisSlm,
    },
    {
      label1: "Tgl Implementasi",
      value1: (
        <DatePicker
          disabledDate={disabledDate}
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
          onChange={(newDate) => {
            let valDate = "";
            if (newDate === null) {
              valDate = "";
            } else {
              valDate = newDate.unix() * 1000;
            }
            handleChangeState(valDate, "dateImleLapangan");
          }}
          value={content.dateImleLapangan ? moment(content.dateImleLapangan):null}
          style={{
            borderRadius: 6,
            height: "40px",
            border: "1px solid #BCC8E7",
            width: "100%",
            marginTop: "5px",
          }}
          placeholder="Tgl Implementasi"
          format="DD-MM-YYYY"
        />
      ),
      label2: "PIC SLM Telp",
      value2: content.picSlmTelp,
    },
    {
      label1: "Jam",
      value1: (
        <ChkyInputSmall
          placeholder="Masukan Jam"
          value={content.jamImpleLapangan}
          onChange={(e) => {
            handleChangeState(e.target.value, "jamImpleLapangan");
          }}
          disabled={isDisabledEdit}
        />
      ),
      label2: "",
      value2: "",
    },
    { label1: "PIC FLM", value1: content.picFlm },
    { label1: "PIC FLM Telp", value1: content.picFlmTelp },
  ];
  const fieldInformasiUmumLeft = [
    { label: "ID Requester", value: content.idRequest },
    { label: "Initial Cabang", value: content.initialBranch },
    { label: "Kode GFMS", value: content.gmfsCode },
    { label: "Nama Req", value: content.requestName },
    { label: "Nama Branch", value: content.brancName },
    { label: "No Telp Req", value: content.telpReq },
    { label: "Email Requester", value: content.emailRequester },
    {
      label: "Alamat Branch",
      value: content.branchAddress,
    },
    { label: "Nama PIC Loc", value: content.namePicLoc },
    { label: "Telp PIC Loc", value: content.telpPicLoc },
    { label: "Email PC Loc", value: content.emailPicLoc },
    { label: "Type Loc", value: content.typeLoc },
    { label: "Ruang ATM", value: content.ruangAtm },
  ];

  const fieldInformasiUmumRight = [
    { label: "Luas Area", value: content.luasArea },
    { label: "Akses Umum", value: content.aksesUmum },
    { label: "Operasional", value: content.operasional },
    { label: "Jumlah ATM Lain", value: content.jumlahAtmLain },
    { label: "Denom", value: content.denom },
    { label: "AC", value: content.ac },
    { label: "Kebersihan", value: content.kebersihan },
    { label: "Komunikasi", value: content.komunikasi },
    {
      label: "Media Promosi",
      value: content.promosi,
    },
    { label: "Notes", value: content.notes },
  ];
  function renderValue(
    type,
    value,
    color,
    fontWeight,
    isDone,
    isAttachment,
    paddingTop
  ) {
    if (type) {
      if (type === "Approval") {
        return (
          <Status
            value={value}
            borderColor="#65D170"
            textColor="#65D170"
            fillColor="#DEFFE1"
          />
        );
      }
      return (
        <Status
          value={value}
          borderColor="#FF6A6A"
          textColor="#FF6A6A"
          fillColor="#FFF6F6"
        />
      );

    } if (isDone) {
      return (
        <Grid container>
          <Typography
            style={{
              fontWeight: fontWeight || 600,
              color: color || "#2B2F3C",
            }}
          >
            {value}
          </Typography>
          <CheckIcon style={{ color }} />
        </Grid>
      );
    } if (isAttachment) {
      return (
        <Grid container>
          <PaperClipIcon
            style={{
              marginTop: 0,
              marginBottom: 5,
              marginRight: 5,
              cursor: "pointer",
            }}
          />
          <Typography
            style={{
              fontWeight: fontWeight || 600,
              color: color || "#2B2F3C",
              cursor: "pointer",
            }}
          >
            {value}
          </Typography>
        </Grid>
      );
    }
    return (
      <Typography
        style={{
          fontWeight: fontWeight || 600,
          color: color || "#2B2F3C",
          paddingTop: paddingTop || 0,
        }}
      >
        {value}
      </Typography>
    );

  }

  // useEffect(() => {
  //   console.log("+++ content",content);
  // }, [content]);

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid container direction="column" style={{ paddingBottom: "15px" }}>
          <Grid item style={{ marginTop: 35, paddingLeft: "20px" }}>
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Informasi CIMB
            </Typography>
          </Grid>

          <Grid
            item
            style={{ marginTop: 5, paddingLeft: "20px", paddingRight: "60px" }}
          >
            <Divider
              variant="fullWidth"
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#BCC8E7",
              }}
            />
          </Grid>

          {/* Informasi CIMB */}
          {fieldInformasiCIMB.map((data) => {
            return (
              <Grid
                item
                style={{ marginTop: 20, paddingLeft: "20px", width: "100%" }}
              >
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <Grid container direction="row">
                      <Grid item style={{ width: "100%" }}>
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Typography
                              style={{ fontWeight: 400, color: "#2B2F3C" }}
                            >
                              {data.label1}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography
                              style={{
                                paddingLeft: 10,
                                paddingTop: data.paddingTop
                                  ? data.paddingTop
                                  : 0,
                              }}
                            >
                              {data.label1 ? `:` : null}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} justify="flex-start">
                            {renderValue(
                              null,
                              data.value1,
                              data.color,
                              data.fontWeight,
                              null,
                              null,
                              data.paddingTop
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={5} style={{ marginLeft: 30 }}>
                    <Grid container direction="row">
                      <Grid item xs={5}>
                        <Typography
                          style={{ fontWeight: 400, color: "#2B2F3C" }}
                        >
                          {data.label2}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography style={{ paddingLeft: 10 }}>
                          {data.label2 ? `:` : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} justify="flex-start">
                        {renderValue(
                          data.type,
                          data.value2,
                          data.color,
                          data.fontWeight
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}

          {/* Informasi Vendor */}
          <Grid item style={{ marginTop: 35, paddingLeft: "20px" }}>
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Informasi Vendor
            </Typography>
          </Grid>

          <Grid
            item
            style={{ marginTop: 5, paddingLeft: "20px", paddingRight: "60px" }}
          >
            <Divider
              variant="fullWidth"
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#BCC8E7",
              }}
            />
          </Grid>

          {fieldInformasiVendor.map((data) => {
            return (
              <Grid
                item
                style={{ marginTop: 20, paddingLeft: "20px", width: "100%" }}
              >
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <Grid container direction="row">
                      <Grid item style={{ width: "100%" }}>
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Typography
                              style={{ fontWeight: 400, color: "#2B2F3C" }}
                            >
                              {data.label1}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography
                              style={{
                                paddingLeft: 10,
                                paddingTop: data.paddingTop
                                  ? data.paddingTop
                                  : 0,
                              }}
                            >
                              {data.label1 ? `:` : null}
                            </Typography>
                          </Grid>
                          <Grid item xs={5} justify="flex-start">
                            {renderValue(
                              data.type,
                              data.value1,
                              data.color,
                              data.fontWeight,
                              data.isDone
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <Grid container direction="row">
                      <Grid item xs={5}>
                        <Typography
                          style={{ fontWeight: 400, color: "#2B2F3C" }}
                        >
                          {data.label2}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        justify="flex-end"
                        alignItems="flex-end"
                      >
                        <Typography style={{ paddingLeft: 10 }}>
                          {data.label2 ? `:` : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} justify="flex-start">
                        {renderValue(
                          data.type,
                          data.value2,
                          data.color2,
                          data.fontWeight
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}

          {/* Informasi Umum */}
          <Grid item style={{ marginTop: 35, paddingLeft: "20px" }}>
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Informasi Umum
            </Typography>
          </Grid>

          <Grid
            item
            style={{ marginTop: 5, paddingLeft: "20px", paddingRight: "60px" }}
          >
            <Divider
              variant="fullWidth"
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#BCC8E7",
              }}
            />
          </Grid>

          <Grid
            item
            style={{ marginTop: 20, paddingLeft: "20px", width: "100%" }}
          >
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="column">
                  {fieldInformasiUmumLeft.map((data) => {
                    return (
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Typography
                              style={{ fontWeight: 400, color: "#2B2F3C" }}
                            >
                              {data.label}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography style={{ paddingLeft: 10 }}>
                              :
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography
                              style={{ fontWeight: 600, color: "#2B2F3C", wordBreak: "break-all" }}
                            >
                              {data.value}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  {fieldInformasiUmumRight.map((data) => {
                    return (
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Typography
                              style={{ fontWeight: 400, color: "#2B2F3C" }}
                            >
                              {data.label}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography style={{ paddingLeft: 10 }}>
                              :
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography
                              style={{ fontWeight: 600, color: "#2B2F3C", wordBreak: "break-all" }}
                            >
                              {data.value}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: 15, paddingLeft: "20px" }}>
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Status
            </Typography>
          </Grid>

          <Grid
            item
            style={{ marginTop: 5, paddingLeft: "20px", paddingRight: "60px" }}
          >
            <SelectWithIcon
              bordered
              value={content.status}
              suggestions={dataSelectStatus}
              width="50%"
              handleChange={(e) => setValueStatus(e)}
            />
          </Grid>

          <Grid
            item
            style={{ marginTop: 5, paddingLeft: "20px", paddingRight: "60px" }}
          >
            <Typography
              style={{
                fontWeight: 400,
                fontStyle: "Italic",
                color: "#8D98B4",
                fontSize: "13px",
              }}
            >
              *Status berubah menjadi overdue ketika due date terlewati
            </Typography>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "20px", width: "96%" }}
          >
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Pekerjaan Sebelum
            </Typography>
            <Grid
              container
              direction="row"
              spacing={4}
              style={{ marginTop: "5px" }}
            >
              <Grid item>
                {content.photoSebelum1 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSebelum1}
                      className={classes.imgContainer}
                    />
                  </div>
                ) : (
                  <img
                    src={NoImage}
                    className={classes.imgContainer}
                    alt="img-sebelum1"
                  />
                )}
                <Typography>Sebelum 1</Typography>
              </Grid>
              <Grid item>
                {content.photoSebelum2 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSebelum2}
                      className={classes.imgContainer}
                    />
                  </div>
                ) : (
                  <img
                    src={NoImage}
                    className={classes.imgContainer}
                    alt="img-sebelum2"
                  />
                )}
                <Typography>Sebelum 2</Typography>
              </Grid>
              <Grid item>
                {content.photoSebelum3 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSebelum3}
                      className={classes.imgContainer}
                    />
                  </div>
                ) : (
                  <img
                    src={NoImage}
                    className={classes.imgContainer}
                    alt="img-sebelum3"
                  />
                )}
                <Typography>Sebelum 3</Typography>
              </Grid>
              <Grid item>
                {content.photoSebelum4 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSebelum4}
                      className={classes.imgContainer}
                    />
                  </div>
                ) : (
                  <img
                    src={NoImage}
                    className={classes.imgContainer}
                    alt="img-sebelum4"
                  />
                )}
                <Typography>Sebelum 4</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "20px", width: "96%" }}
          >
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
                {content.photoSesudah1 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSesudah1}
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
                <Typography>Sesudah 1</Typography>
              </Grid>
              <Grid item>
                {content.photoSesudah2 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSesudah2}
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
                <Typography>Sesudah 2</Typography>
              </Grid>
              <Grid item>
                {content.photoSesudah3 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSesudah3}
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
                <Typography>Sesudah 3</Typography>
              </Grid>
              <Grid item>
                {content.photoSesudah4 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={content.photoSesudah4}
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
                <Typography>Sesudah 4</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "25px", width: "96%" }}
          >
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
                  {content?.cimbAttachment.length > 0 ? (
                    content.cimbAttachment.map((item) => {
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
                    Vendor Attachment
                  </Typography>
                  {content?.vendorAttachment.length > 0 &&
                    content.vendorAttachment.map((item, index) => {
                      const currentIndex = index;
                      return (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <MinioDocComponent filePath={item.path} />
                          {isDisabledEdit === false && (
                            <IconButton
                              cstyle={{ marginLeft: 10, color: "#DC241F" }}
                              onClick={() => {
                                const oldArr = content.vendorAttachment.slice();
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
                      {content.vendorAttachment.length < 1 && (
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
                      {content.vendorAttachment.length < 1 && (
                        <AttachFileSelector
                          title="Attachment 1"
                          refId="attachmet1"
                          onChange={(e) => setAttachment1(e.target.files[0])}
                          selectedFile={attachment1}
                          onDelete={() => setAttachment1("")}
                        />
                      )}
                      {content.vendorAttachment.length < 2 && (
                        <AttachFileSelector
                          title="Attachment 2"
                          refId="attachmet2"
                          onChange={(e) => setAttachment2(e.target.files[0])}
                          selectedFile={attachment2}
                          onDelete={() => setAttachment2("")}
                        />
                      )}
                      {content.vendorAttachment.length < 3 && (
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

          {/* Button Container */}
          <Grid
            item
            style={{ marginLeft: 15, marginTop: 55, paddingRight: 65 }}
          >
            <Grid container justify="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
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
      </Paper>
    </div>
  );
}

LeftComponent.propTypes = {
  data: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  handleChangeState: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
LeftComponent.defaultProps = {};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(LeftComponent))
);
