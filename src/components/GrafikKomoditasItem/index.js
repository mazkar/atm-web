import React from "react";
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Chart, Line, Axis } from 'bizcharts';
import * as Colors from '../../assets/theme/colors';
import {ReactComponent as UnionIcon} from '../../assets/images/Union.svg';

const styles = ({
  root: {
    display:'flex', 
    alignItems: 'stretch', 
    border: `2px solid ${Colors.GraySoft}`,
    borderRadius: 6,
    width: (props) => props.width,
    margin: (props) => props.marginTrbl,
    height: 80,
    // alignItems: 'center',
  },
});

const data = [
  {month: '1',price: 1500},
  {month: '2',price: 5000},
  {month: '3',price: 5000},
  {month: '4',price: 5200},
  {month: '5',price: 5000},
  {month: '6',price: 5750},
  {month: '7',price: 5300},
  {month: '8',price: 4800},
  {month: '9',price: 5900},
  {month: '10',price: 5100},
  {month: '11',price: 3300},
  {month: '12',price: 5500},
];

const index = (props) => {
  // eslint-disable-next-line react/prop-types
  const { komoditas, hargaSekarang, leftSideBg, icon, dataChart, classes } = props;
  return (
    <div className={classes.root}>
      <div style={{position: 'relative', flexGrow: 1, backgroundColor:leftSideBg, height:'100%', width:40, textAlign:'center'}}>
        <div style={{position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%'}}>
          <img src={icon} alt=""/>
        </div>
      </div>
            
      <div style={{display:'flex', flexGrow: 1, flexWrap:'wrap', flexDirection:'column', padding:5}}>
        <Typography style={{marginLeft:5, fontSize:8, fontWeight:'bold'}}>{komoditas}</Typography>
        <Typography style={{fontSize:10, marginLeft:5}}>Rp.</Typography>
        <div style={{display: 'flex', flexWrap: 'nowrap'}}>
          <Typography style={{fontSize:16, marginLeft:25, fontWeight:'bold'}}>{hargaSekarang}</Typography>
          <Typography style={{fontSize:9, marginLeft:5, position:'relative', top:7}}> /kg</Typography>
        </div>
      </div>
      <div style={{paddingLeft:10, paddingTop:15, paddingBottom:5, flexGrow: 8}}>
        <Chart
          scale={{ price: { min: 1000, max: 6000 } }}
          autoFit
          data={dataChart}
        >
          <Axis
            name="price"
            label={{
              formatter: (val) => (val === '0' ? `Rp. ${val}` : ` Rp. ${val}`),
            }}
          />
          <Axis name="month" visible={false}/>
          <Line
            shape="smooth"
            position="month*price"
            color="#7ABFFF"
            size={4}
          />
        </Chart> 
      </div>
    </div>
  );
};

index.propTypes = {
  komoditas: PropTypes.string,
  hargaSekarang: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object,
  leftSideBg: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  dataChart: PropTypes.object,
};

index.defaultProps  = {
  komoditas: "Nama Komoditas",
  hargaSekarang: "000",
  // eslint-disable-next-line react/default-props-match-prop-types
  width: "430px",
  // eslint-disable-next-line react/default-props-match-prop-types
  leftSideBg: "#FFD15C",
  // eslint-disable-next-line react/default-props-match-prop-types
  marginTrbl: "5px 0px 5px 0px",
  icon: UnionIcon,
  dataChart: data,
};

export default withStyles(styles)(index);