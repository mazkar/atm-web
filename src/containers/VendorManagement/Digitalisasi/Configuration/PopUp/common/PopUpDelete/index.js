import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import constants from "../../../../../../../helpers/constants";
import {doFetchDeleteItem} from "../../../../../ApiServices"
import axios from "axios";
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 377,
    height: 160,
    borderRadius: 10,
    padding: 30,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 134,
    height: 38,
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

const PopUpDelete = ({ isOpen, onClose, idListConfig,customId,delConfig}) => {
  const { modal, paper, primaryButton, secondaryButton } = useStyles();
  const [isLoadData, setLoadData] = useState(false);
  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }
  function handleClikDel() {
    doFetchDeleteItem(loadingHandler, { id: idListConfig, customizeId: customId }).then(
      (response) => {
        if (response.responseCode === "00") {
          console.log("berhasil");
          delConfig()
        }
      }
    );
  }
  useEffect(() => {
    console.log("listid", idListConfig);
  }, [idListConfig]);
  return (
    <Modal
      className={modal}
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="center" alignItems="center" direction="column">
          {" "}
        </Grid>{" "}
        <Grid item>
          <Typography
            style={{
              color: "#374062",
              fontWeight: 500,
            }}
          >
            Kamu Yakin Ingin Menghapus Pengaturan Ini ?
          </Typography>
          <Grid item>
            <Grid container style={{ marginTop: 30 }} justify="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={secondaryButton}
                  onClick={handleClikDel}
                  style={{ textTransform: "capitalize" }}
                >
                  Ya
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  className={primaryButton}
                  onClick={onClose}
                  style={{ textTransform: "capitalize" }}
                >
                  Tidak
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default PopUpDelete;
