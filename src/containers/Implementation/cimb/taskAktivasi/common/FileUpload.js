import React, { useContext, useEffect, useState } from 'react';
import { TaskAktivasiCtx } from '../Detail';
import GeneralFileUpload from '../../common/fileUpload/GeneralFileUpload';

const FileUpload = ({ doc, index, isVendor }) => {
  return <GeneralFileUpload {...{ doc, index, isVendor }} parentContext={TaskAktivasiCtx} />;
};

export default FileUpload;
