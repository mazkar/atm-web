/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography  from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Filter from '../../components/GeneralComponent/Filter';
import TitleAndSearch from '../../components/Title/TitleAndSearch';
import FloatingChat from '../../components/GeneralComponent/FloatingChat';

import * as Colors from '../../assets/theme/colors';
import Icon from '../../assets/icons/siab/icon.png';
import bgImage from '../../assets/images/big-maps.png';

const useStyles = makeStyles((theme) => ({
  bgImage: {
    position: "relative",
    zIndex: 1
  },
  amount: {
    margin: '10px 0px 10px 0px',
  },
  item: {
    padding: 0,
    margin: 0,
    maxWidth: 230,
  },
  section: {
    margin: 0,
  },
  sectionCard: {
    marginTop: 20,
    zIndex: 4

  },
  card: {
    maxWidth: 270,
    maxHeight: 220
  },
  cardHeader: {
    margin: 0,
  },
  avatar: {
    backgroundColor: Colors.SecondaryMedium,
  },
  filterSection: {
    padding: "10px 20px 10px 20px",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 6
  },
}));

const provinceSuggestions = [
  { id: 0, value: '- Semua Provinsi -', nameId: '- Semua Provinsi -', nameEn: 'All' },
  { id: 1, value: 'Sumatera', nameId: 'Sumatera', nameEn: 'Sumatera' },
  { id: 2, value: 'Jawa', nameId: 'Jawa', nameEn: 'Jawa' },
  { id: 3, value: 'Kalimantan', nameId: 'Kalimantan', nameEn: 'Kalimantan' },
  { id: 4, value: 'Bali', nameId: 'Bali', nameEn: 'Bali' },
];

const districtsSuggestions = [
  { id: 0, value: '- Semua Kabupaten -', nameId: '- Semua Kabupaten -', nameEn: '- Semua Kabupaten -' },
  { id: 1, value: 'Jakarta Utara', nameId: 'Jakarta Utara', nameEn: 'Jakarta Utara' },
  { id: 2, value: 'Jakarta Selatan', nameId: 'Jakarta Selatan', nameEn: 'Jakarta Selatan' },
  { id: 3, value: 'Jakarta Barat', nameId: 'Jakarta Barat', nameEn: 'Jakarta Barat' },
  { id: 4, value: 'Jakarta Timur', nameId: 'Jakarta Timur', nameEn: 'Jakarta Timur' },
];

const subdistrictsSuggestions = [
  { id: 0, value: '- Semua Kecamatan -', nameId: '- Semua Kecamatan -', nameEn: '- Semua Kecamatan -' },
  { id: 1, value: 'Tangerang Selatan', nameId: 'Tangerang Selatan', nameEn: 'Tangerang Selatan' },
  { id: 2, value: 'Tangerang Selatan', nameId: 'Tangerang Selatan', nameEn: 'Tangerang Selatan' },
  { id: 3, value: 'Tangerang Selatan', nameId: 'Tangerang Selatan', nameEn: 'Tangerang Selatan' },
  { id: 4, value: 'Tangerang Selatan', nameId: 'Tangerang Selatan', nameEn: 'Tangerang Selatan' },
];

const statusSuggestions = [
  { id: 0, value: 'Aktif', nameId: 'Aktif', nameEn: 'Aktif' },
  { id: 1, value: 'Tidak Aktif', nameId: 'Tidak Aktif', nameEn: 'Tidak Aktif' },
];

const Monitoring = () => {
  const classes = useStyles();
  return (
    <div className="content_container">
      <TitleAndSearch title="Monitoring Performance"/>
      <div className="content_container_img">
        <Paper elevation={3} className={classes.filterSection}>
          <Filter
            provinceSuggestions={provinceSuggestions}
            districtsSuggestions={districtsSuggestions}
            subdistrictsSuggestions={subdistrictsSuggestions}
            statusSuggestions={statusSuggestions}
            handleProvinceOnChange={(value) => {
              console.log(value);
            }}
            handleDistrictsOnChange={(value) => {
              console.log(value);
            }}
            handleSubDistrictsOnChange={(value) => {
              console.log(value);
            }}
            handleStatusOnChange={(value) => {
              console.log(value);
            }} />
        </Paper>
        {/* Card 1 */}
        <div className={classes.sectionCard}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar src={Icon} className={classes.avatar} />
              }
              title="Total Issue"
            />
            <CardContent>
              <div className={classes.item}>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                    Out of Balance
                      </Typography>
                    </Grid>
                    <Grid  className={classes.amount} item>
                      <Typography gutterBottom variant="p">
              210
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                    Full Balance
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
              34
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                       Offline
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
                      12
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Card 2 */}
        <div className={classes.sectionCard}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar src={Icon} className={classes.avatar} />
              }
              title="Revenue"
            />
            <CardContent >
              <div className={classes.item}>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                       Top 10 Highest
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
                      210
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                       Top 10 Lowest
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
                      34
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                       Top 10 Most Use
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
                      12
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* card 3 */}
        <div className={classes.sectionCard}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar src={Icon} className={classes.avatar} />
              }
              title="Due Date"
            />
            <CardContent >
              <div className={classes.item}>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                       Top 10 Highest
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
                      210
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                       Top 10 Lowest
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
                      34
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
                <div className={classes.section}>
                  <Grid container alignItems="center">
                    <Grid className={classes.amount} item xs>
                      <Typography gutterBottom variant="p">
                       Top 10 Most Use
                      </Typography>
                    </Grid>
                    <Grid className={classes.amount} item>
                      <Typography gutterBottom variant="p">
                      12
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" light="true" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* <FloatingChat /> */}
      </div>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(mapStateToProps)(withTranslation('translations')(Monitoring))
);
