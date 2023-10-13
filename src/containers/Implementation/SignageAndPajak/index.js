import React, { useState } from "react";
import { Radio } from "antd";
import { Typography, Grid, Button } from "@material-ui/core";
import {
  Dark,
  GrayMedium,
  GrayUltrasoft,
  InfoMedium,
  InfoSoft,
  PrimaryHard,
} from "../../../assets/theme/colors";
import { Link } from "react-router-dom";
import arrowBackPng from "../../../assets/icons/siab/arrow-left.png";
import { ReactComponent as ReloadIcon } from "../../../assets/icons/duotone-others/progression-blue.svg";
import { makeStyles } from "@material-ui/styles";
import CustomCard from "../ComponentsOwn/CustomCard";
import Gallery from "../ComponentsOwn/Gallery";
import ModalSignage from "../ComponentsOwn/ModalSignage";
import TablePagination from "../../../components/chky/ChkyTablePagination";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as PlusWhite } from "../../../assets/icons/siab/plus-white.svg";

const useStyles = makeStyles(() => ({
  btn: {
    padding: "8px 14px",
    background: InfoSoft,
    border: `1px solid ${InfoMedium}`,
    borderRadius: "4px",
  },
  btnLabel: {
    fontWeight: "600",
    fontSize: "15px",
    lineHeight: "18px",
    color: InfoMedium,
    textTransform: "capitalize",
  },
  radioGroup: {
    "& .ant-radio-button-wrapper": {
      color: GrayMedium,
      backgroundColor: GrayUltrasoft,
      borderColor: GrayUltrasoft,
      "&:first-child": {
        borderRadius: "8px 0 0 8px",
      },
      "&:last-child": {
        borderRadius: "0 8px 8px 0",
      },
      "&:not(:first-child)::before": {
        width: 0,
      },
      "&>span": {
        fontFamily: "Barlow",
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "14px",
      },
    },
  },
}));

const index = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState("a");
  const [isOpenModal, setIsOpenModal] = useState(false);
  function handleChangePage(e) {
    console.log(e);
  }
  function onChangeRadio(e) {
    setTabValue(e.target.value);
  }
  function closeModal() {
    setIsOpenModal(false);
  }

  const action = [
    {
      name: "Edit",
      type: "edit",
      action: (x) => {
        setIsOpenModal(true);
      },
    },
    {
      name: "Delete",
      type: "delete",
      action: (x) => {
        window.alert("Delete action");
      },
    },
  ];

  const valueType = tabValue === "a" ? valueType1 : valueType2;

  const dataTable = [
    {
      tglOrder: "10/10/2020",
      type: "Flag Mounted",
      ukuran: "2 x 3 x 5",
      vendorName: "PT. Maju Abadi",
      snSignage: "102991282",
      tglPasang: "10/10/2020",
      objekKenaPajak: "Ya",
      keterangan: "Perangkat terpasang dengan baik dan lancar",
      action,
    },
    {
      tglOrder: "10/10/2020",
      type: "Neon Box",
      ukuran: "2 x 3 x 5",
      vendorName: "PT. Maju Abadi",
      snSignage: "102991282",
      tglPasang: "10/10/2020",
      objekKenaPajak: "Tidak",
      keterangan: "Perangkat terpasang dengan baik dan lancar",
      action,
    },
    {
      tglOrder: "10/10/2020",
      type: "Sticker Kaca",
      ukuran: "2 x 3 x 5",
      vendorName: "PT. Maju Abadi",
      snSignage: "102991282",
      tglPasang: "10/10/2020",
      objekKenaPajak: "Tidak Bisa Di Proses",
      keterangan: "Perangkat terpasang dengan baik dan lancar",
      action,
    },
  ];

  const default2 = {
    atmId: "1101",
    type: "Flag Mounted",
    tglOrder: "10/10/2020",
    jenisOrder: "Pengurusan Baru",
    tahunPajak: "2020",
    vendorName: "PT. Jaya Abadi",
    surveyLokasi: "10/10/2020",
    daftarUppd: "10/10/2020",
    cetakSkpd: "10/10/2020",
    tglPerpanjangan: "10/10/2020",
    nominal: "Rp 300.000",
    action,
  };

  const dataTable2 = [];

  for (let i = 0; i < 5; i++) {
    const jenisOrder =
      i < 2 ? "Pengurusan Baru" : i < 4 ? "Perpanjangan" : "Cabut Pajak";
    const type = i < 3 ? dataTable[0].type : dataTable[i - 2].type;
    dataTable2.push({ ...default2, type, jenisOrder });
  }

  return (
    <>
      <div style={{ backgroundColor: GrayUltrasoft, padding: "20px 30px" }}>
        <Grid container style={{ marginBottom: 24 }}>
          <Grid item xs={6}>
            <div>
              <Link
                to="/implementation"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 26,
                }}
              >
                <img src={arrowBackPng} alt="" />
                <Typography
                  style={{
                    fontWeight: 500,
                    fontSize: "17px",
                    lineHeight: "20px",
                    color: PrimaryHard,
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                >
                  Back
                </Typography>
              </Link>
            </div>
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "36px",
                lineHeight: "43px",
                color: Dark,
                textShadow: "0px 6px 10px rgba(0, 0, 0, 0.08)",
              }}
            >
              Signage &amp; Pajak
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "16px",
                marginBottom: 4,
              }}
            >
              Target Online : 20 December 2020
            </Typography>
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "10px",
                lineHeight: "12px",
                color: GrayMedium,
                marginBottom: 20,
              }}
            >
              10 Days left
            </Typography>
            <div style={{ marginBottom: 25 }}>
              <Button
                classes={{ root: classes.btn, label: classes.btnLabel }}
                variant="outlined"
                endIcon={<ReloadIcon />}
              >
                Incomplete
              </Button>
            </div>
            <div>
              <MuiIconLabelButton
                style={{ width: 120, height: 40 }}
                label="Add New"
                iconPosition="startIcon"
                buttonIcon={<PlusWhite />}
                onClick={() => setIsOpenModal(true)}
              />
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            padding: 20,
            textAlign: "center",
            background: "#FFFFFF",
            boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
            borderRadius: "10px",
            marginBottom: 20,
          }}
        >
          <Radio.Group
            onChange={onChangeRadio}
            buttonStyle="solid"
            value={tabValue}
            className={classes.radioGroup}
          >
            <Radio.Button value="a">
              Pemasangan Signage &amp; Sticker
            </Radio.Button>
            <Radio.Button value="b">Pengurus Pajak Media Promosi</Radio.Button>
            <Radio.Button value="c">
              Pencabutan Signage &amp; Sticker
            </Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Grid container spacing={2}>
            {(tabValue === "a" ? cards : cards2).map(({ title }, i) => {
              return (
                <Grid item xs={3} key={i}>
                  <CustomCard title={title} value="4.210" />
                </Grid>
              );
            })}
          </Grid>
        </div>
        {tabValue === "a" ? (
          <Gallery title="Foto Pemasangan" images={fotos} />
        ) : (
          <div style={{ marginBottom: 20 }}>
            <Grid container spacing={2}>
              {cards3.map(({ title }, i) => {
                return (
                  <Grid item xs={3} key={i}>
                    <CustomCard title={title} value="4.210" />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
        <div>
          <TablePagination
            fields={tabValue === "a" ? titleTable : titleTable2}
            cellOption={valueType}
            data={tabValue === "a" ? dataTable : dataTable2}
            totalPages={1}
            totalRows={10}
            changePage={handleChangePage}
          />
        </div>
      </div>
      <ModalSignage open={isOpenModal} onClose={closeModal} />
    </>
  );
};

export default index;

const cards = [
  {
    title: "Total Lokasi",
  },
  {
    title: "Total FM",
  },
  {
    title: "Total Neon Box",
  },
  {
    title: "Total Sticker Kaca",
  },
];

const cards2 = [
  {
    title: "Lokasi Kena Pajak",
  },
  {
    title: "Lokasi Tidak Kena Pajak",
  },
  {
    title: "Lokasi Tidak Bisa Proses",
  },
  {
    title: "Objek Kena Pajak",
  },
];

const cards3 = [
  {
    title: "Status Survey Lokasi",
  },
  {
    title: "Status Cetak SKPD",
  },
  {
    title: "Status Daftar UPPD",
  },
  {
    title: "Tanggal Pembayaran",
  },
];

const fotos = [
  {
    url: "https://picsum.photos/id/1/5616/3744",
    caption: "Layout Penempatan Mesin Panjang",
  },
  {
    url: "https://picsum.photos/id/10/2500/1667",
    caption: "Titip Penempatan VSAT",
  },
  {
    url: "https://picsum.photos/id/1000/5626/3635",
    caption: "Penempatan Flag Mounted",
  },
  {
    url: "https://picsum.photos/id/1001/5616/3744",
    caption: "Penempatan Sticker Kaca",
  },
  {
    url: "https://picsum.photos/id/1002/4312/2868",
    caption: "Penempatan Sticker Kaca",
  },
];

const titleTable = [
  "Tgl Order",
  "Type Signage",
  "Ukuran Signage",
  "Nama Vendor",
  "SN Signage",
  "Tgl Instalasi",
  "Objek Kena Pajak",
  "Keterangan",
  "",
];

const titleTable2 = [
  "ID ATM",
  "Type Signage",
  "Tgl Order",
  "Jenis Order",
  "Th Pajak",
  "Nama Vendor",
  "Survey Lokasi",
  "Daftar UPPD",
  "Cetak SKPD",
  "Tgl  Perpanjangan",
  "Nominal",
  "",
];

const valueType1 = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "menu",
];

const valueType2 = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "menu",
];
