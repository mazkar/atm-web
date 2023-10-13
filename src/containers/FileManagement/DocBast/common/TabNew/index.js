import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { PrimaryHard } from "../../../../../assets/theme/colors";
import FilterData from "../filterData";
import { TableCheckPagination } from "../../../../../components";
import TableTemplate from "../dummyData";
import { doGetOverviewDocBast } from "../../../serviceFileManagement";

const TabNew = (props) => {
  const history = useHistory();
  const [dataNew, setDataNew] = useState([]);
  // INIT DATA REQUEST
  const defaultDataHit = {
    dataPerPage: 10,
    pageNumber: 0,
    sortBy: "atmId",
    sortType: "ASC",
    task: "need", // booth // termination / mesin/signage/security/parameter /need/jarkom
    openingType: "New Location",
  };
  const [dataRequest, setDataRequest] = useState(defaultDataHit);
  const [isLoading, setIsLoading] = useState(true); /* <------- loading Table */
  const [totalPages, setTotalPages] = useState(0); // <--- init default totalPages
  const [totalRows, setTotalRows] = useState(0); // <--- init default totalRows
  const rowsPerPage = 10; // <--- init default rowsPerPage

  function loadDataHandler(loaderValue) {
    setIsLoading(loaderValue);
  }
  const getData = () => {
    try {
      doGetOverviewDocBast(loadDataHandler, dataRequest).then((res) => {
        if (res) {
          if (res.content.length > 0) {
            const dataNews = res?.content;
            setTotalPages(res.totalPages);
            setTotalRows(res.totalElements);
            const dataNewPush = [];
            dataNews.map((item) => {
              const newRow = {
                atmId: item.atmId,
                location: item.lokasi,
                address: item.alamat,
                area: item.area,
                city: item.city,
                latlong: item.latLong,
                idMesin: item.idMesin,
                ...{
                  assign: (
                    <Button
                      style={{
                        color: PrimaryHard,
                        textTransform: "capitalize",
                      }}
                      onClick={() =>
                        history.push(
                          `/file-management/doc-bast/${item.impleId}`
                        )
                      }
                    >
                      Detail
                    </Button>
                  ),
                },
              };
              dataNewPush.push(newRow);
            });
            setDataNew(dataNewPush);
          }
        }
      });
    } catch (err) {
      console.log("~ err", err);
      loadDataHandler(false);
      alert(`Error Get Data...! \n${err}`);
    }
  };
  useEffect(() => {
    getData();
  }, [dataRequest]);
  function handleChangePageValue(newPage) {
    setDataRequest({
      ...dataRequest,
      pageNumber: newPage,
    });
  }
  // sort
  const handleSorting = (type, column) => {
    setDataRequest({
      ...dataRequest,
      sortType: type,
      sortBy: column,
    });
  };

  // filter
  function handleFilterSubmit(value) {
    // console.log(">>>>> FILTER DATA: ", JSON.stringify(value));
    // console.log(">>>>> FILTER DATA: ", JSON.stringify(dataRequest));
    // setResetPageCounter((prevCount) => prevCount + 1);
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
    /* setTimeout(() => {
      setIsLoading(false);
    }, 5000); */
  }

  return (
    <div>
      <div>
        <FilterData
          onFilterSubmit={handleFilterSubmit}
          valueFilter={TableTemplate.titleFilter}
        />
      </div>
      <div>
        <TableCheckPagination
          data={dataNew}
          fields={TableTemplate.titleTableNew}
          isWithCheck={false}
          cellOption={TableTemplate.valueType}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          changePage={handleChangePageValue}
          sorting={handleSorting}
          isLoadData={isLoading}
          isSort
        />
      </div>
    </div>
  );
};

TabNew.propTypes = {};

export default TabNew;
