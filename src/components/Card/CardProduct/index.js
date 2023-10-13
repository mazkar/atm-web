/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import theme from '../../../assets/theme/theme';

import LogoRacumin from '../../../assets/images/logo-racumin.png';

const styles = () => ({
  root: {
    width: 164,
    height: 188,
  },
  media: {
    width: 164,
    height: 100,
    padding: 37,
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px'
  },
  price: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '20px',
    lineHeight: '27px',

  }
});

// eslint-disable-next-line import/prefer-default-export
const CardProduct = (props) => {
  const {image, name, price, classes, color} = props;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        component="img"
        image={image}
        style={{
          background: color,
        }}
      />
      <CardContent>
        <Typography className={classes.title} align="center" gutterBottom variant="h6" component="h2" >
          {name}
        </Typography>
        <Typography className={classes.price} align="center" gutterBottom variant="h5" component="h6">
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

CardProduct.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  classes: PropTypes.object.isRequired,
  color: PropTypes.string
};

CardProduct.defaultProps = {
  image: LogoRacumin,
  name: "Racumin",
  price: "Rp. 10.000",
  color: "#E5EDF8"
};

export default withStyles(styles)(CardProduct);
