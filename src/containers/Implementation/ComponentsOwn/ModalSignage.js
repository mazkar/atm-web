import React, { useState } from "react";
import {
  Dialog,
  Typography,
  IconButton,
  Grid,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import { DatePicker } from "antd";
import moment from "moment";

import { Dark, GrayMedium, PrimaryHard } from "../../../assets/theme/colors";

const useStyles = makeStyles(() => ({
  fieldLabel: {
    fontSize: "13px",
    lineHeight: "16px",
    fontWeight: 600,
    color: Dark,
    marginBottom: 10,
  },
  select: {
    fontSize: "13px",
    lineHeight: "16px",
    padding: 12,
  },
  input: { fontSize: "13px", lineHeight: "16px", padding: 12 },
  icon: { color: PrimaryHard },
  primaryButton: {
    color: "white",
    backgroundColor: PrimaryHard,
    padding: "11px 20px",
    borderRadius: 6,
    textTransform: "capitalize",
  },
  primaryButtonLabel: {
    fontWeight: "600",
    fontSize: "15px",
    lineHeight: "18px",
  },
  secondaryButton: {
    color: PrimaryHard,
    backgroundColor: "white",
    padding: "10px 32px",
    borderRadius: 6,
    border: "1px solid",
    borderColor: `${PrimaryHard}`,
    textTransform: "capitalize",
  },
  secondaryButtonLabel: {
    fontWeight: "600",
    fontSize: "17px",
    lineHeight: "20px",
  },
  dateField: {
    borderRadius: 6,
    borderColor: GrayMedium,
    padding: 11,
    "& input": {
      fontSize: "13px",
      lineHeight: "16px",
    },
  },
}));

const ModalSignage = ({ open, onClose, isEdit }) => {
  const classes = useStyles();
  const [date, setDate] = useState(moment());
  function handleChangeDate(date, dateString) {
    // console.log(date, dateString);
    setDate(date);
  }
  return (
    <Dialog open={open}>
      <div style={{ padding: 20, paddingBottom: 14, position: "relative" }}>
        <Typography
          style={{
            fontWeight: "500",
            fontSize: "24px",
            lineHeight: "29px",
            color: Dark,
          }}
        >
          Menu {isEdit ? "Edit" : "Add"}
        </Typography>
        <IconButton
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            padding: 20,
          }}
          onClick={onClose}
        >
          <CloseIcon style={{ fontSize: 20, color: PrimaryHard }} />
        </IconButton>
      </div>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <Typography
          style={{
            fontSize: "13px",
            lineHeight: "16px",
            color: Dark,
            marginBottom: 20,
          }}
        >
          <b>ATM ID :</b> #12453
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography className={classes.fieldLabel}>
              Nama Lokasi :
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{ classes: { input: classes.input } }}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.fieldLabel}>
              Tgl Jatuh Tempo :
            </Typography>
            <DatePicker
              popupStyle={{ zIndex: 1301 }}
              suffixIcon={
                <CalendarTodayOutlinedIcon
                  style={{ fontSize: 16, color: PrimaryHard }}
                />
              }
              className={classes.dateField}
              onChange={handleChangeDate}
              value={date}
              format="DD-MM-YYYY"
              allowClear={false}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.fieldLabel}>
              Tahun Pajak :
            </Typography>
            <TextField
              select
              value={2020}
              variant="outlined"
              fullWidth
              InputProps={{ classes: { input: classes.input } }}
              SelectProps={{
                IconComponent: ExpandMoreIcon,
                classes: { icon: classes.icon },
              }}
            >
              {[2020, 2021, 2022].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.fieldLabel}>
              Nama Vendor :
            </Typography>
            <TextField
              select
              value={2020}
              variant="outlined"
              fullWidth
              InputProps={{ classes: { input: classes.input } }}
              SelectProps={{
                IconComponent: ExpandMoreIcon,
                classes: { icon: classes.icon },
              }}
            >
              {[2020, 2021, 2022].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            variant="outlined"
            classes={{
              root: classes.secondaryButton,
              label: classes.secondaryButtonLabel,
            }}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            classes={{
              root: classes.primaryButton,
              label: classes.primaryButtonLabel,
            }}
          >
            Submit &amp; Send Email
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalSignage;
