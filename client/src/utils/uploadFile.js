import AWS from 'aws-sdk';
// import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from 'dotenv';

const S3_BUCKET='collectors-connect-collections-bucket'
const AWS_ACCESS_KEY_ID='AKIAX4RHXPPRJGIUV3RX'
const AWS_SECRET_ACCESS_KEY='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'
const AWS_REGION='us-east-1'


export const uploadFile = async (file) => {
    // const S3_BUCKET = process.env.S3_BUCKET

    

  // below we need to get the process.env files working or manually replace the info in the config
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: AWS_REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
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


