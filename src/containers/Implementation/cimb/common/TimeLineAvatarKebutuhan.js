import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";


const approvalStyles = makeStyles({
    root: {
      display: "flex",
      padding: "15px 0px",
      alignItems: "center",
      zIndex: 2,
      maxHeight: 550,
    },
    avatar: {
      width: 40,
      height: 40,
      display: "flex",
      "& > *": {
        margin: 5,
      },
      fontSize: 18,
    },
});

const TimeLineAvatarKebutuhan = (props) => {
    const classes = approvalStyles();
    const { name, message, initial, date, time } = props;
    function renderBackColor(intialName) {
      if (intialName === "GF") {
        return "#F19D1F";
      }
      if (intialName === "AS") {
        return "#FB6388";
      }
      if (intialName === "TA") {
        return "#8286FF";
      }
      return "#F19D1F";
    }
    return (
      <div className={classes.root}>
            <Avatar
                style={{ backgroundColor: renderBackColor(initial), zIndex: 2 }}
                className={classes.avatar}
            >
                {initial}
            </Avatar>
            <div
                style={{
                    marginLeft: 12,
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    width: '86%'
                }}
            >
              <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
              >
                  <Typography style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Barlow'}}>
                    {name}
                  </Typography>
                  <Typography style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Barlow'}}>
                    {date}
                  </Typography>
              </div>

              <div
                style={{
                    paddingTop: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
              >
                <Typography style={{ fontSize: 12, fontWeight: 400, fontFamily: 'Barlow', color: '#8D98B4'}}>
                    {message}
                </Typography>
                <Typography style={{ fontSize: 12, fontWeight: 400, fontFamily: 'Barlow', color: '#8D98B4'}}>
                    {time}
                </Typography>
              </div>
              
            </div>
      </div>
    );
};

TimeLineAvatarKebutuhan.propTypes = {
    name: PropTypes.string,
    message: PropTypes.string,
    initial: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
};
  
TimeLineAvatarKebutuhan.defaultProps = {
    name: "Nama Lengkap",
    message: "Change Due Date",
    initial: "N",
    date: "-",
    time: "-",
};

export default TimeLineAvatarKebutuhan;