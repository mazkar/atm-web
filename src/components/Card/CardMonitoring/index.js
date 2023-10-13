/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import * as Colors from '../../../assets/theme/colors';

import Icon from '../../../assets/icons/siab/icon.png';

const styles = () => ({
  item: {
    maxWidth: 210,
  },
  section: {
    margin: 0,
  },
  sectionCard: {
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    maxWidth: 240,
    maxHeight: 164
  },
  avatar: {
    backgroundColor: Colors.SecondaryMedium,
  },
});

// eslint-disable-next-line import/prefer-default-export
const CardMonitoring = (props) => {
  const classes = styles();
  const {title, name, amount} = props;

  return (
    <div className={classes.sectionCard}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={Icon} className={classes.avatar} />
          }
          title={title}
        />
        <CardContent>
          <div className={classes.item}>
            <div className={classes.section}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="p">
                    {name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="p">
                    {amount}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant="fullWidth" light="true" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

CardMonitoring.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  title: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.number,
  // classes: PropTypes.object.isRequired,
};

CardMonitoring.defaultProps = {
  title: "Total Issue",
  name: "Out of Balance",
  amount: 210

};

export default withStyles(styles)(CardMonitoring);
