/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { RootContext } from '../../../../router';
import { ReactComponent as BackIcon } from '../../../../assets/icons/general/arrow_back_red.svg';
import { NegotiationProgressPaper } from '../../../../components';
import constansts from '../../../../helpers/constants';
import ModalRejection from './ModalRejection';
import ModalApprove from './ModalApprove';
import { doFetchDataApprovalDetail } from '../ApiServiceApproval';
import ModalLoader from '../../../../components/ModalLoader';
import ApprovalTabInfo from './ApprovalTabInfo';
import DetailInfoApprove from './DetailInfoApprove';
import NegoHistories from './NegoHistories';
import PaperTransaction from "./PaperTransaction";
import DetailInfoApproveTermin from"./DetailInfoApproveTermin";
import * as ThemeColor from '../../../../assets/theme/colors';

const useStyles = makeStyles({
  root: {
    padding: '30px 20px 20px 30px',
    '& .MuiBox-root': {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: 'calc(100vh - 64px)',
  },
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
});

const steps = [
  { title: 'Profiling - 1', isActive: 'true' },
  { title: 'Profiling - 2', isActive: 'true' },
  { title: 'Negotiation', isActive: 'true' },
  { title: 'Procurement', isActive: 'true' },
  { title: 'Approval', isActive: 'false' },
  { title: 'Submission', isActive: 'false' },
  // { title: "Budgeting", isActive: "false" },
  { title: 'Implementation', isActive: 'false' },
];

function isEmpty(obj) {
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}
const GeneralDetail = () => {
  const classes = useStyles();
  const history = useHistory();

  // GET USER ID
  const { userRoleName } = useContext(RootContext);

  // get id from uri
  const { id } = useParams();
  // GET USER ID
  const { userId, userFullName } = useContext(RootContext);
  // eslint-disable-next-line radix
  const NewUserId = parseInt(userId);

  // init STATE

  const [dataNegoHistories, setDataNegoHistories] = useState([]);
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [topData, setTopData] = useState({});
  const [isNewLocation, setIsNewLocation] = useState(false);

  // MODAL LOADER
  const [isOpenModalLoader, setModalLoader] = useState(false);
  // set handler loader when call Approval API Service
  function loaderHandler(loaderValue) {
    setModalLoader(loaderValue);
  }

  // MODAL LOADER
  const [isOpenModalLoaderButton, setModalLoaderButton] = useState(false);
  // set handler loader when call Approval API Service
  function loaderHandlerButton(loaderValue) {
    setModalLoaderButton(loaderValue);
  }

  // modal for Rejection
  const [openModalRejection, setOpenModalRejection] = useState(false);
  const handleOpenModalRejection = () => {
    // CHECK IS TIM APPROVAL LOGIN
    const strToLower = userRoleName.toLowerCase();
    const isApproval = strToLower.includes('tim approval');
    if (!isApproval) {
      alert('Reject Action allowed just for Approval Team / Directors');
    } else {
      setOpenModalRejection(true);
    }
  };
  const handleCloseModalRejection = () => setOpenModalRejection(false);

  // modal for Approve
  const [openModalApprove, setOpenModalApprove] = useState(false);
  const handleOpenModalApprove = () => {
    // CHECK IS TIM APPROVAL LOGIN
    const strToLower = userRoleName.toLowerCase();
    const isApproval = strToLower.includes('tim approval');

    let prevNotApprove = 0;
    // eslint-disable-next-line default-case
    switch (true) {
      case userFullName.toLowerCase().includes('trisna'):
        // console.log("+++ trisna");
        if (!dataInfoGeneral.detail.daNameList.includes('Deden Hidayat')) {
          prevNotApprove += 1;
        }
        break;
      case userFullName.toLowerCase().includes('bambang'):
        // console.log("+++ bambang");
        if (!dataInfoGeneral.detail.daNameList.includes('Trisna L.M. Siahaan')) {
          prevNotApprove += 1;
        }
        break;
    }

    if (!isApproval) {
      alert('Approve Action allowed just for Approval Team / Directors');
    } else if (dataInfoGeneral.detail.daNameList.includes(userFullName)) {
      alert('You Already Approve this data!');
      {
        /** Yang aku komen jangan dihapus dulu, buat pengecekan tim approver */
      }
      // }else if(prevNotApprove > 0){
      //   // console.log("+++ prevNotApprove: ", prevNotApprove);
      //   let confirmTo = "another DA";
      //   // eslint-disable-next-line default-case
      //   switch (true) {
      //   case userFullName.toLowerCase().includes('trisna'):
      //     confirmTo = "Deden Hidayat";
      //     break;
      //   case userFullName.toLowerCase().includes('bambang'):
      //     confirmTo = "Trisna L.M. Siahaan";
      //     break;
      //   }
      //   alert(`Please wait for ${confirmTo} to give approval firsts!`);
    } else {
      setOpenModalApprove(true);
    }
  };

  // modal for Renegotiation
  // const [openModalRenegotiate, setOpenModalRenegotiate] = useState(false);
  // const handleOpenModalRenegotiate = () => setOpenModalRenegotiate (true);
  // const handleCloseModalRenegotiate= () => setOpenModalRenegotiate(false);

  useEffect(() => {
    console.log('====> Harusnya ngeHit A');
    const dataHit = {
      id: parseInt(id),
    };
    doFetchDataApprovalDetail(loaderHandler, dataHit).then((dataFromApi) => {
    console.log('====> Harusnya ngeHit B', dataHit);
    // console.log("<<<< DATa - dataFromApi : ",JSON.stringify(dataFromApi));
      try {
        loaderHandler(true);
        // set general data Info
        // console.log("<<<< DATa - dataFromApi : ",JSON.stringify(dataFromApi));
        setInfoGeneral({
          informasiApproval: dataFromApi.data.informasiApproval[0],
          detail: dataFromApi.data.detail[0],
          detailRent: dataFromApi.data.rent,
        });
        // set data nego histories
        setDataNegoHistories(dataFromApi.data.approvalDetailNegotiation);
        // set top data nego
        setTopData({
          yearlyRentCost: dataFromApi.data.detail[0].yearlyRentCost,
          negotiationDealCost: dataFromApi.data.detail[0].negotiationDealCost,
        });
        const { openingType } = dataFromApi.data.informasiApproval[0];
        if (
          openingType === 'New Location' ||
          openingType === 'New ATM' ||
          openingType === 'Reopen'
        ) {
          setIsNewLocation(true);
        }
      } catch (error) {
        loaderHandler(false);
        alert('Error Set Data To State... ! \n', error);
      }
      loaderHandler(false);
    });
  }, []);

  const handleCloseModalApprove = () => setOpenModalApprove(false);
  return (
    <div className={classes.root}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <div className={classes.backAction}>
            <Button onClick={() => history.goBack()}>
              <BackIcon />
              <Typography className={classes.backLabel}>Back</Typography>
            </Button>
          </div>
        </Grid>
        <Grid item>
          <ApprovalTabInfo
            data={dataInfoGeneral}
            idAtm={id}
            isLoadData={isOpenModalLoader}
            isNewLocation={isNewLocation}
          />
        </Grid>
        <Grid item>
          <NegotiationProgressPaper 
            dataSteps={steps} 
            isLoadData={isOpenModalLoader} 
            openingType={dataInfoGeneral?.informasiApproval?.openingType}
            status={5}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            {
              dataInfoGeneral?.informasiApproval?.openingType === "Termin" ?
                <Grid item sm={3}>
                  <DetailInfoApproveTermin
                    dataApproval={dataInfoGeneral}
                    rejectionBtnHandler={handleOpenModalRejection}
                    approveBtnHandler={handleOpenModalApprove}
                    isLoadData={isOpenModalLoader}
                  />
                </Grid>
              :
                <Grid item sm={6}>
                  <DetailInfoApprove
                    dataApproval={dataInfoGeneral}
                    rejectionBtnHandler={handleOpenModalRejection}
                    approveBtnHandler={handleOpenModalApprove}
                    isLoadData={isOpenModalLoader}
                    // renegotiateBtnHandler={handleOpenModalRenegotiate}
                  />
                </Grid>
            }
            {
              dataInfoGeneral?.informasiApproval?.openingType === "Termin" ?
                <Grid item sm={9}>
                  <PaperTransaction id={dataInfoGeneral.informasiApproval.atmId}/>
                </Grid>
                :
                <Grid item sm={6}>
                  <NegoHistories
                    dataNego={dataNegoHistories}
                    isLoadData={isOpenModalLoader}
                    dataInfoGeneral={dataInfoGeneral}
                  />
                </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
      <ModalRejection
        isOpen={openModalRejection}
        onClose={handleCloseModalRejection}
        loaderHandler={loaderHandlerButton}
        idNew={id}
        idAtm={
          isEmpty(dataInfoGeneral)
            ? 'N/A'
            : !isNewLocation
            ? dataInfoGeneral.informasiApproval.atmId
            : dataInfoGeneral.informasiApproval.locationId
        }
        atmId={isEmpty(dataInfoGeneral)? null : dataInfoGeneral.informasiApproval.atmId}
        idRequester={isEmpty(dataInfoGeneral)? null : dataInfoGeneral.informasiApproval.locationId}
        userId={NewUserId}
      />
      <ModalApprove
        isOpen={openModalApprove}
        onClose={handleCloseModalApprove}
        loaderHandler={loaderHandlerButton}
        idNew={id}
        isNewLocation={isNewLocation}
        idAtm={
          isEmpty(dataInfoGeneral)
            ? 'N/A'
            : !isNewLocation
            ? dataInfoGeneral.informasiApproval.atmId
            : dataInfoGeneral.informasiApproval.locationId
        }
        userId={NewUserId}
        typeValue={isEmpty(dataInfoGeneral) ? 'N/A' : dataInfoGeneral.informasiApproval.openingType}
      />
      {/* <ModalConfirmation 
        isOpen={openModalRenegotiate} 
        title="Confirmation" 
        message="Are you sure want to Renegotiate this location?"
        onClose={handleCloseModalRenegotiate}
        onNext={handleCloseModalRenegotiate}
      /> */}
      <ModalLoader isOpen={isOpenModalLoaderButton} />
    </div>
  );
};

export default withRouter(GeneralDetail);
