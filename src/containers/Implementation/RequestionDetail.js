import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ReactComponent as BackIcon } from "../../assets/icons/general/arrow_back_red.svg";
import {
  Grid,
  Typography,
  Button,
  Paper,
  ButtonGroup,
} from "@material-ui/core";
import constansts from "../../helpers/constants";
import { ChkyTablePagination } from "../../components/chky";
import ModalImplementaionRequestUpdate from "../../components/Modal/ImplementationRequestUpdate";
import {
  GrayUltrasoft,
  GrayMedium,
  PrimaryHard,
} from "../../assets/theme/colors";
import IconCheckGreen from "../../assets/icons/siab/check-green.svg";

const BtnGroupItem = withStyles((theme) => ({
  root: {
    textTransform: "capitalize",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "14px",
    textAlign: "center",
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

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  heading: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "24px",
    color: "#2B2F3C",
  },
  paper: {
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
    padding: "20px 20px",
  },
  buttonInGroup: {
    color: "#FFFFFF",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "14px",
    textAlign: "center",
    width: "91px",
    height: "30px",
  },
});

const RequestionDetail = ({ history }) => {
  const classes = useStyles();
  const [type, setType] = useState("Pengadaan");
  const [modalRequestionDetal, setModalRequestionDetal] = useState(false);

  const onClickType = (value) => {
    setType(value);
  };

  const handleChangePage = () => {};

  const titleTablePengadaan = [
    "Ticket",
    "ATM ID",
    "Jenis Permintaan",
    "Tgl Request",
    "Nama Vendor",
    "Nominal",
    "Tgl Pengadaan",
    "Keterangan",
    "",
  ];

  const titleTablePerbaikan = [
    "Ticket",
    "ID Mesin",
    "Jenis Permintaan",
    "Tgl Request",
    "Nama Vendor",
    "Nominal",
    "Tgl Pengadaan",
    "Keterangan",
    "",
  ];

  const titleTablePerawatan = [
    "Ticket",
    "ID Mesin",
    "Jenis Permintaan",
    "Tgl Request",
    "Nama Vendor",
    "Nominal",
    "Tgl Pengadaan",
    "Keterangan",
    "",
  ];

  const handleOpenModalReuqestionDetail = () => {
    setModalRequestionDetal(true);
    // console.log('hit detail')
    // window.location.assign('/master-data/detail');
  };

  const handleDetail = [
    { name: "Update", id: "#1025", funct: handleOpenModalReuqestionDetail },
  ];

  const valueType = [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "string",
    "modal",
  ];

  const dummyDataPengadaan = [
    {
      Ticket: "#1021928",
      atmID: "Pengadaan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Pengadaan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Pengadaan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Pengadaan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Pengadaan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
  ];

  const dummyDataPerbaikan = [
    {
      Ticket: "#1021928",
      atmID: "Perbaikan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perbaikan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perbaikan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perbaikan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perbaikan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
  ];

  const dummyDataPerawatan = [
    {
      Ticket: "#1021928",
      atmID: "Perawatan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perawatan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perawatan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perawatan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
    {
      Ticket: "#1021928",
      atmID: "Perawatan",
      JenisPermintaan: "Bangun Ruang",
      TglRequest: "10/10/2020",
      NamaVendor: "PT Jaya Abadi",
      Nominal: "Rp 3.500.000",
      TglPengadaan: "10/10/2020",
      Keterangan: "Pekerjaan telah selesai dengan aman dan lancar",
      action: handleDetail,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container direction="row" spacing={3} justify="space-between">
            <Grid item className={classes.backAction}>
              <Button onClick={() => history.goBack()}>
                <BackIcon />
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  color: "#000000",
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Target Online : 20 December 2020
              </Typography>
              <Typography
                style={{
                  color: "#BCC8E7",
                  fontFamily: "Barlow",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "10px",
                  textAlign: "right",
                }}
              >
                10 Days left
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" spacing={3} justify="space-between">
            <Grid item>
              <Typography className={classes.title}>
                Requestion Detail
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  background: "#DEFFE1",
                  border: "1px solid #65D170",
                  padding: "8px 14px",
                  color: "#65D170",
                  fontSize: "15px",
                  borderRadius: "4px",
                }}
              >
                Complete <img src={IconCheckGreen} width="20px" height="20px" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="center"
              spacing={3}
              style={{ padding: "10px 0px" }}
            >
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
                <BtnGroupItem
                  disabled={type === "Survey"}
                  onClick={() => onClickType("Survey")}
                >
                  Survey
                </BtnGroupItem>
              </ButtonGroup>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <Paper className={classes.paper}>
            <Typography className={classes.heading}>Foto Pemasangan</Typography>
            <Grid
              container
              direction="row"
              spacing={3}
              style={{ marginTop: "10px" }}
            >
              <Grid item>
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="Gambar"
                  width="160px"
                />
                <Typography
                  align="center"
                  style={{
                    paddingTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  Gambar 1
                </Typography>
              </Grid>
              <Grid item>
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="Gambar"
                  width="160px"
                />
                <Typography
                  align="center"
                  style={{
                    paddingTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  Gambar 2
                </Typography>
              </Grid>
              <Grid item>
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="Gambar"
                  width="160px"
                />
                <Typography
                  align="center"
                  style={{
                    paddingTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  Gambar 3
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid item style={{ marginTop: 20 }}>
        {type === "Pengadaan" && (
          <ChkyTablePagination
            fields={titleTablePengadaan}
            data={dummyDataPengadaan}
            cellOption={valueType}
            changePage={handleChangePage}
          />
        )}

        {type === "Perbaikan" && (
          <ChkyTablePagination
            fields={titleTablePerbaikan}
            data={dummyDataPerbaikan}
            cellOption={valueType}
            changePage={handleChangePage}
          />
        )}

        {type === "Perawatan" && (
          <ChkyTablePagination
            fields={titleTablePerawatan}
            data={dummyDataPerawatan}
            cellOption={valueType}
            changePage={handleChangePage}
          />
        )}
      </Grid>

      <ModalImplementaionRequestUpdate
        isOpen={modalRequestionDetal}
        onClose={() => setModalRequestionDetal(!modalRequestionDetal)}
      />
    </div>
  );
};

export default RequestionDetail;
