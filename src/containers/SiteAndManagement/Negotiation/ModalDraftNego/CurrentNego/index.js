/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, } from "@material-ui/core";
import useRupiahConverterSecondary from '../../../../../helpers/useRupiahConverterSecondary';
import { isObejctEmpty } from '../../../../../helpers/useFormatter';

const useStyles = makeStyles({
  text: {
    fontWeight: 400,
    fontSize: 13,
    textAlign: 'justify'
  },
  titleTable: { color: "#FFFFFF", fontWeight: 500, fontSize: 10 },
  textTable: { fontWeight: 400, fontSize: 10 },
  divider: { marginTop: 20 },
  divider10: { marginTop: 10 },
  buttonContainer: {
    marginTop: 36,
  },
  fieldOfferingNumb: {
    width: 90,
  },
  editorContentMsg: {
    border: "1px solid",
    borderColor: "black",
    height: 100,
    paddingLeft: 12,
    paddingRight: 12,
    '& .public-DraftStyleDefault-ltr': {
      textAlign: 'unset'
    }
  },
  wrapperContentMsg: {
    width: "100%",
  },
  inputForm: {
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    height: 34,
  },
});

// eslint-disable-next-line react/prop-types
function CurrentNego({data, dataMinor, dataDraft, negoStep}) {
  const classes = useStyles();
  return (
    <div>
      <div
        style={{
          border: "1px solid #E6EAF3",
          borderRadius: 4,
          position: "relative",
        }}
      >
        <Typography
          style={{
            fontSize: 10,
            color: "#8D98B4",
            fontWeight: 500,
            padding: "4px 10px",
            borderBottomRightRadius: 4,
            background: "#E6EAF3",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          Nego {negoStep}
        </Typography>
        <div
          style={{
            padding: 10,
            fontWeight: 500,
            fontSize: 10,
            marginTop: 20,
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            justify="space-between"
            style={{ marginBottom: 9 }}
          >
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                            Pemilik/PT
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {data.offeringPriceLandlordList.map((price, i) => {
                return (
                  <Typography key={i} className={classes.textTable}>
                    { `th - ${i + 1}`} :  
                    {useRupiahConverterSecondary(price)}
                  </Typography>
                );
              })}
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {dataMinor.securityDeposit === null || dataMinor.securityDeposit === 0
                  ? "-"
                  : useRupiahConverterSecondary(
                    dataMinor.securityDeposit
                  )}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {isObejctEmpty(dataDraft) ? "-" : 
                  dataDraft.electricityType.toLowerCase() === 'include' ? dataDraft.electricityType :
                    (<>
                      {dataMinor.yearlyElectricityCost === null || dataMinor.yearlyElectricityCost === 0
                        ? "-"
                        : useRupiahConverterSecondary(
                          dataMinor.yearlyElectricityCost
                        )}
                    </>)
                }
                            
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {dataMinor.antenaLandCost === null || dataMinor.antenaLandCost === 0
                  ? "-"
                  : useRupiahConverterSecondary(
                    dataMinor.antenaLandCost
                  )}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {dataMinor.yearlySignageCost === null || dataMinor.yearlySignageCost === 0
                  ? "-"
                  : useRupiahConverterSecondary(
                    dataMinor.yearlySignageCost
                  )}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justify="space-between"
          >
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                            PT. CIMB Niaga
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {data.offeringPriceCimbList.map((price, i) => {
                return (
                  <Typography key={i} className={classes.textTable}>
                    { `th - ${i + 1}`} :  
                    {useRupiahConverterSecondary(price)}
                  </Typography>
                );
              })}
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {dataMinor.securityDeposit === null || dataMinor.securityDeposit === 0
                  ? "-"
                  : useRupiahConverterSecondary(
                    dataMinor.securityDeposit
                  )}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {isObejctEmpty(dataDraft) ? "-" : 
                  dataDraft.electricityType.toLowerCase() === 'include' ? dataDraft.electricityType :
                    (<>
                      {dataMinor.yearlyElectricityCost === null || dataMinor.yearlyElectricityCost === 0
                        ? "-"
                        : useRupiahConverterSecondary(
                          dataMinor.yearlyElectricityCost
                        )}
                    </>)
                }
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {dataMinor.antenaLandCost === null || dataMinor.antenaLandCost === 0
                  ? "-"
                  : useRupiahConverterSecondary(
                    dataMinor.antenaLandCost
                  )}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={classes.textTable}>
                {dataMinor.yearlySignageCost === null || dataMinor.yearlySignageCost === 0
                  ? "-"
                  : useRupiahConverterSecondary(
                    dataMinor.yearlySignageCost
                  )}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.divider10} />
    </div>
  );
}

CurrentNego.propTypes = {

};

export default CurrentNego;

