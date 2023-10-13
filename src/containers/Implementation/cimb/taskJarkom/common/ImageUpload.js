import React from 'react';
import { TaskJarkomCtx } from '../Detail';
import GeneralImageUpload from '../../common/fileUpload/GeneralImageUpload';

const ImageContainer = ({ title, name }) => {
  return <GeneralImageUpload {...{ title, name }} parentContext={TaskJarkomCtx} />;
};

export default ImageContainer;
