import React, {useState,useEffect} from 'react'
import {makeStyles,Paper,Grid,Typography} from "@material-ui/core"
import { ReactComponent as IconNumber } from "../../../../assets/icons/duotone-red/exchange-icon.svg";
import ChkyOverview from './ChkyOverview';
import useRupiahConverter from "../../../../helpers/useRupiahConverter";
import NumberEmployee from './NumberEmployee';
import { doGetNumberEmployee, doGetNumberTaskEmployee } from '../../ApiServices';

const UseStyles = makeStyles((theme) => ({
  paperWrapper: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
    borderRadius: 10,
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "15px",
    color: "#2B2F3C",
    marginLeft: 10,
  },
}));

function index() {
    const classes = UseStyles()
    const [isLoadData, setIsLoadData] = useState(false);
    const [dataChart, setDataChart] = useState({});
    const [dataTask,setDataTask]=useState({})

    function loadDataHandler(loaderValue) {
      setIsLoadData(loaderValue);
    }
      useEffect(() => {
         doGetNumberEmployee(loadDataHandler).then((response) => {
           console.log("+++responseChart", response.summaryOrder[0]);
           setDataChart(response.summaryOrder[0]);
         });
      }, []);
      useEffect(()=>{
        doGetNumberTaskEmployee(loadDataHandler).then((res)=>{
          console.log("dataTask",res)
          if(res){
             const taskData = res.detail[0];
             setDataTask(taskData)
          }
        })
      },[])
      const dataRandom = [
        {
          title: "Implementation ke Vendor",
          value: dataTask.implementation ? dataTask.implementation : 0,
        },
        {
          title: "Nego Biaya oleh Vendor ke CIMB",
          value: dataTask.costNegotiation ? dataTask.costNegotiation : 0,
        },
        {
          title: "Nego yang diverifikasi deal oleh CIMB",
          value: dataTask.verificationCost ? dataTask.verificationCost:0,
        },
      ];
      const dataRandom2 = [
        {
          title: "Masuk ke Proses Approval",
          value: dataTask.approvalProcess ? dataTask.approvalProcess : 0,
        },
        {
          title: "Pekerjaan yang sudah Selesai",
          value: dataTask.doneTask ? dataTask.doneTask : 0,
        },
        {
          title: "Pekerjaan yang sudah ditambah invoice",
          value: dataTask.taskInvoiced ? dataTask.taskInvoiced : 0,
        },
      ];
  return (
    <div className={classes.paperWrapper}>
      <Paper className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.indicator}
        >
          <Grid item>
            <div className={classes.col}>
              <IconNumber />
              <Typography className={classes.title} style={{ marginLeft: 10 }}>
                Proses Orderan di Vendor Order (Jumlah Request)
              </Typography>
            </div>
            <div style={{ margin: "20px 0" }}>
              <Grid
                container
                direction="row"
               //justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    //justifyContent="space-between"
                  >
                    {dataRandom.map((item) => (
                      <Grid item style={{ paddingTop: 20 }}>
                        <ChkyOverview
                          title={item.title}
                          value={useRupiahConverter(item.value, true)}
                          height={90}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    //justifyContent="space-between"
                  >
                    {dataRandom2.map((item) => (
                      <Grid item style={{ paddingTop: 20 }}>
                        <ChkyOverview
                          title={item.title}
                          value={useRupiahConverter(item.value, true)}
                          height={90}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item style={{ paddingTop: 20 }}>
                  <NumberEmployee dataChart={dataChart} isLoad={isLoadData}/>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default index