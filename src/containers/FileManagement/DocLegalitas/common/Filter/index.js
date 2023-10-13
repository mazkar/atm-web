import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, FormControl, Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { Typography } from "antd";
import axios from "axios";
import MuiButton from "../../../../../components/Button/MuiButton";
import ChkyButtons from "../../../../../components/chky/ChkyButtons";
import * as Colors from "../../../../../assets/theme/colors";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LoadingView from "../../../../../components/Loading/LoadingView";
import constansts from "../../../../../helpers/constants";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    width: 80,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    padding: "8px 12px 8px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const styles = () => ({
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
    padding: 10,
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
});

const Filter = (props) => {
  const {
    onFilterSubmit,
    classes,
    onChangeChky,
    location,
    setLocation,
    valueSelectArea,
    setValueSelectArea,
    valueSelectCity,
    setValueSelectCity,
    type,
    setType,
    status,
    setStatus,
    openingType,
    handleReset,
  } = props;

  const [dataArea, setDataArea] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const FetchArea = async () => {
      const constructData = [];
      try {
        // setModalLoader(true);
        const data = await axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAreas`,
          method: "POST",
          data: { openingType: openingType },
        });
        const dataPre = data.data.data;
        console.log(dataPre);
        dataPre.map((item) => {
          const newRow = {
            id: item.id,
            value: item.name,
            name: item.name,
          };
          constructData.push(newRow);
        });
        setDataArea(constructData);
        // setModalLoader(false);
      } catch (error) {
        // setModalLoader(false);
      }
    };
    FetchArea();
  }, [openingType]);

  useEffect(() => {
    if (valueSelectArea === "All") {
      setDataCity([]);
    } else {
      const FetchCity = async () => {
        const result = await axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByPicArea?picAreaId=${valueSelectArea}`,
          // url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByAreaId`,
          method: "GET",
          // data: { areaId: valueSelectArea },
        });
        setDataCity(result.data.data);
      };
      FetchCity();
    }
    console.log(dataArea);
  }, [valueSelectArea]);

  const onChangeArea = (e) => {
    console.log(e.target);
    const value = e.target.value;
    setValueSelectArea(value);
  };

  const onChangeCity = (e) => {
    const value = e.target.value;
    setValueSelectCity(value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleChangeChky = (e) => {
    setLocation(e.target.value);
    console.log(e.target.value);
  };

  function resetFilter() {
    setValueSelectArea("All");
    setValueSelectCity("All");
    setType("All");
    setStatus("All");
    setLocation("");
    setIsFilterActive(false);
    handleReset();
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
          <Typography className={classes.titleTextFilter}>
            Showing :{" "}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.label}>Area : </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.select}>
                <Select
                  value={valueSelectArea}
                  onChange={onChangeArea}
                  input={<BootstrapInput />}
                  IconComponent={DropDownIcon}
                  defaultValue="All"
                >
                  <MenuItem value="All">Pilih Nama Area</MenuItem>
                  {dataArea.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.label}>City : </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.select}>
                <Select
                  disabled={valueSelectArea === "All" ? true : false}
                  value={valueSelectCity}
                  onChange={onChangeCity}
                  input={<BootstrapInput />}
                  IconComponent={DropDownIcon}
                  defaultValue={1}
                >
                  <MenuItem value="All">Pilih Nama City</MenuItem>
                  {dataCity.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.label}>Type : </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.select}>
                <Select
                  value={type}
                  onChange={onChangeType}
                  input={<BootstrapInput />}
                  IconComponent={DropDownIcon}
                  defaultValue="All"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Institusi">Institusi</MenuItem>
                  <MenuItem value="Perorangan">Perorangan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Typography className={classes.label}>Status : </Typography>
            </Grid>
            <Grid item>
              <FormControl className={classes.select}>
                <Select
                  value={status}
                  onChange={onChangeStatus}
                  input={<BootstrapInput />}
                  IconComponent={DropDownIcon}
                  defaultValue="All"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Incomplete">Incomplete</MenuItem>
                  <MenuItem value="Acknowledge">Acknowledge</MenuItem>
                  <MenuItem value="Complete">Complete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper className={classes.wrapperInputSearch}>
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.inputSearch}
              placeholder="Nama Lokasi"
              value={location}
              onChange={handleChangeChky}
            />
          </Paper>
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
            label="Apply Filter"
            onClick={() => {
              onFilterSubmit();
              setIsFilterActive(true);
            }}
          />
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

export default withStyles(styles)(Filter);
