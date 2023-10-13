import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ReactComponent as BackIcon } from '../../../../assets/icons/general/arrow_back_red.svg';
import { ReactComponent as ProgressIcon } from '../../../../assets/icons/duotone-others/progression-blue.svg';
import { ReactComponent as CheckIcon } from '../../../../assets/icons/duotone-others/check-green.svg';
import { ReactComponent as MinusIcon } from "../../../../assets/icons/duotone-gray/minus-circle.svg";
import { ReactComponent as PlusIcon } from '../../../../assets/icons/siab/plus-white.svg';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import constansts from '../../../../helpers/constants';

const useStyles = makeStyles({
    backAction: {
        padding: 0,
        backgroundColor: 'unset',
        '& .MuiButton-root': {
            padding: 0,
            textTransform: 'none',
            backgroundColor: 'unset'
        },
        '& .MuiButton-root:hover': {
            opacity: 0.6,
            backgroundColor: 'unset'
        }
    },
    backLabel: {
        marginLeft: 5,
        fontFamily: 'Barlow',
        fontSize: 17,
        fontStyle: 'normal',
        fontWeight: 500,
        color: constansts.color.primaryHard
    },
    onlineTarget: {
        fontFamily: 'Barlow',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: 600,
        color: constansts.color.black
    },
    dayLeft: {
        fontFamily: 'Barlow',
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: 500,
        color: constansts.color.grayMedium
    },
    title: {
        fontfamily: 'Barlow',
        fontSize: 36,
        fontStyle: 'normal',
        fontWeight: 500,
        letterSpacing: '0em',
    },
    statusDisplay: {
        display: 'flex',
        justifyContent: 'center'
    },
    completeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 122,
        height: 36,
        padding: '8px 14px 8px 14px',
        border: '1px solid #65D170',
        borderRadius: 4,
        backgroundColor: '#DEFFE1'
    },
    incompleteContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 133,
        height: 36,
        padding: '8px 14px 8px 14px',
        border: '1px solid #749BFF',
        boxSizing: 'border-box',
        borderRadius: 4,
        backgroundColor: '#EBF0FF'
    },
    completeText: {
        marginRight: 10,
        fontFamily: 'Barlow',
        fontSize: 15,
        fontWeight: 600,
        fontStyle: 'normal',
        color: '#65D170',
        textAlign: 'center'
    },
    incompleteText: {
        marginRight: 10,
        fontFamily: 'Barlow',
        fontSize: 15,
        fontWeight: 600,
        fontStyle: 'normal',
        color: '#749BFF',
        textAlign: 'center'
    },
    icon: {
        width: 20,
        height: 20
    },
    addButtonContainer: {
        width: '100%',
        marginTop: 20,
        textAlign: 'end'
    },
    divider: {
        marginTop: 25
    }
})

const StatusComponent = props => {
    const { status } = props

    const { t } = useTranslation()

    const classes = useStyles()

    return (
        <div className={classes.statusDisplay}>
            {status.toLowerCase() === 'complete' ?
                <div className={classes.completeContainer}>
                    <Typography className={classes.completeText}>{t('implementation.detail.booth.complete')}</Typography>
                    <CheckIcon className={classes.icon} />
                </div>
                :
                <div className={classes.incompleteContainer}>
                    <Typography className={classes.incompleteText}>{t('implementation.detail.booth.incomplete')}</Typography>
                    <ProgressIcon className={classes.icon} />
                </div>
            }
        </div>
    )
}

const NoStatusComponent = () => {
    const classes = useStyles()

    return (
        <MinusIcon className={classes.icon} />
    )
}

const BoothInformation = props => {
    const { history, isLoading } = props

    const { t } = useTranslation()

    const classes = useStyles()

    const date = '20 December 2020'
    const remaining = 10

    const backButton = () => {
        history.goBack()
    }

    const actionAddNew = () => {
        console.log('Add New');
    }

    return (
        <div>
            <Grid container direction='row' justify='space-between' >
                <Grid item>
                    <div className={classes.backAction}>
                        <Button onClick={backButton}>
                            <BackIcon />
                            <Typography className={classes.backLabel}>{t('implementation.detail.booth.backButton')}</Typography>
                        </Button>
                    </div>
                </Grid>
                <Grid item>
                    <Grid container direction='column' alignItems='flex-end' >
                        <Typography className={classes.onlineTarget}>{t('implementation.detail.booth.onlineTarget', { date })}</Typography>
                        <Typography className={classes.dayLeft}>
                            {remaining < 2 ?
                                `${remaining} ${t('implementation.detail.booth.dayLeft')}`
                                :
                                `${remaining} ${t('implementation.detail.booth.daysLeft')}`
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <div className={classes.divider} />
            <Grid container direction='row' justify='space-between' style={{ display: 'flex', alignItems: 'center' }}>
                <Grid item>
                    <Typography className={classes.title}>{t('implementation.detail.booth.title')}</Typography>
                </Grid>
                <Grid item>
                    {isLoading ?
                        <NoStatusComponent />
                        :
                        <StatusComponent status='Incomplete' />
                    }
                </Grid>
            </Grid>
            <div className={classes.addButtonContainer}>
                <MuiIconLabelButton
                    style={{ width: 120, height: 40, borderRadius: 6 }}
                    label='Add New'
                    iconPosition='startIcon'
                    buttonIcon={<PlusIcon />}
                    onClick={actionAddNew}
                />
            </div>
        </div>
    );
};

StatusComponent.propTypes = {
    status: PropTypes.string,
}

BoothInformation.propTypes = {
    isLoading: PropTypes.bool
}

BoothInformation.defaultProps = {
    isLoading: false
}

export default BoothInformation;