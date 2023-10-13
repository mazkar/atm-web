import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "antd";

import { ChkyChartOverview } from "../../../chky";
import DoubleGrid from "../../../Grid/DoubleGrid";
import { ReactComponent as TitleRateIcon } from "../../../../assets/icons/general/transaction_rate_overview.svg";
import Loading from "../../../Loading/LoadingView";
import EmptyImg from "../../../../assets/images/empty_data.png";

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    background: '#ffffff',
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderRadius: '10px',
    padding: '20px'
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: 500,
    fontSize: '15px',
    color: '#2B2F3C',
    marginLeft: 10
  },
  listName: {
    fontFamily: 'Barlow',
    fontSize: '13px',
    color: '#2B2F3C'
  }
}));

const BudgetControlChart = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { dataChart, isLoading } = props;
  const chartPadding = [30, 10, 40, 100];
  return (
    <div className={classes.container}>
      {isLoading ?
        <Loading maxheight='100%' />
        : dataChart.listData === undefined ? (
          <div style={{
            backgroundImage: `url(${EmptyImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: 75,
            opacity: 0.5,
            width: '100%',
            height: '200px'
          }}></div>
        ) : (
          <div>
            <DoubleGrid

              leftComponent={{
                span: 12,
                component: (
                  <Row style={{ alignItems: 'center' }}>
                    <TitleRateIcon />
                    <div className={classes.title}> {t('budget.status')} </div>
                  </Row>
                )
              }}

              rightComponent={{
                span: 12,
                component: (
                  <Row style={{ justifyContent: 'flex-end' }}>
                    {dataChart.listData.map((value, index) => {
                      return (
                        <Row style={{ marginRight: '10px' }} >
                          <div style={{
                            height: '20px',
                            width: '20px',
                            borderRadius: '4px',
                            background: dataChart.colors[index],
                            marginRight: '10px'
                          }} />
                          <div>
                            <div className={classes.listName}>{value}</div>
                          </div>
                        </Row>
                      );
                    })}
                  </Row>
                )
              }}
            />

            <ChkyChartOverview
              data={dataChart.data}
              positionLine="month*value"
              colorField="rate"
              colors={dataChart.colors}
              isShowLegend={false}
              chartPadding={chartPadding}
              isRupiah
            />
          </div>
        )
      }

    </div>
  );
};

export default BudgetControlChart;

