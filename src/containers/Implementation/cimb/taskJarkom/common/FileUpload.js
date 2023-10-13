import React, { useContext, useEffect, useState } from 'react';
import { TaskJarkomCtx } from '../Detail';
import GeneralFileUpload from '../../common/fileUpload/GeneralFileUpload';

const FileUpload = ({ doc, index, isVendor }) => {
  return <GeneralFileUpload {...{ doc, index, isVendor }} parentContext={TaskJarkomCtx} />;
};

export default FileUpload;
