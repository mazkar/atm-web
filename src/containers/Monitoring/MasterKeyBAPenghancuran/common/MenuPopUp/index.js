/* Third Party Import */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import AddOrder from "../PopUp/addOrder";
import RejectOrder from "../PopupReject/index";

/* Internal Import */
import { ReactComponent as EditIcon } from "../../../../../assets/images/arrow-right.svg";
import { ReactComponent as CheckIcon } from "../../../../../assets/images/checknocircle.svg";
import { ReactComponent as RejectIcon } from "../../../../../assets/images/xclose.svg";
import { ReactComponent as Remark } from "../../../../../assets/images/edithitam.svg";

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
  const [showOrder, setShowOrder] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const history = useHistory();
  const list = [
    {
      text: "Detail",
      icon: <EditIcon />,
      action: () => {
        handleCloseMenu();
        history.push("/monitoring/key-penghancuran/order/1");
      },
    },
    {
      text: "Accept",
      icon: <CheckIcon />,
      action: () => {
        setShowOrder(true);
        handleCloseMenu();
      },
    },
    {
      text: "Reject",
      icon: <RejectIcon />,
      action: () => {
        setShowReject(true);
        handleCloseMenu();
      },
    },
    {
      text: "Remark",
      icon: <Remark />,
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
                  // onClick={() => {
                  //   setShowOrder(true);
                  // }}
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
      <AddOrder showOrder={showOrder} unShowOrder={() => setShowOrder(false)} />
      <RejectOrder open={showReject} onClose={() => setShowReject(false)} />
    </div>
  );
};

export default MenuPopUp;
