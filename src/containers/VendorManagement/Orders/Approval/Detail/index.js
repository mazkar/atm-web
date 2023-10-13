/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import MuiIconLabelButton from "../../../../../components/Button/MuiIconLabelButton";
import FloatingChat from "../../../../../components/GeneralComponent/FloatingChat";
import { ReactComponent as ArrowLeft } from "../../../../../assets/icons/siab/arrow-left.svg";
import BotComponent from "./botComponent";
import TopComponent from "./topComponent";
import constants from "../../../../../helpers/constants";
import SuccessPopUp from "../../common/PopUp/successPopUp";
import ConfirmPopUp from "../../common/PopUp/confirmPopUp";
import PopupSurat from "../../common/PopUp/viewSurat";
import ModalLoader from '../../../../../components/ModalLoader';
import { doSaveComment } from "../../../../Implementation/ApiServiceImplementation";
import { RootContext } from "../../../../../router";

const useStyles = makeStyles({
  root: {
    padding: 15,
    marginBottom: 30,
  },
  content: {
    padding: 10,
  },
  backButton: {
    marginBottom: 20,
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
  title: {
    fontFamily: 'Barlow',
    fontWeight: '500',
    fontSize: '36px',
    color: '#2B2F3C',
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
    marginLeft: -15,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "10px 32px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 100,
    height: 40,
  },
});

function ApprovalMain(){
  const classes = useStyles();
  const history = useHistory();
  const { approvalId } = useParams();
  // GET USER ROLE
  const { userRoleName } = useContext(RootContext);

  const type = (new URLSearchParams(window.location.search)).get("taskType");
  const [isOpenModalLoader, setModalLoader] = useState(false);
  const [OpenSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Pengajuan Harga Berhasil Dilakukan');
  const [openViewSurat, setOpenViewSurat] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [dataTopComp, setDataTopComp]=  useState(null);
  const [dataBotComp, setDataBotComp]=  useState(null);
  const [message, setMessage] = useState('');
  const [confirmType, setConfirmType] = useState('Approve');

  function loaderHandler(bool){
    setModalLoader(bool);
  }

  const getDetailApproval = async() => {
    try {
      setModalLoader(true);
      const data = await Axios({
        url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/getDetailApproval?id=${approvalId}&taskType=${type}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const resItem = data.data;
      const dataToMapTop = []; let dataToMapBot = {};
      if (resItem) {
        // console.log("Response: ", resItem)
        dataToMapTop.push(
          {label1: 'No Ticket', value1: resItem.ticketNumber, label2: 'Jenis Pekerjaan', value2: resItem.jobType},
          {label1: 'Tgl Request', value1: resItem.requestDate ? moment(resItem.requestDate).format('DD/MM/YYYY') : '-', label2: 'PIC / Vendor', value2: resItem.picVendor},
          {label1: 'User Request', value1: resItem.userRequester, label2: 'ID Lokasi', value2: resItem.locationId},
          {label1: 'ID Mesin', value1: resItem.idMesin, label2: 'Nama Lokasi', value2: resItem.locationName},
        );
        dataToMapBot = {
          picVendor: resItem.picVendor,
          jobType: resItem.jobType,
          goodsCostList: resItem.goodsCostList,
          biayaBarang: resItem.goodsCostList,
          totalGoodsCost: resItem.totalGoodsCost,
          serviceFeeList: resItem.serviceFeeList,
          biayaService: resItem.serviceFeeList,
          totalServiceFee: resItem.totalServiceFee,
          comments: resItem.comments,
          totalCost: resItem.totalCost,
          ppn: resItem.ppn,
          totalCostWithPpn: resItem.totalCostWithPpn,
          requestDate: resItem.requestDate,
          addressVendor: resItem.addressVendor,
          letterNumber: resItem.letterNumber,
          letterHead: resItem.letterHead,
        };
        setDataTopComp(dataToMapTop);
        setDataBotComp(dataToMapBot);
      } else {
        alert(data.data.responseMessage);
        history.goBack();
      }
      setModalLoader(false);
    } catch (error) {
      console.log("error", error);
      setModalLoader(false);
      alert(`Getting Detail ${error}`);
      history.goBack();
    }
  };

  useEffect(()=>{getDetailApproval();},[]);

  const configNew = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  function submitApproveOrReject(){
    const serviceType = confirmType === "Approve" ? 'approveApprovalVendor' : 'rejectApprovalVendor';
    
    const dataHit = {
      approveList: [{id: approvalId, taskType: type}]
    };
      // console.log(dataHit);
    setModalLoader(true);
    Axios({
      url: `${process.env.REACT_APP_API_DOMAIN}/implementationservice/v1/${serviceType}`,
      method: 'POST',
      data: dataHit,
      headers: configNew,
    })
      .then(res => {
        if(res.data.responseCode === "00"){
          switch(confirmType) {
          case 'Approve':
            setOpenConfirmModal(false);
            setOpenSuccessPopUp(true);
            setSuccessLabel('Approve Berhasil Dilakukan');
            break;
          default:
            setOpenConfirmModal(false);
            setOpenSuccessPopUp(true);
            setSuccessLabel('Reject Berhasil Dilakukan');
            break;
          }
        }else{
          alert(res.data.responseMessage);
        }
        setModalLoader(false);
      })
      .catch( err => {
        alert('Error', err);
        setOpenConfirmModal(false);
        setModalLoader(false);
        console.log(err);
      });
    
  }

  // HANDLER APPROVE or REJECT

  // useEffect(() => {
  //   alert(confirmType);
  // }, [confirmType]);
  
  function handleApproveReject(tipe){

    const strToLower = userRoleName.toLowerCase();
    const isApproval = strToLower.includes('approval_implementasi');
    if (!isApproval) {
      alert('Approve / Reject Action allowed just for Approval Implementation Users');
    }else{
      if(tipe === "Approve"){
        setConfirmType('Approve');
      }else{
        setConfirmType('Reject');
      }
      setOpenConfirmModal(true);
    }
  }

  const saveComment=(e)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      const dataHit={
        message,
        cardTaskCategory: type,
        cardTaskId: approvalId,
      };
      doSaveComment(loaderHandler,dataHit)
        .then((res) => {
          // console.log('~ res.data', res.data);
          if(res.data){
            if(res.data.responseCode === "00"){
              alert(`Berhasil save comment`);
              history.go(0);
            }
          }
        })
        .catch((err) => {
          alert(`Gagal save comment. ${err}`);
          setModalLoader(false);
        });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.backButton}>
        <MuiIconLabelButton
          label="Back"
          iconPosition="startIcon"
          onClick={() => history.goBack()}
          buttonIcon={<ArrowLeft />}
        />
      </div>
      <div className={classes.content}>
        <Typography className={classes.title}>Penawaran Harga</Typography>

        {/* Container */}
        <Grid container direction="column" style={{ marginTop: 20 }}>
          {/* Top Component */}
          <Grid item>
            <TopComponent data={dataTopComp} />
          </Grid>

          {/* Bottom Component */}
          <Grid item>
            <BotComponent
              onViewSurat={(e) => setOpenViewSurat(e)}
              onSubmit={(tipe) => handleApproveReject(tipe)}
              data={dataBotComp}
              handleMessage={(e) => setMessage(e.target.value)}
              onMessageEnter={saveComment}
            />
          </Grid>
        </Grid>
      </div>
      <ConfirmPopUp
        isOpen={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        type={confirmType}
        onSubmit={submitApproveOrReject}
      />
      <SuccessPopUp
        isOpen={OpenSuccessPopUp}
        onClose={() => history.goBack()}
        label={successLabel}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
      {/* <FloatingChat /> */}
      <PopupSurat
        isOpen={openViewSurat}
        onClose={() => setOpenViewSurat(false)}
        typeView="view"
        // dataSurat={dataTop}
        content={dataBotComp}
        kopSurat={dataBotComp?.letterHead}
      />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default ApprovalMain;