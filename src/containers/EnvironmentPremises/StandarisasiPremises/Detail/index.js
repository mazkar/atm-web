import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Typography, Card } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { ReactComponent as TrashIcon } from "../../../../assets/images/trash-2.svg";
import { ReactComponent as EditIcon } from "../../../../assets/images/edit-2.svg";
import AddButton from "../../../../components/Button/AddButton";
import getMinioFile from "../../../../helpers/getMinioFile";
import { ChevronLeftRounded, ChevronRightRounded } from "@material-ui/icons";
import constants from "../../../../helpers/constants";
import Slider from "react-slick";
import { Layout } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import axios from "axios";
import secureStorage from "../../../../helpers/secureStorage";
import LoadingView from "../../../../components/Loading/LoadingView";
import { doGetDetailEnvironmentPremises } from "../../ApiServicesEnvironmentPremises";
const accessToken = secureStorage.getItem("access_token");
import { useHistory } from "react-router-dom";
import EmptyImg from "../../../../assets/images/empty_data.png";
import useRupiahConverter from "../../../../helpers/useRupiahConverter";
import PopUpConfirmation from "../common/PopUpConfirmation";
import PopupSuccesDelete from "../../../../components/PopupSuccessDelete";
import { doDeleteSubCategory } from "../../ApiServicesEnvironmentPremises";
import ModalLoader from "../../../../components/ModalLoader";

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
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    marginTop: 17,
  },
  contentStyle: {
    padding: 30,
    border: 0,
    borderRadius: 10,
    minHeight: 500,
  },
  contentLayout: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    background: "inherit",
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "30%",
  },
  sliderContainer: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    "& .slick-prev:before": {
      color: constants.color.primaryHard,
    },
    "& .slick-next:before": {
      color: constants.color.primaryHard,
    },
    "& .MuiSvgIcon-root": {
      color: "#dc241f",
      backgroundColor: "#00000024",
      borderRadius: 12,
    },
  },
  subTitle: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 32,
    color: "#2B2F3C",
  },
  currencyStyle: {
    marginTop: 10,
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 24,
    color: "#dc241f",
  },
  descriptionStyle: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 15,
    marginTop: 20,
  },
  footerStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    background: "inherit",
  },
  disableButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#BCC8E7",
    padding: 10,
    border: "1px solid #BCC8E7",
    background: "#ffffff",
    width: 40,
    height: 40,
    fontSize: 24,
    borderRadius: 8,
    boxShadow: "0px 6px 6px rgba(188, 200, 231, 0.2)",
  },
  activeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#dc241f",
    padding: 10,
    border: "1px solid #dc241f",
    background: "#ffffff",
    width: 40,
    height: 40,
    fontSize: 24,
    borderRadius: 8,
    boxShadow: "0px 6px 6px rgba(220, 36, 31, 0.1)",
    cursor: "pointer",
  },
  paginationText: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 24,
  },
  disableButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#BCC8E7",
    padding: 10,
    border: "1px solid #BCC8E7",
    background: "#ffffff",
    width: 40,
    height: 40,
    fontSize: 24,
    borderRadius: 8,
    boxShadow: "0px 6px 6px rgba(188, 200, 231, 0.2)",
  },
  imageEmpty: {
    height: 440,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

const settingsSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const SliderImage = (props) => {
  const { filePath } = props;
  const [renderImage, setRenderImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      await getMinioFile(filePath)
        .then((res) => {
          setRenderImage(res);
        })
        .catch((err) => {
          console.log(">>>>>>>>>> error from minionFile", err);
        });
    };
    fetchImage();
  }, []);

  return (
    <>
      {renderImage && (
        <img
          style={{ width: "100%", border: 0, borderRadius: 12 }}
          src={renderImage.fileUrl}
          alt=""
        />
      )}
    </>
  );
};

function DetailPremises() {
  const classes = UseStyles();
  const { id } = useParams();
  const history = useHistory();

  //DUMMY DATA
  const [data, setData] = useState({});
  const [emptyData, setEmptyData] = useState(false);
  const [indexData, setIndexData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(parseInt(id));
  const [footerCategory, setFooterCategory] = useState("Empty");
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(undefined);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  //END DUMMY DATA

  const loadingHandler = (loadValue) => {
    setIsLoading(loadValue);
  };

  const nextButton = () => {
    setCurrentId(currentId + 1);
    history.push(
      `/environment-premises/premises-standarisasi/${currentId + 1}`
    );
  };
  const backButton = () => {
    setCurrentId(currentId - 1);
    history.push(
      `/environment-premises/premises-standarisasi/${currentId - 1}`
    );
  };

  const handleEdit = () => {
    history.push(
      `/environment-premises/premises-standarisasi/edit-subCategory/${currentId}`
    );
  };

  // FUNTION HANDLE OPEN CONFIRM DELETE
  function handleDeleteAction(indx) {
    setSelectedSubCategory(indx);
    setIsOpenDeletePopup(true);
  }

  function handleLeave() {
    setIsOpenDeletePopup(false);
  }

  function handleDeleteSubCategory() {
    doDeleteSubCategory((bool) => setIsLoaderOpen(bool), {
      id: selectedSubCategory,
    })
      .then((response) => {
        // console.log("+++ response", response);
        if (response.data?.responseCode === "200") {
          setIsOpenDeletePopup(false);
          setIsSuccessDelete(true);
        }
      })
      .catch((err) => {
        alert(`Terjadi Kesalahan:${err}`);
      });
  }

  const handleRefresh = () => location.reload();

  useEffect(() => {
    doGetDetailEnvironmentPremises(loadingHandler, currentId)
      .then((response) => {
        if (response) {
          if (response.data.responseCode === "200") {
            const { data } = response;
            setData(data);
            setEmptyData(false);
            setFooterCategory(data.subCategoryName);
          } else {
            setEmptyData(true);
            setFooterCategory("Empty");
          }
        }
      })
      .catch((err) => {
        alert(`Fetching Data Error ${err}`);
      });
    console.log(currentId);
  }, [id, currentId]);

  useEffect(() => {
    setCurrentId(parseInt(id));
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.titleContainer}
        direction="row"
        justifyContent="space-between"
        alignItems="space-end"
      >
        <Grid item>
          <Typography className={classes.title}>Detail Premises</Typography>
        </Grid>
        <Grid item className={classes.buttonGroup}>
          <AddButton
            buttonIcon={<TrashIcon />}
            label="Delete"
            iconPosition="endIcon"
            style={{
              background: "#ffffff",
              color: "#dc241f",
              border: "1px solid #dc241f",
              padding: 10,
            }}
            onClick={() => handleDeleteAction(currentId)}
          />
          <AddButton
            buttonIcon={<EditIcon />}
            label="Edit"
            iconPosition="endIcon"
            style={{
              padding: 10,
            }}
            onClick={handleEdit}
          />
        </Grid>
      </Grid>
      <Content style={{ marginTop: 40 }}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <Card className={classes.contentStyle} variant="outlined">
            {emptyData ? (
              <div className={classes.imageEmpty}>
                <img src={EmptyImg} style={{ opacity: 0.5 }} />
              </div>
            ) : (
              <Layout className={classes.contentLayout}>
                {/* slider image start */}
                {data.images && (
                  <Content className={classes.imageSection}>
                    <div className={classes.sliderContainer}>
                      <Slider {...settingsSlider} style={{ borderRadius: 12 }}>
                        {data.images.map((item) => {
                          return <SliderImage filePath={item} />;
                        })}
                      </Slider>
                    </div>
                  </Content>
                )}
                {/* slider image end */}
                {/* detail content start */}
                <Content style={{ width: "70%" }}>
                  <Typography className={classes.subTitle}>
                    {data.subCategoryName}
                  </Typography>
                  <Typography className={classes.currencyStyle}>
                    {useRupiahConverter(data.price)}
                  </Typography>
                  <Typography className={classes.descriptionStyle}>
                    {data.description}
                  </Typography>
                </Content>
                {/* detail content end */}
              </Layout>
            )}
          </Card>
        )}
      </Content>
      {/* start Footer */}
      <Footer className={classes.footerStyle}>
        {currentId < 2 ? (
          <Grid item className={classes.disableButton}>
            <ChevronLeftRounded />
          </Grid>
        ) : (
          <Grid item className={classes.activeButton} onClick={backButton}>
            <ChevronLeftRounded />
          </Grid>
        )}
        <Typography className={classes.paginationText}>
          {footerCategory}
        </Typography>
        {indexData == data.length - 1 ? (
          <Grid item className={classes.disableButton}>
            <ChevronRightRounded />
          </Grid>
        ) : (
          <Grid item className={classes.activeButton} onClick={nextButton}>
            <ChevronRightRounded />
          </Grid>
        )}
      </Footer>
      {/* end footer */}

      <PopUpConfirmation
        isOpen={isOpenDeletePopup}
        message="Anda yakin akan menghapus ?"
        onLeave={handleLeave}
        onSubmit={() => handleDeleteSubCategory()}
      />
      <PopupSuccesDelete
        isOpen={isSuccessDelete}
        onClose={() => {
          setIsSuccessDelete(false);
          handleRefresh();
        }}
        message="Hapus Berhasil Dilakukan"
      />
      <ModalLoader isOpen={isLoaderOpen} />
    </div>
  );
}

export default DetailPremises;
