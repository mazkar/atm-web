/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import TitleAndSearch from '../../components/Title/TitleAndSearch/TitleSearchLeftIcon';
import LongCardSummary from '../../components/Card/MuiLongCard/LongCardSummary';
import Filter from '../../components/GeneralComponent/Filter';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';
import MuiIconLabelButton from '../../components/Button/MuiIconLabelButton';
import DynamicTable from '../../components/DynamicTable';
import ModalDetail from './ModalMaintenanceDetail';
import ModalNewTicket from './NewTicket';

import Tachometer from '../../assets/images/SideMenu/tachometer.svg';
import { ReactComponent as PlusWhite } from '../../assets/icons/siab/plus-white.svg';

const useStyles = makeStyles({
  filterSection: {
    padding: '10px 20px 10px 20px',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  dataSectionNoPadding: {
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
});

const Overview = () => {
  const classes = useStyles();

  const [showModalDetail, setShowModalDetail] = React.useState(false);

  const summaryData = [
    { id: 0, status: 'Total Issues', count: '3.019' },
    { id: 1, status: 'On Progress', count: '210' },
    { id: 2, status: 'Pending', count: '32' },
    { id: 3, status: 'Solved', count: '2.123' },
  ];

  const provinceSuggestions = [
    {
      id: 0,
      value: '- Semua Provinsi -',
      nameId: '- Semua Provinsi -',
      nameEn: 'All',
    },
    { id: 1, value: 'Sumatera', nameId: 'Sumatera', nameEn: 'Sumatera' },
    { id: 2, value: 'Jawa', nameId: 'Jawa', nameEn: 'Jawa' },
    { id: 3, value: 'Kalimantan', nameId: 'Kalimantan', nameEn: 'Kalimantan' },
    { id: 4, value: 'Bali', nameId: 'Bali', nameEn: 'Bali' },
  ];

  const districtsSuggestions = [
    {
      id: 0,
      value: '- Semua Kabupaten -',
      nameId: '- Semua Kabupaten -',
      nameEn: '- Semua Kabupaten -',
    },
    {
      id: 1,
      value: 'Jakarta Utara',
      nameId: 'Jakarta Utara',
      nameEn: 'Jakarta Utara',
    },
    {
      id: 2,
      value: 'Jakarta Selatan',
      nameId: 'Jakarta Selatan',
      nameEn: 'Jakarta Selatan',
    },
    {
      id: 3,
      value: 'Jakarta Barat',
      nameId: 'Jakarta Barat',
      nameEn: 'Jakarta Barat',
    },
    {
      id: 4,
      value: 'Jakarta Timur',
      nameId: 'Jakarta Timur',
      nameEn: 'Jakarta Timur',
    },
  ];

  const subdistrictsSuggestions = [
    {
      id: 0,
      value: '- Semua Kecamatan -',
      nameId: '- Semua Kecamatan -',
      nameEn: '- Semua Kecamatan -',
    },
    {
      id: 1,
      value: 'Tangerang Selatan',
      nameId: 'Tangerang Selatan',
      nameEn: 'Tangerang Selatan',
    },
    {
      id: 2,
      value: 'Tangerang Selatan',
      nameId: 'Tangerang Selatan',
      nameEn: 'Tangerang Selatan',
    },
    {
      id: 3,
      value: 'Tangerang Selatan',
      nameId: 'Tangerang Selatan',
      nameEn: 'Tangerang Selatan',
    },
    {
      id: 4,
      value: 'Tangerang Selatan',
      nameId: 'Tangerang Selatan',
      nameEn: 'Tangerang Selatan',
    },
  ];

  const prioritySuggestions = [
    { id: 0, value: 'All', nameId: 'All', nameEn: 'All' },
    { id: 1, value: 'High', nameId: 'High', nameEn: 'High' },
    { id: 2, value: 'Medium', nameId: 'Medium', nameEn: 'Medium' },
    { id: 3, value: 'Low', nameId: 'Low', nameEn: 'Low' },
  ];
  const actionReport = () => {
    setShowModalDetail(true);
  };
  const dataAction = [{ name: 'View Report', funct: actionReport }];
  const dataTable = [
    {
      id: '#211918',
      atmId: '1025',
      priority: 'High',
      progression: '25',
      status: 'In Progress',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
    {
      id: '#221917',
      atmId: '1024',
      priority: 'Low',
      progression: '50',
      status: 'In Progress',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
    {
      id: '#231916',
      atmId: '1023',
      priority: 'Medium',
      progression: '100',
      status: 'Complete',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
    {
      id: '#241915',
      atmId: '1022',
      priority: 'High',
      progression: '100',
      status: 'Complete',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
    {
      id: '#251914',
      atmId: '1021',
      priority: 'Medium',
      progression: '75',
      status: 'In Progress',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
    {
      id: '#261918',
      atmId: '1025',
      priority: 'High',
      progression: '30',
      status: 'In Progress',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
    {
      id: '#271917',
      atmId: '1024',
      priority: 'Low',
      progression: '60',
      status: 'In Progress',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
    {
      id: '#281914',
      atmId: '1021',
      priority: 'Medium',
      progression: '5',
      status: 'In Progress',
      assignee: 'Muhammad Yasin',
      action: { dataAction },
    },
  ];
  const titleTable = [
    'ID',
    'ATM ID',
    'Priority',
    'Progression',
    'Status',
    'Assignee',
    'Action',
  ];
  const valueType = [
    'actionref',
    'string',
    'priority',
    'progress',
    'status',
    'actionref',
    'actionfunc',
  ];
  const isSort = [false, false, true, false, true, false, false];

  const handleButton = () => {
    // eslint-disable-next-line no-console
    console.log('Button Clicked');
  };

  const [showNewTicket, setShowNewTicket] = React.useState(false);
  const actionNewTicketModal = () => {
    setShowNewTicket(true);
  };

  return (
    <div className="content_container" style={{ paddingBottom: 65 }}>
      <TitleAndSearch
        title="Maintenance"
        searchPlaceholder="Pencarian berdasarkan lokasi atau ATM ID"
      />
      <div style={{ width: '100%', textAlign: 'end' }}>
        <MuiIconLabelButton
          style={{ marginBottom: 20, width: 150 }}
          label="New Ticket"
          iconPosition="startIcon"
          onClick={actionNewTicketModal}
          buttonIcon={<PlusWhite />}
        />
      </div>
      <LongCardSummary
        summaryOptions={summaryData}
        color="linear-gradient(137.73deg, #DC241F 0%, #DC241F 100%)"
        imgIcon={Tachometer}
        imgStyle={{ height: '54px', width: '54px' }}
        title="Summary"
      />

      <Paper elevation={3} className={classes.filterSection}>
        <Filter
          provinceSuggestions={provinceSuggestions}
          districtsSuggestions={districtsSuggestions}
          subdistrictsSuggestions={subdistrictsSuggestions}
          statusSuggestions={prioritySuggestions}
          captionD="Priority"
          handleProvinceOnChange={(value) => {
            console.log(value);
          }}
          handleDistrictsOnChange={(value) => {
            console.log(value);
          }}
          handleSubDistrictsOnChange={(value) => {
            console.log(value);
          }}
          handleStatusOnChange={(value) => {
            console.log(value);
          }}
        />
      </Paper>

      <DynamicTable
        data={dataTable}
        fields={titleTable}
        cellOption={valueType}
        isSort={isSort}
      />

      {/* <FloatingChat /> */}
      <ModalDetail
        isOpen={showModalDetail}
        onClose={(e) => setShowModalDetail(false)}
        onEdit={() => setShowModalDetail(false)}
        onComplete={() => setShowModalDetail(false)}
      />

      <ModalNewTicket
        isOpen={showNewTicket}
        onClose={(e) => setShowNewTicket(false)}
        onEdit={() => setShowNewTicket(false)}
        onComplete={() => setShowNewTicket(false)}
      />
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Overview))
);
