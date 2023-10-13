/* eslint-disable react/forbid-prop-types */
import { Box, Card, Grid, makeStyles, Typography, Button } from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { PrimaryHard, White } from "../../../../../assets/theme/colors";
import { ReactComponent as IconAddTask } from "../../../../../assets/icons/general/plus_red.svg";
import { ReactComponent as IconJarkom } from "../../../../../assets/icons/task/jarkom.svg";
import { ReactComponent as IconAktivasi } from "../../../../../assets/icons/task/aktivasi.svg";
import { ReactComponent as IconBooth } from "../../../../../assets/icons/task/boothWhite.svg";
import { ReactComponent as IconKeamanan } from "../../../../../assets/icons/task/keamanan.svg";
import { ReactComponent as IconKebutuhan } from "../../../../../assets/icons/task/kebutuhan.svg";
import { ReactComponent as IconMesin } from "../../../../../assets/icons/task/mesin.svg";
import { ReactComponent as IconParameter } from "../../../../../assets/icons/task/parameter.svg";
import { ReactComponent as IconSignage } from "../../../../../assets/icons/task/signage.svg";
import CardTaskItem from "./CardTaskItem";

const useStyles = makeStyles({
  cardContainer: {
    maxHeight: 925,
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    padding: 10,
  },
});

const CardTasks = (props) => {
  const { data, addButton, getPostApi, taskType, openingType, title, tipeAtm } = props;
  const classes = useStyles();
  const history = useHistory();
  // GET ID from URI
  const { id } = useParams();

  const handleClickNew=()=>{
    if(taskType=="termination"){
      history.push(
        `/implementation/task/${taskType}/create?implementationId=${id}&openingType=${openingType}&tipeAtm=${tipeAtm}`
      );
    }else{
      history.push(
        `/implementation/task/${taskType}/create?implementationId=${id}&openingType=${openingType}`
      );
    }
  }
  
  function renderIcon(cat){
    switch (cat) {
    case "jarkom":
      return <IconJarkom />;
    case "booth":
      return <IconBooth />;
    case "security":
      return <IconKeamanan />;
    case "need":
      return <IconKebutuhan />;
    case "mesin":
      return <IconMesin />;
    case "parameter":
      return <IconParameter />;
    case "parameter-migrasi":
      return <IconParameter />;
    case "parameter-replace":
      return <IconParameter />;
    case "signage":
      return <IconSignage />;
    case "activation":
      return <IconAktivasi />;
    case "balance":
      return <IconAktivasi />;
    case "termination":
      return <IconAktivasi />;
    default:
      return <IconKebutuhan />;
    }
  }

  return (
    <Card style={{ marginBottom: 20 }}>
      <Box
        style={{
          backgroundColor: PrimaryHard,
          height: 38,
          paddingTop: 10,
          padiingBottom: 10,
        }}
      >
        <Grid container alignItems="center">
          <Grid
            item
            style={{
              marginLeft: 15,
              marginRight: 10,
            }}
          >
            {renderIcon(taskType)}
          </Grid>
          <Typography
            style={{
              fontSize: 16,
              color: White,
              fontFamily: "Barlow",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {title} - {data?.length}
          </Typography>
        </Grid>
      </Box>

      <div className={classes.cardContainer}>
        {data?.sort(function(a, b) {
          return b.id - a.id;
        }).map((item)=>{
          return (
            <CardTaskItem handleDetail={()=>history.push(`/implementation/task/${taskType}/${item.id}?implementationId=${id}&openingType=${openingType}`)} taskType={taskType} data={item} getPostApi={getPostApi}/>
          );
        })}
      </div>

      {addButton ? (
        <Button 
          style={{ 
            margin: 10, 
            fontFamily: "barlow",
            textTransform: "capitalize",
            fontSize: 17,
            color: PrimaryHard,
            fontWeight: 600, }}
            onClick={handleClickNew}
        >
          <IconAddTask style={{ marginRight: 5}} />
          <Typography>
            Buat Task Baru
          </Typography>
        </Button>
      ) : (
        <div style={{ marginTop: 15 }}/>
      )}
    </Card>
  );
};

CardTasks.propTypes = {
  addButton: PropTypes.bool,
  data: PropTypes.array.isRequired,
  getPostApi: PropTypes.func.isRequired,
  taskType: PropTypes.string,
  openingType: PropTypes.string.isRequired,
  title: PropTypes.string,
};

CardTasks.defaultProps = {
  addButton: true,
  taskType: "Kebutuhan",
  title: "Kebutuhan"
};

export default CardTasks;

