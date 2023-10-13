/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Filter from "../Filter";
import TablePagination from "../../../../../components/chky/ChkyTablePagination";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import { Background } from "devextreme-react/range-selector";
import constants from "../../../../../helpers/constants";
import LoadingView from "../../../../../components/Loading/LoadingView";

const titleTableNew = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "atmId",
    numeric: false,
    disablePadding: false,
    label: "ATM ID",
    typeColumn: "info",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Nama Lokasi",
    typeColumn: "info",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Alamat",
    typeColumn: "info",
  },
  {
    id: "area",
    numeric: false,
    disablePadding: false,
    label: "Area",
    typeColumn: "info",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "City",
    typeColumn: "info",
  },
  {
    id: "latlong",
    numeric: false,
    disablePadding: false,
    label: "Lat-Long",
    typeColumn: "info",
  },

  {
    id: "machineId",
    numeric: false,
    disablePadding: false,
    label: "ID Mesin",
    typeColumn: "info",
  },
  { id: "action", numeric: false, disablePadding: false, label: "" },
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
    id: "security",
    numeric: false,
    disablePadding: false,
    label: "Keamanan",
    typeColumn: "checklist",
  },
  {
    id: "activation",
    numeric: false,
    disablePadding: false,
    label: "Aktivasi",
    typeColumn: "checklist",
  },
  {
    id: "termintaion",
    numeric: false,
    disablePadding: false,
    label: "Terminasi",
    typeColumn: "checklist",
  },
  {
    id: "signage",
    numeric: false,
    disablePadding: false,
    label: "Signage",
    typeColumn: "checklist",
  },
];

const titleTable = [
  "ATM ID",
  "Nama Lokasi",
  "Alamat",
  "Area",
  "City",
  "Lat - Long",

  "ID Mesin",
  "",
];
const valueType = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",

  "child",
];
const isSort = [true, true, true, true, true, true, true, true];
const columnNameVar = [
  "atmId",
  "location",
  "address",
  "area",
  "city",
  "latlong",

  "machineId",
];

export default function TableDocNew() {
  const [valueFilter, setValueFilter] = useState(titleTableNew);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const navigateToDetail = (atmId) => {
    console.log(atmId, "id parsing");
    history.push(`/file-management/doc-invoice/detail/${atmId}`);
  };

  const [data, setData] = useState([]);

  const [dataFilter, setDataFilter] = useState(null);
  const [resetPageCounter, setResetPageCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // <--- init default currentPage
  const [orderBy, setOrderBy] = useState("atmId");

  const [orderDirection, setOrderDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState("atmId");

  // INIT TABLE
  const defaultType = "ASC";
  const defaultColumn = "atmId";
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const rowsPerPage = 10; // <--- init default rowsPerPage

  // INIT DATA REQUEST
  const defaultDataHit = {
    sortType: defaultType,
    sortBy: defaultColumn,
    pageNumber: 0,
    dataPerPage: rowsPerPage,
    types: "New Location",
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  async function getDataTableNew() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `${constants.FILE_MANAGEMENT_SERVICE}/docInvoiceFilter`,
        { ...dataRequest, ...(dataFilter && dataFilter) },
        configNew
      );
      setData(
        result.data?.content.map((item) => ({
          atmId: item.atmId,
          location: item.location,
          address: item.address,
          area: item.area,
          city: item.city,
          latlong: `${item.latitude} - ${item.longitude}`,

          machineId: item.machineId,
          Action: (
            <>
              <IconButton
                id="test123"
                style={{
                  color: PrimaryHard,
                  fontSize: 14,
                  Background: "transparant",
                  fontWeight: "500",
                }}
                // onClick={(e) => handleOpenMenu(e)}
                // aria-describedby={id}
                aria-haspopup="true"
                onClick={() => navigateToDetail(item.implementationId)}
              >
                Detail
              </IconButton>
            </>
          ),
        }))
      );
      console.log("res master esq", result.data);

      setTotalPages(result.data.totalPages);
      setTotalRows(result.data.totalElements);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  function handleFilterSubmit(value) {
    setResetPageCounter((prevCount) => prevCount + 1);
    if (value === null) {
      setDataRequest(defaultDataHit);
    } else {
      setDataRequest({
        ...defaultDataHit,
        // // pageNumber: 0,
        // // dataPerPage: rowsPerPage,
        ...value,
      });
    }
  }

  function handleSort(property) {
    return function actualFn() {
      const isActiveAndAsc = sortBy === property && orderDirection === "ASC";
      setOrderDirection(isActiveAndAsc ? "DESC" : "ASC");
      setSortBy(property);
      setOrderBy(columnNameVar[titleTable.indexOf(property)]);
      setCurrentPage(0);
      console.log(orderBy);
      console.log(orderDirection, "od");
    };
  }

  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }

  useEffect(() => {
    setDataRequest((old) => ({
      ...old,
      sortType: orderDirection,
      sortBy: orderBy,
      pageNumber: 0,
      dataPerPage: rowsPerPage,
    }));
  }, [orderDirection]);

  useEffect(() => {
    getDataTableNew();
  }, [currentPage, dataRequest, dataFilter]);

  return (
    <div>
      <div>
        <div>
          <Filter
            // valueTab={valueTab}
            onFilterSubmit={handleFilterSubmit}
            valueFilter={valueFilter}
          />
        </div>
        <div style={{ marginTop: 50 }}>
          {isLoading ? (
            <LoadingView />
          ) : (
            <TablePagination
              data={data}
              fields={titleTable}
              cellOption={valueType}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              changePage={handleChangePageValue}
              isWithCheck={false}
              isSort={isSort}
              isUsingMuiSort
              resetPageCounter={resetPageCounter}
              sortBy={sortBy}
              order={orderDirection}
              handleSort={handleSort}
              // sortBy={sortBy}
              // order={orderDirection}
              // isLoadData={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
