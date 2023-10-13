/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  itemUserList: {
    marginBottom: 15,
    cursor: "pointer"
  },
  itemUser: {
    fontWeight: 500,
    fontSize: 14,
    color: "#727C98"
  },
  counterUnread: {
    fontWeight: 500,
    fontSize: 8,
    color: "#FFFFFF",
    background: "#DC241F",
    borderRadius: 50,
    padding: "3px 6px"
  },
  itemCompany: {
    color: "#A5B4DA",
    fontWeight: 500,
    fontSize: 10,
  }
});

const ItemUser = ({ data, onSelect }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.itemUserList}
      onClick={() => onSelect(data)}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <AccountCircleIcon
                style={{ height: 25, width: 25, color: "#727C98" }}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.itemUser}>
                {data.fullname}
              </Typography>
              {data.type === "vendor" && (
                <Typography className={classes.itemCompany}>
                  {data.company}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {data.unreadMessages > 0 && (
            <Typography className={classes.counterUnread}>
              {data.unreadMessages}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

ItemUser.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ItemUser;
