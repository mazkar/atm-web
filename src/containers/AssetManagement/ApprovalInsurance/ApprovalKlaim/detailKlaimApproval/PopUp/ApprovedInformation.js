import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Modal,
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { ReactComponent as CloseButton } from "../../../../../../assets/icons/siab/x-new.svg";
import constants from "../../../../../../helpers/constants";
import * as Colors from "../../../../../../assets/theme/colors";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    borderRadius: 10,
    width: 620,
    height: 310,
    padding: 30,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width:79,
    height: 38,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width:79,
    height: 38,
  },
});
const ApprovedInformation = ({ isOpen, onClose}) => {
  const { modal, paper, primaryButton, secondaryButton } = useStyles();
  return (
    <div>
      <Modal
        className={modal}
        open={isOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={paper}>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={onClose}>
              <CloseButton />
            </IconButton>
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography
                variant="h5"
                component="h5"
                align="center"
                style={{ color: "#2B2F3C", fontWeight: 500, fontSize: 36 }}
              >
                Klaim Asuransi Approved
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: 20 }}>
              <Typography
                style={{ fontWeight: 400, fontSize: 17, textAlign: "center" }}
              >
                New claim insurance has been approved
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                style={{ marginTop: 20 }}
                justifyContent="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    className={primaryButton}
                    onClick={onClose}
                    style={{ textTransform: "capitalize" }}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
export default ApprovedInformation;
