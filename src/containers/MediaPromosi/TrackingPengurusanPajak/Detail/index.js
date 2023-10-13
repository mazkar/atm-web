/* eslint-disable react/jsx-no-bind */
/* Third Party Import */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  OutlinedInput,
  IconButton,
} from "@material-ui/core";
import { DatePicker } from "antd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

/* Internal Import */
import { PrimaryHard, GrayUltrasoft } from "../../../../assets/theme/colors";
import SelectItemsIcon from "../../../../components/Selects/SelectItemsIcon";
import LabelTextField from "../../../../components/Form/LabelTextField";
import SelectMui from "../../../../components/Selects/SelectMui";
import MuiButton from "../../../../components/Button/MuiButton";
import TableChips from "../../../../components/Chips/TableChips";
import SingleInputField from "../common/SingleInputField";
import { ReactComponent as TodoIcon } from "../../../../assets/icons/siab/time-circle.svg";
import { ReactComponent as DoingIcon } from "../../../../assets/icons/siab/refresh-blue.svg";
import { ReactComponent as DoneIcon } from "../../../../assets/icons/duotone-others/check-green.svg";
import { ReactComponent as StripIcon } from "../../../../assets/icons/siab/strip-circle.svg";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/linear-red/calendar.svg";
import { useEffect } from "react";
import ServiceDetailTrackingPajak from "./Service";
import moment from "moment";
import { ReactComponent as UserIcon } from "../../../../assets/icons/linear-red/user.svg";
import { doGetVendors } from "../../../UserManagement/ApiServicesUser";
import SelectLeftCustomIcon from "../../../../components/Selects/SelectItemsIcon";
import EmptyImg from "../../../../assets/images/empty_data.png";
import ModalLoader from "../../../../components/ModalLoader";
import LoadingView from "../../../../components/Loading/LoadingView";
import PopupSucces from "../../../../components/PopupSucces";
import AutocompleteMui from "../../../../components/AutocompleteMui";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
  },
  buttonText: {
    color: PrimaryHard,
    textTransform: "capitalize",
  },
  divider: {
    backgroundColor: "#BCC8E7",
    height: "1px",
  },
  title: {
    fontFamily: "Barlow",
    fontWeight: 500,
    fontSize: "36px",
    color: "#2B2F3C",
  },
  container: {
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 6px 6px 0px rgba(232, 238, 255, 0.3)",
    padding: "30px 20px",
  },
  sectionTitle: {
    color: "#BCC8E7",
    fontFamily: "Barlow",
    fontWeight: 600,
    fontSize: "13px",
  },
  tableRow: {
    "& .MuiTableCell-sizeSmall": { padding: 2 },
  },
  tableCell: {
    borderBottom: "unset",
    fontSize: "14px",
  },
  inputText: {
    "& .MuiInputBase-root": {
      height: "40px",
    },
  },
  datePicker: {
    padding: "7px 10px 7px 10px",
    borderRadius: "10px",
    border: "1px solid #BCC8E7",
    width: "100%",
    "& .ant-picker-input > input::placeholder": {
      color: "#BCC8E7",
      fontStyle: "italic",
      textOverflow: "ellipsis !important",
      fontSize: 12,
    },
  },
  tableRowCustom: {
    backgroundColor: GrayUltrasoft,
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

const TrackingPengurusanPajakDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { fetchDataDetail, doHitUpdateOrderNewTax } =
    ServiceDetailTrackingPajak();
  const [dataAPI, setDataAPI] = useState(null);
  const [loaderVendor, setLoaderVendor] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoad, setIsModalLoad] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [vendorOptions, setVendorOptions] = useState([
    { value: "-", name: "Pilih Vendor" },
  ]);
  const [disableInput, setDisableInput] = useState(false);

  const [inputData, setInputData] = useState({
    endTax: "",
    orderType: "",
    remark: "",
    startTax: "",
    status: "",
    taxValue: "",
    vendorId: "",
    signageAvailable: "",
    signageSizeLook: "",
  });

  const [inputMediaSignageOne, setInputMediaSignageOne] = useState({
    signageMediaOne: "",
    mediaSignageSizeOne: "",
    panjang: "",
    lebar: "",
    tinggi: "",
    visibility: "visible",
  });
  const [inputMediaSignageTwo, setInputMediaSignageTwo] = useState({
    signageMediaTwo: "",
    mediaSignageSizeTwo: "",
    panjang: "",
    lebar: "",
    tinggi: "",
    visibility: "hidden",
  });
  const [inputMediaSignageThree, setInputMediaSignageThree] = useState({
    signageMediaThree: "",
    mediaSignageSizeThree: "",
    panjang: "",
    lebar: "",
    tinggi: "",
    visibility: "hidden",
  });
  const [inputMediaSignageFour, setInputMediaSignageFour] = useState({
    signageMediaFour: "",
    mediaSignageSizeFour: "",
    panjang: "",
    lebar: "",
    tinggi: "",
    visibility: "hidden",
  });

  const optionTypeOrder = [
    { value: "Kepengurusan Lama", name: "Kepengurusan Lama" },
    { value: "Kepengurusan Baru", name: "Kepengurusan Baru" },
  ];

  const optionMediaSignage = [
    { value: "Bentuk Lain", name: "Bentuk Lain" },
    { value: "Bentuk Lain, Neon Box", name: "Bentuk Lain, Neon Box" },
    { value: "Bentuk Lain, Pylon Sign", name: "Bentuk Lain, Pylon Sign" },
    {
      value: "Bentuk Lain, Sticker Kaca/Sticker Sumnblast",
      name: "Bentuk Lain, Sticker Kaca/Sticker Sumnblast",
    },
    { value: "Flag Mount", name: "Flag Mount" },
    { value: "Flag Mount, Bentuk Lain", name: "Flag Mount, Bentuk Lain" },
    { value: "Flag Mount, Neon Box", name: "Flag Mount, Neon Box" },
    {
      value: "Flag Mount, Neon Box, Sticker Kaca",
      name: "Flag Mount, Neon Box, Sticker Kaca",
    },
    {
      value: "Flag Mount, Neon Box, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
      name: "Flag Mount, Neon Box, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    },
    { value: "Flag Mount, Pylon Sign", name: "Flag Mount, Pylon Sign" },
    {
      value: "Flag Mount, Pylon Sign, Sticker Kaca/Sticker Sunblast",
      name: "Flag Mount, Pylon Sign, Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Flag Mount, Sticker Kaca/Sticker Sunblast",
      name: "Flag Mount, Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Flag Mount, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
      name: "Flag Mount, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    },
    {
      value: "Flag Mount, Sticker Kaca/Sticker Sunblast, Neon Box",
      name: "Flag Mount, Sticker Kaca/Sticker Sunblast, Neon Box",
    },
    { value: "Flag Mount, Wall Sign", name: "Flag Mount, Wall Sign" },
    {
      value: "Flag Mount, Wall Sign, Sticker Kaca/Sticker Sunblast",
      name: "Flag Mount, Wall Sign, Sticker Kaca/Sticker Sunblast",
    },
    { value: "Neon Box", name: "Neon Box" },
    { value: "Neon Box, Bentuk Lain", name: "Neon Box, Bentuk Lain" },
    {
      value: "Neon Box, Flag Mount, Sticker Kaca/Sticker Sunblast",
      name: "Neon Box, Flag Mount, Sticker Kaca/Sticker Sunblast",
    },
    { value: "Neon Box, Plyon Sign", name: "Neon Box, Plyon Sign" },
    {
      value: "Neon Box, Pylon Sign, Sticker Kaca/Sticker Sunblast",
      name: "Neon Box, Pylon Sign, Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Neon Box, Sticker Kaca/Sticker Sunblast",
      name: "Neon Box, Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Neon Box, Sticker Kaca/Sticker Sunblast, Flag Mount",
      name: "Neon Box, Sticker Kaca/Sticker Sunblast, Flag Mount",
    },
    {
      value: "Neon Box, Sticker Kaca/Sticker Sunblast, Pylon Sign",
      name: "Neon Box, Sticker Kaca/Sticker Sunblast, Pylon Sign",
    },
    {
      value: "Neon Box, Wall Sign, Sticker Kaca/Sticker Sunblast",
      name: "Neon Box, Wall Sign, Sticker Kaca/Sticker Sunblast",
    },
    { value: "Pylon Sign", name: "Pylon Sign" },
    { value: "Pylon Sign, Bentuk Lain", name: "Pylon Sign, Bentuk Lain" },
    { value: "Pylon Sign, Neon Box", name: "Pylon Sign, Neon Box" },
    {
      value: "Pylon Sign, Neon Box,Sticker Kaca/Sticker Sunblast",
      name: "Pylon Sign, Neon Box,Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Pylon Sign, Sticker Kaca/Sticker Sunblast",
      name: "Pylon Sign, Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Pylon Sign, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
      name: "Pylon Sign, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    },
    {
      value: "Pylon Sign, Sticker Kaca/Sticker Sunblast, Neon Box",
      name: "Pylon Sign, Sticker Kaca/Sticker Sunblast, Neon Box",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast",
      name: "Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Bentuk Lain",
      name: "Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Flag Mount",
      name: "Sticker Kaca/Sticker Sunblast, Flag Mount",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Neon Box",
      name: "Sticker Kaca/Sticker Sunblast, Neon Box",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Neon Box, Flag Mount",
      name: "Sticker Kaca/Sticker Sunblast, Neon Box, Flag Mount",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Neon Box, Pylon Sign",
      name: "Sticker Kaca/Sticker Sunblast, Neon Box, Pylon Sign",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Neon Box, Wall Sign",
      name: "Sticker Kaca/Sticker Sunblast, Neon Box, Wall Sign",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Pylon Sign",
      name: "Sticker Kaca/Sticker Sunblast, Pylon Sign",
    },
    {
      value: "Sticker Kaca/Sticker Sunblast, Wall Sign, Bentuk Lain",
      name: "Sticker Kaca/Sticker Sunblast, Wall Sign, Bentuk Lain",
    },
    { value: "Wall Sign", name: "Wall Sign" },
    { value: "Wall Sign, Bentuk Lain", name: "Wall Sign, Bentuk Lain" },
    {
      value: "Wall Sign, Neon Box, Sticker Kaca/Sticker Sunblast",
      name: "Wall Sign, Neon Box, Sticker Kaca/Sticker Sunblast",
    },
    {
      value: "Wall Sign, Sticker Kaca/Sticker Sunblast",
      name: "Wall Sign, Sticker Kaca/Sticker Sunblast",
    },
  ];

  const optionMediaSignage2 = [
    "Bentuk Lain",
    "Bentuk Lain, Neon Box",
    "Bentuk Lain, Pylon Sign",
    "Bentuk Lain, Sticker Kaca/Sticker Sumnblast",
    "Flag Mount",
    "Flag Mount, Bentuk Lain",
    "Flag Mount, Neon Box",
    "Flag Mount, Neon Box, Sticker Kaca",
    "Flag Mount, Neon Box, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    "Flag Mount, Pylon Sign",
    "Flag Mount, Pylon Sign, Sticker Kaca/Sticker Sunblast",
    "Flag Mount, Sticker Kaca/Sticker Sunblast",
    "Flag Mount, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    "Flag Mount, Sticker Kaca/Sticker Sunblast, Neon Box",
    "Flag Mount, Wall Sign",
    "Flag Mount, Wall Sign, Sticker Kaca/Sticker Sunblast",
    "Neon Box",
    "Neon Box, Bentuk Lain",
    "Neon Box, Flag Mount, Sticker Kaca/Sticker Sunblast",
    "Neon Box, Plyon Sign",
    "Neon Box, Pylon Sign, Sticker Kaca/Sticker Sunblast",
    "Neon Box, Sticker Kaca/Sticker Sunblast",
    "Neon Box, Sticker Kaca/Sticker Sunblast, Flag Mount",
    "Neon Box, Sticker Kaca/Sticker Sunblast, Pylon Sign",
    "Neon Box, Wall Sign, Sticker Kaca/Sticker Sunblast",
    "Pylon Sign",
    "Pylon Sign, Bentuk Lain",
    "Pylon Sign, Neon Box",
    "Pylon Sign, Neon Box,Sticker Kaca/Sticker Sunblast",
    "Pylon Sign, Sticker Kaca/Sticker Sunblast",
    "Pylon Sign, Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    "Pylon Sign, Sticker Kaca/Sticker Sunblast, Neon Box",
    "Sticker Kaca/Sticker Sunblast",
    "Sticker Kaca/Sticker Sunblast, Bentuk Lain",
    "Sticker Kaca/Sticker Sunblast, Flag Mount",
    "Sticker Kaca/Sticker Sunblast, Neon Box",
    "Sticker Kaca/Sticker Sunblast, Neon Box, Flag Mount",
    "Sticker Kaca/Sticker Sunblast, Neon Box, Pylon Sign",
    "Sticker Kaca/Sticker Sunblast, Neon Box, Wall Sign",
    "Sticker Kaca/Sticker Sunblast, Pylon Sign",
    "Sticker Kaca/Sticker Sunblast, Wall Sign, Bentuk Lain",
    "Wall Sign",
    "Wall Sign, Bentuk Lain",
    "Wall Sign, Neon Box, Sticker Kaca/Sticker Sunblast",
    "Wall Sign, Sticker Kaca/Sticker Sunblast",
  ];

  const optionSignageLook = [
    { value: "Besar", name: "Besar" },
    { value: "Sedang", name: "Sedang" },
    { value: "Kecil", name: "Kecil" },
  ];

  const optionSignaneAvailable = [
    { value: "Ada", name: "Ada" },
    { value: "Proses Pasang", name: "Proses Pasang" },
    { value: "Terminasi Permanent", name: "Terminasi Permanent" },
    { value: "Terminasi Sementara", name: "Terminasi Sementara" },
    { value: "Tidak Ada", name: "Tidak Ada" },
  ];

  const loadVendorHandler = (bool) => {
    setLoaderVendor(bool);
  };

  const handleLoading = (bool) => {
    setIsLoading(bool);
  };

  const handleModalLoad = (bool) => {
    setIsModalLoad(bool);
  };

  const handleClosePopup = () => {
    setPopUpOpen(false);
    history.push("/media-promosi/tracking-pengurusan-pajak");
  };

  const handlePopUp = (bool) => {
    setPopUpOpen(bool);
  };

  const handleChange = (key, event) => {
    event.persist();
    console.log(key, event.target.value);
    setInputData((prev) => {
      return {
        ...prev,
        [key]: event.target.value,
      };
    });
  };

  const handleSelect = (key, event) => {
    console.log(key, event);
    setInputData((prev) => {
      return { ...prev, [key]: event };
    });
    console.log(key, event);
  };

  const handleChangeDate = (key, event) => {
    const date = new Date(event).toLocaleString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setInputData((prev) => {
      return { ...prev, [key]: date };
    });
    console.log(key, date);
  };

  const mediaSignageSizeToArray = (data) => {
    const arrData = [];
    const sliceData = data.slice(1, data.length - 1);
    const splitData = sliceData.split('"' && ",");

    for (const item of splitData) {
      const parseItem = parseInt(item.slice(1, item.length - 1));
      arrData.push(parseItem);
    }

    return arrData;
  };

  const formatDate = (date) => {
    const monthFormat = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const dateFormat = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ];

    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    return `${year}-${monthFormat[month]}-${dateFormat[day - 1]}`;
  };

  useEffect(() => {
    doGetVendors(loadVendorHandler).then((res) => {
      if (res?.length > 0) {
        const option = [{ value: "", name: "Pilih Vendor" }];
        res?.map((item) => {
          const newObj = { value: item.id, name: item.name };
          option.push(newObj);
        });
        setVendorOptions(option);
      }
    });
  }, []);

  useEffect(() => {
    fetchDataDetail(id, handleLoading).then((res) => {
      setDataAPI(res);
      setInputData({
        endTax: res.endTax ? moment(res.endTax).format("YYYY/MM/DD") : "",
        startTax: res.startTax ? moment(res.startTax).format("YYYY/MM/DD") : "",
        taxValue: res.taxValue,
        vendorId: res.vendorId ? res.vendorId : "",
        remark: res.remark,
        orderType: res.orderType,
        status: res.status,
        signageAvailable: res.signageAvailable,
        mediaSignageSizeOne: res.mediaSignageSizeOne,
        signageSizeLook: res.signageSizeLook,
      });

      if (res.status === 1) setDisableInput(true);

      // conditional Input
      if (res.mediaSignageSizeOne) {
        const mediaSignageSize1 = mediaSignageSizeToArray(
          res.mediaSignageSizeOne
        );
        setInputMediaSignageOne({
          ...inputMediaSignageOne,
          signageMediaOne: res.signageMediaOne,
          mediaSignageSizeOne: mediaSignageSize1,
          panjang: mediaSignageSize1[0],
          lebar: mediaSignageSize1[1],
          tinggi: mediaSignageSize1[2],
        });
      }
      if (res.mediaSignageSizeTwo) {
        const mediaSignageSize2 = mediaSignageSizeToArray(
          res.mediaSignageSizeTwo
        );
        setInputMediaSignageTwo({
          ...inputMediaSignageTwo,
          signageMediaTwo: res.signageMediaTwo,
          mediaSignageSizeTwo: mediaSignageSizeToArray(res.mediaSignageSizeTwo),
          visibility: "visible",
          panjang: mediaSignageSize2[0],
          lebar: mediaSignageSize2[1],
          tinggi: mediaSignageSize2[2],
        });
      }
      if (res.mediaSignageSizeThree) {
        const mediaSignageSize3 = mediaSignageSizeToArray(
          res.mediaSignageSizeThree
        );
        setInputMediaSignageThree({
          ...inputMediaSignageThree,
          signageMediaThree: res.signageMediaThree,
          mediaSignageSizeThree: mediaSignageSizeToArray(
            res.mediaSignageSizeThree
          ),
          visibility: "visible",
          panjang: mediaSignageSize3[0],
          lebar: mediaSignageSize3[1],
          tinggi: mediaSignageSize3[2],
        });
      }
      if (res.mediaSignageSizeFour) {
        const mediaSignageSize4 = mediaSignageSizeToArray(
          res.mediaSignageSizeFour
        );
        setInputMediaSignageFour({
          ...inputMediaSignageFour,
          signageMediaFour: res.signageMediaFour,
          mediaSignageSizeFour: mediaSignageSizeToArray(
            res.mediaSignageSizeFour
          ),
          visibility: "visible",
          panjang: mediaSignageSize4[0],
          lebar: mediaSignageSize4[1],
          tinggi: mediaSignageSize4[2],
        });
      }

      console.log(res);
    });
  }, []);

  const handleAssignToVendor = async () => {
    const reqBody = {
      id: dataAPI.id,
      endTax: inputData.endTax? moment(inputData.endTax).format("YYYY-MM-DD") : "",
      startTax: inputData.startTax? moment(inputData.startTax).format("YYYY-MM-DD") : "",
      taxValue: inputData.taxValue,
      vendorId: inputData.vendorId,
      remark: inputData.remark,
      orderType: inputData.orderType,
      signageAvailable: inputData.signageAvailable,
      signageSizeLook: inputData.signageSizeLook,
      status: inputData.status,
      signageMediaOne: inputMediaSignageOne.signageMediaOne
        ? inputMediaSignageOne.signageMediaOne
        : null,
      mediaSignageSizeOne:
        inputMediaSignageOne.panjang &&
        inputMediaSignageOne.lebar &&
        inputMediaSignageOne.tinggi
          ? [
              parseInt(inputMediaSignageOne.panjang),
              parseInt(inputMediaSignageOne.lebar),
              parseInt(inputMediaSignageOne.tinggi),
            ]
          : null,
      signageMediaTwo: inputMediaSignageTwo.signageMediaTwo
        ? inputMediaSignageTwo.signageMediaTwo
        : null,
      mediaSignageSizeTwo:
        inputMediaSignageTwo.panjang &&
        inputMediaSignageTwo.lebar &&
        inputMediaSignageTwo.tinggi
          ? [
              parseInt(inputMediaSignageTwo.panjang),
              parseInt(inputMediaSignageTwo.lebar),
              parseInt(inputMediaSignageTwo.tinggi),
            ]
          : null,
      signageMediaThree: inputMediaSignageThree.signageMediaThree
        ? inputMediaSignageThree.signageMediaThree
        : null,
      mediaSignageSizeThree:
        inputMediaSignageThree.panjang &&
        inputMediaSignageThree.lebar &&
        inputMediaSignageThree.tinggi
          ? [
              parseInt(inputMediaSignageThree.panjang),
              parseInt(inputMediaSignageThree.lebar),
              parseInt(inputMediaSignageThree.tinggi),
            ]
          : null,
      signageMediaFour: inputMediaSignageFour.signageMediaFour
        ? inputMediaSignageFour.signageMediaFour
        : null,
      mediaSignageSizeFour:
        inputMediaSignageFour.panjang &&
        inputMediaSignageFour.lebar &&
        inputMediaSignageFour.tinggi
          ? [
              parseInt(inputMediaSignageFour.panjang),
              parseInt(inputMediaSignageFour.lebar),
              parseInt(inputMediaSignageFour.tinggi),
            ]
          : null,
    };
    // console.log("+++ reqBody", reqBody);
    setIsModalLoad(true);
    await doHitUpdateOrderNewTax(reqBody, handleModalLoad, handlePopUp).then(
      (res) => {
        console.log(res);
        console.log(reqBody);
      }
    );
  };

  /* State */
  const [status, setStatus] = useState("");
  const [payload, setPayload] = useState({
    firstTaxDate: "",
    lastTaxDate: "",
    taxRates: "",
    taxVendor: "",
    remark: "",
    orderType: "",
    signageAvailability: "",
  });

  const [mediaSignage, setMediaSignage] = useState([
    {
      id: 1,
      type: "",
      panjang: "",
      lebar: "",
      tinggi: "",
      visibility: "visible",
    },
    {
      id: 2,
      type: "",
      panjang: "",
      lebar: "",
      tinggi: "",
      visibility: "hidden",
    },
    {
      id: 3,
      type: "",
      panjang: "",
      lebar: "",
      tinggi: "",
      visibility: "hidden",
    },
    {
      id: 4,
      type: "",
      panjang: "",
      lebar: "",
      tinggi: "",
      visibility: "hidden",
    },
  ]);

  const [listOption, setListOption] = useState({
    taxVendor: [
      {
        value: "",
        name: "Pilih Nama Vendor",
        icon: <UserIcon />,
      },
    ],
    orderType: [
      {
        value: "test",
        name: "Pilih Tipe Orderan",
      },
    ],
    signageAvailability: [
      {
        value: "test",
        name: "Pilih Ketersediaan Signage",
      },
    ],
    mediaSignage: [
      {
        value: "test",
        name: "Pilih Signage",
      },
    ],
  });

  const [testingMedia, setTestingMedia] = useState(null);

  /* Static Data */
  function chipsHandler(type) {
    if (type === "Paid") {
      return "success";
    }
    return "error";
  }

  const statusOptionList = [
    { value: "0", name: "TIDAK BISA DIPROSES", icon: <StripIcon /> },
    { value: "1", name: "DONE", icon: <DoneIcon /> },
    { value: "2", name: "ASIGN TO VENDOR", icon: <DoingIcon /> },
    { value: "3", name: "ON PROGRESS", icon: <DoingIcon /> },
    { value: "4", name: "OVERDUE", icon: <StripIcon /> },
    { value: "5", name: "OPEN", icon: <DoingIcon /> },
  ];

  const tableHeader = [
    "",
    "Survey Objek Pajak",
    "Proses Daftar",
    "Review SKPD",
    "Cetak SKPD",
    "Proses Bayar",
    "Attach SKPD & SSPD",
    "No Invoice",
    "Status",
  ];

  const dummyTable = [
    {
      date: "12 Desember",
      year: "2022",
      list: [
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Paid" type={chipsHandler("Paid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
      ],
    },
    {
      date: "12 November",
      year: "2022",
      list: [
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Paid" type={chipsHandler("Paid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
      ],
    },
    {
      date: "9 November",
      year: "2022",
      list: [
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Paid" type={chipsHandler("Paid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
        {
          a: "12/12/2021",
          b: "12/12/2021",
          c: "12/12/2021",
          d: "12/12/2021",
          e: "12/12/2021",
          f: "12/12/2021",
          g: "1357258258",
          status: <TableChips label="Unpaid" type={chipsHandler("Unpaid")} />,
        },
      ],
    },
  ];

  /* Methods */
  function handleBackButton() {
    history.push(`/media-promosi/tracking-pengurusan-pajak`);
  }

  function handleChangeStatus(value) {
    setStatus(value);
  }

  function handleChangeRequest(event, key) {
    setPayload((prev) => {
      return {
        ...prev,
        [key]: event,
      };
    });
  }

  function handleAddMediaSignage() {
    if (inputMediaSignageTwo.visibility == "hidden")
      setInputMediaSignageTwo({
        ...inputMediaSignageTwo,
        visibility: "visible",
      });
    else if (inputMediaSignageThree.visibility == "hidden")
      setInputMediaSignageThree({
        ...inputMediaSignageThree,
        visibility: "visible",
      });
    else if (inputMediaSignageFour.visibility == "hidden")
      setInputMediaSignageFour({
        ...inputMediaSignageFour,
        visibility: "visible",
      });
  }

  const handleRemoveMediaSignage = () => {
    if (inputMediaSignageFour.visibility == "visible")
      setInputMediaSignageFour({
        ...inputMediaSignageFour,
        signageMediaFour: "",
        mediaSignageSizeFour: "",
        visibility: "hidden",
        panjang: "",
        lebar: "",
        tinggi: "",
      });
    else if (inputMediaSignageThree.visibility == "visible")
      setInputMediaSignageThree({
        ...inputMediaSignageThree,
        signageMediaThree: "",
        mediaSignageSizeThree: "",
        visibility: "hidden",
        panjang: "",
        lebar: "",
        tinggi: "",
      });
    else if (inputMediaSignageTwo.visibility == "visible")
      setInputMediaSignageTwo({
        ...inputMediaSignageTwo,
        signageMediaTwo: "",
        mediaSignageSizeTwo: "",
        visibility: "hidden",
        panjang: "",
        lebar: "",
        tinggi: "",
      });
  };

  const handleChangeMediaSignage1 = (key, event) => {
    event.persist();
    setInputMediaSignageOne({
      ...inputMediaSignageOne,
      [key]: event.target.value,
    });
  };
  const handleChangeMediaSignage2 = (key, event) => {
    event.persist();
    setInputMediaSignageTwo({
      ...inputMediaSignageTwo,
      [key]: event.target.value,
    });
  };
  const handleChangeMediaSignage3 = (key, event) => {
    event.persist();
    setInputMediaSignageThree({
      ...inputMediaSignageThree,
      [key]: event.target.value,
    });
  };
  const handleChangeMediaSignage4 = (key, event) => {
    event.persist();
    setInputMediaSignageFour({
      ...inputMediaSignageFour,
      [key]: event.target.value,
    });
  };

  const monthToString = (month) => {
    switch (month) {
      case 1:
        return "Januari";
        break;
      case 2:
        return "Februari";
        break;
      case 3:
        return "Maret";
        break;
      case 4:
        return "April";
        break;
      case 5:
        return "Mei";
        break;
      case 6:
        return "Juni";
        break;
      case 7:
        return "Juli";
        break;
      case 8:
        return "Agustus";
        break;
      case 9:
        return "September";
        break;
      case 10:
        return "Oktober";
        break;
      case 11:
        return "November";
        break;
      case 12:
        return "Desember";
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(inputMediaSignageOne.signageMediaOne);
  }, [inputMediaSignageOne.signageMediaOne]);

  const MediaSignageComponent = (props) => {
    const {
      index,
      value,
      onChangeValue,
      buttonIcon,
      onChangeButton,
      valueP,
      valueL,
      valueT,
      onChangeValueP,
      onChangeValueL,
      onChangeValueT,
      optionSelect,
      visibility,
      disabled,
      getOptionLabel,
    } = props;
    return (
      <TableRow className={classes.tableRow} style={{ visibility: visibility }}>
        <TableCell
          width="40%"
          className={classes.tableCell}
          style={{ verticalAlign: "top" }}
        >
          <div style={{ marginTop: "10px" }}>{`Media Signage ${index}`}</div>
        </TableCell>
        <TableCell className={classes.tableCell} style={{ fontWeight: 600 }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ flexWrap: "nowrap" }}
          >
            <Grid
              item
              style={{
                width: "100%",
              }}
            >
              {/* <SelectMui
                selectedValue={value}
                onSelectValueChange={onChangeValue}
                selectOptionData={optionSelect}
                disabled={disabled}
              /> */}
              <AutocompleteMui
                options={optionSelect}
                placeholder="Media Signage"
                getOptionLabel={(option) => option}
                value={value}
                onChange={onChangeValue}
                disabled={disabled}
              />
            </Grid>
            {disabled ? (
              ""
            ) : (
              <Grid item>
                <IconButton small onClick={onChangeButton}>
                  {buttonIcon}
                </IconButton>
              </Grid>
            )}
          </Grid>
          {/* <DimentionInput index={index} separator="X" /> */}
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <SingleInputField
                placeholder="P"
                type="text"
                value={valueP}
                onChange={onChangeValueP}
                disabled={disabled}
              />
            </Grid>
            <Grid item>
              <Typography>X</Typography>
            </Grid>
            <Grid item>
              <SingleInputField
                placeholder="L"
                value={valueL}
                onChange={onChangeValueL}
                disabled={disabled}
              />
            </Grid>
            <Grid item>
              <Typography>X</Typography>
            </Grid>
            <Grid item>
              <SingleInputField
                placeholder="T"
                value={valueT}
                onChange={onChangeValueT}
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    );
  };

  function HistoricalTable({ headers, data }) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {headers?.map((header) => {
              return <TableCell align="center">{header}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ? (
            <>
              {data?.map((row, rowIndex) => {
                const fullYear = new Date(row?.historyDate).getFullYear();
                const month = new Date(row?.historyDate).getMonth() + 1;
                const day = new Date(row?.historyDate).getDate();
                return (
                  <>
                    <TableRow
                      className={rowIndex % 2 === 0 && classes.tableRowCustom}
                    >
                      <TableCell
                        rowSpan={row.list?.length + 1}
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "#2B2F3C",
                          }}
                        >
                          {fullYear}
                        </Typography>
                        <Typography
                          style={{ fontSize: "12px", color: "#8D98B4" }}
                        >
                          {`${day} ${monthToString(month)}`}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px" }}
                      >
                        {row?.surveyObjectTax
                          ? formatDate(row?.surveyObjectTax)
                          : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px" }}
                      >
                        {row?.registerProcess
                          ? formatDate(row?.registerProcess)
                          : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px" }}
                      >
                        {row?.reviewSpkd ? formatDate(row?.reviewSpkd) : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px" }}
                      >
                        {row?.printSkpd ? formatDate(row?.printSkpd) : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px" }}
                      >
                        {row?.paymentProcess
                          ? formatDate(row?.paymentProcess)
                          : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px", color: "#dc241f" }}
                      >
                        {row?.attachment ? formatDate(row?.attachment) : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px", color: "#dc241f" }}
                      >
                        {row?.invoiceNo ? row?.invoiceNo : "-"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "12px 12px" }}
                      >
                        {row?.historyStatus ? (
                          <TableChips
                            label="Paid"
                            type={chipsHandler("paid")}
                          />
                        ) : (
                          <TableChips
                            label="Unpaid"
                            type={chipsHandler("unpaid")}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={headers?.length}>
                <Grid
                  container
                  alignContent="center"
                  justify="center"
                  style={{
                    height: 175,
                  }}
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
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
  HistoricalTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  };

  return (
    <div className={classes.root}>
      <Box>
        <Button
          className={classes.buttonText}
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            handleBackButton();
          }}
          style={{ marginBottom: "20px" }}
        >
          Back
        </Button>
      </Box>
      <Box style={{ marginBottom: "20px" }}>
        <Typography className={classes.title}>Detail</Typography>
      </Box>
      {isLoading ? (
        <div className={classes.loaderWrapper}>
          <LoadingView maxheight="100%" isTransparent />
        </div>
      ) : (
        <>
          {dataAPI && (
            <Box className={classes.container}>
              {/* Informasi Pajak */}
              <div style={{ marginBottom: "20px" }}>
                <Typography
                  className={classes.sectionTitle}
                  style={{ marginBottom: "10px" }}
                >
                  Informasi Pajak
                </Typography>
                <Divider className={classes.divider} />

                <Grid container style={{ marginTop: "20px" }} spacing={2}>
                  <Grid item xs={3}>
                    <Table size="small">
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          ATM ID
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.atmId}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Lokasi
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.locationName}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Alamat
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.locationAddress}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Kelurahan
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.subDistrict}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          SLA
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.sla} Days
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                  <Grid item xs={3}>
                    <Table size="small">
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Kecamatan
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.district}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Area
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.areaName}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          City
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.city}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Provinsi
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ fontWeight: 600 }}
                        >
                          : {dataAPI.province}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      className={classes.sectionTitle}
                      style={{ marginBottom: "10px" }}
                    >
                      Status
                    </Typography>
                    <SelectItemsIcon
                      selectOptionData={statusOptionList}
                      selectedValue={inputData.status}
                      onSelectValueChange={(newVal) =>
                        handleChangeStatus(newVal)
                      }
                      disabled
                    />
                    <Typography
                      style={{
                        fontWeight: 400,
                        fontStyle: "Italic",
                        color: "#8D98B4",
                        fontSize: "13px",
                        marginTop: "10px",
                      }}
                    >
                      *Status berubah menjadi <b>overdue</b> ketika due date
                      terlewati
                    </Typography>
                  </Grid>
                </Grid>
              </div>

              {/* Informasi CIMB */}
              <div style={{ marginBottom: "20px" }}>
                <Typography
                  className={classes.sectionTitle}
                  style={{ marginBottom: "10px" }}
                >
                  Informasi CIMB
                </Typography>
                <Divider className={classes.divider} />

                <Grid container style={{ marginTop: "20px" }} spacing={2}>
                  <Grid item xs={4}>
                    <Table size="small">
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Pajak Awal
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          <DatePicker
                            format="DD/MM/YYYY"
                            popupStyle={{ zIndex: 1500 }}
                            suffixIcon={<CalendarIcon />}
                            className={classes.datePicker}
                            value={
                              inputData.startTax
                                ? moment(inputData.startTax, "YYYY/MM/DD")
                                : ""
                            }
                            // value={inputData.endTax}
                            disabled={disableInput}
                            allowClear={false}
                            onChange={(newDate) => {
                              let valDate = "";
                              if (newDate === null) {
                                valDate = "";
                              } else {
                                valDate = newDate._d;
                              }
                              handleChangeDate("startTax", valDate);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Pajak Akhir
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          <DatePicker
                            format="DD/MM/YYYY"
                            popupStyle={{ zIndex: 1500 }}
                            suffixIcon={<CalendarIcon />}
                            className={classes.datePicker}
                            value={
                              inputData.endTax
                                ? moment(inputData.endTax, "YYYY/MM/DD")
                                : ""
                            }
                            // value={inputData.endTax}
                            disabled={disableInput}
                            allowClear={false}
                            onChange={(newDate) => {
                              let valDate = "";
                              if (newDate === null) {
                                valDate = "";
                              } else {
                                valDate = newDate._d;
                              }
                              handleChangeDate("endTax", valDate);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Nilai Pajak
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          <LabelTextField
                            placeholder="Nilai Pajak"
                            type="number"
                            value={inputData.taxValue}
                            disabled={disableInput}
                            currencyField
                            height="40px"
                            onChange={(e) => handleChange("taxValue", e)}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Vendor Pajak
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          <SelectLeftCustomIcon
                            leftIcon={<UserIcon style={{ height: 20 }} />}
                            selectOptionData={vendorOptions}
                            selectedValue={inputData.vendorId}
                            disabled={disableInput}
                            onSelectValueChange={(e) =>
                              handleSelect("vendorId", e)
                            }
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Remark
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          <LabelTextField
                            multiline
                            placeholder="Remark"
                            variant="outlined"
                            rows={4}
                            value={inputData.remark}
                            disabled={disableInput}
                            onChange={(e) => handleChange("remark", e)}
                          />
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                  <Grid item xs={4}>
                    <Table size="small">
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Type Orderan
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          {/* <LabelTextField
                            placeholder="Type Order"
                            type="string"
                            value={inputData.orderType}
                            height="40px"
                            onChange={(e) => handleChange("orderType", e)}
                          /> */}
                          <SelectMui
                            selectOptionData={optionTypeOrder}
                            selectedValue={inputData.orderType}
                            disabled={disableInput}
                            onSelectValueChange={(e) =>
                              handleSelect("orderType", e)
                            }
                          />
                          {/* <SelectMui
                        selectOptionData={optionTypeOrder}
                        selectedValue={inputData.orderType}
                        onSelectValueChange={(e) =>
                          handleSelect("orderType", e)
                        }
                        height="40px"
                        style={{ width: "80%" }}
                      /> */}
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Ketersediaan Signage Kepengurusan
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          <SelectMui
                            selectOptionData={optionSignaneAvailable}
                            selectedValue={inputData.signageAvailable}
                            disabled={disableInput}
                            onSelectValueChange={(e) =>
                              handleSelect("signageAvailable", e)
                            }
                            height="40px"
                            style={{ width: "80%" }}
                            defaultValue=""
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell width="40%" className={classes.tableCell}>
                          Bentuk Ukuran Signage
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          :&nbsp;
                          <SelectMui
                            selectOptionData={optionSignageLook}
                            selectedValue={inputData.signageSizeLook}
                            disabled={disableInput}
                            onSelectValueChange={(e) =>
                              handleSelect("signageSizeLook", e)
                            }
                            height="40px"
                            style={{ width: "80%" }}
                            defaultValue=""
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}></TableRow>
                      <MediaSignageComponent
                        index={1}
                        disabled={disableInput}
                        value={inputMediaSignageOne.signageMediaOne}
                        onChangeValue={(e, val) => {
                          console.log(val);
                          // if (val === null) {
                          //   setInputMediaSignageOne({
                          //     ...inputMediaSignageOne,
                          //     signageMediaOne: "",
                          //   });
                          // } else
                          setInputMediaSignageOne({
                            ...inputMediaSignageOne,
                            signageMediaOne: val ? val : "",
                          });
                        }}
                        optionSelect={optionMediaSignage2}
                        buttonIcon={<AddIcon />}
                        onChangeButton={handleAddMediaSignage}
                        valueP={inputMediaSignageOne.panjang}
                        valueL={inputMediaSignageOne.lebar}
                        valueT={inputMediaSignageOne.tinggi}
                        onChangeValueP={(e) => {
                          handleChangeMediaSignage1("panjang", e);
                        }}
                        onChangeValueL={(e) => {
                          handleChangeMediaSignage1("lebar", e);
                        }}
                        onChangeValueT={(e) => {
                          handleChangeMediaSignage1("tinggi", e);
                        }}
                        visibility={inputMediaSignageOne.visibility}
                      />
                      <MediaSignageComponent
                        index={2}
                        disabled={disableInput}
                        value={inputMediaSignageTwo.signageMediaTwo}
                        onChangeValue={(e, val) => {
                          if (val === null) {
                            setInputMediaSignageTwo({
                              ...inputMediaSignageTwo,
                              signageMediaTwo: "",
                            });
                          } else
                            setInputMediaSignageTwo({
                              ...inputMediaSignageTwo,
                              signageMediaTwo: val,
                            });
                        }}
                        optionSelect={optionMediaSignage2}
                        buttonIcon={<RemoveRoundedIcon />}
                        onChangeButton={handleRemoveMediaSignage}
                        valueP={inputMediaSignageTwo.panjang}
                        valueL={inputMediaSignageTwo.lebar}
                        valueT={inputMediaSignageTwo.tinggi}
                        onChangeValueP={(e) => {
                          handleChangeMediaSignage2("panjang", e);
                        }}
                        onChangeValueL={(e) => {
                          handleChangeMediaSignage2("lebar", e);
                        }}
                        onChangeValueT={(e) => {
                          handleChangeMediaSignage2("tinggi", e);
                        }}
                        visibility={inputMediaSignageTwo.visibility}
                      />
                    </Table>
                  </Grid>
                  <Grid item xs={4}>
                    <Table size="small">
                      <MediaSignageComponent
                        index={3}
                        disabled={disableInput}
                        value={inputMediaSignageThree.signageMediaThree}
                        onChangeValue={(e, val) => {
                          if (val === null) {
                            setInputMediaSignageThree({
                              ...inputMediaSignageThree,
                              signageMediaThree: "",
                            });
                          } else
                            setInputMediaSignageThree({
                              ...inputMediaSignageThree,
                              signageMediaThree: val,
                            });
                        }}
                        optionSelect={optionMediaSignage2}
                        buttonIcon={<RemoveRoundedIcon />}
                        onChangeButton={handleRemoveMediaSignage}
                        valueP={inputMediaSignageThree.panjang}
                        valueL={inputMediaSignageThree.lebar}
                        valueT={inputMediaSignageThree.tinggi}
                        onChangeValueP={(e) => {
                          handleChangeMediaSignage3("panjang", e);
                        }}
                        onChangeValueL={(e) => {
                          handleChangeMediaSignage3("lebar", e);
                        }}
                        onChangeValueT={(e) => {
                          handleChangeMediaSignage3("tinggi", e);
                        }}
                        visibility={inputMediaSignageThree.visibility}
                      />
                      <MediaSignageComponent
                        index={4}
                        disabled={disableInput}
                        value={inputMediaSignageFour.signageMediaFour}
                        onChangeValue={(e, val) => {
                          if (val === null) {
                            setInputMediaSignageFour({
                              ...inputMediaSignageFour,
                              signageMediaFour: "",
                            });
                          } else
                            setInputMediaSignageFour({
                              ...inputMediaSignageFour,
                              signageMediaFour: val,
                            });
                        }}
                        optionSelect={optionMediaSignage2}
                        buttonIcon={<RemoveRoundedIcon />}
                        onChangeButton={handleRemoveMediaSignage}
                        valueP={inputMediaSignageFour.panjang}
                        valueL={inputMediaSignageFour.lebar}
                        valueT={inputMediaSignageFour.tinggi}
                        onChangeValueP={(e) => {
                          handleChangeMediaSignage4("panjang", e);
                        }}
                        onChangeValueL={(e) => {
                          handleChangeMediaSignage4("lebar", e);
                        }}
                        onChangeValueT={(e) => {
                          handleChangeMediaSignage4("tinggi", e);
                        }}
                        visibility={inputMediaSignageFour.visibility}
                      />
                    </Table>
                  </Grid>
                </Grid>

                {disableInput ? (
                  ""
                ) : (
                  <Grid
                    container
                    style={{ marginTop: "20px" }}
                    justifyContent="flex-end"
                  >
                    <Grid item>
                      <MuiButton
                        label="Assign to Vendor"
                        height="38px"
                        onClick={handleAssignToVendor}
                      />
                    </Grid>
                  </Grid>
                )}
              </div>

              {/* History pembayaran pajak pertahun */}
              <div style={{ marginBottom: "20px" }}>
                <Typography
                  className={classes.sectionTitle}
                  style={{ marginBottom: "10px" }}
                >
                  History pembayaran pajak pertahun
                </Typography>
                <Divider className={classes.divider} />
                <HistoricalTable
                  headers={tableHeader}
                  data={dataAPI.logHistoryTax}
                />
              </div>
            </Box>
          )}
        </>
      )}
      <ModalLoader isOpen={isModalLoad} />
      <PopupSucces
        isOpen={popUpOpen}
        onClose={handleClosePopup}
        message="Task Berhasil Ditambahkan"
      />
    </div>
  );
};

export default TrackingPengurusanPajakDetail;
