import { ReactComponent as XIcon } from "../../../../../assets/icons/duotone-red/x.svg";
import {
  Box,
  IconButton,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import CategoryInput from "../../../../../components/ConfigCategory/CategoryInput";
import CancelButton from "../../../../../components/ConfigCategory/CancelButton";
import SubmitButton from "../../../../../components/ConfigCategory/SubmitButton";
import ConfirmationSaved from "../../../../../components/ConfigCategory/ConfirmationSaved";

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
    width: 550,
    // height: 380,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: " 36px 32px",
    background: "#FFFFFF",
    borderRadius: 10,
    zIndex: 11,
  },
  exitContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
  },
  exitButton: {
    cursor: "pointer",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
    marginBottom: 40,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
  },
  formControl: {
    width: "100%",
    padding: "0 20px",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    flexDirection: "column",
  },
});

const PopUpAdd = (props) => {
  const { open, onClose, onSubmit, type, categoryId } = props;

  const [inputValue, setInputValue] = useState("");
  const [showConfirmationSaved, setShowConfirmationSaved] = useState(false);

  const classes = useStyles();

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = () => {
    if (inputValue == "") {
      alert(`Nama ${type} Tidak Boleh Kosong!`);
    } else {
      onSubmit(inputValue, categoryId);
      setShowConfirmationSaved(true);
      setTimeout(() => {
        setShowConfirmationSaved(false);
      }, 3000);
    }
  };

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
          <Box className={classes.exitContainer}>
            <IconButton style={{ cursor: "pointer" }} onClick={onClose}>
              <XIcon style={{ width: 24 }} />
            </IconButton>
          </Box>
          <Typography className={classes.title}>Tambah {type}</Typography>
          <Box className={classes.formControl}>
            <CategoryInput
              label={"Nama " + type}
              placeholder={"Masukan Nama " + type}
              onChange={onChangeInput}
            />
            <Box className={classes.buttonContainer}>
              <CancelButton children="Cancel" onCancelHandler={onClose} />
              <SubmitButton children="Submit" onSubmitHandler={submitHandler} />
            </Box>
          </Box>
        </Box>
      </Modal>
      <ConfirmationSaved
        open={showConfirmationSaved}
        onClose={() => setShowConfirmationSaved(false)}
      />
    </>
  );
};

export default PopUpAdd;
