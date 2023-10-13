import React, { useState, useCallback, useContext, useMemo } from "react";
import { RootContext } from "../../../../../../router";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Typography,
  withStyles,
} from "@material-ui/core";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as DropDownIcon } from "../../../../../../assets/icons/linear-red/chevron-down.svg";
import { ReactComponent as DropDownGrayIcon } from "../../../../../../assets/icons/duotone-gray/chevron-down-gray.svg";
import { ReactComponent as SyncGreenIcon } from "../../../../../../assets/icons/siab/sync-green.svg";
import { ReactComponent as SyncRedIcon } from "../../../../../../assets/icons/siab/sync-red.svg";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/duotone-red/calendar.svg";
import FotoSesudah1 from "../../../../../../assets/images/Foto-ATM-sesudah-1.png";
import FotoSesudah2 from "../../../../../../assets/images/Foto-ATM-sesudah-2.png";
import FotoSesudah3 from "../../../../../../assets/images/Foto-ATM-sesudah-3.png";
import FotoSesudah4 from "../../../../../../assets/images/Foto-ATM-sesudah-4.png";
import InputText from "./inputText";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import LabelTextField from "../../../../../../components/Form/LabelTextField";
import { DatePicker } from "antd";
import moment from "moment";
import { Barlow15 } from "../../../../../../components/Typography/BarlowWithSize";
import SelectInputComponent from "../../../../../../components/AssetManagement/SelectInput";
import {
  OutlinedButton,
  ContainedButton,
} from "../../../../../../components/Button/NoiconButton";

const SelectInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${constansts.color.grayMedium}`,
    borderRadius: 8,
    fontFamily: "Barlow",
    fontSize: 13,
    padding: "12px 12px",
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      border: `1px solid ${constansts.color.primaryMedium}`,
      backgroundColor: constansts.color.white,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  disabled: {
    borderRadius: 8,
    background: constansts.color.grayUltraSoft,
  },
}))(InputBase);

const RedSwitch = withStyles({
  switchBase: {
    color: constansts.color.primaryHard,
    "&$checked": {
      color: constansts.color.grayMedium,
    },
    "&$checked + $track": {
      backgroundColor: constansts.color.graySoft,
    },
  },
  checked: {},
  track: {
    backgroundColor: constansts.color.primaryMedium,
  },
})(Switch);

const RedCheckbox = withStyles({
  root: {
    color: constansts.color.primaryHard,
    "&$checked": {
      color: constansts.color.primaryHard,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles({
  detailTitle: {
    fontWeight: 600,
    fontSize: 13,
    color: constansts.color.grayMedium,
    borderBottom: `2px solid ${constansts.color.grayMedium}`,
    paddingBottom: 10,
    marginBottom: 20,
  },
  detailInfo: {
    fontSize: 15,
    fontWeight: 400,
    color: constansts.color.dark,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 600,
    color: constansts.color.dark,
  },
  select: {
    width: "100%",
    padding: 0,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  disabledSelect: {
    width: "100%",
    padding: 0,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
    background: constansts.color.grayMedium,
  },
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
  selectHeight: {
    height: 47,
  },
  inputDisabled: {
    "& .Mui-disabled": {
      background: constansts.color.grayUltraSoft,
    },
  },
});

const dummyFoto = [
  {
    src: FotoSesudah1,
    alt: "Sesudah 1",
  },
  {
    src: FotoSesudah2,
    alt: "Sesudah 2",
  },
  {
    src: FotoSesudah3,
    alt: "Sesudah 3",
  },
  {
    src: FotoSesudah4,
    alt: "Sesudah 4",
  },
];

const informasiMesin = {
  userRequest: "",
  jenisMesin: "",
  tglKirim: "",
  idLokasi: "",
  namaLokasi: "",
  picVendor: "",
  jumlahKaset: "",
  jumlahReject: "",
  kondisiSticker: "",
  stikerId: "",
  idBaru: "",
  idMesin: "",
  snMesin: "",
  snUPS: "",
  snDVR: "",
  tahunPembelian: "",
};

const informasiGudang = {
  tglPM: "",
  tglStaging: "",
  kondisiKunci: "",
  userControl: "",
  statusPM: "-",
  kondisiCat: "",
  statusTarikan: "-",
  reservedFor: "",
};

const informationWithDisable = {
  kunciTombak: "",
  kunciFasciaAtas: "",
  kunciFasciaBawah: "",
  ups: "-",
  dvr: "-",
  cctv: "-",
};

const statusMenu = [
  {
    name: "To Do",
    value: "todo",
  },
  {
    name: "In Progress",
    value: "inProgress",
  },
  {
    name: "Done",
    value: "done",
  },
];

const DetailTabMesinATM = () => {
  const { userRoleName } = useContext(RootContext);
  const isAdmin = useMemo(() => {
    if (userRoleName === "Admin") return true;
    return false;
  }, [userRoleName]);
  const [disableKunciTombak, setDisableKunciTombak] = useState(true);
  const [disableKunciFasciaAtas, setDisableKunciFasciaAtas] = useState(true);
  const [disableKunciFasciaBawah, setDisableKunciFasciaBawah] = useState(true);
  const [disableUPS, setDisableUPS] = useState(true);
  const [disableDVR, setDisableDVR] = useState(true);
  const [disableCCTV, setDisableCCTV] = useState(true);
  const [checkFM, setCheckFM] = useState(false);
  const [checkCardBin, setCheckCardBin] = useState(false);
  const [checkPINCover, setCheckPINCover] = useState(false);
  const [checkBooth, setCheckBooth] = useState(false);
  const [disabledStatus, setDisabledStatus] = useState(true);
  const classes = useStyles();

  const [machineInformation, setInformation] = useState(informasiMesin);
  const [warehouseInformation, setWarehouse] = useState(informasiGudang);
  const [withDisableInput, setInput] = useState(informationWithDisable);

  const onChangeInput = useCallback(
    (key, e, type) => {
      console.log(key, type === "date" ? e : e.target.value);
      if (type === "date") setWarehouse({ ...warehouseInformation, [key]: e });
      if (type === "text")
        setWarehouse({ ...warehouseInformation, [key]: e.target.value });
    },
    [warehouseInformation]
  );

  const onChangeInputDisable = useCallback(
    (key, e, type) => {
      console.log(key, type === "date" ? e : e.target.value);
      if (type === "date") setInput({ ...warehouseInformation, [key]: e });
      if (type === "text")
        setInput({ ...warehouseInformation, [key]: e.target.value });
    },
    [warehouseInformation]
  );

  const labelInformasi = [
    "User Request",
    "Jenis Mesin",
    "Tgl Kirim / Tarik",
    "ID Location",
    "Nama Lokasi",
    "PIC / Vendor",
    "Jumlah Kaset",
    "Jumlah Reject",
    "Kondisi Sticker",
    "Sticker ID",
    "ID Baru",
    "ID Mesin",
    "SN Mesin",
    "SN UPS",
    "SN DVR",
    "Tahun Pembelian",
  ];

  const labelWarehouse = [
    "Tgl PM",
    "Tgl Staging",
    "Kondisi Kunci",
    "User Control",
    "Status PM",
    "Kondisi Cat",
    "Status Tarikan",
    "Reserved For",
  ];

  const ListInformation = ({ label, value }) => (
    <>
      <Grid item xs={5}>
        <Typography className={classes.detailInfo}>{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography className={classes.detailValue}>
          <span className={classes.detailInfo}>:</span> {value ? value : "-"}
        </Typography>
      </Grid>
    </>
  );

  const LeftMachineInformation = Object.values(machineInformation).map(
    (item, index) => {
      const lastIndex = Math.round(
        Object.values(machineInformation).length / 2
      );
      if (index < lastIndex)
        return (
          <ListInformation
            key={index}
            label={labelInformasi[index]}
            value={item}
          />
        );
    }
  );

  const RightMachineInformation = Object.values(machineInformation).map(
    (item, index) => {
      const firstIndex = Math.round(
        Object.values(machineInformation).length / 2
      );
      if (index >= firstIndex)
        return (
          <ListInformation
            key={index}
            label={labelInformasi[index]}
            value={item}
          />
        );
    }
  );

  const LeftWarehouseInformation = Object.values(warehouseInformation).map(
    (item, index) => {
      const lastIndex = Math.round(
        Object.values(warehouseInformation).length / 2
      );
      if (index < lastIndex)
        return (
          <ListInformation
            key={index}
            label={labelWarehouse[index]}
            value={item}
          />
        );
    }
  );

  const RightWarehouseInformation = Object.values(warehouseInformation).map(
    (item, index) => {
      const firstIndex = Math.round(
        Object.values(warehouseInformation).length / 2
      );
      if (index >= firstIndex)
        return (
          <ListInformation
            key={index}
            label={labelWarehouse[index]}
            value={item}
          />
        );
    }
  );

  const inputType = [
    "text",
    "text",
    "text",
    "text",
    "select",
    "text",
    "select",
    "text",
  ];

  const inputType2 = ["text", "text", "text", "select", "select", "select"];

  const inputHasDisable = [
    disableKunciTombak,
    disableKunciFasciaAtas,
    disableKunciFasciaBawah,
    disableUPS,
    disableDVR,
    disableCCTV,
  ];

  const getLabel = (key) => {
    if (key === "tglPM") return "Tgl PM";
    if (key === "tglStaging") return "Tgl Staging";
    if (key === "kondisiKunci") return "Kondisi Kunci";
    if (key === "userControl") return "User Control";
    if (key === "statusPM") return "Status PM";
    if (key === "kondisiCat") return "Kondisi Cat";
    if (key === "statusTarikan") return "Status Tarikan";
    if (key === "reservedFor") return "Reserved For";
    if (key === "kunciTombak") return "Kunci Tombak";
    if (key === "kunciFasciaAtas") return "Kunci Fascia Atas";
    if (key === "kunciFasciaBawah") return "Kunci Fascia Bawah";
    if (key === "ups") return "UPS";
    if (key === "dvr") return "DVR";
    if (key === "cctv") return "CCTV";

    return "unknown";
  };

  const messageTemplate = (err, type) => {
    if (type === "text") return `${getLabel(err)} harus di isi !\n`;
    if (type === "select")
      return `pilih salah satu option dari ${getLabel(err)} !\n`;
  };

  const onSave = () => {
    // checking null payload
    const arrError = [];
    Object.values(warehouseInformation).map((item, index) => {
      if (Object.keys(warehouseInformation)[index] === "statusTarikan") return;
      if (!item || item === "-")
        arrError.push(
          messageTemplate(
            Object.keys(warehouseInformation)[index],
            inputType[index]
          )
        );
    });

    Object.values(withDisableInput).map((item, index) => {
      if (
        (!item && !inputHasDisable[index]) ||
        (item === "-" && !inputHasDisable[index])
      )
        arrError.push(
          messageTemplate(
            Object.keys(withDisableInput)[index],
            inputType2[index]
          )
        );
    });

    // return error of null item
    if (arrError.length > 0) return alert(arrError.join(""));

    const payload = {
      tglPM: warehouseInformation.tglPM,
      tglStaging: warehouseInformation.tglStaging,
      kondisiKunci: warehouseInformation.kondisiKunci,
      userControl: warehouseInformation.userControl,
      statusPM: warehouseInformation.statusPM,
      kondisiCat: warehouseInformation.kondisiCat,
      statusTarikan: warehouseInformation.statusTarikan,
      reservedFor: warehouseInformation.reservedFor,
      kunciTombak: disableKunciTombak ? "" : withDisableInput.kunciTombak,
      kunciFasciaAtas: disableKunciFasciaAtas
        ? ""
        : withDisableInput.kunciFasciaAtas,
      kunciFasciaBawah: disableKunciFasciaBawah
        ? ""
        : withDisableInput.kunciFasciaBawah,
      ups: disableUPS ? "" : withDisableInput.ups,
      dvr: disableDVR ? "" : withDisableInput.dvr,
      cctv: disableCCTV ? "" : withDisableInput.cctv,
      checkFM: checkFM,
      checkCardBin: checkCardBin,
      checkPINCover: checkPINCover,
      checkBooth: checkBooth,
    };

    console.log(payload);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Mesin
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {LeftMachineInformation}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {RightMachineInformation}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Gudang
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* No Aktivitas */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      No Aktivitas
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> A-11341
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* No Aset Gudang */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      No Aset Gudang
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 223412
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* input field */}
            {isAdmin ? (
              <Grid container spacing={4} style={{ marginTop: 15 }}>
                {/* left input field */}
                <Grid item xs={6}>
                  {/* tgl PM */}
                  <Box>
                    <Barlow15 style={{ fontWeight: 400, marginBottom: 5 }}>
                      Tgl PM
                    </Barlow15>
                    <DatePicker
                      format="DD-MM-YYYY"
                      popupStyle={{ zIndex: 1500 }}
                      allowClear={false}
                      suffixIcon={<CalendarIcon />}
                      className={classes.datePicker}
                      placeholder="Tgl PM"
                      value={warehouseInformation.tglPM}
                      style={{ height: 47, width: "100%" }}
                      onChange={(newDate) => {
                        let valDate = "";
                        if (newDate === null) {
                          valDate = "";
                        } else {
                          valDate = newDate.unix() * 1000;
                        }
                        onChangeInput(
                          "tglPM",
                          moment.unix(valDate / 1000),
                          "date"
                        );
                      }}
                    />
                  </Box>

                  {/* tgl staging */}
                  <Box style={{ marginTop: 10 }}>
                    <Barlow15 style={{ fontWeight: 400, marginBottom: 5 }}>
                      Tgl Staging
                    </Barlow15>
                    <DatePicker
                      format="DD-MM-YYYY"
                      popupStyle={{ zIndex: 1500 }}
                      allowClear={false}
                      suffixIcon={<CalendarIcon />}
                      className={classes.datePicker}
                      placeholder="Tgl Staging"
                      value={warehouseInformation.tglStaging}
                      style={{ height: 47, width: "100%" }}
                      onChange={(newDate) => {
                        let valDate = "";
                        if (newDate === null) {
                          valDate = "";
                        } else {
                          valDate = newDate.unix() * 1000;
                        }
                        onChangeInput(
                          "tglStaging",
                          moment.unix(valDate / 1000),
                          "date"
                        );
                      }}
                    />
                  </Box>

                  {/* kondisi kunci */}
                  <Box style={{ marginTop: 10 }}>
                    <LabelTextField
                      label={
                        <Barlow15 style={{ fontWeight: 400 }}>
                          Kondisi Kunci
                        </Barlow15>
                      }
                      value={warehouseInformation.kondisiKunci}
                      placeholder="Kondisi Kunci"
                      onChange={(e) => onChangeInput("kondisiKunci", e, "text")}
                      height={47}
                    />
                  </Box>

                  {/* User Control */}
                  <Box style={{ marginTop: 10 }}>
                    <LabelTextField
                      label={
                        <Barlow15 style={{ fontWeight: 400 }}>
                          User Control
                        </Barlow15>
                      }
                      value={warehouseInformation.userControl}
                      placeholder="User Control"
                      onChange={(e) => onChangeInput("userControl", e, "text")}
                      height={47}
                    />
                  </Box>
                </Grid>

                {/* right input field */}
                <Grid item xs={6}>
                  {/* Status PM */}
                  <Box>
                    <Barlow15>Status PM</Barlow15>
                    <FormControl className={classes.select}>
                      <Select
                        onChange={(e) => onChangeInput("statusPM", e, "text")}
                        input={<SelectInput />}
                        style={{
                          marginTop: 5,
                          height: 47,
                        }}
                        IconComponent={DropDownIcon}
                        defaultValue={warehouseInformation.statusPM}
                      >
                        <MenuItem value="-">Pilih Status PM</MenuItem>
                        {statusMenu.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Kondisi Cat */}
                  <Box style={{ marginTop: 10 }}>
                    <LabelTextField
                      label={
                        <Barlow15 style={{ fontWeight: 400 }}>
                          Kondisi Cat
                        </Barlow15>
                      }
                      value={warehouseInformation.kondisiCat}
                      placeholder="Kondisi Cat"
                      onChange={(e) => onChangeInput("kondisiCat", e, "text")}
                      height={47}
                    />
                  </Box>

                  {/* Status Tarikan */}
                  <Box style={{ marginTop: 10 }}>
                    <Barlow15>Status Tarikan</Barlow15>
                    <FormControl className={classes.select}>
                      <Select
                        disabled={disabledStatus}
                        onChange={(e) =>
                          onChangeInput("statusTarikan", e, "text")
                        }
                        input={<SelectInput />}
                        style={{ marginTop: 5, height: 47 }}
                        IconComponent={
                          disabledStatus ? DropDownGrayIcon : DropDownIcon
                        }
                        defaultValue={warehouseInformation.statusTarikan}
                      >
                        <MenuItem value="-">Pilih Status Tarikan</MenuItem>
                        {statusMenu.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Reserved For */}
                  <Box style={{ marginTop: 10 }}>
                    <LabelTextField
                      label={
                        <Barlow15 style={{ fontWeight: 400 }}>
                          Reserved For
                        </Barlow15>
                      }
                      value={warehouseInformation.reservedFor}
                      placeholder="Reserved For"
                      onChange={(e) => onChangeInput("reservedFor", e, "text")}
                      height={47}
                    />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    {LeftWarehouseInformation}
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    {RightWarehouseInformation}
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid
              container
              spacing={2}
              style={{
                marginTop: 15,
              }}
            >
              {/* Inputs Kunci Tombak */}
              <Grid item xs={4}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.detailInfo}>
                    Kunci Tombak
                  </Typography>
                  <RedSwitch
                    checked={disableKunciTombak}
                    onChange={() => {
                      setDisableKunciTombak(!disableKunciTombak);
                    }}
                    size="small"
                  />
                </Box>
                <InputText
                  disabled={disableKunciTombak}
                  style={{ marginTop: 5 }}
                  placeholder="Input Kunci Tombak"
                  value={withDisableInput.kunciTombak}
                  onChange={(e) =>
                    onChangeInputDisable("kunciTombak", e, "text")
                  }
                  className={classes.inputDisabled}
                />
              </Grid>

              {/* Input Kunci Fascia Atas */}
              <Grid item xs={4}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.detailInfo}>
                    Kunci Fascia Atas
                  </Typography>
                  <RedSwitch
                    checked={disableKunciFasciaAtas}
                    onChange={() => {
                      setDisableKunciFasciaAtas(!disableKunciFasciaAtas);
                    }}
                    size="small"
                  />
                </Box>
                <InputText
                  disabled={disableKunciFasciaAtas}
                  style={{ marginTop: 5 }}
                  placeholder="Input Kunci Fascia Atas"
                  value={withDisableInput.kunciFasciaAtas}
                  onChange={(e) =>
                    onChangeInputDisable("kunciFasciaAtas", e, "text")
                  }
                  className={classes.inputDisabled}
                />
              </Grid>

              {/* Input Kunci Fascia Bawah */}
              <Grid item xs={4}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.detailInfo}>
                    Kunci Fascia Bawah
                  </Typography>
                  <RedSwitch
                    checked={disableKunciFasciaBawah}
                    onChange={() => {
                      setDisableKunciFasciaBawah(!disableKunciFasciaBawah);
                    }}
                    size="small"
                  />
                </Box>
                <InputText
                  disabled={disableKunciFasciaBawah}
                  style={{ marginTop: 5 }}
                  placeholder="Input Kunci Fascia Bawah"
                  value={withDisableInput.kunciFasciaBawah}
                  onChange={(e) =>
                    onChangeInputDisable("kunciFasciaBawah", e, "text")
                  }
                  className={classes.inputDisabled}
                />
              </Grid>

              {/* Select UPS */}
              <Grid item xs={4}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.detailInfo}>UPS</Typography>
                  <RedSwitch
                    checked={disableUPS}
                    onChange={() => {
                      setDisableUPS(!disableUPS);
                    }}
                    size="small"
                  />
                </Box>
                <FormControl className={classes.select}>
                  <Select
                    disabled={disableUPS}
                    // value={valueSelectArea}
                    // onChange={onChangeArea}
                    style={{ marginTop: 5 }}
                    input={<SelectInput />}
                    IconComponent={disableUPS ? DropDownGrayIcon : DropDownIcon}
                    defaultValue="-"
                    onChange={(e) => onChangeInputDisable("ups", e, "text")}
                  >
                    <MenuItem value="-">Pilih Kondisi</MenuItem>
                    <MenuItem value="Baik">Baik</MenuItem>
                    <MenuItem value="Rusak">Rusak</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Select DVR */}
              <Grid item xs={4}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.detailInfo}>DVR</Typography>
                  <RedSwitch
                    checked={disableDVR}
                    onChange={() => {
                      setDisableDVR(!disableDVR);
                    }}
                    size="small"
                  />
                </Box>
                <FormControl className={classes.select}>
                  <Select
                    disabled={disableDVR}
                    // value={valueSelectArea}
                    // onChange={onChangeArea}
                    style={{ marginTop: 5 }}
                    input={<SelectInput />}
                    IconComponent={disableDVR ? DropDownGrayIcon : DropDownIcon}
                    defaultValue="-"
                    onChange={(e) => onChangeInputDisable("dvr", e, "text")}
                  >
                    <MenuItem value="-">Pilih Kondisi</MenuItem>
                    <MenuItem value="Baik">Baik</MenuItem>
                    <MenuItem value="Rusak">Rusak</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Select CCTV */}
              <Grid item xs={4}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography className={classes.detailInfo}>CCTV</Typography>
                  <RedSwitch
                    checked={disableCCTV}
                    onChange={() => {
                      setDisableCCTV(!disableCCTV);
                    }}
                    size="small"
                  />
                </Box>
                <FormControl className={classes.select}>
                  <Select
                    disabled={disableCCTV}
                    // value={valueSelectArea}
                    // onChange={onChangeArea}
                    style={{ marginTop: 5 }}
                    input={<SelectInput />}
                    IconComponent={
                      disableCCTV ? DropDownGrayIcon : DropDownIcon
                    }
                    defaultValue="-"
                    onChange={(e) => onChangeInputDisable("cctv", e, "text")}
                  >
                    <MenuItem value="-">Pilih Kondisi</MenuItem>
                    <MenuItem value="Baik">Baik</MenuItem>
                    <MenuItem value="Rusak">Rusak</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{
                marginTop: 15,
              }}
            >
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <RedCheckbox
                      checked={checkFM}
                      onChange={() => {
                        setCheckFM(!checkFM);
                      }}
                      name="checkedA"
                    />
                  }
                  label="FM"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <RedCheckbox
                      checked={checkCardBin}
                      onChange={() => {
                        setCheckCardBin(!checkCardBin);
                      }}
                      name="checkedA"
                    />
                  }
                  label="Card Bin"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <RedCheckbox
                      checked={checkPINCover}
                      onChange={() => {
                        setCheckPINCover(!checkPINCover);
                      }}
                      name="checkedA"
                    />
                  }
                  label="PIN Cover"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <RedCheckbox
                      checked={checkBooth}
                      onChange={() => {
                        setCheckBooth(!checkBooth);
                      }}
                      name="checkedA"
                    />
                  }
                  label="Booth"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Umum
            </Typography>
            <Grid Container>
              <Grid item xs={6}>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#8D98B4",
                    marginBottom: 5,
                  }}
                >
                  Status
                </Typography>
                <FormControl className={classes.select}>
                  <Select
                    // value={valueSelectArea}
                    // onChange={onChangeArea}
                    style={{ marginTop: 5 }}
                    input={<SelectInput />}
                    IconComponent={DropDownIcon}
                    defaultValue="Ready"
                  >
                    <MenuItem value="Ready">
                      <SyncGreenIcon />
                      <Typography style={{ marginLeft: 5 }}>READY</Typography>
                    </MenuItem>
                    <MenuItem value="Not Ready">
                      <SyncRedIcon />
                      <Typography style={{ marginLeft: 5 }}>
                        NOT READY
                      </Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box style={{ marginTop: 40 }}>
              <Typography
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#8D98B4",
                }}
              >
                Foto ATM
              </Typography>
              <Grid container style={{ marginTop: 5 }}>
                {dummyFoto.map((img) => (
                  <Grid>
                    <img
                      style={{
                        borderRadius: 8,
                        width: 115,
                        height: 80,
                        marginRight: 20,
                      }}
                      src={img.src}
                      alt={img.alt}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box style={{ marginTop: 40 }}>
              <Typography
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 10,
                  color: constansts.color.dark,
                }}
              >
                Vendor Attachment
              </Typography>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <MinioDocComponent filePath="/Surat Penawaran.pdf" />
                </Grid>
                <Grid item>
                  <MinioDocComponent filePath="/Attachment 2" />
                </Grid>
                <Grid item>
                  <MinioDocComponent filePath="/Attachment 3" />
                </Grid>
              </Grid>
            </Box>

            {/* button cancel and save */}
            {isAdmin && (
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                style={{ marginTop: 57 }}
              >
                <Grid item>
                  <OutlinedButton>Cancel</OutlinedButton>
                </Grid>
                <Grid item>
                  <ContainedButton onClick={onSave}>Simpan</ContainedButton>
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailTabMesinATM;
