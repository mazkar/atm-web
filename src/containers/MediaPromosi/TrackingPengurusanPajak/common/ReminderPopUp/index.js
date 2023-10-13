/* Third Party Import */
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Dialog, Grid, Box, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from "prop-types";

/* Internal Import */
import { PrimaryHard } from "../../../../../assets/theme/colors";
import LabelTextField from "../../../../../components/Form/LabelTextField";
import ConfirmAndCancelButton from "../../../../../components/Button/ConfirmAndCancelButton";

const useStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "720px",
    },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "30px",
  },
  subtitle: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "16px",
  },
  labelText: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "13px",
    marginBottom: "10px",
  },
  contentText: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "15px",
  },
  tableGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    borderBottom: "1px solid #E6EAF3",
    "&:last-child": {
      borderBottom: "0px",
    },
  },
  tableHeader: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "13px",
    textAlign: "center",
    padding: "12px 0px",
  },
  tableContent: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "13px",
    textAlign: "center",
    padding: "12px 0px",
  },
  tableContainer: {
    border: "1px solid #E6EAF3",
    borderRadius: "10px",
  },
});

const staticDetail = [
  {
    label: "ATM ID:",
    content: "1222",
  },
  {
    label: "Lokasi:",
    content: "TGR-CRM-CBG-CLG",
  },
  {
    label: "Alamat:",
    content: "Jl. Delman Utama",
  },
  {
    label: "Pajak Awal:",
    content: "01/01/2021",
  },
  {
    label: "Pajak Akhir:",
    content: "31/12/2021",
  },
  {
    label: "Vendor Pajak:",
    content: "Multikencana",
  },
  {
    label: "Type Orderan:",
    content: "Kepengurusan Lokasi Baru",
  },
];

const tableHeader = ["Reminder ke", "Tanggal kirim", "User Pengirim"];
const tableContent = [
  {
    date: "12/12/2021",
    sender: "Soni",
  },
  {
    date: "10/12/2021",
    sender: "Soni",
  },
  {
    date: "8/12/2021",
    sender: "Soni",
  },
  {
    date: "8/12/2021",
    sender: "Soni",
  },
  {
    date: "8/12/2021",
    sender: "Soni",
  },
];

const ReminderPopUp = ({ isOpen = false, onClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      className={classes.modal}
    >
      <Box style={{ padding: "36px 32px" }}>
        <Grid container justify="flex-end">
          <IconButton small onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Typography className={classes.title}>Reminder</Typography>
        <Grid container spacing={2} style={{ marginBottom: "20px" }}>
          {staticDetail.map((item) => {
            return (
              <Grid item xs={4} style={{ marginBottom: "10px" }}>
                <Typography className={classes.labelText}>
                  {item.label}
                </Typography>
                <Typography className={classes.contentText}>
                  {item.content}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Typography
          className={classes.subtitle}
          style={{ marginBottom: "20px" }}
        >
          History Reminder
        </Typography>
        <div className={classes.tableContainer}>
          {/* Table Header */}
          <div className={classes.tableGrid}>
            {tableHeader.map((item) => {
              return (
                <Typography className={classes.tableHeader}>{item}</Typography>
              );
            })}
          </div>

          {/* Table Content */}
          {tableContent.map((item, index) => {
            return (
              <div className={classes.tableGrid}>
                <Typography className={classes.tableContent}>
                  {index + 1}
                </Typography>
                <Typography className={classes.tableContent}>
                  {item.date}
                </Typography>
                <Typography className={classes.tableContent}>
                  {item.sender}
                </Typography>
              </div>
            );
          })}
        </div>
        <ConfirmAndCancelButton
          onCancel={onClose}
          textCancel="Cancel"
          textConfirm="Submit"
        />
      </Box>
    </Dialog>
  );
};

ReminderPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReminderPopUp;
