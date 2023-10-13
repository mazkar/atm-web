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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";

const UseStyles = makeStyles({
  iconButton: {
    "& .MuiSvgIcon-root": {
      fill: PrimaryHard,
    },
  },
  customMenu: {
    "& .MuiPopover-paper": {
      minWidth: "140px",
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

function MenuPopUp({
  itemId,
  editHandler,
  deleteHandler,
  detailHandler,
  vendorId,
}) {
  const classes = UseStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const list = [
    {
      text: "Detail",
      icon: <VisibilityIcon />,
      action: () => {
        detailHandler("detail", true, itemId);
      },
    },
    {
      text: "Edit",
      icon: <EditIcon />,
      action: () => {
        editHandler("edit", true, itemId, vendorId);
      },
    },
    {
      text: "Delete",
      icon: <DeleteIcon />,
      action: () => {
        deleteHandler("delete", true, itemId);
      },
    },
  ];

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget);
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
        keepMounted
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
}

MenuPopUp.propTypes = {
  list: PropTypes.array.isRequired,
};

export default MenuPopUp;
