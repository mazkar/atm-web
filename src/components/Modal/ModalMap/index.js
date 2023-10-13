import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import constants from "../../../helpers/constants";
import ChkyLeafletMaps from "../../chky/ChkyLeafletMaps";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    minWidth: 1028,
    minHeight: 700,
    borderRadius: 10,
    padding: 30,
    boxShadow: "none",
  },
});

const ModapMap = (props) => {
  const classes = useStyles();
  const { isOpen, position, onClose, dataATM } = props;
  // console.log("data atm di modal map", dataATM);
  return (
    <div>
      <Modal className={classes.modal} open={isOpen} onClose={onClose}>
        <div className={classes.paper}>
          <ChkyLeafletMaps
            height={650}
            position={position}
            dataATM={dataATM}
            onClickMap={(e) => console.log("do nothing")}
          />
        </div>
      </Modal>
    </div>
  );
};

ModapMap.propTypes = {
  isOpen: PropTypes.bool,
};

ModapMap.defaultProps = {
  isOpen: false,
};

export default ModapMap;
