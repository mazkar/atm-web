/* eslint-disable import/no-cycle */
import React, {useState} from 'react';
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import constants from "../../../helpers/constants";
import {ContentTabs, ContentTab, TabPanel, a11yProps} from '../../../components/TabsMui';
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

function NewUser() {
  const classes = useStyles();
  const history = useHistory();
  // Init STATE
  const [valueTab, setValueTab] = useState(0);
  return (
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
            Add New User
          </Typography>
        </Grid>
        <ContentTabs
          value={valueTab}
          onChange={(e, newTab)=>setValueTab(newTab)}
          aria-label="simple tabs example"
        >
          <ContentTab label="CIMB" {...a11yProps(0)} />
          <ContentTab label="Vendor" {...a11yProps(1)} />
        </ContentTabs>

        <TabPanel value={valueTab} index={0}>
          <AddEditForm formType="add" />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <AddEdit formType="add" />
        </TabPanel>

      </Grid>
    </div>
  );
}

export default NewUser;

