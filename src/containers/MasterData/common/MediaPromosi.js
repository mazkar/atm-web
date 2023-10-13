import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import {
  ChkyInputSmall,
  ChkyMultipleSelect,
  ChkySelectInput,
  ChkyTimePickerAmPm,
  ChkyAutocomplete,
} from '../../../components';
import { useState } from 'react';
import { EditMasterCtx } from '../Edit';
import { useEffect } from 'react';

const defaultOptions = {
  'Signage / Pole Sign': false,
  'Flag Mounted': false,
  'Standart Booth': false,
  'Sticker Pintu': false,
  'Lain-lain': false,
};

const MediaPromosi = () => {
  const { detailData, setDetailData, origMediaPromotions } = useContext(EditMasterCtx);
  const { mediaPromotion } = detailData; // kalau dipake bisa infinite loop
  const [promotionMedia, setPromotionMedia] = useState(defaultOptions);

  useEffect(() => {
    if (origMediaPromotions) {
      const newMedias = {
        ...defaultOptions,
        ...origMediaPromotions.split(',').reduce((prev, cur) => {
          return { ...prev, [cur]: true };
        }, {}),
      };
      setPromotionMedia(newMedias);
    }
  }, [origMediaPromotions]);

  function handleMediaPromosi(val) {
    setDetailData((old) => ({ ...old, mediaPromotion: val }));
  }
  function handleNoteMediaProm(e) {
    const nilai = e.target.value;
    setDetailData((old) => ({ ...old, mediaPromotionNote: nilai }));
  }
  function setUnrendered(e) {
    // console.log('~ e setUnrendered', e);
  }
  return (
    <Grid item xs={4}>
      <Typography
        style={{
          fontWeight: '500',
          fontSize: '15px',
          lineHeight: '18px',
          marginBottom: 5,
        }}
      >
        Media Promosi
      </Typography>
      <ChkyMultipleSelect
        dataSelect={promotionMedia}
        handleSelectAll={(e) => console.log('print handle select all', e)}
        getValue={handleMediaPromosi}
        setUnrendered={setUnrendered}
      />
      <ChkyInputSmall
        multiline
        rows={1}
        placeholder='Note'
        fullWidth
        onChange={handleNoteMediaProm}
        value={detailData.mediaPromotionNote}
      />
    </Grid>
  );
};

export default MediaPromosi;
