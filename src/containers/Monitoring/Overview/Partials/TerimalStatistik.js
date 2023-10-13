import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid, InputLabel } from "@material-ui/core";
import PropTypes from "prop-types";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

import CloseIcon from "@material-ui/icons/Close";
import {
  ChkyButtons,
  ReactComponent as DropDownIcon,
} from "../../../../assets/icons/general/dropdown_red.svg";

import { ChartOverviewUpDown } from "../../../../components/chky";
import { ReactComponent as CalcIcon } from "../../../../assets/icons/general/chart_line_red.svg";

const { Option } = Select;

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
    padding: "4px 12px 8px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: 70,
    height: 10,
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      width: 70,
      height: 10,
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

// eslint-disable-next-line no-unused-vars
export default function TerimalStatistik(props) {
  const classes = useStyles();

  return (
    <div style={{ padding: 30, paddingTop: 0 }}>
      <Paper
        style={{
          boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
          borderRadius: "10px",
          padding: 20,
        }}
      >
        <div
          style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
        >
          <CalcIcon />
          <Typography
            style={{
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "18px",
              marginLeft: 10,
            }}
          >
            TerimalStatistik
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              {/* ===> Start Select Population */}
              <div className={classes.col}>
                <div item>
                  <FormControl className={classes.select}>
                    <Select
                      id="status"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                    >
                      <MenuItem value="Semua Provinsi ">All Area</MenuItem>
                      {provinciesSuggestions &&
                        provinciesSuggestions.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.value}>
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
            <Grid item>
              {/* ===> Start Select Population */}
              <div className={classes.col}>
                <div item>
                  <FormControl className={classes.select}>
                    <Select
                      id="status"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      input={<BootstrapInput placeholder="all" />}
                      IconComponent={DropDownIcon}
                      placeholder="value"
                    >
                      <MenuItem value="Semua Provinsi ">Cash Out</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* ===< End Select Population */}
            </Grid>
            <Grid item>
              {/* ===> Start Select Population */}
              <div className={classes.col}>
                <div item>
                  <FormControl className={classes.select}>
                    <Select
                      id="status"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                      placeholder="value"
                    >
                      <MenuItem value="Semua Provinsi ">Diebold</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* ===< End Select Population */}
            </Grid>
            <Grid item>
              {/* ===> Start Select Premises */}
              <div className={classes.col}>
                <div item>
                  <FormControl className={classes.select}>
                    <Select
                      // getPopupContainer={(trigger) => trigger.parentNode}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                      // disabled={isDisableKabupaten}
                    >
                      <MenuItem value=" ">Jenis Link</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* ===< End Select Premises */}
            </Grid>
            <Grid item>
              {/* ===> Start Select Brand */}
              <div className={classes.col}>
                <div item>
                  <FormControl className={classes.select}>
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      input={<BootstrapInput />}
                      IconComponent={DropDownIcon}
                      // disabled={isDisableKecamatan}
                    >
                      <MenuItem value=" ">Region</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* ===< End Select Brand */}
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ChartOverviewUpDown />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
