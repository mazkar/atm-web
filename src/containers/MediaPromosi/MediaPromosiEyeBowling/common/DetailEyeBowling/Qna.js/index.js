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
import { PrimaryHard } from "../../../../../../assets/theme/colors";
import PropTypes from "prop-types";
import createTheme from "@material-ui/core";

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
  },
  fieldValue: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "13px",
  },
  chipStatus: {
    padding: "5px 10px",
    borderRadius: "15px",
    width: "min-content",
    whiteSpace: "nowrap",
    margin: "10px 20px",
  },
});

function Qna({ dataFoto }) {
  const classes = UseStyles();
  return (
    <Grid
      container
      direction="row"
      wrap="noWrap"
      justifyContent="space-between"
    >
      <Grid item md={4} zeroMinWidth>
        <Grid container direction="column" style={{ marginLeft: 10 }}>
          <Grid item style={{ fontWeight: 600, fontSize: 15 }}>
            Question
          </Grid>
          <Grid
            item
            style={{
              fontWeight: 600,
              fontSize: 13,
              color: PrimaryHard,
              marginTop: 10,
            }}
          >
            {dataFoto.question ? dataFoto.question : " -"}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} zeroMinWidth>
        <TableContainer>
          <Table aria-label="table content" size="small">
            <TableBody>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ fontWeight: 600, fontSize: 15 }}
                >
                  Answer
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ color: PrimaryHard }}
                  className={classes.fieldValue}
                >
                  Keberadaan
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: PrimaryHard }}
                  className={classes.fieldTitle}
                >
                  : {dataFoto.keberadaan ? dataFoto.keberadaan : " -"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="left"
                  style={{ color: PrimaryHard }}
                  className={classes.fieldValue}
                >
                  Kondisi
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: PrimaryHard }}
                  className={classes.fieldTitle}
                >
                  : {dataFoto.kondisi ? dataFoto.kondisi : " -"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={2} zeroMinWidth></Grid>
    </Grid>
  );
}

Qna.PropTypes = {
  dataFoto: PropTypes.object.isRequired,
};

export default Qna;
