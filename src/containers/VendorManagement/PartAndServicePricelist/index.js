/* eslint-disable react/jsx-no-bind */

/* Third Party Import */
import React, {useState, useRef} from 'react';
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, IconButton} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";

/* Internal Import */
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as FolderIcon } from "../../../assets/icons/linear-red/folder.svg";
import { ReactComponent as UploadIcon } from "../../../assets/icons/linear-red/upload.svg";
import {
  PrimaryHard,
} from "../../../assets/theme/colors";
import TabsComponent from "./common/Tabs";
import CreateForm from "./common/AddNewPricelistPopUp";
import EditForm from "./common/EditPricelistPopUp";
import DeletePopUp from "../../../components/Alert/Warning";
import SuccessPopUp from "../../../components/Alert/Success";
import PartPanel from "./common/Tabs/PartPanel";
import ServicePanel from "./common/Tabs/ServicePanel";
import {exportPricelistPart, exportPricelistService, uploadExcelPricelistPart, uploadExcelPricelistService} from "../ApiServices";
import ModalLoader from "../../../components/ModalLoader";

/* STYLING */
const useStyles = makeStyles({
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
  iconButton: {
    '& .MuiSvgIcon-root': {
      fill: PrimaryHard
    }
  }
});

const PartAndServicePricelist = () => {
  const classes = useStyles();
  const child = useRef();
  /* STATE */
  const [dialog, setDialog] = useState({
    create: false,
  });
  const [tabs, setTabs] = useState(0);
  const [successTextAlert, setSuccessTextAlert] = useState('');
  const [isLoading, setLoading] = useState(false);

  /* METHODS */
  function handleOpenDialog(key){
    setDialog((prevValue) => ({
      ...prevValue,
      [key]: true
    }));
  }

  function handleCloseDialog(key){
    setDialog((prevValue) => ({
      ...prevValue,
      [key]: false
    }));
  }

  const handleChangeTabs = (event, value) => {
    console.log(value);
    setTabs(value);
  };

  async function handleDelete(){
    const text = 'Delete Berhasil Dilakukan';
    await handleCloseDialog('delete');
    setSuccessTextAlert(text);
  }

  const handleExport = async () => {
    if(tabs === 0){
      const res = await exportPricelistPart();
      console.log(res);
    }
    if(tabs === 1){
      const res = await exportPricelistService();
      console.log(res);
    }
  };

  const handleClickUpload = () => {
    document.getElementById("uploadFile").click();
  };

  const handleUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    if(tabs === 0){
      const res = await uploadExcelPricelistPart(formData);
      console.log(res);
    }
    if(tabs === 1){
      const res = await uploadExcelPricelistService(formData);
      console.log(res);
    }
    setLoading(false);
  };

  /* Fetch data from part panel component using forwardRef and useImperativeHandle */
  const refresh = () => {
    const panelRef = child.current;
    if (panelRef && tabs === 0) {
      const {handleRefreshPart} = panelRef;
      handleRefreshPart();
    }
    if (panelRef && tabs === 1){
      const {handleRefreshService} = panelRef;
      handleRefreshService();
    }
  };

  /*
    STATIC DATA TABS
    Variable "tabsData" adalah data static yang berisikan header tabs dan body tabs,
    data ini akan dilooping dalam reusable component --> "TabsComponent"
  */
  const tabsData = [
    {
      header: 'Part',
      component: <PartPanel currentTabs={tabs} ref={child} />
    },
    {
      header: 'Service',
      component: <ServicePanel currentTabs={tabs} ref={child} />
    },
  ];

  return (
    <div className={classes.root} >
      <Grid container justify="space-between" alignItems="center" className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>
            Part & Service Pricelist
          </Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            className={classes.paramButton}
            style={{
              width: "max-content",
              background: "#FFFFFF",
              border: "1px solid #DC241F",
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Export"
            iconPosition="endIcon"
            buttonIcon={<FolderIcon />}
            onClick={()=>handleExport()}
          />
          <MuiIconLabelButton
            className={classes.paramButton}
            style={{
              width: "max-content",
              background: "#FFFFFF",
              border: "1px solid #DC241F",
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="Upload"
            iconPosition="endIcon"
            buttonIcon={<UploadIcon />}
            onClick={()=>handleClickUpload()}
          />
          <MuiIconLabelButton
            style={{
              width: "max-content",
              right: 0,
              height: 40,
              boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
              borderRadius: "6px",
            }}
            label="New Pricelist"
            iconPosition="endIcon"
            buttonIcon={<AddIcon />}
            onClick={()=>{handleOpenDialog('create');}}
          />
        </Grid>
      </Grid>
      <TabsComponent data={tabsData} currentTabs={tabs} onChange={handleChangeTabs} />
      {
        dialog.create &&
        <CreateForm isOpen={dialog.create} onClose={() => {handleCloseDialog('create');}} currentTabs={tabs} refresh={refresh} />
      }
      <EditForm isOpen={dialog.edit} onClose={() => {handleCloseDialog('edit');}} />
      <DeletePopUp
        isOpen={dialog.delete}
        title="Anda yakin ingin Melakukan Delete ?"
        subTitle="Anda tidak dapat membatalkan tindakan ini"
        onClose={() => {handleCloseDialog('delete');}}
        onConfirm={() => {handleDelete();}}
      />
      <SuccessPopUp isOpen={dialog.success} onClose={() => {handleCloseDialog('success');}} title={successTextAlert}  />
      <input
        id="uploadFile"
        type="file"
        accept=".xlsx, .xls"
        style={{ display: "none" }}
        onChange={(e) => {
          handleUpload(e);
        }}
      />
      <ModalLoader isOpen={isLoading} />
      {/* <MenuPopUp onClose={() => {handleCloseMenu();}} anchorEl={anchorMenu}  /> */}
    </div>
  );
};

export default PartAndServicePricelist;
