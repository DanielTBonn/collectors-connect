const AWS = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;
const REGION = AWS_REGION;

// below we need to get the process.env files working or manually replace the info in the config
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

module.exports = {

    async getImage() {

    }
}