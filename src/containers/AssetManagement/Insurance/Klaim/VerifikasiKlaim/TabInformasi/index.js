import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { unix } from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ChkyButtons } from "../../../../../../components";
import InputText from "../../../../../../components/AssetManagement/inputText";
import SelectInput from "../../../../../../components/AssetManagement/SelectInput";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import constansts from "../../../../../../helpers/constants";
import { RootContext } from "../../../../../../router";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Barlow",
    backgroundColor: "#FFFFFF",
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
    color: "#BCC8E7",
    marginBottom: 20,
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
  noLed: 123345,
};

const dummyDataVendor = {
  noInvoice: 1232131,
  tglKirimInvoice: 1659314592000,
  uploadInvoice: "Invoice.jpg",
};

const TabInformasi = () => {
  const [valueNoLED, setValueNoLED] = useState(dummyData.noLed);
  const [valueKetKerugian, setValueKetKerugian] = useState(
    dummyData.ketKerugian
  );
  const valueBeban = [
    {
      name: "Pilih Ajukan Beban",
      value: "Pilih Ajukan Beban",
    },
    {
      name: "Asuransi (Internal Ops)",
      value: "insurance",
    },
    {
      name: "BU",
      value: "bu",
    },
    {
      name: "FLM TAG",
      value: "flmTag",
    },
    {
      name: "FLM Bijak",
      value: "flmBijak",
    },
    {
      name: "SLM",
      value: "slm",
    },
    {
      name: "Semua List Pilihan",
      value: "Semua List Pilihan",
    },
  ];

  const valueKategori = [
    {
      name: "Pilih Kategori",
      value: "pilihKategori",
    },
    {
      name: "Vandal",
      value: "vandal",
    },
    {
      name: "Usia Pemakaian",
      value: "usiaPemakaian",
    },
    {
      name: "Force Majeur",
      value: "forceMajeur",
    },
    {
      name: "Human Error",
      value: "humanError",
    },
  ];

  const classes = useStyles();
  const { userRoleName } = useContext(RootContext);

  useEffect(() => {}, []);
  return (
    <Box className={classes.root}>
      {/* Informasi */}
      <Typography className={classes.title}>Informasi</Typography>
      <Grid container spacing={2}>
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
          <Grid container>
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
              <Typography>Jumlah Kerugian</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {dummyData.jumlahKerugian}
              </Typography>
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
              <Typography>Kategori</Typography>
            </Grid>
            <Grid item xs={1}>
              :
            </Grid>
            <Grid item xs={6}>
              <SelectInput menuItem={valueKategori} />
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
              <Typography
                style={{ fontWeight: 600, color: constansts.color.dark }}
              >
                {unix(dummyData.tglKejadian / 1000).format("DD/MM/YYYY")}
              </Typography>
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
                <SelectInput menuItem={valueBeban} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}></Grid>

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
                <InputText
                  value={valueNoLED}
                  onChange={(e) => {
                    setValueNoLED(e.target.value);
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
        <Grid item>
          <ChkyButtons
            buttonType="redOutlined"
            style={{ textTransform: "none" }}
          >
            Cancel
          </ChkyButtons>
        </Grid>
        {userRoleName === "Admin" ? (
          <Grid item>
            <ChkyButtons style={{ textTransform: "none" }}>
              Verifikasi VM
            </ChkyButtons>
          </Grid>
        ) : (
          <Grid item>
            <ChkyButtons style={{ textTransform: "none" }}>Simpan</ChkyButtons>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TabInformasi;
