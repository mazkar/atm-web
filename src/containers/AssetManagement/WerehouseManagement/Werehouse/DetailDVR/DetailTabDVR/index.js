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
import React, { useEffect, useState } from "react";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as DropDownIcon } from "../../../../../../assets/icons/linear-red/chevron-down.svg";
import { ReactComponent as DropDownGrayIcon } from "../../../../../../assets/icons/duotone-gray/chevron-down-gray.svg";
import { ReactComponent as SyncGreenIcon } from "../../../../../../assets/icons/siab/sync-green.svg";
import { ReactComponent as SyncRedIcon } from "../../../../../../assets/icons/siab/sync-red.svg";
import MinioDocComponent from "../../../../../../components/MinioDocComponent";
import MinioImageComponent from "../../../../../../components/MinioImageComponent";
import { getDetailDvr } from "../servicesDvr";

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

const DetailTabDVR = () => {
  const [disableDVR, setDisableDVR] = useState(true);
  const [userRequest, setRequest] = useState("");
  const [jenisDvr, setjenisDvr] = useState("");
  const [tglKirimTarik, setTglKirimTarik] = useState("");
  const [idLocation, setIdLocation] = useState("");
  const [namaLokasi, setNamaLokasi] = useState("");
  const [idMesin, setIdMesin] = useState("");
  const [snMesin, setSnMesin] = useState("");
  const [snDvr, setSnDvr] = useState("");
  const [tahunPembelian, setTahunPembelian] = useState("");
  const [noAktivitas, setNoAktivitas] = useState("");
  const [noAssetGudang, setNoAssetGudang] = useState("");
  const [idMesinGudang, setIdMesinGudang] = useState("");
  const [listGambar, setListGambar] = useState([]);
  const [listDocument, setListDocument] = useState([]);
  const classes = useStyles();
  // hardcode karna data masi kosong
  function detailDvr() {
    getDetailDvr(`detailDvr?id=3`).then((res) => {
      var tempList = [];
      tempList = res.data;
      console.log("Detail Dvr => ", tempList);
      setRequest(tempList.userRequest);
      setjenisDvr(tempList.dvrType);
      setTglKirimTarik(tempList.pmDate);
      setIdLocation(tempList.idLocation);
      setNamaLokasi(tempList.locationName);
      setIdMesin(tempList.idMachine);
      setSnMesin(tempList.snMachine);
      setSnDvr(tempList.snDvr);
      setTahunPembelian(tempList.purchaseYear);
      setNoAktivitas(tempList.activityNumber);
      setNoAssetGudang(tempList.warehouseAssetNumber);
      setIdMesinGudang(tempList.idMesin);
      setListGambar(tempList.vendorPhoto);
      setListDocument(tempList.vendorAttachment);
    });
  }

  useEffect(() => {
    detailDvr();
  }, []);

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
                      <span className={classes.detailInfo}>:</span>
                      {userRequest}
                    </Typography>
                  </Grid>

                  {/* Jenis Mesin */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Jenis DVR
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> {jenisDvr}
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
                      <span className={classes.detailInfo}>:</span>{" "}
                      {tglKirimTarik}
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
                      <span className={classes.detailInfo}>:</span> {idLocation}
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
                      <span className={classes.detailInfo}>:</span> {namaLokasi}
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
                      <span className={classes.detailInfo}>:</span> {idMesin}
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
                      <span className={classes.detailInfo}>:</span> {snMesin}
                    </Typography>
                  </Grid>

                  {/* SN DVR */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      SN DVR
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span> {snDvr}
                    </Typography>
                  </Grid>

                  {/* Tahun Pembelian */}
                  <Grid item xs={5}>
                    <Typography className={classes.detailInfo}>
                      Tahun Pembelian
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.detailValue}>
                      <span className={classes.detailInfo}>:</span>{" "}
                      {tahunPembelian}
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
                      <span className={classes.detailInfo}>:</span>{" "}
                      {noAktivitas}
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
                      <span className={classes.detailInfo}>:</span>{" "}
                      {noAssetGudang}
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
                      <span className={classes.detailInfo}>:</span>{" "}
                      {idMesinGudang}
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
                {listGambar.map((img) => (
                  <Grid>
                    <MinioImageComponent
                      style={{
                        borderRadius: 8,
                        width: 115,
                        height: 80,
                        marginRight: 20,
                      }}
                      filePath={img}
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
                {listDocument.map((item) => (
                  <Grid item>
                    <MinioDocComponent filePath={item.pathFile} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailTabDVR;
