import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
    borderRadius: 10,
    padding: 10,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  //   table: {
  //     minWidth: 650,
  //   },
});

const TableComponent = (props) => {
  const classes = useStyles();
  const { data, fields } = props;
  console.log(data);

  const dataDummy = [
    {
      dashboard: "Sewa Gedung",
      category: "-",
      slCode: "3928328394",
      divisi: "Devision Name",
      beginningBalance: "Rp 35.859",
      usage: "Rp 35.859",
      adjustment: "Rp 35.859",
      endingBalance: "Rp 35.859",
      action: "Adjustment",
    },
  ];

  return (
    <Paper className={classes.root}>
      <Table
        stickyHeader
        className={classes.table}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            {fields.map((field, i) => {
              return (
                <TableCell align={i === 0 ? "left" : "center"} key={i}>
                  {field.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {dataDummy.map((item, i) => (
            <TableRow key={i}>
              {Object.keys(item).map((object, j) => {
                return <TableCell>{Object.values(item)[j]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableComponent;
