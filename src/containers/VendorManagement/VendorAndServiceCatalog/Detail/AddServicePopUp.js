import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import {
  Dialog,
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { PrimaryHard } from "../../../../assets/theme/colors";
import LabelTextField from "../../../../components/Form/LabelTextField";
import { addNewCatalog } from "../../ApiServices";
import numeral from "numeral";

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "960px",
    },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "30px",
  },
  containedButton: {
    color: "#ffffff",
    backgroundColor: PrimaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  outlinedButton: {
    color: PrimaryHard,
    backgroundColor: "#ffffff",
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    width: 100,
    height: 40,
  },
});

const AddServicePopUp = ({ isOpen = false, onClose, refresh }) => {
  const classes = useStyles();
  const { id } = useParams();

  const [payload, setPayload] = useState({
    serviceName: "",
    serviceCharge: "",
  });

  function handleChangeRequest(event, key) {
      setPayload((prev) => {
        return {
          ...prev,
          [key]: event,
        };
      });
  }

  const formatedNumber = (val) => {
    return numeral(val).format("0,0");
  };

  const fixServiceCharge = (val) => {
    return val.split(".").join("")
  }

  const handleSubmit = async () => {
    const dataPayload = {
      vendorId: id,
      serviceItem: payload.serviceName,
      costItem: fixServiceCharge(payload.serviceCharge),
    };
    const res = await addNewCatalog(dataPayload);
    if (res) {
      await onClose();
      await refresh();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={classes.modal}
    >
      <Box style={{ padding: "36px 48px" }}>
        <Grid container justify="flex-end">
          <IconButton small onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography className={classes.title}>Tambah Layanan</Typography>
        <Grid container alignContent="center" spacing={2}>
          <Grid item xs={6}>
            <div style={{ marginBottom: "14px" }}>
              <LabelTextField
                label="Nama Layanan:"
                placeholder="Masukkan Nama Layanan"
                type="text"
                onChange={(newVal) =>
                  handleChangeRequest(newVal.target.value, "serviceName")
                }
                value={payload.serviceName}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ marginBottom: "14px" }}>
              <LabelTextField
                label="Biaya Layanan:"
                placeholder="Masukkan Biaya Layanan"
                type="text"
                onChange={(newVal) =>
                  handleChangeRequest(newVal.target.value, "serviceCharge")
                }
                value={payload.serviceCharge ? formatedNumber(payload.serviceCharge) : ""}
                currencyField
              />
            </div>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 20 }} justify="space-between">
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.outlinedButton}
              style={{ textTransform: "capitalize" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={classes.containedButton}
              style={{ textTransform: "capitalize" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AddServicePopUp;
