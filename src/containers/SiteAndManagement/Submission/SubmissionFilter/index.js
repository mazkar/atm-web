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
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";
import { ChkyButtons } from "../../../../components/chky";
import ChkySearchFilter from "../../../../components/chky/ChkySearchFilter";

const BootstrapInputProvinsi = withStyles((theme) => ({
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
    width: 48,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const BootstrapInputStatus = withStyles((theme) => ({
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
    width: 40,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

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
    width: 65,
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
    fontSize: 13,
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  caption: { fontSize: 13, color: "#2B2F3C" },
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SubmissionFilter = (props) => {
  const classes = useStyles();
  const { onFilterSubmit } = props;

  const [dataFilter, setDataFilter] = useState(null);
  const [provinceValue, setProvinceValue] = useState("All");
  const [citiesValue, setCitiesValue] = useState("All");
  const [kecamatanValue, setKecamatanValue] = useState("All");
  const [statusValue, setStatusValue] = useState("All");
  const [locationValue, setLocationValue] = useState("");
  const [type, setType] = useState('All')

  const [isDisableCities, setIsDisableCities] = useState(true);
  const [isDisableKecamatan, setIsDisableKecamatan] = useState(true);

  // ============ FETCH DATA PROVINCE ============

  const [isProvinceLoader, setProvinceLoader] = useState(false);

  const [dataProvince, setDataProvince] = useState([]); // <--- init dataProvince array
  const fetchDataProvince = async () => {
  // console.log(`<<< CEKPoint A dataProvince`);
    const dataProvinceToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setProvinceLoader(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getProvince`,
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

  // ============ END FETCH DATA PROVINCE ============

  // ============ FETCH DATA CITIES ============

  const [isCitiesLoader, setIsCitiesLoader] = useState(false);
  const [dataCities, setDataCities] = useState([]); // <--- init dataCities array

  const fetchDataCities = async () => {
  // console.log(`<<< CEKPoint A dataCities`);
    const dataCitiesToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsCitiesLoader(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByProvince?provinceId=${provinceValue}`,
        config
      );
    // console.log(`<<< CEKPoint B dataCities =>${JSON.stringify(result)}`);
      // reconstruct data from DB to dataCities
      try {
        const dataPre = result.data.data;
      // console.log(`<<< CEKPoint C dataCities => ${JSON.stringify(dataPre)}`);
        dataPre.map((item) => {
          const newRow = {
            id: item.id,
            name: item.name,
          };
          dataCitiesToSet.push(newRow);
        });
      } catch (error) {
        setIsCitiesLoader(false);
        alert(`Error Refactor Data dataCities Select...! \n ${error}`);
      }
      setDataCities(dataCitiesToSet);
      setIsCitiesLoader(false);
    } catch (err) {
      alert(`Error Fetching Data dataCities Select...! \n${err}`);
      setIsCitiesLoader(false);
    }
  };

  useEffect(() => {
  // console.log(`PROVINCE ${provinceValue}`);
    if (provinceValue !== "All") {
      fetchDataCities();
    }
  }, [provinceValue]);

  useEffect(() => {
    // console.log(
    //   `<<< CEKPoint D dataProvince => ${JSON.stringify(dataProvince)}`
    // );
  }, [dataProvince]);

  // ============ END FETCH DATA CITIES ============

  // ============ FETCH DATA KECAMATAN ============

  const [isKecamatanLoader, setIsKecamatanLoader] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]); // <--- init dataCities array

  const fetchDataKecamatan = async () => {
  // console.log(`<<< CEKPoint A dataKecamatan`);
    const dataKecamatanToSet = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      setIsKecamatanLoader(true);
      const result = await Axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/districtByCity?cityId=${citiesValue}`,
        config
      );
    // console.log(`<<< CEKPoint B dataKecamatan =>${JSON.stringify(result)}`);
      // reconstruct data from DB to dataKecamatan
      try {
        const dataPre = result.data.data;
        // console.log(
        //   `<<< CEKPoint C dataKecamatan => ${JSON.stringify(dataPre)}`
        // );
        dataPre.map((item) => {
          const newRow = {
            id: item.id,
            name: item.name,
          };
          dataKecamatanToSet.push(newRow);
        });
      } catch (error) {
        setIsKecamatanLoader(false);
        alert(`Error Refactor Data dataKecamatan Select...! \n ${error}`);
      }
      setDataKecamatan(dataKecamatanToSet);
      setIsKecamatanLoader(false);
    } catch (err) {
      alert(`Error Fetching Data dataKecamatan Select...! \n${err}`);
      setIsKecamatanLoader(false);
    }
  };

  useEffect(() => {
    if (citiesValue !== "All") {
      fetchDataKecamatan();
    }
  }, [citiesValue]);

  useEffect(() => {
    // console.log(
    //   `<<< CEKPoint D dataProvince => ${JSON.stringify(dataProvince)}`
    // );
  }, [dataProvince]);

  // ============ END FETCH DATA KECAMATAN ============

  useEffect(() => {
    fetchDataProvince();
  }, []);

  const handleProvinceChange = (event) => {
    setProvinceValue(event.target.value);
    setCitiesValue("All");
    if (event.target.value !== " ") {
      setIsDisableCities(false);
    } else {
      setIsDisableCities(true);
    }
    setIsDisableKecamatan(true);
    setKecamatanValue("All");
  };

  const handleCitiesChange = (event) => {
    setCitiesValue(event.target.value);
    setKecamatanValue("All");
    if (event.target.value !== " ") {
      setIsDisableKecamatan(false);
    } else {
      setIsDisableKecamatan(true);
    }
  };

  const handleKecamatanChange = (event) => {
    setKecamatanValue(event.target.value);
  };

  // >> STATUS VALUE << //
  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  function handleLocationChange(newValue) {
    setLocationValue(newValue);
  }

  function handleTypeChange(e){
    setType(e.target.value)
  }

  const onApply = () => {
    setDataFilter({
      provinceId: provinceValue,
      cityId: citiesValue,
      districtId: kecamatanValue,
      status: statusValue,
      location: locationValue,
      type
    });
    onFilterSubmit({
      provinceId: provinceValue,
      cityId: citiesValue,
      districtId: kecamatanValue,
      status: statusValue,
      location: locationValue,
      ...((type && type !== 'All') && {type})
    });
  };

  function resetFilter(){
    setDataFilter(null)
    onFilterSubmit(null)
    setProvinceValue("All");
    setCitiesValue("All");
    setKecamatanValue("All");
    setStatusValue("All");
    setLocationValue("");
    setType('All')
  }

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid
          container
          // spacing={1}
          alignItems="center"
          justify="space-between"
          style={{ padding: "10px 10px" }}
        >
          <Grid item>
            <Typography className={classes.title}>Filter : </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography className={classes.caption}>Provinsi : </Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    id="status"
                    value={provinceValue}
                    onChange={handleProvinceChange}
                    input={<BootstrapInputProvinsi />}
                    IconComponent={DropDownIcon}
                    defaultValue="All"
                  >
                    <MenuItem value="All">Provinsi</MenuItem>
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
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center">
              <Typography className={classes.caption}>Kabupaten : </Typography>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={citiesValue}
                    onChange={handleCitiesChange}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                    disabled={isDisableCities}
                    defaultValue="All"
                  >
                    <MenuItem value="All">Kabupaten</MenuItem>
                    {dataCities.map((item) => {
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
              <Typography className={classes.caption}>Kecamatan :</Typography>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={kecamatanValue}
                    onChange={handleKecamatanChange}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                    disabled={isDisableKecamatan}
                    defaultValue="All"
                  >
                    <MenuItem value="All">Kecamatan</MenuItem>
                    {dataKecamatan.map((item) => {
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
              <Typography className={classes.caption}>Status : </Typography>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={statusValue}
                    onChange={handleStatusChange}
                    input={<BootstrapInputStatus />}
                    IconComponent={DropDownIcon}
                    // disabled={isDisableStatus}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value={1}>Incompleted</MenuItem>
                    {/* <MenuItem value={2}>Completed</MenuItem>
                    <MenuItem value={3}>On Going</MenuItem>
                    <MenuItem value={4}>Late</MenuItem> */}
                    <MenuItem value={3}>Waiting Approval</MenuItem>
                    {/* {dataStatus.map((item)=>{
                          return (<MenuItem key = {item.id} value={item.id}>{item.name}</MenuItem>);
                        })} */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center">
              <Typography className={classes.caption}>Type :</Typography>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={type}
                    onChange={handleTypeChange}
                    input={<BootstrapInputStatus />}
                    IconComponent={DropDownIcon}
                  >
                    {typeOptions.map((item)=>{
                      return (<MenuItem key = {item} value={item}>{item}</MenuItem>);
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <ChkySearchFilter
              placeholder="Nama Lokasi"
              onSubmit={handleLocationChange}
              width={125}
              value={locationValue}
            />
          </Grid>
          <Grid item>
            <ChkyButtons
              onClick={resetFilter}
              height={40}
              buttonType='redOutlined'
              style={{ textTransform: "capitalize", visibility: dataFilter ? 'visible' : 'hidden' }}
            >
              Reset
            </ChkyButtons>
          </Grid>
          <Grid item>
            <ChkyButtons
              onClick={onApply}
              height={40}
              style={{ textTransform: "capitalize" }}
            >
              Apply
            </ChkyButtons>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
SubmissionFilter.propTypes = {
  onFilterSubmit: PropTypes.func.isRequired,
};

export default SubmissionFilter;

const typeOptions = [
  'All',
  'New ATM',
  'New Location',
  'Termin',
  'Reopen',
  'Replace'
]