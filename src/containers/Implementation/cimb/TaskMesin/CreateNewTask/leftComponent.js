import React, { useState, useEffect, createRef } from "react";
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
import { ReactComponent as ExchangeIcon } from "../../../../../assets/icons/siab/gear-grinding.svg";
import { ReactComponent as PaperClipIcon } from "../../../../../assets/icons/linear-red/paperclip.svg";
import { ReactComponent as UserIcon } from "../../../../../assets/icons/linear-red/user.svg";
import { ReactComponent as CalendarIcon } from "../../../../../assets/icons/linear-red/calendar.svg";
import * as Colors from "../../../../../assets/theme/colors";
import InputBordered from "../../common/InputComponent";
import { ReactComponent as AngleDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import ErrorComponent from "../../common/ErrorComponent";
import { doGetVendors } from "../../../../UserManagement/ApiServicesUser";
import SelectLeftCustomIcon from "../../../../../components/Selects/SelectItemsIcon";

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
    height: "685px",
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
    "& .ant-select-single.ant-select-show-arrow .ant-select-selection-item, .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder":
      {
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

const dataTaskMesin = [
  { id: 0, value: "Kirim Mesin", name: "Kirim Mesin" },
  { id: 1, value: "Tarik Mesin", name: "Tarik Mesin" },
  { id: 2, value: "Not Request", name: "Not Request (-)" },
];

const dataVendor = [
  { id: 0, value: "PT. Citra", nameId: "PT. Citra", nameEn: "PT. Citra" },
  { id: 1, value: "PT. Wahana", nameId: "PT. Wahana", nameEn: "PT. Wahana" },
  { id: 2, value: "PT. Neopack", nameId: "PT. Neopack", nameEn: "PT. Neopack" },
];

const dataJenisMesin = [
  { id: 0, value: "ATM", nameId: "ATM", nameEn: "ATM" },
  { id: 1, value: "CRM", nameId: "CRM", nameEn: "CRM" },
  { id: 0, value: "CDM", nameId: "CDM", nameEn: "CDM" },
  { id: 1, value: "MDM", nameId: "MDM", nameEn: "MDM" },
];

const dataMerekMesin = [
  { id: 0, value: "Diebold", nameId: "Diebold", nameEn: "Diebold" },
  { id: 1, value: "Hitachi", nameId: "Hitachi", nameEn: "Hitachi" },
  { id: 0, value: "IBM", nameId: "IBM", nameEn: "IBM" },
  { id: 1, value: "NCR", nameId: "NCR", nameEn: "NCR" },
  { id: 0, value: "OKI", nameId: "OKI", nameEn: "OKI" },
  { id: 1, value: "Wincor", nameId: "Wincor", nameEn: "Wincor" },
];

function LeftComponent(props) {
  const classes = useStyles();
  const { data, isLoadData, errorForm, onChange } = props;
  const openingType = new URLSearchParams(window.location.search).get(
    "openingType"
  );

  // let fileInput5 = createRef(),
  //     fileInput6 = createRef(),
  //     fileInput7 = createRef();

  const [attachment1, setAttachment1] = useState(null);
  const [attachment2, setAttachment2] = useState(null);
  const [attachment3, setAttachment3] = useState(null);
  const [value, setValue] = useState("");
  const [valueLongText, setValueLongText] = useState("");
  const [valueVendor, setValueVendor] = useState("");
  const [valueJenisMesin, setValueJenisMesin] = useState("");
  const [valueMerekMesin, setValueMerekMesin] = useState("");
  const [valueTipeMesin, setValueTipeMesin] = useState("");
  const [valueSNMesin, setvalueSNMesin] = useState("");
  const [vendorsOption, setVendorsOption] = useState([
    { value: "-", name: "-Pilih Vendor-" },
  ]);
  const [isLoadVendors, setIsLoadVendors] = useState(false);

  function loadVendorsHandler(bool) {
    setIsLoadVendors(bool);
  }

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

  const handleChangeLongText = (e) => {
    console.log(e.target.value);
    setValueLongText(e.target.value);
    handleChangeKebutuhan(e.target.value, "description");
  };

  const handleChangeDate = (e) => {
    console.log(e);
    // handleChangeKebutuhan(e.format('DD MMMM YYYY'), 'date')
    handleChangeKebutuhan(moment().valueOf(e), "date");
  };

  const handleChangeVendor = (e) => {
    console.log(e);
    setValueVendor(e);
    handleChangeKebutuhan(e, "picVendor");
  };
  // GET OPTION VENDORS
  useEffect(() => {
    doGetVendors(loadVendorsHandler).then((response) => {
      // console.log(">>>> doFetchDataVendor :", JSON.stringify(response));
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

  const handleJenisMesin = (e) => {
    console.log(e);
    setValueJenisMesin(e);
    handleChangeKebutuhan(e, "jenisMesin");
  };

  const handleMerekMesin = (e) => {
    console.log(e);
    setValueMerekMesin(e);
    handleChangeKebutuhan(e, "merekMesin");
  };

  /*const handleTipeMesin = (e) => {
    console.log(e.target.value);
    setValueTipeMesin(e.target.value);
    handleChangeKebutuhan(e.target.value, "tipeMesin");
  };

  const handleSNMesin = (e) => {
    console.log(e.target.value);
    setvalueSNMesin(e.target.value);
    handleChangeKebutuhan(e.target.value, "snMesin");
  };*/

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  // function handleAttatchment(event, type) {
  //     event.preventDefault()
  //     switch (type) {
  //         case 'attachment1':
  //             setAttachment1(event.target.files[0])
  //             break
  //         case 'attachment2':
  //             setAttachment2(event.target.files[0])
  //             break
  //         case 'attachment3':
  //             setAttachment3(event.target.files[0])
  //             break
  //     }
  // }

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
                <ExchangeIcon />
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, color: "#DC241F" }}>
                  {openingType !== "Termin" ? "Mesin" : "Cabut Mesin"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ paddingLeft: "20px", marginBottom: "20px", width: "96%" }}
          >
            <Select
              className="CommonSelect__select--bordered #BCC8E7"
              style={{ width: "96%" }}
              onChange={handleChange}
              placeholder="Task Title"
              suffixIcon={
                <AngleDownIcon className="CommonSelect__select-icon" />
              }
            >
              {dataTaskMesin.map((data) => (
                <Option key={data.id} value={data.value}>
                  {data.name}
                </Option>
              ))}
            </Select>
            {errorForm.category ? <ErrorComponent label="Select one!" /> : null}
          </Grid>

          <Grid
            item
            style={{
              paddingLeft: "20px",
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
                          Tgl Kirim / Tarik
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
                            // onChange={handleChangeDate}
                            onChange={(newDate) => {
                              let valDate = "";
                              if (newDate === null) {
                                valDate = "";
                              } else {
                                valDate = newDate.unix() * 1000;
                              }
                              handleChangeKebutuhan(valDate, "date");
                            }}
                            style={{
                              borderRadius: 5,
                              width: "96%",
                              height: "30px",
                              border: "1px solid #fff",
                            }}
                            placeholder="Pilih Tgl Kirim / Tarik"
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
                    {/* <Paper component="form" className={classes.rootPaperSecond} style={{width: '100%'}}>
                                    <div className={classes.iconButton}>
                                        <UserIcon style={{height: 20, marginLeft: 5}}/>
                                    </div>
                                    <Select className={'CommonSelect__select'}
                                        style={{width: '96%'}}
                                        onChange={handleChangeVendor}
                                        placeholder='Pilih PIC / Vendor'
                                        suffixIcon={<AngleDownIcon/>}
                                    >
                                        {dataVendor.map((data) => (
                                        <Option key={data.id} value={data.value} >{data.value}</Option>
                                        ))}
                                    </Select>
                                </Paper> */}
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
                          handleChangeKebutuhan(newVal, "picVendor");
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
                      Jenis Mesin
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "5px", width: "100%" }}>
                    <Select
                      className="CommonSelect__select--bordered #BCC8E7"
                      style={{ width: "85%" }}
                      onChange={handleJenisMesin}
                      placeholder="Pilih Jenis Mesin"
                      suffixIcon={
                        <AngleDownIcon className="CommonSelect__select-icon" />
                      }
                    >
                      {dataJenisMesin.map((data) => (
                        <Option key={data.id} value={data.value}>
                          {data.value}
                        </Option>
                      ))}
                    </Select>
                    {errorForm.category ? (
                      <ErrorComponent label="Select one!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      Merek Mesin
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "5px", width: "100%" }}>
                    <Select
                      className="CommonSelect__select--bordered #BCC8E7"
                      style={{ width: "100%" }}
                      onChange={handleMerekMesin}
                      placeholder="Pilih Merek Mesin"
                      suffixIcon={
                        <AngleDownIcon className="CommonSelect__select-icon" />
                      }
                    >
                      {dataMerekMesin.map((data) => (
                        <Option key={data.id} value={data.value}>
                          {data.value}
                        </Option>
                      ))}
                    </Select>
                    {errorForm.category ? (
                      <ErrorComponent label="Select one!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

         {/* <Grid
            item
            style={{ paddingLeft: "20px", marginTop: "20px", width: "100%" }}
          >
            <Grid container direction="row">
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      Tipe Mesin
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "13px" }}>
                    <InputBordered
                      style={{ width: "85%", height: "24px" }}
                      onChange={handleTipeMesin}
                      placeholder="Input Tipe Mesin"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "8px" }}>
                    {errorForm.tipeMesin ? (
                      <ErrorComponent label="Required!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography style={{ fontWeight: 500, color: "#8D98B4" }}>
                      SN Mesin
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: "13px" }}>
                    <InputBordered
                      style={{ width: "100%", height: "24px" }}
                      onChange={handleSNMesin}
                      placeholder="Input SN Mesin"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: "8px" }}>
                    {errorForm.snMesin ? (
                      <ErrorComponent label="Required!" />
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>*/}

          {/* <Grid item style={{paddingLeft: '20px', marginTop: '40px', width: '96%'}}>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography style={{fontWeight: 500, color: '#8D98B4'}}>Premises</Typography>
                        </Grid>
                        <Grid item style={{marginTop: '5px'}}>
                            <Grid container direction='row'>
                                <Grid item className={classes.selectPremises}>
                                    <Select
                                        style={{ width: '100%'}}
                                        defaultValue="OFF"
                                        // suffixIcon={<AngleDownIcon />}
                                    >
                                        <Option value="Home">ON</Option>
                                        <Option value="Company">OFF</Option>
                                    </Select>
                                </Grid>
                                <Grid item className={classes.selectKonven}>
                                    <Select style={{ width: '96%' }} placeholder="Choose Premises">
                                        <Option value="Home">Konvensional</Option>
                                        <Option value="Company">Non Konvensional</Option>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}

          {/* <Grid item style={{paddingLeft: '20px', marginTop: '25px', width: '96%'}}>
                      <Grid container direction='column'>
                          <Grid item>
                                <input
                                      id="attachment1"
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e)=> handleAttatchment(e, 'attachment1')}
                                      ref={fileInput5}
                                      className={classes.input}
                                />
                                    <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment1'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment1'><Typography className={classes.attachment}>{attachment1 && attachment1.name ? attachment1.name : 'Attachment 1'}</Typography></label></Grid>
                                    </Grid>
                          </Grid>
                          <Grid item>
                                <input
                                      id="attachment2"
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e)=> handleAttatchment(e, 'attachment2')}
                                      ref={fileInput6}
                                      className={classes.input}
                                />
                                    <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment2'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment2'><Typography className={classes.attachment}>{attachment2 && attachment2.name ? attachment2.name : 'Attachment 2'}</Typography></label></Grid>
                                    </Grid>
                          </Grid>
                          <Grid item>
                                <input
                                      id="attachment3"
                                      type="file"
                                      accept=".pdf"
                                      onChange={(e)=> handleAttatchment(e, 'attachment3')}
                                      ref={fileInput7}
                                      className={classes.input}
                                />
                                    <Grid container direction='row'>
                                        <Grid item><label htmlFor='attachment3'><PaperClipIcon className={classes.paperClip}/></label></Grid>
                                        <Grid item><label htmlFor='attachment3'><Typography className={classes.attachment}>{attachment3 && attachment3.name ? attachment3.name : 'Attachment 3'}</Typography></label></Grid>
                                    </Grid>
                          </Grid>
                      </Grid>
                  </Grid> */}
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
