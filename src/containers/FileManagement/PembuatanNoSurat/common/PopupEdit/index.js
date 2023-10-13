import {
  Box,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import { ReactComponent as XIcon } from "../../../../../assets/icons/duotone-red/x.svg";
import React, { useEffect, useState } from "react";
import { ChkyButtons } from "../../../../../components";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFFFFF",
    width: "720px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: 30,
    borderRadius: 10,
  },
  upperContainer: {
    width: "100%",
  },
  exitContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
  },
  exitButton: {
    cursor: "pointer",
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: 500,
    lineHeight: "43.2px",
    marginBottom: 50,
  },
  buttonsContainer: {
    padding: "0 30px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontWeight: 400,
    fontSize: 13,
    color: "#2B2F3C",
    marginBottom: 5,
  },
  input: {
    fontFamily: "Barlow",
    fontStyle: "italic",
    fontSize: 13,
    width: "100%",
    border: "1px solid #BCC8E7",
    borderRadius: "8px",
    padding: "15px 12px",
  },
});

const PopupEdit = (props) => {
  const { open, data, selectedId, onSubmit, onClose } = props;
  const classes = useStyles();
  const [letterType, setLetterType] = useState("");
  const [letterCode, setLetterCode] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");

  const handlerSubmit = () => {
    if (
      letterType == "" ||
      letterCode == "" ||
      month == "" ||
      year == "" ||
      category == ""
    ) {
      alert("Pastikan Anda Mengisi Semua Input!");
    } else {
      const requestData = {
        id: selectedId,
        letterType,
        letterCode,
        month,
        year,
        category,
      };
      onSubmit(requestData);
    }
  };

  useEffect(() => {
    if (selectedId != "") {
      const selectedIndex = data.findIndex((item) => item.id == selectedId);

      setLetterType(data[selectedIndex].letterType);
      setLetterCode(data[selectedIndex].letterCode);
      setMonth(data[selectedIndex].month);
      setYear(data[selectedIndex].year);
      setCategory(data[selectedIndex].category);
    }
  }, [selectedId]);

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.upperContainer}>
          <Box className={classes.exitContainer}>
            <IconButton onClick={onClose}>
              <XIcon style={{ width: 24 }} />
            </IconButton>
          </Box>
          <Typography className={classes.title}>Edit Surat</Typography>
          <Box style={{ padding: "0 30px", marginBottom: 80 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography className={classes.label}>Jenis Surat :</Typography>
                <InputBase
                  onChange={(e) => setLetterType(e.target.value)}
                  className={classes.input}
                  placeholder="Masukan jenis surat"
                  value={letterType}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.label}>Kode Surat :</Typography>
                <InputBase
                  onChange={(e) => setLetterCode(e.target.value)}
                  className={classes.input}
                  placeholder="Masukan kode surat"
                  value={letterCode}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.label}>
                  Bulan ( Dalam Angka ) :
                </Typography>
                <InputBase
                  onChange={(e) => setMonth(e.target.value)}
                  className={classes.input}
                  placeholder="Masukan bulan"
                  value={month}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.label}>Tahun :</Typography>
                <InputBase
                  onChange={(e) => setYear(e.target.value)}
                  className={classes.input}
                  placeholder="Masukan tahun"
                  value={year}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.label}>Kategori :</Typography>
                <InputBase
                  onChange={(e) => setCategory(e.target.value)}
                  className={classes.input}
                  placeholder="Masukan kategori"
                  value={category}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className={classes.buttonsContainer}>
          <ChkyButtons
            style={{ textTransform: "none" }}
            buttonType="redOutlined"
            onClick={onClose}
          >
            Cancel
          </ChkyButtons>
          <ChkyButtons
            onClick={handlerSubmit}
            style={{ textTransform: "none" }}
          >
            Submit
          </ChkyButtons>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupEdit;
