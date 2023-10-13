/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  Grid,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Row, Col, Input, DatePicker, Select } from "antd";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import { PrimaryHard } from "../../../assets/theme/colors";
import CardTask from "./widget/CardTask";
import Filter from "./widget/FilterProgress/index";
import TableTimeline from "./widget/TableTimeline";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import ModalAddTimeline from "./widget/Modal/ModalAdd";
import constants from "../../../helpers/constants";

const UseStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 10,
    padding: "0px 40px 0px 40px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
    display: "flex",
    justifyContent: "space-between",
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
  paper: {
    // position: "absolute",
    backgroundColor: constants.color.white,
    width: 780,
    // height: 423,
    borderRadius: 10,
    padding: 30,
    paddingLeft: 70,
    paddingBottom: 50,
  },
  closeIcon: {
    color: constants.color.primaryHard,
  },
});

const titleTableNew = [
  // { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "projectId",
    numeric: false,
    disablePadding: false,
    label: "No Id",
    typeColumn: "info",
  },
  {
    id: "Judul Project",
    numeric: false,
    disablePadding: false,
    label: "Tgl Submit",
    typeColumn: "info",
  },
  {
    id: "startDate",
    numeric: false,
    disablePadding: false,
    label: "Tanggal Mulai",
    typeColumn: "info",
  },
  {
    id: "Tanggal Selesai",
    numeric: false,
    disablePadding: false,
    label: "endDate",
    typeColumn: "info",
  },
  {
    id: "pic",
    numeric: false,
    disablePadding: false,
    label: "PIC",
    typeColumn: "info",
  },
  {
    id: "Status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    typeColumn: "info",
  },
  {
    id: "readyDate",
    numeric: false,
    disablePadding: false,
    label: "Target Online",
    typeColumn: "info",
  },
  {
    id: "activationDate",
    numeric: false,
    disablePadding: false,
    label: "Tgl Aktivasi",
    typeColumn: "info",
  },
  {
    id: "notifDate",
    numeric: false,
    disablePadding: false,
    label: "Tgl Notif",
    typeColumn: "info",
  },
  {
    id: "sla",
    numeric: false,
    disablePadding: false,
    label: "SLA",
    typeColumn: "info",
  },
  {
    id: "kebutuhan",
    numeric: false,
    disablePadding: false,
    label: "Kebutuhan",
    typeColumn: "checklist",
  },
  {
    id: "parameter",
    numeric: false,
    disablePadding: false,
    label: "Parameter",
    typeColumn: "checklist",
  },
  {
    id: "jarkom",
    numeric: false,
    disablePadding: false,
    label: "Jarkom",
    typeColumn: "checklist",
  },
  {
    id: "mesin",
    numeric: false,
    disablePadding: false,
    label: "Mesin",
    typeColumn: "checklist",
  },
  {
    id: "booth",
    numeric: false,
    disablePadding: false,
    label: "Booth",
    typeColumn: "checklist",
  },
  {
    id: "keamanan",
    numeric: false,
    disablePadding: false,
    label: "Keamanan",
    typeColumn: "checklist",
  },
  {
    id: "aktivasi",
    numeric: false,
    disablePadding: false,
    label: "Aktivasi",
    typeColumn: "checklist",
  },
  {
    id: "signage",
    numeric: false,
    disablePadding: false,
    label: "Signage",
    typeColumn: "checklist",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    typeColumn: "info",
  },
  { id: "action", numeric: false, disablePadding: false, label: "" },
];

export default function timelineProject() {
  // const [valueFilter, setValueFilter] = useState(titleTableNew);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);

  const showModalAdd = () => {
    setIsModalAddVisible(true);
  };

  const showModalEdit = (dp) => {
    setIsModalEditVisible(true);
  };

  const hideModalEdit = () => {
    setIsModalEditVisible(false);
  };

  const ddlStatus = [
    {
      id: 0,
      status: "Open",
    },
    {
      id: 1,
      status: "To Do",
    },
    {
      id: 2,
      status: "Doing",
    },
    {
      id: 3,
      status: "Done",
    },
  ];
  const ddlPic = [
    {
      id: 1,
      status: "DW",
    },
  ];

  const classes = UseStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.titleContainer}>
        <Grid item>
          <Typography className={classes.title}>Timeline Project</Typography>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            style={{ width: "max-content", right: 0, height: 40 }}
            label="Add Timeline"
            iconPosition="endIcon"
            onClick={showModalAdd}
            // buttonIcon={null}
          />
        </Grid>
      </Grid>
      <div>
        <CardTask />

        <TableTimeline />
      </div>
      <ModalAddTimeline
        isOpen={isModalAddVisible}
        onClose={() => setIsModalAddVisible(false)}
        onSuccesUpload={() => setIsModalAddVisible(false)}
      />
    </div>
  );
}
