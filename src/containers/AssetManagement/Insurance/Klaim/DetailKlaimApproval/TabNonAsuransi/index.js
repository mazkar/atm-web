import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { DatePicker } from "antd";
import { unix } from "moment";
import React, { useEffect, useState } from "react";
import { ChkyButtons } from "../../../../../../components";
import InputText from "../../../../../../components/AssetManagement/inputText";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as ExclamationIcon } from "../../../../../../assets/icons/duotone-red/exclamation-circle.svg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Barlow",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "15px",
    width: "100%",
    paddingBottom: "10px",
    borderBottom: "2px solid #BCC8E7",
    margin: "30px 0 15px 0",
    color: "#BCC8E7",
  },
  detailContainer: {
    display: "flex",
    flex: 1,
  },
  container: { display: "flex", alignItems: "center", marginBottom: "15px" },
  dataName: {
    flex: 2,
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 400,
  },
  colon: {
    flex: 0.2,
    display: "flex",
    alignItems: "center",
  },
  dataValue: {
    flex: 3,
    fontFamily: "Barlow",
    fontSize: "15px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
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

const dummyDataVendor = {
  noInvoice: 1232131,
  tglKirimInvoice: 1659314592000,
  uploadInvoice: "Invoice.jpg",
  slaKirimInvoice: 50,
};

const TabNonAsuransi = () => {
  const [valueNoInvoice, setValueNoInvoice] = useState(
    dummyDataVendor.noInvoice
  );
  const [valueKerugian, setValueKerugian] = useState(dummyData.jumlahKerugian);
  const [valueKetKerugian, setValueKetKerugian] = useState(
    dummyData.ketKerugian
  );
  const [incidentDate, setIncidentDate] = useState(dummyData.tglKejadian);
  const [valueKategori, setValueKategori] = useState(dummyData.kategori)
  const [valueIdMesin, setValueIdMesin] = useState(dummyData.idMesin)

  const onChangeStartDate = (e) => {
    const value = e;
    setIncidentDate(value);
    console.log("tgl kejadian >>> ", value);
  };
  const classes = useStyles();

  useEffect(() => {}, []);
  return (
    <Box className={classes.root}>
      {/* Informasi */}
      <Typography className={classes.title}>Informasi</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container alignItems="center">
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
              <Typography>SLA Approval Beban</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontWeight: 400, color: "#65D170" }}>
                {dummyData.slaApproval}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
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
                {unix(dummyData.tglPengajuan / 1000).format("DD/MM/YYYY")}
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
              <InputText
                value={valueKategori}
                onChange={(e) => {
                  setValueKategori(e.target.value);
                }}
              />
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
            <InputText
                value={valueIdMesin}
                onChange={(e) => {
                  setValueIdMesin(e.target.value);
                }}
              />
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
            {dummyData.attachment.map((item) => (
              <Grid item xs={6}>
                <MinioDocComponent filePath={`/${item.file}`} />
              </Grid>
            ))}
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
              <Typography>Diajukan Beban ke</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyData.diajukanBeban}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Informasi Vendor */}
      <Typography className={classes.title}>Informasi Vendor</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={5}>
              <Typography>No Invoice</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <InputText
                value={valueNoInvoice}
                onChange={(e) => {
                  setValueNoInvoice(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>Tgl Kirim Invoice</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {unix(dummyDataVendor.tglKirimInvoice / 1000).format(
                  "DD-MM-YYYY"
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>Upload Invoice</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <MinioDocComponent
                filePath={`/${dummyDataVendor.uploadInvoice}`}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container alignItems="center">
            <Grid item xs={5}>
              <Typography>SLA Kirim Invoice</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{
                  fontWeight: 400,
                  color: constansts.color.primaryMedium,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {dummyDataVendor.slaKirimInvoice} Days
                <ExclamationIcon style={{ size: 32, marginLeft: 10 }} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TabNonAsuransi;
