/* eslint-disable react/forbid-prop-types */
/* Third Party Import */
import React, {useState, useEffect} from 'react';
import PropTypes, { bool } from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, Grid } from '@material-ui/core';

/* Internal Import */
import Filter from "./common/Filter";
import { ReactComponent as ExchangeAlt } from "../../../assets/icons/duotone-red/exchange-alt.svg";
import { ReactComponent as Rss } from "../../../assets/icons/duotone-red/rss.svg";
import { ReactComponent as Calculator } from "../../../assets/icons/duotone-red/calculator.svg";
import { ReactComponent as MoneyBill } from "../../../assets/icons/duotone-red/money-bill.svg";
import { ReactComponent as IdCard } from "../../../assets/icons/duotone-red/id-card.svg";
import { ReactComponent as UserHeadset } from "../../../assets/icons/duotone-red/user-headset.svg";
import { ReactComponent as ListIcon } from "../../../assets/icons/duotone-red/list-ul.svg";
import { ReactComponent as UsersCog } from "../../../assets/icons/duotone-red/users-cog.svg";
import { ReactComponent as Tools } from "../../../assets/icons/duotone-red/tools.svg";
import { ReactComponent as ExclamationCircle } from "../../../assets/icons/duotone-red/exclamation-circle.svg";
import ServiceMedicalRecord from './service';
import LoadingView from '../../../components/Loading/LoadingView';
import EmptyImg from "../../../assets/images/empty_data.png"

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  wrapper: {
    background: "#ffffff",
    borderRadius: "6px",
    padding: "20px 0px 0px 0px",
    marginBottom: "24px"
  },
  rowWrapper: {
    padding: "30px 20px",
    borderBottom: "1px solid rgba(188, 200, 231, 0.4)",
    '&:last-child': {
      borderBottom: "0px"
    }
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: "20px",
    textAlign: "center"
  },
  totalBarHeight: {
    height: "26px"
  },
  detailBarHeight: {
    height: "10px"
  },
  success: {
    background: "#65D170",
  },
  warning: {
    background: "#FFB443",
  },
  error: {
    background: "#FF6A6A",
  },
  statusBox: {
    width: "20px",
    height: "20px",
    borderRadius: "5px",
  },
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

const totalBar = {
  success: "70%",
  warning: "30%",
  error: "20%"
};

const data = [
  {
    icon: <ExchangeAlt width={22} height={22} />,
    title: "Success Rate Trx",
    detail: {
      success: "70%",
      warning: "30%",
      error: "20%"
    }
  },
  {
    icon: <Rss width={22} height={22} />,
    title: "Problem Jaringan",
    detail: {
      success: "20%",
      warning: "50%",
      error: "30%"
    }
  },
  {
    icon: <Calculator width={22} height={22} />,
    title: "Problem Hardware",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <MoneyBill width={22} height={22} />,
    title: "Problem Cash Out / Overfill",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <IdCard width={22} height={22} />,
    title: "Kartu Tertelan",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UserHeadset width={22} height={22} />,
    title: "Komplain Nasabah",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ListIcon width={22} height={22} />,
    title: "Selisih Rekonsiliasi",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan FLM (First Maintenance)",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan FLM (Replenishment)",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan SLM CM",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <UsersCog width={22} height={22} />,
    title: "Jumlah Kunjungan SLM PM",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <Tools width={22} height={22} />,
    title: "Penggantian Part / Link",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ListIcon width={22} height={22} />,
    title: "Problem Premises",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ExclamationCircle width={22} height={22} />,
    title: "Kejadian Force Majeur",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ExclamationCircle width={22} height={22} />,
    title: "Kejadian Vandalisme",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <IdCard width={22} height={22} />,
    title: "Klaim Asuransi",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
  {
    icon: <ListIcon width={22} height={22} />,
    title: "Log Force Majeur / Vandalism",
    detail: {
      success: "10%",
      warning: "40%",
      error: "50%"
    }
  },
];

const MedicalRecord = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState({
    atmId: "",
    location: ""
  });
  const [applyFilter, setApplyFilter] = useState(false)
  const [dataAPI, setDataAPI] = useState(null)
  const [percentageTotal, setPercentageTotal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { hitMedicalRecordSeverity, hitMedicalRecordFilter } = ServiceMedicalRecord()

  /* Methods */
  const handleChangeFilter = (event, key) => {
    setFilter((prevValue) => (
      {
        ...prevValue,
        [key]: event
      }
    ));
  };

  const handleApplyFilter = (bool) => {
    if(filter.atmId && !filter.location || filter.location && !filter.atmId) {
      return alert("tidak boleh di isi salah satu!\nexample : ATM ID = ZZD4 Location = SBY-CRM\natau hapus filter dan klik apply untuk mendapatkan semua data!")
    } else {
      setApplyFilter(bool)
    }
  }

  // convert Category Code to Category Name
  const categoryCode = (category) => {
    switch (category) {
      case "CF":
        return "Card Reader"
        break;
      case "CO":
        return "Cash Out"
        break;
      case "LC":
        return "Lost Comm"
        break;
      case "SL":
        return "SLM"
        break;
      case "DF":
        return "Dispenser"
        break;
      case "EF":
        return "Encryptor"
        break;
      case "HW":
        return "Hardware"
        break;
      case "SP":
        return "Spv Mode"
        break;
      case "IM":
        return "Implementasi"
        break;
      case "IN":
        return "Insurance"
        break;
      case "JF":
        return "Journal"
        break;
      case "MT":
        return "Maintenance"
        break;
      case "MP":
        return "Media Promosi"
        break;
      case "PM":
        return "PM"
        break;
      case "RF":
        return "Receipt Printer"
        break;
      case "SC":
        return "Security"
        break;
      case "OT":
        return "Other"
        break;
    
      default:
        return param
        break;
    }
  }

  const categoryIcon = (category) => {
    switch (category) {
      case "CF":
        return <ExchangeAlt width={22} height={22}/>
        break;
      case "CO":
        return <MoneyBill width={22} height={22}/>
        break;
      case "LC":
        return <Rss width={22} height={22}/>
        break;
      case "SL":
        return <IdCard width={22} height={22}/>
        break;
      case "DF":
        return <ListIcon width={22} height={22}/>
        break;
      case "EF":
        return <ExclamationCircle width={22} height={22}/>
        break;
      case "HW":
        return <Calculator width={22} height={22}/>
        break;
      case "SP":
        return <UserHeadset width={22} height={22}/>
        break;
      case "IM":
        return <UsersCog width={22} height={22}/>
        break;
      case "IN":
        return <ExchangeAlt width={22} height={22}/>
        break;
      case "JF":
        return <MoneyBill width={22} height={22}/>
        break;
      case "MT":
        return <Rss width={22} height={22}/>
        break;
      case "MP":
        return <IdCard width={22} height={22}/>
        break;
      case "PM":
        return <ListIcon width={22} height={22}/>
        break;
      case "RF":
        return <ExclamationCircle width={22} height={22}/>
        break;
      case "SC":
        return <Calculator width={22} height={22}/>
        break;
      case "OT":
        return <UserHeadset width={22} height={22}/>
        break;
    
      default:
        return <Tools width={22} height={22}/>
        break;
    }
  }

  // convert response agar bisa di terapkan pada UI yang ada

  const checkSeverity = (severity) => {
    if(!severity) return "0%"
    return (severity)
  }

  const convertSeverity = (severity) => {
    if (severity) {
      const severityLength = severity.length
      const slicedSeverity = severity.slice(0, severityLength - 1)

      return parseFloat(slicedSeverity)
    }
  }

  const convertResponse = (response) => {
    const resArray = []
    response.map((item) => {
      const obj = {}
      obj.title = categoryCode(item.name)
      obj.icon = categoryIcon(item.name)
      obj.detail = {
        success: checkSeverity(item.severityLevel?.sev1),
        warning: checkSeverity(item.severityLevel?.sev2),
        error: `${convertSeverity(checkSeverity(item.severityLevel?.sev3)) + convertSeverity(checkSeverity(item.severityLevel?.sev4))}%`
      }
      resArray.push(obj)
    })
    return resArray
  }

  // convert total data agar bisa di terapkan pada UI yang ada

  const convertToPercent = (val, totalVal) => {
    const result = parseInt(val) * 100 / totalVal
    return `${result}%`
  }
  
  const convertToInt = (data) => {
    if(!data) return 0
    return parseInt(data)
  }
  
  const totalPercentage = (data) => {
    // const obj = {}
    // const totalData = convertToInt(data?.sev1) + convertToInt(data?.sev2) + convertToInt(data?.sev3) + convertToInt(data?.sev4)
  
    // obj.success = data?.sev1 ? convertToPercent(data?.sev1, totalData) : "0%"
    // obj.warning = data?.sev2 ? convertToPercent(data?.sev2, totalData) : "0%"
    // obj.error = convertToPercent(convertToInt(data?.sev3) + convertToInt(data?.sev4), totalData)
  
    // return obj

    const obj = {}
    obj.success = data?.sev1 ? convertToInt(data?.sev1) : 0
    obj.warning = data?.sev2 ? convertToInt(data?.sev2) : 0
    obj.error = data?.sev3 || data?.sev4 ? convertToInt(data?.sev3) + convertToInt(data?.sev4) : 0

    return obj
  }

  /* Fetching Data */
  useEffect(() => {
    setIsLoading(true)
    if(filter.atmId) {
      hitMedicalRecordFilter(filter.atmId, filter.location).then((res) => {
        console.log(res) 
        if(res.status === 200) {
          setDataAPI(convertResponse(res.data.status))
          setPercentageTotal(totalPercentage(res.data.total))
          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      }).catch((err) => {
        setIsLoading(false)
        console.log(err) 
      })
    } else {
      hitMedicalRecordSeverity().then((res) => {
        console.log(res.data) 
        if(res.status === 200) {
          setDataAPI(convertResponse(res.data.status))
          setPercentageTotal(totalPercentage(res.data.total))
          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      }).catch((err) => {
        setIsLoading(false)
        console.log(err) 
      })
    }
  }, [applyFilter])

  useEffect(() => {
    console.log(dataAPI) 
    console.log(percentageTotal) 
  }, [dataAPI, percentageTotal])

  /* Functional Component */
  const RowOfProgress = ({data}) => {
    const {title, icon, detail} = data;
    return (
      <Grid container alignItems="center" className={classes.rowWrapper}>
        <Grid item xs={5}>
          <Grid container alignItems="center">
            {icon}
            <Typography style={{marginLeft: "10px", fontWeight: 500, fontSize: "15px"}}>{title}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Grid container style={{flexWrap: "nowrap", marginBottom: "10px"}}>
            {
              Object.keys(detail).map((type, index) => (
                <Grid container alignItems="center" style={{flexWrap: "nowrap", marginRight: "20px", width: "unset"}} >
                  <div className={`${classes.statusBox} ${classes[type]}`} />
                  <Typography
                    style={{fontWeight: 600, fontSize: "15px", marginLeft: "10px"}}>
                    Level {index+1} : {detail[type]}
                  </Typography>
                </Grid>
              ))
            }
          </Grid>
          <Grid container style={{flexWrap: "nowrap", borderRadius: "10px"}}>
            {
              Object.keys(detail).map((type, index) => {
                const rdx = () => {
                  if(!index) return "5px 0px 0px 5px";
                  if(index === 2) return "0px 5px 5px 0px";
                  return "0px";
                };
                const borderRadius = rdx();
                return (
                  <div
                    key={type}
                    className={`${classes.detailBarHeight} ${classes[type]}`}
                    style={{width: detail[type], borderRadius}}
                  />
                );
              })
            }
          </Grid>
        </Grid>
      </Grid>
    );
  };
  RowOfProgress.propTypes = {
    data: PropTypes.object.isRequired
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Medical Record</Typography>
      <Filter onChange={handleChangeFilter} value={filter} boolVal={applyFilter} onApply={handleApplyFilter} />
      <Grid container alignItems="center" className={classes.wrapper} style={{padding: "20px"}}>
        <Grid item xs={5}>
          <Typography className={classes.sectionTitle}>Total</Typography>
        </Grid>
        <Grid item xs={7}>
          <Grid container style={{flexWrap: "nowrap", borderRadius: "10px"}}>
            {isLoading ? (
              <div className={classes.loaderWrapper}>
                <LoadingView maxheight="100%" isTransparent />
              </div>
            ) : (
              <>
                {percentageTotal ? (
                  <>
                    {
                      Object.keys(percentageTotal).map((type, index) => {
                        const rdx = () => {
                          if(!index) return "5px 0px 0px 5px";
                          if(index === 2) return "0px 5px 5px 0px";
                          return "0px";
                        };
                        const borderRadius = rdx();
                        return (
                          <div key={type} className={`${classes.totalBarHeight} ${classes[type]}`} style={{width: percentageTotal[type], borderRadius}}>
                            <Typography style={{fontSize: "15px", color: "#ffffff", textAlign: "center"}}>{percentageTotal[type]}</Typography>
                          </div>
                        );
                      })
                    }
                  </>
                ) : (
                  <Grid
                    container
                    alignContent="center"
                    justify="center"
                    style={{ height: 175 }}
                    direction="column"
                  >
                    <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                    <Typography
                      style={{
                        opacity: 0.3,
                        textAlign: "center",
                        fontSize: 11,
                        marginTop: 10,
                      }}
                    >
                      Empty
                    </Typography>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.wrapper}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography className={classes.sectionTitle}>Status</Typography>
          </Grid>
        </Grid>
        {isLoading ? (
          <div className={classes.loaderWrapper}>
            <LoadingView maxheight="100%" isTransparent />
          </div>
        ) : (
          <>
            {dataAPI ? (
              <>
                {dataAPI.map(object => (
                  <RowOfProgress data={object} />
                ))}
              </>
            ) : (
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{ height: 175 }}
                direction="column"
              >
                <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                <Typography
                  style={{
                    opacity: 0.3,
                    textAlign: "center",
                    fontSize: 11,
                    marginTop: 10,
                  }}
                >
                  Empty
                </Typography>
              </Grid>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalRecord;
