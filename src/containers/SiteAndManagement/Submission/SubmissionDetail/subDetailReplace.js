/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { makeStyles, Grid, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import constants from '../../../../helpers/constants';
import SubAtmInfo from './subAtmInfo';
import SubDetailPaper from './subDetailPaper';
import PaperSubmissionProgress from '../../../../components/GeneralComponent/PaperSubmissionProgress';
import MuiIconLabelButton from '../../../../components/Button/MuiIconLabelButton';
import { ReactComponent as ArrowLeft } from '../../../../assets/icons/siab/arrow-left.svg';
import RupiahConverter from '../../../../helpers/useRupiahConverter';
import ReplaceForm from '../SubmissionForm/ReplaceForm';
import ModalLoader from '../../../../components/ModalLoader';

const useStyles = makeStyles({
  root: { padding: '30px 20px 20px 30px' },
  backLabel: {
    fontSize: 17,
    color: constants.color.primaryHard,
    marginLeft: 5,
  },
  backButton: {
    marginBottom: 20,
    '& .MuiButton-contained': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      color: 'red',
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
      '& :hover': {
        backgroundColor: '#F4F7FB',
      },
      '& .MuiButton-label': {
        fontSize: 17,
        fontWeight: 500,
      },
    },
  },
  details: {
    margin: '20px 0px',
    padding: 10,
    border: '1px solid #BCC8E7',
    borderRadius: 8,
  },
  inputDay: {
    width: 90,
  },
  inputDate: {
    '& .ant-picker': {
      borderRadius: 6,
    },
  },
  btnSend: {
    backgroundColor: constants.color.primaryHard,
    color: 'white',
    borderRadius: 6,
    textTransform: 'capitalize',
  },
});

const SubDetailReplace = ({ history }) => {
  const classes = useStyles();
  
  // GET ID from URL
  const { id } = useParams();
  const rowID = { id };

  // --- INITIAL STATE --- //
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [data, setData] = useState('');
  const [position, setPosition] = useState([]);
  const [cost, setCost] = useState('');
  const [dataDetail, setDataDetail] = useState('');
  const [statusProgress, setStatusProgress] = useState();

  // HIT API GET Data Detail
  useEffect(() => {
    setModalLoader(true)
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/acquisitionservice/acquisitionservice/v1/detailSubmissionNew`,
        rowID,
        config
      )
      .then((res) => {
        // console.log("RESPONSE", JSON.stringify(res));
        const i = res.data.informasiNegotiation[0];
        // console.log("INI DATA", i);
        const newInfo = {
          atmId: i.atmId || '-',
          type: i.openingType || '-',
          locationPhotoslist: i.locationPhotoslist,
          kondisi: i.openingType || '-',
          lokasiId: i.newLocation || '-',
          alamat: i.address || '-',
          roArea: i.area || '-',
          cabang: i.branch || '-',
          branchInitial: i.branchInitial || '-',
          codeGFMS: i.codeGFMS || '-',
          picCabang: i.branchPicName || '-',
          picPemilik: i.ownerPicName || '-',
          picOnLocation: i.locationPicName || '-',
          populasiATM: i.countAtm || '-',
          categoryType: i.categoryType || '-',
          locationCategory: i.locationCategory || '-',
          aksesibilitas: i.workingHour? `${i.workingHour} Jam` : '-',
          aksesPublik: i.publicAccessibility || '-',
          luasArea: i.buildingLarge || '-',
          jumlahAtmBankLain: i.aroundAtmCount || '-',
          tipeAtm: i.typeAtm || '-',
          ruangAtm: i.boothAvailability || '-',
          boothType: i.boothType || '-',
          komunikasi: i.commType || '-',
          nilaiTerendah: i.minOffering,
          nilaiTengah: i.averageOffering,
          nilaiTertinggi: i.maxOffering,
          locationPhotosPositionNeonSign: i.locationPhotosPositionNeonSign,
          locationPhotosPositionAtenaVsat: i.locationPhotosPositionAtenaVsat,
          locationMachinePhotos: i.locationMachinePhotos,
          locationFrontMachinePhoto: i.locationFrontMachinePhoto,
          typeAtm: i.typeAtm || '-',
          oldTypeAtm: i.oldTypeAtm || '-',
        };
        // console.log("INI NEW INFO", JSON.stringify(newInfo));
        // set constructed data
        setData(newInfo);
        const dataLocation = res.data.informasiNegotiation[0];
        const newPosition = [
          dataLocation.latitude === null ? -6.1753924 : dataLocation.latitude,
          dataLocation.longitude === null ? 106.8249641 : dataLocation.longitude,
        ];
        setPosition(newPosition);
        // console.log("new location", newPosition);
        const { detailRent } = res.data;
        setCost(detailRent);
        const c = res.data.rent[0];
        const approver = res.data.rent[0].daNameList;
        // console.log("INI DETAIL BIAYA", c);
        // console.log("APPROVER", approver);
        const newDetail = {
          biayaSewa: detailRent.map(({ yearlyRentCost }) => RupiahConverter(yearlyRentCost)),
          biayaListrik: !c.yearlyElectricityCost ? '-' : RupiahConverter(c.yearlyElectricityCost),
          telepon: !c.yearlyTelephoneRentCost ? '-' : RupiahConverter(c.yearlyTelephoneRentCost),
          serviceCharge: !c.yearlyServiceCharge ? '-' : RupiahConverter(c.yearlyServiceCharge),
          totalSewa: !c.totalRent ? '-' : RupiahConverter(c.totalRent),
          fileDocument: c.documents,
          name: !approver ? 'N/A' : approver,
        };
        setDataDetail(newDetail);
        setStatusProgress(res.data.status);
        setModalLoader(false)
        // console.log("DETAIL COST", newDetail);
      })
      .catch((err) => {
        console.log('~ err', err);
        setModalLoader(false)
      });
  }, []);

  return (
    <div>
        <div className={classes.root}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Grid container>
                <div className={classes.backButton}>
                  <MuiIconLabelButton
                    label='Back'
                    iconPosition='startIcon'
                    onClick={() => window.history.back()}
                    buttonIcon={<ArrowLeft />}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <SubAtmInfo atmId={rowID} data={data} position={position} cost={cost} />
            </Grid>
            <Grid item>
              <PaperSubmissionProgress statusProgress={statusProgress} openingType='replace' />
            </Grid>
            <Grid container direction='row' spacing={2} style={{ padding: 10 }}>
              <Grid item xs={4}>
                <SubDetailPaper dataDetail={dataDetail} />
              </Grid>

              <Grid item xs={8}>
                <Paper style={{ padding: 20 }}>
                  <Typography style={{ fontSize: 24, fontWeight: 500 }}>
                    Detail Replacement
                  </Typography>

                  <ReplaceForm openingType={data.kondisi} submit id={id}/>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
};

export default withRouter(SubDetailReplace);
