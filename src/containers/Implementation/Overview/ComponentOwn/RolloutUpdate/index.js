import React, { useState, useEffect } from "react";
import { Chart, Tooltip, LineAdvance, Legend, Axis } from "bizcharts";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core";
import { GrayMedium, Dark } from "../../../../../assets/theme/colors";
import constants from "../../../../../helpers/constants";
import { ReactComponent as ChartIcon } from "../../../../../assets/icons/general/chart_line_red.svg";

const useStyles = makeStyles({
  cardContainer: {
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    width: "100%",
    marginTop: 30,
    overflowX:"auto"
  },
});
const dataDummy = [
  { name: "Bangunan Baru", rate: "Total ter Rollout", value: 3000 },
  { name: "Bangunan Baru", rate: "Target Jumlah", value: 2000 },
  { name: "Renovasi", rate: "Total ter Rollout", value: 2000 },
  { name: "KWH", rate: "Target Jumlah", value: 1000 },
  { name: "KWH", rate: "Total ter Rollout", value: 2000 },
  { name: "Booth", rate: "Target Jumlah", value: 2000 },
  { name: "Signage", rate: "Total ter Rollout", value: 2000 },
  { name: "Sticker Kaca", rate: "Target Jumlah", value: 1500 },
  { name: "Sticker Mesin", rate: "Total ter Rollout", value: 2000 },
  { name: "CCTV", rate: "Target Jumlah", value: 0 },
  { name: "PIN Cover", rate: "Total ter Rollout", value: 500 },
  { name: "Plat Skimming", rate: "Target Jumlah", value: 2900 },
  { name: "Alarm System", rate: "Total ter Rollout", value: 2500 },
  { name: "UPS", rate: "Target Jumlah", value: 2500 },
  { name: "ISO Trans", rate: "Total ter Rollout", value: 2000 },
  { name: "Tempat Sampah", rate: "Target Jumlah", value: 1000 },
  { name: "Tempat Sampah", rate: "Total ter Rollout", value: 1000 },
];
const colorsDummy = ["#DC241F", "#749BFF", "#E6EAF3"];

const colorsAvg = ["#DC241F", "#749BFF"];
const colorsForecast = ["#749BFF", "#DC241F"];

const RollOutUpdate = (props) => {
  const classes = useStyles();
  const { isRupiah } = props;
  const [chartWidth, setChartWidth] = useState(window.innerWidth - 150);
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataToSet=[];
    dataDummy.map((item) => {
      const newRow = {
        name:item.name,
        rate:item.rate,
        value:item.value
      };
      dataToSet.push(newRow);
    });
    setData(dataToSet);
  }, [dataDummy]);

  useEffect(() => {
    const listener = () => {
      setChartWidth(window.innerWidth - 150);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [chartWidth]);
  const numberWithCommas = (x) => {
    if (x === null) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  function getMaxVal() {
    try {
      const maxFromArray = Math.max(...data.map((o) => o.transaction), 0);
      const lenght = maxFromArray.toString().length;
      const squared = Math.pow(10, lenght - 1);
      const pembulatan = Math.ceil(maxFromArray / squared);
      const maxVal = pembulatan * squared;
      return maxVal;
    } catch (err) {
      console.log(err);
    }
    return 0;
  }
  const scale = {
    transaction: {
      min: 0,
      max: getMaxVal(),
      formatter(val) {
        if (isRupiah) {
          return `Rp. ${numberWithCommas(val)}`;
        }
        return numberWithCommas(val);
      },
    },
  };
  useEffect(() => {
    console.log("dataiooo", data);
  }, [data]);
  return (
    <div>
      <Paper className={classes.cardContainer}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item style={{ display: "flex" }}>
                <ChartIcon />
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                  Rollout Update
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Chart
              padding={[30, 20, 60, 80]}
              height={250}
              width={chartWidth}
              autofit
              data={data}
              scale={scale}
            >
              <Tooltip shared showCrosshairs />
              <Legend visible={false} />
              <Axis
                name="name"
                line={{
                  style: {
                    lineWidth: 0,
                  },
                }}
                tickLine={null}
                label={{
                  style: {
                    fill: Dark,
                    fontSize: 10,
                    fontWeight: 500,
                    fontFamily: "Barlow",
                  },
                }}
              />
              <Axis
                name="value"
                label={{
                  style: {
                    fill: GrayMedium,
                    fontSize: 10,
                    fontWeight: 500,
                    fontFamily: "Barlow",
                  },
                }}
                grid={{
                  line: {
                    style: {
                      stroke: GrayMedium,
                      lineWidth: 1,
                      lineDash: [2, 2],
                    },
                  },
                }}
              />
              <LineAdvance
                point={false}
                area
                shape="smooth"
                position="name*value"
                size={1}
                color={
                  data
                    ? data.rate === "Target Jumlah"
                      ? ["rate", colorsForecast]
                      : ["rate", colorsAvg]
                    : ["rate", ["#ffffff", "000000"]]
                }
              />
            </Chart>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default RollOutUpdate;
