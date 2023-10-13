/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes, { func } from "prop-types";
import { Typography } from "antd";
import { Grid, Paper } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";
import {
  ChkyButtons,
  SearchBarFilterSecondary,
} from "../../../../components/chky";
import { dataTypeLokasi } from '../../../../helpers/constants';

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
    padding: "10px 12px 10px 12px",
    width: 110 ,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const InputSelectStatus = withStyles((theme) => ({
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
    padding: "10px 12px 10px 12px",
    width: 90,
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
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 13,
    color: "#2B2F3C",
    // marginRight: 10,
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginRight: 5,
  },
  caption: {
    fontSize: 12,
    color: "#2B2F3C",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  select: {
    // padding: "15px 5px",
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
      // width: 100
    },
    width: 120,
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
  },
});

const FilterNegotiation = (props) => {
  const classes = useStyles();
  const { onFilterSubmit, currentTab } = props;

  const [dataFilter, setDataFilter] = useState(null);
  const [provinceValue, setProvinceValue] = useState("All");
  const [citiesValue, setCitiesValue] = useState("All");
  const [kecamatanValue, setKecamatanValue] = useState("All");
  const [statusValue, setStatusValue] = useState("All");
  const [keyword, setKeyword] = useState("");
  const [typeVal, setTypeVal] = useState('All')
  const [locationType, setlocationType] = useState('-')

  const [isDisableCities, setIsDisableCities] = useState(true);
  const [isDisableKecamatan, setIsDisableKecamatan] = useState(true);

  // ============ FETCH DATA PROVINCE ============

  const [isProvinceLoader, setProvinceLoader] = useState(false);

  const [dataProvince, setDataProvince] = useState([]); // <--- init dataProvince array
  useEffect(() => {
    const dataProvinceToSet = [];
    const fetchDataProvince = async () => {
      // console.log(`<<< CEKPoint A dataProvince`);
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        setProvinceLoader(true);
        const result = await Axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAreas`,
          {openingType: 'All'},
          config
        );
        // console.log(`<<< CEKPoint B dataProvince =>${JSON.stringify(result)}`);
        // reconstruct data from DB to dataProvince
        try {
          const dataPre = result.data.data;
          // console.log(
          //   `<<< CEKPoint C dataProvince => ${JSON.stringify(dataPre)}`
          // );
          dataPre.map((item) => {
            const newRow = {
              id: item.id,
              name: item.name,
            };
            dataProvinceToSet.push(newRow);
          });
        } catch (error) {
          setProvinceLoader(false);
          alert(`Error Refactor Data dataProvince Select...! \n ${error}`);
        }
        setDataProvince(dataProvinceToSet);
        setProvinceLoader(false);
      } catch (err) {
        alert(`Error Fetching Data dataProvince Select...! \n${err}`);
        setProvinceLoader(false);
      }
    };
    fetchDataProvince();
  }, []);

  // ============ END FETCH DATA PROVINCE ============

  // ============ FETCH DATA CITIES ============

  const [isCitiesLoader, setIsCitiesLoader] = useState(false);
  const [dataCities, setDataCities] = useState([]); // <--- init dataCities array
  // ============ END FETCH DATA CITIES ============

  // ============ FETCH DATA KECAMATAN ============

  const [isKecamatanLoader, setIsKecamatanLoader] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]); // <--- init dataCities array

  // ============ END FETCH DATA KECAMATAN ============

  const handleProvinceChange = (event) => {
    setProvinceValue(event.target.value);
  };

  const handleCitiesChange = (event) => {
    setCitiesValue(event.target.value);
  };

  const handleKecamatanChange = (event) => {
    setKecamatanValue(event.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeVal(e.target.value)
  }

  const handleLocTypeChange = (e) => {
    setlocationType(e.target.value)
  }

  const changeDataFilter = () => {
    const newDataFilter = {
      areaId: provinceValue + '',
      picSiteId: citiesValue + '',
      status: statusValue,
      type: typeVal,
      requester: kecamatanValue,
      locationType: locationType !== '-' ? locationType : 'All',
      location: keyword,
    }
    setDataFilter(newDataFilter);
    onFilterSubmit(newDataFilter)
  };

  // >> STATUS VALUE << //
  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  function handleKeyword(value) {
    setKeyword(value);
  }

  const resetDataFilter = () => {
    setProvinceValue("All");
    setCitiesValue("All");
    setKecamatanValue("All");
    setKeyword("");
    setStatusValue("All");
    setIsDisableCities(true);
    setIsDisableKecamatan(true);
    setDataFilter(null);
    onFilterSubmit(null)
    setTypeVal('All')
    setlocationType('-')
  };
  function handleResetKeyword() {
    console.log("Keyword resetted");
  }
  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid container spacing={1} style={{ padding: "16px 16px" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography className={classes.title}>Filter : </Typography>
            </Grid>
            <Grid item xs={12} sm container spacing={1} alignItems="center" justify="space-between">
              <Grid item>
                <Typography className={classes.caption}>Area :</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    id="status"
                    value={provinceValue}
                    onChange={handleProvinceChange}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value="All">All area</MenuItem>
                    {dataProvince.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography className={classes.caption}>PIC Site :</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={citiesValue}
                    onChange={handleCitiesChange}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value="All">All PIC Site</MenuItem>
                    {dataProvince.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography className={classes.caption}>Requester :</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={kecamatanValue}
                    onChange={handleKecamatanChange}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {requesterOptions.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography className={classes.caption}>Type :</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={typeVal}
                    onChange={handleTypeChange}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    {typeOptions.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              {currentTab ?
              <>
                <Grid item>
                  <Typography className={classes.caption}>Location Type :</Typography>
                </Grid>
                <Grid item>
                  <FormControl className={classes.select}>
                    <Select
                      value={locationType}
                      onChange={handleLocTypeChange}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      {dataTypeLokasi.map((item, i) => {
                        return (
                          <MenuItem key={i} value={item.value}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </>
              :
                <>
                  <Grid item style={{paddingRight: 10}}>
                    <Typography className={classes.caption}>Status: </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.select}>
                      <Select
                        id="status"
                        value={statusValue}
                        onChange={handleStatusChange}
                        input={<InputSelectStatus />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value="All">
                          <em>All</em>
                        </MenuItem>
                        <MenuItem value="7">Profiling</MenuItem>
                        <MenuItem value="1">Negotiation</MenuItem>
                        <MenuItem value="2">On Review</MenuItem>
                        <MenuItem value="3">Reject</MenuItem>
                        <MenuItem value="4">Approve</MenuItem>
                        <MenuItem value="5">Terminate</MenuItem>
                        <MenuItem value="6">Renegotiation</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> 
                </>
              }
              <Grid item>
                <SearchBarFilterSecondary
                  placeholder="Nama Lokasi"
                  onChangeEffect={handleKeyword}
                  // onResetKeyword={handleResetKeyword}
                  keywordFromParent={keyword}
                  height="41px"
                  width={150}
                />
              </Grid>
              <Grid item>
                <ChkyButtons
                  onClick={changeDataFilter}
                  height={40}
                  style={{ textTransform: "capitalize" }}
                >
                  Apply
                </ChkyButtons>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="flex-end" style={{paddingRight: 16, paddingBottom: 16}}>
          {dataFilter !== null && (
            <Grid item>
              <ChkyButtons
                startIcon={<CloseIcon />}
                buttonType="redOutlined"
                onClick={resetDataFilter}
                height={40}
                style={{ textTransform: "capitalize" }}
              >
                  Reset
              </ChkyButtons>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
};
FilterNegotiation.propTypes = {
  onFilterSubmit: PropTypes.func.isRequired,
  currentTab: PropTypes.number,
};

FilterNegotiation.defaultProps = {
  currentTab: 0,
};

export default FilterNegotiation;

const typeOptions = [
  'All',
  'New ATM',
  'New Location',
  'Renewal',
  'Reopen',
]

const requesterOptions=[
  "ATM Business",
  "Branch",
  "Other BU",
  "Special",
]