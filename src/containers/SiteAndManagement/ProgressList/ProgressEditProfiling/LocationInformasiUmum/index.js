/* eslint-disable import/named */
import React, { useEffect, useState, Suspense, lazy } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import { AutoComplete } from 'antd';
import * as Colors from "../../../../../assets/theme/colors";
import { ChkyInputSmall, ChkySelectInput, NumericInput } from "../../../../../components";
import ModalMap from "../../../../../components/Modal/ModalMap";
import NearestComponent from "./NearestComponent";
import ChkyInput from "../chkyInputSmall";
import { ReactComponent as RequiredIcon } from "../../../../../assets/icons/general/required_icon.svg";
import ErrorComponent from "../ErrorComponent";
import constansts from "../../../../../helpers/constants";
import CommonSelect from '../../../../../components/Selects/CommonSelect';
import AccordionContainer from "../../../../../components/AccordionContainer";
import PhoneNumberInput from "../../../../../components/PhoneNumberInput";
import { useEmailValidation } from "../../../../../helpers";

const options = [
  { id: 'NAA', value: 'Jakarta - Graha CIMB Niaga' },
  { id: 'GND', value: 'Jakarta - Graha CIMB Niaga' },
  { id: 'RTP', value: 'Jakarta - Mall Ratu Plaza' },
  { id: 'SEB', value: 'Jakarta - Stock Exchange Building' },
  { id: 'SNC', value: 'Jakarta - Sentral Senayan II' },
  { id: 'BEJ', value: 'Jakarta - BEJ' },
  { id: 'SNY', value: 'Jakarta - Senayan City' },
  { id: 'PCP', value: 'Jakarta - Pacific Place' },
  { id: 'MTR', value: 'Jakarta - Millennium Centennial Center' },
  { id: 'MET', value: 'Jakarta - Wisma Metropolitan' },
  { id: 'MNS', value: 'Jakarta - Menara Satrio' },
  { id: 'ATJ', value: 'Jakarta - Universitas Atmajaya' },
  { id: 'CTW', value: 'Jakarta - Citywalk' },
  { id: 'NGA', value: 'Jakarta - Wisma Keiai' },
  { id: 'THR', value: 'Jakarta - Plaza Sinar Mas Land' },
  { id: 'DGI', value: 'Jakarta - Grand Indonesia' },
  { id: 'PLI', value: 'Jakarta - Plaza Indonesia' },
  { id: 'BNI', value: 'Jakarta - Pejompongan' },
  { id: 'TEB', value: 'Jakarta - Tebet' },
  { id: 'TBM', value: `Jakarta - L'Avenue` },
  { id: 'ABS', value: 'Jakarta - Mall Ambassador' },
  { id: 'CPW', value: 'Jakarta - Ciputra World Mall' },
  { id: 'GSB', value: 'Jakarta - Gatot Subroto' },
  { id: 'JDC', value: 'Jakarta - Bellagio' },
  { id: 'KPL', value: 'Jakarta - Kuningan Plaza' },
  { id: 'DKK', value: 'Jakarta - Kota Kasablanka' },
  { id: 'KNN', value: 'Jakarta - Tempo Scan' },
  { id: 'STU', value: 'Jakarta - Setiabudi' },
  { id: 'DAM', value: 'Jakarta - Daan Mogot' },
  { id: 'TMT', value: 'Jakarta - Tomang Tol' },
  { id: 'HGG', value: 'Jakarta - Green Garden' },
  { id: 'NPI', value: 'JAKARTA - PURI INDAH' },
  { id: 'TGH', value: 'Jakarta - AKR Tower' },
  { id: 'KJR', value: 'Jakarta - Kebon Jeruk Intercon' },
  { id: 'DLM', value: 'Jakarta - Lippo Mall Puri' },
  { id: 'SLI', value: 'Jakarta - Wisma Slipi' },
  { id: 'CTP', value: 'Jakarta - Central Park' },
  { id: 'TAG', value: 'Jakarta - Mall Taman Anggrek' },
  { id: 'DCP', value: 'Jakarta - Central Park Mall' },
  { id: 'CIN', value: 'Jakarta - Pondok Indah Icon' },
  { id: 'MTO', value: 'Jakarta - Metro Pondok Indah' },
  { id: 'WSA', value: 'Jakarta - Wisma Pondok Indah' },
  { id: 'PDX', value: 'Jakarta - Pondok Indah Plaza 3' },
  { id: 'GDC', value: 'Jakarta - Mall Gandaria City' },
  { id: 'KBL', value: 'Jakarta - Sultan Iskandar Muda' },
  { id: 'ACD', value: 'Jakarta - Arcadia Simatupang' },
  { id: 'PM2', value: 'Jakarta - PIM 2' },
  { id: 'OSQ', value: 'Jakarta - South Quarter' },
  { id: 'CNR', value: 'Jakarta - Cinere' },
  { id: 'DEP', value: 'Depok - Margonda' },
  { id: 'DUI', value: 'Depok - FISIP UI' },
  { id: 'FLT', value: 'Jakarta - Sentraya' },
  { id: 'PMH', value: 'Jakarta - Permata Hijau' },
  { id: 'PGD', value: 'Jakarta - Pondok Gede' },
  { id: 'FTA', value: 'Jakarta - Fatmawati 20' },
  { id: 'KJT', value: 'Jakarta - Pasar Induk Kramat Jati' },
  { id: 'MLW', value: 'Jakarta - Melawai' },
  { id: 'WBC', value: 'Jakarta - Warung Buncit' },
  { id: 'KMG', value: 'Jakarta - Kemang Raya 1' },
  { id: 'DRK', value: 'Jakarta - Kemang Raya 47 (DL @ Home)' },
  { id: 'KPM', value: 'Jakarta - Pasar Minggu' },
  { id: 'PPM', value: 'Jakarta - Panglima Polim' },
  { id: 'BOG', value: 'Bogor - Padjajaran' },
  { id: 'TAJ', value: 'Bogor - V Point' },
  { id: 'DBS', value: 'Bogor - Botani Square' },
  { id: 'CBN', value: 'Cibinong - Mayor Oking' },
  { id: 'BJG', value: 'Bogor - Cisalak' },
  { id: 'CLS', value: 'Bogor - Cileungsi' },
  { id: 'BGR', value: 'Bogor - Juanda' },
  { id: 'STL', value: 'Bogor - Plaza Niaga Sentul' },
  { id: 'KWC', value: 'Bogor - Cibubur Kota Wisata' },
  { id: 'CBB', value: 'Jakarta - Cibubur Indah' },
  { id: 'CBR', value: 'Jakarta - Cibubur Citra Grand' },
  { id: 'DAS', value: 'Bogor - AEON Mall Sentul' },
  { id: 'CAS', value: 'Tangerang - Alam Sutera Icon' },
  { id: 'GDS', value: 'Tangerang - Gading Serpong' },
  { id: 'CLN', value: 'Cilegon - City Square' },
  { id: 'TGR', value: 'Tangerang - Tangerang City' },
  { id: 'TKK', value: 'Tangerang - Kondominium Golf Karawaci' },
  { id: 'LGC', value: 'Tangerang - LG Cirarab' },
  { id: 'RPA', value: 'Tangerang - Pinangsia' },
  { id: 'DLP', value: 'Tangerang - Supermall Karawaci' },
  { id: 'TNE', value: 'Tangerang - Daan Mogot' },
  { id: 'TCB', value: 'Tangerang - Taman Cibodas' },
  { id: 'TKS', value: 'Tangerang - Kisamaun' },
  { id: 'BTO', value: 'Tangerang - Bintaro Griya Niaga' },
  { id: 'CLD', value: 'Tangerang - Ciledug' },
  { id: 'BTR', value: 'Jakarta - Bintaro Sektor I' },
  { id: 'ICB', value: 'Tangerang - ITC BSD' },
  { id: 'PMB', value: 'Tangerang - Pasar Modern BSD' },
  { id: 'DAE', value: 'Tangerang - AEON Mall' },
  { id: 'PMG', value: 'Tangerang - Pamulang Permai' },
  { id: 'GOP', value: 'Tangerang - Green Office Park' },
  { id: 'LCB', value: 'Bekasi - Lippo Cikarang' },
  { id: 'MMC', value: 'Bekasi - BEFA Square' },
  { id: 'JBB', value: 'Bekasi - Jababeka' },
  { id: 'KRW', value: 'Karawang - Tuparev' },
  { id: 'LGI', value: 'Bekasi - LG Cibitung' },
  { id: 'HKK', value: 'Bekasi - Cikarang Hankook' },
  { id: 'SMU', value: 'Bekasi - Samsung' },
  { id: 'KMP', value: 'Bekasi - Kemang Pratama' },
  { id: 'SMB', value: 'Bekasi - Summarecon' },
  { id: 'JBK', value: 'Bekasi - Juanda' },
  { id: 'BKB', value: 'Bekasi - Bekasi Barat' },
  { id: 'KGP', value: 'Jakarta - Kelapa Gading TN' },
  { id: 'GCK', value: 'Jakarta - Jakarta Garden City' },
  { id: 'GPL', value: 'Jakarta - Mall Kelapa Gading' },
  { id: 'KLP', value: 'Jakarta - Kelapa Gading LB' },
  { id: 'BGI', value: 'Jakarta - Bukit Gading Indah' },
  { id: 'MAG', value: 'Jakarta - Mal Artha Gading' },
  { id: 'SUN', value: 'Jakarta - Sunter' },
  { id: 'CPK', value: 'Jakarta - Cempaka Putih 68' },
  { id: 'TJP', value: 'Jakarta - Tanjung Priok' },
  { id: 'KMN', value: 'Jakarta - Kalimalang' },
  { id: 'MTM', value: 'Jakarta - Matraman' },
  { id: 'JGR', value: 'Jakarta - Jatinegara' },
  { id: 'RWN', value: 'Jakarta - Rawamangun Pratama' },
  { id: 'KPG', value: 'Jakarta - Pulo Gadung' },
  { id: 'RWM', value: 'Jakarta - Rawamangun Arion' },
  { id: 'PIC', value: 'Jakarta - Pasar Induk Cipinang' },
  { id: 'PLU', value: 'Jakarta - Pluit' },
  { id: 'JDU', value: 'Jakarta - Jembatan Dua' },
  { id: 'MKR', value: 'Jakarta - Muara Karang' },
  { id: 'PNA', value: 'Jakarta - Pantai Indah Kapuk' },
  { id: 'TPM', value: 'Jakarta - Taman Palem' },
  { id: 'KCG', value: 'Jakarta - Citra Garden 1' },
  { id: 'DPA', value: 'Jakarta - PIK Avenue' },
  { id: 'TLG', value: 'Jakarta - Teluk Gong' },
  { id: 'JLB', value: 'Jakarta - Taman Duta Mas' },
  { id: 'EMP', value: 'Jakarta - Mal Emporium Pluit' },
  { id: 'SBR', value: 'Jakarta - Sawah Besar' },
  { id: 'GMK', value: 'Jakarta - Lindeteves Trade Center' },
  { id: 'JYK', value: 'Jakarta - Jayakarta' },
  { id: 'KOT', value: 'Jakarta - Kota' },
  { id: 'KAC', value: 'Jakarta - Ancol' },
  { id: 'LKS', value: 'Jakarta - Mangga Besar' },
  { id: 'MGD', value: 'Jakarta - Mangga Dua Rutex' },
  { id: 'HYW', value: 'Jakarta - Hayam Wuruk' },
  { id: 'PAR', value: 'Jakarta - Pintu Air' },
  { id: 'KAR', value: 'Jakarta - Karang Anyar' },
  { id: 'PKC', value: 'Jakarta - Pintu Kecil' },
  { id: 'GMA', value: 'Jakarta - Gajah Mada' },
  { id: 'PCN', value: 'Jakarta - Sangaji' },
  { id: 'SPO', value: 'Jakarta - Suryopranoto' },
  { id: 'JLI', value: 'Jakarta - Jembatan Lima' },
  { id: 'CKI', value: 'Jakarta - Cikini' },
  { id: 'GMI', value: 'Jakarta - Gambir' },
  { id: 'KBS', value: 'Jakarta - Kebon Sirih' },
  { id: 'MTG', value: 'Jakarta - Menteng' },
  { id: 'WHT', value: 'Jakarta - Wahid Hasyim' },
  { id: 'TMR', value: 'Jakarta - Tomang Raya' },
  { id: 'CID', value: 'Jakarta - Cideng' },
  { id: 'ROM', value: 'Jakarta - Roxy Mas' },
  { id: 'BTL', value: 'Jakarta - Metro Tanah Abang' },
  { id: 'TAK', value: 'Jakarta - Tanah Abang Blok A' },
  { id: 'BAA', value: 'Bandung - Asia Afrika' },
  { id: 'BSK', value: 'Bandung - Setiabudi' },
  { id: 'BLE', value: 'Bandung - Lembang' },
  { id: 'ATN', value: 'Bandung - Astana Anyar' },
  { id: 'BTC', value: 'Bandung - Pajajaran' },
  { id: 'BSM', value: 'Sumedang - Abdurachman' },
  { id: 'CRB', value: 'Cirebon - Yos Sudarso' },
  { id: 'CBL', value: 'Cirebon - Balong Indah Plaza' },
  { id: 'CRN', value: 'Cirebon - Siliwangi' },
  { id: 'DGO', value: 'Bandung - Dago' },
  { id: 'KBP', value: 'Bandung - Kota Baru Parahyangan' },
  { id: 'BOT', value: 'Bandung - Otista' },
  { id: 'BBD', value: 'Cimahi - Borma Dakota' },
  { id: 'BCD', value: 'Cimahi - Raya Tagog' },
  { id: 'RIU', value: 'Bandung - Riau' },
  { id: 'DTB', value: 'Bandung - ITB' },
  { id: 'CNJ', value: 'Cianjur - Cokroaminoto' },
  { id: 'PWA', value: 'Purwakarta - Veteran' },
  { id: 'SKM', value: 'Sukabumi - Martadinata' },
  { id: 'LMO', value: 'Bandung - Lembong' },
  { id: 'SAR', value: 'Bandung - Sumber Sari' },
  { id: 'KPB', value: 'Bandung - Kopo Bihbul' },
  { id: 'BGA', value: 'Garut - Ahmad Yani' },
  { id: 'BAT', value: 'Bandung - Buah Batu' },
  { id: 'BAY', value: 'Bandung - Ahmad Yani' },
  { id: 'BLS', value: 'Bandung - Lingkar Selatan' },
  { id: 'TSK', value: 'Tasikmalaya - Yudanegara' },
  { id: 'TSM', value: 'Tasikmalaya - HZ Mustofa' },
  { id: 'SMG', value: 'Semarang - Pemuda 102' },
  { id: 'GSS', value: 'Semarang - Gatot Subroto' },
  { id: 'SIK', value: 'Semarang - Kaligawe' },
  { id: 'SMT', value: 'Semarang - Mataram' },
  { id: 'SSL', value: 'Semarang - Siliwangi' },
  { id: 'SLG', value: 'Salatiga - Sudirman' },
  { id: 'AYN', value: 'Semarang - Gajah Mada' },
  { id: 'CNI', value: 'Semarang - Candi' },
  { id: 'SUG', value: 'Semarang - Ungaran' },
  { id: 'CDW', value: 'Semarang - Cendrawasih' },
  { id: 'DTM', value: 'Semarang - Tentrem Mall' },
  { id: 'TGL', value: 'Tegal - Sudirman' },
  { id: 'SLW', value: 'Tegal - Slawi' },
  { id: 'PKL', value: 'Pekalongan - Hayam Wuruk' },
  { id: 'RYD', value: 'Solo - Slamet Riyadi 8' },
  { id: 'MNH', value: 'Solo - Manahan' },
  { id: 'PSL', value: 'Solo - Paragon Mall' },
  { id: 'SLR', value: 'Solo - Slamet Riyadi 136' },
  { id: 'KAE', value: 'Klaten - Pemuda' },
  { id: 'KTS', value: 'Solo - Kartasura' },
  { id: 'ATM', value: 'Solo - ATMI' },
  { id: 'KLW', value: 'Solo - Mesen Square' },
  { id: 'PLR', value: 'Solo - Palur' },
  { id: 'SBA', value: 'Solo - Solo Baru' },
  { id: 'KDS', value: 'Kudus - Agil Kusumadya' },
  { id: 'DBO', value: 'Demak - Bintoro' },
  { id: 'JPR', value: 'Jepara - Diponegoro' },
  { id: 'KDU', value: 'Kudus - Ahmad Yani' },
  { id: 'PTI', value: 'Pati - Sudirman' },
  { id: 'YOG', value: 'Yogyakarta - Sudirman 50' },
  { id: 'GJY', value: 'Yogyakarta - Gejayan' },
  { id: 'PRS', value: 'Yogyakarta - Parang Tritis' },
  { id: 'DAJ', value: 'Yogyakarta - Atmajaya' },
  { id: 'YGN', value: 'Yogyakarta - Godean' },
  { id: 'YSD', value: 'Yogyakarta - Sanata Darma' },
  { id: 'YSM', value: 'Yogyakarta - Sudirman 13' },
  { id: 'RSP', value: 'Yogyakarta - RS Panti Rapih' },
  { id: 'UAM', value: 'Yogyakarta - UAJ Mrican' },
  { id: 'USP', value: 'Yogyakarta - Universitas Sanata Pahingan' },
  { id: 'DGM', value: 'Yogyakarta - UGM' },
  { id: 'DMO', value: 'Yogyakarta - Malioboro Mall Yogyakarta' },
  { id: 'MGG', value: 'Magelang - Rejotumoto' },
  { id: 'WNB', value: 'Wonosobo - Ahmad Yani' },
  { id: 'KBM', value: 'Kebumen - Pahlawan' },
  { id: 'PRR', value: 'Purworejo - Achmad Dahlan' },
  { id: 'PRO', value: 'Purwokerto - Sudirman' },
  { id: 'PUL', value: 'Purbalingga - Sudirman' },
  { id: 'CLC', value: 'Cilacap - Sudirman' },
  { id: 'DRO', value: 'Surabaya - Darmo' },
  { id: 'RDM', value: 'Surabaya - Diponegoro' },
  { id: 'PKW', value: 'Surabaya - Pakuwon' },
  { id: 'DTP', value: 'Surabaya - Tunjungan Plaza 6' },
  { id: 'ADY', value: 'Surabaya - Andayani' },
  { id: 'JMR', value: 'Surabaya - Jemursari' },
  { id: 'PTA', value: 'Surabaya - Universitas Kristen Petra' },
  { id: 'RNK', value: 'Surabaya - Rungkut' },
  { id: 'HSD', value: 'Surabaya - Dharmahusada' },
  { id: 'MLO', value: 'Surabaya - Mulyosari' },
  { id: 'MSS', value: 'Surabaya - Pakuwon City' },
  { id: 'SKK', value: 'Surabaya - Kapas Krampung' },
  { id: 'MAR', value: 'Surabaya - Manyar Kertoardjo' },
  { id: 'KMA', value: 'Surabaya - Kembang Jepun' },
  { id: 'PAK', value: 'Surabaya - Perak' },
  { id: 'PSA', value: 'Surabaya - Pasar Atom' },
  { id: 'DEC', value: 'Surabaya - Pakuwon City Mall' },
  { id: 'SSD', value: 'Surabaya - Sudirman' },
  { id: 'TNU', value: 'Surabaya - Tunjungan' },
  { id: 'PCA', value: 'Surabaya - Pucang Anom' },
  { id: 'SKA', value: 'Surabaya - Klampis' },
  { id: 'RMI', value: 'Surabaya - Manyar Mega Indah' },
  { id: 'TDR', value: 'Surabaya - Tidar' },
  { id: 'BJN', value: 'Bojonegoro - Gajah Mada' },
  { id: 'GRS', value: 'Gresik - Kartini' },
  { id: 'SSM', value: 'Surabaya - Bukit Darmo' },
  { id: 'SSK', value: 'Surabaya - Sungkono' },
  { id: 'SDA', value: 'Sidoarjo - Ahmad Yani' },
  { id: 'JBG', value: 'Jombang - Ahmad Yani' },
  { id: 'MJK', value: 'Mojokerto - Mojopahit' },
  { id: 'LMG', value: 'Lamongan - Lamongrejo' },
  { id: 'JBR', value: 'Jember - Diponegoro' },
  { id: 'BDW', value: 'Bondowoso - Sudirman' },
  { id: 'BWI', value: 'Banyuwangi - Sudirman' },
  { id: 'STB', value: 'Situbondo - Sepudi' },
  { id: 'MLN', value: 'Malang - Basuki Rachmad' },
  { id: 'GLN', value: 'Malang - Galunggung' },
  { id: 'ITN', value: 'Malang - ITN' },
  { id: 'LMJ', value: 'Lumajang - Sudirman' },
  { id: 'PSR', value: 'Pasuruan - Pasar Besar' },
  { id: 'MLM', value: 'Malang - Merdeka' },
  { id: 'KJM', value: 'Malang - Kepanjen' },
  { id: 'MDU', value: 'Madiun - Pahlawan' },
  { id: 'NGW', value: 'Ngawi - Sultan Agung' },
  { id: 'PRG', value: 'Ponorogo - Gajah Mada' },
  { id: 'BLR', value: 'Blitar - Merdeka' },
  { id: 'KED', value: 'Kediri - Diponegoro' },
  { id: 'TLA', value: 'Tulungagung - Sudirman' },
  { id: 'DPS', value: 'Bali - Thamrin' },
  { id: 'DDS', value: 'Bali - Dewi Sartika' },
  { id: 'KGD', value: 'Bali - Kuta Graha' },
  { id: 'NDA', value: 'Bali - Nusa Dua' },
  { id: 'SND', value: 'Bali - Sanur' },
  { id: 'MLT', value: 'Bali - Melati' },
  { id: 'SRB', value: 'Bali - Singaraja' },
  { id: 'UBU', value: 'Bali - Ubud' },
  { id: 'DMG', value: 'Denpasar - Mall Galeria' },
  { id: 'KLM', value: 'Kupang - Lalamentik' },
  { id: 'MTN', value: 'Mataram - Pejanggik' },
  { id: 'BKT', value: 'Medan - Bukit Barisan' },
  { id: 'MMY', value: 'Medan - M Yamin' },
  { id: 'GJH', value: 'Medan - Gajah Mada' },
  { id: 'KIM', value: 'Medan - Marelan' },
  { id: 'MSU', value: 'Medan - Sutomo Ujung' },
  { id: 'MYS', value: 'Medan - Yos Sudarso' },
  { id: 'DNP', value: 'Medan - Centre Point' },
  { id: 'MCA', value: 'Medan - Cemara Asri' },
  { id: 'DPO', value: 'Medan - Podomoro City Deli Park' },
  { id: 'MDN', value: 'Medan - Pemuda' },
  { id: 'MKA', value: 'Medan - AR Hakim' },
  { id: 'MBD', value: 'Medan - Bandung' },
  { id: 'MDA', value: 'Medan - Asia' },
  { id: 'MTH', value: 'Medan - KS Tubun' },
  { id: 'PSI', value: 'Pematang Siantar - Merdeka' },
  { id: 'TTI', value: 'Tebing Tinggi - Sudirman' },
  { id: 'CNM', value: 'Medan - Icon' },
  { id: 'MPO', value: 'Medan - Polonia' },
  { id: 'JAD', value: 'Medan - Juanda' },
  { id: 'MGS', value: 'Medan - Gatot Subroto' },
  { id: 'MBI', value: 'Binjai - Sudirman' },
  { id: 'RTU', value: 'Rantau Prapat - Ahmad Yani' },
  { id: 'SIP', value: 'Batam - Sei Panas' },
  { id: 'BTD', value: 'Batam - Batamindo' },
  { id: 'BTM', value: 'Batam - Nagoya' },
  { id: 'ABB', value: 'Batam - Adhya Building' },
  { id: 'SPN', value: 'Batam - Botania' },
  { id: 'TOP', value: 'Batam - Penuin Centre' },
  { id: 'TPN', value: 'Tanjung Pinang - Merdeka' },
  { id: 'NKR', value: 'Pekanbaru - Sudirman' },
  { id: 'NGK', value: 'Pekanbaru - Tuanku Tambusai' },
  { id: 'PKA', value: 'Pekanbaru - Riau' },
  { id: 'PKP', value: 'Pekanbaru - Panam' },
  { id: 'DUM', value: 'Dumai - Sultan Syarif Qasim' },
  { id: 'DRI', value: 'Dumai - Duri' },
  { id: 'PDG', value: 'Padang - Sudirman' },
  { id: 'PDK', value: 'Padang - Pondok' },
  { id: 'PDY', value: 'Padang - M Yamin' },
  { id: 'JMB', value: 'Jambi Sutomo' },
  { id: 'LMU', value: 'Lampung - Malahayati' },
  { id: 'LPG', value: 'Lampung - Tanjung Karang' },
  { id: 'PPN', value: 'Pangkal Pinang - Masjid Jamik' },
  { id: 'SDR', value: 'Palembang - Sudirman' },
  { id: 'PLB', value: 'Palembang - Kolonel Atmo' },
  { id: 'PMJ', value: 'Palembang - Mesjid Lama' },
  { id: 'DPI', value: 'Palembang - Icon Mall' },
  { id: 'BPN', value: 'Balikpapan - Ahmad Yani' },
  { id: 'MLF', value: 'Balikpapan - Ruko Baru' },
  { id: 'BLK', value: 'Balikpapan - MT Haryono' },
  { id: 'SAM', value: 'Samarinda - KH Khalid' },
  { id: 'SMA', value: 'Samarinda - Simpang Merak' },
  { id: 'SMR', value: 'Samarinda - Bung Tomo' },
  { id: 'TRK', value: 'Tarakan - Karang Anyar' },
  { id: 'BJS', value: 'Banjarmasin - Pangeran Samudera' },
  { id: 'BJA', value: 'Banjarmasin - Banjarbaru' },
  { id: 'BNA', value: 'Banjarmasin - Ahmad Yani 56' },
  { id: 'PKY', value: 'Palangkaraya - Murjani' },
  { id: 'PON', value: 'Pontianak - Tanjungpura' },
  { id: 'SAP', value: 'Pontianak - Sultan Abdurrahman' },
  { id: 'KTG', value: 'Ketapang - MT Haryono' },
  { id: 'AYI', value: 'Makassar - Ahmad Yani' },
  { id: 'UHS', value: 'Makassar - Bandang' },
  { id: 'TRM', value: 'Makassar - Trans Studio' },
  { id: 'PBU', value: 'Makassar - Panakukang' },
  { id: 'KND', value: 'Kendari - Mandonga' },
  { id: 'RTN', value: 'Manado - Walanda Maramis' },
  { id: 'MND', value: 'Manado - Mega Mas' },
  { id: 'MAN', value: 'Manado - Sam Ratulangi' },
  { id: 'AMB', value: 'Ambon - Sam Ratulangi' },
  { id: 'JYP', value: 'Jayapura - Pasifik Permai' },
  { id: 'KAA', value: 'Mimika - Kuala Kencana' },
  { id: 'YSS', value: 'Mimika - Budi Utomo' },
  { id: 'RDE', value: 'Mimika - Ridge Camp' },
  { id: 'RP2', value: 'Mimika - Tembagapura II' },
  { id: 'TP1', value: 'Mimika - Tembagapura I' },
  { id: 'SMD', value: 'Jakarta - Menara Sudirman' },
  { id: 'KPI', value: 'Jakarta - Kemenag Jakarta Timur' },
  { id: 'SBG', value: 'Bogor - Juanda (Co-location)' },
  { id: 'SVC', value: 'Jakarta - Sentraya (Co-location)' },
  { id: 'SSP', value: 'Tangerang - Serpong  (Co-location)' },
  { id: 'SGS', value: 'Bandung - Lembong (Co-location)' },
  { id: 'KEG', value: 'Bandung - Kemenag Kota' },
  { id: 'KEB', value: 'Bandung - Kemenag Kabupaten' },
  { id: 'SCR', value: 'Cirebon - Siliwangi (Co-locate)' },
  { id: 'SSMR', value: 'Semarang - Pemuda 21B' },
  { id: 'SSO', value: 'Solo - Slamet Riyadi 136 (Co-location)' },
  { id: 'SYG', value: 'Yogyakarta - Sudirman (Co-location)' },
  { id: 'SBY', value: 'Surabaya - Darmo (Co-location)' },
  { id: 'SDP', value: 'Bali - Thamrin (Co-location)' },
  { id: 'SML', value: 'Malang - Soekarno Hatta' },
  { id: 'KUM', value: 'Mataram - Kuta Mandalika' },
  { id: 'MKS', value: 'Makassar - Achmad Yani' },
  { id: 'SBM', value: 'Banjarmasin - Ahmad Yani (Co-location)' },
  { id: 'SSSA', value: 'Samarinda - Juanda' },
  { id: 'SJM', value: 'Jambi - Hayam Wuruk (Co-location)' },
  { id: 'SLPG', value: 'Lampung - Hasanudin' },
  { id: 'SLS', value: 'Lhokseumawe - Suka Ramai' },
  { id: 'SBNA', value: 'Banda Aceh - Peunayong' },
  { id: 'SPL', value: 'Palembang - Letkol Iskandar' },
  { id: 'SPSD', value: 'Pekanbaru - Sudirman' },
  { id: 'SSPD', value: 'Padang - Sudirman (Co-location)' },
  { id: 'SSPM', value: 'Medan - Gatot Subroto (Co-location)' },
  { id: 'SYB', value: 'Batam - Mahkota Raya' },
  { id: 'KSB', value: 'Surabaya - Kemenag Kota' },
  { id: 'KMJ', value: 'Kas Mobil - Jakarta Tebet 1' },
  { id: 'KGS', value: 'Kas Mobil - Jakarta Tebet 2' },
  { id: 'KMC', value: 'Kas Mobil - Jakarta Niaga Tower' },
  { id: 'KME', value: 'Kas Mobil - Jakarta Kelapa Gading TN' },
  { id: 'KMQ', value: 'Kas Mobil - Bekasi Cikarang' },
  { id: 'KEA', value: 'Kas Mobil - Bogor Pajajaran' },
  { id: 'KRS', value: 'Kas Mobil - Solo' },
  { id: 'KNO', value: 'Kas Mobil - Jakarta Sawah Besar 2' },
  { id: 'KSO', value: 'Kas Mobil - Bintaro Griya Niaga' },
  { id: 'KMT', value: 'Kas Mobil - Alam Sutera Icon' },
  { id: 'KMW', value: 'Kas Mobil - Jakarta Tomang Tol' },
  { id: 'KMB', value: 'Kas Mobil - Bandung' },
  { id: 'KCN', value: 'Kas Mobil - Bandung 2' },
  { id: 'KMO', value: 'Kas Mobil - Cirebon' },
  { id: 'KMR', value: 'Kas Mobil - Semarang 1' },
  { id: 'KSA', value: 'Kas Mobil - Semarang 2' },
  { id: 'KDY', value: 'Kas Mobil - Yogyakarta 1' },
  { id: 'KJS', value: 'Kas Mobil - Yogyakarta 2' },
  { id: 'KDB', value: 'Kas Mobil - Denpasar' },
  { id: 'KMH', value: 'Kas Mobil - Mataram ' },
  { id: 'KMU', value: 'Kas Mobil - Surabaya 1' },
  { id: 'KOR', value: 'Kas Mobil - Surabaya 2' },
  { id: 'KOL', value: 'Kas Mobil -Malang 1' },
  { id: 'KMK', value: 'Kas Mobil - Malang 2' },
  { id: 'KOM', value: 'Kas Mobil - Makassar' },
  { id: 'KOS', value: 'Kas Mobil - Samarinda' },
  { id: 'KMM', value: 'Kas Mobil - Medan' },
  { id: 'KMF', value: 'Kas Mobil - Palembang' },
  { id: 'KOB', value: 'Kas Mobil - Batam' },
  { id: 'KPE', value: 'Kas Mobil - Pekanbaru' },
  { id: 'KPT', value: 'Kas Mobil - Pontianak' },
  { id: 'KLY', value: 'Kas Mobil - Lampung' },
  { id: 'KSP', value: 'Kas Mobil - Padang' } 
];
  
const ChkyLeafletMaps = lazy(() =>
  import("../../../../../components/chky/ChkyLeafletMaps")
);
  
const useStyles = makeStyles({
  root: {
    padding: "0px 15px 15px 15px",
    width: "100%",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 10,
  },
  subsubTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  margin5px: {
    marginBottom: 5,
  },
  margin10px: {
    marginBottom: 10,
  },
  generateLocContainer: {
    borderRadius: 6,
    border: "1px solid #E6EAF3",
    overflow: "hidden",
  },
  generateLocItemAuto: {
    backgroundColor: Colors.GraySoft,
    padding: 11,
    color: Colors.GrayHard,
    fontSize: 15,
    fontWeight: 500,
    width: "15%",
    textAlign: "center",
    borderRight: `2px solid ${Colors.GrayMedium}`,
  },
  generateLocItemIput: {
    width: "55%",
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  spacerTop: { marginTop: 20 },
});
  
const dataNearest = [
  {
    title: "Alfamidi Sudirman",
    id: "#1101",
    machineType: "CRM",
    address: "Jl. Adisudjipto, no 45, Tirtonegoro",
    condition: "Good",
    totalTransaction: 1204,
  },
  {
    title: "Alfamidi Sudirman 2",
    id: "#1101",
    machineType: "CRM",
    address: "Jl. Adisudjipto, no 45, Tirtonegoro",
    condition: "Bad",
    totalTransaction: 1204000,
  },
  {
    title: "Alfamidi Sudirman 3",
    id: "#1101",
    machineType: "CRM",
    address: "Jl. Adisudjipto, no 45, Tirtonegoro",
    condition: "Good",
    totalTransaction: 1204,
  },
];
  
const dataSelectRekeningBank = [
  {value: "-", name: "- Pilih Rekening Bank -",},
  {value: 'BANK BRI', name: 'BANK BRI'},
  {value: 'BANK BCA', name: 'BANK BCA'},
  {value: 'BANK MANDIRI', name: 'BANK MANDIRI'},
  {value: 'BANK BNI', name: 'BANK BNI'},
  {value: 'BANK SYARIAH INDONESIA (BSI)', name: 'BANK SYARIAH INDONESIA (BSI)'},
  {value: 'BANK CIMB NIAGA', name: 'BANK CIMB NIAGA'},
  {value: 'BANK CIMB NIAGA SYARIAH', name: 'BANK CIMB NIAGA SYARIAH'},
  {value: 'BANK MUAMALAT', name: 'BANK MUAMALAT'},
  {value: 'BANK BTPN', name: 'BANK BTPN'},
  {value: 'BANK BTPN SYARIAH', name: 'BANK BTPN SYARIAH'},
  {value: 'BANK PERMATA', name: 'BANK PERMATA'},
  {value: 'BANK PERMATA SYARIAH', name: 'BANK PERMATA SYARIAH'},
  {value: 'BANK DBS INDONESIA', name: 'BANK DBS INDONESIA'},
  {value: 'DIGIBANK', name: 'DIGIBANK'},
  {value: 'BANK BTN', name: 'BANK BTN', nameEn: 'BANK BTN' },
  {value: 'BANK DANAMON', name: 'BANK DANAMON'},
  {value: 'BANK MAYBANK (BII)', name: 'BANK MAYBANK (BII)'},
  {value: 'BANK MEGA', name: 'BANK MEGA'},
  {value: 'BANK SINARMAS', name: 'BANK SINARMAS'},
  {value: 'BANK COMMONWEALTH',name: 'BANK COMMONWEALTH'},
  {value: 'BANK OCBC NISP', name: 'BANK OCBC NISP'},
  {value: 'BANK BUKOPIN', name: 'BANK BUKOPIN'},
  {value: 'BANK BUKOPIN SYARIAH', name: 'BANK BUKOPIN SYARIAH'},
  {value: 'BANK BCA SYARIAH', name: 'BANK BCA SYARIAH'},
  {value: 'BANK LIPPO', name: 'BANK LIPPO'},
  {value: 'CITIBANK', name: 'CITIBANK'},
];
  
const listCabang = [
  {id: 0, value: 'Cabang 1', nameId: 'Cabang 1', nameEn: 'Cabang 1'},
  {id: 1, value: 'Cabang 2', nameId: 'Cabang 2', nameEn: 'Cabang 2'},
  {id: 2, value: 'Cabang 3', nameId: 'Cabang 3', nameEn: 'Cabang 3'}
];
  
const listROArea = [
  {id: 0, value: 'RO Area 1', nameId: 'RO Area 1', nameEn: 'RO Area 1'},
  {id: 1, value: 'RO Area 2', nameId: 'RO Area 2', nameEn: 'RO Area 2'},
  {id: 2, value: 'RO Area 3', nameId: 'RO Area 3', nameEn: 'RO Area 3'}
];
  
const dataSelectJenisBadanUsaha = [
  {
    value: "- Pilih Jenis Badan Usaha -",
    name: "- Pilih Jenis Badan Usaha -",
  },
  { value: "Perorangan", name: "Perorangan" },
  { value: "PT", name: "PT" },
  { value: "CV", name: "CV" },
  { value: "UD", name: "UD" },
  { value: "Yayasan", name: "Yayasan" },
  { value: "Koperasi", name: "Koperasi" },
];
  
const locName = "";
let locHeaderNoR = "";
const machineTypeNoR = "";
const visitorNoR = 0;
let idLocationNoR = "";
const cabangNoR = "";
let roAreaNoR = "";
const recommendationNoR = "";
const nameRequesterNoR = "";
const phoneRequesterNoR = "";
const emailRequesterNoR = "";
const namePengawasNoR = "";
const phonePengawasNoR = "";
const emailPengawasNoR = "";
const namePemilikNoR = "";
const phonePemilikNoR = "";
const emailPemilikNoR = "";
const lokasiCabangNoR = "";
const addressPengawasNoR = "";
const jenisBadanUsahaNoR = "- Pilih Jenis Badan Usaha -";
const addressPemilikNoR = "";
const rekeningBankNoR = "";
const noRekeningNoR = "";
const atasNamaNoR = "";
const paramNewLocationNoR = "";
  
const defaultPosition = [-7.8289701, 110.3776528];

const LocationInformasiUmum = (props) => {
  const { onChangeData, errorForm, dataValue } = props;
  // console.log("data value", dataValue);

  const getRequester = (paramProfiling) => {
    Axios({
      url: `${constansts.userServiceBaseUrl}/users/profile`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.data.status === "success") {
          setNameRequester(res.data.data.fullName);
          setPhoneRequester(res.data.data.phoneNumber);
          setEmailRequester(res.data.data.email);
          // setLokasiCabang(res.data.data.location);

          const newParam = {
            ...paramProfiling,
            nameRequester: res.data.data.fullName,
            telephoneNumberRequester: res.data.data.phoneNumber,
            emailRequester: res.data.data.email,
          };
          // console.log("change data global informasi umum newParam", newParam);
          onChangeData(newParam);
        }
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  const [position, setPosition] = useState(defaultPosition);
  const [dataATM, setDataATM] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [visitor, setVisitor] = useState(0);
  const [idLocation, setIdLocation] = useState("");
  const [cabang, setCabang] = useState("");
  const [roArea, setRoArea] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [nameRequester, setNameRequester] = useState("");
  const [phoneRequester, setPhoneRequester] = useState("");
  const [emailRequester, setEmailRequester] = useState("");
  const [namePengawas, setNamePengawas] = useState("");
  const [phonePengawas, setPhonePengawas] = useState("");
  const [emailPengawas, setEmailPengawas] = useState("");
  const [namePemilik, setNamePemilik] = useState("");
  const [phonePemilik, setPhonePemilik] = useState("");
  const [emailPemilik, setEmailPemilik] = useState("");
  const [lokasiCabang, setLokasiCabang] = useState("");
  const [addressPengawas, setAddressPengawas] = useState("");
  const [jenisBadanUsaha, setjenisBadanUsaha] = useState("");
  const [addressPemilik, setAddressPemilik] = useState("");
  const [rekeningBank, setRekeningBank] = useState("");
  const [nomorRekening, setNomorRekening] = useState("");
  const [atasNama, setAtasNama] = useState("");

  const [isDisableLocation, setIsDisableLocation] = useState(false);
  const [isDisableVisitor, setIsDisableVisitor] = useState(false);
  const [isDisableIdRequester, setIsDisableIdRequester] = useState(false);
  const [isDisableCabang, setIsDisableCabang] = useState(false);
  const [isDisableRoArea, setIsDisableRoArea] = useState(false);
  const [isDisableRecommendation, setIsDisableRecommendation] = useState(false);

  const [isDisableNamePengawas, setIsDisableNamePengawas] = useState(false);
  const [isDisableTelpPengawas, setIsDisableTelpPengawas] = useState(false);
  const [isDisableEmailPengawas, setIsDisableEmailPengawas] = useState(false);
  const [isDisableAlamatPengawas, setIsDisableAlamatPengawas] = useState(false);

  const [isDisableRekeningBank, setIsDisableRekeningBank] = useState(false);
  const [isDisableNoRekening, setIsDisableNoRekening] = useState(false);
  const [isDisableAtasNama, setIsDisableAtasNama] = useState(false);

  const [isDisableNameLandLord, setIsDisableNameLandLord] = useState(false);
  const [isDisableTelpLandLord, setIsDisableTelpLandLord] = useState(false);
  const [isDisableEmailLandLord, setIsDisableEmailLandLord] = useState(false);
  const [isDisableAlamatLandLord, setIsDisableAlamatLandLord] = useState(false);

  const [isDisableJenisBadanUsaha, setIsDisableJenisBadanUsaha] = useState(
    true
  );
  const [isDisable, setIsDisable] = useState(false);
  const [isAddMachine, setIsAddMachine] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openingType, setOpeningType] = useState("");

  const [dataInformasiUmum, setDataInformasiUmum] = useState({
    newLocation: locationName,
    visitorPerDay: visitor,
    // locationId: idLocation, // hapus id location
    branch: cabang,
    area: roArea,
    nameRequester,
    namePicLocation: namePengawas,
    nameLandlord: namePemilik,
    telephoneNumberRequester: phoneRequester,
    emailRequester,
    telephoneNumberPicLocation: phonePengawas,
    emailPicLocation: emailPengawas,
    // telephoneNumberLandlord: phonePemilik,
    numberTelephoneLandlord: phonePemilik,
    emailLandlord: emailPemilik,
    informationRequester: lokasiCabang,
    addressPicLocation: addressPengawas,
    corporateAddressLandlord: addressPemilik,
    recommendation,
    corporateTypeLandlord: jenisBadanUsaha,
    openingType,
  });

  const [dataCabang, setDataCabang] = useState();

  function locationNew() {
    {
      /** NEW */
    }
    // if (locationName !== "") {
    //   if (openingType == "New ATM") {
    //     return `${paramNewLocation}.${locationName}`;
    //   } else {
    //     return `${paramNewLocation}${locationName}`;
    //   }
    // } else {
    //   return `${paramNewLocationNoR}${locName}`;
    // }
    {
      /** OLD */
    }
    if (isAddMachine || isEdit) {
      if (locationName !== "") {
        return `${locationHeader}.${locationName}`;
      } 
      return `${locHeaderNoR}.${locName}`;
      
    } 
    if (locationName !== "") {
      return `${paramNewLocation}${locationName}`;
    } 
    return `${paramNewLocationNoR}${locName}`;
    
  }

  useEffect(() => {
    setDataInformasiUmum({
      // newLocation:
      //   locationName !== ""
      //     ? `${locationHeader}.${locationName}`
      //     : `${locHeaderNoR}.${locName}`,
      // newLocation:
      //   locationName !== ""
      //     ? `${paramNewLocation}${locationName}`
      //     : `${paramNewLocationNoR}${locName}`,
      newLocation: locationNew(),
      visitorPerDay: visitor !== 0 ? visitor : visitorNoR,
      // locationId: idLocation, // hapus id location
      branch: cabang !== "" ? cabang : cabangNoR,
      area: roArea !== "" ? roArea : roAreaNoR,
      nameRequester: nameRequester !== "" ? nameRequester : nameRequesterNoR,
      namePicLocation: namePengawas !== "" ? namePengawas : namePengawasNoR,
      nameLandlord: namePemilik !== "" ? namePemilik : namePemilikNoR,
      telephoneNumberRequester:
        phoneRequester !== "" ? phoneRequester : phoneRequesterNoR,
      emailRequester:
        emailRequester !== "" ? emailRequester : emailRequesterNoR,
      telephoneNumberPicLocation:
        phonePengawas !== "" ? phonePengawas : phonePengawasNoR,
      emailPicLocation: emailPengawas !== "" ? emailPengawas : emailPengawasNoR,
      // telephoneNumberLandlord:
      numberTelephoneLandlord:
        phonePemilik !== "" ? phonePemilik : phonePemilikNoR,
      emailLandlord: emailPemilik !== "" ? emailPemilik : emailPemilikNoR,
      informationRequester:
        lokasiCabang !== "" ? lokasiCabang : lokasiCabangNoR,
      addressPicLocation:
        addressPengawas !== "" ? addressPengawas : addressPengawasNoR,
      corporateAddressLandlord:
        addressPemilik !== "" ? addressPemilik : addressPemilikNoR,
      recommendation:
        recommendation !== "" ? recommendation : recommendationNoR,
      corporateTypeLandlord:
        jenisBadanUsaha !== "" ? jenisBadanUsaha : jenisBadanUsahaNoR,
      // BANK ACCOUNT
      nameBank: rekeningBank !== "" ? rekeningBank : rekeningBankNoR,
      noRekeningPic: nomorRekening !== "" ? nomorRekening : noRekeningNoR,
      nameRekeningPic: atasNama !== "" ? atasNama : atasNamaNoR,
    });
  }, [
    locationName,
    visitor,
    idLocation,
    cabang,
    roArea,
    nameRequester,
    namePengawas,
    namePemilik,
    phoneRequester,
    emailRequester,
    phonePengawas,
    emailPengawas,
    phonePemilik,
    emailPemilik,
    lokasiCabang,
    addressPengawas,
    addressPemilik,
    recommendation,
    jenisBadanUsaha,
  ]);

  useEffect(() => {}, []);

  const [listLocationName, setListLocationName] = useState([]);
  const [locationHeader, setLocationHeader] = useState("");
  const [machineType, setMachineType] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOnPremises, setisOnPremises] = useState("");
  const [isATMBusiness, setIsATMBusiness] = useState(false);
  const [paramNewLocation, setParamNewLocation] = useState("");
  const [isErrorEmailRequester, setIsErrorEmailRequester] = useState(false);
  const [isErrorEmailPic, setIsErrorEmailPic] = useState(false);
  const [isErrorEmailLandlord, setIsErrorEmailLandlord] = useState(false);
  const [isErrorPhoneRequester, setIsErrorPhoneRequester] = useState(false);
  const [isErrorPhonePic, setIsErrorPhonePic] = useState(false);
  const [isErrorPhonePemilik, setIsErrorPhonePemilik] = useState(false);

  useEffect(() => {
    // console.log("Loc Header : ", locationHeader);
    // console.log("Heavy Machine Gun : ", machineType);
  }, [locationHeader, machineType]);

  function splitLocationName(res, type, machineType) {
    {
      /** New split */
    }
    // const newArr = res.split(".");
    // setListLocationName(newArr);
    // let lastName = newArr[newArr.length - 1];
    // setLocationName(lastName);
    // if (lastName != "") {
    //   newArr.pop();
    //   setParamNewLocation(newArr.join(""));
    // } else {
    //   setParamNewLocation(res);
    // }
    {
      /** old */
    }
    const construct = [];
    if (res) {
      const newArr = res.split(".");
      for (const each in newArr) {
        if (newArr[each] !== "") {
          construct.push(newArr[each]);
          setListLocationName(construct);
        }
      }
      // setLocationName(newArr && newArr[2]);
      if (type === "OP") {
        if (machineType === "ATM") {
          setLocationHeader(`${newArr[0]}`);
          locHeaderNoR = `${newArr[0]}`;
          setLocationName(newArr && newArr[1] ? newArr[1] : "");
        } else {
          setLocationHeader(`${newArr[0]}.${newArr[1]}`);
          locHeaderNoR = `${newArr[0]}.${newArr[1]}`;
        }
      } else {
        setLocationHeader(`${newArr[0]}.${newArr[1]}`);
        locHeaderNoR = `${newArr[0]}.${newArr[1]}`;
      }
      // setLocationHeader(`${newArr[0]}.${newArr[1]}`);
      // locHeaderNoR = `${newArr[0]}.${newArr[1]}`;
      if (newArr[2]) {
        if (
          newArr[2] !== "ATM" &&
          newArr[2] !== "CDM" &&
          newArr[2] !== "CRM" &&
          newArr[2] !== "MDM"
        ) {
          setLocationName(newArr[2]);
          setIsDisableLocation(true);
        } else {
          setLocationHeader(`${newArr[0]}.${newArr[1]}.${newArr[2]}`);
          locHeaderNoR = `${newArr[0]}.${newArr[1]}.${newArr[2]}`;
          setIsDisableLocation(false);
        }
      }
    }
  }

  function acc_format(value) {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,15}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 5) {
      parts.push(match.substring(i, i + 5));
    }
    if (parts.length) {
      return parts.join("-");
    }
    return value;
  }

  useEffect(() => {
    // onChangeData(dataInformasiUmum);
  }, [dataInformasiUmum]);

  const newHandleDataInformasiUmum = (data, keyData) => {
    const newDataInformasiUmum = {
      ...dataValue,
      [keyData]: data,
    };
    // console.log(
    //   "change data global informasi umum newHandleDataInformasiUmum",
    //   newDataInformasiUmum
    // );
    onChangeData(newDataInformasiUmum);
    // setDataInformasiUmum(newDataInformasiUmum);
  };

  const handleLocationChange = (e) => {
    let newLocationName = dataValue.newLocation.split(".");
    // newLocationName.pop();
    // console.log("new location before pop", newLocationName);
    newLocationName = newLocationName.slice(0, newLocationName.length - 1);
    // console.log("new location name pop", newLocationName);
    newLocationName.push(e.target.value);
    // console.log("new location name push", newLocationName);
    newLocationName = newLocationName.join(".");
    newHandleDataInformasiUmum(newLocationName, "newLocation");
    // setLocationName(newLocationName);
    // setLocationName(e.target.value);
    // locName = e.target.value;
  };
  const handleVisitorChange = (e) => {
    newHandleDataInformasiUmum(e.target.value, "visitorPerDay");
    // setVisitor(e.target.value);
    // visitorNoR = e.target.value;
  };
  const handleIdLocationChange = (e) => {
    newHandleDataInformasiUmum(e.target.value, "idLocation");
    setIdLocation(e.target.value);
    idLocationNoR = e.target.value;
  };
  const handleCabangChange = (e) => {
    // newHandleDataInformasiUmum(e, "branch");
    newHandleDataInformasiUmum(e.target.value, "branch");
    // setCabang(e.target.value);
    // cabangNoR = e.target.value;
  };
  const handleCodeGfms = (e) => {
    newHandleDataInformasiUmum(e.target.value, "codeGFMS");
  };
  const handleBranchInitial = (e) => {
    newHandleDataInformasiUmum(e.target.value, "branchInitial");
    // newHandleDataInformasiUmum(e.target.value, "area");
    // setRoArea(e.target.value);
    // roAreaNoR = e.target.value;
  };
  const handleRecommendationChange = (e) => {
    newHandleDataInformasiUmum(e.target.value, "recommendation");
    // setRecommendation(e.target.value);
    // recommendationNoR = e.target.value;
  };
  const handleRequesterName = (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameRequester");
    // setNameRequester(e.target.value);
    // nameRequesterNoR = e.target.value;
  };
  const handleRequesterBranchName= (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameBranchOtherBuRequester");
    // setNameRequester(e.target.value);
    // nameRequesterNoR = e.target.value;
  };
  const handlePengawasName = (e) => {
    newHandleDataInformasiUmum(e.target.value, "namePicLocation");
    // setNamePengawas(e.target.value);
    // namePengawasNoR = e.target.value;
  };
  const handleNameLandlord = (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameLandlord");
    // setNamePemilik(e.target.value);
    // namePemilikNoR = e.target.value;
  };
  const handleBusinessEntity= (e) => {
    newHandleDataInformasiUmum(e.target.value, "nameBusinessEntity");
    // setNamePemilik(e.target.value);
    // namePemilikNoR = e.target.value;
  };
  const handlePhoneRequester = (newVal) => {
    if(newVal==="" || newVal===undefined){
      setIsErrorPhoneRequester(true);
    }else{
      setIsErrorPhoneRequester(false);
    }
    // console.log(">>> e", e);
    newHandleDataInformasiUmum(newVal, "telephoneNumberRequester");
    // setPhoneRequester(e.target.value);
    // phoneRequesterNoR = e.target.value;
  };
  const handleEmailRequester = (e) => {
    setIsErrorEmailRequester(!useEmailValidation(e.target.value));
    newHandleDataInformasiUmum(e.target.value, "emailRequester");
    // setEmailRequester(e.target.value);
    // emailRequesterNoR = e.target.value;
  };
  const handlePhonePengawas = (newVal) => {
    if(newVal==="" || newVal===undefined){
      setIsErrorPhonePic(true);
    }else{
      setIsErrorPhonePic(false);
    }
    newHandleDataInformasiUmum(newVal, "telephoneNumberPicLocation");
    // setPhonePengawas(e.target.value);
    // phonePengawasNoR = e.target.value;
  };
  const handleEmailPengawas = (e) => {
    setIsErrorEmailPic(!useEmailValidation(e.target.value));
    newHandleDataInformasiUmum(e.target.value, "emailPicLocation");
    // setEmailPengawas(e.target.value);
    // emailPengawasNoR = e.target.value;
  };
  const handlePhonePemilik = (newVal) => {
    // console.log(">>> handlePhonePemilik",newVal)
    if(newVal==="" || newVal===undefined){
      setIsErrorPhonePemilik(true);
    }else{
      setIsErrorPhonePemilik(false);
    }
    // newHandleDataInformasiUmum(e.target.value, "telephoneNumberLandlord");
    newHandleDataInformasiUmum(newVal, "numberTelephoneLandlord");
    // setPhonePemilik(e.target.value);
    // phonePemilikNoR = e.target.value;
  };
  const handleEmailPemilik = (e) => {
    // console.log(">>> validation", useEmailValidation(e.target.value));
    setIsErrorEmailLandlord(!useEmailValidation(e.target.value));
    
    newHandleDataInformasiUmum(e.target.value, "emailLandlord");
    // setEmailPemilik(e.target.value);
    // emailPemilikNoR = e.target.value;
  };
  const handleLokasiCabang = (e) => {
    newHandleDataInformasiUmum(e.target.value, "informationRequester");
    // setLokasiCabang(e.target.value);
    // lokasiCabangNoR = e.target.value;
  };
  const handleAddressPengawas = (e) => {
    newHandleDataInformasiUmum(e.target.value, "addressPicLocation");
    // setAddressPengawas(e.target.value);
    // addressPengawasNoR = e.target.value;
  };
  const handleAddressPemilik = (e) => {
    newHandleDataInformasiUmum(e.target.value, "corporateAddressLandlord");
    // setAddressPemilik(e.target.value);
    // addressPemilikNoR = e.target.value;
  };
  const handleJenisBadanUsaha = (e) => {
    newHandleDataInformasiUmum(e, "corporateTypeLandlord");
    // setjenisBadanUsaha(e);
    // jenisBadanUsahaNoR = e;
  };
  const handleRekeningBank = (value) => {
    console.log(">>>> value",value);
    newHandleDataInformasiUmum(value, "nameBank");
    // newHandleDataInformasiUmum(e.target.value, "nameBank");
    // setRekeningBank(e.target.value);
    // rekeningBankNoR = e.target.value;
  };
  const handleNoRekening = (e) => {
    newHandleDataInformasiUmum(acc_format(e.target.value), "noRekeningPic");
    // setNomorRekening(acc_format(e.target.value));
    // noRekeningNoR = e.target.value;
  };
  const handleAtasNama = (e) => {
    newHandleDataInformasiUmum(acc_format(e.target.value), "nameRekeningPic");
    // setAtasNama(e.target.value);
    // atasNamaNoR = e.target.value;
  };

  function onSelectBranch(value, option){
    setRoArea(option.id);
    roAreaNoR = option.id;
    newHandleDataInformasiUmum(value, "branch");
    // newHandleDataInformasiUmum(option.id, "area")
  };

  useEffect(() => {
    newHandleDataInformasiUmum(roArea !=="" ? roArea : roAreaNoR, "area");
  }, [roArea]);

  return (
    <AccordionContainer title="Informasi Umum" defaultExpanded>
      <div className={classes.root}>
        <ModalMap
          isOpen={isOpenModal}
          position={dataValue.position}
          dataATM={dataValue.dataATM}
          onClose={(e) => setIsOpenModal(false)}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Suspense fallback={<div />}>
              <ChkyLeafletMaps
                height={200}
                position={dataValue.position}
                dataATM={dataValue.dataATM}
                disableTooltip
                onClickMap={(e) => setIsOpenModal(true)}
              />
            </Suspense>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className={classes.subTitle}
            >{`Location (${dataValue.locationMode})`}</Typography>
            <Grid container className={classes.generateLocContainer}>
              {dataValue.newLocation.split(".").map((item, index) => {
                if (dataValue.newLocation.split(".").length - 1 != index) {
                  return (
                    <Grid item className={classes.generateLocItemAuto}>
                      <Typography>{item}</Typography>
                    </Grid>
                  );
                }
              })}
              <Grid item className={classes.generateLocItemIput}>
                <TextField
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  placeholder="Location name"
                  onChange={handleLocationChange}
                  value={
                    dataValue.newLocation.split(".")[
                      dataValue.newLocation.split(".").length - 1
                    ]
                  }
                />
                {errorForm.locationName ? (
                  <ErrorComponent style={{ paddingTop: 10 }} />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              className={classes.spacerTop}
              justify="space-between"
            >
              <Grid item xs={3}>
                <Grid container direction="column">
                  <Typography className={classes.subTitle}>Visitor per day</Typography>
                  <NumericInput
                    placeholder="0"
                    maxLength={11}
                    value={dataValue.visitorPerDay}
                    onValueChange={(val) => {
                      const newVal = val.floatValue;
                      newHandleDataInformasiUmum(newVal, "visitorPerDay");
                    }}
                  />
                  {errorForm.visitorPerDay ? (
                    <ErrorComponent style={{ position: "unset" }} />
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction="column">
                  <Typography className={classes.subTitle}>ID Requester</Typography>
                  <ChkyInputSmall
                    placeholder="Id location"
                    onChange={handleIdLocationChange}
                    value={dataValue.locationId}
                    // value={idLocation !== "" ? idLocation : idLocationNoR}
                    disabled={dataValue.isDisableIdRequester}
                  />
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction="column">
                  <Typography className={classes.subTitle}>Kode GFMS</Typography>
                  {/* <AutoComplete
                    style={{ width: '100%' }}
                    options={options}
                    defaultValue={dataValue.branch}
                    placeholder="Search Branch"
                    filterOption={(inputValue, option) =>
                      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={onSelectBranch}
                  /> */}
                  <ChkyInputSmall
                    placeholder="Kode GFMS"
                    onChange={handleCodeGfms}
                    value={dataValue.codeGFMS}
                  />

                  {errorForm.codeGFMS ? (
                    <ErrorComponent style={{ position: "unset" }} />
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container direction="column">
                  <Typography className={classes.subTitle}>Initial Cabang</Typography>
                  <ChkyInputSmall
                    placeholder="Initial"
                    onChange={handleBranchInitial}
                    value={dataValue.branchInitial}
                    // value={roArea !== "" ? roArea : roAreaNoR}
                    // disabled={isDisableRoArea}
                    // disabled
                  />
                  {errorForm.branchInitial ? (
                    <ErrorComponent style={{ position: "unset" }} />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <Grid container direction="column">
              <Typography className={classes.subTitle}>Nearest ATM</Typography>
              <Grid container justify="space-between" spacing={2}>
                {/* {dataNearest.map((item)=>{ */}
                {dataValue.dataATM &&
                dataValue.dataATM.map((item) => {
                  return (
                    <Grid item xs={4}>
                      <NearestComponent
                        title={item.locationName}
                        id={item.atmId}
                        // machineType={item.potentialModel}
                        address={item.locationAddress}
                        condition={item.condition}
                        avgTransaction={item.averageTransaction}
                        distance={item.distanceInMeter}
                        machineType={item.machineType}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.subTitle}>Recommendation</Typography>
            <ChkyInputSmall
              multiline
              rows={6}
              placeholder="Text"
              fullWidth
              onChange={handleRecommendationChange}
              value={dataValue.recommendation}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "flex-end",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} justify="space-between">
          {/* Informasi Requester CONTAINER */}
          <Grid item xs={4}>
            <Typography className={classes.subTitle}>
            Informasi Requester
            </Typography>
            <div className={classes.margin10px} />
            <Typography className={classes.subSubTitle}>Nama</Typography>
            <div className={classes.margin5px} />
            <ChkyInputSmall
              disabled={dataValue.isDisable}
              fullWidth
              placeholder="Username"
              onChange={handleRequesterName}
              value={dataValue.nameRequester}
            />
            {errorForm.nameRequester ? <ErrorComponent /> : null}
            <div className={classes.margin10px} />
            <Typography className={classes.subSubTitle}>Nama Branch / Other BU</Typography>
            <div className={classes.margin5px} />
            <ChkyInputSmall
              disabled={dataValue.isDisable}
              fullWidth
              placeholder="Username"
              onChange={handleRequesterBranchName}
              value={dataValue.nameBranchOtherBuRequester}
            />
            <div className={classes.margin10px} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Typography className={classes.subSubTitle}>
                  Nomor Telp
                  </Typography>
                  <div className={classes.margin5px} />
                  <PhoneNumberInput 
                    disabled={dataValue.isDisable}
                    value={dataValue.telephoneNumberRequester} 
                    onChange={handlePhoneRequester}/>
                  {isErrorPhoneRequester || errorForm.telephoneNumberRequester ? (
                    <ErrorComponent style={{ position: "unset" }} />
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Typography className={classes.subSubTitle}>Email</Typography>
                  <div className={classes.margin5px} />
                  <ChkyInputSmall
                    disabled={dataValue.isDisable}
                    fullWidth
                    placeholder="Email"
                    onChange={handleEmailRequester}
                    value={dataValue.emailRequester}
                  // value={
                  //   emailRequester !== "" ? emailRequester : emailRequesterNoR
                  // }
                  />
                  {isErrorEmailRequester || errorForm.emailRequester ? (
                    <ErrorComponent
                      style={{ position: "unset" }}
                      label="! Required, please insert correct email format."
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.margin10px} />
            <Grid container>
              <Typography className={classes.subSubTitle}>
              Alamat Branch / Other BU
              </Typography>
              <ChkyInputSmall
                disabled={dataValue.isDisable}
                multiline
                rows={3}
                placeholder="Address"
                fullWidth
                onChange={handleLokasiCabang}
                value={dataValue.informationRequester}
              />
            </Grid>
          </Grid>
          {/* Informasi Pengawas / Pengelola Lokasi CONTAINER */}
          <Grid item xs={4}>
            <Typography className={classes.subTitle}>
            Informasi PIC Lokasi
            </Typography>
            <div className={classes.margin10px} />
            <Typography className={classes.subSubTitle}>Nama</Typography>
            <div className={classes.margin5px} />
            <ChkyInputSmall
              fullWidth
              placeholder="Username"
              onChange={handlePengawasName}
              value={dataValue.namePicLocation}
            // value={namePengawas !== "" ? namePengawas : namePengawasNoR}
            // disabled={isDisableNamePengawas}
            />
            {errorForm.namePicLocation ? <ErrorComponent /> : null}
            <div className={classes.margin10px} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Typography className={classes.subSubTitle}>
                  Nomor Telp
                  </Typography>
                  <div className={classes.margin5px} />
                  <PhoneNumberInput 
                    onChange={handlePhonePengawas}
                    value={dataValue.telephoneNumberPicLocation}/>
                  {isErrorPhonePic || errorForm.telephoneNumberPicLocation ? (
                    <ErrorComponent style={{ position: "unset" }} />
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Typography className={classes.subSubTitle}>Email</Typography>
                  <div className={classes.margin5px} />
                  <ChkyInputSmall
                    fullWidth
                    placeholder="Email"
                    onChange={handleEmailPengawas}
                    value={dataValue.emailPicLocation}
                  />
                  {isErrorEmailPic || errorForm.emailPicLocation ? (
                    <ErrorComponent
                      style={{ position: "unset" }}
                      label="! Required, please insert correct email format."
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.margin10px} />
            <Grid container direction="column" style={{ marginTop: 20 }}>
              <Typography className={classes.subSubTitle}>
              Rekening Bank
              </Typography>
              <div className={classes.margin5px} />
            
              <ChkySelectInput
                selectOptionData={dataSelectRekeningBank}
                onSelectValueChange={handleRekeningBank}
                value={
                  dataValue.nameBank
                }
                // value={
                //   jenisBadanUsaha !== "" ? jenisBadanUsaha : jenisBadanUsahaNoR
                // }
                // disabled={isDisableJenisBadanUsaha}
              />
              {errorForm.corporateTypeLandlord ? (
                <ErrorComponent label="! Select one" />
              ) : null}
            </Grid>
            <div container style={{ marginTop: 10 }} direction="column">
              <Typography className={classes.subSubTitle}>
              Nomor Rekening
              </Typography>
              <div className={classes.margin5px} />

              <NumericInput
                placeholder="000-000-000"
                separator="-"
                value={dataValue.noRekeningPic}
                onValueChange={(val) => {
                  const newVal = val.floatValue;
                  newHandleDataInformasiUmum(newVal, "noRekeningPic");
                }}
                style={{width: "100%"}}
              />
            </div>
            <Grid container style={{ marginTop: 10 }}>
              <Typography className={classes.subSubTitle}>Atas Nama</Typography>
              <div className={classes.margin5px} />
              <ChkyInputSmall
                fullWidth
                placeholder="Username"
                onChange={handleAtasNama}
                value={dataValue.nameRekeningPic}
              // value={atasNama !== "" ? atasNama : atasNamaNoR}
              // disabled={isDisableAtasNama}
              />
              {/* {errorForm.addressPicLocation ? <ErrorComponent style={{position: 'unset'}}/> : null} */}
            </Grid>
          </Grid>
          {/* Informasi Pemilik CONTAINER */}
          <Grid item xs={4}>
            <Typography className={classes.subTitle}>
            Informasi Pemilik/Badan Usaha
            </Typography>
            <div className={classes.margin10px} />
            <Typography className={classes.subSubTitle}>Nama Penanda Tangan LOO/MOU</Typography>
            <div className={classes.margin5px} />
            <ChkyInputSmall
              fullWidth
              placeholder="Username"
              onChange={handleNameLandlord}
              value={dataValue.nameLandlord}
            // value={namePemilik !== "" ? namePemilik : namePemilikNoR}
            // disabled={isDisableNameLandLord}
            />
            {errorForm.nameLandlord ? <ErrorComponent /> : null}
            <div className={classes.margin10px} />
            <Typography className={classes.subSubTitle}>Nama Badan Usaha</Typography>
            <div className={classes.margin5px} />
            <ChkyInputSmall
              fullWidth
              placeholder="Nama Badan Usaha"
              onChange={handleBusinessEntity}
              value={dataValue.nameBusinessEntity}
            // value={namePemilik !== "" ? namePemilik : namePemilikNoR}
            // disabled={isDisableNameLandLord}
            />
            {/* {errorForm.nameLandlord ? <ErrorComponent /> : null} */}
            <div className={classes.margin10px} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Typography className={classes.subSubTitle}>
                  Nomor Telp
                  </Typography>
                  <div className={classes.margin5px} />
                  <PhoneNumberInput 
                    onChange={handlePhonePemilik}
                    value={dataValue.numberTelephoneLandlord}/>
                  {/* {errorForm.telephoneNumberLandlord ? ( */}
                  {isErrorPhonePemilik || errorForm.numberTelephoneLandlord ? (
                    <ErrorComponent style={{ position: "unset" }} />
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="column">
                  <Typography className={classes.subSubTitle}>Email</Typography>
                  <div className={classes.margin5px} />
                  <ChkyInputSmall
                    fullWidth
                    placeholder="Email"
                    onChange={handleEmailPemilik}
                    value={dataValue.emailLandlord}
                  // value={emailPemilik !== "" ? emailPemilik : emailPemilikNoR}
                  // disabled={isDisableEmailLandLord}
                  />
                  {isErrorEmailLandlord || errorForm.emailLandlord ? (
                    <ErrorComponent
                      style={{ position: "unset" }}
                      label="! Required, please insert correct email format."
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.margin10px} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography className={classes.subSubTitle}>
                Jenis Badan Usaha
                </Typography>
                <ChkySelectInput
                  selectFirstDummy="- Pilih Jenis Badan Usaha -"
                  selectOptionData={dataSelectJenisBadanUsaha}
                  onSelectValueChange={handleJenisBadanUsaha}
                  value={
                    dataValue.corporateTypeLandlord ||
                  "- Pilih Jenis Badan Usaha -"
                  }
                />
                {errorForm.corporateTypeLandlord ? (
                  <ErrorComponent label="! Select one" />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.margin10px} />
      </div>
    </AccordionContainer>
  );
};

LocationInformasiUmum.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  errorForm: PropTypes.object,
  dataValue: PropTypes.object,
};

LocationInformasiUmum.defaultProps = {
  data: [],
  errorForm: {},
  dataValue: {
    newLocation: "xxx.xxx.",
    visitorPerDay: "",
    locationId: "", // hapus id location
    branch: "",
    area: "",
    nameRequester: "",
    namePicLocation: "",
    nameLandlord: "",
    telephoneNumberRequester: "",
    emailRequester: "",
    telephoneNumberPicLocation: "",
    emailPicLocation: "",
    // telephoneNumberLandlord: "",
    numberTelephoneLandlord: "",
    emailLandlord: "",
    informationRequester: "",
    addressPicLocation: "",
    corporateAddressLandlord: "",
    recommendation: "",
    corporateTypeLandlord: "",
    openingType: "",
    dataATM: [],
    position: [0, 0],
    isChangeData: false,
  },
};

export default LocationInformasiUmum;
