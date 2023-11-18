const AWS = require('aws-sdk');
require('.dotenv').config()

const S3_BUCKET='collectors-connect-collections-bucket'
const AWS_ACCESS_KEY_ID='AKIAX4RHXPPRJGIUV3RX'
const AWS_SECRET_ACCESS_KEY='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'
const AWS_REGION='us-east-1'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports = AWS;