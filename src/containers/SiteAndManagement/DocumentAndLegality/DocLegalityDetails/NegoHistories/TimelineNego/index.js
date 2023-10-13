import React, { useState, useEffect, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Link } from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment";
import { ReactComponent as FileIcon } from "../../../../../../assets/icons/general/paperclip.svg";
import { ReactComponent as FlagIcon } from "../../../../../../assets/icons/duotone-gray/flag-alt.svg";
import { ReactComponent as FlagGreenIcon } from "../../../../../../assets/icons/duotone-others/flag-alt-green.svg";
import getMinioFile from "../../../../../../helpers/getMinioFromUrl";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    margin: "0 auto",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 6,
      backgroundColor: "#BCC8E7",
      top: 35,
      bottom: 0,
      left: 10,
    },
  },
  container: {
    padding: "10px 10px 10px 40px",
    position: "relative",
    width: "100%",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: "#FF6A6A",
      border: "3px solid #FFFF",
      top: 10,
      borderRadius: "50%",
      zIndex: 2,
      boxShadow: "0px 4px 8px 2px rgba(188, 200, 231, 0.3)",
    },
  },
  containerFinish: {
    padding: "10px 10px 10px 40px",
    position: "relative",
    width: "100%",
    marginBottom: 10,
    "&::after": {
      content: '""',
      position: "absolute",
      width: 25,
      height: 25,
      left: 0,
      backgroundColor: "#65D170",
      border: "3px solid #FFFF",
      top: 35,
      borderRadius: "50%",
      zIndex: 2,
      boxShadow: "0px 4px 8px 2px rgba(188, 200, 231, 0.3)",
    },
  },
  content: {
    padding: "15px 15px",
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
  },

  contentFirst: {
    padding: "15px 15px",
    position: "relative",
    borderRadius: 10,
    border: "1px solid #BCC8E7",
    backgroundColor: "#fff",
    "&::after": {
      content: '""',
      position: "absolute",
      width: 20,
      height: 170,
      left: -37,
      backgroundColor: "#f7f7f7",
      top: -20,
      zIndex: 1,
    },
  },

  documentLink: {
    backgroundColor: "unset",
    padding: 0,
    "& .MuiButton-root": {
      padding: 0,
      textTransform: "none",
      backgroundColor: "unset",
    },
    "& .MuiButton-root:hover": { opacity: 0.6, backgroundColor: "unset" },
  },
});

const idrCurrencyFormat = (value, delimiter) => {
  return `Rp ${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)}`;
};

const OrdinalNumber = (i) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

const RenderOfferingFile = ({ filePath }) => {
  const [dataOffering, setDataOffering] = useState(null);
  function limitString(string, count) {
    const result =
      string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  useEffect(() => {
    try {
      getMinioFile(filePath).then((result) => {
        console.log(">>>> try getMinio Offering ", JSON.stringify(result));
        if(result){
          setDataOffering(result);
        }
      });
    } catch (err) {
      console.log(">>>> Error try getMinio", err);
    }
  }, []);

  return (
    <Link
      href={dataOffering === null ? "#" : dataOffering?.fileUrl}
      target="_blank"
      style={{
        textDecoration: "none",
        fontSize: 13,
        color: "#DC241F",
        fontWeight: 400,
      }}
    >
      {dataOffering === null ? "N/A" : limitString(dataOffering?.fileName, 25)}
    </Link>
  );
};

const TimelineNego = (props) => {
  const { dataNego } = props;
  const classes = useStyles();

  const [displayValue, setDisplayValue] = useState("none");
  const [listDataNego, setListDataNego] = useState([]);
  const displayDifHide = { display: displayValue };
  useEffect(() => {
    const dataNegotiation = [];
    for (let i = 0; i < dataNego.length; i++) {
      const listPenawaranCimb = [];
      for (let j = 0; j < dataNego[i].offeringPriceCimbList.length; j++) {
        listPenawaranCimb.push({
          tahun: `Tahun ke - ${j + 1}`,
          price: dataNego[i].offeringPriceCimbList[j],
        });
      }

      const listPenawaranLandLoard = [];
      for (let j = 0; j < dataNego[i].offeringPriceLandlordList.length; j++) {
        listPenawaranLandLoard.push({
          tahun: `Tahun ke - ${j + 1}`,
          price: dataNego[i].offeringPriceLandlordList[j],
        });
      }

      dataNegotiation.push({
        idNegotiation: dataNego[i].idNegotiation,
        flatCost: dataNego[i].flatCost,
        offeringFilesCimb: dataNego[i].offeringFilesCimb,
        offeringFilesLandlord: dataNego[i].offeringFilesLandlord,
        priceCimbDealFlag: dataNego[i].priceCimbDealFlag,
        priceLandlordDealFlag: dataNego[i].priceLandlordDealFlag,
        priceCimbDealFlag: dataNego[i].priceCimbDealFlag,
        priceLandlordDealFlag: dataNego[i].priceLandlordDealFlag,
        submitNegotiationDetailDate: dataNego[i].submitNegotiationDetailDate,
        listPenawaranCimb,
        listPenawaranLandLoard,
      });
      setListDataNego(dataNegotiation);
    }
  }, [dataNego]);
  // SHOW / HIDE HISTORIES
  const jumlahDataToShow = 4;
  function showHideHistory() {
    if (displayValue === "none") {
      setDisplayValue("block");
    } else {
      setDisplayValue("none");
    }
  }

  return (
    <div className={classes.root}>
      {/* SHOW DATA NEGO HISTORIES */}
      {listDataNego
        .map((nego, index) => {
          return (
            <div
              key={index}
              className={classes.container}
              style={
                index < listDataNego.length - jumlahDataToShow
                  ? displayDifHide
                  : null
              }
            >
              <Grid
                container
                justify="space-between"
                alignItems="center"
                style={{ marginBottom: 20 }}
              >
                <Typography
                  style={{ fontSize: 15, fontWeight: 500, color: "#000" }}
                >{`${OrdinalNumber(index + 1)} negotiation`}</Typography>
                <Typography style={{ fontSize: 10, color: "#BCC8E7" }}>
                  {moment
                    .unix(nego.submitNegotiationDetailDate / 1000)
                    .format("DD MMMM YYYY")}
                </Typography>
              </Grid>

              <div
                className={index === 0 ? classes.contentFirst : classes.content}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Typography
                        style={{
                          fontSize: 13,
                          color: "#2B2F3C",
                          marginBottom: 5,
                        }}
                      >
                        Penawaran CIMB :{" "}
                        {nego.priceCimbDealFlag ? (
                          <FlagGreenIcon style={{ height: 15, width: 15 }} />
                        ) : (
                          <FlagIcon style={{ height: 15, width: 15 }} />
                        )}
                      </Typography>

                      <Grid container spacing={2}>
                        {nego.listPenawaranCimb.map((cimb, cimbIndex) => {
                          return (
                            <Fragment key={cimbIndex}>
                              {cimb.tahun && (
                                <Grid item xs={6}>
                                  <Typography
                                    style={{
                                      fontSize: 12,
                                      fontWeight: "normal",
                                      color: "#2B2F3C",
                                    }}
                                  >
                                    {cimb.tahun}
                                  </Typography>
                                </Grid>
                              )}
                              <Grid item xs={6}>
                                <Typography
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "#2B2F3C",
                                  }}
                                >
                                  {cimb.tahun && ":"}{" "}
                                  {idrCurrencyFormat(cimb.price, ".")}
                                </Typography>
                              </Grid>
                            </Fragment>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={6}>
                    <Grid container direction="column" alignItems="flex-start">
                      <Typography
                        style={{
                          fontSize: 13,
                          color: "#2B2F3C",
                          marginBottom: 5,
                        }}
                      >
                        Penawaran Landlord :{" "}
                        {nego.priceLandlordDealFlag ? (
                          <FlagGreenIcon style={{ height: 15, width: 15 }} />
                        ) : (
                          <FlagIcon style={{ height: 15, width: 15 }} />
                        )}
                      </Typography>
                      <Grid container spacing={2}>
                        {nego.listPenawaranLandLoard.map(
                          (landLoard, cimbIndex) => {
                            return (
                              <Fragment key={cimbIndex}>
                                {landLoard.tahun && (
                                  <Grid item xs={6}>
                                    <Typography
                                      style={{
                                        fontSize: 12,
                                        fontWeight: "normal",
                                        color: "#2B2F3C",
                                      }}
                                    >
                                      {landLoard.tahun}
                                    </Typography>
                                  </Grid>
                                )}

                                <Grid item xs={6}>
                                  <Typography
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 500,
                                      color: "#2B2F3C",
                                    }}
                                  >
                                    {landLoard.tahun && ":"}{" "}
                                    {idrCurrencyFormat(landLoard.price, ".")}
                                  </Typography>
                                </Grid>
                              </Fragment>
                            );
                          }
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  style={{ marginTop: 15 }}
                >
                  <Grid item xs={6}>
                    <Grid item style={{ marginTop: 5 }}>
                      <FileIcon />
                    </Grid>
                    <Grid item className={classes.documentLink}>
                      {!nego.offeringFilesCimb ? (
                        <Typography
                          style={{
                            fontSize: 13,
                            color: "#DC241F",
                            fontWeight: 400,
                          }}
                        >
                          N/A
                        </Typography>
                      ) : (
                        <RenderOfferingFile filePath={nego.offeringFilesCimb} />
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={6}>
                    <Grid item style={{ marginTop: 5 }}>
                      <FileIcon />
                    </Grid>
                    <Grid item className={classes.documentLink}>
                      {!nego.offeringFilesLandlord ? (
                        <Typography
                          style={{
                            fontSize: 13,
                            color: "#DC241F",
                            fontWeight: 400,
                          }}
                        >
                          N/A
                        </Typography>
                      ) : (
                        <RenderOfferingFile
                          filePath={nego.offeringFilesLandlord}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          );
        })
        .reverse()}
      {/* SHOW HIDE ACTION */}
      {dataNego.length > jumlahDataToShow && (
        <Grid>
          <Typography
            onClick={() => {
              showHideHistory();
            }}
            style={{
              textAlign: "center",
              cursor: "pointer",
              color: "#DC241F",
              fontSize: 12,
            }}
          >
            Show / Hide Older
          </Typography>
        </Grid>
      )}
    </div>
  );
};

TimelineNego.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataNego: PropTypes.array,
};

TimelineNego.defaultProps = {
  dataNego: [],
};

export default TimelineNego;
