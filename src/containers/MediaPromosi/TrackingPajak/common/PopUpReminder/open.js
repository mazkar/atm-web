import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Dialog,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import LoadingView from "../../../../../components/Loading/LoadingView";
import ConfirmAndCancelButton from "../../../../../components/Button/ConfirmAndCancelButton";
import { doGetPopUpReminder, doSendReminder } from "../../../services";
import useTimestampConverter from "../../../../../helpers/useTimestampConverter";
import SuccessPopUp from "../../../../Implementation/cimb/common/PopUp/successPopUp";

const UseStyles = makeStyles({
  modal: {
    "& .MuiDialog-paper": {
      width: "720px",
    },
  },
  title: {
    fontSize: "36px",
    fontWeight: 500,
    fontFamily: "Barlow",
    textAlign: "center",
    marginBottom: "30px",
    textTransform: "capitalize",
  },
  boxModal: {
    padding: "36px 32px",
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
  subtitle: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "16px",
  },
  tableContainer: {
    border: "1px solid #E6EAF3",
    borderRadius: "10px",
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
});

//DUMMY TABLE

//table header
const tableHeader = ["Reminder ke", "Tanggal kirim", "User Pengirim"];

//END DUMMY DATA

function PopUpReminder({ isOpen = false, onClose, dataPopUpOpen }) {
  const classes = UseStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [dataPopUp, setDataPopUp] = useState({});
  const [dataHistory, setDataHistory] = useState([]);
  const { atmId } = dataPopUpOpen;
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);

  // set handler loader when call Approval API Service
  function loadingHandler(loaderValue) {
    setIsLoading(loaderValue);
  }

  //function reload
  function refreshPage() {
    window.location.reload();
  }
  //FUNCTION GET REMINDER

  useEffect(() => {
    doGetPopUpReminder(loadingHandler, { atmId: atmId }).then((response) => {
      if (response) {
        if (response.responseCode === "200") {
          setDataPopUp(response);
          const historyResponse = response.historyReminderPjkdoneList;
          setDataHistory(historyResponse);
        }
      }
    });
  }, [atmId]);

  //END FUNCTION GET REMINDER
  useEffect(() => {
    console.log({ dataHistory });
    console.log({ dataPopUp });
  }, [dataHistory]);

  //FUNCTION SEND REMINDER
  const handleSendReminder = async () => {
    await doSendReminder(loadingHandler, { id: dataPopUp.id })
      .then((response) => {
        if (response) {
          if (response.responseCode === "200") {
            console.log({ response });
            setOpenSuccessPopUp(true);
            setTimeout(() => {
              setOpenSuccessPopUp(false);
              onClose();
              refreshPage();
            }, 3000);
          } else {
            alert(`Reminder Gagal`);
          }
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan...! \n${err}`);
      });
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className={classes.modal}>
        <Box className={classes.boxModal}>
          <Grid container justifyContent="flex-end">
            <IconButton small onClick={onClose}>
              <CloseOutlined style={{ color: PrimaryHard }} />
            </IconButton>
          </Grid>
          <Typography className={classes.title}>Reminder</Typography>
          {/* static detail */}
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={4} style={{ marginBottom: "10px" }}>
              <Typography className={classes.labelText}>ATM ID</Typography>
              <Typography className={classes.contentText}>
                {dataPopUp.atmId}
              </Typography>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: "10px" }}>
              <Typography className={classes.labelText}>Lokasi</Typography>
              <Typography className={classes.contentText}>
                {dataPopUp.lokasi}
              </Typography>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: "10px" }}>
              <Typography className={classes.labelText}>Alamat</Typography>
              <Typography className={classes.contentText}>
                {dataPopUp.alamat}
              </Typography>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: "10px" }}>
              <Typography className={classes.labelText}>Pajak Awal</Typography>
              <Typography className={classes.contentText}>
                {dataPopUp.pajakAwal
                  ? useTimestampConverter(
                      dataPopUp.pajakAwal / 1000,
                      "DD/MM/YYYY"
                    )
                  : "-"}
              </Typography>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: "10px" }}>
              <Typography className={classes.labelText}>Pajak Akhir</Typography>
              <Typography className={classes.contentText}>
                {dataPopUp.pajakAhir
                  ? useTimestampConverter(
                      dataPopUp.pajakAhir / 1000,
                      "DD/MM/YYYY"
                    )
                  : "-"}
              </Typography>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: "10px" }}>
              <Typography className={classes.labelText}>
                Vendor Pajak
              </Typography>
              <Typography className={classes.contentText}>
                {dataPopUp.vendorpajak}
              </Typography>
            </Grid>

            <Grid item xs={4} style={{ marginBottom: "10px" }}>
              <Typography className={classes.labelText}>
                Type Orderan
              </Typography>
              <Typography className={classes.contentText}>
                {dataPopUp.typOrder}
              </Typography>
            </Grid>
          </Grid>

          {/* end static detail */}

          <Typography
            className={classes.subtitle}
            style={{ marginBottom: "20px" }}
          >
            History Reminder
          </Typography>
          {isLoading ? (
            <LoadingView />
          ) : (
            <div className={classes.tableContainer}>
              {/* Table Header */}
              <div className={classes.tableGrid}>
                {tableHeader.map((item) => {
                  return (
                    <Typography className={classes.tableHeader}>
                      {item}
                    </Typography>
                  );
                })}
              </div>
              {/* end table header */}

              <SuccessPopUp
                isOpen={openSuccessPopUp}
                type="add"
                label="Reminder Berhasil Ditambahkan"
                onClose={() => setOpenSuccessPopUp(false)}
              />

              {/* table content */}
              {dataHistory && dataHistory.map((item, index) => {
                return (
                  <div className={classes.tableGrid}>
                    <Typography className={classes.tableContent}>
                      {index + 1}
                    </Typography>
                    <Typography className={classes.tableContent}>
                      {item.tglReminder}
                    </Typography>
                    <Typography className={classes.tableContent}>
                      {item.userPengirim}
                    </Typography>
                  </div>
                );
              })}

              {/* end table content */}
            </div>
          )}
          {isLoading ? (
            <ConfirmAndCancelButton
              onCancel={onClose}
              textCancel="Cancel"
              textConfirm="Submitting..."
              disabled="disabled"
            />
          ) : (
            <ConfirmAndCancelButton
              onCancel={onClose}
              textCancel="Cancel"
              textConfirm="Submit"
              onConfirm={() => handleSendReminder()}
            />
          )}
        </Box>
      </Dialog>
    </div>
  );
}

PopUpReminder.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopUpReminder;
