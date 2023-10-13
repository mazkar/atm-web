import React from "react";
import { Typography, Grid } from "@material-ui/core";
import {
  Chart,
  Tooltip,
  Interval,
  Legend,
  Axis,
  Annotation,
  Coordinate,
} from "bizcharts";
import numeral from "numeral";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  Dark,
} from "../../../../../assets/theme/colors";
import NoData from "../../../../SiteAndManagement/Overview/partials/NoData";

const useStyles = makeStyles(() => ({
  legend: {
    display: "flex",
    alignItems: "center",
    marginBottom: 14,
    "&:last-child": {
      marginBottom: 0,
    },
  },
}));

function ChartObject(props) {
  const classes = useStyles();
  const {dataChart}= props
  const pekerjaan = "Pekerjaan";
  const data = [
    {
      label: "Sudah Diperpanjang",
      value: dataChart.sudahPerpanjang,
    },
    {
      label: "Belum Diperpanjang",
      value: dataChart.belumPerpanjang,
    },
  ];

  const donutData = [data[1], data[0]];
  const tplTooltip =
    '<li style="margin-bottom:12px !important;" data-index={index}>' +
    '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
    "{name}: {value}" +
    "</li>";
  return (
    <div>
      {data.length > 0 ? (
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ paddingBottom: 15 }}
        >
          <Grid item xs={6} md={6}>
            <Chart data={donutData} height={140} width={140}>
              <Coordinate type="theta" radius={1} innerRadius={0.8} />
              <Interval
                adjust="stack"
                position="value"
                color={[
                  "label",
                  (label) => {
                    return getColor(label);
                  },
                ]}
                shape="sliceShape"
              />
              <Annotation.Text
                position={["50%", "50%"]}
                content={formatted(dataChart.totalObjekPajak)}
                style={{
                  fontFamily: "Barlow",
                  fontWeight: 600,
                  fontSize: 17,
                  lineHeight: "20px",
                  textAlign: "center",
                  fill: Dark,
                }}
              />
              <Axis visible={false} />
              <Tooltip itemTpl={tplTooltip} showTitle={false} />
              <Legend visible={false} />
            </Chart>
          </Grid>
          <Grid item xs={6} md={6}>
            {data?.map((val, i) => {
              return (
                <div key={i} className={classes.legend}>
                  <div
                    style={{
                      width: 25,
                      height: 20,
                      backgroundColor: getColor(val.label),
                      borderRadius: 4,
                    }}
                  >
                    &nbsp;
                  </div>
                  <Typography
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      marginLeft: 5,
                      fontWeight: 400,
                    }}
                  >
                    {val.label}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "13px",
                      lineHeight: "16px",
                      marginLeft: "auto",
                      fontWeight: 600,
                    }}
                  >
                    {formatted(val.value)}
                  </Typography>
                </div>
              );
            })}
          </Grid>
        </Grid>
      ) : (
        <NoData/>
      )}
    </div>
  );
}

ChartObject.PropTypes={
  dataChart:PropTypes.object
}
ChartObject.defaultProps={
  dataChart:{
    sudahPerpanjang:0,
    belumPerpanjang:0,
    totalObjekPajak:0
  }
}
export default ChartObject;
function formatted(number) {
  return numeral(number).format("0,0");
}

function getColor(item) {
  switch (item) {
    case "Sudah Diperpanjang":
      return PrimaryHard;
    case "Belum Diperpanjang":
      return SecondaryMedium;
    default:
      return "black";
  }
}
