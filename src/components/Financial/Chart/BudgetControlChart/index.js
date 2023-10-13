import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "antd";
import { DonutChart } from "bizcharts";

import { ReactComponent as TitleRateIcon } from "../../../../assets/icons/general/transaction_rate_overview.svg";
import DoubleGrid from "../../../Grid/DoubleGrid";
import Loading from "../../../Loading/LoadingView";
import EmptyImg from "../../../../assets/images/empty_data.png";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        background: '#ffffff',
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: '10px',
    },
    container: {
        width: '100%',
        height: '100%',
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
    statusGood: {
        border: '1px solid #88ADFF',
        borderRadius: '40px',
        background: '#EFF4FF',
        width: '50px',
        height: '24px',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Barlow',
        fontWeight: 500,
        color: '#88ADFF'
    },
    statusBad: {
        border: '1px solid #FF7A76',
        borderRadius: '40px',
        background: '#FFE9E9',
        width: '100px',
        height: '24px',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Barlow',
        fontWeight: 500,
        color: '#FF7A76'
    },
    rightSide: {
        textAlign: 'right'
    },
    bugetTitle: {
        fontFamily: 'Barlow',
        fontWeight: 600,
        fontSize: '13px',
        lineHeight: '16px',
        color: '#2B2F3C'
    },
    amountValue: {
        fontFamily: 'Barlow',
        fontWeight: 600,
        fontSize: '20px',
        color: '#2B2F3C'
    },
    currency: {
        fontFamily: 'Barlow',
        fontWeight: 500,
        fontSize: '13px',
        color: '#000000',
        opacity: '0.3'
    }
}));

const BudgetControlChart = React.memo(props => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { data, isLoading } = props;

    const [newListData, setNewListData] = useState(null);

    useEffect(() => {
        var newData = []
        var totalValue = 0
        if (Object.keys(data).length !== 0) {
            data.listData.map((list, index) => {
                if (list.type !== 'Total Budget') {
                    totalValue = totalValue + list.value
                }
            })
            data.listData.map((list, index) => {
                if (list.type !== 'Total Budget') {
                    newData.push({
                        type: list.type,
                        value: ((list.value / totalValue) * 100).toFixed(2)
                    })
                }
            })
        }
        setNewListData(newData)
    }, [data]);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className={classes.container}>
            {isLoading ?
                <Loading maxheight='100%' />
                : data.status === undefined ? (
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
                            container={{ style: { marginBottom: '50px' } }}

                            leftComponent={{
                                span: 12,
                                component: (
                                    <Row style={{ alignItems: 'center' }}>
                                        <TitleRateIcon />
                                        <div className={classes.title}> {t('budget.information')} </div>
                                    </Row>
                                )
                            }}

                            rightComponent={{
                                span: 12,
                                component: (
                                    <Row style={{ alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                                        <div className={data.status === "Good" ? classes.statusGood : classes.statusBad}>
                                            {data.status}
                                        </div>
                                    </Row>
                                )
                            }}
                        />

                        <DoubleGrid
                            container={{ style: { height: '100%', alignItems: 'center' } }}

                            leftComponent={{
                                span: 8,
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
                                                    fill: '#2B2F3C',
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
                                span: 16,
                                component: (
                                    <div>
                                        {data.listData !== undefined && data.listData.length !== 0 ?
                                            data.listData.map((value, index) =>
                                                value.type === 'Total Budget' ?
                                                    (<DoubleGrid
                                                        container={{ style: { alignItems: 'center', marginBottom: '25px' } }}

                                                        leftComponent={{
                                                            span: 12,
                                                            component: (
                                                                <div className={classes.bugetTitle} style={{ marginLeft: '30px' }}>
                                                                    {value.type}
                                                                </div>
                                                            )
                                                        }}

                                                        rightComponent={{
                                                            span: 12,
                                                            component: (
                                                                <Row style={{ justifyContent: 'flex-end' }}>
                                                                    <div className={classes.currency}>{t('currency')}</div>
                                                                    <div className={classes.amountValue}>
                                                                        {numberWithCommas(value.value)}
                                                                    </div>
                                                                </Row>
                                                            )
                                                        }}
                                                    />)
                                                    :
                                                    (<DoubleGrid
                                                        container={{
                                                            style: {
                                                                alignItems: 'center', marginBottom: '25px'
                                                            }
                                                        }}

                                                        leftComponent={{
                                                            span: 12,
                                                            component: (
                                                                <Row >
                                                                    <div style={{
                                                                        height: '20px',
                                                                        width: '20px',
                                                                        borderRadius: '4px',
                                                                        background: data.colors[index - 1],
                                                                        marginRight: '10px'
                                                                    }} />
                                                                    <div>
                                                                        <div className={classes.bugetTitle}>{value.type}</div>
                                                                    </div>
                                                                </Row>
                                                            )
                                                        }}

                                                        rightComponent={{
                                                            span: 12,
                                                            component: (
                                                                <Row style={{ justifyContent: 'flex-end' }} >
                                                                    <div className={classes.currency}>{t('currency')}</div>
                                                                    <div className={classes.amountValue}>
                                                                        {numberWithCommas(value.value)}
                                                                    </div>
                                                                </Row>
                                                            )
                                                        }}
                                                    />)
                                            )
                                            : ''
                                        }
                                    </div>
                                )
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
})

export default BudgetControlChart

