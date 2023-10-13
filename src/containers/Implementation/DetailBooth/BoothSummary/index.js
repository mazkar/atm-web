import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/styles";
import LongCardSummary from '../../../../components/Card/CardDashTransaction';
import CalculatorIcon from '../../../../assets/images/calculator.png';
import LoadingView from '../../../../components/Loading/LoadingView';
import constansts from '../../../../helpers/constants';

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none'
    },
    paper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: constansts.color.white,
        borderRadius: 10
    },
    divider: {
        marginRight: 20
    }
})

const BoothSummary = props => {
    const { isLoading } = props

    const { t } = useTranslation()

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.paper}>
                {isLoading ?
                    <LoadingView maxheight='100%' />
                    :
                    <LongCardSummary
                        isShort={false}
                        imgIcon={CalculatorIcon}
                        imgStyle={{ height: '30px', width: '30px' }}
                        summaryOptions={{
                            title: t('implementation.detail.booth.vendorStock'),
                            count: 4201
                        }}
                        currency=''
                    />
                }
            </div>
            <div className={classes.divider} />
            <div className={classes.paper}>
                {isLoading ?
                    <LoadingView maxheight='100%' />
                    :
                    <LongCardSummary
                        isShort={false}
                        imgIcon={CalculatorIcon}
                        imgStyle={{ height: '30px', width: '30px' }}
                        summaryOptions={{
                            title: t('implementation.detail.booth.warehouseStock'),
                            count: 4201
                        }}
                        currency=''
                    />
                }
            </div>
        </div>
    );
};

BoothSummary.propTypes = {
    isLoading: PropTypes.bool
}

BoothSummary.defaultProps = {
    isLoading: false
}

export default BoothSummary;