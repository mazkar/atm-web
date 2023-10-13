import { ReactComponent as ExclamationIcon } from "../../../../../assets/images/exclamation-triangle.svg";
import { Box, makeStyles, Modal, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CancelButton from "../../../../../components/ConfigCategory/CancelButton";
import SubmitButton from "../../../../../components/ConfigCategory/SubmitButton";
import ConfirmationDelete from "../../../../../components/ConfigCategory/ConfirmationDelete";

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
    padding: "15px 20px 20px 20px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 8,
  },
  description: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 13,
    marginBottom: 35,
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

const PopUpDelete = (props) => {
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const { open, onClose, onSubmit, categoryId, subCategoryId } = props;
  const classes = useStyles();
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.root}
      >
        <Box className={classes.container}>
          <Box>
            <Typography className={classes.title}>
              Anda yakin akan <br />
              menghapus?
            </Typography>
            <Typography className={classes.description}>
              Anda tidak dapat membatalkan tindakan ini
            </Typography>
            <Box className={classes.icon}>
              <ExclamationIcon />
            </Box>
          </Box>
          <Box className={classes.buttonContainer}>
            <CancelButton children="Batal" onCancelHandler={onClose} />
            <SubmitButton
              children="Hapus"
              onSubmitHandler={() => {
                onSubmit(categoryId, subCategoryId);
                setShowConfirmationDelete(true);
                setTimeout(() => {
                  setShowConfirmationDelete(false);
                }, 3000);
              }}
            />
          </Box>
        </Box>
      </Modal>
      <ConfirmationDelete
        open={showConfirmationDelete}
        onClose={() => setShowConfirmationDelete(false)}
      />
    </>
  );
};

export default PopUpDelete;
