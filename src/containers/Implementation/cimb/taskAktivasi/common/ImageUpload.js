import React from 'react';
import { TaskAktivasiCtx } from '../Detail';
import GeneralImageUpload from '../../common/fileUpload/GeneralImageUpload';

const ImageContainer = ({ title, name }) => {
  return <GeneralImageUpload {...{ title, name }} parentContext={TaskAktivasiCtx} />;
};

export default ImageContainer;
