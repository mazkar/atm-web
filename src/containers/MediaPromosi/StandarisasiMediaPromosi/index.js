import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Title from "../../../components/Title/Title";
import Content from "./common/content";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";
import ModalLoader from "../../../components/ModalLoader";
import { PrimaryHard } from "../../../assets/theme/colors";
import { Grid, Typography } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
  paramButton: {
    width: "max-content",
    color: PrimaryHard,
    backgroundColor: "white",
    height: 40,
    marginRight: 10,
    border: "1px solid",
    borderColor: PrimaryHard,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  textButton: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
});

const index = () => {
  const classes = useStyle();
  const [isOpenModalLoaderNew, setModalLoaderNew] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>
            Standarisasi Media Promosi
          </Typography>
        </Grid>
      </Grid>
      <Content />

      {/* <FloatingChat /> */}
      <ModalLoader isOpen={isOpenModalLoaderNew} />
    </div>
  );
};

export default index;
