/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link } from "react-router-dom";
import EmptyImg from "../../assets/images/empty_data.png";
import FloatingChat from "../../components/GeneralComponent/FloatingChat";
import {
  Dark,
  GrayMedium,
  WarningMedium,
  WarningSoft,
  SuccessMedium,
  SuccessSoft,
  PrimaryHard,
  GrayUltrasoft,
} from "../../assets/theme/colors";
import { ReactComponent as TitleRateIcon } from "../../assets/icons/general/transaction_rate_overview.svg";
import LoadingView from "../../components/Loading/LoadingView";
import { thousandFormat } from "../../helpers/useFormatter";
import NumberFormat from 'react-number-format';

const CustomFormat = ({value}) => <NumberFormat value={value} displayType='text' decimalSeparator=',' thousandSeparator='.' decimalScale={2} />

const useStyles = makeStyles(() => ({
  section: {
    padding: 20,
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
    marginBottom: 20,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  sectionTitle: { fontWeight: 500, fontSize: "15px", lineHeight: "18px" },
  chipRoot: {
    borderRadius: 4,
    padding: "2px 12px",
    height: "auto",
  },
  chipRed: {
    border: `1px solid ${WarningMedium}`,
    backgroundColor: WarningSoft,
    color: WarningMedium,
  },
  chipGreen: {
    border: `1px solid ${SuccessMedium}`,
    backgroundColor: SuccessSoft,
    color: SuccessMedium,
  },
  chipLabel: {
    fontWeight: 500,
    fontSize: "10px",
    lineHeight: "12px",
    padding: 0,
  },
  dataNull: {
    backgroundImage: `url(${EmptyImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: 75,
    position: "relative",
    height: 300,
    opacity: 0.5,
  },
  select: {
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
}));

const convertToBio = (data) => {
  var intData = parseInt(data);
  intData = parseFloat(intData / 1000000000).toFixed(2);
  var intDatas = intData.split(".");
  intData = thousandFormat(intDatas[0]);
  intData = intData + "," + intDatas[1];
  return intData;
};

const convertToMio = (data) => {
  var intData = parseInt(data);
  intData = parseFloat(intData / 1000000).toFixed(2);
  var intDatas = intData.split(".");
  intData = thousandFormat(intDatas[0]);
  intData = intData + "," + intDatas[1];
  return intData;
};

const PlanAnalytic = () => {
  const classes = useStyles();
  // ============ FETCH DATA CONTENT ============
  const [targetPencapaianRBB, setTargetPencapaianRBB] = useState([]);
  const [loadingTargetPencapaianRBB, setLoadingTargetPencapaianRBB] = useState(
    true
  );
  const [targetPencapaianTransaksi, setTargetPencapaianTransaksi] = useState(
    []
  );
  const [
    loadingTargetPencapaianTransaksi,
    setLoadingTargetPencapaianTransaksi,
  ] = useState(true);
  const [targetPopulasi, setTargetPopulasi] = useState([]);
  const [loadingtargetPopulasi, setLoadingTargetPopulasi] = useState(true);

  useEffect(() => {
    const fetchDataContent = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      try {
        const result = await Axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/masterrbbservices/v1/planAnalytic/dashboard`,
          config
        );
        // console.log(`result`, result);
        let data = result.data.targetAchievementRbbResponse;
        setTargetPencapaianRBB([
          {
            title: "Target New ATM",
            url: "/plan-analytic/analyze-rbb#targetNewAtm",
            data: data.targetNewAtm,
          },
          {
            title: "Target Renewal ATM",
            url: "/plan-analytic/analyze-rbb#targetRenewal",
            data: data.targetRenewalAtm,
          },
          {
            title: "Target Terminasi ATM",
            url: "/plan-analytic/analyze-rbb#targetTermin",
            data: data.targetTerminAtm,
          },
        ]);
        setLoadingTargetPencapaianRBB(false);

        for (let i = 0; i < data.targetTransaction.length; i++) {
          if (data.targetTransaction[i].frequently === "yearly") {
            data.targetTransaction[i].frequently = "Year";
          }

          if (data.targetTransaction[i].frequently === "monthly") {
            data.targetTransaction[i].frequently = "Month";
          }

          data.targetTransaction[i].target = data.targetTransaction[i].target
            // .toString()
            // .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          data.targetTransaction[i].actual = data.targetTransaction[i].actual
            // .toString()
            // .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        for (let i = 0; i < data.targetRevenue.length; i++) {
          if (data.targetRevenue[i].frequently === "yearly") {
            data.targetRevenue[i].frequently = "Year (Bio)";
          }

          if (data.targetRevenue[i].frequently === "monthly") {
            data.targetRevenue[i].frequently = "Month (Bio)";
          }
        }

        for (let i = 0; i < data.targetSla.length; i++) {
          if (data.targetSla[i].frequently === "yearly") {
            data.targetSla[i].frequently = "Year (%)";
          }

          if (data.targetSla[i].frequently === "monthly") {
            data.targetSla[i].frequently = "Month (%)";
          }

          // data.targetSla[i].target = `${data.targetSla[i].target}`;
          // data.targetSla[i].actual = `${data.targetSla[i].actual.toFixed(
          //   2
          // )}`.replace(".", ",");
        }

        setTargetPencapaianTransaksi([
          {
            title: "Target Transaksi",
            url: "/plan-analytic/analyze-transaksi#targetTransaksi",
            data: data.targetTransaction,
          },
          {
            title: "Target Revenue",
            url: "/plan-analytic/analyze-transaksi#targetRevenue",
            data: data.targetRevenue,
          },
          {
            title: "Target SLA Transaksi",
            url: "/plan-analytic/analyze-transaksi#targetSLATransaksi",
            data: data.targetSla,
          },
        ]);
        setLoadingTargetPencapaianTransaksi(false);

        setTargetPopulasi([
          {
            title: "Target % Low Usage",
            url: "/plan-analytic/analyze-populasi",
            data: data.targetPercentPopulation[1],
          },
        ]);
        setLoadingTargetPopulasi(false);

      } catch (err) {
        setLoadingTargetPencapaianRBB(false);
        setLoadingTargetPencapaianTransaksi(false);
        setLoadingTargetPopulasi(false);
        alert(`Error Fetching DataaTotal...! \n${err}`);
      }
    };
    fetchDataContent();
  }, []);
  // ============ END FETCH DATA CONTENT ============

  return (
    <div
      style={{
        padding: 30,
        backgroundColor: GrayUltrasoft,
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Typography
        style={{
          fontWeight: 500,
          fontSize: "36px",
          lineHeight: "43px",
          color: Dark,
          textShadow: "0px 6px 10px rgba(0, 0, 0, 0.08)",
          marginBottom: 30,
        }}
      >
        Plan &amp; Analytic
      </Typography>

      <Paper className={classes.section}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <TitleRateIcon />
          <Typography
            className={classes.sectionTitle}
            style={{ marginLeft: 10 }}
          >
            Target Pencapaian RBB
          </Typography>
        </div>

        {loadingTargetPencapaianRBB ? (
          <LoadingView maxheight="100%" />
        ) : (
          <Grid container spacing={2}>
            {targetPencapaianRBB.map((d, i) => {
              return (
                <Grid item xs={4} key={i}>
                  <div
                    style={{
                      border: `1px solid ${GrayMedium}`,
                      borderRadius: 8,
                      padding: 15,
                    }}
                  >
                    <Typography
                      className={classes.sectionTitle}
                      style={{ marginBottom: 10, textAlign: "center" }}
                    >
                      {d.title}
                    </Typography>
                    <Grid
                      container
                      style={{ marginBottom: 8 }}
                      justify="center"
                    >
                      {d.data.map((c, ci) => {
                        const isMet = c.meet.toLowerCase() === 'meet'
                        return (
                          <Grid
                            item
                            xs
                            style={{ textAlign: "center" }}
                            key={ci}
                          >
                            <Typography
                              style={{
                                fontSize: "13px",
                                lineHeight: "16px",
                                marginBottom: 5,
                              }}
                            >
                              Per{" "}
                              {c.frequently === "monthly" ? "Month" : "Year"}
                            </Typography>

                            <Grid item>
                              <Typography
                                style={{
                                  fontFamily: "Barlow",
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  fontSize: "28px",
                                }}
                              >
                                <CustomFormat value={c.actual} />
                              </Typography>
                              <Typography
                                style={{
                                  fontFamily: "Barlow",
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  fontSize: "15px",
                                }}
                              >
                                <CustomFormat value={c.target} />
                              </Typography>
                              <Chip
                                classes={{
                                  root: clsx(
                                    classes.chipRoot,
                                    isMet
                                      ? classes.chipGreen
                                      : classes.chipRed
                                  ),
                                  label: classes.chipLabel,
                                }}
                                label={isMet ? 'Meet' : 'Not Meet'}
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <Typography
                      style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        lineHeight: "18px",
                        textAlign: "center",
                        display: "block",
                        color: PrimaryHard,
                      }}
                      component={Link}
                      to={d.url}
                    >
                      Analyze
                    </Typography>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>

      <div style={{ marginTop: 20 }}>
        <Paper className={classes.section}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <TitleRateIcon />
            <Typography
              className={classes.sectionTitle}
              style={{ marginLeft: 10 }}
            >
              Target Pencapaian Transaksi
            </Typography>
          </div>

          {loadingTargetPencapaianTransaksi ? (
            <LoadingView maxheight="100%" />
          ) : (
            <Grid container spacing={2}>
              {targetPencapaianTransaksi.map((d, i) => {
                return (
                  <Grid item xs={4} key={i}>
                    <div
                      style={{
                        border: `1px solid ${GrayMedium}`,
                        borderRadius: 8,
                        padding: 15,
                      }}
                    >
                      <Typography
                        className={classes.sectionTitle}
                        style={{ marginBottom: 10, textAlign: "center" }}
                      >
                        {d.title}
                      </Typography>
                      <Grid
                        container
                        style={{ marginBottom: 8 }}
                        justify="center"
                      >
                        {d.data.map((c, ci) => {
                          const isMet = c.meet.toLowerCase() === 'meet'
                          const isRevenue = c.category === 'Target Revenue'
                          return (
                            <Grid
                              item
                              xs={6}
                              style={{ textAlign: "center" }}
                              key={ci}
                            >
                              <Typography
                                style={{
                                  fontSize: "13px",
                                  lineHeight: "16px",
                                  marginBottom: 5,
                                }}
                              >
                                Per {c.frequently}
                              </Typography>

                              <Grid item>
                                <Typography
                                  style={{
                                    fontFamily: "Barlow",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    fontSize: "28px",
                                  }}
                                >
                                  <CustomFormat value={isRevenue ? convertToBio(c.actual) : c.actual} />
                                </Typography>
                                <Typography
                                  style={{
                                    fontFamily: "Barlow",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    fontSize: "15px",
                                  }}
                                >
                                  <CustomFormat value={isRevenue ? convertToBio(c.target) : c.target} />
                                </Typography>
                                <Chip
                                  classes={{
                                    root: clsx(
                                      classes.chipRoot,
                                      isMet
                                        ? classes.chipGreen
                                        : classes.chipRed
                                    ),
                                    label: classes.chipLabel,
                                  }}
                                  label={isMet ? 'Meet' : 'Not Meet'}
                                  variant="outlined"
                                />
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <Typography
                        style={{
                          fontWeight: 500,
                          fontSize: "15px",
                          lineHeight: "18px",
                          textAlign: "center",
                          display: "block",
                          color: PrimaryHard,
                        }}
                        component={Link}
                        to={d.url}
                      >
                        Analyze
                      </Typography>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Paper>
      </div>

      <div style={{ marginTop: 20 }}>
        <Paper className={classes.section}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <TitleRateIcon />
            <Typography
              className={classes.sectionTitle}
              style={{ marginLeft: 10 }}
            >
              Target % Populasi
            </Typography>
          </div>

          {loadingtargetPopulasi ? (
            <LoadingView maxheight="100%" />
            ) : (
              <Grid container spacing={2}>
              {targetPopulasi.map((d, i) => {
                const isMet = d.data.meet.toLowerCase() === 'meet'
                return (
                  <Grid item xs={4} key={i}>
                    <div
                      style={{
                        border: `1px solid ${GrayMedium}`,
                        borderRadius: 8,
                        padding: 15,
                      }}
                    >
                      <Typography
                        className={classes.sectionTitle}
                        style={{ marginBottom: 10, textAlign: "center" }}
                      >
                        {d.title}
                      </Typography>
                      <Grid
                        container
                        style={{ marginBottom: 8 }}
                        justify="center"
                      >
                        {/* {d.data.map((c, ci) => {
                          return ( */}
                        <Grid
                          item
                          xs={6}
                          style={{ textAlign: "center" }}
                          // key={ci}
                        >
                          <Typography
                            style={{
                              fontSize: "13px",
                              lineHeight: "16px",
                              marginBottom: 5,
                            }}
                          >
                            {/* Per {c.frequently === "monthly" ? "Month" : "Year"} */}
                            Per Month (%)
                          </Typography>

                          <Grid item>
                            <Typography
                              style={{
                                fontFamily: "Barlow",
                                fontStyle: "normal",
                                fontWeight: "normal",
                                fontSize: "28px",
                              }}
                            >
                              <CustomFormat value={(d.data.actual)} />
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "Barlow",
                                fontStyle: "normal",
                                fontWeight: "normal",
                                fontSize: "15px",
                              }}
                            >
                              <CustomFormat value={d.data.target} />
                            </Typography>
                            <Chip
                              classes={{
                                root: clsx(
                                  classes.chipRoot,
                                  isMet
                                    ? classes.chipGreen
                                    : classes.chipRed
                                ),
                                label: classes.chipLabel,
                              }}
                              label={isMet ? 'Meet' : 'Not Meet'}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Typography
                        style={{
                          fontWeight: 500,
                          fontSize: "15px",
                          lineHeight: "18px",
                          textAlign: "center",
                          display: "block",
                          color: PrimaryHard,
                        }}
                        component={Link}
                        to={d.url}
                      >
                        Analyze
                      </Typography>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Paper>
      </div>
      {/* <FloatingChat /> */}
    </div>
  );
};

export default PlanAnalytic;
