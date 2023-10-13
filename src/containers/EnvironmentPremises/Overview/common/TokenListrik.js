import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography, Grid } from "@material-ui/core";
import { Row, Col } from "antd";
import Constants from "../../../../helpers/constants";
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
import Numeral from "numeral";
import { doGetOverviewElectricity } from "../../ApiServicesEnvironmentPremises";
import EmptyImg from "../../../../assets/images/empty_data.png";

const useStyle = makeStyles({
  root: {
    padding: 20,
    minHeight: 286,
    maxHeight: 286,
    borderRadius: 8,
    overflow: "auto",
  },
  barlow: {
    fontStyle: "normal",
    fontFamily: "Barlow",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  selectStyle: {
    borderColor: Constants.color.grayMedium,
    padding: "8px 12px 8px 12px",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 8,
    "&:focus": {
      outline: "none",
    },
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
  legendChart: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  boxColor1: {
    width: 34,
    height: 20,
    background: Constants.color.primaryHard,
    borderRadius: 4,
  },
  boxColor2: {
    width: 34,
    height: 20,
    background: Constants.color.secondaryMedium,
    borderRadius: 4,
  },
  legendText: {
    fontWeight: 400,
    fontSize: 13,
  },
  legendNumber: {
    fontWeight: 600,
    fontSize: 17,
  },
  legendSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const TokenListrik = () => {
  const classess = useStyle();
  const [dataDummy, setDataDummy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [totalValue, setTotalValue] = useState(0);
  const {
    root,
    barlow,
    title,
    selectStyle,
    loaderWrapper,
    legendChart,
    boxColor1,
    boxColor2,
    legendText,
    legendNumber,
    legendSection,
  } = classess;

  const month =
    "Januari,Februari,Maret,April,Mei,Juni,Juli,Agustus,September,Oktober,November,Desember";

  const splitMonth = month.split(",");

  // ChartData start

  const tplTooltip =
    '<li style="margin-bottom:12px !important;" data-index={index}>' +
    '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
    "{name}: {value}" +
    "</li>";

  const donutData = [
    {
      label: "Pra Bayar",
      value: 6455,
    },
    {
      label: "Pasca Bayar",
      value: 4646,
    },
  ];

  const totalValue1 = donutData.reduce((total, item) => {
    return total + item.value;
  }, 0);

  // ChartData end

  // simulasi fetch Data start

  const promiseFetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(donutData);
      }, 3000);
    });
  };

  const fetchData = async () => {
    await promiseFetchData().then((res) => {
      setDataDummy(res);
      setIsLoading(false);
    });
  };

  const loaderHandler = (bool) => {
    setIsLoading(bool);
  };

  const onChangeSelect = (val) => {
    console.log(val.target.value);
    setSelectedMonth(val.target.value);
  };

  const convertResponseToUI = (response) => {
    if (!response) return null;
    const dataArr = [];
    response.map((res) => {
      const obj = {};
      obj.label = res.electricType;
      obj.value = res.total;
      dataArr.push(obj);
    });
    return dataArr;
  };

  useEffect(() => {
    setIsLoading(true);
    doGetOverviewElectricity(loaderHandler, selectedMonth)
      .then((res) => {
        setDataDummy(convertResponseToUI(res.data.electricType));
        setTotalValue(res.data.totalMachine);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedMonth]);

  // simulasi fetch Data end

  const formated = (num) => {
    return Numeral(num).format("0,0");
  };

  const getColor = (param) => {
    if (param == "Pra Bayar") return Constants.color.primaryHard;
    if (param == "Pasca Bayar") return Constants.color.secondaryMedium;
    return Constants.color.primaryDark;
  };

  const getClassName = (param) => {
    if (param == "Pra Bayar") return boxColor1;
    if (param == "Pasca Bayar") return boxColor2;
    return boxColor1;
  };

  return (
    <>
      <Card variant="outlined" className={root}>
        <Row gutter={[20, 20]} justify="space-between" align="middle">
          <Col>
            <Typography className={`${barlow} ${title}`}>
              Token Listrik
            </Typography>
          </Col>
          <Col>
            <select
              onChange={onChangeSelect}
              className={`${barlow} ${selectStyle}`}
            >
              {splitMonth.map((item, index) => {
                return (
                  <option key={item} value={index + 1}>
                    {item.substring(0, 3)}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>
        {isLoading ? (
          <div className={loaderWrapper}>
            <LoadingView maxheight="100%" isTransparent />
          </div>
        ) : (
          <>
            {dataDummy ? (
              <Row
                gutter={[10, 10]}
                align="middle"
                justify="start"
                style={{ marginTop: 30 }}
              >
                <Col flex={"140px"}>
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
                        fill: Constants.color.primaryDark,
                      }}
                    />
                    <Axis visible={false} />
                    <Tooltip itemTpl={tplTooltip} showTitle={false} />
                    <Legend visible={false} />
                  </Chart>
                </Col>
                <Col
                  flex={"auto"}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {dataDummy.map((data) => (
                    <div className={legendSection}>
                      <Col className={legendChart}>
                        <div className={getClassName(data.label)}></div>
                        <Typography className={legendText}>
                          {data.label}
                        </Typography>
                      </Col>
                      <Col>
                        <Typography className={legendNumber}>
                          {formated(data.value)}
                        </Typography>
                      </Col>
                    </div>
                  ))}
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
          </>
        )}
      </Card>
    </>
  );
};

export default TokenListrik;
