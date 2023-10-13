/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Timeline from "./TimelineNego";
import idrCurrencyFormat from "../../../../../helpers/useRupiahConverterSecondary";

const useStyles = makeStyles({
  root: { padding: 20, borderRadius: 10 },
});

function isEmpty(obj) {
  for (const x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

function NegoHistories(props) {
  const { dataNego, dataInfoGeneral } = props;
  const classes = useStyles();

  const [hargaPenawaran, setHargaPenawaran] = useState([]);
  const [hargaKesepakatan, setHargaKesepakatan] = useState([]);

  useEffect(() => {
    if (dataInfoGeneral.detail !== undefined) {
      const rent = [];
      const deal = [];

      for (
        let j = 0;
        j < dataInfoGeneral.detail.yearlyRentCostList.length;
        j++
      ) {
        rent.push({
          tahun: `Tahun ke - ${j + 1}`,
          price: idrCurrencyFormat(
            dataInfoGeneral.detail.yearlyRentCostList[j]
          ),
        });
      }

      for (
        let j = 0;
        j < dataInfoGeneral.detail.negotiationDealCostList.length;
        j++
      ) {
        deal.push({
          tahun: `Tahun ke - ${j + 1}`,
          price: idrCurrencyFormat(
            dataInfoGeneral.detail.negotiationDealCostList[j]
          ),
        });
      }
      setHargaPenawaran(rent);
      setHargaKesepakatan(deal);
    }
  }, [dataInfoGeneral]);

  return (
    <div className={classes.root}>
      <Typography style={{ fontSize: 24, marginBottom: 10 }}>
        Negotiation
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Typography style={{ fontSize: 15, fontWeight: 500 }}>
            Harga Penawaran :
          </Typography>
          <Typography
            style={{
              fontSize: 15,
              fontWeight: 400,
              fontStyle: "italic",
              marginBottom: 20,
            }}
          >
            Exclude ppn, include pph
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            {hargaPenawaran.map((penawaran, index) => {
              return (
                <Fragment key={index}>
                  <Grid item xs={6}>
                    <Typography
                      style={{
                        fontSize: 12,
                        fontWeight: "normal",
                        color: "#2B2F3C",
                      }}
                    >
                      {penawaran.tahun}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                      {penawaran.tahun && ":"} {penawaran.price}
                    </Typography>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={6}>
          <Typography style={{ fontSize: 15, fontWeight: 500 }}>
            Harga Kesepakatan :
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            {hargaKesepakatan.map((kesepakatan, index) => {
              return (
                <Fragment key={index}>
                  <Grid item xs={6}>
                    <Typography
                      style={{
                        fontSize: 12,
                        fontWeight: "normal",
                        color: "#2B2F3C",
                      }}
                    >
                      {kesepakatan.tahun}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography style={{ fontSize: 15, fontWeight: 500 }}>
                      {kesepakatan.tahun && ":"} {kesepakatan.price}
                    </Typography>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Timeline dataNego={dataNego} />
    </div>
  );
}

NegoHistories.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataNego: PropTypes.array,
  topData: PropTypes.object,
};

NegoHistories.defaultProps = {
  dataNego: [],
  topData: {},
};

export default NegoHistories;
