/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Grid, Paper, Typography, Table, TableCell, TableRow, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Checkbox, DatePicker, TimePicker, Divider, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import {ReactComponent as BackIcon} from '../../../../assets/icons/general/arrow_back_red.svg';
import { DetailAtmInfoPaper, NegosiasiHistoriesPaper } from '../../../../components';
import BiayaSewa from './DocLegalityBiayaSewa';
import PaperSubmissionProgress from './DetailProgressBar';
import constansts from '../../../../helpers/constants';
// import DetailAtmInfoPaper from './DetailATMInfoPaper';
import FloatingChat from '../../../../components/GeneralComponent/FloatingChat';

const useStyles = makeStyles({
  root: {padding: '30px 20px 20px 30px',},
  backLabel: {fontSize: 17, color: constansts.color.primaryHard, marginLeft: 5,},
  backAction: {
    backgroundColor: 'unset', 
    padding: 0,
    '& .MuiButton-root':{padding: 0, textTransform: 'none' ,backgroundColor: 'unset'},
    '& .MuiButton-root:hover':{opacity: 0.6,backgroundColor: 'unset'},
  },
  paperDetail: { padding: 20,},
  rows: { border: 'none'},
  cell: {borderBottom: 'unset', fontSize: 12},
  cellTotal: {
    borderBottom: 'unset', 
    position: 'relative', 
    left: -15,
    fontSize: 13,
    fontWeight: 500
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    color: constansts.color.white,
    backgroundColor: constansts.color.primaryHard,
    padding: '14px 36px',
    borderRadius: 10,
    width: 85,
    height: 40,
    marginRight: 25,
  },
  secondaryButton: {
    color: constansts.color.primaryHard,
    backgroundColor: constansts.color.white,
    padding: '14px 36px',
    borderRadius: 10,
    border: '1px solid',
    borderColor: `${constansts.color.primaryHard}`,
    width: 85,
    height: 40,
    marginLeft: 25,
  },
  inputDate: {
    '& .ant-picker': {
      borderRadius: 6
    }
  }
});

const approvalStyles = makeStyles({
  root: {
    display:'flex', 
    flexWrap:'wrap', 
    padding: '15px 0px',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    display: 'flex',
    '& > *': {
      margin: 5,
    },
    fontSize: 18,
  }
});
const dataApproval= {
  biayaSewa: 31500000, 
  biayaListrik: 200000, 
  telepon: 300000, 
  serviceCharge : 100000, 
  nilaiTerendah: 10000000, 
  nilaiTengah: 20000000, 
  nilaiTertinggi: 30000000,
  totalSewa: 34500000,
  documentSpapmName: "Document-SPAPM.docx",
  documentSpapmUrl: "#",
  approver: ["DH"],
};

const dataNego=[
  {offeringPriceCimb: 31030000, offeringPriceLandlord: 30000000, date:"20 July 2020", yearlyRentCost : 35000000, offeringFilesLandlord: null, offeringFilesCimb: null},
  {offeringPriceCimb: 30030000, offeringPriceLandlord: 30000000, date:"20 July 2020", yearlyRentCost : 35000000, offeringFilesLandlord: null, offeringFilesCimb: null},
  {offeringPriceCimb: 30020000, offeringPriceLandlord: 30000000, date:"20 July 2020", yearlyRentCost : 35000000, offeringFilesLandlord: "Surat Penawaran.pdf", offeringFilesCimb: "Surat Penawaran.pdf"},
  {offeringPriceCimb: 30010000, offeringPriceLandlord: 30000000, date:"20 July 2020", yearlyRentCost : 35000000, offeringFilesLandlord: null, offeringFilesCimb: null},
  {offeringPriceCimb: 30000000, offeringPriceLandlord: 30000000, date:"20 July 2020", yearlyRentCost : 35000000, offeringFilesLandlord: "Surat Penawaran.pdf", offeringFilesCimb: "Surat Penawaran.pdf"},
];

// ====> Start Component Approval Footer
const ApprovalBy = (props) => {
  const classes = approvalStyles();
  // init Props
  const {name, initial} = props;
  function renderBackColor(initialName){
    if(initialName === 'DH'){
      return '#88ADFF';
    }
    if (initialName === 'TS'){
      return '#FFB443';
    }
    if (initialName === 'BA'){
      return '#65D170';
    }
    if (initialName === 'GT'){
      return '#FF6A6A';
    }
    if (initialName === 'HM'){
      return '#E8A7FF';
    } 
    return '#88ADFF';
  }
  return(
    <div className={classes.root}>
      <Avatar style={{backgroundColor: renderBackColor(initial)}} className={classes.avatar}>{initial}</Avatar>
      <div style={{marginLeft: 12, display:'flex', flexWrap:'wrap', flexDirection:'column'}} >
        <Typography style={{fontSize:12, fontWeight:'bold'}}>{name}</Typography>
        {/* <Typography style={{fontSize:12, fontStyle: 'italic'}}>{jobTitle}</Typography> */}
      </div>
    </div>
  );
};

ApprovalBy.propTypes = {
  name: PropTypes.string,
  // jobTitle: PropTypes.string,
  initial: PropTypes.string,
};

ApprovalBy.defaultProps  = {
  // name: "Nama Lengkap",
  // jobTitle: "Job Title",
  initial: 'N',
};

const SubDetailNew= ({ history }) => {
  const classes = useStyles();
  // ANTD COMPONENT //
  const format = 'HH:mm';
  const { TextArea } = Input;
  // INITIAL STATE //
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [valueNote, setValueNote] = useState('');

  const onCheckRoom = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleSelectDate = (date, dateString) => {
    console.log('TAMPILKAN', date, dateString);
  };

  const onCheckElectric = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleDateChange = (time, timeString) => {
    setSelectedDate(time, timeString);
  };

  const handleNote = (event) => {
    setValueNote(event.target.value);
  };

  const handleSave = () => {
    alert('All changed is save!');
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container>

            <div className={classes.backAction} >
              <Button onClick={() => history.goBack()}>
                <BackIcon/>
                <Typography className={classes.backLabel}>Back</Typography>
              </Button>
            </div>
            
          </Grid>
        </Grid>
        <Grid item>
          <DetailAtmInfoPaper type='new'/>
        </Grid>
        <Grid item>
          <PaperSubmissionProgress/>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={4}>
              <BiayaSewa dataApproval={dataApproval} />
            </Grid>

            <Grid item xs={8} style={{paddingRight: '56px'}}>
              <NegosiasiHistoriesPaper dataNego={dataNego}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <FloatingChat /> */}
    </div>
  );
};

export default withRouter(SubDetailNew);
