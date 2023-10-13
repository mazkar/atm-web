/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import { makeStyles, Grid, Typography, Paper, Button } from "@material-ui/core";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import constansts from "../../../helpers/constants";
import { GrayMedium, PrimaryHard } from "../../../assets/theme/colors";
import TableMaster from "./Partials/TableMasterEsq/TableMaster";
import FloatingChat from "../../../components/GeneralComponent/FloatingChat";

import TableDwh from "./Partials/TableMasteDwh/TableMasterDwh";
import ModalPopUpUpload from "./Partials/Common/ModalPopUpUpload";
import ModalPopUpUploadDwh from "./Partials/Common/ModalPopUpUploadDwh";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as UploadCloud } from "../../../assets/icons/siab/upload-cloud.svg";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  titleContainer: {
    paddingBottom: 15,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constansts.color.dark,
  },
  tableContent: {
    marginTop: 20,
  },
  rootMap: {
    position: "relative",
    top: -50,
    zIndex: 1,
  },
  indicator: {
    backgroundColor: PrimaryHard,
    height: 4,
  },
});

export default function MasterDataMonitoring() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Modal

  const [uploadMaster, setUploadMaster] = useState(false);
  const [uploadMaterDwh, setUploadMasterDwh] = useState(false);

  const showPopUp = () => {
    setUploadMaster(true);
  };
  const showPopUp2 = () => {
    setUploadMasterDwh(true);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.titleContainer} alignItems="center">
        <Grid item>
          <Typography className={classes.title}>Master Data</Typography>
        </Grid>
        <Grid item>
          {selectedTab === 0 ? (
            <MuiIconLabelButton
              style={{
                width: "max-content",
                right: 0,
                height: 40,
                backgroundColor: "green",
              }}
              label="Upload Master ESQ"
              iconPosition="startIcon"
              onClick={showPopUp}
              buttonIcon={<UploadCloud />}
            />
          ) : (
            <MuiIconLabelButton
              style={{ width: "max-content", right: 0, height: 40 }}
              label="Upload Master DWH"
              iconPosition="startIcon"
              onClick={showPopUp2}
              buttonIcon={<UploadCloud />}
            />
          )}
        </Grid>
      </Grid>
      <div>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator,
          }}
          style={{ marginTop: 12 }}
        >
          <Tab label="ESQ" style={{ fontWeight: "bold", fontSize: 18 }} />
          <Tab label="DWH" style={{ fontWeight: "bold", fontSize: 18 }} />
        </Tabs>
        {selectedTab === 0 && (
          <>
            <TableMaster />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <TableDwh />
          </>
        )}
        <ModalPopUpUpload
          isOpen={uploadMaster}
          onClose={() => setUploadMaster(false)}
          onSuccesUpload={() => setUploadMaster(false)}
        />
        <ModalPopUpUploadDwh
          isOpen={uploadMaterDwh}
          onClose={() => setUploadMasterDwh(false)}
          onSuccesUpload={() => setUploadMasterDwh(false)}
        />
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
}
