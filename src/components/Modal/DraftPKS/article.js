/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles, TableCell, Typography, Table, TableRow } from '@material-ui/core';
import { useFormatter } from '../../../helpers';

const useStyles = makeStyles({
  tableWidth: {
    width: '100%'
  },
  tableCellBorder: {
    borderBottom: 'unset',
    textAlign: 'justify'
  }
});

const article = (props) => {
  const {data, managerName, company} = props;
  // console.log("+++ dataPKS", data);
  const classes = useStyles();
  const [flatCost, setFlatCost] = useState(true);
  const [yearlyRentCostList, setYearlyRentCostList] = useState([]);
  
  useEffect(() => {
    if(data!==null){
      setFlatCost(data.flatCost);
      //convert string to array yearlyrentcost
      const dataCostList = data.yearlyRentCost;
      const arrayData = dataCostList?.replace("[", "").replace("]", "").split(",");
      setYearlyRentCostList(arrayData);
    }
  }, [data])
  function isNull(value){
    if(value === null || value === undefined){
      return true;
    }
    return false;
  }
  return (
    <div style={{margin: 20}}> 
      <Typography variant="h5" align="center">Pasal 1</Typography>
      <Typography variant="h5" align="center">JANGKA WAKTU SEWA</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>1.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
              Perjanjian ini berlaku untuk jangka waktu <b>{isNull(data.rentYear)? '-': data.rentYear}</b> tahun, 
              terhitung mulai tanggal &nbsp; <b>({isNull(data.startRentDate)? '-': useFormatter.timestampToDateId(data.startRentDate)})</b> &nbsp; dan 
              akan berakhir pada tanggal &nbsp;  <b>({isNull(data.endRentDate)? '-': useFormatter.timestampToDateId(data.endRentDate)})</b> &nbsp; 
              (selanjutnya disebut <b>"Jangka Waktu Sewa"</b>).
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>1.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
              PEMILIK memberi hak utama kepada PENYEWA untuk memperpanjang masa sewa,&nbsp; untuk jangka waktu 3 (tiga) tahun berikut 
              berturut-turut setelah jangka waktu sewa ini berakhir, dengan harga, syarat-syarat dan ketentuan-ketentuan yang akan ditentukan kemudian.
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">Pasal 2</Typography>
      <Typography variant="h5" align="center">HARGA SEWA DAN CARA PEMBAYARANNYA</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>2.1</TableCell>
          <TableCell className={classes.tableCellBorder}>Besarnya harga sewa adalah sebesar 
            {
              yearlyRentCostList?.map((rowList,idxList,arr)=>{
                  return(
                    <>
                      <b> Rp {isNull(data.yearlyRentCost) ? '-' : useFormatter.thousandFormat(rowList)}</b>
                      {data.flatCost===false ? ` (tahun ke ${idxList + 1})` : ` per tahun`}
                      {idxList === arr.length - 1 ? '' : ','}
                    </>
                  )
              })
            }
            . Harga sewa sudah termasuk Pajak Penghasilan (PPh) sebesar 10%,  
            tetapi belum termasuk Pajak Pertambahan Nilai (PPN) sebesar 10% (selanjutnya disebut <strong>“Uang Sewa”</strong>)
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>2.2</TableCell>
        <TableCell className={classes.tableCellBorder}>Uang Sewa atas Ruangan Sewa sudah termasuk biaya listrik, <i>service charge</i>  (kebersihan  & keamanan),  penempatan signage & V-SAT.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>2.3</TableCell>
          <TableCell className={classes.tableCellBorder}>Pembayaran  Uang Sewa untuk jangka waktu tersebut pada Pasal 1 ayat 1 dibayar oleh PENYEWA  secara  sekaligus dimuka, 
              selambatnya 20 (dua puluh) hari kerja setelah invoice/ tagihan yang lengkap dan benar serta faktur pajak asli dari PEMILIK diterima PENYEWA,  
                     untuk itu akan dibuat  kwitansi/ tanda terima yang sah tersendiri oleh PEMILIK atas penerimaan sejumlah uang tersebut. 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>2.4</TableCell>
          <TableCell className={classes.tableCellBorder}>Pembayaran sebagaimana tersebut pada butir 1dilakukan dengan cara transfer ke rekening PEMILIK pada :</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>BANK : <b>{isNull(data.nameBank)? '-': data.nameBank}</b></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>No Rekening:  <b>{isNull(data.noRekeningPic)? '-': data.noRekeningPic}</b></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>Atas Nama :  <b>{isNull(data.nameRekeningPic)? '-': data.nameRekeningPic}</b></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>Dan sebagai tanda penerimaan akan dibuatkan kuitansi tersendiri oleh PEMILIK</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>2.5</TableCell>
          <TableCell className={classes.tableCellBorder}>
              PEMILIK wajib mengembalikan seluruh kelebihan pembayaran Uang Sewa maupun pembayaran lainnya yang telah dibayarkan oleh 
              PENYEWA kepada PEMILIK yang bukan merupakan hak PEMILIK, selambat-lambatnya 14 (empat belas) hari kalender setelah diketahuinya 
              kelebihan pembayaran tersebut. Apabila sampai batas waktu yang telah ditentukan PEMILIK belum mengembalikan kelebihan pembayaran 
              tersebut, maka PEMILIK dengan ini memberikan kuasa kepada PENYEWA untuk mendebit langsung sejumlah kelebihan pembayaran tersebut.
          </TableCell>
        </TableRow>
      </Table>

      <Typography variant="h5" align="center">Pasal 3</Typography>
      <Typography variant="h5" align="center">PENYERAHAN RUANGAN SEWA</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>3.1</TableCell>
          <TableCell className={classes.tableCellBorder}>PEMILIK harus  menyerahkan Ruangan Sewa  yang disewa  PENYEWA dalam  keadaan kosong, tidak sedang  dihuni  atau ditempati  sebagian  atau seluruhnya
                oleh pihak lain lengkap dengan  segala fasilitas – fasilitas  yang disediakan  yang berjalan  dengan baik,  paling lambat 1 (satu) bulan sebelum jangka 
                waktu sewa  dimulai.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>3.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
              Apabila sampai batas waktu yang telah ditentukan/disetujui, PEMILIK belum juga  menyerahkan  atau terlambat menyerahkan Ruangan sewa  
              yang disewakan kepada PENYEWA, maka  untuk setiap hari keterlambatan tersebut, PEMILIK bersedia  membayar denda  sebesar  1%o (satu permil) 
               per hari  dari harga sewa  per tahun kepada PENYEWA.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>3.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
              Jika  keterlambatan  atas penyerahan Ruangan Sewa tersebut  mencapai waktu  2 (dua) bulan, maka Perjanjian  ini dapat dibatalkan  
              oleh PENYEWA  tanpa perlu penetapan hakim untuk itu, dan atas pembatalan tersebut PEMILIK harus mengembalikan seluruh Uang Sewa yang
              telah diterima berikut bunga  kepada PENYEWA  secara  seketika dan sekaligus.
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">Pasal 4</Typography>
      <Typography variant="h5" align="center">PENGGUNAAN RUANGAN SEWA</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>4.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          PENYEWA berhak untuk menggunakan Ruangan Sewa tersebut menurut   kepentingannya, oleh karenanya PENYEWA  berhak  :
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}> &nbsp;
          - untuk   melakukan pembagian tata ruang;
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}> &nbsp;
          - merubah letak dan penambahan fasilitas- fasilitas  di dalam  ruangan sewa
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}> &nbsp;
          - memasang  signage  perusahaan PENYEWA  di dalam  maupun di luar Ruangan Sewa, menurut pertimbangan PENYEWA  sendiri.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}> &nbsp;
          - Dengan ketentuan, bahwa setelah jangka waktu sewa-menyewa tersebut berakhir, PENYEWA  berhak  untuk mengambil kembali  bahan tambahan tersebut.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>4.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          PENYEWA  diperbolehkan untuk memakai/menggunakan Ruangan Sewa  untuk  ruang ATM.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>4.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          PENYEWA  diperbolehkan  untuk  memberikan  hak kepada  pihak lain dalam CIMB Group  untuk memakai/ menggunakan Ruangan sewa. 
          Bahwa untuk  keperluan tersebut di atas, PENYEWA  harus  memberitahukan melalui  surat  kepada PEMILIK. 
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">PASAL 5</Typography>
      <Typography variant="h5" align="center">FASILITAS-FASILITAS</Typography>
      
      <Typography variant="p" style={{textAlign:'justify'}}>Fasilitas-fasilitas yang disediakan PEMILIK atas Ruangan adalah sebagai berikut :</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>5.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
            Listrik
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.1.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Ruangan sewa akan memperoleh aliran listrik sebesar 2.200 watt, yang dioperasikan  secara terus menerus  selama 24  (dua puluh empat) jam  perhari.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.1.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          PEMILIK memasang meteran  listrik untuk menghitung banyaknya pemakaian listrik pada  Ruangan  Sewa.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.1.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Pemasangan instalasi listrik  secara standard berikut meteran listrik disediakan oleh  PEMILIK, sedangkan  perubahan-perubahan dan panel 
          box menjadi tanggungan PENYEWA. PEMILIK bertanggung jawab atas keaslian meteran listrik dan seluruh peralatannya yang dipasang  
          dan beroperasi sesuai dengan ketentuan yang berlaku.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.1.4</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Emergency Power  Supply  (cadangan pembangkit listrik/ diesel) untuk  dapat digunakan PENYEWA  apabila  sewaktu-waktu  listrik dari PLN  padam,
          sehingga  pengoperasian  ATM tidak   terhambat.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>5.2</TableCell>
          <TableCell colSpan='2'  className={classes.tableCellBorder}>
          Space VSAT : 
          PEMILIK menyediakan fasilitas space VSAT sebagai sarana komunikasi ATM
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>5.3</TableCell>
          <TableCell className={classes.tableCellBorder} colSpan='2'>
          Instalasi Kabel Gedung (IKG) : 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.3.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          PEMILIK / Pengelola Gedung menyediakan fasilitas IKG beserta dengan maintenance IKG selama PENYEWA mempergunakan Ruangan Sewa.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.3.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Kegiatan Maintenance IKG tersebut adalah penarikan untuk penggantian kabel yang rusak. Dan dilakukan setelah adanya permintaan dari PENYEWA.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.3.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Biaya yang timbul akibat dari Maintenance IKG tersebut, telah ditetapkan diawal perjanjian sewa dan menjadi beban PENYEWA. 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.4</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Perbaikan Kerusakan : <br/>
          PEMILIK akan memperbaiki  setiap saat kerusakan-kerusakan besar yang terjadi  pada Ruangan Sewa,  yang bukan disebabkan oleh kelalaian  PENYEWA.

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>5.5</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Keamanan    : <br/>
          PEMILIK  berkewajiban  menjaga  keamanan  lokasi ATM tersebut  dari kemungkinan pengrusakan, 
          pencurian dan penambahan barang oleh pihak-pihak  lain yang bermaksud  tidak baik.
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">PASAL 6</Typography>
      <Typography variant="h5" align="center">KEWAJIBAN DAN TANGGUNG JAWAB PENYEWA</Typography>
      <br/>
      <Typography variant="p" style={{textAlign:'justify'}}>
      Sehubungan dengan pemakaian Ruangan Sewa, maka PENYEWA berkewajiban untuk  mentaati syarat-syarat yang 
      ditetapkan oleh PEMILIK sebagai  berikut :
      </Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>6.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Menggunakan  Ruangan Sewa  sebagai  tempat  kegiatan usahanya  yang disetujui oleh Para Pihak tersebut dalam Perjanjian ini seperti 
          tersebut dalam Pasal 4 ayat  (2).
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>6.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Tidak menggunakan Ruangan Sewa, baik sebagian maupun seluruhnya untuk melakukan usaha-usaha  atau kegiatan –kegiatan yang  bertentangan dengan hukum.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>6.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Tidak diperkenankan untuk menyimpan, menimbun atau menyembunyikan, mengijinkan  atau membiarkan  disimpan atau ditimbun 
          senjata api, amunisi, bahan  peledak, sapleter, atau barang-barang berbahaya lainnya, serta pula tidak boleh memasang  
          lampu tempel/gas  di dalam  Ruangan sewa  ; kecuali bahan-bahan untuk menjalankan  usaha  PENYEWA.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>6.4</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Tidak menyewakan  lagi atau menyerahkan Ruangan Sewa sebagian maupun seluruhnya atau mengoperkan atau mengalihkan Ruangan 
          Sewa  ini kepada orang/pihak lain, tanpa persetujuan tertulis lebih  dahulu dari PEMILIK  kecuali  untuk perusahaan yang 
          berada satu  grup dengan  PENYEWA. Jika  dalam 1 (satu)  minggu sesudah menerima Surat permohonan tersebut, PEMILIK tidak/ belum 
           memberi persetujuannya secara  tertulis, maka PEMILIK dianggap telah memberikan persetujuannya.  
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">PASAL 7</Typography>
      <Typography variant="h5" align="center">KEWAJIBAN DAN TANGGUNG JAWAB PEMILIK</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>7.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Sehubungan dengan  pemakaian Ruangan Sewa, maka  PEMILIK berkewajiban supaya fasilitas-fasillitas  seperti  
          tersebut dalam  Pasal 5, senantiasa  harus tetap berjalan dan bekerja dengan baik dan berkelanjutan.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>7.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          PEMILIK berkewajiban untuk menanggung pembayaran Pajak Bumi dan Bangunan (PBB).
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">Pasal 8</Typography>
      <Typography variant="h5" align="center">JAMINAN PEMILIK</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>8.1</TableCell>
          <TableCell className={classes.tableCellBorder} colSpan='2'>
          PEMILIK menjamin  kepada PENYEWA, bahwa :
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>8.1.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apa yang disewakan dengan Perjanjian ini adalah benar-benar milik PEMILIK, tidak tersangkut suatu perkara atau sengketa, 
          tidak dijaminkan atau dipertanggungkan dengan cara apapun juga kepada pihak lain,  dan oleh karenanya PEMILIK menjamin 
          PENYEWA bahwa selama Perjanjian ini berlaku dan berjalan diantara kedua belah pihak, PENYEWA tidak akan mendapat 
          gangguan dan/atau rintangan dari pihak lain dalam menikmati apa yang disewa, dengan demikian membebaskan PENYEWA dari
          segala tuntutan mengenai hal-hal tersebut.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>8.1.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Bangunan  tersebut  tidak mempunyai  kerusakan  strukturil  atau kerusakan  berat lainnya  termasuk  kerusakan  tersembunyi  dan kebocoran.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>8.2</TableCell>
          <TableCell className={classes.tableCellBorder} colSpan='2'>
          PEMILIK atas  biaya sendiri mengasuransikan Bangunan tersebut (tidak termasuk barang-barang  PENYEWA dan lainnya yang berada di Ruangan Sewa) terhadap bahaya kebakaran, kehilangan  atau kerusakan oleh sebab apapun (all risk).
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>8.3</TableCell>
          <TableCell className={classes.tableCellBorder} colSpan='2'>
          PEMILIK menjamin Perjanjian ini tidak bertentangan dengan perjanjian lainnya.
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">PASAL 9</Typography>
      <Typography variant="h5" align="center">PENERUSAN SEWA</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>9.1</TableCell>
          <TableCell className={classes.tableCellBorder} colSpan='2'>
          Perjanjian ini  tidak menjadi  berakhir/terhenti karena :
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>9.1.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apabila Bangunan  tersebut  dijual  oleh PEMILIK atau  secara apapun  beralih kepada pihak  lain (ketiga)  atau Bangunan  
          tersebut dijaminkan, maka  Perjanjian  ini tidak menjadi 
          batal  karenanya; dan PEMILIK menjamin  PENYEWA untuk tetap dapat menempati  Ruangan Sewa ini sampai  dengan Perjanjian
          ini berakhir seperti  tersebut dalam Pasal 1 ayat (1) di atas
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>9.1.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apabila  PEMILIK/PENYEWA  dibubarkan, merger, akuisisi dan/atau  dilikuidasi;  dan  dalam hal kejadian demikian, 
          maka pengganti  hak dari PEMILIK/PENYEWA wajib  dan berhak untuk melanjutkan  Perjanjian ini dengan ketentuan-ketentuan
          yang ditetapkan dalam Perjanjian ini.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>9.2</TableCell>
          <TableCell className={classes.tableCellBorder} colSpan='2'>
          Apa yang ditentukan dalam ayat-ayat tersebut di atas berlaku pula terhadap  ahli waris dan penerus hak lainnya  
          dari masing-masing pihak.
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">PASAL 10</Typography>
      <Typography variant="h5" align="center">RELOKASI</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>10.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apabila PEMILIK bermaksud untuk mempergunakan Ruangan Sewa sehingga harus merelokasi dan/atau mereposisi 
          Ruangan Sewa, maka PEMILIK wajib mendapatkan persetujuan tertulis terlebih dahulu dari PENYEWA dan segala 
          biaya yang timbul atas relokasi dan/atau reposisi tersebut menjadi tanggung jawab PEMILIK.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>10.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apabila PENYEWA bermaksud untuk merelokasi Ruangan Sewa, maka PENYEWA dapat mengajukan permohonan terlebih dahulu 
          kepada PEMILIK. Apabila permohonan relokasi tersebut disetujui oleh PEMILIK, maka seluruh biaya yang timbul 
          sehubungan dengan relokasi tersebut menjadi tanggung jawab PENYEWA sepenuhnya.
          </TableCell>
        </TableRow>
      </Table>
      <br/>
      <Typography variant="h5" align="center">PASAL 11</Typography>
      <Typography variant="h5" align="center">KERUSAKAN DAN PERBAIKAN</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>11.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Bilamana  Bangunan  mengalami  kerusakan  yang diakibatkan oleh kebakaran,  banjir, gempa bumi, angin ribut  atau bencana alam lainnya, atau huru hara massa dan sebagainya; maka  PEMILIK  tidak bertanggung jawab  atas kerusakan-kerusakan  yang dialami pada Internal  partitioning  dan dekorasi  serta barang-barang bukan  milik  PEMILIK  yang disimpan/ berada di dalam  Ruangan  Sewa, tetapi  PEMILIK akan  segera memperbaiki/ membangun  kembali Bangunan  tersebut  dan Perjanjian  ini  dianggap  diperpanjang  untuk  jangka  waktu  selama Bangunan  tersebut  tidak dapat  digunakan  sampai dengan  siap  digunakan  lagi, termasuk  pemasangan  partitioning  dan  peralatan  di dalam Ruangan Sewa  tersebut dengan kondisi  dan syarat-syarat  sebagaimana  dinyatakan  dalam  Perjanjian ini.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>11.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Bila setelah 1 (satu) bulan sejak kejadian  tersebut  Pasal 11 ayat 1  di atas  belum dilakukan  perbaikan, atau  jika perbaikan  akan memerlukan waktu lebih  dari 6 (enam) bulan, maka atas  pertimbangan  PENYEWA sendiri,  PENYEWA  berhak  untuk  menghentikan  sewa, dan  Uang Sewa  yang telah  diterima  PEMILIK  harus  dikembalikan  kepada  PENYEWA, setelah  diperhitungkan  dengan  masa sewa  yang telah  dijalani, paling lambat  1 (satu) bulan setelah  permintaan  pertama  PENYEWA.
          </TableCell>
        </TableRow>
      </Table>
      <Typography variant="h5" align="center">PASAL 12</Typography>
      <Typography variant="h5" align="center">BERAKHIR / DIAKHIR </Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>12.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apabila PENYEWA bermaksud mengundurkan diri sebelum Perjanjian ini berakhir, maka PENYEWA tidak berhak untuk meminta kembali Uang Sewa yang telah dibayarkan oleh PENYEWA kepada PEMILIK.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>12.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apabila PEMILIK bermaksud untuk memutuskan Perjanjian ini sebelum berakhirnya Jangka Waktu Sewa, maka PEMILIK wajib mendapat persetujuan terlebih dahulu dari PENYEWA dan PEMILIK wajib memberikan penggantian biaya kompensasi atas pemindahan mesin, pembongkaran VSAT dan neon box serta mengembalikan kelebihan Uang Sewa yang telah dibayarkan oleh PENYEWA untuk masa sewa yang belum dinikmati oleh PENYEWA.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>12.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Perjanjian  ini akan berakhir  sesuai dengan jangka waktu yang telah ditentukan  dalam Pasal 1 ayat (1) juncto Pasal 11 ayat (2) di atas.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>12.4</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Dalam hal pengakhiran Perjanjian, Para Pihak sepakat untuk tidak memberlakukan ketentuan-ketentuan yang tercantum dalam Pasal 1266 dan 1267 Kitab Undang-Undang Hukum Perdata,
          </TableCell>
        </TableRow>
      </Table>
      <Typography variant="h5" align="center">PASAL 13</Typography>
      <Typography variant="h5" align="center">PENYERAHAN KEMBALI</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>13.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Pada  saat  berakhirnya  sewa menyewa  ini dan tidak ada  perpanjangan sewa,  PENYEWA wajib menyerahkan kembali segala yang disewanya tersebut kepada PEMILIK dalam keadaan kosong (tidak dihuni/ ditempati) seluruhnya dan terpelihara baik dan lengkap dengan kunci-kuncinya   yaitu 7 (tujuh) hari setelah berakhirnya Jangka Waktu Sewa.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>13.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Apabila setelah 7 (tujuh) hari dari berakhirnya Jangka Waktu Sewa PENYEWA  belum menyerahkan kembali  apa yang disewanya  itu kepada PEMILIK, maka  PENYEWA  dianggap  lalai, kelalaian mana cukup dibuktikan dengan lewatnya waktu yang telah ditetapkan, sehingga tidak diperlukan teguran dengan surat juru sita atau surat-surat lainnya  semacam  itu, maka untuk tiap-tiap hari keterlambatan, PENYEWA  dikenakan denda sebesar 1%o  (satu permil)  per hari dari harga sewa  per tahun yang dapat ditagih  dan wajib dibayar dengan  seketika dan sekaligus oleh  PENYEWA kepada PEMILIK  atau wakilnya yang sah, ketentuan  mana berlaku untuk waktu  14 (empat belas) hari lamanya setelah sewa-menyewa ini berakhir
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>13.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Bilamana dalam batas waktu tersebut, ternyata  PENYEWA belum juga menyerahkan kembali apa yang disewanya tersebut kepada  PEMILIK,  maka dengan tidak mengurangi kewajiban PENYEWA kepada PEMILIK , untuk  membayar  denda-denda tersebut  di atas atau semua tunggakan/ pembayaran  uang berupa apapun juga yang merupakan kewajiban PENYEWA dan  yang timbul pada waktu Perjanjian ini masih berlaku atau belum dihentikan/ diputuskan, PENYEWA sekarang  ini juga  untuk nanti pada waktunya, yaitu bila nanti pada waktunya, PENYEWA melalaikan kewajibannya menyerahkan  kembali apa  yang disewanya  tersebut pada saat sewa menyewa ini berakhir, memberi kuasa kepada PEMILIK, dengan hak subtitusi untuk menjalankan segala tindakan yang  perlu dan berguna agar dapat menerima kembali apa yang disewanya terebut dalam keadaan kosong lengkap dengan segala kunci-kuncinya,  jika perlu menghubungi  dan dengan bantuan pihak  yang berwajib melaksanakan pengosongan  tersebut, satu dan lainnya atas perongkosan   dan resiko  dari PENYEWA  sepenuhnya.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>13.4</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Bilamana diawal sewa PENYEWA membangun Ruangan Sewa atas biaya PENYEWA sendiri, maka apabila sewa menyewa ini berakhir maka PENYEWA harus menarik ATM dan perlengkapannya, paling lambat 14 (empatbelas) hari terhitung sejak berakhirnya Sewa Menyewa ini. Untuk ruangan sewa yang sifatnya permanen yang dibuat oleh PENYEWA, akan menjadi hak milik PEMILIK.
          </TableCell>
        </TableRow>
      </Table>
      <Typography variant="h5" align="center">PASAL 14</Typography>
      <Typography variant="h5" align="center">PENYELESAIAN DAN PERSELISIHAN DOMISILI HUKUM</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>14.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Dalam hal terjadi perselisihan paham dalam pelaksanaan dan/atau penafsiran Perjanjian ini, Para Pihak sepakat untuk menyelesaikan secara musyawarah dengan penuh itikad baik. Jika perselisihan tersebut tidak dapat diselesaikan oleh Para Pihak secara musyawarah, maka Para Pihak setuju untuk menempuh penyelesaian secara Hukum. 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>14.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Mengenai Perjanjian ini dan segala akibat hukumnya, Para Pihak sepakat memilih domisili hukum yang tetap dan seumumnya di Kantor Kepaniteraan Pengadilan Negeri Jakarta Selatan di Jakarta.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>14.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Tentang Perjanjian ini dan segala akibatnya, Para Pihak memilih tempat kedudukan hukum yang sah dan tidak berubah di Kantor Panitera Pengadilan Negeri <b>{isNull(data.cityName)? '-': data.cityName}</b> di <b>{isNull(data.provinceName)? '-': data.provinceName}</b> .
          </TableCell>
        </TableRow>
      </Table>
      <Typography variant="h5" align="center">PASAL 15</Typography>
      <Typography variant="h5" align="center">KETENTUAN-KETENTUAN LAIN</Typography>
      <Table>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>15.1</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Semua surat  menyurat  yang perlu dikirim  untuk melaksanakan  Perjanjian ini  dialamatkan  pada alamat  di bawah ini :
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder} />
          <TableCell className={classes.tableCellBorder}>
          PEMILIK   :  
            <br/><b>{!company? '-': company}</b>
            <br/><b>{!managerName? '-': managerName}</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder} />
          <TableCell className={classes.tableCellBorder}>
          PENYEWA  :   
            <br/>PT. BANK  CIMB Niaga Tbk <br/> Griya CIMB Niaga 2 Lt. 10 <br/> ATM Busines Group <br/> Jl. Wahid Hasyim Blok B-4 No. 3 <br/>Bintaro Sektor VII - Tangerang 15224
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder} />
          <TableCell className={classes.tableCellBorder}>
          Perubahan-perubahan pada alamat-alamat tersebut di atas, wajib  diberitahukan oleh pihak yang satu kepada pihak lainnya.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>15.2</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Dengan ditanda tanganinya Perjanjian ini oleh kedua belah pihak, tidak mengurangi hak dari PEMILIK  untuk mengatur mengenai  penggunaan atas tempat-tempat  lain di dalam Bangunan  yang berada di luar Ruangan Sewa.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>15.3</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Hal-hal yang belum cukup diatur dalam Perjanjian ini sepanjang mengenai pelaksanaannya akan diatur lebih lanjut oleh Para Pihak dalam perjanjian tambahan (addendum) yang merupakan satu kesatuan dan bagian tak terpisahkan dari Perjanjian ini.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>15.4</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Para Pihak sepakat untuk tidak memberikan Informasi mengenai isi Perjanjian kepada pihak ketiga manapun tanpa persetujuan dari pihak lainnya.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>15.5</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Lampiran dan dokumen lainnya yang berhubungan dengan Perjanjian ini jika ada merupakan saru kesatuan yang tidak terpisahkan dari Perjanjian ini. 
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>15.6</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Segala biaya yang timbul untuk menyelesaikan Perjanjian ini menjadi tanggungan dan harus di tanggung PEMILIK dan PENYEWA.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableCellBorder}>15.7</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Perjanjian ini merupakan keseluruhan perjanjian antara Para Pihak atas segala hal yang berhubungan dengan pokok Perjanjian dan mengesampingkan setiap komunikasi atau kesepahaman lisan maupun tertulis yang dibuat sebelum tanggal Perjanjian ini sehubungan dengan pokok Perjanjian.
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default article;