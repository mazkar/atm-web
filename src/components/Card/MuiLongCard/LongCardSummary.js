/* eslint-disable func-names */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tachometer from '../../../assets/images/SideMenu/tachometer.svg';

const styles = () => ({
    root:{
        '& .MuiPaper-rounded':{
            borderRadius: '10px',
        }
    },
    leftSide: {
        width: '160px',
        height: '140px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        padding: '27px 20px',
        textAlign:'center'
    },
    title: {
        fontFamily: 'NunitoRegular',
        fontWeight: '600',
        fontSize: '20px',
        color: '#ffffff',
        textShadow: '0px 4px 10px rgba(16, 33, 49, 0.1)',
    },
    rootSumcol:{
        display:'flex', 
        flexWrap:'wrap',
        flexGrow:2,
        flexDirection:'column',
        paddingLeft:10,
    },
    sellSum:{
        display:'flex', 
        flexWrap:'wrap',
        flexGrow:3, 
        justifyContent:'space-between',
    },
    col: {
        display:'flex', 
        flexWrap:'wrap', 
    },
});
const index = (props) => {
    const { 
        color, 
        imgIcon, 
        imgStyle, 
        title, 
        summaryOptions, 
        classes } = props;
    return (
        <div className={classes.root}>      
            <Grid container component={Paper} >
                <Grid item xs={2}>
                    <div
                        className={classes.leftSide}
                        style={{
                            backgroundImage: color,
                        }}
                    >
                        <img src={imgIcon} style={imgStyle} />
                        <div className={classes.title}>{title}</div>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2} justify="space-between" alignItems="center" alignContent='center'>
                        
                        {summaryOptions.map(function(summary, i){
                            return (
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center'}}>
                                        <p style={{fontSize:'15px', top:'25px', position:'relative'}}>{summary.status}</p>
                                        <p style={{fontSize:'36px', top:'15px', position:'relative'}}>{summary.count}</p>
                                    </div>
                                </Grid>
                                
                                );
                        })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </div>
            
            
        
    );
};

index.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    imgIcon: PropTypes.object,
};

index.defaultProps = {
    imgIcon: Tachometer,
};

export default withStyles(styles)(index);
