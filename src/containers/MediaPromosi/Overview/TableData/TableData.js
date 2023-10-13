import React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TableSortLabel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Pagination from "@material-ui/lab/Pagination";
import { RedHard } from "../../../../assets/theme/colors";
import { PrimaryHard } from "../../../../assets/theme/colors";

const UseStyle = makeStyles({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    marginTop: 30,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#DC241F",
      fontWeight: 500,
    },
  },

  title: {
    fontWeight: 600,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 13,
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  footTable: {
    backgroundColor: "gray",
  },
  pagination: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chipStatus: {
    padding: "5px 10px",
    borderRadius: "15px",
    width: "min-content",
    whiteSpace: "nowrap",
  },
});

function TableData() {
  const classes = UseStyle();

  const data = [
    {
      vendorName: "PT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "done",
    },
    {
      vendorName: "PT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "open",
    },
    {
      vendorName: "PT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "done",
    },
    {
      vendorName: "PT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "on progress",
    },
    {
      vendorName: "PT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "overdue",
    },
    {
      vendorName: "PT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "on progress",
    },
    {
      vendorName: "apT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "overdue",
    },
    {
      vendorName: "PT Ralina Shah Abadi",
      jmlOrderPajak: 10,
      sudahDikerjakan: 14,
      belumDikerjakan: 78,
      status: "on progress",
    },
  ];

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <TableContainer>
          <Table className={classes.table} aria-label="Media promosi">
            <TableHead checkboxselection="true">
              <TableRow>
                <TableCell sortDirection="desc">
                  <TableSortLabel
                    IconComponent={() => (
                      <ExpandMoreIcon style={{ color: RedHard }} />
                    )}
                  >
                    <Typography variant="subtitle2">Vendor Name</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    IconComponent={() => (
                      <ExpandMoreIcon style={{ color: RedHard }} />
                    )}
                  >
                    <Typography variant="subtitle2">JML Order Pajak</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    IconComponent={() => (
                      <ExpandMoreIcon style={{ color: RedHard }} />
                    )}
                  >
                    <Typography variant="subtitle2">
                      Sudah Dikerjakan
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    IconComponent={() => (
                      <ExpandMoreIcon style={{ color: RedHard }} />
                    )}
                  >
                    <Typography variant="subtitle2">
                      Belum Dikerjakan
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    IconComponent={() => (
                      <ExpandMoreIcon style={{ color: RedHard }} />
                    )}
                  >
                    <Typography variant="subtitle2" align="center">
                      Status
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    sortDirection="desc"
                    active="true"
                    component="th"
                    scope="row"
                    style={{ padding: 10 }}
                  >
                    {row.vendorName}
                  </TableCell>
                  <TableCell style={{ padding: 10 }} align="center">
                    {row.jmlOrderPajak}
                  </TableCell>
                  <TableCell style={{ padding: 10 }} align="center">
                    {row.sudahDikerjakan}
                  </TableCell>
                  <TableCell style={{ padding: 10 }} align="center">
                    {row.belumDikerjakan}
                  </TableCell>
                  <TableCell style={{ padding: 10 }} align="center">
                    <div className={classes.col}>
                      {row.status === "overdue" ? (
                        <div
                          style={{
                            textTransform: "none",
                            background: "#F6FEFF",
                            color: "#13BED6",
                            border: "1px solid #13BED6",
                          }}
                          className={classes.chipStatus}
                        >
                          Overdue
                        </div>
                      ) : row.status === "done" ? (
                        <div
                          style={{
                            textTransform: "none",
                            background: "#DEFFE1",
                            color: "#65D170",
                            border: "1px solid #65D170",
                          }}
                          className={classes.chipStatus}
                        >
                          Done
                        </div>
                      ) : row.status === "open" ? (
                        <div
                          style={{
                            textTransform: "none",
                            background: "#F3E3FF",
                            color: "#CB88FF",
                            border: "1px solid #CB88FF",
                          }}
                          className={classes.chipStatus}
                        >
                          Open
                        </div>
                      ) : (
                        <div
                          style={{
                            textTransform: "none",
                            background: "#FFF9F0",
                            color: "#FFB443",
                            border: "1px solid #FFB443",
                          }}
                          className={classes.chipStatus}
                        >
                          on progress
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell style={{ padding: 10 }}>
                    <Button
                      style={{
                        textTransform: "capitalize",
                      }}
                      // onClick={() => {
                      //   handleDialogOpen();
                      // }}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div className={classes.pagination}>
        <Typography style={{ opacity: 0.6, color: "grey" }}>
          Showing 1-10 of 2.21
        </Typography>
        <Pagination
          className={classes.ul}
          count={10}
          style={{
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "10px",
          }}
          size="medium"
          color="standard"
          shape="rounded"
          defaultPage={1}
        />
      </div>
    </div>
  );
}

export default TableData;
