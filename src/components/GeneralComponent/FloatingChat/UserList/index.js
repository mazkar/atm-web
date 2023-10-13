/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { InputBase, Typography } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { get, ref } from 'firebase/database';
import { makeStyles } from '@material-ui/styles';
import { chatUsers } from "../dummyData";
import ItemUser from "../ItemUser";
import { db } from '../../../../helpers/firebase/config';
import * as COLORS from '../../../../assets/theme/colors';

const useStyles = makeStyles({
  inputBase: {
    padding: 10,
    width: "100%",
    backgroundColor: COLORS.White,
    border: "1px solid #BCC8E7",
    borderRadius: 8,
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10,
    color: "#BCC8E7"
  },
  chatTitleGroup: {
    fontWeight: 500,
    fontSize: 18,
    color: COLORS.GrayMedium,
    paddingTop: 5,
    paddingBottom: 15
  },
  userListContainer: {
    maxHeight: 400,  
    overflowY: "auto"
  },
});

function UserList({listUsers, handleSearch, onSelected }) {
  // console.log("+++ listUsers",listUsers);
  const classes = useStyles();
  return (
    <>
      <div>
        <InputBase
          autoFocus
          className={classes.inputBase}
          placeholder="Search..."
          endAdornment={<SearchIcon />}
          onChange={(e)=>handleSearch(e.target.value)}
        />
      </div>
      <div className={classes.userListContainer}>
        <Typography className={classes.chatTitleGroup}>CIMB Niaga</Typography>
        {listUsers.map((item) => {
          if (item.type === "cimb") {
            return <ItemUser data={item} onSelect={onSelected} />;
          }
        })}

        <Typography className={classes.chatTitleGroup}>Vendor</Typography>
        {listUsers.map((item) => {
          if (item.type === "vendor") {
            return <ItemUser data={item} onSelect={onSelected} />;
          }
        })}
      </div>
    </>
  );
}

export default UserList;