/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles, TableCell, Typography, Table, TableRow } from '@material-ui/core';
import { useFormatter } from '../../../../helpers';
import { AdvancedSmallInput } from '../../../chky/ChkyInputSmall';
import useTimestampConverter from '../../../../helpers/useTimestampConverter';
import { IdrNumberInput } from '../../../chky';

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

function isNull(value){
  if(value === null || value === undefined){
    return true;
  }
  return false;
}

const Pasal = (props) => {
  // eslint-disable-next-line react/prop-types
  const {data, handleDataRequest} = props;
  // console.log("+++ dataPKS", data);
  const classes = useStyles();
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
      <Typography variant="h6" align="center">JANGKA  WAKTU  PEMAKAIAN TEMPAT</Typography><Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>1.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Perjanjian sewa menyewa ini berlaku untuk jangka waktu <b>{data.rentYear? data.rentYear : "-"}</b> tahun, terhitung mulai tanggal <b>({data.startRentDate? useFormatter.timestampToDateId(data.startRentDate) : "-"})</b> dan akan berakhir pada tanggal  <b>({data.endRentDate? useFormatter.timestampToDateId(data.endRentDate) : "-"})</b>.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>1.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>PEMILIK memberi hak utama kepada PENYEWA untuk memperpanjang masa sewa,  untuk jangka waktu <b>{data.rentYear? data.rentYear : "-"}</b> berikut berturut-turut setelah jangka waktu sewa ini berakhir, dengan harga, syarat-syarat dan ketentuan-ketentuan yang akan ditentukan kemudian.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 2</Typography>
      <Typography variant="h6" align="center">HARGA  SEWA DAN CARA PEMBAYARANNYA</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Besar dan cara pembayaran uang sewa oleh PENYEWA kepada PEMILIK ditentukan sebagai berikut   :</Typography>
      {/* <Typography variant="p" style={{textAlign:'justify'}}></Typography> */}
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>2.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Besarnya  harga sewa adalah sebesar 
          {
              yearlyRentCostList?.map((rowList,idxList,arr)=>{
                  return(
                    <>
                      <b> Rp {isNull(data.yearlyRentCost) ? '-' : useFormatter.thousandFormat(rowList)}</b>
                      {` (tahun ke ${idxList + 1})`}
                      {idxList === arr.length - 1 ? '' : ','}
                    </>
                  )
              })
            }{" "}
          harga sudah termasuk  Pajak Penghasilan (PPh) sebesar 10%,  tetapi belum termasuk Pajak Pertambahan Nilai (PPN) sebesar 11%.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>2.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Besarnya biaya pemakaian Listrik dan Service Charge (bila ada) adalah sebesar 
          <b>Rp. {data.yearlyElectricityCost? useFormatter.thousandFormat(data.yearlyElectricityCost): "-"} </b>
          harga sudah termasuk  Pajak Penghasilan (PPh) sebesar 10%,  tetapi belum termasuk Pajak Pertambahan Nilai (PPN) sebesar 11%.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>2.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Besarnya biaya Maintenance Instalasi Kabel Gedung (IKG) pada saat terjadi kegiatan Maintenance adalah sebesar 
            {/* <AdvancedSmallInput style={{padding:5}}  stateVar={data.maintenanceCost} stateModifier={(val)=>handleDataRequest(val, "maintenanceCost")}/>  */}
            <IdrNumberInput style={{width:150, margin: "0px 5px"}} value={data.maintenanceCost} onValueChange={(val) => handleDataRequest(val.value, "maintenanceCost")} placeholder=""/>
          harga sudah termasuk Pajak Penghasilan (PPh) sebesar 10%,  tetapi belum termasuk Pajak Pertambahan Nilai (PPN) sebesar 11%.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>2.4.</TableCell>
          <TableCell className={classes.tableCellBorder}>Pembayaran  uang sewa, biaya pemakaian listrik dan service charge (bila ada) untuk jangka waktu tersebut pada   pasal 1 ayat 1 tersebut dibayar oleh PENYEWA  secara  sekaligus dimuka, selambatnya 20 (dua puluh) hari kerja setelah invoice/ tagihan dan faktur pajak asli dari PEMILIK diterima PENYEWA,  untuk itu akan dibuat  kwitansi/ tanda terima yang sah tersendiri oleh PEMILIK atas penerimaan sejumlah uang tersebut. </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>2.5.</TableCell>
          <TableCell className={classes.tableCellBorder}>Pembayaran sebagaimana tersebut pada butir 1 dan 2 dilakukan dengan cara transfer ke rekening PIHAK PERTAMA pada :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder} style={{width: 120}}>BANK</TableCell>
                <TableCell className={classes.tableCellBorder}>: <b>{data.bankName? data.bankName : "-"}</b></TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>No Rekening</TableCell>
                <TableCell className={classes.tableCellBorder}>:  <b>{data.noRekeningPic? data.noRekeningPic : "-"}</b></TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>Atas Nama</TableCell>
                <TableCell className={classes.tableCellBorder}>: <b>{data.nameRekeningPic? data.nameRekeningPic : "-"}</b></TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>Dan sebagai tanda penerimaan akan dibuatkan kuitansi tersendiri oleh PIHAK PERTAMA.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 3</Typography>
      <Typography variant="h6" align="center">PENYERAHAN  RUANGAN  SEWA</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>3.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>PEMILIK harus  menyerahkan Ruangan Sewa  yang disewa  PENYEWA dalam  keadaan kosong, tidak sedang  dihuni  atau ditempati  sebagian  atau seluruhnya  oleh pihak lain lengkap dengan  segala fasilitas – fasilitas  yang disediakan  yang berjalan  dengan baik,  paling lambat 1 (satu) bulan sebelum jangka waktu sewa  dimulai.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>3.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apabila sampai batas waktu yang telah ditentukan/disetujui, PEMILIK belum juga  menyerahkan  atau terlambat menyerahkan Ruangan sewa  yang disewakan kepada PENYEWA, maka  untuk setiap hari keterlambatan tersebut, PEMILIK bersedia  membayar denda  sebesar  1%o (satu permil)  per hari  dari harga sewa  per tahun kepada PENYEWA.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>3.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Jika  keterlambatan  atas penyerahan Ruangan Sewa tersebut  mencapai waktu  2 (dua) bulan, maka Perjanjian  ini dapat dibatalkan  oleh PENYEWA  tanpa perlu penetapan hakim untuk itu, dan atas pembatalan tersebut PEMILIK harus mengembalikan seluruh uang sewa yang telah diterima berikut bunga  kepada PENYEWA  secara  seketika dan sekaligus.</TableCell>
        </TableRow>
      </Table> 

      <Typography variant="h6" align="center">Pasal 4</Typography>
      <Typography variant="h6" align="center">PENGGGUNAAN  RUANGAN  SEWA</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>
            PENYEWA berhak untuk   menggunakan Ruangan Sewa tersebut menurut   kepentingannya, oleh karenanya PENYEWA  berhak  : 
            <br/><br/>
            - untuk melakukan pembagian tata ruang;<br/>
            - merubah letak dan penambahan fasilitas- fasilitas  di dalam  ruangan sewa<br/>
            - memasang  signage  perusahaan PENYEWA  di dalam  maupun di luar Ruangan Sewa, menurut pertimbangan PENYEWA  sendiri.<br/>
            <br/><br/>
            Dengan ketentuan, bahwa setelah jangka waktu sewa-menyewa tersebut berakhir, PENYEWA  berhak  untuk mengambil kembali  bahan tambahan tersebut.
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>PENYEWA  diperbolehkan untuk memakai/menggunakan Ruangan sewa  untuk  ruang ATM.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>4.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>
            PENYEWA  diperbolehkan  untuk  memberikan  hak kepada  pihak lain dalam CIMB Group  untuk memakai/ menggunakan Ruangan sewa. <br/><br/>
            Untuk  keperluan tersebut di atas, PENYEWA  harus  memberitahukan melalui  surat  kepada PEMILIK. 
          </TableCell>
        </TableRow>
      </Table> 

      <Typography variant="h6" align="center">Pasal 5</Typography>
      <Typography variant="h6" align="center">FASILITAS-FASILITAS</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Fasilitas-fasilitas yang disediakan PEMILIK atas  Ruangan adalah sebagai berikut :</Typography>
      <Table>

        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Listrik :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.1.1.</TableCell>
                <TableCell className={classes.tableCellBorder}>Ruangan sewa akan memperoleh aliran listrik sebesar 2.200 watt, yang dioperasikan  secara terus menerus  selama 24  (dua puluh empat) jam  perhari.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.1.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>PEMILIK memasang meteran  listrik untuk menghitung banyaknya pemakaian listrik pada  Ruangan  Sewa</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.1.3.</TableCell>
                <TableCell className={classes.tableCellBorder}>
                  Pemasangan instalasi listrik  secara standard berikut meteran listrik disediakan oleh  PEMILIK, sedangkan  perubahan-perubahan dan panel box menjadi tanggungan PENYEWA.
                  PEMILIK bertanggung jawab atas keaslian meteran listrik dan seluruh peralatannya yang dipasang  dan beroperasi sesuai dengan ketentuan yang berlaku.
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.1.3.</TableCell>
                <TableCell className={classes.tableCellBorder}>Emergency Power  Supply  (cadangan pembangkit listrik/ diesel) untuk  dapat digunakan PENYEWA  apabila  sewaktu-waktu  listrik dari PLN  padam, sehingga  pengoperasian  ATM tidak   terhambat.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>

        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Telepon :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.2.1.</TableCell>
                <TableCell className={classes.tableCellBorder}>PEMILIK  menyediakan  sambungan telepon  sebanyak  
                  {/* <AdvancedSmallInput style={{padding:5, width: 75}}  stateVar={data.lineTlp} stateModifier={(val)=>handleDataRequest(val, "lineTlp")}/>  */}
                  <IdrNumberInput style={{width:75, margin: "0px 5px"}} value={data.lineTlp} onValueChange={(val) => handleDataRequest(val.value, "lineTlp")} placeholder=""/>
                  line telepon. Sambungan telepon adalah atas nama PEMILIK.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.1.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>PEMILIK memasang meteran  listrik untuk menghitung banyaknya pemakaian listrik pada  Ruangan  Sewa</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.2.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>Biaya - biaya  untuk menggunakan  sambungan telepon yang  dipergunakan  oleh PENYEWA  setiap bulannya  harus ditanggung  dan dibayar  oleh PENYEWA kepada  PT Telkom, sesuai  dengan  tagihan PT Telkom.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>

        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Space VSAT	: <br/>PEMILIK menyediakan fasilitas space VSAT sebagai sarana komunikasi ATM</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.4.</TableCell>
          <TableCell className={classes.tableCellBorder}>Instalasi Kabel Gedung (IKG) :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.4.1.</TableCell>
                <TableCell className={classes.tableCellBorder}>PEMILIK / Pengelola Gedung menyediakan fasilitas IKG beserta dengan maintenance IKG selama PENYEWA mempergunakan Ruangan Sewa.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.4.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>Kegiatan Maintenance IKG tersebut adalah penarikan untuk penggantian kabel yang rusak. Dan dilakukan setelah adanya permintaan dari PENYEWA.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>5.4.3.</TableCell>
                <TableCell className={classes.tableCellBorder}>Biaya yang timbul akibat dari Maintenance IKG tersebut, telah ditetapkan diawal perjanjian sewa dan menjadi beban PENYEWA.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.5.</TableCell>
          <TableCell className={classes.tableCellBorder}>Perbaikan Kerusakan : <br/>PEMILIK akan memperbaiki  setiap saat kerusakan-kerusakan besar yang terjadi  pada Ruangan Sewa,  yang bukan disebabkan oleh kelalaian  PENYEWA.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>5.6.</TableCell>
          <TableCell className={classes.tableCellBorder}>Keamanan	: <br/>PEMILIK  berkewajiban  menjaga  keamanan  lokasi ATM tersebut  dari kemungkinan pengrusakan, pencurian dan penambahan barang oleh pihak-pihak  lain yang bermaksud  tidak baik.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 6</Typography>
      <Typography variant="h6" align="center">KEWAJIBAN-KEWAJIBAN DAN TANGGUNG JAWAB  PENYEWA</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Sehubungan dengan  pemakaian ruangan sewa, maka PENYEWA berkewajiban untuk  mentaati syarat-syarat yang ditetapkan oleh PEMILIK sebagai  berikut :</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>6.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Menggunakan  Ruangan Sewa  sebagai  tempat  kegiatan usahanya  yang disetujui oleh kedua belah  pihak tersebut dalam Perjanjian Sewa-menyewa ini seperti tersebut dalam Pasal 4 ayat  (2)</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>6.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Tidak menggunakan  Ruangan Sewa, baik sebagian maupun seluruhnya untuk melakukan usaha-usaha  atau kegiatan –kegiatan yang  bertentangan dengan hukum.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>6.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Tidak diperkenankan untuk menyimpan, menimbun atau menyembunyikan, mengijinkan  atau membiarkan  disimpan atau ditimbun senjata api, amunisi, bahan  peledak, sapleter, atau barang-barang berbahaya lainnya, serta pula tidak boleh memasang  lampu tempel/gas  di dalam  Ruangan sewa  ; kecuali bahan-bahan untuk menjalankan  usaha  PENYEWA.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>6.4.</TableCell>
          <TableCell className={classes.tableCellBorder}>
          Tidak menyewakan  lagi atau menyerahkan Ruangan Sewa sebagian maupun seluruhnya atau mengoperkan atau mengalihkan Ruangan Sewa  ini kepada orang/pihak lain, tanpa persetujuan tertulis lebih  dahulu dari PEMILIK  kecuali  untuk perusahaan yang berada satu  grup dengan  PENYEWA.<br/>
          Jika  dalam 1 (satu)  minggu sesudah menerima Surat permohonan tersebut, PEMILIK tidak/ belum  memberi persetujuannya secara  tertulis, maka PEMILIK dianggap telah memberikan persetujuannya.  
          </TableCell>
        </TableRow>
      </Table> 

      <Typography variant="h6" align="center">Pasal 7</Typography>
      <Typography variant="h6" align="center">KEWAJIBAN DAN TANGGUNG  JAWAB PEMILIK</Typography>
      <Typography variant="p" style={{textAlign:'justify'}}>Sehubungan dengan  pemakaian Ruangan Sewa, maka  PEMILIK berkewajiban supaya fasilitas-fasillitas  seperti  tersebut dalam  Pasal 5, senantiasa  harus tetap berjalan dan bekerja dengan baik dan kontinyu.</Typography>

      <Typography variant="h6" align="center">Pasal 8</Typography>
      <Typography variant="h6" align="center">JAMINAN PEMILIK</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>8.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>PEMILIK menjamin  kepada PENYEWA, bahwa :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>8.1.1</TableCell>
                <TableCell className={classes.tableCellBorder}>Apa yang disewakan dengan Perjanjian Sewa Menyewa ini adalah benar-benar hak PEMILIK, bebas dari sitaan, tidak dalam sengketa, tidak dijaminkan, dan belum disewakan/dijual kepada pihak  lain serta menjamin  PENYEWA dapat  menggunakan Ruangan Sewa  itu sesuai pasal 1 ayat (1) diatas tanpa mendapat gangguan dari siapapun juga.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>8.1.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>Bangunan  tersebut  tidak mempunyai  kerusakan  strukturil  atau kerusakan  berat lainnya  termasuk  kerusakan  tersembunyi  dan kebocoran.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>8.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>PEMILIK atas  biaya sendiri mengasuransikan Bangunan tersebut (tidak termasuk barang-barang  PENYEWA dan lainnya yang berada di Ruangan Sewa) terhadap bahaya kebakaran, kehilangan  atau kerusakan oleh sebab apapun (all risk).</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 9</Typography>
      <Typography variant="h6" align="center">PENERUSAN SEWA</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>9.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Perjanjian Sewa Menyewa ini  tidak menjadi  berakhir/terhenti karena :</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>9.1.1</TableCell>
                <TableCell className={classes.tableCellBorder}>Apabila Bangunan  tersebut  dijual  oleh PEMILIK atau  secara apapun  beralih kepada pihak  lain (ketiga)  atau Bangunan  tersebut dijaminkan, maka  Perjanjian  Sewa Menyewa  ini tidak menjadi batal  karenanya; dan PEMILIK menjamin  PENYEWA untuk tetap dapat menempati  Ruangan Sewa ini sampai  dengan Perjanjian ini berakhir seperti  tersebut dalam pasal 1 ayat (1) di atas.</TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>9.1.2.</TableCell>
                <TableCell className={classes.tableCellBorder}>Apabila  PEMILIK/PENYEWA  dibubarkan, merger, akuisisi dan/atau  dilikuidasi;  dan  dalam hal kejadian demikian, maka pengganti  hak dari PEMILIK/PENYEWA wajib  dan berhak untuk melanjutkan  Sewa Menyewa ini dengan ketentuan-ketentuan yang ditetapkan dalam Perjanjian Sewa Menyewa ini.</TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>9.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apa yang ditentukan dalam ayat-ayat tersebut di atas berlaku pula terhadap  ahli waris dan penerus hak lainnya  dari masing-masing pihak.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 10</Typography>
      <Typography variant="h6" align="center">RELOKASI</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>10.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apabila PEMILIK bermaksud untuk mempergunakan Ruangan Sewa sehingga harus merelokasi dan/atau mereposisi Ruangan Sewa, maka PEMILIK akan memberitahukan secara tertulis terlebih dahulu kepada PENYEWA dan segala biaya yang timbul atas relokasi dan/atau reposisi tersebut menjadi tanggung jawab PEMILIK.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>10.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apabila PENYEWA bermaksud untuk merelokasi Ruangan Sewa, maka PENYEWA dapat mengajukan permohonan terlebih dahulu kepada PEMILIK. Apabila permohonan relokasi tersebut disetujui oleh PEMILIK, maka seluruh biaya yang timbul sehubungan dengan relokasi tersebut menjadi tanggung jawab PENYEWA sepenuhnya.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 11</Typography>
      <Typography variant="h6" align="center">KERUSAKAN  DAN PERBAIKAN</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>11.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Bilamana  Bangunan  mengalami  kerusakan  yang diakibatkan oleh kebakaran,  banjir, gempa bumi, angin ribut  atau bencana alam lainnya, atau huru hara massa dan sebagainya; maka  PEMILIK  tidak bertanggung jawab  atas kerusakan-kerusakan  yang dialami pada Internal  partitioning  dan dekorasi  serta barang-barang bukan  milik  PEMILIK  yang disimpan/ berada di dalam  Ruangan  PENYEWA, tetapi  PEMILIK akan  segera memperbaiki/ membangun  kembali Bangunan  tersebut  dan perjanjian  ini  dianggap  diperpanjang  untuk  jangka  waktu  selama Bangunan  tersebut  tidak dapat  digunakan  sampai dengan  siap  digunakan  lagi, termasuk  pemasangan  partitioning  dan  peralatan  di dalam Ruangan Sewa  tersebut dengan kondisi  dan syarat-syarat  sebagaimana  dinyatakan  dalam  perjanjian ini. </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>11.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>
            Bila setelah 1 bulan sejak kejadian  tersebut  pasal 11 ayat 1  di atas  belum dilakukan  perbaikan, atau  jika perbaikan  akan memerlukan waktu lebih  dari 6 bulan, maka atas  pertimbangan  PENYEWA sendiri,  PENYEWA  berhak  untuk  menghentikan  sewa, dan  uang sewa  yang telah  diterima  PEMILIK  harus  dikembalikan  kepada  PENYEWA, setelah  diperhitungkan  dengan  masa sewa  yang telah  dijalani, paling lambat  1 (satu) bulan setelah  permintaan  pertama  PENYEWA.
            <br/><br/>
            Pasal  1266 dan 1267  KUH Perdata  dinyatakan  tidak berlaku  bagi  pemutusan  perjanjian  dimaksud  pasal  ini.
          </TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 12</Typography>
      <Typography variant="h6" align="center">BERAKHIR/ DIAKHIRI</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>12.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apabila PENYEWA bermaksud mengundurkan diri sebelum Perjanjian ini berakhir, maka PENYEWA tidak berhak untuk meminta kembali uang sewa yang telah dibayarkan oleh PENYEWA kepada PEMILIK.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>12.2.</TableCell>
          {data.jenisLokasi === 'SPBU'? (
            <TableCell className={classes.tableCellBorder}>Apabila PEMILIK bermaksud untuk memutuskan Perjanjian ini sebelum berakhirnya masa sewa PENYEWA dalam hal ini salah satunya karena ada perintah dari PT. Pertamina, maka PEMILIK wajib mendapat persetujuan terlebih dahulu dari PENYEWA dan PEMILIK wajib memberikan penggantian biaya kompensasi atas pemindahan mesin, pembongkaran VSAT dan neon box serta mengembalikan kelebihan biaya yang telah dibayarkan oleh PENYEWA untuk masa sewa yang belum dinikmati oleh PENYEWA.</TableCell>
          ): (
            <TableCell className={classes.tableCellBorder}>Apabila PEMILIK bermaksud untuk memutuskan Perjanjian ini sebelum berakhirnya masa sewa PENYEWA, maka PEMILIK wajib mendapat persetujuan terlebih dahulu dari PENYEWA dan PEMILIK wajib memberikan penggantian biaya kompensasi atas pemindahan mesin, pembongkaran VSAT dan neon box serta mengembalikan kelebihan biaya yang telah dibayarkan oleh PENYEWA untuk masa sewa yang belum dinikmati oleh PENYEWA.</TableCell>
          )}
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>12.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Perjanjian  ini akan berakhir  sesuai dengan jangka waktu yang telah ditentukan  dalam Pasal 1 ayat (1) juncto Pasal 11 ayat (2) di atas.</TableCell>
        </TableRow>
      </Table>

      <Typography variant="h6" align="center">Pasal 13</Typography>
      <Typography variant="h6" align="center">PENYERAHAN KEMBALI</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>13.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Pada  saat  berakhirnya  sewa menyewa  ini dan tidak ada  perpanjangan sewa,  PENYEWA wajib menyerahkan kembali segala yang disewanya tersebut kepada PEMILIK dalam keadaan kosong (tidak dihuni/ ditempati) seluruhnya dan terpelihara baik dan lengkap dengan kunci-kuncinya   yaitu 7 (tujuh) hari setelah berakhirnya jangka waktu sewa.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>13.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Apabila setelah 7 (tujuh) hari dari berakhirnya jangka waktu sewa PENYEWA  belum menyerahkan kembali  apa yang disewanya  itu kepada PEMILIK, maka  PENYEWA  dianggap  lalai, kelalaian mana cukup dibuktikan dengan lewatnya waktu yang telah ditetapkan, sehingga tidak diperlukan teguran dengan surat juru sita atau surat-surat lainnya  semacam  itu, maka untuk tiap-tiap hari keterlambatan, PENYEWA  dikenakan denda sebesar 1%o  (satu permil)  per hari dari harga sewa  per tahun yang dapat ditagih  dan wajib dibayar dengan  seketika dan sekaligus oleh  PENYEWA kepada PEMILIK  atau wakilnya yang sah, ketentuan  mana berlaku untuk waktu  14 (empat belas) hari lamanya setelah sewa-menyewa ini berakhir</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>13.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Bilamana dalam batas waktu tersebut, ternyata  PENYEWA belum juga menyerahkan kembali apa yang disewanya tersebut kepada  PEMILIK,  maka dengan tidak mengurangi kewajiban PENYEWA kepada PEMILIK , untuk  membayar  denda-denda tersebut  di atas atau semua tunggakan/ pembayaran  uang berupa apapun juga yang merupakan kewajiban PENYEWA dan  yang timbul pada waktu perjanjian sewa-menyewa ini masih berlaku atau belum dihentikan/ diputuskan, PENYEWA sekarang  ini juga  untuk nanti pada waktunya, yaitu bila nanti pada waktunya, PENYEWA melalaikan kewajibannya menyerahkan  kembali apa  yang disewanya  tersebut pada saat sewa menyewa ini berakhir, memberi kuasa kepada PEMILIK, dengan hak subtitusi untuk menjalankan segala tindakan yang  perlu dan berguna agar dapat menerima kembali apa yang disewanya terebut dalam keadaan kosong lengkap dengan segala kunci-kuncinya,  jika perlu menghubungi  dan dengan bantuan pihak  yang berwajib melaksanakan pengosongan  tersebut, satu dan lainnya atas perongkosan   dan resiko  dari PENYEWA  sepenuhnya.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>13.4.</TableCell>
          <TableCell className={classes.tableCellBorder}>Bilamana diawal sewa PENYEWA membangun ruangan sewa atas biaya PENYEWA sendiri, maka apabila sewa menyewa ini berakhir maka PENYEWA harus menarik ATM dan perlengkapannya, paling lambat 14 (empatbelas) hari terhitung sejak berakhirnya Sewa Menyewa ini. Untuk ruangan sewa yang sifatnya permanen yang dibuat oleh PENYEWA, akan menjadi hak milik PEMILIK.</TableCell>
        </TableRow>
      </Table> 

      <Typography variant="h6" align="center">Pasal 14</Typography>
      <Typography variant="h6" align="center">KETENTUAN-KETENTUAN  LAIN</Typography>
      <Table>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>14.1.</TableCell>
          <TableCell className={classes.tableCellBorder}>Semua surat  menyurat  yang perlu dikirim  untuk melaksanakan  Perjanjian Sewa Menyewa ini  dialamatkan  pada alamat  di bawah ini :</TableCell>
        </TableRow><TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>
            <Table>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>PEMILIK</TableCell>
                <TableCell className={classes.tableCellBorder}>
                  : <b>{data.nameBusinessEntity? data.nameBusinessEntity : "-"}</b> <br/>
                  <b>{data.corporateAddressLanlord? data.corporateAddressLanlord : "-"}</b> <br/>
                </TableCell>
              </TableRow>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableCellBorder}>PENYEWA</TableCell>
                <TableCell className={classes.tableCellBorder}>
                  :   	PT. BANK  CIMB Niaga Tbk<br/>
                  Griya CIMB Niaga 2 Lt. 10 <br/>
                  Retail Acquisition & Transaction Group<br/>
                  Jl. Wahid Hasyim Blok B-4 No. 3<br/>
                  Bintaro Sektor VII – Tangerang 15224<br/>
                  Up: Linda Elya W  08170026299<br/>
                  Dan<br/>
                  PT. BANK  CIMB Niaga  Tbk – Cabang 
                  <AdvancedSmallInput style={{padding:5}}  stateVar={data.branches} stateModifier={(val)=>handleDataRequest(val, "branches")}/><br/>
                </TableCell>
              </TableRow>
            </Table>
          </TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>&nbsp;</TableCell>
          <TableCell className={classes.tableCellBorder}>Perubahan-perubahan pada alamat-alamat tersebut di atas, wajib  diberitahukan oleh pihak yang satu kepada pihak lainnya.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>14.2.</TableCell>
          <TableCell className={classes.tableCellBorder}>Dengan ditanda tanganinya Perjanjian sewa Menyewa ini oleh kedua belah pihak, tidak mengurangi hak dari PEMILIK  untuk mengatur mengenai  penggunaan atas tempat-tempat  lain di dalam Bangunan  yang berada di luar Ruangan Sewa.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>14.3.</TableCell>
          <TableCell className={classes.tableCellBorder}>Hal-hal yang belum atau belum cukup diatur dalam Perjanjian Sewa Menyewa ini, atau bila terjadi perselisihan paham diantaranya harus diputuskan oleh  kedua belah pihak berdasarkan musyawarah.</TableCell>
        </TableRow>
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCellBorder}>14.4.</TableCell>
          <TableCell className={classes.tableCellBorder}>Tentang Perjanjian Sewa Menyewa ini dan segala akibatnya, para pihak memilih tempat kedudukan hukum yang sah dan tidak berubah di Kantor Panitera Pengadilan Negeri  <b>{data.cityName? data.cityName : "-"}</b>.</TableCell>
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