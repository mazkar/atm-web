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
import { ReactComponent as DropDownIcon } from "../../../assets/icons/general/dropdown_red.svg";
import { ChkyButtons } from "../../../components/chky";

export const BootstrapInput = withStyles((theme) => ({
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

const provinciesSuggestions = [
  { id: 0, value: "0", name: "DKI Jakarta" },
  { id: 1, value: "1", name: "Sumatera Barat" },
  { id: 2, value: "2", name: "DI Yogyakarta" },
  { id: 3, value: "3", name: "Jawa Barat" },
  { id: 4, value: "4", name: "Jawa Tengah" },
  { id: 5, value: "5", name: "Sumatera Utara" },
];

const kabupatenSuggestions = [
  { id: 0, id_prov: "0", value: "0", name: "Jakarta Pusat" },
  { id: 1, id_prov: "0", value: "1", name: "Jakarta Selatan" },
  { id: 2, id_prov: "0", value: "2", name: "Jakarta Utara" },
  { id: 3, id_prov: "0", value: "3", name: "Jakarta Barat" },
  { id: 4, id_prov: "0", value: "4", name: "Jakarta Timur" },
];

const kecamatanSuggestions = [
  { id: 0, id_city: "0", value: "0", name: "Cempaka Putih" },
  { id: 1, id_city: "0", value: "1", name: "Gambir" },
  { id: 2, id_city: "0", value: "2", name: "Johar Baru" },
  { id: 3, id_city: "0", value: "3", name: "Kemayoran" },
  { id: 4, id_city: "0", value: "4", name: "Menteng" },
  { id: 5, id_city: "0", value: "5", name: "Sawah Besar" },
];

const SubmissionFilter = (props) => {
  const classes = useStyles();
  const { onFilterSubmit } = props;

  const [dataFilter, setDataFilter] = useState(null);
  const [resetCounter, setResetCounter] = useState(0);
  const [provinceValue, setProvinceValue] = useState(" ");
  const [citiesValue, setCitiesValue] = useState(" ");
  const [kecamatanValue, setKecamatanValue] = useState(" ");
  // const [statusValue, setStatusValue] = useState(' ');

  const [isDisableCities, setIsDisableCities] = useState(true);
  const [isDisableKecamatan, setIsDisableKecamatan] = useState(true);
  const [showReset, setShowReset] = useState(false);

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
    fetchDataProvince();
  }, []);

  // ============ END FETCH DATA PROVINCE ============

  // ============ FETCH DATA CITIES ============

  const [isCitiesLoader, setIsCitiesLoader] = useState(false);
  const [dataCities, setDataCities] = useState([]); // <--- init dataCities array
  useEffect(() => {
    const dataCitiesToSet = [];
    const fetchDataCities = async () => {
    // console.log(`<<< CEKPoint A dataCities`);
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
          // console.log(
          //   `<<< CEKPoint C dataCities => ${JSON.stringify(dataPre)}`
          // );
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
    if (provinceValue !== " ") {
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
  useEffect(() => {
    const dataKecamatanToSet = [];
    const fetchDataKecamatan = async () => {
    // console.log(`<<< CEKPoint A dataKecamatan`);
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
    if (citiesValue !== " ") {
      fetchDataKecamatan();
    }
  }, [citiesValue]);

  useEffect(() => {
    // console.log(
    //   `<<< CEKPoint D dataProvince => ${JSON.stringify(dataProvince)}`
    // );
  }, [dataProvince]);

  // ============ END FETCH DATA KECAMATAN ============

  const handleProvinceChange = (event) => {
    setProvinceValue(event.target.value);
    setCitiesValue(" ");
    setKecamatanValue(" ");
    if (event.target.value !== " ") {
      setIsDisableCities(false);
    } else {
      setIsDisableCities(true);
      setIsDisableKecamatan(true);
    }
  };

  const handleCitiesChange = (event) => {
    setCitiesValue(event.target.value);
    setKecamatanValue(" ");
    if (event.target.value !== " ") {
      setIsDisableKecamatan(false);
    } else {
      setIsDisableKecamatan(true);
    }
  };

  const handleKecamatanChange = (event) => {
    setKecamatanValue(event.target.value);
  };

  const changeDataFilter = () => {
    setDataFilter({
      provinceId: provinceValue === " " ? "All" : provinceValue,
      citiesId: citiesValue === " " ? "All" : citiesValue,
      kecamatanId: kecamatanValue === " " ? "All" : kecamatanValue,
    });
  };

  // >> STATUS VALUE << //
  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  // useEffect(() => {
  //   handleCounterReset(resetCounter);
  // }, [resetCounter]);

  const resetDataFilter = () => {
    setShowReset(false);
    setResetCounter((prevCount) => prevCount + 1);
    setDataFilter(null);
    setProvinceValue(" ");
    setCitiesValue(" ");
    setKecamatanValue(" ");
    setIsDisableCities(true);
    setIsDisableKecamatan(true);
    onFilterSubmit(dataFilter);
  };
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
                {/* ===> Start Select Province */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>
                      Provinsi :{" "}
                    </Typography>
                  </div>
                  <div item style={{ position: "relative" }}>
                    {/* Loader when hit province servince */}
                    {isProvinceLoader && (
                      <div className={classes.loaderWrapper}>
                        <CircularProgress
                          size={20}
                          style={{ color: "#DC241F" }}
                        />
                      </div>
                    )}
                    <FormControl className={classes.select}>
                      <Select
                        id="status"
                        value={provinceValue}
                        onChange={handleProvinceChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                      >
                        <MenuItem value=" ">Semua Provinsi</MenuItem>
                        {dataProvince.map((item) => {
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
                {/* ===< End Select Province */}
              </Grid>
              <Grid item>
                {/* ===> Start Select Cities */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>
                      Kabupaten :{" "}
                    </Typography>
                  </div>
                  <div item style={{ position: "relative" }}>
                    {/* Loader when hit cities servince */}
                    {isCitiesLoader && (
                      <div className={classes.loaderWrapper}>
                        <CircularProgress
                          size={20}
                          style={{ color: "#DC241F" }}
                        />
                      </div>
                    )}
                    <FormControl className={classes.select}>
                      <Select
                        value={citiesValue}
                        onChange={handleCitiesChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                        disabled={isDisableCities}
                      >
                        <MenuItem value=" ">Semua Kabupaten</MenuItem>
                        {dataCities.map((item) => {
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
                {/* ===< End Select Cities */}
              </Grid>
              <Grid item>
                {/* ===> Start Select Kecamatan */}
                <div className={classes.col}>
                  <div>
                    <Typography className={classes.caption}>
                      Kecamatan :{" "}
                    </Typography>
                  </div>
                  <div item style={{ position: "relative" }}>
                    {/* Loader when hit kecamatan servince */}
                    {isKecamatanLoader && (
                      <div className={classes.loaderWrapper}>
                        <CircularProgress
                          size={20}
                          style={{ color: "#DC241F" }}
                        />
                      </div>
                    )}
                    <FormControl className={classes.select}>
                      <Select
                        value={kecamatanValue}
                        onChange={handleKecamatanChange}
                        input={<BootstrapInput />}
                        IconComponent={DropDownIcon}
                        disabled={isDisableKecamatan}
                      >
                        <MenuItem value=" ">Semua Kecamatan</MenuItem>
                        {dataKecamatan.map((item) => {
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
                {/* ===< End Select Kecamatan */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ margin: 15 }}>
            <Grid container spacing={2}>
              {showReset && (
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
              <Grid item>
                <ChkyButtons
                  onClick={() => {
                    // setResetCounter(prevCount => prevCount + 1);
                    const newData = {
                      provinceId: provinceValue === " " ? "All" : provinceValue,
                      citiesId: citiesValue === " " ? "All" : citiesValue,
                      kecamatanId:
                        kecamatanValue === " " ? "All" : kecamatanValue,
                    };
                    onFilterSubmit(newData);
                    setShowReset(true);
                  }}
                  height={40}
                  style={{ textTransform: "capitalize" }}
                >
                  Apply
                </ChkyButtons>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
SubmissionFilter.propTypes = {
  onFilterSubmit: PropTypes.func.isRequired,
  // handleCounterReset: PropTypes.func.isRequired,
};

export default SubmissionFilter;
