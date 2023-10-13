/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Divider,
  Grid,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { ReactComponent as FileIcon } from "../../../../../assets/icons/general/paperclip.svg";
import ChkyButtons from "../../../../../components/chky/ChkyButtons";
import getMinioFile from "../../../../../helpers/getMinioFile";
import { Skeleton } from 'antd';

const useStyles = makeStyles({
  root: { padding: 20, borderRadius: 10, minHeight: 600, position: "relative" },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2 },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: 12,
  },
  tableCellTot: {
    borderBottom: "unset",
    fontSize: 13,
    fontWeight: 500,
  },
  documentLink: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
});

const RenderOfferingFile = ({ filePath }) => {
  const [dataOffering, setDataOffering] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  function limitString(string, count) {
    const result =
      string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  useEffect(() => {
    setIsLoading(true)
    const filterPath = filePath.filter((d) => d != null);
    try {
      if (filterPath.length > 0 && filterPath[0]) {
        getMinioFile(filterPath[0]).then((result) => {
          // console.log(">>>> try getMinio Offering ", JSON.stringify(result));
          setDataOffering(result);
          setIsLoading(false)
        });
      } else {
        setDataOffering(null);
        setIsLoading(false)
      }
    } catch (err) {
      setIsLoading(false)
      console.log(">>>> Error try getMinio", err);
    }
  }, []);

  return isLoading ? <Skeleton.Input style={{ width: 200 }} active /> : (
    <Link
      href={dataOffering === null ? "#" : dataOffering.fileUrl}
      target="_blank"
      style={{
        textDecoration: "none",
        fontSize: 13,
        color: "#DC241F",
        fontWeight: 400,
      }}
    >
      {dataOffering === null ? "N/A" : limitString(dataOffering.fileName, 50)}
    </Link>
  );
};
RenderOfferingFile.propTypes = {
  filePath: PropTypes.string.isRequired,
};

const idrCurrencyFormat = (value, delimiter) => {
  if (value === null) {
    return "Rp 0";
  } else {
    return `Rp ${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
  }
};

function isEmpty(obj) {
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

function Approver(props) {
  const { approver } = props;
  function renderBackColor(intialName) {
    if (intialName === "DH") {
      return "#88ADFF";
    }
    if (intialName === "TS") {
      return "#FFB443";
    }
    if (intialName === "BA") {
      return "#65D170";
    }
    if (intialName === "Y") {
      return "#FF6A6A";
    }
    return "#88ADFF";
  }

  function getInitialName(name) {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  }

  return (
    <div style={{ display: "flex" }}>
      {approver.map((item) => {
        if (item !== null) {
          return (
            <Avatar
              style={{
                backgroundColor: renderBackColor(getInitialName(item)),
                width: 32,
                height: 32,
                margin: 2.5,
                fontSize: 14,
              }}
            >
              {getInitialName(item)}
            </Avatar>
          );
        }
      })}
    </div>
  );
}

Approver.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  approver: PropTypes.array,
};

Approver.defaultProps = {
  approver: ["DH", "TS", "BA", "Y", "L"],
};

const matchRoleName = (value) => {
  if (value) {
    const result = value.toLowerCase().match(/acknowledge/g) || [];
    if (result.length) {
      return result[0];
    } else {
      return value;
    }
  }
};

function DetailInfoApprove(props) {
  const roleName = window.sessionStorage.getItem("roleName");
  const classes = useStyles();
  const { data, acknowledgeBtnHandler, loaderHandler } = props;

  return (
    <Paper className={classes.root}>
      <Typography style={{ fontSize: 24, marginBottom: 20 }}>
        Approval
      </Typography>
      <Typography style={{ fontSize: 15 }}>
        SPAPM telah menyetujui pengadaan dengan rincian sebagai berikut:
      </Typography>
      <Typography style={{ fontSize: 18, fontWeight: 500, marginTop: 12 }}>
        Biaya Sewa & Pengadaan
      </Typography>
      <Table size="small">
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>
            <Typography style={{ fontSize: 18, fontWeight: 500, marginTop: 12 }}>
              Biaya Sewa
            </Typography>
          </TableCell>
        </TableRow>
        {data.detailRent?.map((val,i)=>{
          return (
            <TableRow className={classes.tableRow} key={i}>
              <TableCell width="40%" className={classes.tableCell}>
                Tahun ke-{i+1}
              </TableCell>
              <TableCell className={classes.tableCell}>
                : {idrCurrencyFormat(val.yearlyRentCost, ".")}
              </TableCell>
            </TableRow>
          )
        })}
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCellTot}>
            Total Sewa
          </TableCell>
          <TableCell className={classes.tableCellTot}>
            : {isEmpty(data) ? "N/A" : idrCurrencyFormat(data.totalRent, ".")}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>
            <Typography style={{ fontSize: 18, fontWeight: 500, marginTop: 12 }}>
              Biaya Lain-lain
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>
            Biaya Listrik
          </TableCell>
          <TableCell className={classes.tableCell}>
            :{" "}
            {isEmpty(data)
              ? "N/A"
              : idrCurrencyFormat(data.yearlyElectricityCost, ".")}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>
            Telepon
          </TableCell>
          <TableCell className={classes.tableCell}>
            :{" "}
            {isEmpty(data)
              ? "N/A"
              : idrCurrencyFormat(data.yearlyTelephoneCost, ".")}
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell width="40%" className={classes.tableCell}>
            Service Charge
          </TableCell>
          <TableCell className={classes.tableCell}>
            :{" "}
            {isEmpty(data)
              ? "N/A"
              : idrCurrencyFormat(data.yearlyServiceCharge, ".")}
          </TableCell>
        </TableRow>
      </Table>

      <Divider style={{ marginTop: 10, marginBottom: 20 }} />

      <Grid container spacing={1}>
        <Grid item style={{ marginTop: 5 }}>
          <FileIcon />
        </Grid>
        <Grid item>
          <div className={classes.documentLink}>
            {isEmpty(data) || data.documents.length < 1 ? (
              <Typography style={{ color: "#DC241F", fontSize: 14 }}>
                N/A
              </Typography>
            ) : (
              <RenderOfferingFile filePath={data.documents} />
            )}
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={1} direction="column" style={{ marginTop: 33 }}>
        <Grid item>
          <Typography style={{ fontSize: 15, fontWeight: 600 }}>
            Approved By
          </Typography>
        </Grid>
        <Grid item>
          {isEmpty(data) ? (
            "N/A"
          ) : data.daNameList === null ? (
            "N/A"
          ) : (
            <Approver approver={data.daNameList} />
          )}
        </Grid>
      </Grid>

      {/* {matchRoleName(roleName) === "acknowledge" && (
        <Grid
          container
          justify="space-between"
          style={{ position: "absolute", bottom: 20, width: "92.5%" }}
        >
          <Grid item />
          <Grid item>
            <ChkyButtons
              style={{ textTransform: "capitalize" }}
              onClick={acknowledgeBtnHandler}
            >
              Acknowledge
            </ChkyButtons>
          </Grid>
        </Grid>
      )} */}
    </Paper>
  );
}
DetailInfoApprove.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  acknowledgeBtnHandler: PropTypes.func,
  loaderHandler: PropTypes.func,
};

DetailInfoApprove.defaultProps = {
  data: [],
  acknowledgeBtnHandler: () => {
    alert("Button Acknowledge Clicked");
  },
  loaderHandler: () => {
    console.log("Button Acknowledge Clicked");
  },
};

export default DetailInfoApprove;
