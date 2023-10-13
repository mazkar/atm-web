/* eslint-disable react/forbid-prop-types */
import React, { useState, createRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Paper, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { DatePicker, Select } from "antd";
import moment from "moment";
import "moment/locale/id";
import locale from 'antd/es/date-picker/locale/id_ID';
import { ReactComponent as IconKeamanan } from "../../../../../../assets/icons/task/keamananRed.svg";
import { ReactComponent as UserIcon } from "../../../../../../assets/icons/linear-red/user.svg";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/linear-red/calendar.svg";
import * as Colors from "../../../../../../assets/theme/colors";
import InputBordered from "../../../common/InputComponent";
import { ReactComponent as AngleDownIcon } from "../../../../../../assets/icons/general/dropdown_red.svg";
import ErrorComponent from "../../../common/ErrorComponent";
import SelectLeftCustomIcon from "../../../../../../components/Selects/SelectLeftCustomIcon";
import { doGetVendors } from "../../../../../UserManagement/ApiServicesUser";

const { Option } = Select;

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: '550px',
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    padding: 25,
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

const dataTaskKeamanan = [
  { id: 0, value: "PIN Cover" },
  { id: 1, value: "CCTV+DVR" },
  { id: 2, value: "CCTV Online" },
  { id: 0, value: "Plat Anti Skimming" },
  { id: 1, value: "Alarm System" },
  { id: 2, value: "Not Request (-)" },
];

const vendorSugestion = [
  {value: "-", name: "Choose PIC/Vendor"},
  {value: 'PT. Royal', name: "PT. Royal"},
  {value: 'PT. Trias', name: "PT. Trias"},
  {value: 'PT. Cakrawala Mitra', name: "PT. Cakrawala Mitra"},
  {value: 'PT. Sarana Usaha Adhi', name: "PT. Sarana Usaha Adhi"},
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, errorForm, onChange } = props;
  const openingType = (new URLSearchParams(window.location.search)).get("openingType");

  const [vendorsOption, setVendorsOption] = useState([{value: '-', name: "-Pilih Vendor-"}]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  function loadVendorsHandler(bool){
    setIsLoadVendors(bool);
  }
  const handleChangeState = (newVal, state) => {
    // console.log(`+++ ${state}: ${newVal}`);
    onChange(newVal, state);
  };
    // GET OPTION VENDORS
  useEffect(() => {
    doGetVendors(loadVendorsHandler).then(response=>{
      // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
      if(response?.length > 0){
        const options = [{value: '-', name: "-Pilih Vendor-"}];
        // eslint-disable-next-line array-callback-return
        response.map((item)=>{
          const newObj = {value: item.id, name: item.name};
          options.push(newObj);
        });
        setVendorsOption(options);
      }
    });
  }, []);

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <IconKeamanan />
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, color: "#DC241F", marginLeft: 10 }}>
                  {openingType !=="Termin" ? "Keamanan":"Cabut Keamanan"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Select
              className="CommonSelect__select--bordered #BCC8E7"
              style={{ width: "100%" }}
              value={data.category}
              onChange={(newVal)=>handleChangeState(newVal, "category")}
              placeholder="Task Title"
              suffixIcon={
                <AngleDownIcon className="CommonSelect__select-icon" />
              }
            >
              <Option key={99} value="" style={{color: "#BCC8E7"}}> Task Title </Option>
              {dataTaskKeamanan.map((item) => (
                <Option key={item.id} value={item.value}> {item.value} </Option>
              ))}
            </Select>
            {errorForm.category ? <ErrorComponent label="Select one!" /> : null}
          </Grid>

          <Grid item>
            <InputBordered
              multiline
              rows={6}
              value={data.description}
              style={{ width: "100%" }}
              onChange={(e)=>handleChangeState(e.target.value, "description")}
              placeholder="Notes & Description"
            />
            {errorForm.description ? (
              <ErrorComponent label="Required!" />
            ) : null}
          </Grid>

          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Due Date</Typography>
                  </Grid>
                  <Grid item>
                    <DatePicker 
                      locale={locale} 
                      suffixIcon={<CalendarIcon style={{height: 20, position: 'absolute', top: 0, left: -25}}/>}
                      value={data.dueDate? moment(data.dueDate): ""}
                      onChange={(newDate)=>{
                        let valDate = "";
                        if(newDate === null){
                          valDate = "";
                        }else{
                          valDate = newDate.unix() * 1000;
                        }
                        handleChangeState(valDate, 'dueDate');
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
                    { errorForm.dueDate ? <ErrorComponent label="Select one!" /> : null }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography style={{fontWeight: 500, color: '#8D98B4'}}>PIC / Vendor</Typography>
                  </Grid>
                  <Grid item>
                    {/* <SelectLeftCustomIcon 
                      leftIcon={<UserIcon style={{height: 20}}/>}
                      selectOptionData={vendorSugestion}
                      selectedValue={data.picVendor}
                      onSelectValueChange={(newVal)=>handleChangeState(newVal, 'picVendor')}/> */}
                    {isLoadVendors? (<Typography style={{padding: 10}}>Loading...</Typography>): (
                      <SelectLeftCustomIcon
                        leftIcon={<UserIcon style={{height: 20}}/>}
                        selectOptionData={vendorsOption}
                        selectedValue={data.picVendor}
                        onSelectValueChange={(newVal)=>handleChangeState(newVal, 'picVendor')}/>
                    )}
                    { errorForm.picVendor ? <ErrorComponent label="Select one!" /> : null }
                  </Grid>
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
  data: PropTypes.object.isRequired,
  errorForm: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(LeftComponent))
);
