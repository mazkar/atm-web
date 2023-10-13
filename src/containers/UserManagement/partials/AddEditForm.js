import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Paper,
  Button,
  MenuItem,
  Checkbox,
  MenuList,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import { Input, Upload, Alert } from "antd";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/es/lib/isMobilePhone";

import { GrayUltrasoft } from "../../../assets/theme/colors";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/siab/arrow-left.svg";
import { ReactComponent as DropDownIcon } from "../../../assets/icons/general/dropdown_red.svg";
import MuiIconLabelButton from "../../../components/Button/MuiIconLabelButton";
import constants from "../../../helpers/constants";
import { getUsers, getRoles } from "../../../helpers/userManagement";
import secureStorage from "../../../helpers/secureStorage";
import CommonInput from "../common/CommonInput";
import CommonSelect from "../common/CommonSelect";
import CustomSwitch from "../common/CustomSwitch";
import getMinioFromUrl from "../../../helpers/getMinioFromUrl";
// eslint-disable-next-line import/no-cycle
import { RootContext } from "../../../router";
import LoadingView from "../../../components/Loading/LoadingView";
import MinioImageComponent from "../../../components/MinioImageComponent";
import ImageSelector from "../../../components/ImageSelector";
import { doUploadPhoto } from "../../Implementation/ApiServiceImplementation";
import ChangePassword from "../../../components/ChangePassword";
import PopupSucces from "../../../components/PopupSucces";

const signHeight = 100;

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    backgroundColor: GrayUltrasoft,
    "& .MuiBox-root": {
      padding: 0,
    },
  },
  titleContainer: {
    marginBottom: 0,
  },
  title: {
    margin: 10,
    fontFamily: "Barlow",
    fontWeight: "500",
    fontSize: "36px",
    color: constants.color.dark,
  },
  backButton: {
    "& .MuiButton-contained": {
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "red",
    },
    "& .MuiButton-root": {
      textTransform: "capitalize",
      "& :hover": {
        backgroundColor: "#F4F7FB",
      },
    },
  },
  containerContent: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  content: {
    padding: 20,
    marginTop: 30,
  },
  userTitle: {
    marginBottom: 30,
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: 24,
    color: constants.color.dark,
  },
  buttonContainer: {
    marginTop: 25,
    marginBottom: 35,
  },
  primaryButton: {
    color: constants.color.white,
    backgroundColor: constants.color.primaryHard,
    padding: "14px 36px",
    borderRadius: 10,
    width: 72,
    height: 40,
  },
  secondaryButton: {
    color: constants.color.primaryHard,
    backgroundColor: constants.color.white,
    padding: "14px 36px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: `${constants.color.primaryHard}`,
    width: 115,
    height: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputFormAutocomplete: {
    height: 40,
    borderRadius: "5px 5px 0 0",
    border: "1px solid #BCC8E7",
    borderBottom: "none",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    "&:focus": {
      border: "1px solid #BCC8E7",
      outline: "none",
      boxShadow: "0 0 0",
      borderBottom: "none",
    },
  },
  inputFormNotAutocomplete: {
    height: 40,
    borderRadius: 5,
    border: "1px solid #BCC8E7",
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  showPaper: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: 280,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    border: "1px solid #BCC8E7",
    borderTop: "none",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: 4,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#BCC8E7",
      borderRadius: 10,
    },
  },
  hidePaper: {
    display: "none",
  },
  IconRight: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: "12px 12px",
  },
  upload: {
    height: signHeight,
    backgroundColor: GrayUltrasoft,
    overflow: "hidden",
    borderRadius: 4,
    "& .ant-upload.ant-upload-select-picture-card": {
      margin: 0,
      height: "100%",
      width: "100%",
    },
    "& .ant-upload-list.ant-upload-list-picture-card": {
      height: "100%",
      "& .ant-upload-list-picture-card-container": {
        display: "block",
        width: "100%",
        height: signHeight,
        margin: 0,
        "& .ant-upload-list-item": {
          padding: 0,
        },
        "& .ant-btn-icon-only.ant-btn-sm": {
          width: "auto",
        },
      },
    },
  },
  delImgBtn: {
    fontWeight: "600",
    // fontSize: '17px',
    lineHeight: "20px",
    color: "white",
  },
});

const defaultInputs = {
  nama: "",
  divisi: 0,
  jabatan: "",
  role: 0,
  surel: "",
  noTelp: "",
  delegasi: 0,
  areaArr: [],
  orderApproval: "99",
  offeringPriceApproval: "99"
};

function AddEditForm({ formType }) {
  const isEdit = formType === "edit";
  const classes = useStyles();
  const { userId } = useParams();
  const history = useHistory();
  const { userServiceBaseUrl, apiHost } = constants;
  const containerDropdownArea = React.createRef();
  const access_token = secureStorage.getItem("access_token");
  const { userRoleName } = useContext(RootContext);

  const [showDropdownArea, setShowDropdownArea] = useState(false);
  const [checkTrue, setCheckTrue] = useState(true);
  const [isWithSignature, setIsWithSignature] = useState(true);
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(false);
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [commonFields, setCommonFields] = useState(defaultInputs);
  const [isLoading, setIsLoading] = useState(true);
  const [modalLoaderContent, setModalLoaderContent] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [roles, setRoles] = useState([]);
  const [delegasis, setDelegasis] = useState([]);
  const [filteredDelegasis, setFilteredDelegasis] = useState([]);
  const [message, setMessage] = useState("");
  const [delegasiText, setDelegasiText] = useState("");
  const [signBlob, setSignBlob] = useState();
  const [fetchStatus, setFetchStatus] = useState("start"); // start, done, fail
  const [photoProfil, setPhotoProfil] = useState('');
  const [photoProfilRes, setPhotoProfilRes] = useState(null);

  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)

  const aprroveOrderOptions = [
    {
      label: "Select order",
      name: "Select order",
      value: "99",
      id: "99",
    },
    {
      label: "1 (satu)",
      name: "1 (satu)",
      value: "1",
      id: "1",
    },
    {
      label: "2 (dua)",
      name: "2 (dua)",
      value: "2",
      id: "2",
    },
    {
      label: "3 (tiga)",
      name: "3 (tiga)",
      value: "3",
      id: "3",
    },
  ];

  const aprrovePriceOptions = [
    {
      label: "Select order",
      name: "Select order",
      value: "99",
      id: "99",
    },
    {
      label: "1 (satu)",
      name: "1 (satu)",
      value: "1",
      id: "1",
    },
    {
      label: "2 (dua)",
      name: "2 (dua)",
      value: "2",
      id: "2",
    },
  ];

  useEffect(() => {
    const requiredPromises = [
      getDivisions(),
      getArea(),
      getRoles(),
      getUsersByDivision(),
    ];
    const promises =
      userId && isEdit
        ? [...requiredPromises, getUserData()]
        : requiredPromises;
    Promise.all(promises)
      .then((values) => {
        if (!isEdit) {
          setIsLoading(false);
        }
        const [divisionsRes, areaRes, rolesRes, usersByDivRes] = values;
        const userDataRes = userId && isEdit ? values[values.length - 1] : null;
        if (userDataRes) {
          handleUserData(userDataRes);
        }
        handleDivisionsRes(divisionsRes);
        handleAreaRes(areaRes);
        handleRolesRes(rolesRes);
        handleDelegasisRes(usersByDivRes);
      })
      .catch((err) => {
        setModalLoaderContent("Loading error... Please reload the page.");
      });
  }, [userId, formType]);

  function getUserData() {
    return Axios.get(`${userServiceBaseUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${  access_token}`,
      },
    });
  }

  function handleUserData(res) {
    const {
      fullName,
      email,
      phoneNumber,
      status,
      divisionId,
      position,
      roleId,
      delegationId,
      signatureUrl,
      areas,
      orderApproval,
      offeringPriceApproval,
      photoProfile
    } = res.data.data;
    setCommonFields({
      nama: fullName,
      divisi: divisionId || 0,
      jabatan: position || "",
      role: roleId || 0,
      surel: email,
      noTelp: phoneNumber || "",
      delegasi: delegationId,
      areaArr: areas ? areas.split(",") : [],
      orderApproval,
      offeringPriceApproval,
    });
    setPhotoProfilRes(photoProfile);
    if (signatureUrl) {
      getMinioFromUrl(signatureUrl)
        .then((res) => {
          // minio not down
          // console.log(res);
          setIsWithSignature(true);
          setIsLoading(false);
          setFileList([
            {
              uid: "1",
              name: "Signature",
              status: "done",
              url: res?.fileUrl,
            },
          ]);
        })
        .catch((err) => {
          // minio down?
          console.log(err);
        });
    } else {
      setIsWithSignature(false);
      setIsLoading(false);
    }
    setCheckTrue(status);
  }

  useEffect(() => {
    if (fileList.length > 0) {
      if (fileList[0].url) {
        setFetchStatus("start");
        fetch(fileList[0].url)
          .then(function (resFetch) {
            return resFetch.blob();
          })
          .then(function (blob) {
            // here the image is a blob
            // file ada
            // console.log(blob);
            const theFile = new File([blob], "Signature.jpg", {
              type: "image/jpg",
            });
            setSignBlob(theFile);
            setFetchStatus("done");
          })
          .catch((error) => {
            // file tidak ada
            setSignBlob();
            setFetchStatus("fail");
            console.error("Error:", error);
          });
      } else {
        setSignBlob(fileList[0].originFileObj);
      }
    } else {
      setSignBlob();
    }
    // console.log(fileList);
  }, [fileList]);

  function getDivisions() {
    return Axios.get(`${userServiceBaseUrl}/divisions`);
  }

  function handleDivisionsRes(res) {
    const { divisions = [] } = res.data.data;
    // console.log(divisions);
    const mappedDivs = divisions.map(({ id, name }) => ({
      id,
      id_Divisi: id,
      value: id,
      name,
    }));
    setDivisions(mappedDivs);
  }

  function getArea() {
    return Axios({
      method: "POST",
      url: `${apiHost}/getAreaAll`,
      headers: {
        Authorization: `Bearer ${  access_token}`,
      },
    });
  }

  function handleAreaRes(res) {
    const mappedAreas = res.data.data.map(({ id, name }) => ({
      id,
      id_Role: id,
      value: `${id  }`,
      name,
    }));
    // console.log(mappedAreas);
    setAreas(mappedAreas);
  }

  function handleRolesRes(res) {
    // console.log(res.data);
    const mappedRoles = res.data.data.roles.map(({ id, name }) => ({
      id,
      id_Role: id,
      value: id,
      name,
    }));
    setRoles(mappedRoles);
  }

  function getUsersByDivision() {
    return getUsers({ divisionId: commonFields.divisi });
  }

  function handleDelegasisRes(res) {
    const mapped = res.data.data.users.map(({ fullName, id }) => ({
      label: fullName || "",
      name: fullName || "",
      value: `${id  }`,
      id,
    }));
    // console.log(mapped);
    setDelegasis(mapped);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerDropdownArea.current &&
        !containerDropdownArea.current.contains(event.target)
      ) {
        setShowDropdownArea(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const isDelegasiOptional = userRoleName.toLowerCase().includes("admin");

  // kalau admin boleh optional, kalau selain admin wajib delegasi

  const isWithDelegasi = isDelegasiOptional || commonFields.delegasi;

  const handleSave = async() => {
    const {
      nama,
      surel,
      noTelp,
      jabatan,
      delegasi,
      role,
      divisi,
      areaArr,
      orderApproval,
      offeringPriceApproval,
    } = commonFields;
    if (
      nama &&
      surel &&
      isEmail(surel) &&
      noTelp &&
      isMobilePhone(noTelp) 
    ) {
      setIsSaveBtnDisabled(true);
      setIsCancelBtnDisabled(true);
      const url = `${userServiceBaseUrl}/users/${isEdit ? userId : "register"}`;
      
      // HANDLE Photo Profile
      const profilePath = {path: photoProfilRes}; 

      const uploadAction = async (file)=>{
        // loadDataHandler(true);
        await doUploadPhoto(file)
          .then((res) => {
            // console.log("+++ fileType", fileType);
            if (res.status === 200) {
              if (res.data.responseCode === "00") {
                const {path} = res.data;
                // console.log("+++ res path", path);
                // eslint-disable-next-line default-case
                profilePath.path = path;
              }
            } else {
              alert(res.data.responseMessage);
            }
          }).catch((err) => {
            alert(`Failed to upload foto profile ${err}`);
            // loadDataHandler(false);
          });
      };

      if(photoProfil !== ''){
        await uploadAction(photoProfil);
      }
      // END PP
      const formData = new FormData();
      if (isWithSignature && fileList.length > 0) {
        const { originFileObj } = fileList[0];
        if (
          !originFileObj &&
          fetchStatus !== "done" &&
          fetchStatus !== "fail"
        ) {
          setMessage("File belum siap, coba beberapa saat lagi.");
          setIsSaveBtnDisabled(false);
          setIsCancelBtnDisabled(false);
          return;
        } if (originFileObj || fetchStatus === "done") {
          formData.append("file", originFileObj || signBlob);
        }
        // console.log(fileList[0], signBlob);
      }
      formData.append("email", surel);
      if (role) {
        formData.append("roleId", role);
      }
      formData.append("fullName", nama);
      formData.append("phoneNumber", noTelp);
      formData.append("position", jabatan);
      if (delegasi) {
        formData.append("delegationId", delegasi);
      }
      if (divisi) {
        formData.append("divisionId", divisi);
      }
      formData.append("status", checkTrue);
      const areasString = areaArr.toString();
      formData.append("areas", areasString);
      if (orderApproval) {
        formData.append("orderApproval", orderApproval);
      }
      if (offeringPriceApproval) {
        formData.append("offeringPriceApproval", offeringPriceApproval);
      }
      formData.append("photoProfile", profilePath.path);
      // console.log(areaArr.toString());
      Axios({
        url,
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${  access_token}`,
        },
        data: formData,
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === "success") {
            alert(`Data User Berhasil ${formType === "edit"? "Diperbarui":"Ditambahkan"}!`);
            if(formType === "edit"){
              history.go(0);
            }else{
              history.push("/user-management");
            }
          } else if (res.data.status === "failed") {
            setMessage(res.data.message);
          }
        })
        .catch((err) => {
          // console.log(err);
          setMessage(err.message);
        })
        .then(() => {
          setIsSaveBtnDisabled(false);
          setIsCancelBtnDisabled(false);
        });
    } else if (!nama) {
      setMessage("Nama tidak boleh kosong.");
    } else if (!surel) {
      setMessage("Email tidak boleh kosong.");
    } else if (!isEmail(surel)) {
      setMessage("Format email salah.");
    } else if (!noTelp) {
      setMessage("Nomor telepon tidak boleh kosong.");
    } else if (!isMobilePhone(noTelp)) {
      setMessage("Format nomor telepon salah.");
    } 
    // else if (!isWithDelegasi) {
    //   setMessage("Pilih Delegasi dari rekomendasi.");
    // } 
    else {
      setMessage("Unknown error");
    }
  };

  function handleCommonChange(e) {
    const { name, value } = e.target;
    // console.log(name, value);
    setCommonFields((d) => ({ ...d, [name]: value }));
  }

  useEffect(() => {
    if (commonFields.divisi) {
      getUsersByDivision()
        .then(handleDelegasisRes)
        .catch((err) => console.log(err));
    }
    console.log("common field", commonFields);
  }, [commonFields.divisi]);

  const handleCheckButton = (event) => {
    setCheckTrue(event.target.checked);
  };

  const handleAreaChange = (event) => {
    const { name, checked } = event.target;
    // console.log(name, checked);
    let newAreaArr = [];
    if (checked) {
      const { areaArr } = commonFields;
      newAreaArr = [...areaArr, `${name  }`];
    } else {
      newAreaArr = commonFields.areaArr.filter((val) => val !== `${name  }`);
    }
    setCommonFields((d) => ({ ...d, areaArr: newAreaArr }));
  };

  const handleChangeAllArea = (event) => {
    const { checked } = event.target;
    let newAreaArr = [];
    if (checked) {
      newAreaArr = areas.map((val) => `${val.id  }`);
    }
    setCommonFields((d) => ({ ...d, areaArr: newAreaArr }));
  };

  const clickInputArea = () => {
    setShowDropdownArea(true);
  };

  function goBack() {
    history.push("/user-management");
  }

  function handleSignatureCheck(e) {
    setIsWithSignature(e.target.checked);
  }

  function handleSearch(text) {
    // when user type
    const filtered = delegasis.filter((val) =>
      val.name.toLowerCase().includes(text.toLowerCase())
    );
    // console.log('handleSearch', text, filtered);
    setFilteredDelegasis(filtered);
    setDelegasiText(text);
    if (text.length === 0) {
      setCommonFields((d) => ({ ...d, delegasi: 0 }));
    }
  }

  function handleAutoSelect(val) {
    // when user select one of the suggestions
    // console.log('handleAutoSelect', val);
    setCommonFields((d) => ({ ...d, delegasi: val * 1 }));
  }

  useEffect(() => {
    const foundDelegasi = findDelegasi(commonFields.delegasi);
    setDelegasiText(foundDelegasi ? foundDelegasi.name : "");
  }, [commonFields.delegasi, delegasis]);

  function handleAutoChange(x) {
    // when user either select or type
    // console.log('handleAutoChange', x);
  }

  function findDelegasi(id) {
    return delegasis.find((val) => val.id * 1 === id * 1);
  }

  function findDelegasiName(id) {
    return findDelegasi(id)?.name;
  }

  const handleUploadChange = (info) => {
    // console.log(info);
    if (info.file.status === "removed") {
      setFileList([]);
      setMessage("");
    } else {
      getBase64(info.file, (result) => {
        setFileList([{ ...info.fileList[0], thumbUrl: result }]);
      });
    }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      setMessage("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      setMessage(
        "Ukuran file lebih dari 1 MB. Disarankan menggunakan file berukuran kurang dari 1 MB."
      );
    }
    // console.log(file);
    return false;
  }

  let areaInputVal = "";
  if (areas.length > 0) {
    for (let i = 0; i < commonFields.areaArr.length; i++) {
      const name = areas.find((val) => val.id == commonFields.areaArr[i])?.name;
      areaInputVal += i === 0 ? name : `, ${  name}`;
    }
  }

  const isAllAreaSelected = areas.length === commonFields.areaArr.length;

  return (
    <div className={classes.container}>
      <Grid className={classes.titleContainer}>
        <Grid item>
          {message ? <Alert message={message} type="error" /> : null}
        </Grid>
        <Grid item className={classes.containerContent}>
          {isLoading ? (
            <LoadingView maxheight="100%" />
          ) : (
            <Paper className={classes.content}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography className={classes.userTitle}>User Detail</Typography>
                </Grid>
                <Grid item>
                  <Button 
                   style={{ textTransform: 'none', color: constants.color.primaryHard }}
                   onClick={()=>setOpenChangePassword(true)}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
              <div style={{marginBottom: 30}}>
                {photoProfilRes ? (
                  <div style={{position: "relative", width: 260}}>
                    <MinioImageComponent filePath={photoProfilRes} style={{ borderRadius: 10, width: 255, }}/>
                    <IconButton
                      style={{position: "absolute", right: -10, top: -10, color: "#DC241F"}}
                      onClick={() => {
                        setPhotoProfilRes(null);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ): (
                  <ImageSelector isLarger title="Profil" onChange={(e)=>setPhotoProfil(e.target.files[0])} selectedImage={photoProfil} onDelete={()=>setPhotoProfil('')} />
                )}
              </div>
              <div>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.inputContainer}
                >
                  <CommonInput
                    title="Nama :"
                    required
                    name="nama"
                    value={commonFields}
                    onChange={handleCommonChange}
                  />
                  <CommonSelect
                    title="Divisi :"
                    name="divisi"
                    value={commonFields}
                    onChange={handleCommonChange}
                    options={divisions}
                  />
                  <CommonInput
                    title="Jabatan :"
                    name="jabatan"
                    value={commonFields}
                    onChange={handleCommonChange}
                  />
                  <Grid item xs={3}>
                    <div>
                      <Typography>Area :</Typography>
                    </div>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "relative" }}>
                        <Input
                          className={
                            showDropdownArea
                              ? classes.inputFormAutocomplete
                              : classes.inputFormNotAutocomplete
                          }
                          value={
                            isAllAreaSelected ? "All Area" : areaInputVal
                          }
                          placeholder="Silahkan Pilih Area"
                          onClick={clickInputArea}
                        />
                        <div className={classes.IconRight}>
                          <DropDownIcon />
                        </div>
                      </div>
                      <Paper
                        ref={containerDropdownArea}
                        className={
                          showDropdownArea
                            ? classes.showPaper
                            : classes.hidePaper
                        }
                      >
                        <MenuList>
                          <MenuItem>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isAllAreaSelected}
                                  onChange={handleChangeAllArea}
                                  color="default"
                                />
                              }
                              label="All Area"
                            />
                          </MenuItem>
                          {areas.map((d, i) => {
                            return (
                              <MenuItem key={i}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={commonFields.areaArr.includes(
                                        d.value
                                      )}
                                      onChange={handleAreaChange}
                                      name={d.value}
                                      color="default"
                                    />
                                  }
                                  label={d.name}
                                />
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Paper>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.inputContainer}
                >
                  <CommonSelect
                    title="Role :"
                    name="role"
                    value={commonFields}
                    onChange={handleCommonChange}
                    options={roles}
                  />
                  <CommonInput
                    title="Email :"
                    required
                    name="surel"
                    value={commonFields}
                    onChange={handleCommonChange}
                  />
                  <CommonInput
                    title="Phone :"
                    required
                    name="noTelp"
                    type="number"
                    value={commonFields}
                    onChange={handleCommonChange}
                  />
                  <CommonSelect
                    title="Order Approval :"
                    name="orderApproval"
                    value={
                      commonFields.orderApproval
                        ? commonFields
                        : defaultInputs
                    }
                    options={aprroveOrderOptions}
                    onChange={handleCommonChange}
                  />
                </Grid>
              </div>
              <div>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={classes.inputContainer}
                >
                  <CommonInput
                    title="ID :"
                    disabled
                    value={isEdit ? userId : ""}
                    onChange={handleCommonChange}
                  />
                  <CommonInput
                    auto
                    title="Delegasi :"
                    // required={!isDelegasiOptional}
                    value={delegasiText}
                    onChange={handleAutoChange}
                    onSearch={handleSearch}
                    onSelect={handleAutoSelect}
                    options={filteredDelegasis}
                  />
                  <Grid
                    item
                    xs={3}
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <CustomSwitch
                      title="Status"
                      checked={checkTrue}
                      onChange={handleCheckButton}
                    />
                  </Grid>
                  <CommonSelect
                    title="Price Approval :"
                    name="offeringPriceApproval"
                    value={
                      commonFields.offeringPriceApproval
                        ? commonFields
                        : defaultInputs
                    }
                    options={aprrovePriceOptions}
                    onChange={handleCommonChange}
                  />
                </Grid>
              </div>
              <div>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <CustomSwitch
                      title="Signature"
                      checked={isWithSignature}
                      onChange={handleSignatureCheck}
                    />
                  </Grid>
                  {isWithSignature && (
                    <Grid item xs={3}>
                      <Upload
                        showUploadList={{
                          showPreviewIcon: false,
                          removeIcon: (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <DeleteOutlineIcon
                                // fontSize="large"
                                className={classes.delImgBtn}
                              />
                              <Typography
                                className={classes.delImgBtn}
                                style={{ fontSize: 17 }}
                              >
                                    Delete Signature
                              </Typography>
                            </div>
                          ),
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                        className={classes.upload}
                        listType="picture-card"
                        fileList={fileList}
                      >
                        {fileList.length > 0 ? null : (
                          <MuiIconLabelButton
                            label="Add Signature"
                            iconPosition="startIcon"
                            buttonIcon={<PlusOutlined />}
                          />
                        )}
                      </Upload>
                    </Grid>
                  )}
                </Grid>
              </div>
            </Paper>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-between"
        className={classes.buttonContainer}
      >
        <Grid item>
          <Button
            variant="outlined"
            disableElevation
            className={classes.secondaryButton}
            onClick={goBack}
            style={{ textTransform: "capitalize" }}
            disabled={isCancelBtnDisabled}
          >
                Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disableElevation
            className={classes.primaryButton}
            onClick={handleSave}
            style={{ textTransform: "capitalize" }}
            disabled={isSaveBtnDisabled}
          >
                Save
          </Button>
        </Grid>
      </Grid>
      <ChangePassword 
        open={openChangePassword} 
        onClose={()=>setOpenChangePassword(false)} 
        onSubmit={()=>{
          setOpenChangePassword(false)
          setOpenSuccess(true)
          setTimeout(()=>{
            setOpenSuccess(false)
          },3000)
        }}
        />
      <PopupSucces 
        isOpen={openSuccess} 
        onClose={()=>setOpenSuccess(false)} 
        message="Password changed successfully!" 
      />
    </div>
  );
}

export default AddEditForm;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    callback(reader.result);
    // console.log(img, reader);
  });
  reader.readAsDataURL(img);
}
