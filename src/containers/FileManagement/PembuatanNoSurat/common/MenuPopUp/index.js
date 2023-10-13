/* Third Party Import */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Typography,
  SvgIcon,
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreHoriz";

/* Internal Import */
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/images/trash.svg";

import { PrimaryHard } from "../../../../../assets/theme/colors";

const useStyles = makeStyles({
  iconButton: {
    "& .MuiSvgIcon-root": {
      fill: PrimaryHard,
    },
  },
  customMenu: {
    "& .MuiPopover-paper": {
      minWidth: "200px",
      borderRadius: "4px",
      boxShadow: "0px 6px 6px rgb(232 238 255 / 30%)",
      fontSize: "13px",
      fontWeight: "500px",
      "& .MuiSvgIcon-root": {
        fill: PrimaryHard,
      },
    },
  },
});

const MenuPopUp = ({ deleteHandler, editHandler, setCurrentId }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const list = [
    {
      text: "Edit",
      icon: <EditIcon />,
      action: () => {
        editHandler();
        handleCloseMenu();
      },
    },
    {
      text: "Delete",
      icon: <TrashIcon />,
      action: () => {
        deleteHandler();
        handleCloseMenu();
      },
    },
  ];

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget);
    // setCurrentId();
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  const id = Boolean(anchorEl);
  const open = id ? "simple-menu" : "";

  return (
    <div>
      <IconButton
        id="test123"
        className={classes.iconButton}
        onClick={handleOpenMenu}
        aria-describedby={id}
        aria-haspopup="true"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id={id}
        open={open}
        onClose={() => {
          handleCloseMenu();
        }}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        className={classes.customMenu}
      >
        {list &&
          list.map((item, index) => {
            return (
              <MenuItem onClick={item.action} key={index}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography>{item.text}</Typography>
                  </Grid>
                  <Grid item>{item.icon}</Grid>
                </Grid>
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default MenuPopUp;
