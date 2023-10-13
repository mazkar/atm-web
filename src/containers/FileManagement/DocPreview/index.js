import React, { useState, useEffect, useContext } from "react";
import { makeStyles, Paper, Grid, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import MinioImageComponent from "../../../components/MinioImageComponent";
import MinioDocComponent from "../../../components/MinioDocComponent";
import { useHistory, useLocation, useParams } from "react-router-dom";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import { ReactComponent as LeftArrow } from "../../../assets/icons/linear-red/arrow-left.svg";
import { PrimaryHard } from "../../../assets/theme/colors";
import { dogetDetailAllFile, headersSetting } from "../serviceFileManagement";
import LoadingView from "../../../components/Loading/LoadingView";
import { Markup } from "interweave";
import { RootContext } from "../../../router";
import ModalLoader from "../../../components/ModalLoader";
import PopUpConfirmation from '../../../components/PopUpConfirmation';
import PopupSucces from "../../../components/PopupSucces";
import axios from "axios";

const UseStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  paperView: {
    padding: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    fontFamily: "barlow",
    marginBottom: 24,
  },
  image: {
    minWidth: 600,
    height: 450,
    marginTop: 20,
    borderRadius: 10,
  },
  colImage: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    overflow: "hidden",
  },
  colFile: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  desc: {
    fontFamily: "Barlow",
    fontSize: 18,
    fontWeight: 400,
    wordSpacing: "2%",
  },
});

function DocPreview(props) {
  const classes = UseStyles();
  const { userRoleName } = useContext(RootContext);
  const isApproval = userRoleName.toLowerCase().includes('admin_file_management');

  const pathName = useLocation().pathname;
  const { id } = useParams();
  const history = useHistory();

  const [dataDetail, setDataDetail] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isOpenModalLoader, setOpenModalLoader] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState('Approve');
  const [labelSuccess, setLabelSuccess] = useState('');

  const type = pathName.split("/")[3];
  const payload = {
    id: parseInt(id),
    type: type,
  };

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  const htmlToDraftBlocks = (html) => {
    return (
      <div>
        <Markup content={html} />
      </div>
    );
  };

  useEffect(() => {
    dogetDetailAllFile(loadingHandler, payload).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          setDataDetail(response);
          setAttachments(JSON.parse(response.attachment[0]));
        }
      }
    });
  }, []);

  function handleApproveReject(tipe){
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

  function doApproveOrReject(){
    const serviceType = confirmType === "Approve" ? 'approveDocFile' : 'rejectDocFile';
    const arr = [{ id }];
    const dataHit = {
      listApprovalReject: arr
    };
    // console.log("+++ dataHit", dataHit);
    setOpenModalLoader(true);
    // alert(`confirmType : ${confirmType}`);
    axios({
      url: `${process.env.REACT_APP_API_FILE_MANAGEMENT}/${serviceType}`,
      method: 'POST',
      data: dataHit,
      headers: headersSetting,
    })
      .then(res => {
        setOpenModalLoader(false);
        // console.log('+++ res', res);
        if(res.data.responseCode === "200"){
          switch(confirmType) {
          case 'Approve':
            setLabelSuccess('Approve Berhasil Dilakukan');
            break;
          default:
            setLabelSuccess('Reject Berhasil Dilakukan');
            break;
          }
          setOpenConfirmModal(false);
          setOpenSuccessModal(true);
        }else{
          alert(res.data.responseMessage);
        }
      })
      .catch( err => {
        alert('Error', err);
        setOpenConfirmModal(false);
        setOpenModalLoader(false);
        console.log(err);
      });

  }
  return (
    <div className={classes.root}>
      <Grid container direction="column" className={classes.titleContainer}>
        <Grid item style={{ marginTop: 10 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <MuiIconLabelButton
                label="Back"
                iconPosition="startIcon"
                buttonIcon={<LeftArrow />}
                onClick={() => history.goBack()}
                style={{
                  background: "inherit",
                  color: PrimaryHard,
                  padding: 0,
                }}
              />
            </Grid>
            {(type === "control" && isApproval) && (
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      style={{
                        backgroundColor: "#DC241F",
                        padding: "12px 40px",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        textTransform: "capitalize",
                        borderRadius: 8,
                      }}
                      onClick={()=>handleApproveReject("Reject")}
                    >
                      Reject
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        backgroundColor: "#65D170",
                        padding: "12px 40px",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        textTransform: "capitalize",
                        borderRadius: 8,
                      }}
                      onClick={()=>handleApproveReject("Approve")}
                    >
                      Approve
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: 10, marginBottom: 20 }}>
          <Typography className={classes.title}>
            {type === "control"
              ? "Document Control"
              : type === "project"
              ? "Document Project"
              : type === "knowledge"
              ? "Knowledge Based"
              : "Document"}
          </Typography>
        </Grid>
      </Grid>

      {isLoading ? (
        <LoadingView />
      ) : (
        <Paper className={classes.paperView}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography className={classes.title}>
                {dataDetail.fileName}
              </Typography>
            </Grid>

            {/* image List */}
            <Grid item xs={12}>
              <Grid container direction="column">
                <div className={classes.colImage}>
                  {attachments
                    ? attachments.map((item) => {
                        const extension = item.slice(item.length - 4);
                        if (
                          extension === ".jpg" ||
                          extension === ".png" ||
                          extension === "jpeg"
                        ) {
                          return (
                            <Grid item>
                              <MinioImageComponent
                                filePath={item}
                                className={classes.image}
                              />
                            </Grid>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}
                </div>
              </Grid>
            </Grid>
            {/* end image list */}

            {/* Deskripsi */}
            <Grid item xs={12} style={{ margin: "25px 0px" }}>
              <Typography className={classes.desc}>
                {htmlToDraftBlocks(dataDetail.description)}
              </Typography>
            </Grid>
            {/*End Deskripsi */}

            {/* item doc xlsx */}
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <div className={classes.colFile}>
                {attachments
                  ? attachments.map((item) => {
                      const extension = item.slice(item.length - 4);
                      if (
                        extension === "docx" ||
                        extension === "xlsx" ||
                        extension === ".pdf"
                      ) {
                        return (
                          <div style={{ marginRight: 15 }}>
                            <MinioDocComponent filePath={item} />
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })
                  : null}
              </div>
            </Grid>
            {/* doc list */}
          </Grid>
        </Paper>
      )}

      <PopUpConfirmation
        isOpen={openConfirmModal}
        onClose={()=>{setOpenConfirmModal(false);}}
        onLeave={()=>{setOpenConfirmModal(false);}}
        message={confirmType ===  "Reject" ? "Anda yakin ingin Melakukan Reject ?" : "Anda yakin ingin Melakukan Approve ?"}
        desc="Anda tidak dapat membatalkan tindakan ini"
        onSubmit={doApproveOrReject}
      />
      <PopupSucces
        isOpen={openSuccessModal}
        onClose={()=>{setOpenSuccessModal(false); history.push("/file-management/file-approval")}}
        message={labelSuccess}
      />
      <ModalLoader isOpen={isOpenModalLoader} />
    </div>
  );
}

DocPreview.PropTypes = {
  title: PropTypes.string.isRequired,
};

DocPreview.defaultProps = {
  title: "Document",
};
export default DocPreview;
