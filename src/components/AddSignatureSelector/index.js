/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { PlusOutlined } from "@ant-design/icons";
import MuiIconLabelButton from '../Button/MuiIconLabelButton';

const useStyles = makeStyles({
  container: { 
    width: "100%",
    position: "relative",
    background: "#F4F7FB",
    height: 100,
    borderRadius: 4
  },
  containerImg:{ 
    position: "relative", 
    width: "100%",
    height: "100%", 
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  uploadFile: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height:" 100%",
  },
  containerInput:{ 
    width: "fit-content",
    height: 40, 
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 10px",
    background: "#DC241F",
    color: "#FFF",
  },
  resetFile: {
    position: "absolute",
    top: -10,
    right: -10,
    color: "#DC241F",
  },
});
  
function AddSignatureSelector({selectedImage, onChange, onDelete, title = "Add Signature", refId = title, accept="image/*"}) {
  const classes = useStyles();
  return (
        
    <div className={classes.container}>
      {selectedImage  !== "" ? (
        <div className={classes.containerImg}>
          <img src={URL.createObjectURL(selectedImage)} style={{height: "inherit",width: "inherit"}} alt="img"/>
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
              position: "absolute",
              zIndex: -1,
            }} />
          <label htmlFor={refId} className={classes.uploadFile}>
            <div className={classes.containerInput}>
              <PlusOutlined />
              <Typography style={{marginLeft: 10, fontWeight: 500, fontSize: 15}}>{title}</Typography>
            </div>
          </label>
        </>
      )}
      {selectedImage !== "" && (
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

AddSignatureSelector.propTypes = {

};

export default AddSignatureSelector;

