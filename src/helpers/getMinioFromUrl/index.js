/* eslint-disable consistent-return */
const Minio = require('minio');

let SecretKey = process.env.REACT_APP_MINIO_SECRET_KEY;

if(SecretKey === 'IstuatATM'){
  SecretKey = 'IstuatATM$14b';
}

const minioClient = new Minio.Client({
  endPoint: `${process.env.REACT_APP_MINIO_URL}`,
  useSSL: true,
  accessKey: `${process.env.REACT_APP_MINIO_ACCESS_KEY}`,
  secretKey: `${SecretKey}`,
});
const BucketName = `${process.env.REACT_APP_MINIO_BUCKET}`;
const UrlBucket = `https://${process.env.REACT_APP_MINIO_ACCESS_KEY}/${BucketName}`;

const getMinioFromUrl = async (fileUrl, stringReplace = UrlBucket) => {
  // stringReplace = "https://minio.mylab-siab.com/project/"
  // console.log("<<<< MINIO URL", process.env.REACT_APP_MINIO_URL);

  const array = fileUrl.split('/');
  const fileName = array[array.length-1];

  const filePath = fileUrl.replace(stringReplace, "");

  try{
    const result = await minioClient.presignedGetObject(BucketName, filePath, 24*60*60);
    const fileNewSet = {
      "fileName": fileName,
      "fileUrl": result
    };
    return fileNewSet;
  }catch(err){
    // alert("Error get try file",err);
    console.log("Error get try file", err);
    return
  }

};

export default getMinioFromUrl;