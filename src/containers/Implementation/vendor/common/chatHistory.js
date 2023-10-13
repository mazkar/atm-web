import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";


const approvalStyles = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      padding: "0px 0px",
      alignItems: "center",
      zIndex: 2,
      width: '90%'
    },
    numbering:{
        padding: '10px 10px 10px 40px',
        position: 'relative',
        width: '100%',
        '&::after': {
          content: '""',
          position: 'absolute',
          width: 25,
          height: 25,
          left: 0,
          backgroundColor: '#FF6A6A',
          border: '3px solid #FFFF',
          top: 10,
          borderRadius: '50%',
          zIndex: 2,
          boxShadow: '0px 4px 8px 2px rgba(188, 200, 231, 0.3)',
        }
    },
});

const AvatarKebutuhan = (props) => {
    const classes = approvalStyles();
    const { name, date, comment, showName } = props;
    
    return (
      <div className={classes.root}>
          <div className={classes.numbering}>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                }}
            >
            <Grid container direction='row'>
                {showName ? <Typography style={{ fontWeight: 600, fontFamily: 'Barlow', marginRight: 10}}>
                    {name}
                </Typography> : null}
                <Typography style={{ fontWeight: 400, fontFamily: 'Barlow', color: '#BCC8E7'}}>
                    {date}
                </Typography>
            </Grid>
            <Typography style={{ fontWeight: 400, fontFamily: 'Barlow'}}>
                {comment}
            </Typography>
            </div>
          </div>
      </div>
    );
};

AvatarKebutuhan.propTypes = {
    name: PropTypes.string,
    date: PropTypes.string,
    comment: PropTypes.string,
};
  
AvatarKebutuhan.defaultProps = {
    name: "Nama Lengkap",
    date: "Change Due Date",
    comment: "N",
};

export default AvatarKebutuhan;