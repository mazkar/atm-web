import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import LoadingView from "../../../../../components/Loading/LoadingView";

const UseStyles = makeStyles({
  cardBox: {
    padding: "20px 200px 20px 20px",
    borderRadius: "10px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "24px",
    color: "#2B2F3C",
  },
  titleKategori: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "15px",
    color: "#DC241F",
    marginTop: "10px",
  },
  titleDesc: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "15px",
    color: "#2B2F3C",
    marginTop: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
  },
});

function CardDetail({ dataDetail, isLoading }) {
  const classes = UseStyles();
  return (
    <>
      {isLoading ? (
        <Paper style={{ padding: 20 }}>
          <LoadingView />{" "}
        </Paper>
      ) : (
        <Paper className={classes.cardBox}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item lg={3} md={12} style={{ padding: 5 }}>
              <MinioImageComponent
                filePath={dataDetail.coverImage ? dataDetail.coverImage : null}
                style={{ maxWidth: 280, maxHeight: 400 }}
              />
            </Grid>
            <Grid item lg={8} md={12}>
              <Typography className={classes.title}>
                {dataDetail.title}
              </Typography>
              <Typography className={classes.titleKategori}>
                {dataDetail.category} - {dataDetail.subCategory}
              </Typography>
              <Typography className={classes.titleDesc}>
                {dataDetail.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}

CardDetail.PropTypes = {
  dataDetail: PropTypes.object.isRequired,
};

export default CardDetail;
