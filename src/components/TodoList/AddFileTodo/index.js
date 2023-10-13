/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import { Typography } from '@material-ui/core';

// eslint-disable-next-line react/prop-types
function AddFileTodo({onChange}) {
  return (
    <div style={{width: "max-content"}}>
      <input
        id="add-attachment"
        type="file"
        accept=".doc, .docx, .xls, .xlxs, .xlsx, .pdf"
        onChange={onChange}
        style={{
          width: "0.1px",
          height: "0.1px",
          opacity: 0,
          overflow: "hidden",
          zIndex: -1,
        }} />
      <label htmlFor="add-attachment" style={{cursor: "pointer"}}>
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          width: "max-content",
          height: 40,
          boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
          backgroundColor: '#FFFF',
          border: '1px solid #DC241F',
          color: '#DC241F',
          textTransform:'capitalize',
          borderRadius: 10,
          paddingRight: 10,
          paddingLeft: 10}}>
          <AddIcon style={{color: "#DC241F", height: 18}} />
          <Typography style={{ fontSize: 13, color: "#DC241F", marginLeft: 5, wordBreak: "break-all" }}>
            <b>Add File</b>
          </Typography>
        </div>
      </label>
    </div>
  );
}

export default AddFileTodo;