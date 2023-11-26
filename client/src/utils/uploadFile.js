import AWS from '../../aws.config'
const S3_BUCKET = process.env.S3_BUCKET || import.meta.env.VITE_S3_BUCKET 

// const {
//   S3Client,
//   PutObjectCommand,
//   HeadObjectCommand,
//   DeleteObjectCommand,
// } = require("@aws-sdk/client-s3");

// async function createFolder(Bucket, Key) {
//   const client = new S3Client();
//   const command = new PutObjectCommand({ Bucket, Key });
//   return client.send(command);
// }

// async function existsFolder(Bucket, Key) {
//   const client = new S3Client();
//   const command = new HeadObjectCommand({ Bucket, Key });

//   try {
//     await client.send(command);
//     return true;
//   } catch (error) {
//     if (error.name === "NotFound") {
//       return false;
//     } else {
//       throw error;
//     }
//   }
// }

// async function createFolderIfNotExist(Bucket, Key) {
//   if (!(await existsFolder(Bucket, Key))) {
//     return createFolder(Bucket, Key);
//   }
// }

export const uploadFile = async (file, user) => {


    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
    });
    
    const key = 'users/' + user.username + '/collections/' + user.collection + '/' + file.name

    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: file,
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

      await upload.then((err, data) => {
      console.log(err);
   
      alert("File uploaded successfully.");
    });
  };


