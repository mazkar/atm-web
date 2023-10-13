import { ReactComponent as ExclamationIcon } from "../../../../../assets/images/exclamation-triangle.svg";
import { Box, makeStyles, Modal, Typography } from "@material-ui/core";
import React from "react";
import CancelButton from "../../../../../components/ConfigCategory/CancelButton";
import SubmitButton from "../../../../../components/ConfigCategory/SubmitButton";
import { ChkyButtons } from "../../../../../components";

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
    width: 320,
    height: 320,
    background: "#FFFFFF",
    borderRadius: 8,
    padding: '15px 20px 20px 20px',
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 8
},
description: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 13,
    marginBottom: 35
  },
  icon: {
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const PopupDelete = (props) => {
  const {open, onClose, onSubmit, selectedId} = props
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.root}
    >
      <Box className={classes.container}>
        <Box>
          <Typography className={classes.title}>
            Anda yakin akan <br/>menghapus?
          </Typography>
          <Typography className={classes.description}>
            Anda tidak dapat membatalkan tindakan ini
          </Typography>
          <Box className={classes.icon}>
            <ExclamationIcon />
          </Box>
        </Box>
        <Box className={classes.buttonContainer}>
          <ChkyButtons style={{ textTransform: "none" }} buttonType='redOutlined' onClick={onClose}>Batal</ChkyButtons>
          <ChkyButtons style={{ textTransform: "none" }} onClick={()=>onSubmit(selectedId)}>Hapus</ChkyButtons>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupDelete;
