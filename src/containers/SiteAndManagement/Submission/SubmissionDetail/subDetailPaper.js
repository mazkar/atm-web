/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Grid, Paper, Typography, Table, TableRow, TableCell, Avatar, Button, Link } from '@material-ui/core';
import { Divider } from 'antd';
import constants from '../../../../helpers/constants';
import { ReactComponent as PaperClip } from '../../../../assets/icons/siab/paperclip-gray.svg';
import getInitial from '../../../../helpers/initialName';
import getMinioFile from '../../../../helpers/getMinioFromUrl';

const useStyles = makeStyles({
  paperDetail: { padding: 20, marginBottom: 0, height: '100%'},
  rows: { border: 'none'},
  cell: {borderBottom: 'unset', fontSize: 12},
  cellTotal: {
    borderBottom: 'unset', 
    position: 'relative', 
    fontSize: 13,
    fontWeight: 500
  },
  replace: {
    backgroundColor: constants.color.primaryHard,
    color: 'white',
    borderRadius: 6,
    textTransform: 'capitalize',
  },
  documentLink: {
    marginTop: 15,
    backgroundColor: 'unset', 
    padding: 0,
    '& .MuiButton-root':{padding: 0, textTransform: 'none' ,backgroundColor: 'unset'},
    '& .MuiButton-root:hover':{opacity: 0.6,backgroundColor: 'unset'},
  },
  btnContainer: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100%',
    marginTop: 40
  },
});

const approvalStyles = makeStyles({
  root: {
    display:'flex', 
    flexWrap:'wrap', 
    padding: '15px 0px',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    display: 'flex',
    '& > *': {
      margin: 5,
    },
    fontSize: 18,
  }
});
  
// ====> Start Component Approval Footer
const ApprovalBy = (props) => {
  const classes = approvalStyles();
  // init Props
  const {name, initial} = props;
  function renderBackColor(initialName){
    if(initialName === 'DH'){
      return '#88ADFF';
    }
    if (initialName === 'TS'){
      return '#FFB443';
    }
    if (initialName === 'BA'){
      return '#65D170';
    }
    if (initialName === 'GT'){
      return '#FF6A6A';
    }
    if (initialName === 'HM'){
      return '#E8A7FF';
    } 
    return '#88ADFF';
  }
  return(
    <div className={classes.root}>
      <Avatar style={{backgroundColor: renderBackColor(initial)}} className={classes.avatar}>{initial}</Avatar>
      <div style={{marginLeft: 12, display:'flex', flexWrap:'wrap', flexDirection:'column'}} >
        {/* <Typography style={{fontSize:12, fontWeight:'bold'}}>{name}</Typography> */}
        {/* <Typography style={{fontSize:12, fontStyle: 'italic'}}>{jobTitle}</Typography> */}
      </div>
    </div>
  );
};
  
ApprovalBy.propTypes = {
//   name: PropTypes.string,
  initial: PropTypes.string,
};
  
ApprovalBy.defaultProps  = {
//   name: 'Person',
  initial: 'N',
};

const RenderOfferingFile=({filePath})=>{
  const [dataOffering,setDataOffering] = useState(null);
  function limitString(string, count){
    const result = string.slice(0, count) + (string.length > count ? "..." : "");
    return result;
  }
  // console.log(`FilePath ... ${filePath}`);
  useEffect(()=>{
    try{
      getMinioFile(filePath).then(result=>{
      // console.log(">>>> Offering File ",JSON.stringify(result));
        setDataOffering(result);
      });
    }catch(err){
      console.log(">>>> Error try getMinio", err);
    }
  },[filePath]);
  
  return(
    <Link href={dataOffering === null ? '#' : dataOffering.fileUrl} target="_blank" style={{textDecoration: 'none',fontSize: 13, color: '#DC241F', fontWeight: 400}}>
      {dataOffering === null ? 'N/A': limitString(dataOffering.fileName, 25)}
    </Link>
  );
};
RenderOfferingFile.propTypes={
  filePath: PropTypes.string.isRequired,
};

function isEmpty(obj) {
  for (const x in obj) { if (obj.hasOwnProperty(x))  return false; }
  return true;
}

const dataDetailDummy = {
  "biayaSewa": "Rp. 31.500.000",
  "biayaListrik": "Rp. 200.000",
  "telepon": "Rp. 300.000",
  "serviceCharge": "Rp. 100.000",
  "totalSewa": "Rp. 34.500.000",
  "file": "Document-SPAPM.docx",
  "name": ["DH", "TS", "BA", "GT", "HM"],
};

const SubDetailPaper = (props) => {
  const { dataDetail, isReplace } = props;
  const classes = useStyles();

  // console.log("DATA DETAIL", dataDetail);

  function handlerDownloadDoc(){
    alert(`=== Url file ${dataDetail.offeringFilesCimb} = ${dataDetail.offeringFilesCimb}`);
  }

  const handleReplace = () => {
    alert('Page Not Ready Yet!');
  };

  const { biayaSewa } = dataDetail

  return(
    <Paper className={classes.paperDetail}>
      <Typography variant="h5" component="h5" style={{marginBottom: 20, fontSize: 24, fontWeight: 500}}>Detail</Typography>

      <Table size="small">
        <TableRow className={classes.rows}>
          <TableCell  className={classes.cell}>
            <Typography variant="h6" component="h6" style={{fontSize: 15, fontWeight: 500}}>Biaya Sewa</Typography>
          </TableCell>
        </TableRow>
        {
          Array.isArray(biayaSewa) ? (
            biayaSewa.map((val,i)=>{
              return(
                <TableRow className={classes.rows} key={i}>
                  <TableCell  className={classes.cell}>Tahun ke-{i+1}</TableCell>
                  <TableCell className={classes.cell}>: {val}</TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow className={classes.rows}>
              <TableCell  className={classes.cell}>Biaya Sewa</TableCell>
              <TableCell className={classes.cell}>: {biayaSewa}</TableCell>
            </TableRow>
          )
        }
        <TableRow className={classes.rows}>
          <TableCell className={classes.cellTotal}>Total Sewa</TableCell>
          <TableCell className={classes.cell} style={{fontWeight: 500, fontSize: 13}}>: {dataDetail.totalSewa}</TableCell>
        </TableRow>
        <TableRow className={classes.rows}>
          <TableCell  className={classes.cell} colSpan={2}>
            <Divider style={{margin: 0}}/>
          </TableCell>
        </TableRow>
        <TableRow className={classes.rows}>
          <TableCell  className={classes.cell}>
            <Typography variant="h6" component="h6" style={{fontSize: 15, fontWeight: 500}}>Biaya Lain-lain</Typography>
          </TableCell>
        </TableRow>
        <TableRow className={classes.rows}>
          <TableCell className={classes.cell}>Biaya Listrik</TableCell>
          <TableCell className={classes.cell}>: {dataDetail.biayaListrik}</TableCell>
        </TableRow>
        <TableRow className={classes.rows}>
          <TableCell className={classes.cell}>Telepon</TableCell>
          <TableCell className={classes.cell}>: {dataDetail.telepon}</TableCell>
        </TableRow>
        <TableRow className={classes.rows}>
          <TableCell className={classes.cell}>Service Charge</TableCell>
          <TableCell className={classes.cell}>: {dataDetail.serviceCharge}</TableCell>
        </TableRow>
        <TableRow className={classes.rows}>
          <TableCell  className={classes.cell} colSpan={2}>
            <Divider style={{margin: 0}}/>
          </TableCell>
        </TableRow>
      </Table>

      <Grid container spacing={1}>
        <Grid item style={{marginTop:20}}><PaperClip/></Grid>
        <Grid item>
          <div className={classes.documentLink} >
            {/* <Button onClick={() => handlerDownloadDoc()}>
              <Typography  style={{color: '#DC241F', fontSize: 14}}>
                {dataDetail.offeringFilesCimb === null? 
                  <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography>
                  :
                  <div>
                    <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>{dataDetail.offeringFilesCimb}</Typography>
                    <RenderOfferingFile filePath={dataDetail.offeringFilesCimb}/>
                  </div>
                }
              </Typography>
            </Button> */}
            {/* {isEmpty(dataDetail) ? <Typography  style={{color: '#DC241F', fontSize: 14}}>N/A</Typography> 
              : dataDetail.fileDocument === null ? <Typography  style={{color: '#DC241F', fontSize: 14}}>N/A</Typography> :
                <RenderOfferingFile filePath={dataDetail.fileDocument} />} */}
            {dataDetail.fileDocument === null? 
              <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography>
              : dataDetail.fileDocument === undefined ? 
                <Typography style={{fontSize: 13, color: '#DC241F', fontWeight: 400}}>N/A</Typography> :
                <RenderOfferingFile filePath={dataDetail.fileDocument} />}
          </div>
        </Grid>
      </Grid>

      <Typography style={{fontSize: 15, fontWeight: 600, marginTop: 15}}>Approved By</Typography>
      {dataDetail.name === undefined || dataDetail.name === null ? 'N/A':
        <Grid container direction="row">
          {dataDetail.name.map((item) => {
            return(
              <div>
                {item === null ?  
                  <Grid item>
                    <ApprovalBy initial='N/A' />
                  </Grid>
                  :
                  <Grid item><ApprovalBy initial={getInitial(item)}/></Grid>}
              </div>
            );
          })}
        </Grid>
      }
      
      <div className={classes.btnContainer}>
        {isReplace &&  <Button variant="contained" className={classes.replace} onClick={handleReplace}>Replace</Button> }
      </div>
      
    </Paper>

  );
};

SubDetailPaper.propTypes = {
  dataDetail: PropTypes.object,
  isReplace: PropTypes.bool,
};

SubDetailPaper.defaultProps = {
  dataDetail: dataDetailDummy,
  isReplace: false,
};

export default SubDetailPaper;