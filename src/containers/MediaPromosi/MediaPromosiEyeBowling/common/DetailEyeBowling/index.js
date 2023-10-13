import React, { useEffect, useState } from "react";
import { CardMedia, Divider, Grid, makeStyles } from "@material-ui/core";
// import TestImage from "../../../../../assets/images/photos/testImage2.svg";
import { withStyles } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import ListEyeBowling from "./ListEyeBowling";
import Qna from "./Qna.js";
import PropTypes from "prop-types";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import NoImage from "../../../../../assets/images/image.png";

const UseStyle = makeStyles({
  root: {
    padding: "10px",
    minHeight: "241px",
  },
  cardMedia: {
    width: "201px",
    height: "221px",
    borderRadius: "10px",
  },
  fieldTitle: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "13px",
  },
  fieldValue: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "13px",
  },
  imgContainer: {
    borderRadius: 10,
    width: 180,
    maxHeight: 221,
  },
});

function ItemEyeBowling({ indexSelected, dataFoto }) {
  const classes = UseStyle();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        wrap="noWrap"
      >
        {/* foto */}
        <Grid item lg={3} md={12} className={classes.fotoImage}>
          {dataFoto.fotoFlagMounted ||
          dataFoto.fotoSkitarAtm ||
          dataFoto.fotoBooth ||
          dataFoto.fotoStickerKaca ||
          dataFoto.photo ? (
            <div>
              <MinioImageComponent
                filePath={
                  dataFoto.fotoFlagMounted
                    ? dataFoto.fotoFlagMounted
                    : dataFoto.fotoSkitarAtm
                    ? dataFoto.fotoSkitarAtm
                    : dataFoto.fotoBooth
                    ? dataFoto.fotoBooth
                    : dataFoto.fotoStickerKaca
                    ? dataFoto.fotoStickerKaca
                    : dataFoto.photo
                }
                className={classes.imgContainer}
              />
            </div>
          ) : (
            <img
              src={NoImage}
              className={classes.imgContainer}
              alt="No Image"
            />
          )}
        </Grid>
        {/* detail 1 */}
        <Grid item lg={9} md={12}>
          <Grid container direction="column">
            <Grid item style={{ minHeight: 110, padding: 10 }}>
              <ListEyeBowling dataFoto={dataFoto} />
            </Grid>
          </Grid>
          <Divider />
          <Grid item style={{ minHeight: 111, padding: 10 }}>
            <Qna dataFoto={dataFoto} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

ItemEyeBowling.PropTypes = {
  dataFoto: PropTypes.object.isRequired,
  indexSelected: PropTypes.number.isRequired,
};

export default ItemEyeBowling;
