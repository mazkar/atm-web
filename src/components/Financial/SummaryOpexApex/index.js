import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "antd";

import { ReactComponent as TitleRateIcon } from "../../../assets/icons/general/transaction_rate_overview.svg";
import { ReactComponent as Briefcase } from "../../../assets/images/briefcase.svg";
import { ReactComponent as Payment } from "../../../assets/images/payment.svg";
import { ChkyTabsAsOption, ChkyOverviewTransaction } from "../../chky";
import OpexApexChart from "../Chart/OpexApexChart";
import TripleGrid from "../../Grid/TripleGrid";
import Loading from "../../Loading/LoadingView";
import useRupiahConverter from '../../../helpers/useRupiahConverter';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        background: '#ffffff',
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: '10px',
        padding: '20px'
    },
    tripleGrid: {
        alignItems: 'center'
    },
    midColumn: {
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Barlow',
        fontSize: '15px',
        fontWeight: '500',
        color: '#2B2F3C',
        lineHeight: '18px',
        margin: '5px'
    },
    npbContainer: {
        borderRadius: '8px',
        border: '1px solid #BCC8E7',
        padding: '10px',
        width: '100%',
        height: '100%'
    },
    bottomContent: {
        marginTop: '20px'
    }
}));

const SummaryOpexApex = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { dataChartOpex, dataChartApex, dataNpb, currentTabMapsRate, handleChangeTab, isLoading } = props;

    return (
        <div className={classes.container}>
            <TripleGrid
                container={{ className: classes.tripleGrid }}

                leftComponent={{
                    span: 8,
                    component: (
                        <Row style={{ alignItems: 'center' }}>
                            <TitleRateIcon />
                            <div style={{ marginLeft: '10px' }}> {t('budget.information')} </div>
                        </Row>
                    )
                }}

                centerComponent={{
                    span: 8,
                    component: (
                        <ChkyTabsAsOption
                            currentTab={currentTabMapsRate}
                            dataTab={['By MP', 'By NPB']}
                            handleChangeTab={handleChangeTab}
                        />
                    )
                }}

                rightComponent={{
                    span: 8,
                    component: (
                        <div />
                    )
                }}
            />
            <TripleGrid
                container={{ className: classes.bottomContent, gutter: 20 }}

                leftComponent={{
                    span: 9,
                    component: (
                        <OpexApexChart
                            tab={props.currentTabMapsRate}
                            data={dataChartOpex}
                            isLoading={isLoading}
                        />
                    )
                }}

                centerComponent={{
                    span: 9,
                    component: (
                        <OpexApexChart
                            tab={props.currentTabMapsRate}
                            data={dataChartApex}
                            isLoading={isLoading}
                        />
                    )
                }}

                rightComponent={{
                    span: 6,
                    component: (
                        <div className={classes.npbContainer}>
                            {
                                isLoading ?
                                    <Loading maxheight='100%' />
                                    :
                                    <div>
                                        <div className={classes.title}>{props.currentTabMapsRate === 0 ? t('differece.mp') : t('differece.npb')}</div>
                                        <div style={{ margin: '20px 0' }}>
                                            <ChkyOverviewTransaction leftIcon={<Briefcase />} title={t('invoice')} value={useRupiahConverter(dataNpb.invoice, true)} height={90} isRupiah />
                                        </div>
                                        <div style={{ margin: '20px 0' }}>
                                            <ChkyOverviewTransaction leftIcon={<Payment />} title={t('payment')} value={useRupiahConverter(dataNpb.payment, true)} height={90} isRupiah />
                                        </div>
                                    </div>
                            }
                        </div>
                    )
                }}
            />
        </div>
    )
}

export default SummaryOpexApex

