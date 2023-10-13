/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "../../../../components/chky/ChkyButtons";
import constants from "../../../../helpers/constants";
import LogoCimb from "../../../../assets/images/logo_cimb_niaga.png";
import useRupiahConverterSecondary from "../../../../helpers/useRupiahConverterSecondary";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 660,
    borderRadius: 10,
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 35,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  formContainer: {
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
  buttonContainer: {
    marginTop: 50,
  },
});
const dataDummy = [
  {
    id: 288,
    idLokasi: "288-291220-5",
    lokasi: "Purwokerto",
    harga: 120400800,
    penurunan: -90300600,
    category: "Prominent",
    status: "2",
    sla: 5,
    approver: [
      "Administrator",
      "Bambang Karsono Adi",
      "Deden Hidayat",
      "Trisna L.M. Siahaan",
    ],
    action: [
      {
        name: "Detail",
        url: "http://localhost:3001/approval/detail/288",
      },
    ],
  },
];
const ModalApproveAll = ({
  isOpen,
  onClose,
  selectedItems,
  tabValue,
  type,
  username,
}) => {
  const classes = useStyles();
  const title = (tab) => {
    if (tab === 0) {
      return "New";
    }
    if (tabValue === 1) {
      return "Renewal";
    }
    if (tabValue === 2) {
      return "Reopen";
    }
    if (tabValue === 3) {
      return "Termin";
    }
  };
  function renderId(item) {
    if (tabValue === 0) {
      return `${item.idLokasi}`;
    }
    if (tabValue === 1) {
      return `${item.atmId}`;
    }
    if (tabValue === 2) {
      return `${item.locationId}`;
    }
    if (tabValue === 3) {
      return `${item.atmId}`;
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <img
          src={LogoCimb}
          alt="logo"
          style={{ height: 45, marginBottom: 35 }}
        />

        <Typography className={classes.title}>
          {selectedItems.length} {title(tabValue)} ATM has been{" "}
          {type === "Reject" ? "Rejected" : "Approved"}
        </Typography>
        <Typography style={{ fontSize: 16, fontWeight: 400, marginTop: 25 }}>
          Hello <b>[{username}]</b>
        </Typography>

        <Typography style={{ fontSize: 16, fontWeight: 400, marginTop: 20 }}>
          You {username ? username.toLowerCase() !== 'deden hidayat' ? 'and others admin ' : null : null}already {title(tabValue)} {selectedItems.length}{" "}
          ATM procurements in {new Date().toDateString()}.<br />
          Here is the detail of the ATM :
        </Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {tabValue === 0 || tabValue === 2 ? "ID Requester" : "ATM ID"}
              </TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Type</TableCell>
              {tabValue !== 3 && (
                <TableCell align="right">Harga Sewa per Tahun</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {renderId(row)}
                </TableCell>
                <TableCell align="center">{row.lokasi}</TableCell>
                <TableCell align="center">{title(tabValue)}</TableCell>
                {tabValue !== 3 && (
                  <TableCell align="right">
                    {row.harga}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography style={{ fontSize: 16, fontWeight: 400, marginTop: 25 }}>
          Please click button below to see more details about approval.
        </Typography>
        <Grid container justify="center" className={classes.buttonContainer}>
          <Grid item>
            <Button disableElevation onClick={onClose}>
              See More Approval
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalApproveAll.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedItems: PropTypes.array,
  tabValue: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  username: PropTypes.string,
};

ModalApproveAll.defaultProps = {
  selectedItems: dataDummy,
  username: "username",
  tabValue: 0,
};

export default ModalApproveAll;
