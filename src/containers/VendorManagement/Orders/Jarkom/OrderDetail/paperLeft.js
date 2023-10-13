/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
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
  Radio,
  FormControlLabel, RadioGroup, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Select } from "antd";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import { KeyboardReturnOutlined } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { ReactComponent as ExchangeIcon } from "../../../../../assets/icons/siab/gear-grinding.svg";
import * as Colors from "../../../../../assets/theme/colors";
import InputBordered from "../../common/InputComponent";
import { ReactComponent as PaperClipIcon } from "../../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as DefUploadImageSvg } from "../../../../../assets/icons/general/def_upload.svg";
import SelectWithIcon from "../../../../../components/Selects/SelectWithIcon";
import { ReactComponent as TodoIcon } from "../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../assets/icons/siab/strip-circle.svg";
import ATM1 from "../../../../../assets/images/atm-1.png";
import ATM2 from "../../../../../assets/images/atm-2.png";
import ATM3 from "../../../../../assets/images/atm-3.png";
import ATM4 from "../../../../../assets/images/atmcimb.png";
import constants from "../../../../../helpers/constants";
import LableValue from "../../../../../components/LableValue";
import useRupiah from "../../../../../helpers/useRupiahConverterSecondary";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import StatusComponent from "../../../../../components/StatusComponent";
import { ChkyInputSmall } from "../../../../../components";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import AttachFileSelector from "../../../../../components/AttachFileSelector";
import SelectItemsIcon from "../../../../../components/Selects/SelectItemsIcon";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import NoImage from "../../../../../assets/images/image.png";
// eslint-disable-next-line import/no-cycle
import { RootContext } from '../../../../../router';
import SelectLeftCustomIcon from "../../../../../components/Selects/SelectItemsIcon";

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
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
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
  label: {
    "&$focused": {
      color: "#000",
    },
  },
  focused: {},
  outlinedInput: {
    "&$focused $notchedOutline": {
      border: "1px solid #DC241F",
    },
  },
  notchedOutline: {
    borderColor: "#BCC8E7",
  },
  radio: {
    "&$checked": {
      color: "#DC241F",
    },
  },
  checked: {},
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
  { value: "TODO", name: "TODO", icon: <TodoIcon /> },
  { value: "DOING", name: "DOING", icon: <DoingIcon /> },
  { value: "DONE", name: "DONE", icon: <DoneIcon /> },
  { value: "STRIP", name: "STRIP", icon: <StripIcon /> },
];

const buttonValues = [
  {
    id: 1,
    title: "Ya",
    value: true,
  },
  {
    id: 2,
    title: "Tidak",
    value: false,
  },
];

function LeftComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const {
    data,
    content,
    handleChangeState,
    isDisabledEdit,
    handleSubmit,
  } = props;
  const { userRoleName } = useContext(RootContext);
  
  const [attachment1, setAttachment1] = useState('');
  const [attachment2, setAttachment2] = useState('');
  const [attachment3, setAttachment3] = useState('');
  const typeProvider=[
    {value:'VSAT TELKOM',name:"VSAT TELKOM"},
    {value:'VSAT LOW SPEED',name:"VSAT LOW SPEED"},
    {value:'VSAT TANGARA',name:"VSAT TANGARA"},
    {value:'VSAT TELENET',name:"VSAT TELENET"},
    {value:'VSAT LINTASARTA',name:"VSAT LINTASARTA"},
    {value:'VSAT IFORTE',name:"VSAT IFORTE"},
    {value:'VSAT XL',name:"VSAT XL"},
    {value:'M2M TELKOM',name:"M2M TELKOM"},
    {value:'M2M XL',name:"M2M XL"}
  ]

  // useEffect(() => {
  //   console.log("+++ data",data);
  // }, [data]);

  // ATTACHMENT

  useEffect(() => {
    if(attachment1 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment1'; 
      });
      handleChangeState(newDataList,"documentList");
    }
  }, [attachment1]);

  useEffect(() => {
    if(attachment2 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment2",
        file: attachment2
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment2'; 
      });
      handleChangeState(newDataList,"documentList");
    }
  }, [attachment2]);

  useEffect(() => {
    if(attachment3 !== ''){
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment3",
        file: attachment3
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"documentList");
    }else{
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) { 
        return item.docKey !== 'attachment3'; 
      });
      handleChangeState(newDataList,"documentList");
    }
  }, [attachment3]);
  
  return (
    <div>
      <Paper className={classes.rootPaper}>
        <div style={{ padding: 20 }}>
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

          {/* Informasi CIMB */}
          <Grid container>
            <Grid item xs={6}>
              <LableValue lable="No Ticket" value={content?.ticketNumber} />
              <LableValue
                lable="Tgl Request"
                value={
                  content?.requestDate === null
                    ? "-"
                    : useTimestampConverter(
                        content?.requestDate / 1000,
                        "DD-MM-YYYY"
                    )
                }
              />
              <LableValue lable="ID Mesin" value={content?.idMesin} />
              <LableValue lable="ID Location" value={content?.locationId} />
              <LableValue lable="Tgl Request" value={content?.boothType} />
              <LableValue lable="Lokasi" value={content?.locationName} />
              <LableValue lable="Alamat" value={content?.locationAddress} />
              <LableValue
                lable="Nama Penandatangan LOO / MOU"
                value={content?.signerLooMouName}
              />
              <LableValue
                lable="Email Penandatangan LOO / MOU"
                value={content?.signerLooMouEmail}
              />
              <LableValue
                lable="No HP Penandatangan LOO / MOU"
                value={content?.signerLooMouTelephoneNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue lable="PIC / Vendor" value={content?.picVendor} />
              <LableValue
                lable="Due Date"
                value={
                  content?.dueDate === null
                    ? "-"
                    : useTimestampConverter(
                        content?.dueDate / 1000,
                        "DD-MM-YYYY"
                    )
                }
              />
              <LableValue lable="Request Type" value={content?.requestType} />
              <LableValue lable="User Request" value={content?.userRequester} />
              <LableValue lable="Landlord" value={content?.landlord} />
              <LableValue lable="Jenis Jarkom" value={content?.jarkomType} />
              <LableValue lable="Premises" value={content?.premises} />
              <LableValue lable="Comm Type" value={content?.commType} />
              <LableValue
                lable="Notes &amp; Desc"
                value={content?.notesDescription}
              />
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
              <LableValue lable="Tgl Selesai" value={data.completedDate} />
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>IP Mesin</Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "ipAddressMachine");
                  }}
                  value={data.ipAddressMachine}
                  placeholder="Masukan IP Mesin"
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>PIC Lokasi</Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "locationPic");
                  }}
                  placeholder="Masukan PIC Lokasi"
                  value={data.locationPic}
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>
                  Email PIC Lokasi
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "locationPicEmail");
                  }}
                  placeholder="Masukan Email PIC Lokasi"
                  value={data.locationPicEmail}
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>
                  No Telp PIC
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "locationPicTelephone");
                  }}
                  value={data.locationPicTelephone}
                  placeholder="Masukan No Telp PIC Lokasi"
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>
                  Menggunakan HUB
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <RadioGroup
                  value={data.hub}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "hub");
                  }}
                  name="radio-buttons-group"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <FormControlLabel
                      value="true"
                      control={
                        <Radio
                          disableRipple
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Ya"
                    />
                    <FormControlLabel
                      value="false"
                      control={
                        <Radio
                          disableRipple
                          classes={{
                            root: classes.radio,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Tidak"
                    />
                  </div>
                </RadioGroup>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>
                  Machnine Type
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "machineType");
                  }}
                  value={data.machineType}
                  placeholder="Masukan Machine Type"
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>
                  Keterangan Vendor
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "5px" }}>
                <TextField
                  id="outlined-multiline-static"
                  placeholder="Masukan Keterangan Vendor"
                  multiline
                  onChange={(e) => {
                    handleChangeState(e.target.value, "remarkVendor");
                  }}
                  value={data.remarkVendor}
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      focused: classes.focused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.outlinedInput,
                      focused: classes.focused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  rows={4}
                  variant="outlined"
                  style={{
                    width: "90%",
                    color: "#8D98B4",
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <LableValue
                lable="BAST Digital"
                value={
                  content?.bastSubmitStatus ? (
                    <div>
                      <Link 
                        onClick={()=>{
                          if(userRoleName.toLowerCase().includes('vendor')){
                            history.push(`/vendor-orders/jarkom/bast-digital/${content?.bastId}`);
                          }else{
                            // history.push(`/implementation/bast-digital-preview/${dataResponse?.bastId}`);
                            history.push(`/vendor-management/orders/jarkom/bast-digital-preview/${content?.bastId}`);
                          }
                        }
                        }
                        style={{color: 'green', display: 'flex', textDecoration: 'none'}}>
                          BAST Digital
                        <CheckIcon style={{color: 'green', marginLeft: 10}} />
                      </Link>
                    </div>
                  ): (
                    <div>
                      <Link 
                        onClick={()=>{
                          if(userRoleName.toLowerCase().includes('vendor')){
                            history.push(`/vendor-orders/jarkom/bast-digital/${content?.bastId}`);
                          } else {
                            alert("BAST DIGITAL belum dibuat vendor");
                          }
                        }
                        }
                        style={{color: 'red', display: 'flex', textDecoration: 'none'}}>
                          BAST Digital
                        <CloseIcon style={{color: 'red', marginLeft: 10}} />
                      </Link>
                    </div>
                  )}
              />
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>Provider</Typography>
              </Grid>
              <Grid item style={{ marginTop: 0 }}>
                {/*<InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "provider");
                  }}
                  value={data.provider}
                  placeholder="Masukan Provider"
                />*/}
                <SelectLeftCustomIcon selectOptionData={typeProvider} style={{width:"90%"}} selectedValue={data?.provider} onSelectValueChange={(newVal)=>handleChangeState(newVal,'provider')} placeholder="Masukan Provider"/>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>IP Address</Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "ipAddress");
                  }}
                  value={data.ipAddress}
                  placeholder="Masukan IP Address"
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>IP Gateway</Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "ipGateway");
                  }}
                  value={data.ipGateway}
                  placeholder="Masukan IP Gateway"
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>
                  IP Subnet Mask
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "ipSubnetMask");
                  }}
                  value={data.ipSubnetMask}
                  placeholder="Masukan Subnet Mask"
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>No Hub</Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "hubNumber");
                  }}
                  value={data.hubNumber}
                  placeholder="Masukan No Hub"
                />
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <Typography style={{ color: "#2B2F3C" }}>
                  Branch Code
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "13px" }}>
                <InputBordered
                  style={{
                    width: "90%",
                    height: "24px",
                  }}
                  onChange={(e) => {
                    handleChangeState(e.target.value, "branchCode");
                  }}
                  value={data.branchCode}
                  placeholder="Masukan Branch Code"
                />
              </Grid>
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
              <LableValue lable="ID Requester" value={content?.requesterId} />
              <LableValue lable="Initial Cabang" value={content?.branchCode} />
              <LableValue lable="Kode GFMS" value={content?.gfmsCode} />
              <LableValue lable="Nama Req" value={content?.requesterName} />
              <LableValue lable="Nama Branch" value={content?.branchName} />
              <LableValue
                lable="No Telp Req"
                value={content?.requesterTelephoneNumber}
              />
              <LableValue
                lable="Email Requester"
                value={content?.requesterEmail}
              />
              <LableValue
                lable="Alamat Branch"
                value={content?.branchAddress}
              />
              <LableValue lable="Nama PIC Loc" value={content?.picLocName} />
              <LableValue
                lable="Telp PIC Loc"
                value={content?.picLocTelephoneNumber}
              />
              <LableValue lable="Email PC Loc" value={content?.picLocEmail} />
              <LableValue lable="Type Loc" value={content?.locationType} />
              <LableValue lable="Ruang ATM" value={content?.atmBoothType} />
            </Grid>
            <Grid item xs={6}>
              <LableValue lable="Luas Area" value={content?.atmBoothLarge} />
              <LableValue
                lable="Akses Umum"
                value={content?.publicAccessibility}
              />
              <LableValue lable="Operasional" value={content?.operational} />
              <LableValue
                lable="Jumlah ATM Lain"
                value={content?.aroundAtmBank}
              />
              <LableValue lable="Denom" value={content?.denom} />
              <LableValue lable="AC" value={content?.acType} />
              <LableValue lable="Kebersihan" value={content?.cleanType} />
              <LableValue lable="Komunikasi" value={content?.commType} />
              <LableValue
                lable="Media Promosi"
                value={
                  content?.mediaPromotion == null
                    ? ""
                    : JSON.parse(content.mediaPromotion).toString()
                }
              />
              <LableValue lable="Notes" value={content?.notes} />
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: 15 }}>
            <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
              Status
            </Typography>
          </Grid>

          <Grid item xs={6} style={{ marginTop: 5, paddingRight: "60px" }}>
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
              Pekerjaan Sebelum
            </Typography>
            <Grid
              container
              direction="row"
              spacing={4}
              style={{ marginTop: "5px" }}
            >
              <Grid item>
                {data.photoSebelum1 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSebelum1}
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
                <Typography style={{ textAlign: "center" }}>
                  Sebelum 1
                </Typography>
              </Grid>
              <Grid item>
                {data.photoSebelum2 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSebelum2}
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
                {data.photoSebelum3 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSebelum3}
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
                {data.photoSebelum4 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSebelum4}
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
                {data.photoSesudah1 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSesudah1}
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
                {data.photoSesudah2 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSesudah2}
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
                {data.photoSesudah3 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSesudah3}
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
                {data.photoSesudah4 ? (
                  <div style={{ position: "relative" }}>
                    <MinioImageComponent
                      filePath={data.photoSesudah4}
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
                  {content.cimbAttachment?.length > 0 ? (
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
                                // console.log("+++ newArr",newArr);
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
                  onClick={handleSubmit}
                  style={{ textTransform: "capitalize" }}
                >
                  Simpan
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

LeftComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  handleChangeState: PropTypes.func.isRequired,
};
LeftComponent.defaultProps = {
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(LeftComponent))
);
