const AWS = require('aws-sdk');

const S3_BUCKET='collectors-connect-collections-bucket'
const AWS_ACCESS_KEY_ID='AKIAX4RHXPPRJGIUV3RX'
const AWS_SECRET_ACCESS_KEY='SAcGXR9YQZE0ksXJ1GumKWaKmppX9L4ps5FIxRPK'
const AWS_REGION='us-east-1'

// below we need to get the process.env files working or manually replace the info in the config
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});
const s3 = new AWS.S3({
//   params: { 
//     Bucket: S3_BUCKET,
// },
//   region: AWS_REGION,
});

const params = {
    Bucket: S3_BUCKET,
    Key: 'Example.jpg'
}

module.exports = {
    async getImage(bucketName, key) {
        const object = await s3.getObject(params, function(err,data) {
            if (err) console.log(err, err.stack);
            else {
                console.log(data)
                console.log(data.Body)
                return data;
            };
        }).promise();
        console.log('Obj bod', object.Body);
        // return object.Body;
    }
}