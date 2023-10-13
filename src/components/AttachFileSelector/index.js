/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { ReactComponent as FileIcon } from "../../assets/icons/linear-red/paperclip.svg";

const useStyles = makeStyles({
  container: { 
    position: "relative",
    display: "flex"
  },
  uploadFile: {
    cursor: "pointer",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -10,
    color: "#DC241F",
  },
});
  
function AttachFileSelector({selectedFile, onChange, onDelete, title, refId = title, accept = ".doc, .docx, .xls, .xlxs, .xlsx, .pdf"}) {
  const classes = useStyles();
  return (
        
    <div className={classes.container}>
      {selectedFile ? (
        <div style={{ display: "flex", alignItems: "center", paddingRight: 30}}>
          <FileIcon height={15}/>
          <Typography
            style={{ fontSize: 13, color: "#DC241F", marginLeft: 5, wordBreak: "break-all"  }}
          >
            <b>{selectedFile.name}</b>
          </Typography>
        </div>
      ) : (
        <>
          <input
            id={refId}
            type="file"
            accept={accept}
            onChange={onChange}
            style={{
              width: "0.1px",
              height: "0.1px",
              opacity: 0,
              overflow: "hidden",
              zIndex: -1,
            }} />
          <label htmlFor={refId} className={classes.uploadFile}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FileIcon height={15}/>
              <Typography style={{ fontSize: 13, color: "#DC241F", marginLeft: 5, wordBreak: "break-all" }}>
                <b>{title}</b>
              </Typography>
            </div>
          </label>
        </>
      )}
      {selectedFile && (
        <IconButton
          className={classes.resetFile}
          onClick={onDelete}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}

AttachFileSelector.propTypes = {

};

export default AttachFileSelector;

