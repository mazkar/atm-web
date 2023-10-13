/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line import/no-cycle
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../../assets/icons/general/arrow_back_red.svg';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/general/download-white.svg';
import { ReactComponent as LeftIcon } from '../../../assets/icons/linear-red/chevron-left.svg';
import { ReactComponent as RightIcon } from '../../../assets/icons/linear-red/chevron-right.svg';
import { ReactComponent as LeftGreyIcon } from '../../../assets/icons/siab/chevron24-left.svg';
import { ReactComponent as RightGreyIcon } from '../../../assets/icons/siab/chevron24-right.svg';
import constansts from '../../../helpers/constants';
import ModalLoader from '../../../components/ModalLoader';
import TabInfo from '../common/TabInfo';
import moment from 'moment';
import MuiIconLabelButton from '../../../components/Button/MuiIconLabelButton';
import SideBar from '../common/SideBar';
import clsx from 'clsx';
import { PrimaryHard } from '../../../assets/theme/colors';

const useStyles = makeStyles({
  root: { padding: '30px 20px 20px 30px' },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: 'unset',
    padding: 0,
    '& .MuiButton-root': {
      padding: 0,
      textTransform: 'none',
      backgroundColor: 'unset',
    },
    '& .MuiButton-root:hover': { opacity: 0.6, backgroundColor: 'unset' },
  },
  divider: { marginTop: 25 },
  tableRoot: {
    minWidth: 500,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderRadius: '10px',
  },
  tableHead: {
    boxShadow: 'inset 0px -1px 0px rgba(188, 200, 231, 0.4)',
  },
  tableHeadText: {
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '18px',
  },
  tableRow: {
    '&:nth-of-type(even)': {
      backgroundColor: '#F9FBFF',
    },
  },
  tableFirstCol: {
    width: 250,
  },
  tableCell: {
    borderBottom: 'none',
    verticalAlign: 'top',
  },
  label: {
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '16px',
  },
  navButton: {
    background: 'white',
    border: '1px solid ' + PrimaryHard,
    boxSizing: 'border-box',
    boxShadow: '0px 6px 6px rgba(220, 36, 31, 0.1)',
    borderRadius: '8px',
    padding: 8,
    minWidth: 0,
  },
  ticket: {
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '24px',
    padding: '0px 10px',
  },
});

const GeneralDetail = ({ history }) => {
  const classes = useStyles();
  const [resetData, setResetData] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  // GET ID from URI
  const { id } = useParams();
  // GET USER ID
  // const { userId } = useContext(RootContext);
  // const NewUserId = parseInt(userId);

  // INIT STATE
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [isLoadData, setLoadData] = useState(false);

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const fetchDetailData = () => {};

  useEffect(() => {
    // console.log('+++ dataInfoGeneral', dataInfoGeneral);
  }, [dataInfoGeneral]);

  return (
    <div className={classes.root}>
      <Grid container justifyContent='space-between'>
        <Grid item className={classes.backAction}>
          <Button onClick={() => history.push('/vendor-management/digitalisasi/result')}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>
        <Grid item>
          <MuiIconLabelButton
            iconPosition='startIcon'
            label='Export to PDF'
            buttonIcon={<DownloadIcon />}
          />
        </Grid>
      </Grid>
      <div className={classes.divider} />
      <TabInfo data={dataInfoGeneral} idAtm={id} isLoadData={isLoadData} />
      <div className={classes.divider} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SideBar
            title='Site Quality'
            items={[
              {
                label: 'Kebersihan',
                count: 7,
                value: 'kebersihan',
              },
              {
                label: 'Potensi Modus Kejahatan',
                count: 8,
                value: 'potensiKejahatan',
              },
              {
                label: 'Cek Media Promosi',
                count: 11,
                value: 'mediaPromosi',
              },
              {
                label: 'Cek Kondisi Ruangan',
                count: 11,
                value: 'kondisiRuangan',
              },
            ]}
            value={activeMenu}
            onValueChange={(v) => {
              setActiveMenu(v);
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TableContainer component={Paper} className={classes.tableRoot}>
            <Table aria-label='simple table'>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={clsx(classes.tableCell, classes.tableFirstCol)}>
                    <Typography className={classes.tableHeadText}>Question</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography className={classes.tableHeadText}>Answer</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(activeMenu === 'potensiKejahatan'
                  ? tableData2
                  : activeMenu === 'mediaPromosi'
                  ? tableData3
                  : activeMenu === 'kondisiRuangan'
                  ? tableData4
                  : tableData1
                ).map((row) => (
                  <TableRow className={classes.tableRow}>
                    <TableCell className={clsx(classes.tableCell, classes.tableFirstCol)}>
                      <Typography className={classes.label}>{row.label}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {row.content.map((val) => {
                        return val.value ? (
                          <LabelValue key={val.value} label={val.label} value={val.value} />
                        ) : val.src ? (
                          <Img src={val.src} />
                        ) : null;
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <div className={classes.divider} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button variant='outlined' disabled className={classes.navButton}>
          {true ? <LeftGreyIcon /> : <LeftIcon />}
        </Button>
        <Typography className={classes.ticket}>Ticket T123</Typography>
        <Button variant='outlined' className={classes.navButton}>
          {false ? <RightGreyIcon /> : <RightIcon />}
        </Button>
      </div>
      <ModalLoader isOpen={isLoadData} />
    </div>
  );
};

export default withRouter(GeneralDetail);

const LabelValue = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item style={{ width: 90 }}>
        <Typography className={classes.label}>{label}</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.label}>:</Typography>
      </Grid>
      <Grid item>
        <Typography
          style={{
            fontSize: '13px',
            lineHeight: '16px',
          }}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

const Img = ({ src, alt }) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <img src={src} alt={alt} style={{ width: '100%', borderRadius: 10 }} />
      </Grid>
    </Grid>
  );
};

const tableData1 = [
  {
    label: 'Kebersihan Ruangan Sebelum Datang',
    content: [
      { label: 'Keberadaan', value: 'Bersih' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kebersihan Ruangan Setelah Dibersihkan',
    content: [
      { label: 'Keberadaan', value: 'Bersih' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kondisi Body Mesin Setelah Dibersihkan',
    content: [
      { label: 'Keberadaan', value: 'Bersih' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kondisi Belakang Mesin Setelah Dibersihkan',
    content: [
      { label: 'Keberadaan', value: 'Bersih' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kondisi Booth Setelah Dibersihkan',
    content: [
      { label: 'Keberadaan', value: 'Bersih' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Tersedia Tempat Sampah',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Tempat Sampah CIMB Niaga' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Keluhan Nasabah',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Banyak sampah diluar' },
    ],
  },
];

const tableData2 = [
  {
    label: 'Pintu Booth Atas',
    content: [
      { label: 'Keberadaan', value: 'Tidak Terkunci' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kerangkeng Booth',
    content: [
      { label: 'Keberadaan', value: 'Tidak Ada Gembok' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kunci Fascia Atas',
    content: [
      { label: 'Keberadaan', value: 'Mudah Dibuka Tanpa Kunci' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kunci Fascia Bawah',
    content: [
      { label: 'Keberadaan', value: 'Mudah Dibuka Tanpa Kunci' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'PIN Cover',
    content: [
      { label: 'Keberadaan', value: 'Tidak Ada' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Benda Asing Sekitar Kartu Masuk',
    content: [{ label: 'Keberadaan', value: 'Ada' }, { src: 'https://via.placeholder.com/100x70' }],
  },
  {
    label: 'Benda Asing Sekitar PIN Cover',
    content: [{ label: 'Keberadaan', value: 'Ada' }, { src: 'https://via.placeholder.com/100x70' }],
  },
  {
    label: 'Benda Asing Sekitar Ruangan',
    content: [{ label: 'Keberadaan', value: 'Ada' }, { src: 'https://via.placeholder.com/100x70' }],
  },
];

const tableData3 = [
  {
    label: 'Flag Mounted',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Type A' },
      { label: 'Kondisi', value: 'Lampu Nyala' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Neon Box',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Di atas Ruangan' },
      { label: 'Kondisi', value: 'Lampu Nyala' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Sticker Kaca',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Dengan Sticker Sunblast' },
      { label: 'Kondisi', value: 'Baik' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Booth',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Kayu' },
      { label: 'Kondisi', value: 'Baik' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Pylon Sign',
    content: [{ label: 'Keberadaan', value: 'Ada' }, { src: 'https://via.placeholder.com/100x70' }],
  },
  {
    label: 'Media Selain 5 Item Diatas',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Sticker' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Celah Atas Mesin Dengan Booth',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Kondisi', value: 'Tertutup Adjuster' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Sticker Kelengkapan Mesin',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Kondisi', value: 'Type Sticker Baru' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Body Cat Merah',
    content: [
      { label: 'Keberadaan', value: 'Belum Cat Merah' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Posisi Flag Mounted',
    content: [
      { label: 'Keberadaan', value: 'Terlihat Jelas' },
      { label: 'Kondisi', value: 'Baik' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kondisi Lampu Flag Mounted Saat Malam',
    content: [
      { label: 'Keberadaan', value: 'Nyala' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
];

const tableData4 = [
  {
    label: 'Suhu Ruangan',
    content: [{ label: 'Kondisi', value: 'Sejuk' }],
  },
  {
    label: 'Tersedia AC',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Kondisi', value: 'AC Tidak Nyala' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kondisi Plafond',
    content: [{ label: 'Kondisi', value: 'Rusak' }, { src: 'https://via.placeholder.com/100x70' }],
  },
  {
    label: 'Kondisi Dinding / Tembok',
    content: [{ label: 'Kondisi', value: 'Rusak' }, { src: 'https://via.placeholder.com/100x70' }],
  },
  {
    label: 'Kondisi Area Kaca',
    content: [{ label: 'Kondisi', value: 'Rusak' }, { src: 'https://via.placeholder.com/100x70' }],
  },
  {
    label: 'Kondisi Lantai',
    content: [
      { label: 'Kondisi', value: 'Rusak Berat' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Kondisi Pintu',
    content: [
      { label: 'Keberadaan', value: 'Ada Pintu Kaca' },
      { label: 'Kondisi', value: 'Rusak' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Instalasi Kabel',
    content: [
      { label: 'Kondisi', value: 'Perlu Dipasan Kabel Protektor' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Lampu Ruangan',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Philip => 12 Watt' },
      { label: 'Kondisi', value: 'Cukup' },
    ],
  },
  {
    label: 'Meteran Listrik',
    content: [
      { label: 'Keberadaan', value: 'Ada' },
      { label: 'Type', value: 'Pasca Bayar' },
      { label: 'Kondisi', value: 'Posisi Jauh Dari Mesin' },
      { src: 'https://via.placeholder.com/100x70' },
    ],
  },
  {
    label: 'Sisa Token Listrik',
    content: [{ label: 'Type', value: '2.000' }, { src: 'https://via.placeholder.com/100x70' }],
  },
];
