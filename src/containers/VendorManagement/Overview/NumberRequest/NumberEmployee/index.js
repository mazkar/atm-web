import React from 'react'
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
import { makeStyles } from "@material-ui/styles";
import {
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  Dark,
} from "../../../../../assets/theme/colors";

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

function NumberEmployee(props) {
    const classes = useStyles();
    const pekerjaan='Pekerjaan';
    const {dataChart,isLoad}=props
    const data = [
      {
        label: "Sudah Dibayar",
        value: dataChart.totalPayment !== null ? dataChart.totalPayment:0,
      },
      {
        label: "Belum Dibayar",
        value: dataChart.totalUnpayment !== null ? dataChart.totalUnpayment:0,
      },
    ];

    const donutData = [data[1], data[0]];
    const tplTooltip =
        '<li style="margin-bottom:12px !important;" data-index={index}>' +
        '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
        "{name}: {value}" +
        "</li>";
  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${GrayMedium}`,
        padding: 20,
        height: "100%",
        width: "100%",
      }}
    >
      <Typography
        style={{
          fontWeight: 600,
          fontSize: "18px",
          lineHeight: "18px",
          marginBottom: 40,
          marginTop: 60,
        }}
      >
        Jumlah Pekerjaan
      </Typography>
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
                content={formatted(dataChart.totalOrder)}
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
        "-"
      )}
    </div>
  );
}

export default NumberEmployee
function formatted(number) {
  return numeral(number).format("0,0");
}

function getColor(item) {
  switch (item) {
    case "Sudah Dibayar":
      return PrimaryHard;
    case "Belum Dibayar":
      return SecondaryMedium;
    default:
      return "black";
  }
}