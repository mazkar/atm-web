/* eslint-disable import/no-useless-path-segments */
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import constansts from '../../../../helpers/constants';
import CommonSelect from '../../../../components/Selects/CommonSelect';
import DateSelectTimestamp from '../../../../components/Selects/DateSelectTimestamp';

const LetterNegotiation = props => {
  const { margin1, margin2, fontSize, input, value, handleChange, communications, handleSelect, letterNumber, commValue } = props
  const { t } = useTranslation()
  return (
    <div>
      <Grid item className={margin1}>
        <Typography className={fontSize}>{t('modal.rbbImplementation.LOI.letter.content.one')}</Typography>
      </Grid>
      <Grid container direction='row' className={margin2}>
        <Grid item style={{ marginRight: 20 }}>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>{t('modal.rbbImplementation.LOI.letter.content.date')}</Typography>
          <DateSelectTimestamp value={value} handleChange={handleChange} width='140px' popupStyle={{ zIndex: 1700 }} />
        </Grid>
        <Grid item style={{ marginRight: 20 }}>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>{t('modal.rbbImplementation.LOI.letter.content.letterNumber')}</Typography>
          <input className={input} type='any' defaultValue={letterNumber} disabled={true}/>
        </Grid>
        <Grid item>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>{t('modal.rbbImplementation.LOI.letter.content.communication')}</Typography>
          {/* <CommonSelect bordered suggestions={communications} value={communications} width='140px' handleChange={handleSelect} color={constansts.color.dark} /> */}
          <CommonSelect bordered suggestions={communications} width='140px' handleChange={handleSelect} color={constansts.color.dark} defaultValue={commValue} disable={true}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default LetterNegotiation;