import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  FormControl,
  MenuItem,
  ButtonGroup,
} from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment";
import { Typography, Select, DatePicker } from "antd";
import MuiButton from "../../../../../../components/Button/MuiButton";
import ChkyButtons from "../../../../../../components/chky/ChkyButtons";
import * as Colors from "../../../../../../assets/theme/colors";
import constansts from "../../../../../../helpers/constants";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/linear-red/calendar.svg";
import { ChkyTabsAsOption } from "../../../../../../components";
import SearchBar from "./searchBar";

const { Option } = Select;

const styles = () => ({
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 30,
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
  label: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#2B2F3C",
  },
  select: {
    minWidth: 120,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  iconButton: {
    padding: 5,
    color: Colors.GrayMedium,
  },
  wrapperInputSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: (width) => width,
    borderRadius: 6,
    backgroundColor: Colors.White,
    height: 35,
    border: `1px solid ${constansts.color.grayMedium}`,
    boxShadow: "none",
  },
  inputSearch: {
    marginLeft: 8,
    flex: 1,
    color: "#BCC8E7",
    fontSize: 13,
    width: 100,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
    border: 2,
    borderColor: constansts.color.grayMedium,
  },
  inputFieldSelect: {
    border: "1px solid #A8B6DB",
    borderRadius: "0px 6px 6px 0px",
    boxSizing: "border-box",
    padding: "10px",
    // color: '#A8B6DB',
    fontFamily: "Barlow",
    width: 320,
    height: "41px",
    "& ::placeholder": {
      color: "#A8B6DB",
    },
    "& ::selection": {
      background: "#FF6130",
    },
    "&:hover": {
      border: "1px solid #A8B6DB",
    },
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
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
});
const paymentOptions = ["All", "Todo", "Doing", "Done"];
const Filter = (props) => {
  const { onFilterSubmit, handleReset, classes, itemSearch } = props;

  const [valueFilter, setValueFilter] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("All");
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);

  useEffect(() => {
    const dataListSearch =
      itemSearch?.map((item) => {
        return { text: item.text, value: item.value };
      }) || [];
    setValueFilter(dataListSearch);
  }, [itemSearch]);

  const onChangeSelectSearch = (e) => {
    const value = e;
    setSelectedSearch(value);
  };

  const onChangeInputSearch = (e) => {
    const { value } = e.target;
    setInputSearch(value);
  };

  function resetFilter() {
    setInputSearch("");
    setIsFilterActive(false);
    handleReset();
  }

  const onChangeFilter = () => {
    const newDataFilter = {
      [selectedSearch]: inputSearch === "" ? "" : inputSearch,
      status: paymentOptions[selectedPaymentIndex],
    };
    // eslint-disable-next-line no-prototype-builtins
    // if(newDataFilter.hasOwnProperty('All')){
    //   delete newDataFilter.All;
    // }
    onFilterSubmit(newDataFilter);
  };

  return (
    <Paper className={classes.filterSection}>
      <Grid container justifyContent="space-between" alignItems="center">
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
                        {valueFilter.map((item) => {
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
                    <SearchBar
                      placeholder="Search... "
                      width={233}
                      value={inputSearch}
                      onChange={onChangeInputSearch}
                      onSubmit={() => onChangeFilter()}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <ChkyTabsAsOption
                currentTab={selectedPaymentIndex}
                dataTab={paymentOptions}
                handleChangeTab={(val) => setSelectedPaymentIndex(val)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justifyContent="flex-end">
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
Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  onFilterSubmit: PropTypes.func,
  itemSearch: PropTypes.object.isRequired,
  handleReset: PropTypes.object,
};

Filter.defaultProps = {
  onFilterSubmit: () => {},
  // eslint-disable-next-line react/default-props-match-prop-types
  handleReset: () => {},
};

export default withStyles(styles)(Filter);
