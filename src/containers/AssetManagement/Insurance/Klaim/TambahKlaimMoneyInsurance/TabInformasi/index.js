import {
  Box,
  FormControl,
  Grid,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { ReactComponent as DropDownIcon } from "../../../../../../assets/icons/linear-red/chevron-down.svg";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/linear-red/calendar.svg";
import constansts from "../../../../../../helpers/constants";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import { unix } from "moment";
import { DatePicker } from "antd";
import { ChkyButtons } from "../../../../../../components";
import SelectInput from "../../../../../../components/AssetManagement/SelectInput";
import InputText from "../../../../../../components/AssetManagement/inputText";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    width: 640,
    padding: "30px 20px",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "15px",
    width: "100%",
    paddingBottom: "10px",
    borderBottom: "2px solid #BCC8E7",
    marginBottom: 20,
    color: "#BCC8E7",
  },
  select: {
    width: "100%",
    padding: 0,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  datePicker: {
    width: "100%",
    padding: "16px 10px",
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontWeight: 400,
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 13,
    },
  },
});

const dummyData = {
  noKlaim: 123132,
  slaApproval: "21 Days",
  tipeKlaim: "Money Insurance",
  jumlahKerugian: "700.000",
  tglPengajuan: 1659314592000,
  kategori: "Vandal",
  idMesin: 5783,
  flm: "TAG",
  SnMesin: "56HG704680",
  slm: "Diebold Nixdorf",
  lokasi: "BKS. ATM CENTER APOTIK TAMAN NAROGONG INDAH",
  cctv: "-",
  ketKerugian: "Exit Shutter Palsu - Endra Budi Harianto",
  attachment: [
    { file: "Doc Klaim.pdf" },
    { file: "Attachment 4" },
    { file: "Attachment 2" },
    { file: "Attachment 5" },
    { file: "Attachment 3" },
  ],
  tglKejadian: 1659314592000,
  tglKirimDoc: 1659314592000,
  diajukanBeban: "Asuransi (Internal Ops)",
};

const TabInformasi = () => {
  const [valueKerugian, setValueKerugian] = useState(dummyData.jumlahKerugian);
  const [valueKetKerugian, setValueKetKerugian] = useState(
    dummyData.ketKerugian
  );
  const [incidentDate, setIncidentDate] = useState(dummyData.tglKejadian);
  const classes = useStyles();

  const onChangeStartDate = (e) => {
    const value = e;
    setIncidentDate(value);
    console.log("tgl kejadian >>> ", value);
  };

  const valueSelect = [
    {
      name: "Pilih Kategori",
      value: "pilihKategori"
    },
    {
      name: "Vandal",
      value: "vandal"
    },
    {
      name: "Usia Pemakaian",
      value: "usiaPemakaian"
    },
    {
      name: "Force Majeur",
      value: "forceMajeur"
    },
    {
      name: "Human Error",
      value: "humanError"
    },
  ]

  return (
    <Box className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.title}>Informasi</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography>No Klaim</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.noKlaim}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>Jumlah Kerugian</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <InputText
                    value={valueKerugian}
                    onChange={(e) => {
                      setValueKerugian(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={5}>
                  <Typography>Tipe Klaim</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.tipeKlaim}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>Kategori</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <SelectInput menuItem={valueSelect} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>Tanggal Pengajuan</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {unix(dummyData.tglPengajuan / 1000).format("DD-MM-YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>FLM</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.flm}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>ID Mesin</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.idMesin}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>SLM</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.slm}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>SN Mesin</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.SnMesin}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>CCTV</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.cctv}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>Lokasi</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {dummyData.lokasi}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Attachment */}
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                {dummyData.attachment.map((item) => (
                  <Grid item xs={6}>
                    <MinioDocComponent filePath={`/${item.file}`} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <Typography>Keterangan Kerugian</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <InputText
                    value={valueKetKerugian}
                    onChange={(e) => {
                      setValueKetKerugian(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={5}>
                  <Typography>Tgl Kirim DOC komplit ke Asuransi</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {unix(dummyData.tglKirimDoc / 1000).format("DD-MM-YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={5}>
                  <Typography>Tgl Kejadian</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  {/* <Typography
                    style={{ fontWeight: 600, color: constansts.color.dark }}
                  >
                    {unix(dummyData.tglKejadian / 1000).format("DD/MM/YYYY")}
                  </Typography> */}

                  <DatePicker
                    format="DD/MM/YYYY"
                    popupStyle={{ zIndex: 1500 }}
                    allowClear={false}
                    suffixIcon={<CalendarIcon />}
                    className={classes.datePicker}
                    placeholder="Tgl Kejadian"
                    value={unix(incidentDate / 1000)}
                    onChange={(newDate) => {
                      let valDate = "";
                      if (newDate === null) {
                        valDate = "";
                      } else {
                        valDate = newDate.unix() * 1000;
                      }
                      onChangeStartDate(unix(valDate / 1000));
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 20 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <ChkyButtons
                buttonType="redOutlined"
                style={{ textTransform: "none" }}
              >
                Cancel
              </ChkyButtons>
            </Grid>
            <Grid item>
              <ChkyButtons
                buttonType="redFilled"
                style={{ textTransform: "none" }}
              >
                Simpan
              </ChkyButtons>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TabInformasi;
