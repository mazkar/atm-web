import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
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
}));

const index = () => {
  const classes = useStyles();
  function handleChangePage(e) {
    console.log(e);
  }
  return (
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
            Kesiapan Perangkat Keamanan
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
            />
          </div>
        </Grid>
      </Grid>
      <div style={{ marginBottom: 20 }}>
        <Grid container spacing={2}>
          {cards.map(({ title }, i) => {
            return (
              <Grid item xs={2} key={i}>
                <CustomCard title={title} value="4.210" />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Gallery title="Foto Pemasangan" images={fotos} />
      <div style={{ marginTop: 20 }}>
        <TablePagination
          fields={titleTable}
          cellOption={valueType}
          data={dataTable}
          totalPages={1}
          totalRows={10}
          changePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default index;

const cards = [
  {
    title: "DVR",
  },
  {
    title: "Pin Cover",
  },
  {
    title: "Plat Anti Maling",
  },
  {
    title: "Card Bin",
  },
  {
    title: "Alarm System",
  },
  {
    title: "Others",
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
  "ID ATM",
  "Lokasi",
  "FLM",
  "SLM",
  "Perangkat Keamanan",
  "Nama Vendor",
  "Tgl Pasang",
  "Tgl Cabut",
  "Keterangan",
  "",
];

const types = [];
for (let i = 0; i < 9; i++) {
  types.push("string");
}
const valueType = [...types, "menu"];

const Update = () => (
  // <Typography
  //   style={{ fontSize: "13px", lineHeight: "16px", color: PrimaryHard }}
  // >
  //   Update
  // </Typography>
  <MoreHorizIcon style={{ color: PrimaryHard }} />
);

const action = [
  {
    name: "Edit",
    type: "edit",
    action: (x) => {
      console.log("edit");
    },
  },
  {
    name: "Delete",
    type: "delete",
    action: (x) => {
      console.log("delete");
    },
  },
];

const defaultData = {
  id: "#1101",
  lokasi: "Surabaya",
  flm: "FLM",
  slm: "SLM",
  perangkat: "DVR",
  vendorName: "PT. Maju Abadi",
  tglPasang: "10/10/2020",
  tglCabut: "10/10/2020",
  keterangan: "Perangkat terpasang dengan baik dan lancar",
  action,
  // update: <Update />,
};

const perangkats = [
  "DVR",
  "Pin Cover",
  "Plat Anti Skimming",
  "Card Bin",
  "Alarm System",
  "Others",
];

const dataTable = perangkats.map((val) => ({ ...defaultData, perangkat: val }));
