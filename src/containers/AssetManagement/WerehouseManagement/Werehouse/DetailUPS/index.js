import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ReactComponent as BackIcon } from "../../../../../assets/icons/general/arrow_back_red.svg";
import React, { useState, useEffect } from "react";
import constansts from "../../../../../helpers/constants";
import { useHistory, useParams } from "react-router-dom";
import HistoryList from "../common/HistoryList";
import ChatHistory from "../common/ChatHistory";
import DetailTabUPS from "./DetailTabUPS";
import { doViewDetailUPS } from "../../../ApiServiceAsset";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  backLabel: {
    fontSize: 17,
    color: constansts.color.primaryHard,
    marginLeft: 5,
    textTransform: "capitalize",
  },
  titleContainer: {
    marginBottom: 25,
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  detailTitle: {
    borderBottom: `2px solid ${constansts.color.grayMedium}`,
    paddingBottom: 10,
    fontWeight: 600,
    fontSize: 13,
    color: constansts.color.grayMedium,
    marginBottom: 20,
  },
  historyTitle: {
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: 15,
    color: constansts.color.dark,
    marginBottom: 15,
  },
});

const DetailUPSWerehouse = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [dataTabUPS, setDataTabUPS] = useState({});
  const [historyList, setHistoryList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [requestEdit, setRequestEdit] = useState({
    id: parseInt(id),
    ups: null,
    status: null,
  });

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  useEffect(() => {
    doViewDetailUPS(loadingHandler, id).then((response) => {
      if (response) {
        setDataTabUPS(response);
        setHistoryList(response.history);
        setChatHistory(response.comment);
        setPhotos(response.vendorPhoto);
        setAttachments(response.vendorAttachment);
        setRequestEdit({
          ...requestEdit,
          ups: response.ups,
          status: response.status,
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(requestEdit);
  }, [requestEdit]);

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={() => history.push("/asset-management/inventory")}>
            <BackIcon />
            <Typography className={classes.backLabel}>Back</Typography>
          </Button>
        </Grid>
        <Grid xs={12} item className={classes.titleContainer}>
          <Typography className={classes.title}>Invetory Detail</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: constansts.color.white,
              borderRadius: 10,
              padding: "30px 20px",
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
            }}
          >
            <DetailTabUPS
              data={dataTabUPS}
              photos={photos}
              attachments={attachments}
              requestEdit={requestEdit}
              setRequestEdit={setRequestEdit}
            />
          </Box>
        </Grid>

        {/* History */}
        <Grid item xs={5}>
          <Box
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: constansts.color.white,
              borderRadius: 10,
              padding: "30px 20px",
              boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
            }}
          >
            <Typography className={classes.historyTitle}>History</Typography>
            <HistoryList data={historyList} />
            <Typography className={classes.historyTitle}>
              Chat History
            </Typography>
            <ChatHistory
              data={chatHistory}
              cardTaskId={dataTabUPS.idImplementationMesin}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailUPSWerehouse;
