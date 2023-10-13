import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import MinioImageComponent from "../../../../../components/MinioImageComponent";
import MenuPopUp from "../../../../VendorManagement/PartAndServicePricelist/common/MenuPopUp";
import { useHistory } from "react-router-dom";
import PopUpConfirmation from "../../../../../components/PopUpConfirmation";
import { doDeleteForumDiscuss } from "../../../ApiServicesAddOns";
import PopupSuccess from "../../../../../components/PopupSucces";
import ModalLoader from "../../../../../components/ModalLoader";
import { RootContext } from "../../../../../router";

const UseStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "360px",
    "& .MuiAvatar-colorDefault": {
      backgroundColor: "transparent",
      color: "#8D98B4",
      border: 0,
      marginLeft: "5px",
      fontSize: "15px",
      fontWeight: 500,
      fontFamily: "Barlow",
    },
  },
  media: {
    width: "100%",
    maxHeight: "260px",
  },
  title: {
    fontFamily: "Barlow",
    fontSize: "18px",
    fontWeight: 600,
  },
  keterangan: {
    fontFamily: "Barlow",
    fontSize: "12px",
    fontWeight: 500,
    marginTop: "5px",
  },
  col: {
    display: "flex",
    alignItems: "center",
  },
});

function CardForum({ id, foto, title, keterangan, comment }) {
  const classes = UseStyles();
  const history = useHistory();

  const [maxAvatar, setMaxAvatar] = useState(comment.length);
  const [openDeletePopUp, setOpenDeletePop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { userRoleName } = useContext(RootContext);
  const isAdmin = userRoleName?.toLowerCase().includes("admin");

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  const handleOpen = (id) => {
    history.push(`/add-ons/forum-discussion/${id}`);
  };

  const handleOpenDelete = () => {
    setOpenDeletePop(true);
  };

  // edit ------------------------------->>>>>>>>

  const handleEditForum = (id) => {
    history.push(`/add-ons/forum-discussion/edit/${id}`);
  };

  // edit ------------------------------->>>>>>>>

  const deleteChat = (id) => {
    doDeleteForumDiscuss(loadingHandler, id)
      .then((response) => {
        console.log(response);
        if (response) {
          if (response.responseCode === "200") {
            setOpenSuccess(true);
            setTimeout(() => {
              setOpenSuccess(false);
              setOpenDeletePop(false);
              location.reload();
            }, 3000);
          } else {
            setOpenSuccess(false);
          }
        }
      })
      .catch((err) => {
        alert(`Error Delete Data ${err}`);
      });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={() => handleOpen(id)}>
          <MinioImageComponent filePath={foto} className={classes.media} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {keterangan}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <div className={classes.col} style={{ marginBottom: 25 }}>
              <AvatarGroup max={5} style={{ padding: 10 }}>
                {comment.map((item) =>
                  item.userPicture === null ? (
                    <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                  ) : (
                    <Avatar alt="Avatar">
                      <MinioImageComponent
                        filePath={foto}
                        style={{ width: 40, height: 40 }}
                      />
                    </Avatar>
                  )
                )}
              </AvatarGroup>
              {maxAvatar > 5 && (
                <Typography
                  style={{
                    marginLeft: "-20px",
                    color: "#8D98B4",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  lainnya
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item>
            {isAdmin && (
              <MenuPopUp
                deleteHandler={handleOpenDelete}
                editHandler={() => handleEditForum(id)}
              />
            )}
          </Grid>
        </Grid>
      </Card>
      <PopUpConfirmation
        isOpen={openDeletePopUp}
        onSubmit={() => {
          deleteChat(id);
        }}
        onLeave={() => setOpenDeletePop(false)}
        onClose={() => setOpenDeletePop(false)}
        message="Apakah anda yakin hapus data?"
      />
      <PopupSuccess isOpen={openSuccess} message="Success Delete Data" />
      <ModalLoader isOpen={isLoading} />
    </>
  );
}

CardForum.PropTypes = {
  foto: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  keterangan: PropTypes.string.isRequired,
  comment: PropTypes.array,
};

export default CardForum;
