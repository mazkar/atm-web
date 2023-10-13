import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { ChkyTabsAsOption } from '../../../../components';
import constansts from '../../../../helpers/constants';
import LoadingView from '../../../../components/Loading/LoadingView';

const useStyles = makeStyles({
    container: {
        width: '100%',
        '& .MuiPaper-elevation1': {
            boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        },
        background: constansts.color.white,
        padding: '20px 35%',
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: 10
    },
})
const BoothTabs = props => {
    const { setTableTab, isLoading } = props

    const { t } = useTranslation()

    const handleChangeTab = value => {
        setTableTab(value)
    }

    const classes = useStyles()

    return (
        <div className={classes.container}>
            {isLoading ?
                <LoadingView maxheight='100%' />
                :
                <ChkyTabsAsOption
                    currentTab={0}
                    dataTab={[t('implementation.detail.booth.procurement'), t('implementation.detail.booth.destroy')]}
                    handleChangeTab={handleChangeTab}
                />
            }
        </div>
    );
};

BoothTabs.propTypes = {
    isLoading: PropTypes.bool
}

BoothTabs.defaultProps = {
    isLoading: false
}

export default BoothTabs;