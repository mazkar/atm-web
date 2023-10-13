import React, { useState, createRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { ReactComponent as IconKonfirmasiSaldo0 } from "../../../../../assets/icons/task/konfirmasiSaldo0Red.svg";
import { DatePicker, Select } from "antd";
import { withStyles } from "@material-ui/styles";
import { ReactComponent as UserIcon } from "../../../../../assets/icons/linear-red/user.svg";
import { ReactComponent as CalendarIcon } from "../../../../../assets/icons/linear-red/calendar.svg";
import * as Colors from "../../../../../assets/theme/colors";
import InputBordered from "../../common/InputComponent";
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import ErrorComponent from "../../common/ErrorComponent";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";
import UploadFoto from "../../common/UploadFoto";

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
    minHeight: "685px",
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
  { id: 0, value: "PIN Cover" },
  { id: 1, value: "CCTV+DVR" },
  { id: 2, value: "CCTV Online" },
  { id: 0, value: "Plat Anti Skimming" },
  { id: 1, value: "Alarm System" },
  { id: 2, value: "Not Request (-)" },
];

const dataVendor = [
  { id: 0, value: "PT. Royal" },
  { id: 1, value: "PT. Trias" },
  { id: 2, value: "PT. Cakrawala Mitra" },
  { id: 3, value: "PT. Sarana Usaha Adhi" },
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, isLoadData, errorForm, onChange } = props;

  const [valueCategory, setValueCategory] = useState("New");
  const [valueLongText, setValueLongText] = useState(
    "Butuh Pengiriman Terkait"
  );
  const [valueVendor, setValueVendor] = useState("PT. Royal");
  const [valueDate, setValueDate] = useState(moment());

  const handleChangeKonfirmasiSaldo0 = (dataKonfirmasiSaldo0, keyData) => {
    var items = {
      ...data,
      [keyData]: dataKonfirmasiSaldo0,
    };
    onChange(items);
  };

  const handleChange = (e) => {
    console.log(e);
    setValueCategory(e);
    handleChangeKonfirmasiSaldo0(e, "category");
  };

  const handleChangeLongText = (e) => {
    console.log(e);
    setValueLongText(e);
    handleChangeKonfirmasiSaldo0(e.target.value, "description");
  };

  const handleChangeDate = (newValue) => {
    console.log(newValue);
    setValueDate(newValue);
    handleChangeKonfirmasiSaldo0(newValue, "date");
  };

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
                <IconKonfirmasiSaldo0 />
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, color: "#DC241F" }}>
                  KonfirmasiSaldo0
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "15px", marginBottom: "20px", width: "96%" }}
          >
            <InputBordered
              style={{ width: "96%", height: "24px" }}
              onChange={handleChange}
              placeholder="Input ID Baru"
              defaultValue={data.category}
              disabled
            />
            {errorForm.category ? <ErrorComponent label="Required!" /> : null}
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
              defaultValue={data.description}
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
                            suffixIcon
                            onChange={handleChangeDate}
                            defaultValue={data.date}
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
            </Grid>
          </Grid>
          <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "25px", width: "96%" }}
          >
            <Grid container direction="row">
              <Grid container spacing={2}>
                <UploadFoto title="Depan" />
                <UploadFoto title="Kanan" />
                <UploadFoto title="Kiri" />
                <UploadFoto title="Belakang" />
              </Grid>
              <Typography
                style={{
                  fontSize: "12px",
                  lineHeight: "14px",
                  color: Colors.GrayHard,
                  marginTop: 10,
                }}
              >
                *Tolong upload foto sesuai dengan keterangan yang tersedia
              </Typography>
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
