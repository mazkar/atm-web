/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {  makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import constants from "../../../../helpers/constants";
import LoadingView from "../../../../components/Loading/LoadingView";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 660,
    height: "max-content",
    borderRadius: 10,
    padding: 30,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  fontBold: {
    fontSize: 17,
    fontWeight: 600,
  },
  buttonContainer: {
    marginTop: 25,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 85,
    height: 40,
    marginRight: 25,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 85,
    height: 40,
    marginLeft: 25,
  },
  listItemStyles: {
    "&:hover": {
      color: "black",
      backgroundColor: "#FFFFFF",
    },
    textAlign: "left",
    "&:focus": {
      background: constants.color.primaryHard,
      color: "black",
    },
  },
  listItemTarget: {
    "&:hover": {
      color: "black",
      backgroundColor: "#FFFFFF",
    },
  },
});

const ModalRbbArea = ({
  isOpen,
  handleSave,
  onClose,
  idAtmSite,
}) => {
  const {
    modal,
    paper,
    closeIcon,
    fontBold,
    buttonContainer,
    primaryButton,
    secondaryButton,
    listItemStyles,
    listItemTarget,
  } = useStyles();

  // INITIAL STATE //
  const [isOpenModalLoader, setOpenModalLoader] = useState(false);
  const [rbbTarget, setRbbTarget] = useState([]);
  const [selectedArea, setSelectedArea] = useState(0)
  const [selectedAreaName, setSelectedAreaName] = useState('')

  function isEqual(one, two) {
    if (one === two) {
      return true;
    }
    return false;
  }

  const handleSelectArea = (value, area) => {
    setSelectedArea(value);
    setSelectedAreaName(area);
  };

  function handleClickSave(){
    handleSave(selectedArea, selectedAreaName)
  }

  useEffect(() => {
    if (isOpen && idAtmSite) {
      try {
        setOpenModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/rbbRelocationPopUpService`,
            { id: idAtmSite }
          )
          .then((res) => {
            const newData = res.data.rbbRelocationDetailList;
            // console.log("DATA AREA", JSON.stringify(newData));
            setRbbTarget(newData);
            setOpenModalLoader(false);
          })
          .catch((err) => {
            setOpenModalLoader(false);
            alert(`FAILED FETCH DATA! \n ${err}`);
          });
      } catch (err) {
        setOpenModalLoader(false);
        alert(`Error Fetching Data! \n ${err}`);
      }
    }
  }, [isOpen, idAtmSite]);

  return (
    <Modal
      className={modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton onClick={onClose}>
              <Close className={closeIcon} />
            </IconButton>
          </Grid>
        </Grid>

        <div>
          {isOpenModalLoader ? (
            <LoadingView maxheight="100%" />
          ) : (
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography style={{ fontWeight: 500, fontSize: 28 }}>
                  RBB Relocation
                </Typography>
              </Grid>

              <Grid container direction="row" style={{ width: "100%" }}>
                <Grid item xs={4} style={{ paddingLeft: 10, paddingTop: 15 }}>
                  <Typography className={fontBold}>Area Asal RBB</Typography>
                </Grid>

                <Grid item xs={8}>
                  {rbbTarget.length > 0 && (
                    <div
                      style={{
                        overflowY: "scroll",
                        maxHeight: 300,
                        paddingRight: 20,
                      }}
                    >
                      {rbbTarget.map((data) => {
                        return (
                          <Grid
                            container
                            direction="row"
                            style={{ width: "100%" }}
                          >
                            <Grid item xs={10}>
                              <ListItem
                                className={listItemStyles}
                                alignItems="center"
                                button
                                divider
                                disabled={isEqual(
                                  data.target,
                                  data.actual
                                )}
                                key={data.cityId}
                                id={data.cityId}
                                onClick={() =>
                                  handleSelectArea(data.cityId, data.cityName)
                                }
                              >
                                <ListItemText>{data.cityName}</ListItemText>
                              </ListItem>
                            </Grid>
                            <Grid item xs={2}>
                              <ListItem
                                className={listItemTarget}
                                alignItems="center"
                                divider
                              >
                                <ListItemText>
                                  {data.actual}/{data.target}
                                </ListItemText>
                              </ListItem>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </div>

        <Grid container justify="space-between" className={buttonContainer}>
          <Grid item>
            <Button
              variant="outlined"
              disableElevation
              className={secondaryButton}
              onClick={onClose}
              style={{ textTransform: "capitalize" }}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              disableElevation
              className={primaryButton}
              onClick={handleClickSave}
              style={{ textTransform: "capitalize" }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

ModalRbbArea.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  rowToShow: PropTypes.string.isRequired,
  handleSelectArea: PropTypes.func.isRequired,
};

export default withRouter(ModalRbbArea);
