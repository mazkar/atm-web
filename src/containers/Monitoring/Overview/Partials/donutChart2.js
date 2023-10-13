/* eslint-disable indent */
import React, { useContext } from "react";
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
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { GrayMedium, Dark } from "../../../../assets/theme/colors";

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

const SummaryDonutChart2 = (props) => {
  const classes = useStyles();
  const {dataChartCount,upTime,downTime} = props

  const data = [
    {
      label: "Uptime",
      value: 7,
    },
    {
      label: "Downtime",
      value: 3,
    },
  ];

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
      }}
    >
      <>
        <Typography
          style={{
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "18px",
            marginBottom: 12,
          }}
        >
          Presentasi Uptime & Downtime (Count)
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} md={6}>
            <Chart data={dataChartCount} height={180} width={180} autoFit>
              <Coordinate type="theta" radius={1} innerRadius={0.8} />
              <Interval
                adjust="stack"
                position="value"
                shape="sliceShape"
                angleField="value"
                colorField="type"
                color={["label", ["#DC241F", "#FFB443"]]}
              />
              <Annotation.Text
                position={["50%", "50%"]}
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
            <div className={classes.legend}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: "#DC241F",
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
                }}
              >
                Uptime
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  marginLeft: "auto",
                }}
              >
                {upTime} %
              </Typography>
            </div>
            <div className={classes.legend}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: "#FFB443",
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
                }}
              >
                Downtime
              </Typography>
              <Typography
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  marginLeft: "auto",
                }}
              >
                 {downTime} %
              </Typography>
            </div>
          </Grid>
        </Grid>
      </>
    </div>
  );
};
SummaryDonutChart2.propTypes = {
  dataChartCount: PropTypes.object.isRequired,
  upTime: PropTypes.string,
  downTime: PropTypes.string
 
};

export default SummaryDonutChart2;
