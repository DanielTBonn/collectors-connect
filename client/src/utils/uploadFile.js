import AWS from 'aws-sdk';

export const uploadFile = async (file) => {
    const S3_BUCKET = "collectors-connect-collections-bucket";
    const REGION = 'us-east-1';

    AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        accessKeyId: 'AKIAX4RHXPPRDACTRW5L',
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        secretAccessKey: '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',
    //   region: process.env.AWS_REGION,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
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


