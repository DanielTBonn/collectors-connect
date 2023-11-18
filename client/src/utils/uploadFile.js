import AWS from '../../aws.config'

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET

export const uploadFile = async (file) => {

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
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


