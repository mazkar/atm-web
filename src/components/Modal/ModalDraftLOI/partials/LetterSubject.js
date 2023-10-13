import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LetterSubject = props => {
    const { margin, fontSize, subject } = props
    const { t } = useTranslation()

    function isEmpty(obj) {
        for (const x in obj) {
          if (obj.hasOwnProperty(x)) return false;
        }
        return true;
      }

    return (
        <Grid container direction='row' className={margin}>
            <Typography className={fontSize} style={{ fontWeight: 400, marginRight: 3 }}>{t('modal.rbbImplementation.LOI.letter.subject')}</Typography>
            <Typography className={fontSize} style={{ fontWeight: 700 }}>{isEmpty(subject) ? 'N/A' :subject}</Typography>
        </Grid>
    );
};

export default LetterSubject;