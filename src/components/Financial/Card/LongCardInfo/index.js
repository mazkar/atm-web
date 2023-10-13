/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from "antd";

import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as IconOverview } from '../../../../assets/icons/general/overview_total_transaction.svg';
import DoubleGrid from "../../../Grid/DoubleGrid";
import TripleGrid from "../../../Grid/TripleGrid";
import { useTranslation } from "react-i18next";
import Loading from "../../../Loading/LoadingView";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,
        border: '1px solid #FFFFFF',
        height: (props) => props.height,
        width: '100%',
        backgroundColor: "#FFFFFF"
    },
    leftSide: {
        textAlign: 'center',
        backgroundImage: 'linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)',
        height: (props) => (props.height) - 2,
        width: 130,
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        marginBottom: '10px',
        fontFamily: 'Barlow',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '22px',
    },
    leftTitle: {
        textAlign: 'center',
        marginBottom: '10px',
        fontFamily: 'Barlow',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '22px',
        color: '#FFFFFF'
    },
    rightSide: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 570
    },
    row: {
        width: '100%',
        margin: '9px 0 12px 0'
    },
    column: {
        textAlign: 'center'
    },
    columnTitle: {
        fontFamily: 'Barlow',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '16px',
        color: '#2B2F3C'
    },
    columnValue: {
        margin: '15px 0 10px 0',
        fontFamily: 'Barlow',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '22px',
        color: '#2B2F3C'
    }
});

function LongCardInfo(props) {
    const classes = useStyles(props);
    const { t } = useTranslation();
    const { data } = props;
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className={classes.root}>
            {
                data.leftTitle === undefined ?
                    <Loading maxheight='100%' />
                    :
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className={classes.leftSide}>
                            <div>{data.leftIcon}</div>
                            <div>{data.leftTitle}</div>
                        </div>
                        <div className={classes.rightSide}>
                            {data.listData !== undefined && data.listData.length === 3 ? (
                                <TripleGrid
                                    container={{ className: classes.row }}

                                    leftComponent={{
                                        className: classes.column,
                                        span: 8,
                                        component: (
                                            <div>

                                                <div className={classes.columnValue}>
                                                    {numberWithCommas(data.listData[0].value)}
                                                </div>
                                                <div className={classes.columnTitle}>
                                                    {data.listData[0].type}
                                                </div>
                                            </div>
                                        )
                                    }}

                                    centerComponent={{
                                        className: classes.column,
                                        span: 8,
                                        component: (
                                            <div>
                                                <div className={classes.columnValue}>
                                                    {numberWithCommas(data.listData[1].value)}
                                                </div>
                                                <div className={classes.columnTitle}>
                                                    {data.listData[1].type}
                                                </div>
                                            </div>

                                        )
                                    }}

                                    rightComponent={{
                                        className: classes.column,
                                        span: 8,
                                        component: (
                                            <div>
                                                <div className={classes.columnValue}>
                                                    {numberWithCommas(data.listData[2].value)}
                                                </div>
                                                <div className={classes.columnTitle}>
                                                    {data.listData[2].type}
                                                </div>
                                            </div>
                                        )
                                    }}
                                />
                            )
                                : data.listData !== undefined && data.listData.length === 4 ? (
                                    <DoubleGrid
                                        container={{ className: classes.row }}
                                        leftComponent={{
                                            span: 12,
                                            component: (
                                                <DoubleGrid
                                                    container={{ className: classes.row }}
                                                    leftComponent={{
                                                        className: classes.column,
                                                        span: 12,
                                                        component: (
                                                            <div>
                                                                <div className={classes.columnValue}>
                                                                    {numberWithCommas(data.listData[0].value)}
                                                                </div>
                                                                <div className={classes.columnTitle}>
                                                                    {data.listData[0].type}
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                    rightComponent={{
                                                        className: classes.column,
                                                        span: 12,
                                                        component: (
                                                            <div>
                                                                <div className={classes.columnValue}>
                                                                    {numberWithCommas(data.listData[1].value)}
                                                                </div>
                                                                <div className={classes.columnTitle}>
                                                                    {data.listData[1].type}
                                                                </div>
                                                            </div>
                                                        )
                                                    }}

                                                />)
                                        }}
                                        rightComponent={{
                                            span: 12,
                                            component: (
                                                <DoubleGrid
                                                    container={{ className: classes.row }}
                                                    leftComponent={{
                                                        className: classes.column,
                                                        span: 12,
                                                        component: (
                                                            <div>
                                                                <div className={classes.columnValue}>
                                                                    {numberWithCommas(data.listData[2].value)}
                                                                </div>
                                                                <div className={classes.columnTitle}>
                                                                    {data.listData[2].type}
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                    rightComponent={{
                                                        className: classes.column,
                                                        span: 12,
                                                        component: (
                                                            <div>
                                                                <div className={classes.columnValue}>
                                                                    {numberWithCommas(data.listData[3].value)}
                                                                </div>
                                                                <div className={classes.columnTitle}>
                                                                    {data.listData[3].type}
                                                                </div>
                                                            </div>
                                                        )
                                                    }}

                                                />
                                            )
                                        }}

                                    />
                                ) : null}
                        </div>
                    </div>
            }
        </div>
    );
}

LongCardInfo.propTypes = {
    height: PropTypes.number,
};
LongCardInfo.defaultProps = {
    height: 80,
};

export default LongCardInfo;

