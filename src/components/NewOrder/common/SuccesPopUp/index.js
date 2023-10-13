import React from "react";
import { Modal, Box, Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as DoneIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import PropTypes from "prop-types";
import { Close } from "@material-ui/icons";
import constants from "../../../../helpers/constants";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 500,
    borderRadius: 10,
    padding: 30,
  },
  childDiv: {
    backgroundColor: "#DEFFE1",
    width: "98%",
    height: "50%",
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
    overflow: "hidden",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

const successPopUp = ({ isOpen, onClose, label }) => {
  const { modal, paper, childDiv } = useStyles();

  return (
    <div
      style={{
        backgroundColor: "#65D170",
        display: "flex",
        justifyContent: "flex-end",
        borderRadius: 8,
        width: "80%",
        margin: "auto",
        marginTop: 10,
      }}
    >
      <div className={childDiv}>
        <Grid container spacing={4}>
          <Grid item container spacing={2}>
            <Grid item xs={1.75}>
              <DoneIcon
                style={{ width: "40px", height: "40px", paddingTop: 10 }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography style={{ fontSize: 16, fontWeight: "bold" }}>
                Success
              </Typography>
              <Typography
                style={{
                  fontSize: 13,
                  color: "#8D98B4",
                }}
              >
                Add New Order Succes
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={onClose} style={{ marginRight: 10 }}>
                <Close style={{ color: "#65D170" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

successPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default successPopUp;
