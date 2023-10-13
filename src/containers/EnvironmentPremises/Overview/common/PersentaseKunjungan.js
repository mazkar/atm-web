import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Row, Col } from "antd";
import { Card, Typography, Grid } from "@material-ui/core";
import { ReactComponent as ExchangeIcon } from "../../../../assets/icons/linear-red/exchange-alt.svg";
import numeral from "numeral";
import LoadingView from "../../../../components/Loading/LoadingView";
import {
  Chart,
  Tooltip,
  Interval,
  Legend,
  Axis,
  Annotation,
  Coordinate,
} from "bizcharts";
import {
  GrayMedium,
  SecondaryMedium,
  PrimaryHard,
  Dark,
} from "../../../../assets/theme/colors";
import { useState } from "react";
import { useEffect } from "react";
import { doGetVisitPercentageOverview } from "../../ApiServicesEnvironmentPremises";
import EmptyImg from "../../../../assets/images/empty_data.png";

const useStyle = makeStyles({
  root: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 9,

    border: 0,
    borderRadius: 10,

    maxHeight: 315,
    minHeight: 315,
  },
  barlow: {
    fontFamily: "Barlow",
    fontStyle: "normal",
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  optionStyle: {
    padding: "8.5px 12px",
    border: "1px solid #BCC8E7",
    borderRadius: 8,

    fontSize: 16,
    fontWeight: 600,
    "&:focus": {
      outline: "none",
    },
  },
  legendChart: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
  },
  boxColor1: {
    height: 20,
    width: 48,
    border: 0,
    borderRadius: 4,
    background: PrimaryHard,
  },
  boxColor2: {
    height: 20,
    width: 48,
    border: 0,
    borderRadius: 4,
    background: SecondaryMedium,
  },
  boxColor3: {
    height: 20,
    width: 48,
    border: 0,
    borderRadius: 4,
    background: Dark,
  },
  columnLegend: {
    display: "flex",
    gap: 24,
  },
  textLegend: {
    fontWeight: 400,
    fontSize: 13,
  },
  totalLegend: {
    fontWeight: 600,
    fontSize: 17,
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

const PersentaseKunjungan = () => {
  const classess = useStyle();
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [dataDummy, setDataDummy] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2020);
  const {
    root,
    barlow,
    title,
    subTitle,
    optionStyle,
    legendChart,
    boxColor1,
    boxColor2,
    boxColor3,
    columnLegend,
    textLegend,
    totalLegend,
    loaderWrapper,
  } = classess;
  const donutData = [
    {
      label: "Sesuai Waktu",
      value: 20201,
    },
    {
      label: "Delay",
      value: 3329,
    },
    {
      label: "Tidak Dikerjakan",
      value: 14257,
    },
  ];

  let totalValue1 = donutData.reduce((total, item) => {
    return total + item.value;
  }, 0);

  const yearOption = [2020, 2021, 2022, 2023, 2024, 2025];

  const yearList = yearOption.map((year, index) => (
    <option key={index} value={year}>
      {year}
    </option>
  ));

  const tplTooltip =
    '<li style="margin-bottom:12px !important;" data-index={index}>' +
    '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
    "{name}: {value}" +
    "</li>";

  const formated = (number) => {
    return numeral(number).format("0,0");
  };

  const handleSelectYear = (e) => {
    setSelectedYear(e.target.value);
  };

  function getColor(item) {
    switch (item) {
      case "Sesuai Waktu":
        return PrimaryHard;
      case "Delay":
        return SecondaryMedium;
      case "Tidak Dikerjakan":
        return Dark;
      default:
        return "black";
    }
  }

  function getClassName(item) {
    switch (item) {
      case "Sesuai Waktu":
        return boxColor1;
      case "Delay":
        return boxColor2;
      case "Tidak Dikerjakan":
        return boxColor3;
      default:
        return boxColor3;
    }
  }

  const promiseData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(donutData);
      }, 5000);
    });
  };

  const simulasiFetchData = async () => {
    await promiseData().then((res) => {
      setDataDummy(res);
      setIsLoading(false);
    });
  };

  const convertLabelName = (label) => {
    switch (label) {
      case "sesuaiWaktu":
        return "Sesuai Waktu";
      case "delay":
        return "Delay";
      case "tidakDikerjakan":
        return "Tidak Dikerjakan";
      default:
        return "Unknown Object";
    }
  };

  const convertResponseToUI = (response) => {
    if (!response) return null;
    const dataArr = [];
    response.map((res) => {
      const obj = {};
      obj.label = convertLabelName(res.status);
      obj.value = res.total;
      dataArr.push(obj);
    });
    return dataArr;
  };

  const loaderHandler = (bool) => {
    setIsLoading(bool);
  };

  useEffect(() => {
    setIsLoading(true);
    doGetVisitPercentageOverview(loaderHandler, selectedYear)
      .then((res) => {
        setDataDummy(convertResponseToUI(res.data.status));
        setTotalValue(res.data.totalMachine);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedYear]);

  return (
    <>
      <Card className={root} variant="outlined">
        <Row justify="start" align="middle">
          <Col
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <ExchangeIcon
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Typography className={`${barlow} ${title}`}>
              Persentase Kunjungan
            </Typography>
          </Col>
        </Row>
        {isLoading ? (
          <div className={loaderWrapper}>
            <LoadingView maxheight="100%" isTransparent />
          </div>
        ) : (
          <div
            style={{
              border: "1px solid #BCC8E7",
              padding: 20,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 30,
              marginTop: 10,
            }}
          >
            <Row justify="space-between" align="middle">
              <Col flex={"auto"}>
                <Typography className={`${barlow} ${subTitle}`}>
                  Kunjungan
                </Typography>
              </Col>
              <Col flex={"auto"}>
                <select
                  onChange={handleSelectYear}
                  className={`${barlow} ${optionStyle}`}
                  defaultValue={selectedYear}
                >
                  {yearList}
                </select>
              </Col>
              <Col flex={"auto"}></Col>
            </Row>
            {dataDummy ? (
              <Row align="middle" justify="start" gutter={[20, 20]}>
                <Col>
                  <Chart data={dataDummy} height={140} width={140}>
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
                      content={`${formated(totalValue)}\nMachines`}
                      style={{
                        fontFamily: "Barlow",
                        fontWeight: 600,
                        fontSize: 17,
                        textAlign: "center",
                        fill: Dark,
                      }}
                    />
                    <Axis visible={false} />
                    <Tooltip itemTpl={tplTooltip} showTitle={false} />
                    <Legend visible={false} />
                  </Chart>
                </Col>
                <Col flex={"auto"}>
                  <div className={legendChart}>
                    {dataDummy &&
                      dataDummy.map((data, index) => {
                        return (
                          <Row justify="space-between" align="middle">
                            <Col className={columnLegend}>
                              <div className={getClassName(data.label)}></div>
                              <Typography className={textLegend}>
                                {data.label}
                              </Typography>
                            </Col>
                            <Col>
                              <Typography className={totalLegend}>
                                {formated(parseInt(data.value))}
                              </Typography>
                            </Col>
                          </Row>
                        );
                      })}
                    {/* <Row justify="space-between" align="middle">
                    <Col className={columnLegend}>
                      <div className={boxColor1}></div>
                      <Typography className={textLegend}>
                        Sesuai Waktu
                      </Typography>
                    </Col>
                    <Col>
                      <Typography className={totalLegend}>
                        {formated(20201)}
                      </Typography>
                    </Col>
                  </Row>
                  <Row justify="space-between" align="middle">
                    <Col className={columnLegend}>
                      <div className={boxColor2}></div>
                      <Typography className={textLegend}>Delay</Typography>
                    </Col>
                    <Col>
                      <Typography className={totalLegend}>
                        {formated(3329)}
                      </Typography>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col className={columnLegend}>
                      <div className={boxColor3}></div>
                      <Typography className={textLegend}>
                        Tidak Dikerjakan
                      </Typography>
                    </Col>
                    <Col>
                      <Typography className={totalLegend}>
                        {formated(14257)}
                      </Typography>
                    </Col>
                  </Row> */}
                  </div>
                </Col>
              </Row>
            ) : (
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{ height: 120 }}
                direction="column"
              >
                <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                <Typography
                  style={{
                    opacity: 0.3,
                    textAlign: "center",
                    fontSize: 11,
                    marginTop: 10,
                  }}
                >
                  Empty
                </Typography>
              </Grid>
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default PersentaseKunjungan;
