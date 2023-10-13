/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  InputBase,
} from "@material-ui/core";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import constants from "../../../../../helpers/constants";
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import AddIcon from "@material-ui/icons/Add";
import InputField from "../../common/InputField";
import { Input } from "antd";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import FormattedNumber, { TextRupiah } from "../../common/FormattedNumber";
import ModalLoader from "../../../../../components/ModalLoader";
import { doUploadPhoto } from "../../../../Implementation/ApiServiceImplementation";

const SmallInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    borderRadius: 6,
    position: "relative",
    backgroundColor: (props) => props.backgroundColor, //theme.palette.common.white,
    fontSize: 15,
    width: "100%",
    height: "23px",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);

const SmallInputFocusRed = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
    padding: 0,
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.common.white,
    fontSize: 15,
    width: "100%",
    height: "23px",
    padding: "7px 9px",
    border: "1px solid #BCC8E7",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: PrimaryHard,
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  rootPaper: {
    width: "100%",
    minHeight: "550px",
    height: "100%",
    borderRadius: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    marginBottom: 50,
  },
  buttonIcon: {
    marginBottom: 20,
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
  boxStyle: {
    marginTop: "-30px",
    padding: "0px 15px",
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: "125%",
      left: -37,
      backgroundColor: "#fff",
      top: -100,
      zIndex: 1,
    },
    height: "370px",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: "max-content",
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: "max-content",
    height: 40,
  },
});

const initialRow = {
  id: null,
  quantity: 0,
  price: 0,
  nama: "",
  unit: "",
};

const BottomComponent = ({
  onSubmit,
  onFinishUploadHeader,
  onFinishUploadFooter,
  onViewSurat,
  content,
  setData,
  onChangeTotal,
  typeSurat,
  onViewNotEditSurat,
}) => {
  const classes = useStyles();
  const [isModalLoaderOpen, setIsModalLoaderOpen] = useState(false);
//  const [typeSurat,setTypeSurat]=useState("");

  const { biayaBarang = [], biayaService = [], ppn, approvalStatus } = content;

  const addFieldsJasa = () => {
    updateData([...biayaService, initialRow], "biayaService");
  };

  const addFieldsBarang = () => {
    updateData([...biayaBarang, initialRow], "biayaBarang");
  };

  function handleChangePrice(obj) {
    const { type, index, name, value } = obj;
    const oldArr = type === "barang" ? [...biayaBarang] : [...biayaService];
    const newArr = oldArr.map((el, i) => {
      return i === index ? { ...el, [name]: value } : el;
    });
    updateData(newArr, type === "barang" ? "biayaBarang" : "biayaService");
  }

  function updateData(value, name) {
    setData((old) => ({ ...old, [name]: value }));
  }

  async function handleFileHeader(e) {
    // console.log('~ e.target.files', e.target.files);
    // setFileKop(e.target.files[0]);
    setIsModalLoaderOpen(true);
    try {
      const resFile = await doUploadPhoto(e.target.files[0]);
      setIsModalLoaderOpen(false);
      alert("Upload image success.");
      onFinishUploadHeader(resFile.data);
      console.log("~ resFile?.data", resFile?.data);
    } catch (e) {
      console.log("~ e", e);
      setIsModalLoaderOpen(false);
      alert("Error upload image");
    }
  }
  async function handleFileFooter(e) {
    setIsModalLoaderOpen(true);
    try {
      const resFilefooter = await doUploadPhoto(e.target.files[0]);
      setIsModalLoaderOpen(false);
      alert("Upload image success.");
      onFinishUploadFooter(resFilefooter.data);
      console.log("~ resFilefooter?.data", resFilefooter?.data);
    } catch (e) {
      console.log("~ e", e);
      setIsModalLoaderOpen(false);
      alert("Error upload image");
    }
  }
  const handleType = ()=>{
    onViewSurat(true);
    typeSurat("view");
  };
  const handleTypeEdit = () => {
    onViewSurat(true);
    typeSurat("edit");
  };

  const totalHargaBarang = biayaBarang.reduce((prev, cur) => {
    return cur.quantity != null && cur.price != null
      ? prev + cur.quantity * cur.price
      : prev;
  }, 0);

  const totalHargaJasa = biayaService.reduce((prev, cur) => {
    return cur.quantity != null && cur.price != null
      ? prev + cur.quantity * cur.price
      : prev;
  }, 0);

  const subTotal = totalHargaBarang + totalHargaJasa;

  const total = subTotal * (1 + ppn * 0.01);

  useEffect(() => {
    onChangeTotal(subTotal);
  }, [subTotal]);

  return (
    <div>
      <Paper className={classes.rootPaper}>
        <Grid
          container
          direction="column"
          style={{ padding: 20, width: "100%" }}
        >
          <Grid item>
            <Grid container direction="row" justify="space-between">
              <Grid item xs={6}>
                <Typography
                  style={{ fontWeight: 500, color: "#2B2F3C", paddingTop: 15 }}
                >
                  Rincian Biaya Jasa
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <div className={classes.buttonIcon}>
                  <MuiIconLabelButton
                    label="Tambah Field Biaya Jasa"
                    iconPosition="endIcon"
                    onClick={addFieldsJasa}
                    buttonIcon={<AddIcon />}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Box className={classes.boxStyle}>
              {biayaService.map((data, i) => (
                <div key={i}>
                  <InputField
                    data={data}
                    index={i}
                    handleChange={handleChangePrice}
                    type="jasa"
                  />
                </div>
              ))}
              <Grid
                item
                style={{ textAlign: "right", marginTop: 20, paddingBottom: 25 }}
              >
                <Input.Group
                  compact
                  style={{ width: "100%", paddingRight: 15 }}
                >
                  <Typography
                    style={{ fontWeight: 600, marginRight: 32, paddingTop: 5 }}
                  >
                    Total Biaya Jasa
                  </Typography>
                  <SmallInput style={{ width: "4%" }} value="Rp" disabled />
                  <FormattedNumber
                    customInput={SmallInputFocusRed}
                    style={{ width: "19%" }}
                    value={totalHargaJasa}
                    disabled
                  />
                </Input.Group>
              </Grid>
            </Box>
          </Grid>

          <Grid item style={{ marginTop: 35 }}>
            <Grid container direction="row" justify="space-between">
              <Grid item xs={6}>
                <Typography
                  style={{ fontWeight: 500, color: "#2B2F3C", paddingTop: 15 }}
                >
                  Rincian Biaya Barang
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <div className={classes.buttonIcon}>
                  <MuiIconLabelButton
                    label="Tambah Field Biaya Barang"
                    iconPosition="endIcon"
                    onClick={addFieldsBarang}
                    buttonIcon={<AddIcon />}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Box className={classes.boxStyle}>
              {biayaBarang.map((data, i) => (
                <div key={i}>
                  <InputField
                    data={data}
                    index={i}
                    handleChange={handleChangePrice}
                    type="barang"
                  />
                </div>
              ))}
              <Grid
                item
                style={{ textAlign: "right", marginTop: 20, paddingBottom: 25 }}
              >
                <Input.Group
                  compact
                  style={{ width: "100%", paddingRight: 15 }}
                >
                  <Typography
                    style={{ fontWeight: 600, marginRight: 32, paddingTop: 5 }}
                  >
                    Total Biaya Barang
                  </Typography>
                  <SmallInput style={{ width: "4%" }} value="Rp" disabled />
                  <FormattedNumber
                    customInput={SmallInputFocusRed}
                    style={{ width: "19%" }}
                    value={totalHargaBarang}
                    disabled
                  />
                </Input.Group>
              </Grid>
            </Box>
          </Grid>

          <Grid item style={{ marginTop: 25 }}>
            <Grid container direction="row">
              <Grid item xs={5} />
              <Grid item xs={7}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={5} style={{ textAlign: "right" }}>
                        <Typography>Total Biaya :</Typography>
                      </Grid>
                      <Grid item xs={2} />
                      <Grid
                        item
                        xs={5}
                        style={{ textAlign: "right", paddingRight: 35 }}
                      >
                        <Typography style={{ fontWeight: 600 }}>
                          <TextRupiah value={subTotal} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item style={{ marginTop: 20 }}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={5} style={{ textAlign: "right" }}>
                        <Typography>PPN :</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Grid container direction="row" spacing={2}>
                          <Grid item xs={8}>
                            <FormattedNumber
                              customInput={SmallInput}
                              placeholder="Masukkan PPN"
                              value={ppn}
                              onValueChange={(x) =>
                                updateData(x.floatValue, "ppn")
                              }
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              style={{ fontWeight: 600, paddingTop: 5 }}
                            >
                              %
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        style={{ textAlign: "right", paddingRight: 35 }}
                      >
                        <Typography style={{ fontWeight: 600 }}>
                          <TextRupiah value={(ppn / 100) * subTotal} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item style={{ marginTop: 20 }}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={5} style={{ textAlign: "right" }}>
                        <Typography>Total Biaya +PPN :</Typography>
                      </Grid>
                      <Grid item xs={2} />
                      <Grid
                        item
                        xs={5}
                        style={{ textAlign: "right", paddingRight: 35 }}
                      >
                        <Typography style={{ fontWeight: 600 }}>
                          <TextRupiah value={total} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: 20, marginBottom: 100 }}>
            <Grid container style={{ marginTop: 20 }} justify="space-between">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  spacing={4}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.secondaryButton}
                      onClick={handleTypeEdit}
                      style={{ textTransform: "capitalize" }}
                    >
                      Edit Surat
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      disableElevation
                      className={classes.secondaryButton}
                      onClick={handleType}
                      style={{ textTransform: "capitalize" }}
                    >
                      View Surat
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.primaryButton}
                  onClick={() => onSubmit()}
                  style={{ textTransform: "capitalize" }}
                  disabled={approvalStatus > 0}
                >
                  Submit Penawaran
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <ModalLoader isOpen={isModalLoaderOpen} />

    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation("translations")(BottomComponent))
);
