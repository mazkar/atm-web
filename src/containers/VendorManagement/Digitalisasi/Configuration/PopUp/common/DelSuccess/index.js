import React from "react";
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
import { ReactComponent as DoneIcon } from "../../../../../../../assets/icons/duotone-others/check-green.svg";
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 420,
    height: 335,
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
});

const DelSuccess = ({ isOpen, onClose }) => {
  const { modal, paper, primaryButton } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={5}
        >
          <Grid item>
            <Typography
              variant="h4"
              component="h4"
              style={{
                color: "#374062",
                fontWeight: 500,
                textAlign: "center",
                marginTop: 30,
              }}
            >
              {" "}
              Hapus Berhasil
            </Typography>
          </Grid>
          <Grid item>
            <DoneIcon style={{ width: "80px", height: "80px" }} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={onClose}
              style={{ textTransform: "capitalize" }}
            >
              Kembali
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

DelSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default DelSuccess;
