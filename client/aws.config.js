import React from 'react';
import ReactDOM from 'react-dom';

// const S3_BUCKET='collectors-connect-collections-bucket'
// const AWS_ACCESS_KEY_ID='AKIAX4RHXPPRJGIUV3RX'
// const AWS_SECRET_ACCESS_KEY='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'
// const AWS_REGION='us-east-1'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});



export const s3 = new AWS.S3();