import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import BoothInformation from './BoothInformation';
import BoothSummary from './BoothSummary';
import BoothTabs from './BoothTabs';
import BoothTable from './BoothTable';

const useStyles = makeStyles({
    root: {
        padding: '30px 30px 20px 30px'
    },
    divider: {
        marginTop: 25
    }
})

const KesiapanBooth = props => {
    const { history } = props

    const classes = useStyles()

    const [isLoading, setIsLoading] = useState(false)
    const [tabTableTab, setTableTab] = useState(0)

    return (
        <div className={classes.root}>
            <BoothInformation
                history={history}
                isLoading={isLoading}
            />
            <div className={classes.divider} />
            <BoothSummary
                isLoading={isLoading}
            />
            <div className={classes.divider} />
            <BoothTabs
                setTableTab={setTableTab}
                isLoading={isLoading}
            />
            <div className={classes.divider} />
            <BoothTable
                tabTableTab={tabTableTab}
                isLoading={isLoading}
            />
        </div>
    );
};

export default KesiapanBooth;