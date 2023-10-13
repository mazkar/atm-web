import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, FormControl, Select, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { Typography } from "antd";
import axios from "axios";
import MuiButton from "../../components/Button/MuiButton";
import ChkyButtons from '../../components/chky/ChkyButtons';
import * as Colors from "../../assets/theme/colors";
import { ReactComponent as DropDownIcon } from "../../assets/icons/general/dropdown_red.svg";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import constansts from "../../helpers/constants";
import { dataTypeLokasi } from '../../helpers/constants';

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    width: 100,
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
    width: (width) => width,
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
    "& ::placeholder": {
      color: "#BCC8E7",
      opacity: 1,
      fontStyle: "italic",
    },
    border: 2,
    borderColor: constansts.color.grayMedium,
  },
});

const index = (props) => {
  const {
    onFilterSubmit,
    setCurrentPage,
    classes,
    type,
  } = props;

  const [dataArea, setDataArea] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [valueSelectArea, setValueSelectArea] = useState('All')
  const [valueSelectCity, setValueSelectCity] = useState('All')
  const [locationType, setLocationType] = useState('-')

  useEffect(() => {
    const FetchArea = async () => {
      const constructData = [];
      try {
        // setModalLoader(true);
        const data = await axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getAreas`,
          method: "POST",
          data: { openingType: 'All' },
        });
        const dataPre = data.data.data;
        // console.log('PIC AREA LIST ====> : ', dataPre);
        dataPre.map((item) => {
          const newRow = {
            id: item.id,
            value: item.id,
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
  }, [type]);

  useEffect(() => {
    if (valueSelectArea === "All") {
      setDataCity([]);
    } else {
      const FetchCity = async () => {
        const result = await axios({
          url: `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/citiesByPicArea?picAreaId=${valueSelectArea}`,
          method: "GET",
        });
        setDataCity(result.data.data);
      };
      FetchCity();
    }
  }, [valueSelectArea]);

  const onChangeArea = (e) => {
    const value = e.target.value;
    setValueSelectArea(value);
  };

  const onChangeCity = (e) => {
    const value = e.target.value;
    setValueSelectCity(value);
  };

  function onChangeLoctype(e){
    setLocationType(e.target.value)
  }

  function handleClickFilter(){
    onFilterSubmit({
      areaId: valueSelectArea,
      cityId: valueSelectCity,
      locationType: locationType !== '-' ? locationType : 'All'
    });
    setCurrentPage(0);
  }

  return (
    <Paper className={classes.filterSection}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: 10 }}>
              <Typography className={classes.titleTextFilter}>
                Showing :{" "}
              </Typography>
            </Grid>
            <Grid item style={{ marginRight: 10 }}>
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
            <Grid item style={{ marginRight: 10 }}>
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
            <Grid item style={{ marginRight: 10 }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.label}>Type Lokasi : </Typography>
                </Grid>
                <Grid item>
                  <FormControl className={classes.select}>
                    <Select
                      value={locationType}
                      onChange={onChangeLoctype}
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <MuiButton label="Apply Filter" onClick={handleClickFilter} />
        </Grid>
      </Grid>
    </Paper>
  );
};
index.propTypes = {
  classes: PropTypes.object.isRequired,
  onFilterSubmit: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

index.defaultProps = {
  type: 'New'
};

export default withStyles(styles)(index);
