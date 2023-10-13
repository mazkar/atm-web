/* eslint-disable react/forbid-prop-types */
/* Third Party Import */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography, List, ListItem } from "@material-ui/core";

const useStyles = makeStyles({
  wrapperTitle: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#2B2F3C",
    padding: "20px",
  },
  title: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#2B2F3C",
  },
  subtitle: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#8D98B4",
  },
  wrapper: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3);",
    height: "100%",
  },
  customCheck: {
    "& .Mui-selected": {
      backgroundColor: "#FFF5F4",
    },
  },
});

const ListPagination = ({ listMenu, handleClick, selected }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography className={classes.wrapperTitle}>
        Jenis Configuration
      </Typography>

      <List
        component="nav"
        aria-label="list-pagination"
        className={classes.customCheck}
      >
        {listMenu.map((menu, index) => (
          <ListItem
            button
            selected={selected === index}
            onClick={() => handleClick(index)}
            key={menu.title}
            style={{ padding: "8px 20px" }}
            disableGutters
          >
            <div>
              <Typography className={classes.title}>{menu.title}</Typography>
              <Typography className={classes.subtitle}>
                {menu.subtitle}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ListPagination.propTypes = {
  listMenu: PropTypes.object,
  handleClick: PropTypes.func,
  selected: PropTypes.Number,
};
ListPagination.defaultProps = {
  listMenu: [
    {
      title: "Default Title",
      subtitle: "Default Subtitle",
    },
    {
      title: "Default Title - 2",
      subtitle: "Default Subtitle - 2",
    },
  ],
  handleClick: () => {
    console.log("handle click");
  },
  selected: 0,
};

export default ListPagination;
