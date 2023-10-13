/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import { makeStyles, TableCell, Typography, Table, TableRow } from '@material-ui/core';
import NumberInput from '../../../../components/chky/IdrNumberInput';
import RupiahConverter from '../../../../helpers/useRupiahConverter';

const useStyles = makeStyles({
    tableWidth: {
      width: '100%'
    },
    tableCellBorder: {
      borderBottom: 'unset'
    },
    textOne: {
      fontSize: '13px',
      align: "center",
      marginLeft: 20,
      marginTop: 25
    },
    textOneb: {
      fontSize: '13px',
      align: "center",
      marginLeft: 20,
      marginTop: 5
    },
    textTwo: {
      fontSize: '13px',
      align: "center",
      marginLeft: 35,
      marginTop: 5
    },
    textTwob: {
      fontSize: '13px',
      align: "center",
      marginLeft: 45,
      marginTop: 5
    }
});

const LetterAddition = (props) => {
  const {input, handleChange, deposit} = props;
  const classes = useStyles();
  return (
    <div style={{textAlign:'justify'}}>
      <Typography className={classes.textOne}>Dokumen legalitas yang masih berlaku, harus disiapkan dan di kirim sebagai berikut :</Typography>
      <Typography className={classes.textOneb}>A. Jika pemilik lokasi berupa Perseroan Terbatas (PT) :</Typography>
      <Typography className={classes.textTwo}>•	Akta Pendirian + SK</Typography>
      <Typography className={classes.textTwo}>•	Akta Susunan Kepengurusan Terakhir + SK</Typography>
      <Typography className={classes.textTwo}>•	Akta Menkumham</Typography>
      <Typography className={classes.textTwo}>•	Akta Perubahan Anggaran Dasar + SK</Typography>
      <Typography className={classes.textTwo}>• Nomer Induk Berusaha (NIB)</Typography>
      <Typography className={classes.textTwob}>- Surat Izin Usaha Perdagangan (SIUP)</Typography>
      <Typography className={classes.textTwob}>- Tanda Daftar Perusahaan (TDP)</Typography>
      <Typography className={classes.textTwo}>•	Surat Keterangan Domisili</Typography>
      <Typography className={classes.textTwo}>•	Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)</Typography>
      <Typography className={classes.textTwo}>•	E-KTP Perwakilan PT yang sah</Typography>
      <Typography className={classes.textOneb}>B. Jika Pemilik Lokasi Perseorangan :</Typography>
      <Typography className={classes.textTwo}>•	E-KTP Suami Isteri, KK &amp; Akta Nikah (menikah)</Typography>
      <Typography className={classes.textTwo}>•	E-KTP Pemilik &amp; KK (belum menikah)</Typography>
      <Typography className={classes.textTwo}>•	NPWP</Typography>
      <Typography className={classes.textOneb}>C. Objek Sewa :</Typography>
      <Typography className={classes.textTwo}>•	Sertifikat Kepemilikan Lahan</Typography>
      <Typography className={classes.textTwo}>•	IMB dan PBB</Typography>

      <Typography className={classes.textOne}>Pernyataan dan Jaminan :</Typography>
      <Typography className={classes.textOneb}>- Kedua belah pihak merupakan pihak yang cakap hukum dan berwenang menandatangani Surat ini.</Typography>
      <Typography className={classes.textOneb}>- Pemilik menjamin kebenaran dan keaslian dari identitas dan dokumen-dokumen yang ditunjukkan kepada CIMB Niaga.</Typography>
      <Typography className={classes.textOneb}>- Selama Masa Sewa Ruangan ATM CIMB Niaga berlangsung, Pemilik Lokasi menjamin bahwa CIMB Niaga tidak akan mendapat gangguan berupa apapun dari Pemilik Lokasi atau Pihak Ketiga.</Typography>

      <Typography className={classes.textOne}>Security Deposit :</Typography>
      <Typography className={classes.textOneb}>Penyewa akan membayarkan uang Security Deposit sebesar {<NumberInput className={input} type='any' onValueChange={handleChange} prefix={'Rp.'} value={RupiahConverter(deposit)}/>} kepada Pemilik. Uang Security Deposit tersebut bebas bunga dan sepenuhnya akan dikembalikan pada waktu berakhirnya Perjanjian Sewa Ruangan ATM CIMB Niaga.</Typography>

      <Typography className={classes.textOne}>Pajak :</Typography>
      <Typography className={classes.textOneb}>Pajak apapun yang terkait dengan penggunaan ruangan harus sesuai dengan ketentuan peraturan perpajakan Indonesia yang berlaku.</Typography>

      <Typography className={classes.textOne}>Ketentuan Lain-Lain :</Typography>
      <Typography className={classes.textOneb}>- Pemilik wajib menyerahkan Objek Sewa kepada Penyewa selambat-lambatnya 14 hari sebelum Tanggal Awal sewa.</Typography>
      <Typography className={classes.textOneb}>- Pemilik wajib menyerahkan dokumen legalitas sebagaimana dimaksud pada butir 9 di atas, selambat-lambatnya 5 hari sejak ditandatanganinya surat ini.</Typography>
      <Typography className={classes.textOneb}>- Pemilik dan Penyewa wajib menandatangani perjanjian penggunaan ruangan dengan estimasi jangka waktu 30 hari kalender sejak penandatanganan Surat ini.</Typography>

      <Typography className={classes.textOne}>Bahwa dengan ditandatanganinya Surat ini, para pihak yang menandatangani surat ini telah sepakat dan setuju bahwa ketentuan diatas telah berlaku mengikat kedua belah pihak dan jika terdapat perubahan akan disepakati kembali sampai ditandatanganinya Perjanjian Sewa Ruangan ATM CIMB Niaga ditandatangani.</Typography>
    </div>
  );
};

export default LetterAddition;