import { Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChkyButtons } from '../../../../components/chky';

const LetterButton = props => {
  const { margin, cancelButton, sendButton } = props
  const { t } = useTranslation()
  return (
    <Grid container direction='row' className={margin} justify='space-between'>
      <Grid item>
        <ChkyButtons buttonType='redOutlined' onClick={cancelButton} style={{ borderRadius: 6, textTransform: 'none' }}>{t('modal.rbbImplementation.button.cancel')}</ChkyButtons>
      </Grid>
      <Grid item>
        <ChkyButtons onClick={sendButton} style={{ borderRadius: 6, textTransform: 'none' }} >{t('modal.rbbImplementation.button.send')}</ChkyButtons>
      </Grid>
    </Grid>
  );
};

export default LetterButton;