import React from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import {
  Grid,
  TableContainer,
  TableRow,
  TableBody,
  Table,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import useTimestampConverter from "../../../../../../helpers/useTimestampConverter";
import TableChips from "../../../../../../components/Chips/TableChips";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

const UseStyles = makeStyles({
  fieldTitle: {
    fontFamily: "Barlow",
    fontWeight: 400,
    fontSize: "13px",
    whiteSpace: "nowrap",
  },
  fieldValue: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "13px",
    display: "flex",
    alignSelf: "flex-end",
  },
  chipStatus: {
    padding: "5px 10px",
    borderRadius: "15px",
    width: "min-content",
    whiteSpace: "nowrap",
    margin: "10px 20px",
  },
});

function ListEyeBowling({ dataFoto }) {
  const classes = UseStyles();

  //CHIP HANDLER

  function chipsHandler(type) {
    /*
      [props in table] : "color in chips component"
    */
    const condition = {
      done: "success",
      assigned: "info",
      onprogress: "warning",
      open: "purple",
      unprocessed: "error",
      overdue: "default",
    };

    return condition[type] ?? "default";
  }
  //END CHIP HANDLER

  return (
    <Grid
      container
      direction="row"
      wrap="noWrap"
      justifyContent="space-between"
    >
      <Grid item md={4} zeroMinWidth>
        <TableContainer>
          <Table aria-label="table content" size="small">
            <TableBody>
              <TableRow>
                <TableCell align="left" className={classes.fieldTitle}>
                  ATM ID
                </TableCell>
                <TableCell align="left" className={classes.fieldValue}>
                  : {dataFoto.atmId ? dataFoto.atmId : " -"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" className={classes.fieldTitle}>
                  Ticket ID
                </TableCell>
                <TableCell align="left" className={classes.fieldValue}>
                  : {dataFoto.userId ? dataFoto.userId : " -"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" className={classes.fieldTitle}>
                  Lokasi
                </TableCell>
                <TableCell align="left" className={classes.fieldValue}>
                  : {dataFoto.lokasi ? dataFoto.lokasi : "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={6} zeroMinWidth>
        <TableContainer>
          <Table aria-label="table content" size="small">
            <TableBody>
              <TableRow>
                <TableCell
                  align="left"
                  className={classes.fieldTitle}
                  valign="top"
                >
                  Vendor Name
                </TableCell>
                <TableCell
                  align="left"
                  className={classes.fieldValue}
                  valign="top"
                >
                  : {dataFoto.namaVendor ? dataFoto.namaVendor : "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" className={classes.fieldTitle}>
                  Tanggal
                </TableCell>
                <TableCell align="left" className={classes.fieldValue}>
                  :{" "}
                  {dataFoto.tanggal
                    ? useTimestampConverter(
                        dataFoto.tanggal / 1000,
                        "DD/MM/YYYY"
                      )
                    : "-"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" className={classes.fieldTitle}>
                  Vendor User
                </TableCell>
                <TableCell align="left" className={classes.fieldValue}>
                  : {dataFoto.userName ? dataFoto.userName : " -"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={2}>
        <div
          style={{
            textTransform: "none",
          }}
        >
          {dataFoto.status === 0 ? (
            <TableChips
              style={{
                padding: "3px 5px",
                width: "min-content",
                whiteSpace: "nowrap",
                fontSize: 12,
              }}
              label="Tidak Bisa Diproses"
              type={chipsHandler("unprocessed")}
            />
          ) : dataFoto.status === 1 ? (
            <TableChips
              style={{
                padding: "3px 5px",
                width: "min-content",
                whiteSpace: "nowrap",
                fontSize: 12,
              }}
              label="Done"
              type={chipsHandler("done")}
            />
          ) : dataFoto.status === 2 ? (
            <TableChips
              style={{
                padding: "3px 5px",
                width: "min-content",
                whiteSpace: "nowrap",
                fontSize: 12,
              }}
              label="Assign to vendor"
              type={chipsHandler("assigned")}
            />
          ) : dataFoto.status === 3 ? (
            <TableChips
              style={{
                padding: "3px 5px",
                width: "min-content",
                whiteSpace: "nowrap",
                fontSize: 12,
              }}
              label="On Progress"
              type={chipsHandler("onprogress")}
            />
          ) : dataFoto.status === 4 ? (
            <TableChips
              style={{
                padding: "3px 5px",
                width: "min-content",
                whiteSpace: "nowrap",
                fontSize: 12,
              }}
              label="Overdue"
              type={chipsHandler("default")}
            />
          ) : dataFoto.status === 5 ? (
            <TableChips
              style={{
                padding: "3px 5px",
                width: "min-content",
                whiteSpace: "nowrap",
                fontSize: 12,
              }}
              label="Open"
              type={chipsHandler("open")}
            />
          ) : null}
        </div>
      </Grid>
    </Grid>
  );
}

export default ListEyeBowling;
