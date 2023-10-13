import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  Paper,
  Typography,
  Grid,
  MenuItem,
  Button,
  InputAdornment,
  Select,
  FormControl,
  OutlinedInput,
  InputBase,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RedHard } from "../../../../assets/theme/colors";
import { GrayMedium } from "../../../../assets/theme/colors";
import { DatePicker } from "antd";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  select: {
    padding: 10,
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

const UseStyle = makeStyles({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    padding: "15px 10px",
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
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: 6,
    border: "1px solid #BCC8E7",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      textOverflow: "ellipsis !important",
      fontSize: 14,
    },
    "&:hover": {
      border: "1px solid #000000",
      boxShadow: "0 0 2px #000000",
    },
  },
  formSelect: {
    width: "auto",
    borderRadius: 6,
    fontSize: 14,
    color: "#BCC8E7",
  },
});

function FilterData() {
  const classes = UseStyle();

  const [tanggal, setTanggal] = useState("");
  const [valueVendor, setValueVendor] = useState(10);

  const handleValueVendor = (event) => {
    setValueVendor(event.target.value);
  };

  //function

  const handleChangeSort = (event) => {
    setValueVendor(event.target.value);
  };
  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* batas head container */}
          <Grid item>
            <Grid
              container
              direction="row"
              spacing={8}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography>Showing : </Typography>
              </Grid>
              <Grid item>
                <div className={classes.col}>
                  <div>
                    <Typography variant="body2" style={{ marginRight: 5 }}>
                      Urutkan
                    </Typography>
                  </div>
                  <div>
                    {/* form control 1 */}

                    <FormControl size="small" color={false}>
                      <Select
                        className={classes.formSelect}
                        id="status"
                        value={10}
                        onChange={handleValueVendor}
                        IconComponent={() => (
                          <ExpandMoreIcon
                            style={{ color: "#DC241F", marginRight: 5 }}
                          />
                        )}
                        variant="outlined"
                        size="small"
                        onChange={handleChangeSort}
                      >
                        <MenuItem style={{ fontSize: 14 }} value={10}>
                          Berdasarkan vendor
                        </MenuItem>
                        <MenuItem style={{ fontSize: 14 }} value={20}>
                          Lokasi
                        </MenuItem>
                        <MenuItem style={{ fontSize: 14 }} value={30}>
                          Jenis Barang
                        </MenuItem>
                      </Select>
                    </FormControl>

                    {/* form control 2 */}
                    {/* <FormControl size="small">
                      <Select
                        size="small"
                        defaultValue="vendor"
                        variant="outlined"
                        style={{
                          paddingRight: 10,
                          width: 190,
                          fontSize: 12,
                          borderColor: GrayMedium,
                        }}
                        IconComponent={() => (
                          <ExpandMoreIcon style={{ color: RedHard }} />
                        )}
                      >
                        <MenuItem value="vendor">Berdasarkan vendor</MenuItem>
                        <MenuItem value="name">Berdasarkan Nama</MenuItem>
                        <MenuItem value="age">Berdasarkan Umur</MenuItem>
                        <MenuItem value="gender">Berdasarkan Gender</MenuItem>
                      </Select>
                    </FormControl> */}
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.col}>
                  <div>
                    <Typography variant="body2" style={{ marginRight: 5 }}>
                      Filter
                    </Typography>
                  </div>
                  <DatePicker
                    format="DD/MM/YYYY"
                    popupStyle={{ zIndex: 1500 }}
                    allowClear={false}
                    suffixIcon={<CalendarIcon />}
                    placeholder="Tanggal"
                    className={classes.datePicker}
                    value={tanggal}
                    onChange={(newDate) => {
                      let valDate = "";
                      if (newDate === null) {
                        valDate = "";
                      } else {
                        valDate = newDate.unix() * 1000;
                      }
                      onChangeStartDate(moment.unix(valDate / 1000));
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              style={{
                textTransform: "capitalize",
                backgroundColor: RedHard,
                color: "white",
              }}
              variant="contained"
              size="medium"
            >
              <Typography>Apply Filter</Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default FilterData;
