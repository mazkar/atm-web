import React from 'react';

import Layout from './partials/Layout';
import TrxTabPanelItem from './partials/TrxTabPanelItem';
import { sectionTrx } from './constants';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';

const AnalyzeTransaksi = () => {
  return (
    <>
    <Layout
      title="Analisis Transaksi"
      contents={sectionTrx.map((val, i) => {
        return {
          ...val,
          tabContent: <TrxTabPanelItem title={val.label} />,
        };
      })}
    />
    {/* <FloatingChat /> */}
    </>
  );
};

export default AnalyzeTransaksi;
