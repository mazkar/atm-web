import React,{useEffect,useState} from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import axios from "axios";
import { ReactComponent as CalcIcon } from "../../../../assets/icons/general/calculator_overview.svg";
import SummaryDonutChart from "./donutChart";
import SummaryDonutChart2 from "./donutChart2";
import constants from "../../../../helpers/constants";
import LoadingView from "../../../../components/Loading/LoadingView";
import UptimeDowntimeTable from "./uptimeDowntimeTable";

const Summary = () => {
  const [dataDurasi,setDataDurasi] = useState([]);
  const [dataCount,setDataCount] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  async function getDataUptime() {
    setIsLoading(true);
    // console.log('~ dataRequest', dataRequest);
    try {
      const result = await axios.get(
        `${constants.MONITORING_SERVICE}/getCountUptimeAndDowntime`,
  
      );
      console.log('res data upTime', result.data);
      setDataDurasi([
        {
          label:"Uptime",
          value:parseFloat(result.data.duration.upTime)
         
        },
        {
          label:"Downtime",
          value:parseFloat(result.data.duration.downTime)
         
        }
      ]
      
      );
      setDataCount([
        {
          label:"Uptime",
          value:parseFloat(result.data.count.upTime)
         
        },
        {
          label:"Downtime",
          value:parseFloat(result.data.count.downTime)
         
        }
      ]
      
      );
    } catch (err) {
      alert(`Error Fetching Data Orders ...! \n${err}`);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getDataUptime();
  }, []);

  return (
    <div style={{ padding: 30, paddingTop: 0 }}>
      <Paper
        style={{
          boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
          borderRadius: "10px",
          padding: 20,
        }}
      >
     
        <div
          style={{ marginBottom: 10, display: "flex", alignItems: "center" }}
        >
          <CalcIcon />
          <Typography
            style={{
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "18px",
              marginLeft: 10,
            }}
          >
            Uptime & Downtime
          </Typography>
        </div>
        <Grid container spacing={2}>
          {isLoading ? (
            <Grid item xs={6}>
              <LoadingView maxheight="100%" />
            </Grid>
          ):(<Grid item xs={6}>
            <SummaryDonutChart2 
              dataChartCount={dataCount}
              upTime={dataCount[0]?.value}
              downTime={dataCount[1]?.value}
            />
          </Grid>)}
          {isLoading ? 
            <Grid item xs={6}>
              <LoadingView maxheight="100%" />
            </Grid> : 
            <Grid item xs={6}>
              <UptimeDowntimeTable />
            </Grid>
          }
        </Grid>
      </Paper>
    </div>
  );
};

export default Summary;
