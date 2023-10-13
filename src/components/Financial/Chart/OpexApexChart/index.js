import React, { useEffect, useState } from "react";
import { DonutChart } from "bizcharts";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "antd";
import { useTranslation } from "react-i18next";

import TripleGrid from "../../../Grid/TripleGrid";
import DoubleGrid from "../../../Grid/DoubleGrid";
import RupiahConverter from '../../../../helpers/useRupiahConverter';
import Loading from "../../../Loading/LoadingView";

const useStyles = makeStyles({
    root: {
        borderRadius: '8px',
        border: '1px solid #BCC8E7',
        height: '100%',
        width: '100%',
        overflow: 'hidden'
    },
    title: {
        fontFamily: 'Barlow',
        fontSize: '15px',
        fontWeight: '500',
        color: '#2B2F3C',
        lineHeight: '18px',
        margin: '15px'
    },
    type: {
        fontFamily: 'Barlow',
        fontSize: '13px',
        lineHeight: '16px',
        color: '#2B2F3C'
    },
    value: {
        fontFamily: 'Barlow',
        fontSize: '13px',
        fontWeight: '600',
        lineHeight: '16px',
        color: '#2B2F3C'
    },
    column: {
        textAlign: 'center'
    },
    row: {
        width: '100%',
        margin: '6px 0 12px 0'
    },
    columnTitle: {
        margin: '10px 0 10px 0',
        fontFamily: 'Barlow',
        fontSize: '13px',
        lineHeight: '16px',
        color: '#2B2F3C'
    },
    columnValue: {
        marginBottom: '10px',
        fontFamily: 'Barlow',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '22px',
        color: '#2B2F3C'
    }
});

const BudgetDonutChart = React.memo(props => {
    const classes = useStyles();
    const { data, tab, isLoading } = props;
    const { t } = useTranslation();

    // console.log("+++ Data Opex", data);

    const [newListData, setNewListData] = useState(null);

    useEffect(() => {
        if (data.listData !== undefined) {
            var newData = []
            var totalValue = 0
            data.listData.map((list, index) => {
                index < 2
                    ? totalValue = totalValue + list.value
                    : null
            })
            data.listData.map((list, index) => {
                index < 2
                    ? newData.push({
                        type: list.type,
                        value: ((list.value / totalValue) * 100).toFixed(2)
                    }) : null
            })
            setNewListData(newData)
        }
    }, [data]);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className={classes.root}>
            {
                isLoading ?
                    <Loading maxheight='100%' />
                    :
                    <div>
                        <div className={classes.title}>
                            {data.title}
                        </div>

                        <DoubleGrid
                            leftComponent={{
                                span: 12,
                                component: (
                                    <div style={{ margin: '-28px 0 -28px -28px' }}>
                                        <DonutChart
                                            data={newListData}
                                            height={225}
                                            width={225}
                                            padding={0}
                                            color={data.colors}
                                            innerRadius={0.4}
                                            label={{
                                                formatter: (value) => {
                                                    let percentage = value + "%";
                                                    return percentage;
                                                },
                                                style: {
                                                    fill: '#FFFFFF',
                                                    lineWidth: 0,
                                                    fontFamily: 'Barlow',
                                                    fontWeight: 500,
                                                    fontSize: 12,
                                                    lineHeight: 12
                                                }
                                            }}
                                            statistic={{
                                                totalLabel: "",
                                                htmlContent: (item) => {
                                                    return null;
                                                },
                                            }}
                                            legend={{
                                                visible: false,
                                            }}
                                            forceFit
                                            radius={0.8}
                                            angleField="value"
                                            colorField="type"
                                            pieStyle={{ lineWidth: 0 }}
                                        />
                                    </div>
                                )
                            }}

                            rightComponent={{
                                span: 12,
                                component: (
                                    <div>
                                        {data.listData.map((value, index) => {
                                            return (
                                                <Row style={{ marginBottom: '30px', marginLeft: '-20px' }}>
                                                    <div style={{
                                                        height: '20px',
                                                        width: '20px',
                                                        borderRadius: '4px',
                                                        background: data.colors[index],
                                                        marginRight: '10px'
                                                    }} />
                                                    <div>
                                                        <div className={classes.type} style={{ marginBottom: '5px' }}>{value.type}</div>
                                                        <div className={classes.value}>{RupiahConverter(value.value)}</div>
                                                    </div>
                                                </Row>
                                            )
                                        })}
                                    </div>
                                )
                            }}
                        />

                        <div style={{ height: '1px', width: '100%', background: '#BCC8E7' }} />

                        <TripleGrid
                            container={{ className: classes.row }}

                            leftComponent={{
                                className: classes.column,
                                span: 8,
                                component: (
                                    <div>
                                        <div className={classes.columnTitle}>
                                            {tab !== undefined
                                                ? tab === 0
                                                    ? t('mp')
                                                    : t('npb')
                                                : t('npb')}
                                        </div>
                                        <div className={classes.columnValue}>
                                            {numberWithCommas(data.npb)}
                                        </div>
                                    </div>
                                )
                            }}

                            centerComponent={{
                                className: classes.column,
                                span: 8,
                                component: (
                                    <div>
                                        <div className={classes.columnTitle}>
                                            {t('invoice')}
                                        </div>
                                        <div className={classes.columnValue}>
                                            {numberWithCommas(data.invoice)}
                                        </div>
                                    </div>

                                )
                            }}

                            rightComponent={{
                                className: classes.column,
                                span: 8,
                                component: (
                                    <div>
                                        <div className={classes.columnTitle}>
                                            {t('paid.invoice')}
                                        </div>
                                        <div className={classes.columnValue}>
                                            {numberWithCommas(data.paidInvoice)}
                                        </div>
                                    </div>
                                )
                            }}
                        />
                    </div>
            }
        </div>
    );
})

export default BudgetDonutChart;

