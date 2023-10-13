import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Modal,
  Paper,
  Grid,
  Button,
  Typography,
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Input } from "antd";
import { Close } from "@material-ui/icons";
import constants from "../../../helpers/constants";
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
} from "../../../assets/theme/colors";
import InputBase from "@material-ui/core/InputBase";
import { ReactComponent as DropDownIcon } from "../../../assets/icons/general/dropdown_red.svg";
import DateSelect from "../../../components/Selects/DateSelect";

const { TextArea } = Input;

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    width: "100%",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    padding: "9.5px 12px 9.5px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const BtnGroupItem = withStyles((theme) => ({
  root: {
    textTransform: "capitalize",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "14px",
    fontSize: 12,
    backgroundColor: GrayUltrasoft,
    color: GrayMedium,
    border: "none!important",
    padding: "8px 16px",
    width: "91px",
    height: "30px",

    "&:hover": {
      color: "white",
    },
  },
  label: {
    whiteSpace: "nowrap",
  },
  contained: {
    "&.Mui-disabled": {
      color: "white",
      backgroundColor: PrimaryHard,
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 20px 20px 10px",
  },
  modal: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Barlow",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 660,
    borderRadius: 10,
    padding: "20px 30px 20px 30px",
    boxShadow: "none",
  },
  buttonContainer: {
    marginTop: 40,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 6,
    width: 72,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    borderRadius: 6,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    color: constants.color.primaryHard,
    "&:hover": {
      cursor: "pointer",
    },
  },
  select: {
    fontSize: 13,
    height: 40,
    width: "100%",
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  titleInput: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 13,
    color: "#2B2F3C",
    marginBottom: 9,
  },
  inputForm: {
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    backgroundColor: "#FFFFFF",
    height: 40,
  },
}));

const ImplementaionRequestUpdate = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [type, setType] = useState("Pengadaan");
  const [jenisPermintaan, setJenisPermintaan] = useState("0");
  const [tanggalPengadaan, setTanggalPengadaan] = useState(new Date());
  const [tanggalRequest, setTanggalRequest] = useState(new Date());
  const [namaVendor, setNamaVendor] = useState("0");
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");

  const onClickType = (value) => {
    setType(value);
  };

  const onChangeJenisPermintaan = (e) => {
    const value = e.target.value;
    setJenisPermintaan(value);
  };

  const onChangeNamaVendor = (e) => {
    const value = e.target.value;
    setNamaVendor(value);
  };

  const onChangeKeterangan = (e) => {
    const value = e.target.value;
    setKeterangan(value);
  };

  const onChangeNominal = (e) => {
    const value = e.target.value;
    setNominal(value);
  };

  const onChangeTanggalRequest = (date) => {
    setTanggalRequest(date);
  };

  const onChangeTanggalPengadaan = (date) => {
    setTanggalPengadaan(date);
  };

  const DummyData = [
    {
      id: 1,
      name: "Dummy Data 1",
    },
    {
      id: 2,
      name: "Dummy Data 2",
    },
    {
      id: 3,
      name: "Dummy Data 3",
    },
    {
      id: 4,
      name: "Dummy Data 4",
    },
    {
      id: 5,
      name: "Dummy Data 5",
    },
  ];

  return (
    <div className={classes.root}>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Paper className={classes.paper}>
          <Grid
            container
            justify="space-between"
            style={{ marginBottom: "13px" }}
          >
            <Grid item>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: 20,
                  color: "#2B2F3C",
                }}
              >
                Task Update
              </Typography>
            </Grid>
            <Grid item>
              <Close className={classes.closeIcon} onClick={onClose} />
            </Grid>
          </Grid>

          <Grid
            container
            justify="space-between"
            style={{ marginBottom: "30px" }}
          >
            <Grid item style={{ display: "flex" }}>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#2B2F3C",
                  marginRight: "2px",
                }}
              >
                Ticket ID :
              </Typography>
              <Typography
                style={{
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: 13,
                  color: "#2B2F3C",
                }}
              >
                #12453
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  background: "#EBF0FF",
                  border: "1px solid #749BFF",
                  padding: "4px 10px",
                  color: "#749BFF",
                  fontSize: "12px",
                  borderRadius: "40px",
                }}
              >
                Inprogress
              </Typography>
            </Grid>
          </Grid>

          <Grid item style={{ marginBottom: "22px" }}>
            <Grid container spacing={3} style={{ padding: "10px 0px" }}>
              <ButtonGroup
                variant="contained"
                disableElevation
                style={{ margin: "0 10px", background: "#F4F7FB" }}
              >
                <BtnGroupItem
                  disabled={type === "Pengadaan"}
                  onClick={() => onClickType("Pengadaan")}
                >
                  Pengadaan
                </BtnGroupItem>
                <BtnGroupItem
                  disabled={type === "Perbaikan"}
                  onClick={() => onClickType("Perbaikan")}
                >
                  Perbaikan
                </BtnGroupItem>
                <BtnGroupItem
                  disabled={type === "Perawatan"}
                  onClick={() => onClickType("Perawatan")}
                >
                  Perawatan
                </BtnGroupItem>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginBottom: "10px" }}>
            <Grid item xs={12} sm={6}>
              <Grid item>
                <Typography className={classes.titleInput}>
                  Jenis Permintaan :
                </Typography>
                <FormControl className={classes.select}>
                  <Select
                    value={jenisPermintaan}
                    onChange={onChangeJenisPermintaan}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value="0">Pilih Jenis Permintaan</MenuItem>
                    {DummyData.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.titleInput}>
                    Tgl Request :
                  </Typography>
                  <DateSelect
                    value={tanggalRequest}
                    handleChange={onChangeTanggalRequest}
                    width="100%"
                    popupStyle={{ zIndex: 1700 }}
                    formatView="DD-MM-YYYY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.titleInput}>
                    Tgl Pengadaan :
                  </Typography>
                  <DateSelect
                    value={tanggalPengadaan}
                    handleChange={onChangeTanggalPengadaan}
                    width="100%"
                    popupStyle={{ zIndex: 1700 }}
                    formatView="DD-MM-YYYY"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginBottom: "90px" }}>
            <Grid item xs={12} sm={6}>
              <Grid item style={{ marginBottom: "10px" }}>
                <Typography className={classes.titleInput}>
                  Nama Vendor :
                </Typography>
                <FormControl className={classes.select}>
                  <Select
                    value={namaVendor}
                    onChange={onChangeNamaVendor}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value="0">Pilih Nama Vendor</MenuItem>
                    {DummyData.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography className={classes.titleInput}>
                  Nominal :
                </Typography>
                <Input
                  className={classes.inputForm}
                  value={nominal}
                  onChange={onChangeNominal}
                  type="number"
                  placeholder="Masukan nominal"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item>
                <Typography className={classes.titleInput}>
                  Keterangan :
                </Typography>
                <TextArea
                  style={{
                    borderRadius: 6,
                    border: "1px solid #BCC8E7",
                    fontSize: 13,
                    height: 118,
                  }}
                  placeholder="Masukan keterangan...."
                  onChange={onChangeKeterangan}
                  value={keterangan}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container justify="space-between">
            <Grid item>
              <Button
                variant="outlined"
                disableElevation
                className={classes.secondaryButton}
                onClick={onClose}
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
                onClick={onClose}
                style={{ textTransform: "capitalize" }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
};

export default ImplementaionRequestUpdate;
