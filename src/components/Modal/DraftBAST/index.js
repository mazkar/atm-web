import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Input } from "antd";
import {
  Modal,
  Paper,
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import constants from "../../../helpers/constants";
import Logo from "../../../assets/images/SideMenu/logo_cimb.png";

const RedCheckbox = withStyles({
  root: {
    color: "#E6EAF3",
    "&$checked": {
      color: "#DC241F",
    },
  },
  checked: {},
})((props) => <Checkbox {...props} />);

const useStyles = makeStyles({
  modal: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Barlow",
  },
  paperRoot: {
    position: "absolute",
    backgroundColor: constants.color.white,
    top: 0,
    width: 720,
    height: "100%",
    borderRadius: 10,
    padding: 30,
    overflowY: "auto",
  },
  label: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 12,
    color: "#000000",
  },
  text: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    color: "#000000",
  },
  heading: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    color: "#2B2F3C",
    marginBottom: 10,
  },
  textGambar: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    color: "#2B2F3C",
    textAlign: "center",
    padding: "10px 0px",
  },
  primaryButton: {
    color: "#FFFFFF",
    backgroundColor: "#BCC8E7",
    borderRadius: 6,
    width: "100%",
    height: 40,
    fontSize: 17,
  },
  secondaryButton: {
    fontSize: 17,
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    borderRadius: 6,
    fontWeight: 600,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
  },
  circleBlue: {
    marginRight: 3,
    background: "#88ADFF",
    padding: "5px 7px",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFf",
    borderRadius: "50%",
  },
  circleYellow: {
    marginRight: 3,
    background: "#FFB443",
    padding: "5px 7px",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFf",
    borderRadius: "50%",
  },
  circlePurple: {
    marginRight: 3,
    background: "#E8A7FF",
    padding: "5px 7px",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFf",
    borderRadius: "50%",
  },
  input: {
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    width: "100%",
    height: 40,
  },
  textCheckbox: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    color: "#000000",
  },
});

const DraftBAST = ({ isOpen, onClose }) => {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <Paper className={classes.paperRoot}>
        <Grid item style={{ padding: "0px 13px", marginBottom: "35px" }}>
          <Grid item style={{ marginBottom: 15 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Grid item style={{ marginBottom: 40 }}>
                  <img style={{ width: "140px" }} src={Logo} alt="logo" />
                </Grid>
                <Grid item style={{ marginBottom: 20 }}>
                  <Typography className={classes.text}>
                    No. /SRT/ATM-BG/VIII/2020
                  </Typography>
                  <Typography className={classes.text}>
                    Tanggerang, 18 Agustus 2020
                  </Typography>
                </Grid>
                <Grid item style={{ marginBottom: 20 }}>
                  <Typography className={classes.text}>Kepada Yth :</Typography>
                  <Typography className={classes.text}>
                    Bapak/Ibu <b>[Username]</b>
                  </Typography>
                  <Typography className={classes.text}>
                    Pemilik Lokasi Pengelola <b>[Nama Lokasi]</b>
                  </Typography>
                </Grid>
                <Grid item style={{ marginBottom: 20 }}>
                  <Typography className={classes.text}>
                    Perihal: <b>Berita Acara Serah Terima</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: 13 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography className={classes.label}>ID ATM :</Typography>
                    <Typography className={classes.text}>1101</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className={classes.label}>Lokasi :</Typography>
                    <Typography className={classes.text}>
                      CIMBN.JKT.Meruya
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className={classes.label}>
                      Latitude :
                    </Typography>
                    <Typography className={classes.text}>1220019281</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className={classes.label}>
                      Longitude :
                    </Typography>
                    <Typography className={classes.text}>1220019281</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className={classes.label}>Area :</Typography>
                    <Typography className={classes.text}>Jakarta</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography className={classes.label}>Kota :</Typography>
                    <Typography className={classes.text}>
                      Jakarta Selatan
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.label}>Alamat :</Typography>
                    <Typography className={classes.text}>
                      Jl. wahid Hasyim, no.24, Kec, Mampang, Kab. Mampang,
                      Jakarta Selatan
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginBottom: 25 }}>
            <Typography className={classes.heading}>Mover</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Merk Mesin
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Hitachi" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Type Mesin
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="7700" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Merk UPS
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="120199281" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Jumlah Catridge
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="12" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Titik Dynabolt
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Dynabolt" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Fascia Atas
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Ada" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Serah Terima ke FLM
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Done" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Nama PIC
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Suwandi" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          SN Mesin
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="120199281" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          SN UPS
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="120199281" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Jumlah Reject
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="12" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Tombak
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Ada" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Kunci Fascia Bawah
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Ada" />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          No Telp PIC
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="08102928187" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginBottom: 25 }}>
            <Typography className={classes.heading}>SLM</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Pengukuran Voltage
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Done" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Status Online
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Online" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Nama PIC
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Suwandi" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Pengukuran Grounding
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Done" />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          No Telp PIC
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="08102928187" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginBottom: 25 }}>
            <Typography className={classes.heading}>FLM</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Cek Transaksi Saldo
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Done" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          Nama PIC
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="Suwandi" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: "33px 0px" }}
                  ></Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <RedCheckbox
                          checked={true}
                          name="nsjxnjs"
                          color="default"
                        />
                      }
                      label={
                        <Typography className={classes.textCheckbox}>
                          No Telp PIC
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input className={classes.input} value="08102928187" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ padding: "0px 50px", marginBottom: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="Gambar"
                  width="120px"
                  height="100px"
                />
                <Typography className={classes.textGambar}>
                  Foto Dynabolt
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="Gambar"
                  width="120px"
                  height="100px"
                />
                <Typography className={classes.textGambar}>
                  Foto Mesin Online
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="Gambar"
                  width="120px"
                  height="100px"
                />
                <Typography className={classes.textGambar}>
                  Foto Kabel
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <img
                  src="https://source.unsplash.com/user/erondu/1600x900"
                  alt="Gambar"
                  width="120px"
                  height="100px"
                />
                <Typography className={classes.textGambar}>
                  Foto Keseluruhan
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginBottom: 10 }}>
            <Grid item style={{ marginBottom: 10 }}>
              <Typography className={classes.text}>
                Demikian kami sampaikan atas perhatian dan kerjasamanya kami
                ucapkan terimakasih.
              </Typography>
            </Grid>

            <Grid item style={{ marginBottom: 10 }}>
              <Typography className={classes.heading}>Validate By</Typography>
              <Grid container>
                <Typography className={classes.circleBlue}>DH</Typography>
                <Typography className={classes.circleYellow}>TS</Typography>
                <Typography className={classes.circlePurple}>HM</Typography>
              </Grid>
            </Grid>

            <Grid item style={{ marginBottom: 10 }}>
              <Typography className={classes.text}>
                menunggu user role tertentu untuk validasi
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            justify="space-between"
            //   className={classes.buttonContainer}
          >
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
                //   onClick={handleSend}
                style={{ textTransform: "capitalize" }}
              >
                Export to PDF
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default DraftBAST;
