/* eslint-disable react/require-default-props */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { Typography } from "antd";
import { Grid, Paper } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import { ChkyButtons } from "../../../../../components/chky";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 13,
    padding: "6px 12px 6px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    padding: 2,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },
  title: {
    fontWeight: 600,
    marginRight: 10,
    marginLeft: 10,
    fontSize: 13,
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  caption: { fontSize: 13 },
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

const populationSuggestions = [
  { id: 0, name: "ATM" },
  { id: 1, name: "CRM" },
  { id: 2, name: "CDM" },
];

const premisesSuggestions = [
  { id: 0, name: "NON CABANG", value: "Non Cabang" },
  { id: 1, name: "CABANG", value: "Cabang" },
  { id: 2, name: "DL", value: "DL" },
];

const brandSuggestions = [
  { id: 0, name: "Wincor" },
  { id: 1, name: "Chun Yang" },
  { id: 2, name: "NCR" },
  { id: 3, name: "DieBold" },
];

const FilterMap = (props) => {
  const classes = useStyles();
  const { onFilterSubmit, dataBrandSelect, area, problems } = props;

  const [dataFilter, setDataFilter] = useState(null);
  const [populationValue, setPopulationValue] = useState(" ");
  const [areaValue, setAreaValue] = useState(" ");
  const [promisesValue, setPremisesValue] = useState(" ");
  const [brandValue, setBrandValue] = useState(" ");
  const [dataArea, setDataArea] = useState([]);

  const handleProvinceChange = (event) => {
    setPopulationValue(event.target.value);
  };
  const handleAreaChange = (event) => {
    setAreaValue(event.target.value);
  };

  const handlePremisesChange = (event) => {
    setPremisesValue(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrandValue(event.target.value);
  };

  const changeDataFilter = () => {
    setDataFilter({
      area: areaValue === " " ? "" : areaValue,
      population: populationValue === " " ? "" : populationValue,
      promises: promisesValue === " " ? "" : promisesValue,
      brand: brandValue === " " ? "" : brandValue,
    });
  };
  const resetDataFilter = () => {
    setAreaValue(" ");
    setPopulationValue(" ");
    setPremisesValue(" ");
    setBrandValue(" ");
    setDataFilter(null);
  };
  async function getArea() {
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.post(
        `https://mylab-siab.com/masterrbbservices/v1/getAreaAll`
      );
      console.log("res data area map", result.data);
      setDataArea(result.data.data);
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
  }

  useEffect(() => {
    getArea();
  }, []);

  useEffect(() => {
    onFilterSubmit(dataFilter);
    console.log(`==> dari Filter Component ${JSON.stringify(dataFilter)}`);
  }, [dataFilter]);

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography className={classes.title}>Showing : </Typography>
              </Grid>
              <Grid item>
                <div className={classes.col}>
                  {/* <div>
                    <Typography className={classes.caption}>Area : </Typography>
                  </div> */}
                  <div>
                    <FormControl className={classes.select}>
                      <Select
                        id="status"
                        value={areaValue}
                        onChange={handleAreaChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value=" ">All Area</MenuItem>
                        {area?.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </Grid>

              <Grid item>
                {/* ===> Start Select Premises */}
                <div className={classes.col}>
                  {/* <div>
                    <Typography className={classes.caption}>
                      Problem :{" "}
                    </Typography>
                  </div> */}
                  <div>
                    <FormControl className={classes.select}>
                      <Select
                        value={promisesValue}
                        onChange={handlePremisesChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value=" ">All Problem</MenuItem>
                        {problems.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* ===< End Select Premises */}
              </Grid>
              <Grid item>
                {/* ===> Start Select Population */}

                <div className={classes.col}>
                  {/* <div>
                    <Typography className={classes.caption}>
                      Jenis Pesin :{" "}
                    </Typography>
                  </div> */}
                  <div>
                    <FormControl className={classes.select}>
                      <Select
                        id="status"
                        value={populationValue}
                        onChange={handleProvinceChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value=" ">All Type</MenuItem>
                        {populationSuggestions.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.name}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* ===< End Select Population */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="space-between" spacing={2}>
              <Grid item>
                {dataFilter !== null ? (
                  <ChkyButtons
                    startIcon={<CloseIcon />}
                    buttonType="redOutlined"
                    onClick={resetDataFilter}
                    height={40}
                    style={{ textTransform: "capitalize" }}
                  >
                    Reset
                  </ChkyButtons>
                ) : null}
              </Grid>
              <Grid item style={{ marginRight: 10 }}>
                <ChkyButtons
                  onClick={changeDataFilter}
                  height={40}
                  style={{ textTransform: "capitalize" }}
                >
                  Apply Filter
                </ChkyButtons>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
FilterMap.propTypes = {
  onFilterSubmit: PropTypes.func,
  dataBrandSelect: PropTypes.array,
};

FilterMap.defaultProps = {
  onFilterSubmit: () => console.log("====> JOM onFilterSubmit Clicked"),
  dataBrandSelect: brandSuggestions,
};

export default FilterMap;
