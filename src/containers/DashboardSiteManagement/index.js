import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import constants from '../../helpers/constants';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';

const useStyles = makeStyles({
    root: {
        padding: '30px 20px 20px 30px',
        '& .MuiBox-root': {
            padding: 0,
        },
    },
    rootContent: {
        padding: '0px 20px 20px 30px',
        '& .MuiBox-root': {
            padding: 0,
        },
    },
    rootMap: {
        position: 'relative',
        // top: -50,
        zIndex: 1,
    },
    titleContainer: {
        marginBottom: 15,
    },
    title: {
        fontFamily: 'Barlow',
        fontWeight: '500',
        fontSize: '36px',
        color: constants.color.dark,
    },

})

const SiteManagement = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <div className={classes.titleContainer}>
                    <Typography className={classes.title}>Site Management</Typography>
                </div>
            </div>
        </div>
    )
}

export default SiteManagement