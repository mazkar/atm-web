/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
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
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Select } from "antd";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { KeyboardReturnOutlined } from "@material-ui/icons";
import { ReactComponent as ExchangeIcon } from "../../../../../assets/icons/siab/gear-grinding.svg";
import * as Colors from "../../../../../assets/theme/colors";
import InputBordered from "../../common/InputComponent";
import { ReactComponent as PaperClipIcon } from "../../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as TodoIcon } from "../../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../../assets/icons/siab/strip-circle.svg";
import NoImage from "../../../../../assets/images/image.png";
import SelectItemsIcon from "../../../../../components/Selects/SelectItemsIcon";
import LableValue from "../../../../../components/LableValue";
import constants from "../../../../../helpers/constants";
import useRupiah from "../../../../../helpers/useRupiahConverterSecondary";
import StatusComponent from "../../../../../components/StatusComponent";
import { ChkyInputSmall } from "../../../../../components";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import ImageSelector from "../../../../../components/ImageSelector";
import AttachFileSelector from "../../../../../components/AttachFileSelector";
import MinioDocComponent from "../../../../../components/MinioDocComponent";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import { RootContext } from "../../../../../router";
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
    data,
    dataResponse,
    handleChangeState,
    handleSave,
    idCard,
    isDisabledEdit,
  } = props;

  const [noInvoice, setNoInvoice] = useState(null);

  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");
  const [attachment3, setAttachment3] = useState("");
  const [dateNow, setDateNow] = useState(null);

  const [isMaxLimit, setIsMaxLimit] = useState(false);
  // const [photoSebelum1, setphotoSebelum1] = useState('');
  // const [photoSebelum2, setphotoSebelum2] = useState('');
  // const [photoSebelum3, setphotoSebelum3] = useState('');
  // const [photoSebelum4, setphotoSebelum4] = useState('');

  // const [photoSesudah1, setphotoSesudah1] = useState('');
  // const [photoSesudah2, setphotoSesudah2] = useState('');
  // const [photoSesudah3, setphotoSesudah3] = useState('');
  // const [photoSesudah4, setphotoSesudah4] = useState('');

  // FOTO SEBELUM

  // useEffect(() => {
  //   console.log("+++ photoSebelum1", JSON.stringify(photoSebelum1));
  //   if(photoSebelum1 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum1",
  //       file: photoSebelum1
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum1';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum1]);

  // useEffect(() => {
  //   if(photoSebelum2 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum2",
  //       file: photoSebelum2
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum2';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum2]);

  // useEffect(() => {
  //   if(photoSebelum3 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum3",
  //       file: photoSebelum3
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum3';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum3]);

  // useEffect(() => {
  //   if(photoSebelum4 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSebelum4",
  //       file: photoSebelum4
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSebelum4';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSebelum4]);

  // FOTO Sesudah

  // useEffect(() => {
  //   console.log("+++ photoSesudah1", JSON.stringify(photoSesudah1));
  //   if(photoSesudah1 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah1",
  //       file: photoSesudah1
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah1';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah1]);

  // useEffect(() => {
  //   if(photoSesudah2 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah2",
  //       file: photoSesudah2
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah2';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah2]);

  // useEffect(() => {
  //   if(photoSesudah3 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah3",
  //       file: photoSesudah3
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah3';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah3]);

  // useEffect(() => {
  //   if(photoSesudah4 !== ''){
  //     const oldDataList = data.photoList.slice();
  //     const newDataList = [...oldDataList];
  //     const newObj = {
  //       docKey: "photoSesudah4",
  //       file: photoSesudah4
  //     };
  //     newDataList.push(newObj);
  //     handleChangeState(newDataList,"photoList");
  //   }else{
  //     const oldDataList = data.photoList.slice();
  //     let newDataList = [...oldDataList];
  //     newDataList = newDataList.filter(function(item) {
  //       return item.docKey !== 'photoSesudah4';
  //     });
  //     handleChangeState(newDataList,"photoList");
  //   }
  // }, [photoSesudah4]);

  // ATTACHMENT

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
      case 1:
        return <StatusComponent color="yellow" lable="Need Approval" />;
      case 2:
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

    // switch (true) {
    // case  (value > 0):
    //   return (<Typography style={{color: "#65D170"}}>{value} Days</Typography>);
    // case (value === 0):
    //   return (<Typography style={{color: "#FFB443"}}>{value} Day</Typography>);
    // case (value < 0):
    //   return (<Typography style={{color: "#FF6A6A"}}>{value} Days</Typography>);
    // default:
    //   return value;
    // }
  }

  function paidStatus(value) {
    switch (value) {
      case 0:
        return <StatusComponent color="red" lable="Unpaid" />;
      default:
        return <StatusComponent color="green" lable="Approved" />;
    }
  }

  const handleUploadFile = (e) => {
    const maxAllowedSize = 1 * 1024 * 1024; // 1 MB
    if (e.target.files[0].size > maxAllowedSize) {
      setIsMaxLimit(true);
    } else {
      handleChangeState(e.target.files[0], "invoiceFile");
      setDateNow(Date.now());
      setIsMaxLimit(false);
    }
  };

  const handleDeleteFile = () => {
    handleChangeState("", "invoiceFile");
    setDateNow(null);
  };

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
                value="122223"
              />
              <LableValue
                lable="Tgl Request"
                value="22-22-22"

              />
              <LableValue
                lable="User Request"
                value="test123"
              />
              <LableValue lable="ID Mesin" value={dataResponse?.idMesin} />
              <LableValue
                lable="ID Location"
                value="WE11223"
              />
              <LableValue
                lable="Nama Lokasi"
                value="Jakarta Barat"
              />
              <LableValue
                lable="Alamat"
                value="jalan kenangan"
              />
              <LableValue lable="Area" value={dataResponse?.locationArea} />
              <LableValue lable="City" value={dataResponse?.locationCity} />
              <LableValue
                lable="Lat-Long"
                value="qw-345LS-Bt999"
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue
                lable="PIC / Vendor"
                value="test123"
              />
              <LableValue
                lable="Jenis Pekerjaan"
                value="Administrator"
              />
              <LableValue
                lable="Due Date"
                value="22-22-22"

              />
              <LableValue
                lable="Status Approval"
                value={statusApproval(dataResponse?.statusApproval)}
              />
              <LableValue
                lable="Tgl Approved"
                value="22-22-22"

              />
              <LableValue
                lable="Tgl Pengerjaan"
                value="22-22-22"

              />
              <LableValue
                lable="SLA Pengerjaan"
                value="22-22-22"
              />
              <LableValue
                lable="Notes & Desc"
                value="Test 23"
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
              <LableValue
                lable="Master Key"
                value="Test123"
              />
              <LableValue
                lable="Tgl Kirim Master Key"
                value="22-22-22"
              />
            </Grid>
            <Grid item xs={6}>
              <LableValue
                lable="BA PEnghancuran Digital"
                value={
                  // dataResponse?.bastSubmitStatus ? (
                  <div>
                    <Link
                      onClick={() => {
                        history.push(
                          `/monitoring/key-penghancuran/order/bast-digital-preview/1`
                        );
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
                  //   ) : (
                  //     <div>
                  //       <Link
                  //        onClick={() => {
                  //         history.push(
                  //           `/monitoring/masterkey-penghancuran/order/bast-digital-preview/1`
                  //         );
                  //       }}
                  //         style={{
                  //           color: "red",
                  //           display: "flex",
                  //           textDecoration: "none",
                  //         }}
                  //       >
                  //         BAST Digital
                  //         <CloseIcon style={{ color: "red", marginLeft: 10 }} />
                  //       </Link>
                  //     </div>
                  //   )
                }
              />
              <LableValue
                lable="Tgl Selesai"
                value={
                  dataResponse?.completedDate === null
                    ? "-"
                    : useTimestampConverter(
                        dataResponse?.completedDate / 1000,
                        "DD-MM-YYYY"
                      )
                }
              />
            </Grid>

            <Grid item xs={6} style={{ marginTop: 5, paddingRight: "60px" }}>
              <Grid item style={{ marginTop: 15 }}>
                <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                  Status
                </Typography>
              </Grid>
              <SelectItemsIcon
                selectOptionData={dataSelectStatus}
                selectedValue={data.status}
                onSelectValueChange={(newVal) =>
                  handleChangeState(newVal, "status")
                }
                disabled={isDisabledEdit}
              />
            </Grid>
          </Grid>

          {/* Button Container */}
          <Grid item style={{ marginTop: 55 }}>
            <Grid
              container
              justify="space-between"
              style={{ paddingLeft: 30, paddingRight: 30 }}
            >
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
              {isDisabledEdit === false && (
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={classes.primaryButton}
                    onClick={handleSave}
                    style={{ textTransform: "capitalize" }}
                  >
                    Acknowledge
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
