import React, { useEffect, useState, useContext, createContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Card } from "@material-ui/core";
import trashIcon from "../../../../assets/images/trash-2.svg";
import EmptyImg from "../../../../assets/images/empty_data.png";
import editIcon from "../../../../assets/images/edit-2.svg";
import AddButton from "../../../../components/Button/AddButton";
import { Layout } from "antd";
import { ChevronRightRounded, ChevronLeftRounded } from "@material-ui/icons";
import getMinioFile from "../../../../helpers/getMinioFile";
import Slider from "react-slick";
import constants from "../../../../helpers/constants";
import axios from "axios";
import LoadingView from "../../../../components/Loading/LoadingView";
import { useHistory } from "react-router-dom";
import PopUpConfirmation from "../../../../components/PopUpConfirmation";
import { useParams } from "react-router-dom";
import RenderImageSlider from "../../../../helpers/RenderImageSlider";

const useStyle = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    background: "inherit",
  },
  headerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    background: "inherit",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    marginTop: 17,
  },
  titleStyle: {
    fontFamily: "Barlow",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 36,
    color: "#2b2f3c",
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
  loaderWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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

const StandarisasiMediaPromosi = () => {
  const { id } = useParams();
  const splitId = id.split("-");
  const classess = useStyle();
  const [indexData, setIndexData] = useState(null);
  const [dataAPI, setDataAPI] = useState(null);
  const [dataPerIndex, setDataPerIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterImageState, setFilterImageState] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [renderPage, setRenderPage] = useState(false);
  const history = useHistory();
  // const [dataAPI, setDataAPI] = useState([
  //   {
  //     title: "Sub Standarisasi A.1",
  //     price: 13000000,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere nec suspendisse quam sit gravida. Nulla convallis faucibus diam dolor iaculis blandit. Ornare at nec amet, ipsum velit ipsum volutpat. Justo, sollicitudin ac massa eget. Sem cras id hendrerit congue vitae sit at commodo, libero. Donec curabitur diam sit id donec sapien urna, lacus, fermentum. Pharetra velit commodo nisi tellus auctor molestie sagittis justo. Imperdiet egestas iaculis egestas aliquam. Aliquet ut diam turpis ut proin fermentum sapien accumsan purus. Magna nulla vel orci quam sem egestas at suspendisse tempus. Donec viverra tellus eros ullamcorper porttitor odio eu. Convallis massa morbi nullam ut. Enim nulla adipiscing dignissim enim ornare risus ac velit. Varius volutpat ac semper faucibus sit amet libero morbi. Fames blandit praesent scelerisque donec dui placerat id nisi. Nibh sapien tortor a quam cras commodo nulla enim elit. Libero purus lorem integer dignissim quam congue. Ut hendrerit in nec vitae integer nisl, etiam lorem. Cursus volutpat eros, ut fringilla quisque tortor arcu id. Diam, in at sed risus pellentesque ut interdum nunc id. Vel faucibus eu rhoncus morbi volutpat.",
  //     image: [
  //       "https://hddesktopwallpapers.in/wp-content/uploads/2015/06/landscape-pictures.jpg",
  //       "https://th.bing.com/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
  //       "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?pid=ImgDet&rs=1",
  //       "https://th.bing.com/th/id/OIP.zsEgRepQ6Uh5OYkkhJyn2gHaE5?pid=ImgDet&rs=1",
  //     ],
  //   },
  //   {
  //     title: "Sub Standarisasi A.2",
  //     price: 13000000,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere nec suspendisse quam sit gravida. Nulla convallis faucibus diam dolor iaculis blandit. Ornare at nec amet, ipsum velit ipsum volutpat. Justo, sollicitudin ac massa eget. Sem cras id hendrerit congue vitae sit at commodo, libero. Donec curabitur diam sit id donec sapien urna, lacus, fermentum. Pharetra velit commodo nisi tellus auctor molestie sagittis justo. Imperdiet egestas iaculis egestas aliquam. Aliquet ut diam turpis ut proin fermentum sapien accumsan purus. Magna nulla vel orci quam sem egestas at suspendisse tempus. Donec viverra tellus eros ullamcorper porttitor odio eu. Convallis massa morbi nullam ut. Enim nulla adipiscing dignissim enim ornare risus ac velit. Varius volutpat ac semper faucibus sit amet libero morbi. Fames blandit praesent scelerisque donec dui placerat id nisi. Nibh sapien tortor a quam cras commodo nulla enim elit. Libero purus lorem integer dignissim quam congue. Ut hendrerit in nec vitae integer nisl, etiam lorem. Cursus volutpat eros, ut fringilla quisque tortor arcu id. Diam, in at sed risus pellentesque ut interdum nunc id. Vel faucibus eu rhoncus morbi volutpat.",
  //     image: [
  //       "https://th.bing.com/th/id/OIP.zsEgRepQ6Uh5OYkkhJyn2gHaE5?pid=ImgDet&rs=1",
  //       "https://hddesktopwallpapers.in/wp-content/uploads/2015/06/landscape-pictures.jpg",
  //       "https://th.bing.com/th/id/OIP.9odqTO7q2qwzItvYWVEi0QHaF7?pid=ImgDet&rs=1",
  //       "https://th.bing.com/th/id/OIP.Ix6XjMbuCvoq3EQNgJoyEQHaFj?pid=ImgDet&rs=1",
  //     ],
  //   },
  //   {
  //     title: "Sub Standarisasi A.3",
  //     price: 13000000,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere nec suspendisse quam sit gravida. Nulla convallis faucibus diam dolor iaculis blandit. Ornare at nec amet, ipsum velit ipsum volutpat. Justo, sollicitudin ac massa eget. Sem cras id hendrerit congue vitae sit at commodo, libero. Donec curabitur diam sit id donec sapien urna, lacus, fermentum. Pharetra velit commodo nisi tellus auctor molestie sagittis justo. Imperdiet egestas iaculis egestas aliquam. Aliquet ut diam turpis ut proin fermentum sapien accumsan purus. Magna nulla vel orci quam sem egestas at suspendisse tempus. Donec viverra tellus eros ullamcorper porttitor odio eu. Convallis massa morbi nullam ut. Enim nulla adipiscing dignissim enim ornare risus ac velit. Varius volutpat ac semper faucibus sit amet libero morbi. Fames blandit praesent scelerisque donec dui placerat id nisi. Nibh sapien tortor a quam cras commodo nulla enim elit. Libero purus lorem integer dignissim quam congue. Ut hendrerit in nec vitae integer nisl, etiam lorem. Cursus volutpat eros, ut fringilla quisque tortor arcu id. Diam, in at sed risus pellentesque ut interdum nunc id. Vel faucibus eu rhoncus morbi volutpat.",
  //     image: [],
  //   },
  //   {
  //     title: "Sub Standarisasi A.4",
  //     price: 13000000,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere nec suspendisse quam sit gravida. Nulla convallis faucibus diam dolor iaculis blandit. Ornare at nec amet, ipsum velit ipsum volutpat. Justo, sollicitudin ac massa eget. Sem cras id hendrerit congue vitae sit at commodo, libero. Donec curabitur diam sit id donec sapien urna, lacus, fermentum. Pharetra velit commodo nisi tellus auctor molestie sagittis justo. Imperdiet egestas iaculis egestas aliquam. Aliquet ut diam turpis ut proin fermentum sapien accumsan purus. Magna nulla vel orci quam sem egestas at suspendisse tempus. Donec viverra tellus eros ullamcorper porttitor odio eu. Convallis massa morbi nullam ut. Enim nulla adipiscing dignissim enim ornare risus ac velit. Varius volutpat ac semper faucibus sit amet libero morbi. Fames blandit praesent scelerisque donec dui placerat id nisi. Nibh sapien tortor a quam cras commodo nulla enim elit. Libero purus lorem integer dignissim quam congue. Ut hendrerit in nec vitae integer nisl, etiam lorem. Cursus volutpat eros, ut fringilla quisque tortor arcu id. Diam, in at sed risus pellentesque ut interdum nunc id. Vel faucibus eu rhoncus morbi volutpat.",
  //   },
  // ]);

  const currencyFormat = (money) => {
    const reverse = money.toString().split("").reverse().join("");
    const ribuan = reverse.match(/\d{1,3}/g);
    return `Rp ${ribuan.join(".").split("").reverse().join("")}`;
  };

  const fetchData = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_MONITORING}/getSubCategoryMediaPromosi?id=${splitId[0]}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        const { data } = res.data;
        const findId = data.find((x) => {
          return x.id == splitId[1];
        });
        setDataAPI(data);
        setIsLoading(false);
        console.log(data);

        if (findId) setIndexData(data.indexOf(findId));
        else {
          setIndexData(0);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert(`error while Fetching Data\n${err}`);
      });
  };

  useEffect(() => {
    fetchData();
  }, [renderPage]);

  const nextButton = () => {
    setIndexData(indexData + 1);
    setIsLoading(true);
    const subCategoryId = dataAPI[indexData + 1].id;
    history.push(
      `/media-promosi/standarisasi-media-promosi/${splitId[0]}-${subCategoryId}`
    );
    setRenderPage(!renderPage);
  };
  const backButton = () => {
    setIndexData(indexData - 1);
    setIsLoading(true);
    const subCategoryId = dataAPI[indexData - 1].id;
    history.push(
      `/media-promosi/standarisasi-media-promosi/${splitId[0]}-${subCategoryId}`
    );
    setRenderPage(!renderPage);
  };

  const editButton = () => {
    history.push(
      `/media-promosi/standarisasi-media-promosi/add-sub-category/${splitId[0]}-${splitId[1]}`
    );
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setOpenConfirmation(false);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_MONITORING}/removeSubCategoryMediaPromosi`,
      data: {
        id: splitId[1],
      },
    })
      .then((res) => {
        history.push(`/media-promosi/standarisasi-media-promosi/`);
        setIndexData(0);
        setRenderPage(!renderPage);
      })
      .catch((err) => {
        alert(`error while deleting Sub Category\n${err}`);
        setRenderPage(!renderPage);
      });
  };

  const { Header, Content, Footer } = Layout;

  useEffect(() => {
    if (dataAPI && indexData !== null) {
      const filterImage = dataAPI[indexData].images.filter((x) => x !== null);
      setFilterImageState(filterImage);
      setDataPerIndex(dataAPI[indexData]);
    }
  }, [dataAPI, indexData]);

  useEffect(() => {
    if (dataAPI) console.log(dataPerIndex);
  }, [indexData, dataAPI]);

  return (
    <>
      <PopUpConfirmation
        isOpen={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        onLeave={() => setOpenConfirmation(false)}
        onSubmit={handleDelete}
        message={
          <>
            Anda yakin akan menghapus?
            <br />
            <Typography
              style={{
                fontFamily: "Barlow",
                fontStyle: "normal",
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              Anda tidak dapat membatalkan tindakan ini
            </Typography>
          </>
        }
      />
      <Layout className={classess.root}>
        <Header className={classess.headerStyle}>
          <Grid item justifyContent="center">
            <Typography className={classess.titleStyle}>
              Detail Standarisasi Media Promosi
            </Typography>
          </Grid>
          <Grid item justifyContent="center" className={classess.buttonGroup}>
            <AddButton
              buttonIcon={<img src={trashIcon} alt="" />}
              label="Delete"
              iconPosition="endIcon"
              onClick={() => setOpenConfirmation(true)}
              style={{
                background: "#ffffff",
                color: "#dc241f",
                border: "1px solid #dc241f",
                padding: 10,
              }}
            />
            <AddButton
              buttonIcon={<img src={editIcon} alt="" />}
              label="Edit"
              iconPosition="endIcon"
              onClick={editButton}
              style={{
                padding: 10,
              }}
            />
          </Grid>
        </Header>
        <Content style={{ marginTop: 40 }}>
          <Card className={classess.contentStyle} variant="outlined">
            {isLoading ? (
              <div className={classess.loaderWrapper}>
                <LoadingView maxheight="100%" isTransparent />
              </div>
            ) : (
              <>
                {dataPerIndex ? (
                  <Layout className={classess.contentLayout}>
                    {/* slider image start */}
                    {filterImageState.length > 0 && (
                      <Content className={classess.imageSection}>
                        <div className={classess.sliderContainer}>
                          <Slider
                            {...settingsSlider}
                            style={{ borderRadius: 12 }}
                          >
                            {dataPerIndex.images.map((item, index) => {
                              if (item)
                                return (
                                  <RenderImageSlider
                                    key={index}
                                    filePath={item}
                                  />
                                );
                            })}
                          </Slider>
                        </div>
                      </Content>
                    )}
                    {/* slider image end */}
                    {/* detail content start */}
                    <Content style={{ width: "70%" }}>
                      <Typography className={classess.subTitle}>
                        {dataPerIndex?.subCategoryName}
                      </Typography>
                      <Typography className={classess.currencyStyle}>
                        {currencyFormat(dataPerIndex?.price)}
                      </Typography>
                      <Typography className={classess.descriptionStyle}>
                        {dataPerIndex?.description}
                      </Typography>
                    </Content>
                    {/* detail content end */}
                  </Layout>
                ) : (
                  <Grid
                    container
                    alignContent="center"
                    justify="center"
                    style={{ height: 175 }}
                    direction="column"
                  >
                    <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
                    <Typography
                      style={{
                        opacity: 0.3,
                        textAlign: "center",
                        fontSize: 11,
                        marginTop: 10,
                      }}
                    >
                      Empty
                    </Typography>
                  </Grid>
                )}
              </>
            )}
          </Card>
        </Content>
        {dataAPI && (
          <Footer className={classess.footerStyle}>
            {indexData == 0 ? (
              <Grid item className={classess.disableButton}>
                <ChevronLeftRounded />
              </Grid>
            ) : (
              <Grid item className={classess.activeButton} onClick={backButton}>
                <ChevronLeftRounded />
              </Grid>
            )}
            <Typography className={classess.paginationText}>
              {dataPerIndex && dataPerIndex?.subCategoryName}
            </Typography>
            {indexData == dataAPI.length - 1 ? (
              <Grid item className={classess.disableButton}>
                <ChevronRightRounded />
              </Grid>
            ) : (
              <Grid item className={classess.activeButton} onClick={nextButton}>
                <ChevronRightRounded />
              </Grid>
            )}
          </Footer>
        )}
      </Layout>
    </>
  );
};

export default StandarisasiMediaPromosi;
