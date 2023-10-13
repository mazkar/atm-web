import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as DropDownIcon } from "../../../../../../assets/icons/linear-red/chevron-down.svg";
import { ReactComponent as DropDownGrayIcon } from "../../../../../../assets/icons/duotone-gray/chevron-down-gray.svg";
import { ReactComponent as SyncGreenIcon } from "../../../../../../assets/icons/siab/sync-green.svg";
import { ReactComponent as SyncRedIcon } from "../../../../../../assets/icons/siab/sync-red.svg";
import FotoSesudah1 from "../../../../../../assets/images/Foto-ATM-sesudah-1.png";
import FotoSesudah2 from "../../../../../../assets/images/Foto-ATM-sesudah-2.png";
import FotoSesudah3 from "../../../../../../assets/images/Foto-ATM-sesudah-3.png";
import FotoSesudah4 from "../../../../../../assets/images/Foto-ATM-sesudah-4.png";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";

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
    padding: "16px 12px",
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      border: `1px solid ${constansts.color.primaryMedium}`,
      backgroundColor: constansts.color.white,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
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

const DetailTabUPS = () => {
  const [disableUPS, setDisableUPS] = useState(true);
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <Typography className={classes.detailTitle}>
              Informasi Mesin
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* Nama Request */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      User Request
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> Ramlan
                    </Typography>
                  </Grid>

                  {/* Jenis Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Jenis UPS
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> UPS Lama
                    </Typography>
                  </Grid>

                  {/* Tgl Kirim/Tarik */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Tgl Kirim / Tarik
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 12/11/2020
                    </Typography>
                  </Grid>

                  {/* ID Location */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      ID Location
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 1123
                    </Typography>
                  </Grid>

                  {/* Nama Lokasi */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Nama Lokasi
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> JKT. SPBU
                      CIPAYUNG
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* ID Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      ID Mesin
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> A0002
                    </Typography>
                  </Grid>

                  {/* SN Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      SN Mesin
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> SN23132
                    </Typography>
                  </Grid>

                  {/* SN UPS */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      SN UPS
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> SN23132
                    </Typography>
                  </Grid>

                  {/* Tahun Pembelian */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      SN DVR
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 2021
                    </Typography>
                  </Grid>
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
            <Grid container>
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
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {/* User Control */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      ID Mesin
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> 1123
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                marginTop: 15,
              }}
            >
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
                    defaultValue="Pilih Kondisi"
                  >
                    <MenuItem value="Pilih Kondisi">Pilih Kondisi</MenuItem>
                    <MenuItem value="Baik">Baik</MenuItem>
                    <MenuItem value="Rusak">Rusak</MenuItem>
                  </Select>
                </FormControl>
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
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailTabUPS;
