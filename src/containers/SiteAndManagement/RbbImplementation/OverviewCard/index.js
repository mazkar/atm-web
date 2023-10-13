import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import StarIcon from "../../../../assets/icons/siab/star.png";
import LoadingView from "../../../../components/Loading/LoadingView";
import { ReactComponent as UpIcon } from "../../../../assets/icons/siab/upicon.svg";

const styles = () => ({
  root: {
    display: "flex",
    "& .MuiPaper-rounded": {
      borderRadius: "10px",
    },
  },
  paper: {
    width: "277px",
    height: "120px",
    margin: "auto",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
  },
  leftSide: {
    width: "87px",
    height: "120px",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    padding: "40px 20px",
    textAlign: "center",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "18px",
    color: "#ffffff",
  },
});

const index = (props) => {
  const {
    color,
    imgIcon,
    imgStyle,
    title,
    target,
    actual,
    classes,
    isLoadData,
  } = props;

  return (
    <div className={classes.root}>
      {isLoadData ? (
        <LoadingView maxheight="100%" />
      ) : (
        <Grid container component={Paper} className={classes.paper}>
          <Grid item xs={1}>
            <div
              className={classes.leftSide}
              style={{ backgroundImage: color }}
            >
              <img src={imgIcon} style={imgStyle} />
            </div>
          </Grid>
          <Grid item xs={11}>
            <Grid
              container
              justify="flex-start"
              // style={{ background: '#4287f5' }}
            >
              <Grid
                item
                xs={12}
                // style={{ background: '#46faf7' }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "18px",
                      top: "10px",
                      left: "70px",
                      position: "relative",
                    }}
                  >
                    {title}
                  </p>
                  {actual !== undefined ? (
                    <p
                      style={{
                        fontSize: "30px",
                        left: "65%",
                        position: "relative",
                      }}
                    >
                      {actual}
                    </p>
                  ) : (
                    <div />
                  )}
                </div>
                <div>
                  {target !== undefined ? (
                    <Grid item>
                      <UpIcon
                        style={{
                          bottom: "30px",
                          left: "65%",
                          position: "relative",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "15px",
                          bottom: "60px",
                          left: "80%",
                          position: "relative",
                          color: "#65D170",
                        }}
                      >
                        {target}
                      </p>
                    </Grid>
                  ) : (
                    <div />
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // imgIcon: PropTypes.object,
  title: PropTypes.string,
  // target: PropTypes.string,
  // actual: PropTypes.string,
};

export default withStyles(styles)(index);
