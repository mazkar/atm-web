import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Typography } from "antd";
import { Grid, Paper } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
import Axios from "axios";
import { ReactComponent as DropDownIcon } from "../../../assets/icons/general/dropdown_red.svg";
import {
  ChkyButtons,
  SearchBarFilterSecondary,
} from "../../../components/chky";
import ModalLoader from "../../../components/ModalLoader";
import MuiButton from "../../../components/Button/MuiButton";
import ChkySearchFilter from "../../../components/chky/ChkySearchFilter";

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
  },
  col: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  caption: {
    fontSize: 13,
    color: "#2B2F3C",
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  select: {
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

const FilterProcurement = (props) => {
  const classes = useStyles();
  const { onFilterSubmit } = props;

  const [dataFilter, setDataFilter] = useState(null);
  const [provinceValue, setProvinceValue] = useState(" ");
  const [kabupatenValue, setKabupatenValue] = useState(" ");
  const [kecamatanValue, setKecamatanValue] = useState(" ");
  const [search, setSearch] = useState("");
  const [type, setType] = useState('All')

  const [provinceResponse, setProvinceResponse] = useState(null);
  const [citiesResponse, setCitiesResponse] = useState(null);
  const [districtResponse, setDistrictResponse] = useState(null);

  const [isOpenModalLoader, setModalLoader] = useState(false);

  const [isDisableKabupaten, setIsDisableKabupaten] = useState(true);
  const [isDisableKecamatan, setIsDisableKecamatan] = useState(true);

  const handleProvinceChange = (event) => {
    setProvinceValue(event.target.value);
    setKabupatenValue(" ");
    setKecamatanValue(" ");
    setIsDisableKecamatan(true);
    getCity(event.target.value);
    if (event.target.value) {
      if (event.target.value === " ") {
        setIsDisableKabupaten(true);
      }
      setIsDisableKabupaten(false);
    } else {
      setIsDisableKecamatan(true);
    }
  };

  const handlePremisesChange = (event) => {
    setKabupatenValue(event.target.value);
    setKecamatanValue(" ");
    if (event.target.value !== "-") {
      setIsDisableKecamatan(false);
    } else {
      setIsDisableKecamatan(true);
    }
    getDistrict(event.target.value);
  };

  const handleBrandChange = (event) => {
    setKecamatanValue(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const changeDataFilter = () => {
    const newFilterData = {
      provinceId: provinceValue === " " ? "" : provinceValue,
      cityId: kabupatenValue === " " ? "" : kabupatenValue,
      districtId: kecamatanValue === " " ? "" : kecamatanValue,
      locationName: search === " " ? "" : search,
      type
    }
    onFilterSubmit(newFilterData);
    setDataFilter(newFilterData);
  };

  const resetDataFilter = () => {
    setProvinceValue(" ");
    setKabupatenValue(" ");
    setKecamatanValue(" ");
    setIsDisableKabupaten(true);
    setIsDisableKecamatan(true);
    onFilterSubmit(null);
    setDataFilter(null);
    setType('All')
    setSearch('')
  };

  useEffect(() => {
    getProvince();
  }, []);

  const getProvince = async () => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getProvince`,
        method: "GET",
      });
      const dataPre = data.data.data;
      console.log("PROVINCE LIST ====> : ", dataPre);
      dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
      });
      setProvinceResponse(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  };

  const getCity = async (value) => {
    const constructData = [];
    if (value === " ") {
      setCitiesResponse([]);
    } else {
      try {
        setModalLoader(true);
        const data = await Axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByProvince?provinceId=${value}`,
          method: "GET",
        });
        const dataPre = data.data.data;
        console.log("PROVINCE LIST ====> : ", dataPre);
        dataPre.map((item) => {
          const newRow = {
            id: item.id,
            value: item.id,
            name: item.name,
          };
          constructData.push(newRow);
        });
        setCitiesResponse(constructData);
        setModalLoader(false);
      } catch (error) {
        setModalLoader(false);
        console.log(`Error Fetching Get Province List : \n ${error}`);
      }
    }
  };

  const getDistrict = async (value) => {
    const constructData = [];
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/districtByCity?cityId=${value}`,
        method: "GET",
      });
      const dataPre = data.data.data;
      console.log("PROVINCE LIST ====> : ", dataPre);
      dataPre.map((item) => {
        const newRow = {
          id: item.id,
          value: item.id,
          name: item.name,
        };
        constructData.push(newRow);
      });
      setDistrictResponse(constructData);
      setModalLoader(false);
    } catch (error) {
      setModalLoader(false);
      console.log(`Error Fetching Get Province List : \n ${error}`);
    }
  };
  const handleKeyword = (value) => {
    setSearch(value);
  };

  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid container spacing={1} style={{ padding: "16px 16px" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography className={classes.title}>Filter : </Typography>
            </Grid>
            <Grid item xs={12} sm container spacing={1} alignItems="center">
              <Grid item>
                <Typography className={classes.caption}>Provinsi :</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    id="status"
                    value={provinceValue}
                    onChange={handleProvinceChange}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    <MenuItem value=" ">Provinsi</MenuItem>
                    {provinceResponse &&
                      provinceResponse.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.value}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography className={classes.caption}>Kabupaten :</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={kabupatenValue}
                    onChange={handlePremisesChange}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                    disabled={isDisableKabupaten}
                  >
                    <MenuItem value=" ">Kabupaten</MenuItem>
                    {citiesResponse &&
                      citiesResponse.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.value}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Typography className={classes.caption}>Kecamatan :</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={kecamatanValue}
                    onChange={handleBrandChange}
                    getPopupContainer={(trigger) => trigger.parentNode}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                    disabled={isDisableKecamatan}
                  >
                    <MenuItem value=" ">Kecamatan</MenuItem>
                    {districtResponse &&
                      districtResponse.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.value}>
                            {item.name}
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
                    value={type}
                    onChange={handleTypeChange}
                    getPopupContainer={(trigger) => trigger.parentNode}
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
              <Grid item>
                <SearchBarFilterSecondary
                  placeholder="Nama Lokasi"
                  onChangeEffect={handleKeyword}
                  // onResetKeyword={handleResetKeyword}
                  keywordFromParent={search}
                  height="41px"
                  width={170}
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

FilterProcurement.PropTypes = {
  onFilterSubmit: PropTypes.func,
};

FilterProcurement.defaultProps = {
  onFilterSubmit: () => console.log("====> JOM onFilterSubmit Clicked"),
};

export default FilterProcurement;

const typeOptions = [
  'All',
  'New ATM',
  'New Location',
  'Renewal',
  'Reopen',
]