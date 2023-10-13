/* eslint-disable import/no-useless-path-segments */
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import constansts from '../../../../helpers/constants';
import CommonSelect from '../../../Selects/CommonSelect';

const LetterPayment = props => {
  const { margin1, margin2, fontSize, input, account, handleAccount, banks, handleBank, handleRecipient, accountRecipient, selectBank } = props
  const { t } = useTranslation()
  return (
    <div style={{textAlign:'justify'}}>
      <Grid item className={margin1}>
        <Typography className={fontSize}>{t('modal.rbbImplementation.LOI.letter.content.payment')}</Typography>
      </Grid>
      <Grid container direction='row' className={margin2}>
        <Grid item style={{ marginRight: 20 }}>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>{t('modal.rbbImplementation.LOI.letter.content.accountNumber')}</Typography>
          <NumberFormat value={account} onValueChange={handleAccount} format='#### #### #### ####' className={input} />
        </Grid>
        <Grid item style={{ marginRight: 20 }}>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>{t('modal.rbbImplementation.LOI.letter.content.accountName')}</Typography>
          <input value={accountRecipient} className={input} onChange={handleRecipient} style={{ width: 180, paddingRight: 10 }} type="text" />
        </Grid>
        <Grid item>
          <Typography className={fontSize} style={{ marginBottom: 5 }}>{t('modal.rbbImplementation.LOI.letter.content.bank')}</Typography>
          {/* <CommonSelect bordered suggestions={banks} value={banks} width='180px' handleChange={handleBank} color={constansts.color.dark} /> */}
          <CommonSelect bordered defaultValue={selectBank} suggestions={banks} width='180px' handleChange={handleBank} color={constansts.color.dark} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LetterPayment;