import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { PrimaryHard } from "../../../../assets/theme/colors";
import { ReactComponent as LeftArrow } from "../../../../assets/icons/linear-red/arrow-left.svg";
import MuiIconLabelButton from "../../../../components/Button/MuiIconLabelButton";
import CardDetail from "./CardDetail";
import Discussion from "./Discussion";
import { doGetDetailForumDiscuss } from "../../ApiServicesAddOns";
import { useParams } from "react-router-dom";
import LoadingView from "../../../../components/Loading/LoadingView";

const UseStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 36,
    color: "#2B2F3C",
  },
  titleContainer: {
    marginBottom: 25,
  },
});

function DetailForumDiscussion() {
  const classes = UseStyles();
  const history = useHistory();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState({
    title: "",
    coverImage: "",
    description: "",
    category: "",
    subCategory: "",
  });
  const [comments, setComments] = useState([]);

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  useEffect(() => {
    doGetDetailForumDiscuss(loadingHandler, id).then((response) => {
      console.log(response);
      if (response) {
        if (response.responseCode === "200") {
          setDataDetail({
            title: response.title,
            coverImage: response.coverImage,
            description: response.description,
            category: response.category,
            subCategory: response.subCategory,
            countComments: response.countComments,
          });
          setComments(response.comments);
        }
      }
    });
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.titleContainer}
      >
        <Grid item>
          <MuiIconLabelButton
            label="Back"
            iconPosition="startIcon"
            buttonIcon={<LeftArrow />}
            onClick={() => history.push("/add-ons/forum-discussion")}
            style={{ background: "inherit", color: PrimaryHard, padding: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title}>Forum Discussion</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <CardDetail dataDetail={dataDetail} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Discussion
            idForum={id}
            comments={comments}
            jmlComment={dataDetail.countComments}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailForumDiscussion;
