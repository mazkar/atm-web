import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import theme from "../../../assets/theme/theme";

import CornIcon from '../../../assets/icons/whiteIcons/corn.svg';

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: 120,
    height: 60,
    boxShadow: "0px 4px 10px rgba(122, 191, 255, 0.2)",
    borderRadius: "5px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    position: 'relative',
    // width: 40,
    // height: 60,
    // margin: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '8px',
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: '14px',
  }
}));

const CardLegend = (props) => {
  const {image, color, name, total} = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        component="img"
        image={image}
        style={{
          background: color,
        }}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h6" variant="h6">
            {name}
          </Typography>
          <Typography className={classes.subtitle} variant="subtitle1">
            {total}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

CardLegend.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  total: PropTypes.string,
};

CardLegend.defaultProps = {
  image: CornIcon,
  name: "Jagung",
  color: "#FFB931",
  total: "12.019"
};

export default CardLegend;
