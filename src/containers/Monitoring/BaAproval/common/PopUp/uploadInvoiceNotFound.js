import React from 'react';
import {
  Modal,
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as InfoCircle } from "../../../../../assets/icons/linear-red/info-circle.svg";
import { ReactComponent as CloseButton } from "../../../../../assets/icons/siab/x-new.svg";
import PropTypes from 'prop-types';
import constants from '../../../../../helpers/constants';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: constants.color.white,
    width: 400,
    minHeight: "550px",
    height: "570px",
    borderRadius: 10,
    padding: 30,
  },
  boxStyle: {
    padding: "15px 15px",
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    marginTop: 10,
    width: "96%",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: "125%",
      left: -37,
      backgroundColor: "#fff",
      top: -100,
      zIndex: 1,
    },
    height: "270px",
    overflow: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F4F7FB",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#9AC2FF",
    },
  },
});


const successPopUp = ({ isOpen, onClose, data }) => {
  const {
    modal,
    paper,
    boxStyle
  } = useStyles();

  return (
    <Modal
      className={modal}
      open={isOpen}
      //   onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={paper}>
        <Grid container justify="flex-end" alignItems="stretch">
          {<CloseButton onClick={onClose} style={{ cursor: "pointer" }} />}
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>{<InfoCircle />}</Grid>

          <Grid item>
            <Typography
              variant="h5"
              component="h5"
              align="center"
              style={{ color: "#374062", fontWeight: 600 }}
            >
              Nomor Invoice Tidak Terdapat Didalam Sistem
            </Typography>
          </Grid>

          <Grid item>
            <Typography style={{ color: "#374062", fontWeight: 500 }}>
              Total : 18 No Invoice
            </Typography>
          </Grid>
        </Grid>

        <Box className={boxStyle}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "5px 0px",
              zIndex: 2,
            }}
          >
            <>
              <Grid
                container
                direction="row"
                justify="flex-start"
                style={{ justifyItems: "center", paddingBottom: 15 }}
                spacing={1}
                alignItems="stretch"
              >
                <Grid item xs={2}>
                  <Typography
                    style={{
                      fontWeight: 500,
                      paddingLeft: 10,
                      color: "#2B2F3C",
                    }}
                  >
                    No
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                  <Typography
                    style={{ fontSize: "15px", fontWeight: 500 }}
                    variant="h6"
                    component="h2"
                  >
                    No Invoice
                  </Typography>
                </Grid>
              </Grid>
            </>
          </div>

          {data &&
            data.map((item) => {
              return (
                <>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    style={{ justifyItems: "center", paddingBottom: 5, paddingTop: 5 }}
                    spacing={1}
                    alignItems="stretch"
                  >
                    <Grid item xs={2}>
                      <Typography
                        gutterBottom
                        style={{
                          fontWeight: 500,
                          fontFamily: "Barlow",
                          paddingLeft: 10,
                        }}
                        variant="p"
                      >
                        {item.id}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                      <Typography
                        gutterBottom
                        style={{
                          color: "",
                          fontWeight: 500,
                          fontFamily: "Barlow",
                        }}
                        variant="p"
                      >
                        {item.noInvoice}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </>
              );
            })}

        </Box>
      </Box>
    </Modal>
  );
};

successPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default successPopUp;