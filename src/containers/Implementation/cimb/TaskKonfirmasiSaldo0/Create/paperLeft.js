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
import "moment/locale/id";
import locale from 'antd/es/date-picker/locale/id_ID';
import { ReactComponent as IconKonfirmasiSaldo0 } from "../../../../../assets/icons/task/konfirmasiSaldo0Red.svg";
import { ReactComponent as CalendarIcon } from "../../../../../assets/icons/linear-red/calendar.svg";
import * as Colors from "../../../../../assets/theme/colors";
import InputBordered from "../../common/InputComponent";
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import ErrorComponent from "../../common/ErrorComponent";
import UploadFoto from "../../common/UploadFoto";
import ImageSelector from "../../../../../components/ImageSelector";

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
    minHeight: "400px",
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

function LeftComponent(props) {
  const classes = useStyles();
  const { data, isLoadData, errorForm, onChange } = props;
  const [value, setValue] = useState("");
  const [valueLongText, setValueLongText] = useState("");
  const [valueDate, setValueDate] = useState("");

  const [photoFront, setPhotoFront] = useState('');
  const [photoLeft, setPhotoLeft] = useState('');
  const [photoRight, setPhotoRight] = useState('');
  const [photoRear, setPhotoRear] = useState('');

  const handleChangeState = (dataKonfirmasiSaldo0, keyData) => {
    const items = {
      ...data,
      [keyData]: dataKonfirmasiSaldo0,
    };
    onChange(items);
  };

  const handleChange = (e) => {
    // console.log(e);
    setValue(e);
    handleChangeState(e, "category");
  };

  const handleChangeLongText = (e) => {
    // console.log(e.target.value);
    setValueLongText(e.target.value);
    handleChangeState(e.target.value, "description");
  };

  const handleChangeDate = (e, newValue) => {
    // console.log(newValue);
    setValueDate(newValue);
    handleChangeState(newValue, "date");
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  // FOTO

  useEffect(() => {
    if(photoFront !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoFront",
        file: photoFront
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoFront';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoFront]);

  useEffect(() => {
    if(photoRight !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRight",
        file: photoRight
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoRight';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoRight]);

  useEffect(() => {
    if(photoLeft !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoLeft",
        file: photoLeft
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoLeft';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoLeft]);

  useEffect(() => {
    // console.log("+++ photoRear", JSON.stringify(photoRear));
    if(photoRear !== ''){
      const oldDataList = data.photoList.slice();
      const newDataList = [...oldDataList];
      const newObj = {
        docKey: "photoRear",
        file: photoRear
      };
      newDataList.push(newObj);
      handleChangeState(newDataList,"photoList");
    }else{
      const oldDataList = data.photoList.slice();
      let newDataList = [...oldDataList];
      newDataList = newDataList.filter(function(item) {
        return item.docKey !== 'photoRear';
      });
      handleChangeState(newDataList,"photoList");
    }
  }, [photoRear]);

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
                  Konfirmasi Saldo 0
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
              defaultValue="Konfirmasi Saldo 0"
              value="Konfirmasi Saldo 0"
              disabled
            />
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
                          Tanggal Check
                        </Typography>
                      </Grid>
                      <Grid item style={{ paddingTop: "5px" }}>
                        <DatePicker
                          disabledDate={disabledDate}
                          locale={locale}
                          suffixIcon={<CalendarIcon style={{height: 20, position: 'absolute', top: 0, left: -25}}/>}
                          value={data.date? moment(data.dueDate): ""}
                          onChange={(newDate)=>{
                            let valDate = "";
                            if(newDate === null){
                              valDate = "";
                            }else{
                              valDate = newDate.unix() * 1000;
                            }
                            handleChangeState(valDate, 'date');
                          }}
                          style={{
                            borderRadius: 6,
                            height: '40px',
                            border: '1px solid #BCC8E7',
                            width: '100%',
                            paddingLeft: 35,
                          }}
                          placeholder='Choose Due Date'
                          format="DD MMMM YYYY"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {errorForm.date ? <ErrorComponent label="Required!" /> : null}
              </Grid>
              <Grid
                item
                style={{ marginTop: "25px", width: "96%", marginBottom: 20 }}
              >
                <Grid container direction="row">
                  <Grid container spacing={2}>
                    <Grid item>
                      <ImageSelector title="Depan" onChange={(e)=>setPhotoFront(e.target.files[0])} selectedImage={photoFront} onDelete={()=>setPhotoFront('')} />
                    </Grid>
                    <Grid item>
                      <ImageSelector title="Kanan" onChange={(e)=>setPhotoRight(e.target.files[0])} selectedImage={photoRight} onDelete={()=>setPhotoRight('')} />
                    </Grid>
                    <Grid item>
                      <ImageSelector title="Kiri" onChange={(e)=>setPhotoLeft(e.target.files[0])} selectedImage={photoLeft} onDelete={()=>setPhotoLeft('')} />
                    </Grid>
                    <Grid item>
                      <ImageSelector title="Belakang" onChange={(e)=>setPhotoRear(e.target.files[0])} selectedImage={photoRear} onDelete={()=>setPhotoRear('')} />
                    </Grid>
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
