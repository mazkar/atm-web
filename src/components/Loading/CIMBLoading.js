import React from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core';
import animationData from '../../assets/cimb-loading.json';

const useStyles = makeStyles({
    loading: {
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const CIMBLoading = props => {
    const { height, width } = props
    const classes = useStyles()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={classes.loading}>
            <Lottie
                options={defaultOptions}
                height={height}
                width={width} />
        </div>
    );
};

export default CIMBLoading;