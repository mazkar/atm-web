import React from "react";
import {
  Modal,
  Grid,
  Card,
  Typography,
  Fade,
  Backdrop,
  Button,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Input, AutoComplete } from "antd";
import MuiButton from "../../Button/MuiButton";
import PropTypes from "prop-types";
import xclose from "../../../assets/images/xclose.svg";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardStyle: {
    width: 500,
    height: 450,
    position: "relative",
  },
  labelStyle: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 36,

    color: "#2b2f3c",

    position: "absolute",
    margin: "auto",
  },
  topSection: {
    width: "100%",
    height: 120,
    position: "relative",
    margin: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSection: {
    marginTop: 35,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 33,
    width: 440,
  },
  inputContainer: {
    width: "100$",
  },
  labelInput: {
    fontWeight: 400,
    fontSize: 15,
    fontFamily: "Barlow",
    fontStyle: "normal",
    paddingBottom: 1,
  },
  inputStyle: {
    display: "flex",
    alignItems: "center",
    height: 47,
    border: "1px solid #bcc8e7",
    fontSize: 16,
    color: "#2b2f3c",
    borderRadius: 8,
  },
  buttonX: {
    cursor: "pointer",
    background: "inherit",
  },
});

const AddCategory = (props) => {
  const {
    isOpen,
    handleClose,
    label,
    titleLabel = "Nama Kategori",
    handleChange,
    valInput,
    placeholder,
    handleSubmit,
    handleCancel,
  } = props;
  const classess = useStyle();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className={classess.root}
    >
      <Fade in={isOpen}>
        <Card variant="outlined">
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classess.cardStyle}
          >
            <Grid item className={classess.topSection}>
              <Typography className={classess.labelStyle}>{label}</Typography>
              <div
                style={{ width: "100%", textAlign: "right", marginTop: -30 }}
              >
                <Button
                  onClick={handleClose}
                  className={classess.buttonX}
                  variant="text"
                  color="default"
                >
                  <img src={xclose} alt="" />
                </Button>
              </div>
            </Grid>
            <Grid item className={classess.bottomSection}>
              <div className={classess.inputContainer}>
                <Typography className={classess.labelInput}>
                  {titleLabel} :
                </Typography>
                <AutoComplete
                  onChange={handleChange}
                  value={valInput}
                  style={{ width: "100%" }}
                >
                  <Input
                    className={classess.inputStyle}
                    placeholder={placeholder}
                  />
                </AutoComplete>
              </div>
              <MuiButton
                label="Cancel"
                style={{
                  color: "#dc241f",
                  background: "#ffffff",
                  border: "1px solid #dc241f",
                  padding: "10px 20px 10px 20px",

                  position: "absolute",
                  bottom: 34,
                  left: 30,
                }}
                onClick={handleCancel}
              />
              <MuiButton
                label="Submit"
                style={{
                  position: "absolute",
                  bottom: 34,
                  right: 30,
                  padding: "10px 20px 10px 20px",
                }}
                onClick={handleSubmit}
              />
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
};

// const { isOpen, handleClose, label, handleChange, valInput, placeholder } =

AddCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  valInput: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  titleLabel: PropTypes.func.isRequired,
};

export default AddCategory;
