import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Select } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg";
import constants from "../../../../../helpers/constants";
import InputBordered from "../../../../../components/NewOrder/common/InputComponent";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Toast from "../../../../../components/Toast";

const DeleteIconButton = withStyles(() => ({
  root: {
    backgroundColor: "#DC241F75",
    color: "#fff",
    "&:hover": {
      color: "#DC241F",
      backgroundColor: "#fff8f8cc",
    },
  },
}))(IconButton);

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
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
    backgroundColor: constants.color.white,
    width: 800,
    minHeight: "550px",
    height: "570px",
    borderRadius: 10,
    padding: 30,
  },
  imageUploadContainer: {
    position: "relative",
  },
  imgDefault: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
  resetImage: {
    position: "absolute",
    width: "15px",
    height: "15px",
    top: -10,
    right: -10,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
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
    width: 100,
    height: 40,
  },
});

function PopUpAssign({ isOpen, onClose, onSubmit, data, picSeted }) {
  const { modal, paper, primaryButton, secondaryButton } = useStyles();

  const [showToast, setShowToast] = useState(true);

  const ddlPic = [
    {
      id: 1,
      status: "DW",
    },
    {
      id: 2,
      status: "HS",
    },
    {
      id: 3,
      status: "MR",
    },
  ];

  return (
    <Modal
      className={modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          <CloseButton onClick={onClose} style={{ cursor: "pointer" }} />
        </Grid>

        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ color: "#374062", fontWeight: 600 }}
            >
              {picSeted ? "Add New Order" : "Assign to PIC"}
            </Typography>
          </Grid>
          <Grid item style={{ margin: 50 }}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Ticket ID :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 600 }}>2323</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "20px" }}
                >
                  <Grid item>
                    <Typography>ATM ID :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 600 }}>1222</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "20px" }}
                >
                  <Grid item>
                    <Typography>Start Problem :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 600 }}>
                      01/05/2021, 07:30:00
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "20px" }}
                >
                  <Grid item>
                    <Typography>Detail :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 600 }}>
                      TGR-CRM-CBG-CLG
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>Lokasi :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 600 }}>
                      TGR-CRM-CBG-CLG
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "20px" }}
                >
                  <Grid item>
                    <Typography>Problem :</Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 600 }}>
                      Cassete 03 Not Configured
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  style={{ marginTop: "20px" }}
                >
                  {picSeted ? null : (
                    <>
                      <Grid item>
                        <Typography>Nama PIC :</Typography>
                      </Grid>
                      <Grid item style={{ marginTop: "5px" }}>
                        {/* <InputBordered
                    rows={6}
                    style={{ width: "100%" }}
                    placeholder="Masukkan ATM ID"
                  /> */}
                        <Select
                          placeholder="Masukan Nama PIC"
                          size="large"
                          dropdownStyle={{ zIndex: 9999 }}
                          suffixIcon={
                            <ExpandMoreIcon style={{ color: PrimaryHard }} />
                          }
                          style={{
                            width: "90%",
                            borderRadius: 10,
                            color: PrimaryHard,
                          }}
                          // onChange={(newVal) => handleChangePayload(newVal, "pic")}
                        >
                          {ddlPic.map((inv) => (
                            <Select.Option value={inv.id}>
                              {inv.status}
                            </Select.Option>
                          ))}
                        </Select>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Notes & Description :</Typography>
              </Grid>
              <Grid item xs={12}>
                <InputBordered
                  multiline
                  rows={6}
                  style={{ width: "100%", marginTop: 5 }}
                  //   onChange={(e) => {
                  //     handleChangeRequest(e.target.value, "notesDescription");
                  //   }}
                  placeholder="Isi Note and Description"
                  //   value=""
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: -20 }}
          >
            <Grid item xs={10}>
              <Toast
                title="Success"
                subtitle="Add New Order Success"
                type="success"
                onClose={() => {
                  setShowToast(false);
                  window.location.reload();
                }}
              />
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: 20 }} justify="space-between">
            <Grid item>
              <Button
                variant="contained"
                disableElevation
                className={secondaryButton}
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
                className={primaryButton}
                onClick={onSubmit}
                style={{ textTransform: "capitalize" }}
                // disabled={loadingAddNew}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

PopUpAssign.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onSuccessSubmit: PropTypes.func.isRequired,
};

export default PopUpAssign;
