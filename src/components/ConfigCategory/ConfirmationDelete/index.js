import { ReactComponent as TrashIcon } from "../../../assets/icons/siab/trash-new.svg";
import { Box, makeStyles, Modal, Typography } from "@material-ui/core";
import React from "react";

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
    background: "#FFFFFF",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 320,
    height: 270,
  },
});

const ConfirmationDelete = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.root}
    >
      <Box className={classes.container}>
        <TrashIcon style={{ marginBottom: 25 }} />
        <Typography style={{ fontSize: 20, fontWeight: 700 }}>
          Hapus Berhasil Dilakukan
        </Typography>
      </Box>
    </Modal>
  );
};

export default ConfirmationDelete;
