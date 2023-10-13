import React from 'react';

import Layout from './partials/Layout';
import RbbTabPanelItem from './partials/RbbTabPanelItem';
import { sectionRbb } from './constants';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';

const AnalyzeTransaksi = () => {
  return (
    <>
    <Layout
      title="Analisis RBB"
      contents={sectionRbb.map((val, i) => {
        return {
          ...val,
          tabContent: <RbbTabPanelItem title={val.label} index={i} />,
        };
      })}
    />
    {/* <FloatingChat /> */}
    </>
  );
};

export default AnalyzeTransaksi;
