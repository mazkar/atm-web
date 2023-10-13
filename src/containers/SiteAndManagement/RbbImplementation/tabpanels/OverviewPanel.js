import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Overview from '../OverviewCard';
import StarIcon from '../../../../assets/icons/siab/star.png';
import UndoIcon from '../../../../assets/icons/siab/undo.png';
import CloseIcon from '../../../../assets/icons/siab/times-circle.png';
import TableSummary from '../TableRBB';
import { ReactComponent as IconClose } from '../../../../assets/icons/siab/times-circle.svg';
import { ReactComponent as IconStar } from '../../../../assets/icons/siab/star.svg';
import { ReactComponent as IconRefresh } from '../../../../assets/icons/siab/undo.svg';

const useStyles = makeStyles({
  tableContent: {
    marginTop: 20,
  },
});

const RbbImplementation = () => {
  const classes = useStyles();
  const [isLoadCard, setIsLoadCard] = useState(true);
  const [isLoadNew, setIsLoadNew] = useState(true);
  const [isLoadRenewal, setIsLoadRenewal] = useState(true);
  const [isLoadTermin, setIsLoadTermin] = useState(true);
  const [overviewCard, setOverviewCard] = useState({
    overviewNewAtm: {
      target: 0,
      actual: 0,
    },
    overviewRenewal: {
      target: 0,
      actual: 0,
    },
    overviewTerminResponse: {
      target: 0,
      actual: 0,
    },
    overviewUnplan: {
      target: 0,
      actual: 0,
    },
  });
  const [summaryNew, setSummaryNew] = useState([]);
  const [summaryRenewal, setSummaryRenewal] = useState([]);
  const [summaryTermin, setSummaryTermin] = useState([]);

  const [grantTotalNew, setGrantTotalNew] = useState([]);
  const [grantTotalRenewal, setGrantTotalRenewal] = useState([]);
  const [grantTotalTermin, setGrantTotalTermin] = useState([]);

  const hitApiCardOverview = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/overviewSummary`
      );
      try {
        const overviewCardSet = result.data;
        setOverviewCard(overviewCardSet);
        setIsLoadCard(false);
      } catch (err) {
        setIsLoadCard(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setIsLoadCard(false);
    }
  };

  const hitApiSummaryNew = async () => {
    const dataSummaryNewSet = [];
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getSummaryNewAtm`
      );
      try {
        const dataSumNewPre = result.data.data.summaries;
        const dataSumNewGrand = result.data.data;
        let grandTotal = [
          dataSumNewGrand.totalTarget,
          dataSumNewGrand.totalTargetRemaining,
          dataSumNewGrand.totalSubmission,
          dataSumNewGrand.totalBiReportedCount,
          dataSumNewGrand.totalBiReportedRemaining < 0
            ? 'N/A'
            : dataSumNewGrand.totalBiReportedRemaining,
        ];
        dataSumNewPre.map((row, idx) => {
          const cityes = [];
          const dataCitiesNew = row.cities;
          dataCitiesNew.map((item, indx) => {
            const tipe = [];
            const dataTipeNew = item.openingTypes;
            dataTipeNew.map((itm, idex) => {
              const tipeRow = {
                key: 'locType' + idx + indx + idex,
                areaIndex: itm.name,
                targetIndex: itm.target,
                sisaTargetIndex: itm.targetRemaining,
                submissionIndex: itm.submission,
                laporbiIndex: itm.biReportedCount,
                sisalaporbiIndex: itm.biReportedRemaining,
              };
              tipe.push(tipeRow);
            });
            const citiesRow = {
              key: 'cityType' + idx + indx,
              areaIndex: item.name,
              targetIndex: item.target,
              sisaTargetIndex: item.targetRemaining,
              submissionIndex: item.submission,
              laporbiIndex: item.biReportedCount,
              sisalaporbiIndex: item.biReportedRemaining,
              children: tipe,
            };
            cityes.push(citiesRow);
          });
          const newRow = {
            key: 'namePicType' + idx,
            areaIndex: row.name,
            targetIndex: row.target,
            sisaTargetIndex: row.targetRemaining,
            submissionIndex: row.submission,
            laporbiIndex: row.biReportedCount,
            sisalaporbiIndex: row.biReportedRemaining,
            children: cityes,
          };
          dataSummaryNewSet.push(newRow);
        });

        setIsLoadNew(false);
        setSummaryNew(dataSummaryNewSet);
        setGrantTotalNew(grandTotal);
      } catch (err) {
        setIsLoadNew(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      setIsLoadNew(false);
      alert(`Error Fetching Data...! \n${err}`);
    }
  };

  const hitApiSummaryRenewal = async () => {
    const dataSummaryRenewalSet = [];
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getSummaryRenewalAtm`
      );
      try {
        const dataSumRenewPre = result.data.data.summaries;
        const dataSumRenewalGrand = result.data.data;
        let grandTotal = [
          dataSumRenewalGrand.totalTarget,
          dataSumRenewalGrand.totalTargetRemaining,
          dataSumRenewalGrand.totalCompletedRenewal,
        ];
        dataSumRenewPre.map((row, idx) => {
          const cityes = [];
          const dataCitiesNew = row.cities;
          dataCitiesNew.map((itm, indx) => {
            const tipeRow = {
              key: 'locType' + idx + indx,
              areaIndex: itm.name,
              targetIndex: itm.target,
              sisaTargetIndex: itm.targetRemaining,
              jmlRenewIndex: row.completedRenewal,
            };
            cityes.push(tipeRow);
          });
          const newRow = {
            key: 'namePicType' + idx,
            areaIndex: row.name,
            targetIndex: row.target,
            sisaTargetIndex: row.targetRemaining,
            jmlRenewIndex: row.completedRenewal,
            children: cityes,
          };
          dataSummaryRenewalSet.push(newRow);
        });
        setIsLoadRenewal(false);
        setSummaryRenewal(dataSummaryRenewalSet);
        setGrantTotalRenewal(grandTotal);
      } catch (err) {
        setIsLoadRenewal(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      alert(`Error Fetching Data...! \n${err}`);
      setIsLoadRenewal(false);
    }
  };

  const hitApiSummaryTermin = async () => {
    const dataSummaryTerminSet = [];
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/getSummaryCloseAtm`
      );
      try {
        const dataSumTermPre = result.data.data.summaries;
        const dataSumTerminGrand = result.data.data;
        let grandTotal = [
          dataSumTerminGrand.totalTarget,
          dataSumTerminGrand.totalTargetRemaining,
          dataSumTerminGrand.totalTerminationComplete,
          dataSumTerminGrand.totalBiReportedCount,
          dataSumTerminGrand.totalBiReportedRemaining,
        ];
        dataSumTermPre.map((row, idx) => {
          const cityes = [];
          const dataCitiesTerm = row.cities;
          dataCitiesTerm.map((item, indx) => {
            const tipe = [];
            const dataTipeTerm = item.openingTypes;
            dataTipeTerm.map((itm, idex) => {
              const tipeRow = {
                key: 'locType' + idx + indx + idex,
                areaIndex: itm.name,
                targetIndex: itm.target,
                sisaTargetIndex: itm.targetRemaining,
                jmlhTerminIndex: itm.terminationComplete,
                laporbiIndex: itm.biReportedCount,
                sisalaporbiIndex: itm.biReportedRemaining,
                jmlhIndex: itm.total,
              };
              tipe.push(tipeRow);
            });
            const citiesRow = {
              key: 'cityType' + idx + indx,
              areaIndex: item.name,
              targetIndex: item.target,
              sisaTargetIndex: item.targetRemaining,
              jmlhTerminIndex: item.terminationComplete,
              laporbiIndex: item.biReportedCount,
              sisalaporbiIndex: item.biReportedRemaining,
              jmlhIndex: item.total,
              children: tipe,
            };
            cityes.push(citiesRow);
          });
          const newRow = {
            key: 'namePicType' + idx,
            areaIndex: row.name,
            targetIndex: row.target,
            sisaTargetIndex: row.targetRemaining,
            jmlhTerminIndex: row.terminationComplete,
            laporbiIndex: row.biReportedCount,
            sisalaporbiIndex: row.biReportedRemaining,
            jmlhIndex: row.total,
            children: cityes,
          };
          dataSummaryTerminSet.push(newRow);
        });
        setSummaryTermin(dataSummaryTerminSet);
        setGrantTotalTermin(grandTotal);
        setIsLoadTermin(false);
      } catch (err) {
        setIsLoadTermin(false);
        alert(`Error Re-Construct Data New...! \n${err}`);
      }
    } catch (err) {
      setIsLoadTermin(false);
      alert(`Error Fetching Data...! \n${err}`);
    }
  };

  useEffect(() => {
    hitApiCardOverview();
    hitApiSummaryNew();
    hitApiSummaryRenewal();
    hitApiSummaryTermin();
  }, []);

  return (
    <div className={classes.container}>
      <Grid container style={{ display: 'flex' }} spacing={1}>
        <Grid item xs={3}>
          <Overview
            color='linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)'
            imgIcon={StarIcon}
            imgStyle={{ height: '40px', width: '40px' }}
            title='New ATM'
            isLoadData={isLoadCard}
            target={overviewCard.overviewNewAtm.target}
            actual={overviewCard.overviewNewAtm.actual}
          />
        </Grid>
        <Grid item xs={3}>
          <Overview
            color='linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)'
            imgIcon={UndoIcon}
            imgStyle={{ height: '40px', width: '40px' }}
            title='Renewal ATM'
            isLoadData={isLoadCard}
            target={overviewCard.overviewRenewal.target}
            actual={overviewCard.overviewRenewal.actual}
          />
        </Grid>
        <Grid item xs={3}>
          <Overview
            color='linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)'
            imgIcon={CloseIcon}
            imgStyle={{ height: '40px', width: '40px' }}
            title='Termin ATM'
            isLoadData={isLoadCard}
            target={overviewCard.overviewTerminResponse.target}
            actual={overviewCard.overviewTerminResponse.actual}
          />
        </Grid>
        <Grid item xs={3}>
          <Overview
            isLoadData={isLoadCard}
            color='linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)'
            imgIcon={CloseIcon}
            imgStyle={{ height: '40px', width: '40px' }}
            title='Unplan Termin ATM'
            actual={overviewCard.overviewUnplan.actual}
          />
        </Grid>
      </Grid>
      <div className={classes.tableContent}>
        <TableSummary
          isLoading={isLoadNew}
          titleSum='Summary New ATM'
          data={summaryNew}
          imgIcon={<IconStar style={{ width: 20, height: 20 }} />}
          columnData={columnSummaryNew}
          summaries={grantTotalNew}
          grandTotal
        />
      </div>
      <div className={classes.tableContent}>
        <TableSummary
          isLoading={isLoadRenewal}
          titleSum='Summary Renewal ATM'
          data={summaryRenewal}
          imgIcon={<IconRefresh style={{ width: 20, height: 20 }} />}
          columnData={columnSummaryRenewal}
          summaries={grantTotalRenewal}
          grandTotal
        />
      </div>
      <div className={classes.tableContent}>
        <TableSummary
          isLoading={isLoadTermin}
          titleSum='Summary Termin ATM'
          data={summaryTermin}
          imgIcon={<IconClose style={{ width: 20, height: 20 }} />}
          columnData={columnSummaryTermin}
          summaries={grantTotalTermin}
          grandTotal
        />
      </div>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(RbbImplementation))
);

const columnSummaryNew = [
  { title: 'Area', dataIndex: 'areaIndex', key: 'areaKey', width: '30%' },
  {
    title: 'Target',
    dataIndex: 'targetIndex',
    key: 'targetKey',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Sisa Target',
    dataIndex: 'sisaTargetIndex',
    key: 'sisaTargetKey',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Submission',
    dataIndex: 'submissionIndex',
    key: 'submissionKey',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Lapor BI',
    dataIndex: 'laporbiIndex',
    key: 'laporbiKey',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Sisa Lapor BI',
    dataIndex: 'sisalaporbiIndex',
    key: 'sisalaporbiKey',
    width: '14%',
    align: 'center',
  },
];

const columnSummaryRenewal = [
  { title: 'Area', dataIndex: 'areaIndex', key: 'areaKey', width: '30%' },
  {
    title: 'Target',
    dataIndex: 'targetIndex',
    key: 'targetKey',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Sisa Target',
    dataIndex: 'sisaTargetIndex',
    key: 'sisaTargetKey',
    width: '28%',
    align: 'center',
  },
  {
    title: 'Jumlah Renewal Selesai',
    dataIndex: 'jmlRenewIndex',
    key: 'jmlRenewIndex',
    width: '28%',
    align: 'center',
  },
];

const columnSummaryTermin = [
  { title: 'Area', dataIndex: 'areaIndex', key: 'areaKey', width: '30%' },
  {
    title: 'Target',
    dataIndex: 'targetIndex',
    key: 'targetKey',
    width: '14%',
    align: 'center',
  },
  {
    title: 'Sisa Target',
    dataIndex: 'sisaTargetIndex',
    key: 'sisaTargetKey',
    width: '12%',
    align: 'center',
  },
  {
    title: 'Jumlah Terminasi Selesai',
    dataIndex: 'jmlhTerminIndex',
    key: 'jmlhTerminKey',
    width: '16%',
    align: 'center',
  },
  {
    title: 'Lapor BI',
    dataIndex: 'laporbiIndex',
    key: 'laporbiKey',
    width: '8%',
    align: 'center',
  },
  {
    title: 'Sisa Lapor BI',
    dataIndex: 'sisalaporbiIndex',
    key: 'sisalaporbiKey',
    width: '10%',
    align: 'center',
  },
];
