/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  FormControl,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Typography, Select } from "antd";
import MuiButton from "../../../../components/Button/MuiButton";
import { ChkyButtons } from "../../../../components";
import ChkySearchBar from './searchBar';

const { Option } = Select;

const useStyle = makeStyles({
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
  },
  titleTextFilter: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "16px",
    color: "#2B2F3C",
  },
  selectKonven: {
    "& .ant-select-single .ant-select-selector": {
      height: "100%",
      border: "1px solid #BCC8E7",
      backgroundColor: "#DC241F",
      paddingTop: "5px",
      paddingBottom: "4px",
      color: "#FFFF",
      borderRadius: "6px 0px 0px 6px",
      minWidth: 150,
    },
    "& .ant-select-single .ant-select-arrow": {
      color: "#FFFF",
      transition: "transform 0.2s ease-in",
    },
    "& .ant-select.ant-select-open .ant-select-arrow": {
      transform: "rotate(180deg)",
      transition: "transform 0.2s ease-in",
    },
  },
});

const FilterProgress = (props) => {
  const classes = useStyle();
  const { onFilterSubmit, handleReset, itemSearch = [] } = props;

  const [inputSearch, setInputSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("All");
  const [isFilterActive, setIsFilterActive] = useState(false);

  const onChangeSelectSearch = (e) => {
    const value = e;
    setSelectedSearch(value);
  };

  const onChangeInputSearch = (e) => {
    const {value} = e.target;
    setInputSearch(value);
  };

  function resetFilter() {
    setInputSearch("");
    setIsFilterActive(false);
    setSelectedSearch("All");
    handleReset();
  }

  const onChangeFilter = () => {
    const newDataFilter = {
      [selectedSearch]: inputSearch === "" ? "All" : inputSearch,
    };

    // eslint-disable-next-line no-prototype-builtins
    if(newDataFilter.hasOwnProperty('All')){
      delete newDataFilter.All;
    }
    
    onFilterSubmit(newDataFilter);
    setIsFilterActive(true);
  };

  return (
    <Paper className={classes.filterSection}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Typography className={classes.titleTextFilter}>
                Show :{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <div style={{ display: "flex" }}>
                    <FormControl className={classes.selectKonven}>
                      <Select
                        value={selectedSearch}
                        onChange={onChangeSelectSearch}
                      >
                        <Option value="All">All</Option>
                        {itemSearch.map((item) => {
                          return (
                            <Option
                              value={item.value}
                              onClick={() => setIsFilterActive(true)}
                            >
                              {item.text}
                            </Option>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <ChkySearchBar
                      placeholder="Search... "
                      width={233}
                      value={inputSearch}
                      onChange={onChangeInputSearch}
                      onSubmit={onChangeFilter}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="flex-end">
            <ChkyButtons
              onClick={resetFilter}
              height={41}
              buttonType="redOutlined"
              style={{
                textTransform: "capitalize",
                visibility: isFilterActive ? "visible" : "hidden",
                marginTop: 11,
              }}
            >
              Reset
            </ChkyButtons>
            <MuiButton
              label="Apply"
              style={{ height: "41px" }}
              onClick={() => {
                onChangeFilter();
                setIsFilterActive(true);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
FilterProgress.propTypes = {
  itemSearch: PropTypes.object.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default FilterProgress;
