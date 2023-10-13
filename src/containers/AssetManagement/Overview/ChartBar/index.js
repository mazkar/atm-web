import React, { useState, useEffect } from "react";
import {
  makeStyles,
  withStyles,
  Paper,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputBase,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { ReactComponent as TitleRateIcon } from "../../../../assets/icons/general/transaction_rate_overview.svg";
import { ReactComponent as DropDownIcon } from "../../../../assets/icons/general/dropdown_red.svg";
import { Chart, Interval, Tooltip } from "bizcharts";
import LoadingView from "../../../../components/Loading/LoadingView";

const UseStyles = makeStyles({
  boxPaper: {
    padding: 20,
    borderRadius: 10,
  },
  titleChart: {
    fontFamily: "barlow",
    fontSize: 15,
    fontWeight: 500,
    marginLeft: 10,
  },
  titleYear: {
    fontFamily: "Barlow",
    fontSize: 13,
    fontWeight: 400,
    marginRight: 10,
  },
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
});

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

const dataDummy = [
  { label: "2022", type: "Mesin ATM", value: 2800000 },
  { label: "2022", type: "UPS", value: 2260000 },
  { label: "2022", type: "DVR", value: 2800000 },
  { label: "2021", type: "Mesin ATM", value: 2260000 },
  { label: "2021", type: "UPS", value: 1800000 },
  { label: "2021", type: "DVR", value: 1300000 },
  { label: "2020", type: "Mesin ATM", value: 1800000 },
  { label: "2020", type: "UPS", value: 1300000 },
  { label: "2020", type: "DVR", value: 5100000 },
  { label: "2019", type: "Mesin ATM", value: 3900000 },
  { label: "2019", type: "UPS", value: 5000000 },
  { label: "2019", type: "DVR", value: 3900000 },
  { label: "2018", type: "Mesin ATM", value: 1700000 },
  { label: "2018", type: "UPS", value: 1000000 },
  { label: "2018", type: "DVR", value: 1700000 },
  { label: "2017", type: "Mesin ATM", value: 1000000 },
  { label: "2017", type: "UPS", value: 1700000 },
  { label: "2017", type: "DVR", value: 1700000 },
  { label: "2016", type: "Mesin ATM", value: 1700000 },
  { label: "2016", type: "UPS", value: 1000000 },
  { label: "2016", type: "DVR", value: 1700000 },
  { label: "2015", type: "Mesin ATM", value: 1700000 },
  { label: "2015", type: "UPS", value: 1000000 },
  { label: "2015", type: "DVR", value: 1700000 },
];

function generateArrayOfYears() {
  const max = new Date().getFullYear();
  const min = max - 7;
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  // console.log("+++ years", years);
  return years;
}

const numberWithCommas = (x) => {
  if (x === null) {
    return 0;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function ChartBar(props) {
  const classes = UseStyles();
  const arrYears = generateArrayOfYears();
  const [chartYear, setChartYear] = useState(new Date().getFullYear());
  const [maxValue, setMaxValue] = useState(undefined);
  const [isRupiah, setIsRupiah] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //function handling
  const onChangeYear = (newYear) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setChartYear(newYear);
  };

  useEffect(() => {
    const arr = [];
    dataDummy.map((res) => {
      arr.push(res.value);
    });
    const maxData = Math.max.apply(null, arr);
    setMaxValue(maxData);
    console.log(maxData);
  }, [maxValue]);

  const scale = {
    value: {
      min: 0,
      max: maxValue + 500000,
      formatter(val) {
        if (isRupiah) {
          return `Rp. ${numberWithCommas(val)}`;
        }
        return numberWithCommas(val);
      },
    },
  };

  return (
    <div>
      <Paper elevation={1} className={classes.boxPaper}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 20 }}
        >
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <TitleRateIcon />
              </Grid>
              <Grid item>
                <Typography className={classes.titleChart}>
                  Asset Population
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography className={classes.titleYear}>
                  Tahun Pembelian :
                </Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.select}>
                  <Select
                    value={chartYear}
                    onChange={(e) => onChangeYear(e.target.value)}
                    input={<BootstrapInput />}
                    IconComponent={DropDownIcon}
                  >
                    {arrYears.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {isLoading ? (
          <div style={{ height: 300 }}>
            <LoadingView />
          </div>
        ) : (
          <Chart
            height={300}
            padding="auto"
            data={dataDummy}
            autoFit
            filter={[["value", (val) => val != null]]}
            scale={scale}
          >
            <Interval
              adjust={[
                {
                  type: "dodge",
                  marginRatio: 0,
                },
              ]}
              color={["type", ["#DC241F", "#FFB443", "#65D170"]]}
              position="label*value"
              size={13}
            />

            <Tooltip shared={false} showTitle={false} showMarkers={true} />
          </Chart>
        )}
      </Paper>
    </div>
  );
}

ChartBar.PropTypes = {};

export default ChartBar;
