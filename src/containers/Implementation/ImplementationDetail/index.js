/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, 
{ 
  useState, 
  useEffect, 
  // useContext 
} from "react";
import { useParams, withRouter } from "react-router-dom";
// eslint-disable-next-line import/no-cycle
// import { RootContext } from "../../../router";
import { ReactComponent as BackIcon } from "../../../assets/icons/general/arrow_back_red.svg";
import constansts from "../../../helpers/constants";
import ModalLoader from "../../../components/ModalLoader";
import ImplementationTabInfo from "./ImplementationTabInfo";
import ListCard from "./ListCard";
import settingApi from "../../../services/implementation/implementationDetail";
import { doFetchImplementationDetail } from "../ApiServiceImplementation";
import moment from 'moment'

const useStyles = makeStyles({
  root: { padding: "30px 20px 20px 30px" },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
  },
  backAction: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: "#2B2F3C",
  },
  divider: { marginTop: 25 },
  boldText: {
    fontFamily: "Barlow",
    fontWeight: "600",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  normalText: {
    fontFamily: "Barlow",
    fontWeight: "400",
    fontSize: "13px",
    color: "#2B2F3C",
  },
  tableRoot: {
    minWidth: 500,
  },
  tableCell: {
    borderBottom: "none",
  },
});

const GeneralDetail = ({ history }) => {
  const classes = useStyles();
  const [resetData, setResetData] = useState(0);
  // GET ID from URI
  const { id } = useParams();
  // GET USER ID
  // const { userId } = useContext(RootContext);
  // const NewUserId = parseInt(userId);

  // INIT STATE
  const [dataInfoGeneral, setInfoGeneral] = useState({});
  const [isLoadData, setLoadData] = useState(false);
  const [dataCondition, setCondition]= useState({})
  const [titleCondition, setTitleCondition]= useState("")

  // HANDLER FOR STATE
  function loadingHandler(bool) {
    setLoadData(bool);
  }

  const fetchDetailData = () => {

    // settingApi.implementationDetail({ id }, loadingHandler).then((response) => {
    //   setInfoGeneral(response);
    // });

    doFetchImplementationDetail(loadingHandler,{ id })
      .then((response) => {
        setInfoGeneral(response);
        setCondition(response.implementationInformation.condition)
      });

  };
 const titleTarget = ()=>{
  if(dataCondition == "Termin"){
    setTitleCondition("Target Termin")
  }else if (dataCondition == "Replace"){
    setTitleCondition("Target Replace")
  }else{
    setTitleCondition("Target Online")
  }
 }
  useEffect(() => {
    // FETCHING ON COMPONENT DID MOUNTED
    fetchDetailData();
  }, []);

  useEffect(() => {
    console.log("+++ dataInfoGeneral",dataInfoGeneral);
  }, [dataInfoGeneral]);

  const { onlineTargetDate } = dataInfoGeneral?.implementationInformation || {}

  const momentOnline = moment(onlineTargetDate)

  const targetOnline = onlineTargetDate ? momentOnline.format('D MMMM YYYY') : '-'

  useEffect(()=>{
    titleTarget()
  },[dataCondition])

  return (
    <div className={classes.root}>
      <Grid container>
        <div className={classes.backAction}>
          <Button onClick={() => history.push("/implementation")}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </div>
      </Grid>
      <div className={classes.divider} />
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography className={classes.title}>
            Implementation Detail
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="flex-end" spacing={3}>
            <Grid item>
              <Grid container>
                <Typography
                  style={{ color: "##000000", fontWeight: 500, fontSize: 16 }}
                >
                  {titleCondition}:{targetOnline}
                </Typography>
              </Grid>
              <Grid container style={{ justifyContent: "right" }}>
                <Typography
                  style={{ color: "#BCC8E7", fontWeight: 500, fontSize: 10 }}
                >
                  {momentOnline.diff(moment(), "days")} Days Left
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <ImplementationTabInfo
          data={dataInfoGeneral}
          idAtm={id}
          isLoadData={isLoadData}
        />
      </Grid>
      <div className={classes.divider} />
      <Grid container>
        <ListCard
          data={dataInfoGeneral}
          getPostApi={fetchDetailData}
          resetData={resetData}
          setResetData={setResetData}
        />
      </Grid>

      <ModalLoader isOpen={isLoadData} />
    </div>
  );
};

export default withRouter(GeneralDetail);
