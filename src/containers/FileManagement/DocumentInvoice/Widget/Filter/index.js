import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  FormControl,
  Select,
  MenuItem,
  ButtonGroup,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Typography, Input } from "antd";
import InputBase from "@material-ui/core/InputBase";
import MuiButton from "../../../../../components/Button/MuiButton";
import ChkyButtons from "../../../../../components/chky/ChkyButtons";
import * as Colors from "../../../../../assets/theme/colors";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import constansts from "../../../../../helpers/constants";
import BtnGroupItem from "./BtnGroupItem";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: "7px 0px 0px 7px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #DC241F",
    fontSize: 13,
    color: Colors.PrimaryHard,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: "7px 0px 0px 7px",
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
  },
  titleTextFilter: {
    fontWeight: "bold",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontSize: 16,
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
    // padding: 10,
    // borderRadius: "5px 0px 0px 5px",
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
    borderRadius: "0px 7px 7px 0px",
    boxSizing: "border-box",
    padding: "10px",
    // color: '#A8B6DB',
    fontFamily: "Barlow",
    maxWidth: 320,
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
});

const index = (props) => {
  const { onFilterSubmit, valueFilter } = props;
  const classes = useStyles();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const openings = [/* 'All', */ "Todo", "Doing", "Done", "Strip"];
  const [openingType, setOpeningType] = useState("All");
  const [modelValue, setModelValue] = useState(0);
  const [selectedSearch, setSelectedSearch] = useState("All_Search");
  const [selectedKebutuhan, setSelectedKebutuhan] = useState("All_Type");
  const [inputSearch, setInputSearch] = useState("");
  const [itemSearch, setItemSearch] = useState([]);
  const [itemKebutuhan, setItemKebutuhan] = useState([]);

  useEffect(() => {
    let newObj;
    const dataListSearch = [];
    const dataListKebutuhan = [];
    valueFilter.map((item) => {
      if (item.typeColumn === "info") {
        newObj = { text: item.label, value: item.id };
        dataListSearch.push(newObj);
        setItemSearch(dataListSearch);
      } else if (item.typeColumn === "checklist") {
        newObj = { text: item.label, value: item.id };
        dataListKebutuhan.push(newObj);
        setItemKebutuhan(dataListKebutuhan);
      }
    });
    resetFilter();
  }, [valueFilter]);

  const onChangeSelectSearch = (e) => {
    const { value } = e.target;
    setSelectedSearch(value);
  };

  const onChangeKebutuhan = (e) => {
    const { value } = e.target;
    setSelectedKebutuhan(value);
  };

  const onChangeInputSearch = (e) => {
    const { value } = e.target;
    setInputSearch(value);
  };

  const onChangeChecklist = (e) => {
    // const value = e.target.value;
    let modelVal = 1;
    // eslint-disable-next-line default-case
    switch (e) {
      case 0:
        modelVal = 1; // todo
        break;
      case 1:
        modelVal = 3; // doing
        break;
      case 2:
        modelVal = 2; // done
        break;
      case 3:
        modelVal = 4; // strip
        break;
    }
    setModelValue(modelVal);
  };

  const onChangeFilter = () => {
    const newDataFilter = {
      [selectedSearch]: inputSearch === "" ? "All" : inputSearch,
      [selectedKebutuhan]: modelValue,
    };
    if (newDataFilter.hasOwnProperty("All_Search")) {
      delete newDataFilter.All_Search;
    }
    if (newDataFilter.hasOwnProperty("All_Type")) {
      delete newDataFilter.All_Type;
    }
    onFilterSubmit(newDataFilter);
  };

  function resetFilter() {
    setOpeningType("All");
    setSelectedSearch("All_Search");
    setInputSearch("");
    setSelectedKebutuhan("All_Type");
    onFilterSubmit(null);
    setIsFilterActive(false);
    // handleReset()
  }

  return (
    <Paper className={classes.filterSection}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Typography className={classes.titleTextFilter}>
                Show :{" "}
              </Typography>
            </Grid>
            <Grid item>
              <div style={{ display: "flex" }}>
                <FormControl className={classes.select}>
                  <Select
                    value={selectedSearch}
                    onChange={onChangeSelectSearch}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value="All_Search">All</MenuItem>
                    {itemSearch.map((item) => {
                      return (
                        <MenuItem
                          value={item.value}
                          onClick={() => setIsFilterActive(true)}
                        >
                          {item.text}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Input
                  className={classes.inputFieldSelect}
                  placeholder="Search"
                  value={inputSearch}
                  onChange={onChangeInputSearch}
                />
              </div>
            </Grid>
            <Grid item>
              <div style={{ display: "flex" }}>
                <FormControl className={classes.select}>
                  <Select
                    value={selectedKebutuhan}
                    onChange={onChangeKebutuhan}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value="All_Type">All</MenuItem>
                    {itemKebutuhan.map((item) => {
                      return (
                        <MenuItem
                          value={item.value}
                          onClick={() => setIsFilterActive(true)}
                        >
                          {item.text}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <ButtonGroup
                  variant="contained"
                  disableElevation
                  style={{ margin: "0 0px" }}
                >
                  {openings.map((val, i) => (
                    <BtnGroupItem
                      key={i}
                      disabled={val === openingType}
                      onClick={() => {
                        onChangeChecklist(i);
                        setOpeningType(val);
                        setIsFilterActive(true);
                      }}
                    >
                      {val}
                    </BtnGroupItem>
                  ))}
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ChkyButtons
            onClick={resetFilter}
            height={30}
            buttonType="redOutlined"
            style={{
              textTransform: "capitalize",
              visibility: isFilterActive ? "visible" : "hidden",
            }}
          >
            Reset
          </ChkyButtons>
          <MuiButton
            label="Apply"
            onClick={() => {
              onChangeFilter(selectedSearch);
              setIsFilterActive(true);
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
index.propTypes = {
  onFilterSubmit: PropTypes.func.isRequired,
  valueFilter: PropTypes.object.isRequired,
};

// export default withStyles(styles)(index);
export default index;
