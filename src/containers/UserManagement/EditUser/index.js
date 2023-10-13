/* eslint-disable import/no-cycle */
import React, {useState} from 'react';
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import constants from "../../../helpers/constants";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/siab/arrow-left.svg";
import AddEditForm from '../partials/AddEditForm';
import AddEdit from '../VendorUsers/AddEdit';
import { GrayUltrasoft } from "../../../assets/theme/colors";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    backgroundColor: GrayUltrasoft,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  title: {
    margin: 10,
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constants.color.dark,
  },
  backButton: {
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
});

function EditUser() {
  const classes = useStyles();
  const history = useHistory();
  // GET QUERY URL VALUE
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const categoryUser = urlParams.get("category");

  return(
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item>
          <div className={classes.backButton}>
            <MuiIconLabelButton
              label="Back"
              iconPosition="startIcon"
              onClick={()=>history.push("/user-management")}
              buttonIcon={<ArrowLeft />}
            />
          </div>
        </Grid>
        <Grid item>
          <Typography className={classes.title}>
            Edit User
          </Typography>
        </Grid>
        {categoryUser==="vendor"? 
          (
            <AddEdit formType="edit" />
          ) : 
          (
            <AddEditForm formType="edit" />
          )
        }
      </Grid>
    </div>
  ); 
}

export default EditUser;
