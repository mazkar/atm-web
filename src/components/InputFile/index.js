/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Grid } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";
import { ReactComponent as UploadIcon } from "../../assets/icons/linear-red/upload.svg";

const useStyles = makeStyles({
  uploadFile: {
    padding: 7,
    border: '1px solid #BCC8E7',
    borderRadius: 6,
    height: 40,
    position: "relative",
    paddingRight: 55,
  },
  placeholderContainer:{
    overflow: "auto",
    whiteSpace: "nowrap", 
    "&::-webkit-scrollbar": {
      width: 1
    }
  },
  placeholder:{ 
    fontSize: 13, 
    color: "#8D98B4", 
    marginLeft: 5, 
    fontWeight: 400, 
    display: "inline-block"
  },
  resetFile: {
    position: "absolute",
    top: 0,
    right: 25,
    color: "#374062",
  },
});
  
function AttachFileSelector({selectedFile, onChange, onDelete, placeholder = "Choose file", refId = placeholder, accept = ".doc, .docx, .xls, .xlxs, .xlsx, .pdf"}) {
  const classes = useStyles();
  return (
        
    <div style={{position: "relative", width: "100%"}}>
      <input
        id={refId}
        type="file"
        accept={accept}
        onChange={onChange}
        style={{display: "none"}} />
      <label htmlFor={refId} style={{cursor: "pointer"}}>
        <Grid container direction='row' justifyContent='space-between' alignItems='center' className={classes.uploadFile}>
          <Grid item className={classes.placeholderContainer}>
            <Typography className={classes.placeholder}>
              {selectedFile? selectedFile.name : placeholder}
            </Typography>
          </Grid>
          <div style={{position: "absolute", top: 10, right: 10}}>
            <UploadIcon height={15}/>
          </div>
        </Grid>
      </label>
      {selectedFile && (
        <IconButton
          className={classes.resetFile}
          onClick={onDelete}
        >
          <ClearIcon style={{fontSize: 15}}/>
        </IconButton>
      )}
    </div>
  );
}

AttachFileSelector.propTypes = {

};

export default AttachFileSelector;

