import React, { useState, useEffect } from "react";
import { makeStyles, Paper, Button } from "@material-ui/core";
import { ChkyTablePagination } from "../../../../components";

const UseStyles = makeStyles({
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
});

//data dummy

const data = [
  {
    vendorName: "PT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
  {
    vendorName: "PT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
  {
    vendorName: "PT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
  {
    vendorName: "PT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
  {
    vendorName: "PT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
  {
    vendorName: "PT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
  {
    vendorName: "apT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
  {
    vendorName: "PT Ralina Shah Abadi",
    jmlOrderPajak: 10,
    sudahDikerjakan: 14,
    belumDikerjakan: 78,
    action: (
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
    ),
  },
];

const rowsPerPage = 10;


const TabelOverview = () => {
  
 
  //state
  // const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoadData, setIsLoadData] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  // const [dataRequest, setDataRequest] = useState(defaultDataHit);

  const classes = UseStyles();

  function loadDataHandler(loaderValue) {
    setIsLoadData(loaderValue);
  }

  const titleTable = [
    "Vendor Name",
    "JML Order Pajak",
    "Sudah Di Kerjakan",
    "Belum Dikerjakan",
    "",
  ];
  const valueType = ["string", "string", "string", "string", "node"];
  const isSort = [true, true, true, true, false];
  const columnNameVar = [
    "vendorName",
    "JmlOrderPajak",
    "SudahDikerjakan",
    "BelumDikerjakan",
    "",
  ];

  // HANDLER
  // function handleChangePage(newPage) {
  //   // setDataRequest({
  //   //   ...dataRequest,
  //   //   pageNumber: newPage,
  //   // });
  // }

  // function handleSort(property) {
  //   return function actualFn(e) {
  //     const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
  //     const sortByNewVal = columnNameVar[titleTable.indexOf(property)];
  //     const sortType = isActiveAndAsc ? "DESC" : "ASC";
  //     setOrderDirection(sortType);
  //     setSortBy(property);
  //     // setOrderBy(sortByNewVal);
  //     setDataRequest({
  //       ...dataRequest,
  //       sortType,
  //       sortBy: sortByNewVal,
  //     });
  //   };
  // }

  

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <ChkyTablePagination
          data={data}
          fields={titleTable}
          valueType={valueType}
          // changePage={handleChangePage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          isLoadData={isLoadData}
          isSort={isSort}
          // handleSort={handleSort}
        />
      </Paper>
    </div>
  );
};

export default TabelOverview;
