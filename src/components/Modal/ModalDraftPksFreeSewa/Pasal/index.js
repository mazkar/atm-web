/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles, TableCell, Typography, Table, TableRow } from '@material-ui/core';
import { useFormatter } from '../../../../helpers';
import { AdvancedSmallInput } from '../../../chky/ChkyInputSmall';

const useStyles = makeStyles({
  tableRow: {
    verticalAlign: 'baseline',
  },
  tableCellBorder: {
    borderBottom: 'unset',
    textAlign: 'justify',
    padding: 5
  }
});

const Pasal = (props) => {
  // eslint-disable-next-line react/prop-types
  const {data = {}, handleDataRequest} = props;
  // console.log("+++ dataPKS", data);
  const classes = useStyles();
  const [flatCost, setFlatCost] = useState(true);
  const [yearlyRentCostList, setYearlyRentCostList] = useState([]);
  
  useEffect(() => {
    if(data){
      // convert string to array yearlyrentcost
      const dataCostList = data.yearlyRentCost;
      const arrayData = dataCostList?.replace("[", "").replace("]", "").split(",");
      setYearlyRentCostList(arrayData);
    }
  }, [data]);

  return (
    <div style={{margin: 20}}> 
      <Typography variant="h6" align="center">Pasal 1</Typography>
      <Typography variant="h6" align="center">JANGKA  WAKTU  PEMAKAIAN TEMPAT</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Jangka waktu pemakaian tempat ATM ini berlaku selama PIHAK PERTAMA memiliki kerjasama dengan PIHAK KEDUA. Dan atas pemakaian tempat tersebut PIHAK KEDUA tidak dikenakan biaya sewa.</Typography>
      <br/>
      <Typography variant="h6" align="center">Pasal 2</Typography>
      <Typography variant="h6" align="center">BIAYA – BIAYA YANG TIMBUL ATAS PENEMPATAN ATM</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Biaya-biaya yang timbul atas penempatan ATM CIMB Niaga di <b>{data.nameBusinessEntity? data.nameBusinessEntity : "-"}</b>  dapat dirinci dan dijelaskan sebagai berikut   :</Typography>
      {/* <Typography variant="p" style={{textAlign:'justify'}}></Typography> */}
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>2.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Penyediaan ruangan untuk penempatan ATM menjadi beban <b>{data.nameBusinessEntity? data.nameBusinessEntity : "-"}</b> </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>2.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Pekerjaan pengadaan dan penyambungan listrik untuk kebutuhan operasional ATM dan perlengkapannya menjadi beban <b>{data.nameBusinessEntity? data.nameBusinessEntity : "-"}</b>  termasuk juga untuk biaya pemakaian listriknya selama masa penempatan ATM.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 3</Typography>
      <Typography variant="h6" align="center">PENGGUNAAN  RUANGAN</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>PIHAK KEDUA  berhak untuk   menggunakan Ruangan tersebut untuk ruang ATM, oleh karenanya PIHAK KEDUA  berhak  :</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>-</TableCell>
          <TableCell className={classes.tableCellBorder}>Memasang booth ATM dan menempatkan  signage  perusahaan PIHAK KEDUA  di dalam  maupun di luar Ruangan, menurut standard CIMB Niaga.</TableCell>
        </TableRow>
      </Table>
      <Typography variant="p" style={{textAlign:'justify'}}>Dengan ketentuan, bahwa setelah jangka waktu pemakaian  tempat  tersebut berakhir, PIHAK KEDUA   berhak  untuk mengambil kembali  bahan tambahan tersebut.</Typography>
      
      <Typography variant="h6" align="center">Pasal 4</Typography>
      <Typography variant="h6" align="center">FASILITAS-FASILITAS</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Fasilitas-fasilitas yang disediakan PIHAK PERTAMA atas  Ruangan  adalah sebagai berikut :</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Listrik :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>4.1.1.</TableCell>
                <TableCell className={classes.tableCellBorder}>Ruangan  akan memperoleh aliran listrik sebesar 2.200 watt, yang dioperasikan  secara terus menerus  selama 24  (dua puluh empat) jam  perhari.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>4.1.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>Pemasangan instalasi listrik dalam ruangan  secara standard disediakan oleh  PIHAK PERTAMA, sedangkan  perubahan-perubahan dan panel box menjadi tanggungan PIHAK KEDUA.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Space VSAT	: <br/>PIHAK PERTAMA menyediakan fasilitas space VSAT sebagai sarana komunikasi ATM milik PIHAK KEDUA.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Instalasi Kabel Gedung (IKG) :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>4.3.1.</TableCell>
                <TableCell className={classes.tableCellBorder}>PIHAK PERTAMA / Pengelola Gedung menyediakan fasilitas IKG beserta dengan maintenance IKG selama PIHAK KEDUA mempergunakan Ruangan ATM.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>4.3.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>Kegiatan Maintenance IKG tersebut adalah penarikan untuk penggantian kabel yang rusak. Dan dilakukan setelah adanya permintaan dari PIHAK KEDUA.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>4.3.3.</TableCell>
                <TableCell className={classes.tableCellBorder}>Biaya yang timbul akibat dari Maintenance IKG tersebut, telah ditetapkan diawal perjanjian sewa dan menjadi beban PIHAK PERTAMA.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.4.</TableCell>
          <TableCell className={classes.tableCellBorder}>Perbaikan Kerusakan : <br/>PIHAK PERTAMA  akan memperbaiki  setiap saat kerusakan-kerusakan besar yang terjadi  pada ruangan, yang bukan disebabkan oleh kelalaian  PIHAK KEDUA.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.5.</TableCell>
          <TableCell className={classes.tableCellBorder}>Keamanan	: <br/>PIHAK PERTAMA turut serta  menjaga  keamanan  lokasi ATM tersebut  dari kemungkinan pengrusakan, pencurian dan penambahan barang oleh pihak-pihak  lain yang bermaksud  tidak baik.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 5</Typography>
      <Typography variant="h6" align="center">KEWAJIBAN-KEWAJIBAN DAN TANGGUNG JAWAB  PIHAK KEDUA</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Sehubungan dengan  pemakaian tempat, maka PIHAK KEDUA berkewajiban untuk  mentaati syarat-syarat yang ditetapkan oleh PIHAK PERTAMA sebagai  berikut :</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Menggunakan  Ruangan  sebagai  tempat  kegiatan usahanya  yang disetujui oleh kedua belah  pihak tersebut dalam Perjanjian Pemakaian Tempat ini seperti tersebut dalam Pasal 3. </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Tidak menggunakan Ruangan, baik sebagian maupun seluruhnya untuk melakukan usaha-usaha  atau kegiatan –kegiatan yang  bertentangan dengan hukum.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Tidak diperkenankan untuk menyimpan, menimbun atau menyembunyikan, mengijinkan  atau membiarkan  disimpan atau ditimbun senjata api, amunisi, bahan  peledak, sapleter, atau barang-barang berbahaya lainnya, serta pula tidak boleh memasang  lampu tempel/gas  di dalam  Ruangan; kecuali bahan-bahan untuk menjalankan  usaha  PIHAK KEDUA. </TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 6</Typography>
      <Typography variant="h6" align="center">KEWAJIBAN DAN TANGGUNG  JAWAB PIHAK PERTAMA</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Sehubungan dengan  pemakaian Ruangan, maka  PIHAK PERTAMA berkewajiban supaya fasilitas-fasillitas  seperti  tersebut dalam  Pasal 4, senantiasa  harus tetap berjalan dan bekerja dengan baik dan kontinyu.</Typography>

      <Typography variant="h6" align="center">Pasal 7</Typography>
      <Typography variant="h6" align="center">JAMINAN PIHAK PERTAMA</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>7.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>PIHAK PERTAMA menjamin  kepada PIHAK KEDUA,  bahwa :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>7.1.1</TableCell>
                <TableCell className={classes.tableCellBorder}>Apa yang ditempati  PIHAK KEDUA  dalam Perjanjian Pemakaian Tempat  ini adalah benar-benar hak PIHAK PERTAMA, bebas dari sitaan, tidak dalam sengketa, tidak dijaminkan, dan belum disewakan/dijual kepada pihak  lain serta menjamin  PIHAK KEDUA dapat  menggunakan Ruangan itu tanpa mendapat gangguan oleh  siapapun juga.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>7.1.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>Ruangan  tersebut tidak mempunyai kerusakan strukturil atau kerusakan berat  lainnya  termasuk kerusakan tersembunyi  dan kebocoran.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 8</Typography>
      <Typography variant="h6" align="center">RELOKASI</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>8.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apabila PIHAK PERTAMA bermaksud untuk mempergunakan Ruangan ATM sehingga harus merelokasi dan/atau mereposisi Ruangan, maka PIHAK PERTAMA akan memberitahukan secara tertulis terlebih dahulu kepada PIHAK KEDUA dan segala biaya yang timbul atas relokasi dan/atau reposisi tersebut menjadi tanggung jawab PIHAK PERTAMA.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>8.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apabila PIHAK KEDUA bermaksud untuk merelokasi Ruangan ATM, maka PIHAK KEDUA dapat mengajukan permohonan terlebih dahulu kepada PIHAK PERTAMA. Apabila permohonan relokasi tersebut disetujui oleh PIHAK PERTAMA, maka seluruh biaya yang timbul sehubungan dengan relokasi tersebut menjadi tanggung jawab PIHAK KEDUA sepenuhnya.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 9</Typography>
      <Typography variant="h6" align="center">KERUSAKAN  DAN PERBAIKAN</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>9.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Bilamana  Ruangan mengalami  kerusakan yang diakibatkan  oleh kebakaran, banjir, gempa bumi, angin ribut  atau bencana alam lainnya, atau huru hara massa  dan sebagainya; maka  PIHAK PERTAMA tidak bertanggung jawab  atas kerusakan-kerusakan  yang dialami  pada Internal Partitioning dan dekorasi serta barang-barang bukan milik PIHAK  PERTAMA yang disimpan/ berada  di dalam Ruangan PIHAK KEDUA, tetapi PIHAK PERTAMA akan segera memperbaiki/ membangun kembali  Ruangan  tersebut. </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>9.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>
            Bila setelah  1 bulan sejak kejadian  tersebut pada ayat 1 di atas belum dilakukan  perbaikan, atau jika  perbaikan akan memerlukan  waktu lebih dari  6 bulan, maka  atas pertimbangan  PIHAK KEDUA sendiri, PIHAK KEDUA berhak untuk  menghentikan perjanjian pemakaian tempat ini.
            <br/><br/>
            Pasal 1266 dan 1267 KUH Perdata  dinyatakan tidak berlaku bagi pemutusan perjanjian  dimaksud  pasal ini.
          </TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 10</Typography>
      <Typography variant="h6" align="center">BERAKHIR/ DIAKHIRI  DAN  PENYERAHAN KEMBALI</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>10.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Perjanjian ini akan berakhir sesuai dengan jangka waktu yang telah ditentukan  dalam Pasal 1 juncto Pasal 9 ayat (2) di atas.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>10.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Pada saat berakhirnya Perjanjian Pemakaian Tempat ini, PIHAK KEDUA wajib menyerahkan kembali segala yang dipakainya tersebut kepada PHAK PERTAMA dalam keadaan kosong (tidak dihuni/ ditempati) seluruhnya dan terpelihara baik dan lengkap dengan kunci-kuncinya (jika ada)   yaitu 14 (empat belas) hari dari kerjasama antara PARA PIHAK telah berakhir.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>10.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Bilamana dalam batas waktu tersebut, ternyata  PIHAK KEDUA belum juga menyerahkan kembali apa yang ditempatinya tersebut kepada  PIHAK PERTAMA,  maka PIHAK KEDUA memberi kuasa kepada PIHAK PERTAMA, dengan hak subtitusi untuk menjalankan segala tindakan yang  perlu dan berguna agar dapat menerima kembali apa yang ditempatinya tersebut dalam keadaan kosong lengkap dengan segala kunci-kuncinya,  jika perlu menghubungi  dan dengan bantuan pihak  yang berwajib melaksanakan pengosongan  tersebut, satu dan lainnya atas perongkosan   dan resiko  dari PIHAK KEDUA  sepenuhnya.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 11</Typography>
      <Typography variant="h6" align="center">KETENTUAN-KETENTUAN  LAIN</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>11.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Semua surat  menyurat  yang perlu dikirim  untuk melaksanakan  Perjanjian Pemakaian Tempat  ini  dialamatkan  pada alamat  di bawah ini :</TableCell>
        </TableRow><TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>PIHAK  PERTAMA</TableCell>
                <TableCell className={classes.tableCellBorder}>
                  : <b>{data.nameBusinessEntity? data.nameBusinessEntity : "-"}</b>  <br/>
                  {/* <b>{data.locationName? data.locationName : "-"}</b> <br/> */}
                  {/* <b>{data.address? data.address : "-"}</b> <br/> */}
                   Up: Bp <b>{data.landlordName? data.landlordName : "-"}</b>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>PIHAK  KEDUA</TableCell>
                <TableCell className={classes.tableCellBorder}>
                  :   	PT. BANK  CIMB Niaga Tbk<br/>
                  Griya CIMB Niaga 2 Lt. 10 <br/>
                  Retail Acquisition & Transaction Group<br/>
                  Jl. Wahid Hasyim Blok B-4 No. 3<br/>
                  Bintaro Sektor VII – Tangerang 15224<br/>
                  Up: Linda Elya W  08170026299<br/>
                  Dan<br/>
                  ATM Site Management 
                  <AdvancedSmallInput style={{padding:5}}  stateVar={data.branches} stateModifier={(val)=>handleDataRequest(val, "branches")}/><br/>
                  {/* ____________________________<br/> */}
                   Up: Bp <b>{data.landlordName? data.landlordName : "-"}</b>
                </TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>11.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Dengan ditanda tanganinya Perjanjian Pemakaian Tempat ini oleh kedua belah pihak, tidak mengurangi hak dari PIHAK PERTAMA  untuk mengatur mengenai  penggunaan atas tempat-tempat  lain di dalam Bangunan  yang berada di luar Ruangan .</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>11.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Hal-hal yang belum atau belum cukup diatur dalam Perjanjian Pemakaikan tempat  ini, atau bila terjadi perselisihan paham diantaranya harus diputuskan oleh  kedua belah pihak berdasarkan musyawarah.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>11.4.</TableCell>
          <TableCell className={classes.tableCellBorder}>Tentang Perjanjian Pemakaian Tempat ini dan segala akibatnya, para pihak memilih tempat kedudukan hukum yang sah dan tidak berubah di Kantor Panitera Pengadilan Negeri <b>{data.cityName? data.cityName : "-"}</b>.</TableCell>
        </TableRow>
      </Table>
      {/* <Typography variant="h6" align="center">Pasal </Typography>
      <Typography variant="h6" align="center">-</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>-</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>-</TableCell>
          <TableCell className={classes.tableCellBorder}>-</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>-</TableCell>
          <TableCell className={classes.tableCellBorder}>-</TableCell>
        </TableRow>
      </Table> */}

    </div>
  );
};

export default Pasal;