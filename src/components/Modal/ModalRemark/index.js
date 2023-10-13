/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import { RootContext } from "../../../router";
import LoadingView from "../../Loading/LoadingView";
import constants from "../../../helpers/constants";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: constants.color.white,
    width: 660,
    height: 530,
    borderRadius: 10,
    padding: 30,
    boxShadow: "none",
    overflow: 'scroll',
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
  buttonCancel: {
    margin: "65px",
    backgroundColor: constants.color.primaryHard,
    color: "white",
    textTransform: "capitalize",
    "& .MuiButton-root": {
      width: "100px",
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.8,
      },
    },
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
    // padding: '0px 40px 0px 40px',
  },
  textField: {
    "& .MuiInputBase-root": {
      width: 360,
      border: "1px solid",
      borderColor: "#BCC8E7",
      borderRadius: "6px",
    },
    "& .MuiInputBase-input": {
      // right: '-20px',
    },
    "& .MuiOutlinedInput-input": {
      "&: hover": {
        background: "#F4F7FB",
      },
    },
    "& .MuiButton-root": {
      "&:hover": {
        backgroundColor: constants.color.primaryHard,
        opacity: 0.9,
      },
    },
  },
  inputNumber: {
    marginTop: 10,
    borderRadius: "8px",

    height: 35,
    "& .ant-input-number-input": {
      borderRadius: "8px",
      border: "8px",
    },
    "& .ant-input-number-handler-wrap": {
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
    },
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  remarkContainer: {},
  remarkTitle: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 5,
  },
  formContainer: {
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 250,
    height: 25,
    borderRadius: 10,
    position: "relative",
    border: "0px solid #BCC8E7",
    fontSize: 13,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Barlow", "NunitoRegular"].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      right: "-20px",
      outline: "none",
    },
  },
}))(InputBase);

const ModalRemark = ({ isOpen, onClose, rowToShow, type, rType }) => {
  const classes = useStyles();
  const { userId } = useContext(RootContext);
  const [remarks, setRemarks] = useState();
  const [data, setData] = useState([]);
  const [isOpenModalLoader, setModalLoader] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      // console.log("id row", rowToShow)
      const request = { remarkType: rType, rbbType: type, rbbId: rowToShow };
      const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      };
      try {
        setModalLoader(true);
        axios
          .post(
            `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/getRemarkNote`,
            request,
            headers
          )
          .then((res) => {
            const dataPre = res.data.remarkList;
            // if(res.data.responseMessage === "NO CONTENT FOUND"){
            //   alert("PLEASE INPUT NEW REMARK");
            // }
            // console.log('ini datapre', dataPre);
            console.log("Ini Data request Draft Remark", res);
            setData(dataPre);
            setModalLoader(false);
          })
          .catch((err) => {
            alert(err);
            setModalLoader(false);
          });
      } catch (err) {
        alert(`Error Fetching New Atm Data...! \n${err}`);
        setModalLoader(false);
      }
    }
  }, [rowToShow]);

  const handleSubmit = () => {
    const request = {
      userId: parseInt(userId),
      rbbId: rowToShow,
      remark: remarks,
      rbbType: "New",
      username: "",
      remarkType: rType
    };
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      setModalLoader(true);
      axios
        .post(
          `${process.env.REACT_APP_API_DOMAIN}/profilelocationservices/profilelocationservices/v1/submitRemarkNote`,
          request,
          headers
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          alert(err);
          setModalLoader(false);
        });
    } catch (err) {
      alert(`Error Fetching New Atm Data...! \n${err}`);
      setModalLoader(false);
    }
  };

  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.paper}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton onClick={onClose}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <Typography
                variant="h4"
                component="h4"
                style={{ marginBottom: 20 }}
              >
                Remark Note
              </Typography>
            </Grid>
            {isOpenModalLoader ? (
              <LoadingView maxheight="100%" />
            ) : (
              data &&
              data.map((item, i) => {
                return (
                  <React.Fragment>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                    >
                      <Grid item>
                        <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                          Remark {i + 1}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#BCC8E7",
                          }}
                        >
                          {moment(item.date).format("DD/MM/YY | HH:mm")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="column" justify="flex-start">
                      <Grid item>
                        <Typography style={{ fontSize: 13, fontWeight: 400, whiteSpace: 'pre-line' }}>
                          {item.remark}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: "#DC241F",
                          }}
                        >
                          {item.username}
                        </Typography>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                );
              })
            )}
            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Grid item>
                <Typography className={classes.remarkTitle}>Remark</Typography>
              </Grid>
              <Grid item className={classes.formContainer}>
                <TextField
                  className={classes.textField}
                  id="outlined-textarea"
                  placeholder="add remark note"
                  multiline
                  variant="outlined"
                  onChange={handleRemarks}
                  rows={3}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              className={classes.buttonContainer}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  disableElevation
                  className={classes.secondaryButton}
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
                  className={classes.primaryButton}
                  onClick={handleSubmit}
                  style={{ textTransform: "capitalize" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

ModalRemark.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalRemark;
