import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import {FormControl,Grid,InputBase,MenuItem,Typography} from '@material-ui/core'
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ReactComponent as DropDownIcon } from "../../../../../assets/icons/general/dropdown_red.svg";
import ChartObject from '../ChartObject';
import { getCountObjectPajak } from '../../../ApiServices';
import LoadingView from '../../../../../components/Loading/LoadingView';


const useStyles = makeStyles({
  select: {
    padding: 10,
    "& .MuiSelect-icon": {
      top: "unset",
      right: 5,
    },
  },
  title:{
    fontSize:18,
    fontWeight:600
  }
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1),
      marginLeft:10
    },
    marginTop:-10,
  },
  input: {
    borderRadius: 8,
    //position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    fontWeight:600,
    padding: "6px 12px 8px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

function generateArrayOfYears() {
  const max = new Date().getFullYear();
  const min = max - 5;
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  // console.log("+++ years", years);
  return years;
}
function ObjectPajak(props) {
    const classes = useStyles()
    const [chartYear,setChartYear]=useState(new Date().getFullYear())
    const arrYears = generateArrayOfYears()
    const [isLoadData,setIsLoadData]=useState(false)
    const [dataChart,setDataChart]= useState({})

    function loadDataHandler(loaderValue){
      setIsLoadData(loaderValue)
    }

    function handleChangeYear(newYear){
        setChartYear(newYear)
    }

    useEffect(()=>{
      if(chartYear){
        getCountObjectPajak(loadDataHandler, chartYear).then((response) => {
          console.log("+++responseChart", response);
          setDataChart(response)
        });
      }
    },[chartYear])
  return (
    <div>
      {isLoadData ? (
      <LoadingView maxheight='100%'/>
      ): (
        <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container direction="row" justifyContent='space-between'spacing={2}>
            <Grid item>
              <Typography className={classes.title}>
                Jumlah Object Pajak
              </Typography>
            </Grid>
            <Grid item>
                {/*<Typography>haiiiyouu</Typography>*/}
                <FormControl className={classes.select}>
                    <Select value={chartYear}input={<BootstrapInput/>} IconComponent={DropDownIcon} onChange={(e)=>handleChangeYear(e.target.value)}>
                    {arrYears.map((item)=>{
                        return(
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        )
                    })}
                    </Select>
                </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
            <ChartObject dataChart={dataChart}/>
        </Grid>
      </Grid>
      )
      }
    </div>
  );
}

ObjectPajak.propTypes = {}

export default ObjectPajak
