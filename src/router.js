/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import React, { createContext, Suspense, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ref, set } from "firebase/database";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { I18nextProvider } from "react-i18next";
import moment from "moment";
import { useSessionStorage } from "react-use-sessionstorage";
import Axios from "axios";
import qs from "qs";
import _ from "lodash";

import i18n from "./helpers/i18next/i18n";
import store from "./helpers/store/store";

import ErrorBoundaries from "./containers/ErrorBoundaries";
import LoadingView from "./components/Loading/LoadingView";
import CIMBLoading from "./components/Loading/CIMBLoading";
import Container from "./layout";
import "./index.css";
import constansts from "./helpers/constants";
import secureStorage from "./helpers/secureStorage";
import PlanAndAnalytic from "./containers/PlanAndAnalytic";
import ProfilingSavedLoc from "./containers/PlanAndAnalytic/indexSavedLoc";
import ProfilingReject from "./containers/PlanAndAnalytic/indexReject";
// const PlanAndAnalytic = React.lazy(() =>
//   import('./containers/PlanAndAnalytic')
// );
import Monitoring from "./containers/Monitoring";
import OverviewMonitoring from "./containers/Monitoring/Overview/index";
import MasterDataMonitoring from "./containers/Monitoring/Master";
import EditMasterData from "./containers/Monitoring/Master/EditMasterData";
import EsqFaultAnalyzer from "./containers/Monitoring/EsqFaultAnalyzer";
import QueryProblem from "./containers/Monitoring/QueryProblem";
import QueryProblemDetail from "./containers/Monitoring/QueryProblem/Detail";
import EJAnalyzer from "./containers/Monitoring/EJAnalyzer";
import ResponCodeAnalyzer from "./containers/Monitoring/ResponCodeAnalyzer";
import AnomalyAlert from "./containers/Monitoring/AnomalyAlert";
import IntermittenAlert from "./containers/Monitoring/IntermittenAlert";
import IntermittenAlertDetail from "./containers/Monitoring/IntermittenAlert/Detail";
import MedicalRecord from "./containers/Monitoring/MedicalRecord";
import ReportUptime from "./containers/Monitoring/ReportUptime";
import ReportUptimeDetail from "./containers/Monitoring/ReportUptime/Detail";
import ConfigurationPage from "./containers/Monitoring/Configuration";
import Reliability from "./containers/Monitoring/Reliability";
import ReliabilityReport from "./containers/Monitoring/ReliabilityReport";
import ReliabilityDetail from "./containers/Monitoring/Reliability/Detail/MedicalRecord";
import DistributionEscalationShifting from "./containers/Monitoring/DistributionEscalationShifting";
import DetailDistribution from "./containers/Monitoring/DistributionEscalationShifting/Detail";
import MasterKey from "./containers/Monitoring/MasterKeyBAPenghancuran";
import DetailOrder from "./containers/Monitoring/MasterKeyBAPenghancuran/common/OrderDetail";
import BastDigitalBaPenghancuran from "./containers/Monitoring/MasterKeyBAPenghancuran/common/BastDigital";
import BaApproval from "./containers/Monitoring/BaAproval";
// const Monitoring = React.lazy(() => import('./containers/Monitoring'));
import Maintenance from "./containers/Maintenance";
import MaintenanceDetailKebersihan from "./containers/Maintenance/DetailKebersihan";
import MaintenanceKebersihan from "./containers/Maintenance/Kebersihan";
import HasilSurveyDetail from "./containers/Maintenance/Kebersihan/DetailHasilSurvey";
// const Maintenance = React.lazy(() => import('./containers/Maintenance'));
import OverviewNew from "./containers/OverviewNew";
// const OverviewNew = React.lazy(() => import('./containers/OverviewNew'));
import OverviewLama from "./containers/OverviewNew/indexlama";
// const OverviewLama = React.lazy(() =>
//   import('./containers/OverviewNew/indexlama')
// );
import Login from "./containers/Login";

// forgot password
import ForgotPassword from "./containers/ForgotPassword";
import OtpPage from "./containers/ForgotPassword/common/OtpPage";
import ConfirmPage from "./containers/ForgotPassword/common/ConfirmPage";
import ExpiredPage from "./containers/ForgotPassword/common/ExpiredPage";

// IMPORT CONTAINER FOR IMPLEMENTATION
import ImplementationDetail from "./containers/Implementation/ImplementationDetail";

import ImplementationCreateKebutuhan from "./containers/Implementation/cimb/TaskKebutuhan/CreateKebutuhan";
import ImplementationDetailKebutuhan from "./containers/Implementation/cimb/TaskKebutuhan/KebutuhanDetail";
import ImplementationEditKebutuhan from "./containers/Implementation/cimb/TaskKebutuhan/KebutuhanEdit";

import ImplementationCreateTaskMesin from "./containers/Implementation/cimb/TaskMesin/CreateNewTask";
import ImplementationEditTaskMesin from "./containers/Implementation/cimb/TaskMesin/EditTask";
import ImplementationDetailTaskMesin from "./containers/Implementation/cimb/TaskMesin/DetailTask";

import ImplVendorKebutuhan from "./containers/VendorManagement/Orders/Kebutuhan";
import ImplVendorTaskSignageOrderDetail from "./containers/VendorManagement/Orders/Signage/OrderDetail";
import ImplVendorTaskSignagePenawaranHarga from "./containers/VendorManagement/Orders/Signage/PenawaranHargaVendor";
import ImplCimbTaskSignagePenawaranHarga from "./containers/VendorManagement/Orders/Signage/PenawaranHargaCIMB";
import ImplVendorTaskSignageBASTDigital from "./containers/VendorManagement/Orders/Signage/BastDigital";
import ImplVendorTaskSignageBASTDigitalPreview from "./containers/VendorManagement/Orders/Signage/BastDigitalPreview";
import Config from "./containers/Implementation/Config";
import ImplVendorKebutuhanOrderDetail from "./containers/VendorManagement/Orders/Kebutuhan/OrderDetail";
import ImplVendorKebutuhanPenawaranHarga from "./containers/VendorManagement/Orders/Kebutuhan/PenawaranHargaVendor";
import ImplVendorKebutuhanBASTDigital from "./containers/VendorManagement/Orders/Kebutuhan/BastDigital";
import ImplVendorKebutuhanBASTPreview from "./containers/Implementation/cimb/TaskKebutuhan/KebutuhanEdit/BastPreview";
import ImplCimbKebutuhanPenawaranHarga from "./containers/VendorManagement/Orders/Kebutuhan/PenawaranHargaCIMB";

import ImplVendorKeamananPenawaranHarga from "./containers/VendorManagement/Orders/Keamanan/PenawaranHargaVendor";
import ImplCimbKeamananPenawaranHarga from "./containers/VendorManagement/Orders/Keamanan/PenawaranHargaCIMB";
import ImplVendorKeamananBASTDigital from "./containers/VendorManagement/Orders/Keamanan/BastDigital";
import CIMBKeamananBASTDigital from "./containers/VendorManagement/Orders/Keamanan/BastDigital/BastPreview";
import VendorManagementListBoothOrderDetail from "./containers/VendorManagement/Orders/ListBooth/OrderDetail";
import VendorManagementListBoothPenawaranVendor from "./containers/VendorManagement/Orders/ListBooth/PenawaranHargaVendor";
import VendorManagementListBoothPenawaranCimb from "./containers/VendorManagement/Orders/ListBooth/PenawaranHargaCIMB";
import VendorManagementListBoothBASTDigital from "./containers/VendorManagement/Orders/ListBooth/BastDigital";
import VendorManagementListBoothBASTDigitalPreview from "./containers/VendorManagement/Orders/ListBooth/BastDigitalPreview";

// MAINTENANCE
import VendorManagementMaintenancePenawaranVendor from "./containers/VendorManagement/Orders/Maintenance/PenawaranHargaVendor";
import VendorManagementMaintenancePenawaranCimb from "./containers/VendorManagement/Orders/Maintenance/PenawaranHargaCIMB";
import VendorManagementMaintenanceDetail from "./containers/VendorManagement/Orders/Maintenance/OrderDetail";
import VendorManagementMaintenanceBast from "./containers/VendorManagement/Orders/Maintenance/BastDigital";
import VendorManagementMaintenanceBastPreview from "./containers/VendorManagement/Orders/Maintenance/BastDigitalPreview";

// VENDOR ORDERS JARKOM
// import VendorManagementJarkom from "./containers/Implementation/vendor/Jarkom";
import VendorManagementJarkomOrderDetail from "./containers/VendorManagement/Orders/Jarkom/OrderDetail";
import VendorManagementJarkomBASTDigital from "./containers/VendorManagement/Orders/Jarkom/BastDigital";
import PreviewBastDigital from "./containers/VendorManagement/Orders/Jarkom/BastDigital/PreviewBastDigital";

import ImplVendorApproval from "./containers/VendorManagement/Orders/Approval";
import ImplVendorApprovalDetail from "./containers/VendorManagement/Orders/Approval/Detail";
// import ImplementationVendorKeamanan from "./containers/Implementation/vendor/Keamanan";
import ImplVendorMesin from "./containers/VendorManagement/Orders/Mesin";
import ImplVendorMesinDetail from "./containers/VendorManagement/Orders/Mesin/Detail";
import ImplVendorMesinPenawaranHarga from "./containers/VendorManagement/Orders/Mesin/PenawaranHargaVendor";
import ImplCimbMesinPenawaranHarga from "./containers/VendorManagement/Orders/Mesin/PenawaranHargaCIMB";
import ImplVendorMesinBASTDigital from "./containers/VendorManagement/Orders/Mesin/BastDigital";
import ImplVendorMesinBASTPreview from "./containers/VendorManagement/Orders/Mesin/BastPreview";
import KesiapanKeamanan from "./containers/Implementation/KesiapanKeamanan";
import SignageAndPajak from "./containers/Implementation/SignageAndPajak";
import Procurement from "./containers/Procurement";
// const Procurement = React.lazy(() => import('./containers/Procurement'));
import ProcurementDetail from "./containers/Procurement/ProcurementDetail";
// const ProcurementDetail = React.lazy(() =>
//   import('./containers/Procurement/ProcurementDetail')
// );
import UserManagement from "./containers/UserManagement";
// const UserManagement = React.lazy(() => import('./containers/UserManagement'));
import Document from "./containers/Document";
// const Document = React.lazy(() => import('./containers/Document'));
import RencanaBisnis from "./containers/RencanaBisnis";
// const RencanaBisnis = React.lazy(() => import('./containers/RencanaBisnis'));
import Forecasting from "./containers/Forecasting";
// const Forecasting = React.lazy(() => import('./containers/Forecasting'));
import ForecastingRenewalDetail from "./containers/Forecasting/renewalDetail";
// const ForecastingRenewalDetail = React.lazy(() =>
//   import('./containers/Forecasting/renewalDetail')
// );
import ForecastingTerminDetail from "./containers/Forecasting/terminDetail";
// const ForecastingTerminDetail = React.lazy(() =>
//   import('./containers/Forecasting/terminDetail')
// );
import AnalisaTrend from "./containers/AnalisaTrend";
// const AnalisaTrend = React.lazy(() => import('./containers/AnalisaTrend'));
import AnalyticData from "./containers/AnalyticData";
// const AnalyticData = React.lazy(() => import('./containers/AnalyticData'));
import Negotiation from "./containers/SiteAndManagement/Negotiation";
// const Negotiation = React.lazy(() => import('./containers/Negotiation'));
import NegotiationDetail from "./containers/SiteAndManagement/Negotiation/NegotiationDetail";
// const NegotiationDetail = React.lazy(() =>
//   import('./containers/Negotiation/NegotiationDetail')
// );
import Approval from "./containers/SiteAndManagement/Approval";
// const Approval = React.lazy(() => import('./containers/Approval'));
import GeneralDetail from "./containers/GeneralDetail";
// const GeneralDetail = React.lazy(() => import('./containers/GeneralDetail'));
import renewalDetail from "./containers/Modeling/ModelingRenewal/renewalDetail";
// const renewalDetail = React.lazy(() =>
//   import('./containers/Modeling/ModelingRenewal/renewalDetail')
// );
import terminDetail from "./containers/Modeling/ModelingTermin/terminDetail";
// const terminDetail = React.lazy(() =>
//   import('./containers/Modeling/ModelingTermin/terminDetail')
// );
// const RBBHistories = React.lazy(() =>
//   import('./containers/RBBData/RBBHistories')
// );
// const RBBNewAtm = React.lazy(() => import('./containers/RBBData/RBBNewAtm'));
// const RBBSummary = React.lazy(() => import('./containers/RBBData/RBBSummary'));
// const RBBTerminAtm = React.lazy(() =>
//   import('./containers/RBBData/RBBTerminAtm')
// );
import {
  ModelingModel,
  ModelingRemodeling,
  ModelingRenewal,
  ModelingTermin,
} from "./containers/Modeling";
// const ModelingModel = React.lazy(() =>
//   import('./containers/Modeling/ModelingModel')
// );
// const ModelingRemodeling = React.lazy(() =>
//   import('./containers/Modeling/ModelingRemodeling')
// );
// const ModelingRenewal = React.lazy(() =>
//   import('./containers/Modeling/ModelingRenewal')
// );
// const ModelingTermin = React.lazy(() =>
//   import('./containers/Modeling/ModelingTermin')
// );
import {
  // AtmStatusReport,
  ForecastingReport,
  ManagementReport,
} from "./containers/Reporting";
// const {
//   AtmStatusReport,
//   ForecastingReport,
//   ManagementReport,
// } = React.lazy(() => import('./containers/Reporting'));
import ApprovalDetail from "./containers/SiteAndManagement/Approval/ApprovalDetail";
// const ApprovalDetail = React.lazy(() =>
//   import('./containers/Approval/ApprovalDetail')
// );
import LocationProfilling from "./containers/LocationProfilling";
// const LocationProfilling = React.lazy(() =>
//   import('./containers/LocationProfilling')
// );
import LocationProfile from "./containers/LocationProfile";
// const LocationProfile = React.lazy(() =>
//   import('./containers/LocationProfile')
// );
import RBBData from "./containers/RBBData";
// const RBBData = React.lazy(() => import('./containers/RBBData'));
import EditNew from "./containers/RBBData/EditNew";
// const EditNew = React.lazy(() => import('./containers/RBBData/EditNew'));
import EditRenew from "./containers/RBBData/EditRenew";
// const EditRenew = React.lazy(() => import('./containers/RBBData/EditRenew'));
import EditTermin from "./containers/RBBData/EditTermin";
// const EditTermin = React.lazy(() => import('./containers/RBBData/EditTermin'));
import EditReplace from "./containers/RBBData/EditReplace";
import EditUnplanReplace from "./containers/RBBData/EditUnplanReplace";
import EditUnplanTermin from "./containers/RBBData/EditUnplanTermin";
// const EditUnplanTermin = React.lazy(() => import('./containers/RBBData/EditUnplanTermin'));
import EditUnplanRenewal from "./containers/RBBData/EditUnplanRenewal";
import Transaction from "./containers/DashboardTransaction";
// const Transaction = React.lazy(() =>
//   import('./containers/DashboardTransaction')
// );
import DashboardPopulation from "./containers/DashboardPopulation";
// const DashboardPopulation = React.lazy(() =>
//   import('./containers/DashboardPopulation')
// );
import PlanAnalytic from "./containers/PlanAnalytic";

// const PlanAnalytic = React.lazy(() => import('./containers/PlanAnalytic'));
import AnalyticDataDetail from "./containers/AnalyticData/AnalyticDataDetail";
// const AnalyticDataDetail = React.lazy(() =>
//   import('./containers/AnalyticData/AnalyticDataDetail')
// );
import BudgetCadangan from "./containers/Financial/FinancialBudgetCadangan";
// const BudgetCadangan = React.lazy(() => import('./containers/Financial/FinancialBudgetCadangan'));

import Financial from "./containers/Financial";
// const Financial = React.lazy(() => import('./containers/Financial'));

// import MemoPembayaran
import MemoPembayaran from "./containers/Financial/MemoPembayaran";
// const MemoPembayaran = React.lazy(() =>
//   import('./containers/MemoPembayaran')
// );

// import FinancialApproval
import FinancialApproval from "./containers/Financial/FinancialApproval";
// const FinancialApproval = React.lazy(() =>
//   import('./containers/FinancialApproval')
// );
// import FinancialApprovalDetail
import FinancialApprovalDetail from "./containers/Financial/FinancialApproval/AprovalDetail";
// const FinancialApprovalDetail = React.lazy(() =>
//   import('./containers/FinancialApproval/AprovalDetail')
// );

import FinancialStatus from "./containers/Financial/FinancialStatus";
// const FinancialStatus = React.lazy(() => import('./containers/Financial/FinancialStatus'))

// import BudgetTracking
import BudgetTracking from "./containers/Financial/FinancialBudgetTracking";
// const BudgetTracking = React.lazy(() => import('./containers/FinancialBudgetTracking'));
import BudgetTrackingDetails from "./containers/Financial/FinancialBudgetTracking/Details";
// const BudgetTrackingDetails = React.lazy(() => import('./containers/FinancialBudgetTracking/Details'));

// import SiteManagement
import SiteManagement from "./containers/SiteAndManagement";
// const SiteManagement = React.lazy(() => import('./containers/SiteAndManagement'));
import DocumentLegality from "./containers/SiteAndManagement/DocumentAndLegality";
// const DocumentLegality = React.lazy(() => import('./containers/SiteAndManagement/DocumentAndLegality'));
import DocLegalityDetails from "./containers/SiteAndManagement/DocumentAndLegality/DocLegalityDetails";
// const DocLegalityDetails = React.lazy(() => import('./containers/SiteAndManagement/DocumentAndLegality/DocLegalityDetails/subDetailNew'));

import ProgressList from "./containers/SiteAndManagement/ProgressList";
// const ProgressList = React.lazy(() => import('./containers/SiteAndManagement/ProgressList'));

// import Rbb Implementation
import RbbImplementation from "./containers/SiteAndManagement/RbbImplementation";
// const RbbImplementation = React.lazy(() => import('./containers/SiteAndManagement/RbbImplementation'));
// eslint-disable-next-line no-unused-vars
import Submission from "./containers/SiteAndManagement/Submission";
// const Submission = React.lazy(() => import('./containers/SiteAndManagement/Submission'));
import SubDetailNew from "./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailNew";
// const SubDetailNew = React.lazy(() => import('./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailNew'));
import SubDetailTermin from "./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailTermin";
// const SubDetailTermin = React.lazy(() => import('./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailTermin'));
import SubDetailRenewal from "./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailRenewal";
// const SubDetailRenewal = React.lazy(() => import('./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailRenewal'));
import SubDetailReplace from "./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailReplace";
// const SubDetailReplace = React.lazy(() => import('./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailReplace'));
import SubDetailMigration from "./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailMigration";
// const SubDetailMigration = React.lazy(() => import('./containers/SiteAndManagement/Submission/SubmissionDetail/subDetailMigration'));

// MASTER DATA //
import MasterData from "./containers/MasterData";
import MasterDataEdit from "./containers/MasterData/Edit";
import AppAudit from "./containers/AppAudit";
// const MasterData = React.lazy(()=> import('./containers/MasterData'));

import Dummy from "./containers/Dummy";
// const Dummy = React.lazy(() => import('./containers/Dummy'));

import EditUser from "./containers/UserManagement/EditUser";
import NewUser from "./containers/UserManagement/NewUser";
import EditRole from "./containers/UserRole/EditRole";
import NewRole from "./containers/UserRole/NewRole";

import Vendors from "./containers/Vendors";
import EditVendor from "./containers/Vendors/EditVendor";
import NewVendor from "./containers/Vendors/NewVendor";

import MenuManagement from "./containers/MenuManagement";

import UserRole from "./containers/UserRole";
import KesiapanBooth from "./containers/Implementation/DetailBooth";
import ProgressEditPipeline from "./containers/SiteAndManagement/ProgressList/ProgressEditPipeline";
import ProgressEditProfiling from "./containers/SiteAndManagement/ProgressList/ProgressEditProfiling";
import EditHistory from "./containers/MasterData/EditHistory";
import TaskJarkomDetail from "./containers/Implementation/cimb/taskJarkom/Detail";
import TaskAktivasiDetail from "./containers/Implementation/cimb/taskAktivasi/Detail";

// IMPLEMENTATION
import ImplementationOverview from "./containers/Implementation/Overview";
import ImplementationTracking from "./containers/Implementation/Tracking";
import ImplementationRollout from "./containers/Implementation/Rollout";

// IMPLEMENTATION TASK PARAMETER MIGRASI
import TaskParameterMigrasiDetail from "./containers/Implementation/cimb/taskParameterMigrasi/Detail";
import TaskParameterMigrasiCreate from "./containers/Implementation/cimb/taskParameterMigrasi/Create";
import TaskParameterMigrasiEdit from "./containers/Implementation/cimb/taskParameterMigrasi/Edit";

// IMPLEMENTATION TASK PARAMETER NEW TERMIN
import ParameterNewTerminCreate from "./containers/Implementation/cimb/TaskParameterNewTermin/Create";
import ParameterNewTerminDetail from "./containers/Implementation/cimb/TaskParameterNewTermin/Detail";
import ParameterNewTerminEdit from "./containers/Implementation/cimb/TaskParameterNewTermin/Edit";

// IMPLEMENTATION TASK BOOTH
import TaskBoothCreate from "./containers/Implementation/cimb/TaskBooth/Create";
import TaskBoothDetail from "./containers/Implementation/cimb/TaskBooth/Detail";
import TaskBoothEdit from "./containers/Implementation/cimb/TaskBooth/Edit";

// IMPLEMENTATION TASK STATUS TERMINASI
import TaskStatusTerminasiCreate from "./containers/Implementation/cimb/TaskStatusTerminasi/Create";
import TaskStatusTerminasiDetail from "./containers/Implementation/cimb/TaskStatusTerminasi/Detail";
import TaskStatusTerminasiEdit from "./containers/Implementation/cimb/TaskStatusTerminasi/Edit";

// IMPLEMENTATION TASK PARAMETER REPLACE
import ParameterReplaceCreate from "./containers/Implementation/cimb/TaskReplace/Create";
import ParameterReplaceDetail from "./containers/Implementation/cimb/TaskReplace/Detail";
import ParameterReplaceEdit from "./containers/Implementation/cimb/TaskReplace/Edit";

// IMPLEMENTATION TASK KEAMANAN
import TaskKeamananDetail from "./containers/Implementation/cimb/TaskKeamanan/Detail";
import TaskKeamananCreate from "./containers/Implementation/cimb/TaskKeamanan/Create";
import TaskKeamananEdit from "./containers/Implementation/cimb/TaskKeamanan/Edit";

// IMPLEMENTATION TASK KONFIRMASI SALDO 0
import TaskKonfirmasiSaldo0Detail from "./containers/Implementation/cimb/TaskKonfirmasiSaldo0/Detail";
import TaskKonfirmasiSaldo0Create from "./containers/Implementation/cimb/TaskKonfirmasiSaldo0/Create";
import TaskKonfirmasiSaldo0Edit from "./containers/Implementation/cimb/TaskKonfirmasiSaldo0/Edit";

// IMPLEMENTATION TASK PARAMETER SIGNAGE
import ParameterSignageCreate from "./containers/Implementation/cimb/TaskSignage/Create";
import ParameterSignageDetail from "./containers/Implementation/cimb/TaskSignage/Detail";
import ParameterSignageEdit from "./containers/Implementation/cimb/TaskSignage/Edit";

// VENDOR MANAGEMENT
import VendorManagement from "./containers/VendorManagement";
import DetailObjectPajak from "./containers/VendorManagement/Overview/DetailObjectPajak";
import VendorServiceCatalog from "./containers/VendorManagement/VendorAndServiceCatalog";
import VendorServiceCatalogDetail from "./containers/VendorManagement/VendorAndServiceCatalog/Detail";
import PartAndServicePricelist from "./containers/VendorManagement/PartAndServicePricelist";
import VendorManagementOrders from "./containers/VendorManagement/Orders";
import VendorManagementOrderGudang from "./containers/VendorManagement/Orders/Gudang";
import VendorManagementListBooth from "./containers/VendorManagement/Orders/ListBooth";
import VendorManagementAktivasiTerminasiBastDigital from "./containers/VendorManagement/Orders/AktivasiTerminasi/BastDigital";
import VendorManagementAktivasiTerminasiBastDigitalPreview from "./containers/VendorManagement/Orders/AktivasiTerminasi/BastDigitalPreview";
import VendorManagementAktivasiTerminasiOrderDetail from "./containers/VendorManagement/Orders/AktivasiTerminasi/OrderDetail";
import VendorManagementKeamananOrderDetail from "./containers/VendorManagement/Orders/Keamanan/OrderDetail";
import VendorManagementOrderParamaterReplaceDetail from "./containers/VendorManagement/Orders/Parameter/ParameterReplace/OrderDetail";
import VendorManagementOrderParameterNewTermin from "./containers/VendorManagement/Orders/Parameter/TaskParameterNewTermin/OrderDetail";
import VendorManagementOrderParameterMigrasi from "./containers/VendorManagement/Orders/Parameter/TaskParameterMigrasi/OrderDetail";

// USER PROFILE
import UserProfile from "./containers/UserProfile";

// DIGITALISASI CHECKLIST
import Scheduling from "./containers/VendorManagement/Digitalisasi/Scheduling";
import DigitalisasiCheck from "./containers/VendorManagement/Digitalisasi/CheclistResult";
import DigitalisasiSiteQuality from "./containers/VendorManagement/Digitalisasi/CheclistResult/VendorSiteQuality";
import VendorSLM from "./containers/VendorManagement/Digitalisasi/CheclistResult/VendorSLM";
import DigitalisasiVendorFlmRpl from "./containers/VendorManagement/Digitalisasi/CheclistResult/VendorFlmRpl";
import Ticketing from "./containers/VendorManagement/Digitalisasi/Ticketing";
import DigitalisasiVendorFLM from "./containers/VendorManagement/Digitalisasi/CheclistResult/VendorFLM";
import DigitalisasiVendorCCTV from "./containers/VendorManagement/Digitalisasi/CheclistResult/VendorCCTV";
import ConfigurationDigitalisasi from "./containers/VendorManagement/Digitalisasi/Configuration";
// ENVIRONMENT PREMISES
import VendorKebersihan from "./containers/EnvironmentPremises/ClearlinessQuality/ResultTab/VendorKebersihan";
import ClearlinessResult from "./containers/EnvironmentPremises/ClearlinessQuality/ResultTab";
import PremisessResult from "./containers/EnvironmentPremises/PremisesQuality/ResultTab";
import InventoryCassette from "./containers/VendorManagement/Digitalisasi/CheclistResult/InventoryCassette";
import VendorSiteSurvei from "./containers/EnvironmentPremises/PremisesQuality/VendorSiteSurvey";
import PraPascaBayar from "./containers/EnvironmentPremises/Pra&PascaBayar";
import VendorMaintenancePremises from "./containers/EnvironmentPremises/PremisesQuality/VendorMaintenance";
import StandarisasiPremises from "./containers/EnvironmentPremises/StandarisasiPremises";
import DetailPremises from "./containers/EnvironmentPremises/StandarisasiPremises/Detail";
import EnvironmentPremises from "./containers/EnvironmentPremises";
import AddSubCategoryPremises from "./containers/EnvironmentPremises/StandarisasiPremises/common/AddSubCategory";
import DetailPraPascaBayar from "./containers/EnvironmentPremises/Pra&PascaBayar/PageDetail/index";
import EditSubCategoryPremises from "./containers/EnvironmentPremises/StandarisasiPremises/common/EditSubCategory";

// PROJECT MANAGEMENT
import overviewProjectManagement from "./containers/ProjectManagement/Overview";
import timelineProject from "./containers/ProjectManagement/TimelineProject";

// MEDIA PROMOSI
import MediaPromosi from "./containers/MediaPromosi";
import VendorMediaPromosi from "./containers/MediaPromosi/MediaPromosiQuality";
import MediaPromosiQualityDetail from "./containers/MediaPromosi/MediaPromosiQuality/Detail";
import MediaPromosiEyeBowling from "./containers/MediaPromosi/MediaPromosiEyeBowling";
import TrackingPengurusanPajak from "./containers/MediaPromosi/TrackingPajak";
import TrackingPengurusanPajakDetail from "./containers/MediaPromosi/TrackingPengurusanPajak/Detail";
import StandarisasiMediaPromosi from "./containers/MediaPromosi/StandarisasiMediaPromosi";
import AddSubCategory from "./containers/MediaPromosi/StandarisasiMediaPromosi/common/AddSubCategory"; // Tambah Sub Category Standarisasi Media Promosi
import StandarisasiMediaPromosiDetail from "./containers/MediaPromosi/StandarisasiMediaPromosi/Detail";
import VendorPajak from "./containers/VendorManagement/VendorPajak";
import DetailVendorPajak from "./containers/VendorManagement/VendorPajak/DetailVendorPajak";
import MediaPromosiDetailPajak from "./containers/MediaPromosi/Overview/DetailObjectPajak";

// ASET MANAGEMENT
import AssetManagement from "./containers/AssetManagement";
import Klaim from "./containers/AssetManagement/Insurance/Klaim";
import DetailKlaimVendor from "./containers/AssetManagement/Insurance/Klaim/DetailKlaimVendor/index";
import InventoryMesin from "./containers/AssetManagement/InventoryAsset/InventoryMesin";
import DetailMesinATM from "./containers/AssetManagement/InventoryAsset/InventoryMesin/DetailMesinATM";
import DetailUPS from "./containers/AssetManagement/InventoryAsset/InventoryMesin/DetailUPS";
import DetailDVR from "./containers/AssetManagement/InventoryAsset/InventoryMesin/DetailDVR";
import PendaftaranAsuransi from "./containers/AssetManagement/PendaftaranAsuransi";
import DetailPendaftaranAsuransi from "./containers/AssetManagement/PendaftaranAsuransi/Detail";
import WerehouseManagement from "./containers/AssetManagement/WerehouseManagement/Werehouse/index";
import DetailMesinAtmWerehouse from "./containers/AssetManagement/WerehouseManagement/Werehouse/DetailMesinATM/index";
import DetailUPSWerehouse from "./containers/AssetManagement/WerehouseManagement/Werehouse/DetailUPS/index";
import DetailDVRWerehouse from "./containers/AssetManagement/WerehouseManagement/Werehouse/DetailDVR/index";
import ApprovalKlaim from "./containers/AssetManagement/ApprovalInsurance/ApprovalKlaim";
import DetailApprovalKlaim from "./containers/AssetManagement/ApprovalInsurance/ApprovalKlaim/detailKlaimApproval";
import ApprovalInsurance from "./containers/AssetManagement/ApprovalInsurance/ApprovalPendaftaran";
import RegisterApprovalDetail from "./containers/AssetManagement/ApprovalInsurance/ApprovalPendaftaran/detail";
import DetailKlaimEEI from "./containers/AssetManagement/Insurance/Klaim/DetailKlaimEEI";
import TambahKlaimMoneyInsurance from "./containers/AssetManagement/Insurance/Klaim/TambahKlaimMoneyInsurance";
import VerifikasiKlaim from "./containers/AssetManagement/Insurance/Klaim/VerifikasiKlaim";
import DetailKlaimApproval from "./containers/AssetManagement/Insurance/Klaim/DetailKlaimApproval";

// ADD-ONS
import TodoList from "./containers/AddOns/TodoList";
import EventScheduleNews from "./containers/AddOns/EventScheduleNews";
import TodoListAdd from "./containers/AddOns/TodoList/Add";
import TodoListDetail from "./containers/AddOns/TodoList/Detail";
import TodoListEdit from "./containers/AddOns/TodoList/Edit";
import ForumDiscussion from "./containers/AddOns/ForumDiscussion";
import ForumDiscussionAdd from "./containers/AddOns/ForumDiscussion/Add";
import DetailForumDiscussion from "./containers/AddOns/ForumDiscussion/Detail";
import AddEvent from "./containers/AddOns/EventScheduleNews/AddEvent";
import ForumDiscussEdit from "./containers/AddOns/ForumDiscussion/Edit";
import DetailEvent from "./containers/AddOns/EventScheduleNews/DetailEvent";
import DetailSchedule from "./containers/AddOns/EventScheduleNews/DetailSchedule";
import DetailNews from "./containers/AddOns/EventScheduleNews/DetailNews";
import ChatForum from "./containers/AddOns/ChatForum";
import DetailChatForum from "./containers/AddOns/ChatForum/detailChatForum";
import AddThread from "./containers/AddOns/ChatForum/AddThread";
import EditThread from "./containers/AddOns/ChatForum/EditThread";
import Configuration from "./containers/AddOns/Configuration";
import EditEvent from "./containers/AddOns/EventScheduleNews/EditEvent";

// FILE MANAGEMENT
import DocLegalitas from "./containers/FileManagement/DocLegalitas";
import DetailSKPD from "./containers/FileManagement/DocLegalitas/Detail";
import KnowledgeBase from "./containers/FileManagement/KnowledgeBase";
import DetailKnowledgeBase from "./containers/FileManagement/KnowledgeBase/Detail";
import DocControl from "./containers/FileManagement/DocControl";
import FolderViewDocControl from "./containers/FileManagement/DocControl/FolderView";
import PembuatanNoSurat from "./containers/FileManagement/PembuatanNoSurat";
import DocProject from "./containers/FileManagement/DocProject";
import ApprovalFileManagement from "./containers/FileManagement/ApprovalFileManagement";
import DocumentInvoice from "./containers/FileManagement/DocumentInvoice/index";
import DocumentInvoiceDetail from "./containers/FileManagement/DocumentInvoice/PageDetail";
import DocBast from "./containers/FileManagement/DocBast";
import FolderViewDocProject from "./containers/FileManagement/DocProject/FolderView";
import DocBastDetail from "./containers/FileManagement/DocBast/Detail";
import ConfigurationFileManagement from "./containers/FileManagement/Configuration";
import DetailDocControl from "./containers/FileManagement/Configuration/DocControl/Detail";
import DetailConfigKnowledgeBase from "./containers/FileManagement/Configuration/KnowledgeBase/Detail";
import DetailConfigurationDocProject from "./containers/FileManagement/Configuration/DocProject/Detail";
import AddFileDocControl from "./containers/FileManagement/Configuration/DocControl/AddFile";
import AddFileDocProject from "./containers/FileManagement/Configuration/DocProject/AddFile";
import AddFileKnowledgeBase from "./containers/FileManagement/Configuration/KnowledgeBase/AddFile";
import DocPreview from "./containers/FileManagement/DocPreview";
import { db } from "./helpers/firebase/config";
import { useAuthListener } from "./helpers/firebase/useAuthListener";
import { signOutFirebase } from "./helpers/firebase/signOutFirebase";

const { Header, Content } = Layout;

export const RootContext = createContext();

const AppProvider = RootContext.Provider;

const { CancelToken } = Axios;
const source = CancelToken.source();

const AppIndex = () => {
  const [tokenExpired, setTokenExpired] = useSessionStorage("tokenExpired");
  const [userId, setUserId] = useSessionStorage("userId");
  const [accessToken, setAccessToken] = useState(
    secureStorage.getItem("access_token")
  );
  const [userRoleName, setUserRoleName] = useSessionStorage("roleName");
  const [userFullName, setUserFullName] = useSessionStorage("userFullName");
  const [isOpenModalRefresh, setIsOpenModalRefresh] = useState(false);
  const [userMenus, setUserMenus] = useState([]);
  const [userSignature, setUserSignature] = useState([]);
  const [userAreas, setUserAreas] = useState([]);
  const [tokenTimeout, setTokenTimeout] = useState();
  const [popupTimeout, setPopupTimeout] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userDivision, setUserDivision] = useState("");
  const [userVendorId, setUserVendorId] = useSessionStorage(null);

  const { userData } = useAuthListener();

  useEffect(() => {
    console.log("~ userRoleName", userRoleName);
  }, [userRoleName]);

  function setExpired(expired) {
    setTokenExpired(+expired);
  }

  const onBeforeunload = (e) => {
    // console.log("+++ beforeunload happened!");
    // console.log("+++ userData", userData);
    if(userData){
      // console.log("+++ offline!");
      const updates = {...userData, isOnline: false};
      set(ref(db, `users/${userData.userId}`), updates);
    };
  };

  useEffect(() => {
    window.addEventListener('unload', onBeforeunload);
    return () => {
      window.removeEventListener('unload', onBeforeunload);
    };
  });
  // useBeforeunload(() => onBeforeunload());

  function checkTokenExpired() {
    // console.log(tokenExpired);
    const expired = moment(tokenExpired * 1); // .subtract(5, 'minutes'); // expired kurangi 5 menit untuk jeda
    const isAfter = moment().isAfter(expired); // apakah sudah lewat?
    // console.log(
    //   'isAfter',
    //   isAfter,
    //   'expired',
    //   expired.format(),
    // 'tokenExpired',
    // tokenExpired
    // );
    const schedule = isAfter ? 0 : expired.diff(moment());
    // console.log('schedule in miliseconds', schedule);
    const refresh_token = secureStorage.getItem("refresh_token");
    clearTimeout(tokenTimeout);
    const theTokenTimeout = setTimeout(() => {
      if (refresh_token) {
        refreshToken().catch((err) => {
          console.log("~ err", err);
        });
      } else {
        goToHome();
      }
    }, schedule);
    setTokenTimeout(theTokenTimeout);
    // schedulePopup()
  }

  // function schedulePopup() {
  //   const { popupTimeout: pTimeout } = constansts;
  //   const refresh_token = secureStorage.getItem('refresh_token');
  //   clearTimeout(popupTimeout);
  //   // console.log('Reschedule popup in minutes', pTimeout);
  //   const thePopupTimeout = setTimeout(() => {
  //     if (refresh_token) {
  //       setIsOpenModalRefresh(true);
  //     } else {
  //       goToHome();
  //     }
  //   }, pTimeout * 60 * 1000);
  //   setPopupTimeout(thePopupTimeout);
  // }

  useEffect(() => {
    const axiosInterceptor = Axios.interceptors.request.use(
      (request) => {
        // schedulePopup();
        return request;
      },
      (error) => {
        return error;
      }
    );
    return () => {
      Axios.interceptors.request.eject(axiosInterceptor);
    };
  }, []);

  useEffect(() => {
    checkTokenExpired();
  }, [tokenExpired]);

  function refreshToken() {
    const refresh_token = secureStorage.getItem("refresh_token");
    return new Promise((resolve, reject) => {
      const data = qs.stringify({ grant_type: "refresh_token", refresh_token });
      Axios({
        url: `${constansts.apiDomain}/oauth/token`,
        method: "post",
        data,
        auth: {
          username: "clientId",
          password: "secret",
        },
        cancelToken: source.token,
      })
        .then(saveToken)
        .catch((err) => {
          // console.log('~ err', err)
          // console.log(err.response.data.error);
          const error = err.response?.data?.error;
          if (error !== "invalid_token" && error !== "Internal Server Error") {
            // syarat2 belum invalid
            reject(err);
          } else {
            // console.log('go home');
            reject(err);
            goToHome();
          }
        });
    });
  }

  function logout() {
    source.cancel("User logout.");
    secureStorage.removeItem("role_name");
    secureStorage.removeItem("refresh_token");
    secureStorage.removeItem("access_token");
    sessionStorage.removeItem("directPathname");
    signOutFirebase(userData);
    goToHome();
  }

  function goToHome() {
    if (
      window.location.pathname !== "/" &&
      !window.location.pathname.includes("/login")
    ) {
      window.location.href = "/";
      // console.log(window.location.pathname)
      // alert('Session Anda telah habis.');
    }
  }

  function saveToken(res) {
    // console.log("+++ save TOKEN", res.data);
    const {
      refresh_token,
      access_token,
      expires_in,
      user_id,
      full_name,
      role,
      vendorId,
    } = res.data;
    const expired = moment().add(expires_in || 600, "seconds");
    // console.log(res.data);
    if (access_token && refresh_token) {
      secureStorage.setItem("role_name", role);
      secureStorage.setItem("access_token", access_token);
      secureStorage.setItem("refresh_token", refresh_token);
      setAccessToken(access_token);
      setExpired(expired);
      setUserId(user_id);
      setUserFullName(full_name);
      setIsOpenModalRefresh(false);
      setUserRoleName(role);
      setUserVendorId(vendorId);
      // console.log(expired.format());
    }
  }

  useEffect(() => {
    // ===> Start EMAIL Link Handler <===
    const directPathname = window.location.pathname;
    // console.log('<><> directPathname', directPathname);
    if (directPathname !== "/") {
      sessionStorage.setItem(
        "directPathname",
        directPathname + window.location.search
      );
    }
    // ===> End EMAIL Link Handler <===
    if (accessToken) {
      Axios({
        url: `${constansts.userServiceBaseUrl}/users/profile`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          // console.log("+++ profile",res);
          if (res.data.status === "success") {
            setUserRoleName(res.data.data.roleName);
            setUserMenus(res.data.data.menus);
            setUserAreas(
              res.data.data.areas?.split(",").map((val) => val * 1) || []
            );
            setUserSignature(res.data.data.signatureUrl);
            setUserEmail(res.data.data.email);
            setUserPhone(res.data.data.phoneNumber);
            setUserDivision(res.data.data.divisionName);
            setUserVendorId(res.data.data.vendorId);
          }
        })
        .catch((err) => console.log(err));
    } else {
      goToHome();
      // alert('Access Token does not exist');
    }
  }, [accessToken]);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AppProvider
          value={{
            saveToken,
            refreshToken,
            logout,
            tokenExpired,
            userId,
            userRoleName,
            userFullName,
            isOpenModalRefresh,
            userMenus,
            userAreas,
            userSignature,
            userEmail,
            userPhone,
            userDivision,
            userVendorId,
          }}
        >
          <Container>
            <ErrorBoundaries>
              {/* <Suspense fallback={LoadingView}> */}
              <Content
                style={{
                  width: "100%",
                }}
              >
                <Switch>
                  <Route exact path="/" component={Login} />
                  {/* <Route exact path="/loading" component={LoadingView} /> */}
                  <Route exact path="/loading" component={CIMBLoading} />
                  <Route exact path="/overview" component={OverviewLama} />
                  <Route
                    exact
                    path="/dashboard-overview"
                    component={OverviewNew}
                  />
                  <Route
                    exact
                    path="/dashboard-transaction"
                    component={Transaction}
                  />
                  <Route
                    exact
                    path="/dashboard-population"
                    component={DashboardPopulation}
                  />
                  <Route
                    exact
                    path="/acquisition"
                    component={PlanAndAnalytic}
                  />
                  <Route
                    exact
                    path="/acquisition/savedLocation"
                    component={ProfilingSavedLoc}
                  />
                  <Route
                    exact
                    path="/acquisition/reject"
                    component={ProfilingReject}
                  />
                  <Route path="/plan-analytic" component={PlanAnalytic} />
                  <Route
                    exact
                    path="/acquisition/profiling"
                    component={LocationProfilling}
                  />
                  {/* <Route
                    exact
                    path="/acquisition/profiling2"
                    component={LocationProfile}
                  /> */}
                  <Route exact path="/negotiation" component={Negotiation} />
                  <Route
                    exact
                    path="/negotiation/detail/:id"
                    component={NegotiationDetail}
                  />

                  {/* ROUTE MONITORING */}
                  {/* <Route exact path="/monitoring" component={Monitoring} /> */}
                  <Route
                    exact
                    path="/monitoring/esq-fault-analyzer"
                    component={EsqFaultAnalyzer}
                  />
                  <Route
                    exact
                    path="/monitoring/query-problem"
                    component={QueryProblem}
                  />
                  <Route
                    exact
                    path="/monitoring/query-problem/detail/:id"
                    component={QueryProblemDetail}
                  />
                  <Route
                    exact
                    path="/monitoring/ej-analyzer"
                    component={EJAnalyzer}
                  />
                  <Route
                    exact
                    path="/monitoring/respon-code-analyzer"
                    component={ResponCodeAnalyzer}
                  />
                  <Route
                    exact
                    path="/monitoring/anomaly-alert"
                    component={AnomalyAlert}
                  />
                  <Route
                    exact
                    path={["/monitoring/overview", "/monitoring"]}
                    component={OverviewMonitoring}
                  />
                  <Route
                    exact
                    path="/monitoring/master"
                    component={MasterDataMonitoring}
                  />
                  <Route
                    exact
                    path="/monitoring/master/edit/:id"
                    component={EditMasterData}
                  />
                  <Route
                    exact
                    path="/monitoring/intermitten-alert"
                    component={IntermittenAlert}
                  />
                  <Route
                    exact
                    path="/monitoring/intermitten-alert/detail/:id"
                    component={IntermittenAlertDetail}
                  />
                  <Route
                    exact
                    path="/monitoring/medical-record"
                    component={MedicalRecord}
                  />
                  <Route
                    exact
                    path="/monitoring/report-uptime"
                    component={ReportUptime}
                  />
                  <Route
                    exact
                    path="/monitoring/report-uptime/detail/:id"
                    component={ReportUptimeDetail}
                  />
                  <Route
                    exact
                    path="/vendor-monitoring/report-uptime"
                    component={ReportUptime}
                  />
                  <Route
                    exact
                    path="/vendor-monitoring/report-uptime/detail/:id"
                    component={ReportUptimeDetail}
                  />
                  <Route
                    exact
                    path="/monitoring/configuration"
                    component={ConfigurationPage}
                  />
                  <Route
                    exact
                    path="/monitoring/reliability"
                    component={Reliability}
                  />
                  <Route
                    exact
                    path="/monitoring/reliability-report"
                    component={ReliabilityReport}
                  />
                  <Route
                    exact
                    path="/monitoring/reliability/detail/:id"
                    component={ReliabilityDetail}
                  />
                  <Route
                    exact
                    path="/monitoring/ticket-distribution"
                    component={DistributionEscalationShifting}
                  />
                  <Route
                    exact
                    path="/monitoring/ticket-distribution/:id"
                    component={DetailDistribution}
                  />
                  <Route
                    exact
                    path="/monitoring/key-penghancuran"
                    component={MasterKey}
                  />
                  <Route
                    exact
                    path="/monitoring/key-penghancuran/order/:id"
                    component={DetailOrder}
                  />
                  <Route
                    exact
                    path="/monitoring/key-penghancuran/order/bast-digital-preview/:id"
                    component={BastDigitalBaPenghancuran}
                  />
                  <Route
                    exact
                    path="/monitoring/ba-approval"
                    component={BaApproval}
                  />
                  {/* ROUTE MAINTENANCE */}
                  <Route exact path="/maintenance" component={Maintenance} />
                  <Route
                    exact
                    path="/maintenance-detail-kebersihan"
                    component={MaintenanceDetailKebersihan}
                  />
                  <Route
                    exact
                    path="/maintenance/kebersihan"
                    component={MaintenanceKebersihan}
                  />
                  <Route
                    exact
                    path="/maintenance/kebersihan/hasil-survey"
                    component={HasilSurveyDetail}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                  <Route
                    exact
                    path="/forgot-password-otp-page"
                    component={OtpPage}
                  />
                  <Route
                    exact
                    path="/forgot-password-confirm-reset-password"
                    component={ConfirmPage}
                  />
                  <Route
                    exact
                    path="/forgot-password-expired-page"
                    component={ExpiredPage}
                  />
                  <Route
                    exact
                    path="/implementation/overview"
                    component={ImplementationOverview}
                  />
                  <Route
                    exact
                    path="/implementation/config"
                    component={Config}
                  />
                  <Route
                    exact
                    path="/implementation/"
                    component={ImplementationTracking}
                  />
                  <Route
                    exact
                    path="/implementation/rollout"
                    component={ImplementationRollout}
                  />

                  {/* <Route
                    exact
                    path="/implementation/detail/:id/jarkom"
                    component={ImplementationDetailJarkom}
                  />
                  <Route
                    exact
                    path="/implementation/activation"
                    component={ImplementationActivation}
                  />
                  <Route
                    exact
                    path="/implementation/requestion-detail"
                    component={ImplementationRequestionDetail}
                  />
                  <Route
                    exact
                    path="/implementation/report"
                    component={ImplementationReport}
                  />
                  <Route
                    exact
                    path="/implementation/parameter-team"
                    component={ImplementationParameterTeam}
                  />
                  <Route
                    exact
                    path="/implementation/parameter-atm"
                    component={ImplementationParameterAtm}
                  />
                  <Route
                    exact
                    path="/implementation/parameter-finance"
                    component={ImplementationParameterFinance}
                  />
                  <Route
                    exact
                    path="/implementation/parameter-network"
                    component={ImplementationParameterNetwork}
                  />
                  <Route
                    exact
                    path="/implementation/parameter-devops"
                    component={ImplementationParameterNetwork}
                  />
                  <Route
                    exact
                    path="/implementation/parameter-recons"
                    component={ImplementationParameterNetwork}
                  />
                  <Route
                    exact
                    path="/implementation/kesiapan-mesin"
                    component={ImplementationKesiapanMesin}
                  /> */}
                  {/* ROUTE IMPLEMENTATION DETAIL */}
                  <Route
                    exact
                    path="/implementation/:id"
                    component={ImplementationDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/need/create"
                    component={ImplementationCreateKebutuhan}
                  />
                  <Route
                    exact
                    path="/implementation/task/need/:taskId"
                    component={ImplementationDetailKebutuhan}
                  />
                  <Route
                    exact
                    path="/implementation/task/need/:taskId/edit"
                    component={ImplementationEditKebutuhan}
                  />
                  <Route
                    exact
                    path="/implementation/task/bast-digital-preview/:id"
                    component={ImplVendorKebutuhanBASTPreview}
                  />
                  <Route
                    exact
                    path="/implementation/task/mesin/create"
                    component={ImplementationCreateTaskMesin}
                  />
                  <Route
                    exact
                    path="/implementation/task/mesin/:taskId/edit"
                    component={ImplementationEditTaskMesin}
                  />
                  <Route
                    exact
                    path="/implementation/task/mesin/:taskId"
                    component={ImplementationDetailTaskMesin}
                  />
                  <Route
                    exact
                    path="/implementation/edit-task-mesin"
                    component={ImplementationEditTaskMesin}
                  />
                  <Route
                    exact
                    path="/implementation/detail-task-mesin"
                    component={ImplementationDetailTaskMesin}
                  />
                  {/* ROUTE IMPLEMENTATION VENDOR */}
                  <Route
                    exact
                    path="/vendor-management/orders/kebutuhan"
                    component={ImplVendorKebutuhan}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/booth"
                    component={VendorManagementListBooth}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/booth/:taskId",
                      "/vendor-orders/booth/:taskId",
                    ]}
                    component={VendorManagementListBoothOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/booth/penawaran-harga/:id"
                    component={VendorManagementListBoothPenawaranCimb}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/booth/bast-digital/:id",
                      "/vendor-orders/booth/bast-digital/:id",
                    ]}
                    component={VendorManagementListBoothBASTDigital}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/booth/bast-digital-preview/:id"
                    component={VendorManagementListBoothBASTDigitalPreview}
                  />
                  {/* <Route
                    exact
                    path="/implementation/vendor/main-jarkom"
                    component={VendorManagementJarkom}
                  /> */}
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/jarkom/:id",
                      "/vendor-orders/jarkom/:id",
                    ]}
                    component={VendorManagementJarkomOrderDetail}
                  />
                  {/* <Route
                    exact
                    path="/implementation/vendor/main-jarkom/bast-digital/:id"
                    component={VendorManagementJarkomBASTDigital}
                  /> */}
                  <Route
                    exact
                    path="/vendor-orders/jarkom/penawaran-harga/:id"
                    component={VendorManagementJarkomOrderDetail}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/jarkom/bast-digital/:id",
                      "/vendor-orders/jarkom/bast-digital/:id",
                    ]}
                    component={VendorManagementJarkomBASTDigital}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/jarkom/bast-digital-preview/:id"
                    component={PreviewBastDigital}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/mesin",
                      "/vendor-orders/mesin",
                    ]}
                    component={ImplVendorMesin}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/mesin/:id",
                      "/vendor-orders/mesin/:id",
                    ]}
                    component={ImplVendorMesinDetail}
                  />
                  <Route
                    exact
                    path={["/vendor-orders/mesin/penawaran-harga/:id"]}
                    component={ImplVendorMesinPenawaranHarga}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/mesin/penawaran-harga/:id",
                    ]}
                    component={ImplCimbMesinPenawaranHarga}
                  />
                  {/* MAINTENANCE */}
                  <Route
                    exact
                    path="/vendor-orders/maintenance/penawaran-harga/:id"
                    component={VendorManagementMaintenancePenawaranVendor}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/maintenance/penawaran-harga/:id"
                    component={VendorManagementMaintenancePenawaranCimb}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/maintenance/:id",
                      "/vendor-orders/maintenance/:id",
                    ]}
                    component={VendorManagementMaintenanceDetail}
                  />
                  <Route
                    exact
                    path="/vendor-orders/maintenance/bast-digital/:id"
                    component={VendorManagementMaintenanceBast}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/maintenance/bast-digital-preview/:id"
                    component={VendorManagementMaintenanceBastPreview}
                  />

                  <Route
                    exact
                    path={["/vendor-orders/mesin/bast-digital/:id"]}
                    component={ImplVendorMesinBASTDigital}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/mesin/bast-digital-preview/:id"
                    component={ImplVendorMesinBASTPreview}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-orders/aktivasi/bast-digital/:id",
                      "/vendor-orders/terminasi/bast-digital/:id",
                    ]}
                    component={VendorManagementAktivasiTerminasiBastDigital}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/aktivasi/bast-digital-preview/:id",
                      "/vendor-management/orders/terminasi/bast-digital-preview/:id",
                    ]}
                    component={
                      VendorManagementAktivasiTerminasiBastDigitalPreview
                    }
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/terminasi/:id"
                    component={VendorManagementAktivasiTerminasiOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/aktivasi/:id"
                    component={VendorManagementAktivasiTerminasiOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-orders/terminasi/:id"
                    component={VendorManagementAktivasiTerminasiOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-orders/aktivasi/:id"
                    component={VendorManagementAktivasiTerminasiOrderDetail}
                  />
                  {/* <Route
                    exact
                    path="/implementation/vendor/main-keamanan"
                    component={ImplementationVendorKeamanan}
                  /> */}
                  <Route
                    exact
                    path="/vendor-management/approval"
                    component={ImplVendorApproval}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/approval/:approvalId/detail"
                    component={ImplVendorApprovalDetail}
                  />
                  <Route
                    exact
                    path="/kesiapan-keamanan"
                    component={KesiapanKeamanan}
                  />
                  <Route
                    exact
                    path="/signage-pajak"
                    component={SignageAndPajak}
                  />
                  <Route exact path="/procurement" component={Procurement} />
                  <Route
                    exact
                    path="/procurement/detail"
                    component={ProcurementDetail}
                  />
                  <Route
                    exact
                    path="/user-management"
                    component={UserManagement}
                  />
                  <Route exact path="/document" component={Document} />

                  {/* Route For Sub Implementation Detail */}
                  <Route
                    exact
                    path="/implementation/detail/:id/kesiapan-booth"
                    component={KesiapanBooth}
                  />

                  {/* Route For Sub Implementation Detail Task */}
                  <Route
                    exact
                    path={[
                      "/implementation/task/jarkom/create",
                      "/implementation/task/jarkom/:id",
                      "/implementation/task/jarkom/:id/edit",
                    ]}
                    component={TaskJarkomDetail}
                  />
                  <Route
                    exact
                    path={[
                      "/implementation/task/activation/create",
                      "/implementation/task/activation/:id",
                      "/implementation/task/activation/:id/edit",
                    ]}
                    component={TaskAktivasiDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter-migrasi/create"
                    component={TaskParameterMigrasiCreate}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter-migrasi/:id"
                    component={TaskParameterMigrasiDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter-migrasi/:id/edit"
                    component={TaskParameterMigrasiEdit}
                  />
                  {/* ROUTE TASK SECURITY */}
                  <Route
                    exact
                    path="/implementation/task/security/create"
                    component={TaskKeamananCreate}
                  />
                  <Route
                    exact
                    path="/implementation/task/security/:taskId"
                    component={TaskKeamananDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/security/:taskId/edit"
                    component={TaskKeamananEdit}
                  />
                  {/* ROUTE KEAMANAN VENDOR/CIMB */}
                  <Route
                    exact
                    path="/vendor-management/orders/keamanan/:id"
                    component={VendorManagementKeamananOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-orders/keamanan/:id"
                    component={VendorManagementKeamananOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/keamanan/penawaran-harga/:id"
                    component={ImplCimbKeamananPenawaranHarga}
                  />
                  <Route
                    exact
                    path="/vendor-orders/keamanan/penawaran-harga/:id"
                    component={ImplVendorKeamananPenawaranHarga}
                  />
                  <Route
                    exact
                    path="/vendor-orders/keamanan/bast-digital/:id"
                    component={ImplVendorKeamananBASTDigital}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/keamanan/bast-digital-preview/:id"
                    component={CIMBKeamananBASTDigital}
                  />
                  {/* ROUTE TASK konfirmasi-saldo-0 */}
                  <Route
                    exact
                    path="/implementation/task/balance/create"
                    component={TaskKonfirmasiSaldo0Create}
                  />
                  <Route
                    exact
                    path="/implementation/task/balance/:taskId"
                    component={TaskKonfirmasiSaldo0Detail}
                  />
                  <Route
                    exact
                    path="/implementation/task/balance/:taskId/edit"
                    component={TaskKonfirmasiSaldo0Edit}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter/create"
                    component={ParameterNewTerminCreate}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter/:taskId"
                    component={ParameterNewTerminDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter/:taskId/edit"
                    component={ParameterNewTerminEdit}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/kebutuhan/:id"
                    component={ImplVendorKebutuhanOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-orders/kebutuhan/penawaran-harga/:id"
                    component={ImplVendorKebutuhanPenawaranHarga}
                  />
                  <Route
                    exact
                    path="/vendor-orders/booth/penawaran-harga/:id"
                    component={VendorManagementListBoothPenawaranVendor}
                  />
                  <Route
                    exact
                    path="/vendor-orders/kebutuhan/bast-digital/:id"
                    component={ImplVendorKebutuhanBASTDigital}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/kebutuhan/bast-digital-preview/:id"
                    component={ImplVendorKebutuhanBASTPreview}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/signage/:id",
                      "/vendor-orders/signage/:id",
                    ]}
                    component={ImplVendorTaskSignageOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-orders/signage/penawaran-harga/:id"
                    component={ImplVendorTaskSignagePenawaranHarga}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/signage/penawaran-harga/:id"
                    component={ImplCimbTaskSignagePenawaranHarga}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-orders/signage/bast-digital/:id",
                      "/vendor-management/orders/signage/bast-digital/:id",
                    ]}
                    component={ImplVendorTaskSignageBASTDigital}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/signage/bast-digital-preview/:id"
                    component={ImplVendorTaskSignageBASTDigitalPreview}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/kebutuhan/penawaran-harga/:id"
                    component={ImplCimbKebutuhanPenawaranHarga}
                  />
                  {/* ROUTE TASK BOOTH */}
                  <Route
                    exact
                    path="/implementation/task/booth/create"
                    component={TaskBoothCreate}
                  />
                  <Route
                    exact
                    path="/implementation/task/booth/:taskId"
                    component={TaskBoothDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/booth/:taskId/edit"
                    component={TaskBoothEdit}
                  />
                  {/* ROUTE TASK STATUS TERMINASI */}
                  <Route
                    exact
                    path="/implementation/task/termination/create"
                    component={TaskStatusTerminasiCreate}
                  />
                  <Route
                    exact
                    path="/implementation/task/termination/:taskId"
                    component={TaskStatusTerminasiDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/termination/:taskId/edit"
                    component={TaskStatusTerminasiEdit}
                  />

                  <Route
                    exact
                    path="/implementation/task/parameter-replace/create"
                    component={ParameterReplaceCreate}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter-replace/:taskId"
                    component={ParameterReplaceDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/parameter-replace/:taskId/edit"
                    component={ParameterReplaceEdit}
                  />
                  <Route
                    exact
                    path="/implementation/task/signage/create"
                    component={ParameterSignageCreate}
                  />
                  <Route
                    exact
                    path="/implementation/task/signage/:taskId"
                    component={ParameterSignageDetail}
                  />
                  <Route
                    exact
                    path="/implementation/task/signage/:taskId/edit"
                    component={ParameterSignageEdit}
                  />

                  {/* Route For Sub Menu RBB Data */}
                  <Route exact path="/rbb-data" component={RBBData} />
                  <Route exact path="/rbb-edit-new/:id" component={EditNew} />
                  <Route
                    exact
                    path="/rbb-edit-renew/:id"
                    component={EditRenew}
                  />
                  <Route
                    exact
                    path="/rbb-edit-termin/:id"
                    component={EditTermin}
                  />
                  <Route
                    exact
                    path="/rbb-edit-replace/:id"
                    component={EditReplace}
                  />
                  <Route
                    exact
                    path="/rbb-edit-unplan-replace/:id"
                    component={EditUnplanReplace}
                  />
                  <Route
                    exact
                    path="/rbb-edit-unplan-termin/:id"
                    component={EditUnplanTermin}
                  />
                  <Route
                    exact
                    path="/rbb-edit-unplan-renewal/:id"
                    component={EditUnplanRenewal}
                  />

                  <Route exact path="/forecasting" component={Forecasting} />

                  {/* Route For Sub Menu Modeling */}
                  <Route
                    exact
                    path="/modeling-model"
                    component={ModelingModel}
                  />
                  <Route
                    exact
                    path="/modeling-renewal"
                    component={ModelingRenewal}
                  />
                  <Route
                    exact
                    path="/modeling-renewal/renewal-detail"
                    component={renewalDetail}
                  />
                  <Route
                    exact
                    path="/modeling-termin"
                    component={ModelingTermin}
                  />
                  <Route
                    exact
                    path="/modeling-termin/termin-detail"
                    component={terminDetail}
                  />
                  <Route
                    exact
                    path="/modeling-remodeling"
                    component={ModelingRemodeling}
                  />

                  <Route
                    exact
                    path="/forecasting/renewal-detail"
                    component={ForecastingRenewalDetail}
                  />
                  <Route
                    exact
                    path="/forecasting/termin-detail"
                    component={ForecastingTerminDetail}
                  />
                  <Route exact path="/trend-analisa" component={AnalyticData} />
                  <Route
                    exact
                    path="/trend-analisa/detail/:id"
                    component={AnalyticDataDetail}
                  />

                  {/* Route For Menu Approval */}
                  <Route exact path="/approval" component={Approval} />
                  <Route
                    exact
                    path="/approval/detail/:id"
                    component={ApprovalDetail}
                  />

                  <Route
                    exact
                    path="/general-detail"
                    component={GeneralDetail}
                  />

                  {/* Route For Sub Menu Reporting */}
                  <Route
                    exact
                    path="/reporting-management"
                    component={ManagementReport}
                  />
                  <Route
                    exact
                    path="/reporting-forecasting"
                    component={ForecastingReport}
                  />
                  {/* <Route
                    exact
                    path="/reporting-atmstatus"
                    component={AtmStatusReport}
                  /> */}
                  <Route
                    exact
                    path="/financial-BudgetCadangan"
                    component={BudgetCadangan}
                  />

                  <Route exact path="/financial" component={Financial} />
                  <Route
                    exact
                    path="/financial-memo-pembayaran"
                    component={MemoPembayaran}
                  />
                  <Route
                    exact
                    path="/financial-approval"
                    component={FinancialApproval}
                  />
                  <Route
                    exact
                    path="/financial-approval/detail/:id"
                    component={FinancialApprovalDetail}
                  />
                  <Route
                    exact
                    path="/financial-BudgetTracking"
                    component={BudgetTracking}
                  />
                  <Route
                    exact
                    path="/financial-BudgetTracking/details"
                    component={BudgetTrackingDetails}
                  />
                  <Route
                    exact
                    path="/financial-status"
                    component={FinancialStatus}
                  />

                  <Route
                    exact
                    path="/site-management"
                    component={SiteManagement}
                  />
                  <Route
                    exact
                    path="/submission-tracking"
                    component={Submission}
                  />
                  <Route
                    exact
                    path="/submission-detail-new/:id/:atmId"
                    component={SubDetailNew}
                  />
                  <Route
                    exact
                    path="/submission-detail-termin/:id/:atmId"
                    component={SubDetailTermin}
                  />
                  <Route
                    exact
                    path="/submission-detail-renewal/:id/:atmId"
                    component={SubDetailRenewal}
                  />
                  <Route
                    exact
                    path="/submission-detail-replace/:id"
                    component={SubDetailReplace}
                  />
                  <Route
                    exact
                    path="/submission-detail-migration/:id/:locId/:atmId"
                    component={SubDetailMigration}
                  />

                  <Route
                    exact
                    path="/site-management/document-legality"
                    component={DocumentLegality}
                  />
                  <Route
                    exact
                    path="/site-management/document-legality/detail/:id"
                    component={DocLegalityDetails}
                  />
                  <Route
                    exact
                    path="/site-management/progress-list"
                    component={ProgressList}
                  />
                  <Route
                    exact
                    path="/site-management/progress-list/edit-pipeline"
                    component={ProgressEditPipeline}
                  />
                  <Route
                    exact
                    path="/site-management/progress-list/edit-profiling"
                    component={ProgressEditProfiling}
                  />
                  <Route
                    exact
                    path="/rbb-implementation"
                    component={RbbImplementation}
                  />
                  <Route exact path="/dummy" component={Dummy} />
                  {/* Route For Sub Menu Master Data */}
                  <Route exact path="/master-data" component={MasterData} />
                  <Route
                    exact
                    path="/master-data/edit-history"
                    component={EditHistory}
                  />
                  <Route
                    exact
                    path="/master-data/detail/:id"
                    component={AnalyticDataDetail}
                  />
                  <Route
                    exact
                    path="/master-data/edit/:atmId"
                    component={MasterDataEdit}
                  />
                  <Route exact path="/app-audit" component={AppAudit} />

                  <Route
                    exact
                    path="/user-management/edit/:userId"
                    component={EditUser}
                  />

                  <Route
                    exact
                    path="/user-management/add"
                    component={NewUser}
                  />

                  <Route
                    exact
                    path="/user-management/user-role/edit/:roleId"
                    component={EditRole}
                  />

                  <Route
                    exact
                    path="/user-management/user-role/add"
                    component={NewRole}
                  />
                  <Route exact path="/vendors" component={Vendors} />

                  <Route
                    exact
                    path="/vendors/edit-vendor/:id"
                    component={EditVendor}
                  />
                  <Route
                    exact
                    path="/vendors/new-vendor"
                    component={NewVendor}
                  />

                  <Route
                    exact
                    path="/menu-management"
                    component={MenuManagement}
                  />

                  <Route
                    exact
                    path="/user-management/user-role"
                    component={UserRole}
                  />

                  {/* ROUTE FOR VENDOR MANAGEMENT */}
                  <Route
                    exact
                    path="/vendor-management"
                    component={VendorManagement}
                  />
                  <Route
                    exact
                    path="/vendor-management/overview/detailPajak"
                    component={DetailObjectPajak}
                  />
                  <Route
                    exact
                    path="/vendor-management/pajak"
                    component={VendorPajak}
                  />
                  <Route
                    exact
                    path="/vendor-management/pajak/:id"
                    component={DetailVendorPajak}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders"
                    component={VendorManagementOrders}
                  />
                  <Route
                    exact
                    path="/vendor-management/vendor-service-catalog"
                    component={VendorServiceCatalog}
                  />
                  <Route
                    exact
                    path="/vendor-management/part-service-pricelist"
                    component={PartAndServicePricelist}
                  />
                  <Route
                    exact
                    path="/vendor-management/vendor-service-catalog/detail/:id"
                    component={VendorServiceCatalogDetail}
                  />
                  <Route
                    exact
                    path="/vendor-management/orders/gudang"
                    component={VendorManagementOrderGudang}
                  />

                  {/* ROUTER PARAMETER NEW TERMIN */}
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/parameter/:id",
                      "/vendor-orders/parameter/:id",
                    ]}
                    component={VendorManagementOrderParameterNewTermin}
                  />

                  {/* ROUTER PARAMETER REPLACE */}
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/parameter-replace/:id",
                      "/vendor-orders/parameter-replace/:id",
                    ]}
                    component={VendorManagementOrderParamaterReplaceDetail}
                  />

                  {/* ROUTER PARAMETER MIGRASI */}
                  <Route
                    exact
                    path={[
                      "/vendor-management/orders/parameter-migrasi/:id",
                      "/vendor-orders/parameter-migrasi/:id",
                    ]}
                    component={VendorManagementOrderParameterMigrasi}
                  />

                  {/* ROUTE FOR VENDOR ORDER role VENDOR */}
                  <Route
                    exact
                    path="/vendor-orders"
                    component={VendorManagementOrders}
                  />
                  <Route
                    exact
                    path="/vendor-orders/kebutuhan"
                    component={ImplVendorKebutuhan}
                  />
                  <Route
                    exact
                    path="/vendor-orders/kebutuhan/:id"
                    component={ImplVendorKebutuhanOrderDetail}
                  />
                  <Route
                    exact
                    path="/vendor-orders/gudang"
                    component={VendorManagementOrderGudang}
                  />
                  {/* ROUTE FOR DIGITALISASI */}
                  <Route
                    exact
                    path={[
                      "/vendor-management/digitalisasi/scheduling",
                      "/vendor-management/digitalisasi",
                    ]}
                    component={Scheduling}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-digitalisasi",
                      "/vendor-digitalisasi/result",
                    ]}
                    component={DigitalisasiCheck}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/digitalisasi/site-quality/:id",
                      "/vendor-digitalisasi/site-quality/:id",
                    ]}
                    component={DigitalisasiSiteQuality}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/digitalisasi/slm/:id",
                      "/vendor-digitalisasi/slm/:id",
                    ]}
                    component={VendorSLM}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/digitalisasi/vendorflm/:id",
                      "/vendor-digitalisasi/vendorflm/:id",
                    ]}
                    component={DigitalisasiVendorFLM}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/digitalisasi/vendorcctv/:id",
                      "/vendor-digitalisasi/vendorcctv/:id",
                    ]}
                    component={DigitalisasiVendorCCTV}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/digitalisasi/vendor-flm-rpl/:id",
                      "/vendor-digitalisasi/vendor-flm-rpl/:id",
                    ]}
                    component={DigitalisasiVendorFlmRpl}
                  />
                  <Route
                    exact
                    path={[
                      "/vendor-management/digitalisasi/inventory-cassette/:id",
                      "/vendor-digitalisasi/inventory-cassette/:id",
                    ]}
                    component={InventoryCassette}
                  />
                  <Route
                    exact
                    path={["/vendor-management/digitalisasi/ticketing"]}
                    component={Ticketing}
                  />
                  <Route
                    exact
                    path="/vendor-management/digitalisasi/configuration"
                    component={ConfigurationDigitalisasi}
                  />

                  {/* ROUTE FOR ENVIRONMENT PREMISES */}
                  <Route
                    exact
                    path="/environment-premises"
                    component={EnvironmentPremises}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/clearliness-quality",
                      "/vendor-digitalisasi/clearliness-quality",
                    ]}
                    component={ClearlinessResult}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/clearliness-quality/:id",
                      "/vendor-digitalisasi/clearliness-quality/:id",
                    ]}
                    component={VendorKebersihan}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/premises-standarisasi",
                      "/vendor-digitalisasi/premises-standarisasi",
                    ]}
                    component={StandarisasiPremises}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/premises-standarisasi/:id",
                      "/vendor-digitalisasi/premises-standarisasi/:id",
                    ]}
                    component={DetailPremises}
                  />

                  <Route
                    exact
                    path="/environment-premises/premises-standarisasi/add-subCategory/:id"
                    component={AddSubCategoryPremises}
                  />
                  <Route
                    exact
                    path="/environment-premises/premises-standarisasi/edit-subCategory/:id"
                    component={EditSubCategoryPremises}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/premisses-quality",
                      "/vendor-digitalisasi/premisses-quality",
                    ]}
                    component={PremisessResult}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/premisses-quality/vendor-surveysite/:id",
                      "/vendor-digitalisasi/premisses-quality/vendor-surveysite/:id",
                    ]}
                    component={VendorSiteSurvei}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/pra-pasca-bayar",
                      "/vendor-digitalisasi/pra-pasca-bayar",
                    ]}
                    component={PraPascaBayar}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/pra-pasca-bayar/detail/:id",
                      "/vendor-digitalisasi/pra-pasca-bayar/detail/:id",
                    ]}
                    component={DetailPraPascaBayar}
                  />
                  <Route
                    exact
                    path={[
                      "/environment-premises/premisses-quality/vendor-maintenance/:id",
                      "/vendor-digitalisasi/premisses-quality/vendor-maintenance/:id",
                    ]}
                    component={VendorMaintenancePremises}
                  />
                  {/* ROUTE FOR PROJECT MANAGEMENT */}
                  <Route
                    exact
                    path="/project-management"
                    component={overviewProjectManagement}
                  />
                  <Route
                    exact
                    path="/project-management/timeline"
                    component={timelineProject}
                  />

                  {/* ROUTE FOR MEDIA PROMOSI */}
                  <Route
                    exact
                    path={[
                      "/media-promosi/media-promosi-quality/vendor-media-promosi",
                    ]}
                    component={VendorMediaPromosi}
                  />
                  <Route
                    exact
                    path={["/media-promosi/media-promosi-quality/eye-bowling"]}
                    component={MediaPromosiEyeBowling}
                  />
                  <Route
                    exact
                    path={[
                      "/media-promosi/media-promosi-quality/vendor-media-promosi/:id",
                      "/vendor-digitalisasi/vendor-media-promosi/:id",
                    ]}
                    component={MediaPromosiQualityDetail}
                  />
                  <Route
                    exact
                    path={[
                      "/media-promosi/tracking-pengurusan-pajak",
                      // "/vendor-digitalisasi/tracking-pengurusan-pajak",
                    ]}
                    component={TrackingPengurusanPajak}
                  />
                  <Route
                    exact
                    path={[
                      "/media-promosi/tracking-pengurusan-pajak/detail/:id",
                      "/vendor-digitalisasi/tracking-pengurusan-pajak/:id",
                    ]}
                    component={TrackingPengurusanPajakDetail}
                  />
                  <Route exact path="/media-promosi" component={MediaPromosi} />

                  <Route
                    exact
                    path="/media-promosi/overview/detailPajak"
                    component={MediaPromosiDetailPajak}
                  />
                  <Route
                    exact
                    path="/media-promosi/standarisasi-media-promosi"
                    component={StandarisasiMediaPromosi}
                  />
                  <Route
                    exact
                    path="/media-promosi/standarisasi-media-promosi/add-sub-category/:id"
                    component={AddSubCategory}
                  />
                  <Route
                    exact
                    path="/media-promosi/standarisasi-media-promosi/:id"
                    component={StandarisasiMediaPromosiDetail}
                  />
                  {/* <Route exact path="/monitoring" component={MediaPromosi} /> */}

                  {/* ROUTE FOR ASET MANAGEMENT */}
                  <Route
                    exact
                    path="/asset-management"
                    component={AssetManagement}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim"
                    component={Klaim}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim"
                    component={Klaim}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim/EEI/:id"
                    component={DetailKlaimEEI}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/insurance-approval"
                    component={ApprovalKlaim}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/insurance-approval-klaim/detail/:id"
                    component={DetailApprovalKlaim}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim/:id"
                    component={DetailKlaimVendor}
                  />
                  <Route
                    exact
                    path="/asset-management/inventory"
                    component={InventoryMesin}
                  />
                  <Route
                    exact
                    path="/asset-management/inventory/mesin-atm/:id"
                    component={DetailMesinATM}
                  />
                  <Route
                    exact
                    path="/asset-management/inventory/ups/:id"
                    component={DetailUPS}
                  />
                  <Route
                    exact
                    path="/asset-management/inventory/dvr/:id"
                    component={DetailDVR}
                  />
                  <Route
                    exact
                    path="/asset-management/warehouse-management"
                    component={WerehouseManagement}
                  />
                  <Route
                    exact
                    path="/asset-management/warehouse-management/mesin-atm/:id"
                    component={DetailMesinAtmWerehouse}
                  />
                  <Route
                    exact
                    path="/asset-management/warehouse-management/ups/:id"
                    component={DetailUPSWerehouse}
                  />
                  <Route
                    exact
                    path="/asset-management/werehouse/dvr/:id"
                    component={DetailDVRWerehouse}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/pendaftaran"
                    component={PendaftaranAsuransi}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/pendaftaran/:id"
                    component={DetailPendaftaranAsuransi}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim-insurance-approval"
                    component={ApprovalKlaim}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/insurance-approval-klaim/detail/:id"
                    component={DetailApprovalKlaim}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/register-insurance-approval"
                    component={ApprovalInsurance}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/register-insurance-approval/detail/:id"
                    component={RegisterApprovalDetail}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim/money-insurance/tambah-klaim"
                    component={TambahKlaimMoneyInsurance}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim/:id/verifikasi"
                    component={VerifikasiKlaim}
                  />
                  <Route
                    exact
                    path="/asset-management/insurance/klaim/:id/approval"
                    component={DetailKlaimApproval}
                  />
                  {/* ROUTE FOR ADD-ONS */}
                  <Route exact path="/add-ons/todo-list" component={TodoList} />
                  <Route
                    exact
                    path="/add-ons/event-schedule-news"
                    component={EventScheduleNews}
                  />
                  <Route
                    exact
                    path="/add-ons/todo-list/add"
                    component={TodoListAdd}
                  />
                  <Route
                    exact
                    path="/add-ons/todo-list/:id"
                    component={TodoListDetail}
                  />
                  <Route
                    exact
                    path="/add-ons/todo-list/edit/:id"
                    component={TodoListEdit}
                  />
                  <Route
                    exact
                    path="/add-ons/forum-discussion"
                    component={ForumDiscussion}
                  />
                  <Route
                    exact
                    path="/add-ons/forum-discussion/add"
                    component={ForumDiscussionAdd}
                  />
                  <Route
                    exact
                    path="/add-ons/forum-discussion/:id"
                    component={DetailForumDiscussion}
                  />
                  <Route
                    exact
                    path="/add-ons/forum-discussion/edit/:id"
                    component={ForumDiscussEdit}
                  />
                  <Route
                    exact
                    path={[
                      "/add-ons/event-schedule-news/add-event",
                      "/add-ons/event-schedule-news/add-schedule",
                      "/add-ons/event-schedule-news/add-news",
                    ]}
                    component={AddEvent}
                  />
                  <Route
                    exact
                    path={[
                      "/add-ons/event-schedule-news/edit-event/:id",
                      "/add-ons/event-schedule-news/edit-schedule/:id",
                      "/add-ons/event-schedule-news/edit-news/:id",
                    ]}
                    component={EditEvent}
                  />
                  <Route
                    exact
                    path="/add-ons/event-schedule-news/detail-events/:id"
                    component={DetailEvent}
                  />
                  <Route
                    exact
                    path="/add-ons/event-schedule-news/detail-schedule/:id"
                    component={DetailSchedule}
                  />
                  <Route
                    exact
                    path="/add-ons/event-schedule-news/detail-news/:id"
                    component={DetailNews}
                  />
                  <Route
                    exact
                    path="/add-ons/chat-forum"
                    component={ChatForum}
                  />
                  <Route
                    exact
                    path="/add-ons/chat-forum/add-thread"
                    component={AddThread}
                  />
                  <Route
                    exact
                    path="/add-ons/chat-forum/edit-thread/:id"
                    component={EditThread}
                  />
                  <Route
                    exact
                    path="/add-ons/chat-forum/detail/:id"
                    component={DetailChatForum}
                  />
                  <Route
                    exact
                    path="/add-ons/configuration"
                    component={Configuration}
                  />

                  {/* ROUTE FOR FILE MANAGEMENT */}

                  <Route
                    exact
                    path="/file-management/doc-legalitas"
                    component={DocLegalitas}
                  />

                  <Route
                    exact
                    path="/file-management/doc-legalitas/:id"
                    component={DetailSKPD}
                  />
                  <Route
                    exact
                    path="/file-management/pembuatan-no-surat"
                    component={PembuatanNoSurat}
                  />

                  <Route
                    exact
                    path="/file-management/doc-control"
                    component={DocControl}
                  />
                  <Route
                    exact
                    path="/file-management/doc-project"
                    component={DocProject}
                  />
                  <Route
                    exact
                    path="/file-management/doc-project/:id"
                    component={FolderViewDocProject}
                  />

                  <Route
                    exact
                    path="/file-management/file-approval"
                    component={ApprovalFileManagement}
                  />

                  <Route
                    exact
                    path="/file-management/doc-control/:id"
                    component={FolderViewDocControl}
                  />
                  <Route
                    exact
                    path="/file-management/doc-bast"
                    component={DocBast}
                  />
                  <Route
                    exact
                    path="/file-management/doc-bast/:id"
                    component={DocBastDetail}
                  />
                  <Route
                    exact
                    path="/file-management/knowledge-base"
                    component={KnowledgeBase}
                  />

                  <Route
                    exact
                    path="/file-management/knowledge-base/:id"
                    component={DetailKnowledgeBase}
                  />
                  <Route
                    exact
                    path="/file-management/doc-invoice"
                    component={DocumentInvoice}
                  />
                  <Route
                    exact
                    path="/file-management/doc-invoice/detail/:id"
                    component={DocumentInvoiceDetail}
                  />

                  <Route
                    exact
                    path="/file-management/configuration"
                    component={ConfigurationFileManagement}
                  />

                  <Route
                    exact
                    path="/file-management/configuration/detail-doc-control/:id"
                    component={DetailDocControl}
                  />
                  <Route
                    exact
                    path="/file-management/configuration/detail-doc-project/:id"
                    component={DetailConfigurationDocProject}
                  />
                  <Route
                    exact
                    path="/file-management/configuration/detail-knowledge-base/:id"
                    component={DetailConfigKnowledgeBase}
                  />
                  <Route
                    exact
                    path={[
                      "/file-management/configuration/add-file/knowledge-base/:id",
                      "/file-management/configuration/edit-file/knowledge-base/:id",
                    ]}
                    component={AddFileKnowledgeBase}
                  />
                  <Route
                    exact
                    path={[
                      "/file-management/configuration/add-file/doc-control/:id",
                      "/file-management/configuration/edit-file/doc-control/:id",
                    ]}
                    component={AddFileDocControl}
                  />
                  <Route
                    exact
                    path={[
                      "/file-management/configuration/add-file/doc-project/:id",
                      "/file-management/configuration/edit-file/doc-project/:id",
                    ]}
                    component={AddFileDocProject}
                  />
                  <Route
                    exact
                    path={[
                      "/file-management/preview/project/:id",
                      "/file-management/preview/control/:id",
                      "/file-management/preview/knowledge/:id",
                    ]}
                    component={DocPreview}
                  />

                  {/* ROUTE FOR USER PROFILE */}
                  <Route exact path="/user-profile" component={UserProfile} />
                </Switch>
              </Content>
              {/* </Suspense> */}
            </ErrorBoundaries>
          </Container>
        </AppProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default AppIndex;
