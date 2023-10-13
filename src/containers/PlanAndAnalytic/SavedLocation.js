/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Paper, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import constants from '../../helpers/constants';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  contentContainer: {
    position: 'relative',
    padding: 15,
    width: 295,
    borderRadius: 10,
    boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
    borderColor: 'grey',
  },

  containerContent: {
    position: 'relative',
    padding: 15,
    width: 320,
    color: 'white',
    maxHeight: '380px', //560,
    overflow: 'auto'

  },
  title: {
    fontWeight: 600,
    fontSize: 13,
  },
  titleText: {
    color: 'black',
    fontWeight: 500,
    fontSize: 15,
  },
  locationText: {
    color: constants.color.primaryHard,
    fontSize: 13,
  },
  trashButton: {
    // backgroundColor: constants.color.primaryHard,
    position: 'absolute',
    top: 0,
    right: 0,
    // borderRadius: 0,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
  },
  seeMore: {
    fontWeight: 600,
    color: constants.color.primaryHard,
    fontSize: 17
  },
});

const TrashIcon = () => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
      stroke="#BCC8E7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

);

const MapsIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="10" fill="#FFE9E9" />
    <path opacity="0.4" d="M11.6667 7.22217L18.3334 9.44439V22.7777L11.6667 20.5555V7.22217Z" fill="#DC241F" />
    <path d="M5 10.1965V22.2222C4.99998 22.313 5.02221 22.4024 5.06475 22.4826C5.10729 22.5628 5.16884 22.6314 5.24401 22.6823C5.31918 22.7332 5.40569 22.7649 5.49596 22.7746C5.58622 22.7844 5.6775 22.7718 5.76181 22.7381L10.5556 20.5555V7.22217L5.69861 9.16661C5.49268 9.24895 5.3161 9.39103 5.1916 9.57456C5.0671 9.7581 5.00037 9.97469 5 10.1965ZM24.2382 7.26245L19.4444 9.44439V22.7777L24.3014 20.835C24.5076 20.7526 24.6844 20.6102 24.8089 20.4263C24.9334 20.2425 25 20.0255 25 19.8034V7.77772C24.9999 7.68699 24.9776 7.59766 24.935 7.51754C24.8924 7.43743 24.8309 7.36896 24.7557 7.31812C24.6805 7.26729 24.5941 7.23563 24.5039 7.22593C24.4137 7.21622 24.3224 7.22876 24.2382 7.26245Z" fill="#DC241F" />
  </svg>

);

// export const SavedLocationItem = (props) => {
//   const { valueLat, valueLong, idx, idItem } = props;

//   const { contentContainer, title, locationText, trashButton } = useStyles();

//   const [isOpenModalLoader, setModalLoader] = useState(false);

//   const getSavedLocation = async () => {
//     try {
//       const data = await Axios({
//         url:
//           'https://dev-micro-siab.app.mylab-siab.com/profilelocationservices/profilelocationservices/v1/getDraft',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//         },
//         data: {
//           "userId": "511"
//         },
//       });
//       console.log("THIS ============> : ", data);
//     } catch (error) {
//       console.log(`Error Fetching Data submit Location : \n ${error}`);
//     }
//   };

//   const deleteDraft = async (idDraft) => {
//     try {
//       setModalLoader(true);
//       const data = await Axios({
//         url:
//           'https://dev-micro-siab.app.mylab-siab.com/profilelocationservices/profilelocationservices/v1/deleteDraft',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//         },
//         data: {
//           id: idDraft
//         },
//       });
//       setModalLoader(false);
//       console.log("DELETE DRAFT : ", data);
//       getSavedLocation();
//     } catch (error) {
//       setModalLoader(false);
//       console.log(`Error Fetching Data submit Location : \n ${error}`);
//     }
//   };

//   // console.log("nilai dri value", valueLat)
//   // console.log("nilai dri idx",idx)
//   return (
//     <>
//       <Paper className={contentContainer}>
//         <IconButton
//           className={trashButton}
//           onClick={() => deleteDraft(idItem)}
//           variant="contained"
//         >
//           <TrashIcon />
//         </IconButton>
//         <Grid container direction="column" spacing={1}>
//           <Grid item>
//             <Grid container justify="space-between" alignItems="center">
//               <Grid item>
//                 <Typography className={title} variant="body1" component="p">
//                   Saved Location - {idx + 1}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item>
//             <Grid container spacing={1} justify="flex-start">
//               <Grid item>
//                 <Typography
//                   variant="body1"
//                   component="p"
//                   style={{ fontSize: 13 }}
//                 >
//                   Lat :
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography
//                   variant="body1"
//                   component="p"
//                   className={locationText}
//                 >
//                   {valueLat}
//                 </Typography>
//               </Grid>

//               <Grid item>
//                 <Typography
//                   variant="body1"
//                   component="p"
//                   style={{ fontSize: 13 }}
//                 >
//                   Long :
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography
//                   variant="body1"
//                   component="p"
//                   className={locationText}
//                 >
//                   {valueLong}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>
//       <ModalLoader isOpen={isOpenModalLoader} />
//     </>
//   );
// };

const SavedLocation = ({data, onDelete, getDraftDetail}) => {
  const { containerContent, titleText, seeMore } = useStyles();

  const newDataATM = data;

  const getRenderedItems = () => {
    if (showMore) {
      return newDataATM;
    }
    return newDataATM.slice(0, 5);
  };

  const { contentContainer, title, locationText, trashButton } = useStyles();

  const trashIconOnClick = (id) => onDelete(id);
  const onClickPaper = (id) => getDraftDetail(id);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <>
      <Paper className={containerContent}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <MapsIcon />
          </Grid>
          <Grid item>
            <Typography className={titleText} variant="body1" component="p">
              Saved Location
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={1}>
          {getRenderedItems().map(({ id, latitude, longitude }, idx) => (
                <Grid key={`${idx}`} item>
                  {/* <SavedLocationItem idx={idx} valueLat={latitude} valueLong={longitude} idItem={id}/> */}
                  {/* {console.log('value nya', value)} */}
                  {/* {console.log('value idx nya', idx)} */}

                  {/* IT STARTS HERE */}
                  <Paper className={contentContainer}>
                    <IconButton
                      className={trashButton}
                      onClick={() => {
                        // trashIconOnClick();
                        // console.log("IS DELETE: ", isDelete);
                        trashIconOnClick(id);
                      }}
                      variant="contained"
                    >
                      <TrashIcon />
                    </IconButton>
                    <Grid container direction="column" spacing={1} onClick={() => onClickPaper(id)}>
                      <Grid item>
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography
                              className={title}
                              variant="body1"
                              component="p"
                            >
                              Saved Location - {idx + 1}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid container spacing={1} justify="flex-start">
                          <Grid item>
                            <Typography
                              variant="body1"
                              component="p"
                              style={{ fontSize: 13 }}
                            >
                              Lat :
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body1"
                              component="p"
                              className={locationText}
                            >
                              {latitude}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              variant="body1"
                              component="p"
                              style={{ fontSize: 13 }}
                            >
                              Long :
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body1"
                              component="p"
                              className={locationText}
                            >
                              {longitude}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                  {/* ENDS HERE */}
                </Grid>
              ))}
          {/* {console.log('nilai array4', Array(4))} */}
        </Grid>
        <Grid container justify="center" style={{ marginTop: 25 }}>
          <IconButton>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={seeMore}
              onClick={()=>{
                handleShowMore();
                console.log("Show More : ", showMore);
              }}
            >
              {showMore ? 'See Less' : 'See More'}
            </Typography>
          </IconButton>
        </Grid>
      </Paper>
    </>
  );
};

SavedLocation.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  getDraftDetail: PropTypes.func.isRequired
}

export default SavedLocation;
