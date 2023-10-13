import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import ChkyButtons from "../../../../../components/chky/ChkyButtons";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/whiteIcons/chevron-down-white.svg";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as SearchIcon } from "../../../../../assets/icons/linear-red/search.svg";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    color: "#FFFFFF",
    borderRadius: "8px 0 0 8px",
    width: 150,
    position: "relative",
    backgroundColor: "#DC241F",
    border: "none",
    fontSize: 13,
    padding: 10,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: "8px 0 0 8px",
      backgroundColor: "#DC241F",
      borderColor: "none",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 72,
  },
  titleTextFilter: {
    fontWeight: 500,
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "19px",
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
    padding: 0,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  iconButton: {
    padding: 5,
    color: "gray",
  },
  wrapperInputSearch: {
    display: "flex",
    alignItems: "center",
    // width: (width) => width,
    borderRadius: "0 8px 8px 0",
    backgroundColor: "#FFFFFF",
    height: 39,
    border: "1px solid gray",
    boxShadow: "none",
  },
  inputSearch: {
    marginLeft: 8,
    flex: 1,
    fontSize: 13,
    width: 230,
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
    border: 2,
    borderColor: "gray",
  },
});

const Filter = (props) => {
  const { handleApplyFilter } = props;

  const classes = useStyles();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("All");

  const itemSearch = [
    {
      id: 1,
      value: "letterNumber",
      name: "No Surat",
    },
    {
      id: 2,
      value: "letterType",
      name: "Tipe Surat",
    },
    {
      id: 3,
      value: "letterCode",
      name: "Kode Surat",
    },
    {
      id: 4,
      value: "month",
      name: "Bulan",
    },
    {
      id: 5,
      value: "year",
      name: "Tahun",
    },
    {
      id: 6,
      value: "category",
      name: "Kategori",
    },
  ];

  const onChangeSelectSearch = (e) => {
    setSelectedSearch(e.target.value);
    console.log(">>> ", e.target.value);
  };
  
  const onChangeInputSearch = (e) => {
    setInputSearch(e.target.value);
    console.log("input Search >>>", e.target.value);
  };
  
  const handleResetFilter = () => {
    setSelectedSearch("All");
    setInputSearch("");
    setIsFilterActive(false)
    handleApplyFilter()
  }

  return (
    <Paper className={classes.filterSection}>
      <Grid
        container
        alignItems="center"
        spacing={1}
        justifyContent="space-between"
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.titleTextFilter}>
                Show :{" "}
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <FormControl className={classes.select}>
                <Select
                  value={selectedSearch}
                  onChange={onChangeSelectSearch}
                  input={<BootstrapInput />}
                  IconComponent={DropDownIcon}
                  defaultValue="All"
                >
                  <MenuItem value="All">All</MenuItem>
                  {itemSearch.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        value={item.value}
                        onClick={() => setIsFilterActive(true)}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Paper className={classes.wrapperInputSearch}>
                <InputBase
                  value={inputSearch}
                  className={classes.inputSearch}
                  placeholder="Search..."
                  onChange={onChangeInputSearch}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={()=>handleApplyFilter(selectedSearch, inputSearch)}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ChkyButtons
            onClick={handleResetFilter}
            buttonType="redOutlined"
            style={{
              textTransform: "capitalize",
              visibility: isFilterActive ? "visible" : "hidden",
            }}
          >
            Reset
          </ChkyButtons>
          <ChkyButtons
            style={{
              textTransform: "none",
              fontSize: 15,
              padding: "10px 20px 10px 20px",
              borderRadius: 8,
            }}
            onClick={()=>handleApplyFilter(selectedSearch, inputSearch)}
          >
            Apply
          </ChkyButtons>
        </Grid>
      </Grid>
    </Paper>
  );
};

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  captionD: PropTypes.string,
  onFilterSubmit: PropTypes.func,
};

Filter.defaultProps = {
  captionD: "Status",
};

export default Filter;
