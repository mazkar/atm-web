import React, { useState, createRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { DatePicker, Select } from "antd";
import { withStyles } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";
import { ReactComponent as IconParameter } from "../../../../../assets/icons/task/parameterRed.svg";
import { ReactComponent as PaperClipIcon } from "../../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as UserIcon } from "../../../../../assets/icons/linear-red/user.svg";
import { ReactComponent as CalendarIcon } from "../../../../../assets/icons/linear-red/calendar.svg";
import * as Colors from "../../../../../assets/theme/colors";
import InputBordered from "../../common/InputComponent";
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import ErrorComponent from "../../common/ErrorComponent";
import DoublePicker from "../../../../../components/Picker/DoublePicker";
import { doGetVendors } from "../../../../UserManagement/ApiServicesUser";
import SelectLeftCustomIcon from "../../../../../components/Selects/SelectItemsIcon";
import AttachFileSelector from "../../../../../components/AttachFileSelector";

const { Option } = Select;

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: "6px 0px 0px 6px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #DC241F",
    fontSize: 13,
    color: Colors.PrimaryHard,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

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
    cursor: "pointer",
    color: "#DC241F",
  },
  paperClip: {
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
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder": {
      paddingTop: "5px",
    },
    "& .ant-select-single .ant-select-selector": {
      height: "41px",
      border: "1px solid #A8B6DB",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    "& .ant-select-single .ant-select-arrow": {
      transition: "transform 0.2s ease-in",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: "rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
});

const dataTaskParameter = [
  { id: 0, value: "New" },
  { id: 1, value: "Existing" },
  { id: 2, value: "Not Request (-)" },
];

const dataVendor = [
  { id: 0, value: "PT. Royal" },
  { id: 1, value: "PT. Trias" },
  { id: 2, value: "PT. Cakrawala Mitra" },
  { id: 3, value: "PT. Sarana Usaha Adhi" },
];

const dataRequestType = [
  { id: 0, value: "Urgent" },
  { id: 1, value: "Regular" },
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, isLoadData, errorForm, onChange } = props;

  const fileInput5 = createRef();
  const fileInput6 = createRef();
  const fileInput7 = createRef();

  const [attachment1, setAttachment1] = useState("");
  const [attachment2, setAttachment2] = useState("");
  const [attachment3, setAttachment3] = useState("");

  const [vendorsOption, setVendorsOption] = useState([
    { value: "-", name: "-Pilih Vendor-" },
  ]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);
  const [value, setValue] = useState("");
  const [valueLongText, setValueLongText] = useState("");
  const [valueVendor, setValueVendor] = useState("");
  const [valueRequestType, setValueRequestType] = useState("");
  const [valOnOff, setValOnOff] = useState("");
  const [valPremises, setValPremises] = useState("");
  const [valAtmIdBaru, setValAtmIdBaru] = useState("");
  const [valMesinBaru, setValMesinBaru] = useState("");
  const [valLokasiBaru, setValLokasiBaru] = useState("");

  function loadVendorsHandler(bool) {
    setIsLoadVendors(bool);
  }
  const handleChangeMigrasi = (dataMigrasi, keyData) => {
    const items = {
      ...data,
      [keyData]: dataMigrasi,
    };
    onChange(items);
  };

  const handleChange = (e) => {
    console.log(e);
    setValue(e);
    handleChangeMigrasi(e, "category");
  };

  const handleChangeLongText = (e) => {
    console.log(e.target.value);
    setValueLongText(e.target.value);
    handleChangeMigrasi(e.target.value, "description");
  };

  const handleChangeDate = (e) => {
    const newDate = new Date(e);
    const milisec = newDate.getTime();
    console.log(e);
    handleChangeMigrasi(milisec, "date");
  };

  const handleChangeVendor = (e) => {
    console.log(e);
    setValueVendor(e);
    handleChangeMigrasi(e, "picVendor");
  };

  const handleRequestType = (e) => {
    console.log(e);
    setValueRequestType(e);
    handleChangeMigrasi(e, "requestType");
  };

  const handleOnOff = (e) => {
    console.log(e);
    setValOnOff(e);
    handleChangeMigrasi(e, "onOff");
  };

  const onPremises = (e) => {
    console.log(e);
    setValPremises(e);
    handleChangeMigrasi(e, "premises");
  };

  const handleAtmIdBaru = (e) => {
    console.log(e.target.value);
    setValAtmIdBaru(e.target.value);
    handleChangeMigrasi(e.target.value, "atmIdBaru");
  };

  const handleMesinBaru = (e) => {
    console.log(e.target.value);
    setValMesinBaru(e.target.value);
    handleChangeMigrasi(e.target.value, "mesinBaru");
  };

  const handleLokasiBaru = (e) => {
    console.log(e.target.value);
    setValLokasiBaru(e.target.value);
    handleChangeMigrasi(e.target.value, "lokasiBaru");
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < moment().endOf('day');
  };
  // Get Vendors
  useEffect(() => {
    doGetVendors(loadVendorsHandler).then((response) => {
      if (response?.length > 0) {
        const options = [{ value: "-", name: "-Pilih Vendor-" }];
        response.map((item) => {
          const newObj = { value: item.id, name: item.name };
          options.push(newObj);
        });
        setVendorsOption(options);
      }
    });
  }, []);

  useEffect(() => {
    if (attachment1 !== "") {
      const oldDataList = data.documentList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "attachment1",
        file: attachment1,
      };
      newDataList.push(newObj);
      handleChangeMigrasi(newDataList, "documentList");
    } else {
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment1";
      });
      handleChangeMigrasi(newDataList, "documentList");
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
      handleChangeMigrasi(newDataList, "documentList");
    } else {
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment2";
      });
      handleChangeMigrasi(newDataList, "documentList");
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
      handleChangeMigrasi(newDataList, "documentList");
    } else {
      const oldDataList = data.documentList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function (item) {
        return item.docKey !== "attachment3";
      });
      handleChangeMigrasi(newDataList, "documentList");
    }
  }, [attachment3]);

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid container direction="column" style={{ paddingBottom: "15px" }}>
          <Grid item>
            <Grid
              container
              direction="row"
              style={{ padding: "15px 5px 15px 15px" }}
            >
              <Grid item style={{ padding: "2px 7px" }}>
                <IconParameter />
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, color: "#DC241F" }}>
                  Parameter
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "15px", marginBottom: "20px", width: "96%" }}
          >
            <Select
              className="CommonSelect__select--bordered #BCC8E7"
              style={{ width: "96%" }}
              onChange={handleChange}
              placeholder="Pilih Parameter"
              suffixIcon={
                <AngleDownIcon className="CommonSelect__select-icon" />
              }
            >
              {dataTaskParameter.map((data) => (
                <Option key={data.id} value={data.value}>
                  {data.value}
                </Option>
              ))}
            </Select>
            {errorForm.category ? <ErrorComponent label="Select one!" /> : null}
          </Grid>

          <Grid
            item
            style={{
              paddingLeft: "15px",
              paddingTop: "15px",
              marginBottom: "20px",
              width: "96%",
            }}
          >
            <InputBordered
              multiline
              rows={6}
              style={{ width: "96%" }}
              onChange={handleChangeLongText}
              placeholder="Notes & Description"
            />
            {errorForm.description ? (
              <ErrorComponent label="Required!" />
            ) : null}
          </Grid>

          <Grid item style={{ paddingLeft: "20px", width: "100%" }}>
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="row">
                  <Grid item style={{ width: "100%" }}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography
                          style={{ fontWeight: 500, color: "#8D98B4" }}
                        >
                          Due Date
                        </Typography>
                      </Grid>
                      <Grid item style={{ paddingTop: "5px" }}>
                        <Paper
                          component="form"
                          className={classes.rootPaperSecond}
                          style={{ width: "85%" }}
                        >
                          <div className={classes.iconButton}>
                            <CalendarIcon
                              style={{ height: 20, marginLeft: 5 }}
                            />
                          </div>
                          <DatePicker
                            disabledDate={disabledDate}
                            suffixIcon
                            onChange={handleChangeDate}
                            style={{
                              borderRadius: 5,
                              width: "96%",
                              height: "30px",
                              border: "1px solid #fff",
                            }}
                            placeholder="Choose Due Date"
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {errorForm.date ? <ErrorComponent label="Required!" /> : null}
              </Grid>
              <Grid item xs={5}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      PIC / Vendor
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "5px", width: "100%" }}>
                    {isLoadVendors ? (
                      <Typography style={{ padding: 10 }}>
                        Loading...
                      </Typography>
                    ) : (
                      <SelectLeftCustomIcon
                        leftIcon={<UserIcon style={{ height: 20 }} />}
                        selectOptionData={vendorsOption}
                        selectedValue={data.picVendor}
                        onSelectValueChange={(newVal) => {
                          setValueVendor(newVal);
                          handleChangeMigrasi(newVal, "picVendor");
                        }}
                      />
                    )}
                    {errorForm.picVendor ? (
                      <ErrorComponent label="Select one!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "20px", width: "100%" }}
          >
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      Request Type
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "5px", width: "100%" }}>
                    <Select
                      className="CommonSelect__select--bordered #BCC8E7"
                      style={{ width: "85%" }}
                      onChange={handleRequestType}
                      placeholder="Choose Request Type"
                      suffixIcon={
                        <AngleDownIcon className="CommonSelect__select-icon" />
                      }
                    >
                      {dataRequestType.map((data) => (
                        <Option key={data.id} value={data.value}>
                          {data.value}
                        </Option>
                      ))}
                    </Select>
                    {errorForm.requestType ? (
                      <ErrorComponent label="Select one!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <DoublePicker onOff={handleOnOff} onPremises={onPremises} />
                {errorForm.premises ? (
                  <ErrorComponent label="Select one!" />
                ) : null}
              </Grid>
            </Grid>
          </Grid>

          {/*<Grid
            item
            style={{ paddingLeft: "20px", marginTop: "20px", width: "100%" }}
          >
           <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      ATM ID Baru
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "13px" }}>
                    <InputBordered
                      style={{ width: "85%", height: "24px" }}
                      onChange={handleAtmIdBaru}
                      placeholder="Input ID Baru"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "8px" }}>
                    {errorForm.atmIdBaru ? (
                      <ErrorComponent label="Required!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      Mesin Baru
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "13px" }}>
                    <InputBordered
                      style={{ width: "100%", height: "24px" }}
                      onChange={handleMesinBaru}
                      placeholder="Input Mesin Baru"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "8px" }}>
                    {errorForm.mesinBaru ? (
                      <ErrorComponent label="Required!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

         <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "20px", width: "100%" }}
          >
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      Lokasi Baru
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "13px" }}>
                    <InputBordered
                      style={{ width: "85%", height: "24px" }}
                      onChange={handleLokasiBaru}
                      placeholder="Input Lokasi Baru"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "8px" }}>
                    {errorForm.lokasiBaru ? (
                      <ErrorComponent label="Required!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </Grid>*/}
          <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "25px", width: "96%" }}
          >
            <Grid item>
              <AttachFileSelector
                title="Attachment 1"
                refId="attachmet1"
                onChange={(e) => setAttachment1(e.target.files[0])}
                selectedFile={attachment1}
                onDelete={() => setAttachment1("")}
              />
              <AttachFileSelector
                title="Attachment 2"
                refId="attachmet2"
                onChange={(e) => setAttachment2(e.target.files[0])}
                selectedFile={attachment2}
                onDelete={() => setAttachment2("")}
              />
              <AttachFileSelector
                title="Attachment 3"
                refId="attachmet3"
                onChange={(e) => setAttachment3(e.target.files[0])}
                selectedFile={attachment3}
                onDelete={() => setAttachment3("")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

LeftComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isLoadData: PropTypes.bool,
};
LeftComponent.defaultProps = {
  isLoadData: false,
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(LeftComponent))
);
