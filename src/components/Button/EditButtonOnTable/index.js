import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "antd";

const useStyles = makeStyles(theme => ({
    textStyle: {
        color: "#DC241F",
        textAlign: "center",
    },
}));

const EditButtonOnTable = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const {
        title,
        setAction
    } = props;

    function onCLickEdit() {
        setAction(true)
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Link className={classes.textStyle} onClick={onCLickEdit}>{title}</Link>
        </div>
    )
}

export default EditButtonOnTable

